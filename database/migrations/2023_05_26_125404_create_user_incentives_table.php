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
        Schema::create('user_incentives', function (Blueprint $table) {
            $table->id();
            $table->date('month');
            $table->integer('user_id');
            $table->float('non_incentive_points');
            $table->float('shift_achieved_points');
            $table->float('shift_incentive_achievable_point');
            $table->float('contribution');
            $table->float('user_achieved_points');
            $table->float('amount_before_deduction');
            $table->float('user_deducted_points');
            $table->float('user_point_after_deduction');
            $table->float('amount_after_deduction');
            $table->float('deducted_incentive_amount');
            $table->float('incentive_amount_after_20_percent_held');
            $table->float('incentive_held_amount');
            $table->float('final_payable_incentive_amount');
            $table->integer('minimum_shift_goals');
            $table->integer('minimum_shift_goals_achieved');
            $table->integer('milestone_goals');
            $table->integer('milestone_goals_achieved');
            $table->integer('team_goal');
            $table->integer('total_team_goal_achieved');
            $table->float('total_goals');
            $table->float('total_goals_achieved');
            $table->enum('status', [0, 1])->default(0);
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
        Schema::dropIfExists('user_incentives');
    }
};
