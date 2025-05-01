
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FormController;

Route::get('/form/questions',[FormController::class,'getQuestions']);

