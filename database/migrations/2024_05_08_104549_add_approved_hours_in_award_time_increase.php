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
        Schema::table('award_time_incresses_request', function (Blueprint $table) {
            $table->tinyInteger('approved_hours')->unsigned()->nullable()->after('incress_hours');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('award_time_incresses_request', function (Blueprint $table) {
            $table->dropColumn('approved_hours');
        });
    }
};
