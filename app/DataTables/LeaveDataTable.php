<?php

namespace App\DataTables;

use App\DataTables\BaseDataTable;
use App\Models\Leave;
use Carbon\Carbon;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;

class LeaveDataTable extends BaseDataTable
{

    private $editLeavePermission;
    private $deleteLeavePermission;
    private $viewLeavePermission;
    private $approveRejectPermission;

    public function __construct()
    {
        parent::__construct();
        $this->editLeavePermission = user()->permission('edit_leave');
        $this->deleteLeavePermission = user()->permission('delete_leave');
        $this->viewLeavePermission = user()->permission('view_leave');
        $this->approveRejectPermission = user()->permission('approve_or_reject_leaves');
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
            ->addIndexColumn()
            ->addColumn('check', function ($row) {
                return '<input type="checkbox" class="select-table-row" id="datatable-row-' . $row->id . '"  name="datatable_ids[]" value="' . $row->id . '" onclick="dataTableRowCheck(' . $row->id . ')">';
            })
            ->addColumn('employee_name', function ($row) {
                return $row->user->name;
            })
            ->editColumn('employee', function ($row) {
                return view('components.employee', [
                    'user' => $row->user
                ]);
            })
            ->addColumn('leave_date', function ($row) {
                return Carbon::parse($row->leave_date)->format($this->global->date_format);
            })
            ->addColumn('status', function ($row) {
                if ($row->status == 'approved') {
                    $class = 'text-light-green';
                    $status = __('app.approved');
                }
                else if ($row->status == 'pending') {
                    $class = 'text-yellow';
                    $status = __('app.pending');
                }
                else {
                    $class = 'text-red';
                    $status = __('app.rejected');
                }

                return '<i class="fa fa-circle mr-1 ' . $class . ' f-10"></i> ' . $status;
            })
            ->addColumn('leave_type', function ($row) {
                $type = '<span class="badge badge-success" style="background-color:' . $row->color . '">' . $row->type_name . '</span>';

                if ($row->duration == 'half day') {
                    if (!is_null($row->half_day_type)) {
                        $type .= ' <div class="badge-inverse badge">'.(($row->half_day_type == 'first_half') ? __('modules.leaves.firstHalf') : __('modules.leaves.secondHalf')) .'</div>';

                    } else {
                        $type .= ' <div class="badge-inverse badge">' . __('modules.leaves.halfDay') . '</div>';
                    }
                }

                return $type;
            })
            ->addColumn('action', function ($row) {

                $actions = '<div class="task_view">

                    <div class="dropdown">
                        <a class="task_view_more d-flex align-items-center justify-content-center dropdown-toggle" type="link" id="dropdownMenuLink-41" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="icon-options-vertical icons"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink-41" tabindex="0" x-placement="bottom-end" style="position: absolute; transform: translate3d(-137px, 26px, 0px); top: 0px; left: 0px; will-change: transform;">';

                    $actions .= '<a href="' . route('leaves.show', [$row->id]) . '" class="dropdown-item openRightModal"><i class="fa fa-eye mr-2"></i>' . __('app.view') . '</a>';

                if ($row->status == 'pending' && $this->approveRejectPermission == 'all') {
                    $actions .= '<a class="dropdown-item leave-action" data-leave-id=' . $row->id . '
                             data-leave-action="approved" data-user-id="' . $row->user_id . '" data-leave-type-id="' . $row->leave_type_id . '" href="javascript:;">
                                <i class="fa fa-check mr-2"></i>
                                ' . __('app.approve') . '
                        </a>
                        <a data-leave-id=' . $row->id . '
                             data-leave-action="rejected" data-user-id="' . $row->user_id . '" data-leave-type-id="' . $row->leave_type_id . '" class="dropdown-item leave-action-reject" href="javascript:;">
                               <i class="fa fa-times mr-2"></i>
                                ' . __('app.reject') . '
                        </a>';
                }

                if ($row->status == 'pending') {
                    if ($this->editLeavePermission == 'all'
                    || ($this->editLeavePermission == 'added' && user()->id == $row->added_by)
                    || ($this->editLeavePermission == 'owned' && user()->id == $row->user_id)
                    || ($this->editLeavePermission == 'both' && (user()->id == $row->user_id || user()->id == $row->added_by))
                    ) {
                        $actions .= '<a class="dropdown-item openRightModal" href="' . route('leaves.edit', [$row->id]) . '">
                                <i class="fa fa-edit mr-2"></i>
                                ' . __('app.edit') . '
                        </a>';
                    }
                }

                if ($this->deleteLeavePermission == 'all'
                || ($this->deleteLeavePermission == 'added' && user()->id == $row->added_by)
                || ($this->deleteLeavePermission == 'owned' && user()->id == $row->user_id)
                || ($this->deleteLeavePermission == 'both' && (user()->id == $row->user_id || user()->id == $row->added_by))
                ) {
                    $actions .= '<a data-leave-id=' . $row->id . '
                            class="dropdown-item delete-table-row" href="javascript:;">
                               <i class="fa fa-trash mr-2"></i>
                                ' . __('app.delete') . '
                        </a>';
                }

                $actions .= '</div> </div> </div>';

                return $actions;
            })
                ->smart(false)
                ->setRowId(function ($row) {
                    return 'row-' . $row->id;
                })
            ->rawColumns(['status', 'leave_type', 'action', 'check', 'employee']);
    }

