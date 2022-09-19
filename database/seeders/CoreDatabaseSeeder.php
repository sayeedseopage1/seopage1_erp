<?php

namespace Database\Seeders;

use App\Models\DatabaseBackupSetting;
use App\Models\GoogleCalendarModule;
use App\Models\LanguageSetting;
use App\Models\PaymentGatewayCredentials;
use App\Models\StorageSetting;
use App\Models\TaskboardColumn;
use App\Models\TranslateSetting;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;

class CoreDatabaseSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->dashboardBackupSetting();
        $this->fileStorageSetting();
        $this->gdprSetting();
        $this->googleCalendarModule();
        $this->languageSettings();
        $this->paymentGatewayCredentials();
        $this->socialAuth();
        TranslateSetting::create(['google_key' => null]);

        // Remove when merge to worksuite-company
        $this->taskBoard();

    }

    private function taskBoard()
    {
        $columns = [
            ['column_name' => 'Incomplete', 'color' => '#d21010'],
            ['column_name' => 'To Do', 'color' => '#f5c308'],
            ['column_name' => 'Doing', 'color' => '#00b5ff'],
            ['column_name' => 'Completed', 'color' => '#679c0d'],
        ];

        foreach ($columns as $key => $column) {
            $board = new TaskboardColumn();
            $board->column_name = $column['column_name'];
            $board->priority = $key + 1;
            $board->slug = str_slug($board->column_name, '_');
            $board->label_color = $column['color'];
            $board->save();
        }


    }

    private function dashboardBackupSetting()
    {
        $backupSetting = new DatabaseBackupSetting();
        $backupSetting->status = 'inactive';
        $backupSetting->hour_of_day = '';
        $backupSetting->backup_after_days = '0';
        $backupSetting->delete_backup_after_days = '0';
        $backupSetting->save();
    }

    private function fileStorageSetting()
    {
        $storage = new StorageSetting();
        $storage->filesystem = 'local';
        $storage->status = 'enabled';
        $storage->save();
    }

    private function gdprSetting()
    {
        $gdpr = new \App\Models\GdprSetting();
        $gdpr->create();
    }

    private function googleCalendarModule()
    {
        /* Add default entry */
        $module = new GoogleCalendarModule();
        $module->lead_status = 0;
        $module->leave_status = 0;
        $module->invoice_status = 0;
        $module->contract_status = 0;
        $module->task_status = 0;
        $module->event_status = 0;
        $module->holiday_status = 0;
        $module->save();
    }

    private function languageSettings()
    {
        $languages = [
            [
                'language_code' => 'en',
                'flag_code' => 'en',
                'language_name' => 'English',
                'status' => 'enabled',
            ],
            [
                'language_code' => 'ar',
                'flag_code' => 'ar',
                'language_name' => 'Arabic',
                'status' => 'disabled',

            ],
            [
                'language_code' => 'de',
                'flag_code' => 'de',
                'language_name' => 'German',
                'status' => 'disabled',

            ],
            [
                'language_code' => 'es',
                'flag_code' => 'es',
                'language_name' => 'Spanish',
                'status' => 'disabled',

            ],
            [
                'language_code' => 'et',
                'flag_code' => 'et',
                'language_name' => 'Estonian',
                'status' => 'disabled',

            ],
            [
                'language_code' => 'fa',
                'flag_code' => 'fa',
                'language_name' => 'Farsi',
                'status' => 'disabled',

            ],
            [
                'language_code' => 'fr',
                'flag_code' => 'fr',
                'language_name' => 'French',
                'status' => 'disabled',

            ],
            [
                'language_code' => 'gr',
                'flag_code' => 'gr',
                'language_name' => 'Greek',
                'status' => 'disabled',

            ],
            [
                'language_code' => 'it',
                'flag_code' => 'it',
                'language_name' => 'Italian',
                'status' => 'disabled',

            ],
            [
                'language_code' => 'nl',
                'flag_code' => 'nl',
                'language_name' => 'Dutch',
                'status' => 'disabled',

            ],
            [
                'language_code' => 'pl',
                'flag_code' => 'pl',
                'language_name' => 'Polish',
                'status' => 'disabled',

            ],
            [
                'language_code' => 'pt',
                'flag_code' => 'pt',
                'language_name' => 'Portuguese',
                'status' => 'disabled',

            ],
            [
                'language_code' => 'pt-br',
                'flag_code' => 'pt-br',
                'language_name' => 'Portuguese (Brazil)',
                'status' => 'disabled',

            ],
            [
                'language_code' => 'ro',
                'flag_code' => 'ro',
                'language_name' => 'Romanian',
                'status' => 'disabled',

            ],
            [
                'language_code' => 'ru',
                'flag_code' => 'ru',
                'language_name' => 'Russian',
                'status' => 'disabled',

            ],
            [
                'language_code' => 'tr',
                'flag_code' => 'tr',
                'language_name' => 'Turkish',
                'status' => 'disabled',

            ],
            [
                'language_code' => 'zh-CN',
                'flag_code' => 'zh-CN',
                'language_name' => 'Chinese (S)',
                'status' => 'disabled',

            ],
            [
                'language_code' => 'zh-TW',
                'flag_code' => 'zh-TW',
                'language_name' => 'Chinese (T)',
                'status' => 'disabled',

            ],
        ];

        LanguageSetting::insert($languages);
    }

    private function paymentGatewayCredentials()
    {
        $credential = new PaymentGatewayCredentials();
        $credential->paypal_client_id = null;
        $credential->paypal_secret = null;
        $credential->save();
    }

    private function socialAuth()
    {
        \App\Models\SocialAuthSetting::create([
            'facebook_status' => 'disable',
            'google_status' => 'disable',
            'linkedin_status' => 'disable',
            'twitter_status' => 'disable',
        ]);
    }

}

