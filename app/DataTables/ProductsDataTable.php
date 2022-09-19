<?php

namespace App\DataTables;

use App\Models\Product;
use App\Models\CustomField;
use App\Models\CustomFieldGroup;
use App\DataTables\BaseDataTable;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;
use Illuminate\Support\Facades\DB;

class ProductsDataTable extends BaseDataTable
{

    private $deleteProductPermission;
    private $editProductPermission;

    public function __construct()
    {
        parent::__construct();
        $this->editProductPermission = user()->permission('edit_product');
        $this->deleteProductPermission = user()->permission('delete_product');
    }

    /**
     * Build DataTable class.
     *
     * @param mixed $query Results from query() method.
     * @return \Yajra\DataTables\DataTableAbstract
     */
    public function dataTable($query)
    {
        $product = new Product();
        $customFieldsGroupsId = CustomFieldGroup::where('model', $product->customFieldModel)->pluck('id')->first();
        $customFields = CustomField::where('custom_field_group_id', $customFieldsGroupsId)->where('export', 1)->get();
        $datatables = datatables()->eloquent($query);

        $datatables->addColumn('check', function ($row) {
                return '<input type="checkbox" class="select-table-row" id="datatable-row-' . $row->id . '"  name="datatable_ids[]" value="' . $row->id . '" onclick="dataTableRowCheck(' . $row->id . ')">';
        });
            $datatables->addColumn('category', function($row) {
                return ($row->category) ? $row->category->category_name : '';
            });
            $datatables->addColumn('sub_category', function($row) {
                return ($row->subCategory) ? $row->subCategory->category_name : '';
            });
            $datatables->editColumn('description', function($row) {
                return strip_tags($row->description);
            });
            $datatables->addColumn('action', function ($row) {

                if (in_array('client', user_roles())) {
                    return $action = '<button type="button" class="btn-secondary rounded f-14 add-product" data-product-id="'.$row->id.'">
                        <i class="fa fa-plus mr-1"></i>
                    ' . __('app.addToCart') . '
                    </button>';
                }

                $action = '<div class="task_view">

                    <div class="dropdown">
                        <a class="task_view_more d-flex align-items-center justify-content-center dropdown-toggle" type="link"
                            id="dropdownMenuLink-' . $row->id . '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="icon-options-vertical icons"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink-' . $row->id . '" tabindex="0">';

                $action .= '<a href="' . route('products.show', [$row->id]) . '" class="dropdown-item openRightModal" data-product-id="' . $row->id . '"><i class="fa fa-eye mr-2"></i>' . __('app.view') . '</a>';

                if ($this->editProductPermission == 'all' || ($this->editProductPermission == 'added' && user()->id == $row->added_by)) {
                    $action .= '<a class="dropdown-item openRightModal" href="' . route('products.edit', [$row->id]) . '">
                                <i class="fa fa-edit mr-2"></i>
                                ' . trans('app.edit') . '
                            </a>';
                }

                if ($this->deleteProductPermission == 'all' || ($this->deleteProductPermission == 'added' && user()->id == $row->added_by)) {
                    $action .= '<a class="dropdown-item delete-table-row" href="javascript:;" data-product-id="' . $row->id . '">
                                <i class="fa fa-trash mr-2"></i>
                                ' . trans('app.delete') . '
                            </a>';
                }

                $action .= '</div>
                    </div>
                </div>';

                return $action;
            });
        $customFieldsId = $customFields->pluck('id');
        $fieldData = DB::table('custom_fields_data')->where('model', 'App\Models\Product')->whereIn('custom_field_id', $customFieldsId)->select('id', 'custom_field_id', 'model_id', 'value')->get();

        foreach ($customFields as $customField) {
            $datatables->addColumn($customField->name, function ($row) use($fieldData, $customField) {

                $finalData = $fieldData->filter(function ($value) use($customField, $row) {
                    return $value->custom_field_id == $customField->id && $value->model_id == $row->id;
                })->first();

                if($customField->type == 'select') {
                    $data = $customField->values;
                    $data = json_decode($data); // string to array

                    return $finalData ? (($finalData->value >= 0 && $finalData->value != null) ? $data[$finalData->value] : '--') : '--';
                }

                return $finalData ? $finalData->value : '--';
            });
        }

            $datatables->editColumn('name', function ($row) {

                return '<a href="' . route('products.show', [$row->id]) . '" class="openRightModal text-darkest-grey" >' . ucfirst($row->name) . '</a>';
            });
            $datatables->editColumn('default_image', function ($row) {
                return '<img src="'.$row->image_url.'" class="border rounded height-35" />';
            });
            $datatables->editColumn('allow_purchase', function ($row) {

                if ($row->allow_purchase == 1) {
                    $status = '<i class="fa fa-circle mr-1 text-dark-green f-10"></i>' . __('app.allowed') . '</label>';
                }
                else {
                    $status = '<i class="fa fa-circle mr-1 text-red f-10"></i>' . __('app.notAllowed') . '</label>';
                }

                return $status;
            });
            $datatables->editColumn('price', function ($row) {
                if (!is_null($row->taxes)) {
                    $totalTax = 0;

                    foreach (json_decode($row->taxes) as $tax) {
                        $prodTax = Product::taxbyid($tax)->first();
                        $totalTax = $totalTax + ($row->price * ($prodTax->rate_percent / 100));
                    }

                    return currency_formatter($row->price + $totalTax);
                }
                else {
                    return currency_formatter($row->price);
                }
            });
            $datatables->addIndexColumn();
            $datatables->smart(false);
            $datatables->setRowId(function ($row) {
                return 'row-' . $row->id;
            });
            $datatables->rawColumns(['action', 'price', 'allow_purchase', 'check', 'name', 'default_image']);

            return $datatables;
    }

