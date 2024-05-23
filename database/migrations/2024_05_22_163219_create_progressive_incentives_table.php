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
        Schema::create('progressive_incentives', function (Blueprint $table) {
            $table->id();
            $table->timestamp('date')->nullable();
            $table->unsignedBigInteger('pm_id');
            $table->foreignId('incentive_factor_id')->nullable()->constrained();
            $table->unsignedTinyInteger('incentive_amount_type')->nullable()->comment('1 = Static, 2 = Percentage');
            $table->decimal('incentive_amount')->default(0);
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
        Schema::dropIfExists('progressive_incentives');
    }
};
