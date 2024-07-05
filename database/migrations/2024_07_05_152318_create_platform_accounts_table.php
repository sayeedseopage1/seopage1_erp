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
        Schema::create('platform_accounts', function (Blueprint $table) {
            $table->id();
            $table->unsignedTinyInteger('type')->nullable()->comment('1 = Freelancer.com, 2 = Upwork, 3 = Fiver');
            $table->string('username');
            $table->text('user_url')->nullable();
            $table->string('email')->nullable();
            $table->unsignedTinyInteger('profile_type')->nullable()->comment('1 = New, 2 = Mid, 3 = Old');
            $table->timestamp('generated_on')->nullable();
            $table->decimal('multiplying_factor')->default(1);
            $table->unsignedTinyInteger('confirmation_of_data_accuracy')->default(1);
            $table->unsignedTinyInteger('status')->default('1')->comment('0 = Inactive, 1 = Active');
            $table->unsignedBigInteger('added_by')->nullable();
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
        Schema::dropIfExists('platform_accounts');
    }
};
