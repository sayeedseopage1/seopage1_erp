<?php

namespace Database\Factories;

use App\Models\Contract;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class ContractFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Contract::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'subject' => $this->faker->realText(20),
            'amount' => $amount = $this->faker->numberBetween(100, 1000),
            'original_amount' => $amount,
            'start_date' => $start = $this->faker->dateTimeThisMonth(Carbon::now()),
            'original_start_date' => $start,
            'end_date' => $end = now()->addMonths($this->faker->numberBetween(1, 5))->format('Y-m-d'),
            'original_end_date' => $end,
            'description' => $this->faker->paragraph,
            'contract_detail' => $this->faker->realText(300),
        ];
    }

}
