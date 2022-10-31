<?php

namespace App\Traits;

use App\Models\Contract;
use App\Models\ContractSign;
use App\Models\DashboardWidget;
use App\Models\Lead;
use App\Models\LeadSource;
use App\Models\LeadStatus;
use App\Models\Payment;
use App\Models\ProjectTimeLog;
use App\Models\Role;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use App\Models\Deal;

/**
 *
 */
trait ClientDashboard
{

    /**
     *
     * @return void
     */
    public function clientDashboard()
    {
        abort_403($this->viewClientDashboard !== 'all');

        $this->pageTitle = 'app.clientDashboard';
        $this->startDate = (request('startDate') != '') ? Carbon::createFromFormat($this->global->date_format, request('startDate')) : now($this->global->timezone)->startOfMonth();
        $this->endDate = (request('endDate') != '') ? Carbon::createFromFormat($this->global->date_format, request('endDate')) : now($this->global->timezone);
        $startDate = $this->startDate->toDateString();
        $endDate = $this->endDate->toDateString();

        $this->totalClient = User::withoutGlobalScope('active')
            ->join('role_user', 'role_user.user_id', '=', 'users.id')
            ->join('roles', 'roles.id', '=', 'role_user.role_id')
            ->leftJoin('client_details', 'users.id', '=', 'client_details.user_id')
            ->where('roles.name', 'client')
            ->whereBetween(DB::raw('DATE(client_details.`created_at`)'), [$startDate, $endDate])
            ->select('users.id')
            ->count();

        $this->totalLead = Lead::whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])
            ->count();

        // $this->totalLeadConversions = Lead::whereBetween(DB::raw('DATE(`updated_at`)'), [$startDate, $endDate])
        //     ->whereNotNull('client_id')
        //     ->count();
        $this->totalLeadConversions= Lead::
                where('deal_status',1)
                ->where(DB::raw('DATE(updated_at)'), '>=', $startDate)
                ->where(DB::raw('DATE(updated_at)'), '<=', $endDate)
                ->count();
                $this->totalwondeals= Deal::

                          where(DB::raw('DATE(created_at)'), '>=', $startDate)
                        ->where(DB::raw('DATE(created_at)'), '<=', $endDate)
                        ->count();
              //  dd($this->totalLeadConversions);

        $this->totalContractsGenerated = Contract::whereBetween(DB::raw('DATE(contracts.`end_date`)'), [$startDate, $endDate])->orWhereBetween(DB::raw('DATE(contracts.`start_date`)'), [$startDate, $endDate])->count();

        $this->totalContractsSigned = ContractSign::whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])
            ->count();

        $this->recentLoginActivities = Role::with(['users' => function ($query) use ($startDate, $endDate) {
            return $query->select('users.id', 'users.name', 'users.email', 'users.last_login', 'users.image')
                ->whereBetween(DB::raw('DATE(users.`last_login`)'), [$startDate, $endDate])
                ->whereNotNull('last_login')
                ->orderBy('users.last_login', 'desc')
                ->limit(10);

        }])->where('name', 'client')->first();

        $this->latestClient = Role::with(['users' => function ($query) use ($startDate, $endDate) {
            return $query->select('users.id', 'users.name', 'users.email', 'users.created_at', 'users.image')
                ->whereBetween(DB::raw('DATE(users.`created_at`)'), [$startDate, $endDate])
                ->orderBy('users.id', 'desc')
                ->limit(10);
        }])->where('name', 'client')->first();

        $this->clientEarningChart = $this->clientEarningChart($startDate, $endDate);
        $this->clientTimelogChart = $this->clientTimelogChart($startDate, $endDate);

        $this->leadStatusChart = $this->leadStatusChart($startDate, $endDate);
        $this->leadSourceChart = $this->leadSourceChart($startDate, $endDate);
        $this->leadChartData = $this->leadChart($startDate, $endDate);
        $this->dealChartData = $this->dealChart($startDate, $endDate);

        $this->widgets = DashboardWidget::where('dashboard_type', 'admin-client-dashboard')->get();
        $this->activeWidgets = $this->widgets->filter(function ($value, $key) {
            return $value->status == '1';
        })->pluck('widget_name')->toArray();

        $this->view = 'dashboard.ajax.client';
    }

    public function clientEarningChart($startDate, $endDate)
    {
        $payments = Payment::with('project', 'project.client', 'invoice', 'invoice.client')
            ->join('currencies', 'currencies.id', '=', 'payments.currency_id')
            ->leftJoin('invoices', 'invoices.id', '=', 'payments.invoice_id')
            ->leftJoin('projects', 'projects.id', '=', 'payments.project_id')
            ->select('payments.amount', 'currencies.id as currency_id', 'currencies.exchange_rate', 'projects.client_id', 'invoices.client_id as invoice_client_id', 'payments.invoice_id', 'payments.project_id')
            ->where('payments.status', 'complete');
        $payments = $payments->where(function ($query) {
            $query->whereNotNull('projects.client_id')
                ->orWhereNotNull('invoices.client_id');
        });
        $payments = $payments->where(DB::raw('DATE(payments.`paid_on`)'), '>=', $startDate);
        $payments = $payments->where(DB::raw('DATE(payments.`paid_on`)'), '<=', $endDate);

        $payments = $payments->orderBy('paid_on', 'ASC')
            ->get();

        $chartDataClients = array();

        foreach ($payments as $chart) {
            if (is_null($chart->client_id)) {
                $chartName = $chart->invoice->client->name;
            }
            else {
                $chartName = $chart->project->client->name;
            }

            if (!array_key_exists($chartName, $chartDataClients)) {
                $chartDataClients[$chartName] = 0;
            }

            if ($chart->currency->currency_code != $this->global->currency->currency_code && $chart->currency->exchange_rate != 0) {
                if ($chart->currency->is_cryptocurrency == 'yes') {
                    $usdTotal = ($chart->amount * $chart->currency->usd_price);
                    $chartDataClients[$chartName] = $chartDataClients[$chartName] + floor($usdTotal / $chart->currency->exchange_rate);

                }
                else {
                    $chartDataClients[$chartName] = $chartDataClients[$chartName] + floor($chart->amount / $chart->currency->exchange_rate);
                }
            }
            else {
                $chartDataClients[$chartName] = $chartDataClients[$chartName] + round($chart->amount, 2);
            }
        }

        $data['labels'] = array_keys($chartDataClients);
        $data['values'] = array_values($chartDataClients);
        $data['colors'] = [$this->appTheme->header_color];
        $data['name'] = __('app.earnings');

        return $data;
    }

    /**
     * @param $startDate
     * @param $endDate
     * @return array
     */
    public function clientTimelogChart($startDate, $endDate)
    {
        $allTimelogs = ProjectTimeLog::leftJoin('tasks', 'tasks.id', 'project_time_logs.task_id')
            ->leftJoin('projects as proj', 'proj.id', 'project_time_logs.project_id')
            ->leftJoin('projects', 'projects.id', 'tasks.project_id')
            ->leftJoin('users', 'users.id', 'projects.client_id')
            ->leftJoin('users as client', 'client.id', 'proj.client_id')
            ->where('project_time_logs.approved', 1)
            ->whereBetween(DB::raw('DATE(project_time_logs.`created_at`)'), [$startDate, $endDate])
            ->select('project_time_logs.*', 'client.name')
            ->get();

        $clientWiseTimelogs = array();

        foreach ($allTimelogs as $timelog) {
            if (!array_key_exists($timelog->name, $clientWiseTimelogs)) {
                $clientWiseTimelogs[$timelog->name] = 0;
            }

            $clientWiseTimelogs[$timelog->name] = $clientWiseTimelogs[$timelog->name] + $timelog->total_hours;
        }

        $data['labels'] = array_keys($clientWiseTimelogs);
        $data['values'] = array_values($clientWiseTimelogs);
        $data['colors'] = [$this->appTheme->header_color];
        $data['name'] = __('app.hour');

        return $data;
    }

    /**
     * @param $startDate
     * @param $endDate
     * @return array
     */
    public function leadStatusChart($startDate, $endDate)
    {
        $leadStatus = LeadStatus::withCount(['leads' => function ($query) use ($startDate, $endDate) {
            return $query->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate]);
        }])->get();
        $data['labels'] = $leadStatus->pluck('type')->toArray();
        $data['colors'] = $leadStatus->pluck('label_color')->toArray();
        $data['values'] = $leadStatus->pluck('leads_count')->toArray();

        return $data;
    }

    public function leadSourceChart($startDate, $endDate)
    {
        $leadStatus = LeadSource::withCount(['leads' => function ($query) use ($startDate, $endDate) {
            return $query->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate]);
        }])->get();

        $data['labels'] = $leadStatus->pluck('type')->toArray();

        foreach ($data['labels'] as $key => $value) {
            $data['colors'][] = '#' . substr(md5($value), 0, 6);
        }

        $data['values'] = $leadStatus->pluck('leads_count')->toArray();

        return $data;
    }
    public function leadChart($startDate, $endDate)
    {
       $leads = Lead::groupBy('added_by')->orderBy('created_at','ASC')->get(
         [
           DB::raw('DATE_FORMAT(created_at,\'%d-%M-%y\') as date')
         ]
       );

    }
    public function dealChart($startDate, $endDate)
    {

    }

}
