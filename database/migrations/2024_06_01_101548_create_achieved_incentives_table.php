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
        Schema::create('achieved_incentives', function (Blueprint $table) {
            $table->id();
            $table->timestamp('date');
            $table->unsignedBigInteger('user_id')->comment('Here user_id used as pm_id but the field can be used for another user also');
            $table->foreignId('incentive_type_id')->nullable()->constrained();
            $table->decimal('acquired_points')->default(0)->comment('Here the fields can be used to store any amount instead of points');
            $table->decimal('incentive_point')->default(0);
            $table->decimal('cash_value')->default(0);
            $table->decimal('total_cash_amount')->default(0)->comment('total_cash_value = incentive_point * cash_value');
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
        Schema::dropIfExists('achieved_incentives');
    }
};
