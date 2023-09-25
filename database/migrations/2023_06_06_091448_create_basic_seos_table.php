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
        Schema::create('basic_seos', function (Blueprint $table) {
            $table->id();
            $table->integer('deal_id');
            $table->string('random_id');
            $table->integer('milestone_id');
            $table->integer('submitted_by')->nullable();
            $table->string('client_link')->nullable();
            $table->string('service_type')->nullable();
            $table->string('owner_name')->nullable();
            $table->string('business_name')->nullable();
            $table->string('business_address')->nullable();
            $table->string('phone_number')->nullable();
            $table->string('zip_code')->nullable();
            $table->string('google_search_info')->nullable();
            $table->integer('done1')->nullable();
            $table->string('email1')->nullable();
            $table->string('password1')->nullable();
            $table->string('google_analytic_info')->nullable();
            $table->integer('done2')->nullable();
            $table->string('email2')->nullable();
            $table->string('password2')->nullable();
            $table->string('google_business_account_info')->nullable();
            $table->integer('done3')->nullable();
            $table->string('email3')->nullable();
            $table->string('password3')->nullable();
            $table->string('share_cms_access_info')->nullable();
            $table->string('url')->nullable();
            $table->string('user_name')->nullable();
            $table->string('password4')->nullable();
            $table->integer('confirm_adding')->nullable();
            $table->enum('status',['pending','submitted'])->default('pending');
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
        Schema::dropIfExists('basic_seos');
    }
};
