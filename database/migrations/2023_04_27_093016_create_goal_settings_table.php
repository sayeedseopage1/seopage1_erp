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
        Schema::create('goal_settings', function (Blueprint $table) {
            $table->id();
            $table->string('entry');
            $table->string('entryType');
            $table->string('assigneeType');
            $table->bigInteger('user_id')->nullable();
            $table->string('name')->nullable();
            $table->bigInteger('team_id')->nullable();
            $table->string('team_name')->nullable();
            $table->string('pipeline')->nullable();
            $table->string('frequency');
            $table->date('startDate');
            $table->date('endDate')->nullable();
            $table->string('trackingType');
            $table->string('trackingValue');
            $table->string('applyRecurring')->nullable();
            $table->string('qualified')->nullable();
            $table->string('dealType');
            $table->string('goalType');
            $table->integer('achievablePoints');
            $table->boolean('goal_status')->default(false);
            $table->float('goal_progress')->default(0);
            $table->string('title')->nullable();
            $table->enum('general_checkbox', [0, 1])->default(0);
            $table->integer('added_by');
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
        Schema::dropIfExists('goal_settings');
    }
};
