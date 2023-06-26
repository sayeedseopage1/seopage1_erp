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
        Schema::create('product_descriptions', function (Blueprint $table) {
            $table->id();
            $table->integer('deal_id');
            $table->string('website_link');
            $table->string('website_niche');
            $table->string('website_name');
            $table->string('business_information');
            $table->integer('share_file_info')->default(0);
            $table->string('folder_link')->nullable();
            $table->string('blog_url');
            $table->string('product_no');
            $table->string('product_list');
            $table->string('word_count');
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
        Schema::dropIfExists('product_descriptions');
    }
};
