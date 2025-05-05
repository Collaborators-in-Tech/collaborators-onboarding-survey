
<?php

use App\Http\Controllers\AnswersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FormController;

Route::get('/form/questions',[FormController::class,'getQuestions']);
Route::post('/form/answers',[AnswersController::class,'postAnswers']);
Route::get('/form/answers',[AnswersController::class,'getAnswers']);
