<?php

namespace App\DataTables;

use App\Models\MonthlyIncentive;
use App\Models\User;
use App\Models\UserIncentive;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;
use Yajra\DataTables\Services\DataTable;
use Yajra\DataTables\Html\Editor\Fields;
use Yajra\DataTables\Html\Editor\Editor;

class MonthlyIncentiveDataTable extends DataTable
{
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
            // ->addColumn('check', function ($row) {
            //     return '<input type="checkbox" class="select-table-row" id="datatable-row-' . $row->id . '"  name="datatable_ids[]" value="' . $row->id . '" onclick="dataTableRowCheck(' . $row->id . ')">';
            // })
            ->addColumn('action', function ($row) {

                $action = '<div class="task_view">

                <div class="dropdown">
                    <a class="task_view_more d-flex align-items-center justify-content-center dropdown-toggle" type="link"
                        id="dropdownMenuLink-' . $row->id . '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="icon-options-vertical icons"></i>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink-' . $row->id . '" tabindex="0">';

                $action .= ' <a href="' . route('monthly-incentive.show', [$row->id]) . '" class="dropdown-item"><i class="fa fa-eye mr-2"></i>' . __('app.view') . '</a>';
                $action .= ' <a href="' . route('monthly-incentive.download', [$row->id]) . '" class="dropdown-item"><i class="fa fa-download mr-2"></i>' . __('app.download') . '</a>';

                return $action;
            })
            ->editColumn('month', function ($row) {
                return date('M (Y)', strtotime($row->month));
            })
            ->editColumn('name', function ($row) {
                $user = User::where('id',$row->user_id)->first();
                return '<a class="text-darkest-grey" href="' . route('employees.show', $user->id) . '">' . $user->name . '</a>';
            })
            ->editColumn('non_incentive_points', function ($row) {
                return $row->non_incentive_points;
            })
            ->editColumn('shift_achieved_points', function ($row) {
                return $row->shift_achieved_points;
            })
            ->editColumn('shift_incentive_achievable_point', function ($row) {
                return $row->shift_incentive_achievable_point;
            })
            ->editColumn('contribution', function ($row) {
                return ($row->contribution).'%';
            })
            ->editColumn('user_achieved_points', function ($row) {
                return $row->user_achieved_points;
            })
            ->editColumn('amount_before_deduction', function ($row) {
                return $row->amount_before_deduction;
            })
            ->editColumn('user_deducted_points', function ($row) {
                return $row->user_deducted_points;
            })
            ->editColumn('user_point_after_deduction', function ($row) {
                return $row->user_point_after_deduction;
            })
            ->editColumn('amount_after_deduction', function ($row) {
                return ($row->amount_after_deduction).' BDT';
            })
            ->editColumn('deducted_incentive_amount', function ($row) {
                return ($row->deducted_incentive_amount).' BDT';
            })
            ->editColumn('incentive_amount_after_20_percent_held', function ($row) {
                return ($row->incentive_amount_after_20_percent_held).' BDT';
            })
            ->editColumn('incentive_held_amount', function ($row) {
                return ($row->incentive_held_amount).' BDT';
            })
            ->editColumn('final_payable_incentive_amount', function ($row) {
                return ($row->final_payable_incentive_amount).' BDT';
            })
            ->editColumn('minimum_shift_goals', function ($row) {
                return $row->minimum_shift_goals;
            })
            ->editColumn('minimum_shift_goals_achieved', function ($row) {
                return $row->minimum_shift_goals_achieved;
            })
            ->editColumn('milestone_goals', function ($row) {
                return $row->milestone_goals;
            })
            ->editColumn('milestone_goals_achieved', function ($row) {
                return $row->milestone_goals_achieved;
            })
            ->editColumn('team_goal', function ($row) {
                return $row->team_goal;
            })
            ->editColumn('total_team_goal_achieved', function ($row) {
                return $row->total_team_goal_achieved;
            })
            ->editColumn('total_goals', function ($row) {
                return $row->total_goals;
            })
            ->editColumn('total_goals_achieved', function ($row) {
                return $row->total_goals_achieved;
            })
            ->addIndexColumn()
            ->smart(false)
            ->setRowId(function ($row) {
                return 'row-' . $row->id;
            })
            ->rawColumns(['action','month','name','non_incentive_points','shift_achieved_points','shift_incentive_achievable_point','contribution','user_achieved_points','amount_before_deduction','user_deducted_points','user_point_after_deduction','amount_after_deduction','deducted_incentive_amount','incentive_amount_after_20_percent_held','incentive_held_amount','final_payable_incentive_amount','minimum_shift_goals','minimum_shift_goals_achieved','milestone_goals','milestone_goals_achieved','team_goal','total_team_goal_achieved','total_goals','total_goals_achieved']);
    }

    /**
     * Get query source of dataTable.
     *
     * @param \App\Models\MonthlyIncentive $model
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function query(UserIncentive $model)
    {
        $request = $this->request();
        // dd($request->month);
        $model = $model->newQuery()->where('status', '0')->orderBy('id', 'desc')->when(auth()->user()->role_id != 1, function ($query) {
                return $query->where('user_id', auth()->id());
            });

        if (!is_null($request->user_id) && $request->user_id != 'all') {
            $model->where('user_incentives.user_id', $request->user_id);
        }

        if ($request->year !=null) {
            $model->whereYear('user_incentives.month', $request->year);
        }

        if ($request->month !=null) {
            $model->whereMonth('user_incentives.month', $request->month);
        }

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
            ->setTableId('monthlyincentive-table')
            ->columns($this->getColumns())
            ->minifiedAjax()
            ->destroy(true)
            ->responsive(true)
            ->serverSide(true)
            ->stateSave(true)
            ->processing(true)
            ->language(__('app.datatable'))
            ->parameters([
                'initComplete' => 'function () {
                   window.LaravelDataTables["monthlyincentive-table"].buttons().container()
                    .appendTo( "#table-actions")
                }',
                'fnDrawCallback' => 'function( oSettings ) {
                  //
                }',
                'scrollX' => true
                /* 'buttons'      => ['excel'] */
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
            // 'check' => [
            //     'title' => '<input type="checkbox" name="select_all_table" id="select-all-table" onclick="selectAllTable(this)">',
            //     'exportable' => false,
            //     'orderable' => false,
            //     'searchable' => false,
            //     'visible' => !in_array('client', user_roles())
            // ],
            '#' => ['data' => 'DT_RowIndex', 'orderable' => false, 'searchable' => false, 'visible' => true],


             __('app.month') => ['data' => 'month', 'name' => 'month', 'exportable' => false, 'title' => __('Month')],
             __('app.name') => ['data' => 'name', 'name' => 'user_id', 'exportable' => false, 'title' => __('Name')],
             __('app.non_incentive_points') => ['data' => 'non_incentive_points', 'name' => 'non_incentive_points', 'exportable' => false, 'title' => __('Non Incentive Points')],
             __('app.shift_achieved_points') => ['data' => 'shift_achieved_points', 'name' => 'shift_achieved_points', 'exportable' => false, 'title' => __('Shift\'s Achieved Point')],
             __('app.shift_incentive_achievable_point') => ['data' => 'shift_incentive_achievable_point', 'name' => 'shift_incentive_achievable_point', 'exportable' => false, 'title' => __('Shift\'s Incentive Achievable Point')],
             __('app.contribution') => ['data' => 'contribution', 'name' => 'contribution', 'exportable' => false, 'title' => __('User Contribution')],
             __('app.user_achieved_points') => ['data' => 'user_achieved_points', 'name' => 'user_achieved_points', 'exportable' => false, 'title' => __('User\'s Achieved Point')],
             __('app.amount_before_deduction') => ['data' => 'amount_before_deduction', 'name' => 'amount_before_deduction', 'exportable' => false, 'title' => __('Amount Before Deduction')],
             __('app.user_deducted_points') => ['data' => 'user_deducted_points', 'name' => 'user_deducted_points', 'exportable' => false, 'title' => __('User\'s Deducted Point')],
             __('app.user_point_after_deduction') => ['data' => 'user_point_after_deduction', 'name' => 'user_point_after_deduction', 'exportable' => false, 'title' => __('User\'s Point\'s After Deduction')],
             __('app.amount_after_deduction') => ['data' => 'amount_after_deduction', 'name' => 'amount_after_deduction', 'exportable' => false, 'title' => __('Amount After Deduction')],
             __('app.deducted_incentive_amount') => ['data' => 'deducted_incentive_amount', 'name' => 'deducted_incentive_amount', 'exportable' => false, 'title' => __('Deducted Incentive Amount')],
             __('app.incentive_amount_after_20_percent_held') => ['data' => 'incentive_amount_after_20_percent_held', 'name' => 'incentive_amount_after_20_percent_held', 'exportable' => false, 'title' => __('Incentive Amount After 20% Held')],
             __('app.incentive_held_amount') => ['data' => 'incentive_held_amount', 'name' => 'incentive_held_amount', 'exportable' => false, 'title' => __('Incentive Held Amount')],
             __('app.final_payable_incentive_amount') => ['data' => 'final_payable_incentive_amount', 'name' => 'final_payable_incentive_amount', 'exportable' => false, 'title' => __('Final Payable Incentive Amount')],
             __('app.minimum_shift_goals') => ['data' => 'minimum_shift_goals', 'name' => 'minimum_shift_goals', 'exportable' => false, 'title' => __('Minimum Shift Goal')],
             __('app.minimum_shift_goals_achieved') => ['data' => 'minimum_shift_goals_achieved', 'name' => 'minimum_shift_goals_achieved', 'exportable' => false, 'title' => __('Minimum Shift Goal Achieved')],
             __('app.milestone_goals') => ['data' => 'milestone_goals', 'name' => 'milestone_goals', 'exportable' => false, 'title' => __('Shift Milestone')],
             __('app.milestone_goals_achieved') => ['data' => 'milestone_goals_achieved', 'name' => 'milestone_goals_achieved', 'exportable' => false, 'title' => __('Shift Milestone Achieved')],
             __('app.team_goal') => ['data' => 'team_goal', 'name' => 'team_goal', 'exportable' => false, 'title' => __('Total Team Goal')],
             __('app.total_team_goal_achieved') => ['data' => 'total_team_goal_achieved', 'name' => 'total_team_goal_achieved', 'exportable' => false, 'title' => __('Team Goal Achieved')],
             __('app.total_goals') => ['data' => 'total_goals', 'name' => 'total_goals', 'exportable' => false, 'title' => __('Total Goals')],
             __('app.total_goals_achieved') => ['data' => 'total_goals_achieved', 'name' => 'total_goals_achieved', 'exportable' => false, 'title' => __('Achieved Goals')],
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
        return 'MonthlyIncentive_' . date('YmdHis');
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
