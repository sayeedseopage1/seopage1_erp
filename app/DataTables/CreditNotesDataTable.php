<?php

namespace App\DataTables;

use App\Models\CreditNotes;
use App\DataTables\BaseDataTable;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;

class CreditNotesDataTable extends BaseDataTable
{
    /**
     * Build DataTable class.
     *
     * @param mixed $query Results from query() method.
     * @return \Yajra\DataTables\DataTableAbstract
     */
    protected $firstCreditNotes;
    private $viewInvoicePermission;
    private $editInvoicePermission;
    private $deleteInvoicePermission;

    public function __construct()
    {
        parent::__construct();
        $this->viewInvoicePermission = user()->permission('view_invoices');
        $this->editInvoicePermission = user()->permission('edit_invoices');
        $this->deleteInvoicePermission = user()->permission('delete_invoices');
    }

    public function dataTable($query)
    {
        $firstCreditNotes = $this->firstCreditNotes;

        return datatables()
            ->eloquent($query)
            ->addIndexColumn()
            ->addColumn('action', function ($row) use ($firstCreditNotes) {

                $action = '<div class="task_view">

                    <div class="dropdown">
                        <a class="task_view_more d-flex align-items-center justify-content-center dropdown-toggle" type="link"
                            id="dropdownMenuLink-' . $row->id . '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="icon-options-vertical icons"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink-' . $row->id . '" tabindex="0">';

                $action .= '<a href="' . route('creditnotes.show', [$row->id]) . '" class="dropdown-item"><i class="fa fa-eye mr-2"></i>' . __('app.view') . '</a>';

                if ($this->viewInvoicePermission == 'all' || ($this->viewInvoicePermission == 'added' && user()->id == $row->added_by) || ($this->viewInvoicePermission == 'owned' && $row->client_id == user()->id)) {
                    $action .= '<a class="dropdown-item" href="' . route('creditnotes.download', [$row->id]) . '">
                                        <i class="fa fa-download mr-2"></i>
                                        ' . trans('app.download') . '
                                    </a>';
                }

                if ($row->status == 'open') {
                    if ($this->editInvoicePermission == 'all' || ($this->editInvoicePermission == 'added' && user()->id == $row->added_by)) {
                        $action .= '<a class="dropdown-item" href="' . route('creditnotes.edit', [$row->id]) . '">
                                        <i class="fa fa-edit mr-2"></i>
                                        ' . trans('app.edit') . '
                                    </a>';
                    }

                    
                    if (!in_array('client', user_roles())) {
                        $action .= '<a href="javascript:" data-credit-notes-id="' . $row->id . '" class="credit-notes-upload dropdown-item"><i class="fa fa-upload mr-2"></i> ' . __('app.upload') . ' </a>';
                    }
                }


                if ($firstCreditNotes->id == $row->id) {
                    if ($this->deleteInvoicePermission == 'all' || ($this->deleteInvoicePermission == 'added' && user()->id == $row->added_by)) {

                        $action .= '<a class="dropdown-item delete-table-row" href="javascript:;" data-credit-notes-id="' . $row->id . '">
                                    <i class="fa fa-times mr-2"></i>
                                    ' . trans('app.delete') . '
                                </a>';
                    }
                }

                $action .= '</div>
                    </div>
                </div>';

                return $action;
            })
            ->editColumn('name', function ($row) {
                return view('components.client', [
                    'user' => $row->client
                ]);
            })
            ->addColumn('client_name', function ($row) {
                return $row->client->name;
            })
            ->editColumn('cn_number', function ($row) {
                return '<a href="' . route('creditnotes.show', $row->id) . '" class="text-darkest-grey">' . ucfirst($row->cn_number) . '</a>';
            })
            ->addColumn('credit_note', function ($row) {
                return $row->cn_number;
            })
            ->addColumn('invoice', function ($row) {
                return ($row->invoice) ? $row->invoice->invoice_number : '--';
            })
            ->editColumn('invoice_number', function ($row) {
                return $row->invoice ? '<a href="' . route('invoices.show', $row->invoice_id) . '" class="text-darkest-grey">' . $row->invoice->invoice_number . '</a>' : '--';
            })
            ->editColumn('total', function ($row) {
                $currencySymbol = $row->currency->currency_symbol;

                return '<div class="text-right">' . __('app.total') . ': ' . currency_formatter($row->total, $currencySymbol) . '<p class="my-0"><span class="text-warning mt-1">' . __('app.adjustment') . ':</span> ' . $row->adjustment_amount . '</p><p class="my-0"><span class= "text-success mt-1">' . __('app.used') . ':</span> ' . currency_formatter($row->creditAmountUsed(), $currencySymbol) . ' </p><span class="text-danger">' . __('app.remaining') . ':</span> ' . currency_formatter($row->creditAmountRemaining(), $currencySymbol) . '</div>';

            })
            ->editColumn(
                'issue_date',
                function ($row) {
                    return $row->issue_date->timezone($this->global->timezone)->format($this->global->date_format);
                }
            )
            ->editColumn('status', function ($row) {
                if ($row->status == 'open') {
                    return ' <i class="fa fa-circle mr-1 text-dark-green f-10"></i>' .  __('app.' . $row->status);
                }
                else {
                    return '<i class="fa fa-circle mr-1 text-red f-10"></i>' .  __('app.' . $row->status);
                }
            })
            ->rawColumns(['name', 'action', 'cn_number', 'invoice_number', 'status', 'total'])
            ->removeColumn('currency_symbol')
            ->removeColumn('currency_code')
            ->removeColumn('project_id');
    }

