<?php

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
        Schema::create('sales_risk_policies', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->bigInteger('parent_id')->nullable()->unsigned();
            $table->enum('type', SalesRiskPolicy::$types);
            $table->enum('value_type', SalesRiskPolicy::$valueTypes)->nullable();
            $table->enum('key', array_keys(SalesRiskPolicy::$keys))->nullable();
            $table->text('value')->nullable();
            $table->float('points')->default('0');
            $table->string('department');
            $table->enum('status', ['0', '1'])->default('1')->comment('0 => Disabled, 1=> Enabled');
            $table->text('comment')->nullable();
            $table->timestamps();
        });

        Schema::table('sales_risk_policies', function (Blueprint $table) {
            $table->foreign('parent_id')->references('id')->on('sales_risk_policies')->onUpdate('no action')->onDelete('no action');
        });

        /*
        ALTER TABLE sales_risk_policies
        ADD CONSTRAINT fk_parent_id
        FOREIGN KEY (parent_id)
        REFERENCES sales_risk_policies (id)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION;
        */
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sales_risk_policies');
    }
};
