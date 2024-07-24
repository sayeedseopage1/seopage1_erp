<?php

use Carbon\Carbon;
use App\Models\Deal;
use App\Models\Lead;
use App\Models\Task;
use App\Models\TaskHistory;
use Illuminate\Http\Request;
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

    $startDate = Carbon::parse('2024-06-01')->startOfMonth();
    $endDate = Carbon::parse('2024-06-31')->endOfMonth();
    $salesId = 217;

    $leads_country_data = DB::table('leads')
        ->where('created_at', '>=', $startDate)
        ->where('created_at', '<', $endDate)
        // ->distinct('country')
        ->groupBy('country')
        ->get()->pluck('country')->toArray();

    $leads_country_data_db = DB::table('leads')
        ->select('country')
        ->where('created_at', '>=', $startDate)
        ->where('created_at', '<', $endDate)
        ->distinct('country')
        ->get();
    dd(
        $leads_country_data,
        $leads_country_data_db
    );



});

// ApiRoute::group(['namespace' => 'App\Http\Controllers'], function () {
//     ApiRoute::get('purchased-module', ['as' => 'api.purchasedModule', 'uses' => 'HomeController@installedModule']);
// });
Route::get('/leads', [LeadController::class, 'index']);
Route::get('/projecttimelogs', [ProjectController::class, 'ProjectTimelog']);
