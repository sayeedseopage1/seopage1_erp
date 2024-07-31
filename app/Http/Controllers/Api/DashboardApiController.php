<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Task;
use App\Models\User;
use App\Helper\Reply;
use App\Models\Event;
use App\Models\Leave;
use App\Models\Ticket;
use App\Models\Holiday;
use App\Models\Project;
use App\Models\PMAssign;
use Carbon\CarbonPeriod;
use App\Models\Attendance;
use App\Models\TaskHistory;
use App\Traits\HRDashboard;
use App\Traits\PmDashboard;
use App\Models\PmCoreMetric;
use App\Models\TaskRevision;
use Illuminate\Http\Request;
use App\Traits\LeadDashboard;
use App\Traits\UxUiDashboard;
use App\Models\ProjectTimeLog;
use App\Traits\SalesDashboard;
use App\Models\DailySubmission;
use App\Models\DashboardWidget;
use App\Models\EmployeeDetails;
use App\Models\TaskboardColumn;
use App\Traits\ClientDashboard;
use App\Traits\TicketDashboard;
use App\Traits\CurrencyExchange;
use App\Traits\FinanceDashboard;
use App\Traits\ProjectDashboard;
use App\Models\AttendanceSetting;
use App\Traits\EmployeeDashboard;
use App\Traits\GraphicsDashboard;
use App\Traits\OverviewDashboard;
use App\Models\DeveloperStopTimer;
use App\Traits\DeveloperDashboard;
use Froiden\Envato\Traits\AppBoot;
use Illuminate\Support\Facades\DB;
use App\Models\ProjectTimeLogBreak;
use App\Traits\ClientPanelDashboard;
use App\Traits\PmDashboardAdminView;
use Illuminate\Support\Facades\Auth;
use App\Traits\DevDashboardAdminView;
use App\Traits\LeadDashboardAdminView;
use App\Traits\SalesDashboardAdminView;
use App\Traits\webdevelopmentDashboard;

class DashboardController extends AccountBaseController
{
    use AppBoot, CurrencyExchange, OverviewDashboard, EmployeeDashboard, ProjectDashboard, ClientDashboard, HRDashboard, webdevelopmentDashboard, TicketDashboard, FinanceDashboard, ClientPanelDashboard, LeadDashboard, DeveloperDashboard, UxUiDashboard, GraphicsDashboard, SalesDashboard, PmDashboard, PmDashboardAdminView, LeadDashboardAdminView, DevDashboardAdminView, SalesDashboardAdminView;

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.dashboard';
        $this->middleware(function ($request, $next) {
            $this->viewOverviewDashboard = user()->permission('view_overview_dashboard');
            $this->viewProjectDashboard = user()->permission('view_project_dashboard');
            $this->viewClientDashboard = user()->permission('view_client_dashboard');
            $this->viewHRDashboard = user()->permission('view_hr_dashboard');
            $this->viewTicketDashboard = user()->permission('view_ticket_dashboard');
            $this->viewFinanceDashboard = user()->permission('view_finance_dashboard');
            return $next($request);
        });
    }
    public function index()
    {
        $this->isCheckScript();
        if (in_array('Lead Developer', user_roles())) {
            return $this->LeadDashboard();
        }
        if ($this->user->role_id == 4) {
            return $this->PmDashboard();
        }
        if ($this->user->role_id == 5) {
            return $this->DeveloperDashboard();
        }
        if ($this->user->role_id == 9) {
            return $this->UxUiDashboard();
        }
        if ($this->user->role_id == 7) {
            return $this->SalesDashboard();
        }
        if ($this->user->role_id == 10) {
            return $this->GraphicsDashboard();
        }
        if (in_array('employee', user_roles())) {
            return $this->employeeDashboard();
        }
        if (in_array('client', user_roles())) {
            return $this->clientPanelDashboard();
        }
    }

    public function tempDashboard($temp)
    {
        return view('dashboard.temp_dashboard', $this->data);
    }

    public function widget(Request $request, $dashboardType)
    {
        $data = $request->all();
        unset($data['_token']);
        DashboardWidget::where('status', 1)->where('dashboard_type', $dashboardType)->update(['status' => 0]);

        foreach ($data as $key => $widget) {
            DashboardWidget::where('widget_name', $key)->where('dashboard_type', $dashboardType)->update(['status' => 1]);
        }

        return Reply::success(__('messages.updatedSuccessfully'));
    }

    public function checklist()
    {
        if (in_array('admin', user_roles())) {
            $this->isCheckScript();
            return view('dashboard.checklist', $this->data);
        }
    }

    /**
     * @return array|\Illuminate\Http\Response
     */
    public function memberDashboard()
    {
        abort_403(!in_array('employee', user_roles()));
        return $this->employeeDashboard();
    }

    public function accountUnverified()
    {
        return view('dashboard.unverified', $this->data);
    }
    public function leadDevPerformance($id)
    {
        $this->lead_dev = User::where('id', $id)->first();
        $this->pageTitle = 'Lead Developer Performance';
        return $this->LeadDashboardAdminView($this->lead_dev);
    }
    public function devPerformance($id)
    {
        $this->dev = User::where('id', $id)->first();
        $this->pageTitle = 'Developer Performance';
        return $this->DevDashboardAdminView($this->dev);
    }
    public function salesPerformance($id)
    {
        $this->sales = User::where('id', $id)->first();
        $this->pageTitle = 'Sales Performance';
        return $this->SalesDashboardAdminView($this->sales);
    }

    // temp lead
    public function tempLeadDevDashboard($id)
    {
        $this->lead_dev = User::where('id', $id)->first();
        return view('dashboard.temp_lead_admin_dashboard', $this->data);
    }

    public function tempDevDashboard($id)
    {
        $this->dev = User::where('id', $id)->first();
        return view('dashboard.temp_dev_admin_dashboard', $this->data);
    }

    public function tempSalesDashboard($id)
    {
        $this->sales = User::where('id', $id)->first();
        return view('dashboard.temp_sales_admin_dashboard', $this->data);
    }
}
