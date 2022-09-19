<?php

namespace App\DataTables;

use App\DataTables\BaseDataTable;
use App\Models\ProjectTimeLog;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\Html\Button;

class TimeLogReportDataTable extends BaseDataTable
{
    /**
     * Build DataTable class.
     *
     * @param mixed $query Results from query() method.
     * @return \Yajra\DataTables\DataTableAbstract
     */
    protected $timeLogFor;
    protected $isTask;
    private $editTimelogPermission;
    private $deleteTimelogPermission;

    public function __construct()
    {
        parent::__construct();
        $this->editTimelogPermission = user()->permission('edit_timelogs');
        $this->deleteTimelogPermission = user()->permission('delete_timelogs');
    }

    public function dataTable($query)
    {
        return datatables()
            ->eloquent($query)
            ->addColumn('employee_name', function ($row) {
                return $row->user->name;
            })
            ->addColumn('total_minutes', function ($row) {
                return $row->total_minutes;
            })
            ->editColumn('name', function ($row) {
                return view('components.employee', [
                    'user' => $row->user
                ]);
            })
            ->editColumn('start_time', function ($row) {
                return $row->start_time->timezone($this->global->timezone)->format($this->global->date_format . ' ' . $this->global->time_format);
            })
            ->editColumn('end_time', function ($row) {
                if (!is_null($row->end_time)) {
                    return $row->end_time->timezone($this->global->timezone)->format($this->global->date_format . ' ' . $this->global->time_format);
                }
                else {
                    return "<span class='badge badge-primary'>" . __('app.active') . '</span>';
                }
            })
            ->editColumn('total_hours', function ($row) {
                if (is_null($row->end_time)) {
                    $endTime = now();
                    $totalHours = (int)$endTime->diff($row->start_time)->format('%d') * 24 + (int)$endTime->diff($row->start_time)->format('%H');
                    $totalMinutes = (float)($totalHours * 60) + (int)($endTime->diff($row->start_time)->format('%i'));

                    $totalMinutes = $totalMinutes - $row->breaks->sum('total_minutes');
                    $timeLog = intdiv($totalMinutes, 60) . ' ' . __('app.hrs') . ' ';

                    if (($totalMinutes % 60) > 0) {
                        $timeLog .= ($totalMinutes % 60) . ' ' . __('app.mins');
                    }

                    $timeLog .= ' <i data-toggle="tooltip" data-original-title="' . __('app.active') . '" class="fa fa-hourglass-start" ></i>';
                }
                else {
                    $totalMinutes = $row->total_minutes;
                    $totalMinutes = $totalMinutes - $row->breaks->sum('total_minutes');
                    $timeLog = intdiv($totalMinutes, 60) . ' ' . __('app.hrs') . ' ';

                    if (($totalMinutes % 60) > 0) {
                        $timeLog .= ($totalMinutes % 60) . ' ' . __('app.mins');
                    }

                    if ($row->approved) {
                        $timeLog .= ' <i data-toggle="tooltip" data-original-title="' . __('app.approved') . '" class="fa fa-check-circle text-primary"></i>';
                    }
                }

                return $timeLog;
            })
            ->editColumn('earnings', function ($row) {
                if (is_null($row->hourly_rate)) {
                    return '--';
                }

                return currency_formatter($row->earnings);
            })
            ->editColumn('project', function ($row) {
                $project = '';

                if (!is_null($row->project_id)) {
                    $project .= '<a href="' . route('projects.show', [$row->project_id]) . '" class="text-darkest-grey ">' . $row->project->project_name . '</a>';
                }

                return $project;
            })
            ->editColumn('task', function ($row) {

                $task = '';

                if (!is_null($row->task_id)) {
                    $task .= '<a href="' . route('tasks.show', [$row->task_id]) . '" class="text-darkest-grey openRightModal">' . $row->task->heading . '</a>';
                }

                return $task;
            })
            ->editColumn('task_project', function ($row) {
                $name = '';

                if (!is_null($row->project_id) && !is_null($row->task_id)) {
                    $name .= '<h5 class="f-13 text-darkest-grey"><a href="' . route('tasks.show', [$row->task_id]) . '" class="openRightModal">' . $row->task->heading . '</a></h5><div class="text-muted">' . $row->project->project_name . '</div>';
                }
                else if (!is_null($row->project_id)) {
                    $name .= '<a href="' . route('projects.show', [$row->project_id]) . '" class="text-darkest-grey ">' . $row->project->project_name . '</a>';
                }
                else if (!is_null($row->task_id)) {
                    $name .= '<a href="' . route('tasks.show', [$row->task_id]) . '" class="text-darkest-grey openRightModal">' . $row->task->heading . '</a>';
                }

                return $name;
            })
            ->addIndexColumn()
            ->setRowId(function ($row) {
                return 'row-' . $row->id;
            })
            ->rawColumns(['end_time', 'action', 'project', 'task', 'task_project', 'name', 'total_hours', 'total_minutes', 'check'])
            ->removeColumn('project_id')
            ->removeColumn('task_id');
    }

