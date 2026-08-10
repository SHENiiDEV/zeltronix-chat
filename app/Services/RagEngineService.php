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
     * Answer user question using RAG workflow.
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
        $relevantChunks = $this->pinecone->querySimilarity($bot->uuid, $queryEmbedding, 4);

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
        $companySupportEmail = config('services.company.support_email', 'support@zeltrionix.com');
        
        $identityGuardrail = "IDENTITY INSTRUCTION: Your assistant name is '{$bot->name}'. "
            . "When asked about your name, who you are, or your identity, clearly state that you are '{$bot->name}' (the AI Support Assistant). "
            . "HUMAN ESCALATION: If the answer is not present in the knowledge base context, state that you don't have that specific detail and instruct the user to contact human support at {$companySupportEmail}.";

        $userPrompt = $bot->system_prompt ? $bot->system_prompt : "Answer questions accurately using the provided knowledge base context.";
        $systemPrompt = $identityGuardrail . "\n\nCUSTOM INSTRUCTIONS:\n" . $userPrompt;

        // 6. Generate answer via DeepSeek / OpenAI
        $aiAnswer = $this->openAi->generateAnswer($systemPrompt, $relevantChunks, $recentMessages, $question);

        // 7. Save assistant answer
        $session->messages()->create([
            'sender' => 'assistant',
            'content' => $aiAnswer,
            'tokens_used' => mb_strlen($aiAnswer) / 4,
        ]);

        return $aiAnswer;
    }
}
