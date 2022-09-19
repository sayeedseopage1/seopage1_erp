<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Http\Requests\Tasks\StoreTaskCategory;
use App\Models\BaseModel;
use App\Models\TaskCategory;

class TaskCategoryController extends AccountBaseController
{

    public function create()
    {
        $this->addPermission = user()->permission('add_task_category');
        abort_403(!in_array($this->addPermission, ['all', 'added']));

        $this->categories = TaskCategory::allCategories();
        return view('tasks.create_category', $this->data);
    }

    public function store(StoreTaskCategory $request)
    {
        $this->addPermission = user()->permission('add_task_category');
        abort_403(!in_array($this->addPermission, ['all', 'added']));

        $category = new TaskCategory();
        $category->category_name = $request->category_name;
        $category->save();

        $categories = TaskCategory::allCategories();
        $options = BaseModel::options($categories, $category, 'category_name');

        return Reply::successWithData(__('messages.categoryAdded'), ['data' => $options]);

    }

    public function update(StoreTaskCategory $request, $id)
    {
        $category = TaskCategory::find($id);
        $category->category_name = strip_tags($request->category_name);
        $category->save();

        $categories = TaskCategory::allCategories();
        $options = BaseModel::options($categories, null, 'category_name');

        return Reply::successWithData(__('messages.updatedSuccessfully'), ['data' => $options]);
    }

    public function destroy($id)
    {
        TaskCategory::destroy($id);
        $categories = TaskCategory::allCategories();
        $options = BaseModel::options($categories, null, 'category_name');

        return Reply::successWithData(__('messages.deleteSuccess'), ['data' => $options]);
    }

}
