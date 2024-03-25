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
        Schema::create('factors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('criteria_id')->constrained();
            $table->string('title');
            
            $table->unsignedTinyInteger('point_type')->default(1)->comment('1 = Static, 2 = Percentage');
            $table->decimal('points');
            $table->string('point_depend_on_model')->nullable()->comment('The point depend on this model');
            $table->string('point_depend_on_field')->nullable()->comment('The point depend on this field of defined model');
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
        Schema::dropIfExists('factors');
    }
};
