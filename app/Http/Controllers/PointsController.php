<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Project;
use App\Models\Team;
use App\Models\Seopage1Team;
use App\Models\CashPoint;
use Carbon\Carbon;

class PointsController extends AccountBaseController
{
    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.point';
    }

    public function index()
    {
        return view('points.index', $this->data);
    }

    public function get_filter_options($mode, $value = null)
    {
        if ($mode == 'employee') {
            $data = User::allEmployees(null, true, 'all')->map(function($item) {
                return [
                    'id' => $item->id, 
                    'name' => $item->name,
                    'image' => $item->image
                ];
            });
            
            return response()->json($data);
        } elseif ($mode == 'projects') {
            $projects = CashPoint::distinct()->pluck('project_id');
            $project_list = [];
            foreach ($projects as $key => $value) {
                $data = Project::select(['id', 'project_name'])->where('id', $value)->first();
                array_push($project_list, $data);
            }
            return response()->json($project_list);
        } elseif ($mode == 'department') {
            $data = Team::select([
                'id', 
                'team_name as name'
            ])->get();
            return response()->json($data);
        } elseif ($mode == 'shift') {
            if (!is_null($value)) {
                $data = Seopage1Team::select(['id', 'team_name as name', 'department_id'])->where('department_id', $value)->get();
            } else {
                $data = Seopage1Team::select(['id', 'team_name as name', 'department_id'])->get();
            }
            return response()->json($data);
        } else {
            abort(404);
        }
    }

    public function get_employe_by_filter_options(Request $request)
    {
        $department = $request->query('department');
        $shift = $request->query('shifts');

        if (is_null($department) && is_null($shift)) {
            $data = User::allEmployees(null, true, 'all')->map(function($item) {
                return [
                    'id' => $item->id, 
                    'name' => $item->name,
                    'image_url' => $item->image
                ];
            });

            return response()->json($data);
        } else {
            $data = Seopage1Team::select('*');
            
            if (!is_null($department)) {
                $data = $data->where('department_id', $department);
            }

            if (!is_null($shift)) {
                $data = $data->where('id', $shift); 
            }

            $data = $data->get();

            $user_list = [];
            foreach ($data as $key => $value) {
                $users = explode(',', $value->members);
                
                foreach ($users as $user) {
                    if ($user != '') {
                        array_push($user_list, $user);
                    }
                }
            }

            $user_list = array_unique($user_list);

            $get_user_list = User::select(['id', 'name', 'image'])->whereIn('id', $user_list)->get();
            
            return response()->json($get_user_list);
        }
        
    }

    public function get_point_table_data(Request $request)
    {
        $data = CashPoint::select('*');

        if ($request->department_id != '') {
            $user = Seopage1Team::where('department_id', $request->department_id)->get();
            $user_list = explode(',', $user);

            $data = $data->whereIn('user_id', $user_list);
        }

        if ($request->team_id != '') {
            $team = Team::where('id', $request->team_id)->first();
            if ($team) {
                $team = Seopage1Team::where('department_id', $team->id)->get();

                $user_list = [];
                foreach ($team as $key => $value) {
                    $users = explode(',', $value->members);
                    
                    foreach ($users as $user) {
                        if ($user != '') {
                            array_push($user_list, $user);
                        }
                    }
                }
            }

            $data = $data->whereIn('user_id', $user_list);
        }

        if ($request->project_id != '') {
            $data = $data->where('project_id', $request->project_id);
        }

        if ($request->user_id != '') {
            $data = $data->where('user_id', $request->user_id);
        }

        if ($request->start_date != '') {
            $data = $data->where(\DB::raw('DATE(created_at)'), '>=', Carbon::parse($request->start_date)->format('Y-m-d'));
        }

        if ($request->end_date != '') {
            $data = $data->where(\DB::raw('DATE(created_at)'), '<=', Carbon::parse($request->end_date)->format('Y-m-d'));
        }

        $data = $data->get();

        $total_points = $data->sum('points');
        $minus_point = 0;
        foreach ($data as $key => $value) {
            if ($key == 0) {
                $value->balance = $total_points;
                $minus_point = $value->points;
            } else {
                $total_points = $total_points - $minus_point;
                $minus_point = $value->points;

                $value->balance = $total_points;
            }
        }

        return response()->json($data);
    }   
}
