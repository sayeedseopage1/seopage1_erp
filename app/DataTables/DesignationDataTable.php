<?php

namespace App\DataTables;

use Carbon\Carbon;
use App\Models\Holiday;
use App\Models\Designation;
use App\DataTables\BaseDataTable;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\EloquentDataTable;

class DesignationDataTable extends BaseDataTable
{

    private $editDesignationPermission;
    private $deleteDesignationPermission;
    public $arr = [];

    public function __construct()
    {
        parent::__construct();
        $this->editDesignationPermission = user()->permission('edit_designation');
        $this->deleteDesignationPermission = user()->permission('delete_designation');
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
            ->addIndexColumn()
            ->addColumn('check', function ($row) {
                return '<input type="checkbox" class="select-table-row" id="datatable-row-' . $row->id . '"  name="datatable_ids[]" value="' . $row->id . '" onclick="dataTableRowCheck(' . $row->id . ')">';
            })
            ->editColumn('name', function ($row) {
                $name = '<h5 class="mb-0 f-13 text-darkest-grey"><a href="' . route('designations.show', [$row->id]) . '" class="openRightModal">' . ucfirst($row->name) . '</a></h5>';
                return $name;
            })
            ->editColumn('parent_id', function ($row) {
                // get name of parent designation
                $parent = Designation::where('id', $row->parent_id)->first();

                if ($parent)
                {
                    return $parent->name;
                }
                else
                {
                    return '-';
                }

            })
            ->addColumn('action', function ($row) {

                $action = '<div class="task_view">

                    <div class="dropdown">
                        <a class="task_view_more d-flex align-items-center justify-content-center dropdown-toggle" type="link"
                            id="dropdownMenuLink-' . $row->id . '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="icon-options-vertical icons"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink-' . $row->id . '" tabindex="0">';

                        $action .= '<a href="' . route('designations.show', [$row->id]) . '" class="dropdown-item openRightModal"><i class="fa fa-eye mr-2"></i>' . __('app.view') . '</a>';

                if ($this->editDesignationPermission == 'all')
                {
                        $action .= '<a class="dropdown-item openRightModal" href="' . route('designations.edit', [$row->id]) . '">
                                <i class="fa fa-edit mr-2"></i>
                                ' . trans('app.edit') . '
                            </a>';
                }


                if ($this->deleteDesignationPermission == 'all')
                {
                        $action .= '<a class="dropdown-item delete-table-row" href="javascript:;" data-designation-id="' . $row->id . '">
                                <i class="fa fa-trash mr-2"></i>
                                ' . trans('app.delete') . '
                            </a>';
                }

                $action .= '</div>
                    </div>
                </div>';

                return $action;
            })
            ->smart(false)
            ->setRowId(function ($row) {
                return 'row-' . $row->id;
            })
            ->rawColumns(['check','action', 'name']);
    }

    /**
     * @param Holiday $model
     * @return \Illuminate\Database\Query\Builder
     */
    public function query(Designation $model)
    {
        $request = $this->request();
        $model = $model->select('*');

        if (request()->searchText != '') {
            $model->where('name', 'like', '%' . request()->searchText . '%');
        }

        if ($request->startDate !== null && $request->startDate != 'null' && $request->startDate != '') {
            $startDate = Carbon::createFromFormat($this->global->date_format, $request->startDate)->toDateString();
            $model = $model->where(DB::raw('DATE(designations.`created_at`)'), '>=', $startDate);
        }

        if ($request->endDate !== null && $request->endDate != 'null' && $request->endDate != '') {
            $endDate = Carbon::createFromFormat($this->global->date_format, $request->endDate)->toDateString();
            $model = $model->where(DB::raw('DATE(designations.`created_at`)'), '<=', $endDate);
        }

        if($request->parentId != 'all' && $request->parentId != null) {
            $departments = Designation::with('childs')->where('id', $request->parentId)->get();

            foreach($departments as $department)
            {
                if ($department->childs)
                {
                    $this->child($department->childs);
                    array_push($this->arr, $department->id);
                }
            }

            $model->whereIn('id', $this->arr);
        }


        return $model;
    }

    public function child($child)
    {
        foreach($child as $item)
        {
            array_push($this->arr, $item->id);

            if ($item->childs)
            {
                $this->child($item->childs);
            }
        }
    }

    /**
     * Optional method if you want to use html builder.
     *
     * @return \Yajra\DataTables\Html\Builder
     */
    public function html()
    {
        return $this->builder()
            ->setTableId('Designation-table')
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
                   window.LaravelDataTables["Designation-table"].buttons().container()
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
            '#' => ['data' => 'DT_RowIndex', 'orderable' => false, 'searchable' => false, 'visible' => false ],
            __('app.name') => ['data' => 'name', 'name' => 'name', 'exportable' => true, 'title' => __('app.name')],
            __('app.menu.parent_id') => ['data' => 'parent_id', 'name' => 'parent_id', 'exportable' => true, 'title' => __('app.menu.parent_id').' '.strtolower(__('app.menu.designation'))],
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
        return 'Designation_' . date('YmdHis');
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
