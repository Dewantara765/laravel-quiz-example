<?php

namespace App\Http\Controllers\Api;

use App\Models\QuizResult;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Question;
use App\Models\UserAnswer;

class QuizResultController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function submitQuiz(Request $request)
{
    $userId = auth()->id();
    $quizId = $request->category_id;

    // total soal dalam quiz
    $totalSoal = Question::where('category_id', $quizId)->count();

    // total jawaban benar user
    $totalBenar = UserAnswer::join('options', 'user_answers.option_id', '=', 'options.id_option')
        ->join('questions', 'user_answers.question_id', '=', 'questions.id_question')
        ->where('user_answers.user_id', $userId)
        ->where('questions.category_id', $quizId)
        ->where('options.is_correct', true)
        ->count();

    $totalSalah = $totalSoal - $totalBenar;

    // hindari division by zero
    $score = $totalSoal > 0
        ? round(($totalBenar / $totalSoal) * 100, 2)
        : 0;

    QuizResult::updateOrCreate(
        [
            'user_id' => $userId,
            'category_id' => $quizId
        ],
        [
            'total_benar' => $totalBenar,
            'total_salah' => $totalSalah,
            'score' => $score
        ]
    );

    return response()->json([
        'score' => $score,
        'total_benar' => $totalBenar,
        'total_soal' => $totalSoal
    ]);
}
}
