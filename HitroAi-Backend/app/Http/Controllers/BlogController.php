<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class BlogController extends Controller
{
    public function generate(Request $request)
    {
        $prompt = $request->input('prompt');

        if (!$prompt) {
            return response()->json(['error' => 'Prompt is required.'], 400);
        }

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('COHERE_API_KEY'),
            'Content-Type' => 'application/json',
        ])->post('https://api.cohere.ai/v1/chat', [
            'model' => 'command-r',
            'message' => $prompt,
        ]);

        if ($response->successful()) {
            return response()->json([
                'response' => $response->json()['text'] ?? 'No output from model',
            ]);
        }

        return response()->json(['error' => 'Failed to fetch response from Cohere'], 500);
    }
}
