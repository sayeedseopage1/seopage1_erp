<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Factor;
use App\Models\Project;
use Illuminate\Console\Command;
use App\Helper\ProjectManagerPointLogic;

class ProjectCompletionMonthly extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'project-completion:monthly';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Project manager get some point by calculating project completion';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $minLimit = Factor::where('criteria_id', 9)->where('status', 1)->first()->lower_limit;
        $users = User::where('role_id',4)->get();
        foreach($users as $user){
            $referenceProjectId = Project::whereHas('deal', function($deal){
                return $deal->where('project_type', 'fixed');
            })
            ->where('pm_id', $user->id)
            ->whereIn('status', ['finished', 'partially finished'])
            ->whereBetween('updated_at', [Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()])->orderBy('id', 'desc')->first()->id;

            $project = Project::whereHas('deal', function($deal){
                return $deal->where('project_type', 'fixed');
            })
            ->where('pm_id', $user->id)
            ->whereIn('status', ['finished', 'partially finished'])
            ->whereBetween('updated_at', [Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()]);

            $today = Carbon::now();
            $startOfMonth = $today->copy()->startOfMonth();
            $endOfMonth = $today->copy()->endOfMonth();

            $sevenDaySlotStart = $startOfMonth->copy();
            $sevenDaySlotEnd = $startOfMonth->copy()->addDays(11);
            
            $maxProjectCount = 0;

            while ($sevenDaySlotEnd->lte($endOfMonth)) { 
                $count = $project->whereBetween('project_completion_time', [$sevenDaySlotStart->startOfDay(), $sevenDaySlotEnd->endOfDay()])
                ->count();
                $maxProjectCount = $maxProjectCount < $count ? $count : $maxProjectCount;
                $sevenDaySlotStart->addDay();
                $sevenDaySlotEnd->addDay();
            }
            
            if($maxProjectCount >= $minLimit){
                // Project Manager Point Distribution ( Project completion )
                ProjectManagerPointLogic::distribute(9, $referenceProjectId, $maxProjectCount);
            }else{
                $project = Project::whereHas('deal', function($deal){
                    return $deal->where('project_type', 'fixed');
                })
                ->where('pm_id', $user->id)
                ->whereIn('status', ['finished', 'partially finished'])
                ->whereBetween('updated_at', [Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()]);
                
                $twelveDaySlotStart = $startOfMonth->copy();
                $twelveDaySlotEnd = $startOfMonth->copy()->addDays(12);
                
                $maxProjectCount = 0;

                while ($twelveDaySlotEnd->lte($endOfMonth)) { 
                    $count = $project->whereBetween('project_completion_time', [$twelveDaySlotStart->startOfDay(), $twelveDaySlotEnd->endOfDay()])
                    ->count();
                    $maxProjectCount = $maxProjectCount < $count ? $count : $maxProjectCount;
                    $twelveDaySlotStart->addDay();
                    $twelveDaySlotEnd->addDay();
                }

                // Project Manager Point Distribution ( Project completion )
                ProjectManagerPointLogic::distribute(10, $referenceProjectId, $maxProjectCount);
            }
        }
    }
}
