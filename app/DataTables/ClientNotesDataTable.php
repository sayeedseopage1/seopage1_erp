<?php

namespace App\DataTables;

use App\DataTables\BaseDataTable;
use App\Models\ClientNote;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;

class ClientNotesDataTable extends BaseDataTable
{

    private $editClientNotePermission;
    private $deleteClientNotePermission;

    public function __construct()
    {
        parent::__construct();
        $this->editClientNotePermission = user()->permission('edit_client_note');
        $this->deleteClientNotePermission = user()->permission('delete_client_note');
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
            ->addColumn('action', function ($row) {

                $action = '<div class="task_view">';

                $action .= '<div class="dropdown">
                        <a class="task_view_more d-flex align-items-center justify-content-center dropdown-toggle" type="link"
                            id="dropdownMenuLink-' . $row->id . '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="icon-options-vertical icons"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink-' . $row->id . '" tabindex="0">';

                if(!in_array('admin', user_roles()) && $row->ask_password == 1) {
                    $action .= '<a href="javascript:;" class="dropdown-item ask-for-password" data-client-note-id="'.$row->id.'"><i class="fa fa-eye mr-2"></i>' . __('app.view') . '</a>';
                }
                else {
                    $action .= '<a href="' . route('client-notes.show', $row->id) . '" class="openRightModal dropdown-item"><i class="fa fa-eye mr-2"></i>' . __('app.view') . '</a>';
                }


                if ($this->editClientNotePermission == 'all' || ($this->editClientNotePermission == 'added' && user()->id == $row->added_by) || ($this->editClientNotePermission == 'both' && user()->id == $row->added_by)) {
                    $action .= '<a class="dropdown-item openRightModal" href="' . route('client-notes.edit', [$row->id]) . '">
                                <i class="fa fa-edit mr-2"></i>
                                ' . trans('app.edit') . '
                            </a>';
                }

                if ($this->deleteClientNotePermission == 'all' || ($this->deleteClientNotePermission == 'added' && user()->id == $row->added_by) || ($this->deleteClientNotePermission == 'both' && user()->id == $row->added_by)) {
                    $action .= '<a class="dropdown-item delete-table-row" href="javascript:;" data-user-id="' . $row->id . '">
                                <i class="fa fa-trash mr-2"></i>
                                ' . trans('app.delete') . '
                            </a>';
                }

                $action .= '</div>
                    </div>
                </div>';

                return $action;
            })
            ->editColumn('title', function ($row) {
                if(!in_array('admin', user_roles()) && $row->ask_password == 1) {
                    return '<a href="javascript:;" class="ask-for-password" data-client-note-id="'.$row->id.'" style="color:black;">' . mb_ucwords($row->title) . '</a>';
                }
                else {
                    return '<a href="' . route('client-notes.show', $row->id) . '" class="openRightModal " style="color:black;">' .mb_ucwords($row->title) . '</a>';
                }

            })
            ->editColumn('type', function ($row) {
                if($row->type == '0') {
                    return '<span class="badge badge-secondary"><i class="fa fa-globe"></i> ' . __('app.public') . '</span>';
                }
                else {
                    return '<span class="badge badge-primary"><i class="fa fa-lock"></i> ' . __('app.private') . '</span>';
                }
            })
            ->editColumn('id', function ($row) {
                return $row->id;
            })
            ->addIndexColumn()
            ->smart(false)
            ->setRowId(function ($row) {
                return 'row-' . $row->id;
            })
            ->rawColumns(['action', 'check', 'title', 'type']);
    }

    /**
     * @param ClientNote $model
     * @return ClientNote|\Illuminate\Database\Eloquent\Builder
     */
    public function query(ClientNote $model)
    {
        $request = $this->request();
        $notes = $model->where('client_id', $request->clientID);

        if (in_array('client', user_roles())) {
            $notes->where(function($query){
                return $query->where('type', 0)
                    ->orWhere('is_client_show', 1);
            });

        } elseif (!in_array('admin', user_roles())) {
            $notes->where(function($query){
                return $query->whereHas('members', function($query){
                    return $query->where('user_id', user()->id);
                })->where('type', 1);
            })->orWhere('type', 0);
        }

        if(!is_null($request->searchText)) {
            $notes->where('title', 'like', '%' . request('searchText') . '%');
        }

        return $notes;
    }

    /**
     * Optional method if you want to use html builder.
     *
     * @return \Yajra\DataTables\Html\Builder
     */
    public function html()
    {
        return $this->builder()
            ->setTableId('client-notes-table')
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
                   window.LaravelDataTables["client-notes-table"].buttons().container()
                    .appendTo("#table-actions")
                }',
                'fnDrawCallback' => 'function( oSettings ) {
                  //
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
            __('app.id') => ['data' => 'id', 'name' => 'id', 'visible' => false,  'title' => __('app.id')],
            __('modules.client.noteTitle') => ['data' => 'title', 'name' => 'title', 'title' => __('modules.client.noteTitle')],
            __('modules.client.noteType') => ['data' => 'type', 'name' => 'type', 'title' => __('modules.client.noteType')],
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
        return 'client_note_' . date('YmdHis');
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
