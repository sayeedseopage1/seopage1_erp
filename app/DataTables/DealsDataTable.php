<?php

namespace App\DataTables;

use App\Models\DealStage;
use App\DataTables\BaseDataTable;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;
use App\Models\Currency;
use App\Models\Lead;
use App\Models\User;
use App\Models\Deal;
use App\Models\Project;
use Illuminate\Support\Str;
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

                // if (!$row->signature) {
                //     $action .= '<a class="dropdown-item" href="' . route('front.contract.show', $row->hash) . '" target="_blank"><i class="fa fa-link mr-2"></i>'.__('modules.proposal.publicLink').'</a>';
                // }
                //
                // if ($this->addContractPermission == 'all' || $this->addContractPermission == 'added') {
                //     $action .= '<a class="dropdown-item openRightModal" href="' . route('contracts.create') . '?id=' . $row->id . '">
                //             <i class="fa fa-copy mr-2"></i>
                //             ' . __('app.copy') . ' ' . __('app.menu.contract') . '
                //         </a>';
                // }

                if (
                    $this->editContractPermission == 'all'
                    || ($this->editContractPermission == 'added' && user()->id == $row->added_by)
                    || ($this->editContractPermission == 'owned' && user()->id == $row->client_id)
                    || ($this->editContractPermission == 'both' && (user()->id == $row->client_id || user()->id == $row->added_by))
                    ) {
                      if ($row->won_lost != 'Yes') {
                        $action .= '<a class="dropdown-item openRightModal" href="' . route('deals.edit', [$row->id]) . '">
                                <i class="fa fa-edit mr-2"></i>
                                ' . trans('app.edit') . '
                            </a>';
                      }else {
                        $won_deal_id= Deal::where('deal_id',$row->short_code)->first();
                        $action .= '<a class="dropdown-item" href="/deals/details/edit/'.$won_deal_id->id.'">
                                <i class="fa fa-edit mr-2"></i>
                                ' . trans('app.edit') . '
                            </a>';
                      }
                      if ($row->won_lost == 'Yes') {
                        $won_deal_id= Deal::where('deal_id',$row->short_code)->first();
                        $action .= '<a class="dropdown-item" href="/account/deal-url/'.$won_deal_id->id.'">

                                <i class="fa fa-file mr-2"></i>
                                ' . trans('Client Form') . '
                            </a>';
                      }

                }

                if (
                    $this->deleteContractPermission == 'all'
                    || ($this->deleteContractPermission == 'added' && user()->id == $row->added_by)
                    || ($this->deleteContractPermission == 'owned' && user()->id == $row->client_id)
                    || ($this->deleteContractPermission == 'both' && (user()->id == $row->client_id || user()->id == $row->added_by))
                ) {
                    $action .= '<a class="dropdown-item delete-table-row" href="javascript:;" data-deal-id="' . $row->id . '">
                            <i class="fa fa-trash mr-2"></i>
                            ' . trans('app.delete') . '
                        </a>';
                }

                // $action .= '<a class="dropdown-item" href="' . route('contracts.download', $row->id) . '">
                //                 <i class="fa fa-download mr-2"></i>
                //                 ' . trans('app.download') . '
                //             </a>';


                $action .= '</div>
                </div>
            </div>';

                return $action;
            })
            ->addColumn('project_name', function($row) {
              if ($row->won_lost== 'Yes') {
                $deal= Deal::where('deal_id',$row->short_code)->first();
                $project= Project::where('deal_id',$deal->id)->first();
                if ($project->project_status != 'pending') {
                  return '<div class="media align-items-center">

                           <div class="media-body">
                          <h5 class="mb-0 f-13 text-darkest-grey"><a title="'.$project->project_name.'" href="' . route('deals.show', [$row->id]) . '">' . ucfirst($project->project_name) . '</a></h5>

                           </div>
                        </div>';
                }else {
                  return '<div class="media align-items-center">

                           <div class="media-body">
                          <h5 class="mb-0 f-13 text-darkest-grey"><a title="'.$row->project_name.'" href="' . route('deals.show', [$row->id]) . '">' . ucfirst($row->project_name) . '</a></h5>

                           </div>
                        </div>';
                }
              }else {
                return '<div class="media align-items-center">

                         <div class="media-body">
                        <h5 class="mb-0 f-13 text-darkest-grey"><a title="'.$row->project_name.'" href="' . route('deals.show', [$row->id]) . '">' . ucfirst($row->project_name) . '</a></h5>

                         </div>
                      </div>';
              }

            })
            ->addColumn('deal_id', function($row) {
              //  return ucfirst($row->short_code);
              if($row->won_lost != 'Yes'){
                return '<div class="media align-items-center">

                         <div class="media-body">
                        <h5 class="mb-0 f-13 text-darkest-grey"><a class="btn btn-success btn-sm" href="' . route('deals.show', [$row->id]) . '"> View'.'</a></h5>

                         </div>
                      </div>';
              }else {
                return '<div class="media align-items-center">

                         <div class="media-body">
                        <h5 class="mb-0 f-13 text-darkest-grey"><a class="btn btn-success btn-sm" href="/account/deals/'.$row->id .'?tab=deal_details">View' . '</a></h5>

                         </div>
                      </div>';
              }

            })

            // ->editColumn('subject', function ($row) {
            //     $signed = '';
            //
            //     if ($row->signature) {
            //         $signed = '<span class="badge badge-secondary"><i class="fa fa-signature"></i> ' . __('app.signed') . '</span>';
            //     }
            //
            //     return '<div class="media align-items-center">
            //             <div class="media-body">
            //         <h5 class="mb-0 f-13 text-darkest-grey"><a href="' . route('contracts.show', [$row->id]) . '">' . ucfirst($row->subject) . '</a></h5>
            //         <p class="mb-0">' . $signed . '</p>
            //         </div>
            //       </div>';
            // })
            ->editColumn('created_at', function ($row) {
                return $row->created_at->format($this->global->date_format);
            })

            ->editColumn('amount', function ($row) {
              $currency= Currency::where('id',$row->currency_id)->first();
                // $currencySymbol = $row->currency->currency_symbol;
                //
                // return currency_formatter($row->amount, $currencySymbol);
              return round($row->amount,2) . $currency->currency_symbol;


            })
            ->editColumn('actual_amount', function ($row) {
              $currency= Currency::where('id',$row->original_currency_id)->first();
                // $currencySymbol = $row->currency->currency_symbol;
                //
                // return currency_formatter($row->amount, $currencySymbol);
              return $row->actual_amount . $currency->currency_symbol;


            })
            ->addColumn('status', function($row) {

            //  dd($row->added_by->name);
                //return $row->won_lost;
                if ($row->won_lost != null) {
                  if ($row->won_lost== 'Yes') {

                    return '<badge style="background-color:#006400 !important;" class="badge badge-success">Won</badge>';
                  }else {
                      return '<badge style="background-color:#bf0603 !important;" class="badge badge-danger">Lost</badge>';
                  }
                }else {
                  if($row->deal_stage == 0)
                  {
                      return '<badge class="badge badge-info">Contact Made</badge>';
                  }elseif ($row->deal_stage == 1) {
                  return '<badge style="background-color:#006400 !important; text-color:white !important;" class="badge badge-warning text-white">Qualified</badge>';
                }elseif($row->deal_stage == 2)
                {
                    return '<badge style="background-color:#ff5714 !important;" class="badge badge-info">Requirements Defined</badge>';
                }elseif ($row->deal_stage == 3) {
                    return '<badge style="background-color:#e4ff1a !important;" class="badge badge-primary text-dark">Proposal Made</badge>';
                }else {
                    return '<badge style="background-color:#5603ad !important;" class="badge badge-success">Negotiation Started</badge>';
                }

                }
            })
            ->addColumn('submission_status', function($row) {

            //  dd($row->added_by->name);
                //return $row->won_lost;
                $deal= Deal::where('deal_id',$row->short_code)->first();
                if ($deal != null) {
                  if ($deal->submission_status == 'pending') {
                      return '<badge class="badge badge-danger">Pending</badge>';
                  }elseif ($deal->submission_status == 'Submitted') {
                  return '<badge class="badge badge-success">Submitted</badge>';
                  }
                  else {
                    return '<badge class="badge badge-warning">'.$deal->submission_status.'</badge>';
                  }
                }else {
                  return '--';
                }


            })
            ->addColumn('project_manager', function($row) {
              if ($row->won_lost == 'Yes') {
                $pm= Deal::where('deal_id',$row->short_code)->first();
                if ($pm->pm_id != null) {
                  $user= User::where('id',$pm->pm_id)->first();
                //  dd($row->added_by->name);
                    //return ucfirst($user->name);
                    return '<div class="media align-items-center">
                           <a href="' . route('employees.show', [$user->id]) . '">
                           <img src="' . $user->image_url . '" class="mr-3 taskEmployeeImg rounded-circle" alt="' . ucfirst($user->name) . '" title="' . ucfirst($user->name) . '"></a>
                             <div class="media-body">
                            <h5 class="mb-0 f-13 text-darkest-grey"><a href="' . route('employees.show', [$user->id]) . '">' . ucfirst($user->name) . '</a></h5>

                             </div>
                          </div>';
                }else {
                  return '--';
                }

              }else {
                return '--';
              }

            })
            ->addColumn('client_name', function($row) {
              if ($row->won_lost == 'Yes') {
                $client= Deal::where('deal_id',$row->short_code)->first();
                $user= User::where('id',$client->client_id)->first();
              //  dd($row->added_by->name);
                  //return ucfirst($user->name);
                  return '<div class="media align-items-center">
                         <a href="' . route('employees.show', [$user->id]) . '">
                         <img src="' . $user->image_url . '" class="mr-3 taskEmployeeImg rounded-circle" alt="' . ucfirst($user->name) . '" title="' . ucfirst($user->name) . '"></a>
                           <div class="media-body">
                          <h5 class="mb-0 f-13 text-darkest-grey"><a href="' . route('clients.show', [$user->id]) . '">' . ucfirst($user->name) . '</a></h5>

                           </div>
                        </div>';
              }else {
                return '<div class="media align-items-center">

                           <div class="media-body">
                          <h5 class="mb-0 f-13 text-darkest-grey"><a>' . ucfirst($row->client_username) . '</a></h5>

                           </div>
                        </div>';
              }

            })
            ->addColumn('added_by', function($row) {
              $user= User::where('id',$row->added_by)->first();
            //  dd($row->added_by->name);
                //return ucfirst($user->name);
                return '<div class="media align-items-center">
                       <a href="' . route('employees.show', [$user->id]) . '">
                       <img src="' . $user->image_url . '" class="mr-3 taskEmployeeImg rounded-circle" alt="' . ucfirst($user->name) . '" title="' . ucfirst($user->name) . '"></a>
                         <div class="media-body">
                        <h5 class="mb-0 f-13 text-darkest-grey"><a href="' . route('employees.show', [$user->id]) . '">' . ucfirst($user->name) . '</a></h5>

                         </div>
                      </div>';
            })
            ->addColumn('converted_by', function($row) {
              if ($row->won_lost == 'Yes') {
                $user= User::where('id',$row->converted_by)->first();
              //  dd($row->added_by->name);
                  //return ucfirst($user->name);
                  return '<div class="media align-items-center">
                         <a href="' . route('employees.show', [$user->id]) . '">
                         <img src="' . $user->image_url . '" class="mr-3 taskEmployeeImg rounded-circle" alt="' . ucfirst($user->name) . '" title="' . ucfirst($user->name) . '"></a>
                           <div class="media-body">
                          <h5 class="mb-0 f-13 text-darkest-grey"><a href="' . route('employees.show', [$user->id]) . '">' . ucfirst($user->name) . '</a></h5>

                           </div>
                        </div>';
              }else {
                return '--';
              }

            })
            // ->editColumn('added_by.name', function ($row) {
            //     return '<div class="media align-items-center">
            //         <a href="' . route('employees.show', [$row->added_by]) . '">
            //         <img src="' . $row->added_by->image_url . '" class="mr-3 taskEmployeeImg rounded-circle" alt="' . ucfirst($row->added_by->name) . '" title="' . ucfirst($row->added_by->name) . '"></a>
            //         <div class="media-body">
            //         <h5 class="mb-0 f-13 text-darkest-grey"><a href="' . route('employees.show', [$row->added_by]) . '">' . ucfirst($row->added_by->name) . '</a></h5>
            //
            //         </div>
            //       </div>';
            // })
            // ->editColumn('signature', function ($row) {
            //     if ($row->signature) {
            //         return __('app.signed');
            //     }
            // })
            ->addIndexColumn()
            ->smart(false)
            ->setRowId(function ($row) {
                return 'row-' . $row->id;
            })
            ->rawColumns(['action', 'check', 'project_name','deal_id','status','added_by','converted_by','project_manager','client_name','submission_status']);
    }

    /**
     * @param DealStage $model
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function query(DealStage $model)
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

        $model = $model->with('lead')

            // ->join('users', 'users.id', '=', 'contracts.client_id')
            // ->join('client_details', 'users.id', '=', 'client_details.user_id')
            ->select('deal_stages.*');

        if ($startDate !== null && $endDate !== null) {
            $model->where(function ($q) use ($startDate, $endDate) {
                $q->whereBetween(DB::raw('DATE(deal_stages.`created_at`)'), [$startDate, $endDate]);

                $q->orWhereBetween(DB::raw('DATE(deal_stages.`updated_at`)'), [$startDate, $endDate]);
            });
        }

        // if ($request->client != 'all' && !is_null($request->client)) {
        //     $model = $model->where('contracts.client_id', '=', $request->client);
        // }

        // if ($request->contract_type != 'all' && !is_null($request->contract_type)) {
        //     $model = $model->where('contracts.contract_type_id', '=', $request->contract_type);
        // }

        // if (request('signed') == 'yes') {
        //     $model = $model->has('signature');
        // }

        if ($request->searchText != '') {
            $model = $model->where(function ($query) {
                $query->where('deal_stages.project_name', 'like', '%' . request('searchText') . '%')
                    ->orWhere('deal_stages.short_code', 'like', '%' . request('searchText') . '%');

            });
        }
        // if ($this->viewContractPermission == 'added') {
        //     $model = $model->where('contracts.added_by', '=', user()->id);
        // }
        //
        // if ($this->viewContractPermission == 'owned') {
        //     $model = $model->where('contracts.client_id', '=', user()->id);
        // }
        //
        // if ($this->viewContractPermission == 'both') {
        //     $model = $model->where(function ($query) {
        //         $query->where('contracts.added_by', '=', user()->id)
        //             ->orWhere('contracts.client_id', '=', user()->id);
        //     });
        // }

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
            ->setTableId('deals-table')
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
                   window.LaravelDataTables["deals-table"].buttons().container()
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
            '#' => ['data' => 'DT_RowIndex', 'orderable' => false, 'searchable' => false, 'visible' => true],
            // __('app.id') => ['data' => 'id', 'name' => 'id', 'title' => __('app.id')],


             __('app.project_name') => ['data' => 'project_name', 'name' => 'project_name', 'exportable' => false, 'title' => __('Deal Name')],
            __('app.project_name').' '.__('app.project_name') => ['data' => 'project_name', 'name' => 'project_name', 'visible' => false, 'title' => __('Deal Name')],
              __('app.client_name')  => ['data' => 'client_name', 'name' => 'client_name', 'title' => __('Client')],

          //  __('app.customers')  => ['data' => 'client_name', 'name' => 'client.name', 'visible' => false, 'title' => __('app.customers')],
            __('app.amount') => ['data' => 'amount', 'name' => 'amount', 'title' => __('Project Budget (USD)')],
            __('app.actual_amount') => ['data' => 'actual_amount', 'name' => 'actual_amount', 'title' => __('Project Budget (Original Currency)')],
            // __('app.project_manager')  => ['data' => 'project_manager', 'name' => 'project_manager', 'title' => __('Project Manager')],
            // __('app.startDate') => ['data' => 'start_date', 'name' => 'start_date', 'title' => __('app.startDate')],
              // __('app.submission_status_manager')  => ['data' => 'submission_status', 'name' => 'submission_status', 'title' => __('Client Form')],
            __('app.created_at') => ['data' => 'created_at', 'name' => 'created_at', 'title' => __('Creation Date')],
             __('app.added_by')  => ['data' => 'added_by', 'name' => 'added_by', 'title' => __('Added By')],
                __('app.converted_by')  => ['data' => 'converted_by', 'name' => 'converted_by', 'title' => __('Closed By')],
                  __('app.status')  => ['data' => 'status', 'name' => 'status', 'title' => __('Status')],
                      // __('app.deal_id')  => ['data' => 'deal_id', 'name' => 'deal_id',  'title' => __('View')],
            // __('app.signature') => ['data' => 'signature', 'name' => 'signature', 'visible' => false, 'title' => __('app.signature')],
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
        return 'Deals_' . date('YmdHis');
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
