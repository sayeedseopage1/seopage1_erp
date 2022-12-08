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
        Schema::create('project_deliverables', function (Blueprint $table) {
            $table->id();
            $table->integer('project_id');
            $table->string('deliverable_type');
            $table->string('title')->nullable();
            $table->string('description')->nullable();
            $table->string('quantity')->nullable();
            $table->string('from')->nullalble();
            $table->string('to')->nullable();
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
        Schema::dropIfExists('project_deliverables');
    }
};
