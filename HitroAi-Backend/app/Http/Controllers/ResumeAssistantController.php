<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ResumeAssistantController extends Controller
{
    public function handle(Request $request)
    {
        $userMessage = $request->input('message');

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('COHERE_API_KEY'),
            'Content-Type' => 'application/json',
        ])->post('https://api.cohere.ai/v1/chat', [
            'model' => 'command-r-plus',
            'temperature' => 0.5,
            'message' => $userMessage,
            'chat_history' => [],
        ]);

        if (!$response->successful()) {
            return response()->json([
                'result' => '🚫 API request failed. Status: ' . $response->status(),
                'debug' => $response->json(),
            ]);
        }

        $json = $response->json();
        $result = $json['text']
            ?? ($json['generations'][0]['text'] ?? null)
            ?? '⚠️ Cohere returned no text.';

        return response()->json([
            'result' => $result,
        ]);
    }
}
