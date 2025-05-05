<?php

namespace App\Http\Controllers;

use App\Models\Form;
use App\Models\Question;
use Illuminate\Http\Request;

class FormController extends Controller
{
    public function getQuestions(){
        $form_id = env('DEFAULT_FORM_ID');
        $form = Form::findOrFail($form_id);
        $questions = Question::where('form_id',$form_id)
        ->orderBy('sort_order')
        ->get();
        return response()->json([
            'form' => $form,
            'questions'=>$questions
        ]);

    }
}
