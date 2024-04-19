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
        Schema::create('policy_point_histories', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('deal_id');
            $table->text('policy');
            $table->float('points', 8,2)->comment('actual gained points after calculation');
            $table->text('point_report');
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
        Schema::dropIfExists('policy_point_histories');
    }
};