    /**
     * @param Product $model
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function query(Product $model)
    {
        $request = $this->request();

        $model = $model->with('tax', 'category', 'subCategory')->select('id', 'name', 'price', 'taxes', 'allow_purchase', 'added_by', 'default_image', 'category_id', 'sub_category_id', 'description');

        if (!is_null($request->category_id) && $request->category_id != 'all' && $request->category_id > 0) {
            $model->where('category_id', $request->category_id);
        }

        if (!is_null($request->sub_category_id) && $request->sub_category_id != 'all' && $request->sub_category_id > 0) {
            $model->where('sub_category_id', $request->sub_category_id);
        }

        if ($request->searchText != '') {
            $model->where(function ($query) {
                $query->where('products.name', 'like', '%' . request('searchText') . '%')
                    ->orWhere('products.price', 'like', '%' . request('searchText') . '%');
            });
        }

        if (user()->permission('view_product') == 'added') {
            $model->where('products.added_by', user()->id);
        }

        if (in_array('client', user_roles())) {
            $model->where('products.allow_purchase', 1);
        }

        $model;

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
            ->setTableId('products-table')
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
                   window.LaravelDataTables["products-table"].buttons().container()
                    .appendTo( "#table-actions")
                }',
                'fnDrawCallback' => 'function( oSettings ) {
                    $("body").tooltip({
                        selector: \'[data-toggle="tooltip"]\'
                    })
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
        $product = new Product();
        $customFieldsGroupsId = CustomFieldGroup::where('model', $product->customFieldModel)->pluck('id')->first();
        $customFields = CustomField::where('custom_field_group_id', $customFieldsGroupsId)->where('export', 1)->get();
        $customFieldsDataMerge = [];

        $data = [
            'check' => [
                'title' => '<input type="checkbox" name="select_all_table" id="select-all-table" onclick="selectAllTable(this)">',
                'exportable' => false,
                'orderable' => false,
                'searchable' => false,
                'visible' => !in_array('client', user_roles())
            ],
            '#' => ['data' => 'DT_RowIndex', 'orderable' => false, 'searchable' => false, 'visible' => false],
            __('app.id') => ['data' => 'id', 'name' => 'id', 'title' => __('app.id')],
            __('modules.productImage') => ['data' => 'default_image', 'name' => 'default_image', 'title' => __('modules.productImage'), 'exportable' => false,],
            __('app.menu.products') => ['data' => 'name', 'name' => 'name', 'title' => __('app.menu.products')],
            __('modules.productCategory.productCategory') => ['data' => 'category', 'name' => 'category', 'title' => __('modules.productCategory.productCategory'), 'visible' => false],
            __('modules.productCategory.productSubCategory') => ['data' => 'sub_category', 'name' => 'sub_category', 'title' => __('modules.productCategory.productSubCategory'), 'visible' => false],
            __('app.description') => ['data' => 'description', 'name' => 'description', 'title' => __('app.description'), 'visible' => false],
            __('app.menu.products') => ['data' => 'name', 'name' => 'name', 'title' => __('app.menu.products')],
            __('app.price') . ' (' . __('app.inclusiveAllTaxes') . ')' => ['data' => 'price', 'name' => 'price', 'title' => __('app.price') . ' (' . __('app.inclusiveAllTaxes') . ')'],
            __('app.purchaseAllow') => ['data' => 'allow_purchase', 'name' => 'allow_purchase', 'visible' => !in_array('client', user_roles()), 'title' => __('app.purchaseAllow')],
            Column::computed('action', __('app.action'))
                ->exportable(false)
                ->printable(false)
                ->orderable(false)
                ->searchable(false)
                ->addClass('text-right pr-20')
        ];

        foreach ($customFields as $customField) {
            $customFieldsData = [$customField->name => ['data' => $customField->name, 'name' => $customField->name, 'title' => $customField->name, 'visible' => false]];
            $customFieldsDataMerge = array_merge($customFieldsDataMerge, $customFieldsData);
        }


        $datamerge = array_merge($data, $customFieldsDataMerge);
        return $datamerge;
    }

    /**
     * Get filename for export.
     *
     * @return string
     */
    protected function filename()
    {
        return 'Products_' . date('YmdHis');
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
