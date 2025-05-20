
<?php

use App\Http\Controllers\AnswersController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FormController;

Route::get('/form/questions', [FormController::class, 'getQuestions']);
Route::middleware('auth:sanctum')->get('/form/question/{formId}/{questionId}', [FormController::class, 'getQuestion']);
Route::middleware('auth:sanctum')->put('/form/question/{formId}/{questionId}', [FormController::class, 'updateQuestion']);

Route::post('/form/answers', [AnswersController::class, 'postAnswers']);
Route::middleware('auth:sanctum')->get('/form/answers', [AnswersController::class, 'getAnswers']);

Route::post("/register", [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login'])->name('login');  // Add name('login')
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout'])->name('logout');
Route::middleware('auth:sanctum')->post('/update-password', [AuthController::class, 'updatePassword']);
Route::middleware('auth:sanctum')->delete('/delete-user/{id}', [AnswersController::class, 'deleteUser']);