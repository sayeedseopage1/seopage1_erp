<?php

namespace App\Console\Commands;

use App\Models\DeveloperStopTimer;
use App\Models\User;
use App\Notifications\AcknowledgementNotification;
use Illuminate\Console\Command;
use Carbon\Carbon;
use Notification;

class AcknowledgementEmail extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'acknowledgement_submission:daliy';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Acknowledgement Submission';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $date = Carbon::parse('yesterday');
        $yesterday = $date->format('Y-m-d');
        $dev_stop_timer = DeveloperStopTimer::where('date',$yesterday)->get();
        $users = User::where('role_id',1)->orWhere('role_id',8)->orWhere('role_id',4)->orWhere('role_id',6)->get();
        // $desiredTime = Carbon::createFromTime(11, 00, 0);
        // $currectTime = Carbon::now();

            foreach($users as $user)
                {
                    Notification::send($user, new AcknowledgementNotification($dev_stop_timer));
                }
        return Command::SUCCESS;
    }
}
