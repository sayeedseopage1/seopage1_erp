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
        Schema::create('award_time_incresses_request', function (Blueprint $table) {
            $table->id();
            $table->integer('request_from');
            $table->integer('deal_id');
            $table->integer('incress_hours');
            $table->string('pm_comment');
            $table->string('admin_comment');
            $table->integer('approved_by');
            $table->enum('status', [0,1,2]);
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
        Schema::dropIfExists('award_time_incresses');
    }
};
