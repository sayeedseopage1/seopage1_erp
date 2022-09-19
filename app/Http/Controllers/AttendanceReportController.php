<?php

namespace App\Http\Controllers;

use App\DataTables\AttendanceReportDataTable;
use App\Models\User;

class AttendanceReportController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.attendanceReport';
    }

    public function index(AttendanceReportDataTable $dataTable)
    {
        if (!request()->ajax()) {
            $this->fromDate = now($this->global->timezone)->startOfMonth();
            $this->toDate = now($this->global->timezone);
            $this->employees = User::allEmployees();
        }

        return $dataTable->render('reports.attendance.index', $this->data);
    }

}
