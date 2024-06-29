<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('incentive_types', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->decimal('cash_value')->default(0);
            $table->timestamps();
        });

        DB::table('incentive_types')->insert([
            [
                'id' => 1,
                'title' => 'Regular',
                'cash_value' => 20
            ],[
                'id' => 2,
                'title' => 'Upsale/Cross Sale',
                'cash_value' => 100
            ],[
                'id' => 3,
                'title' => 'Bonus',
                'cash_value' => 100
            ]
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('incentive_types');
    }
};
