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
        Schema::create('software_projects', function (Blueprint $table) {
            $table->id();
            $table->string('project_name')->nullable();
            $table->string('project_short_code')->nullable();
            $table->longText('project_summary')->nullable();
            $table->date('start_date')->nulalble();
            $table->date('deadline')->nullable();
            $table->integer('added_by')->nullable();
            $table->integer('last_updated_by')->nulalble();
            $table->integer('category_id')->nulalble();
            $table->integer('team_id')->nullable();
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
        Schema::dropIfExists('software_projects');
    }
};
