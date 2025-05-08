
<?php

use App\Http\Controllers\AnswersController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FormController;

Route::get('/form/questions',[FormController::class,'getQuestions']);
Route::post('/form/answers',[AnswersController::class,'postAnswers']);
Route::get('/form/answers',[AnswersController::class,'getAnswers']);

Route::post("/register",[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class,'logout']);
Route::middleware('auth:sanctum')->post('/update-password',[AuthController::class,'updatePassword']);