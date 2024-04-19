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
        Schema::create('policy_question_values', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('deal_id')->unsigned();
            $table->text('values');
            $table->timestamps();

            $table->foreign('deal_id')->references('id')->on('deals')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('policy_question_values');
    }
};
