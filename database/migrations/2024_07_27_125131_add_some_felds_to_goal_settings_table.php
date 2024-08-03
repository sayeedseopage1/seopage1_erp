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
        Schema::table('goal_settings', function (Blueprint $table) {
            $table->unsignedTinyInteger('is_monthly_auto_recurring')->default(0)->after('general_checkbox');
            $table->unsignedTinyInteger('is_private')->nullable()->after('is_monthly_auto_recurring');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('goal_settings', function (Blueprint $table) {
            $table->dropColumn(['is_monthly_auto_recurring','is_private']);
        });
    }
};
