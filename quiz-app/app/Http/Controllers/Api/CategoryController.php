<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\QuestionResource;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        return response()->json([
            'categories' => CategoryResource::collection($categories),
        ]);
    }

    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:3|max:255',
        ]);
        
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        
        $category = Category::create($request->all());
        
        return response()->json([
            'message' => 'Category created successfully.',
            'category' => new CategoryResource($category)
        ], 201);


    }

    public function show(Category $category) {
        return response()->json([
            'category' => new CategoryResource($category),
            'questions' => QuestionResource::collection($category->questions)
        ]);
    }

    public function update(Request $request, Category $category) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:3|max:255',
        ]);
        
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        
        $category->update($request->all());
        
        return response()->json([
            'message' => 'Category updated successfully.',
            'category' => new CategoryResource($category)
        ]);
    }

    public function destroy(Category $category) {
        $category->delete();
        return response()->json([
            'message' => 'Category deleted successfully.'
        ]);
    }
}
