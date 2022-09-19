<?php

namespace Database\Factories;

use App\Models\EmployeeDetails;
use App\Models\Expense;
use Illuminate\Database\Eloquent\Factories\Factory;

class ExpenseFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Expense::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $employees = EmployeeDetails::all()->pluck('user_id')->toArray();
        return [
            'item_name' => $this->faker->text(20),
            'purchase_date' => $start = $this->faker->randomElement([$this->faker->dateTimeThisMonth($max = 'now'), $this->faker->dateTimeThisYear($max = 'now')]),
            /** @phpstan-ignore-next-line */
            'purchase_from' => $this->faker->state,
            'price' => $this->faker->numberBetween(100, 1000),
            'currency_id' => 1,
            'user_id' => $this->faker->randomElement($employees),
            'status' => $this->faker->randomElement(['approved', 'pending', 'rejected']),
        ];
    }

}
