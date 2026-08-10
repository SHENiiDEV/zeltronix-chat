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
     * Process an uploaded document, chunk it, embed, and store in vector database.
     */
    public function processDocument(Document $document): bool
    {
        try {
            $document->update(['status' => 'processing']);

            $fullPath = storage_path('app/' . $document->file_path);
            if (!file_exists($fullPath) && Storage::exists($document->file_path)) {
                $fullPath = Storage::path($document->file_path);
            }

            $rawText = $this->extractTextFromFile($fullPath, $document->filename);

            if (empty(trim($rawText))) {
                throw new \Exception('Extracted document text is empty.');
            }

            $chunks = $this->chunkText($rawText, 1200, 150);

            $vectors = [];
            $botUuid = $document->bot->uuid;

            // Clear old vector storage file if reprocessing
            $vPath = storage_path('app/private/vector_store/' . $botUuid . '.json');
            if (file_exists($vPath)) {
                @unlink($vPath);
            }

            foreach ($chunks as $index => $chunkText) {
                $embedding = $this->openAi->getEmbedding($chunkText);
                $vectorId = "doc_{$document->id}_chunk_{$index}";

                $vectors[] = [
                    'id' => $vectorId,
                    'values' => $embedding,
                    'metadata' => [
                        'document_id' => $document->id,
                        'chunk_index' => $index,
                        'filename' => $document->filename,
                        'text' => $chunkText,
                    ]
                ];
            }

            $this->pinecone->upsertVectors($botUuid, $vectors);

            $document->update([
                'status' => 'ready',
                'chunk_count' => count($chunks),
                'error_message' => null,
            ]);

            return true;
        } catch (\Throwable $e) {
            Log::error("Failed to process document ID {$document->id}: " . $e->getMessage());

            $document->update([
                'status' => 'failed',
                'error_message' => $e->getMessage(),
            ]);

            return false;
        }
    }

    /**
     * Parse text from file based on extension.
     */
    protected function extractTextFromFile(string $filePath, string $filename): string
    {
        $ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));

        if (!file_exists($filePath)) {
            return '';
        }

        if (in_array($ext, ['txt', 'md', 'json', 'csv', 'log'])) {
            return file_get_contents($filePath);
        }

        if ($ext === 'pdf') {
            return $this->parsePdfText($filePath);
        }

        // Fallback for docx or unrecognized files
        $content = @file_get_contents($filePath);
        return preg_replace('/[^\x20-\x7E\x0A\x0D\x0400-\x04FF]/u', ' ', $content) ?: 'Document text content';
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

        return preg_replace('/[^\x20-\x7E\x0A\x0D\x0400-\x04FF]/u', ' ', $extracted ?: $content);
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
