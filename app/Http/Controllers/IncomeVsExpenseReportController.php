<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Models\Expense;
use App\Models\Payment;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class IncomeVsExpenseReportController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.incomeVsExpenseReport';
    }

    public function index()
    {
        abort_403(user()->permission('view_income_expense_report') != 'all');

        $this->fromDate = now($this->global->timezone)->startOfMonth();
        $this->toDate = now($this->global->timezone);

        if (request()->ajax()) {
            $this->chartData = $this->getGraphData();
            $html = view('reports.income-expense.chart', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle, 'totalEarning' => currency_formatter($this->chartData['totalEarning']), 'totalExpense' => currency_formatter($this->chartData['totalExpense'])]);
        }

        return view('reports.income-expense.index', $this->data);
    }

    public function getGraphData()
    {
        $graphData = [];
        $incomes = [];
        $fromDate = now($this->global->timezone)->startOfMonth()->toDateString();
        $toDate = now($this->global->timezone)->toDateString();

        if (request()->startDate !== null && request()->startDate != 'null' && request()->startDate != '') {
            $fromDate = Carbon::createFromFormat($this->global->date_format, request()->startDate)->toDateString();
        }

        if (request()->endDate !== null && request()->endDate != 'null' && request()->endDate != '') {
            $toDate = Carbon::createFromFormat($this->global->date_format, request()->endDate)->toDateString();
        }

        $invoices = Payment::join('currencies', 'currencies.id', '=', 'payments.currency_id')
            ->where(DB::raw('DATE(`paid_on`)'), '>=', $fromDate)
            ->where(DB::raw('DATE(`paid_on`)'), '<=', $toDate)
            ->where('payments.status', 'complete')
            ->orderBy('paid_on', 'ASC')
            ->get([
                DB::raw('DATE_FORMAT(paid_on,"%d-%M-%y") as date'),
                DB::raw('YEAR(paid_on) year, MONTH(paid_on) month'),
                DB::raw('amount as total'),
                'currencies.id as currency_id',
                'currencies.exchange_rate'
            ]);

        foreach ($invoices as $invoice) {
            if (!isset($incomes[$invoice->date])) {
                $incomes[$invoice->date] = 0;
            }

            if ($invoice->currency_id != $this->global->currency->id && $invoice->total > 0 && $invoice->exchange_rate > 0) {
                /** @phpstan-ignore-next-line */
                $incomes[$invoice->date] += floor($invoice->total / $invoice->exchange_rate);
            }
            else {
                $incomes[$invoice->date] += round($invoice->total, 2);
            }
        }

        $expenses = [];
        $expenseResults = Expense::join('currencies', 'currencies.id', '=', 'expenses.currency_id')
            ->where(DB::raw('DATE(`purchase_date`)'), '>=', $fromDate)
            ->where(DB::raw('DATE(`purchase_date`)'), '<=', $toDate)
            ->where('expenses.status', 'approved')
            ->get([
                'expenses.price',
                'expenses.purchase_Date as date',
                DB::raw('DATE_FORMAT(purchase_date,\'%d-%M-%y\') as date'),
                'currencies.id as currency_id',
                'currencies.exchange_rate'
            ]);

        foreach ($expenseResults as $expenseResult) {
            if (!isset($expenses[$expenseResult->date])) {
                $expenses[$expenseResult->date] = 0;
            }

            if ($expenseResult->currency_id != $this->global->currency->id && $expenseResult->price > 0 && $expenseResult->exchange_rate > 0) {
                /** @phpstan-ignore-next-line */
                $expenses[$expenseResult->date] += floor($expenseResult->price / $expenseResult->exchange_rate);
            }
            else {
                $expenses[$expenseResult->date] += round($expenseResult->price, 2);
            }
        }


        $dates = array_keys(array_merge($incomes, $expenses));

        foreach ($dates as $date) {
            $graphData[] = [
                'y' => $date,
                'a' => isset($incomes[$date]) ? round($incomes[$date], 2) : 0,
                'b' => isset($expenses[$date]) ? round($expenses[$date], 2) : 0
            ];
        }

        usort($graphData, function ($a, $b) {
            $t1 = strtotime($a['y']);
            $t2 = strtotime($b['y']);
            return $t1 - $t2;
        });

        $graphData = collect($graphData);

        $data['labels'] = $graphData->pluck('y');
        $data['values'][] = $graphData->pluck('a');
        $data['values'][] = $graphData->pluck('b');
        $data['totalEarning'] = $graphData->sum('a');
        $data['totalExpense'] = $graphData->sum('b');
        $data['colors'] = ['#1D82F5', '#d30000'];
        $data['name'][] = __('app.income');
        $data['name'][] = __('app.expense');

        return $data;
    }

}
