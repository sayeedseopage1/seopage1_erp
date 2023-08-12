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
        Schema::create('sales_blog_articles', function (Blueprint $table) {
            $table->id();
            $table->integer('deal_id');
            $table->integer('blog_article_id');
            $table->integer('milestone_id');
            $table->string('website_link')->nullable();
            $table->string('website_niche')->nullable();
            $table->string('website_name')->nullable();
            $table->string('business_information')->nullable();
            $table->integer('share_file_info')->default(0);
            $table->string('folder_link')->nullable();
            $table->string('blog_url')->nullable();
            $table->string('product_no')->nullable();
            $table->string('topic_info')->default(1);
            $table->string('topic_link')->nullable();
            $table->string('keyword_info')->default(1);
            $table->string('keyword_link')->nullable();
            $table->enum('status',['pending','submitted'])->default('pending');
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
        Schema::dropIfExists('sales_blog_articles');
    }
};