    /**
     * @param CreditNotes $model
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function query(CreditNotes $model)
    {
        $request = $this->request();

        $this->firstCreditNotes = CreditNotes::orderBy('id', 'desc')->first();

        $model = $model->with(['client', 'currency:id,currency_symbol,currency_code', 'invoice', 'payment'])
            ->leftJoin('invoices', 'invoices.id', 'credit_notes.invoice_id')
            ->leftJoin('users', 'users.id', 'credit_notes.client_id')
            ->select(
                'credit_notes.id',
                'credit_notes.project_id',
                'credit_notes.client_id',
                'credit_notes.invoice_id',
                'credit_notes.currency_id',
                'credit_notes.cn_number',
                'credit_notes.total',
                'credit_notes.issue_date',
                'invoices.added_by',
                'credit_notes.status',
                'credit_notes.adjustment_amount'
            );

        if ($request->startDate !== null && $request->startDate != 'null' && $request->startDate != '') {
            $startDate = Carbon::createFromFormat($this->global->date_format, $request->startDate)->toDateString();
            $model = $model->where(DB::raw('DATE(credit_notes.`issue_date`)'), '>=', $startDate);
        }

        if ($request->endDate !== null && $request->endDate != 'null' && $request->endDate != '') {
            $endDate = Carbon::createFromFormat($this->global->date_format, $request->endDate)->toDateString();
            $model = $model->where(DB::raw('DATE(credit_notes.`issue_date`)'), '<=', $endDate);
        }

        if ($request->projectID != 'all' && !is_null($request->projectID)) {
            $model = $model->where('credit_notes.project_id', '=', $request->projectID);
        }

        if ($request->clientID != 'all' && !is_null($request->clientID)) {
            $model = $model->where('invoices.client_id', '=', $request->clientID);
        }

        if (in_array('client', user_roles())) {
            $model = $model->where('invoices.send_status', 1);
            $model = $model->where('invoices.client_id', user()->id);
        }

        if ($request->status != 'all' && !is_null($request->status)) {
            $model = $model->where('credit_notes.status', '=', $request->status);
        }

        if ($request->searchText != '') {
            $model->where(function ($query) {
                $query->where('credit_notes.cn_number', 'like', '%' . request('searchText') . '%')
                    ->orWhere('credit_notes.id', 'like', '%' . request('searchText') . '%')
                    ->orWhere('credit_notes.total', 'like', '%' . request('searchText') . '%');
            });
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
            ->setTableId('invoices-table')
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
        return [
            __('app.id') => ['data' => 'id', 'name' => 'id', 'visible' => false, 'title' => __('app.id')],
            __('app.credit-note') => ['data' => 'cn_number', 'name' => 'cn_number', 'exportable' => false, 'title' => __('app.credit-note')],
            __('app.creditnoteNumber') => ['data' => 'credit_note', 'name' => 'cn_number', 'visible' => false, 'title' => __('app.creditnoteNumber')],
            __('app.invoice')  => ['data' => 'invoice_number', 'name' => 'invoice.invoice_number', 'exportable' => false, 'title' => __('app.invoice')],
            __('app.invoiceNumber')  => ['data' => 'invoice', 'name' => 'invoice.invoice_number', 'visible' => false, 'title' => __('app.invoiceNumber')],
            __('app.name') => ['data' => 'name', 'name' => 'users.name', 'exportable' => false, 'title' => __('app.name')],
            __('app.customers')  => ['data' => 'client_name', 'users.name' => 'users.name', 'visible' => false, 'title' => __('app.customers')],
            __('modules.credit-notes.total') => ['data' => 'total', 'name' => 'total', 'class' => 'text-right', 'title' => __('modules.credit-notes.total')],
            __('modules.credit-notes.creditNoteDate') => ['data' => 'issue_date', 'name' => 'issue_date', 'title' => __('modules.credit-notes.creditNoteDate')],
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
        return 'credit_notes' . date('YmdHis');
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
