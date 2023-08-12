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
        Schema::create('pm_blog_articles', function (Blueprint $table) {
            $table->id();
            $table->integer('deal_id');
            $table->integer('milestone_id');
            $table->integer('sales_blog_article_id');
            $table->string('website_link')->nullable();
            $table->string('website_niche')->nullable();
            $table->string('website_name')->nullable();
            $table->string('business_information')->nullable();
            $table->integer('share_file_info')->nullable();
            $table->string('folder_link')->nullable();
            $table->string('blog_url')->nullable();
            $table->string('product_no')->nullable();
            $table->integer('topic_info')->nullable();
            $table->string('topic_link')->nullable();
            $table->integer('keyword_info')->nullable();
            $table->string('keyword_link')->nullable();
            $table->string('word_appropriate')->nullable();
            $table->string('word_client_initially')->nullable();
            $table->integer('additional_word')->default(0);
            $table->integer('layout_content')->default(0);
            $table->string('theme_link')->nullable();
            $table->string('page_name')->nullable();
            $table->string('quantity')->nullable();
            $table->string('approximate_word')->nullable();
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
        Schema::dropIfExists('pm_blog_articles');
    }
};
