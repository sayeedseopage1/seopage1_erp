<?php

namespace App\DataTables;

use App\Models\Department;
use App\Models\Team;
use App\Models\User;
use App\Models\Seopage1Team;
use Carbon\Carbon;
use App\Models\Holiday;
use App\Models\Designation;
use App\DataTables\BaseDataTable;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\EloquentDataTable;

class DepartmentDataTable extends BaseDataTable
{
    private $editDepartmentPermission;
    private $deleteDepartmentPermission;
    public $arr = [];

    public function __construct()
    {
        parent::__construct();
        $this->editDepartmentPermission = user()->permission('edit_department');
        $this->deleteDepartmentPermission = user()->permission('delete_department');
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
            ->addColumn('check', function ($row) {
                return '<input type="checkbox" class="select-table-row" id="datatable-row-' . $row->id . '"  name="datatable_ids[]" value="' . $row->id . '" onclick="dataTableRowCheck(' . $row->id . ')">';
            })
            ->addColumn('action', function ($row) {
                $action = '<div class="task_view">
                    <div class="dropdown">
                        <a class="task_view_more d-flex align-items-center justify-content-center dropdown-toggle" type="link"
                            id="dropdownMenuLink-' . $row->id . '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="icon-options-vertical icons"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink-' . $row->id . '" tabindex="0">';
                        if ($this->editDepartmentPermission == 'all') {
                            $action .= '<a class="dropdown-item" href="' . route('teams.edit', [$row->id]) . '">
                                <i class="fa fa-edit mr-2"></i>
                                ' . trans('app.edit') . '
                            </a>';
                        }

                        if ($this->deleteDepartmentPermission == 'all'){
                            $action .= '<a class="dropdown-item delete-table-row" href="javascript:;" data-department-id="' . $row->id . '">
                                <i class="fa fa-trash mr-2"></i>
                                ' . trans('app.delete') . '
                            </a>';
                        }

                        $action .= '</div>
                    </div>
                </div>';

                return $action;
            })
            ->editColumn('name', function ($row) {
                return '<h5 class="mb-0 f-13 text-darkest-grey">'.ucfirst($row->team_name).'</h5>';
            })
            ->editColumn('parent_id', function ($row) {
                // get name of parent department
                $parent = Seopage1Team::where('id', $row->parent_id)->first();

                if ($parent) {
                    return $parent->team_name;
                }
                else {
                    return '-';
                }
            })
            ->editColumn('team_member', function($row) {
                $usersID = explode(',', $row->members);
                $html = '';
                foreach ($usersID as $value) {
                    if (!empty($value)) {
                        $user = User::find($value);
                        $image_url = $user->image ?? 'avatar_blank.png';
                        $html .= '<a href="'.route('employees.show', $user->id).'">
                            <img src="'.\URL::asset('user-uploads/avatar/'.$image_url).'" class="mr-2 taskEmployeeImg rounded-circle" alt="'.$user->name.'" title="'.$user->name.'">
                        </a>';
                    }
                }
                return $html;
            })
            ->editColumn('department', function($row) {
                $data = Team::find($row->department_id);
                if ($data) {
                    return $data->team_name;
                } else {
                    return '---';
                }
            })
            ->editColumn('created_by', function($row) {
                $user =  User::find($row->created_by);
                $image_url = $user->image ?? 'avatar_blank.png';

                return '<a href="'.route('employees.show', $user->id).'">
                    <img src="'.\URL::asset('user-uploads/avatar/'.$image_url).'" class="mr-2 taskEmployeeImg rounded-circle" alt="'.$user->name.'" title="'.$user->name.'">'.$user->name.'
                </a>';
            })
            ->addIndexColumn()
            ->smart(false)
            ->setRowId(function ($row) {
                return 'row-' . $row->id;
            })
            ->rawColumns(['action', 'name', 'check', 'team_member', 'department', 'created_by']);
    }

    /**
     * Get query source of dataTable.
     *
     * @param \App\Models\DepartmentDataTable $model
     * @return \Illuminate\Database\Eloquent\Builder
     */

    public function query(Seopage1Team $model)
    {
        $request = $this->request();
        $model = $model->select('*');
        if (request()->searchText != '') {
            $model->where('team_name', 'like', '%' . request()->searchText . '%');
        }

        if ($request->startDate !== null && $request->startDate != 'null' && $request->startDate != '') {
            $startDate = Carbon::createFromFormat($this->global->date_format, $request->startDate)->toDateString();
            $model = $model->where(DB::raw('DATE(teams.`created_at`)'), '>=', $startDate);
        }

        if ($request->endDate !== null && $request->endDate != 'null' && $request->endDate != '') {
            $endDate = Carbon::createFromFormat($this->global->date_format, $request->endDate)->toDateString();
            $model = $model->where(DB::raw('DATE(teams.`created_at`)'), '<=', $endDate);
        }

        if($request->parentId != 'all' && $request->parentId != null) {
            $departments = Team::with('childs')->where('id', $request->parentId)->get();

            foreach($departments as $department)
            {
                if ($department->childs) {
                    $this->child($department->childs);
                    array_push($this->arr, $department->id);
                }
            }

            $model->whereIn('id', $this->arr);
        }

        return $model;
    }

    public function child($child)
    {
        foreach($child as $item)
        {
            array_push($this->arr, $item->id);

            if ($item->childs) {
                $this->child($item->childs);
            }
        }
    }

    /**
     * Optional method if you want to use html builder.
     *
     * @return \Yajra\DataTables\Html\Builder
     */
    public function html()
    {
        return $this->builder()
            ->setTableId('departments-table')
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
            ->buttons(Button::make(['extend' => 'excel', 'text' => '<i class="fa fa-file-export"></i> ' . trans('app.exportExcel')]))
            ->parameters([
                'initComplete' => 'function () {
                   window.LaravelDataTables["departments-table"].buttons().container()
                    .appendTo("#table-actions")
                }',
                'fnDrawCallback' => 'function( oSettings ) {
                    $("body").tooltip({
                        selector: \'[data-toggle="tooltip"]\'
                    })
                }',
            ]);
    }

    /**
     * Get columns.
     *
     * @return array
     */
    protected function getColumns()
    {
        return [
            'check' => [
                'title' => '<input type="checkbox" name="select_all_table" id="select-all-table" onclick="selectAllTable(this)">',
                'exportable' => false,
                'orderable' => false,
                'searchable' => false,
                'visible' => !in_array('client', user_roles())
            ],
            '#' => ['data' => 'DT_RowIndex', 'orderable' => false, 'searchable' => false, 'visible' => false],
            __('app.name')  => ['data' => 'name', 'name' => 'team_name', 'title' => __('Team Name')],
            __('modules.department.parentDepartment') => ['data' => 'parent_id', 'name' => 'parent_id', 'exportable' => true, 'title' => __('modules.department.parentDepartment')],
            __('department') => ['data' => 'department', 'name' => 'department', 'exportable' => true, 'title' => __('Department')],
            __('team_member') => ['data' => 'team_member', 'name' => 'team_member', 'exportable' => true, 'title' => __('Team Members')],
            __('created_by') => ['data' => 'created_by', 'name' => 'created_by', 'exportable' => true, 'title' => __('Created By')],
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
        return 'Department_' . date('YmdHis');
    }

}
