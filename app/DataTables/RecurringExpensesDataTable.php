<?php

namespace App\DataTables;

use App\DataTables\BaseDataTable;
use App\Models\ExpenseRecurring;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;

class RecurringExpensesDataTable extends BaseDataTable
{

    protected $invoiceSettings;
    private $viewExpensesPermission;
    private $deleteExpensePermission;
    private $editExpensePermission;

    public function __construct()
    {
        parent::__construct();
        $this->viewExpensesPermission = user()->permission('view_expenses');
        $this->deleteExpensePermission = user()->permission('delete_expenses');
        $this->editExpensePermission = user()->permission('edit_expenses');
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
                $action = '<div class="task_view">
                
                <div class="dropdown">
                    <a class="task_view_more d-flex align-items-center justify-content-center dropdown-toggle" type="link"
                        id="dropdownMenuLink-' . $row->id . '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="icon-options-vertical icons"></i>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink-' . $row->id . '" tabindex="0">';

                    $action .= '<a href="' . route('recurring-expenses.show', [$row->id]) . '" class="dropdown-item"><i class="fa fa-eye mr-2"></i>' . __('app.view') . '</a>';

                if ($this->editExpensePermission == 'all' || ($this->editExpensePermission == 'added' && $row->added_by == user()->id)) {
                    $action .= '<a class="dropdown-item openRightModal" href="' . route('recurring-expenses.edit', $row->id) . '" >
                                <i class="fa fa-edit mr-2"></i>
                                ' . trans('app.edit') . '
                            </a>';
                }

                if ($this->deleteExpensePermission == 'all' || ($this->deleteExpensePermission == 'added' && $row->added_by == user()->id)) {
                    $action .= '<a class="dropdown-item delete-invoice" href="javascript:;" data-toggle="tooltip"  data-invoice-id="' . $row->id . '">
                                    <i class="fa fa-trash mr-2"></i>
                                    ' . trans('app.delete') . '
                                </a>';
                }

                $action .= '</div>
                    </div>
                </div>';

                return $action;
            })
            ->editColumn('price', function ($row) {
                return $row->total_amount;
            })
            ->editColumn('user_id', function ($row) {
                return view('components.employee', [
                    'user' => $row->user
                ]);
            })
            ->addColumn('employee_name', function($row) {
                return ucfirst($row->user->name);
            })
            ->addColumn('status', function ($row) {

                $selectActive = $row->status == 'active' ? 'selected' : '';
                $selectInactive = $row->status != 'active' ? 'selected' : '';

                $role = '<select class="form-control select-picker change-expense-status" data-expense-id="'.$row->id.'">';

                $role .= '<option data-content="<i class=\'fa fa-circle mr-2 text-light-green\'></i> ' .  __('app.active') . '" value="active" '.$selectActive.'> '.__('app.active').' </option>';
                $role .= '<option data-content="<i class=\'fa fa-circle mr-2 text-red\'></i> ' .  __('app.inactive') . '" value="inactive" '.$selectInactive.'> '.__('app.inactive').' </option>';

                $role .= '</select>';
                return $role;
            })
            ->addColumn('status_export', function ($row) {
                return ucfirst($row->status);
            })
            ->addIndexColumn()
            ->rawColumns(['action', 'status', 'user_id'])
            ->removeColumn('currency_id')
            ->removeColumn('name')
            ->removeColumn('currency_symbol')
            ->removeColumn('updated_at')
            ->removeColumn('created_at');

    }

    /**
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function query(ExpenseRecurring $model)
    {
        $request = $this->request();

        $model = $model->with(['project' => function ($q) {
            $q->withTrashed();
            $q->select('id', 'project_name', 'client_id');
        }, 'currency:id,currency_symbol,currency_code', 'project.client', 'user'])
            ->select('expenses_recurring.id', 'expenses_recurring.project_id', 'expenses_recurring.currency_id', 'expenses_recurring.price', 'expenses_recurring.status', 'expenses_recurring.item_name', 'expenses_recurring.user_id');

        if ($request->status != 'all' && !is_null($request->status)) {
            $model = $model->where('expenses_recurring.status', '=', $request->status);
        }

        if ($request->projectID != 'all' && !is_null($request->projectID)) {
            $model = $model->where('expenses_recurring.project_id', '=', $request->projectID);
        }

        if ($request->searchText != '') {
            $model = $model->where(function ($query) {
                $query->where('expenses_recurring.id', 'like', '%' . request('searchText') . '%')
                    ->orWhere('expenses_recurring.price', 'like', '%' . request('searchText') . '%');
            });
        }

        $model = $model->whereHas('project', function ($q) {
            $q->whereNull('deleted_at');
        }, '>=', 0);

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
            ->setTableId('recurring-expenses-table')
            ->columns($this->getColumns())
            ->minifiedAjax()
            ->orderBy(0)
            ->destroy(true)
            ->responsive(true)
            ->serverSide(true)
            ->processing(true)
            ->dom($this->domHtml)

            ->language(__('app.datatable'))
            ->parameters([
                'initComplete' => 'function () {
                    window.LaravelDataTables["recurring-expenses-table"].buttons().container()
                    .appendTo( "#table-actions")
                }',
                'fnDrawCallback' => 'function( oSettings ) {
                    $(".change-expense-status").selectpicker();
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
            '#' => ['data' => 'DT_RowIndex', 'orderable' => false, 'searchable' => false ],
            __('modules.expenses.itemName')  => ['data' => 'item_name', 'name' => 'item_name', 'title' => __('modules.expenses.itemName')],
            __('app.price') => ['data' => 'price', 'name' => 'price', 'title' => __('app.price')],
            __('app.menu.employees') => ['data' => 'user_id', 'name' => 'user_id', 'title' => __('app.menu.employees'), 'exportable' => false],
            __('app.employee') => ['data' => 'employee_name', 'name' => 'user_id', 'visible' => false, 'title' => __('app.employee')],
            __('app.status') => ['data' => 'status', 'name' => 'status', 'exportable' => false, 'title' => __('app.status')],
            __('app.expense').' '.__('app.status') => ['data' => 'status_export', 'name' => 'status_export', 'visible' => false, 'title' => __('app.status')],
            Column::computed('action', __('app.action'))
                ->exportable(false)
                ->printable(false)
                ->orderable(false)
                ->searchable(false)
                ->width(150)
                ->addClass('text-center')
        ];
    }

    /**
     * Get filename for export.
     *
     * @return string
     */
    protected function filename()
    {
        return 'Recurring_Expenses_' . date('YmdHis');
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
