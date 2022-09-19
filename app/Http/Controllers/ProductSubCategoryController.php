<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Http\Requests\Product\StoreProductSubCategory;
use App\Models\ProductCategory;
use App\Models\ProductSubCategory;
use Illuminate\Http\Request;

class ProductSubCategoryController extends AccountBaseController
{

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $this->categoryID = $request->catID;
        $this->subcategories = ProductSubCategory::all();
        $this->categories = ProductCategory::all();
        return view('products.sub-category.create', $this->data);
    }

    /**
     * @param StoreProductSubCategory $request
     * @return array
     * @throws \Froiden\RestAPI\Exceptions\RelatedResourceNotFoundException
     */
    public function store(StoreProductSubCategory $request)
    {
        $category = new ProductSubCategory();
        $category->category_id = $request->category_id;
        $category->category_name = $request->category_name;
        $category->save();

        $categoryData = ProductCategory::get();
        return Reply::successWithData(__('messages.categoryAdded'), ['data' => $categoryData]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $category = ProductSubCategory::find($id);
        $category->category_id = $request->category_id ? $request->category_id : $category->category_id;
        $category->category_name = $request->category_name ? strip_tags($request->category_name) : $category->category_name;
        $category->save();

        $subCategoryOptions = $this->categoryDropdown($category->category_id);
        $categoryOptions = $this->subCategoryDropdown($category->id);

        return Reply::successWithData(__('messages.updatedSuccessfully'), ['sub_categories' => $subCategoryOptions, 'categories' => $categoryOptions]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        ProductSubCategory::destroy($id);
        return Reply::success(__('messages.categoryDeleted'));
    }

    public function categoryDropdown($selectId = null)
    {
        /* Category Dropdown */
        $categoryData = ProductCategory::get();
        $categoryOptions = '<option value="">--</option>';

        foreach ($categoryData as $item) {
            $selected = '';

            if (!is_null($selectId) && $item->id == $selectId) {
                $selected = 'selected';
            }

            $categoryOptions .= '<option ' . $selected . ' value="' . $item->id . '"> ' . $item->category_name . ' </option>';
        }

        return $categoryOptions;
    }

    public function subCategoryDropdown($selectId)
    {
        /* Sub-Category Dropdown */
        $subCategoryData = ProductSubCategory::get();
        $subCategoryOptions = '<option value="">--</option>';

        foreach ($subCategoryData as $item) {
            $selected = '';

            if ($item->id == $selectId) {
                $selected = 'selected';
            }

            $subCategoryOptions .= '<option ' . $selected . ' value="' . $item->id . '"> ' . $item->category_name . ' </option>';
        }

        return $subCategoryOptions;
    }

    public function getSubCategories($id)
    {
            $sub_categories = ProductSubCategory::where('category_id', $id)->get();
            return Reply::dataOnly(['status' => 'success', 'data' => $sub_categories]);
    }

}
