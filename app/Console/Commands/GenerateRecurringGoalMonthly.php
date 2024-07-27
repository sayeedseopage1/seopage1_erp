<?php

namespace App\Console\Commands;

use App\Models\GoalSetting;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class GenerateRecurringGoalMonthly extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'generate-recurring-goal:monthly';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $start_date = Carbon::now()->subMonths(0)->startOfMonth();
        $end_date = Carbon::now()->subMonths(0)->endOfMonth();
        
        try {
            DB::beginTransaction();
            $recurring_goals = GoalSetting::whereBetween('startDate', [$start_date, $end_date])->whereBetween('endDate', [$start_date, $end_date])->where('is_monthly_auto_recurring', 1)->get();
            foreach($recurring_goals as $goal){
                $new_goal = new GoalSetting();
                $new_goal->entry = $goal->entry;
                $new_goal->entryType = $goal->entryType;
                $new_goal->assigneeType = $goal->assigneeType;
                $new_goal->user_id = $goal->user_id;
                $new_goal->name = $goal->name;
                $new_goal->team_id = $goal->team_id;
                $new_goal->team_name = $goal->team_name;
                $new_goal->pipeline = $goal->pipeline;
                $new_goal->frequency = $goal->frequency;
                $new_goal->startDate = Carbon::now()->startOfMonth();
                $new_goal->endDate = Carbon::now()->endOfMonth();
                $new_goal->trackingType = $goal->trackingType;
                $new_goal->trackingValue = $goal->trackingValue;
                $new_goal->applyRecurring = $goal->applyRecurring;
                $new_goal->qualified = $goal->qualified;
                $new_goal->dealType = $goal->dealType;
                $new_goal->goalType = $goal->goalType;
                $new_goal->achievablePoints = $goal->achievablePoints;
                $new_goal->added_by = $goal->added_by;
                $new_goal->active_table_columns = $goal->active_table_columns;
                $new_goal->title = $goal->title;
                $new_goal->goal_status = $goal->goal_status;
                $new_goal->goal_progress = $goal->goal_progress;
                $new_goal->general_checkbox = $goal->general_checkbox;
                $new_goal->is_monthly_auto_recurring = $goal->is_monthly_auto_recurring;
                $new_goal->is_private = 1;
                $new_goal->save();
            }
            DB::commit();
        } catch (\Throwable $th) {
            //throw $th;
            DB::rollBack();
        }
    }
}
