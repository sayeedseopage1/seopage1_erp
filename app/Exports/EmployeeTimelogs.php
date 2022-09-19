<?php

namespace App\Exports;

use App\Http\Controllers\AccountBaseController;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class EmployeeTimelogs extends AccountBaseController implements FromView, ShouldAutoSize, WithStyles
{

    public function __construct()
    {
        parent::__construct();
        $this->middleware(function ($request, $next) {
            abort_403(!in_array('timelogs', $this->user->modules));
            return $next($request);
        });
    }

    public function view(): View
    {
        $this->startDate = $startDate = Carbon::createFromFormat(global_setting()->date_format, urldecode(request()->startDate))->toDateString();
        $this->endDate = $endDate = Carbon::createFromFormat(global_setting()->date_format, urldecode(request()->endDate))->toDateString();
        $employee = request()->employee;
        $projectId = request()->projectID;
        $this->viewTimelogPermission = user()->permission('view_timelogs');

        $this->employees = User::join('employee_details', 'users.id', '=', 'employee_details.user_id')
            ->leftJoin('project_time_logs', 'project_time_logs.user_id', '=', 'users.id');
        $where = '';

        if ($projectId != 'all') {
            $where .= ' and project_time_logs.project_id="' . $projectId . '" ';
        }

        $this->employees = $this->employees->select(
            'users.name',
            'users.id',
            DB::raw(
                "(SELECT SUM(project_time_logs.total_minutes) FROM project_time_logs WHERE project_time_logs.user_id = users.id and DATE(project_time_logs.start_time) >= '" . $startDate . "' and DATE(project_time_logs.start_time) <= '" . $endDate . "' '" . $where . "' GROUP BY project_time_logs.user_id) as total_minutes"
            )
        );

        if (!is_null($employee) && $employee !== 'all') {
            $this->employees = $this->employees->where('project_time_logs.user_id', $employee);
        }

        if (!is_null($projectId) && $projectId !== 'all') {
            $this->employees = $this->employees->where('project_time_logs.project_id', '=', $projectId);
        }

        if ($this->viewTimelogPermission == 'owned') {
            $this->employees = $this->employees->where('project_time_logs.user_id', user()->id);
        }

        if ($this->viewTimelogPermission == 'added') {
            $this->employees = $this->employees->where('project_time_logs.added_by', user()->id);
        }

        if ($this->viewTimelogPermission == 'both') {
            $this->employees = $this->employees->where(function ($q) {
                $q->where('project_time_logs.added_by', user()->id)
                    ->orWhere('project_time_logs.user_id', '=', user()->id);
            });
        }

        $this->employees = $this->employees->groupBy('project_time_logs.user_id')
            ->orderBy('users.name')
            ->get();

        return view('exports.employee_timelogs', $this->data);
    }

    // phpcs:ignore
    public function styles(Worksheet $sheet)
    {
        return [
            1    => ['font' => ['bold' => true, 'size' => 14]],
            3    => ['font' => ['bold' => true]],
        ];
    }

}
