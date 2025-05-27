
<?php

use App\Http\Controllers\AnswersController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FormController;

// Route::get('/form/questions', [FormController::class, 'getQuestions']);
// Route::middleware('auth:sanctum')->get('/form/question/{formId}/{questionId}', [FormController::class, 'getQuestion']);
// Route::middleware('auth:sanctum')->put('/form/question/{formId}/{questionId}', [FormController::class, 'updateQuestion']);

// Route::post('/form/answers', [AnswersController::class, 'postAnswers']);
// Route::middleware('auth:sanctum')->get('/form/answers', [AnswersController::class, 'getAnswers']);

Route::prefix('form')->group(function () {
    // Publicly accessible
    Route::get('/questions', [FormController::class, 'getQuestions']);
    Route::post('/answers', [AnswersController::class, 'postAnswers']);

    // Routes that require authentication
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/question/{formId}/{questionId}', [FormController::class, 'getQuestion']);
        Route::put('/question/{formId}/{questionId}', [FormController::class, 'updateQuestion']);
        Route::get('/answers', [AnswersController::class, 'getAnswers']);
    });
});


Route::prefix('admin')->group(function () {
    Route::post('/register', [AuthController::class, 'register'])->middleware(['auth:sanctum','superadmin']);
    Route::delete('/delete-admin/{id}',[AuthController::class,'deleteAdmin'])->middleware('auth:sanctum','superadmin');
    Route::get('/admin-list',[AuthController::class,'getAdmins'])->middleware('auth:sanctum');
    Route::post('/login', [AuthController::class, 'login'])->name('login');
    // Route::get('/me', [AuthController::class, 'me'])->middleware('auth:sanctum');
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum')->name('logout');
    Route::post('/update-password', [AuthController::class, 'updatePassword'])->middleware('auth:sanctum');
    Route::delete('/delete-user/{id}', [AnswersController::class, 'deleteUser'])->middleware('auth:sanctum');
});
