<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormSubmission extends Model
{
    use HasFactory;
    protected $fillable = [
        'form_id',
        'email',
        'consent_given'
        
    ];
    public function form()
    {
        return $this->belongsTo(Form::class);
    }
    public function formSubmissionAnswers(){
        return $this->hasMany(FormSubmissionAnswer::class);
    }
}
