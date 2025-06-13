<?php

use App\Http\Controllers\AuthController;
use App\Mail\FormDeletedNotification;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/test-mail',function(){
    Mail::to("jane@example.com")->send(new FormDeletedNotification("form 1"));

});