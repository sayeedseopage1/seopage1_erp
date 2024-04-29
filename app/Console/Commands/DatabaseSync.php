<?php

namespace App\Console\Commands;

use App\Models\Deal;
use App\Models\PolicyQuestionValue;
use App\Models\SalesPolicyQuestion;
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

        $table = 'sales_policy_questions';
        echo "Changing title column length in $table";
        Schema::table('sales_policy_questions', function (Blueprint $table) {
            $table->string('title', 300)->change();
        });
        echo "\nend";

        $table = 'deals';
        echo "\nChanging sale_analysis_status column enum list in $table";
        DB::statement("ALTER TABLE `deals` CHANGE COLUMN `sale_analysis_status`
        `sale_analysis_status` ENUM('previous-won','previous-denied','pending','analysis','authorized','auto-authorized','denied')
        NOT NULL DEFAULT 'pending'
        AFTER `authorization_status`;
        ");
        echo "\nend";

        echo "\nChanging previous sales_risk_policies status";
        $salesTableCreateDate = DB::table('migrations')->where('migration', '2024_03_04_151733_create_sales_risk_policies_table')->first() ?: (object)['created_at' => '2024-04-24 00:00:00'];
        Deal::get()->each(function ($item) use($salesTableCreateDate) {
            if (strtotime($item->created_at) < strtotime($salesTableCreateDate->created_at)) {
                if ($item->status == 'Accepted') $item->sale_analysis_status = 'previous-won';
                else if ($item->status == 'Denied') $item->sale_analysis_status = 'previous-denied';

                $item->save();
            }

        });
        echo "\nend";

        $table = 'policy_question_values';
        if(! Schema::hasColumn($table, 'question_list')){
            echo "\nAdding policy_question_values in $table";
            Schema::table($table, function () {
                DB::statement("ALTER TABLE `policy_question_values`
                ADD COLUMN `question_list` TEXT NOT NULL AFTER `values`;");
            });
            echo "\nend";
        }

        // $questionList = PolicyQuestionValue::get() ?? [];
        echo "\nFilling question_list column in $table";
        foreach ((object) PolicyQuestionValue::get() as $item) {
            if(! $item->question_list){
                $item->question_list = json_encode(SalesPolicyQuestion::get());
                $item->save();
            }
        }
        echo "\nend";
        
        return Command::SUCCESS;
    }
}
