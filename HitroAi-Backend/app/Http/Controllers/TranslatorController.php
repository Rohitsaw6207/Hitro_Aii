<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class TranslatorController extends Controller
{
    public function translate(Request $request)
    {
        $prompt = $request->input('prompt'); // text to translate
        $language = $request->input('language'); // target language

        $apiKey = env('TRANSLATOR_API_KEY');
        $url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'X-goog-api-key' => $apiKey,
        ])->post($url, [
            'contents' => [
                [
                    'parts' => [
                        [
                            'text' => "Translate this to {$language}:\n{$prompt}"
                        ]
                    ]
                ]
            ]
        ]);

        return response()->json($response->json());
    }
}
