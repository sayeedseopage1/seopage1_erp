<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use Carbon\Carbon;
use DateTime;

use function Sodium\add;
use Auth;
use App\Models\Deal;
use App\Models\Project;
use NunoMaduro\LaravelDesktopNotifier\Facades\Notifier;
use Joli\JoliNotif\Notification;
use Joli\JoliNotif\NotifierFactory;

class AwardTime2 extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'award_time_check:daily';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Award Time Check';

    /**
     * Execute the console command.
     *
     * @return int
     */
     public function __construct()
   {
       parent::__construct();
   }
   public function notify($subject, $message, $icon = null, $link)
{
    $notifier = NotifierFactory::create();

    $notification = new Notification();
    $notification
        ->setTitle($subject)
        ->setBody($message)
        ->setIcon($icon)
        ->setUrl($link)
       ;

    if ($icon) {
        $notification->setIcon($icon);
    }

    $notifier->send($notification);
}

    public function handle()
    {
      $deals = Deal::where('status','pending')->get();


       foreach ($deals as $deal) {
         $to = Carbon::createFromFormat('Y-m-d H:s:i', Carbon::now());

         $from = Carbon::createFromFormat('Y-m-d H:s:i', $deal->award_time);

         $diff_in_minutes = $from->diffInMinutes($to);
        // dd($diff_in_minutes);
         if ($diff_in_minutes >1230) {
           $update_deal= Deal::find($deal->id);
           $update_deal->status= 'Denied';
           $update_deal->save();
           $project= Project::where('deal_id',$deal->id)->first();
           $project_update= Project::find($project->id);
           $project_update->status= 'canceled';
           $project_update->project_status = 'Not Accepted';
           $project_update->save();
         }





         
         //return $link;
       }
      
//       $link = 'https://google.com';
// // $message = 'Task Approved! Visit ' . $link;

// // $this->notify('Hello Web Artisan', $message);//  

// $message = 'Task Approved! Visit ' . $link;
// $subject = 'Task Approval Notification';
// $icon = asset('favicon.png');

// $this->notify($subject, $message, $icon);
$link = 'https://google.com';
$message = 'Task Approved! Visit ' . $link;
$subject = 'Task Approval Notification';
$icon = public_path('favicon.png');

$notifier = app(\NunoMaduro\LaravelDesktopNotifier\Contracts\Notifier::class);
$notification = app(\Joli\JoliNotif\Notification::class)
    ->setTitle($subject)
    ->setBody($message)
    ->setIcon($icon)
    ->setUrl($link)
    ;

$notifier->send($notification);



       $this->info('Award Time Checked and Status Changed');


    }
}
