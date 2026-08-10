<?php

use App\Http\Controllers\Api\WidgetApiController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1/widget')->group(function () {
    Route::post('/init', [WidgetApiController::class, 'init']);
    Route::post('/chat', [WidgetApiController::class, 'chat']);
});
