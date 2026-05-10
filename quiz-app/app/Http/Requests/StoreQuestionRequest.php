<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreQuestionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'question' => 'required|string|min:3|max:255',
            'category_id' => 'required|exists:categories,id_category',

            'options' => 'required|array|size:4',
            'options.*.option_text' => 'required|string|max:255',
            'options.*.is_correct' => 'required|boolean',
        ];
    }

    public function after(): array
    {
        return [
            function ($validator) {
                $correctCount = collect($this->input('options', []))
                    ->where('is_correct', true)
                    ->count();

                if ($correctCount !== 1) {
                    $validator->errors()->add(
                        'options',
                        'Question harus memiliki tepat satu jawaban benar.'
                    );
                }
            }
        ];
    }
}
