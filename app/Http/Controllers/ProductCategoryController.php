<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Http\Requests\Product\StoreProductCategory;
use App\Models\BaseModel;
use App\Models\ProductCategory;

class ProductCategoryController extends AccountBaseController
{

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $this->categories = ProductCategory::all();
        return view('products.category.create', $this->data);
    }

    /**
     * @param StoreProductCategory $request
     * @return array
     * @throws \Froiden\RestAPI\Exceptions\RelatedResourceNotFoundException
     */
    public function store(StoreProductCategory $request)
    {
        $category = new ProductCategory();
        $category->category_name = $request->category_name;
        $category->save();

        $categories = ProductCategory::get();
        $options = BaseModel::options($categories, $category, 'category_name');

        return Reply::successWithData(__('messages.categoryAdded'), ['data' => $options]);
    }

    /**
     * @param StoreProductCategory $request
     * @param int $id
     * @return array
     * @throws \Froiden\RestAPI\Exceptions\RelatedResourceNotFoundException
     */
    public function update(StoreProductCategory $request, $id)
    {
        $category = ProductCategory::find($id);
        $category->category_name = strip_tags($request->category_name);
        $category->save();

        $categories = ProductCategory::get();
        $options = BaseModel::options($categories, null, 'category_name');

        return Reply::successWithData(__('messages.updatedSuccessfully'), ['data' => $options]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        ProductCategory::destroy($id);
        $categoryData = ProductCategory::all();
        return Reply::successWithData(__('messages.categoryDeleted'), ['data' => $categoryData]);
    }

}
