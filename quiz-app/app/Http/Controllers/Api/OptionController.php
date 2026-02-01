<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Option;
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

    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'option_text' => 'required|string|min:3|max:255',
            'is_correct' => 'required|boolean',
            'question_id' => 'required|exists:questions,id_question',
        ]);

        if($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $is_correct = $request->boolean('is_correct');

        $option = Option::create([
            'option_text' => $request->option_text,
            'is_correct' => $is_correct,
            'question_id' => $request->question_id,
        ]);


        return response()->json([
            'message' => 'Option created successfully.',
            'option' => new OptionResource($option)
        ],201);
        

    }

    public function show(Option $option){
        return response()->json([
            'option' => new OptionResource($option),
        ]);
    }
}
