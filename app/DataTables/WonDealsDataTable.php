<?php

namespace App\DataTables;

use App\Models\Deal;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;
use App\DataTables\BaseDataTable;
use Yajra\DataTables\Html\Editor\Fields;
use Yajra\DataTables\Html\Editor\Editor;
use \Carbon\Carbon;
use Auth;
use Str;
use DB;
use App\Models\Project;

class WonDealsDataTable extends BaseDataTable
{
    /**
     * Build DataTable class.
     *
     * @param mixed $query Results from query() method.
     * @return \Yajra\DataTables\DataTableAbstract
     */
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
    public function dataTable($query)
    {
        return datatables()
            ->eloquent($query)
            ->addColumn('check', function ($row) {
                return '<input type="checkbox" class="select-table-row" id="datatable-row-' . $row->id . '"  name="datatable_ids[]" value="' . $row->id . '" onclick="dataTableRowCheck(' . $row->id . ')">';
            })
            ->addColumn('short_code', function ($row) {
                return '<a target="__blank" href="'.route('contracts.show', $row->id).'">'.$row->deal_id.'</a>';
            })
            ->addColumn('project_name', function ($row) {
                $title = Str::limit($row->project_name, 30, ' ...');
                if ($row->status == 'Accepted') {
                    $project_id= Project::where('deal_id',$row->id)->first();
                    return '<a class="openRightModal" href="'.route('projects.show', $project_id->id).'" title="'.$row->project_name.'">'.$title.'</a>';
                } else {
                    return '<p title="'.$row->project_name.'">'.$title.'</p>';
                }
            })
            ->addColumn('amount', function ($row) {
                return $row->actual_amount.' '.$row->original_currency->currency_symbol;
            })
            ->addColumn('client_name', function ($row) {
                return '<a class="openRightModal" href="'.route('clients.show', $row->client_id).'"><img src="'.$row->client->image_url.'" class="mr-3 taskEmployeeImg rounded-circle" alt="'.$row->client->name.'" title="'.$row->client->name.'">'.$row->client_name.'</a>';
            })
            ->addColumn('project_manager', function ($row) {
                if (!is_null($row->pm_id)) {
                    return '<a class="openRightModal" href="'.route('employees.show', $row->pm_id).'"><img src="'.$row->pm->image_url.'" class="mr-3 taskEmployeeImg rounded-circle" alt="'.$row->pm->name.'" title="'.$row->pm->name.'">'.$row->pm->name.'</a>';
                } else {
                    return '---';
                }
            })
            ->addColumn('deal_creation_date', function ($row) {
                return $row->deal_creation_date;
            })->addColumn('client_contact_form', function ($row) {
                if($row->submission_status == 'Submitted') {
                    return '<span class="badge bg-success text-light">Submitted</span>';
                } elseif($row->submission_status == 'Awaiting for client Response') {
                    return '<span class="badge bg-warning">Awaiting for client Response</span>';
                } else {
                    return '<a class="text-center" href="/deals/details/'.$row->id.'"><i class="fa-solid fa-eye fa-2x"></i></a>';
                }
            })
            ->addColumn('added_by', function ($row) {
                if (!is_null($row->added_by)) {
                    return '<a class="openRightModal" href="'.route('employees.show', $row->added_by).'"><img src="'.$row->addedBy->image_url.'" class="mr-3 taskEmployeeImg rounded-circle" alt="'.$row->addedBy->name.'" title="'.$row->addedBy->name.'">'.$row->addedBy->name.'</a>';
                } else {
                    return '---';
                }
            })
            ->addColumn('status', function ($row) {
                if ($row->status == 'Accepted') {
                    return '<span class="badge badge-success">Accepted</span>';
                } elseif ($row->status == 'Denied') {
                    return '<span class="badge badge-danger">Denied</span>';
                } else {
                    return '<span class="badge badge-warning">'.$row->status.'</span>';
                }
            })
            ->addColumn('action', function ($row) {
                $action = '
                <div class="dropdown">
                    <button class="btn f-14 px-0 py-0 text-dark-grey" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="icon-options-vertical icons"></i>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right border-grey rounded b-shadow-4 p-0" aria-labelledby="dropdownMenuLink" tabindex="0">';

                        if($row->submission_status == "Awaiting for client Response"){
                            $action .= '<a class="dropdown-item" href="/account/deal-url/'.$row->id.'"><i class="fa-solid fa-file mr-2"></i>'.trans('Client Form').'</a>';
                        } else {
                            $action .= '<a class="dropdown-item" href="deal-url/'.$row->id.'"><i class="fa-solid fa-file mr-2"></i>'.trans('Client Form').'</a>';
                        }
                        
                        if(Auth::user()->role_id == 1 || Auth::user()->role_id== 7 || Auth::user()->role_id == 8) {
                            $action .= '<a class="dropdown-item" href="/deals/details/edit/'.$row->id.'"><i class="fa-solid fa-pen-to-square mr-2"></i>'.trans('Edit').'</a>';
                        }
                    $action .= '
                    </div>
                </div>';

                return $action;
            })
            ->addIndexColumn()
            ->smart(false)
            ->setRowId(function ($row) {
                return 'row-' . $row->id;
            })
            ->rawColumns(['check', 'short_code', 'project_name', 'amount', 'client_name', 'project_manager', 'deal_creation_date', 'client_contact_form', 'added_by', 'status', 'action'])
        ;
    }

