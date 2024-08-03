<?php

namespace App\Http\Controllers;

use Auth;
use App\Models\Deal;
use App\Models\Lead;
use App\Models\User;
use App\Models\Payment;
use App\Models\Project;
use App\Models\Section;
use App\Models\Dashboard;
use App\Models\DealStage;
use App\Models\GoalSetting;
use App\Models\Seopage1Team;
use Illuminate\Http\Request;
use App\Models\GoalRecurring;
use App\Models\DealStageChange;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

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
        // $goal->general_checkbox = $request->general_checkbox;
        $goal->is_monthly_auto_recurring = $request->is_monthly_auto_recurring??0;
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
        // $goal->general_checkbox = $request->general_checkbox;
        $goal->is_monthly_auto_recurring = $request->is_monthly_auto_recurring??0;
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

public function getGoal(Request $request, $id)
{
    $user = User::where('id', $id)->first();

    if (Auth::user()->id == $user->id) {
        $goal = GoalSetting::where('user_id', $user->id)->get();
        //dd($goal);


        $goal_recurring = GoalRecurring::all();
        //   return response()->json(["goals" => $goal, "recurring" => $goal_recurring]);

    }


    if ($user->role_id == 1 || $user->role_id == 8) {

        if ($request->start_date != null && $request->end_date != null) {
            if ($request->shift_id != 'null') {
                $goal = GoalSetting::whereDate('startDate', '>=', $request->start_date)->whereDate('endDate', '<=', $request->end_date)->where('team_id', $request->shift_id)->get();
            } else {
                $goal = GoalSetting::whereDate('startDate', '>=', $request->start_date)->whereDate('endDate', '<=', $request->end_date)->get();
            }
        }
        // $goal = GoalSetting::all();
        $goal_recurring = GoalRecurring::all();

        // return response()->json(["goals" => $goal, "recurring" => $goal_recurring]);
    } elseif ($user->role_id != 1 || $user->role_id != 8) {
        $count = Seopage1Team::whereRaw("FIND_IN_SET(?, members)", [$user->id])
            ->get();


        //$teams= Seopage1Team::whereRaw("FIND_IN_SET($user->id, members) > 0")->get();
        // dd($user->id);

        if ($count != null) {

            foreach ($count as $team) {

                $goal[] = GoalSetting::where('team_id', $team->id)->get();


                $goal_recurring[] = GoalRecurring::all();
            }
        }
        //    /dd($goal);

    }
    return response()->json(["goals" => $goal, "recurring" => $goal_recurring]);
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
        if($data->team_id != null)
        {
            $team = Seopage1Team::find($data->team_id);

            $users = explode(',', $team->members);
            $user_data = [];
            foreach ($users as $key => $value) {
                if ($value != '') {
                     //$user = User::find($value);
                    array_push($user_data,$value);
                }
            }
        } else {
            $user_data[]= $data->user_id;
        }
        
        // Always use an array of user IDs, even if $data->user_id is set
        $data2 = $data->user_id ? [$data->user_id] : $user_data;
    
        if ($data->entryType == 'Added') {



            if ($data->dealType == 'All Clients' || $data->dealType == 'Existing Clients') {
                $dealStage = DealStage::select([
                    'deal_stages.id as id',
                    'deal_stages.id as deal_id',
                    'deal_stages.client_username as client_username',
                    'deal_stages.project_name as deal_project_name',
                    'deal_stages.project_link as deal_project_link',
                    'deal_stages.amount as deal_amount',
                    'deal_stages.deal_stage as deal_stage',
                    'deal_stages.deal_status as deal_status',
                    'deal_stages.actual_amount as deal_original_amount',
                    'deal_stages.created_at as deal_created_at',
                    'leads.added_by as lead_converted_by',
                    'leads.id as lead_id',
                ])
                ->leftJoin('leads', 'leads.id', '=', 'deal_stages.lead_id')
                ->whereIn('leads.added_by', $data2)
                ->whereDate('deal_stages.created_at', '>=', $data->startDate);
        
                if (!is_null($data->endDate)) {
                    $dealStage = $dealStage->whereDate('deal_stages.created_at', '<=', $data->endDate);
                }
        
                $dealStage = $dealStage->get();
            } elseif ($data->dealType == 'New Client') {
                $dealStage = DealStage::select([
                    'deal_stages.id as id',
                    'deal_stages.id as deal_id',
                    'deal_stages.client_username as client_username',
                    'deal_stages.project_name as deal_project_name',
                    'deal_stages.project_link as deal_project_link',
                    'deal_stages.amount as deal_amount',
                    'deal_stages.deal_stage as deal_stage',
                    'deal_stages.deal_status as deal_status',
                    'deal_stages.actual_amount as deal_original_amount',
                    'deal_stages.created_at as deal_created_at',
                    'leads.added_by as lead_converted_by',
                    'leads.id as lead_id',
                ])
                ->leftjoin('leads', 'leads.id', '=', 'deal_stages.lead_id')
                ->whereIn('leads.added_by', $data2)
                ->whereDate('deal_stages.created_at', '>=', $data->startDate)
                ->where('deal_stages.client_badge','=','new client');
        
                if (!is_null($data->endDate)) {
                    $dealStage = $dealStage->whereDate('deal_stages.created_at', '<=', $data->endDate);
                }
        
                $dealStage = $dealStage->get();

            }
            

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

            if ($data->dealType == 'All Clients' || $data->dealType == 'Existing Clients') {
                $dealStage = DealStage::leftJoin('leads', 'leads.id', '=', 'deal_stages.lead_id')
                ->join('deal_stage_changes', 'deal_stage_changes.deal_id', 'deal_stages.short_code')
                ->whereIn('leads.added_by', $data2)
                ->where([
                    'deal_stages.deal_stage' => $deal_status,
                    'deal_stage_changes.deal_stage_id' => 'deal_stages.deal_stage',
                ])
                ->whereDate('deal_stages.created_at', '>=', $data->startDate);
                
                if (!is_null($data->endDate)) {
                    $dealStage = $dealStage->whereDate('deal_stages.created_at', '<=', $data->endDate);
                }
                
                $dealStage = $dealStage->get();
            } elseif ($data->dealType == 'New Client') {
                $dealStage = DealStage::join('leads', 'leads.id', '=', 'deal_stages.lead_id')
                ->join('deal_stage_changes', 'deal_stage_changes.deal_id', 'deal_stages.short_code')
                ->whereIn('leads.added_by', $data2)
                ->where([
                    'deal_stages.deal_stage' => $deal_status,
                    'deal_stage_changes.deal_stage_id' => 'deal_stages.deal_stage',
                ])
                
                ->where('deal_stages.client_badge','=','new client')
                ->whereDate('deal_stages.created_at', '>=', $data->startDate);
                
                if (!is_null($data->endDate)) {
                    $dealStage = $dealStage->whereDate('deal_stages.created_at', '<=', $data->endDate);
                }
                
                $dealStage = $dealStage->get();
            }
            
        } elseif ($data->entryType == 'Won') {
            if($data->team_id != null)
            {
                $team = Seopage1Team::find($data->team_id);

                $users = explode(',', $team->members);
                $user_data = [];
                foreach ($users as $key => $value) {
                    if ($value != '') {
                         //$user = User::find($value);
                        array_push($user_data,$value);
                    }
                }
            } else {
                $user_data[]= $data->user_id;
            }
            

            $data2 = $data->user_id ? [$data->user_id] : $user_data;

            $array = [];
            if ($data->dealType == 'All Clients' || $data->dealType == 'Existing Clients') {
                $deals_data = Deal::select([
                    'deals.*',
                    'pm.id as pm_id',
                    'pm.name as pm_name',

                    DB::raw('COALESCE(leads.added_by, deals.added_by) as bidder')
                ])

                ->leftJoin('leads', 'leads.id', 'deals.lead_id')

                ->join('users as pm', 'pm.id', '=', 'deals.pm_id')
                ->whereDate('deals.created_at', '>=', $data->startDate);

                if (!is_null($data->endDate)) {
                    $deals_data = $deals_data->whereDate('deals.created_at', '<=', $data->endDate);
                }
                $deals_data = $deals_data->where('deals.status', '!=','Denied')

                //->whereIn('deals.added_by', $data2)
                ->orderBy('deals.id', 'desc')
                ->get();
                
                $hourly_deals = Deal::select([
                    'deals.*',
                    'pm.id as pm_id',
                    'pm.name as pm_name',
                    'projects.id as project_id',
                    'payments.id as payment_id',
                    'payments.paid_on',
                    

                    DB::raw('COALESCE(leads.added_by, deals.added_by) as bidder')
                ])
                ->leftJoin('leads', 'leads.id', 'deals.lead_id')
                ->join('users as pm', 'pm.id', '=', 'deals.pm_id')
                ->join('projects','projects.deal_id','deals.id')
                ->leftJoin('payments','payments.project_id','projects.id')
                ->whereDate('payments.paid_on', '>=', $data->startDate)
                //->where('deals.client_badge','=','new client')
                //->whereNotIn('deals.id', $deals_data->pluck('deals.id'))
                ->where('deals.project_type','=','hourly')
                ;

                if (!is_null($data->endDate)) {
                    $hourly_deals = $hourly_deals->whereDate('payments.paid_on', '<=', $data->endDate);
                }
                $hourly_deals = $hourly_deals->where('deals.status', '!=','Denied')
               // ->whereIn('deals.added_by', $data2)
                //->groupBy('client_id')
                ->orderBy('deals.id', 'desc')
                
                
                ->get();
                $mergedData = Collection::make($deals_data)->concat($hourly_deals);

                $filteredData = collect($mergedData)->unique('id')->values();

                $mergedArray = $filteredData->all();
                   
                // /dd($mergedArray);
               
             //   dd($deals_data,$mergedArray );
             if ($data->trackingType == 'count') {
                foreach ($deals_data as $key => $value)
                {
                   $check_client = Deal::whereDate('created_at', '>=', $data->startDate);
                   if (!is_null($data->endDate)) {
                       $check_client = $check_client->whereDate('created_at', '<=', $data->endDate);
                   }
                   $check_client = $check_client->select('client_id')->groupBy('client_id')->get();

                //    if ($data->trackingType == 'count') {
                //        $value->amount = 1;
                //        $value->tracking_type = 'count';
                //    }
                $value->amount = 1;
                //    if ($value->project_type == 'hourly') {
                //        if ($data->trackingType == 'count') {
                //            $value->amount = 1;
                //        }else 
                //        {
                //            $value->amount = 0;
                //        }
                //    }
                //    if ($value->project_type == 'hourly') {
                //        $project = Project::where('deal_id', $value->id)->first();
                //        if (!is_null($project)) {
                //            $payments = Payment::where([
                //                'project_id' => $project->id,
                //            ])->whereBetween(DB::raw('DATE(paid_on)'), [$data->startDate, $data->endDate])->get();

                //            if (count($payments) > 0 ) {
                //                if($data->trackingType == 'value')
                //                {
                //                    $value->amount = $payments->sum('amount');

                //                }elseif($data->trackingType == 'count') {
                //                    $value->amount = 1;
                //                }
                //             }
                              
                //            } 
                //    }

                   if (!is_null($data->goal)) {
                       $member = rtrim($data->goal->members, ',');
                       $member = explode(',', $member);
                   } else {
                       $member[] = $data->user_id;
                   }
                   
                   $value->deal_stage = DealStageChange::where('deal_id', $value->deal_id)->groupBy('deal_stage_id')->get();
                   $value->bidder_amount = round((24 * $value->amount) / 100, 2);
                   $value->team_total_amount = 0;
                   $team_total_amount = 0;

                   foreach ($value->deal_stage as $key => $deal_stage) {
                       $amount = 0;
                       if ($deal_stage->deal_stage_id ==  1) {
                           $value->qualified_by = $deal_stage->updated_by;
                           $amount = round((4 * $value->amount) / 100, 2);
                           $value->qualified_amount = $amount;
                       } elseif ($deal_stage->deal_stage_id == 2) {
                           $value->required_defined = $deal_stage->updated_by;
                           $amount = round((17 * $value->amount) / 100, 2);
                           $value->required_defined_amount = $amount;
                       } elseif ($deal_stage->deal_stage_id == 3) {
                           $value->proposal_made = $deal_stage->updated_by;
                           $amount = round((12 * $value->amount) / 100, 2);
                           $value->proposal_made_amount = $amount;
                       } elseif ($deal_stage->deal_stage_id == 4) {
                           $value->negotiation_started = $deal_stage->updated_by;
                           $amount = round((12 * $value->amount) / 100, 2);
                           $value->negotiation_started_amount = $amount;
                       } elseif ($deal_stage->deal_stage_id == 5) {
                           $value->milestone_breakdown = $deal_stage->updated_by;
                           $amount = round((14 * $value->amount) / 100, 2);
                           $value->milestone_breakdown_amount = $amount;
                       }

                       if (in_array($deal_stage->updated_by, $member)) {
                           $team_total_amount = $team_total_amount + $amount;
                           $value->team_total_amount = $team_total_amount;
                       }
                   }

                   $value->won_deal_amount = round((17 * $value->amount) / 100, 2);
                   $team_summation = DealStageChange::where('deal_id', $value->deal_id)->whereIn('updated_by', $member)->get();

                   if (in_array($value->added_by, $member)) {
                       $value->team_total_amount = round($value->team_total_amount + $value->won_deal_amount, 2);
                   }

                   if (in_array($value->bidder, $member)) {
                       $value->team_total_amount = round($value->team_total_amount + $value->bidder_amount, 2);
                   }

                   $array[] = $value;
               }
             }else 
             {
                foreach ($mergedArray as $key => $value)

                    {
                       $check_client = Deal::whereDate('created_at', '>=', $data->startDate);
                       if (!is_null($data->endDate)) {
                           $check_client = $check_client->whereDate('created_at', '<=', $data->endDate);
                       }
                       $check_client = $check_client->select('client_id')->groupBy('client_id')->get();
   
                    //    if ($data->trackingType == 'count') {
                    //        $value->amount = 1;
                    //        $value->tracking_type = 'count';
                    //    }
                    //    if ($value->project_type == 'hourly') {
                    //        if ($data->trackingType == 'count') {
                    //            $value->amount = 1;
                    //        }else 
                    //        {
                    //            $value->amount = 0;
                    //        }
                    //    }
                       if ($value->project_type == 'hourly') {
                           $project = Project::where('deal_id', $value->id)->first();
                           if (!is_null($project)) {
                               $payments = Payment::where([
                                   'project_id' => $project->id,
                               ])->whereBetween(DB::raw('DATE(paid_on)'), [$data->startDate, $data->endDate])->sum('amount');
   
                                $value->amount = $payments;
                                  
                               } 
                       }else 
                       {
                        $value->amount = $value->amount;
                       }
   
                       if (!is_null($data->goal)) {
                           $member = rtrim($data->goal->members, ',');
                           $member = explode(',', $member);
                       } else {
                           $member[] = $data->user_id;
                       }
                       
                       $value->deal_stage = DealStageChange::where('deal_id', $value->deal_id)->groupBy('deal_stage_id')->get();
                       $value->bidder_amount = round((24 * $value->amount) / 100, 2);
                       $value->team_total_amount = 0;
                       $team_total_amount = 0;
   
                       foreach ($value->deal_stage as $key => $deal_stage) {
                           $amount = 0;
                           if ($deal_stage->deal_stage_id ==  1) {
                               $value->qualified_by = $deal_stage->updated_by;
                               $amount = round((4 * $value->amount) / 100, 2);
                               $value->qualified_amount = $amount;
                           } elseif ($deal_stage->deal_stage_id == 2) {
                               $value->required_defined = $deal_stage->updated_by;
                               $amount = round((17 * $value->amount) / 100, 2);
                               $value->required_defined_amount = $amount;
                           } elseif ($deal_stage->deal_stage_id == 3) {
                               $value->proposal_made = $deal_stage->updated_by;
                               $amount = round((12 * $value->amount) / 100, 2);
                               $value->proposal_made_amount = $amount;
                           } elseif ($deal_stage->deal_stage_id == 4) {
                               $value->negotiation_started = $deal_stage->updated_by;
                               $amount = round((12 * $value->amount) / 100, 2);
                               $value->negotiation_started_amount = $amount;
                           } elseif ($deal_stage->deal_stage_id == 5) {
                               $value->milestone_breakdown = $deal_stage->updated_by;
                               $amount = round((14 * $value->amount) / 100, 2);
                               $value->milestone_breakdown_amount = $amount;
                           }
   
                           if (in_array($deal_stage->updated_by, $member)) {
                               $team_total_amount = $team_total_amount + $amount;
                               $value->team_total_amount = $team_total_amount;
                           }
                       }
   
                       $value->won_deal_amount = round((17 * $value->amount) / 100, 2);
                       $team_summation = DealStageChange::where('deal_id', $value->deal_id)->whereIn('updated_by', $member)->get();
   
                       if (in_array($value->added_by, $member)) {
                           $value->team_total_amount = round($value->team_total_amount + $value->won_deal_amount, 2);
                       }
   
                       if (in_array($value->bidder, $member)) {
                           $value->team_total_amount = round($value->team_total_amount + $value->bidder_amount, 2);
                       }
   
                       $array[] = $value;
                   }
             }
                
                    
                   
               


              
            } elseif ($data->dealType == 'New Client') {
                $deals_data = Deal::select([
                    'deals.*',
                    'pm.id as pm_id',
                    'pm.name as pm_name',
                    

                    DB::raw('COALESCE(leads.added_by, deals.added_by) as bidder')
                ])
                ->leftJoin('leads', 'leads.id', 'deals.lead_id')
                ->join('users as pm', 'pm.id', '=', 'deals.pm_id')
                ->whereDate('deals.created_at', '>=', $data->startDate)
                ->where('deals.client_badge','=','new client');

                if (!is_null($data->endDate)) {
                    $deals_data = $deals_data->whereDate('deals.created_at', '<=', $data->endDate);
                }
                $deals_data = $deals_data->where('deals.status', '!=','Denied')
               // ->whereIn('deals.added_by', $data2)
                //->groupBy('client_id')
                ->orderBy('deals.id', 'desc')
                
                ->get();

                $hourly_deals = Deal::select([
                    'deals.*',
                    'pm.id as pm_id',
                    'pm.name as pm_name',
                    'projects.id as project_id',
                    'payments.id as payment_id',
                    'payments.paid_on',
                    

                    DB::raw('COALESCE(leads.added_by, deals.added_by) as bidder')
                ])
                ->leftJoin('leads', 'leads.id', 'deals.lead_id')
                ->join('users as pm', 'pm.id', '=', 'deals.pm_id')
                ->join('projects','projects.deal_id','deals.id')
                ->leftJoin('payments','payments.project_id','projects.id')
                ->whereDate('payments.paid_on', '>=', $data->startDate)
               // ->whereNotIn('deals.id', $deals_data->pluck('deals.id'))
             
                ->where('deals.client_badge','=','new client')
                ->where('deals.project_type','=','hourly')
                ;

                if (!is_null($data->endDate)) {
                    $hourly_deals = $hourly_deals->whereDate('payments.paid_on', '<=', $data->endDate);
                }
                $hourly_deals = $hourly_deals->where('deals.status', '!=','Denied')
               // ->whereIn('deals.added_by', $data2)
                //->groupBy('client_id')
                ->orderBy('deals.id', 'desc')
                
                ->get();
                $mergedData = Collection::make($deals_data)->concat($hourly_deals);

                $filteredData = collect($mergedData)->unique('id')->values();

                $mergedArray = $filteredData->all();
               // dd($deals_data,$mergedArray );
               // dd($mergedArray);
              if ($data->trackingType == 'count') {
                foreach ($deals_data as $key => $value) {
                    // if ($data->trackingType == 'count') {
                    //     $value->amount = 1;
                    //     $value->tracking_type = 'count';
                    // }
                    // if ($value->project_type == 'hourly') {
                    //     if ($data->trackingType == 'count') {
                    //         $value->amount = 1;
                    //     }else 
                    //     {
                    //         $value->amount = 0;
                    //     }
                    // }
                    $value->amount = 1;
                    // if ($value->project_type == 'hourly') {
                    //     $project = Project::where('deal_id', $value->id)->first();
                    //     if (!is_null($project)) {
                    //         $payments = Payment::where([
                    //             'project_id' => $project->id,
                    //         ])->whereBetween(DB::raw('DATE(paid_on)'), [$data->startDate, $data->endDate])->get();

                    //         if (count($payments) > 0 ) {
                    //             if($data->trackingType == 'value')
                    //             {
                    //                 $value->amount = $payments->sum('amount');

                    //             }else {
                    //                 $value->amount = 1;
                    //             }
                               
                    //         } else {
                    //             $value->amount = 0;
                    //         }
                    //     } else {
                    //         $value->amount = 0;
                    //     }
                    // }

                    if (!is_null($data->goal)) {
                        $member = rtrim($data->goal->members, ',');
                        $member = explode(',', $member);
                    } else {
                        $member[] = $data->user_id;
                    }
                    
                    $value->deal_stage = DealStageChange::where('deal_id', $value->deal_id)->groupBy('deal_stage_id')->get();
                    $value->bidder_amount = round((24 * $value->amount) / 100, 2);
                    $value->team_total_amount = 0;
                    $team_total_amount = 0;

                    foreach ($value->deal_stage as $key => $deal_stage) {
                        $amount = 0;
                        if ($deal_stage->deal_stage_id ==  1) {
                            $value->qualified_by = $deal_stage->updated_by;
                            $amount = round((4 * $value->amount) / 100, 2);
                            $value->qualified_amount = $amount;
                        } elseif ($deal_stage->deal_stage_id == 2) {
                            $value->required_defined = $deal_stage->updated_by;
                            $amount = round((17 * $value->amount) / 100, 2);
                            $value->required_defined_amount = $amount;
                        } elseif ($deal_stage->deal_stage_id == 3) {
                            $value->proposal_made = $deal_stage->updated_by;
                            $amount = round((12 * $value->amount) / 100, 2);
                            $value->proposal_made_amount = $amount;
                        } elseif ($deal_stage->deal_stage_id == 4) {
                            $value->negotiation_started = $deal_stage->updated_by;
                            $amount = round((12 * $value->amount) / 100, 2);
                            $value->negotiation_started_amount = $amount;
                        } elseif ($deal_stage->deal_stage_id == 5) {
                            $value->milestone_breakdown = $deal_stage->updated_by;
                            $amount = round((14 * $value->amount) / 100, 2);
                            $value->milestone_breakdown_amount = $amount;
                        }

                        if (in_array($deal_stage->updated_by, $member)) {
                            $team_total_amount = $team_total_amount + $amount;
                            $value->team_total_amount = $team_total_amount;
                        }
                    }

                    $value->won_deal_amount = round((17 * $value->amount) / 100, 2);
                    $team_summation = DealStageChange::where('deal_id', $value->deal_id)->whereIn('updated_by', $member)->get();

                    if (in_array($value->added_by, $member)) {
                        //$team_total_amount = $team_total_amount + $amount;
                        $value->team_total_amount = round($value->team_total_amount + $value->won_deal_amount, 2);
                    }

                    if (in_array($value->bidder, $member)) {
                        //$team_total_amount = $team_total_amount + $amount;
                        $value->team_total_amount = round($value->team_total_amount + $value->bidder_amount, 2);
                    }

                    $array[] = $value;
                }
              }else 
              {
            // / dd($mergedArray);
                foreach ($mergedArray as $key => $value) {
                    // if ($data->trackingType == 'count') {
                    //     $value->amount = 1;
                    //     $value->tracking_type = 'count';
                    // }
                    // if ($value->project_type == 'hourly') {
                    //     if ($data->trackingType == 'count') {
                    //         $value->amount = 1;
                    //     }else 
                    //     {
                    //         $value->amount = 0;
                    //     }
                    // }
                    //dd($value);
                    if ($value->project_type == 'hourly') {
                        $project = Project::where('deal_id', $value->id)->first();
                        
                        if (!is_null($project)) {
                            $payments = Payment::where([
                                'project_id' => $project->id,
                            ])->whereBetween(DB::raw('DATE(paid_on)'), [$data->startDate, $data->endDate])->sum('amount');

                             $value->amount = $payments;
                               
                            } 
                    }else 
                    {
                     $value->amount = $value->amount;
                    }

                    if (!is_null($data->goal)) {
                        $member = rtrim($data->goal->members, ',');
                        $member = explode(',', $member);
                    } else {
                        $member[] = $data->user_id;
                    }
                    
                    $value->deal_stage = DealStageChange::where('deal_id', $value->deal_id)->groupBy('deal_stage_id')->get();
                    $value->bidder_amount = round((24 * $value->amount) / 100, 2);
                    $value->team_total_amount = 0;
                    $team_total_amount = 0;

                    foreach ($value->deal_stage as $key => $deal_stage) {
                        $amount = 0;
                        if ($deal_stage->deal_stage_id ==  1) {
                            $value->qualified_by = $deal_stage->updated_by;
                            $amount = round((4 * $value->amount) / 100, 2);
                            $value->qualified_amount = $amount;
                        } elseif ($deal_stage->deal_stage_id == 2) {
                            $value->required_defined = $deal_stage->updated_by;
                            $amount = round((17 * $value->amount) / 100, 2);
                            $value->required_defined_amount = $amount;
                        } elseif ($deal_stage->deal_stage_id == 3) {
                            $value->proposal_made = $deal_stage->updated_by;
                            $amount = round((12 * $value->amount) / 100, 2);
                            $value->proposal_made_amount = $amount;
                        } elseif ($deal_stage->deal_stage_id == 4) {
                            $value->negotiation_started = $deal_stage->updated_by;
                            $amount = round((12 * $value->amount) / 100, 2);
                            $value->negotiation_started_amount = $amount;
                        } elseif ($deal_stage->deal_stage_id == 5) {
                            $value->milestone_breakdown = $deal_stage->updated_by;
                            $amount = round((14 * $value->amount) / 100, 2);
                            $value->milestone_breakdown_amount = $amount;
                        }

                        if (in_array($deal_stage->updated_by, $member)) {
                            $team_total_amount = $team_total_amount + $amount;
                            $value->team_total_amount = $team_total_amount;
                        }
                    }

                    $value->won_deal_amount = round((17 * $value->amount) / 100, 2);
                    $team_summation = DealStageChange::where('deal_id', $value->deal_id)->whereIn('updated_by', $member)->get();

                    if (in_array($value->added_by, $member)) {
                        //$team_total_amount = $team_total_amount + $amount;
                        $value->team_total_amount = round($value->team_total_amount + $value->won_deal_amount, 2);
                    }

                    if (in_array($value->bidder, $member)) {
                        //$team_total_amount = $team_total_amount + $amount;
                        $value->team_total_amount = round($value->team_total_amount + $value->bidder_amount, 2);
                    }

                    $array[] = $value;
                }
              }

               
            }


            return response()->json($array);
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

    public function goalMarkAsPublic(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'is_public' => 'required|in:1'
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        GoalSetting::where('is_private', 1)->update([
            'is_private' => 0
        ]);

        return response()->json([
            'status' => 200,
            'data' => 'All private goals have been marked as public successfully'
        ]);
    }
}

