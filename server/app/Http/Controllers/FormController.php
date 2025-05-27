<?php

namespace App\Http\Controllers;

use App\Models\Form;
use App\Models\Question;
use Illuminate\Http\Request;

class FormController extends Controller
{
    public function getQuestions($formId){
        // $form_id = env('DEFAULT_FORM_ID');
        $form = Form::findOrFail($formId);
        $questions = Question::where('form_id',$formId)
        ->orderBy('sort_order')
        ->get();
        return response()->json([
            'form' => $form,
            'questions'=>$questions
        ]);

    }
    public function getQuestion($formId, $questionId)
    {
        $question = Question::where('form_id', $formId)->where('id', $questionId)->first();
    
        if (!$question) {
            return response()->json(['message' => 'Question not found'], 404);
        }
        return response()->json($question);
    }
    public function updateQuestion(Request $request,$formId, $questionId){
        $question = Question::where('form_id',$formId)->where('id',$questionId)->first();
        $question->update([
            'question_text' => $request->question_text,
            'type' => $request->type,
            'is_required' => $request->is_required,
            'options' => $request->options,
            'sort_order' => $request->sort_order,
            'depends_on_question_id' => $request->depends_on_question_id,
            'depending_value' => $request->depending_value,
            'updated_at' => now(),
        ]);
        return response()->json($question);
    
    }
}
