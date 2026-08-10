<?php

namespace App\Http\Controllers;

use App\Models\ChatMessage;
use App\Models\Document;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();
        $botIds = $user->bots()->pluck('id');

        $totalBots = $user->bots()->count();
        $totalDocs = Document::whereIn('bot_id', $botIds)->count();
        $readyDocs = Document::whereIn('bot_id', $botIds)->where('status', 'ready')->count();

        $totalMessages = ChatMessage::whereHas('chatSession', function ($q) use ($botIds) {
            $q->whereIn('bot_id', $botIds);
        })->count();

        $recentBots = $user->bots()->withCount(['documents', 'chatSessions'])->latest()->take(5)->get();

        // Calculate actual daily message volume for the past 7 days
        $chartData = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i);
            $dayLabel = $date->format('D');

            $count = ChatMessage::whereHas('chatSession', function ($q) use ($botIds) {
                $q->whereIn('bot_id', $botIds);
            })->whereDate('created_at', $date->toDateString())->count();

            $tokens = ChatMessage::whereHas('chatSession', function ($q) use ($botIds) {
                $q->whereIn('bot_id', $botIds);
            })->whereDate('created_at', $date->toDateString())->sum('tokens_used');

            $chartData[] = [
                'day' => $dayLabel,
                'queries' => $count,
                'tokens' => (int) $tokens,
            ];
        }

        return Inertia::render('Dashboard', [
            'stats' => [
                'totalBots' => $totalBots,
                'totalDocs' => $totalDocs,
                'readyDocs' => $readyDocs,
                'totalMessages' => $totalMessages,
                'tokenBalance' => $user->token_balance,
                'subscriptionPlan' => strtoupper($user->subscription_plan),
                'totalTokensUsed' => $user->total_tokens_used,
            ],
            'chartData' => $chartData,
            'recentBots' => $recentBots,
        ]);
    }
}
