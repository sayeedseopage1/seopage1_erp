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
        Schema::table('pending_actions', function (Blueprint $table) {
            $table->integer('sticky_note_id')->nullable()->after('portfolio_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('pending_actions', function (Blueprint $table) {
            $table->dropColumn('sticky_note_id');
        });
    }
};
