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
            $table->foreignId('deal_stage_id')->nullable()->constrained();
            $table->foreignId('project_cms_id')->nullable()->constrained();
            $table->foreignId('project_niche_id')->nullable()->constrained();
            $table->unsignedTinyInteger('no_of_primary_pages')->default(0);
            $table->unsignedTinyInteger('no_of_secondary_pages')->default(0);
            $table->unsignedTinyInteger('no_of_major_functionalities')->nullable();
            $table->decimal('risk_factor')->nullable();
            $table->decimal('total_hours_of_others_works')->nullable();
            $table->foreignId('currency_id')->nullable()->constrained();
            $table->unsignedTinyInteger('deadline_type')->default(1)->comment('1 = Flexible, 2 = Fixed');
            $table->timestamp('deadline')->nullable();
            $table->foreignId('platform_account_id')->nullable()->constrained();
            $table->decimal('calculated_budget')->default(0);
            $table->decimal('project_budget');
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
