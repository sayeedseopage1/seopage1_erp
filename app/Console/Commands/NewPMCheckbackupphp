<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Carbon\Carbon;
use DateTime;

use function Sodium\add;
use Auth;
use App\Models\Deal;
use App\Models\Project;
use App\Models\User;
use App\Models\EmployeeDetails;
use App\Models\PMAssign;

class NewPMCheck extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'new_pm_check:daily';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'New Project Manager Project Status Check';
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $check_new_pm= User::where('role_id',4)->orderBy('id','desc')->first();
        $new_pm = EmployeeDetails::where('user_id',$check_new_pm->id)->first();
        
        $to = Carbon::createFromFormat('Y-m-d H:s:i', Carbon::now());

        $from = Carbon::createFromFormat('Y-m-d H:s:i', $new_pm->joining_date);

        $diff_in_days = $from->diffInDays($to);
        //dd($diff_in_days);
        if($diff_in_days < 30)
        {
            // $startOfWeek = Carbon::now()->startOfWeek();
            // $endOfWeek = Carbon::now()->endOfWeek();
            // $new_pm_project_count= Project::where('pm_id',$check_new_pm->id)->where('start_date',Carbon::thisWeek())->count();
                $startOfWeek = Carbon::now()->startOfWeek();
                $endOfWeek = Carbon::now()->endOfWeek();

                $new_pm_project_count = Project::where('pm_id', $check_new_pm->id)
                    ->whereBetween('start_date', [$startOfWeek, $endOfWeek])
                    ->count();
           // dd($new_pm_project_count);
            if($new_pm_project_count > 0)
            {
                $new_pm_assign = PMAssign::where('pm_id',$new_pm->user_id)->first();
                $new_pm_status= PMAssign::find($new_pm_assign->id);
            //    / dd($new_pm_status);
                $new_pm_status->status = 0;
                $new_pm_status->save();
            }else{
                $new_pm_assign = PMAssign::where('pm_id',$new_pm->user_id)->first();
                $new_pm_status= PMAssign::find($new_pm_assign->id);
            //    / dd($new_pm_status);
                $new_pm_status->status = 1;
                $new_pm_status->save();


            }
            
        }else 
        {
            $new_pm_assign = PMAssign::where('pm_id',$new_pm->user_id)->first();
                $new_pm_status= PMAssign::find($new_pm_assign->id);
                $new_pm_status->status = 1;
                $new_pm_status->save();
        }

        $this->info('New Project Manager check Done');


    }
}
