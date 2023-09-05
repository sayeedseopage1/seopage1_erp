<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Payment;

use App\Models\GoalSetting;
use App\Models\kpiSettingGenerateSale;
use App\Models\kpiSettingLoggedHour;
use App\Models\Lead;
use App\Models\ProjectTimeLog;
use App\Models\Seopage1Team;

use Carbon\Carbon;
use App\Models\Project;
use App\Models\Deal;
use App\Models\User;
use App\Models\DealStage;
use App\Models\DealStageChange;
use App\Models\kpiSetting;
use App\Models\CashPoint;
use DB;
use Illuminate\Support\Collection;

class GoalPointDistribution extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'goal_point_distribution:daily';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Goal Point Distribution';
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
        $currentMonth = Carbon::now()->startOfMonth();
        //dd($currentMonth);
        $currentMonthStart = date('Y-m-01'); // First day of the current month
        $currentMonthEnd = date('Y-m-t');
        // $currentMonthStart = date('2023-08-01'); // First day of the current month
        // $currentMonthEnd = date('2023-08-31');
        $goals = GoalSetting::where([
            'goal_status' => 1,
             'goal_progress' => 0,
        ])
        
        ->whereYear('startDate', $currentMonth->year)
        ->whereMonth('startDate', $currentMonth->month)
        ->whereYear('endDate', $currentMonth->year)
        ->whereMonth('endDate', $currentMonth->month)
        ->where('achievablePoints','>',0)
        ->get();
       // dd($currentMonthStart,$currentMonthEnd);
        
        foreach($goals as $goal) {
            $team = Seopage1Team::find($goal->team_id);
            $user_id = explode(',', rtrim($team->members, ','));
           //
           
           
           
          // dd($user_id);
            
            foreach ($user_id as $value2) {
               
                $user_name = User::where('id',$value2)->first();
                $user_cashpoints= CashPoint::where('user_id',$user_name->id)->whereBetween('created_at', [$currentMonthStart, $currentMonthEnd])->sum('points');
                $user_deals_added= DealStage::where('added_by',$user_name->id)->whereBetween('created_at', [$currentMonthStart, $currentMonthEnd])->count();
                $shift_user = User::where('id','!=',$user_name->id)->where('shift',$user_name->shift)->first();
                $shift_user_points= CashPoint::where('user_id',$shift_user->id)->whereBetween('created_at', [$currentMonthStart, $currentMonthEnd])->sum('points');
                $shift_user_deals_added= DealStage::where('added_by',$shift_user->id)->whereBetween('created_at', [$currentMonthStart, $currentMonthEnd])->count();

                $total_points= $user_cashpoints + $shift_user_points; 
                $total_deals= $user_deals_added+ $shift_user_deals_added;
                if($goal->entryType =='Won')
                {
                    if ($total_points != 0) {
                        $user_contribution = ($user_cashpoints*100)/$total_points;
                    }else 
                    {
                        $user_contribution = 0; 
                    }

                }else 
                {
                    if ($total_deals != 0) {
                        $user_contribution = ($user_deals_added*100)/$total_deals;
                    }else 
                    {
                        $user_contribution = 0; 
                    }

                }
               
                
                $distribute_amount = $goal->achievablePoints*($user_contribution/100);
                $user_last_point = CashPoint::where('user_id',$user_name->id)->where('points','>',0)->orderBy('id','desc')->first();
                //dd($user_last_point);

                $point= new CashPoint();
                $point->user_id= $user_name->id;
                // $point->project_id= $deal->id;
                $point->activity= $user_name->name . ' For achieving '.$goal->frequency.' Goal '.$goal->title;
                $point->bonus_type= "Bonus";
                $point->gained_as = "Individual";
                $point->points= $distribute_amount;

                if ($user_last_point != null) {
                    $point->total_points_earn= $user_last_point->total_points_earn + $distribute_amount;
                } else {
                    $point->total_points_earn=  $distribute_amount;
                }
                $point->created_at = $goal->endDate;

                $point->save();
            }

            $update_goal= GoalSetting::find($goal->id);
            $update_goal->goal_progress = 1;
            $update_goal->save();

           
    }

    $this->info('Bonus Distributed Successfully');
}
}
