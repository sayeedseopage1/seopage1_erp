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
        Schema::create('task_revisions', function (Blueprint $table) {
            $table->id();
            $table->integer('task_id');
            $table->longText('lead_comment')->nullable();
            $table->integer('project_id');

            $table->integer('added_by');
            $table->integer('sale_person')->nullable();
            $table->integer('revision_no')->default(1);
            $table->string('revision_status')->nullable();
            $table->string('revision_reason')->nullable();
            $table->string('acknowledgement_id')->nullable();
            $table->string('revision_acknowledgement')->nullable();
            $table->string('approval_status')->default('pending');
            $table->longText('dev_comment')->nullable();
            $table->longText('pm_comment')->nullable();
            $table->string('additional_status')->nullable();
            $table->longText('additional_deny_comment ')->nullable();
            $table->double('additional_amount')->default(0);
            $table->longText('deny_reason')->nullable();
            $table->integer('is_deniable')->default(0);
            $table->integer('is_deny')->default(0);
            $table->integer('is_accept')->default(0);
            $table->integer('sale_accept')->default(0);
            $table->integer('sale_deny')->default(0);
            $table->longText('sale_comment')->nullable();
            $table->integer('dispute_created')->default(0);
            $table->string('dispute_between')->nullable();
            $table->integer('client_pm_dispute')->default(0);
            $table->integer('dispute_status')->default(0);
            $table->string('final_responsible_person ')->nullable();
            $table->integer('dispute_id')->nullable();
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
        Schema::dropIfExists('task_revisions');
    }
};
