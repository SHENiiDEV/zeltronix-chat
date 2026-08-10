<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class PineconeService
{
    protected ?string $apiKey;
    protected ?string $host;

    public function __construct()
    {
        $this->apiKey = config('services.pinecone.api_key', env('PINECONE_API_KEY'));
        $this->host = config('services.pinecone.host', env('PINECONE_HOST'));
    }

    /**
     * Upsert vector embeddings with metadata.
     */
    public function upsertVectors(string $botUuid, array $vectors): bool
    {
        if (empty($this->apiKey) || empty($this->host)) {
            return $this->localUpsert($botUuid, $vectors);
        }

        try {
            $endpoint = rtrim($this->host, '/') . '/vectors/upsert';
            $response = Http::withHeaders([
                'Api-Key' => $this->apiKey,
                'Content-Type' => 'application/json',
            ])->post($endpoint, [
                'vectors' => array_map(function ($v) use ($botUuid) {
                    $v['metadata']['bot_uuid'] = $botUuid;
                    return $v;
                }, $vectors),
            ]);

            if ($response->successful()) {
                return true;
            }

            Log::error('Pinecone Upsert Error', ['response' => $response->body()]);
        } catch (\Throwable $e) {
            Log::error('Pinecone Exception: ' . $e->getMessage());
        }

        return $this->localUpsert($botUuid, $vectors);
    }

    /**
     * Search nearest K vector chunks for bot.
     */
    public function querySimilarity(string $botUuid, array $queryVector, int $topK = 4): array
    {
        if (empty($this->apiKey) || empty($this->host)) {
            return $this->localQuery($botUuid, $queryVector, $topK);
        }

        try {
            $endpoint = rtrim($this->host, '/') . '/query';
            $response = Http::withHeaders([
                'Api-Key' => $this->apiKey,
                'Content-Type' => 'application/json',
            ])->post($endpoint, [
                'vector' => $queryVector,
                'topK' => $topK,
                'includeMetadata' => true,
                'filter' => [
                    'bot_uuid' => ['$eq' => $botUuid],
                ],
            ]);

            if ($response->successful()) {
                $matches = $response->json('matches', []);
                $results = [];
                foreach ($matches as $match) {
                    if (isset($match['metadata']['text'])) {
                        $results[] = $match['metadata']['text'];
                    }
                }
                return $results;
            }

            Log::error('Pinecone Query Error', ['response' => $response->body()]);
        } catch (\Throwable $e) {
            Log::error('Pinecone Query Exception: ' . $e->getMessage());
        }

        return $this->localQuery($botUuid, $queryVector, $topK);
    }

    /**
     * Local storage vector store fallback for local development.
     */
    protected function localUpsert(string $botUuid, array $vectors): bool
    {
        $path = "vector_store/{$botUuid}.json";
        $existing = Storage::exists($path) ? json_decode(Storage::get($path), true) : [];

        foreach ($vectors as $v) {
            $existing[] = $v;
        }

        Storage::put($path, json_encode($existing, JSON_PRETTY_PRINT));
        return true;
    }

    /**
     * Cosine similarity matching over local store fallback.
     */
    protected function localQuery(string $botUuid, array $queryVector, int $topK = 4): array
    {
        $path = "vector_store/{$botUuid}.json";
        if (!Storage::exists($path)) {
            return [];
        }

        $vectors = json_decode(Storage::get($path), true) ?: [];
        $scored = [];

        foreach ($vectors as $item) {
            $score = $this->cosineSimilarity($queryVector, $item['values'] ?? []);
            $text = $item['metadata']['text'] ?? '';
            if (!empty($text)) {
                $scored[] = [
                    'score' => $score,
                    'text' => $text,
                ];
            }
        }

        usort($scored, fn($a, $b) => $b['score'] <=> $a['score']);
        return array_column(array_slice($scored, 0, $topK), 'text');
    }

    protected function cosineSimilarity(array $a, array $b): float
    {
        if (count($a) !== count($b) || empty($a)) {
            return 0.0;
        }

        $dotProduct = 0.0;
        $normA = 0.0;
        $normB = 0.0;

        for ($i = 0; $i < count($a); $i++) {
            $dotProduct += $a[$i] * $b[$i];
            $normA += $a[$i] * $a[$i];
            $normB += $b[$i] * $b[$i];
        }

        if ($normA == 0 || $normB == 0) {
            return 0.0;
        }

        return $dotProduct / (sqrt($normA) * sqrt($normB));
    }
}
