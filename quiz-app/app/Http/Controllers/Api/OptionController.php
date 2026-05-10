<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Option;
use App\Models\Question;
use App\Http\Resources\OptionResource;
use Illuminate\Support\Facades\Validator;

class OptionController extends Controller
{
    public function index() {
        $options = Option::with('question')->get();

        return response()->json([
            'options' => OptionResource::collection($options),
        ]);

    }
public function store(Request $request)
{
    $validator = Validator::make($request->all(), [
        'question_id' => 'required|exists:questions,id_question',
        'option_text' => 'required|string|max:255',
        'is_correct' => 'required|boolean',
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    $question = Question::withCount('options')
        ->findOrFail($request->question_id);

    if ($question->options_count >= 4) {
        return response()->json([
            'message' => 'Question hanya boleh memiliki 4 options.'
        ], 422);
    }

    $option = $question->options()->create([
        'option_text' => $request->option_text,
        'is_correct' => $request->is_correct,
    ]);

    return response()->json([
            'message' => 'Option created successfully.',
            'option' => new OptionResource($option)
        ],201);
}

    public function update(Request $request, Option $option){
        $validator = Validator::make($request->all(), [
            'option_text' => 'sometimes|required|string|min:3|max:255',
            'is_correct' => 'sometimes|required|boolean',
            'question_id' => 'sometimes|required|exists:questions,id_question',
        ]);

        if($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        if($request->has('option_text')){
            $option->option_text = $request->option_text;
        }
        if($request->has('is_correct')){
            $option->is_correct = $request->boolean('is_correct');
        }
        if($request->has('question_id')){
            $option->question_id = $request->question_id;
        }

        $option->save();

        return response()->json([
            'message' => 'Option updated successfully.',
            'option' => new OptionResource($option),
        ]);
    }

    public function destroy(Option $option){
        $option->delete();

        return response()->json([
            'message' => 'Option deleted successfully.',
        ]);
    }
}
