<?php

namespace App\DataTables;

use App\DataTables\BaseDataTable;
use Carbon\Carbon;
use App\Models\Project;
use App\Models\ProjectDeadlineExtension;
use App\Models\ProjectMilestone;
use App\Models\Task;
use App\Models\User;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\EloquentDataTable;
use Auth;

class ProjectDeadlineExtensionDataTable extends BaseDataTable
{
    /**
     * Build DataTable class.
     *
     * @param mixed $query Results from query() method.
     * @return \Yajra\DataTables\DataTableAbstract
     */
    public function dataTable($query)
    {
        return (new EloquentDataTable($query))
            ->addIndexColumn()
            ->editColumn('action', function ($row) {    
                $action = '<div class="task_view">
    
                    <div class="dropdown">
                        <a class="task_view_more d-flex align-items-center justify-content-center dropdown-toggle" type="link"
                            id="dropdownMenuLink-' . $row->id . '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="icon-options-vertical icons"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink-' . $row->id . '" tabindex="0">';
                        if($row->status == 0){
                            $action .= '<a data-project-id="' . $row->id . '" class="dropdown-item project-deadline-auth" href="javascript:;"><i class="fa fa-plus mr-2"></i>' . __('Take Action') . '</a>';
                        }else{
                            $action .= '<a data-project-id="' . $row->id . '" class="dropdown-item project-deadline-view" href="javascript:;"><i class="fa fa-eye mr-2"></i>' . __('View Details') . '</a>';
                        }

                $action .= '</div>
                    </div>
                </div>';
    
                return $action;
            })
            ->editColumn('clientName', function ($row) {
                if($row->clientImage != null){
                return '<div class="media align-items-center">
                        <a href="' . route('clients.show', [$row->clientId]) . '">
                        <img src="' . $row->clientImage . '" class="mr-3 taskEmployeeImg rounded-circle" alt="' . ucfirst($row->clientName) . '" title="' . ucfirst($row->clientName) . '"></a>
                        <div class="media-body">
                        <h5 class="mb-0 f-13 text-darkest-grey"><a href="' . route('clients.show', [$row->clientId]) . '">' . ucfirst($row->clientName) . '</a></h5>
                        </div>
                    </div>';
                }else{
                    return '<div class="media align-items-center">
                    <a href="'.route('clients.show', [$row->clientId]).'">
                        <img src="'. asset('user-uploads/avatar/avatar_blank.png') .'" class="mr-3 taskEmployeeImg rounded-circle">
                    </a>
                    <div class="media-body">
                        <h5 class="mb-0 f-13 text-darkest-grey"><a href="'.route('clients.show', [$row->clientId]) .'">'.$row->clientName.'</a></h5>
                    </div>
                </div>';
                }
            })
            ->editColumn('project_name', function ($row) {
                return '<a class="project-status-inner-view" data-id="'.$row->projectId.'" href="'.route('projects.show',[$row->projectId]).'">' . $row->project_name . '</a>';
            })
            ->editColumn('pmName', function ($row) {
                if($row->pmImage != null){
                return '<div class="media align-items-center">
                        <a href="' . route('employees.show', [$row->pmId]) . '">
                        <img src="' . $row->pmImage . '" class="mr-3 taskEmployeeImg rounded-circle" alt="' . ucfirst($row->pmName) . '" title="' . ucfirst($row->pmName) . '"></a>
                        <div class="media-body">
                        <h5 class="mb-0 f-13 text-darkest-grey"><a href="' . route('employees.show', [$row->pmId]) . '">' . ucfirst($row->pmName) . '</a></h5>
                        </div>
                    </div>';
                }else{
                    return '<div class="media align-items-center">
                    <a href="'.route('employees.show', [$row->pmId]).'">
                        <img src="'. asset('user-uploads/avatar/avatar_blank.png') .'" class="mr-3 taskEmployeeImg rounded-circle">
                    </a>
                    <div class="media-body">
                        <h5 class="mb-0 f-13 text-darkest-grey"><a href="'.route('employees.show', [$row->pmId]) .'">'.$row->pmName.'</a></h5>
                    </div>
                </div>';
                }
            })
            ->editColumn('milestone_status', function ($row) {
                $p_milestone = ProjectMilestone::where('project_id', $row->project_id)->count();
                $p_milestone_complete = ProjectMilestone::where('project_id', $row->project_id)->where('status','complete')->count();
                return $p_milestone_complete.' / '.$p_milestone;
            })
            ->editColumn('parent_task_status', function ($row) {
                $task = Task::where('project_id', $row->project_id)->where('subtask_id', null)->count();
                $task_complete = Task::where('project_id', $row->project_id)->where('subtask_id', null)->where('board_column_id',4)->count();
                return $task_complete.' / '.$task;
            })
            ->editColumn('sub_task_status', function ($row) {
                $task = Task::where('project_id', $row->project_id)->where('subtask_id', '!=',null)->count();
                $task_complete = Task::where('project_id', $row->project_id)->where('subtask_id', '!=',null)->where('board_column_id',4)->count();
                return $task_complete.' / '.$task;
            })
            ->editColumn('old_deadline', function ($row) {
                return $row->old_deadline;
            })
            ->editColumn('new_deadline', function ($row) {
                return $row->new_deadline;
            })
            ->editColumn('deadline_requested', function ($row) {
                return $row->deadline_requested_pm;
            })
            ->editColumn('deadline_extend_admin', function ($row) {
            if($row->deadline_extend_admin !=null){
                return $row->deadline_extend_admin;
            }else{
                return 'Awaiting Approval';
            }
            })
            ->editColumn('deadline_extended', function ($row) {
                return $row->deadline_requested_for;
            })
            ->editColumn('reason', function ($row) {
                if($row->extension =='Client Ordered New Things'){
                    return 'New Milestone Added';
                }else{
                    return $row->extension;
                }
            })
            ->editColumn('deadline_extended_for', function ($row) {
                if($row->deadline_extended_for !=null){
                return $row->deadline_extended_for .' Days';
                }else{
                    return 'Awaiting Approval';
                }
            })
            ->editColumn('requested_on', function ($row) {
                return Carbon::parse($row->created_at)->format('Y-m-d h:i:s A');;
            })
            ->editColumn('approved_on', function ($row) {
                if ($row->approved_on !=null){
                return Carbon::parse($row->approved_on)->format('Y-m-d h:i:s A') ?? 'Awaiting Approval';
                }else{
                    return 'Awaiting Approval';
                }
            })
            ->editColumn('approved_by', function ($row) {
                if ($row->approved_by !=null){
                $user = User::where('id', $row->approved_by)->first();
                return '<div class="media align-items-center">
                        <a href="' . route('employees.show', [$user->id]) . '">
                        <img src="' . $user->image . '" class="mr-3 taskEmployeeImg rounded-circle" alt="' . ucfirst($user->name) . '" title="' . ucfirst($user->name) . '"></a>
                        <div class="media-body">
                        <h5 class="mb-0 f-13 text-darkest-grey"><a href="' . route('employees.show', [$user->id]) . '">' . ucfirst($user->name) . '</a></h5>
                        </div>
                    </div>';
                }else{
                return 'Awaiting Approval';
                }
            })
            ->addIndexColumn()
            ->smart(false)
            ->setRowId(function ($row) {
                return 'row-' . $row->id;
            })
            ->rawColumns(['action' ,'clientName','project_name','pmName','milestone_status','old_deadline','new_deadline','deadline_requested','deadline_extended','reason','requested_on','approved_on','approved_by']);
    }
    /**
     * @param Project $model
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function query(ProjectDeadlineExtension $model)
    {
        $request = $this->request();
        $model = $model
            ->select('project_deadline_extensions.*','projects.id as projectId','projects.project_name','client.id as clientId','client.name as clientName','client.image as clientImage','pm.id as pmId','pm.name as pmName','pm.image as pmImage')
            ->leftJoin('projects', 'project_deadline_extensions.project_id', '=', 'projects.id')
            ->leftJoin('users as pm', 'projects.pm_id', '=', 'pm.id')
            ->leftJoin('users as client', 'projects.client_id', '=', 'client.id');

            if (!is_null($request->PmId) && $request->PmId != 'all') {
                $model->where('projects.pm_id', $request->PmId);
            }

            if ($request->startDate && $request->endDate) {
                $startDate = Carbon::createFromFormat($this->global->date_format, $request->startDate)->toDateString();
                $endDate = Carbon::createFromFormat($this->global->date_format, $request->endDate)->toDateString();
                $model->whereBetween(DB::raw('DATE(project_deadline_extensions.`created_at`)'), [$startDate, $endDate]);
            }
            $model->orderBy('project_deadline_extensions.id','desc');

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
            ->setTableId('project-deadline-extension-table')
            ->columns($this->getColumns())
            ->minifiedAjax()
            // ->orderBy(1)
            ->destroy(true)
            ->responsive(true)
            ->serverSide(true)
            ->processing(true)
            ->dom($this->domHtml)

            ->language(__('app.datatable'))
            ->parameters([
                'initComplete' => 'function () {
                    window.LaravelDataTables["project-deadline-extension-table"].buttons().container()
                     .appendTo( "#table-actions")
                 }',
                'fnDrawCallback' => 'function( oSettings ) {
                    $("body").tooltip({
                        selector: \'[data-toggle="tooltip"]\'
                    })
                }',
                'scrollX' => true
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
            __('clientName') => ['data' => 'clientName', 'name' => 'clientName', 'title' => __('Client')],
            __('project_name') => ['data' => 'project_name', 'name' => 'project_name', 'title' => __('Project Name')],
            __('pmName') => ['data' => 'pmName', 'name' => 'pmName', 'title' => __('Project Manager')],
            __('milestone_status') => ['data' => 'milestone_status', 'name' => 'milestone_status', 'title' => __('Milestone Status')],
            __('parent_task_status') => ['data' => 'parent_task_status', 'name' => 'parent_task_status', 'title' => __('Parent Task Status')],
            __('sub_task_status') => ['data' => 'sub_task_status', 'name' => 'sub_task_status', 'title' => __('Sub Task Status')],
            __('old_deadline') => ['data' => 'old_deadline', 'name' => 'old_deadline', 'title' => __('Previous Deadline')],
            __('new_deadline') => ['data' => 'new_deadline', 'name' => 'new_deadline', 'title' => __('New Deadline')],
            __('deadline_requested') => ['data' => 'deadline_requested', 'name' => 'deadline_requested', 'title' => __('Deadline Requested')],
            __('deadline_extend_admin') => ['data' => 'deadline_extend_admin', 'name' => 'deadline_extend_admin', 'title' => __('Deadline Extended')],
            __('deadline_extended') => ['data' => 'deadline_extended', 'name' => 'deadline_extended', 'title' => __('Deadline Requested For')],
            __('reason') => ['data' => 'reason', 'name' => 'reason', 'title' => __('Reason')],
            __('deadline_extended_for') => ['data' => 'deadline_extended_for', 'name' => 'deadline_extended_for', 'title' => __('Deadline Extended For')],
            __('requested_on') => ['data' => 'requested_on', 'name' => 'requested_on', 'title' => __('Requested On')],
            __('approved_on') => ['data' => 'approved_on', 'name' => 'approved_on', 'title' => __('Approved On')],
            __('approved_by') => ['data' => 'approved_by', 'name' => 'approved_by', 'title' => __('Approved By')],
            Column::computed('action', __('app.action'))
            ->exportable(false)
            ->printable(false)
            ->orderable(false)
            ->searchable(false)
            ->addClass('text-right pr-20')
        ];
    }

    /**
     * Get filename for export.
     *
     * @return string
     */
    protected function filename()
    {
        return 'Projects_' . date('YmdHis');
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
