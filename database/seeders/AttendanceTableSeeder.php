<?php
namespace Database\Seeders;

use App\Models\Attendance;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AttendanceTableSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('attendances')->delete();

        DB::statement('ALTER TABLE attendances AUTO_INCREMENT = 1');

        $count = config('app.seed_record_count');
        $faker = \Faker\Factory::create();

        $users = User::join('role_user', 'role_user.user_id', '=', 'users.id')
            ->join('roles', 'roles.id', '=', 'role_user.role_id')
            ->leftJoin('employee_details', 'employee_details.user_id', '=', 'users.id')
            ->where('roles.name', 'employee')
            ->select('users.id')
            ->groupBy('users.id')->pluck('id')->toArray();

        $admin = User::join('role_user', 'role_user.user_id', '=', 'users.id')
            ->join('roles', 'roles.id', '=', 'role_user.role_id')
            ->where('roles.name', 'admin')
            ->select('users.id')
            ->first();

        for ($i = 1; $i <= $count; $i++) {
            foreach ($users as $user) {

                $date = $faker->randomElement([$faker->dateTimeThisMonth('now')->format('Y-m-d'), $faker->dateTimeThisYear('now')->format('Y-m-d')]);
                $start = $date . 'T' . $faker->randomElement(['09:00', '10:00', '11:00', '12:00', '13:00']) . '+00:00';

                $attendance = new Attendance();
                $attendance->user_id = $user;
                $attendance->half_day = 'no';
                $attendance->late = $faker->randomElement(['yes', 'no']);
                $attendance->clock_in_time = $clockIn = Carbon::parse($start)->addMinutes($faker->randomElement([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 10, 15, -20, 45, 120]))->format('Y-m-d H:i:s');
                $attendance->clock_out_time = Carbon::parse($clockIn)->addHours($faker->numberBetween(1, 9))->format('Y-m-d H:i:s');
                $attendance->clock_in_ip = $clockInIp = $faker->ipv4;
                $attendance->clock_out_ip = $clockInIp;
                $attendance->created_at = $faker->dateTimeThisYear('now');
                $attendance->added_by = $admin->id;
                $attendance->save();
            }
        }
    }

}
