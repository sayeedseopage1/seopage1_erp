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
        });
    }
};
