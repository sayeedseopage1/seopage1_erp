<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\User;
use App\Models\Department;

class PointsController extends AccountBaseController
{
    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.point';
        
    }

    public function index()
    {
        //$this->pageTitle = 'app.menu.points';

        return view('points.index', $this->data);
    }

      
    public function get_filter_options($mode)
    {
        if ($mode == 'employee') {
            $data = User::select(['employee_details.user_id', 'users.name'])->join('employee_details', 'users.id', 'employee_details.user_id')->get();
        } elseif ($mode == 'project') {
            $data = Project::select(['id', 'project_name'])->where('status', 'finished')->get();
        } elseif ($mode == 'department') {
            // $data = Department::all();
        }

        return response()->json($data);
    }
}
