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
        Schema::create('web_contents', function (Blueprint $table) {
            $table->id();
            $table->integer('deal_id');
            $table->string('website_link');
            $table->string('website_niche');
            $table->string('website_name');
            $table->text('business_information');
            $table->integer('share_file_info')->nullable();
            $table->string('folder_link')->nullable();
            $table->string('reference_website')->nullable();
            $table->integer('competitor_content')->nullable();
            $table->text('description1')->nullable();
            $table->text('description2')->nullable();
            $table->text('description3')->nullable();
            $table->string('product_list');
            $table->string('page_name');
            $table->string('quantity');
            $table->string('approximate_word');
            $table->string('gender');
            $table->string('age1');
            $table->string('age2');
            $table->string('monthly_income');
            $table->string('education_level');
            $table->string('country');
            $table->string('city');
            $table->text('interest');
            $table->text('buying_habit1');
            $table->text('buying_habit2');
            $table->text('buying_habit3');
            $table->string('language');
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
        Schema::dropIfExists('web_contents');
    }
};
