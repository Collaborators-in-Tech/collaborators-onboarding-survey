<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $fillable = [
        'form_id',
        'question_text',
        'type',
        'is_required',
        'sort_order',
        'depends_on_question_id',
        'depending_value',

    ];
    public function form(){
        return $this->belongsTo(Form::class);

    }
    // Relationship for dependent question
    public function parentQuestion()
    {
        return $this->belongsTo(Question::class, 'depends_on_question_id');
    }

    // Relationship for dependent questions
    public function dependentQuestions()
    {
        return $this->hasMany(Question::class, 'depends_on_question_id');
    }
}
