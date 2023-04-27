<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Seopage1Team;
use App\Models\GoalSetting;
use App\Models\GoalRecurring;
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
    public function getusers(Request $request)
    {
        
        $users = User::where('role_id',7)->orWhere('role_id',8)->get();
       
        
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
        $goal= new GoalSetting();
        $goal->entry = $request->entry;
        $goal->entryType = $request->entryType;
        $goal->assigneeType = $request->assigneeType;
        if($request->assigneeType == 'User')
        {
       
                $goal->user_id = $request->assigneeFor['id'];
                $goal->name= $request->assigneeFor['name'];      
        }else 
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
        $goal->qualified = $request->qualified;
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
        return response()->json([$goal,$recurring]);

        }

        

        
        return response()->json([$goal]);
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
        $goal->qualified = $request->qualified;
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
        return response()->json([$goal,$recurring]);

        }

        

        
        return response()->json([$goal]);
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
        return $request;
       // dd($request->assigneeFor);
        
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
        return $request;
       // dd($request->assigneeFor);
        
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


    
}
