<?php

namespace App\Http\Controllers;

use App\Models\Bot;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class BotController extends Controller
{
    public function index(Request $request): Response
    {
        $bots = $request->user()->bots()
            ->withCount(['documents', 'chatSessions'])
            ->latest()
            ->get();

        return Inertia::render('Bots/Index', [
            'bots' => $bots,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:200',
            'system_prompt' => 'nullable|string',
            'greeting_message' => 'nullable|string|max:200',
            'primary_color' => 'nullable|string|max:200',
            'secondary_color' => 'nullable|string|max:200',
            'theme_mode' => 'nullable|string|in:dark,light',
            'allowed_domains' => 'nullable|string',
        ]);

        $bot = $request->user()->bots()->create([
            'uuid' => (string) Str::uuid(),
            'name' => $validated['name'],
            'system_prompt' => $validated['system_prompt'] ?? null,
            'greeting_message' => $validated['greeting_message'] ?? 'Hello! How can I help you today?',
            'primary_color' => $validated['primary_color'] ?? '#3b82f6',
            'secondary_color' => $validated['secondary_color'] ?? '#a855f7',
            'theme_mode' => $validated['theme_mode'] ?? 'dark',
            'allowed_domains' => $validated['allowed_domains'] ?? null,
        ]);

        return redirect()->route('bots.show', $bot->id)
            ->with('success', 'AI Agent created successfully!');
    }

    public function show(Request $request, Bot $bot): Response
    {
        if ($bot->user_id !== $request->user()->id) {
            abort(403);
        }

        $bot->load(['documents' => function ($query) {
            $query->latest();
        }]);

        $bot->loadCount(['chatSessions', 'documents']);

        return Inertia::render('Bots/Show', [
            'bot' => $bot,
            'embedSnippet' => '<script src="' . url('/widget.js') . '" data-bot-id="' . $bot->uuid . '" async></script>',
        ]);
    }

    public function update(Request $request, Bot $bot)
    {
        if ($bot->user_id !== $request->user()->id) {
            abort(403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:200',
            'system_prompt' => 'nullable|string',
            'greeting_message' => 'nullable|string|max:200',
            'primary_color' => 'nullable|string|max:200',
            'secondary_color' => 'nullable|string|max:200',
            'theme_mode' => 'nullable|string|in:dark,light',
            'allowed_domains' => 'nullable|string',
        ]);

        $bot->update($validated);

        return back()->with('success', 'Bot settings updated successfully!');
    }

    public function destroy(Request $request, Bot $bot)
    {
        if ($bot->user_id !== $request->user()->id) {
            abort(403);
        }

        $bot->delete();

        return redirect()->route('bots.index')->with('success', 'Bot deleted.');
    }
}