    /**
     * @param ProjectTimeLog $model
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function query(ProjectTimeLog $model)
    {
        $request = $this->request();

        $projectId = $request->projectId;
        $employee = $request->employee;
        $taskId = $request->taskId;
        $approved = $request->approved;
        $invoice = $request->invoice;


        $model = $model->with('user', 'project', 'task', 'breaks', 'activeBreak');

        $model = $model->join('users', 'users.id', '=', 'project_time_logs.user_id')
            ->join('employee_details', 'users.id', '=', 'employee_details.user_id')
            ->leftJoin('designations', 'employee_details.designation_id', '=', 'designations.id')
            ->leftJoin('tasks', 'tasks.id', '=', 'project_time_logs.task_id')
            ->leftJoin('projects', 'projects.id', '=', 'project_time_logs.project_id');

        $model = $model->select('project_time_logs.id', 'project_time_logs.start_time', 'project_time_logs.end_time', 'project_time_logs.total_hours', 'project_time_logs.total_minutes', 'project_time_logs.memo', 'project_time_logs.user_id', 'project_time_logs.project_id', 'project_time_logs.task_id', 'users.name', 'users.image', 'project_time_logs.hourly_rate', 'project_time_logs.earnings', 'project_time_logs.approved', 'tasks.heading', 'projects.project_name', 'designations.name as designation_name');


        if ($request->startDate !== null && $request->startDate != 'null' && $request->startDate != '') {
            $startDate = Carbon::createFromFormat($this->global->date_format, $request->startDate)->toDateString();

            if (!is_null($startDate)) {
                $model = $model->where(DB::raw('DATE(project_time_logs.`start_time`)'), '>=', $startDate);
            }
        }

        if ($request->endDate !== null && $request->endDate != 'null' && $request->endDate != '') {
            $endDate = Carbon::createFromFormat($this->global->date_format, $request->endDate)->toDateString();

            if (!is_null($endDate)) {
                $model = $model->where(function ($query) use ($endDate) {
                    $query->where(DB::raw('DATE(project_time_logs.`end_time`)'), '<=', $endDate);
                });
            }
        }

        if (!is_null($employee) && $employee !== 'all') {
            $model->where('project_time_logs.user_id', $employee);
        }

        if (!is_null($projectId) && $projectId !== 'all') {
            $model->where('project_time_logs.project_id', '=', $projectId);
        }

        if (!is_null($taskId) && $taskId !== 'all') {
            $model->where('project_time_logs.task_id', '=', $taskId);
        }

        if (!is_null($approved) && $approved !== 'all') {
            if ($approved == 2) {
                $model->whereNull('project_time_logs.end_time');
            }
            else {
                $model->where('project_time_logs.approved', '=', $approved);
            }
        }

        if (!is_null($invoice) && $invoice !== 'all') {
            if ($invoice == 0) {
                $model->where('project_time_logs.invoice_id', '=', null);
            }
            else if ($invoice == 1) {
                $model->where('project_time_logs.invoice_id', '!=', null);
            }
        }

        if ($request->searchText != '') {
            $model->where(function ($query) {
                $query->where('tasks.heading', 'like', '%' . request('searchText') . '%')
                    ->orWhere('project_time_logs.memo', 'like', '%' . request('searchText') . '%')
                    ->orWhere('projects.project_name', 'like', '%' . request('searchText') . '%');
            });
        }

        $model->orderBy('project_time_logs.id', 'desc');

        return $model;
    }

    /**
     * Optional method if you want to use html builder.
     *
     * @return \Yajra\DataTables\Html\Builder
     */
    public function html()
    {
        return $this->builder()
            ->setTableId('timelogs-table')
            ->columns($this->getColumns())
            ->minifiedAjax()
            ->orderBy(5)
            ->destroy(true)
            ->responsive(true)
            ->serverSide(true)
            ->stateSave(true)
            ->processing(true)
            ->dom($this->domHtml)

            ->language(__('app.datatable'))
            ->parameters([
                'initComplete' => 'function () {
                    window.LaravelDataTables["timelogs-table"].buttons().container()
                     .appendTo( "#table-actions")
                 }',
                'fnDrawCallback' => 'function( oSettings ) {
                   //
                   $(".select-picker").selectpicker();
                 }',
            ])
            ->buttons(Button::make(['extend' => 'excel', 'text' => '<i class="fa fa-file-export"></i> ' . trans('app.exportExcel')]));
    }

    /**
     * Get columns.
     *
     * @return array
     */
    protected function getColumns()
    {
        return [
            '#' => ['data' => 'DT_RowIndex', 'orderable' => false, 'searchable' => false, 'visible' => false],
            __('app.id') => ['data' => 'id', 'name' => 'id', 'visible' => false, 'title' => __('app.id')],
            __('app.project') => ['data' => 'project', 'visible' => false, 'title' => __('app.project')],
            __('app.task') => ['data' => 'task', 'visible' => false, 'title' => __('app.task')],
            __('app.tasks') => ['data' => 'task_project', 'width' => '200', 'exportable' => false,'title' => __('app.tasks')],
            __('app.employee')  => ['data' => 'name', 'name' => 'users.name', 'exportable' => false, 'title' => __('app.employee')],
            __('app.name') => ['data' => 'employee_name', 'name' => 'name', 'visible' => false, 'title' => __('app.name')],
            __('modules.timeLogs.startTime') => ['data' => 'start_time', 'name' => 'start_time', 'title' => __('modules.timeLogs.startTime')],
            __('modules.timeLogs.endTime') => ['data' => 'end_time', 'name' => 'end_time', 'title' => __('modules.timeLogs.endTime')],
            __('modules.timeLogs.totalHours') => ['data' => 'total_hours', 'name' => 'total_hours', 'title' => __('modules.timeLogs.totalHours')],
            __('modules.timeLogs.totalMinutes') => ['data' => 'total_minutes', 'visible' => false, 'title' => __('modules.timeLogs.totalMinutes')],
            __('app.earnings') => ['data' => 'earnings', 'name' => 'earnings', 'title' => __('app.earnings')]
        ];
    }

    /**
     * Get filename for export.
     *
     * @return string
     */
    protected function filename()
    {
        return 'time_log_' . date('YmdHis');
    }

    public function pdf()
    {
        set_time_limit(0);

        if ('snappy' == config('datatables-buttons.pdf_generator', 'snappy')) {
            return $this->snappyPdf();
        }

        $pdf = app('dompdf.wrapper');
        $pdf->loadView('datatables::print', ['data' => $this->getDataForPrint()]);

        return $pdf->download($this->getFilename() . '.pdf');
    }

}
