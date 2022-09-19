<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\DataTables\ExpenseReportDataTable;
use App\Helper\Reply;
use App\Models\Currency;
use App\Models\Expense;
use App\Models\ExpensesCategory;
use App\Models\Project;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class ExpenseReportController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.expenseReport';
        $this->categoryTitle = 'modules.expenseCategory.expenseCategoryReport';
    }

    public function index(ExpenseReportDataTable $dataTable)
    {
           abort_403(user()->permission('view_expense_report') != 'all');
        $this->fromDate = now($this->global->timezone)->startOfMonth();
        $this->toDate = now($this->global->timezone);
        $this->currencies = Currency::all();
        $this->currentCurrencyId = $this->global->currency_id;

        $this->projects = Project::allProjects();
        $this->employees = User::withRole('employee')->join('employee_details', 'employee_details.user_id', '=', 'users.id')->get();
        $this->categories = ExpensesCategory::get();


        return $dataTable->render('reports.expense.index', $this->data);
    }

    public function expenseChartData(Request $request)
    {
        $startDate = ($request->startDate == null) ? null : now($this->global->timezone)->startOfMonth()->toDateString();
        $endDate = ($request->endDate == null) ? null : now($this->global->timezone)->toDateString();

        // Expense report start
        $expenses = Expense::join('currencies', 'currencies.id', '=', 'expenses.currency_id')
            ->leftJoin('expenses_category', 'expenses_category.id', '=', 'expenses.category_id')
            ->leftJoin('projects', 'projects.id', '=', 'expenses.project_id')
            ->leftJoin('project_members', 'project_members.id', '=', 'expenses.user_id')
            ->where('expenses.status', 'approved');

        if ($request->startDate !== null && $request->startDate != 'null' && $request->startDate != '') {
            $startDate = Carbon::createFromFormat($this->global->date_format, $request->startDate)->toDateString();
            $expenses = $expenses->where(DB::raw('DATE(expenses.`purchase_date`)'), '>=', $startDate);
        }

        if ($request->endDate !== null && $request->endDate != 'null' && $request->endDate != '') {
            $endDate = Carbon::createFromFormat($this->global->date_format, $request->endDate)->toDateString();
            $expenses = $expenses->where(DB::raw('DATE(expenses.`purchase_date`)'), '<=', $endDate);
        }

        if ($request->categoryID != 'all' && !is_null($request->categoryID)) {
            $expenses = $expenses->where('expenses.category_id', '=', $request->categoryID);
        }

        if ($request->projectID != 'all' && !is_null($request->projectID)) {
            $expenses = $expenses->where('expenses.project_id', '=', $request->projectID);
        }

        if ($request->employeeID != 'all' && !is_null($request->employeeID)) {
            $employeeID = $request->employeeID;
            $expenses = $expenses->where(function ($query) use ($employeeID) {
                $query->where('expenses.user_id', $employeeID);
            });
        }

        $expenses = $expenses->orderBy('purchase_date', 'ASC')
            ->get([
                DB::raw('DATE_FORMAT(purchase_date,"%d-%M-%y") as date'),
                DB::raw('YEAR(purchase_date) year, MONTH(purchase_date) month'),
                DB::raw('price as total'),
                'expenses.user_id',
                'expenses.project_id',
                'currencies.id as currency_id',
                'currencies.exchange_rate',
                'expenses_category.id as category_id',
                'expenses_category.category_name'
            ]);


        $prices = array();

        foreach ($expenses as $expense) {
            if (!isset($prices[$expense->date])) {
                $prices[$expense->date] = 0;
            }

            if ($expense->currency_id != $this->global->currency->id && $expense->exchange_rate != 0) {
                /** @phpstan-ignore-next-line */
                $prices[$expense->date] += floor($expense->total / $expense->exchange_rate);
            }
            else {
                /** @phpstan-ignore-next-line */
                $prices[$expense->date] += round($expense->total, 2);
            }
        }

        $dates = array_keys($prices);

        $graphData = array();

        foreach ($dates as $date) {
            $graphData[] = [
                'date' => $date,
                'total' => isset($prices[$date]) ? round($prices[$date], 2) : 0,
            ];
        }

        usort($graphData, function ($a, $b) {
            $t1 = strtotime($a['date']);
            $t2 = strtotime($b['date']);
            return $t1 - $t2;
        });

        $graphData = collect($graphData);

        $data['labels'] = $graphData->pluck('date')->toArray();
        $data['values'] = $graphData->pluck('total')->toArray();
        $totalExpense = $graphData->sum('total');
        $data['colors'] = [$this->appTheme->header_color];
        $data['name'] = __('modules.dashboard.totalExpenses');
        $this->chartData = $data;
        // Expense report end

        // Expense category report start

        $startDate = ($request->startDate == null) ? null : now($this->global->timezone)->startOfMonth()->toDateString();
        $endDate = ($request->endDate == null) ? null : now($this->global->timezone)->toDateString();
        $expenseCategoryId = ExpensesCategory::join('expenses', 'expenses_category.id', '=', 'expenses.category_id')
            ->where('expenses.status', 'approved')
            ->where('expenses.category_id', '!=', null);

        if ($request->startDate !== null && $request->startDate != 'null' && $request->startDate != '') {
            $startDate = Carbon::createFromFormat($this->global->date_format, $request->startDate)->toDateString();
            $expenses = $expenseCategoryId->where(DB::raw('DATE(expenses.`purchase_date`)'), '>=', $startDate);
        }


        if ($request->endDate !== null && $request->endDate != 'null' && $request->endDate != '') {
            $endDate = Carbon::createFromFormat($this->global->date_format, $request->endDate)->toDateString();
            $expenses = $expenseCategoryId->where(DB::raw('DATE(expenses.`purchase_date`)'), '<=', $endDate);
        }


        if ($request->employeeID != 'all' && !is_null($request->employeeID)) {
            $expenseCategoryId = $expenseCategoryId->where('expenses.user_id', $request->employeeID);
        }

        if ($request->projectID != 'all' && !is_null($request->projectID)) {
            $expenseCategoryId = $expenseCategoryId->where('expenses.project_id', $request->projectID);
        }


        $expenseCategoryId = $expenseCategoryId->distinct('expenses.category_id')->selectRaw('expenses.category_id as id')->pluck('id')->toArray();

        $categories = ExpensesCategory::whereIn('id', $expenseCategoryId)->get();

        if ($request->categoryID != 'all' && !is_null($request->categoryID)) {
            $categories = $categories->where('id', $request->categoryID);
        }

        $barData['labels'] = $categories->pluck('category_name');
        $barData['name'] = __('modules.reports.totalCategories');
        $barData['colors'] = [$this->appTheme->header_color];
        $barData['values'] = [];

        foreach ($categories as $category) {
            /** @phpstan-ignore-next-line */
            $category_id = isset($category->id) ? $category->id : $category->category_id;
    
            if ($startDate && $endDate != null) {
                $barData['values'][] = Expense::where('category_id', $category_id)->whereBetween(DB::raw('DATE(`purchase_date`)'), [$startDate, $endDate])->count();
            }
            else{
                $barData['values'][] = Expense::where('category_id', $category_id)->count();
            }
        }

        $this->barChartData = $barData;
        // Expense category report end

        $html = view('reports.expense.chart', $this->data)->render(); /* Expense report view */
        $html2 = view('reports.expense.bar_chart', $this->data)->render(); /* Expense Category report view */

        return Reply::dataOnly(['status' => 'success', 'html' => $html,'html2' => $html2, 'title' => $this->pageTitle, 'totalExpenses' => currency_formatter($totalExpense)]);
    }

}
