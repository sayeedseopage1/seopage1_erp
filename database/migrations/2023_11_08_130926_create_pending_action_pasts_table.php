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
        Schema::create('pending_action_pasts', function (Blueprint $table) {
            $table->id();
            $table->string('item_name');
            $table->string('code');
            $table->integer('action_id');
            $table->string('serial');
            $table->string('heading');
            $table->text('message');
            $table->text('button')->nullable();
            $table->string('timeframe')->nullable();
            $table->integer('authorization_for');
            $table->integer('authorized_by')->nullable();
            $table->datetime('authorized_at')->nullable();
            $table->integer('expired_status')->default(0);
            $table->integer('past_status')->default(0);
            $table->integer('project_id')->nullable();
            $table->integer('task_id')->nullable();
            $table->integer('client_id')->nullable();
            $table->integer('deliverable_id')->nullable();
            $table->integer('milestone_id')->nullable();

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
        Schema::dropIfExists('pending_action_pasts');
    }
};
