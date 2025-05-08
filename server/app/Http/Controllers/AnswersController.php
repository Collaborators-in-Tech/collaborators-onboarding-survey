<?php

namespace App\Http\Controllers;

use App\Models\FormSubmission;
use App\Models\FormSubmissionAnswer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Laravel\Pail\ValueObjects\Origin\Console;

class AnswersController extends Controller
{
    public function postAnswers(Request $request){
        $validated = $request->validate([
            'email' => 'required|email',
            'consent_given' => 'required|boolean',
            'answers' => 'required|array',
        ]);
        
        $form_id = env('DEFAULT_FORM_ID');
        if (!$validated['consent_given']) {
            return response()->json([
                'error' => 'Consent of user is not given.'
            ], 400);
        }
        if(FormSubmission::where('form_id',$form_id)
            ->where('email',$validated['email'])->exists()){
            return response()->json([
                'error' => 'This email has already submitted this form'
            ],409);
         }
        $formSubmission = FormSubmission::create([
            'form_id' => $form_id,
            'email' => $validated['email'],
            'consent_given' => $validated['consent_given']
        ]);
        $answers = collect($validated['answers'])->map(function($answer,$question_id) use ($formSubmission){
            return [
                'submission_id' => $formSubmission->id,
                'question_id' => $question_id,
                'answer' => $answer,
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
        log::info($formSubmissions);
        $response = $formSubmissions->map(function ($submission) {
            return [
                'email' => $submission->email,
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

}
