<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('app');
});

Route::get('/{pathMatch}', function () {
    return view('app');
})->where('pathMatch', '.*');
