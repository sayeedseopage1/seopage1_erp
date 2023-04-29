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
        Schema::create('kpi_settings', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('the_bidder')->default(0);
            $table->bigInteger('qualify')->default(0);
            $table->bigInteger('requirements_defined')->default(0);
            $table->bigInteger('less_than')->default(0);
            $table->bigInteger('less_than_get')->default(0);
            $table->bigInteger('more_than')->default(0);
            $table->bigInteger('more_than_get')->default(0);
            $table->bigInteger('proposal_made')->default(0);
            $table->bigInteger('negotiation_started')->default(0);
            $table->bigInteger('milestone_breakdown')->default(0);
            $table->bigInteger('closed_deal')->default(0);
            $table->bigInteger('contact_form')->default(0);
            $table->bigInteger('authorized_by_leader')->default(0);
            // $table->bigInteger('the_bidder')->default(0);
            // $table->bigInteger('the_bidder')->default(0);
            // $table->bigInteger('the_bidder')->default(0);
            // $table->bigInteger('the_bidder')->default(0);
            // $table->bigInteger('the_bidder')->default(0);

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
        Schema::dropIfExists('kpi_settings');
    }
};
