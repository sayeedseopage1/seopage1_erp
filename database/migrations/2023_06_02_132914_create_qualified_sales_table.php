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
        Schema::create('qualified_sales', function (Blueprint $table) {
            $table->id();
            $table->string('project_name');
            $table->date('date');
            $table->integer('client_id');
            $table->string('client_name');
            $table->string('amount');
           
            $table->integer('pm_id');
            $table->string('pm_name');
            $table->string('deal_short_code');
            $table->integer('deal_id');
            $table->integer('project_id');
            $table->integer('authorized_by_sales_lead')->default(0);
            $table->integer('accepted_by_project_manager')->default(0);
            $table->integer('authorized_by_admin')->default(0);
            $table->longText('sales_lead_need_define')->nullable();
            $table->longText('project_manager_needs_define')->nullable();
            $table->longText('sales_lead_price_authorization')->nullable();
            $table->longText('sales_lead_deadline_comment')->nullable();
            $table->longText('project_manager_deadline_comment')->nullable();
            $table->longText('admin_authorization_comment')->nullable();
            $table->float('total_points')->default(0);


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
        Schema::dropIfExists('qualified_sales');
    }
};
