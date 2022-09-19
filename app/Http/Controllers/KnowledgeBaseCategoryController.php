<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Models\KnowledgeBaseCategory;
use App\Http\Requests\KnowledgeBase\KnowledgeBaseCategoryStore;
use App\Models\BaseModel;

class KnowledgeBaseCategoryController extends AccountBaseController
{

    public function create()
    {
        $this->categories = KnowledgeBaseCategory::all();
        return view('knowledge-base.create_category', $this->data);
    }

    public function store(KnowledgeBaseCategoryStore $request)
    {
        $category = new KnowledgeBaseCategory();
        $category->name = strip_tags($request->category_name);
        $category->save();
        $categoryData = KnowledgeBaseCategory::all();
        $options = BaseModel::options($categoryData, $category, 'name');

        return Reply::successWithData(__('messages.categoryAdded'), ['data' => $options]);
    }

    public function update(KnowledgeBaseCategoryStore $request, $id)
    {
        $category = KnowledgeBaseCategory::find($id);
        $category->name = strip_tags($request->category_name);
        $category->save();

        $categoryData = KnowledgeBaseCategory::all();

        return Reply::successWithData(__('messages.updatedSuccessfully'), ['data' => $categoryData]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $category = KnowledgeBaseCategory::findOrFail($id);
        $category->delete();
        $categoryData = KnowledgeBaseCategory::all();
        return Reply::successWithData(__('messages.categoryDeleted'), ['data' => $categoryData]);
    }

}
