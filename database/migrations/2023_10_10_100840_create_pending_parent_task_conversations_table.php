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
        Schema::create('pending_parent_task_conversations', function (Blueprint $table) {
            $table->id();
            $table->integer('pending_parent_task_id');
            $table->string('question');
            $table->string('answer')->nullable();
            $table->integer('created_by')->nullable();
            $table->integer('replied_by')->nullable();
            $table->date('replied_date')->nullable();
            $table->date('created_date')->nullable();
            $table->boolean('has_update')->default(false);
            $table->boolean('seen')->default(false);
            $table->date('seen_date')->nullable();
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
        Schema::dropIfExists('pending_parent_task_conversations');
    }
};
