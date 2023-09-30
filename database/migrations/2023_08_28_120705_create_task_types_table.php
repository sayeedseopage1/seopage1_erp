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
        Schema::create('task_types', function (Blueprint $table) {
            $table->id();
            $table->integer('task_id');
            $table->string('page_type')->nullable();
            $table->string('page_name')->nullable();
            $table->string('page_url')->nullable();
            $table->string('task_type_other')->nullable();
            $table->string('page_type_name')->nullable();
            $table->string('existing_design_link')->nullable();
          
            $table->integer('number_of_pages')->nullable();
            $table->integer('authorization_status')->default(1);
            $table->longText('comment');
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
        Schema::dropIfExists('task_types');
    }
};
