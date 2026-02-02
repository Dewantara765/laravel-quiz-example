<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Category extends Model
{
    /** @use HasFactory<\Database\Factories\CategoryFactory> */
    use HasFactory;

    protected $primaryKey = 'id_category';

    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'name'
    ];

    public function questions()
    {
        return $this->hasMany(Question::class, 'category_id', 'id_category');
    }

    public function results()
    {
        return $this->hasMany(QuizResult::class, 'category_id', 'id_category');
    }
}
