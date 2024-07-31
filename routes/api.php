<?php

use Carbon\Carbon;
use App\Models\Deal;
use App\Models\Attendance;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\LeadController;
use App\Http\Controllers\Api\ProjectController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/test-route', function () {

    $startDate     = Carbon::parse('2023-06-01')->startOfMonth();
    $endDate       = Carbon::parse('2023-06-31')->endOfMonth();
    $salesId       = 221;


    dd($salesId);
});

// ApiRoute::group(['namespace' => 'App\Http\Controllers'], function () {
//     ApiRoute::get('purchased-module', ['as' => 'api.purchasedModule', 'uses' => 'HomeController@installedModule']);
// });
Route::get('/leads', [LeadController::class, 'index']);
Route::get('/projecttimelogs', [ProjectController::class, 'ProjectTimelog']);
