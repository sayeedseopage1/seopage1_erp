<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Project;
use App\Models\Team;
use App\Models\Seopage1Team;
use App\Models\CashPoint;

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
            $data = Project::select(['id', 'project_name'])->where('status', 'finished')->get();
            return response()->json($data);
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

    public function get_employe_by_filter_options($department = null, $shift = null)
    {
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
        if ($request->department_id != '') {
            $user = Seopage1Team::where('department_id', $request->department_id)->get();
            $user_list = explode(',', $user);

            $data = CashPoint::whereIn('user_id', $user_list);
        } else {
            $data = CashPoint::where('user_id', $request->user_id);
        }

        if ($request->team_id != '') {
            $user = Seopage1Team::where('department_id', $request->department_id)->get();
            $user_list = explode(',', $user);

            $data = CashPoint::whereIn('user_id', $user_list);
        } else {
            $data = CashPoint::where('user_id', $request->user_id);
        }
            
        if ($request->start_date != '') {
            $data = $data->whereDateBetween('created_at', '>=', Carbon::parse($request->start_date));
        }

        if ($request->end_date != '') {
            $data = $data->whereDateBetween('created_at', '=<', Carbon::parse($request->start_date));
        }

        if ($request->team_id != '') {
            $data = Team::where('id', $request->team_id)->first();

            $team = Seopage1Team::where('department_id', $data->id)->get();

            $user_list = [];
            foreach ($team as $key => $value) {
                $users = explode(',', $value->members);
                
                foreach ($users as $user) {
                    if ($user != '') {
                        array_push($user_list, $user);
                    }
                }
            }
            $data = CashPoint::whereIn('user_id', $user_list);
        }

        $data = $data->get();

        return response()->json($data);
    }   
}
