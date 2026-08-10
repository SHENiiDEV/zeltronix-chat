<?php

namespace App\Services;

use App\Models\Document;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Smalot\PdfParser\Parser as PdfParser;

class DocumentProcessorService
{
    protected OpenAiService $openAi;
    protected PineconeService $pinecone;

    public function __construct(OpenAiService $openAi, PineconeService $pinecone)
    {
        $this->openAi = $openAi;
        $this->pinecone = $pinecone;
    }

    /**
     * Process document: parse text, split into chunks, generate embeddings, store in vector store.
     */
    public function process(Document $document): void
    {
        try {
            $document->update(['status' => 'processing']);

            // 1. Get raw file path
            $filePath = Storage::path($document->file_path);

            // 2. Extract plain text
            $text = $this->extractText($filePath, strtolower(pathinfo($document->filename, PATHINFO_EXTENSION)));

            if (empty(trim($text))) {
                throw new \Exception("Extracted text is empty for file {$document->filename}");
            }

            // 3. Chunk text into overlapping segments
            $chunks = $this->chunkText($text);

            // 4. Generate embeddings and store in Pinecone / Local Vector DB
            $vectorRecords = [];
            foreach ($chunks as $index => $chunkText) {
                $vectorRecords[] = [
                    'id' => "{$document->bot->uuid}-doc{$document->id}-chunk{$index}",
                    'text' => $chunkText,
                    'embedding' => $this->openAi->getEmbedding($chunkText),
                    'metadata' => [
                        'document_id' => $document->id,
                        'filename' => $document->filename,
                        'chunk_index' => $index,
                    ],
                ];
            }

            $this->pinecone->upsertVectors($document->bot->uuid, $vectorRecords);

            // 5. Update document status
            $document->update([
                'status' => 'ready',
                'chunk_count' => count($chunks),
            ]);

            Log::info("Document {$document->id} ({$document->filename}) processed successfully with " . count($chunks) . " chunks.");
        } catch (\Throwable $e) {
            $document->update(['status' => 'error']);
            Log::error("Failed to process document ID {$document->id}: " . $e->getMessage());
        }
    }

    /**
     * Alias method for process()
     */
    public function processDocument(Document $document): void
    {
        $this->process($document);
    }

    /**
     * Extract text based on file extension.
     */
    protected function extractText(string $filePath, string $ext): string
    {
        if (in_array($ext, ['txt', 'md', 'json', 'csv', 'log'])) {
            return file_get_contents($filePath);
        }

        if ($ext === 'pdf') {
            return $this->parsePdfText($filePath);
        }

        // Fallback for docx or unrecognized files
        $content = @file_get_contents($filePath);
        return preg_replace('/[^\x20-\x7E\x0A\x0D\x{0400}-\x{04FF}]/u', ' ', $content) ?: 'Document text content';
    }

    /**
     * Parse PDF text using Smalot PdfParser.
     */
    protected function parsePdfText(string $filePath): string
    {
        try {
            $parser = new PdfParser();
            $pdf = $parser->parseFile($filePath);
            $text = $pdf->getText();

            if (!empty(trim($text))) {
                return $text;
            }
        } catch (\Throwable $e) {
            Log::warning('Smalot PdfParser failed: ' . $e->getMessage());
        }

        // Fallback PDF stream regex
        $content = file_get_contents($filePath);
        preg_match_all('/(stream[\r\n]+(.*?)[\r\n]+endstream)|(\((.*?)\))/s', $content, $matches);
        $extracted = implode(' ', array_filter($matches[4] ?? []));

        return preg_replace('/[^\x20-\x7E\x0A\x0D\x{0400}-\x{04FF}]/u', ' ', $extracted ?: $content);
    }

    /**
     * Split long text into overlapping chunks.
     */
    public function chunkText(string $text, int $chunkSize = 1200, int $overlap = 150): array
    {
        $text = preg_replace('/\s+/', ' ', $text);
        $length = mb_strlen($text);

        if ($length <= $chunkSize) {
            return [$text];
        }

        $chunks = [];
        $start = 0;

        while ($start < $length) {
            $chunk = mb_substr($text, $start, $chunkSize);
            $chunks[] = trim($chunk);
            $start += ($chunkSize - $overlap);
        }

        return array_filter($chunks);
    }
}
