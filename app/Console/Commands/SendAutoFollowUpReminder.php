<?php

namespace App\Console\Commands;

use App\Events\AutoFollowUpReminderEvent;
use App\Models\LeadFollowUp;
use Carbon\Carbon;
use Illuminate\Console\Command;

class SendAutoFollowUpReminder extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'send-auto-followup-reminder';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send notification of followup to employee or added by user';


    /**
     * Execute the console command.
     *
     * @return mixed
     */

    public function handle()
    {
        $followups = LeadFollowUp::with('lead', 'lead.leadAgent', 'lead.leadAgent.user')->where('next_follow_up_date', '>=', now())
            ->where('send_reminder', 'yes')
            ->get();

        foreach ($followups as $followup) {

            $remindTime = $followup->remind_time;
            $reminderDate = null;

            if($followup->remind_type == 'day'){
                $reminderDate = $followup->next_follow_up_date->subDays($remindTime);
            }
            elseif ($followup->remind_type == 'hour') {
                $reminderDate = $followup->next_follow_up_date->subHours($remindTime);
            }
            else {
                $reminderDate = $followup->next_follow_up_date->subMinutes($remindTime);
            }

            if($reminderDate->format('Y-m-d H:i') == now()->timezone(global_setting()->timezone)->format('Y-m-d H:i')){
                event(new AutoFollowUpReminderEvent($followup));
            }

        }

    }

}


