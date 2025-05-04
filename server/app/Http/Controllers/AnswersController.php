<?php

namespace App\Http\Controllers;

use App\Models\FormSubmission;
use App\Models\FormSubmissionAnswer;
use Illuminate\Http\Request;

class AnswersController extends Controller
{
    public function postAnswers(Request $request){
        $validated = $request->validate([
            'email' => 'required|email',
            'consent_given' => 'required|boolean',
            'answers' => 'required|array',
        ]);

        $form_id = 1;
        if (!$validated['consent_given']) {
            return response()->json([
                'error' => 'Consent of user is not given.'
            ], 400);
        }
        $formSubmission = FormSubmission::create([
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
}
