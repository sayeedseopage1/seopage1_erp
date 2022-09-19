<?php

namespace App\DataTables;

use App\DataTables\BaseDataTable;
use App\Models\Holiday;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\EloquentDataTable;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;

class HolidayDataTable extends BaseDataTable
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
            ->editColumn('holiday_date', function ($row) {
                return Carbon::parse($row->date)->format($this->global->date_format);
            })
            ->addColumn('occasion', function ($row) {
                return $row->occassion;
            })
            ->addColumn('day', function ($row) {
                return $row->date->format('l');
            })
            ->addColumn('action', function ($row) {

                $actions = '<div class="task_view">

                    <div class="dropdown">
                        <a class="task_view_more d-flex align-items-center justify-content-center dropdown-toggle" type="link" id="dropdownMenuLink-41" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="icon-options-vertical icons"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink-41" tabindex="0" x-placement="bottom-end" style="position: absolute; transform: translate3d(-137px, 26px, 0px); top: 0px; left: 0px; will-change: transform;">';

                    $actions .= '<a href="'.route('holidays.show', [$row->id]).'" class="dropdown-item openRightModal"><i class="fa fa-eye mr-2"></i>'.__('app.view').'</a>';

                if ($this->editPermission == 'all' || ($this->editPermission == 'added' && user()->id == $row->added_by)) {
                    $actions .= '<a class="dropdown-item openRightModal" href="'.route('holidays.edit', [$row->id]).'">
                                    <i class="fa fa-edit mr-2"></i>
                                    '.__('app.edit').'
                            </a>';
                }

                if ($this->deletePermission == 'all' || ($this->deletePermission == 'added' && user()->id == $row->added_by)) {
                    $actions .= '<a data-holiday-id=' . $row->id . '
                            class="dropdown-item delete-table-row" href="javascript:;">
                               <i class="fa fa-trash mr-2"></i>
                                '.__('app.delete').'
                        </a>';
                }

                $actions .= '</div> </div> </div>';

                return $actions;
            })
            ->smart(false)
            ->setRowId(function ($row) {
                return 'row-' . $row->id;
            })
            ->orderColumn('holiday_date', 'date $1')
            ->orderColumn('day', 'day_name $1')
            ->rawColumns(['check', 'action']);
    }

    /**
     * @param Holiday $model
     * @return \Illuminate\Database\Query\Builder
     */
    public function query(Holiday $model)
    {
        $holidays = $model->select('holidays.*', DB::raw('DAYNAME(date) as day_name'));

        if(!is_null(request()->year)) {
            $holidays->where(DB::raw('Year(holidays.date)'), request()->year);
        }

        if(!is_null(request()->month)) {
            $holidays->where(DB::raw('Month(holidays.date)'), request()->month);
        }

        if (request()->searchText != '') {
            $holidays->where('holidays.occassion', 'like', '%' . request()->searchText . '%');
        }

        if ($this->viewPermission == 'added') {
            $holidays->where('holidays.added_by', user()->id);
        }

        return $holidays;
    }

    /**
     * Optional method if you want to use html builder.
     *
     * @return \Yajra\DataTables\Html\Builder
     */
    public function html()
    {
        return $this->builder()
            ->setTableId('holiday-table')
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
                   window.LaravelDataTables["holiday-table"].buttons().container()
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
            __('modules.holiday.date') => ['data' => 'holiday_date', 'name' => 'date', 'title' => __('modules.holiday.date')],
            __('modules.holiday.occasion') => ['data' => 'occasion', 'name' => 'occasion', 'title' => __('modules.holiday.occasion')],
            __('modules.holiday.day') => ['data' => 'day', 'name' => 'day', 'title' => __('modules.holiday.day')],
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
