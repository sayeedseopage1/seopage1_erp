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
        Schema::create('incentive_payment_histories', function (Blueprint $table) {
            $table->id();
            $table->timestamp('date');
            $table->foreignId('user_id')->nullable();
            $table->foreignId('incentive_payment_id');
            $table->unsignedTinyInteger('type')->default(0)->comment('1 = Payable, 2 = Held');
            $table->decimal('paid_amount')->default(0);
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
        Schema::dropIfExists('incentive_payment_histories');
    }
};
