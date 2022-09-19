<?php

namespace App\DataTables;

use App\DataTables\BaseDataTable;
use App\Models\LeadStatus;
use App\Models\RemovalRequestLead;
use App\Models\User;
use Carbon\Carbon;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;

class LeadDataRemovalDataTable extends BaseDataTable
{

    /**
     * Build DataTable class.
     *
     * @param mixed $query Results from query() method.
     * @return \Yajra\DataTables\DataTableAbstract
     */
    public function dataTable($query)
    {
        $currentDate = Carbon::today()->format('Y-m-d');
        $status = LeadStatus::get();
        return datatables()
            ->eloquent($query)
            ->addIndexColumn()
            ->addColumn('action', function ($row) {
                $action = '<div class="task_view mr-1">
                        <a href="javascript:;" data-consent-id="'.$row->id.'" data-type="approved"
                            class="table-action task_view_more d-flex align-items-center justify-content-center">
                            <i class="fa fa-check icons mr-2"></i> '.__('app.approve').'
                        </a>
                    </div>';

                $action .= '<div class="task_view">
                        <a href="javascript:;" data-consent-id="'.$row->id.'" data-type="rejected"
                            class="table-action task_view_more d-flex align-items-center justify-content-center">
                            <i class="fa fa-times icons mr-2"></i> '.__('app.reject').'
                        </a>
                    </div>';

                return $action;
            })

            ->addColumn('status', function ($row) use ($status) {

                if ($row->status == 'pending') {
                    $status = '<label class="label label-info">' . __('app.pending') . '</label>';
                }
                else if ($row->status == 'approved') {
                    $status = '<label class="label label-success">' . __('app.approved') . '</label>';
                }
                else if ($row->status == 'rejected') {
                    $status = '<label class="label label-danger">' . __('app.rejected') . '</label>';
                }

                return $status;
            })
             ->editColumn(
                'created_at',
                function ($row) {
                    return Carbon::parse($row->created_at)->format($this->global->date_format);
                }
            )
            ->rawColumns(['status', 'action', 'status']);
    }

    /**
     * @param RemovalRequestLead $model
     * @return \Illuminate\Database\Query\Builder
     */
    public function query(RemovalRequestLead $model)
    {
        return $model->select('id', 'name', 'created_at', 'status', 'description');
    }

    /**
     * Optional method if you want to use html builder.
     *
     * @return \Yajra\DataTables\Html\Builder
     */
    public function html()
    {
        return $this->builder()
            ->setTableId('removal-request-lead')
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
                   window.LaravelDataTables["removal-request-lead"].buttons().container()
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
            __('app.id') => ['data' => 'id', 'name' => 'id', 'visible' => false, 'exportable' => false, 'title' => __('app.id')],
            '#' => ['data' => 'DT_RowIndex', 'orderable' => false, 'searchable' => false, 'visible' => false],
            __('app.name') => ['data' => 'name', 'name' => 'name', 'title' => __('app.name')],
            __('app.description') => ['data' => 'description', 'name' => 'description', 'title' => __('app.description')],
            __('app.createdOn') => ['data' => 'created_at', 'name' => 'created_at', 'title' => __('app.createdOn')],
            __('app.status') => ['data' => 'status', 'name' => 'status', 'exportable' => false, 'title' => __('app.status')],
            Column::computed('action', __('app.action'))
                ->exportable(false)
                ->printable(false)
                ->orderable(false)
                ->searchable(false)
                ->width(200)
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
