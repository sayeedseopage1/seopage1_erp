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
            $table->string('random_id');
            $table->integer('milestone_id');
            $table->string('client_link')->nullable();
            $table->string('service_type')->nullable();
            $table->string('website_link')->nullable();
            $table->string('website_niche')->nullable();
            $table->string('website_name')->nullable();
            $table->text('business_information')->nullable();
            $table->integer('share_file_info')->default(0);
            $table->string('folder_link')->nullable();
            $table->string('reference_website')->nullable();
            $table->integer('competitor_content')->default(1);
            $table->text('description1')->nullable();
            $table->text('description2')->nullable();
            $table->text('description3')->nullable();
            $table->string('product_list')->nullable();
            $table->string('page_name')->nullable();
            $table->string('quantity')->nullable();
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
        Schema::dropIfExists('web_contents');
    }
};
