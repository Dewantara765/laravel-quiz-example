<?php

namespace App\Http\Controllers\Api;

use App\Models\Question;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\QuestionResource;
use App\Http\Resources\OptionResource;
use Illuminate\Support\Facades\Validator;

class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $questions = Question::with('category')->get();
        return response()->json([
            'questions' => QuestionResource::collection($questions),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'question' => 'required|string|min:3|max:255',
            'category_id' => 'required|exists:categories,id_category',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $question = Question::create($request->all());

        return response()->json([
            'message' => 'Question created successfully.',
            'question' => new QuestionResource($question)
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Question $question)
    {
        return response()->json([
            'question' => new QuestionResource($question),
            'options' => OptionResource::collection($question->options)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Question $question)
    {
         $validator = Validator::make($request->all(), [
            'question' => 'required|string|min:3|max:255',
            'category_id' => 'required|exists:categories,id_category',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $question->update($request->all());

        return response()->json([
            'message' => 'Question updated successfully.',
            'question' => new QuestionResource($question)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Question $question)
    {
        $question->delete();
        return response()->json([
            'message' => 'Question deleted successfully.',
        ]);
    }
}
