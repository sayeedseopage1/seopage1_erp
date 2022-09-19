<?php

namespace App\Imports;

use Maatwebsite\Excel\Concerns\ToArray;

class ProjectImport implements ToArray
{

    public static function fields()
    {
        return array(
            array('id' => 'project_name', 'name' => __('modules.projects.projectName'), 'required' => 'Yes'),
            array('id' => 'project_summary', 'name' => __('modules.projects.projectSummary'), 'required' => 'No'),
            array('id' => 'start_date', 'name' => __('modules.projects.startDate'), 'required' => 'Yes'),
            array('id' => 'deadline', 'name' => __('modules.projects.deadline'), 'required' => 'No'),
            array('id' => 'client_email', 'name' => __('app.client') . ' ' . __('app.email'), 'required' => 'No'),
            array('id' => 'project_budget', 'name' => __('modules.projects.projectBudget'), 'required' => 'No'),
            array('id' => 'status', 'name' => __('app.status'), 'required' => 'No'),
            array('id' => 'notes', 'name' => __('modules.projects.note'), 'required' => 'No'),
        );
    }

    public function array(array $array)
    {
        return $array;
    }

}
