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
        Schema::create('report_issues', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->string('subject')->nullable();
            $table->string('issue_type')->nullable();
            $table->text('page_link')->nullable();
            $table->text('screenshot')->nullable();
            $table->longText('description')->nullable();
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
        Schema::dropIfExists('report_issues');
    }
};
