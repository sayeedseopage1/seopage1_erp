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
        Schema::create('suggestions', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->string('subject')->nullable();
            $table->string('suggestion_type')->nullable();
            $table->text('page_link')->nullable();
            $table->text('screenshot')->nullable();
            $table->longText('description')->nullable();
            $table->string('status')->default('pending');
            $table->longText('comments')->nullable();
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
        Schema::dropIfExists('suggestions');
    }
};
