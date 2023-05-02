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
        Schema::create('task_revisions', function (Blueprint $table) {
            $table->id();
            $table->integer('task_id');
            $table->integer('subtask_id')->nullable();
            $table->longText('comment');
            $table->integer('project_id');
            $table->integer('added_by');
            $table->integer('revision_no')->default(1);
            $table->string('approval_status')->default('pending');
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
        Schema::dropIfExists('task_revisions');
    }
};
