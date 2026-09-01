<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class OpenAiService
{
    protected string $provider;
    protected ?string $apiKey;
    protected string $chatModel;
    protected string $baseUrl;

    protected ?string $openAiApiKey;
    protected string $embeddingModel = 'text-embedding-3-small';

    public function __construct()
    {
        $this->provider = config('services.provider', env('AI_PROVIDER', 'openai'));
        $this->openAiApiKey = config('services.openai.api_key', env('OPENAI_API_KEY'));

        if ($this->provider === 'deepseek') {
            $this->apiKey = config('services.deepseek.api_key', env('DEEPSEEK_API_KEY'));
            $this->chatModel = config('services.deepseek.model', env('DEEPSEEK_CHAT_MODEL', 'deepseek-chat'));
            $this->baseUrl = rtrim(config('services.deepseek.base_url', env('DEEPSEEK_BASE_URL', 'https://api.deepseek.com')), '/');
        } else {
            $this->apiKey = $this->openAiApiKey;
            $this->chatModel = config('services.openai.model', env('OPENAI_CHAT_MODEL', 'gpt-4o-mini'));
            $this->baseUrl = 'https://api.openai.com/v1';
        }
    }

    /**
     * Generate 1536-dimensional vector embedding for text chunk.
     */
    public function getEmbedding(string $text): array
    {
        // Try OpenAI embedding API if OpenAI API key is present
        if (!empty($this->openAiApiKey) && str_starts_with($this->openAiApiKey, 'sk-')) {
            try {
                $response = Http::withToken($this->openAiApiKey)
                    ->post('https://api.openai.com/v1/embeddings', [
                        'model' => $this->embeddingModel,
                        'input' => $text,
                    ]);

                if ($response->successful()) {
                    return $response->json('data.0.embedding', []);
                }
            } catch (\Throwable $e) {
                Log::warning('OpenAI Embedding API error, falling back to local vector generator: ' . $e->getMessage());
            }
        }

        return $this->generateMockEmbedding($text);
    }

    /**
     * Generate AI response using DeepSeek or OpenAI and return content + exact tokens used from API usage payload.
     * @return array{answer: string, tokens_used: int}
     */
    public function generateAnswer(string $systemPrompt, array $contextChunks, array $chatHistory, string $userQuestion): array
    {
        if (empty($this->apiKey) || str_contains($this->apiKey, 'your-deepseek-api-key')) {
            $mockText = $this->generateMockAnswer($contextChunks, $userQuestion);
            // Estimate tokens if offline / mock (approx 4 chars = 1 token)
            $estimatedTokens = (int) ceil(mb_strlen($systemPrompt . $userQuestion . $mockText) / 4);
            return [
                'answer' => $mockText,
                'tokens_used' => max(50, $estimatedTokens),
            ];
        }

        $contextText = implode("\n\n---\n\n", $contextChunks);

        $messages = [
            [
                'role' => 'system',
                'content' => $systemPrompt . "\n\nKNOWLEDGE BASE CONTEXT:\n" . ($contextText ?: "No relevant knowledge base data found."),
            ]
        ];

        foreach ($chatHistory as $msg) {
            $messages[] = [
                'role' => $msg['sender'] === 'user' ? 'user' : 'assistant',
                'content' => $msg['content'],
            ];
        }

        $messages[] = [
            'role' => 'user',
            'content' => $userQuestion,
        ];

        try {
            $url = "{$this->baseUrl}/chat/completions";

            $response = Http::withToken($this->apiKey)
                ->timeout(30)
                ->post($url, [
                    'model' => $this->chatModel,
                    'messages' => $messages,
                    'temperature' => 0.3,
                    'max_tokens' => 600,
                ]);

            if ($response->successful()) {
                $content = $response->json('choices.0.message.content', 'Error generating response.');
                
                // Read exact tokens used from DeepSeek / OpenAI API response
                $totalTokens = (int) $response->json('usage.total_tokens');
                if ($totalTokens <= 0) {
                    $promptTokens = (int) $response->json('usage.prompt_tokens', 0);
                    $completionTokens = (int) $response->json('usage.completion_tokens', 0);
                    $totalTokens = $promptTokens + $completionTokens;
                }

                if ($totalTokens <= 0) {
                    $totalTokens = (int) ceil(mb_strlen($content . $userQuestion) / 4);
                }

                return [
                    'answer' => $content,
                    'tokens_used' => max(1, $totalTokens),
                ];
            }

            Log::error("{$this->provider} Completion Error [Status {$response->status()}]", [
                'body' => $response->body(),
                'model' => $this->chatModel,
            ]);
        } catch (\Throwable $e) {
            Log::error("{$this->provider} Completion Exception: " . $e->getMessage());
        }

        $mockText = $this->generateMockAnswer($contextChunks, $userQuestion);
        return [
            'answer' => $mockText,
            'tokens_used' => (int) ceil(mb_strlen($mockText) / 4),
        ];
    }

    /**
     * High-quality deterministic vector generator when external embedding API is offline.
     */
    protected function generateMockEmbedding(string $text): array
    {
        $vector = [];
        $seed = crc32($text);
        mt_srand($seed);
        for ($i = 0; $i < 1536; $i++) {
            $vector[] = (mt_rand(-1000, 1000) / 1000);
        }
        return $vector;
    }

    /**
     * Fallback response generator for demo mode.
     */
    protected function generateMockAnswer(array $contextChunks, string $userQuestion): string
    {
        if (!empty($contextChunks)) {
            $snippet = substr($contextChunks[0], 0, 300);
            return "Based on your documentation:\n\n\"" . trim($snippet) . "...\"\n\nIf you need further details, please let me know or contact support.";
        }

        return "I am your AI Support Assistant powered by Zeltrionix. I checked the available documentation, but I could not find a direct answer to: \"" . e($userQuestion) . "\". Would you like me to connect you with a human representative?";
    }
}
