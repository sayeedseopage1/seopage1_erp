<?php

namespace App\Http\Controllers;

use App\Models\ProductFiles;
use App\Models\Tax;
use App\Helper\Files;
use App\Helper\Reply;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Models\ProductCategory;
use App\Models\ProductSubCategory;
use App\DataTables\ProductsDataTable;
use App\Http\Requests\Product\StoreProductRequest;
use App\Http\Requests\Product\UpdateProductRequest;

class ProductController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.products';
        $this->middleware(function ($request, $next) {
            in_array('client', user_roles()) ? abort_403(!(in_array('orders', $this->user->modules) && user()->permission('add_order') == 'all')) : abort_403(!in_array('products', $this->user->modules));
            return $next($request);
        });
    }

    /**
     * @param ProductsDataTable $dataTable
     * @return mixed|void
     */
    public function index(ProductsDataTable $dataTable)
    {
        $viewPermission = user()->permission('view_product');
        abort_403(!in_array($viewPermission, ['all', 'added']));

        $productDetails = [];

        if (request()->hasCookie('productDetails')) {
            $productDetails = json_decode(request()->cookie('productDetails'), true);
        }

        $this->productDetails = $productDetails;

        $this->totalProducts = Product::count();
        $this->categories = ProductCategory::all();
        $this->subCategories = ProductSubCategory::all();

        return $dataTable->render('products.index', $this->data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $this->addPermission = user()->permission('add_product');
        abort_403(!in_array($this->addPermission, ['all', 'added']));
        $this->taxes = Tax::all();
        $this->categories = ProductCategory::all();
        $this->subCategories = ProductSubCategory::all();
        $this->pageTitle = __('app.add') . ' ' . __('app.menu.products');

        $product = new Product();

        if (!empty($product->getCustomFieldGroupsWithFields())) {
            $this->fields = $product->getCustomFieldGroupsWithFields()->fields;
        }


        if (request()->ajax()) {
            $html = view('products.ajax.create', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'products.ajax.create';
        return view('products.create', $this->data);
    }

    /**
     *
     * @param StoreProductRequest $request
     * @return void
     */
    public function store(StoreProductRequest $request)
    {
        $this->addPermission = user()->permission('add_product');
        abort_403(!in_array($this->addPermission, ['all', 'added']));

        $product = new Product();
        $product->name = $request->name;
        $product->price = $request->price;
        $product->taxes = $request->tax ? json_encode($request->tax) : null;
        $product->description = str_replace('<p><br></p>', '', trim($request->description));
        $product->hsn_sac_code = $request->hsn_sac_code;
        $product->allow_purchase = ($request->purchase_allow == 'no') ? true : false;
        $product->downloadable = ($request->downloadable == 'true') ? true : false;
        $product->category_id = ($request->category_id) ? $request->category_id : null;
        $product->sub_category_id = ($request->sub_category_id) ? $request->sub_category_id : null;

        if(request()->hasFile('downloadable_file') && request()->downloadable == 'true') {
            Files::deleteFile($product->downloadable_file, ProductFiles::FILE_PATH);
            $product->downloadable_file = Files::uploadLocalOrS3(request()->downloadable_file, ProductFiles::FILE_PATH);
        }

        $product->save();

        // To add custom fields data
        if ($request->get('custom_fields_data')) {
            $product->updateCustomFieldData($request->get('custom_fields_data'));
        }


        $redirectUrl = urldecode($request->redirect_url);

        if ($redirectUrl == '') {
            $redirectUrl = route('products.index');
        }

        return Reply::successWithData(__('messages.productAdded'), ['redirectUrl' => $redirectUrl, 'productID' => $product->id, 'defaultImage' => $request->default_image ?? 0]);

    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $this->product = Product::with('category', 'subCategory')->findOrFail($id)->withCustomFields();
        $this->viewPermission = user()->permission('view_product');
        abort_403(!($this->viewPermission == 'all' || ($this->viewPermission == 'added' && $this->product->added_by == user()->id)));

        $this->taxes = Tax::withTrashed()->get();
        $this->pageTitle = $this->product->name;

        $this->taxValue = '';
        $taxes = [];

        foreach ($this->taxes as $tax) {
            if ($this->product && isset($this->product->taxes) && array_search($tax->id, json_decode($this->product->taxes)) !== false) {
                $taxes[] = $tax->tax_name . ' : ' . $tax->rate_percent . '%';
            }
        }

        $this->taxValue = implode(', ', $taxes);

        if (!empty($this->product->getCustomFieldGroupsWithFields())) {
            $this->fields = $this->product->getCustomFieldGroupsWithFields()->fields;
        }

        if (request()->ajax()) {
            $html = view('products.ajax.show', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'products.ajax.show';

        return view('products.create', $this->data);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $this->product = Product::findOrFail($id)->withCustomFields();

        $this->editPermission = user()->permission('edit_product');
        abort_403(!($this->editPermission == 'all' || ($this->editPermission == 'added' && $this->product->added_by == user()->id)));

        $this->taxes = Tax::all();
        $this->categories = ProductCategory::all();
        $this->subCategories = !is_null($this->product->sub_category_id) ? ProductSubCategory::where('category_id', $this->product->category_id)->get() : [];
        $this->pageTitle = __('app.update') . ' ' . __('app.menu.products');


        $images = [];

        if (isset($this->product) && isset($this->product->files)) {
            foreach ($this->product->files as $file)
            {
                $image['id'] = $file->id;
                $image['name'] = $file->filename;
                $image['hashname'] = $file->hashname;
                $image['size'] = $file->size;
                $images[] = $image;
            }
        }

        $this->images = json_encode($images);

        if (!empty($this->product->getCustomFieldGroupsWithFields())) {
            $this->fields = $this->product->getCustomFieldGroupsWithFields()->fields;
        }

        if (request()->ajax()) {
            $html = view('products.ajax.edit', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'products.ajax.edit';

        return view('products.create', $this->data);

    }

    /**
     * @param UpdateProductRequest $request
     * @param int $id
     * @return array|void
     * @throws \Froiden\RestAPI\Exceptions\RelatedResourceNotFoundException
     */
    public function update(UpdateProductRequest $request, $id)
    {
        $product = Product::findOrFail($id)->withCustomFields();
        $this->editPermission = user()->permission('edit_product');

        abort_403(!($this->editPermission == 'all' || ($this->editPermission == 'added' && $product->added_by == user()->id)));

        $product->name = $request->name;
        $product->price = $request->price;
        $product->taxes = $request->tax ? json_encode($request->tax) : null;
        $product->hsn_sac_code = $request->hsn_sac_code;
        $product->description = str_replace('<p><br></p>', '', trim($request->description));
        $product->allow_purchase = ($request->purchase_allow == 'no') ? true : false;
        $product->downloadable = ($request->downloadable == 'true') ? true : false;
        $product->category_id = ($request->category_id) ? $request->category_id : null;
        $product->sub_category_id = ($request->sub_category_id) ? $request->sub_category_id : null;

        if(request()->hasFile('downloadable_file') && request()->downloadable == 'true') {
            Files::deleteFile($product->downloadable_file, ProductFiles::FILE_PATH);
            $product->downloadable_file = Files::uploadLocalOrS3(request()->downloadable_file, ProductFiles::FILE_PATH);
        }
        elseif(request()->downloadable == 'true' && $product->downloadable_file == null){
            $product->downloadable = false;
        }

        // change default image
        if (!request()->hasFile('file')) {
            $product->default_image = request()->default_image;
        }

        $product->save();

        // To add custom fields data
        if ($request->get('custom_fields_data')) {
            $product->updateCustomFieldData($request->get('custom_fields_data'));
        }

        return Reply::successWithData(__('messages.productUpdated'), ['redirectUrl' => route('products.index'), 'defaultImage' => $request->default_image ?? 0]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $products = Product::find($id);
        $this->deletePermission = user()->permission('delete_product');
        abort_403(!($this->deletePermission == 'all' || ($this->deletePermission == 'added' && $products->added_by == user()->id)));

        Product::destroy($id);

        return Reply::successWithData(__('messages.productDeleted'), ['redirectUrl' => route('products.index')]);
    }

    /**
     * XXXXXXXXXXX
     *
     * @return array
     */
    public function applyQuickAction(Request $request)
    {
        switch ($request->action_type) {
        case 'delete':
            $this->deleteRecords($request);
            return Reply::success(__('messages.deleteSuccess'));
        case 'change-purchase':
            $this->allowPurchase($request);
            return Reply::success(__('messages.statusUpdatedSuccessfully'));
        default:
            return Reply::error(__('messages.selectAction'));
        }
    }

    protected function deleteRecords($request)
    {
        abort_403(user()->permission('delete_product') != 'all');

        Product::whereIn('id', explode(',', $request->row_ids))->forceDelete();
    }

    protected function allowPurchase($request)
    {
        abort_403(user()->permission('edit_product') != 'all');

        Product::whereIn('id', explode(',', $request->row_ids))->update(['allow_purchase' => $request->status]);
    }

    public function addCartItem(Request $request)
    {
        $newItem = $request->productID;
        $productDetails = [];

        if ($request->hasCookie('productDetails')) {
            $productDetails = json_decode($request->cookie('productDetails'), true);
        }

        if ($productDetails) {
            if (is_array($productDetails)) {
                $productDetails[] = $newItem;
            }
            else {
                array_push($productDetails, $newItem);
            }
        }
        else {
            $productDetails[] = $newItem;
        }

        return response(Reply::successWithData(__('messages.productAdded'), ['status' => 'success', 'productItems' => $productDetails]))->cookie('productDetails', json_encode($productDetails));
    }

    public function removeCartItem(Request $request, $id)
    {
        $productDetails = [];

        if ($request->hasCookie('productDetails')) {
            $productDetails = json_decode($request->cookie('productDetails'), true);

            foreach (array_keys($productDetails, $id) as $key) {
                unset($productDetails[$key]);
            }
        }

        return response(Reply::successWithData(__('messages.deleteSuccess'), ['status' => 'success', 'productItems' => $productDetails]))->cookie('productDetails', json_encode($productDetails));
    }

    public function cart(Request $request)
    {
        abort_403(!in_array('client', user_roles()));

        $this->lastOrder = Order::lastOrderNumber() + 1;
        $this->invoiceSetting = invoice_setting();
        $this->taxes = Tax::all();
        $this->products = [];

        if ($request->hasCookie('productDetails')) {
            $productDetails = json_decode($request->cookie('productDetails'), true);

            $this->quantityArray = array_count_values($productDetails);
            $this->prodc = $productDetails;
            $this->productKeys = array_unique($this->prodc);
            $this->products = Product::where('allow_purchase', 1)->whereIn('id', $this->productKeys)->get();
        }

        if (request()->ajax()) {
            $html = view('products.ajax.cart', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'products.ajax.cart';

        return view('products.create', $this->data);
    }

}
