<?php

use Carbon\Carbon;
use App\Models\Task;
use App\Models\TaskHistory;
use App\Models\TaskRevision;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Illuminate\Database\Eloquent\Builder;
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


Route::get('/test-route-leadNumberOfSubmittedTasks', function () {

    $startDate = Carbon::parse('2024-05-01')->startOfMonth();
    $endDate = Carbon::parse('2024-05-31')->endOfMonth();
    $devId = 2380;


    $taskHistoryWithDateAndId = TaskHistory::whereBetween('created_at', [$startDate, $endDate])
        ->where('user_id', $devId)
        ->where('board_column_id', 6)
        // ->doesntHave('task.revisions')
        ->groupBy('task_id')
        ->get();

    $number_of_tasks = DB::table('task_history')
        ->select('task_id', DB::raw('MIN(created_at) as min_created_at'))
        ->where('board_column_id', 6)
        ->where('user_id', $devId)
        ->whereDate('created_at', '>=', $startDate)
        ->whereDate('created_at', '<=', $endDate)
        ->groupBy('task_id')
        ->get();
    // dd($number_of_tasks);

    $tasks_submitted = [];

    foreach ($number_of_tasks as $i1) {
        $min_sub = DB::table('task_history')
            ->select('task_id', DB::raw('MIN(created_at) as min_created_at'))
            ->where('board_column_id', 6)
            ->where('user_id', $devId)
            ->where('task_id', $i1->task_id)
            ->first();
        dump($i1->min_created_at, $min_sub->min_created_at);
        if ($min_sub->min_created_at >= $startDate && $min_sub->min_created_at <= $endDate) {
            dump($i1->task_id);
            array_push($tasks_submitted, $i1->task_id);
        }
    }

    // $submit_number_of_tasks_in_this_month_lead_data = Task::with('project.pm', 'project.client', 'firstSubTask')->find($tasks_submitted);
    $number_of_tasks_submitted = count($tasks_submitted);
    dd($number_of_tasks_submitted, $taskHistoryWithDateAndId->toArray());
    return [
        $number_of_tasks_submitted,
        // $submit_number_of_tasks_in_this_month_lead_data
    ];

});



Route::get('/test-route', function () {

    $startDate = Carbon::parse('2024-05-01')->startOfMonth();
    $endDate = Carbon::parse('2024-05-31')->endOfMonth();
    $devId = 2252;

    $task_id = TaskHistory::whereBetween('created_at', [$startDate, $endDate])
        ->where('user_id', $devId)
        ->whereHas('task', function ($q) {
            $q->whereNull('subtask_id');
        })->where('board_column_id', 4)
        ->groupBy('task_id')
        ->get()->pluck('task_id')->toArray();

    dd($task_id);
    $completed_tasks_by_lead_developer = Task::with(
        'firstHistoryForDevReview',
        'project.pm:id,name',
        'project.client:id,name',
        'project:id,pm_id,client_id',
    )->find($task_id);

    $percentage_of_tasks_where_deadline_was_missed_data = [];

    foreach ($completed_tasks_by_lead_developer as $task) {
        dd($task->due_date, $task->firstHistoryForDevReview->created_at);
        if (!Carbon::parse($task->due_date)->greaterThanOrEqualTo(Carbon::parse($task->firstHistoryForDevReview->created_at)->toDateString())) {
            array_push($percentage_of_tasks_where_deadline_was_missed_data, $task);
        }
    }

    $percentage_of_tasks_where_deadline_was_missed = 0;
    if (count($percentage_of_tasks_where_deadline_was_missed_data)) {
        $percentage_of_tasks_where_deadline_was_missed = round((count($percentage_of_tasks_where_deadline_was_missed_data) / $completed_tasks_by_lead_developer->count()) * 100, 2);
    }

    dd(
        $percentage_of_tasks_where_deadline_was_missed,
        $percentage_of_tasks_where_deadline_was_missed_data
    );


    // dd($percentage_of_tasks_where_given_estimated_time_was_missed_with_revision_data);

    // dd($taskHistoryWithDateAndId);



});

// ApiRoute::group(['namespace' => 'App\Http\Controllers'], function () {
//     ApiRoute::get('purchased-module', ['as' => 'api.purchasedModule', 'uses' => 'HomeController@installedModule']);
// });
Route::get('/leads', [LeadController::class, 'index']);
Route::get('/projecttimelogs', [ProjectController::class, 'ProjectTimelog']);
