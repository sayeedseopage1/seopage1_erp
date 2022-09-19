<?php

namespace Database\Factories;

use App\Models\Ticket;
use App\Models\TicketChannel;
use App\Models\TicketType;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class TicketFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Ticket::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $types = TicketType::all()->pluck('id')->toArray();
        $users = User::all()->pluck('id')->toArray();
        $channels = TicketChannel::all()->pluck('id')->toArray();
        $agents = User::select('users.id as id')
            ->join('employee_details', 'users.id', '=', 'employee_details.user_id')
            ->join('role_user', 'role_user.user_id', '=', 'users.id')
            ->join('roles', 'roles.id', '=', 'role_user.role_id')
            ->where('roles.name', 'employee')
            ->inRandomOrder()
            ->get()->pluck('id')->toArray();

        return [
            'subject' => $this->faker->realText(70),
            'status' => $this->faker->randomElement(['open', 'pending', 'resolved', 'closed']),
            'priority' => $this->faker->randomElement(['low', 'high', 'medium', 'urgent']),
            'user_id' => $this->faker->randomElement($users),
            'agent_id' => $this->faker->randomElement($agents),
            'channel_id' => $this->faker->randomElement($channels),
            'type_id' => $this->faker->randomElement($types),
            'created_at' => $this->faker->randomElement([date('Y-m-d', strtotime( '+'.mt_rand(0, 7).' days')), $this->faker->dateTimeThisYear($max = 'now')]),
            'updated_at' => $this->faker->randomElement([date('Y-m-d', strtotime( '+'.mt_rand(0, 7).' days')), $this->faker->dateTimeThisYear($max = 'now')]),
        ];
    }

}