    /**
     * @param Leave $model
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function query(Leave $model)
    {

        // Will check count leave from the start of the year or nor
        $setting = global_setting();

        $leavesList = $model->with('user', 'user.employeeDetail', 'user.employeeDetail.designation', 'user.session')
            ->join('leave_types', 'leave_types.id', 'leaves.leave_type_id')
            ->join('users', 'leaves.user_id', 'users.id')
            ->select('leaves.*', 'leave_types.color', 'leave_types.type_name');

        if (!is_null(request()->startDate)) {
            $startDate = Carbon::createFromFormat($this->global->date_format, request()->startDate)->toDateString();

            $leavesList->whereRaw('Date(leaves.leave_date) >= ?', [$startDate]);
        }

        if (!is_null(request()->endDate)) {
            $endDate = Carbon::createFromFormat($this->global->date_format, request()->endDate)->toDateString();

            $leavesList->whereRaw('Date(leaves.leave_date) <= ?', [$endDate]);
        }

        if (request()->leave_year != '') {

            $leavesList->whereYear('leaves.leave_date', request()->leave_year);
        }

        if (request()->employeeId != 'all' && request()->employeeId != '') {
            $leavesList->where('users.id', request()->employeeId);
        }

        if (request()->leaveTypeId != 'all' && request()->leaveTypeId != '') {
            $leavesList->where('leave_types.id', request()->leaveTypeId);
        }

        if (request()->status != 'all' && request()->status != '') {
            $leavesList->where('leaves.status', request()->status);
        }

        if (request()->searchText != '') {
            $leavesList->where('users.name', 'like', '%' . request()->searchText . '%');
        }

        if ($this->viewLeavePermission == 'owned') {
            $leavesList->where('leaves.user_id', '=', user()->id);
        }

        if ($this->viewLeavePermission == 'added') {
            $leavesList->where('leaves.added_by', '=', user()->id);
        }

        if ($this->viewLeavePermission == 'both') {
            $leavesList->where(function ($q) {
                $q->where('leaves.user_id', '=', user()->id);;

                $q->orWhere('leaves.added_by', '=', user()->id);;
            });
        }


        return $leavesList;
    }

    /**
     * Optional method if you want to use html builder.
     *
     * @return \Yajra\DataTables\Html\Builder
     */
    public function html()
    {
        return $this->builder()
            ->setTableId('leaves-table')
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
                   window.LaravelDataTables["leaves-table"].buttons().container()
                    .appendTo("#table-actions")
                }',
                'fnDrawCallback' => 'function( oSettings ) {
                    $("body").tooltip({
                        selector: \'[data-toggle="tooltip"]\'
                    });
                    $(".statusChange").selectpicker();
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
            'check' => [
                'title' => '<input type="checkbox" name="select_all_table" id="select-all-table" onclick="selectAllTable(this)">',
                'exportable' => false,
                'orderable' => false,
                'searchable' => false,
                'visible' => ($this->viewLeavePermission == 'all')
            ],
            '#' => ['data' => 'DT_RowIndex', 'orderable' => false, 'searchable' => false, 'visible' => false],
            __('app.id') => ['data' => 'id', 'name' => 'id', 'title' => __('app.id')],
            __('app.employee') => ['data' => 'employee', 'name' => 'user.name', 'exportable' => false, 'title' => __('app.employee')],
            __('app.employee'. ' ') => ['data' => 'employee_name', 'name' => 'user.name', 'visible' => false, 'title' => __('app.employee')],
            __('app.leaveDate') => ['data' => 'leave_date', 'name' => 'leaves.leave_date', 'title' => __('app.leaveDate')],
            __('app.leaveStatus') => ['data' => 'status', 'name' => 'leaves.status', 'title' => __('app.leaveStatus')],
            __('app.leaveType') => ['data' => 'leave_type', 'name' => 'leave_types.type_name', 'title' => __('app.leaveType')],
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
        return 'leaves_' . date('YmdHis');
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
