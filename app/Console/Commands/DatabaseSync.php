<?php

namespace App\Console\Commands;

use App\Models\Deal;
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

        Schema::table('sales_policy_questions',function(Blueprint $table){
            $table->string('title',300)->change();
        });

        DB::statement("ALTER TABLE `deals` CHANGE COLUMN `sale_analysis_status` `sale_analysis_status` ENUM('previous-won','previous-denied','pending','analysis','authorized','auto-authorized','denied') NOT NULL DEFAULT 'pending' AFTER `authorization_status`;
        ");

        return Command::SUCCESS;
    }
}
