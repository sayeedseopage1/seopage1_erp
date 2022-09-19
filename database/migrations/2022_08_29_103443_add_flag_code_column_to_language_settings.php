<?php

use App\Models\LanguageSetting;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */

    public function up()
    {
        Schema::table('language_settings', function (Blueprint $table) {
            $table->string('flag_code')->nullable();
        });

        $langCode = LanguageSetting::get();

        foreach ($langCode as $code) {
            $code->update(['flag_code' => $code->language_code]);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('language_settings', function (Blueprint $table) {
            $table->dropColumn('flag_code');
        });
    }

};
