<?php

namespace Database\Factories;

use App\Models\Event;
use DateInterval;
use Illuminate\Database\Eloquent\Factories\Factory;

class EventFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Event::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'event_name' => $this->faker->text(20),
            'label_color' => $this->faker->randomElement(['#1d82f5', '#800080', '#808000', '#008000', '#0000A0', '#000000']),
            'where' => $this->faker->address,
            'description' => $this->faker->paragraph,
            'start_date_time' => $start = $this->faker->randomElement([$this->faker->dateTimeThisMonth($max = 'now'), $this->faker->dateTimeThisYear($max = 'now')]),
            'end_date_time' => $this->faker->dateTimeBetween($start, $start->add(new DateInterval('PT10H30S'))),
            'repeat' => 'no',
        ];
    }

}
