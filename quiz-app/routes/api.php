<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\QuestionController;
use App\Http\Controllers\Api\OptionController;
use App\Http\Controllers\Api\UserAnswerController;
use App\Http\Controllers\Api\QuizResultController;

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [UserController::class, 'user']);

    Route::middleware('role:admin,user')->group(function () {
        Route::get('/categories', [CategoryController::class, 'index']);
        Route::get('/categories/{category}', [CategoryController::class, 'show']);
        Route::get('/questions', [QuestionController::class, 'index']);
        Route::get('/questions/{question}', [QuestionController::class, 'show']);
        Route::get('/options', [OptionController::class, 'index']);
        Route::post('/quiz/submit', [UserAnswerController::class, 'submit']);
        Route::post('/quiz/result', [QuizResultController::class, 'submitQuiz']);
    });
    
    Route::middleware('role:admin')->group(function () {
        Route::post('/categories', [CategoryController::class, 'store']);
        Route::put('/categories/{category}', [CategoryController::class, 'update']);
        Route::delete('/categories/{category}', [CategoryController::class, 'destroy']);
        Route::post('/questions', [QuestionController::class, 'store']);
        Route::put('/questions/{question}', [QuestionController::class, 'update']);
        Route::delete('/questions/{question}', [QuestionController::class, 'destroy']);
        Route::post('/options', [OptionController::class, 'store']);
    });
    Route::post('/logout', [UserController::class, 'logout']);
});
