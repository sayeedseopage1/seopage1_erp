<?php

namespace Database\Seeders;

use App\Models\TicketEmailSetting;
use Illuminate\Database\Seeder;

class TicketEmailSettingSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $setting = new TicketEmailSetting();
        $setting->save();
    }

}
