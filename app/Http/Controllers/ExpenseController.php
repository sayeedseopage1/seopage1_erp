<?php

namespace App\Http\Controllers;

use App\DataTables\ExpensesDataTable;
use App\Helper\Files;
use App\Helper\Reply;
use App\Http\Requests\Expenses\StoreExpense;
use App\Models\Currency;
use App\Models\Expense;
use App\Models\ExpensesCategory;
use App\Models\ExpensesCategoryRole;
use App\Models\Project;
use App\Models\RoleUser;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ExpenseController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.expenses';
        $this->middleware(function ($request, $next) {
            abort_403(!in_array('expenses', $this->user->modules));
            return $next($request);
        });
    }

    public function index(ExpensesDataTable $dataTable)
    {
        $viewPermission = user()->permission('view_expenses');
        abort_403(!in_array($viewPermission, ['all', 'added', 'owned', 'both']));

        if (!request()->ajax()) {
            $this->employees = User::allEmployees(null, true);
            $this->projects = Project::allProjects();
            $this->categories = ExpenseCategoryController::getCategoryByCurrentRole();
        }

        return $dataTable->render('expenses.index', $this->data);

    }

    public function changeStatus(Request $request)
    {
        abort_403(user()->permission('approve_expenses') != 'all');

        $expenseId = $request->expenseId;
        $status = $request->status;
        $expense = Expense::findOrFail($expenseId);
        $expense->status = $status;
        $expense->save();
        return Reply::success(__('messages.updateSuccess'));
    }

    public function show($id)
    {
        $this->expense = Expense::with('user', 'project', 'category')->findOrFail($id)->withCustomFields();
        $this->viewPermission = user()->permission('view_expenses');
        $viewProjectPermission = user()->permission('view_project_expenses');

        abort_403(!($this->viewPermission == 'all'
        || ($this->viewPermission == 'added' && $this->expense->added_by == user()->id)
        || ($viewProjectPermission == 'owned' || $this->expense->user_id == user()->id)));

        if (!empty($this->expense->getCustomFieldGroupsWithFields())) {
            $this->fields = $this->expense->getCustomFieldGroupsWithFields()->fields;
        }

        $this->pageTitle = $this->expense->item_name;

        if (request()->ajax()) {
            $html = view('expenses.ajax.show', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'expenses.ajax.show';
        return view('expenses.show', $this->data);

    }

    public function create()
    {
        $this->addPermission = user()->permission('add_expenses');
        abort_403(!in_array($this->addPermission, ['all', 'added']));

        $this->currencies = Currency::all();
        $this->categories = ExpenseCategoryController::getCategoryByCurrentRole();

        // Get only current login employee projects
        if ($this->addPermission == 'added') {
            $this->projects = Project::where('added_by', user()->id)->orWhereHas('membersMany', function ($query) {
                $query->where('user_id', user()->id);
            })->get();

        } else {
            $this->projects = Project::all();
        }

        $this->pageTitle = __('modules.expenses.addExpense');
        $this->projectId = request('project_id') ? request('project_id') : null;

        if (!is_null($this->projectId)) {
            $employees = Project::with('membersMany')->where('id', $this->projectId)->first();
            $this->projectName = $employees->project_name;
            $this->employees = $employees->membersMany;

        } else {
            $this->employees = User::allEmployees(null, true);
        }

        $expense = new Expense();

        if (!empty($expense->getCustomFieldGroupsWithFields())) {
            $this->fields = $expense->getCustomFieldGroupsWithFields()->fields;
        }

        if (request()->ajax()) {
            $html = view('expenses.ajax.create', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'expenses.ajax.create';
        return view('expenses.show', $this->data);

    }

    public function store(StoreExpense $request)
    {
        $userRole = session('user_roles');
        $expense = new Expense();
        $expense->item_name = $request->item_name;
        $expense->purchase_date = Carbon::createFromFormat($this->global->date_format, $request->purchase_date)->format('Y-m-d');
        $expense->purchase_from = $request->purchase_from;
        $expense->price = round($request->price, 2);
        $expense->currency_id = $request->currency_id;
        $expense->category_id = $request->category_id;
        $expense->user_id = $request->user_id;

        if ($userRole[0] == 'admin') {
            $expense->status = 'approved';
            $expense->approver_id = user()->id;
        }

        if ($request->has('status')) {
            $expense->status = $request->status;
            $expense->approver_id = user()->id;
        }

        if ($request->has('project_id') && $request->project_id != '0') {
            $expense->project_id = $request->project_id;
        }

        if ($request->hasFile('bill')) {
            $filename = Files::uploadLocalOrS3($request->bill, Expense::FILE_PATH);
            $expense->bill = $filename;
        }

        $expense->save();

        // To add custom fields data
        if ($request->get('custom_fields_data')) {
            $expense->updateCustomFieldData($request->get('custom_fields_data'));
        }

        $redirectUrl = urldecode($request->redirect_url);

        if ($redirectUrl == '') {
            $redirectUrl = route('expenses.index');
        }

        return Reply::successWithData(__('messages.expenseSuccess'), ['redirectUrl' => $redirectUrl]);
    }

    public function edit($id)
    {
        $this->expense = Expense::findOrFail($id)->withCustomFields();
        $this->editPermission = user()->permission('edit_expenses');

        abort_403(!($this->editPermission == 'all' || ($this->editPermission == 'added' && $this->expense->added_by == user()->id)));

        $this->currencies = Currency::all();
        $this->categories = ExpenseCategoryController::getCategoryByCurrentRole();
        $this->employees = User::allEmployees();
        $this->projects = Project::all();
        $this->pageTitle = __('modules.expenses.updateExpense');

        $expense = new Expense();

        if (!empty($expense->getCustomFieldGroupsWithFields())) {
            $this->fields = $expense->getCustomFieldGroupsWithFields()->fields;
        }

        if (request()->ajax()) {
            $html = view('expenses.ajax.edit', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'expenses.ajax.edit';
        return view('expenses.show', $this->data);

    }

    public function update(StoreExpense $request, $id)
    {
        $expense = Expense::findOrFail($id);
        $expense->item_name = $request->item_name;
        $expense->purchase_date = Carbon::createFromFormat($this->global->date_format, $request->purchase_date)->format('Y-m-d');
        $expense->purchase_from = $request->purchase_from;
        $expense->price = round($request->price, 2);
        $expense->currency_id = $request->currency_id;
        $expense->user_id = $request->user_id;
        $expense->category_id = $request->category_id;

        $expense->project_id = ($request->project_id > 0) ? $request->project_id : null;


        if ($request->bill_delete == 'yes') {
            Files::deleteFile($expense->bill, Expense::FILE_PATH);
            $expense->bill = null;
        }

        if ($request->hasFile('bill')) {
            Files::deleteFile($expense->bill, Expense::FILE_PATH);

            $filename = Files::uploadLocalOrS3($request->bill, Expense::FILE_PATH);
            $expense->bill = $filename;
        }

        $expense->status = $request->status;
        $expense->save();

        // To add custom fields data
        if ($request->get('custom_fields_data')) {
            $expense->updateCustomFieldData($request->get('custom_fields_data'));
        }

        return Reply::redirect(route('expenses.index'), __('messages.expenseUpdateSuccess'));
    }

    public function destroy($id)
    {
        $this->expense = Expense::findOrFail($id);
        $this->deletePermission = user()->permission('delete_expenses');
        abort_403(!($this->deletePermission == 'all' || ($this->deletePermission == 'added' && $this->expense->added_by == user()->id)));

        Expense::destroy($id);
        return Reply::success(__('messages.expenseDeleted'));
    }

    /**
     * XXXXXXXXXXX
     *
     * @return \Illuminate\Http\Response
     */
    public function applyQuickAction(Request $request)
    {
        switch ($request->action_type) {
        case 'delete':
            $this->deleteRecords($request);
                return Reply::success(__('messages.deleteSuccess'));
        case 'change-status':
            $this->changeBulkStatus($request);
                return Reply::success(__('messages.statusUpdatedSuccessfully'));
        default:
                return Reply::error(__('messages.selectAction'));
        }
    }

    protected function deleteRecords($request)
    {
        abort_403(user()->permission('delete_employees') != 'all');

        Expense::withoutGlobalScope('active')->whereIn('id', explode(',', $request->row_ids))->delete();
    }

    protected function changeBulkStatus($request)
    {
        abort_403(user()->permission('edit_employees') != 'all');

        Expense::withoutGlobalScope('active')->whereIn('id', explode(',', $request->row_ids))->update(['status' => $request->status]);
    }

    protected function getEmployeeProjects(Request $request)
    {
        // Get employee category
        if (!is_null($request->userId)) {
            $categories = ExpensesCategory::with('roles')->whereHas('roles', function($q) use ($request) {
                $user = User::find($request->userId);
                $roleId = [];

                $roleId = (count($user->role) > 1) ? $user->role[1]->role_id : $user->role[0]->role_id;
                $q->where('role_id', $roleId);
            })->get();

        }
        else {
            $categories = ExpensesCategory::get();
        }

        if($categories) {
            foreach ($categories as $category) {
                $categories .= '<option value="' . $category->id . '">' . $category->category_name . '</option>';
            }
        }

        // Get employee project
        if (!is_null($request->userId)) {
            $projects = Project::with('members')->whereHas('members', function ($q) use ($request) {
                $q->where('user_id', $request->userId);
            })->get();
        }
        else if(user()->permission('add_expenses') == 'all' && is_null($request->userId))
        {
            $projects = [];
        }
        else {
            $projects = Project::get();
        }

        $data = null;

        if ($projects) {
            foreach ($projects as $project) {
                $data .= '<option value="' . $project->id . '">' . $project->project_name . '</option>';
            }
        }


        return Reply::dataOnly(['status' => 'success', 'data' => $data, 'category' => $categories]);
    }

    protected function getCategoryEmployee(Request $request)
    {
        $expenseCategory = ExpensesCategoryRole::where('expenses_category_id', $request->categoryId)->get();
        $roleId = [];

        foreach($expenseCategory as $category)
        {
            array_push($roleId, $category->role_id);
        }

        if (!is_null($request->categoryId) && (count($roleId ) <= 1) && ($roleId[0] == 2)) {
            $userId = DB::table('role_user')
                ->select('user_id', 'role_id', DB::raw('COUNT(*) as `count`'))
                ->groupBy('user_id')
                ->having('count', '>', 1)
                ->pluck('user_id');

            $employees = User::allEmployees()->whereNotIn('id', $userId);
        }
        elseif ((count($roleId ) <= 1) && ($roleId[0] == 4)) {
            $employees = User::with('role')->whereHas('role', function($q) use ($request) {
                $expenseCategory = ExpensesCategoryRole::where('expenses_category_id', $request->categoryId)->get();
                $roleId = [];

                foreach($expenseCategory as $category)
                {
                    array_push($roleId, $category->role_id);
                }

                $q->where('role_id', $roleId[0]);
            })->get();
        }
        else {
            $employees = User::allEmployees();
        }

        $data = null;

        if($employees) {
            foreach ($employees as $employee) {
                $data .= '<option value="' . $employee->id . '">' . $employee->name . '</option>';
            }
        }

        return Reply::dataOnly(['status' => 'success', 'employees' => $data]);
    }

}
