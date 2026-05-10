<?php

namespace App\Http\Controllers\Api;

use App\Models\Question;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\StoreQuestionRequest;
use App\Http\Resources\QuestionResource;
use App\Http\Resources\OptionResource;
use App\Http\Resources\CategoryResource;
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

        'options' => 'required|array|size:4',
        'options.*.option_text' => 'required|string|max:255',
        'options.*.is_correct' => 'required|boolean',
    ]);

    $validator->after(function ($validator) use ($request) {
        $correctCount = collect($request->input('options', []))
            ->where('is_correct', true)
            ->count();

        if ($correctCount !== 1) {
            $validator->errors()->add(
                'options',
                'Question harus memiliki tepat satu jawaban benar.'
            );
        }
    });

    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    $validated = $validator->validated();

    $question = Question::create([
        'question' => $validated['question'],
        'category_id' => $validated['category_id'],
    ]);

    $question->options()->createMany($validated['options']);

    return response()->json([
        'message' => 'Question created successfully.',
        'question' => new QuestionResource($question->load('options'))
    ], 201);
}

    /**
     * Display the specified resource.
     */
    public function show(Question $question)
    {
        return response()->json([
            'question' => new QuestionResource($question),
            'category' => new CategoryResource($question->category),
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

        'options' => 'required|array|size:4',
        'options.*.option_text' => 'required|string|max:255',
        'options.*.is_correct' => 'required|boolean',
    ]);

    $validator->after(function ($validator) use ($request) {
        $correctCount = collect($request->input('options', []))
            ->where('is_correct', true)
            ->count();

        if ($correctCount !== 1) {
            $validator->errors()->add(
                'options',
                'Question harus memiliki tepat satu jawaban benar.'
            );
        }
    });

    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    $validated = $validator->validated();

    $question->update([
        'question' => $validated['question'],
        'category_id' => $validated['category_id'],
    ]);

    $question->options()->delete();

    $question->options()->createMany($validated['options']);

    return response()->json([
        'message' => 'Question updated successfully.',
        'question' => new QuestionResource(
            $question->load('options')
        )
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
