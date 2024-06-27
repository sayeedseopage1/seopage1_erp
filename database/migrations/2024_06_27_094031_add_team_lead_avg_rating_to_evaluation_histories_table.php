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
        Schema::table('evaluation_histories', function (Blueprint $table) {
            $table->decimal('team_lead_avg_rating')->nullable()->after('lead_dev_avg_rating');
            $table->integer('team_lead_submission_status')->default(0)->after('ld_submission_status');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('evaluation_histories', function (Blueprint $table) {
            //
        });
    }
};
