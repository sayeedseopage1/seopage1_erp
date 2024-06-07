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
        $users = User::where('role_id',4)->get();
        foreach($users as $user){
            $referenceProjectId = Project::whereHas('deal', function($deal){
                return $deal->where('project_type', 'fixed');
            })
            ->where('pm_id', $user->id)
            ->whereIn('status', ['finished', 'partially finished'])
            ->whereBetween('updated_at', [Carbon::now()->subMonth()->startOfMonth(), Carbon::now()->endOfMonth()])->orderBy('id', 'desc')->where('project_completion_days', '<=', 12)->first()->id ?? null;

            $projectsSevenDays = Project::whereHas('deal', function($deal){
                return $deal->where('project_type', 'fixed');
            })
            ->where('pm_id', $user->id)
            ->whereIn('status', ['finished', 'partially finished'])
            ->whereBetween('updated_at', [Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()])
            ->where('project_completion_days', '<=', 7)->get();

            // Project Manager Point Distribution ( Project completion )
            ProjectManagerPointLogic::distribute(9, $referenceProjectId, $projectsSevenDays->count());
            
            $projectsTwelveDays = Project::whereHas('deal', function($deal){
                return $deal->where('project_type', 'fixed');
            })
            ->where('pm_id', $user->id)
            ->whereIn('status', ['finished', 'partially finished'])
            ->whereBetween('updated_at', [Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()])
            ->where('project_completion_days', '>=', 8)->where('project_completion_days', '<=', 12)->get();

            // Project Manager Point Distribution ( Project completion )
            ProjectManagerPointLogic::distribute(10, $referenceProjectId, $projectsTwelveDays->count());
        }
    }
}
