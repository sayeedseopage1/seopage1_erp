<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Auth;
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
        if(Auth::user()->role_id == 6 || Auth::user()->role_id == 13){
            abort(403);
        }
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
        }elseif ($mode == 'projects') {
            $projects = CashPoint::distinct()->pluck('project_id');
            $project_list = [];
            foreach ($projects as $key => $value) {
                $data = Project::select(['id', 'project_name'])->where('id', $value)->first();
                if(!is_null($data)){
                    array_push($project_list, $data);
                }
            }
            return response()->json($project_list);
        }elseif ($mode == 'department') {
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
        $department = $request->query('department_id');
        $shift = $request->query('shift_id');

        if (is_null($department) && is_null($shift)) {
            $data = User::allEmployees(null, true, 'all')->map(function($item) {
                return [
                    'id' => $item->id, 
                    'name' => $item->name,
                    'image' => $item->image
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
        $data = CashPoint::select('cash_points.*')
       
        ;

        // if ($request->department_id != '') {
        //     $user = Seopage1Team::where('department_id', $request->department_id)->get();
        //     $user_list = explode(',', $user);

        //     $data = $data->whereIn('user_id', $user_list);
        // }

        if ($request->team_id != '') {
            //$team = Team::where('id', $request->team_id)->first();
            //if ($team) {
                $team = Seopage1Team::where('id', $request->team_id)->get();
                //dd($team);
                $user_list = [];
                foreach ($team as $key => $value) {
                    $users = explode(',', $value->members);
                    
                    foreach ($users as $user) {
                        if ($user != '') {
                            array_push($user_list, $user);
                        }
                    }
                }
            //}

            $data = $data->whereIn('cash_points.user_id', $user_list);
        }
        if ($request->project_id != '') {
            $data = $data->where('cash_points.project_id', $request->project_id);
        }
        if ($request->user_id != '') {
            $data = $data->where('cash_points.user_id', $request->user_id);
           
        }
        if ($request->start_date != '') {
            $data = $data->where(\DB::raw('DATE(cash_points.created_at)'), '>=', Carbon::parse($request->start_date)->format('Y-m-d'));
        }

        if ($request->end_date != '') {
            $data = $data->where(\DB::raw('DATE(cash_points.created_at)'), '<=', Carbon::parse($request->end_date)->format('Y-m-d'));
        }
        if ($request->client_id != '') {
            $project= Project::where('client_id',$request->client_id)->first();
           
            $data = $data->where('cash_points.project_id', $project->id);
            
            
        }
        if ($request->bonus_type != '') {
           // dd($request->bonus_type);
           if($request->bonus_type == 'Bonus')
           {
            $data = $data->where('cash_points.project_id',null);

           }
          else
           {
            $data = $data->where('cash_points.project_id', '!=',null);

           }
           if ($request->bonus_type == 'Authorization') {
            $data = $data->where('cash_points.bonus_type', 'Authorization Bonus')->where('cash_points.bonus_type','!=',null);
        
        }
          
            
        }

        if(Auth::user()->role_id == 1)
        {
            $data = $data->orderBy('cash_points.id', 'desc')->where('cash_points.points','!=',0)->orderBy('cash_points.id', 'desc')->get();
        }elseif(Auth::user()->role_id == 8 ||Auth::user()->role_id == 7 )
        {
            $data = $data->where('cash_points.user_id',Auth::id())->where('cash_points.points','!=',0)->orderBy('cash_points.id', 'desc')->get();

        } 
       
        //dd($data);
        return response()->json($data);
    }

    public function exportPointData(Request $request)
    {
        $startDate = $request->start_date ?? null;
        $endDate = $request->end_date ?? null;

        $data = CashPoint::select('cash_points.*');

        if ($request->team_id != '') 
        {
            $team = Seopage1Team::where('id', $request->team_id)->get();
            $user_list = [];
            foreach ($team as $key => $value) {
                $users = explode(',', $value->members);
                foreach ($users as $user) {
                    if ($user != '') {
                        array_push($user_list, $user);
                    }
                }
            }
            $data = $data->whereIn('cash_points.user_id', $user_list);
        }
        if ($request->project_id != '') {
            $data = $data->where('cash_points.project_id', $request->project_id);
        }
        if ($request->user_id != '') {
            $data = $data->where('cash_points.user_id', $request->user_id);
           
        }
        if ($startDate != '') {
            $data = $data->where(\DB::raw('DATE(cash_points.created_at)'), '>=', Carbon::parse($startDate)->format('Y-m-d'));
        }

        if ($endDate != '') {
            $data = $data->where(\DB::raw('DATE(cash_points.created_at)'), '<=', Carbon::parse($endDate)->format('Y-m-d'));
        }
        if ($request->client_id != '') {
            $project= Project::where('client_id',$request->client_id)->first();
            $data = $data->where('cash_points.project_id', $project->id);
        }
        if ($request->bonus_type != '') {
            if($request->bonus_type == 'Bonus'){
                $data = $data->where('cash_points.project_id',null);
            }else{
                $data = $data->where('cash_points.project_id', '!=',null);
            }
            if ($request->bonus_type == 'Authorization') {
                $data = $data->where('cash_points.bonus_type', 'Authorization Bonus')->where('cash_points.bonus_type','!=',null);
            }
        }

        if(Auth::user()->role_id == 1)
        {
            $data = $data->orderBy('cash_points.id', 'desc')->where('cash_points.points','!=',0)->orderBy('cash_points.id', 'desc')->get();
        }elseif(Auth::user()->role_id == 8 ||Auth::user()->role_id == 7 )
        {
            $data = $data->where('cash_points.user_id',Auth::id())->where('cash_points.points','!=',0)->orderBy('cash_points.id', 'desc')->get();

        } 
        return response()->json([
            'data' => $data,
            'status' => 200
        ]);
    }
   

    public function get_all_search_bar_data()
    {
        $team = Team::all();
        $data['department'] = $team;
        $data['team'] = [];
        $data['employee'] = [];

        foreach ($team as $value) {
            $seopage_team = Seopage1Team::where('department_id', $value->id)->get();

            if ($seopage_team) {
                foreach ($seopage_team as $key => $seoteam) {
                    $item = [
                        'id' => $seoteam->id,
                        'team_name' => $seoteam->team_name,
                        'department_id' => $value->id,
                        'members' => $seoteam->members
                    ];
                    array_push($data['team'], $item);
                }
            }
        }

        $seopage_team = Seopage1Team::all();

        foreach ($seopage_team as $key => $s_team) {
            $members = explode(',', rtrim($s_team->members, ','));
            foreach($members as $member) {
                $item = [
                    'user_id' => $member,
                    'dept_id' => $s_team->id
                ];

                array_push($data['employee'], $item);
            }
        }

        return response()->json($data);
    }
}
