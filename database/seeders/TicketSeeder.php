<?php
namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use App\Models\TicketReply;
use App\Models\TicketAgentGroups;
use App\Models\TicketGroup;
use Illuminate\Support\Facades\DB;

class TicketSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Save agent
        DB::table('tickets')->delete();
        DB::table('ticket_agent_groups')->delete();
        DB::table('ticket_replies')->delete();

        DB::statement('ALTER TABLE tickets AUTO_INCREMENT = 1');
        DB::statement('ALTER TABLE ticket_agent_groups AUTO_INCREMENT = 1');
        DB::statement('ALTER TABLE ticket_replies AUTO_INCREMENT = 1');

        $faker = \Faker\Factory::create();
        $agents = $this->getEmployees();
        $groups = $this->getGroups();

        $count = config('app.seed_record_count');

        for($i = 1; $i <= $count; $i++) {
            $agent = new TicketAgentGroups();
            $agent->agent_id = $faker->randomElement($agents);
            $agent->group_id = $faker->randomElement($groups);
            $agent->save();
        }

        \App\Models\Ticket::factory()->count((int)$count)->create()->each(function ($ticket) use($faker, $count) {

            $usersArray = [$ticket->user_id, $ticket->agent_id]; /* @phpstan-ignore-line */
            $admins = $this->getAdmins();
            $usersData = array_merge($usersArray, $admins);

            for($i = 1; $i <= $count; $i++) {
                // Save  message
                $reply = new TicketReply();
                $reply->message = $faker->realText(50);
                $reply->ticket_id = $ticket->id; /* @phpstan-ignore-line */
                $reply->user_id = $faker->randomElement($usersData); // Current logged in user
                $reply->save();

                // Log search
                $search = new \App\Models\UniversalSearch();
                $search->searchable_id = $ticket->id; /* @phpstan-ignore-line */
                $search->title = 'Ticket: '.$ticket->subject; /* @phpstan-ignore-line */
                $search->route_name = 'tickets.show';
                $search->save();
            }
        });
    }

    private function getEmployees()
    {
        return User::select('users.id as id')
            ->join('employee_details', 'users.id', '=', 'employee_details.user_id')
            ->join('role_user', 'role_user.user_id', '=', 'users.id')
            ->join('roles', 'roles.id', '=', 'role_user.role_id')
            ->where('roles.name', 'employee')
            ->inRandomOrder()
            ->get()->pluck('id')->toArray();
    }

    private function getAdmins()
    {
        return User::select('users.id as id')
            ->join('employee_details', 'users.id', '=', 'employee_details.user_id')
            ->join('role_user', 'role_user.user_id', '=', 'users.id')
            ->join('roles', 'roles.id', '=', 'role_user.role_id')
            ->where('roles.name', 'admin')
            ->inRandomOrder()
            ->get()->pluck('id')->toArray();
    }

    private function getGroups()
    {
        return TicketGroup::inRandomOrder()
            ->get()->pluck('id')->toArray();
    }

}
