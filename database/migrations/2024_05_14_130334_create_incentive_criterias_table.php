<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

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
            $table->timestamps();
        });

        DB::table('incentive_criterias')->insert([
            [
                'id' => 1,
                'incentive_type_id' => 1,
                'title' => 'Revision vs Task ratio'
            ],
            [
                'id' => 2,
                'incentive_type_id' => 1,
                'title' => 'Goal achieve rate'
            ],
            [
                'id' => 3,
                'incentive_type_id' => 1,
                'title' => 'Negative points vs positive points'
            ],
            [
                'id' => 4,
                'incentive_type_id' => 1,
                'title' => 'Percentage of delayed projects'
            ],
            [
                'id' => 5,
                'incentive_type_id' => 1,
                'title' => 'Milestone cancelation rate'
            ],
            [
                'id' => 6,
                'incentive_type_id' => 1,
                'title' => 'Dadeline miss rate'
            ],
            [
                'id' => 7,
                'incentive_type_id' => 1,
                'title' => 'Client retention rate'
            ],
            [
                'id' => 8,
                'incentive_type_id' => 2,
                'title' => 'Upsale/Cross sale amount'
            ],
            [
                'id' => 9,
                'incentive_type_id' => 3,
                'title' => 'Bonus points based on released amount > 6000'
            ],
            [
                'id' => 10,
                'incentive_type_id' => 3,
                'title' => 'Unreleased payment amount > 6000'
            ],
            [
                'id' => 11,
                'incentive_type_id' => 3,
                'title' => 'Bonus points based on released amount < 6000'
            ],
            [
                'id' => 12,
                'incentive_type_id' => 3,
                'title' => 'Unreleased payment amount < 6000'
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
        Schema::dropIfExists('incentive_criterias');
    }
};
