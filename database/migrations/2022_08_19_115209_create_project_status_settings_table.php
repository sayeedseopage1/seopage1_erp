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
        Schema::create('project_status_settings', function (Blueprint $table) {
            $table->id();
            $table->string('status_name');
            $table->string('color');
            $table->enum('status', ['active', 'inactive']);
            $table->enum('default_status', ['1', '0']);
            $table->timestamps();
        });

        DB::table('project_status_settings')->insert(
        [
                [
                    'status_name' => 'in progress',
                    'color' => '#00b5ff',
                    'status' => 'active',
                    'default_status' => 1
                ],
                [
                    'status_name' => 'not started',
                    'color' => '#616e80',
                    'status' => 'active',
                    'default_status' => '0'
                ],
                [
                    'status_name' => 'on hold',
                    'color' => '#f5c308',
                    'status' => 'active',
                    'default_status' => '0'
                ],
                [
                    'status_name' => 'canceled',
                    'color' => '#d21010',
                    'status' => 'active',
                    'default_status' => '0'
                ],
                [
                    'status_name' => 'finished',
                    'color' => '#679c0d',
                    'status' => 'active',
                    'default_status' => '0'
                ],
            ]

        );

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('project_status_settings');
    }

};
