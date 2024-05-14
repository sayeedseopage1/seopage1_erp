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
        Schema::create('incentive_factors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('incentive_criteria_id')->nullable()->constrained();
            $table->decimal('lower_limit')->default(0);
            $table->decimal('upper_limit')->default(0);
            $table->unsignedInteger('incentive_amount_type')->default(2)->comment('1 = Static, 2 = Percentage');
            $table->decimal('incentive_amount')->default(0);
            $table->timestamps();
        });

        DB::table('incentive_factors')->insert([
            [
                'id' => 1,
                'incentive_criteria_id' => 1,
                'lower_limit' => 0,
                'upper_limit' => 10,
                'incentive_amount_type' => 2,
                'incentive_amount' => 100
            ],
            [
                'id' => 2,
                'incentive_criteria_id' => 1,
                'lower_limit' => 10,
                'upper_limit' => 20,
                'incentive_amount_type' => 2,
                'incentive_amount' => 80
            ],
            [
                'id' => 3,
                'incentive_criteria_id' => 1,
                'lower_limit' => 20,
                'upper_limit' => 35,
                'incentive_amount_type' => 2,
                'incentive_amount' => 50
            ],
            [
                'id' => 4,
                'incentive_criteria_id' => 1,
                'lower_limit' => 30,
                'upper_limit' => 50,
                'incentive_amount_type' => 2,
                'incentive_amount' => 0
            ],
            [
                'id' => 5,
                'incentive_criteria_id' => 1,
                'lower_limit' => 50,
                'upper_limit' => 65,
                'incentive_amount_type' => 2,
                'incentive_amount' => 0
            ],
            [
                'id' => 6,
                'incentive_criteria_id' => 1,
                'lower_limit' => 65,
                'upper_limit' => 80,
                'incentive_amount_type' => 2,
                'incentive_amount' => 0
            ],
            [
                'id' => 7,
                'incentive_criteria_id' => 1,
                'lower_limit' => 80,
                'upper_limit' => 100,
                'incentive_amount_type' => 2,
                'incentive_amount' => 0
            ],
            [
                'id' => 8,
                'incentive_criteria_id' => 2,
                'lower_limit' => 0,
                'upper_limit' => 40,
                'incentive_amount_type' => 2,
                'incentive_amount' => 0
            ],
            [
                'id' => 9,
                'incentive_criteria_id' => 2,
                'lower_limit' => 40,
                'upper_limit' => 50,
                'incentive_amount_type' => 2,
                'incentive_amount' => 50
            ],
            [
                'id' => 10,
                'incentive_criteria_id' => 2,
                'lower_limit' => 50,
                'upper_limit' => 75,
                'incentive_amount_type' => 2,
                'incentive_amount' => 80
            ],
            [
                'id' => 11,
                'incentive_criteria_id' => 2,
                'lower_limit' => 75,
                'upper_limit' => 80,
                'incentive_amount_type' => 2,
                'incentive_amount' => 100
            ],
            [
                'id' => 12,
                'incentive_criteria_id' => 2,
                'lower_limit' => 80,
                'upper_limit' => 85,
                'incentive_amount_type' => 2,
                'incentive_amount' => 100
            ],
            [
                'id' => 13,
                'incentive_criteria_id' => 2,
                'lower_limit' => 85,
                'upper_limit' => 90,
                'incentive_amount_type' => 2,
                'incentive_amount' => 100
            ],
            [
                'id' => 14,
                'incentive_criteria_id' => 2,
                'lower_limit' => 90,
                'upper_limit' => 100,
                'incentive_amount_type' => 2,
                'incentive_amount' => 100
            ],
            [
                'id' => 15,
                'incentive_criteria_id' => 3,
                'lower_limit' => 0,
                'upper_limit' => 25,
                'incentive_amount_type' => 2,
                'incentive_amount' => 100
            ],
            [
                'id' => 16,
                'incentive_criteria_id' => 3,
                'lower_limit' => 25,
                'upper_limit' => 35,
                'incentive_amount_type' => 2,
                'incentive_amount' => 80
            ],
            [
                'id' => 17,
                'incentive_criteria_id' => 3,
                'lower_limit' => 35,
                'upper_limit' => 50,
                'incentive_amount_type' => 2,
                'incentive_amount' => 50
            ],
            [
                'id' => 18,
                'incentive_criteria_id' => 3,
                'lower_limit' => 50,
                'upper_limit' => 65,
                'incentive_amount_type' => 2,
                'incentive_amount' => 0
            ],
            [
                'id' => 19,
                'incentive_criteria_id' => 3,
                'lower_limit' => 65,
                'upper_limit' => 80,
                'incentive_amount_type' => 2,
                'incentive_amount' => 0
            ],
            [
                'id' => 20,
                'incentive_criteria_id' => 3,
                'lower_limit' => 80,
                'upper_limit' => 95,
                'incentive_amount_type' => 2,
                'incentive_amount' => 0
            ],
            [
                'id' => 21,
                'incentive_criteria_id' => 3,
                'lower_limit' => 95,
                'upper_limit' => 100,
                'incentive_amount_type' => 2,
                'incentive_amount' => 0
            ],
            [
                'id' => 22,
                'incentive_criteria_id' => 4,
                'lower_limit' => 0,
                'upper_limit' => 30,
                'incentive_amount_type' => 2,
                'incentive_amount' => 120
            ],
            [
                'id' => 23,
                'incentive_criteria_id' => 4,
                'lower_limit' => 30,
                'upper_limit' => 40,
                'incentive_amount_type' => 2,
                'incentive_amount' => 100
            ],
            [
                'id' => 24,
                'incentive_criteria_id' => 4,
                'lower_limit' => 40,
                'upper_limit' => 50,
                'incentive_amount_type' => 2,
                'incentive_amount' => 80
            ],
            [
                'id' => 25,
                'incentive_criteria_id' => 4,
                'lower_limit' => 50,
                'upper_limit' => 60,
                'incentive_amount_type' => 2,
                'incentive_amount' => 50
            ],
            [
                'id' => 26,
                'incentive_criteria_id' => 4,
                'lower_limit' => 60,
                'upper_limit' => 70,
                'incentive_amount_type' => 2,
                'incentive_amount' => 0
            ],
            [
                'id' => 27,
                'incentive_criteria_id' => 4,
                'lower_limit' => 70,
                'upper_limit' => 80,
                'incentive_amount_type' => 2,
                'incentive_amount' => 0
            ],
            [
                'id' => 28,
                'incentive_criteria_id' => 4,
                'lower_limit' => 80,
                'upper_limit' => 100,
                'incentive_amount_type' => 2,
                'incentive_amount' => 0
            ],
            [
                'id' => 29,
                'incentive_criteria_id' => 5,
                'lower_limit' => 0,
                'upper_limit' => 3,
                'incentive_amount_type' => 2,
                'incentive_amount' => 120
            ],
            [
                'id' => 30,
                'incentive_criteria_id' => 5,
                'lower_limit' => 3,
                'upper_limit' => 5,
                'incentive_amount_type' => 2,
                'incentive_amount' => 100
            ],
            [
                'id' => 31,
                'incentive_criteria_id' => 5,
                'lower_limit' => 5,
                'upper_limit' => 10,
                'incentive_amount_type' => 2,
                'incentive_amount' => 50
            ],
            [
                'id' => 32,
                'incentive_criteria_id' => 5,
                'lower_limit' => 10,
                'upper_limit' => 15,
                'incentive_amount_type' => 2,
                'incentive_amount' => 20
            ],
            [
                'id' => 33,
                'incentive_criteria_id' => 5,
                'lower_limit' => 15,
                'upper_limit' => 20,
                'incentive_amount_type' => 2,
                'incentive_amount' => 0
            ],
            [
                'id' => 34,
                'incentive_criteria_id' => 5,
                'lower_limit' => 20,
                'upper_limit' => 30,
                'incentive_amount_type' => 2,
                'incentive_amount' => 0
            ],
            [
                'id' => 35,
                'incentive_criteria_id' => 5,
                'lower_limit' => 30,
                'upper_limit' => 100,
                'incentive_amount_type' => 2,
                'incentive_amount' => 0
            ],
            [
                'id' => 36,
                'incentive_criteria_id' => 6,
                'lower_limit' => 0,
                'upper_limit' => 30,
                'incentive_amount_type' => 2,
                'incentive_amount' => 100
            ],
            [
                'id' => 37,
                'incentive_criteria_id' => 6,
                'lower_limit' => 30,
                'upper_limit' => 40,
                'incentive_amount_type' => 2,
                'incentive_amount' => 80
            ],
            [
                'id' => 38,
                'incentive_criteria_id' => 6,
                'lower_limit' => 40,
                'upper_limit' => 45,
                'incentive_amount_type' => 2,
                'incentive_amount' => 50
            ],
            [
                'id' => 39,
                'incentive_criteria_id' => 6,
                'lower_limit' => 45,
                'upper_limit' => 50,
                'incentive_amount_type' => 2,
                'incentive_amount' => 20
            ],
            [
                'id' => 40,
                'incentive_criteria_id' => 6,
                'lower_limit' => 50,
                'upper_limit' => 65,
                'incentive_amount_type' => 2,
                'incentive_amount' => 0
            ],
            [
                'id' => 41,
                'incentive_criteria_id' => 6,
                'lower_limit' => 65,
                'upper_limit' => 80,
                'incentive_amount_type' => 2,
                'incentive_amount' => 0
            ],
            [
                'id' => 42,
                'incentive_criteria_id' => 6,
                'lower_limit' => 80,
                'upper_limit' => 100,
                'incentive_amount_type' => 2,
                'incentive_amount' => 0
            ],
            [
                'id' => 43,
                'incentive_criteria_id' => 7,
                'lower_limit' => 0,
                'upper_limit' => 5,
                'incentive_amount_type' => 2,
                'incentive_amount' => 0
            ],
            [
                'id' => 44,
                'incentive_criteria_id' => 7,
                'lower_limit' => 5,
                'upper_limit' => 10,
                'incentive_amount_type' => 2,
                'incentive_amount' => 50
            ],
            [
                'id' => 45,
                'incentive_criteria_id' => 7,
                'lower_limit' => 10,
                'upper_limit' => 15,
                'incentive_amount_type' => 2,
                'incentive_amount' => 80
            ],
            [
                'id' => 46,
                'incentive_criteria_id' => 7,
                'lower_limit' => 15,
                'upper_limit' => 20,
                'incentive_amount_type' => 2,
                'incentive_amount' => 100
            ],
            [
                'id' => 47,
                'incentive_criteria_id' => 7,
                'lower_limit' => 20,
                'upper_limit' => 100,
                'incentive_amount_type' => 2,
                'incentive_amount' => 120
            ],
            [
                'id' => 48,
                'incentive_criteria_id' => 8,
                'lower_limit' => 0,
                'upper_limit' => 500,
                'incentive_amount_type' => 2,
                'incentive_amount' => 3
            ],
            [
                'id' => 49,
                'incentive_criteria_id' => 8,
                'lower_limit' => 500,
                'upper_limit' => 1200,
                'incentive_amount_type' => 2,
                'incentive_amount' => 4
            ],
            [
                'id' => 50,
                'incentive_criteria_id' => 8,
                'lower_limit' => 1200,
                'upper_limit' => 1800,
                'incentive_amount_type' => 2,
                'incentive_amount' => 5
            ],
            [
                'id' => 51,
                'incentive_criteria_id' => 8,
                'lower_limit' => 1800,
                'upper_limit' => 3000,
                'incentive_amount_type' => 2,
                'incentive_amount' => 5.5
            ],
            [
                'id' => 52,
                'incentive_criteria_id' => 8,
                'lower_limit' => 3000,
                'upper_limit' => 3000,
                'incentive_amount_type' => 2,
                'incentive_amount' => 6
            ],
            [
                'id' => 53,
                'incentive_criteria_id' => 9,
                'lower_limit' => 0,
                'upper_limit' => 6000,
                'incentive_amount_type' => 1,
                'incentive_amount' => 0
            ],
            [
                'id' => 54,
                'incentive_criteria_id' => 9,
                'lower_limit' => 6000,
                'upper_limit' => 8000,
                'incentive_amount_type' => 1,
                'incentive_amount' => 20
            ],
            [
                'id' => 55,
                'incentive_criteria_id' => 9,
                'lower_limit' => 8000,
                'upper_limit' => 10000,
                'incentive_amount_type' => 1,
                'incentive_amount' => 40
            ],
            [
                'id' => 56,
                'incentive_criteria_id' => 9,
                'lower_limit' => 10000,
                'upper_limit' => 12000,
                'incentive_amount_type' => 1,
                'incentive_amount' => 60
            ],
            [
                'id' => 57,
                'incentive_criteria_id' => 9,
                'lower_limit' => 12000,
                'upper_limit' => 15000,
                'incentive_amount_type' => 1,
                'incentive_amount' => 80
            ],
            [
                'id' => 58,
                'incentive_criteria_id' => 9,
                'lower_limit' => 15000,
                'upper_limit' => 15000,
                'incentive_amount_type' => 1,
                'incentive_amount' => 120
            ],
            [
                'id' => 59,
                'incentive_criteria_id' => 10,
                'lower_limit' => 0,
                'upper_limit' => 5000,
                'incentive_amount_type' => 2,
                'incentive_amount' => 100
            ],
            [
                'id' => 60,
                'incentive_criteria_id' => 10,
                'lower_limit' => 5000,
                'upper_limit' => 10000,
                'incentive_amount_type' => 2,
                'incentive_amount' => 80
            ],
            [
                'id' => 61,
                'incentive_criteria_id' => 10,
                'lower_limit' => 10000,
                'upper_limit' => 15000,
                'incentive_amount_type' => 2,
                'incentive_amount' => 50
            ],
            [
                'id' => 62,
                'incentive_criteria_id' => 10,
                'lower_limit' => 15000,
                'upper_limit' => 20000,
                'incentive_amount_type' => 2,
                'incentive_amount' => 10
            ],
            [
                'id' => 63,
                'incentive_criteria_id' => 10,
                'lower_limit' => 20000,
                'upper_limit' => 25000,
                'incentive_amount_type' => 2,
                'incentive_amount' => 0
            ],
            [
                'id' => 64,
                'incentive_criteria_id' => 10,
                'lower_limit' => 25000,
                'upper_limit' => 30000,
                'incentive_amount_type' => 2,
                'incentive_amount' => 0
            ],
            [
                'id' => 65,
                'incentive_criteria_id' => 10,
                'lower_limit' => 30000,
                'upper_limit' => 35000,
                'incentive_amount_type' => 2,
                'incentive_amount' => 0
            ],















        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('incentive_factors');
    }
};
