<?php

namespace Database\Seeders;

use App\Models\SalesPolicyQuestion;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SalesPolicyQuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $salesPolicyQuestionList =  [
            [
                'id' => 1,
                'title' => 'Do we need to create a homepage?',
                'type' => 'yesNo',
                'key' => 'hourlyRate',
                'value' => NULL,
                'parent_id' => NULL,
                'sequence' => 1,
                'policy_id' => 1,
                'placeholder' => 'Select Yes or No',
                'comment' => NULL,
                'created_at' => '2024-04-18 11:41:20',
                'updated_at' => '2024-04-18 11:41:20',
              ],
              [
                'id' => 2,
                'title' => 'How many other primary pages do we need to create?',
                'type' => 'numeric',
                'key' => 'hourlyRate',
                'value' => NULL,
                'parent_id' => NULL,
                'sequence' => 2,
                'policy_id' => 1,
                'placeholder' => 'Enter Number',
                'comment' => NULL,
                'created_at' => '2024-04-18 11:43:24',
                'updated_at' => '2024-04-18 11:43:24',
              ],
              [
                'id' => 3,
                'title' => 'How many secondary pages will be there?',
                'type' => 'numeric',
                'key' => 'hourlyRate',
                'value' => NULL,
                'parent_id' => NULL,
                'sequence' => 3,
                'policy_id' => 1,
                'placeholder' => 'Enter Number',
                'comment' => NULL,
                'created_at' => '2024-04-18 11:43:59',
                'updated_at' => '2024-04-18 11:43:59',
              ],
              [
                'id' => 4,
                'title' => 'How many hours of other works will be needed here? Functional works you have input the hours count depending on the difficulties involved?',
                'type' => 'numeric',
                'key' => 'hourlyRate',
                'value' => NULL,
                'parent_id' => NULL,
                'sequence' => 4,
                'policy_id' => 1,
                'placeholder' => 'Enter Number',
                'comment' => NULL,
                'created_at' => '2024-04-18 11:44:33',
                'updated_at' => '2024-04-18 11:44:33',
              ],
              [
                'id' => 5,
                'title' => 'Did the client fund full milestone?',
                'type' => 'yesNo',
                'key' => 'milestone',
                'value' => NULL,
                'parent_id' => NULL,
                'sequence' => 1,
                'policy_id' => 7,
                'placeholder' => 'Select Yes or No',
                'comment' => NULL,
                'created_at' => '2024-04-18 11:45:00',
                'updated_at' => '2024-04-18 11:45:00',
              ],
              [
                'id' => 6,
                'title' => 'What amount of milestone did he create?',
                'type' => 'numeric',
                'key' => 'milestone',
                'value' => 'no',
                'parent_id' => 5,
                'sequence' => 2,
                'policy_id' => 7,
                'placeholder' => 'Enter Number',
                'comment' => NULL,
                'created_at' => '2024-04-18 11:54:00',
                'updated_at' => '2024-04-18 11:54:00',
              ],
              [
                'id' => 7,
                'title' => 'Why did he create xxx% of milestone?',
                'type' => 'list',
                'key' => 'milestone',
                'value' => '[{"id":"7_1","title":"The client\'s bank is rejecting his card after creating 2-3 milestones. He will do the rest tomorrow"},{"id":"7_2","title":"The client is getting error from the system after creating 1-3 milestones. He will try again in a few hours or so"},{"id":"7_3","title":"The client will create the milestones as we complete the previous milestones work"}]',
                'parent_id' => 6,
                'sequence' => 3,
                'policy_id' => 7,
                'placeholder' => 'Select from List',
                'comment' => NULL,
                'created_at' => '2024-04-18 11:57:56',
                'updated_at' => '2024-04-18 11:57:56',
              ],
              [
                'id' => 8,
                'title' => 'Did the client issue any sort of threat at any point like he wont pay if something is not done?',
                'type' => 'yesNo',
                'key' => 'threat',
                'value' => NULL,
                'parent_id' => NULL,
                'sequence' => 1,
                'policy_id' => 12,
                'placeholder' => 'Select Yes or No',
                'comment' => NULL,
                'created_at' => '2024-04-18 11:59:00',
                'updated_at' => '2024-04-18 11:59:00',
              ],
              [
                'id' => 9,
                'title' => 'What did he exactly say?',
                'type' => 'longText',
                'key' => 'threat',
                'value' => 'yes',
                'parent_id' => 8,
                'sequence' => 2,
                'policy_id' => 12,
                'placeholder' => 'Describe Here',
                'comment' => NULL,
                'created_at' => '2024-04-18 11:59:56',
                'updated_at' => '2024-04-18 11:59:56',
              ],
              [
                'id' => 10,
                'title' => 'Did the client mention anything like he tried to get this done by someone else before and he failed?',
                'type' => 'yesNo',
                'key' => 'doneByElse',
                'value' => NULL,
                'parent_id' => NULL,
                'sequence' => 1,
                'policy_id' => 14,
                'placeholder' => 'Select Yes or No',
                'comment' => NULL,
                'created_at' => '2024-04-18 12:00:30',
                'updated_at' => '2024-04-18 12:00:30',
              ],
              [
                'id' => 11,
                'title' => 'Was it due to the technical challenge',
                'type' => 'yesNo',
                'key' => 'doneByElse',
                'value' => 'yes',
                'parent_id' => 10,
                'sequence' => 2,
                'policy_id' => 14,
                'placeholder' => 'Select Yes or No',
                'comment' => NULL,
                'created_at' => '2024-04-18 12:01:46',
                'updated_at' => '2024-04-18 12:01:46',
              ],
              [
                'id' => 12,
                'title' => 'What did he exactly say?',
                'type' => 'longText',
                'key' => 'doneByElse',
                'value' => 'yes',
                'parent_id' => 11,
                'sequence' => 3,
                'policy_id' => 14,
                'placeholder' => 'Describe Here',
                'comment' => NULL,
                'created_at' => '2024-04-18 12:03:27',
                'updated_at' => '2024-04-18 12:03:27',
              ],
              [
                'id' => 13,
                'title' => 'Is this one of the routine works we do? For example, to the best of your knowledge, did we do exactly the  same thing in the last 3 months? For example, page design, theme customization those',
                'type' => 'yesNo',
                'key' => 'routeWork',
                'value' => NULL,
                'parent_id' => NULL,
                'sequence' => 1,
                'policy_id' => 17,
                'placeholder' => 'Select Yes or No',
                'comment' => NULL,
                'created_at' => '2024-04-18 12:04:04',
                'updated_at' => '2024-04-18 12:04:04',
              ],
              [
                'id' => 14,
                'title' => 'Does the client know we may not be much available during the weekend will start the planning work from Monday only? Did he agree with that ?',
                'type' => 'yesNo',
                'key' => 'availableWeekend',
                'value' => NULL,
                'parent_id' => NULL,
                'sequence' => 1,
                'policy_id' => 19,
                'placeholder' => 'Select Yes or No',
                'comment' => NULL,
                'created_at' => '2024-04-18 12:05:08',
                'updated_at' => '2024-04-18 12:05:08',
              ],
              [
                'id' => 15,
                'title' => 'Does the client know we may need at least 4-5 days for the first submission which will include some visible work? Did he accept this?  We may need time for planning, understanding requirement',
                'type' => 'yesNo',
                'key' => 'firstSubmission',
                'value' => NULL,
                'parent_id' => NULL,
                'sequence' => 1,
                'policy_id' => 21,
                'placeholder' => 'Select Yes or No',
                'comment' => NULL,
                'created_at' => '2024-04-18 12:06:13',
                'updated_at' => '2024-04-18 12:06:13',
              ],
              [
                'id' => 16,
                'title' => 'What does he/she expect exactly?',
                'type' => 'longText',
                'key' => 'firstSubmission',
                'value' => 'no',
                'parent_id' => 15,
                'sequence' => 2,
                'policy_id' => 21,
                'placeholder' => 'Describe Here',
                'comment' => NULL,
                'created_at' => '2024-04-18 12:08:23',
                'updated_at' => '2024-04-18 12:08:23',
              ],
              [
                'id' => 17,
                'title' => 'Did the client happily accept our price proposal after negotiation? In other words, does he have any sort of dissatisfaction  over the price he is paying?',
                'type' => 'yesNo',
                'key' => 'acceptPriceProposal',
                'value' => NULL,
                'parent_id' => NULL,
                'sequence' => 1,
                'policy_id' => 23,
                'placeholder' => 'Select Yes or No',
                'comment' => NULL,
                'created_at' => '2024-04-18 12:08:52',
                'updated_at' => '2024-04-18 12:08:52',
              ],
            ];

        foreach ($salesPolicyQuestionList as $item) {
            SalesPolicyQuestion::create($item);
        }
    }
}
