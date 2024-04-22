<?php

namespace Database\Seeders;

use App\Models\SalesRiskPolicy;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SalesPolicySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $salesRiskPolicies = [
            [
                "id" => 1,
                "title" => "1-4 hourly rates:",
                "parent_id" => NULL,
                "type" => "parent",
                "value_type" => NULL,
                "key" => "hourlyRate",
                "value" => NULL,
                "points" => 0.00,
                "department" => "1",
                "status" => "1",
                "sequence" => 1,
                "comment" => NULL,
            ],
            [
                "id" => 2,
                "title" => "Less Than $10",
                "parent_id" => 1,
                "type" => "lessThan",
                "value_type" => "currency",
                "key" => NULL,
                "value" => "10",
                "points" => -1.00,
                "department" => "1",
                "status" => "1",
                "sequence" => 1,
                "comment" => "",
            ],
            [
                "id" => 3,
                "title" => "Range $11-15",
                "parent_id" => 1,
                "type" => "range",
                "value_type" => "currency",
                "key" => NULL,
                "value" => "11, 15",
                "points" => -0.80,
                "department" => "1",
                "status" => "1",
                "sequence" => 2,
                "comment" => "",
            ],
            [
                "id" => 4,
                "title" => "Range $16-20",
                "parent_id" => 1,
                "type" => "range",
                "value_type" => "currency",
                "key" => NULL,
                "value" => "16, 20",
                "points" => -0.50,
                "department" => "1",
                "status" => "1",
                "sequence" => 3,
                "comment" => "",
            ],
            [
                "id" => 5,
                "title" => "Range $21-30",
                "parent_id" => 1,
                "type" => "range",
                "value_type" => "currency",
                "key" => NULL,
                "value" => "21, 30",
                "points" => -0.50,
                "department" => "1",
                "status" => "1",
                "sequence" => 4,
                "comment" => "",
            ],
            [
                "id" => 6,
                "title" => "Greater Than $30",
                "parent_id" => 1,
                "type" => "greaterThan",
                "value_type" => "currency",
                "key" => NULL,
                "value" => "30",
                "points" => 1.00,
                "department" => "1",
                "status" => "1",
                "sequence" => 5,
                "comment" => "",
            ],
            [
                "id" => 7,
                "title" => "Milestone percentage",
                "parent_id" => NULL,
                "type" => "parent",
                "value_type" => NULL,
                "key" => "milestone",
                "value" => NULL,
                "points" => 0.00,
                "department" => "1",
                "status" => "1",
                "sequence" => 1,
                "comment" => NULL,
            ],
            [
                "id" => 8,
                "title" => "Full milestone",
                "parent_id" => 7,
                "type" => "yesNo",
                "value_type" => NULL,
                "key" => NULL,
                "value" => "{\"yes\":{\"point\":\"1\",\"comment\":null},\"no\":{\"point\":\"0\",\"comment\":null}}",
                "points" => 0.00,
                "department" => "1",
                "status" => "1",
                "sequence" => 1,
                "comment" => "",
            ],
            [
                "id" => 9,
                "title" => "Less Than 50%",
                "parent_id" => 7,
                "type" => "lessThan",
                "value_type" => "percentage",
                "key" => NULL,
                "value" => "50",
                "points" => -2.00,
                "department" => "1",
                "status" => "1",
                "sequence" => 2,
                "comment" => "",
            ],
            [
                "id" => 10,
                "title" => "Greater Than 50%",
                "parent_id" => 7,
                "type" => "greaterThan",
                "value_type" => "percentage",
                "key" => NULL,
                "value" => "50",
                "points" => -1.00,
                "department" => "1",
                "status" => "1",
                "sequence" => 3,
                "comment" => "",
            ],
            [
                "id" => 11,
                "title" => "Fixed 50%",
                "parent_id" => 7,
                "type" => "fixed",
                "value_type" => "percentage",
                "key" => NULL,
                "value" => "50",
                "points" => -1.00,
                "department" => "1",
                "status" => "1",
                "sequence" => 4,
                "comment" => "",
            ],
            [
                "id" => 12,
                "title" => "Client issue theat",
                "parent_id" => NULL,
                "type" => "parent",
                "value_type" => NULL,
                "key" => "threat",
                "value" => NULL,
                "points" => 0.00,
                "department" => "1",
                "status" => "1",
                "sequence" => 1,
                "comment" => NULL,
            ],
            [
                "id" => 13,
                "title" => "Yes/No",
                "parent_id" => 12,
                "type" => "yesNo",
                "value_type" => NULL,
                "key" => NULL,
                "value" => "{\"yes\":{\"point\":\"-1\",\"comment\":null},\"no\":{\"point\":\"0\",\"comment\":null}}",
                "points" => 0.00,
                "department" => "1",
                "status" => "1",
                "sequence" => 1,
                "comment" => "",
            ],
            [
                "id" => 14,
                "title" => "Done by someone else",
                "parent_id" => NULL,
                "type" => "parent",
                "value_type" => NULL,
                "key" => "doneByElse",
                "value" => NULL,
                "points" => 0.00,
                "department" => "1",
                "status" => "1",
                "sequence" => 1,
                "comment" => NULL,
            ],
            [
                "id" => 15,
                "title" => "Yes/No",
                "parent_id" => 14,
                "type" => "yesNo",
                "value_type" => NULL,
                "key" => NULL,
                "value" => "{\"yes\":{\"point\":\"0\",\"comment\":null},\"no\":{\"point\":\"0\",\"comment\":null}}",
                "points" => 0.00,
                "department" => "1",
                "status" => "1",
                "sequence" => 1,
                "comment" => "",
            ],
            [
                "id" => 16,
                "title" => "Failed",
                "parent_id" => 14,
                "type" => "yesNo",
                "value_type" => NULL,
                "key" => NULL,
                "value" => "{\"yes\":{\"point\":\"-1\",\"comment\":null},\"no\":{\"point\":\"0.5\",\"comment\":null}}",
                "points" => 0.00,
                "department" => "1",
                "status" => "1",
                "sequence" => 2,
                "comment" => "",
            ],
            [
                "id" => 17,
                "title" => "Routine work",
                "parent_id" => NULL,
                "type" => "parent",
                "value_type" => NULL,
                "key" => "routeWork",
                "value" => NULL,
                "points" => 0.00,
                "department" => "1",
                "status" => "1",
                "sequence" => 1,
                "comment" => NULL,
            ],
            [
                "id" => 18,
                "title" => "Yes/No",
                "parent_id" => 17,
                "type" => "yesNo",
                "value_type" => NULL,
                "key" => NULL,
                "value" => "{\"yes\":{\"point\":\"0.5\",\"comment\":null},\"no\":{\"point\":\"-1\",\"comment\":null}}",
                "points" => 0.00,
                "department" => "1",
                "status" => "1",
                "sequence" => 1,
                "comment" => "",
            ],
            [
                "id" => 19,
                "title" => "Available During The Weekend",
                "parent_id" => NULL,
                "type" => "parent",
                "value_type" => NULL,
                "key" => "availableWeekend",
                "value" => NULL,
                "points" => 0.00,
                "department" => "1",
                "status" => "1",
                "sequence" => 1,
                "comment" => NULL,
            ],
            [
                "id" => 20,
                "title" => "Yes/No",
                "parent_id" => 19,
                "type" => "yesNo",
                "value_type" => NULL,
                "key" => NULL,
                "value" => "{\"yes\":{\"point\":\"0\",\"comment\":null},\"no\":{\"point\":\"-1\",\"comment\":null}}",
                "points" => 0.00,
                "department" => "1",
                "status" => "1",
                "sequence" => 1,
                "comment" => "",
            ],
            [
                "id" => 21,
                "title" => "First Submission",
                "parent_id" => NULL,
                "type" => "parent",
                "value_type" => NULL,
                "key" => "firstSubmission",
                "value" => NULL,
                "points" => 0.00,
                "department" => "1",
                "status" => "1",
                "sequence" => 1,
                "comment" => NULL,
            ],
            [
                "id" => 22,
                "title" => "Yes/No",
                "parent_id" => 21,
                "type" => "yesNo",
                "value_type" => NULL,
                "key" => NULL,
                "value" => "{\"yes\":{\"point\":\"0.5\",\"comment\":null},\"no\":{\"point\":\"-1\",\"comment\":null}}",
                "points" => 0.00,
                "department" => "1",
                "status" => "1",
                "sequence" => 1,
                "comment" => "",
            ],
            [
                "id" => 23,
                "title" => "Accept price proposal",
                "parent_id" => NULL,
                "type" => "parent",
                "value_type" => NULL,
                "key" => "acceptPriceProposal",
                "value" => NULL,
                "points" => 0.00,
                "department" => "1",
                "status" => "1",
                "sequence" => 1,
                "comment" => NULL,
            ],
            [
                "id" => 24,
                "title" => "Yes/No",
                "parent_id" => 23,
                "type" => "yesNo",
                "value_type" => NULL,
                "key" => NULL,
                "value" => "{\"yes\":{\"point\":\"0\",\"comment\":null},\"no\":{\"point\":\"-1\",\"comment\":null}}",
                "points" => 0.00,
                "department" => "1",
                "status" => "1",
                "sequence" => 1,
                "comment" => "",
            ],
            [
                "id" => 25,
                "title" => "Client country",
                "parent_id" => NULL,
                "type" => "parent",
                "value_type" => NULL,
                "key" => "clientCountry",
                "value" => NULL,
                "points" => 0.00,
                "department" => "1",
                "status" => "1",
                "sequence" => 1,
                "comment" => NULL,
            ],
            [
                "id" => 26,
                "title" => "Asia Tear",
                "parent_id" => 25,
                "type" => "list",
                "value_type" => "countries",
                "key" => NULL,
                "value" => "[{\"IN\":\"India\"},{\"PK\":\"Pakistan\"}]",
                "points" => -1.00,
                "department" => "1",
                "status" => "1",
                "sequence" => 1,
                "comment" => "",
            ],
            [
                "id" => 27,
                "title" => "Africa Tear",
                "parent_id" => 25,
                "type" => "list",
                "value_type" => "countries",
                "key" => NULL,
                "value" => "[{\"GH\":\"Ghana\"},{\"KE\":\"Kenya\"},{\"NG\":\"Nigeria\"}]",
                "points" => -1.00,
                "department" => "1",
                "status" => "1",
                "sequence" => 2,
                "comment" => "",
            ],
            [
                "id" => 28,
                "title" => "UK US AU CA Tear",
                "parent_id" => 25,
                "type" => "list",
                "value_type" => "countries",
                "key" => NULL,
                "value" => "[{\"GB\":\"United Kingdom\"},{\"US\":\"United States\"},{\"CA\":\"Canada\"},{\"AU\":\"Australia\"}]",
                "points" => 1.00,
                "department" => "1",
                "status" => "1",
                "sequence" => 3,
                "comment" => "",
            ],
            [
                "id" => 29,
                "title" => "Project deadline",
                "parent_id" => NULL,
                "type" => "parent",
                "value_type" => NULL,
                "key" => "projectDeadline",
                "value" => NULL,
                "points" => 0.00,
                "department" => "1",
                "status" => "1",
                "sequence" => 1,
                "comment" => NULL,
            ],
            [
                "id" => 30,
                "title" => "Less Than 6days",
                "parent_id" => 29,
                "type" => "lessThan",
                "value_type" => "days",
                "key" => NULL,
                "value" => "6",
                "points" => -2.00,
                "department" => "1",
                "status" => "1",
                "sequence" => 1,
                "comment" => "",
            ],
            [
                "id" => 31,
                "title" => "Less Than 8days",
                "parent_id" => 29,
                "type" => "lessThan",
                "value_type" => "days",
                "key" => NULL,
                "value" => "8",
                "points" => -1.00,
                "department" => "1",
                "status" => "1",
                "sequence" => 2,
                "comment" => "",
            ],
            [
                "id" => 32,
                "title" => "Range 8-15days",
                "parent_id" => 29,
                "type" => "range",
                "value_type" => "days",
                "key" => NULL,
                "value" => "8, 15",
                "points" => 0.00,
                "department" => "1",
                "status" => "1",
                "sequence" => 3,
                "comment" => "",
            ],
            [
                "id" => 33,
                "title" => "Greater Than 15days",
                "parent_id" => 29,
                "type" => "greaterThan",
                "value_type" => "days",
                "key" => NULL,
                "value" => "15",
                "points" => 1.00,
                "department" => "1",
                "status" => "1",
                "sequence" => 4,
                "comment" => "",
            ],
            [
                "id" => 34,
                "title" => "Project Budget",
                "parent_id" => NULL,
                "type" => "parent",
                "value_type" => NULL,
                "key" => "projectBudget",
                "value" => NULL,
                "points" => 0.00,
                "department" => "1",
                "status" => "1",
                "sequence" => 1,
                "comment" => NULL,
            ],
            [
                "id" => 35,
                "title" => "Greater Than $700",
                "parent_id" => 34,
                "type" => "greaterThan",
                "value_type" => "currency",
                "key" => NULL,
                "value" => "700",
                "points" => 1.00,
                "department" => "1",
                "status" => "1",
                "sequence" => 1,
                "comment" => "",
            ],
            [
                "id" => 36,
                "title" => "Less Than $700",
                "parent_id" => 34,
                "type" => "lessThan",
                "value_type" => "currency",
                "key" => NULL,
                "value" => "700",
                "points" => 0.00,
                "department" => "1",
                "status" => "1",
                "sequence" => 2,
                "comment" => "",
            ],
        ];

        foreach ($salesRiskPolicies as $item) {
            SalesRiskPolicy::create($item);
        }

    }
}
