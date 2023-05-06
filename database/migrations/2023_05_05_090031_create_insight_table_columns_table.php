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
        Schema::create('insight_table_columns', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->string('column_priority');
            $table->string('column_status');
            $table->integer('goal_id')->nullable();
            $table->integer('report_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('insight_table_columns');
    }
};
