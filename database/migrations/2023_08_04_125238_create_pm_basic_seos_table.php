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
        Schema::create('pm_basic_seos', function (Blueprint $table) {
            $table->id();
            $table->integer('sales_basic_seo_id');
            $table->integer('deal_id');
            $table->integer('milestone_id');
            $table->string('owner_name')->nullable();
            $table->string('business_name')->nullable();
            $table->string('business_address')->nullable();
            $table->string('phone_number')->nullable();
            $table->string('zip_code')->nullable();
            $table->string('google_search_info')->nullable();
            $table->integer('done1')->nullable();
            $table->string('google_search_info_email')->nullable();
            $table->string('google_search_info_password')->nullable();
            $table->string('google_analytic_info')->nullable();
            $table->integer('done2')->nullable();
            $table->string('google_analytic_info_email')->nullable();
            $table->string('google_analytic_info_password')->nullable();
            $table->string('google_business_account_info')->nullable();
            $table->integer('done3')->nullable();
            $table->string('google_business_account_info_email')->nullable();
            $table->string('google_business_account_info_password')->nullable();
            $table->string('share_cms_access_info')->nullable();
            $table->string('login_url')->nullable();
            $table->string('email')->nullable();
            $table->string('password')->nullable();
            $table->string('confirm_adding')->nullable();
            $table->integer('google_console_setup')->default(1);
            $table->integer('google_analytics_setup')->default(1);
            $table->integer('sitemap_setup')->default(1);
            $table->integer('robots_txt_setup')->default(1);
            $table->integer('google_business_setup')->default(1);
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
        Schema::dropIfExists('pm_basic_seos');
    }
};
