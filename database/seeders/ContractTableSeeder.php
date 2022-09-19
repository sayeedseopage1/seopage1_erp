<?php
namespace Database\Seeders;

use App\Models\Setting;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ContractTableSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $setting = Setting::first();
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('contracts')->delete();
        $admin = User::join('role_user', 'role_user.user_id', '=', 'users.id')
            ->join('roles', 'roles.id', '=', 'role_user.role_id')
            ->where('roles.name', 'admin')
            ->select('users.id')
            ->first();

        $count = env('SEED_PROJECT_RECORD_COUNT', 20);
        $faker = \Faker\Factory::create();

        \App\Models\Contract::factory()->count((int)$count)->create()->each(function ($contract) use($faker, $admin, $setting) {
            $contract->contract_type_id = $faker->randomElement($this->getContractType()); /* @phpstan-ignore-line */
            $contract->client_id = $faker->randomElement($this->getClient()); /* @phpstan-ignore-line */
            $contract->added_by = $admin->id; /* @phpstan-ignore-line */
            $contract->currency_id = $setting->currency_id; /* @phpstan-ignore-line */
            $contract->save();
        });

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }

    public function getContractType()
    {
        return \App\Models\ContractType::inRandomOrder()->get()->pluck('id')->toArray();
    }

    public function getClient()
    {
        return \App\Models\User::join('role_user', 'role_user.user_id', '=', 'users.id')
            ->leftJoin('client_details', 'users.id', '=', 'client_details.user_id')
            ->join('roles', 'roles.id', '=', 'role_user.role_id')
            ->select('users.id', 'users.name', 'client_details.company_name', 'users.email', 'users.created_at')
            ->where('roles.name', 'client')
            ->inRandomOrder()
            ->get()->pluck('id')->toArray();
    }

}
