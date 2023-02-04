<?php

namespace App\DataTables;

use App\Models\Project;
use App\Models\ProjectStatusSetting;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;

class ArchiveProjectsDataTable extends BaseDataTable
{

    private $viewProjectPermission;
    private $deleteProjectPermission;

    public function __construct()
    {
        parent::__construct();
        $this->viewProjectPermission = user()->permission('view_projects');
        $this->editProjectPermission = user()->permission('edit_projects');
        $this->deleteProjectPermission = user()->permission('delete_projects');
    }

    /**
     * Build DataTable class.
     *
     * @param mixed $query Results from query() method.
     * @return \Yajra\DataTables\DataTableAbstract
     */
    public function dataTable($query)
    {
        return datatables()
            ->eloquent($query)

            ->addColumn('action', function ($row) {
                $memberIds = $row->members->pluck('user_id')->toArray();
                $action = '';

                if (
                    $this->editProjectPermission == 'all'
                    || ($this->editProjectPermission == 'added' && user()->id == $row->added_by)
                    || ($this->editProjectPermission == 'owned' && user()->id == $row->client_id && in_array('client', user_roles()))
                    || ($this->editProjectPermission == 'owned' && in_array(user()->id, $memberIds) && in_array('employee', user_roles()))
                    || ($this->editProjectPermission == 'both' && (user()->id == $row->client_id || user()->id == $row->added_by))
                    || ($this->editProjectPermission == 'both' && in_array(user()->id, $memberIds) && in_array('employee', user_roles()))
                ){
                    $action .= '
                    <a href="javascript:;" class="btn btn-sm btn-secondary restore-project mr-2"
                    data-toggle="tooltip" data-user-id="' . $row->id . '" data-original-title="'.__('app.unarchive').'"><i class="fa fa-undo" aria-hidden="true"></i></a>';
                }

                if (
                    $this->deleteProjectPermission == 'all'
                    || ($this->deleteProjectPermission == 'added' && user()->id == $row->added_by)
                    || ($this->deleteProjectPermission == 'owned' && user()->id == $row->client_id && in_array('client', user_roles()))
                    || ($this->deleteProjectPermission == 'owned' && in_array(user()->id, $memberIds) && in_array('employee', user_roles()))
                    || ($this->deleteProjectPermission == 'both' && (user()->id == $row->client_id || user()->id == $row->added_by))
                    || ($this->deleteProjectPermission == 'both' && in_array(user()->id, $memberIds) && in_array('employee', user_roles()))
                ){
                    $action .= '
                     <a href="javascript:;" class="btn btn-sm btn-secondary delete-table-row"
                    data-toggle="tooltip" data-user-id="' . $row->id . '" data-original-title="'.__('app.delete').'"><i class="fa fa-times" aria-hidden="true"></i></a>';
                }

                return $action;
            })
            ->addColumn('members', function ($row) {
                $members = '';

                if (count($row->members) > 0) {
                    foreach ($row->members as $member) {
                        $img = '<img data-toggle="tooltip" data-original-title="' . mb_ucwords($member->user->name) . '" src="' . $member->user->image_url . '">';

                        $members .= '<div class="taskEmployeeImg rounded-circle"><a href="' . route('employees.show', $member->user->id) . '">' . $img . '</a></div> ';
                    }
                } else {
                    $members .= __('messages.noMemberAddedToProject');
                }

                return $members;
            })
            ->addColumn('name', function ($row) {
                $members = [];

                if (count($row->members) > 0) {
                    foreach ($row->members as $member) {
                        $members[] = $member->user->name;
                    }

                    return implode(',', $members);
                }
            })
            ->editColumn('project_name', function ($row) {

                return '<div class="media align-items-center">
                        <div class="media-body">
                    <h5 class="mb-0 f-13 text-darkest-grey"><a href="' . route('projects.show', [$row->id]) . '">' . ucfirst($row->project_name) . '</a></h5>
                    </div>
                </div>';
            })
            ->editColumn('start_date', function ($row) {
                return $row->start_date->format($this->global->date_format);
            })
            ->editColumn('deadline', function ($row) {
                if ($row->deadline) {
                    return $row->deadline->format($this->global->date_format);
                }

                return '-';
            })
            ->editColumn('client_id', function ($row) {
                if (is_null($row->client_id)) {
                    return '';
                }

                return view('components.client', [
                    'user' => $row->client
                ]);
            })
            ->editColumn('status', function ($row) {

                $projectStatus = ProjectStatusSetting::all();

                foreach($projectStatus as $status)
                {
                    if ($row->status == $status->status_name) {
                        $color = $status->color;
                        return ' <i class="fa fa-circle mr-1 f-10" style="color:'.$color.'"></i>' . ucfirst($status->status_name);
                    }
                }
            })
            ->editColumn('completion_percent', function ($row) {
                if ($row->completion_percent < 50) {
                    $statusColor = 'danger';
                }
                elseif ($row->completion_percent >= 50 && $row->completion_percent < 75) {
                    $statusColor = 'warning';
                }
                else {
                    $statusColor = 'success';
                }

                return '<div class="progress" style="height: 15px;">
                <div class="progress-bar f-12 bg-' . $statusColor . '" role="progressbar" style="width: ' . $row->completion_percent . '%;" aria-valuenow="' . $row->completion_percent . '" aria-valuemin="0" aria-valuemax="100">' . $row->completion_percent . '%</div>
              </div>';
            })
            ->addColumn('completion_export', function ($row) {
                return $row->completion_percent . '% ' . __('app.complete');
            })
            ->addIndexColumn()
            ->setRowId(function ($row) {
                return 'row-' . $row->id;
            })
            ->rawColumns(['project_name', 'action', 'completion_percent', 'members', 'status', 'client_id', 'check'])
            ->removeColumn('project_summary')
            ->removeColumn('notes')
            ->removeColumn('category_id')
            ->removeColumn('feedback')
            ->removeColumn('start_date');
    }

