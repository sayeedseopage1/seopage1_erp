<?php

namespace App\DataTables;

use Carbon\Carbon;
use App\Models\Lead;
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
use Illuminate\Support\Str;
use App\Models\User;

class LeadsDataTable extends BaseDataTable
{

    private $addLeadPermission;
    private $editLeadPermission;
    private $deleteLeadPermission;
    private $addFollowUpPermission;
    private $changeLeadStatusPermission;
    private $viewLeadPermission;
    private $myAgentId;

    /**
     * @var LeadStatus[]|\Illuminate\Database\Eloquent\Collection
     */
    private $status;

    public function __construct()
    {
        parent::__construct();
        $this->addLeadPermission = user()->permission('add_lead');
        $this->editLeadPermission = user()->permission('edit_lead');
        $this->deleteLeadPermission = user()->permission('delete_lead');
        $this->addFollowUpPermission = user()->permission('add_lead_follow_up');
        $this->changeLeadStatusPermission = user()->permission('change_lead_status');
        $this->viewLeadFollowUpPermission = user()->permission('view_lead_follow_up');
        $this->viewLeadPermission = user()->permission('view_lead');
        $this->status = LeadStatus::get();
        $this->myAgentId = LeadAgent::where('user_id', user()->id)->first();
    }

    /**
     * Build DataTable class.
     *
     * @param mixed $query Results from query() method.
     * @return \Yajra\DataTables\DataTableAbstract
     */
    public function dataTable($query)
    {
      //dd($query);
        $currentDate = Carbon::now(global_setting()->timezone)->format('Y-m-d');
        $status = $this->status;

        $lead = new Lead();
        $customFieldsGroupsId = CustomFieldGroup::where('model', $lead->customFieldModel)->pluck('id')->first();
        $customFields = CustomField::where('custom_field_group_id', $customFieldsGroupsId)->where('export', 1)->get();

        $datatables = datatables()->eloquent($query);
        $datatables->addIndexColumn();
        $datatables->addColumn('check', function ($row) {
                return '<input type="checkbox" class="select-table-row" id="datatable-row-' . $row->id . '"  name="datatable_ids[]" value="' . $row->id . '" onclick="dataTableRowCheck(' . $row->id . ')">';
        });
            $datatables->addColumn('action', function ($row) {
                $action = '<div class="task_view">

                  <div class="dropdown">
                        <a class="task_view_more d-flex align-items-center justify-content-center dropdown-toggle" type="link"
                            id="dropdownMenuLink-' . $row->id . '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="icon-options-vertical icons"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink-' . $row->id . '" tabindex="0">';

                   // $action .= '<a href="' . route('leads.show', [$row->id]) . '" class="dropdown-item"><i class="fa fa-eye mr-2"></i>' . __('app.view') . '</a>';

                if (
                    $this->editLeadPermission == 'all'
                    || ($this->editLeadPermission == 'added' && user()->id == $row->added_by)
                    || ($this->editLeadPermission == 'owned' && !is_null($row->agent_id) && user()->id == $row->leadAgent->user->id)
                    || ($this->editLeadPermission == 'both' && ((!is_null($row->agent_id) && user()->id == $row->leadAgent->user->id)
                    || user()->id == $row->added_by))
                    ) {
                    $action .= '<a class="dropdown-item openRightModal" href="' . route('leads.edit', [$row->id]) . '">
                                <i class="fa fa-edit mr-2"></i>
                                ' . trans('app.edit') . '
                            </a>';
                }

                if (
                    $this->deleteLeadPermission == 'all'
                    || ($this->deleteLeadPermission == 'added' && user()->id == $row->added_by)
                    || ($this->deleteLeadPermission == 'owned' && !is_null($row->agent_id) && user()->id == $row->leadAgent->user->id)
                    || ($this->deleteLeadPermission == 'both' && ((!is_null($row->agent_id) && user()->id == $row->leadAgent->user->id)
                    || user()->id == $row->added_by))
                    ) {
                        $action .= '<a class="dropdown-item delete-table-row" href="javascript:;" data-id="' . $row->id . '">
                        <i class="fa fa-trash mr-2"></i>
                        ' . trans('app.delete') . '
                    </a>';
                }


                    $lead_id= lead::where('id',$row->id)->first();
                    //dd($row->deal_status);
                    if($lead_id->deal_status == 0)
                    {
                      $action .= '<button class="dropdown-item"   data-toggle="modal" data-target="#dealstmodal" onclick="dataTableRowCheck2(' . $row->id . ')">
                            <i class="fa fa-thumbs-up mr-2"></i>
                                  ' . trans('Convert to Deal') . '
                              </button>';
                    }



                $action .= '</div>
                    </div>
                </div>';

                return $action;
            });
            $datatables->addColumn('employee_name', function ($row) {
                if (!is_null($row->agent_id)) {
                    return $row->leadAgent->user->name;
                }
            });

            // $datatables->addColumn('mobile', function ($row) {
            //     if ($row->mobile != '') {
            //         return '<a href="tel:'.$row->mobile.'" class="text-darkest-grey"><u>'.$row->mobile.'</u></a>';
            //     }
            //
            //     return '--';
            // });
            $datatables->addColumn('lead', function ($row) {
                return $row->client_name;
            });
            $datatables->addColumn('added_by', function($row) {
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
            });

            $datatables->addColumn('project_link', function ($row) {
              //  return $row->project_link;
                return '<a target="_blank" class="mb-0 f-13 text-darkest-grey" href="' . $row->project_link . '">' . Str::limit($row->project_link,15). '</a>';
            });
            $datatables->addColumn('bid_value', function ($row) {
              $currency= Currency::where('id',$row->original_currency_id)->first();
              //dd($currency,$lead_id->original_currency_id,$lead_id->currency_id);
              $bid_value= $row->bid_value.''.$currency->currency_symbol. '-' . $row->bid_value2 .''.$currency->currency_symbol;
              //dd($actual_value);
                return $bid_value;
            });
            $datatables->addColumn('actual_value', function ($row) {
              //$lead_i= Lead::where('id',$row->id)->first();
              $currency= Currency::where('id',$row->original_currency_id)->first();
              //dd($currency,$lead_id->original_currency_id,$lead_id->currency_id);
              $actual_value= $row->actual_value.''.$currency->currency_symbol;
              //dd($actual_value);
                return $actual_value;
            });
            $datatables->addColumn('deal_status', function ($row) {
              if($row->deal_status == 0)
              {
                  return '<badge class="badge badge-danger">Not Converted to Deal</badge>';
              }else
                return
                '<badge class="badge badge-success">Converted to Deal</badge>';
            });
            $datatables->addColumn('won_lost', function ($row)  {
              //dd($row);
              $won_lost= '';
              if($row->deal_status == 0){
                $won_lost= "Not Applicable";
              }else {
                $leadids= DealStage::all();

                foreach ($leadids as $leadid) {
                    $nleadid= DealStage::where('lead_id',$row->id)->first();
                    if ($nleadid == null) {
                        $won_lost ="Not Applicable";
                    }else {
                      if($row->id == $leadid->lead_id)
                      {
                        if($leadid->deal_status == 'pending' && $leadid->won_lost == 'Yes')
                        {
                          $won_lost= '<badge class="badge badge-success">Won</badge>';


                        }elseif($leadid->deal_status == 'Lost'){
                          $won_lost= '<badge class="badge badge-danger">Lost</badge>';

                      }elseif(($leadid->deal_status == 'pending' && $leadid->won_lost == 'No')|| ($leadid->deal_status == 'pending' && $leadid->won_lost == null)) {
                        $won_lost = '<badge class="badge badge-warning">No Activity Yet</badge>';

                      }

                    }
                    }

                }
              }



              return $won_lost;


          });




            $datatables->addColumn('category_name', function ($row) {

                if (!is_null($row->category_id)) {
                    return $row->category->category_name;
                }
            });
            $datatables->addColumn('bidding_time', function ($row) {

                if (!is_null($row->bidding_minutes)) {
                    return $row->bidding_minutes . ' mins '. $row->bidding_seconds. ' seconds';
                }else {
                return  '--';
                }
            });



            $datatables->addColumn('status', function ($row) use ($status) {
                $action = '--';

                if ($this->changeLeadStatusPermission == 'all') {

                    $statusLi = '--';

                    foreach ($status as $st) {
                        if ($row->status_id == $st->id) {
                            $selected = 'selected';
                        }
                        else {
                            $selected = '';
                        }

                        $statusLi .= '<option ' . $selected . ' value="' . $st->id . '">' . ucfirst($st->type) . '</option>';
                    }

                    $action = '<select class="form-control statusChange" name="statusChange" onchange="changeStatus( ' . $row->id . ', this.value)">
                        ' . $statusLi . '
                    </select>';

                } else {
                    foreach ($status as $st) {
                        if ($row->status_id == $st->id) {
                            $action = $st->type;
                        }
                    }
                }


                return $action;
            });
            $datatables->addColumn('leadStatus', function ($row) use ($status) {
                $leadStatus = '';

                foreach ($status as $st) {
                    if ($row->status_id == $st->id) {
                        $leadStatus = $st->type;
                    }
                }

                return $leadStatus;
            });

        $customFieldsId = $customFields->pluck('id');
        $fieldData = DB::table('custom_fields_data')->where('model', 'App\Models\Lead')->whereIn('custom_field_id', $customFieldsId)->select('id', 'custom_field_id', 'model_id', 'value')->get();

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

            $datatables->editColumn('client_name', function ($row) {
                if ($row->client_id != null && $row->client_id != '') {
                    $label = '<label class="badge badge-secondary">' . __('app.client') . '</label>';
                }
                else {
                    $label = '';
                }

                $client_name = ucfirst($row->salutation) . ' ' . ucfirst($row->client_name);

                return '<div class="media align-items-center">
                        <div class="media-body">
                    <h5 class="mb-0 f-13 text-darkest-grey"><a href="' . route('leads.show', [$row->id]) . '">' . (Str::limit($client_name,40)) . '</a></h5>
                    <p class="mb-0">' . $label . '</p>
                    </div>
                  </div>';
            });


            $datatables->editColumn('next_follow_up_date', function ($row) use ($currentDate) {
                if ($this->viewLeadFollowUpPermission != 'none') {
                    // code...
                    if ($row->next_follow_up_date != null && $row->next_follow_up_date != '') {
                        $date = Carbon::parse($row->next_follow_up_date)->format($this->global->date_format .' '. $this->global->time_format);
                    }
                    else {
                        $date = '--';
                    }

                    if ($row->next_follow_up_date < $currentDate && $date != '--') {
                        return $date . '<br><label class="label label-danger">' . __('app.pending') . '</label>';
                    }

                    return $date;
                }
            });
            $datatables->editColumn('created_at', function ($row) {
                return $row->created_at->format($this->global->date_format). ' ('.$row->created_at->format('h:i:s A').')';
            });
            $datatables->editColumn('agent_name', function ($row) {

                if (!is_null($row->agent_id)) {
                    return view('components.employee-image', [
                        'user' => $row->leadAgent->user
                    ]);
                }

                return '--';
            });
            $datatables->smart(false);
            $datatables->setRowId(function ($row) {
                return 'row-' . $row->id;
            });
            $datatables->removeColumn('status_id');
            $datatables->removeColumn('client_id');
            $datatables->removeColumn('source');
            $datatables->removeColumn('next_follow_up');
            $datatables->removeColumn('statusName');
            $datatables->rawColumns(['status', 'action', 'client_name', 'next_follow_up_date', 'agent_name', 'check','project_link','deal_status','won_lost','added_by']);

            return $datatables;
    }

