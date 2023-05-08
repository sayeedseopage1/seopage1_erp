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
        Schema::create('project_niches', function (Blueprint $table) {
            $table->id();
            $table->string('category_name');
            $table->unsignedBigInteger('sub_category_id')->nullable();
            $table->foreign('sub_category_id')->references('id')->on('project_niches')->onDelete('cascade');
            $table->unsignedBigInteger('parent_category_id')->nullable();
            $table->foreign('parent_category_id')->references('id')->on('project_niches')->onDelete('cascade');
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
        Schema::dropIfExists('project_niches');
    }
};
