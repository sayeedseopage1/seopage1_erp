<?php

namespace App\DataTables;

use App\DataTables\BaseDataTable;
use App\Models\RecurringInvoice;
use App\Scopes\CompanyScope;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;

class InvoiceRecurringDataTable extends BaseDataTable
{
    protected $firstInvoice;
    protected $invoiceSettings;
    private $viewInvoicePermission;
    private $deleteInvoicePermission;
    private $editInvoicePermission;

    public function __construct()
    {
        parent::__construct();
        $this->viewInvoicePermission = user()->permission('view_invoices');
        $this->deleteInvoicePermission = user()->permission('delete_invoices');
        $this->editInvoicePermission = user()->permission('edit_invoices');
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
            ->addColumn('action', function ($row) {
                $action = '<div class="task_view">
                
                <div class="dropdown">
                    <a class="task_view_more d-flex align-items-center justify-content-center dropdown-toggle" type="link"
                        id="dropdownMenuLink-' . $row->id . '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="icon-options-vertical icons"></i>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink-' . $row->id . '" tabindex="0">';

                    $action .= '<a href="' . route('recurring-invoices.show', [$row->id]) . '" class="dropdown-item"><i class="fa fa-eye mr-2"></i>' . __('app.view') . '</a>';

                if ($this->editInvoicePermission == 'all' || ($this->editInvoicePermission == 'added' && $row->added_by == user()->id)) {
                    $action .= '<a class="dropdown-item" href="' . route('recurring-invoices.edit', $row->id) . '" >
                                <i class="fa fa-edit mr-2"></i>
                                ' . trans('app.edit') . '
                            </a>';
                }

                if ($this->deleteInvoicePermission == 'all' || ($this->deleteInvoicePermission == 'added' && $row->added_by == user()->id)) {
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

            ->editColumn('project_name', function ($row) {
                if ($row->project_id != null) {
                    return '<a href="' . route('projects.show', $row->project_id) . '" class="text-darkest-grey">' . ucfirst($row->project->project_name) . '</a>';
                }

                return '--';
            })
            ->addColumn('client_name', function ($row) {
                if ($row->project && $row->project->client) {
                    return ucfirst($row->project->client->name);
                }
                else if ($row->client_id != '') {
                    return ucfirst($row->client->name);
                }
                else if ($row->estimate && $row->estimate->client) {
                    return ucfirst($row->estimate->client->name);
                }
                else {
                    return '--';
                }
            })
            ->editColumn('name', function ($row) {
                if ($row->project && $row->project->client) {
                    $client = $row->project->client;
                }
                else if ($row->client_id != '') {
                    $client = $row->client;
                }
                else if ($row->estimate && $row->estimate->client) {
                    $client = $row->estimate->client;
                }
                else {
                    return '--';
                }

                return view('components.client', [
                    'user' => $client
                ]);
            })

            ->addColumn('invoice_status', function ($row) {
                return __('app.'.$row->status);
            })
            ->addColumn('status', function ($row) {

                $selectActive = $row->status == 'active' ? 'selected' : '';
                $selectInactive = $row->status != 'active' ? 'selected' : '';

                $role = '<select class="form-control select-picker change-invoice-status" data-invoice-id="'.$row->id.'">';

                $role .= '<option data-content="<i class=\'fa fa-circle mr-2 text-light-green\'></i> ' .  __('app.active') . '" value="active" '.$selectActive.'> '.__('app.active').' </option>';
                $role .= '<option data-content="<i class=\'fa fa-circle mr-2 text-red\'></i> ' .  __('app.inactive') . '" value="inactive" '.$selectInactive.'> '.__('app.inactive').' </option>';

                $role .= '</select>';
                return $role;
            })

            ->editColumn('total', function ($row) {
                $currencySymbol = $row->currency->currency_symbol;

                return '<div class="">' . __('app.total') . ': ' . currency_formatter($row->total, $currencySymbol) . '</div>';
            })
            ->editColumn(
                'issue_date',
                function ($row) {
                    return $row->issue_date->timezone($this->global->timezone)->format($this->global->date_format);
                }
            )
            ->rawColumns(['project_name', 'action', 'status', 'total'])
            ->removeColumn('currency_symbol')
            ->removeColumn('currency_code')
            ->removeColumn('project_id');
    }

    /**
     * @param RecurringInvoice $model
     * @return $this|RecurringInvoice
     */
    public function query(RecurringInvoice $model)
    {
        $request = $this->request();

        $model = $model->with(['project' => function ($q) {
            $q->withTrashed();
            $q->select('id', 'project_name', 'client_id');
        }, 'currency:id,currency_symbol,currency_code', 'project.client'])
            ->select('invoice_recurring.id', 'invoice_recurring.project_id', 'invoice_recurring.client_id', 'invoice_recurring.currency_id', 'invoice_recurring.total', 'invoice_recurring.status', 'invoice_recurring.issue_date', 'invoice_recurring.show_shipping_address');

        if ($request->startDate !== null && $request->startDate != 'null' && $request->startDate != '') {
            $startDate = Carbon::createFromFormat($this->global->date_format, $request->startDate)->toDateString();
            $model = $model->where(DB::raw('DATE(invoice_recurring.`issue_date`)'), '>=', $startDate);
        }

        if ($request->endDate !== null && $request->endDate != 'null' && $request->endDate != '') {
            $endDate = Carbon::createFromFormat($this->global->date_format, $request->endDate)->toDateString();
            $model = $model->where(DB::raw('DATE(invoice_recurring.`issue_date`)'), '<=', $endDate);
        }

        if ($request->status != 'all' && !is_null($request->status)) {
            $model = $model->where('invoice_recurring.status', '=', $request->status);
        }

        if ($request->projectID != 'all' && !is_null($request->projectID)) {
            $model = $model->where('invoice_recurring.project_id', '=', $request->projectID);
        }

        if ($request->clientID != 'all' && !is_null($request->clientID)) {
            $model = $model->where('invoice_recurring.client_id', $request->clientID);
        }

        if ($request->searchText != '') {
            $model = $model->where(function ($query) {
                $query->where('invoice_recurring.id', 'like', '%' . request('searchText') . '%')
                    ->orWhere('invoice_recurring.total', 'like', '%' . request('searchText') . '%');
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
            ->setTableId('invoices-recurring-table')
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
                   window.LaravelDataTables["invoices-recurring-table"].buttons().container()
                    .appendTo("#table-actions")
                }',
                'fnDrawCallback' => 'function( oSettings ) {
                    $(".change-invoice-status").selectpicker();
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
        $modules = $this->user->modules;

        $dsData = [
            __('app.id') => ['data' => 'id', 'name' => 'id', 'visible' => false, 'title' => __('app.id')],
            '#' => ['data' => 'DT_RowIndex', 'orderable' => false, 'searchable' => false],
            __('app.client') => ['data' => 'name', 'name' => 'project.client.name', 'exportable' => false, 'title' => __('app.client')],
            __('app.customers')  => ['data' => 'client_name', 'name' => 'project.client.name', 'visible' => false, 'title' => __('app.customers')],
            __('modules.invoices.total') => ['data' => 'total', 'name' => 'total', 'title' => __('modules.invoices.total')],
            __('modules.invoices.invoiceDate') => ['data' => 'issue_date', 'name' => 'issue_date', 'title' => __('modules.invoices.invoiceDate')],
            __('app.status') => ['data' => 'status', 'name' => 'status', 'exportable' => false, 'title' => __('app.status')],
            __('app.invoice').' '.__('app.status') => ['data' => 'invoice_status', 'name' => 'status', 'visible' => false, 'title' => __('app.invoice')],
            Column::computed('action', __('app.action'))
                ->exportable(false)
                ->printable(false)
                ->orderable(false)
                ->searchable(false)
                ->width(150)
                ->addClass('text-right pr-20')
        ];

        if(in_array('projects', $modules) ){
            $dsData = array_slice($dsData, 0, 3, true) + [ __('app.project')  => ['data' => 'project_name', 'name' => 'project.project_name']] + array_slice($dsData, 3, count($dsData) - 1, true);
        }

        return $dsData;
    }

    /**
     * Get filename for export.
     *
     * @return string
     */
    protected function filename()
    {
        return 'Invoices_recurring_' . date('YmdHis');
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
