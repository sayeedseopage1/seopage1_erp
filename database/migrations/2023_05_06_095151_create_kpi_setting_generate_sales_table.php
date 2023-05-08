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
        Schema::create('kpi_setting_generate_sales', function (Blueprint $table) {
            $table->id();
            $table->integer('kpi_id');
            $table->bigInteger('generate_sales_from')->default(0);
            $table->bigInteger('generate_sales_to')->default(0);
            $table->bigInteger('generate_sales_amount')->default(0);
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
        Schema::dropIfExists('kpi_setting_generate_sales');
    }
};
