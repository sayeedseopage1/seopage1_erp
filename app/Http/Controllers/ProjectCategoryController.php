<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Http\Requests\ProjectTemplate\StoreProjectCategory;
use App\Models\BaseModel;
use App\Models\ProjectCategory;

class ProjectCategoryController extends AccountBaseController
{

    public function create()
    {
        $this->addPermission = user()->permission('manage_project_category');
        abort_403(!in_array($this->addPermission, ['all', 'added']));

        $this->categories = ProjectCategory::all();
        return view('projects.create_category', $this->data);

    }

    public function store(StoreProjectCategory $request)
    {
        $this->addPermission = user()->permission('manage_project_category');
        abort_403(!in_array($this->addPermission, ['all', 'added']));

        $category = new ProjectCategory();
        $category->category_name = $request->category_name;
        $category->save();

        $categories = ProjectCategory::all();

        $options = BaseModel::options($categories, $category, 'category_name');

        return Reply::successWithData(__('messages.categoryAdded'), ['data' => $options]);

    }

    public function update(StoreProjectCategory $request, $id)
    {
        $category = ProjectCategory::findOrFail($id);
        $category->category_name = strip_tags($request->category_name);
        $category->save();

        $categories = ProjectCategory::all();
        $options = BaseModel::options($categories, null, 'category_name');

        return Reply::successWithData(__('messages.updatedSuccessfully'), ['data' => $options]);
    }

    public function destroy($id)
    {
        ProjectCategory::destroy($id);
        $categories = ProjectCategory::all();
        $options = BaseModel::options($categories, null, 'category_name');

        return Reply::successWithData(__('messages.deleteSuccess'), ['data' => $options]);
    }

}
