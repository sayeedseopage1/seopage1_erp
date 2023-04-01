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
        Schema::create('task_replies', function (Blueprint $table) {
            $table->id();
            $table->text('reply');
            $table->integer('comment_id');
            $table->integer('user_id');
            $table->integer('task_id');
            $table->integer('added_by')->default(null);
            $table->integer('last_updated_by')->default(null);
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
        Schema::dropIfExists('task_replies');
    }
};
