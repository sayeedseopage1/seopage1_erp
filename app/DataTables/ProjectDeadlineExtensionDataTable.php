<?php

namespace App\DataTables;

use App\DataTables\BaseDataTable;
use Carbon\Carbon;
use App\Models\Project;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;
use Illuminate\Support\Facades\DB;
use App\Models\Currency;
use App\Models\Deal;
use App\Models\ProjectPmGoal;
use Yajra\DataTables\EloquentDataTable;
use Auth;

class ProjectDeadlineExtensionDataTable extends BaseDataTable
{
    /**
     * Build DataTable class.
     *
     * @param mixed $query Results from query() method.
     * @return \Yajra\DataTables\DataTableAbstract
     */
    public function dataTable($query)
    {
        return (new EloquentDataTable($query))
            ->addIndexColumn()
            ->addColumn('check', function ($row) {
                return '<input type="checkbox" class="select-table-row" id="datatable-row-' . $row->id . '"  name="datatable_ids[]" value="' . $row->id . '" onclick="dataTableRowCheck(' . $row->id . ')">';
            })
            ->editColumn('action', function ($row) {

                if(Auth::user()->role_id == 4){

                $actions = '<div class="task_view">

                    <div class="dropdown">
                        <a class="task_view_more d-flex align-items-center justify-content-center dropdown-toggle" type="link" id="dropdownMenuLink-41" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="icon-options-vertical icons"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink-41" tabindex="0" x-placement="bottom-end" style="position: absolute; transform: translate3d(-137px, 26px, 0px); top: 0px; left: 0px; will-change: transform;">';

                        $actions .= '<a href="javascript:;" class="dropdown-item extendRequest" data-id="'.$row->projectId.'"><i class="fa fa-eye mr-2"></i>'.__('Extend Request').'</a>';
                $actions .= '</div> </div> </div>';
                return $actions;
                }
                if(Auth::user()->role_id == 1 || Auth::use()->role_id == 8){
                    if($row->extended_request_status == 1){

                        $actions = '<div class="task_view">
        
                            <div class="dropdown">
                                <a class="task_view_more d-flex align-items-center justify-content-center dropdown-toggle" type="link" id="dropdownMenuLink-41" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="icon-options-vertical icons"></i>
                                </a>
                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink-41" tabindex="0" x-placement="bottom-end" style="position: absolute; transform: translate3d(-137px, 26px, 0px); top: 0px; left: 0px; will-change: transform;">';
        
                                $actions .= '<a href="javascript:;" class="dropdown-item reviewExtendRequest" data-id="'.$row->projectId.'"><i class="fa fa-eye mr-2"></i>'.__('Review Extend Request').'</a>';
                        $actions .= '</div> </div> </div>';
                        return $actions;
                    }
                }
            })
            ->editColumn('clientName', function ($row) {
                return '<div class="media align-items-center">
                        <a href="' . route('clients.show', [$row->clientId]) . '">
                        <img src="' . $row->clientImage . '" class="mr-3 taskEmployeeImg rounded-circle" alt="' . ucfirst($row->clientName) . '" title="' . ucfirst($row->clientName) . '"></a>
                        <div class="media-body">
                        <h5 class="mb-0 f-13 text-darkest-grey"><a href="' . route('clients.show', [$row->clientId]) . '">' . ucfirst($row->clientName) . '</a></h5>
                        </div>
                    </div>';
            })
            ->editColumn('project_name', function ($row) {
                return '<a class="project-status-inner-view" data-id="'.$row->projectId.'" href="javascript:;">' . $row->project_name . '</a>';
            })
            ->editColumn('pmName', function ($row) {
                return '<div class="media align-items-center">
                        <a href="' . route('employees.show', [$row->pmId]) . '">
                        <img src="' . $row->pmImage . '" class="mr-3 taskEmployeeImg rounded-circle" alt="' . ucfirst($row->pmName) . '" title="' . ucfirst($row->pmName) . '"></a>
                        <div class="media-body">
                        <h5 class="mb-0 f-13 text-darkest-grey"><a href="' . route('employees.show', [$row->pmId]) . '">' . ucfirst($row->pmName) . '</a></h5>
                        </div>
                    </div>';
            })
            ->editColumn('project_budget', function ($row) {
                $project = Project::where('id', $row->projectId)->first();
                $deal = Deal::where('id', $project->deal_id)->first();
                $currency = Currency::where('id', $deal->original_currency_id)->first();

                $project_value = $project->project_budget . $currency->currency_symbol ;

                return $project_value;

            })
            ->editColumn('project_category', function ($row) {
                return $row->project_category;
            })
            ->editColumn('start_date', function ($row) {
                return $row->goal_start_date;
            })
            
            ->addIndexColumn()
            ->smart(false)
            ->setRowId(function ($row) {
                return 'row-' . $row->id;
            })
            ->rawColumns(['check','action' ,'clientName','project_name','pmName','project_budget','project_category','start_date']);
    }
    /**
     * @param Project $model
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function query(ProjectPmGoal $model)
    {
        $model = $model
            ->select('project_pm_goals.*','projects.id as projectId','projects.project_name','projects.project_budget', 'client.id as clientId','client.name as clientName','client.image as clientImage','pm.id as pmId','pm.name as pmName','pm.image as pmImage')
            ->leftJoin('projects', 'project_pm_goals.project_id', '=', 'projects.id')
            ->leftJoin('users as client', 'projects.client_id', '=', 'client.id')
            ->leftJoin('users as pm', 'projects.pm_id', '=', 'pm.id')
            ->groupBy('projects.id');

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
            ->setTableId('project-deadline-extension-table')
            ->columns($this->getColumns())
            ->minifiedAjax()
            // ->orderBy(1)
            ->destroy(true)
            ->responsive(true)
            ->serverSide(true)
            ->processing(true)
            ->dom($this->domHtml)

            ->language(__('app.datatable'))
            ->parameters([
                'initComplete' => 'function () {
                    window.LaravelDataTables["project-deadline-extension-table"].buttons().container()
                     .appendTo( "#table-actions")
                 }',
                'fnDrawCallback' => 'function( oSettings ) {
                    $("body").tooltip({
                        selector: \'[data-toggle="tooltip"]\'
                    })
                }',
                'scrollX' => true
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
                'searchable' => false
            ],
            '#' => ['data' => 'DT_RowIndex', 'orderable' => false, 'searchable' => false, 'visible' => false],
            __('clientName') => ['data' => 'clientName', 'name' => 'clientName', 'title' => __('Client')],
            __('project_name') => ['data' => 'project_name', 'name' => 'project_name', 'title' => __('Project Name')],
            __('project_budget') => ['data' => 'project_budget', 'name' => 'project_budget', 'title' => __('Project Budget')],
            __('project_category') => ['data' => 'project_category', 'name' => 'project_category', 'title' => __('Project Category')],
            __('start_date') => ['data' => 'start_date', 'name' => 'start_date', 'title' => __('Start Date')],
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
        return 'Projects_' . date('YmdHis');
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
