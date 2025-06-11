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
    public function storeQuestion(Request $request, $formId)
{
    $validated = $request->validate([
        'question_text'       => 'required|string|max:65535',
        'description'         => 'nullable|string',
        'type'                => 'required|in:text,email,radio,checkbox,boolean',
        'is_required'         => 'boolean',
        'options'             => 'required_if:type,radio,checkbox|array|min:1',
        'options.*'           => 'string|max:255',
        'sort_order'          => 'required|integer|min:1',
        'depends_on_question' => 'sometimes|boolean',
        'depending_value'     => 'nullable|string|max:255',
    ]);

    // Create and persist the question
    $question = Question::create([
        'form_id'  => $formId,
        ...$validated,
        'options'  => in_array($validated['type'], ['radio', 'checkbox'])
                        ? $validated['options']
                        : null,
    ]);

    return response()->json($question, 201);
}

    
    public function createForm(Request $request){
        info("_______creating form__________");
        info($request->all());
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);
     
        $form = Form::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'created_at' => now(),
        ]);

        $emailQuestion = Question::create([
            'form_id' => $form->id,
            'question_text' => 'What is your email address?',
            'description' => null,
            'type' => 'email',
            'is_required' => true,
            'sort_order' => 1, // always first
            'options' => null,
            'depends_on_question' => null,
            'depending_value' => null,
            'created_at' => now(),
        ]);

        return response()->json(['form' =>$form],201);
    }
    public function getForms(){
        $forms = Form::all();
        info("forms are here------->");
        info($forms);
        return response()->json($forms);
    }
}
