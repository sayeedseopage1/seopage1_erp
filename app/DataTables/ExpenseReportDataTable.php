<?php

namespace App\DataTables;

use App\Models\Expense;
use Carbon\Carbon;
use DB;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;
use Yajra\DataTables\Html\Editor\Editor;
use Yajra\DataTables\Html\Editor\Fields;
use Yajra\DataTables\Services\DataTable;

class ExpenseReportDataTable extends BaseDataTable
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
            ->addColumn('check', function ($row) {
                return '<input type="checkbox" class="select-table-row" id="datatable-row-' . $row->id . '"  name="datatable_ids[]" value="' . $row->id . '" onclick="dataTableRowCheck(' . $row->id . ')">';
            })
            ->editColumn('price', function ($row) {
                return $row->total_amount;
            })
            ->editColumn('item_name', function ($row) {
                if (is_null($row->expenses_recurring_id)) {
                    return '<a href="' . route('expenses.show', $row->id) . '" class="openRightModal text-darkest-grey">' . $row->item_name . '</a>';
                }

                return '<a href="' . route('expenses.show', $row->id) . '" class="openRightModal text-darkest-grey">' . $row->item_name . '</a>
                <p class="mb-0"><span class="badge badge-primary"> ' . __('app.recurring') . ' </span></p>';
            })
            ->addColumn('export_item_name', function ($row) {
                    return ucfirst($row->item_name);
            })
            ->addColumn('employee_name', function($row) {
                return ucfirst($row->user->name);
            })
            ->editColumn('user_id', function ($row) {
                return view('components.employee', [
                    'user' => $row->user
                ]);
            })
            ->addColumn('status', function ($row) {
                return '<i class="fa fa-circle mr-1 text-dark-green f-10"></i>' . __('app.' . $row->status);
            })
            ->editColumn(
                'purchase_date',
                function ($row) {
                    if (!is_null($row->purchase_date)) {

                        return $row->purchase_date->format($this->global->date_format);
                    }
                }
            )
            ->editColumn(
                'purchase_from',
                function ($row) {
                    return !is_null($row->purchase_from) ? $row->purchase_from : '--';
                }
            )
            ->smart(false)
            ->setRowId(function ($row) {
                return 'row-' . $row->id;
            })
            ->addIndexColumn()
            ->rawColumns(['action', 'status', 'user_id', 'item_name', 'check'])
            ->removeColumn('currency_id')
            ->removeColumn('name')
            ->removeColumn('currency_symbol')
            ->removeColumn('updated_at')
            ->removeColumn('created_at');
    }

    /**
     * Get query source of dataTable.
     *
     * @param \App\Models\ExpenseReportDataTable $model
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function query()
    {
        $request = $this->request();
        $model = Expense::with('currency', 'user', 'user.employeeDetail', 'user.employeeDetail.designation', 'user.session')
            ->select('expenses.id', 'expenses.item_name', 'expenses.user_id', 'expenses.price', 'users.name', 'expenses.purchase_date', 'expenses.currency_id', 'currencies.currency_symbol', 'expenses.status', 'expenses.purchase_from', 'expenses.expenses_recurring_id', 'designations.name as designation_name', 'expenses.added_by')
            ->join('users', 'users.id', 'expenses.user_id')
            ->leftJoin('employee_details', 'employee_details.user_id', '=', 'users.id')
            ->leftJoin('designations', 'employee_details.designation_id', '=', 'designations.id')
            ->leftJoin('project_members', 'project_members.id', '=', 'expenses.user_id')
            ->join('currencies', 'currencies.id', 'expenses.currency_id');

        if ($request->startDate !== null && $request->startDate != 'null' && $request->startDate != '') {
            $startDate = Carbon::createFromFormat($this->global->date_format, $request->startDate)->toDateString();
            $model = $model->where(DB::raw('DATE(expenses.`purchase_date`)'), '>=', $startDate);
        }

        if ($request->endDate !== null && $request->endDate != 'null' && $request->endDate != '') {
            $endDate = Carbon::createFromFormat($this->global->date_format, $request->endDate)->toDateString();
            $model = $model->where(DB::raw('DATE(expenses.`purchase_date`)'), '<=', $endDate);
        }

        if ($request->categoryID != 'all' && !is_null($request->categoryID)) {
            $model = $model->where('expenses.category_id', '=', $request->categoryID);
        }

        if ($request->projectID != 'all' && !is_null($request->projectID)) {
            $model = $model->where('expenses.project_id', '=', $request->projectID);
        }

        if ($request->employeeID != 'all' && !is_null($request->employeeID)) {
            $employeeID = $request->employeeID;
            $model = $model->where(function ($query) use ($employeeID) {
                $query->where('expenses.user_id', $employeeID);
            });
        }

        if ($request->searchText != '') {
            $model = $model->where(function ($query) {
                $query->where('projects.project_name', 'like', '%' . request('searchText') . '%')
                    ->orWhere('expenses.price', 'like', '%' . request('searchText') . '%');
            });
        }

        $model = $model->where('expenses.status', 'approved');

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
            ->setTableId('expense-report-table')
            ->columns($this->getColumns())
            ->minifiedAjax()
            ->dom('Bfrtip')
            ->orderBy(1)
            ->destroy(true)
            ->responsive(true)
            ->serverSide(true)
            ->stateSave(true)
            ->processing(true)
            ->dom($this->domHtml)

            ->language(__('app.datatable'))
            ->parameters([
                'initComplete' => 'function () {
                   window.LaravelDataTables["expense-report-table"].buttons().container()
                    .appendTo("#table-actions")
                }',
                'fnDrawCallback' => 'function( oSettings ) {
                    $("#expense-report-table .select-picker").selectpicker();
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
            __('modules.expenses.itemName')  => ['data' => 'item_name', 'name' => 'item_name', 'exportable' => false, 'title' => __('modules.expenses.itemName')],
            __('app.menu.itemName')  => ['data' => 'export_item_name', 'name' => 'export_item_name', 'visible' => false, 'title' => __('modules.expenses.itemName')],
            __('app.price') => ['data' => 'price', 'name' => 'price', 'title' => __('app.price')],
            __('app.menu.employees') => ['data' => 'user_id', 'name' => 'user_id', 'exportable' => false, 'title' => __('app.menu.employees')],
            __('app.employee') => ['data' => 'employee_name', 'name' => 'user_id', 'visible' => false, 'title' => __('app.employee')],
            __('modules.expenses.purchaseFrom') => ['data' => 'purchase_from', 'name' => 'purchase_from', 'title' => __('modules.expenses.purchaseFrom')],
            __('modules.expenses.purchaseDate') => ['data' => 'purchase_date', 'name' => 'purchase_date', 'title' => __('modules.expenses.purchaseDate')],
            __('app.status') => ['data' => 'status', 'name' => 'status', 'exportable' => false, 'title' => __('app.status')],
            __('app.status').' '.__('app.status') => ['data' => 'status', 'name' => 'status', 'visible' => false, 'title' => __('app.expense')]
        ];
    }

    /**
     * Get filename for export.
     *
     * @return string
     */
    protected function filename()
    {
        return 'ExpenseReport_' . date('YmdHis');
    }

}