    /**
     * @param Lead $model
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function query(Lead $model)
    {
      $startDate = null;
      $endDate = null;

      if ($this->request()->startDate !== null && $this->request()->startDate != 'null' && $this->request()->startDate != '') {
          $startDate = Carbon::createFromFormat($this->global->date_format, $this->request()->startDate)->toDateString();
      }

      if ($this->request()->endDate !== null && $this->request()->endDate != 'null' && $this->request()->endDate != '') {
          $endDate = Carbon::createFromFormat($this->global->date_format, $this->request()->endDate)->toDateString();
      }
        $currentDate = now()->format('Y-m-d');
        $lead = $model->with(['leadAgent', 'leadAgent.user', 'category','user'])
            ->select(
                'leads.id',
                'leads.agent_id',

                'leads.added_by',
                'leads.client_id',
                'leads.next_follow_up',
                'leads.salutation',
                'leads.category_id',
                'client_name',
                'actual_value',
                'bidding_minutes',
                'bidding_seconds',
                'bid_value',
                'bid_value2',

                'project_link',
                'company_name',
                'lead_status.type as statusName',
                'status_id',
                'deal_status',
                'currency_id',
                'original_currency_id',
                'leads.created_at',
                'lead_sources.type as source',
                'users.name as agent_name',
                'users.image',
                DB::raw("(select next_follow_up_date from lead_follow_up where lead_id = leads.id and leads.next_follow_up  = 'yes' and DATE(next_follow_up_date) >= '".$currentDate."' ORDER BY next_follow_up_date asc limit 1) as next_follow_up_date")
            )
            ->leftJoin('lead_status', 'lead_status.id', 'leads.status_id')
            ->leftJoin('lead_agents', 'lead_agents.id', 'leads.agent_id')
            ->leftJoin('users', 'users.id', 'leads.added_by')
            ->leftJoin('lead_sources', 'lead_sources.id', 'leads.source_id')
            ->leftJoin('currencies', 'currencies.id', 'leads.currency_id')


            ;

        if ($this->request()->sales_executive_id != '') {
            $lead = $lead->leftJoin('users', 'users.id', 'leads.added_by');



        }

        if ($this->request()->type != 'all' && $this->request()->type != '') {

            if ($this->request()->type == 'leads') {
                $lead = $lead->whereNull('client_id');
            }
            else {
                $lead = $lead->whereNotNull('client_id');
            }
        }

        if ($startDate !== null && $endDate !== null) {
            $lead->where(function ($query) use ($startDate, $endDate) {
                $query->whereBetween(DB::raw('DATE(leads.`created_at`)'), [$startDate, $endDate]);

                $query->orWhereBetween(DB::raw('DATE(leads.`updated_at`)'), [$startDate, $endDate]);
            });
        }



        if (($this->request()->agent != 'all' && $this->request()->agent != '') || $this->viewLeadPermission == 'added') {
            $lead = $lead->where(function ($query) {
                if ($this->request()->agent != 'all' && $this->request()->agent != '') {
                    $query->where('agent_id', $this->request()->agent);
                }

                if ($this->viewLeadPermission == 'added') {
                    $query->orWhere('leads.added_by', user()->id);
                }
            });
        }

        if ($this->viewLeadPermission == 'owned' && !is_null($this->myAgentId)) {
            $lead = $lead->where(function ($query) {
                $query->where('agent_id', $this->myAgentId->id);
            });
        }

        if ($this->viewLeadPermission == 'both') {
            $lead = $lead->where(function ($query) {
                if(!is_null($this->myAgentId)) {
                    $query->where('agent_id', $this->myAgentId->id);
                }

                $query->orWhere('leads.added_by', user()->id);
            });
        }

        if ($this->request()->category_id != 'all' && $this->request()->category_id != '') {
            $lead = $lead->where('category_id', $this->request()->category_id);
        }

        if ($this->request()->source_id != 'all' && $this->request()->source_id != '') {
            $lead = $lead->where('source_id', $this->request()->source_id);
        }

        if ($this->request()->searchText != '') {
            $lead = $lead->where(function ($query) {
                $query->where('leads.client_name', 'like', '%' . request('searchText') . '%')
                    ->orWhere('leads.company_name', 'like', '%' . request('searchText') . '%')

                    ->orWhere('leads.project_link', 'like', '%' . request('searchText') . '%')
                    ->orWhere('leads.actual_value', 'like', '%' . request('searchText') . '%')
                      ->orWhere('users.name', 'like', '%' . request('searchText') . '%')

                  ;
            });
        }


        return $lead->groupBy('leads.id');
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
        $lead = new Lead();
        // dd($lead);
        $customFieldsGroupsId = CustomFieldGroup::where('model', $lead->customFieldModel)->pluck('id')->first();
        $customFields = CustomField::where('custom_field_group_id', $customFieldsGroupsId)->where('export', 1)->get();
        $customFieldsDataMerge = [];

        $data = [

            'check' => [
                'title' => '<input type="checkbox" name="select_all_table" id="select-all-table" onclick="selectAllTable(this)">',
                'exportable' => false,
                'orderable' => false,
                'searchable' => false
            ],
            '#' => ['data' => 'DT_RowIndex', 'orderable' => false, 'searchable' => false, 'visible' => true],
            // __('app.id') => ['data' => 'id', 'name' => 'id', 'title' => __('app.id')],
            __('app.name') => ['data' => 'client_name', 'name' => 'client_name', 'title' => __('app.name')],

                __('app.project_link') => ['data' => 'project_link', 'name' => 'project_link', 'title' => __('Project Link')],



                __('app.bid_value') => ['data' => 'bid_value', 'name' => 'bid_value', 'title' => __('Project Budget')],
                  __('app.actual_value') => ['data' => 'actual_value', 'name' => 'actual_value', 'title' => __('Bid Value')],



            __('app.createdOn') => ['data' => 'created_at', 'name' => 'created_at', 'title' => __('app.createdOn')],

                __('app.added_by') => ['data' => 'added_by', 'name' => 'added_by', 'title' => __('Created By')],


            __('app.biding_time') => ['data' => 'bidding_time', 'name' => 'bidding_time', 'title' => __('Bidding Delay Time')],

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
