<?php

namespace App\DataTables;

use Carbon\Carbon;
use App\Models\Invoice;
use App\Models\CustomField;
use App\Models\CustomFieldGroup;
use App\DataTables\BaseDataTable;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;
use Illuminate\Support\Facades\DB;

class InvoicesDataTable extends BaseDataTable
{
    protected $firstInvoice;
    private $viewInvoicePermission;
    private $deleteInvoicePermission;
    private $editInvoicePermission;
    private $addPaymentPermission;
    private $viewProjectInvoicePermission;

    public function __construct()
    {
        parent::__construct();
        $this->viewInvoicePermission = user()->permission('view_invoices');
        $this->deleteInvoicePermission = user()->permission('delete_invoices');
        $this->editInvoicePermission = user()->permission('edit_invoices');
        $this->addPaymentPermission = user()->permission('add_payments');
        $this->viewProjectInvoicePermission = user()->permission('view_project_invoices');
    }

    /**
     * Build DataTable class.
     *
     * @param mixed $query Results from query() method.
     * @return \Yajra\DataTables\DataTableAbstract
     */
    public function dataTable($query)
    {
        $invoice = new Invoice();
        $customFieldsGroupsId = CustomFieldGroup::where('model', $invoice->customFieldModel)->pluck('id')->first();
        $customFields = CustomField::where('custom_field_group_id', $customFieldsGroupsId)->where('export', 1)->get();

        $firstInvoice = $this->firstInvoice;
        $datatables = datatables()->eloquent($query);
        $datatables->addIndexColumn();
        $datatables->addColumn('action', function ($row) use ($firstInvoice) {
                $action = '<div class="task_view">

                <div class="dropdown">
                    <a class="task_view_more d-flex align-items-center justify-content-center dropdown-toggle" type="link"
                        id="dropdownMenuLink-' . $row->id . '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="icon-options-vertical icons"></i>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink-' . $row->id . '" tabindex="0">';

                    $action .= '<a href="' . route('invoices.show', [$row->id]) . '" class="dropdown-item"><i class="fa fa-eye mr-2"></i>' . __('app.view') . '</a>';

            if (
                $this->viewInvoicePermission == 'all'
                || ($this->viewInvoicePermission == 'added' && user()->id == $row->added_by)
                || ($this->viewInvoicePermission == 'owned' && user()->id == $row->client_id)
                || $this->viewProjectInvoicePermission == 'owned' && !is_null($row->project_id) && user()->id == $row->project->client_id
            ) {
                $action .= '<a class="dropdown-item" href="' . route('invoices.download', [$row->id]) . '">
                                <i class="fa fa-download mr-2"></i>
                                ' . trans('app.download') . '
                            </a>';
            }

            if ($row->status != 'canceled' && !in_array('client', user_roles()) && $row->credit_note == 0) {
                $action .= '<a class="dropdown-item sendButton" href="javascript:;" data-toggle="tooltip"  data-invoice-id="' . $row->id . '">
                                <i class="fa fa-paper-plane mr-2"></i>
                                ' . trans('app.send') . '
                            </a>';
            }

            $edit = '<a class="dropdown-item openRightModal" href="' . route('invoices.edit', $row->id) . '" >
                        <i class="fa fa-edit mr-2"></i>
                        ' . trans('app.edit') . '
                    </a>';

            if ($row->status == 'paid' && !in_array('client', user_roles()) && $row->credit_note == 0) {
                $action .= '<a class="dropdown-item invoice-upload" href="javascript:;" data-toggle="tooltip"  data-invoice-id="' . $row->id . '">
                                <i class="fa fa-upload mr-2"></i>
                                ' . trans('app.upload') . '
                            </a>';

                if ($row->amountPaid() == 0 && $row->amountDue() > 0) {
                    $action .= $edit;
                }
            }

            if ($row->status != 'paid' && $row->status != 'canceled') {
                if (is_null($row->invoice_recurring_id)) {
                    if (
                        $this->editInvoicePermission == 'all'
                        || ($this->editInvoicePermission == 'added' && $row->added_by == user()->id)
                        || ($this->editInvoicePermission == 'owned' && $row->client_id == user()->id)
                        || ($this->editInvoicePermission == 'both' && ($row->client_id == user()->id || $row->added_by == user()->id))
                        ) {
                        $action .= $edit;
                    }
                }

                if (!in_array('client', user_roles()) && in_array('payments', $this->user->modules) && $row->credit_note == 0 && $row->status != 'draft' && $row->send_status) {
                    if (
                        $this->addPaymentPermission == 'all'
                        || ($this->addPaymentPermission == 'added' && $row->added_by == user()->id)
                    ) {
                        $action .= '<a class="dropdown-item openRightModal"
                        data-redirect-url="'.route('invoices.index') .'" href="' . route('payments.create') . '?invoice_id=' . $row->id . '&default_client='.$row->client_id.'" >
                                    <i class="fa fa-plus mr-2"></i>
                                    ' . trans('modules.payments.addPayment') . '
                                </a>';
                    }
                }
            }

            if($row->status != 'canceled' && $row->credit_note == 0){
                if ($row->clientdetails) {
                    if (!is_null($row->clientdetails->shipping_address)) {

                        $action .= ($row->show_shipping_address == 'yes') ? '<a class="dropdown-item toggle-shipping-address" href="javascript:;" data-toggle="tooltip"  data-invoice-id="' . $row->id . '">
                                <i class="fa fa-eye-slash mr-2"></i>
                                ' . __('app.hideShippingAddress') . '
                            </a>' : '<a class="dropdown-item toggle-shipping-address" href="javascript:;" data-toggle="tooltip"  data-invoice-id="' . $row->id . '">
                                <i class="fa fa-eye mr-2"></i>
                                ' . __('app.showShippingAddress') . '
                            </a>';

                    } else {
                        $action .= '<a class="dropdown-item add-shipping-address" href="javascript:;" data-toggle="tooltip"  data-invoice-id="' . $row->id . '">
                            <i class="fa fa-plus mr-2"></i>
                            ' . __('app.addShippingAddress') . '
                        </a>';
                    }
                }
                else {
                    if ($row->project->clientdetails) {
                        if (!is_null($row->project->clientdetails->shipping_address)) {
                            $action .= ($row->show_shipping_address == 'yes') ? '<a class="dropdown-item toggle-shipping-address" href="javascript:;" data-toggle="tooltip"  data-invoice-id="' . $row->id . '">
                                    <i class="fa fa-eye-slash mr-2"></i>
                                    ' . __('app.hideShippingAddress') . '
                                </a>' : '<a class="dropdown-item toggle-shipping-address" href="javascript:;" data-toggle="tooltip" data-invoice-id="' . $row->id . '">
                                    <i class="fa fa-eye mr-2"></i>
                                    ' . __('app.showShippingAddress') . '
                                </a>';
                        }
                        else {
                            $action .= '<a class="dropdown-item add-shipping-address" href="javascript:;" data-invoice-id="' . $row->id . '">
                                <i class="fa fa-plus mr-2"></i>
                                ' . __('app.addShippingAddress') . '
                            </a>';
                        }
                    }
                }
            }

            if ($firstInvoice->id != $row->id && ($row->status == 'unpaid' || $row->status == 'draft') && !in_array('client', user_roles())) {
                $action .= '<a class="dropdown-item cancel-invoice" href="javascript:;"  data-invoice-id="' . $row->id . '">
                    <i class="fa fa-times mr-2"></i>
                    ' . trans('app.cancel') . '
                </a>';
            }

            if ($row->status != 'paid' && $row->credit_note == 0 && $row->status != 'draft' && $row->status != 'canceled' && $row->send_status) {
                $action .= '<a class="dropdown-item btn-copy" href="javascript:;" data-clipboard-text="' . route('front.invoice', $row->hash) . '"><i class="fa fa-copy mr-2"></i>' . trans('modules.invoices.copyPaymentLink') . '</a>';

                $action .= '<a class="dropdown-item" href="' . route('front.invoice', $row->hash) . '" target="_blank"><i class="fa fa-external-link-alt mr-2"></i>' . trans('modules.payments.paymentLink') . '</a>';
            }

            if ($row->credit_note == 0 && $row->status != 'draft' && $row->status != 'canceled' && $row->status != 'unpaid' && !in_array('client', user_roles())) {
                if ($row->amountPaid() > 0) {
                    if ($row->status == 'paid') {
                        $action .= '<a class="dropdown-item" href="' . route('creditnotes.create') . '?invoice=' . $row->id . '"><i class="fa fa-plus mr-2"></i>' . trans('modules.credit-notes.addCreditNote') . '</a>';
                    }
                    else {
                        $action .= '<a class="dropdown-item unpaidAndPartialPaidCreditNote" data-toggle="tooltip"  data-invoice-id="' . $row->id . '" href="javascript:;"><i class="fa fa-plus mr-2"></i>' . trans('modules.credit-notes.addCreditNote') . '</a>';
                    }
                }
            }

            if ($row->status != 'paid' && $row->status != 'draft' && $row->status != 'canceled' && $row->credit_note == 0 && !in_array('client', user_roles()) && $row->send_status) {
                $action .= '<a class="dropdown-item reminderButton" data-toggle="tooltip"  data-invoice-id="' . $row->id . '" href="javascript:;"><i class="fa fa-bell mr-2"></i>' . trans('app.paymentReminder') . '</a>';
            }

            if (
                $this->deleteInvoicePermission == 'all'
                || ($this->deleteInvoicePermission == 'added' && $row->added_by == user()->id)
                || ($this->deleteInvoicePermission == 'owned' && $row->client_id == user()->id)
                || ($this->deleteInvoicePermission == 'both' && ($row->client_id == user()->id || $row->added_by == user()->id))
                ) {
                if ($firstInvoice->id == $row->id) {
                    $action .= '<a class="dropdown-item delete-table-row" href="javascript:;" data-toggle="tooltip"  data-invoice-id="' . $row->id . '">
                        <i class="fa fa-trash mr-2"></i>
                        ' . trans('app.delete') . '
                    </a>';
                }
            }

            $action .= '</div>
            </div>
        </div>';

            return $action;
        });
            $datatables->editColumn('project_name', function ($row) {
                if ($row->project_id != null) {
                    return '<a href="' . route('projects.show', $row->project_id) . '" class="text-darkest-grey">' . ucfirst($row->project->project_name) . '</a>';
                }

                return '--';
            });
            $datatables->addColumn('short_code', function ($row) {
                if (!is_null($row->project)) {
                    return $row->project->project_short_code;
                }
                else {
                    return '--';
                }
            });
            $datatables->addColumn('client_name', function ($row) {
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
            });

            $datatables->editColumn('name', function ($row) {
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
            });
            $datatables->addColumn('invoice', function($row){
                return $row->invoice_number;
            });

        $customFieldsId = $customFields->pluck('id');
        $fieldData = DB::table('custom_fields_data')->where('model', 'App\Models\Invoice')->whereIn('custom_field_id', $customFieldsId)->select('id', 'custom_field_id', 'model_id', 'value')->get();

        foreach ($customFields as $customField) {
            $datatables->addColumn($customField->name, function ($row) use($fieldData, $customField) {

                $finalData = $fieldData->filter(function ($value) use($customField, $row) {
                    return $value->custom_field_id == $customField->id && $value->model_id == $row->id;
                })->first();

                if($customField->type == 'select') {
                    $data = $customField->values;
                    $data = json_decode($data); // string to array

                    return $finalData ? (($finalData->value >= 0 && $finalData->value != null) ? $data[$finalData->value] : '--') : '--';
                }

                return $finalData ? $finalData->value : '--';
            });
        }

            $datatables->editColumn('invoice_number', function ($row) {
                $recurring = '';

                if (!is_null($row->invoice_recurring_id)) {
                    $recurring = '<span class="badge badge-primary"> ' . __('app.recurring') . ' </span>';
                }

                return '<div class="media align-items-center">
                        <div class="media-body">
                    <h5 class="mb-0 f-13 text-darkest-grey"><a href="' . route('invoices.show', [$row->id]) . '">' . ucfirst($row->invoice_number) . '</a></h5>
                    <p class="mb-0">' . $recurring . '</p>
                    </div>
                  </div>';
            });
            $datatables->editColumn('status', function ($row) {
                $status = '';

                if ($row->credit_note) {
                    $status .= ' <i class="fa fa-circle mr-1 text-yellow f-10"></i>' .  __('app.credit-note');
                }
                else {
                    if ($row->status == 'unpaid') {
                        $status .= ' <i class="fa fa-circle mr-1 text-red f-10"></i>' .  __('app.' . $row->status);
                    }
                    elseif ($row->status == 'paid') {
                        $status .= ' <i class="fa fa-circle mr-1 text-dark-green f-10"></i>' .  __('app.' . $row->status);
                    }
                    elseif ($row->status == 'draft') {
                        $status .= ' <i class="fa fa-circle mr-1 text-blue f-10"></i>' .  __('app.' . $row->status);
                    }
                    elseif ($row->status == 'canceled') {
                        $status .= ' <i class="fa fa-circle mr-1 text-red f-10"></i>' .  __('app.' . $row->status);
                    }
                    else {
                        $status .= ' <i class="fa fa-circle mr-1 text-blue f-10"></i>' .  __('modules.invoices.partial');
                    }
                }

                if (!$row->send_status && $row->status != 'draft') {
                    $status .= '<br><br><span class="badge badge-secondary">' . __('modules.invoices.notSent') . '</span>';
                }

                return $status;
            });
            $datatables->editColumn('total', function ($row) {
                $currencySymbol = $row->currency->currency_symbol;

                return '<div class="text-right">' . __('app.total') . ': ' . currency_formatter($row->total, $currencySymbol) . '<p class="my-0"><span class="text-success mt-1">' . __('app.paid') . ':</span> ' . currency_formatter($row->amountPaid(), $currencySymbol) . '</p><span class="text-danger">' . __('app.unpaid') . ':</span> ' . currency_formatter($row->amountDue(), $currencySymbol) . '</div>';
            });
            $datatables->editColumn(
                'issue_date',
                function ($row) {
                    return $row->issue_date->timezone($this->global->timezone)->format($this->global->date_format);
                }
            );
            $datatables->rawColumns(['project_name', 'action', 'status', 'invoice_number', 'total', 'name']);
            $datatables->removeColumn('currency_symbol');
            $datatables->removeColumn('currency_code');
            $datatables->removeColumn('project_id');

            return $datatables;
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
        $this->firstInvoice = Invoice::orderBy('id', 'desc')->first();
        $model = Invoice::with(
            [
                'project' => function ($q) {
                    $q->withTrashed();
                    $q->select('id', 'project_name', 'project_short_code', 'client_id');
                },
                'currency:id,currency_symbol,currency_code', 'project.client', 'client', 'payment', 'estimate', 'project.clientdetails'
            ]
        )
            ->with('client', 'client.session', 'client.clientdetails', 'payment', 'clientdetails')
            ->select('invoices.id', 'invoices.due_amount', 'invoices.project_id', 'invoices.client_id', 'invoices.invoice_number', 'invoices.currency_id', 'invoices.total', 'invoices.status', 'invoices.issue_date', 'invoices.credit_note', 'invoices.show_shipping_address', 'invoices.send_status', 'invoices.invoice_recurring_id', 'invoices.added_by', 'invoices.hash', 'invoices.custom_invoice_number');

        if ($request->startDate !== null && $request->startDate != 'null' && $request->startDate != '') {
            $startDate = Carbon::createFromFormat($this->global->date_format, $request->startDate)->toDateString();
            $model = $model->where(DB::raw('DATE(invoices.`issue_date`)'), '>=', $startDate);
        }

        if ($request->endDate !== null && $request->endDate != 'null' && $request->endDate != '') {
            $endDate = Carbon::createFromFormat($this->global->date_format, $request->endDate)->toDateString();
            $model = $model->where(DB::raw('DATE(invoices.`issue_date`)'), '<=', $endDate);
        }

        if ($request->status != 'all' && !is_null($request->status)) {
            if($request->status == 'pending')
            {
                $model = $model->where(function ($q) {
                    $q->where('invoices.status', '=', 'unpaid');;

                    $q->orWhere('invoices.status', '=', 'partial');;
                });;
            }
            else{
                $model = $model->where('invoices.status', '=', $request->status);
            }

            $model = $model->where('invoices.credit_note', 0);
        }

        if (request('amount') == 'pending') {
            $model = $model->where(function ($query) {
                $query->where('invoices.status', 'unpaid')
                    ->orWhere('invoices.status', 'partial');
            });
        }

        if ($request->projectID != 'all' && !is_null($request->projectID)) {
            $model = $model->where('invoices.project_id', '=', $request->projectID);
        }

        if ($request->clientID != 'all' && !is_null($request->clientID)) {
            $model = $model->where('invoices.client_id', '=', $request->clientID);
        }

        if ($request->searchText != '') {
            $model->where(function ($query) {
                $query->where('invoices.invoice_number', 'like', '%' . request('searchText') . '%')
                    ->orWhere('invoices.custom_invoice_number', 'like', '%' . request('searchText') . '%')
                    ->orWhere('invoices.id', 'like', '%' . request('searchText') . '%')
                    ->orWhere('invoices.total', 'like', '%' . request('searchText') . '%')
                    ->orWhere(function($query){
                        $query->whereHas('client', function($q){
                            $q->where('name', 'like', '%' . request('searchText') . '%');
                        });
                    })
                    ->orWhere(function($query){
                        $query->whereHas('project', function($q){
                            $q->where('project_name', 'like', '%' . request('searchText') . '%')
                                ->orWhere('project_short_code', 'like', '%' . request('searchText') . '%'); // project short code
                        });
                    })
                    ->orWhere(function($query){
                        $query->where('invoices.status', 'like', '%' . request('searchText') . '%');
                    });
            });
        }

        if (in_array('client', user_roles())) {
            $model = $model->where('invoices.send_status', 1);
            $model = $model->where('invoices.client_id', user()->id);
        }

        if ($this->viewInvoicePermission == 'added') {
            $model = $model->where('invoices.added_by', user()->id);
        }

        if ($this->viewInvoicePermission == 'owned') {
            $model = $model->where('invoices.client_id', user()->id);
        }

        if ($this->viewInvoicePermission == 'both') {
            $model = $model->where('invoices.client_id', user()->id)->orWhere('invoices.added_by', user()->id);
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
            ->setTableId('invoices-table')
            ->columns($this->getColumns())
            ->minifiedAjax()
            ->orderBy(0)
            ->destroy(true)
            ->responsive(true)
            ->serverSide(true)
            ->stateSave(true)
            ->processing(true)
            ->dom($this->domHtml)

            ->language(__('app.datatable'))
            ->parameters([
                'initComplete' => 'function () {
                    window.LaravelDataTables["invoices-table"].buttons().container()
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
        $invoice = new Invoice();
        $customFieldsGroupsId = CustomFieldGroup::where('model', $invoice->customFieldModel)->pluck('id')->first();
        $customFields = CustomField::where('custom_field_group_id', $customFieldsGroupsId)->where('export', 1)->get();
        $customFieldsDataMerge = [];

        $data = [
            __('app.id') => ['data' => 'id', 'name' => 'id', 'visible' => false, 'title' => __('app.id')],
            __('modules.taskCode') => ['data' => 'short_code', 'name' => 'project_short_code', 'title' => __('modules.taskCode')],
            __('app.invoice') . '#' => ['data' => 'invoice_number', 'name' => 'invoice_number', 'exportable' => false, 'title' => __('app.invoice')],
            __('app.invoiceNumber') . '#' => ['data' => 'invoice', 'name' => 'invoice_number', 'visible' => false, 'title' => __('app.invoiceNumber')],
            __('app.project')  => ['data' => 'project_name', 'name' => 'project.project_name', 'title' => __('app.project')],
            __('app.client') => ['data' => 'name', 'name' => 'project.client.name', 'exportable' => false, 'title' => __('app.client')],
            __('app.customers')  => ['data' => 'client_name', 'name' => 'project.client.name', 'visible' => false, 'title' => __('app.customers')],
            __('modules.invoices.total') => ['data' => 'total', 'name' => 'total', 'class' => 'text-right', 'title' => __('modules.invoices.total')],
            __('modules.invoices.invoiceDate') => ['data' => 'issue_date', 'name' => 'issue_date', 'title' => __('modules.invoices.invoiceDate')],
            __('app.status') => ['data' => 'status', 'name' => 'status', 'width' => '10%', 'title' => __('app.status')],
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
        return 'Invoices_' . date('YmdHis');
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
