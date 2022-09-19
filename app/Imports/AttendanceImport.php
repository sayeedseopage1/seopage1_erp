<?php

namespace App\Imports;

use Maatwebsite\Excel\Concerns\ToArray;

class AttendanceImport implements ToArray
{

    public static function fields()
    {
        return array(
            array('id' => 'email', 'name' => __('app.email'), 'required' => 'Yes'),
            array('id' => 'clock_in_time', 'name' => __('modules.attendance.clock_in'), 'required' => 'Yes'),
            array('id' => 'clock_out_time', 'name' => __('modules.attendance.clock_out'), 'required' => 'No'),
            array('id' => 'clock_in_ip', 'name' => __('modules.attendance.clock_in_ip'), 'required' => 'No'),
            array('id' => 'clock_out_ip', 'name' => __('modules.attendance.clock_out_ip'), 'required' => 'No'),
            array('id' => 'working_from', 'name' => __('modules.attendance.working_from'), 'required' => 'No'),
            array('id' => 'late', 'name' => __('modules.attendance.late'), 'required' => 'No'),
            array('id' => 'half_day', 'name' => __('modules.attendance.halfDay'), 'required' => 'No'),
        );
    }

    public function array(array $array)
    {
        return $array;
    }

}

