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
        $table = 'sales_risk_policies';
        $columns = DB::select(DB::raw("SELECT COLUMN_NAME, DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_SCHEMA = '" . env('DB_DATABASE') . "' AND TABLE_NAME = '$table'"));
        foreach ($columns as $column) {
            if ($column->COLUMN_NAME == "key" && $column->DATA_TYPE != 'varchar') {
                echo "\nChanging key column string in $table";
                Schema::table($table, function (Blueprint $table) {
                    $table->string('key')->nullable()->change();
                });
                echo "\nend";
            }
        }

        $table = 'sales_policy_questions';
        $columns = DB::select(DB::raw("SELECT COLUMN_NAME, DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_SCHEMA = '" . env('DB_DATABASE') . "' AND TABLE_NAME = '$table'"));
        foreach ($columns as $column) {
            if ($column->COLUMN_NAME == "key" && $column->DATA_TYPE != 'varchar') {
                echo "\nChanging key column string in $table";
                Schema::table($table, function (Blueprint $table) {
                    $table->string('key')->change();
                });
                echo "\nend";
            }
        }

        $columns = DB::select(DB::raw("SHOW COLUMNS FROM `$table`"));
        foreach ($columns as $column) {
            if ($column->Field == "title") {
                $length = preg_replace('/[^0-9]/', '', $column->Type);
                if ($length != 1000) {
                    echo "Changing title column length in $table";
                    Schema::table($table, function (Blueprint $table) {
                        $table->string('title', 1000)->change();
                    });
                    echo "\nend";
                }
                break;
            }
        }

        // echo "\nChanging sale_analysis_status column enum list in $table";
        // DB::statement("ALTER TABLE `deals` CHANGE COLUMN `sale_analysis_status`
        // `sale_analysis_status` ENUM('previous-won','previous-denied','pending','analysis','authorized','auto-authorized','denied')
        // NOT NULL DEFAULT 'pending'
        // AFTER `authorization_status`;
        // ");
        // echo "\nend";
        $table = 'deals';
        if (!Schema::hasColumn($table, 'sale_authorize_comment')) {
            echo "\nChanging sale_authorize_comment column in $table";
            Schema::table('deals', function (Blueprint $table) {
                $table->tinyText('sale_authorize_comment')->nullable()->after('sale_authorize_on');
            });
            echo "\nend";
        }

        $temp = 0;
        $salesTableCreateDate = DB::table('migrations')->where('migration', '2024_03_04_151733_create_sales_risk_policies_table')->first() ?: (object)['created_at' => '2024-04-24 00:00:00'];
        Deal::whereDate('created_at', '<', Carbon::parse($salesTableCreateDate->created_at)->format('Y-m-d'))->get()->each(function ($item) use (&$temp) {
            if (! in_array($item->status, ['Accepted', 'Denied']) ) {
                if ($item->status == 'Accepted') $item->sale_analysis_status = 'previous-won';
                else if ($item->status == 'Denied') $item->sale_analysis_status = 'previous-denied';
                $item->save();
                $temp++;
            }
        });

        if ($temp > 0) {
            echo "\nChanging previous sales_risk_policies status. Total: $temp";
            echo "\nend";
        }

        $table = 'policy_question_values';
        if (!Schema::hasColumn($table, 'question_list')) {
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
            if ($item->question_list == null) {
                $item->question_list = json_encode(SalesPolicyQuestion::get());
                $item->save();
            }
        }
        echo "\nend";

        $table = 'policy_question_values';
        if (!Schema::hasColumn($table, 'submitted_by')) {
            echo "\nsubmitted_by column in $table";
            Schema::table($table, function (Blueprint $table) {
                $table->integer('submitted_by')->unsigned()->after('question_list');
                $table->foreign('submitted_by')->on('users')->references('id')->onUpdate('no action')->onDelete('no action');
            });
            echo "\nend";
        }

        PolicyQuestionValue::where('submitted_by', null)->update([
            'submitted_by' => 208
        ]);

        $table = 'deals';
        if (!Schema::hasColumn($table, 'is_final')) {
            echo "\nis_final column in $table";
            Schema::table($table, function (Blueprint $table) {
                $table->boolean('is_final')->default('0')->after('sale_authorize_comment');
            });
            echo "\nend";
        }

        $this->info("\nDatabase sync for sales risk.");
        return Command::SUCCESS;
    }
}
