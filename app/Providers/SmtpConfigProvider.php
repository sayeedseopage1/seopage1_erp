<?php

namespace App\Providers;

use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\ServiceProvider;

class SmtpConfigProvider extends ServiceProvider
{

    public function register()
    {
        try {
            $smtpSetting = DB::table('smtp_settings')->first();
            $settings = DB::table('organisation_settings')->first();

            if ($smtpSetting && $settings) {

                if (!in_array(config('app.env'), ['demo', 'development'])) {

                    $driver = ($smtpSetting->mail_driver != 'mail') ? $smtpSetting->mail_driver : 'sendmail';

                    Config::set('mail.default', $driver);
                    Config::set('mail.mailers.smtp.host', $smtpSetting->mail_host);
                    Config::set('mail.mailers.smtp.port', $smtpSetting->mail_port);
                    Config::set('mail.mailers.smtp.username', $smtpSetting->mail_username);
                    Config::set('mail.mailers.smtp.password', $smtpSetting->mail_password);
                    Config::set('mail.mailers.smtp.encryption', $smtpSetting->mail_encryption);
                    Config::set('queue.default', $smtpSetting->mail_connection);
                }

                Config::set('mail.from.name', $smtpSetting->mail_from_name);
                Config::set('mail.from.address', $smtpSetting->mail_from_email);

                Config::set('app.name', $settings->company_name);

                if (is_null($settings->logo)) {
                    Config::set('app.logo', asset('img/worksuite-logo.png'));
                }
                else {
                    Config::set('app.logo', asset_url('app-logo/' . $settings->logo));
                }

                $pushSetting = DB::table('push_notification_settings')->first();

                if ($pushSetting) {
                    Config::set('services.onesignal.app_id', $pushSetting->onesignal_app_id);
                    Config::set('services.onesignal.rest_api_key', $pushSetting->onesignal_rest_api_key);
                    Config::set('onesignal.app_id', $pushSetting->onesignal_app_id);
                    Config::set('onesignal.rest_api_key', $pushSetting->onesignal_rest_api_key);
                }
            }
        } catch (\Exception $e) {

            Log::info($e);
        }

        $app = App::getInstance();
        $app->register('Illuminate\Mail\MailServiceProvider');
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