    /**
     * Get query source of dataTable.
     *
     * @param \App\Models\WonDeal $model
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function query(Deal $model)
    {
        $request = $this->request();
        $startDate = null;
        $endDate = null;
        if (Auth::user()->role_id == 4) {
            $model = $model->where('pm_id',Auth::id());
        } elseif (Auth::user()->role_id == 7) {
            $model = $model->where('added_by',Auth::id());
        } else {
            $model = $model->orderBy('id','desc');
        }


        if ($request->startDate !== null && $request->startDate != 'null' && $request->startDate != '') {
            $startDate = Carbon::createFromFormat($this->global->date_format, $request->startDate)->toDateString();
        }

        if ($request->endDate !== null && $request->endDate != 'null' && $request->endDate != '') {
            $endDate = Carbon::createFromFormat($this->global->date_format, $request->endDate)->toDateString();
        }

        $model = $model->select('deals.*')->leftJoin('users', 'users.id', 'deals.added_by');

        if ($startDate !== null && $endDate !== null) {
            $model->where(function ($q) use ($startDate, $endDate) {
                $q->whereBetween(DB::raw('DATE(deals.`created_at`)'), [$startDate, $endDate]);

                $q->orWhereBetween(DB::raw('DATE(deals.`updated_at`)'), [$startDate, $endDate]);
            });
        }

        if ($this->request()->searchText != '') {
            $model = $model->where(function ($query) {
                $query->where('deals.project_name', 'like', '%' . request('searchText') . '%')
                    ->orWhere('deals.deal_id', 'like', '%' . request('searchText') . '%')
                    ->orWhere('users.name', 'like', '%' . request('searchText') . '%');
            });
        }
        if ($request->pm_id != 'all') {
            $model->where('pm_id', $request->pm_id);
        }
        if ($request->client_id != 'all') {
            $model->where('client_id', $request->client_id);
        }
        if ($request->closed_by != 'all') {
            $model->where('added_by', $request->closed_by);
        }

        $model->orderBy('id', 'desc');
        return $model;
    }

    /**
     * Optional method if you want to use html builder.
     *
     * @return \Yajra\DataTables\Html\Builder
     */
    public function html()
    {
        return $this->builder()->setTableId('Wondeals-table')
            ->columns($this->getColumns())
            ->minifiedAjax()
            ->orderBy(1)
            ->destroy(true)
            ->responsive(true)
            ->serverSide(true)
            ->stateSave(true)
            ->processing(true)
            ->dom('Bfrtip')

            ->language(__('app.datatable'))
            ->parameters([
                'initComplete' => 'function () {
                   window.LaravelDataTables["Wondeals-table"].buttons().container()
                    .appendTo( "#table-actions")
                }',
                'fnDrawCallback' => 'function( oSettings ) {
                  //
                }',
                'scrollX' => true
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
            'short_code' => [
                'data' => 'short_code',
                'name' => 'short_code',
                'title' => 'Short Code',
            ],
            'project_name' => [
                'data' => 'project_name',
                'name' => 'project_name',
                'title' => 'Project Name',
            ],
            'amount' => [
                'data' => 'amount',
                'name' => 'amount',
                'title' => 'Amount',
            ],
            'client_name' => [
                'data' => 'client_name',
                'name' => 'client_name',
                'title' => 'Client Name',
            ],
            'project_manager' => [
                'data' => 'project_manager',
                'name' => 'project_manager',
                'title' => 'Project Manager',
            ],
            'deal_creation_date' => [
                'data' => 'deal_creation_date',
                'name' => 'deal_creation_date',
                'title' => 'Closing Date',
            ],
            'client_contact_form' => [
                'data' => 'client_contact_form',
                'name' => 'client_contact_form',
                'title' => 'Client Contact Form',
                'class' => 'text-center'
            ],
            'added_by' => [
                'data' => 'added_by',
                'name' => 'added_by',
                'title' => 'Closed By',
            ],
            'status' => [
                'data' => 'status',
                'name' => 'status',
                'title' => 'Status',
            ],
            Column::computed('action')->exportable(false)->printable(false)->width(60)->addClass('text-center'),
        ];
    }

    /**
     * Get filename for export.
     *
     * @return string
     */
    protected function filename()
    {
        return 'WonDeals_' . date('YmdHis');
    }
}
