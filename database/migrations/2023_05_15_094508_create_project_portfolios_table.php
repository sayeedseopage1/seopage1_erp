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
        Schema::create('project_portfolios', function (Blueprint $table) {
            $table->id();
            $table->integer('project_id');
            $table->integer('cms_category')->nullable();
            $table->integer('website_type')->nullable();
            $table->integer('niche')->nullable();
            $table->integer('sub_niche')->nullable();
            $table->bigInteger('theme_id')->unsigned();
            $table->tinyInteger('plugin_information')->default(0);
            $table->json('plugin_list')->nullable();
            $table->string('main_page_number')->nullable();
            $table->string('main_page_name')->nullable();
            $table->string('secondary_page_number')->nullable();
            $table->string('secondary_page_name')->nullable();
            $table->string('backup_email_address')->nullable();
            $table->string('day_interval')->nullable();
            $table->longText('description')->nullable();
            $table->text('portfolio_link')->nullable();
            $table->integer('added_by')->nullable();
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
        Schema::dropIfExists('project_portfolios');
    }
};
