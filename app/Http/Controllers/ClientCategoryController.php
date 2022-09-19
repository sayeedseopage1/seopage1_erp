<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helper\Reply;
use App\Http\Requests\Admin\Client\StoreClientCategory;
use App\Models\ClientCategory;

class ClientCategoryController extends AccountBaseController
{

    /**
     * Show the form for creating a new resource.
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function create()
    {
        $this->categories = ClientCategory::all();
        $this->deletePermission = user()->permission('manage_client_category');
        return view('clients.create_category', $this->data);
    }

    /**
     * Store a newly created resource in storage.
     * @param StoreClientCategory $request
     * @return array
     */
    public function store(StoreClientCategory $request)
    {
        $category = new ClientCategory();
        $category->category_name = strip_tags($request->category_name);
        $category->save();
        $categoryData = ClientCategory::all();
        return Reply::successWithData(__('messages.categoryAdded'), ['data' => $categoryData]);
    }

    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param int $id
     * @return array|void
     */
    public function update(Request $request, $id)
    {
        $this->editPermission = user()->permission('manage_client_category');
        abort_403 ($this->editPermission != 'all');

        $category = ClientCategory::find($id);
        $category->category_name = strip_tags($request->category_name);
        $category->save();

        $categoryData = ClientCategory::all();

        return Reply::successWithData(__('messages.updatedSuccessfully'), ['data' => $categoryData]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return mixed
     */
    public function destroy($id)
    {
        $this->deletePermission = user()->permission('manage_client_category');
        abort_403 ($this->deletePermission != 'all');

        $category = ClientCategory::findOrFail($id);
        $category->delete();
        $categoryData = ClientCategory::all();
        return Reply::successWithData(__('messages.categoryDeleted'), ['data' => $categoryData]);
    }

}
