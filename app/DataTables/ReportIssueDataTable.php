<?php

namespace App\DataTables;


use App\Models\ReportIssue;
use App\DataTables\BaseDataTable;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;

use Illuminate\Support\Str;
use App\Models\User;
class ReportIssueDataTable extends BaseDataTable
{



    public function __construct()
    {
        parent::__construct();

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
          

            ->addColumn('subject', function($row) {
                $title= '';
                $title .= '<a href="'. route('report_issues.show', [$row->id]) . '" class="text-darkest-grey show-table-row openRightModal">'.ucfirst($row->subject).'</a>';
                return $title;


            })
            ->addColumn('issue_type', function($row) {

                return ucfirst($row->issue_type);


            })
            ->addColumn('created_by', function($row) {

                $pm= User::where('id',$row->user_id)->first();
                return '<a href="/accounts/employees/'.$row->user_id.'" class="text-darkest-grey">'.ucfirst($pm->name).'</a>';



            })


            ->editColumn('created_at', function ($row) {
                return $row->created_at->format($this->global->date_format);
            })


            ->addColumn('status', function($row) {

              if ($row->status == 'pending') {
                  return '<badge class="badge badge-warning">'.$row->status.'</badge>';
              }
              elseif ($row->status == 'in progress') {
                return '<badge class="badge badge-primary">'.$row->status.'</badge>';
              }
              elseif ($row->status == 'fixed') {
                return '<badge class="badge badge-success">'.$row->status.'</badge>';
              }
              else {
                  return '<badge class="badge badge-danger">'.$row->status.'</badge>';
              }




            })



            ->addIndexColumn()
            ->smart(false)
            ->setRowId(function ($row) {
                return 'row-' . $row->id;
            })
            ->rawColumns(['check', 'subject','status','created_by']);
    }

    /**
     * @param DealStage $model
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function query(ReportIssue $model)
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

        $model = $model

            // ->join('users', 'users.id', '=', 'contracts.client_id')
            // ->join('client_details', 'users.id', '=', 'client_details.user_id')
            ->select('report_issues.*');

        if ($startDate !== null && $endDate !== null) {
            $model->where(function ($q) use ($startDate, $endDate) {
                $q->whereBetween(DB::raw('DATE(report_issues.`created_at`)'), [$startDate, $endDate]);

                $q->orWhereBetween(DB::raw('DATE(report_issues.`updated_at`)'), [$startDate, $endDate]);
            });
        }



        if ($request->searchText != '') {
            $model = $model->where(function ($query) {
                $query->where('report_issues.subject', 'like', '%' . request('searchText') . '%')
                    ;

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
            ->setTableId('report_issues-table')
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
                   window.LaravelDataTables["report_issues-table"].buttons().container()
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
            '#' => ['data' => 'DT_RowIndex', 'orderable' => false, 'searchable' => false, 'visible' => false],
            __('app.id') => ['data' => 'id', 'name' => 'id', 'title' => __('app.id')],


            __('app.subject') => ['data' => 'subject', 'name' => 'subject', 'exportable' => false, 'title' => __('Subject')],
              __('app.issue_type') => ['data' => 'issue_type', 'name' => 'issue_type', 'exportable' => false, 'title' => __('Issue Type')],



            __('app.created_by')  => ['data' => 'created_by', 'name' => 'created_by', 'title' => __('Created By')],
            // __('app.startDate') => ['data' => 'start_date', 'name' => 'start_date', 'title' => __('app.startDate')],

            __('app.created_at') => ['data' => 'created_at', 'name' => 'created_at', 'title' => __('Creation Date')],


                  __('app.status')  => ['data' => 'status', 'name' => 'status', 'title' => __('Status')],
            // __('app.signature') => ['data' => 'signature', 'name' => 'signature', 'visible' => false, 'title' => __('app.signature')],

        ];
    }

    /**
     * Get filename for export.
     *
     * @return string
     */
    protected function filename()
    {
        return 'report_issues_' . date('YmdHis');
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
