<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Helper\Reply;
use App\Http\Requests\Admin\Client\StoreClientSubcategory;
use App\Models\ClientCategory;
use App\Models\ClientSubCategory;

class ClientSubCategoryController extends AccountBaseController
{

    /**
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function create()
    {
        $this->subcategories = ClientSubCategory::all();
        $this->categories = ClientCategory::all();
        $this->deletePermission = user()->permission('manage_client_subcategory');
        return view('clients.create-subcategory', $this->data);
    }

    /**
     * @param StoreClientSubcategory $request
     * @return array
     */
    public function store(StoreClientSubcategory $request)
    {
        $category = new ClientSubCategory();
        $category->category_id = $request->category_id;
        $category->category_name = $request->category_name;
        $category->save();
        $categories = ClientCategory::all();
        return Reply::successWithData(__('messages.categoryAdded'), ['data' => $categories]);
    }

    /**
     * @param Request $request
     * @param int $id
     * @return array|void
     */
    public function update(Request $request, $id)
    {
        abort_403 (user()->permission('manage_client_subcategory') != 'all');

        $category = ClientSubCategory::find($id);

        $category->category_name = strip_tags($request->category_name);
        $category->save();

        $categoryData = ClientSubCategory::all();

        return Reply::successWithData(__('messages.updatedSuccessfully'), ['data' => $categoryData]);
    }

    /**
     * @param int $id
     * @return array|void
     */
    public function destroy($id)
    {
        abort_403 (user()->permission('manage_client_subcategory') != 'all');

        ClientSubCategory::findOrFail($id);

        ClientSubCategory::destroy($id);
        $categoryData = ClientSubCategory::all();
        return Reply::successWithData(__('messages.categoryDeleted'), ['data' => $categoryData]);
    }

    public function getSubCategories($id)
    {
        $sub_categories = ClientSubCategory::where('category_id', $id)->get();
        return Reply::dataOnly(['status' => 'success', 'data' => $sub_categories]);
    }

}
