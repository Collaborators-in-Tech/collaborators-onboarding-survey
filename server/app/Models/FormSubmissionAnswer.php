<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormSubmissionAnswer extends Model
{
    use HasFactory;
    protected $fillable = [
        'submission_id',
        'question_id',
        'answer'
    ];
    public function formSubmission()
    {
        return $this->belongsTo(FormSubmission::class);
    }

    // Relationship to the question
    public function question()
    {
        return $this->belongsTo(Question::class);
    }
}
