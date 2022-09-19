<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductTableSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('products')->delete();

        $count = env('SEED_PROJECT_RECORD_COUNT', 20);
        \Faker\Factory::create();

        \App\Models\Product::factory()->count((int)$count)->create();
    }

    public function getTaxes()
    {
        return \App\Models\Tax::get()->pluck('id')->toArray();
    }

}
