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
        Schema::create('blog_articles', function (Blueprint $table) {
            $table->id();
            $table->string('website_link');
            $table->string('website_niche');
            $table->string('website_name');
            $table->string('business_information');
            $table->integer('share_file_info')->default(0);
            $table->string('folder_link');
            $table->string('blog_url');
            $table->string('topic_info')->default(1);
            $table->string('topic_link');
            $table->string('keyword_info')->default(1);
            $table->string('keyword_link');
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
        Schema::dropIfExists('blog_articles');
    }
};
