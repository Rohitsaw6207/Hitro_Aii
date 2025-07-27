<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class StudentAssistantController extends Controller
{
    public function handle(Request $request)
    {
        try {
            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
            ])->post('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' . env('GEMINI_API_KEY'), [
                'contents' => [
                    [
                        'parts' => [
                            [
                                'text' => "You are a helpful and friendly student assistant. Answer academic questions and help with homework or studying."
                            ],
                            [
                                'text' => $request->input('message')
                            ]
                        ]
                    ]
                ]
            ]);

            Log::info('Google Gemini Student Assistant Response:', [$response->body()]);

            if ($response->successful()) {
                return response()->json($response->json());
            } else {
                return response()->json([
                    'error' => 'Failed to connect to Student Assistant',
                    'details' => $response->body(),
                ], $response->status());
            }
        } catch (\Exception $e) {
            Log::error('Exception in Student Assistant:', [$e->getMessage()]);
            return response()->json([
                'error' => 'Exception occurred',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
