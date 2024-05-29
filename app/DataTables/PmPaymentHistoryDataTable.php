<?php

namespace App\DataTables;

use App\DataTables\BaseDataTable;
use App\Models\Payment;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;

class PmPaymentHistoryDataTable extends BaseDataTable
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
            ->editColumn(
                'created_at',
                function ($row) {
                    if (!is_null($row->created_at)) {
                        return $row->created_at->format('Y-m-d H:i:s');
                    }
                }
            )
            ->editColumn('milestone_title', function ($row) {
                
                    return $row->mile_title;
               
            })
            ->editColumn('project_id', function ($row) {
                if (!is_null($row->project)) {
                    return '<a href="' . route('projects.show', $row->project_id) . '">' . ucfirst($row->project->project_name) . '</a>';
                }
                else {
                    return '--';
                }
            })
            ->editColumn('project_manager', function ($row) {
                if ($row->pm_id != null) {
                    $pm = User::where('id',$row->pm_id)->first();
                    return '<div class="media align-items-center">
                              <div class="media-body">
                          <h5 class="mb-0 f-13 "><a class="text-primary" href="' . route('employees.show',$pm->id) . '">' . $pm->name . '</a></h5>

                          </div>
                        </div>';
                } else {
                    return '--';
                }
            })
            ->editColumn('client_id', function ($row) {
                if ($row->client_id != null) {
                    $client = User::where('id',$row->client_id)->first();
                    return '<div class="media align-items-center">
                              <div class="media-body">
                          <h5 class="mb-0 f-13 "><a class="text-primary" href="' . route('employees.show',$client->id) . '">' . $client->name . '</a></h5>

                          </div>
                        </div>';
                } else {
                    return '--';
                }
            })
            ->editColumn('budget', function ($row) {
                $symbol = (isset($row->currency)) ? $row->currency->currency_symbol : '';
                return currency_formatter($row->project_budget, $symbol);
            })
            ->editColumn('amount', function ($row) {
                $symbol = (isset($row->currency)) ? $row->currency->currency_symbol : '';
                return currency_formatter($row->amount, $symbol);
            })
            ->editColumn('unreleased_amount', function ($row) {
                $released_amount_project = DB::table('projects')
                ->join('project_milestones', 'projects.id', '=',
                    'project_milestones.project_id'
                )
                ->join('payments', 'project_milestones.invoice_id', '=', 'payments.invoice_id')
                ->where('projects.id', $row->project_id)
                ->where('payments.created_at', '<=', $row->created_at)
                ->sum('project_milestones.cost');
               
                $unreleased_project_amount = $row->project_budget-$released_amount_project;
                if($unreleased_project_amount < 1)
                {
                    $unreleased_amount_project =0 ;

                }else 
                {
                    $unreleased_amount_project = $unreleased_project_amount ;

                }
                $symbol = (isset($row->currency)) ? $row->currency->currency_symbol : '';
                return currency_formatter(($unreleased_amount_project), $symbol);
            })
            ->editColumn('total_amount', function ($row) {
                $released_amount_project = DB::table('payments')
                ->where('payments.added_by', $row->pm_id)
                ->where('payments.created_at', '<', $row->created_at)
                ->sum('payments.amount');
               
                $total_amount = $row->amount+$released_amount_project ;
                
                $symbol = (isset($row->currency)) ? $row->currency->currency_symbol : '';
                return currency_formatter(($total_amount), $symbol);
            })
          
            ->addIndexColumn()
            ->smart(false)
            ->setRowId(function ($row) {
                return 'row-' . $row->id;
            })
            ->rawColumns(['invoice', 'action', 'status', 'project_id','check','milestone_title','client_id','project_manager'])
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

// //dd($this->request()->PmId);
$PmId= $this->request()->PmId;

        $model = Payment::with(['currency:id,currency_symbol,currency_code'])
        ->leftJoin('invoices','invoices.id','payments.invoice_id')
            ->leftJoin('projects', 'projects.id', '=', 'payments.project_id')
            
            ->leftJoin('project_milestones', 'project_milestones.id', '=', 'invoices.milestone_id')
           // ->leftJoin('orders', 'orders.id', '=', 'payments.order_id')
            ->where('projects.added_by',$PmId)
            ->groupBy('payments.id')
            ->select('payments.id','projects.project_budget','projects.pm_id','projects.client_id', 'payments.project_id', 'payments.currency_id', 'project_milestones.id as milestone_id', 'project_milestones.milestone_title as mile_title', 'payments.amount', 'payments.created_at', 'payments.added_by');

        //   /  dd($model->total_amount);

        if ($request->startDate !== null && $request->startDate != 'null' && $request->startDate != '') {
            $startDate = Carbon::createFromFormat($this->global->date_format, $request->startDate)->toDateString();
            $model = $model->where(DB::raw('DATE(payments.`created_at`)'), '>=', $startDate);
        }

        if ($request->endDate !== null && $request->endDate != 'null' && $request->endDate != '') {
            $endDate = Carbon::createFromFormat($this->global->date_format, $request->endDate)->toDateString();
            $model = $model->where(DB::raw('DATE(payments.`created_at`)'), '<=', $endDate);
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
                    ->orWhere('project_milestones.milestone_title', 'like', '%' . request('searchText') . '%')
                    ->orWhere('payments.amount', 'like', '%' . request('searchText') . '%');
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
            ->setTableId('pm-payments-table')
            ->columns($this->getColumns())
            ->minifiedAjax()
            ->orderBy(2)
            ->destroy(true)
            ->responsive(true)
            ->serverSide(true)
            ->processing(true)
            // ->dom($this->domHtml)

            ->language(__('app.datatable'))
            ->parameters([
                'initComplete' => 'function () {
                   window.LaravelDataTables["pm-payments-table"].buttons().container()
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
            __('Payment release Date') => ['data' => 'created_at', 'name' => 'created_at', 'title' => __('Payment release Date')],
            __('Milestone Name') => ['data' => 'milestone_title', 'name' => 'milestone_title', 'title' => __('Milestone Name')],
            __('app.project')  => ['data' => 'project_id', 'name' => 'project_id', 'title' => __('app.project')],
            __('Project Manager')  => ['data' => 'project_manager', 'name' => 'project_manager', 'title' => __('Project Manager')],
            __('Client')  => ['data' => 'client_id', 'name' => 'client_id', 'title' => __('Client')],
            __('modules.budget') => ['data' => 'budget', 'name' => 'budget', 'title' => __('Project Budget')],
            __('Released amount') => ['data' => 'amount', 'name' => 'amount', 'title' => __('Released amount')],
            __('modules.unreleased_amount') => ['data' => 'unreleased_amount', 'name' => 'unreleased_amount', 'title' => __('Unreleased Amount')],
            __('Total released amount') => ['data' => 'total_amount', 'name' => 'total_amount', 'title' => __('Total released amount')],
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
