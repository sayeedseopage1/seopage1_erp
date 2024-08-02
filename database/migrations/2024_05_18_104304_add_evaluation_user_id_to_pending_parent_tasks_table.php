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
        Schema::table('pending_parent_tasks', function (Blueprint $table) {
            $table->bigInteger('evaluation_user_id')->nullable()->after('client_name');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('pending_parent_tasks', function (Blueprint $table) {
            $table->dropColumn('evaluation_user_id');
        });
    }
};
