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
        Schema::create('working_environments', function (Blueprint $table) {
            $table->id();
            $table->integer('project_id');
            $table->string('site_url');
            $table->string('frontend_password');
            $table->string('login_url');
            $table->string('email');
            // $table->string('frontend_password')->nullable();
            $table->string('password');
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
        Schema::dropIfExists('working_environments');
    }
};
