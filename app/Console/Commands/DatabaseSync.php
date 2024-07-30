<?php

namespace App\Console\Commands;

use App\Models\Deal;
use App\Models\Project;
use Illuminate\Console\Command;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DatabaseSync extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'db:sync';

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
        try {

            // deals - status list update
            $statusList = "'" . implode("','", Deal::$saleAnalysisStatus) . "'";
            DB::statement("ALTER TABLE `deals`
            CHANGE COLUMN `sale_analysis_status` `sale_analysis_status` 
            ENUM(" . $statusList . ") 
            NOT NULL DEFAULT 'pending';");

            // project default goal creation date type set to 2 (released_at)
            Schema::table('projects', function (Blueprint $table) {

                $string = "";
                foreach (Project::$goalCreationTimeType as $key => $value) $string .= " $key-$value,";
                // $table->tinyInteger('goal_creation_time_type')->default('2')->after('new_deadline')->comment($string)->change();
                DB::statement("ALTER TABLE `projects`
	            CHANGE COLUMN `goal_creation_time_type` `goal_creation_time_type` 
                TINYINT(3) NOT NULL DEFAULT '2' 
                COMMENT '$string' AFTER `new_deadline`;
                ");

                $table->comment("
                goal_creation_time_type description:
                1. award time = p_m_projects::project_award_time_platform
                2. sales large form submission time = deals::released_at
                3. sales lead authorization time = deals::authorized_on.
                4. project accept time = projects::project_acceptance_time
                5. when admin authorizes the extension request  = award_time_incresses_request::updated_at
                6. when project manager submits the extension request  = award_time_incresses_request::created_at
                ");
            });

            $this->info('Database sync ends successfully.');

            return Command::SUCCESS;
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
