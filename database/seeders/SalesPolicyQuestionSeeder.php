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
        $sales_policy_questions = array(
            array(
                "id" => 1,
                "title" => "Do we need to create a homepage",
                "type" => "yes_no",
                "parent_id" => NULL,
                "sequence" => 1,
                "policy_id" => 1,
                "placeholder" => NULL,
                "department" => "wd",
                "created_at" => "2024-03-05 10:44:16",
                "updated_at" => "2024-03-05 10:44:17",
            ),
            array(
                "id" => 2,
                "title" => "How many other primary pages do we need to create?",
                "type" => "numeric",
                "parent_id" => NULL,
                "sequence" => 1,
                "policy_id" => 1,
                "placeholder" => NULL,
                "department" => "wd",
                "created_at" => "2024-03-05 10:44:16",
                "updated_at" => "2024-03-05 10:44:17",
            ),
            array(
                "id" => 3,
                "title" => "How many secondary pages will be there?",
                "type" => "numeric",
                "parent_id" => NULL,
                "sequence" => 1,
                "policy_id" => 1,
                "placeholder" => NULL,
                "department" => "wd",
                "created_at" => "2024-03-05 10:44:16",
                "updated_at" => "2024-03-05 10:44:17",
            ),
            array(
                "id" => 4,
                "title" => "How many hours of other works will be needed here? Functional works you have input the hours count depending on the difficulties involved",
                "type" => "numeric",
                "parent_id" => NULL,
                "sequence" => 1,
                "policy_id" => 1,
                "placeholder" => NULL,
                "department" => "wd",
                "created_at" => "2024-03-05 10:44:16",
                "updated_at" => "2024-03-05 10:44:17",
            ),
            array(
                "id" => 5,
                "title" => "Did the client fund full milestone?",
                "type" => "yes_no",
                "parent_id" => NULL,
                "sequence" => 1,
                "policy_id" => 6,
                "placeholder" => NULL,
                "department" => "wd",
                "created_at" => "2024-03-05 16:44:16",
                "updated_at" => "2024-03-05 16:44:17",
            ),
            array(
                "id" => 6,
                "title" => "What amount of milestone did he create?",
                "type" => "numeric",
                "parent_id" => NULL,
                "sequence" => 1,
                "policy_id" => 6,
                "placeholder" => NULL,
                "department" => "wd",
                "created_at" => "2024-03-05 16:44:16",
                "updated_at" => "2024-03-05 16:44:17",
            ),
            array(
                "id" => 7,
                "title" => "Why did he create xxx% of milestone?",
                "type" => "list",
                "parent_id" => NULL,
                "sequence" => 1,
                "policy_id" => 6,
                "placeholder" => NULL,
                "department" => "wd",
                "created_at" => "2024-03-05 16:44:16",
                "updated_at" => "2024-03-05 16:44:17",
            ),
            array(
                "id" => 8,
                "title" => "Did the client issue any sort of threat at any point like he wont pay if something is not done?",
                "type" => "yes_no",
                "parent_id" => NULL,
                "sequence" => 1,
                "policy_id" => 10,
                "placeholder" => NULL,
                "department" => "wd",
                "created_at" => "2024-03-05 16:44:16",
                "updated_at" => "2024-03-05 16:44:17",
            ),
            array(
                "id" => 9,
                "title" => "What did he exactly say?",
                "type" => "text",
                "parent_id" => NULL,
                "sequence" => 1,
                "policy_id" => 10,
                "placeholder" => NULL,
                "department" => "wd",
                "created_at" => "2024-03-05 16:44:16",
                "updated_at" => "2024-03-05 16:44:17",
            ),
        );
        foreach ($sales_policy_questions as $item) {
            SalesPolicyQuestion::create($item);
        }
    }
}
