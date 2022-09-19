<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;

class ExpenseSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $count = config('app.seed_record_count');
        \App\Models\Expense::factory()->count((int)$count)->create();
    }

}
