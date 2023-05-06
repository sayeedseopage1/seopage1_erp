<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Seopage1Team;
use App\Models\GoalSetting;
use App\Models\GoalRecurring;
use Auth;
use App\Models\Section;
use App\Models\Dashboard;
use App\Models\DealStage;
use App\Models\Lead;

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
        // return $request;
       // dd($request->assigneeFor);
        $goal= new GoalSetting();
        $goal->entry = $request->entry;
        $goal->entryType = $request->entryType;
        $goal->assigneeType = $request->assigneeType;
        if($request->assigneeType == 'User')
        {
                $goal->user_id = $request->assigneeFor['id'];
                $goal->name= $request->assigneeFor['name'];      
        }else if($request->assigneeType == 'Team')
        {
           
                $goal->team_id = $request->assigneeFor['id'];
                $goal->team_name= $request->assigneeFor['name'];   
           
        }
        foreach($request->pipeline as $pipeline)
        {
            $goal->pipeline= $pipeline;
            
        }
        $goal->frequency = $request->frequency;
        $goal->startDate = $request->startDate;
        $goal->endDate = $request->endDate;
        $goal->trackingType = $request->trackingType;
        $goal->trackingValue= $request->trackingValue;
        $goal->applyRecurring = $request->applyRecurring;
        
        $goal->achievablePoints = $request->achievablePoints;
        if( $request->entryType == 'Progressed')
        {
            $goal->qualified = $request->qualified;
        }else 
        {
            $goal->qualified = null;

        }
        $goal->dealType = $request->dealType;
        $goal->goalType = $request->goalType;
        $goal->added_by= Auth::id();
        $goal->save();
        if($request->recurring != null)
        {
            foreach($request->recurring as $key=>$rec)
       
        {
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


        }

        
        return response()->json(["goal" => $goal]);
    }
    public function editGoal(Request $request, $id)
    {
        $goal= GoalSetting::find($id);
        $goal->entry = $request->entry;
        $goal->entryType = $request->entryType;
        $goal->assigneeType = $request->assigneeType;
        if($request->assigneeType == 'User')
        {
                $goal->user_id = $request->assigneeFor['id'];
                $goal->name= $request->assigneeFor['name'];      
        }else if($request->assigneeType == 'Team')
        {
           
                $goal->team_id = $request->assigneeFor['id'];
                $goal->team_name= $request->assigneeFor['name'];   
           
        }
        foreach($request->pipeline as $pipeline)
        {
            $goal->pipeline= $pipeline;
            
        }
        $goal->frequency = $request->frequency;
        $goal->startDate = $request->startDate;
        $goal->endDate = $request->endDate;
        $goal->trackingType = $request->trackingType;
        $goal->trackingValue= $request->trackingValue;
        $goal->applyRecurring = $request->applyRecurring;
        
        $goal->achievablePoints = $request->achievablePoints;
        if( $request->entryType == 'Progressed')
        {
            $goal->qualified = $request->qualified;
        }else 
        {
            $goal->qualified = null;

        }
        $goal->dealType = $request->dealType;
        $goal->goalType = $request->goalType;
        $goal->added_by= Auth::id();
        $goal->save();
        $find_goal_recurrings= GoalRecurring::where('goal_id',$id)->get();
        if($find_goal_recurrings != null)
        {
            foreach ($find_goal_recurrings as $value) {
                $recurring= GoalRecurring::find($value->id);
                $recurring->delete();

            }
    
        }
       
        if($request->recurring != null)
        {
            foreach($request->recurring as $key=>$rec)
       
        {
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
        if($user->role_id == 1)
        {
            $goal = GoalSetting::all();
            $goal_recurring= GoalRecurring::all();
           
            return response()->json(["goals" => $goal, "recurring" => $goal_recurring]);
        }elseif($user->role_id != 1)
        {
           
                $team = Seopage1Team::whereRaw("FIND_IN_SET($user, members) > 0")->first();
                if ($team) {
                    $team_id = $team->id;
                    $goal= GoalSetting::where('team_id',$team_id)->orWhere('user_id',$user->id)->get();
                    $goal_recurring= GoalRecurring::all();
                    return response()->json(["goals" => $goal, "recurring" => $goal_recurring]);

                  
                } 
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
        //dd($request);
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
       // dd($request->assigneeFor);
        
    }
    public function getSection()
    {
        $section= Section::all();
       // dd($section);
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
        $deals= DealStage::all();
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


    

    
}
