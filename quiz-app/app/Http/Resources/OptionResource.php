<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OptionResource extends JsonResource
{
    public $status;
    public $message;
    public $resource;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id_option' => $this->id_option,
            'option_text' => $this->option_text,
            'is_correct' => (bool) $this->is_correct,
            'question' => new QuestionResource($this->whenLoaded('question')),

        ];
    }
}
