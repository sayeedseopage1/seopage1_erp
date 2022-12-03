<?php

namespace App\DataTables;

use Carbon\Carbon;
use App\Models\DealStage;
use App\Models\LeadAgent;
use App\Models\LeadStatus;
use App\Models\CustomField;
use App\Models\CustomFieldGroup;
use App\DataTables\BaseDataTable;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;
use Illuminate\Support\Facades\DB;
use App\Models\DealStage;
use App\Models\Currency;

class DealsDataTable extends BaseDataTable
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

                 $action .= ' <a href="' . route('deals.show', [$row->id]) . '" class="dropdown-item"><i class="fa fa-eye mr-2"></i>' . __('app.view') . '</a>';

                 if (!$row->signature) {
                     $action .= '<a class="dropdown-item" href="' . route('front.contract.show', $row->hash) . '" target="_blank"><i class="fa fa-link mr-2"></i>'.__('modules.proposal.publicLink').'</a>';
                 }

                 if ($this->addContractPermission == 'all' || $this->addContractPermission == 'added') {
                     $action .= '<a class="dropdown-item openRightModal" href="' . route('deals.create') . '?id=' . $row->id . '">
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
                     $action .= '<a class="dropdown-item openRightModal" href="' . route('deals.edit', [$row->id]) . '">
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

                 $action .= '<a class="dropdown-item" href="' . route('deals.download', $row->id) . '">
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
                     <h5 class="mb-0 f-13 text-darkest-grey"><a href="' . route('deals.show', [$row->id]) . '">' . ucfirst($row->subject) . '</a></h5>
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
      * @param DealStage $model
      * @return \Illuminate\Database\Eloquent\Builder
      */
    public function query(DealStage $model)
    {
        $currentDate = now()->format('Y-m-d');
        $deal = $model::all();




        if ($this->request()->startDate !== null && $this->request()->startDate != 'null' && $this->request()->startDate != '' && request()->date_filter_on == 'created_at') {
            $startDate = Carbon::createFromFormat($this->global->date_format, $this->request()->startDate)->toDateString();

            $deal = $deal->having(DB::raw('DATE(leads.`created_at`)'), '>=', $startDate);
        }

        if ($this->request()->startDate !== null && $this->request()->startDate != 'null' && $this->request()->startDate != '' && request()->date_filter_on == 'next_follow_up_date') {
            $startDate = Carbon::createFromFormat($this->global->date_format, $this->request()->startDate)->toDateString();

            $deal = $deal->having(DB::raw('DATE(`next_follow_up_date`)'), '>=', $startDate);
        }

        if ($this->request()->endDate !== null && $this->request()->endDate != 'null' && $this->request()->endDate != '' && request()->date_filter_on == 'created_at') {
            $endDate = Carbon::createFromFormat($this->global->date_format, $this->request()->endDate)->toDateString();
            $deal = $deal->having(DB::raw('DATE(leads.`created_at`)'), '<=', $endDate);
        }

        if ($this->request()->endDate !== null && $this->request()->endDate != 'null' && $this->request()->endDate != '' && request()->date_filter_on == 'next_follow_up_date') {
            $endDate = Carbon::createFromFormat($this->global->date_format, $this->request()->endDate)->toDateString();
            $deal = $deal->having(DB::raw('DATE(`next_follow_up_date`)'), '<=', $endDate);
        }

        if (($this->request()->agent != 'all' && $this->request()->agent != '') || $this->viewLeadPermission == 'added') {
            $deal = $deal->where(function ($query) {
                if ($this->request()->agent != 'all' && $this->request()->agent != '') {
                    $query->where('agent_id', $this->request()->agent);
                }

                if ($this->viewLeadPermission == 'added') {
                    $query->orWhere('leads.added_by', user()->id);
                }
            });
        }

        if ($this->viewLeadPermission == 'owned' && !is_null($this->myAgentId)) {
            $deal = $deal->where(function ($query) {
                $query->where('agent_id', $this->myAgentId->id);
            });
        }

        if ($this->viewLeadPermission == 'both') {
            $deal = $deal->where(function ($query) {
                if(!is_null($this->myAgentId)) {
                    $query->where('agent_id', $this->myAgentId->id);
                }

                $query->orWhere('leads.added_by', user()->id);
            });
        }

        if ($this->request()->category_id != 'all' && $this->request()->category_id != '') {
            $deal = $deal->where('category_id', $this->request()->category_id);
        }

        if ($this->request()->source_id != 'all' && $this->request()->source_id != '') {
            $deal = $deal->where('source_id', $this->request()->source_id);
        }

        if ($this->request()->searchText != '') {
            $deal = $deal->where(function ($query) {
                $query->where('leads.client_name', 'like', '%' . request('searchText') . '%')
                    ->orWhere('leads.company_name', 'like', '%' . request('searchText') . '%')
                    ->orWhere('leads.project_id', 'like', '%' . request('searchText') . '%')
                    ->orWhere('leads.project_link', 'like', '%' . request('searchText') . '%')
                    ->orWhere('leads.actual_value', 'like', '%' . request('searchText') . '%')

                  ;
            });
        }


        return $deal->groupBy('leads.id');
    }

    /**
     * Optional method if you want to use html builder.
     *
     * @return \Yajra\DataTables\Html\Builder
     */
    public function html()
    {
        return $this->builder()
            ->setTableId('leads-table')
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
                   window.LaravelDataTables["leads-table"].buttons().container()
                    .appendTo("#table-actions")
                }',
                'fnDrawCallback' => 'function( oSettings ) {
                    $("body").tooltip({
                        selector: \'[data-toggle="tooltip"]\'
                    });
                    $(".statusChange").selectpicker();
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
        $deal = new DealStage();
        // dd($deal);


        $data = [

            'check' => [
                'title' => '<input type="checkbox" name="select_all_table" id="select-all-table" onclick="selectAllTable(this)">',
                'exportable' => false,
                'orderable' => false,
                'searchable' => false
            ],
            '#' => ['data' => 'DT_RowIndex', 'orderable' => false, 'searchable' => false, 'visible' => false],
            __('app.id') => ['data' => 'id', 'name' => 'id', 'title' => __('app.id')],
            __('app.name') => ['data' => 'client_name', 'name' => 'client_name', 'title' => __('app.name')],
              __('app.project_id') => ['data' => 'project_id', 'name' => 'project_id', 'title' => __('Project ID')],
                __('app.project_link') => ['data' => 'project_link', 'name' => 'project_link', 'title' => __('Project Link')],



                __('app.bid_value') => ['data' => 'bid_value', 'name' => 'bid_value', 'title' => __('Project Budget')],
                  __('app.actual_value') => ['data' => 'actual_value', 'name' => 'actual_value', 'title' => __('Bid Value')],



            __('app.createdOn') => ['data' => 'created_at', 'name' => 'created_at', 'title' => __('app.createdOn')],
            __('app.biding_time') => ['data' => 'bidding_time', 'name' => 'bidding_time', 'title' => __('Bidding Delay Time')],


              __('app.deal_status') => ['data' => 'deal_status', 'name' => 'deal_status', 'exportable' => false, 'title' => __('Staus')],
                  __('app.won_lost') => ['data' => 'won_lost', 'name' => 'won_lost', 'exportable' => false, 'title' => __('Deal Status')],
            __('app.leadStatus') => ['data' => 'leadStatus', 'name' => 'leadStatus', 'visible' => false, 'orderable' => false, 'searchable' => false, 'title' => __('app.status')],
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
        return 'leads_' . date('YmdHis');
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
