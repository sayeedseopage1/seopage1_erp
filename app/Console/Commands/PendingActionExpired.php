<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use DB;
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
       // DB::begintransaction();
        $actions= PendingAction::where('past_status',0)->where('expired_status',0)->where('authorization_for',62)->get();
       // dd($actions);
        foreach($actions as $action)
        {
            $current_date= Carbon::now();
            $creation_date= Carbon::parse($action->created_at);
            $hoursDifference = $current_date->diffInMinutes($creation_date);
           
            $timeframe = ($action->timeframe *60);
            // /dd($hoursDifference,$timeframe);
            if ($hoursDifference >= $timeframe) {
                $action= PendingAction::find($action->id);
                $action->expired_status = 1;
                $action->save();
               // dd($action);
            }
           
           
        }
        $this->info('Pending action expired');

    }
   
}
