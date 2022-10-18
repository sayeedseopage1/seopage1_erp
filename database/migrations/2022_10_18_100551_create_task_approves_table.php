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
        Schema::create('task_approves', function (Blueprint $table) {
            $table->id();
            $table->integer('task_id');
            $table->string('user_id');
            $table->string('rating')->nullable();
            $table->string('rating2')->nullable();
            $table->string('rating3')->nullable();
            $table->text('comments')->nullable();
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
        Schema::dropIfExists('task_approves');
    }
};
