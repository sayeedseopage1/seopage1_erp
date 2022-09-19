<?php

namespace App\Traits;

use App\Models\DashboardWidget;
use App\Models\Ticket;
use App\Models\TicketChannel;
use App\Models\TicketType;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

/**
 *
 */
trait TicketDashboard
{

    /**
     *
     * @return void
     */
    public function ticketDashboard()
    {
        abort_403(!($this->viewTicketDashboard == 'all'));

        $this->pageTitle = 'app.ticketDashboard';
        $this->startDate  = (request('startDate') != '') ? Carbon::createFromFormat($this->global->date_format, request('startDate')) : now($this->global->timezone)->startOfMonth();
        $this->endDate = (request('endDate') != '') ? Carbon::createFromFormat($this->global->date_format, request('endDate')) : now($this->global->timezone);
        $startDate = $this->startDate->startOfDay()->toDateTimeString();
        $endDate = $this->endDate->endOfDay()->toDateTimeString();

        $this->widgets = DashboardWidget::where('dashboard_type', 'admin-ticket-dashboard')->get();
        $this->activeWidgets = $this->widgets->filter(function ($value, $key) {
            return $value->status == '1';
        })->pluck('widget_name')->toArray();

        $this->totalUnresolvedTickets = Ticket::whereBetween('updated_at', [$startDate, $endDate])
            ->where(function ($query) {
                $query->where('status', '=', 'open')
                    ->orWhere('status', '=', 'pending');
            })
            ->count();

        $this->totalResolvedTickets = Ticket::whereBetween('updated_at', [$startDate, $endDate])
            ->where(function ($query) {
                $query->where('status', '=', 'resolved')
                    ->orWhere('status', '=', 'closed');
            })
            ->count();

        $this->totalUnassignedTicket = Ticket::whereBetween('updated_at', [$startDate, $endDate])
            ->whereNull('agent_id')
            ->count();

        $this->ticketTypeChart = $this->ticketTypeChart($startDate, $endDate);
        $this->ticketStatusChart = $this->ticketStatusChart($startDate, $endDate);
        $this->ticketChannelChart = $this->ticketChannelChart($startDate, $endDate);

        $this->newTickets = Ticket::with('requester')->where('status', 'open')
            ->whereBetween('updated_at', [$startDate, $endDate])
            ->orderBy('updated_at', 'desc')->get();

        $this->view = 'dashboard.ajax.ticket';
    }

    /**
     * XXXXXXXXXXX
     *
     * @return \Illuminate\Http\Response
     */
    public function ticketTypeChart($startDate, $endDate)
    {
        $tickets = TicketType::withCount(['tickets' => function ($query) use ($startDate, $endDate) {
            return $query->whereBetween('updated_at', [$startDate, $endDate]);
        }])->get();

        $data['labels'] = $tickets->pluck('type')->toArray();

        $data['colors'] = [];

        foreach ($data['labels'] as $key => $value) {
            $data['colors'][] = '#' . substr(md5($value), 0, 6);
        }

        $data['values'] = $tickets->pluck('tickets_count')->toArray();

        return $data;
    }

    public function ticketStatusChart($startDate, $endDate)
    {
        $tickets = Ticket::whereBetween('updated_at', [$startDate, $endDate])
            ->select(DB::raw('count(id) as totalTicket'), 'status')
            ->groupBy('status')
            ->get();

        $data['colors'] = [];
        $data['labels'] = [];
        $labels = $tickets->pluck('status')->toArray();

        foreach ($labels as $key => $value) {
            $data['labels'][] = __('app.' . $value);

            switch ($value) {
            case 'closed':
                $data['colors'][] = '#1d82f5';
                    break;

            case 'pending':
                $data['colors'][] = '#FCBD01';
                    break;

            case 'resolved':
                $data['colors'][] = '#2CB100';
                    break;

            case 'open':
                $data['colors'][] = '#D30000';
            break;
            }
        }

        $data['values'] = $tickets->pluck('totalTicket')->toArray();

        return $data;
    }

    public function ticketChannelChart($startDate, $endDate)
    {
        $tickets = TicketChannel::withCount(['tickets' => function ($query) use ($startDate, $endDate) {
            return $query->whereBetween('updated_at', [$startDate, $endDate]);
        }])->get();

        $data['labels'] = $tickets->pluck('channel_name')->toArray();

        foreach ($data['labels'] as $key => $value) {
            $data['colors'][] = '#' . substr(md5($value), 0, 6);
        }

        $data['values'] = $tickets->pluck('tickets_count')->toArray();

        return $data;
    }

}
