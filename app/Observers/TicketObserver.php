<?php

namespace App\Observers;

use App\Events\TicketEvent;
use App\Events\TicketRequesterEvent;
use App\Models\Notification;
use App\Models\Ticket;
use App\Models\UniversalSearch;

class TicketObserver
{

    public function saving(Ticket $ticket)
    {
        if (!isRunningInConsoleOrSeeding()) {
            $userID = (!is_null(user())) ? user()->id : $ticket->user_id;
            $ticket->last_updated_by = $userID;
        }
    }

    public function creating(Ticket $ticket)
    {
        if (!isRunningInConsoleOrSeeding()) {
            $userID = (!is_null(user())) ? user()->id : $ticket->user_id;
            $ticket->added_by = $userID;

            if ($ticket->isDirty('status') && $ticket->status == 'closed') {
                $ticket->close_date = now(global_setting()->timezone)->format('Y-m-d');
            }

        }
    }

    public function created(Ticket $ticket)
    {
        if (!isRunningInConsoleOrSeeding()) {
            // Send admin notification
            event(new TicketEvent($ticket, 'NewTicket'));

            if($ticket->requester){
                event(new TicketRequesterEvent($ticket, $ticket->requester));
            }

            if ($ticket->agent_id != '') {
                event(new TicketEvent($ticket, 'TicketAgent'));
            }

        }
    }

    public function updating(Ticket $ticket)
    {
        if (!isRunningInConsoleOrSeeding()) {
            if ($ticket->isDirty('status') && $ticket->status == 'closed') {
                $ticket->close_date = now(global_setting()->timezone)->format('Y-m-d');
            }
        }
    }

    public function updated(Ticket $ticket)
    {
        if (!isRunningInConsoleOrSeeding()) {
            if ($ticket->isDirty('agent_id')) {
                event(new TicketEvent($ticket, 'TicketAgent'));
            }
        }
    }

    public function deleting(Ticket $ticket)
    {
        $universalSearches = UniversalSearch::where('searchable_id', $ticket->id)->where('module_type', 'ticket')->get();

        if ($universalSearches) {
            foreach ($universalSearches as $universalSearch) {
                UniversalSearch::destroy($universalSearch->id);
            }
        }

        $notifyData = ['App\Notifications\NewTicket','App\Notifications\NewTicketReply','App\Notifications\NewTicketRequester','App\Notifications\TicketAgent'];

        Notification::whereIn('type', $notifyData)
            ->whereNull('read_at')
            ->where('data', 'like', '{"id":'.$ticket->id.',%')
            ->delete();
    }

}
