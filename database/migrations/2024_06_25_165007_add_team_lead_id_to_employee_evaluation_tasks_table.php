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
        Schema::table('employee_evaluation_tasks', function (Blueprint $table) {
            $table->integer('team_lead_id')->nullable()->after('lead_dev_id');
            $table->longText('team_lead_cmnt')->nullable()->after('lead_dev_cmnt');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('employee_evaluation_tasks', function (Blueprint $table) {
            $table->dropColumn('team_lead_id');
            $table->dropColumn('team_lead_cmnt');
        });
    }
};
