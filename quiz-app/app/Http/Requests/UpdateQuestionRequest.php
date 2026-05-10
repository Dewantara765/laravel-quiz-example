<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateQuestionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'question' => 'required|string|min:3|max:255',
            'category_id' => 'required|exists:categories,id_category',

            'options' => 'required|array|size:4',
            'options.*.id_option' => 'required|integer',
            'options.*.option_text' => 'required|string|max:255',
            'options.*.is_correct' => 'required|boolean',
        ];
    }

    public function after(): array
    {
        return [
            function ($validator) {
                $question = $this->route('question');

                $options = collect($this->input('options', []));

                $correctCount = $options
                    ->where('is_correct', true)
                    ->count();

                if ($correctCount !== 1) {
                    $validator->errors()->add(
                        'options',
                        'Question harus memiliki tepat satu jawaban benar.'
                    );
                }

                $existingIds = $question->options()
                    ->pluck('id_option')
                    ->sort()
                    ->values();

                $incomingIds = $options
                    ->pluck('id_option')
                    ->sort()
                    ->values();

                if (!$existingIds->equalTo($incomingIds)) {
                    $validator->errors()->add(
                        'options',
                        'Option tidak cocok dengan question ini.'
                    );
                }
            }
        ];
    }
}