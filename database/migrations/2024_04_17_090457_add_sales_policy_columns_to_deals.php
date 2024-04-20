<?php

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
        /* TODO: this code will be removed */
        Schema::table('deals', function (Blueprint $table) {
            if(Schema::hasColumn('deals', 'authorize_by')) {
                $table->dropColumn('authorize_by');
            }
            if(Schema::hasColumn('deals', 'authorize_on')) {
                $table->dropColumn('authorize_on');
            }
        });
        /*  end */

        Schema::table('deals', function (Blueprint $table) {
            $table->enum('sale_analysis_status', ['pending', 'analysis', 'authorized', 'auto-authorized', 'denied'])->default('pending')->after('authorization_status');
            $table->bigInteger('sale_authorize_by')->nullable()->after('sale_analysis_status');
            $table->dateTime('sale_authorize_on')->nullable()->after('sale_authorize_by');
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
