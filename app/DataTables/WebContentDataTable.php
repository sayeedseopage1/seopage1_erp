<?php

namespace App\DataTables;

use App\Models\Deal;
use App\Models\Project;
use App\Models\ProjectMilestone;
use App\Models\User;
use App\Models\WebContent;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;
use Yajra\DataTables\Services\DataTable;
use Yajra\DataTables\Html\Editor\Fields;
use Yajra\DataTables\Html\Editor\Editor;

class WebContentDataTable extends DataTable
{
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
            ->editColumn('project_name', function ($row) {
                $project_milestone = ProjectMilestone::where('id',$row->milestone_id)->first();
                $project = Project::where('id',$project_milestone->project_id)->first();
                return '<a class="text-darkest-grey" href="' . route('projects.show', $project->id) . '">' . $project->project_name . '</a>';
            })
            ->editColumn('milestone_name', function ($row) {
                $project_milestone = ProjectMilestone::where('id',$row->milestone_id)->first();
                return $project_milestone->milestone_title;
            })
            ->editColumn('client_name', function ($row) {
                $deal = Deal::where('id',$row->deal_id)->first();
                $client = User::where('id',$deal->client_id)->first();
                return '<div class="media align-items-center">
                <a href="' . route('clients.show', [$client->id]) . '">
                <img src="' . $client->image_url . '" class="mr-3 taskEmployeeImg rounded-circle" alt="' . ucfirst($client->name) . '" title="' . ucfirst($client->name) . '"></a>
                  <div class="media-body">
                 <h5 class="mb-0 f-13 text-darkest-grey"><a href="' . route('clients.show', [$client->id]) . '">' . ucfirst($client->name) . '</a></h5>

                  </div>
               </div>';
            })
            ->editColumn('pm_name', function ($row) {
                $deal = Deal::where('id',$row->deal_id)->first();
                $pm = User::where('id',$deal->pm_id)->first();
                return '<div class="media align-items-center">
                <a href="' . route('employees.show', [$pm->id]) . '">
                <img src="' . $pm->image_url . '" class="mr-3 taskEmployeeImg rounded-circle" alt="' . ucfirst($pm->name) . '" title="' . ucfirst($pm->name) . '"></a>
                  <div class="media-body">
                 <h5 class="mb-0 f-13 text-darkest-grey"><a href="' . route('employees.show', [$pm->id]) . '">' . ucfirst($pm->name) . '</a></h5>

                  </div>
               </div>';
            })
            ->editColumn('added_by', function ($row) {
                $deal = Deal::where('id',$row->deal_id)->first();
                $addedBy = User::where('id',$deal->added_by)->first();
                return '<div class="media align-items-center">
                <a href="' . route('employees.show', [$addedBy->id]) . '">
                <img src="' . $addedBy->image_url . '" class="mr-3 taskEmployeeImg rounded-circle" alt="' . ucfirst($addedBy->name) . '" title="' . ucfirst($addedBy->name) . '"></a>
                  <div class="media-body">
                 <h5 class="mb-0 f-13 text-darkest-grey"><a href="' . route('employees.show', [$addedBy->id]) . '">' . ucfirst($addedBy->name) . '</a></h5>

                  </div>
               </div>';
            })
            ->addIndexColumn()
            ->smart(false)
            ->setRowId(function ($row) {
                return 'row-' . $row->id;
            })
            ->rawColumns(['project_name','milestone_name','client_name','pm_name','added_by']);
    }

    /**
     * Get query source of dataTable.
     *
     * @param \App\Models\WebContent $model
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function query(WebContent $model)
    {
        $request = $this->request();
        $webContentIds = $request->webContentIds;

        return $model->newQuery()
            ->whereIn('id', call_user_func_array('array_merge', $webContentIds));
    }

    /**
     * Optional method if you want to use html builder.
     *
     * @return \Yajra\DataTables\Html\Builder
     */
    public function html()
    {
        return $this->builder()
            ->setTableId('web-content-table')
            ->columns($this->getColumns())
            ->minifiedAjax()

            // ->orderBy(1)
            ->destroy(true)
            ->responsive(true)
            ->serverSide(true)
            ->stateSave(true)
            ->processing(true)
          //->dom($this->domHtml)

            ->language(__('app.datatable'))
            ->parameters([
                'initComplete' => 'function () {
                   window.LaravelDataTables["web-content-table"].buttons().container()
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
            '#' => ['data' => 'DT_RowIndex', 'orderable' => false, 'searchable' => false, 'visible' => true],


             __('app.project_name') => ['data' => 'project_name', 'name' => 'project_name', 'exportable' => false, 'title' => __('Project Name')],
             __('app.milestone_name') => ['data' => 'milestone_name', 'name' => 'milestone_name', 'exportable' => false, 'title' => __('Milestone Name')],
             __('app.client_name') => ['data' => 'client_name', 'name' => 'client_name', 'exportable' => false, 'title' => __('Client Name')],
             __('app.pm_name') => ['data' => 'pm_name', 'name' => 'pm_name', 'exportable' => false, 'title' => __('PM Name')],
             __('app.added_by') => ['data' => 'added_by', 'name' => 'added_by', 'exportable' => false, 'title' => __('Added By')],
        ];
    }

    /**
     * Get filename for export.
     *
     * @return string
     */
    protected function filename()
    {
        return 'WebContent_' . date('YmdHis');
    }
}
