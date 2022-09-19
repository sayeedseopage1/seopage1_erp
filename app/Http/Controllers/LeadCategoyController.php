<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Http\Requests\Lead\StoreLeadCategory;
use App\Models\LeadCategory;
use Illuminate\Http\Request;

class LeadCategoyController extends AccountBaseController
{

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $viewPermission = user()->permission('add_lead_category');
        abort_403(!in_array($viewPermission, ['all', 'added']));

        $this->categories = LeadCategory::all();
        return view('lead-settings.create-category-modal', $this->data);
    }

    /**
     * @param StoreLeadCategory $request
     * @return array|void
     */
    public function store(StoreLeadCategory $request)
    {
        $viewPermission = user()->permission('add_lead_category');
        abort_403(!in_array($viewPermission, ['all', 'added']));

        $category = new LeadCategory();
        $category->category_name = $request->category_name;
        $category->save();

        $categoryData = LeadCategory::all();
        $list = '<option value="">--</option>';

        foreach ($categoryData as $item) {
            $list .= '<option selected
                value="' . $item->id . '"> ' . $item->category_name . ' </option>';
        }

        return Reply::successWithData(__('messages.categoryAdded'), ['data' => $list]);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $this->category = LeadCategory::findOrFail($id);
        $this->editPermission = user()->permission('edit_lead_category');
        abort_403(!($this->editPermission == 'all' || ($this->editPermission == 'added' && $this->category->added_by == user()->id)));

        return view('lead-settings.edit-category-modal', $this->data);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $category = LeadCategory::findOrFail($id);
        $this->editPermission = user()->permission('edit_lead_category');
        abort_403(!($this->editPermission == 'all' || ($this->editPermission == 'added' && $this->category->added_by == user()->id)));

        $category->category_name = $request->category_name;
        $category->save();

        $categoryData = LeadCategory::all();
        return Reply::successWithData(__('messages.categoryAdded'), ['data' => $categoryData]);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return array
     */
    public function destroy($id)
    {
        $category = LeadCategory::findOrFail($id);
        $this->deletePermission = user()->permission('delete_lead_category');

        abort_403(!($this->deletePermission == 'all' || ($this->deletePermission == 'added' && $category->added_by == user()->id)));

        LeadCategory::destroy($id);
        $categoryData = LeadCategory::all();
        return Reply::successWithData(__('messages.categoryDeleted'), ['data' => $categoryData]);

    }

}
