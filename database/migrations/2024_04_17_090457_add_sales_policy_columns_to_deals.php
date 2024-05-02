<?php

use App\Models\Deal;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
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
        Schema::table('deals', function (Blueprint $table) {
            $table->enum('sale_analysis_status', Deal::$saleAnalysisStatus)->default('pending')->after('authorization_status');
            $table->bigInteger('sale_authorize_by')->nullable()->after('sale_analysis_status');
            $table->dateTime('sale_authorize_on')->nullable()->after('sale_authorize_by');
            $table->tinyText('sale_authorize_comment')->nullable()->after('sale_authorize_on');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('deals', function (Blueprint $table) {
            $table->dropColumn('sale_analysis_status', 'sale_authorize_by', 'sale_authorize_on');
        });
    }
};
