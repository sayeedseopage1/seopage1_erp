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
            $table->integer('theme_details');
            $table->string('theme_name')->nullable();
            $table->string('theme_url')->nullable();
            $table->string('design');
            $table->string('xd_url')->nullable();
            $table->string('drive_url')->nullable();
            $table->string('reference_link')->nullable();
            $table->text('instruction')->nullable();
            $table->string('color');
            $table->text('color_description');
            $table->integer('plugin_research');
            $table->string('plugin_name')->nullable();
            $table->string('plugin_url')->nullable();
            $table->integer('color_schema')->nullable();
            $table->text('instruction_plugin')->nullable();
            $table->string('google_drive_link')->nullable();
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
