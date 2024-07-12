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
        Schema::create('price_quotations', function (Blueprint $table) {
            $table->id();
            $table->string('serial_no')->nullable();
            $table->foreignId('deal_stage_id')->nullable()->constrained();
            $table->foreignId('project_cms_id')->nullable()->constrained();
            $table->foreignId('project_niche_id')->nullable()->constrained();
            $table->unsignedTinyInteger('no_of_primary_pages')->default(0);
            $table->unsignedTinyInteger('no_of_secondary_pages')->default(0);
            $table->unsignedTinyInteger('no_of_major_functionalities')->nullable();
            $table->decimal('risk_factor')->nullable();
            $table->decimal('total_hours_of_primary_page')->nullable();
            $table->decimal('total_hours_of_secondary_page')->nullable();
            $table->decimal('total_hours_of_major_functionality')->nullable();
            $table->decimal('total_hours_of_others_works')->nullable();
            $table->decimal('total_calculated_hours')->nullable();
            $table->unsignedBigInteger('currency_id')->nullable();
            $table->unsignedTinyInteger('deadline_type')->default(1)->comment('1 = Flexible, 2 = Fixed');
            $table->decimal('no_of_days')->nullable();
            $table->foreignId('platform_account_id')->nullable()->constrained();
            $table->decimal('calculated_actual_budget')->default(0);
            $table->decimal('calculated_usd_budget')->default(0);
            $table->decimal('project_budget')->nullable();
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
        Schema::dropIfExists('price_quotations');
    }
};
