<?php

namespace Database\Seeders;

use App\Models\Designation;
use App\Models\Team;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DepartmentTableSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('teams')->delete();
        DB::table('designations')->delete();

        DB::statement('ALTER TABLE teams AUTO_INCREMENT = 1');
        DB::statement('ALTER TABLE designations AUTO_INCREMENT = 1');

        $departments = [
            ['team_name' => 'Marketing'],
            ['team_name' => 'Sales'],
            ['team_name' => 'Human Resources'],
            ['team_name' => 'Public Relations'],
            ['team_name' => 'Research'],
            ['team_name' => 'Finance']
        ];

        $designations = [
            ['name' => 'Trainee'],
            ['name' => 'Senior'],
            ['name' => 'Junior'],
            ['name' => 'Team Lead'],
            ['name' => 'Project Manager']
        ];

        Team::insert($departments);
        Designation::insert($designations);
    }

}
