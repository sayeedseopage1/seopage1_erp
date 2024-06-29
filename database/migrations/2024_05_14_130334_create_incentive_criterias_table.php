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
        Schema::create('incentive_criterias', function (Blueprint $table) {
            $table->id();
            $table->foreignId('incentive_type_id')->nullable()->constrained();
            $table->string('title');
            $table->decimal('min_limit')->default(0);
            $table->decimal('max_limit')->default(100);
            $table->timestamps();
        });

        DB::table('incentive_criterias')->insert([
            [
                'id' => 1,
                'incentive_type_id' => 1,
                'title' => 'Revision vs Task ratio',
                'min_limit' => 0,
                'max_limit' => 100,
            ],
            [
                'id' => 2,
                'incentive_type_id' => 1,
                'title' => 'Goal achieve rate',
                'min_limit' => 0,
                'max_limit' => 100,
            ],
            [
                'id' => 3,
                'incentive_type_id' => 1,
                'title' => 'Negative points vs positive points',
                'min_limit' => 0,
                'max_limit' => 100,
            ],
            [
                'id' => 4,
                'incentive_type_id' => 1,
                'title' => 'Percentage of delayed projects',
                'min_limit' => 0,
                'max_limit' => 100,
            ],
            [
                'id' => 5,
                'incentive_type_id' => 1,
                'title' => 'Milestone cancelation rate',
                'min_limit' => 0,
                'max_limit' => 100,
            ],
            [
                'id' => 6,
                'incentive_type_id' => 1,
                'title' => 'Dadeline miss rate',
                'min_limit' => 0,
                'max_limit' => 100,
            ],
            [
                'id' => 7,
                'incentive_type_id' => 1,
                'title' => 'Client retention rate',
                'min_limit' => 0,
                'max_limit' => 100,
            ],
            [
                'id' => 8,
                'incentive_type_id' => 2,
                'title' => 'Upsale/Cross sale amount',
                'min_limit' => 0,
                'max_limit' => 3000,
            ],
            [
                'id' => 9,
                'incentive_type_id' => 3,
                'title' => 'Bonus points based on released amount',
                'min_limit' => 6000,
                'max_limit' => 15000,
            ],
            [
                'id' => 10,
                'incentive_type_id' => 3,
                'title' => 'Unreleased payment amount',
                'min_limit' => 0,
                'max_limit' => 35000,
            ],
            [
                'id' => 11,
                'incentive_type_id' => 3,
                'title' => 'Bonus points based on released amount',
                'min_limit' => 0,
                'max_limit' => 100,
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
        Schema::dropIfExists('incentive_criterias');
    }
};
