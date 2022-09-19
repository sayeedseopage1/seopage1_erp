<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schema;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

    public function run()
    {
        // Set Seeding to true check if data is seeding.
        // This is required to stop notification in installation
        config(['app.seeding' => true]);


        Artisan::call('key:generate');

        // phpcs:ignore
        // $this->deleteTableData();

        $this->call(CountriesTableSeeder::class);
        $this->call(SmtpSettingsSeeder::class);

        $this->call(CurrencySeeder::class);
        $this->call(CoreDatabaseSeeder::class);

        $this->call(ModuleSettingsSeeder::class);
        $this->call(ModulePermissionSeeder::class);

        $this->call(OrganisationSettingsTableSeeder::class);
        
        $this->call(ThemeSettingsTableSeeder::class);
        $this->call(TicketEmailSettingSeeder::class);

        if (!App::environment('codecanyon')) {
            $this->call(DepartmentTableSeeder::class);
            $this->call(UsersTableSeeder::class);
            $this->call(ProjectCategorySeeder::class);
            $this->call(ProjectSeeder::class);
            $this->call(EstimateSeeder::class);
            $this->call(ExpenseSeeder::class);
            $this->call(TicketSeeder::class);
            $this->call(RoleSeeder::class);
            $this->call(LeaveSeeder::class);
            $this->call(NoticesTableSeeder::class);
            $this->call(EventTableSeeder::class);
            $this->call(LeadSeeder::class);
            $this->call(TaxTableSeeder::class);
            $this->call(ProductTableSeeder::class);
            $this->call(ContractTypeTableSeeder::class);
            $this->call(ContractTableSeeder::class);
            $this->call(LeadsTableSeeder::class);
            $this->call(MessageSeeder::class);
            $this->call(ShiftSeeder::class);
            $this->call(AttendanceTableSeeder::class);
        }

        $this->call(EmployeePermissionSeeder::class);

        if (!App::environment('codecanyon')) {
            Artisan::call('sync-user-permissions all');
        }

        config(['app.seeding' => false]);
    }

    private function deleteTableData()
    {
        $tableNames = Schema::getConnection()->getDoctrineSchemaManager()->listTableNames();
        Schema::disableForeignKeyConstraints();

        foreach ($tableNames as $name) {
            if ($name == 'migrations') {
                continue;
            }

            \DB::table($name)->delete();
        }

        Schema::enableForeignKeyConstraints();
    }

}
