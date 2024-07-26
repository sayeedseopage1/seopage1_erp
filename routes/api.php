<?php

use Carbon\Carbon;
use App\Models\Deal;
use App\Models\Lead;
use App\Models\Task;
use App\Models\Contract;
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

    $startDate = Carbon::parse('2023-06-01')->startOfMonth();
    $endDate = Carbon::parse('2023-06-31')->endOfMonth();
    $salesId = 221;

    $dealWithSaleIdDate = Deal::where('added_by', $salesId)->whereBetween('created_at', [$startDate, $endDate]);

    $dealWithSaleIdDateClone = clone $dealWithSaleIdDate;
    $dealWithSaleIdDatePartiallyFinishedClone = clone $dealWithSaleIdDate;
    $dealWithSaleIdDateDeniedClone = clone $dealWithSaleIdDate;

    $this->no_of_won_deals_count = $dealWithSaleIdDateClone->get();


    $this->no_of_won_deals_value = $dealWithSaleIdDateClone->sum('amount');

    $this->canceled_project_count = $dealWithSaleIdDatePartiallyFinishedClone->with('project')
        ->whereRelation('project', 'status', 'partially finished')
        ->orWhereRelation('project', 'status', 'canceled')
        ->get();

    $this->rejected_project_count = $dealWithSaleIdDateDeniedClone->with('project')->where('deals.status', '!=', 'Denied')->get();

    // if (count($this->no_of_won_deals_count) > 0) {
    //     $this->avg_deal_amount = $this->no_of_won_deals_value / count($this->no_of_won_deals_count);
    //     $this->finished_project_ratio = count($this->finished_project_count) / count($this->no_of_won_deals_count);
    //     $this->canceled_project_ratio = count($this->canceled_project_count) / count($this->no_of_won_deals_count);
    //     $this->rejected_project_ratio = count($this->rejected_project_count) / count($this->no_of_won_deals_count);

    // } else {
    //     $this->avg_deal_amount = 0;
    //     $this->finished_project_ratio = 0;
    //     $this->canceled_project_ratio = 0;
    //     $this->rejected_project_ratio = 0;

    // }

    $this->country_wise_won_deals_count = Deal::
        join('users as client', 'client.id', 'deals.client_id')
        ->where('deals.added_by', $salesId)
        ->whereBetween('deals.created_at', [$startDate, $endDate])
        ->groupBy('client.country_id')
        ->where('deals.status', '!=', 'Denied')
        ->get();

    dd($this->canceled_project_count, $this->rejected_project_count, $this->country_wise_won_deals_count);

});

// ApiRoute::group(['namespace' => 'App\Http\Controllers'], function () {
//     ApiRoute::get('purchased-module', ['as' => 'api.purchasedModule', 'uses' => 'HomeController@installedModule']);
// });
Route::get('/leads', [LeadController::class, 'index']);
Route::get('/projecttimelogs', [ProjectController::class, 'ProjectTimelog']);
