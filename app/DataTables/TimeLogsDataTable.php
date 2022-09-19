<?php

namespace App\DataTables;

use DataTables;
use Carbon\Carbon;
use App\Models\CustomField;
use App\Models\ProjectTimeLog;
use App\Models\CustomFieldGroup;
use App\DataTables\BaseDataTable;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\EloquentDataTable;

class TimeLogsDataTable extends BaseDataTable
{

    protected $timeLogFor;
    protected $isTask;
    private $editTimelogPermission;
    private $deleteTimelogPermission;
    private $viewTimelogPermission;
    private $approveTimelogPermission;

    public function __construct()
    {
        parent::__construct();
        $this->editTimelogPermission = user()->permission('edit_timelogs');
        $this->deleteTimelogPermission = user()->permission('delete_timelogs');
        $this->viewTimelogPermission = user()->permission('view_timelogs');
        $this->approveTimelogPermission = user()->permission('approve_timelogs');
        $this->viewTimelogEarningsPermission = user()->permission('view_timelog_earnings');
    }

    /**
     * @param mixed $query
     * @return \Yajra\DataTables\DataTableAbstract|\Yajra\DataTables\EloquentDataTable
     */
    public function dataTable($query)
    {
        $timelog = new ProjectTimeLog();
        $customFieldsGroupsId = CustomFieldGroup::where('model', $timelog->customFieldModel)->pluck('id')->first();
        $customFields = CustomField::where('custom_field_group_id', $customFieldsGroupsId)->where('export', 1)->get();

        $datatables = datatables()->eloquent($query);
        $datatables->addColumn('check', function ($row) {
                return '<input type="checkbox" class="select-table-row" id="datatable-row-' . $row->id . '"  name="datatable_ids[]" value="' . $row->id . '" onclick="dataTableRowCheck(' . $row->id . ')">';
        });
            $datatables->addColumn('action', function ($row) {
                $action = '<div class="task_view">

                    <div class="dropdown">
                        <a class="task_view_more d-flex align-items-center justify-content-center dropdown-toggle" type="link"
                            id="dropdownMenuLink-' . $row->id . '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="icon-options-vertical icons"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink-' . $row->id . '" tabindex="0">';

                $action .= '<a href="' . route('timelogs.show', [$row->id]) . '" class="dropdown-item openRightModal"><i class="fa fa-eye mr-2"></i>' . __('app.view') . '</a>';

                if (!is_null($row->end_time)) {
                    if ($this->approveTimelogPermission == 'all') {
                        if (!$row->approved) {
                            $action .= '<a class="dropdown-item approve-timelog" href="javascript:;" data-time-id="' . $row->id . '">
                                <i class="fa fa-check mr-2"></i>
                                ' . trans('app.approve') . '
                            </a>';
                        }
                    }

                    if (
                        $this->editTimelogPermission == 'all'
                    || ($this->editTimelogPermission == 'added' && $row->added_by == user()->id)
                    || ($this->editTimelogPermission == 'owned'
                        && (($row->project && $row->project->client_id == user()->id) || $row->user_id == user()->id)
                        )
                    || ($this->editTimelogPermission == 'both' && (($row->project && $row->project->client_id == user()->id) || $row->user_id == user()->id || $row->added_by == user()->id))
                    ) {
                        $action .= '<a class="dropdown-item openRightModal" href="' . route('timelogs.edit', [$row->id]) . '">
                                <i class="fa fa-edit mr-2"></i>
                                ' . trans('app.edit') . '
                            </a>';
                    }

                    if ($this->deleteTimelogPermission == 'all' || ($this->deleteTimelogPermission == 'added' && user()->id == $row->added_by)) {
                        $action .= '<a class="dropdown-item delete-table-row" href="javascript:;" data-time-id="' . $row->id . '">
                                <i class="fa fa-trash mr-2"></i>
                                ' . trans('app.delete') . '
                            </a>';
                    }
                } else {
                    if ($this->editTimelogPermission == 'all' || ($this->editTimelogPermission == 'added' && user()->id == $row->added_by)) {
                        $action .= '<a class="dropdown-item stop-active-timer" href="javascript:;" data-time-id="' . $row->id . '">
                                <i class="fa fa-stop-circle mr-2"></i>
                                ' . trans('app.stop') . '
                            </a>';
                    }
                }

                $action .= '</div>
                    </div>
                </div>';

                return $action;
            });
            $datatables->addColumn('employee_name', function ($row) {
                return $row->user->name;
            });

        $customFieldsId = $customFields->pluck('id');
        $fieldData = DB::table('custom_fields_data')->where('model', 'App\Models\ProjectTimeLog')->whereIn('custom_field_id', $customFieldsId)->select('id', 'custom_field_id', 'model_id', 'value')->get();

        foreach ($customFields as $customField) {
            $datatables->addColumn($customField->name, function ($row) use($fieldData, $customField) {

                $finalData = $fieldData->filter(function ($value) use($customField, $row) {
                    return $value->custom_field_id == $customField->id && $value->model_id == $row->id;
                })->first();

                return $finalData ? $finalData->value : '--';
            });
        }

            $datatables->editColumn('name', function ($row) {
                return view('components.employee', [
                    'user' => $row->user
                ]);
            });
            $datatables->editColumn('start_time', function ($row) {
                return $row->start_time->timezone($this->global->timezone)->format($this->global->date_format . ' ' . $this->global->time_format);
            });
            $datatables->editColumn('end_time', function ($row) {
                if (!is_null($row->end_time)) {
                    return $row->end_time->timezone($this->global->timezone)->format($this->global->date_format . ' ' . $this->global->time_format);

                } elseif(!is_null($row->activeBreak)) {
                    return "<span class='badge badge-secondary'><i class='fa fa-pause-circle'></i> " . __('modules.timeLogs.paused') . '</span>';
                }
                else {
                    return "<span class='badge badge-primary'><i class='fa fa-clock'></i> " . __('app.active') . '</span>';
                }
            });
            $datatables->editColumn('total_hours', function ($row) {
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
            });
            $datatables->editColumn('earnings', function ($row) {
                if (is_null($row->hourly_rate)) {
                    return '--';
                }

                return currency_formatter($row->earnings);
            });
            $datatables->editColumn('project_name', function ($row) {
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
            });
            $datatables->addColumn('short_code', function ($row) {
                if (!is_null($row->project)) {
                    return $row->project->project_short_code;
                }
                else {
                    return '--';
                }
            });
            $datatables->addIndexColumn();
            $datatables->setRowId(function ($row) {
                return 'row-' . $row->id;
            });
            $datatables->orderColumn('project_name', 'tasks.heading $1');
            $datatables->rawColumns(['end_time', 'action', 'project_name', 'name', 'total_hours', 'check']);
            $datatables->removeColumn('project_id');
            $datatables->removeColumn('total_minutes');
            $datatables->removeColumn('task_id');

            return $datatables;
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

        $model = $model->with('user', 'user.employeeDetail', 'user.employeeDetail.designation', 'user.session', 'project', 'task', 'breaks', 'activeBreak');

        $model = $model->join('users', 'users.id', '=', 'project_time_logs.user_id')
            ->join('employee_details', 'users.id', '=', 'employee_details.user_id')
            ->leftJoin('designations', 'employee_details.designation_id', '=', 'designations.id')
            ->leftJoin('tasks', 'tasks.id', '=', 'project_time_logs.task_id')
            ->leftJoin('projects', 'projects.id', '=', 'project_time_logs.project_id');

        $model = $model->select('project_time_logs.id', 'project_time_logs.start_time', 'project_time_logs.end_time', 'project_time_logs.total_hours', 'project_time_logs.total_minutes', 'project_time_logs.memo', 'project_time_logs.user_id', 'project_time_logs.project_id', 'project_time_logs.task_id', 'users.name', 'users.image', 'project_time_logs.hourly_rate', 'project_time_logs.earnings', 'project_time_logs.approved', 'tasks.heading', 'projects.project_name', 'designations.name as designation_name', 'project_time_logs.added_by');


        if ($request->startDate !== null && $request->startDate != 'null' && $request->startDate != '') {
            $startDate = Carbon::createFromFormat($this->global->date_format, $request->startDate)->toDateString();

            if (!is_null($startDate)) {
                $model->where(DB::raw('DATE(project_time_logs.`start_time`)'), '>=', $startDate);
            }
        }

        if ($request->endDate !== null && $request->endDate != 'null' && $request->endDate != '') {
            $endDate = Carbon::createFromFormat($this->global->date_format, $request->endDate)->toDateString();

            if (!is_null($endDate)) {
                $model->where(function ($query) use ($endDate) {
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
                $model->whereNull('project_time_logs.invoice_id');
            }
            else if ($invoice == 1) {
                $model->whereNotNull('project_time_logs.invoice_id');
            }
        }

        if ($request->searchText != '') {
            $model->where(function ($query) {
                $query->where('tasks.heading', 'like', '%' . request('searchText') . '%')
                    ->orWhere('project_time_logs.memo', 'like', '%' . request('searchText') . '%')
                    ->orWhere('projects.project_name', 'like', '%' . request('searchText') . '%')
                    ->orWhere('projects.project_short_code', 'like', '%' . request('searchText') . '%')
                    ->orWhere('tasks.task_short_code', 'like', '%' . request('searchText') . '%');
            });
        };

        if ($this->viewTimelogPermission == 'added') {
            $model->where('project_time_logs.added_by', user()->id);
        }

        if ($this->viewTimelogPermission == 'owned') {
            $model->where(function ($q) {
                $q->where('project_time_logs.user_id', '=', user()->id);

                if (in_array('client', user_roles())) {
                    $q->orWhere('projects.client_id', '=', user()->id);
                }
            });
        }

        if ($this->viewTimelogPermission == 'both') {
            $model->where(function ($q) {
                $q->where('project_time_logs.user_id', '=', user()->id);

                $q->orWhere('project_time_logs.added_by', '=', user()->id);

                if (in_array('client', user_roles())) {
                    $q->orWhere('projects.client_id', '=', user()->id);
                }
            });
        }

        $model->whereNull('tasks.deleted_at');

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
            ->orderBy(2)
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
        $timelog = new ProjectTimeLog();
        $customFieldsGroupsId = CustomFieldGroup::where('model', $timelog->customFieldModel)->pluck('id')->first();
        $customFields = CustomField::where('custom_field_group_id', $customFieldsGroupsId)->where('export', 1)->get();
        $customFieldsDataMerge = [];


        $data = [
            'check' => [
                'title' => '<input type="checkbox" name="select_all_table" id="select-all-table" onclick="selectAllTable(this)">',
                'exportable' => false,
                'orderable' => false,
                'searchable' => false
            ],
            '#' => ['data' => 'DT_RowIndex', 'orderable' => false, 'searchable' => false, 'visible' => false],
            __('app.id') => ['data' => 'id', 'name' => 'id', 'title' => __('app.id')],
            __('modules.taskCode') => ['data' => 'short_code', 'name' => 'project_short_code', 'title' => __('modules.taskCode')],
            __('app.task') => ['data' => 'project_name', 'name' => 'tasks.heading', 'width' => '200', 'title' => __('app.task')],
            __('app.employee')  => ['data' => 'name', 'name' => 'users.name', 'exportable' => false, 'title' => __('app.employee')],
            __('app.name') => ['data' => 'employee_name', 'name' => 'name', 'visible' => false, 'title' => __('app.name')],
            __('modules.timeLogs.startTime') => ['data' => 'start_time', 'name' => 'start_time', 'title' => __('modules.timeLogs.startTime')],
            __('modules.timeLogs.endTime') => ['data' => 'end_time', 'name' => 'end_time', 'title' => __('modules.timeLogs.endTime')],
            __('modules.timeLogs.totalHours') => ['data' => 'total_hours', 'name' => 'total_hours', 'title' => __('modules.timeLogs.totalHours')],
            __('app.earnings') => ['data' => 'earnings', 'name' => 'earnings', 'title' => __('app.earnings'), 'visible' => ($this->viewTimelogEarningsPermission == 'all'), 'exportable' => ($this->viewTimelogEarningsPermission == 'all')],
            Column::computed('action', __('app.action'))
                ->exportable(false)
                ->printable(false)
                ->orderable(false)
                ->searchable(false)
                ->addClass('text-right pr-20')
        ];

        foreach ($customFields as $customField) {
            $customFieldsData = [$customField->name => ['data' => $customField->name, 'name' => $customField->name, 'title' => $customField->name, 'visible' => false]];
            $customFieldsDataMerge = array_merge($customFieldsDataMerge, $customFieldsData);
        }


        $datamerge = array_merge($data, $customFieldsDataMerge);
        return $datamerge;
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
