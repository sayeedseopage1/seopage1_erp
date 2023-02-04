<?php

namespace App\DataTables;

use App\DataTables\BaseDataTable;
use App\Models\Payment;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;

class PaymentsDataTable extends BaseDataTable
{

    private $editPaymentPermission;
    private $deletePaymentPermission;
    private $viewPaymentPermission;

    public function __construct()
    {
        parent::__construct();
        $this->editPaymentPermission = user()->permission('edit_payments');
        $this->deletePaymentPermission = user()->permission('delete_payments');
        $this->viewPaymentPermission = user()->permission('view_payments');
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
                if ($row->gateway == null || $row->gateway == 'Offline' || $row->status == 'failed') {
                    return '<input type="checkbox"  class="select-table-row disabled"  id="datatable-row-' . $row->id . '"  name="datatable_ids[]" value="' . $row->id . '" onclick="dataTableRowCheck(' . $row->id . ')">';
                }
                else{
                    return '<input type="checkbox"  class="select-table-row"  id="datatable-row-' . $row->id . '"  name="datatable_ids[]" value="' . $row->id . '" onclick="dataTableRowCheck(' . $row->id . ')">';
                }
            })
            ->addColumn('action', function ($row) {
                $action = '<div class="task_view">

                <div class="dropdown">
                    <a class="task_view_more d-flex align-items-center justify-content-center dropdown-toggle" type="link"
                        id="dropdownMenuLink-' . $row->id . '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="icon-options-vertical icons"></i>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink-' . $row->id . '" tabindex="0">';

                $action .= '<a href="' . route('payments.show', $row->id) . '" class="openRightModal dropdown-item"><i class="fa fa-eye mr-2"></i>' . __('app.view') . '</a>';

                $action .= '<a href="' . route('payments.download', $row->id) . '" class="dropdown-item"><i class="fa fa-download mr-2"></i>' . __('app.download') . '</a>';

                if (
                    ($this->editPaymentPermission == 'all'
                    || ($this->editPaymentPermission == 'added' && isset($row->added_by) && user()->id == $row->added_by)
                    || ($this->editPaymentPermission == 'owned' && isset($row->invoice) && user()->id == $row->invoice->client_id)
                    || ($this->editPaymentPermission == 'both' && isset($row->invoice) && (user()->id == $row->invoice->client_id && isset($row->added_by) && user()->id == $row->added_by)))
                    && $row->status != 'failed' && ($row->gateway == null || $row->gateway == 'Offline')
                    ) {
                    $action .= '<a class="dropdown-item openRightModal" href="' . route('payments.edit', [$row->id]) . '">
                            <i class="fa fa-edit mr-2"></i>
                            ' . trans('app.edit') . '
                        </a>';
                }

                if (
                    ($this->deletePaymentPermission == 'all'
                    || ($this->deletePaymentPermission == 'added' && user()->id == $row->added_by)
                    || ($this->deletePaymentPermission == 'owned' && isset($row->invoice) && user()->id == $row->invoice->client_id)
                    || ($this->deletePaymentPermission == 'both' && isset($row->invoice) && (user()->id == $row->invoice->client_id && isset($row->added_by) && user()->id == $row->added_by))
                    )
                    && ($row->gateway == 'Offline' || $row->gateway == null || $row->status == 'failed')
                ) {
                    $action .= '<a class="dropdown-item delete-table-row" href="javascript:;" data-payment-id="' . $row->id . '">
                            <i class="fa fa-trash mr-2"></i>
                            ' . trans('app.delete') . '
                        </a>';
                }

                $action .= '</div>
                </div>
            </div>';

                return $action;
            })
            ->addColumn('short_code', function ($row) {
                if (!is_null($row->project)) {
                    return $row->project->project_short_code;
                }
                else {
                    return '--';
                }
            })
            ->editColumn('project_id', function ($row) {
                if (!is_null($row->project)) {
                    return '<a class="text-darkest-grey" href="' . route('projects.show', $row->project_id) . '">' . ucfirst($row->project->project_name) . '</a>';
                }
                else {
                    return '--';
                }
            })
            ->editColumn('invoice_number', function ($row) {
                if (!is_null($row->invoice_id) && !is_null($row->invoice)) {
                    return '<a class="text-darkest-grey" href="' . route('invoices.show', $row->invoice_id) . '">' . ucfirst($row->invoice->invoice_number) . '</a>';
                }
                else {
                    return '--';
                }
            })
            ->editColumn('order_number', function ($row) {
                if (!is_null($row->order_id) && !is_null($row->order)) {
                    return '<a class="text-darkest-grey" href="' . route('orders.show', $row->order_id) . '">' . ucfirst($row->order->order_number) . '</a>';
                }
                else {
                    return '--';
                }
            })
            ->editColumn('status', function ($row) {
                if ($row->status == 'pending') {
                    return '<i class="fa fa-circle mr-1 text-yellow f-10"></i>' . __('app.' . $row->status);
                }
                elseif ($row->status == 'failed') {
                    return '<i class="fa fa-circle mr-1 text-red f-10"></i>' . __('app.' . $row->status);
                }
                else {
                    return '<i class="fa fa-circle mr-1 text-dark-green f-10"></i>' . __('app.' . $row->status);
                }
            })
            ->editColumn('amount', function ($row) {
                $symbol = (isset($row->currency)) ? $row->currency->currency_symbol : '';
                return currency_formatter($row->amount, $symbol);
            })
            ->editColumn(
                'paid_on',
                function ($row) {
                    if (!is_null($row->paid_on)) {
                        return $row->paid_on->format($this->global->date_format);
                    }
                }
            )
            ->addIndexColumn()
            ->smart(false)
            ->setRowId(function ($row) {
                return 'row-' . $row->id;
            })
            ->rawColumns(['invoice', 'action', 'status', 'project_id', 'invoice_number', 'order_number', 'check'])
            ->removeColumn('invoice_id')
            ->removeColumn('currency_symbol')
            ->removeColumn('currency_code')
            ->removeColumn('project_name');
    }

    public function ajax()
    {
        return $this->dataTable($this->query())
            ->make(true);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function query()
    {
        $request = $this->request();

        $model = Payment::with(['project:id,project_short_code,project_name', 'currency:id,currency_symbol,currency_code', 'invoice'])
            ->leftJoin('invoices', 'invoices.id', '=', 'payments.invoice_id')
            ->leftJoin('projects', 'projects.id', '=', 'payments.project_id')
            ->leftJoin('orders', 'orders.id', '=', 'payments.order_id')
            ->select('payments.id', 'payments.project_id', 'payments.currency_id', 'payments.invoice_id', 'payments.amount', 'payments.status', 'payments.paid_on', 'payments.remarks', 'payments.bill', 'payments.added_by', 'payments.order_id', 'payments.gateway');

        if ($request->startDate !== null && $request->startDate != 'null' && $request->startDate != '') {
            $startDate = Carbon::createFromFormat($this->global->date_format, $request->startDate)->toDateString();
            $model = $model->where(DB::raw('DATE(payments.`paid_on`)'), '>=', $startDate);
        }

        if ($request->endDate !== null && $request->endDate != 'null' && $request->endDate != '') {
            $endDate = Carbon::createFromFormat($this->global->date_format, $request->endDate)->toDateString();
            $model = $model->where(DB::raw('DATE(payments.`paid_on`)'), '<=', $endDate);
        }

        if ($request->status != 'all' && !is_null($request->status)) {
            $model = $model->where('payments.status', '=', $request->status);
        }

        if ($request->projectID != 'all' && !is_null($request->projectID)) {
            $model = $model->where('payments.project_id', '=', $request->projectID);
        }

        if ($request->clientID != 'all' && !is_null($request->clientID)) {
            $clientId = $request->clientID;
            $model = $model->where(function ($query) use ($clientId) {
                $query->where('projects.client_id', $clientId)
                    ->orWhere('invoices.client_id', $clientId)
                    ->orWhere('orders.client_id', $clientId);
            });
        }

        if (in_array('client', user_roles())) {
            $model = $model->where(function ($query)  {
                $query->where('projects.client_id', user()->id)
                    ->orWhere('invoices.client_id', user()->id)
                    ->orWhere('orders.client_id', user()->id);
            });
        }

        if ($request->searchText != '') {
            $model = $model->where(function ($query) {
                $query->where('projects.project_name', 'like', '%' . request('searchText') . '%')
                    ->orWhere('payments.amount', 'like', '%' . request('searchText') . '%')
                    ->orWhere('invoices.id', 'like', '%' . request('searchText') . '%')
                    ->orWhere('projects.project_short_code', 'like', '%' . request('searchText') . '%');
            });
        }

        if ($this->viewPaymentPermission == 'added') {
            $model = $model->where('payments.added_by', user()->id);
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
            ->setTableId('payments-table')
            ->columns($this->getColumns())
            ->minifiedAjax()
            ->orderBy(2)
            ->destroy(true)
            ->responsive(true)
            ->serverSide(true)
            ->processing(true)
            ->dom($this->domHtml)

            ->language(__('app.datatable'))
            ->parameters([
                'initComplete' => 'function () {
                   window.LaravelDataTables["payments-table"].buttons().container()
                    .appendTo( "#table-actions")
                }',
                'fnDrawCallback' => 'function( oSettings ) {
                  //
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
                'visible' => !in_array('client', user_roles())
            ],
            '#' => ['data' => 'DT_RowIndex', 'orderable' => false, 'searchable' => false, 'visible' => true],
            // __('app.id') => ['data' => 'id', 'name' => 'payments.id', 'title' => __('app.id')],
            __('modules.taskCode') => ['data' => 'short_code', 'name' => 'project_short_code', 'title' => __('modules.taskCode')],
            __('app.project')  => ['data' => 'project_id', 'name' => 'project_id', 'title' => __('app.project')],
            __('app.invoice') . '#' => ['data' => 'invoice_number', 'name' => 'invoices.invoice_number', 'title' => __('app.invoice') . '#'],
            __('app.order') . '#' => ['data' => 'order_number', 'name' => 'payments.order_id', 'title' => __('app.order') . '#'],
            __('modules.invoices.amount') => ['data' => 'amount', 'name' => 'amount', 'title' => __('modules.invoices.amount')],
            __('modules.payments.paidOn') => ['data' => 'paid_on', 'name' => 'paid_on', 'title' => __('modules.payments.paidOn')],
            __('app.status') => ['data' => 'status', 'name' => 'status', 'title' => __('app.status')],
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
        return 'Payments_' . date('YmdHis');
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
