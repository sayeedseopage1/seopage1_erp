<?php

use App\Models\Deal;
use Carbon\Carbon;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('migrations', function (Blueprint $table) {
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
        });

        $temp = 0;
        $salesTableCreateDate = DB::table('migrations')->where('migration', '2024_03_04_151733_create_sales_risk_policies_table')->first() ?: (object)['created_at' => '2024-06-14 00:00:00'];
        Deal::whereDate('created_at', '<', Carbon::parse($salesTableCreateDate->created_at)->format('Y-m-d'))->get()->each(function ($item) use (&$temp) {
            if (! in_array($item->sale_analysis_status, ['previous-won', 'previous-denied']) ) {
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
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('migrations', function (Blueprint $table) {
            $table->dropColumn('created_at');
        });
    }
};
