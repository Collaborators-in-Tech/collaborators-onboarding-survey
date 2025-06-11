
<?php

use App\Http\Controllers\AnswersController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FormController;

Route::prefix('form')->group(function () {
    // Publicly accessible
    Route::get('/', [FormController::class, 'getForms']);
    Route::get('/{formId}/questions', [FormController::class, 'getQuestions']);
    Route::post('/{formId}/answers', [AnswersController::class, 'postAnswers']);

    // Routes that require authentication
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/question/{formId}/{questionId}', [FormController::class, 'getQuestion']);
        Route::put('/question/{formId}/{questionId}', [FormController::class, 'updateQuestion']);
        Route::delete('/question/{formId}/{questionId}', [FormController::class, 'deleteQuestion']);
        Route::get('/answers', [AnswersController::class, 'getAnswers']);
        Route::post('/question/{formId}',[FormController::class,'storeQuestion']);
    });
});


Route::prefix('admin')->group(function () {
    Route::post('/register', [AuthController::class, 'register'])->middleware(['auth:sanctum','superadmin']);
    Route::delete('/delete-admin/{id}',[AuthController::class,'deleteAdmin'])->middleware('auth:sanctum','superadmin');
    Route::get('/admin-list',[AuthController::class,'getAdmins'])->middleware('auth:sanctum');
    Route::post('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum')->name('logout');
    Route::post('/update-password', [AuthController::class, 'updatePassword'])->middleware('auth:sanctum');

    Route::delete('/delete-user/{id}', [AnswersController::class, 'deleteUser'])->middleware('auth:sanctum');

    //for creating new form
    Route::post('/new-form', [FormController::class, 'createForm'])->middleware('auth:sanctum');
   

});
