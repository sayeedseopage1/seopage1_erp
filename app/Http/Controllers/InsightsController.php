<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Seopage1Team;
use App\Models\GoalSetting;
use App\Models\GoalRecurring;
use App\Models\Section;
use App\Models\Dashboard;
use App\Models\DealStage;
use App\Models\Lead;
use Illuminate\Support\Facades\DB;
use Auth;

class InsightsController extends AccountBaseController
{
    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'Insights';
        $this->middleware(function ($request, $next) {
            return $next($request);
        });
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('insights.insights', $this->data);
    }
    // public function getusers(Request $request)
    // {
        
    //     $users = User::where('role_id',7)->orWhere('role_id',8)->get();
       
        
    //      return response()->json($users);
    // }

    public function getusers(Request $request)
        {
            
            $users = User::where('role_id',7)->orWhere('role_id',8)->get();
        
            if ($request->isMethod('post')) {
                if ($request->type == 'all') {
                    $users = User::all();
                } else {
                    $users = User::find($request->id);
                }  
            }
            
            return response()->json($users);
        }
    


    public function getteam(Request $request)
    {
        
        $users = Seopage1Team::all();
       
        
         return response()->json($users);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
       // dd($request->assigneeFor);
       
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function storeGoal(Request $request)
    {
        $goal= new GoalSetting();
        $goal->entry = $request->entry;
        $goal->entryType = $request->entryType;
        $goal->assigneeType = $request->assigneeType;
        if($request->assigneeType == 'User') {
            $goal->user_id = $request->assigneeFor['id'];
            $goal->name= $request->assigneeFor['name'];      
        } else if ($request->assigneeType == 'Team') {
            $goal->team_id = $request->assigneeFor['id'];
            $goal->team_name= $request->assigneeFor['name'];   
        }

        foreach($request->pipeline as $pipeline) {
            $goal->pipeline= $pipeline;
        }
        $goal->frequency = $request->frequency;
        $goal->startDate = $request->startDate;
        $goal->endDate = $request->endDate;
        $goal->trackingType = $request->trackingType;
        $goal->trackingValue= $request->trackingValue;
        $goal->applyRecurring = $request->applyRecurring;
        $goal->achievablePoints = (int) $request->achievablePoints;
        if( $request->entryType == 'Progressed') {
            $goal->qualified = $request->qualified;
        } else {
            $goal->qualified = null;
        }

        $goal->dealType = $request->dealType;
        $goal->goalType = $request->goalType;
        $goal->title = $request->title;
        $goal->added_by= Auth::id();
        $goal->save();
        if($request->recurring != null) {
            foreach($request->recurring as $key=>$rec) {
                // dd($key,$rec);
                $recurring= new GoalRecurring();
                $recurring->goal_id = $goal->id;
                $recurring->value = $rec['value'];
                // dd($recurring->value);
                $recurring->title=  $rec['title'];
                $recurring->start=  $rec['start'];
                $recurring->end=  $rec['end'];
                $recurring->save();
            }
            $recurring_data= GoalRecurring::where('goal_id',$goal->id)->get();
            //dd($goal, $$recurring);
            return response()->json(["goal" => $goal, "recurring"=> $recurring_data]);
        }

        
        return response()->json(["goal" => $goal]);
    }
    public function editGoal(Request $request, $id) {
        $goal= GoalSetting::find($id);
        $goal->entry = $request->entry;
        $goal->entryType = $request->entryType;
        $goal->assigneeType = $request->assigneeType;
        if($request->assigneeType == 'User') {
            $goal->user_id = $request->assigneeFor['id'];
            $goal->name= $request->assigneeFor['name'];      
        } else if($request->assigneeType == 'Team') {
            $goal->team_id = $request->assigneeFor['id'];
            $goal->team_name= $request->assigneeFor['name'];   
        }

        foreach($request->pipeline as $pipeline) {
            $goal->pipeline= $pipeline;  
        }
        $goal->frequency = $request->frequency;
        $goal->startDate = $request->startDate;
        $goal->endDate = $request->endDate;
        $goal->trackingType = $request->trackingType;
        $goal->trackingValue= $request->trackingValue;
        $goal->applyRecurring = $request->applyRecurring;
        
        $goal->achievablePoints = $request->achievablePoints;
        if ($request->entryType == 'Progressed') {
            $goal->qualified = $request->qualified;
        } else {
            $goal->qualified = null;
        }

        $goal->dealType = $request->dealType;
        $goal->goalType = $request->goalType;
        $goal->added_by= Auth::id();
        $goal->save();

        $find_goal_recurrings = GoalRecurring::where('goal_id',$id)->get();
        if($find_goal_recurrings != null) {
            foreach ($find_goal_recurrings as $value) {
                $recurring= GoalRecurring::find($value->id);
                $recurring->delete();
            }
        }
       
        if($request->recurring != null) {
            foreach($request->recurring as $key=>$rec) {
                // dd($key,$rec);
                $recurring= new GoalRecurring();
                $recurring->goal_id = $goal->id;
                $recurring->value = $rec['value'];
                // dd($recurring->value);
                $recurring->title=  $rec['title'];
                $recurring->start=  $rec['start'];
                $recurring->end=  $rec['end'];
                $recurring->save();
            }
        $recurring_data= GoalRecurring::where('goal_id',$goal->id)->get();

        return response()->json(["goal" => $goal, "recurring"=> $recurring_data]);
    } else {
        return response()->json(["goal" => $goal]);

    }
}

    public function getGoal($id)
    {
        $user= User::where('id',$id)->first();


        if($user->role_id == 1 || $user->role_id == 8)
        {


            $goal = GoalSetting::all();
            $goal_recurring= GoalRecurring::all();
           
            return response()->json(["goals" => $goal, "recurring" => $goal_recurring]);
        } elseif($user->role_id != 1 || $user->role_id != 8) {
            $count = Seopage1Team::
            whereRaw("FIND_IN_SET(?, members)", [$user->id])
            ->get();
           
           
            //$teams= Seopage1Team::whereRaw("FIND_IN_SET($user->id, members) > 0")->get();
           // dd($user->id);

            if ($count != null)  {

                foreach($count as $team)
                {
                    
                    $goal[]= GoalSetting::where('team_id',$team->id)->get();
                        

                $goal_recurring[]= GoalRecurring::all();
              

                }
                
            } 
    //    /dd($goal);
            return response()->json(["goals" => $goal, "recurring" => $goal_recurring]);
        }
        elseif(Auth::user()->id == $user->id){
            
                $goal= GoalSetting::where('user_id',$user->id)->get();
                        

                $goal_recurring= GoalRecurring::all();
               // return response()->json(["goals" => $goal, "recurring" => $goal_recurring]);
            

        }
        else {
            return response()->json("You don't have permission to view this page"); 
        }
    }


    /**
     * Store a newly created resource in storage.
     * Store dashboard 
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function storeDashboard(Request $request)
    {
        $dashboard= new Dashboard();
        $dashboard->dashboard_name= $request->name;
        $dashboard->root= $request->root;
        $dashboard->section_id= $request->section['id'];
        $dashboard->added_by= Auth::id();
        $dashboard->save(); 

        $dashboard= Dashboard::select([
            'dashboards.id as dashboard_id',
            'dashboards.*',
            'sections.*'
        ])->join('sections', 'sections.id', '=', 'dashboards.section_id')
        ->where('dashboards.id', $dashboard->id)
        ->get();
        
        return response()->json($dashboard);

       // return $request;
       // dd($request->assigneeFor);
        
    }
    public function getDashboard()
    {
        $dashboard= Dashboard::select([
            'dashboards.id as dashboard_id',
            'dashboards.*',
            'sections.*'
        ])->join('sections', 'sections.id', '=', 'dashboards.section_id')
        ->get();

        return response()->json($dashboard);
    }


    /**
     * Store a newly created resource in storage.
     * Store section  
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function storeSection(Request $request)
    {
        
        $section= new Section();
        $section->type= $request->type;
        $section->section_name= $request->section;
        $section->root= $request->root;
        $section->added_by= Auth::id();
        $section->save();

        // return $request;
        return response()->json($section);
    }
    public function getSection()
    {
        $section= Section::all();
        return response()->json($section);
    }



    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
    public function DealConversion()
    {
        $deals= DealStage::with('client')->get();

        $lead = Lead::all();
        return response()->json(["deals" => $deals, "leads" => $lead]);
    }



    // get all users 
    public function get_users_by_id($id)
    {
        $user = User::findOrFail($id);
        return response()->json($user);
    }

    public function get_users_all()
    {
        $user = User::all();
        return response()->json($user);
    }

    public function editGoalTitle(Request $request, GoalSetting $data)
    {
        $request->validate([
            'title' => 'required|max:255'
        ]);

        $data->title = $request->title;
        $data->save();

        return response()->json([
            'status' => 'success',
            'title' => $data->title
        ]);
    }


    public function getGoalDetails(GoalSetting $data)
    {
        if ($data->entryType == 'Added') {
            $dealStage = DealStage::where([
                'added_by' => $data->user_id,
            ])
            ->whereDate('created_at', '>=', $data->startDate);
            if (!is_null($data->endDate)) {
                $dealStage = $dealStage->whereDate('created_at', '<=', $data->endDate);
            }
            $dealStage = $dealStage->get();
        } elseif ($data->entryType == 'Progressed') {
            if ($data->qualified == 'Qualified') {
                $deal_status = 1;
            } elseif ($data->qualified == 'Requirements Defined') {
                $deal_status = 2;
            } elseif ($data->qualified == 'Proposal Made') {
                $deal_status = 3;
            } elseif ($data->qualified == 'Negotiations Started') {
                $deal_status = 4;
            } elseif ($data->qualified == 'Milestone Breakdown') {
                $deal_status = 5;
            } else {
                $deal_status = 0;
            }

            $dealStage = DealStage::where([
                'added_by' => $data->user_id,
                'deal_stage' => $deal_status
            ])
            ->whereDate('created_at', '>=', $data->startDate);
            if (!is_null($data->endDate)) {
                $dealStage = $dealStage->whereDate('created_at', '<=', $data->endDate);
            }
            $dealStage = $dealStage->get();
        } elseif ($data->entryType == 'Won') {
            $dealStage = DealStage::where([
                'added_by' => $data->user_id,
                'won_lost' => 'Yes'
            ])
            ->whereDate('created_at', '>=', $data->startDate);
            if (!is_null($data->endDate)) {
                $dealStage = $dealStage->whereDate('created_at', '<=', $data->endDate);
            }
            $dealStage = $dealStage->get();
        }
        

        return response()->json($dealStage);
    }

    public function get_goal_details(GoalSetting $data)
    {
        $auth = Auth::user();
        if ($auth->role_id == 1 || $auth->role_id == 7 || $auth->role_id == 8) {
            $response = [];
            $recurring = GoalRecurring::where('goal_id', $data->id)->get();

            $response['goal'] = $data;
            $response['recurring'] = count($recurring) > 0 ? $recurring : null;

            if ($data->assigneeType == 'User') {
                $response['assigned_to'] = User::find($data->user_id);
            } elseif ($data->assigneeType == 'Team') {
                $team = Seopage1Team::find($data->team_id);

                $users = explode(',', $team->members);
                $user_data = [];
                foreach ($users as $key => $value) {
                    if ($value != '') {
                        $user = User::find($value);
                        array_push($user_data, $user);
                    }
                }
                $response['team'] = $user_data;
            }

            $response['added_by'] = User::find($data->added_by);
            return response()->json($response);
        }
    }
}

