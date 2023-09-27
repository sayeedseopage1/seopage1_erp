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
        Schema::create('daily_submissions', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->integer('task_id');
            $table->string('task_heading');
            $table->string('link_name');
            $table->string('attachments')->nullable();
            $table->integer('project_id');
            $table->integer('hours_spent');
            $table->longText('comment');
            $table->string('client_name');
            $table->text('section_name');
            $table->integer('client_id');
            $table->boolean('mark_as_complete')->default(0);
            $table->boolean('status')->default(0);
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
        Schema::dropIfExists('daily_submissions');
    }
};
