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
        Schema::create('client_deals', function (Blueprint $table) {
            $table->id();
            $table->string('client_name');
            $table->string('client_username');
            $table->string('project_name');
            $table->string('project_link');
            $table->integer('original_currency_id');
            $table->string('amount');
            $table->string('project_type');
            $table->longText('description');
            $table->longText('comments');
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
        Schema::dropIfExists('client_deals');
    }
};
