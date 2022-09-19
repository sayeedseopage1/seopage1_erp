<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\UserChat;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserChatFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = UserChat::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $user = $this->getUniqueUsers();

        return [
            'message' => $this->faker->realText(200),
            'user_one' => $user['from'],
            'user_id' => $user['to'],
            'from' => $user['from'],
            'to' => $user['to'],
        ];
    }

    public function getUniqueUsers()
    {
        $employees = User::allEmployees()->pluck('id')->toArray();

        $from = array_rand($employees);
        $from = $employees[$from];

        foreach (array_keys($employees, $from) as $key) {
            unset($employees[$key]);
        }

        $to = array_rand($employees);
        $to = $employees[$to];

        return [
            'from' => $from,
            'to' => $to,
        ];
    }

}
