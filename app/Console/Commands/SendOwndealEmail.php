<?php

namespace App\Console\Commands;

use Notification;
use App\Models\Deal;
use App\Models\User;
use Illuminate\Console\Command;
use App\Notifications\WonDealNotification;
use App\Notifications\HourlyDealNotification;

class SendOwndealEmail extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'send-owndeal-email';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'If team lead does not authorize the owndeal then send require email based on cirtain conditions';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $deals = Deal::where('authorization_status', 1)->whereNull('email_send_status')->get()->pluck('id');
        dd($deals);
        foreach($deals as $deal){
            $user = User::where('id', $deal->pm_id)->first();
            if ($deal->project_type == 'fixed') {
                Notification::send($user, new WonDealNotification($deal));
            }else{
                Notification::send($user, new HourlyDealNotification($deal));
            }
    
            if ($deal->project_type == 'fixed') {
                $users = User::where('role_id', 1)->get();
                foreach ($users as $usr) {
                    Notification::send($usr, new WonDealNotification($deal));
                }
            }else{
                $users = User::where('role_id', 1)->get();
                foreach ($users as $usr) {
                    Notification::send($usr, new HourlyDealNotification($deal));
                }
            }
    
            // $users = User::where('role_id', 8)->get();
    
            // foreach ($users as $key => $user) {
            //     Notification::send($user, new DealAuthorizationSendNotification($deal, Auth::user()));
            // }
        }
        
    }
}
