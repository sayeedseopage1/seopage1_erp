<?php

namespace App\DataTables;

use Carbon\Carbon;
use App\Models\Project;
use App\DataTables\BaseDataTable;
use App\Models\ContractTemplate;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;
use Illuminate\Support\Facades\DB;

class ContractTemplatesDataTable extends BaseDataTable
{

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
        $this->manageContractTemplate = user()->permission('manage_contract_template');
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
                $action = '<div class="task_view">
                <div class="dropdown">
                    <a class="task_view_more d-flex align-items-center justify-content-center dropdown-toggle" type="link"
                        id="dropdownMenuLink-' . $row->id . '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="icon-options-vertical icons"></i>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink-' . $row->id . '" tabindex="0">';

                $action .= ' <a href="' . route('contract-template.show', [$row->id]) . '" class="dropdown-item openRightModal"><i class="fa fa-eye mr-2"></i>' . __('app.view') . '</a>';

                if ($this->addContractPermission == 'all' || $this->addContractPermission == 'added') {
                    $action .= '<a class="dropdown-item openRightModal" href="' . route('contracts.create') . '?template='.$row->id.'">
                        <i class="fa fa-plus mr-2"></i>
                        ' . trans('app.create').' '.trans('app.menu.contract') . '
                    </a>';
                }

                if ($this->manageContractTemplate == 'all' || $this->manageContractTemplate == 'added' ) {
                    $action .= '<a class="dropdown-item openRightModal" href="' . route('contract-template.edit', [$row->id]) . '">
                            <i class="fa fa-edit mr-2"></i>
                            ' . trans('app.edit') . '
                        </a>';
                }

                if ($this->manageContractTemplate == 'all' || ($this->manageContractTemplate == 'added' && user()->id == $row->added_by)) {
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
            ->addColumn('contract_subject', function($row) {
                return ucfirst($row->subject);
            })
            ->editColumn('subject', function ($row) {
                $signed = '';

                if ($row->signature) {
                    $signed = '<span class="badge badge-secondary"><i class="fa fa-signature"></i> ' . __('app.signed') . '</span>';
                }

                return '<div class="media align-items-center">
                        <div class="media-body">
                    <h5 class="mb-0 f-13 text-darkest-grey"><a href="' . route('contract-template.show', [$row->id]) . '">' . ucfirst($row->subject) . '</a></h5>
                    <p class="mb-0">' . $signed . '</p>
                    </div>
                  </div>';
            })
            ->editColumn('amount', function ($row) {
                $currencySymbol = $row->currency->currency_symbol;

                return currency_formatter($row->amount, $currencySymbol);
            })
            ->addIndexColumn()
            ->smart(false)
            ->setRowId(function ($row) {
                return 'row-' . $row->id;
            })
            ->rawColumns(['action', 'check', 'subject']);
    }

    /**
     * @param ContractTemplate $model
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function query(ContractTemplate $model)
    {
        $model = $model->with('contractType', 'currency')
            ->select('contract_templates.*');

        if (request()->searchText != '') {
            $model->where(function ($query) {
                $query->where('contract_templates.subject', 'like', '%' . request('searchText') . '%');
            });
        }

        if ($this->manageContractTemplate == 'added') {
            $model->where(function ($query) {
                return $query->where('contract_templates.added_by', user()->id);
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
            ->setTableId('contract-template-table')
            ->columns($this->getColumns())
            ->minifiedAjax()
            ->orderBy(2)
            ->destroy(true)
            ->responsive(true)
            ->serverSide(true)
            ->processing(true)
            ->dom($this->domHtml)

            ->language(__('app.datatable'))
            ->parameters([
                'initComplete' => 'function () {
                    window.LaravelDataTables["contract-template-table"].buttons().container()
                     .appendTo( "#table-actions")
                 }',
                'fnDrawCallback' => 'function( oSettings ) {
                    $("body").tooltip({
                        selector: \'[data-toggle="tooltip"]\'
                    })
                }',
            ]);
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
            __('app.subject') => ['data' => 'subject', 'name' => 'subject', 'exportable' => false, 'title' => __('app.subject')],
            __('app.menu.contract').' '.__('app.subject') => ['data' => 'contract_subject', 'name' => 'subject', 'visible' => false, 'title' => __('app.menu.contract')],
            __('app.amount') => ['data' => 'amount', 'name' => 'amount', 'title' => __('app.amount')],
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
        return 'ContractTemplates_' . date('YmdHis');
    }

}
