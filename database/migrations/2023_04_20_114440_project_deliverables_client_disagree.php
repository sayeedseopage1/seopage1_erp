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
        Schema::create('project_deliverables_client_disagree', function (Blueprint $table) {
            $table->id();
            $table->integer('project_id')->nullable();
            // $table->foreign('project_id')->references('id')->on('projects');

            $table->integer('delivarable_id')->nullable();
            // $table->foreign('delivarable_id')->references('id')->on('project_deliverables');

            $table->longText('comment')->nullable();
            $table->longText('old_data')->nullable();
            $table->enum('status', [0, 1])->default(0);
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
        //
    }
};
