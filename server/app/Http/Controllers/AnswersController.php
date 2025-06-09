<?php

namespace App\Http\Controllers;

use App\Models\FormSubmission;
use App\Models\FormSubmissionAnswer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Laravel\Pail\ValueObjects\Origin\Console;

class AnswersController extends Controller
{
    public function postAnswers(Request $request,$formId){
        info("__________post answers is here________");
        info($request->all());
        $validated = $request->validate([
            'email' => 'required|email',
            'consent_given' => 'required|boolean',
            'answers' => 'required|array',
        ]);     
        info("  before consent vlidation....");
        // $form_id = env('DEFAULT_FORM_ID');
        if (!$validated['consent_given']) {
            return response()->json([
                'error' => 'Consent of user is not given.'
            ], 400);
        }
        info("  checking for unique email.........>>>>>");
        if(FormSubmission::where('form_id',$formId)
            ->where('email',$validated['email'])->exists()){
            return response()->json([
                'error' => 'This email has already submitted this form'
            ],409);
         }
         info("before---form_submission create");
         
        $formSubmission = FormSubmission::create([
            'form_id' => $formId,
            'email' => $validated['email'],
            'consent_given' => $validated['consent_given']
        ]);
        info("form_submission");
        info($formSubmission);
        $answers = collect($validated['answers'])->map(function($answer,$question_id) use ($formSubmission){
            return [
                'submission_id' => $formSubmission->id,
                'question_id' => $question_id,
                'answer' => json_encode($answer),
                'created_at' => now(),
                'updated_at' => now(),
            ];
        })->values()->all();
        FormSubmissionAnswer::insert($answers);
        return response()->json([
            'message' => 'Form Submitted successfully!',
            'Form_submission_id' => $formSubmission->id
        ]);

    }
    public function getAnswers(){
        log::info("get request for all the answers");
        $form_id = env('DEFAULT_FORM_ID');
        $formSubmissions = FormSubmission::with(['answers.question'])
                            ->where('form_id',$form_id)
                            ->get();
        log::info("all the form submissions");
        $response = $formSubmissions->map(function ($submission) {
            info("------ submission ------");
            info($submission);
        
            $nameAnswer = $submission->answers->first()?->answer ?? 'N/A';
        
            return [
                'id' => $submission->id,
                'email' => $submission->email,
                'name' => $nameAnswer,
                'consent_given' => $submission->consent_given,
                'answers' => $submission->answers->map(function ($answer) {
                    return [
                        'question' => $answer->question->question_text ?? 'N/A',
                        'answer' => $answer->answer,
                    ];
                }),
            ];
        });
        
        

        return response()->json($response);
    }
    public function deleteUser($id) {
        $submission  = FormSubmission::find($id);
        if (!$submission) {
            return response()->json(['message' => 'User not found'], 404);
        }
    
        $submission->delete();
    
        return response()->json(['message' => 'User deleted successfully']);
    }

}
