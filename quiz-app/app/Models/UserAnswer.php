<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserAnswer extends Model
{
    /** @use HasFactory<\Database\Factories\UserAnswerFactory> */
    use HasFactory;

    protected $primaryKey = 'id_user_answer';

    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'user_id',
        'question_id',
        'option_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id_user');
    }

    public function question()
    {
        return $this->belongsTo(Question::class, 'question_id', 'id_question');
    }

    public function option()
    {
        return $this->belongsTo(Option::class, 'option_id', 'id_option');
    }

}
