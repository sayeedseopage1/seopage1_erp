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
        Schema::create('task_revision_disputes', function (Blueprint $table) {
            $table->id();
            $table->integer('task_id');
            $table->integer('project_id');
            $table->integer('revision_id');
            $table->integer('raised_by');
            $table->integer('raised_against');
            $table->boolean('status')->default(0);
            $table->integer('winner')->nullable();
            $table->dateTime('resolved_on')->nullable();
            $table->integer('resolved_by')->nullable();
            $table->longText('resolve_comment')->nullable();
            $table->boolean('need_authrization')->default(0);
            $table->integer('authorized_by')->nullable();
            $table->longText('authorize_comment')->nullable();
            $table->dateTime('authorize_on')->nullable();
            $table->integer('raised_by_percent')->nullable();
            $table->integer('raised_against_percent')->nullable();
            $table->dateTime('due_date');
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
        Schema::dropIfExists('task_revision_disputes');
    }
};
