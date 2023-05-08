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
        Schema::create('cash_points', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->bigInteger('project_id')->nullable();
            $table->text('activity');
            $table->string('gained_as')->nullable();
            $table->float('points')->default(0);
          
            $table->float('total_points_lost')->default(0);
            $table->float('total_points_earn')->default(0);
            $table->float('total_points_redeem')->default(0);
            $table->float('total_points_void')->default(0);
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
        Schema::dropIfExists('cash_points');
    }
};
