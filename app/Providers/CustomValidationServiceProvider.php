<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Validator;

class CustomValidationServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
   
    public function boot()
    {
        Validator::extend('unique_heading_in_project', function ($attribute, $value, $parameters, $validator) {
            [$taskId, $projectId] = $parameters;

            $count = \App\Models\Task::where('heading', $value)
                ->where('id', '!=', $taskId)
                ->where('project_id', $projectId)
                ->count();

            return $count === 0;
        });
    }
}
