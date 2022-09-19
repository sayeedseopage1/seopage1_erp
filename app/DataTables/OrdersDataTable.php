<?php

namespace App\DataTables;

use App\DataTables\BaseDataTable;
use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;

class OrdersDataTable extends BaseDataTable
{
    private $deleteOrderPermission;
    private $editOrderPermission;
    private $viewOrderPermission;

    public function __construct()
    {
        parent::__construct();
        $this->viewOrderPermission = user()->permission('view_order');
        $this->deleteOrderPermission = user()->permission('delete_order');
        $this->editOrderPermission = user()->permission('edit_order');
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

                if (!in_array('client', user_roles()) && in_array($row->status, ['pending', 'on-hold', 'failed', 'processing']) && ($this->editOrderPermission == 'all' || (in_array($this->editOrderPermission, ['added', 'both']) && $row->added_by == user()->id))) {
                    $action .= '<a class="dropdown-item orderStatusChange" href="javascript:;"  data-order-id="' . $row->id . '" data-status="completed"><i class="fa fa-check mr-2"></i>' . __('app.orderMarkAsComplete') . '</a>';
                }

                $action .= ' <a href="' . route('orders.show', [$row->id]) . '" class="dropdown-item"><i class="fa fa-eye mr-2"></i>' . __('app.view') . '</a>';

                if ($this->viewOrderPermission == 'all' || ($this->viewOrderPermission == 'both' && ($row->added_by == user()->id || $row->client_id == user()->id)) || ($this->viewOrderPermission == 'owned' && $row->client_id == user()->id) || ($this->viewOrderPermission == 'added' && $row->added_by == user()->id))
                {
                    $action .= '<a class="dropdown-item" href="' . route('orders.download', [$row->id]) . '">
                                    <i class="fa fa-download mr-2"></i>
                                    ' . trans('app.download') . '
                                </a>';
                }

                if (!in_array('client', user_roles()) && !in_array($row->status, ['completed', 'canceled', 'refunded']) && ($this->editOrderPermission == 'all' || ($this->editOrderPermission == 'both' && ($row->added_by == user()->id || $row->client_id == user()->id)) || ($this->editOrderPermission == 'added' && $row->added_by == user()->id) || ($this->editOrderPermission == 'owned' && $row->client_id == user()->id))) {
                    $action .= '<a class="dropdown-item openRightModal" href="' . route('orders.edit', $row->id) . '" >
                        <i class="fa fa-edit mr-2"></i>
                        ' . trans('app.edit') . '
                    </a>';
                }

                if (!in_array('client', user_roles()) && !in_array($row->status, ['completed', 'refunded']) &&
                    ($this->deleteOrderPermission == 'all' || ($this->deleteOrderPermission == 'both' && ($row->added_by == user()->id || $row->client_id == user()->id)) || ($this->deleteOrderPermission == 'added' && $row->added_by == user()->id) || ($this->deleteOrderPermission == 'owned' && $row->client_id == user()->id)
                )) {
                    $action .= '<a class="dropdown-item delete-table-row" href="javascript:;" data-toggle="tooltip"  data-order-id="' . $row->id . '">
                        <i class="fa fa-trash mr-2"></i>
                        ' . trans('app.delete') . '
                    </a>';
                }

                $action .= '</div>
                </div>
            </div>';

                return $action;
            })
            ->editColumn('order_number', function ($row) {

                return '<div class="media align-items-center">
                        <div class="media-body">
                    <h5 class="mb-0 f-13 text-darkest-grey"><a href="' . route('orders.show', [$row->id]) . '">' . $row->order_number . '</a></h5>
                    </div>
                  </div>';

            })
            ->addColumn('order_number_export', function ($row) {
                return $row->order_number;

            })
            ->addColumn('client_name', function ($row) {
                return $row->client->name;
            })
            ->editColumn('name', function ($row) {

                $client = $row->client;

                return view('components.client', [
                    'user' => $client
                ]);
            })
            ->editColumn('status', function ($row) {
                $status = '';

                if ((in_array('admin', user_roles()) || in_array('employee', user_roles())) && ($this->editOrderPermission == 'all' || ($this->editOrderPermission == 'both' && ($row->added_by == user()->id || $row->client_id == user()->id)) || ($this->editOrderPermission == 'added' && $row->added_by == user()->id) || ($this->editOrderPermission == 'owned' && $row->client_id == user()->id))) {
                    $status = '<select class="form-control select-picker order-status" data-order-id="' . $row->id . '" ' .(in_array($row->status, ['refunded', 'canceled']) ? 'disabled' : ''). '>';

                    if(in_array($row->status, ['pending', 'failed', 'on-hold', 'processing'])) {
                        $status .= '<option value="pending" ' . ($row->status == 'pending' ? 'selected' : '') . ' data-content="<i class=\'fa fa-circle mr-2 text-warning\'></i> ' . __('app.pending') . '">' . __('app.pending') . '</option>';
                    }

                    if(in_array($row->status, ['on-hold', 'pending', 'processing', 'failed'])) {
                        $status .= '<option value="on-hold" ' . ($row->status == 'on-hold' ? 'selected' : '') . ' data-content="<i class=\'fa fa-circle mr-2 text-info\'></i> ' . __('app.on-hold') . '">' . __('app.on-hold') . '</option>';
                    }

                    if(in_array($row->status, ['failed', 'pending',])) {
                        $status .= '<option value="failed" ' . ($row->status == 'failed' ? 'selected' : '') . ' data-content="<i class=\'fa fa-circle mr-2 text-dark\'></i> ' . __('app.failed') . '">' . __('app.failed') . '</option>';
                    }

                    if(in_array($row->status, ['processing', 'pending', 'on-hold', 'failed'])) {
                        $status .= '<option value="processing" ' . ($row->status == 'processing' ? 'selected' : '') . ' data-content="<i class=\'fa fa-circle mr-2 text-primary\'></i> ' . __('app.processing') . '">' . __('app.processing') . '</option>';
                    }

                    if(in_array($row->status, ['completed', 'pending', 'on-hold', 'failed', 'processing'])) {
                        $status .= '<option value="completed" ' . ($row->status == 'completed' ? 'selected' : '') . ' data-content="<i class=\'fa fa-circle mr-2 text-success\'></i> ' . __('app.completed') . '">' . __('app.completed') . '</option>';
                    }

                    if(in_array($row->status, ['canceled', 'on-hold', 'pending', 'failed', 'processing'])) {
                        $status .= '<option value="canceled" ' . ($row->status == 'canceled' ? 'selected' : '') . ' data-content="<i class=\'fa fa-circle mr-2 text-red\'></i> ' . __('app.canceled') . '">' . __('app.canceled') . '</option>';
                    }

                    if(in_array($row->status, ['refunded', 'completed'])) {
                        $status .= '<option value="refunded" ' . ($row->status == 'refunded' ? 'selected' : '') . ' data-content="<i class=\'fa fa-circle mr-2 \'></i> ' . __('app.refunded') . '">' . __('app.refunded') . '</option>';
                    }

                    $status .= '</select>';
                }
                else{
                    switch ($row->status) {
                    case 'pending':
                        $status = ' <i class="fa fa-circle mr-1 text-warning f-10"></i>' .  __('app.' . $row->status);
                        break;

                    case 'on-hold':
                        $status = ' <i class="fa fa-circle mr-1 text-info f-10"></i>' .  __('app.' . $row->status);
                        break;

                    case 'failed':
                        $status = ' <i class="fa fa-circle mr-1 text-dark f-10"></i>' .  __('app.' . $row->status);
                        break;

                    case 'processing':
                        $status = ' <i class="fa fa-circle mr-1 text-primary f-10"></i>' .  __('app.' . $row->status);
                        break;

                    case 'completed':
                        $status = ' <i class="fa fa-circle mr-1 text-success f-10"></i>' .  __('app.' . $row->status);
                        break;

                    case 'canceled':
                        $status = ' <i class="fa fa-circle mr-1 text-red f-10"></i>' .  __('app.' . $row->status);
                        break;

                    case 'refunded':
                        $status = ' <i class="fa fa-circle mr-1 f-10"></i>' .  __('app.' . $row->status);
                        break;
                    default:
                        $status = ' <i class="fa fa-circle mr-1 f-10"></i>' .  __('app.' . $row->status);
                        break;
                    }
                }

                return $status;
            })
            ->editColumn('total', function ($row) {
                $currencySymbol = $row->currency->currency_symbol;

                return currency_formatter($row->total, $currencySymbol);
            })
            ->editColumn(
                'order_date',
                function ($row) {
                    return Carbon::parse($row->order_date)->timezone($this->global->timezone)->format($this->global->date_format);
                }
            )
            ->addColumn('order_status', function($row) {
                return ucfirst($row->status);
            })
            ->rawColumns(['action', 'status', 'total', 'name', 'order_number'])
            ->removeColumn('currency_symbol')
            ->removeColumn('currency_code');
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

        $model = Order::with([
            'currency:id,currency_symbol,currency_code', 'client', 'payment'
            ])
            ->with('client', 'client.session', 'client.clientDetails', 'payment')
            ->select('orders.id', 'orders.client_id', 'orders.currency_id', 'orders.total', 'orders.status', 'orders.order_date', 'orders.show_shipping_address', 'orders.added_by');

        if ($request->startDate !== null && $request->startDate != 'null' && $request->startDate != '') {
            $startDate = Carbon::createFromFormat($this->global->date_format, $request->startDate)->toDateString();
            $model = $model->where(DB::raw('DATE(orders.`order_date`)'), '>=', $startDate);
        }

        if ($request->endDate !== null && $request->endDate != 'null' && $request->endDate != '') {
            $endDate = Carbon::createFromFormat($this->global->date_format, $request->endDate)->toDateString();
            $model = $model->where(DB::raw('DATE(orders.`order_date`)'), '<=', $endDate);
        }

        if ($request->status != 'all' && !is_null($request->status)) {
            $model = $model->where('orders.status', '=', $request->status);
        }

        if ($request->clientID != 'all' && !is_null($request->clientID)) {
            $model = $model->where('orders.client_id', '=', $request->clientID);
        }

        if ($request->searchText != '') {
            $model->where(function ($query) {
                $query->where('orders.id', 'like', '%' . request('searchText') . '%')
                    ->orWhere('orders.total', 'like', '%' . request('searchText') . '%');
            });
        }

        if ($this->viewOrderPermission == 'added') {
            $model->where('orders.added_by', user()->id);
        }

        if ($this->viewOrderPermission == 'owned') {
            $model->where('orders.client_id', user()->id);
        }

        if ($this->viewOrderPermission == 'both') {
            $model->where(function ($query) {
                $query->where('orders.added_by', user()->id)
                    ->orWhere('orders.client_id', user()->id);
            });
        }

        if (in_array('client', user_roles())) {
            $model->where('orders.client_id', user()->id);
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
            ->setTableId('orders-table')
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
                    window.LaravelDataTables["orders-table"].buttons().container()
                    .appendTo( "#table-actions")
                }',
                'fnDrawCallback' => 'function( oSettings ) {
                    $("body").tooltip({
                        selector: \'[data-toggle="tooltip"]\'
                    });
                    $(".select-picker").selectpicker();

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
            __('app.order') . __('app.no') => ['data' => 'order_number_export', 'name' => 'order_number_export', 'visible' => false, 'title' => __('app.order') . ' ' . __('app.no')],
            __('app.order') . '#' => ['data' => 'order_number', 'name' => 'order_number', 'exportable' => false, 'title' => __('app.order') . '#'],
            __('app.client_name') => ['data' => 'client_name', 'name' => 'project.client.name', 'visible' => false, 'title' => __('app.client_name')],
            __('app.client') => ['data' => 'name', 'name' => 'project.client.name', 'visible' => !in_array('client', user_roles()), 'exportable' => false, 'title' => __('app.client')],
            __('modules.invoices.total') => ['data' => 'total', 'name' => 'total', 'class' => 'text-right', 'title' => __('modules.invoices.total')],
            __('modules.orders.orderDate') => ['data' => 'order_date', 'name' => 'order_date', 'title' => __('modules.orders.orderDate')],
            __('app.status') => ['data' => 'status', 'name' => 'status', 'width' => '10%', 'exportable' => false, 'title' => __('app.status')],
            __('order_status') => ['data' => 'order_status', 'name' => 'order_status', 'width' => '10%', 'visible' => false, 'title' => __('app.status')],
            Column::computed('action', __('app.action'))
                ->exportable(false)
                ->printable(false)
                ->orderable(false)
                ->searchable(false)
                ->width(150)
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
        return 'Orders_' . date('YmdHis');
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
