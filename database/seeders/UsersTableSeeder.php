<?php

namespace Database\Seeders;

use App\Models\ClientDetails;
use App\Models\EmployeeDetails;
use App\Models\Permission;
use App\Models\Role;
use App\Models\Team;
use App\Models\UniversalSearch;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

    public function run()
    {

        DB::table('users')->delete();
        DB::table('employee_details')->delete();
        DB::table('universal_search')->delete();

        DB::statement('ALTER TABLE users AUTO_INCREMENT = 1');
        DB::statement('ALTER TABLE employee_details AUTO_INCREMENT = 1');
        DB::statement('ALTER TABLE universal_search AUTO_INCREMENT = 1');

        $count = config('app.seed_record_count');

        $adminRole = Role::where('name', 'admin')->first();
        $employeeRole = Role::where('name', 'employee')->first();
        $clientRole = Role::where('name', 'client')->first();


        $faker = \Faker\Factory::create();

        $user = new User();
        $user->name = $faker->name;
        $user->email = 'admin@example.com';
        $user->password = Hash::make('123456');
        $user->save();

        $this->addEmployeeDetails($user, $employeeRole);
        $user->roles()->attach($adminRole->id); // id only

        $user = new User();
        $user->name = $faker->name;
        $user->email = 'employee@example.com';
        $user->password = Hash::make('123456');
        $user->save();

        $this->addEmployeeDetails($user, $employeeRole);

        // Client details
        $user = new User();
        $user->name = $faker->name;
        $user->email = 'client@example.com';
        $user->password = Hash::make('123456');
        $user->save();

        $this->addClientDetails($user, $clientRole);

        // Multiple client create
        User::factory()->count((int)$count)->create()->each(function ($user) use ($clientRole) {
            $this->addClientDetails($user, $clientRole);
        });

        // Multiple employee create
        User::factory((int)$count)->create()->each(function ($user) use ($employeeRole) {
            $this->addEmployeeDetails($user, $employeeRole);
        });

    }

    private function addEmployeeDetails($user, $employeeRole)
    {
        $faker = \Faker\Factory::create();
        $employee = new \App\Models\EmployeeDetails();
        $employee->user_id = $user->id;
        /* @phpstan-ignore-line */
        $employee->employee_id = 'EMP-' . $user->id;
        /* @phpstan-ignore-line */
        $employee->address = $faker->address;
        $employee->hourly_rate = $faker->numberBetween(15, 100);
        $employee->department_id = rand(1, 6);
        $employee->designation_id = rand(1, 5);
        $employee->joining_date = now()->subMonths(9)->toDateTimeString();
        $employee->save();

        $search = new \App\Models\UniversalSearch();
        $search->searchable_id = $user->id;
        $search->title = $user->name;
        $search->route_name = 'employees.show';
        $search->save();

        // Assign Role
        $user->roles()->attach($employeeRole->id);
        /* @phpstan-ignore-line */
    }

    private function addClientDetails($user, $clientRole)
    {
        $faker = \Faker\Factory::create();
        $search = new UniversalSearch();
        $search->searchable_id = $user->id;
        /* @phpstan-ignore-line */
        $search->title = $user->name;
        /* @phpstan-ignore-line */
        $search->route_name = 'clients.show';
        $search->save();

        $client = new ClientDetails();
        $client->user_id = $user->id;
        /* @phpstan-ignore-line */
        $client->company_name = $faker->company;
        $client->address = $faker->address;
        $client->website = $faker->url;
        $client->save();

        // Assign Role
        $user->roles()->attach($clientRole->id);
        /* @phpstan-ignore-line */
    }

}
