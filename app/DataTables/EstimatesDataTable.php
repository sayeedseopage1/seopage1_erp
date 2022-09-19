<?php

namespace App\DataTables;

use Carbon\Carbon;
use App\Models\Estimate;
use App\Models\CustomField;
use App\Models\CustomFieldGroup;
use App\DataTables\BaseDataTable;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;
use Illuminate\Support\Facades\DB;

class EstimatesDataTable extends BaseDataTable
{
    protected $firstEstimate;
    private $addEstimatePermission;
    private $editEstimatePermission;
    private $deleteEstimatePermission;
    private $addInvoicePermission;
    private $viewEstimatePermission;

    public function __construct()
    {
        parent::__construct();
        $this->viewEstimatePermission = user()->permission('view_estimates');
        $this->addEstimatePermission = user()->permission('add_estimates');
        $this->editEstimatePermission = user()->permission('edit_estimates');
        $this->deleteEstimatePermission = user()->permission('delete_estimates');
        $this->addInvoicePermission = user()->permission('add_invoices');
    }

    /**
     * Build DataTable class.
     *
     * @param mixed $query Results from query() method.
     * @return \Yajra\DataTables\DataTableAbstract
     */
    public function dataTable($query)
    {
        $firstEstimate = $this->firstEstimate;

        $estimate = new Estimate();
        $customFieldsGroupsId = CustomFieldGroup::where('model', $estimate->customFieldModel)->pluck('id')->first();
        $customFields = CustomField::where('custom_field_group_id', $customFieldsGroupsId)->where('export', 1)->get();        $datatables = datatables()->eloquent($query);
        $datatables->addIndexColumn();
        $datatables->addColumn('action', function ($row) use ($firstEstimate) {

            $action = '<div class="task_view">

            <div class="dropdown">
                <a class="task_view_more d-flex align-items-center justify-content-center dropdown-toggle" type="link"
                    id="dropdownMenuLink-' . $row->id . '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="icon-options-vertical icons"></i>
                </a>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink-' . $row->id . '" tabindex="0">';

                $action .= '<a href="' . route('estimates.show', [$row->id]) . '" class="dropdown-item"><i class="fa fa-eye mr-2"></i>' . __('app.view') . '</a>';

                $action .= '<a class="dropdown-item btn-copy" data-clipboard-text="' . route('front.estimate.show', $row->hash) . '">
                            <i class="fa fa-copy mr-2"></i> '.__('modules.estimates.copyLink').' </a>';

            if ($row->status != 'draft') {
                $action .= '<a class="dropdown-item" href="' . route('estimates.download', [$row->id]) . '">
                            <i class="fa fa-download mr-2"></i>
                            ' . trans('app.download') . '
                        </a>';
            }

            if ($row->status == 'waiting' || $row->status == 'draft') {
                if (
                    $this->editEstimatePermission == 'all'
                    || ($this->editEstimatePermission == 'added' && $row->added_by == user()->id)
                    || ($this->editEstimatePermission == 'owned' && $row->client_id == user()->id)
                    || ($this->editEstimatePermission == 'both' && ($row->client_id == user()->id || $row->added_by == user()->id))
                    ) {
                    $action .= '<a class="dropdown-item openRightModal" href="' . route('estimates.edit', [$row->id]) . '">
                            <i class="fa fa-edit mr-2"></i>
                            ' . trans('app.edit') . '
                        </a>';
                }
            }

            if ($row->status != 'canceled' && $row->status != 'accepted' && !in_array('client', user_roles())) {
                $action .= '<a href="javascript:;" data-toggle="tooltip"  data-estimate-id="' . $row->id . '" class="dropdown-item sendButton"><i class="fa fa-paper-plane mr-2"></i> ' . __('app.send') . '</a>';
            }

            if ($firstEstimate->id == $row->id) {
                if (
                    $this->deleteEstimatePermission == 'all'
                    || ($this->deleteEstimatePermission == 'added' && $row->added_by == user()->id)
                    || ($this->deleteEstimatePermission == 'owned' && $row->client_id == user()->id)
                    || ($this->deleteEstimatePermission == 'both' && ($row->client_id == user()->id || $row->added_by == user()->id))
                    ) {

                    $action .= '<a class="dropdown-item delete-table-row" href="javascript:;" data-estimate-id="' . $row->id . '">
                        <i class="fa fa-trash mr-2"></i>
                        ' . trans('app.delete') . '
                    </a>';
                }
            }

            if ($row->status == 'waiting') {
                if ($this->addInvoicePermission == 'all' || $this->addInvoicePermission == 'added') {
                    $action .= '<a class="dropdown-item" href="' . route('invoices.create') . '?estimate=' . $row->id . '" ><i class="fa fa-plus mr-2"></i> ' . __('app.create') . ' ' . __('app.invoice') . '</a>';
                }

                if ($this->editEstimatePermission == 'all' || ($this->editEstimatePermission == 'added' && $row->added_by == user()->id)) {
                    $action .= '<a href="javascript:;" class="dropdown-item change-status" data-estimate-id="' . $row->id . '" ><i class="fa fa-times mr-2"></i> ' . __('app.cancelEstimate') . '</a>';
                }
            }

            if ($this->addEstimatePermission == 'all' || $this->addEstimatePermission == 'added') {
                $action .= '<a href="' . route('estimates.create') . '?estimate=' . $row->id . '" class="dropdown-item"><i class="fa fa-copy mr-2"></i> ' . __('app.create') . ' ' . __('app.duplicate') . '</a>';
            }

            $action .= '</div>
            </div>
        </div>';

            return $action;
        });
        $datatables->addColumn('original_estimate_number', function ($row) {
                return '<a href="' . route('estimates.show', $row->id) . '" class="text-darkest-grey">' . $row->estimate_number . '</a>';
        });
            $datatables->addColumn('client_name', function ($row) {
                return $row->name;
            });

        $customFieldsId = $customFields->pluck('id');
        $fieldData = DB::table('custom_fields_data')->where('model', 'App\Models\Estimate')->whereIn('custom_field_id', $customFieldsId)->select('id', 'custom_field_id', 'model_id', 'value')->get();

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

            $datatables->editColumn('name', function ($row) {
                return view('components.client', [
                    'user' => $row->client
                ]);
            });
            $datatables->editColumn('status', function ($row) {
                $status = '';

                if ($row->status == 'waiting') {
                    $status .= '<i class="fa fa-circle mr-1 text-yellow f-10"></i>' . __('modules.estimates.' . $row->status) . '</label>';
                }
                elseif ($row->status == 'draft') {
                    $status .= '<i class="fa fa-circle mr-1 text-blue f-10"></i>' .  __('app.' . $row->status) . '</label>';
                }
                elseif ($row->status == 'canceled') {
                    $status .= '<i class="fa fa-circle mr-1 text-red f-10"></i>' .  __('app.' . $row->status) . '</label>';
                }
                elseif ($row->status == 'declined') {
                    $status .= '<i class="fa fa-circle mr-1 text-red f-10"></i>' . __('modules.estimates.' . $row->status) . '</label>';
                }
                else {
                    $status .= '<i class="fa fa-circle mr-1 text-dark-green f-10"></i>' .  __('modules.estimates.' . $row->status) . '</label>';
                }

                if (!$row->send_status && $row->status != 'draft' && $row->status != 'canceled') {
                    $status .= '<br><br><span class="badge badge-secondary">' . mb_strtoupper(__('modules.invoices.notSent')) . '</span>';
                }

                return $status;
            });
            $datatables->editColumn('total', function ($row) {
                return currency_formatter($row->total, $row->currency_symbol);
            });
            $datatables->editColumn(
                'valid_till',
                function ($row) {
                    return Carbon::parse($row->valid_till)->format($this->global->date_format);
                }
            );
            $datatables->rawColumns(['name', 'action', 'status', 'original_estimate_number']);
            $datatables->removeColumn('currency_symbol');
            $datatables->removeColumn('client_id');

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

        $this->firstEstimate = Estimate::orderBy('id', 'desc')->first();
        $model = Estimate::with('client', 'client.session')
            ->join('client_details', 'estimates.client_id', '=', 'client_details.user_id')
            ->join('currencies', 'currencies.id', '=', 'estimates.currency_id')
            ->join('users', 'users.id', '=', 'estimates.client_id')
            ->select('estimates.id', 'estimates.client_id', 'users.name', 'estimates.total', 'currencies.currency_symbol', 'estimates.status', 'estimates.valid_till', 'estimates.estimate_number', 'estimates.send_status', 'estimates.added_by', 'estimates.hash');

        if ($request->startDate !== null && $request->startDate != 'null' && $request->startDate != '') {
            $startDate = Carbon::createFromFormat($this->global->date_format, $request->startDate)->toDateString();
            $model = $model->where(DB::raw('DATE(estimates.`valid_till`)'), '>=', $startDate);
        }

        if ($request->endDate !== null && $request->endDate != 'null' && $request->endDate != '') {
            $endDate = Carbon::createFromFormat($this->global->date_format, $request->endDate)->toDateString();
            $model = $model->where(DB::raw('DATE(estimates.`valid_till`)'), '<=', $endDate);
        }

        if ($request->status != 'all' && !is_null($request->status)) {
            $model = $model->where('estimates.status', '=', $request->status);
        }

        if ($request->clientID != 'all' && !is_null($request->clientID)) {
            $model = $model->where('estimates.client_id', '=', $request->clientID);
        }

        if (in_array('client', user_roles())) {
            $model = $model->where('estimates.send_status', 1);
            $model = $model->where('estimates.client_id', user()->id);
        }

        if ($request->searchText != '') {
            $model->where(function ($query) {
                $query->where('estimates.estimate_number', 'like', '%' . request('searchText') . '%')
                    ->orWhere('estimates.id', 'like', '%' . request('searchText') . '%')
                    ->orWhere('estimates.total', 'like', '%' . request('searchText') . '%')
                    ->orWhere(function($query){
                        $query->whereHas('client', function($q){
                            $q->where('name', 'like', '%' . request('searchText') . '%');
                        });
                    })
                    ->orWhere(function($query){
                        $query->where('estimates.status', 'like', '%' . request('searchText') . '%');
                    });
            });
        }

        if ($this->viewEstimatePermission == 'added') {
            $model->where('estimates.added_by', user()->id);
        }

        if ($this->viewEstimatePermission == 'both') {
            $model->where(function ($query) {
                $query->where('estimates.added_by', user()->id)
                    ->orWhere('estimates.client_id', user()->id);
            });
        }

        if ($this->viewEstimatePermission == 'owned') {
            $model->where('estimates.client_id', user()->id);
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
        $estimate = new Estimate();
        $customFieldsGroupsId = CustomFieldGroup::where('model', $estimate->customFieldModel)->pluck('id')->first();
        $customFields = CustomField::where('custom_field_group_id', $customFieldsGroupsId)->where('export', 1)->get();
        $customFieldsDataMerge = [];

        $data = [
            '#' => ['data' => 'DT_RowIndex', 'orderable' => false, 'searchable' => false, 'visible' => false],
            __('app.id') => ['data' => 'id', 'name' => 'id', 'title' => __('app.id')],
            __('app.estimate') . '#' => ['data' => 'original_estimate_number', 'name' => 'original_estimate_number', 'title' => __('app.estimate')],
            __('app.client')  => ['data' => 'name', 'name' => 'users.name', 'exportable' => false, 'title' => __('app.client')],
            __('app.customers')  => ['data' => 'client_name', 'name' => 'users.name', 'visible' => false, 'title' => __('app.customers')],
            __('modules.invoices.total') => ['data' => 'total', 'name' => 'total', 'title' => __('modules.invoices.total')],
            __('modules.estimates.validTill') => ['data' => 'valid_till', 'name' => 'valid_till', 'title' => __('modules.estimates.validTill')],
            __('app.status') => ['data' => 'status', 'name' => 'status', 'title' => __('app.status')],
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
        return 'estimates_' . date('YmdHis');
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
