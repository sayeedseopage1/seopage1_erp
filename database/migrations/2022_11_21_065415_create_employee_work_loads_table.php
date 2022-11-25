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
        Schema::create('employee_work_loads', function (Blueprint $table) {
            $table->id();
            $table->string('user_id');
            $table->string('working_minutes')->default(420);
            $table->string('assign_minutes')->default(0);
            $table->string('minutes_remaining')->default(0);
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
        Schema::dropIfExists('employee_work_loads');
    }
};
