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
            $table->longText('description')->nullable();
            $table->timestamps();
        });

        \Illuminate\Support\Facades\DB::table('criterias')->insert([
                [
                    'id' => 1,
                    'title' => 'Signing the deliverables',
                    'description' => null
                ],
                [
                    'id' => 2,
                    'title' => 'Estimated hours vs logged hours',
                    'description' => null
                ],
                [
                    'id' => 3,
                    'title' => 'Amount of revisions',
                    'description' => null
                ],
                [
                    'id' => 4,
                    'title' => 'Milestone release',
                    'description' => null
                ],
                [
                    'id' => 5,
                    'title' => 'Project completion',
                    'description' => null
                ],
                [
                    'id' => 6,
                    'title' => 'Creating the tasks',
                    'description' => null
                ],
                [
                    'id' => 7,
                    'title' => 'Meeting the deadline',
                    'description' => null
                ],
                [
                    'id' => 8,
                    'title' => 'Reviewing the work',
                    'description' => null
                ],
                [
                    'id' => 9,
                    'title' => 'Number of projects completed in 7 days',
                    'description' => null
                ],
                [
                    'id' => 10,
                    'title' => 'Number of projects completed in 12 days',
                    'description' => null
                ],
                [
                    'id' => 11,
                    'title' => 'If the first submission is made within 100 hours of the form fill up time, the project manager will get some points depending on the project budget',
                    'description' => null
                ],
                [
                    'id' => 12,
                    'title' => 'Task hold time during assign phase',
                    'description' => 'During the assign phase, the hold time will count after 48 hours will pass from the large sales form submission time. In other words, if they do not create the first task in the first 48 hours after sales form will be submitted, the hold time will start counting for the 1st task'
                ],
                [
                    'id' => 13,
                    'title' => 'Task hold time during submission phase',
                    'description' => 'During the submission phase, hold time will start counting 12 hours after the lead developer will submit'
                ],
                [
                    'id' => 14,
                    'title' => 'Task hold time during revision submission',
                    'description' => 'During the revision phase, more than 4 hours will count as task hold time.'
                ],
                [
                    'id' => 15,
                    'title' => 'PM goals',
                    'description' => null
                ],
                [
                    'id' => 16,
                    'title' => "For every revision due to Pm's own fault (where in revision calculator, he is held responsible. Partial ones will also count)",
                    'description' => null
                ],
                [
                    'id' => 17,
                    'title' => "Billable hours per week",
                    'description' => null
                ],
                [
                    'id' => 18,
                    'title' => "Billed amount every week",
                    'description' => null
                ],
                [
                    'id' => 19,
                    'title' => "First submission",
                    'description' => null
                ],
                [
                    'id' => 20,
                    'title' => "Missing goals",
                    'description' => null
                ],
                [
                    'id' => 21,
                    'title' => "Revision due to Pm's fault",
                    'description' => null
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
