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
        Schema::create('p_m_projects', function (Blueprint $table) {
            $table->id();
            $table->integer('pm_id');
            $table->integer('project_id');
          
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->enum('status',['pending','approve','rejected'])->default('pending');

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
        Schema::dropIfExists('p_m_projects');
    }
};
