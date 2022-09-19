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
        Schema::create('proposal_templates', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('lead_id')->unsigned();
            $table->foreign('lead_id')->references('id')->on('leads')->onDelete('cascade')->onUpdate('cascade');
            $table->double('sub_total');
            $table->double('total');
            $table->integer('currency_id')->unsigned()->nullable();
            $table->foreign('currency_id')->references('id')->on('currencies')->onDelete('cascade')->onUpdate('cascade');
            $table->enum('discount_type', ['percent', 'fixed']);
            $table->double('discount');
            $table->boolean('invoice_convert')->default(0);
            $table->enum('status', ['declined', 'accepted', 'waiting'])->default('waiting');
            $table->mediumText('note')->nullable();
            $table->longText('description')->nullable();
            $table->enum('calculate_tax', ['after_discount', 'before_discount'])->default('after_discount');
            $table->text('client_comment')->nullable();
            $table->boolean('signature_approval')->default(1);
            $table->text('hash')->nullable();
            $table->integer('added_by')->unsigned()->nullable();
            $table->foreign('added_by')->references('id')->on('users')->onDelete('SET NULL')->onUpdate('cascade');

            $table->integer('last_updated_by')->unsigned()->nullable();
            $table->foreign('last_updated_by')->references('id')->on('users')->onDelete('SET NULL')->onUpdate('cascade');
            $table->timestamps();
        });

        Schema::create('proposal_template_items', function (Blueprint $table) {
            $table->increments('id');
            $table->bigInteger('proposal_template_id')->unsigned();
            $table->foreign('proposal_template_id')->references('id')->on('proposal_templates')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->string('hsn_sac_code');
            $table->string('item_name');
            $table->enum('type', ['item', 'discount', 'tax'])->default('item');
            $table->tinyInteger('quantity');
            $table->double('unit_price');
            $table->double('amount');
            $table->text('item_summary')->nullable();
            $table->string('taxes')->nullable();

            $table->timestamps();
        });


        Schema::create('proposal_template_item_images', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('proposal_template_item_id')->unsigned();
            $table->foreign('proposal_template_item_id')->references('id')
                ->on('proposal_template_items')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->string('filename');
            $table->string('hashname')->nullable();
            $table->string('size')->nullable();
            $table->string('external_link')->nullable();
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
        Schema::dropIfExists('proposal_templates');
        Schema::dropIfExists('proposal_template_items');
        Schema::dropIfExists('proposal_template_item_images');
    }

};
