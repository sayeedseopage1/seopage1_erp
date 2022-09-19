<?php

namespace App\Http\Controllers;

use App\DataTables\FinanceReportDataTable;
use App\Helper\Reply;
use App\Models\Currency;
use App\Models\Payment;
use App\Models\Project;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FinanceReportController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.financeReport';
    }

    public function index(FinanceReportDataTable $dataTable)
    {
        $this->fromDate = now($this->global->timezone)->startOfMonth();
        $this->toDate = now($this->global->timezone);
        $this->currencies = Currency::all();
        $this->currentCurrencyId = $this->global->currency_id;

        $this->projects = Project::allProjects();
        $this->clients = User::allClients();

        return $dataTable->render('reports.finance.index', $this->data);
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function financeChartData(Request $request)
    {
        $startDate = now($this->global->timezone)->startOfMonth()->toDateString();
        $endDate = now($this->global->timezone)->toDateString();

        $payments = Payment::join('currencies', 'currencies.id', '=', 'payments.currency_id')
            ->leftJoin('invoices', 'invoices.id', '=', 'payments.invoice_id')
            ->leftJoin('projects', 'projects.id', '=', 'payments.project_id')
            ->where('payments.status', 'complete');

        if ($request->startDate !== null && $request->startDate != 'null' && $request->startDate != '') {
            $startDate = Carbon::createFromFormat($this->global->date_format, $request->startDate)->toDateString();
        }

        $payments = $payments->where(DB::raw('DATE(payments.`paid_on`)'), '>=', $startDate);

        if ($request->endDate !== null && $request->endDate != 'null' && $request->endDate != '') {
            $endDate = Carbon::createFromFormat($this->global->date_format, $request->endDate)->toDateString();
        }

        $payments = $payments->where(DB::raw('DATE(payments.`paid_on`)'), '<=', $endDate);


        if ($request->projectID != 'all' && !is_null($request->projectID)) {
            $payments = $payments->where('payments.project_id', '=', $request->projectID);
        }

        if ($request->clientID != 'all' && !is_null($request->clientID)) {
            $clientId = $request->clientID;
            $payments = $payments->where(function ($query) use ($clientId) {
                $query->where('projects.client_id', $clientId)
                    ->orWhere('invoices.client_id', $clientId);
            });
        }

        $payments = $payments->orderBy('paid_on', 'ASC')
            ->get([
                DB::raw('DATE_FORMAT(paid_on,"%d-%M-%y") as date'),
                DB::raw('YEAR(paid_on) year, MONTH(paid_on) month'),
                DB::raw('amount as total'),
                'currencies.id as currency_id',
                'currencies.exchange_rate'
            ]);

        $incomes = array();

        foreach ($payments as $invoice) {
            if (!isset($incomes[$invoice->date])) {
                $incomes[$invoice->date] = 0;
            }

            if ($invoice->currency_id != $this->global->currency->id && $invoice->exchange_rate != 0) {
                $incomes[$invoice->date] += floor(floatval($invoice->total) / floatval($invoice->exchange_rate));
            }
            else {
                $incomes[$invoice->date] += round($invoice->total, 2);
            }
        }

        $dates = array_keys($incomes);

        $graphData = array();

        foreach ($dates as $date) {
            $graphData[] = [
                'date' => $date,
                'total' => isset($incomes[$date]) ? round($incomes[$date], 2) : 0,
            ];
        }

        usort($graphData, function ($a, $b) {
            $t1 = strtotime($a['date']);
            $t2 = strtotime($b['date']);
            return $t1 - $t2;
        });

        // return $graphData;
        $graphData = collect($graphData);

        $data['labels'] = $graphData->pluck('date')->toArray();
        $data['values'] = $graphData->pluck('total')->toArray();
        $totalEarning = $graphData->sum('total');
        $data['colors'] = [$this->appTheme->header_color];
        $data['name'] = __('modules.dashboard.totalEarnings');

        $this->chartData = $data;
        $html = view('reports.timelogs.chart', $this->data)->render();
        return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle, 'totalEarnings' => currency_formatter($totalEarning)]);
    }

}
