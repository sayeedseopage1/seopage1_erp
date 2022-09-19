<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Setting;
use App\Models\Currency;

class OrganisationSettingsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

    public function run()
    {
        $currency = Currency::where('currency_code', 'USD')->first();

        $setting = new Setting();
        $setting->company_name = 'Worksuite';
        $setting->app_name = 'Worksuite';
        $setting->company_email = 'company@email.com';
        $setting->company_phone = '1234567891';
        $setting->address = 'Your Company address here';
        $setting->website = 'https://worksuite.biz';
        $setting->currency_id = $currency->id;
        $setting->timezone = 'Asia/Kolkata';
        $setting->weather_key = '';
        $setting->date_picker_format = 'dd-mm-yyyy';
        $setting->moment_format = 'DD-MM-YYYY';
        $setting->rounded_theme = 1;
        $setting->allowed_file_types = 'image/*,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/zip,application/x-zip-compressed, application/x-compressed, multipart/x-zip,.xlsx,video/x-flv,video/mp4,application/x-mpegURL,video/MP2T,video/3gpp,video/quicktime,video/x-msvideo,video/x-ms-wmv,application/sla,.stl';
        $setting->save();


    }

}
