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
        Schema::create('seopage1_teams', function (Blueprint $table) {
            $table->id();
            $table->string('team_name');
            $table->integer('department_id')->nullable();
            $table->integer('parent_id')->nullable();
            $table->string('members');
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
        Schema::dropIfExists('seopage1_teams');
    }
};
