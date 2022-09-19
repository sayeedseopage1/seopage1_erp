<?php
namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;
use App\Models\ThemeSetting;

class ThemeSettingsTableSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // admin panel
        $theme = new ThemeSetting();
        $theme->panel = 'admin';
        $theme->header_color = '#1d82f5';
        $theme->sidebar_color = '#171F29';
        $theme->sidebar_text_color = '#99A5B5';
        $theme->link_color = '#F7FAFF';
        $theme->save();

        // project admin panel
        $theme = new ThemeSetting();
        $theme->panel = 'project_admin';
        $theme->header_color = '#1d82f5';
        $theme->sidebar_color = '#171F29';
        $theme->sidebar_text_color = '#99A5B5';
        $theme->link_color = '#F7FAFF';
        $theme->save();

        // employee panel
        $theme = new ThemeSetting();
        $theme->panel = 'employee';
        $theme->header_color = '#1d82f5';
        $theme->sidebar_color = '#171F29';
        $theme->sidebar_text_color = '#99A5B5';
        $theme->link_color = '#F7FAFF';
        $theme->save();

        // client panel
        $theme = new ThemeSetting();
        $theme->panel = 'client';
        $theme->header_color = '#1d82f5';
        $theme->sidebar_color = '#171F29';
        $theme->sidebar_text_color = '#99A5B5';
        $theme->link_color = '#F7FAFF';
        $theme->save();

    }

}
