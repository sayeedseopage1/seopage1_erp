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
        Schema::table('daily_submissions', function (Blueprint $table) {
            $table->enum('frontend_password', ['yes', 'no'])->nullable()->after('report_date');
            $table->string('password')->nullable()->after('frontend_password');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('daily_submissions', function (Blueprint $table) {
            $table->dropColumn(['frontend_password', 'password']);
        });
    }
};
