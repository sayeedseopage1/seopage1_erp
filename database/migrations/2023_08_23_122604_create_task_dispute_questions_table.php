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
        Schema::create('task_dispute_questions', function (Blueprint $table) {
            $table->id();
            $table->integer('dispute_id');
            $table->integer('raised_by');
            $table->integer('question_for');
            $table->integer('replied_by')->nullable();
            $table->longText('question');
            $table->longText('replies')->nullable();
            $table->date('replied_date');
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
        Schema::dropIfExists('task_dispute_questions');
    }
};