    /**
     * @param Project $model
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function query(Project $model)
    {
        $request = $this->request();

        $model = $model
            ->with('members', 'members.user', 'client', 'client.clientDetails', 'currency', 'client.session')
            ->leftJoin('project_members', 'project_members.project_id', 'projects.id')
            ->leftJoin('users', 'project_members.user_id', 'users.id')
            ->leftJoin('users as client', 'projects.client_id', 'users.id')
            ->selectRaw('projects.id, projects.added_by, projects.project_name, projects.start_date, projects.deadline, projects.client_id,
              projects.completion_percent, projects.project_budget, projects.currency_id,
              projects.status, users.name, client.name as client_name,
           ( select count("id") from pinned where pinned.project_id = projects.id and pinned.user_id = ' . user()->id . ') as pinned_project');

        if (!is_null($request->status) && $request->status != 'all') {
            if ($request->status == 'not finished') {
                $model->where('projects.completion_percent', '!=', 100);
            }
            else {
                $model->where('projects.status', $request->status);
            }
        }

        if (!is_null($request->client_id) && $request->client_id != 'all') {
            $model->where('client_id', $request->client_id);
        }

        if (!is_null($request->team_id) && $request->team_id != 'all') {
            $model->where('team_id', $request->team_id);
        }

        if (!is_null($request->category_id) && $request->category_id != 'all') {
            $model->where('category_id', $request->category_id);
        }

        if (!is_null($request->employee_id) && $request->employee_id != 'all') {
            $model->where('project_members.user_id', $request->employee_id);
        }

        if ($this->viewProjectPermission == 'added') {
            $model->where('projects.added_by', user()->id);
        }

        if ($this->viewProjectPermission == 'owned' && in_array('employee', user_roles())) {
            $model->where('project_members.user_id', user()->id);
        }

        if ($this->viewProjectPermission == 'both' && in_array('employee', user_roles())) {
            $model->where(function ($query) {
                return $query->where('projects.added_by', user()->id)
                    ->orWhere('project_members.user_id', user()->id);
            });
        }

        if ($request->searchText != '') {
            $model->where(function ($query) {
                $query->where('projects.project_name', 'like', '%' . request('searchText') . '%')
                    ->orWhere('users.name', 'like', '%' . request('searchText') . '%');
            });
        }

        $model->onlyTrashed()->groupBy('projects.id');

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
            ->setTableId('projects-table')
            ->columns($this->getColumns())
            ->minifiedAjax()
            ->orderBy(1)
            ->destroy(true)
            ->responsive(true)
            ->serverSide(true)
            ->processing(true)
            ->dom($this->domHtml)

            ->language(__('app.datatable'))
            ->parameters([
                'initComplete' => 'function () {
                    window.LaravelDataTables["projects-table"].buttons().container()
                     .appendTo( "#table-actions")
                 }',
                'fnDrawCallback' => 'function( oSettings ) {
                    $("body").tooltip({
                        selector: \'[data-toggle="tooltip"]\'
                    })
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

            '#' => ['data' => 'DT_RowIndex', 'orderable' => false, 'searchable' => false, 'visible' => true],
            __('modules.projects.projectName') => ['data' => 'project_name', 'name' => 'project_name', 'title' => __('modules.projects.projectName')],
            __('modules.projects.members')  => ['data' => 'members', 'name' => 'members', 'exportable' => false, 'width' => '25%', 'title' => __('modules.projects.members')],
            __('modules.projects.projectMembers')  => ['data' => 'name', 'name' => 'name', 'visible' => false, 'title' => __('modules.projects.projectMembers')],
            __('app.deadline') => ['data' => 'deadline', 'name' => 'deadline', 'title' => __('app.deadline')],
            __('app.client') => ['data' => 'client_id', 'name' => 'client_id', 'title' => __('app.client')],
            __('app.completions') => ['data' => 'completion_percent', 'name' => 'completion_percent', 'exportable' => false, 'title' => __('app.completions')],
            __('app.completion') => ['data' => 'completion_export', 'name' => 'completion_export', 'visible' => false, 'title' => __('app.completion')],
            __('app.status') => ['data' => 'status', 'name' => 'status', 'title' => __('app.status')],
            Column::computed('action', __('app.action'))
                ->exportable(false)
                ->printable(false)
                ->orderable(false)
                ->searchable(false)
                ->width(150)
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
