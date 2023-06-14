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
        Schema::create('authorization_actions', function (Blueprint $table) {
            $table->id();
            $table->string('model_name');
            $table->integer('model_id');
            $table->string('type');
            $table->integer('deal_id');
            $table->integer('project_id');
            $table->string('link');
            $table->string('title');
            $table->text('description')->nullable();
            $table->integer('authorization_by')->nullable();
            $table->integer('authorization_for')->nullable();
            $table->enum('status', [0, 1, 2, 3, 4])->default(0);
            $table->datetime('approved_at')->nullable();
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
        Schema::dropIfExists('authorization_actions');
    }
};
