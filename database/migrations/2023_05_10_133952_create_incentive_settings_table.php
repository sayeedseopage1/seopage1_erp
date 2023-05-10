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
        Schema::create('incentive_settings', function (Blueprint $table) {
            $table->id();
            $table->float('every_shift_every_point_above')->default(0);
            $table->float('individual_goal_percentage')->default(0);
            $table->float('point_of_value')->default(0);
            $table->float('point_of_contribute')->default(0);
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
        Schema::dropIfExists('incentive_settings');
    }
};
