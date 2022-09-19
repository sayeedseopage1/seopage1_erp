<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $productArray = [
            'Tars',
            'Picard',
            'Cli-twitter',
            'Modify Application',
            'Odyssey',
            'Angkor',
            'Server Installation',
            'Web Installation',
            'Project Management',
            'User Management',
            'Eyeq',
            'School Management',
            'Restaurant Management',
            'Examination System Project',
            'Cinema Ticket Booking System',
            'Airline Reservation System',
            'Website Copier Project',
            'Chat Application',
            'Payment Billing System',
            'Identification System',
            'Document management System',
            'Live Meeting'
        ];
    
        return [
            'name' => $this->faker->randomElement($productArray),
            'price' => $this->faker->numberBetween(100, 1000),
            'allow_purchase' => 1,
            'description' => $this->faker->paragraph,
        ];
    }

}
