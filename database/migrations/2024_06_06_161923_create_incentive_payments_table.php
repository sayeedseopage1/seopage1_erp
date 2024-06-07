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
        Schema::create('incentive_payments', function (Blueprint $table) {
            $table->id();
            $table->timestamp('date');
            $table->foreignId('user_id')->nullable();
            $table->decimal('total_incentive_amount')->default(0);
            $table->decimal('held_amount')->default(0)->comment('20% of total incentive amount');
            $table->decimal('payable_amount')->default(0)->comment('80% of total incentive amount');
            $table->decimal('paid_amount')->default(0);
            $table->unsignedTinyInteger('status')->default(0)->comment('0 = Pending, 1 = Payable paid, 2 = Payable & held amount paid');
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
        Schema::dropIfExists('incentive_payments');
    }
};
