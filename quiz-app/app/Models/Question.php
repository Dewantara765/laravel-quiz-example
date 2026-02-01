<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Category;


class Question extends Model
{
    /** @use HasFactory<\Database\Factories\QuestionFactory> */
    use HasFactory;

    protected $primaryKey = 'id_question';

    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'question',
        'category_id'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id_category');
    }

    public function options()
    {
        return $this->hasMany(Option::class, 'question_id', 'id_question');
    }

}
