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
        Schema::create('p_m_task_guideline_authorizations', function (Blueprint $table) {
            $table->id();
            $table->integer('task_guideline_id');
            $table->integer('project_id');
            $table->string('name');
            $table->string('slug');
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
        Schema::dropIfExists('p_m_task_guideline_authorizations');
    }
};
