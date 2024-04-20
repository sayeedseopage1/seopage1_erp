<?php

namespace App\DataTables;

use App\DataTables\BaseDataTable;
use Carbon\Carbon;
use App\Models\Project;
use App\Models\ProjectWebsiteType;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\EloquentDataTable;

class WebsiteTypeDataTable extends BaseDataTable
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
                $action = '<div class="task_view">
    
                    <div class="dropdown">
                        <a class="task_view_more d-flex align-items-center justify-content-center dropdown-toggle" type="link"
                            id="dropdownMenuLink-' . $row->id . '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="icon-options-vertical icons"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink-' . $row->id . '" tabindex="0">';
                        $action .= '<a data-project-website-type-id="' . $row->id . '" class="dropdown-item project-website-type-modal" href="javascript:;"><i class="fa fa-edit mr-2"></i>' . __('Edit') . '</a>';
                        

                $action .= '</div>
                    </div>
                </div>';
    
                return $action;
            })
            ->addColumn('website_type', function ($row) {
                return $row->website_type;
            })
            ->addIndexColumn()
            ->smart(false)
            ->setRowId(function ($row) {
                return 'row-' . $row->id;
            })
            ->rawColumns(['action' ,'website_type', 'check']);
    }
    /**
     * @param Project $model
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function query(ProjectWebsiteType $model)
    {
        $request = $this->request();
        $model = $model->newQuery()->orderBy('id', 'desc');


        if ($request->startDate !== null && $request->endDate !== null) {
            $startDate = Carbon::createFromFormat($this->global->date_format, $request->startDate)->toDateString();
            $endDate = Carbon::createFromFormat($this->global->date_format, $request->endDate)->toDateString();
            
            $model->where(function ($query) use ($startDate, $endDate) {
                $query->whereBetween(DB::raw('DATE(project_website_types.created_at)'), [$startDate, $endDate]);
                $query->orWhereBetween(DB::raw('DATE(project_website_types.updated_at)'), [$startDate, $endDate]);
            });
        }

        if ($request->searchText !== '') {
            $model->where(function ($query) use ($request) {
                $query->where('project_website_types.website_type', 'like', '%' . $request->searchText . '%');
            });
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
            ->setTableId('project-website-type-table')
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
                    window.LaravelDataTables["project-website-type-table"].buttons().container()
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
                'title' => '#',
                'data' => 'DT_RowIndex',
                'exportable' => false,
                'orderable' => false,
                'searchable' => false,
                'visible' => true 
            ],
            
            '#' => ['data' => 'DT_RowIndex', 'orderable' => false, 'searchable' => false, 'visible' => false],
            __('website_type') => ['data' => 'website_type', 'name' => 'website_type', 'title' => __('Name')],
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
