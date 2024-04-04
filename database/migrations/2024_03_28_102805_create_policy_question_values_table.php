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
            $table->bigInteger('question_id')->unsigned();
            $table->text('value');
            $table->bigInteger('deal_id')->unsigned();
            $table->timestamps();

            $table->foreign('question_id')->references('id')->on('sales_policy_questions')->onUpdate('no action')->onDelete('no action');
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
