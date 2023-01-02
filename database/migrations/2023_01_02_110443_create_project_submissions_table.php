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
        Schema::create('project_submissions', function (Blueprint $table) {
            $table->id();
            $table->integer('milestone_id');
            $table->integer('project_id');
            $table->integer('qc_protocol')->default(0);
            $table->longText('login_info')->nulalble();
            $table->text('google_link')->nullable();
            $table->integer('rating')->default(5);
            $table->integer('requirements')->default(0);
            $table->integer('price')->default(0);
            $table->longText('niche')->nullable();
            $table->text('dummy_link')->nullable();
            $table->integer('notify')->default(0);
            $table->text('actual_link')->nullable();
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
        Schema::dropIfExists('project_submissions');
    }
};
