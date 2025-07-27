<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CodeAssistantController;
use App\Http\Controllers\TranslatorController;
use App\Http\Controllers\StudentAssistantController;
use App\Http\Controllers\ResumeAssistantController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::post('/blog-generator', [BlogController::class, 'generate']);

Route::post('/translator', [TranslatorController::class, 'translate']);

Route::post('/code-assistant', [CodeAssistantController::class, 'handle']);

Route::post('/resume-assistant', [ResumeAssistantController::class, 'handle']);

Route::post('/student-assistant', [StudentAssistantController::class, 'handle']);

