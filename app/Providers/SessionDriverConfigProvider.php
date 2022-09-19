<?php

namespace App\Providers;

use Illuminate\Session\SessionServiceProvider;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\ServiceProvider;

class SessionDriverConfigProvider extends ServiceProvider
{

    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        try {

            $settings = DB::table('organisation_settings')->first();

            if ($settings) {
                Config::set('session.driver', $settings->session_driver != '' ? $settings->session_driver : 'file');
            }

        } catch (\Exception $e) {

            logger($e);
        }

        $app = App::getInstance();
        $app->register(SessionServiceProvider::class);
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
