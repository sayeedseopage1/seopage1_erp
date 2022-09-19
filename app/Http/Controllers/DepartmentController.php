<?php

namespace App\Http\Controllers;

use App\DataTables\DepartmentDataTable;
use App\Helper\Reply;
use App\Models\BaseModel;
use App\Models\Team;
use App\Http\Requests\Team\StoreDepartment;
use App\Http\Requests\Team\UpdateDepartment;
use App\Models\EmployeeDetails;
use Illuminate\Http\Request;

class DepartmentController extends AccountBaseController
{
    public $arr = [];

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = __('app.menu.department');

        $this->middleware(function ($request, $next) {
            abort_403(!in_array('employees', $this->user->modules));
            return $next($request);
        });
    }

    /**
    * @param DepartmentDataTable $dataTable
    * @return mixed|void
    */

    public function index(DepartmentDataTable $dataTable)
    {
        $viewPermission = user()->permission('view_department');
        abort_403(!in_array($viewPermission, ['all', 'added', 'owned', 'both']));

        $this->departments = Team::with('childs')->get();

        return $dataTable->render('departments.index', $this->data);
    }

    public function create()
    {
        $this->departments = Team::allDepartments();

        if (request()->ajax()) {
            $html = view('departments.ajax.create', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'departments.ajax.create';
        return view('departments.create', $this->data);
    }

    /**
     * @param StoreDepartment $request
     * @return array
     * @throws \Froiden\RestAPI\Exceptions\RelatedResourceNotFoundException
     */
    public function store(StoreDepartment $request)
    {

        $group = new Team();
        $group->team_name = $request->team_name;
        $group->parent_id = $request->parent_id;
        $group->save();

        $redirectUrl = urldecode($request->redirect_url);

        if ($redirectUrl == '') {
            $redirectUrl = route('departments.index');
        }

        return Reply::successWithData(__('messages.departmentAdded'), ['redirectUrl' => $redirectUrl]);
    }

    public function show($id)
    {
        $this->department = Team::findOrFail($id);
        $this->parent = Team::where('id', $this->department->parent_id)->first();

        if (request()->ajax())
        {
            $html = view('departments.ajax.show', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'departments.ajax.show';
        return view('departments.create', $this->data);
    }

    public function edit($id)
    {
        $this->department = Team::findOrFail($id);
        $this->departments = Team::all();


        if (request()->ajax())
        {
            $html = view('departments.ajax.edit', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'departments.ajax.edit';
        return view('departments.create', $this->data);
    }

    /**
     * @param UpdateDepartment $request
     * @param int $id
     * @return array
     * @throws \Froiden\RestAPI\Exceptions\RelatedResourceNotFoundException
     */
    public function update(UpdateDepartment $request, $id)
    {
        $editDepartment = user()->permission('edit_department');
        abort_403($editDepartment != 'all');

        $group = Team::find($id);
        $group->team_name = strip_tags($request->team_name);
        $group->parent_id = strip_tags($request->parent_id);
        $group->save();

        $teams = Team::allDepartments();
        $options = BaseModel::options($teams, null, 'team_name');
        $redirectUrl = route('departments.index');

        return Reply::successWithData(__('messages.updatedSuccessfully'), ['redirectUrl' => $redirectUrl]);
    }

    public function destroy($id)
    {
        $deletePermission = user()->permission('delete_department');
        abort_403($deletePermission != 'all');

        EmployeeDetails::where('department_id', $id)->update(['department_id' => null]);
        $department = Team::where('parent_id', $id)->get();
        $parent = Team::findOrFail($id);

        if(count($department) > 0)
        {
            foreach($department as $item)
            {
                $child = Team::findOrFail($item->id);
                $child->parent_id = $parent->parent_id;
                $child->save();
            }
        }

        Team::destroy($id);

        $redirectUrl = route('departments.index');
        return Reply::successWithData(__('messages.deleteSuccess'), ['redirectUrl' => $redirectUrl]);
    }

    public function applyQuickAction(Request $request)
    {
        switch ($request->action_type) {
        case 'delete':
            $this->deleteRecords($request);
                return Reply::success(__('messages.deleteSuccess'));
        default:
                return Reply::error(__('messages.selectAction'));
        }
    }

    protected function deleteRecords($request)
    {
        $deletePermission = user()->permission('delete_department');
        abort_403($deletePermission != 'all');
        $item = explode(',', $request->row_ids);

        foreach($item as $id)
        {
            EmployeeDetails::where('department_id', $id)->update(['department_id' => null]);
            $department = Team::where('parent_id', $id)->get();
            $parent = Team::find( $id);

            if(count($department) > 0)
            {
                foreach($department as $item)
                {
                    $child = Team::findOrFail($item->id);
                    $child->parent_id = $parent->parent_id;
                    $child->save();
                }
            }

            Team::where('id', $id)->delete();
        }

    }

    public function hierarchyData()
    {
        $viewPermission = user()->permission('view_department');
        abort_403($viewPermission != 'all');

        $this->editPermission = user()->permission('edit_department');
        $this->pageTitle = 'Department Hierarchy';
        $this->chartDepartments = Team::get(['id','team_name','parent_id']);
        $this->departments = Team::with('childs')->where('parent_id', null)->get();

        if(request()->ajax())
        {
            return Reply::dataOnly(['status' => 'success', 'departments' => $this->departments]);
        }

        return view('departments-hierarchy.index', $this->data);
    }

    public function changeParent()
    {
        $editPermission = user()->permission('edit_department');
        abort_403($editPermission != 'all');

        $childIds = request('values');
        $parentId = request('newParent') ? request('newParent') : request('parent_id');

        $department = Team::find($parentId);

        // Root node again
        if(request('newParent') && $department) {
            $department->parent_id = null;
            $department->save();
        }
        else if ($department) // update child Node
        {
            foreach ($childIds as $childId)
            {
                $child = Team::find($childId);

                if ($child) {
                    $child->parent_id = $parentId;
                    $child->save();
                }

            }
        }

        $this->chartDepartments = Team::get(['id','team_name','parent_id']);
        $this->departments = Team::with('childs')->where('parent_id', null)->get();
        $html = view('departments-hierarchy.chart_tree', $this->data)->render();
        $organizational = view('departments-hierarchy.chart_organization', $this->data)->render();

        return Reply::dataOnly(['status' => 'success', 'html' => $html,'organizational' => $organizational]);
    }

    // Search filter start

    public function searchDepartment(Request $request)
    {
        $text = $request->searchText;

        if($text != '' && strlen($text) > 2)
        {
            $searchParent = Team::with('childs')->where('team_name', 'like', '%' . $text . '%')->get();

            $id = [];

            foreach($searchParent as $item)
            {
                array_push($id, $item->parent_id);
            }

            $item = $searchParent->whereIn('id', $id)->pluck('id');
            $this->chartDepartments = $searchParent;

            if($text != '' && !is_null($item)){
                foreach($this->chartDepartments as $item){
                    $item['parent_id'] = null;
                }
            }

            $parent = array();

            foreach($this->chartDepartments as $department)
            {
                array_push($parent, $department->id);

                if ($department->childs)
                {
                    $this->child($department->childs);
                }
            }

            $this->children = Team::whereIn('id', $this->arr)->get(['id','team_name','parent_id']);
            $this->parents = Team::whereIn('id', $parent)->get(['id','team_name']);
            $this->chartDepartments = $this->parents->merge($this->children);
        }
        else {
            $this->chartDepartments = Team::get(['id','team_name','parent_id']);
        }

        $this->departments = ($text != '') ? Team::with('childs')->where('team_name', 'like', '%' . $text . '%')->get() : Team::with('childs')->where('parent_id', null)->get();
        $html = view('departments-hierarchy.chart_tree', $this->data)->render();
        $organizational = view('departments-hierarchy.chart_organization', $this->data)->render();

        return Reply::dataOnly(['status' => 'success', 'html' => $html, 'organizational' => $organizational]);
    }

    public function child($child)
    {
        foreach($child as $item)
        {
            array_push($this->arr, $item->id);

            if ($item->childs) {
                $this->child($item->childs);
            }
        }
    }

    // Search filter end
}
