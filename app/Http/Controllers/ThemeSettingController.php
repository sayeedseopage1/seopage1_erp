<?php

namespace App\Http\Controllers;

use App\Helper\Files;
use App\Helper\Reply;
use App\Http\Requests\UpdateThemeSetting;
use App\Models\ThemeSetting;
use Storage;

class ThemeSettingController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.themeSettings';
        $this->activeSettingMenu = 'theme_settings';
        $this->middleware(function ($request, $next) {
            abort_403(!(user()->permission('manage_theme_setting') == 'all'));
            return $next($request);
        });
    }

    public function index()
    {
        $themeSetting = ThemeSetting::get();

        // Get theme from single database query and then grouby panel as key
        $themes = $themeSetting->groupBy('panel');

        $this->adminTheme = $themes['admin'][0];
        $this->projectAdminTheme = $themes['project_admin'][0];
        $this->employeeTheme = $themes['employee'][0];
        $this->clientTheme = $themes['client'][0];

        return view('theme-settings.index', $this->data);
    }

    /**
     * @param UpdateThemeSetting $request
     * @return array
     */
    public function store(UpdateThemeSetting $request)
    {
        $adminTheme = ThemeSetting::where('panel', 'admin')->first();
        $this->themeUpdate($adminTheme, $request->theme_settings[1], $request->primary_color[0]);


        $employeeTheme = ThemeSetting::where('panel', 'employee')->first();
        $this->themeUpdate($employeeTheme, $request->theme_settings[3], $request->primary_color[1]);

        $clientTheme = ThemeSetting::where('panel', 'client')->first();
        $this->themeUpdate($clientTheme, $request->theme_settings[4], $request->primary_color[2]);

        $setting = $this->global;
        $setting->logo_background_color = $request->logo_background_color;
        $setting->auth_theme = $request->auth_theme;
        $setting->app_name = $request->app_name;


        if ($request->logo_delete == 'yes') {
            Files::deleteFile($setting->logo, 'app-logo');
            $setting->logo = null;
        }

        if ($request->hasFile('logo')) {
            Files::deleteFile($setting->logo, 'app-logo');
            $setting->logo = Files::upload($request->logo, 'app-logo');
        }


        if ($request->light_logo_delete == 'yes') {
            Files::deleteFile($setting->light_logo, 'app-logo');
            $setting->light_logo = null;
        }

        if ($request->hasFile('light_logo')) {
            Files::deleteFile($setting->light_logo, 'app-logo');
            $setting->light_logo = Files::upload($request->light_logo, 'app-logo');
        }

        if ($request->login_background_delete == 'yes') {
            Files::deleteFile($setting->login_background, 'login-background');
            $setting->login_background = null;
        }

        if ($request->hasFile('login_background')) {
            Files::deleteFile($setting->login_background, 'login-background');
            $setting->login_background = Files::upload($request->login_background, 'login-background');
        }

        if ($request->favicon_delete == 'yes') {
            Files::deleteFile($setting->favicon, 'favicon');
            $setting->favicon = null;
        }

        if ($request->hasFile('favicon')) {
            $setting->favicon = Files::upload($request->favicon, 'favicon', null);
        }

        $setting->sidebar_logo_style = $request->sidebar_logo_style;

        $setting->save();

        session()->forget(['admin_theme', 'employee_theme', 'client_theme', 'global_setting']);

        return Reply::redirect(route('theme-settings.index'), __('messages.settingsUpdated'));
    }

    private function themeUpdate($updateObject, $themeSetting, $primaryColor)
    {
        $updateObject->header_color = $primaryColor;
        $updateObject->sidebar_theme = $themeSetting['sidebar_theme'];
        $updateObject->save();
        session()->forget(['admin_theme', 'employee_theme', 'client_theme']);
    }

}
