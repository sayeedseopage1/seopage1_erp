<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Models\ProjectTimeLog;
use App\Models\ProjectTimeLogBreak;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ProjectTimelogBreakController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->middleware(function ($request, $next) {
            abort_403(!in_array('timelogs', $this->user->modules));
            return $next($request);
        });
    }

    public function edit($id)
    {
        $this->timelogBreak = ProjectTimeLogBreak::findOrFail($id);
        return view('timelog-break.edit', $this->data);
    }

    public function update(Request $request, $id)
    {
        $timeLogBreak = ProjectTimeLogBreak::findOrfail($id);
        $timeLog = ProjectTimeLog::findOrFail($timeLogBreak->project_time_log_id);
        $editTimelogPermission = user()->permission('edit_timelogs');

        abort_403(!(
            $editTimelogPermission == 'all'
        || ($editTimelogPermission == 'added' && $timeLog->added_by == user()->id)
        || ($editTimelogPermission == 'owned'
            && (($timeLog->project && $timeLog->project->client_id == user()->id) || $timeLog->user_id == user()->id)
            )
        || ($editTimelogPermission == 'both' && (($timeLog->project && $timeLog->project->client_id == user()->id) || $timeLog->user_id == user()->id || $timeLog->added_by == user()->id))
        ));

        $startTime = Carbon::parse($request->start_time)->format('Y-m-d') . ' ' . Carbon::parse($request->start_time)->format('H:i:s');
        $startTime = Carbon::createFromFormat('Y-m-d H:i:s', $startTime, $this->global->timezone)->setTimezone('UTC');
        $endTime = Carbon::parse($request->end_time)->format('Y-m-d') . ' ' . Carbon::parse($request->end_time)->format('H:i:s');
        $endTime = Carbon::createFromFormat('Y-m-d H:i:s', $endTime, $this->global->timezone)->setTimezone('UTC');

        $timeLogBreak->start_time = $startTime->format('Y-m-d H:i:s');
        $timeLogBreak->end_time = $endTime->format('Y-m-d H:i:s');

        $timeLogBreak->total_hours = (int)$endTime->diff($startTime)->format('%d') * 24 + (int)$endTime->diff($startTime)->format('%H');
  
        $timeLogBreak->total_minutes = ((int)$timeLogBreak->total_hours * 60) + (int)($endTime->diff($timeLogBreak->start_time)->format('%i'));
        $timeLogBreak->save();

        return Reply::success(__('messages.updatedSuccessfully'));
    }

    public function destroy($id)
    {
        ProjectTimeLogBreak::destroy($id);
        return Reply::success(__('messages.deleteSuccess'));
    }

}
