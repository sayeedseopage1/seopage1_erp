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
        Schema::create('task_submissions', function (Blueprint $table) {
            $table->id();
            $table->integer('task_id');
            $table->integer('user_id');
            $table->string('submission_type')->nullable();
            $table->string('list')->nullable();
            $table->string('attach')->nullable();
            $table->string('table')->nullable();
            $table->string('link')->nullable();
            $table->string('text')->nullable();
            $table->integer('submission_no')->startingValue(1);;
            $table->string('status')->default('pending');
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
        Schema::dropIfExists('task_submissions');
    }
};
