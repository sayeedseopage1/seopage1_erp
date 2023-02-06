<?php

namespace App\Http\Controllers;

use App\DataTables\ReportIssueDataTable;
use App\Helper\Reply;
use App\Http\Requests\Tickets\StoreTicket;
use App\Http\Requests\Tickets\UpdateTicket;
use App\Models\Country;
use App\Models\Ticket;
use App\Models\TicketChannel;
use App\Models\TicketGroup;
use App\Models\TicketReply;
use App\Models\TicketReplyTemplate;
use App\Models\TicketTag;
use App\Models\TicketTagList;
use App\Models\TicketType;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\ReportIssue;
use Toastr;
use App\Models\IssueQuery;
use Auth;

class ReportIssueController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'Report Issues';

    }

    public function index(ReportIssueDataTable $dataTable)
    {
        $viewPermission = user()->permission('view_tickets');
        abort_403(!in_array($viewPermission, ['all', 'added', 'owned', 'both']));

        $managePermission = user()->permission('manage_ticket_agent');

        if (!request()->ajax()) {
            $this->channels = TicketChannel::all();
            $this->groups = $managePermission == 'none' ? null : TicketGroup::with(['enabledAgents' => function($q) use($managePermission){

                if($managePermission == 'added'){
                    $q->where('added_by', user()->id);
                }
                elseif ($managePermission == 'owned') {
                    $q->where('agent_id', user()->id);
                }
                elseif ($managePermission == 'both') {
                    $q->where('agent_id', user()->id)->orWhere('added_by', user()->id);
                }
                else {
                    $q->get();
                }

            }, 'enabledAgents.user'])->get();

            $this->types = TicketType::all();
            $this->tags = TicketTagList::all();
        }

        return $dataTable->render('report_issues.index', $this->data);

    }

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
        abort_403(user()->permission('delete_tickets') != 'all');

        Ticket::whereIn('id', explode(',', $request->row_ids))->delete();
    }



    public function create()
    {
        $this->addPermission = user()->permission('add_tickets');
        abort_403(!in_array($this->addPermission, ['all', 'added']));


        if (request()->ajax()) {
            $html = view('report_issues.ajax.create', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'report_issues.ajax.create';
        return view('report_issues.create', $this->data);

    }

    public function store(Request $request)
    {
      //dd($request);
      $validated = $request->validate([
            'subject' => 'required',
            'page_link' => 'required',
            'screenshot' => 'required',
            'description' => 'required',
            'issue_type' => 'required',
        ]);

      //dd($request);
      $issue= new ReportIssue();
      $issue->user_id= $request->user_id;
      $issue->subject= $request->subject;
      $issue->description = $request->description;
      $issue->page_link = $request->page_link;
      $issue->screenshot= $request->screenshot;
      $issue->issue_type= $request->issue_type;
      $issue->comments= $request->comments;
      $issue->save();



        // Save first message
        Toastr::success('Submitted Successfully', 'Success', ["positionClass" => "toast-top-right"]);

      return redirect()->route('report_issues.index');
    }
    public function StatusChange(Request $request)
    {
      //dd($request);
      if ($request->status == 'reply' && $request->comments == null) {
        Toastr::error('Please add a reply', 'Failed', ["positionClass" => "toast-top-right"]);

      return redirect()->route('report_issues.index');
      }
      $issue= ReportIssue::find($request->id);
      if ($request->status == 'fixed' || $request->status == 'Not Taken Into Consideration') {
      $issue->status = $request->status;
    }else {
      $issue->status = 'in progress';
    }


      $issue->save();
      $query= new IssueQuery();
      $query->user_id = Auth::id();
      $query->issue_id= $issue->id;
      $query->comments= $request->comments;
      $query->save();
      Toastr::success('Query submitted Successfully', 'Success', ["positionClass" => "toast-top-right"]);

    return redirect()->route('report_issues.index');
    }

    public function show($id)
    {
      $this->issue= ReportIssue::where('id',$id)->first();
      if (request()->ajax()) {
          $this->pageTitle = __('Report Issues Details');
          $html = view('report_issues.show2', $this->data)->render();
          return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
      }

      $this->view = 'report_issues.show2';
      return view('report_issues.create', $this->data);





    }

    public function ticketChartData($id)
    {
        $labels = ['open', 'pending', 'resolved', 'closed'];
        $data['labels'] = [__('app.open'), __('app.pending'), __('app.resolved'), __('app.closed')];
        $data['colors'] = ['#D30000', '#FCBD01', '#2CB100', '#1d82f5'];
        $data['values'] = [];

        foreach ($labels as $label) {
            $data['values'][] = Ticket::where('user_id', $id)->where('status', $label)->count();
        }

        return $data;
    }

    public function update(UpdateTicket $request, $id)
    {

        $ticket = Ticket::findOrFail($id);
        $ticket->status = $request->status;
        $ticket->save();

        $message = str_replace('<p><br></p>', '', trim($request->message));

        if ($message != '') {
            $reply = new TicketReply();
            $reply->message = $request->message;
            $reply->ticket_id = $ticket->id;
            $reply->user_id = $this->user->id; // Current logged in user
            $reply->save();

            return Reply::successWithData(__('messages.ticketReplySuccess'), ['reply_id' => $reply->id]);
        }

        return Reply::dataOnly(['status' => 'success']);
    }

    public function destroy($id)
    {
        $ticket = Ticket::findOrFail($id);

        $this->deleteTicketPermission = user()->permission('delete_tickets');
        abort_403(!(
            $this->deleteTicketPermission == 'all'
            || ($this->deleteTicketPermission == 'added' && user()->id == $ticket->added_by)
            || ($this->deleteTicketPermission == 'owned' && (user()->id == $ticket->agent_id || user()->id == $ticket->user_id))
            || ($this->deleteTicketPermission == 'both' && (user()->id == $ticket->agent_id || user()->id == $ticket->added_by || user()->id == $ticket->user_id))
        ));

        Ticket::destroy($id);
        return Reply::success(__('messages.ticketDeleteSuccess'));

    }

    public function updateOtherData(Request $request, $id)
    {
        $ticket = Ticket::findOrFail($id);
        $ticket->agent_id = $request->agent_id;
        $ticket->type_id = $request->type_id;
        $ticket->priority = $request->priority;
        $ticket->channel_id = $request->channel_id;
        $ticket->status = $request->status;
        $ticket->save();

        // Save tags
        $tags = collect(json_decode($request->tags))->pluck('value');
        TicketTag::where('ticket_id', $ticket->id)->delete();

        foreach ($tags as $tag) {
            $tag = TicketTagList::firstOrCreate([
                'tag_name' => $tag
            ]);
            $ticket->ticketTags()->attach($tag);
        }

        return Reply::success(__('messages.updateSuccess'));
    }

    public function refreshCount(Request $request)
    {
        $viewPermission = user()->permission('view_tickets');

        $tickets = Ticket::with('agent');

        if (!is_null($request->startDate) && $request->startDate != '') {
            $startDate = Carbon::createFromFormat($this->global->date_format, $request->startDate)->toDateString();
            $tickets->where(DB::raw('DATE(`updated_at`)'), '>=', $startDate);
        }

        if (!is_null($request->endDate) && $request->endDate != '') {
            $endDate = Carbon::createFromFormat($this->global->date_format, $request->endDate)->toDateString();
            $tickets->where(DB::raw('DATE(`updated_at`)'), '<=', $endDate);
        }

        if (!is_null($request->agentId) && $request->agentId != 'all') {
            $tickets->where('agent_id', '=', $request->agentId);
        }

        if (!is_null($request->priority) && $request->priority != 'all') {
            $tickets->where('priority', '=', $request->priority);
        }

        if (!is_null($request->channelId) && $request->channelId != 'all') {
            $tickets->where('channel_id', '=', $request->channelId);
        }

        if (!is_null($request->typeId) && $request->typeId != 'all') {
            $tickets->where('type_id', '=', $request->typeId);
        }

        if ($viewPermission == 'added') {
            $tickets->where('added_by', '=', user()->id);
        }

        if ($viewPermission == 'owned') {
            $tickets->where('user_id', '=', user()->id);
        }

        if ($viewPermission == 'both') {
            $tickets->where(function ($query) {
                $query->where('tickets.user_id', '=', user()->id)
                    ->orWhere('tickets.added_by', '=', user()->id)
                    ->orWhere('tickets.agent_id', '=', user()->id);
            });
        }

        $tickets = $tickets->get();

        $openTickets = $tickets->filter(function ($value, $key) {
            return $value->status == 'open';
        })->count();

        $pendingTickets = $tickets->filter(function ($value, $key) {
            return $value->status == 'pending';
        })->count();

        $resolvedTickets = $tickets->filter(function ($value, $key) {
            return $value->status == 'resolved';
        })->count();

        $closedTickets = $tickets->filter(function ($value, $key) {
            return $value->status == 'closed';
        })->count();

        $totalTickets = $tickets->count();

        $ticketData = [
            'totalTickets' => $totalTickets,
            'closedTickets' => $closedTickets,
            'openTickets' => $openTickets,
            'pendingTickets' => $pendingTickets,
            'resolvedTickets' => $resolvedTickets
        ];

        return Reply::dataOnly($ticketData);
    }

}
