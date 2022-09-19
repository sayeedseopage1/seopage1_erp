<?php

namespace App\Providers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class TranslateSettingConfigProvider extends ServiceProvider
{

    public function register()
    {
        try {

            if (Schema::hasTable('translate_settings')) {
                $translateSetting = DB::table('translate_settings')->first();

                if ($translateSetting) {
                    Config::set('laravel_google_translate.google_translate_api_key', $translateSetting->google_key);
                }
            }

        } catch (\Exception $e) {
            logger($e);
        }

    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

}
