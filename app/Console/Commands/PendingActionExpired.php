<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use Illuminate\Console\Command;
use App\Models\PendingAction;

class PendingActionExpired extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'pending_action_expired:daily';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Pending Action Expiration';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $actions= PendingAction::where('past_status',0)->where('expired_status',0)->get();
        foreach($actions as $action)
        {
            $current_date= Carbon::now();
            $creation_date= Carbon::parse($action->created_at);
            $hoursDifference = $current_date->diffInMinutes($creation_date);
            $timeframe = ($action->timeframe *60);
            if ($hoursDifference >= $timeframe) {
                $action= PendingAction::find($action->id);
                $action->expired_status = 1;
                $action->save();
            }
           
           
        }
        $this->info('Pending action expired');

    }
   
}
