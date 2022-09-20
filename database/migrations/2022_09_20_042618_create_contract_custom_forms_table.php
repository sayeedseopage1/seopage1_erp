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

        Schema::create('contract_custom_forms', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('custom_fields_id')->nullable()->index('contract_custom_forms_custom_fields_id_foreign');
            $table->string('field_display_name');
            $table->string('field_name');
            $table->integer('field_order');
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->boolean('required')->default(false);
            $table->unsignedInteger('added_by')->nullable()->index('contract_custom_forms_added_by_foreign');
            $table->unsignedInteger('last_updated_by')->nullable()->index('contract_custom_forms_last_updated_by_foreign');
            $table->timestamps();
        });
        Schema::table('contract_custom_forms', function (Blueprint $table) {
            $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
            $table->foreign(['custom_fields_id'])->references(['id'])->on('custom_fields')->onUpdate('CASCADE')->onDelete('CASCADE');
            $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
      Schema::table('contract_custom_forms', function (Blueprint $table) {
          $table->dropForeign('contract_custom_forms_added_by_foreign');
          $table->dropForeign('contract_custom_forms_custom_fields_id_foreign');
          $table->dropForeign('contract_custom_forms_last_updated_by_foreign');
      });
        Schema::dropIfExists('contract_custom_forms');
    }
};
