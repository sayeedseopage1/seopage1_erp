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
    protected $description = 'generate recurring goal monthly based on is_monthly_auto_recurring status of a goal';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $start_date = Carbon::now()->subMonth()->startOfMonth();
        $end_date = Carbon::now()->subMonth()->endOfMonth();
        
        try {
            DB::beginTransaction();
            $recurring_goals = GoalSetting::whereBetween('startDate', [$start_date, $end_date])->whereBetween('endDate', [$start_date, $end_date])->where('is_monthly_auto_recurring', 1)->get();

            foreach ($recurring_goals as $goal) {
                $new_goal = $goal->replicate([
                    'startDate', 
                    'endDate', 
                    'is_private'
                ]);
                $new_goal->startDate = Carbon::now()->startOfMonth();
                $new_goal->endDate = Carbon::now()->endOfMonth();
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
