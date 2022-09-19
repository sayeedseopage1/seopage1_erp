<?php

namespace App\Traits;

use Illuminate\Support\Facades\Config;

trait GoogleOAuth
{

    public function setGoogleoAuthConfig()
    {
        $setting = global_setting();

        Config::set('services.google.client_id', $setting->google_client_id);
        Config::set('services.google.client_secret', $setting->google_client_secret);
        Config::set('services.google.redirect_uri', route('googleAuth'));
    }

}
