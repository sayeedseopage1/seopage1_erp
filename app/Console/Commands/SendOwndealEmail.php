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
        $now = \Carbon\Carbon::now()->toDateTimeString();
        $deals = Deal::whereNull('email_send_status')->where('is_drafted', 0)
            ->where('authorization_status', 2)
            ->where(function ($innerSubquery) use ($now) {
                $innerSubquery->whereRaw('
                    (
                        (
                            (TIME(released_at) >= "23:30" OR TIME(released_at) < "07:00")
                            AND (DATE(released_at) < CURDATE())
                        )
                        OR
                        (
                            (TIME(released_at) >= "23:30" OR TIME(released_at) < "07:00")
                            AND TIME(?) >= "10:00"
                        )
                        OR
                        (
                            TIME(released_at) >= "07:00" AND TIME(released_at) < "23:30"
                            AND TIMESTAMPDIFF(SECOND, released_at, ?) > ?
                        )
                    )
                ', [$now, $now, (180 * 60)]);
            });
        
        // dd($deals->count());
            
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

            $deal->email_send_status = 1;
            $deal->save();
        }
        
    }
}
