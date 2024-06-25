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
        Schema::table('employee_evaluations', function (Blueprint $table) {
            $table->string('user_status')->nullable()->after('team_lead_status');
            $table->integer('team_lead_submission_status')->default(0)->after('user_status');
            $table->decimal('team_lead_avg_rating')->nullable()->after('team_lead_submission_status');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('employee_evaluations', function (Blueprint $table) {
            $table->dropColumn('user_status');
            $table->dropColumn('team_lead_submission_status');
            $table->dropColumn('team_lead_avg_rating');
        });
    }
};
