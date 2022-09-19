<?php

namespace App\Imports;

use Maatwebsite\Excel\Concerns\ToArray;

class EmployeeImport implements ToArray
{

    public static function fields()
    {
        return array(
            array('id' => 'name', 'name' => __('modules.employees.employeeName'), 'required' => 'Yes',),
            array('id' => 'email', 'name' => __('modules.employees.employeeEmail'), 'required' => 'Yes',),
            array('id' => 'mobile', 'name' => __('app.mobile'), 'required' => 'No',),
            array('id' => 'gender', 'name' => __('modules.employees.gender'), 'required' => 'No',),
            array('id' => 'employee_id', 'name' => __('modules.employees.employeeId'), 'required' => 'Yes'),
            array('id' => 'joining_date', 'name' => __('modules.employees.joiningDate'), 'required' => 'No'),
            array('id' => 'address', 'name' => __('app.address'), 'required' => 'No'),
            array('id' => 'hourly_rate', 'name' => __('modules.employees.hourlyRate'), 'required' => 'No'),
        );
    }

    public function array(array $array)
    {
        return $array;
    }

}
