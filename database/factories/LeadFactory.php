<?php

namespace Database\Factories;

use App\Models\Lead;
use Illuminate\Database\Eloquent\Factories\Factory;

class LeadFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Lead::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'company_name' => $this->faker->company,
            'address' => $this->faker->address,
            'client_name' => $this->faker->name,
            'client_email' => $this->faker->email,
            'mobile' => $this->faker->randomNumber(8),
            'note' => $this->faker->realText(200),
            'next_follow_up' => 'yes',
        ];
    }

}
