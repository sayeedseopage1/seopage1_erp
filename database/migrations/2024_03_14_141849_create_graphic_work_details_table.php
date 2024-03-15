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
        Schema::create('graphic_work_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('task_id');
            $table->unsignedTinyInteger('type_of_graphic_work_id');
            $table->string('type_of_logo')->nullable();
            $table->string('brand_name')->nullable();
            $table->string('number_of_versions')->nullable();
            $table->string('file_types_needed')->nullable();
            $table->longText('design_instruction')->nullable();
            $table->string('reference')->nullable();
            $table->string('font_name')->nullable();
            $table->string('font_url')->nullable();
            $table->string('primary_color')->nullable();
            $table->longText('primary_color_description')->nullable();
            $table->text('secondary_colors')->nullable();
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
        Schema::dropIfExists('graphic_work_details');
    }
};
