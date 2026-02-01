<?php

namespace App\Http\Controllers\Api;

use App\Models\UserAnswer;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserAnswerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function submit(Request $request)
    {
        $userId = auth()->id();

        foreach ($request->answers as $answer) {
            UserAnswer::updateOrCreate(
                [
                    'user_id' => $userId,
                    'question_id' => $answer['question_id'],
                ],
                [
                    'option_id' => $answer['option_id'],
                ]
            );
        }

        return response()->json([
            'message' => 'Jawaban berhasil disimpan'
        ]);
    }
}
