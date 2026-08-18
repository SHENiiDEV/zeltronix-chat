<?php

namespace App\Services;

use App\Models\Bot;
use App\Models\ChatSession;
use App\Models\ChatMessage;

class RagEngineService
{
    protected OpenAiService $openAi;
    protected PineconeService $pinecone;

    public function __construct(OpenAiService $openAi, PineconeService $pinecone)
    {
        $this->openAi = $openAi;
        $this->pinecone = $pinecone;
    }

    /**
     * Answer user question using RAG workflow and deduct consumed DeepSeek tokens from user account balance.
     */
    public function ask(Bot $bot, ChatSession $session, string $question): string
    {
        // 1. Save user question
        $session->messages()->create([
            'sender' => 'user',
            'content' => $question,
        ]);

        // 2. Obtain query embedding
        $queryEmbedding = $this->openAi->getEmbedding($question);

        // 3. Search vector store for relevant knowledge base context
        $relevantChunks = $this->pinecone->querySimilarity($bot->uuid, $queryEmbedding, 6);

        // 4. Retrieve recent chat history for context
        $recentMessages = $session->messages()
            ->orderBy('id', 'desc')
            ->take(6)
            ->get()
            ->reverse()
            ->map(fn($msg) => [
                'sender' => $msg->sender,
                'content' => $msg->content,
            ])
            ->toArray();

        // 5. Build system prompt with guaranteed agent identity & company contact details
        $companySupportEmail = config('services.company.support_email', 'info@zeltrionix.com');
        
        $identityGuardrail = "IDENTITY INSTRUCTION: Your assistant name is '{$bot->name}'. "
            . "When asked about your name, who you are, or your identity, clearly state that you are '{$bot->name}' (the AI Support Assistant). "
            . "HUMAN ESCALATION: If the answer is not present in the knowledge base context, state that you don't have that specific detail and instruct the user to contact human support at {$companySupportEmail}.";

        $userPrompt = $bot->system_prompt ? $bot->system_prompt : "Answer questions accurately using the provided knowledge base context.";
        $systemPrompt = $identityGuardrail . "\n\nCUSTOM INSTRUCTIONS:\n" . $userPrompt;

        // 6. Generate answer via DeepSeek / OpenAI with exact token accounting
        $aiResult = $this->openAi->generateAnswer($systemPrompt, $relevantChunks, $recentMessages, $question);
        $aiAnswer = $aiResult['answer'];
        $tokensUsed = (int) ($aiResult['tokens_used'] ?? 0);

        // 7. Save assistant answer with tokens_used metadata
        $session->messages()->create([
            'sender' => 'assistant',
            'content' => $aiAnswer,
            'tokens_used' => $tokensUsed,
        ]);

        // 8. Deduct tokens from bot owner's token balance & increment total_tokens_used
        $user = $bot->user;
        if ($user && $tokensUsed > 0) {
            $user->decrement('token_balance', min($user->token_balance, $tokensUsed));
            $user->increment('total_tokens_used', $tokensUsed);
        }

        return $aiAnswer;
    }
}
