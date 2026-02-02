<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuizResult extends Model
{
    /** @use HasFactory<\Database\Factories\QuizResultFactory> */
    use HasFactory;

    protected $primaryKey = 'id_result';

    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'user_id',
        'category_id',
        'score',
        'total_benar',
        'total_salah',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id_user');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id_category');
    }

}
