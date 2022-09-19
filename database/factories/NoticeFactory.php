<?php

namespace Database\Factories;

use App\Models\Notice;
use Illuminate\Database\Eloquent\Factories\Factory;

class NoticeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Notice::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'heading' => $this->faker->realText(70),
            'description' => $this->faker->realText(1000),
            'created_at' => $this->faker->randomElement([date('Y-m-d', strtotime( '+'.mt_rand(0, 7).' days')),$this->faker->dateTimeThisMonth($max = 'now'), $this->faker->dateTimeThisYear($max = 'now')]),
        ];
    }

}
