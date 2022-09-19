<?php

namespace App\Http\Controllers;

use App\DataTables\ExpensesDataTable;
use App\DataTables\RecurringExpensesDataTable;
use App\Helper\Files;
use App\Helper\Reply;
use App\Http\Requests\Expenses\StoreRecurringExpense;
use App\Models\Currency;
use App\Models\Expense;
use App\Models\ExpenseRecurring;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;

class RecurringExpenseController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.expensesRecurring';
        $this->middleware(function ($request, $next) {
            abort_403(!in_array('expenses', $this->user->modules));

            return $next($request);
        });
    }

    public function index(RecurringExpensesDataTable $dataTable)
    {
        $viewPermission = user()->permission('view_expenses');
        abort_403(!in_array($viewPermission, ['all', 'added', 'owned', 'both']));

        if (!request()->ajax()) {
            $this->employees = User::allEmployees();
            $this->projects = Project::allProjects();
            $this->categories = ExpenseCategoryController::getCategoryByCurrentRole();
        }

        return $dataTable->render('recurring-expenses.index', $this->data);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $this->addPermission = user()->permission('manage_recurring_expense');
        abort_403(!in_array($this->addPermission, ['all']));

        $this->currencies = Currency::all();
        $this->categories = ExpenseCategoryController::getCategoryByCurrentRole();
        $this->projects = Project::all();
        $this->pageTitle = __('modules.expensesRecurring.addExpense');
        $this->projectId = request('project_id') ? request('project_id') : null;

        if (!is_null($this->projectId)) {
            $employees = Project::with('membersMany')->where('id', $this->projectId)->first();;
            $this->employees = $employees->membersMany;

        } else {
            $this->employees = User::allEmployees();
        }

        if (request()->ajax()) {
            $html = view('recurring-expenses.ajax.create', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'recurring-expenses.ajax.create';
        return view('expenses.show', $this->data);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreRecurringExpense $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreRecurringExpense $request)
    {
        $expense = new ExpenseRecurring();
        $expense->item_name           = $request->item_name;
        $expense->price               = round($request->price, 2);
        $expense->currency_id         = $request->currency_id;
        $expense->category_id         = $request->category_id;
        $expense->user_id             = $request->user_id;
        $expense->status              = $request->status;
        $expense->rotation            = $request->rotation;
        $expense->billing_cycle       = $request->billing_cycle > 0 ? $request->billing_cycle : null;
        $expense->unlimited_recurring = $request->billing_cycle < 0 ? 1 : 0;
        $expense->description         = str_replace('<p><br></p>', '', trim($request->description));
        $expense->created_by          = $this->user->id;
        $expense->purchase_from = $request->purchase_from;

        if($request->rotation == 'weekly' || $request->rotation == 'bi-weekly'){
            $expense->day_of_week = $request->day_of_week;
        }
        elseif ($request->rotation == 'monthly' || $request->rotation == 'quarterly' || $request->rotation == 'half-yearly' || $request->rotation == 'annually'){
            $expense->day_of_month = $request->day_of_month;
        }

        if ($request->project_id > 0) {
            $expense->project_id = $request->project_id;
        }

        if ($request->hasFile('bill')) {
            $filename = Files::uploadLocalOrS3($request->bill, Expense::FILE_PATH);
            $expense->bill = $filename;
        }

        $expense->status = 'active';
        $expense->save();

        $redirectUrl = urldecode($request->redirect_url);

        if ($redirectUrl == '') {
            $redirectUrl = route('recurring-expenses.show', $expense->id);
        }

        return Reply::successWithData(__('messages.expenseSuccess'), ['redirectUrl' => $redirectUrl]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $this->expense = ExpenseRecurring::with('recurrings')->findOrFail($id);

        $this->daysOfWeek = [
            '1' => 'sunday',
            '2' => 'monday',
            '3' => 'tuesday',
            '4' => 'wednesday',
            '5' => 'thursday',
            '6' => 'friday',
            '7' => 'saturday'
        ];

        $tab = request('tab');

        switch ($tab) {
        case 'expenses':
                return $this->expenses($id);
        default:
            $this->view = 'recurring-expenses.ajax.show';
            break;
        }


        if (request()->ajax()) {
            $html = view($this->view, $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        ($tab == '') ? $this->activeTab = 'overview' : $this->activeTab = $tab;

        return view('recurring-expenses.show', $this->data);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $this->addPermission = user()->permission('manage_recurring_expense');
        abort_403(!in_array($this->addPermission, ['all']));

        $this->expense = ExpenseRecurring::findOrFail($id);

        $this->currencies = Currency::all();
        $this->categories = ExpenseCategoryController::getCategoryByCurrentRole();
        $this->projects = Project::all();
        $this->pageTitle = __('modules.expensesRecurring.addExpense');
        $this->projectId = request('project_id') ? request('project_id') : null;

        if (!is_null($this->projectId)) {
            $employees = Project::with('membersMany')->where('id', $this->projectId)->first();;
            $this->employees = $employees->membersMany;

        } else {
            $this->employees = User::allEmployees();
        }

        if (request()->ajax()) {
            $html = view('recurring-expenses.ajax.edit', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'recurring-expenses.ajax.edit';
        return view('expenses.show', $this->data);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  StoreRecurringExpense  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(StoreRecurringExpense $request, $id)
    {
        $expense = ExpenseRecurring::findOrFail($id);
        $expense->item_name           = $request->item_name;
        $expense->price               = round($request->price, 2);
        $expense->currency_id         = $request->currency_id;
        $expense->category_id         = $request->category_id;
        $expense->user_id             = $request->user_id;
        $expense->rotation            = $request->rotation;
        $expense->billing_cycle       = $request->billing_cycle > 0 ? $request->billing_cycle : null;
        $expense->unlimited_recurring = $request->billing_cycle < 0 ? 1 : 0;
        $expense->description         = str_replace('<p><br></p>', '', trim($request->description));
        $expense->purchase_from       = $request->purchase_from;

        if($request->rotation == 'weekly' || $request->rotation == 'bi-weekly'){
            $expense->day_of_week = $request->day_of_week;
        }
        elseif ($request->rotation == 'monthly' || $request->rotation == 'quarterly' || $request->rotation == 'half-yearly' || $request->rotation == 'annually'){
            $expense->day_of_month = $request->day_of_month;
        }

        if ($request->project_id > 0) {
            $expense->project_id = $request->project_id;
        }

        if ($request->hasFile('bill')) {
            $filename = Files::uploadLocalOrS3($request->bill, Expense::FILE_PATH);
            $expense->bill = $filename;
        }

        $expense->save();

        $redirectUrl = urldecode($request->redirect_url);

        if ($redirectUrl == '') {
            $redirectUrl = route('recurring-expenses.show', $expense->id);
        }

        return Reply::successWithData(__('messages.expenseSuccess'), ['redirectUrl' => $redirectUrl]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $this->expense = ExpenseRecurring::findOrFail($id);
        $this->deletePermission = user()->permission('delete_expenses');
        abort_403(!($this->deletePermission == 'all' || ($this->deletePermission == 'added' && $this->expense->added_by == user()->id)));

        ExpenseRecurring::destroy($id);
        return Reply::success(__('messages.expenseDeleted'));
    }

    public function expenses($recurringID)
    {
        $dataTable = new ExpensesDataTable();
        $viewPermission = user()->permission('view_expenses');
        abort_403(!in_array($viewPermission, ['all', 'added', 'owned', 'both']));

        $this->recurringID = $recurringID;
        $this->expense = ExpenseRecurring::findOrFail($recurringID);

        $tab = request('tab');
        ($tab == '') ? $this->activeTab = 'overview' : $this->activeTab = $tab;
        $this->view = 'recurring-expenses.ajax.expenses';

        return $dataTable->render('recurring-expenses.show', $this->data);
    }

    public function changeStatus(Request $request)
    {
        $expenseId = $request->expenseId;
        $status = $request->status;
        $expense = ExpenseRecurring::findOrFail($expenseId);
        $expense->status = $status;
        $expense->save();
        return Reply::success(__('messages.updateSuccess'));
    }

}
