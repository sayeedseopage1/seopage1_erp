<?php

namespace App\DataTables;

use App\Models\Contract;
use App\DataTables\BaseDataTable;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;

class ContractsDataTable extends BaseDataTable
{

    private $editContractPermission;
    private $deleteContractPermission;
    private $addContractPermission;
    private $viewContractPermission;

    public function __construct()
    {
        parent::__construct();
        $this->editContractPermission = user()->permission('edit_contract');
        $this->deleteContractPermission = user()->permission('delete_contract');
        $this->addContractPermission = user()->permission('add_contract');
        $this->viewContractPermission = user()->permission('view_contract');
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

                $action .= ' <a href="' . route('contracts.show', [$row->id]) . '" class="dropdown-item"><i class="fa fa-eye mr-2"></i>' . __('app.view') . '</a>';

                if (!$row->signature) {
                    $action .= '<a class="dropdown-item" href="' . route('front.contract.show', $row->hash) . '" target="_blank"><i class="fa fa-link mr-2"></i>'.__('modules.proposal.publicLink').'</a>';
                }

                if ($this->addContractPermission == 'all' || $this->addContractPermission == 'added') {
                    $action .= '<a class="dropdown-item openRightModal" href="' . route('contracts.create') . '?id=' . $row->id . '">
                            <i class="fa fa-copy mr-2"></i>
                            ' . __('app.copy') . ' ' . __('app.menu.contract') . '
                        </a>';
                }

                if (
                    $this->editContractPermission == 'all'
                    || ($this->editContractPermission == 'added' && user()->id == $row->added_by)
                    || ($this->editContractPermission == 'owned' && user()->id == $row->client_id)
                    || ($this->editContractPermission == 'both' && (user()->id == $row->client_id || user()->id == $row->added_by))
                    ) {
                    $action .= '<a class="dropdown-item openRightModal" href="' . route('contracts.edit', [$row->id]) . '">
                            <i class="fa fa-edit mr-2"></i>
                            ' . trans('app.edit') . '
                        </a>';
                }

                if (
                    $this->deleteContractPermission == 'all'
                    || ($this->deleteContractPermission == 'added' && user()->id == $row->added_by)
                    || ($this->deleteContractPermission == 'owned' && user()->id == $row->client_id)
                    || ($this->deleteContractPermission == 'both' && (user()->id == $row->client_id || user()->id == $row->added_by))
                ) {
                    $action .= '<a class="dropdown-item delete-table-row" href="javascript:;" data-contract-id="' . $row->id . '">
                            <i class="fa fa-trash mr-2"></i>
                            ' . trans('app.delete') . '
                        </a>';
                }

                $action .= '<a class="dropdown-item" href="' . route('contracts.download', $row->id) . '">
                                <i class="fa fa-download mr-2"></i>
                                ' . trans('app.download') . '
                            </a>';


                $action .= '</div>
                </div>
            </div>';

                return $action;
            })
            ->addColumn('contract_subject', function($row) {
                return ucfirst($row->subject);
            })
            ->editColumn('subject', function ($row) {
                $signed = '';

                if ($row->signature) {
                    $signed = '<span class="badge badge-secondary"><i class="fa fa-signature"></i> ' . __('app.signed') . '</span>';
                }

                return '<div class="media align-items-center">
                        <div class="media-body">
                    <h5 class="mb-0 f-13 text-darkest-grey"><a href="' . route('contracts.show', [$row->id]) . '">' . ucfirst($row->subject) . '</a></h5>
                    <p class="mb-0">' . $signed . '</p>
                    </div>
                  </div>';
            })
            ->editColumn('start_date', function ($row) {
                return $row->start_date->format($this->global->date_format);
            })
            ->editColumn('end_date', function ($row) {
                if (is_null($row->end_date)) {
                    return '--';
                }

                return $row->end_date == null ? $row->end_date : $row->end_date->format($this->global->date_format);
            })
            ->editColumn('amount', function ($row) {
                $currencySymbol = $row->currency->currency_symbol;

                return currency_formatter($row->amount, $currencySymbol);
            })
            ->addColumn('client_name', function($row) {
                return ucfirst($row->client->name);
            })
            ->editColumn('client.name', function ($row) {
                return '<div class="media align-items-center">
                    <a href="' . route('clients.show', [$row->client_id]) . '">
                    <img src="' . $row->client->image_url . '" class="mr-3 taskEmployeeImg rounded-circle" alt="' . ucfirst($row->client->name) . '" title="' . ucfirst($row->client->name) . '"></a>
                    <div class="media-body">
                    <h5 class="mb-0 f-13 text-darkest-grey"><a href="' . route('clients.show', [$row->client_id]) . '">' . ucfirst($row->client->name) . '</a></h5>
                    <p class="mb-0 f-13 text-dark-grey">' . ucfirst($row->client->clientDetails->company_name) . '</p>
                    </div>
                  </div>';
            })
            ->editColumn('signature', function ($row) {
                if ($row->signature) {
                    return __('app.signed');
                }
            })
            ->addIndexColumn()
            ->smart(false)
            ->setRowId(function ($row) {
                return 'row-' . $row->id;
            })
            ->rawColumns(['action', 'client.name', 'check', 'subject']);
    }

    /**
     * @param Contract $model
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function query(Contract $model)
    {
        $request = $this->request();
        $startDate = null;
        $endDate = null;

        if ($request->startDate !== null && $request->startDate != 'null' && $request->startDate != '') {
            $startDate = Carbon::createFromFormat($this->global->date_format, $request->startDate)->toDateString();
        }

        if ($request->endDate !== null && $request->endDate != 'null' && $request->endDate != '') {
            $endDate = Carbon::createFromFormat($this->global->date_format, $request->endDate)->toDateString();
        }

        $model = $model->with('contractType', 'client', 'signature', 'client.clientDetails')
            ->join('users', 'users.id', '=', 'contracts.client_id')
            ->join('client_details', 'users.id', '=', 'client_details.user_id')
            ->select('contracts.*');

        if ($startDate !== null && $endDate !== null) {
            $model->where(function ($q) use ($startDate, $endDate) {
                $q->whereBetween(DB::raw('DATE(contracts.`end_date`)'), [$startDate, $endDate]);

                $q->orWhereBetween(DB::raw('DATE(contracts.`start_date`)'), [$startDate, $endDate]);
            });
        }

        if ($request->client != 'all' && !is_null($request->client)) {
            $model = $model->where('contracts.client_id', '=', $request->client);
        }

        if ($request->contract_type != 'all' && !is_null($request->contract_type)) {
            $model = $model->where('contracts.contract_type_id', '=', $request->contract_type);
        }

        if (request('signed') == 'yes') {
            $model = $model->has('signature');
        }

        if ($request->searchText != '') {
            $model = $model->where(function ($query) {
                $query->where('contracts.subject', 'like', '%' . request('searchText') . '%')
                    ->orWhere('contracts.amount', 'like', '%' . request('searchText') . '%')
                    ->orWhere('client_details.company_name', 'like', '%' . request('searchText') . '%');
            });
        }

        if ($this->viewContractPermission == 'added') {
            $model = $model->where('contracts.added_by', '=', user()->id);
        }

        if ($this->viewContractPermission == 'owned') {
            $model = $model->where('contracts.client_id', '=', user()->id);
        }

        if ($this->viewContractPermission == 'both') {
            $model = $model->where(function ($query) {
                $query->where('contracts.added_by', '=', user()->id)
                    ->orWhere('contracts.client_id', '=', user()->id);
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
            ->setTableId('contracts-table')
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
                   window.LaravelDataTables["contracts-table"].buttons().container()
                    .appendTo( "#table-actions")
                }',
                'fnDrawCallback' => 'function( oSettings ) {
                  //
                }',
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
            'check' => [
                'title' => '<input type="checkbox" name="select_all_table" id="select-all-table" onclick="selectAllTable(this)">',
                'exportable' => false,
                'orderable' => false,
                'searchable' => false,
                'visible' => !in_array('client', user_roles())
            ],
            '#' => ['data' => 'DT_RowIndex', 'orderable' => false, 'searchable' => false, 'visible' => false],
            __('app.id') => ['data' => 'id', 'name' => 'id', 'title' => __('app.id')],
            __('app.subject') => ['data' => 'subject', 'name' => 'subject', 'exportable' => false, 'title' => __('app.subject')],
            __('app.menu.contract').' '.__('app.subject') => ['data' => 'contract_subject', 'name' => 'subject', 'visible' => false, 'title' => __('app.menu.contract')],
            __('app.client')  => ['data' => 'client.name', 'name' => 'client.name', 'exportable' => false, 'title' => __('app.client')],
            __('app.customers')  => ['data' => 'client_name', 'name' => 'client.name', 'visible' => false, 'title' => __('app.customers')],
            __('app.amount') => ['data' => 'amount', 'name' => 'amount', 'title' => __('app.amount')],
            __('app.startDate') => ['data' => 'start_date', 'name' => 'start_date', 'title' => __('app.startDate')],
            __('app.endDate') => ['data' => 'end_date', 'name' => 'end_date', 'title' => __('app.endDate')],
            __('app.signature') => ['data' => 'signature', 'name' => 'signature', 'visible' => false, 'title' => __('app.signature')],
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
        return 'Contracts_' . date('YmdHis');
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
