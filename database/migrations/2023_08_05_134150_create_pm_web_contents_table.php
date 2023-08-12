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
        Schema::create('pm_web_contents', function (Blueprint $table) {
            $table->id();
            $table->integer('sales_web_content_id');
            $table->integer('deal_id');
            $table->integer('milestone_id');
            $table->string('website_link')->nullable();
            $table->string('website_niche')->nullable();
            $table->string('website_name')->nullable();
            $table->text('business_information')->nullable();
            $table->integer('share_file')->default(0);
            $table->string('folder_link')->nullable();
            $table->string('reference_website')->nullable();
            $table->integer('competitor_content')->default(1);
            $table->text('description1')->nullable();
            $table->text('description2')->nullable();
            $table->text('description3')->nullable();
            $table->string('product_list')->nullable();
            $table->string('page_name1')->nullable();
            $table->string('quantity1')->nullable();
            $table->string('approximate_word')->nullable();
            $table->string('gender')->nullable();
            $table->string('age1')->nullable();
            $table->string('age2')->nullable();
            $table->string('monthly_income')->nullable();
            $table->string('education_level')->nullable();
            $table->string('country')->nullable();
            $table->string('city')->nullable();
            $table->text('interest')->nullable();
            $table->text('buying_habit1')->nullable();
            $table->text('buying_habit2')->nullable();
            $table->text('buying_habit3')->nullable();
            $table->string('language')->nullable();
            $table->string('word_appropriate')->nullable();
            $table->string('word_client_initially')->nullable();
            $table->integer('additional_word')->default(0);
            $table->integer('layout_content')->default(0);
            $table->string('theme_link')->nullable();
            $table->string('pm_page_name')->nullable();
            $table->string('pm_quantity')->nullable();
            $table->string('pm_approximate_word')->nullable();
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
        Schema::dropIfExists('pm_web_contents');
    }
};
