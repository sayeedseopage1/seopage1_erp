<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
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
        Schema::create('daily_submission_fields', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('daily_submission_category_id');
            $table->string('title');
            $table->integer('type')->comment('1 - text, 2 - url, 3 - number, 4 - file, 5 - longText, 6 - list');
            $table->timestamps();
        });

        DB::table('daily_submission_fields')->insert([
            [
                'id' => 1,
                'daily_submission_category_id' => 1,
                'title' => 'Section 1 name',
                'type' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'daily_submission_category_id' => 1,
                'title' => 'Web versions',
                'type' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'daily_submission_category_id' => 1,
                'title' => 'Mobile versions',
                'type' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 4,
                'daily_submission_category_id' => 1,
                'title' => 'Tab versions',
                'type' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],[
                'id' => 5,
                'daily_submission_category_id' => 1,
                'title' => 'Web versions',
                'type' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 6,
                'daily_submission_category_id' => 1,
                'title' => 'Mobile versions',
                'type' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 7,
                'daily_submission_category_id' => 1,
                'title' => 'Tab versions',
                'type' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 8,
                'daily_submission_category_id' => 2,
                'title' => 'Name',
                'type' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 9,
                'daily_submission_category_id' => 2,
                'title' => 'Enter screenshot/screen record for section 1 on mobile device',
                'type' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 10,
                'daily_submission_category_id' => 2,
                'title' => 'Comments',
                'type' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 11,
                'daily_submission_category_id' => 3,
                'title' => 'Share the list of revisions assigned to you',
                'type' => 6,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 12,
                'daily_submission_category_id' => 3,
                'title' => 'Which ones of them did you complete today',
                'type' => 6,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 13,
                'daily_submission_category_id' => 3,
                'title' => 'Quantity Wise, what\'s the percentage of revisions you completed today',
                'type' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 14,
                'daily_submission_category_id' => 3,
                'title' => 'Comments',
                'type' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 15,
                'daily_submission_category_id' => 4,
                'title' => 'What was the bug about? (You can copy paste from the task details)',
                'type' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 16,
                'daily_submission_category_id' => 4,
                'title' => 'How much of it was fixed today? (In percentage)',
                'type' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 17,
                'daily_submission_category_id' => 4,
                'title' => 'Comments',
                'type' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 18,
                'daily_submission_category_id' => 5,
                'title' => 'What is the functionality about?',
                'type' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 19,
                'daily_submission_category_id' => 5,
                'title' => 'How much of it was completed today (In percentage)',
                'type' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 20,
                'daily_submission_category_id' => 5,
                'title' => 'Comments',
                'type' => 5,
                'created_at' => now(),
                'updated_at' => now(),
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
        Schema::dropIfExists('daily_submission_fields');
    }
};
