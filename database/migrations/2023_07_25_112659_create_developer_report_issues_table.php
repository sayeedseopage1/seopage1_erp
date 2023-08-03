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
        Schema::create('developer_report_issues', function (Blueprint $table) {
            $table->id();
            $table->longText('comment')->nullable();
            $table->integer('person');
            $table->string('previousNotedIssue');
            $table->longText('reason')->nullable();
            $table->integer('added_by');
            $table->integer('task_id');
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
        Schema::dropIfExists('developer_report_issues');
    }
};
