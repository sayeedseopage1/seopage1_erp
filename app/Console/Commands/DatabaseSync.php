<?php

namespace App\Console\Commands;

use App\Models\Deal;
use App\Models\PolicyQuestionValue;
use App\Models\SalesPolicyQuestion;
use Carbon\Carbon;
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
            DB::statement("ALTER TABLE `projects`
	        CHANGE COLUMN `goal_creation_time_type` `goal_creation_time_type`  
            TINYINT(3) NOT NULL DEFAULT '2' 
            COMMENT ' 1-Award Time, 2-Submission Time, 3-Authorization Time, 4-Project Accept Time, 5-Deadline Extension Request Time,' 
            AFTER `new_deadline`;
            ");

            $this->info('Database sync ends successfully.');

            return Command::SUCCESS;
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
