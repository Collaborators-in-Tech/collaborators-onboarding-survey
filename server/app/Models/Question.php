<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Question extends Model
{
    use HasFactory;

    protected $fillable = [
        'form_id',
        'question_text',
        'description',
        'type',
        'depends_on_question_id',
        'depending_value',
        'sort_order',
        'is_required',
        'options'
    ];

    protected $casts = [
        'options' => 'array',
        'is_required' => 'boolean'
    ];

    public function form(): BelongsTo
    {
        return $this->belongsTo(Form::class);
    }

    public function dependentQuestion(): BelongsTo
    {
        return $this->belongsTo(Question::class, 'depends_on_question_id');
    }

    public function answers(): HasMany
    {
        return $this->hasMany(FormSubmissionAnswer::class);
    }

    // Relationship for dependent questions
    public function dependentQuestions()
    {
        return $this->hasMany(Question::class, 'depends_on_question_id');
    }
}
