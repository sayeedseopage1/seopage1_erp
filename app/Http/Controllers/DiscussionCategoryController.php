<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Http\Requests\DiscussionCategory\StoreRequest;
use App\Http\Requests\DiscussionCategory\UpdateRequest;
use App\Models\DiscussionCategory;

class DiscussionCategoryController extends AccountBaseController
{

    /**
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function create()
    {
        $this->addPermission = user()->permission('manage_discussion_category');
        abort_403(!in_array($this->addPermission, ['all']));

        $this->categories = DiscussionCategory::all();
        return view('discussions.create_category', $this->data);

    }

    public function store(StoreRequest $request)
    {
        $this->addPermission = user()->permission('manage_discussion_category');
        abort_403(!in_array($this->addPermission, ['all']));


        $category = new DiscussionCategory();
        $category->name = $request->category_name;
        $category->color = $request->color;
        $category->save();

        $categories = DiscussionCategory::all();
        $options = '<option value="">' . __('app.all') . '</option>';

        foreach ($categories as $item) {
            $options .= '<option data-content="<i class=\'fa fa-circle mr-2\' style=\'color: ' . $item->color . '\'></i> ' . $item->name . '" value="' . $item->id . '"> ' . $item->name . ' </option>';
        }

        return Reply::successWithData(__('messages.categoryAdded'), ['data' => $options]);

    }

    public function update(UpdateRequest $request, $id)
    {
        $category = DiscussionCategory::find($id);

        if ($request->has('name')) {
            $category->name = strip_tags($request->name);
        }

        if ($request->has('color')) {
            $category->color = strip_tags($request->color);
        }

        $category->save();

        $categories = DiscussionCategory::all();
        $options = '<option value="">' . __('app.all') . '</option>';

        foreach ($categories as $item) {
            $options .= '<option data-content="<i class=\'fa fa-circle mr-2\' style=\'color: ' . $item->color . '\'></i> ' . $item->name . '" value="' . $item->id . '"> ' . $item->name . ' </option>';
        }

        return Reply::successWithData(__('messages.updatedSuccessfully'), ['data' => $options]);
    }

    public function destroy($id)
    {
        $this->addPermission = user()->permission('manage_discussion_category');
        abort_403($this->addPermission !== 'all');

        DiscussionCategory::destroy($id);
        return Reply::success(__('messages.deleteSuccess'));

    }

}
