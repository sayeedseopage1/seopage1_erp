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
        Schema::create('criterias', function (Blueprint $table) {
            $table->id();
            $table->foreignId('criteria_id')->nullable()->constrained();
            $table->string('title');
            $table->timestamps();
        });

        \Illuminate\Support\Facades\DB::table('criterias')->insert([
                [
                    'id' => 1,
                    'title' => 'Signing the deliverables'
                ],
                [
                    'id' => 2,
                    'title' => 'Estimated hours vs logged hours'
                ],
                [
                    'id' => 3,
                    'title' => 'Amount of revisions'
                ],
                [
                    'id' => 4,
                    'title' => 'Milestone release'
                ],
                [
                    'id' => 5,
                    'title' => 'Project completion'
                ],
                [
                    'id' => 6,
                    'title' => 'Creating the tasks'
                ],
                [
                    'id' => 7,
                    'title' => 'Meeting the deadline'
                ],
                [
                    'id' => 8,
                    'title' => 'Reviewing the work'
                ],
                [
                    'id' => 9,
                    'title' => 'Number of projects completed in 7 days'
                ],
                [
                    'id' => 10,
                    'title' => 'Number of projects completed in 12 days'
                ],
                [
                    'id' => 11,
                    'title' => 'If the first submission is made within 100 hours of the form fill up time, the project manager will get some points depending on the project budget'
                ],
                [
                    'id' => 12,
                    'title' => 'Task hold time during assign phase'
                ],
                [
                    'id' => 13,
                    'title' => 'Task hold time during submission phase'
                ],
                [
                    'id' => 14,
                    'title' => 'Task hold time during revision submission'
                ],
                [
                    'id' => 15,
                    'title' => 'PM goals'
                ],
                [
                    'id' => 16,
                    'title' => "For every revision due to Pm's own fault (where in revision calculator, he is held responsible. Partial ones will also count)"
                ],
                [
                    'id' => 17,
                    'title' => "Billable hours per week"
                ],
                [
                    'id' => 18,
                    'title' => "Billed amount every week"
                ],
                [
                    'id' => 19,
                    'title' => "First submission"
                ],
                [
                    'id' => 20,
                    'title' => "Missing goals"
                ],
                [
                    'id' => 21,
                    'title' => "Revision due to Pm's fault"
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
        Schema::dropIfExists('criterias');
    }
};
