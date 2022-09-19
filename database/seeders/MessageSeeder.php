<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MessageSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users_chat')->delete();

        DB::statement('ALTER TABLE users_chat AUTO_INCREMENT = 1');

        $count = config('app.seed_record_count');
        \App\Models\UserChat::factory()->count((int)$count)->create();
    }

}
