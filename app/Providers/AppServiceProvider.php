<?php

namespace App\Providers;

use App\Models\Setting;
use App\Observers\SettingsObserver;
use App\Models\ProjectActivity;

use App\Observers\LeadsDealsActivityLogObserver;
use App\Models\LeadsDealsActivityLog;

use App\Observers\ProjectActivityObserver;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;
use Illuminate\Pagination\Paginator;

class AppServiceProvider extends ServiceProvider
{

    /**
     * Register any application services.
     *
     * @return void
     */

    public function register()
    {
        if (\config('app.redirect_https')) {
            $this->app['request']->server->set('HTTPS', true);
        }
    }

    public function boot()
    {
        if (\config('app.redirect_https')) {
            \URL::forceScheme('https');
        }
        Schema::defaultStringLength(191);

        Setting::observe(SettingsObserver::class);
        ProjectActivity::observe(ProjectActivityObserver::class);

        LeadsDealsActivityLog::observe(LeadsDealsActivityLogObserver::class);

        Model::preventLazyLoading(app()->environment('development'));

        if (app()->environment('development')) {
            $this->app->register(\Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider::class);
        }

        Paginator::useBootstrapFive();
        Paginator::useBootstrapFour();
    }

}
