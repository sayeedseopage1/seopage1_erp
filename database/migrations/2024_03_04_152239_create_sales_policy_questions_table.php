<?php

use App\Models\SalesPolicyQuestion;
use App\Models\SalesRiskPolicy;
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
        Schema::create('sales_policy_questions', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->enum('type', array_keys(SalesPolicyQuestion::$types));
            $table->enum('key', array_keys(SalesRiskPolicy::$keys));
            $table->text('value')->nullable();
            $table->bigInteger('parent_id')->unsigned()->nullable();
            $table->integer('sequence')->default('1');
            $table->bigInteger('policy_id')->unsigned();
            $table->string('placeholder')->nullable();
            $table->text('comment')->nullable();
            $table->timestamps();

            $table->foreign('policy_id')->references('id')->on('sales_risk_policies')->onUpdate('no action')->onDelete('no action');
        });

        Schema::table('sales_policy_questions', function (Blueprint $table) {
            $table->foreign('parent_id')->references('id')->on('sales_policy_questions')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sales_policy_questions');
    }
};
