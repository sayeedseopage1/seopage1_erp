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
            $table->string('random_id');
            $table->integer('milestone_id');
            $table->string('client_link')->nullable();
            $table->string('service_type')->nullable();
            $table->string('website_link')->nullable();
            $table->string('website_niche')->nullable();
            $table->string('website_name')->nullable();
            $table->string('business_information')->nullable();
            $table->integer('share_file_info')->default(0);
            $table->string('folder_link')->nullable();
            $table->string('blog_url')->nullable();
            $table->string('product_no')->nullable();
            $table->string('product_list')->nullable();
            $table->string('word_count')->nullable();
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
        Schema::dropIfExists('product_descriptions');
    }
};
