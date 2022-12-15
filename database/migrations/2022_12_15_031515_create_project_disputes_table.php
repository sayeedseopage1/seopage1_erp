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
        Schema::create('project_disputes', function (Blueprint $table) {
            $table->id();
            $table->integer('project_id');
            $table->string('project_value');
            $table->string('client_username');
            $table->string('pm_name');
            $table->string('pm_email');
            $table->text('description1');
            $table->text('description2');
            $table->text('description3');
            $table->text('description4');
            $table->text('description5');
            $table->text('description6');
            $table->text('description7');
            $table->text('description8');
            $table->text('description9');
            $table->text('description10');
            $table->text('description11');
            $table->text('description12');
            $table->text('description13');
            $table->text('description14');
            $table->text('description15');
            $table->text('description16');
            $table->text('description17');
            $table->integer('pm_id');
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
        Schema::dropIfExists('project_disputes');
    }
};
