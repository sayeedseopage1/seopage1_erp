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
            $table->integer('user_id');
            $table->float('point_earned');
            $table->float('incentive_earned');
            $table->float('redeem_point')->nullable();
            $table->integer('achieve_goal')->nullable();
            $table->date('month');
            $table->enum('status', [0, 1])->default(0);
            $table->float('deduction_amount')->default(0);
            $table->float('deduction_incentive_amount')->defualt(0);
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
