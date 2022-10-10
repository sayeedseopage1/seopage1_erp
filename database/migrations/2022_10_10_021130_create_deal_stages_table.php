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
        Schema::create('deal_stages', function (Blueprint $table) {
            $table->id();
            $table->string('short_code')->nullable();
            $table->string('deal_stage')->default('Contact Made');
            $table->string('deal_status')->default('pending');
            $table->text('comments')->nullable();
            $table->string('won_lost')->nullable();
            $table->integer('lead_id')->nullable();
            $table->string('status')->default(0);
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
        Schema::dropIfExists('deal_stages');
    }
};
