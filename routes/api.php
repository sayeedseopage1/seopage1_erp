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
    $LedDevId = 2252;
    // $devId = 224;

    $taskHistoryWithDateAndId = TaskHistory::whereBetween('created_at', [$startDate, $endDate])
        ->where('user_id', $LedDevId)
        ->where('board_column_id', 6)
        ->groupBy('task_id')
        ->get()
        ->pluck('task_id')->toArray();

    $taskFirstSubmitted = TaskHistory::where('board_column_id', 6)
        ->groupBy('task_id')
        ->whereIn('task_id', $taskHistoryWithDateAndId)
        ->select('id', 'task_id', 'created_at', 'board_column_id')
        ->get();

    $taskId = [];
    foreach ($taskFirstSubmitted as $task) {
        if ($task->created_at >= $startDate && $task->created_at <= $endDate) {
            array_push($taskId, $task->task_id);
        }
    }

    $tasksUserInDate = Task::with(
        'taskType:id,task_id,task_type',
        'stat:id,label_color,column_name',
        'project:id,pm_id,client_id',
        'project.client:id,name',
        'submissions',
    )->select('id', 'created_at', 'heading', 'board_column_id', 'start_date', 'project_id')->find($taskId);

    dd($tasksUserInDate);


    $number_of_tasks = DB::table('task_history')
        ->select('task_id', DB::raw('MIN(created_at) as min_created_at'))
        ->where('board_column_id', 6)
        ->where('user_id', $devId)
        ->whereDate('created_at', '>=', $startDate)
        ->whereDate('created_at', '<=', $endDate)
        ->groupBy('task_id')
        ->get();


    $task = [];

    foreach ($number_of_tasks as $i1) {
        $min_sub = DB::table('task_history')
            ->select('task_id', DB::raw('MIN(created_at) as min_created_at'))
            ->where('board_column_id', 6)
            ->where('user_id', $devId)
            ->where('task_id', $i1->task_id)
            ->first();
        // dump($min_sub->min_created_at >= $startDate && $min_sub->min_created_at < $endDate, $i1->task_id);
        // dump($min_sub->min_created_at , $startDate, $min_sub->min_created_at , $endDate);
        if ($min_sub->min_created_at >= $startDate && $min_sub->min_created_at < $endDate) {
            array_push($task, $i1->task_id);
        }
    }

    dd($task, $taskId);
    // $number_of_tasks_submitted = count($task);

    $test = array();
    $number_of_tasks_submitted_primary = 0;
    $number_of_tasks_submitted_secondary = 0;
    $number_of_tasks_submitted_others = 0;
    foreach ($task as $i1) {
        $type = DB::table('task_types')
            ->where('task_id', $i1)
            ->select('page_type_name', 'page_type', 'task_type') // Attempt to select all potential columns at once
            ->first();

        // Check which column has a non-null value in the priority order
        if (!is_null($type)) {
            if (!is_null($type->page_type_name)) {
                $taskType = $type->page_type_name;
            } elseif (!is_null($type->page_type)) {
                $taskType = $type->page_type;
            } elseif (!is_null($type->task_type)) {
                $taskType = $type->task_type;
            } else {
                // Handle the case where none of the expected columns have a value
                $taskType = null; // or some default value
            }
        } else {
            // Handle the case where no record was found
            $taskType = null; // or some default value
        }

        array_push($test, $i1);
        if ($taskType == "Primary Page Development") {
            $number_of_tasks_submitted_primary++;
        } elseif ($taskType == "Secondary Page Development") {
            $number_of_tasks_submitted_secondary++;
        } else {
            $number_of_tasks_submitted_others++;
        }
    }

});

// ApiRoute::group(['namespace' => 'App\Http\Controllers'], function () {
//     ApiRoute::get('purchased-module', ['as' => 'api.purchasedModule', 'uses' => 'HomeController@installedModule']);
// });
Route::get('/leads', [LeadController::class, 'index']);
Route::get('/projecttimelogs', [ProjectController::class, 'ProjectTimelog']);
