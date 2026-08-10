<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Bot;
use App\Models\ChatSession;
use App\Services\RagEngineService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class WidgetApiController extends Controller
{
    protected RagEngineService $ragEngine;

    public function __construct(RagEngineService $ragEngine)
    {
        $this->ragEngine = $ragEngine;
    }

    /**
     * Initialize widget state & session history.
     */
    public function init(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'bot_id' => 'required|string',
            'session_token' => 'nullable|string',
            'visitor_id' => 'nullable|string',
        ]);

        $bot = Bot::where('uuid', $validated['bot_id'])->first();

        if (!$bot) {
            return response()->json(['error' => 'Bot not found.'], 404);
        }

        $sessionToken = $validated['session_token'] ?? null;
        $session = null;

        if ($sessionToken) {
            $session = ChatSession::where('session_token', $sessionToken)->first();
        }

        if (!$session) {
            $session = ChatSession::create([
                'session_token' => (string) Str::uuid(),
                'bot_id' => $bot->id,
                'visitor_id' => $validated['visitor_id'] ?? (string) Str::uuid(),
                'user_agent' => substr($request->header('User-Agent'), 0, 200),
                'ip_address' => $request->ip(),
            ]);
        }

        $history = $session->messages()
            ->orderBy('id', 'asc')
            ->get(['sender', 'content', 'created_at']);

        return response()->json([
            'bot' => [
                'name' => $bot->name,
                'greeting_message' => $bot->greeting_message,
                'primary_color' => $bot->primary_color,
                'secondary_color' => $bot->secondary_color,
                'theme_mode' => $bot->theme_mode ?? 'dark',
            ],
            'session_token' => $session->session_token,
            'history' => $history,
        ])->header('Access-Control-Allow-Origin', '*');
    }

    /**
     * Handle chat message sending via RAG workflow.
     */
    public function chat(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'bot_id' => 'required|string',
            'session_token' => 'required|string',
            'question' => 'required|string|max:2000',
        ]);

        $bot = Bot::where('uuid', $validated['bot_id'])->first();
        if (!$bot) {
            return response()->json(['error' => 'Bot not found.'], 404);
        }

        $session = ChatSession::where('session_token', $validated['session_token'])->first();
        if (!$session) {
            $session = ChatSession::create([
                'session_token' => $validated['session_token'],
                'bot_id' => $bot->id,
                'visitor_id' => (string) Str::uuid(),
                'user_agent' => substr($request->header('User-Agent'), 0, 200),
                'ip_address' => $request->ip(),
            ]);
        }

        $answer = $this->ragEngine->ask($bot, $session, $validated['question']);

        return response()->json([
            'answer' => $answer,
            'session_token' => $session->session_token,
        ])->header('Access-Control-Allow-Origin', '*');
    }
}
