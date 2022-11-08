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
        Schema::create('sales_counts', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->string('leads_count')->default(0);
            $table->string('deals_count')->default(0);
            $table->string('won_deals')->default(0);
            $table->date('previous_lead_date')->nullable();
            $table->date('last_lead_date')->nullable();
            $table->string('lead_value')->nullable();
            $table->string('deal_value')->nullable();
            $table->string('wrong_deals')->default(0);
            $table->string('lost_deals')->default(0);
            $table->string('negotiation_started')->default(0);
            $table->string('avg_lead_time')->nullable();
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
        Schema::dropIfExists('sales_counts');
    }
};
