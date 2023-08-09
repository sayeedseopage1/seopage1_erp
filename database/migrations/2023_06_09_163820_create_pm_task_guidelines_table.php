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
        Schema::create('pm_task_guidelines', function (Blueprint $table) {
            $table->id();
            $table->integer('project_id');
            $table->integer('theme_details')->nullable();
            $table->integer('design_details')->nullable();
            $table->string('theme_name')->nullable();
            $table->string('theme_url')->nullable();
            $table->string('design')->nullable();
            $table->string('xd_url')->nullable();
            $table->string('drive_url')->nullable();
            $table->string('reference_link')->nullable();
            $table->text('instruction')->nullable();
            $table->integer('color_schema')->nullable();
            $table->string('primary_color')->nullable();
            $table->text('primary_color_description')->nullable();
            $table->string('color')->nullable();
            $table->text('color_description')->nullable();
            $table->integer('plugin_research')->nullable();
            $table->string('plugin_name')->nullable();
            $table->string('plugin_url')->nullable();
            $table->text('instruction_plugin')->nullable();
            $table->string('google_drive_link')->nullable();
            $table->integer('status')->default(0);

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
        Schema::dropIfExists('pm_task_guidelines');
    }
};
