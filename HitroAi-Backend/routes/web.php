<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes for React SPA
|--------------------------------------------------------------------------
|
| This will catch all frontend routes and serve React's index.html
| which lives inside the Laravel public/ directory after you build React.
|
*/

Route::get('/{any}', function () {
    return file_get_contents(public_path('index.html'));
})->where('any', '.*');
