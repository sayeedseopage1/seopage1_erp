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
        Schema::create('project_pm_goals', function (Blueprint $table) {
            $table->id();
            $table->integer('project_id');
            $table->integer('client_id');
            $table->integer('pm_id');
            $table->string('project_category');
            $table->string('project_type');
            $table->double('project_budget');
            $table->string('no_of_goal');
            $table->date('start_date');
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
        Schema::dropIfExists('project_pm_goals');
    }
};
