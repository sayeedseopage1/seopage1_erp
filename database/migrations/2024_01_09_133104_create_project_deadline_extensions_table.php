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
        Schema::create('project_deadline_extensions', function (Blueprint $table) {
            $table->id();
            $table->integer('project_id');
            $table->integer('milestone_id')->nullable();
            $table->date('old_deadline');
            $table->date('new_deadline');
            $table->string('extension');
            $table->date('deadline_requested_pm')->nullable();
            $table->date('deadline_extend_admin')->nullable();
            $table->string('deadline_requested_for');
            $table->string('deadline_extended_for')->nullable();
            $table->longText('description');
            $table->longText('admin_comment')->nullable();
            $table->dateTime('approved_on')->nullable();
            $table->integer('approved_by')->nullable();
            $table->integer('status')->default(0);
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
        Schema::dropIfExists('project_deadline_extensions');
    }
};
