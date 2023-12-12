<?php

namespace App\DataTables;

use App\DataTables\BaseDataTable;
use App\Models\Currency;
use App\Models\Deal;
use App\Models\Project;
use App\Models\ProjectPmGoal;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\EloquentDataTable;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;

class ProjectStatusDataTable extends BaseDataTable
{

    private $editPermission;
    private $deletePermission;
    private $viewPermission;

    public function __construct()
    {
        parent::__construct();
        $this->viewPermission = user()->permission('view_holiday');
        $this->editPermission = user()->permission('edit_holiday');
        $this->deletePermission = user()->permission('delete_holiday');
    }

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
                return '<a href="' . route('projects.show', $row->projectId) . '">' . $row->project_name . '</a>';
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
                // return $row->project_budget;

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
            ->rawColumns(['check', 'project_name','clientName','pmName','project_budget','project_category','start_date']);
    }

    /**
     * @param Holiday $model
     * @return \Illuminate\Database\Query\Builder
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
            ->setTableId('project-status-table')
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
                   window.LaravelDataTables["project-status-table"].buttons().container()
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
        return [
            'check' => [
                'title' => '<input type="checkbox" name="select_all_table" id="select-all-table" onclick="selectAllTable(this)">',
                'exportable' => false,
                'orderable' => false,
                'searchable' => false
            ],
            '#' => ['data' => 'DT_RowIndex', 'orderable' => false, 'searchable' => false, 'visible' => false],
            __('project_name') => ['data' => 'project_name', 'name' => 'project_name', 'title' => __('Project Name')],
            __('clientName') => ['data' => 'clientName', 'name' => 'clientName', 'title' => __('Client')],
            __('pmName') => ['data' => 'pmName', 'name' => 'pmName', 'title' => __('Project Manager')],
            __('project_budget') => ['data' => 'project_budget', 'name' => 'project_budget', 'title' => __('Project Budget')],
            __('project_category') => ['data' => 'project_category', 'name' => 'project_category', 'title' => __('Project Category')],
            __('start_date') => ['data' => 'start_date', 'name' => 'start_date', 'title' => __('Start Date')],
            // Column::computed('action', __('app.action'))
            //     ->exportable(false)
            //     ->printable(false)
            //     ->orderable(false)
            //     ->searchable(false)
            //     ->addClass('text-right pr-20')
        ];
    }

    /**
     * Get filename for export.
     *
     * @return string
     */
    protected function filename()
    {
        return 'holiday_' . date('YmdHis');
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
