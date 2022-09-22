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
        Schema::create('deals', function (Blueprint $table) {
            $table->id();
            $table->string('deal_id')->unique();
            $table->string('client_name')->nullable();
            $table->string('organization')->nullable();
            $table->string('project_name')->nullable();
            $table->string('pipeline_stage')->nullable();
            $table->date('start_date')->nullable();
            $table->string('amount')->nullable();
            $table->string('deal_creation_date')->nullable();
            $table->string('message_link')->nullable();
            $table->string('profile_link')->nullable();
            $table->integer('currency_id')->nullable();
            $table->text('description')->nullable();
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
        Schema::dropIfExists('deals');
    }
};
