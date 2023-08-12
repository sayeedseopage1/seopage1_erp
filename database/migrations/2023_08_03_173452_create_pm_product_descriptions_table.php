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
        Schema::create('pm_product_descriptions', function (Blueprint $table) {
            $table->id();
            $table->integer('sales_product_description_id');
            $table->integer('deal_id');
            $table->integer('milestone_id');
            $table->string('word_appropriate')->nullable();
            $table->string('word_client_initially')->nullable();
            $table->string('website_link')->nullable();
            $table->string('website_niche')->nullable();
            $table->integer('website_name')->nullable();
            $table->string('business_information')->nullable();
            $table->integer('additional_word')->default(0);
            $table->integer('layout_content')->default(0);
            $table->integer('share_file_info')->nullable();
            $table->string('folder_link')->nullable();
            $table->string('blog_url')->nullable();
            $table->string('product_list')->nullable();
            $table->string('theme_link')->nullable();
            $table->string('page_name')->nullable();
            $table->string('quantity')->nullable();
            $table->string('approximate_word')->nullable();
            $table->string('product_no')->nullable();
            $table->string('word_count')->nullable();
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
        Schema::dropIfExists('pm_product_descriptions');
    }
};
