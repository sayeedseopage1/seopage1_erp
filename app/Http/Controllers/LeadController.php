<?php

namespace App\Http\Controllers;

use App\Models\CashPoint;
use App\Models\Seopage1Team;
use Carbon\Carbon;
use App\Models\Lead;
use App\Helper\Files;
use App\Helper\Reply;
use App\Models\Country;
use App\Models\LeadAgent;
use App\Models\LeadSource;
use App\Models\LeadStatus;
use App\Imports\LeadImport;
use App\Jobs\ImportLeadJob;
use App\Models\GdprSetting;
use App\Models\LeadCategory;
use App\Models\LeadFollowUp;
use Illuminate\Http\Request;
use App\Models\PurposeConsent;
use App\DataTables\LeadsDataTable;
use App\Models\PurposeConsentLead;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Bus;
use App\Http\Requests\CommonRequest;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;
use App\DataTables\LeadGDPRDataTable;
use App\DataTables\ProposalDataTable;
use App\DataTables\LeadNotesDataTable;
use Illuminate\Support\Facades\Artisan;
use Maatwebsite\Excel\HeadingRowImport;
use App\Http\Requests\Lead\StoreDealStageRequest;
use App\Http\Requests\Lead\StoreRequest;
use App\Http\Requests\Lead\UpdateRequest;
use Maatwebsite\Excel\Imports\HeadingRowFormatter;
use App\Http\Requests\Admin\Employee\ImportRequest;
use App\Http\Requests\Admin\Employee\ImportProcessRequest;
use App\Http\Requests\FollowUp\StoreRequest as FollowUpStoreRequest;
use App\Models\LeadCustomForm;
use App\Models\LeadNote;
use Auth;
use App\Models\User;
use App\Models\Contract;
use App\Models\ContractType;
use App\Models\DealStage;
use App\Models\SalesCount;
use DateTime;
use App\Models\DealStageChange;
use App\Models\Currency;
use Illuminate\Support\Facades\Redirect;
use Toastr;
use Mail;
use App\Mail\LeadConversionMail;
use Illuminate\Support\Facades\Validator;
use App\Notifications\DealUpdate;
use App\Models\LeadActivity;
use App\Models\LeadsDealsActivityLog;
use App\Models\Deal;
use App\Models\GoalSetting;




class LeadController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.lead';
        $this->middleware(function ($request, $next) {
            abort_403(!in_array('leads', $this->user->modules));
            return $next($request);
        });
    }
 //convert lead to deal and creating deal
    public function DealStageChange(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'client_username' => 'required|max:255',
            'profile_link' => 'required',
            'message_link' => 'required',
            'comments' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        };

        abort_403(user()->permission('view_contract') == 'none');


        $lead= Lead::where('id',$request->id)->first();
        $chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        $suffle = substr(str_shuffle($chars), 0, 6);
        $message_links = $request->message_link;
        $value= '';

        if (is_array($message_links) || is_object($message_links)) {
            foreach ($message_links as $link) {
                $value= $value  . $link .' <br> ';

            }
        }
        // DB::beginTransaction();
        $deal= new DealStage();
        $deal->short_code= 'DSEOP1'. $suffle;
        $deal->lead_id= $lead->id;
        $deal->status= 1;
        $deal->deal_stage= 0;
        $deal->comments= $request->comments;
        $deal->profile_link= $request->profile_link;
        $deal->message_link= $value;
        $deal->client_username= $request->client_username;
        $deal->currency_id= 1;
        $deal->project_name= $lead->client_name;
        $deal->original_currency_id= $lead->original_currency_id;
        $deal->amount= $lead->value;
        $deal->actual_amount= $lead->actual_value;
        $deal->added_by= Auth::id();
        $deal->converted_by= Auth::id();
        $deal->save();

        //goal achieve check start here
        $goals = GoalSetting::where([
            'goal_status' =>  0,
        ])->get();

        if($goals != null) {
            foreach ($goals as $goal) {
                $start = Carbon::parse($goal->startDate);
                $end = Carbon::parse($goal->endDate);
                $dateToCheck = Carbon::parse($deal->created_at);

                if ($dateToCheck->between($start, $end)) {

                    if($goal->team_id != null)
                    {
                        $team = Seopage1Team::find($goal->team_id);

                        $users = explode(',', $team->members);
                        $user_data = [];
                        foreach ($users as $key => $value) {
                            if ($value != '') {
                                array_push($user_data,$value);
                            }
                        }
                    } else {
                        $user_data[]= $goal->user_id;
                    }
                }

                if (isset($goal->user_id) || isset($user_data)) {
                    // Always use an array of user IDs, even if $goal->user_id is set
                    $goal2 = $goal->user_id ? [$goal->user_id] : $user_data;


                    if ($goal->entryType == 'Added') {
                        if($goal->dealType == 'New Client')
                        {
                            $dealStage = DealStage::select([
                                'deal_stages.*',
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
                            ->whereIn('leads.added_by', $goal2)
                            ->whereDate('deal_stages.created_at', '>=', $goal->startDate)
                            ->groupBy('deal_stages.client_username');

                            if (!is_null($goal->endDate)) {
                                $dealStage = $dealStage->whereDate('deal_stages.created_at', '<=', $goal->endDate);
                            }

                            $dealStage_amount2 = $dealStage->get();
                            $dealStage_amount = $dealStage->sum('deal_stages.amount');
                            $dealStage_count = $dealStage->count();
                            if ($goal->trackingType == 'value') {

                                $deal_amount = $dealStage_amount;

                            } else {

                                $deal_amount = $dealStage_count;

                            }
                            if ($deal_amount >= (int) $goal->trackingValue) {
                                $goal_update= GoalSetting::find($goal->id);
                                $goal_update->goal_status = 1;
                                $goal_update->save();
                                if ($goal->achievablePoints > 0) {

                                    $distribute_amount = $goal->achievablePoints / count($user_data);

                                    foreach ($user_data as $value) {

                                        $user_name = User::find($value);
                                        $user_last_point = CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();

                                        $point= new CashPoint();
                                        $point->user_id= $value;
                                        $point->activity= $user_name->name . ' For achieving '.$goal->frequency.' Goal '.$goal->title;
                                        $point->gained_as = "Individual";
                                        $point->points= $distribute_amount;

                                        if ($user_last_point != null) {
                                            $point->total_points_earn= $user_last_point->total_points_earn + $distribute_amount;
                                        } else {
                                            $point->total_points_earn=  $distribute_amount;
                                        }

                                        $point->save();
                                    }
                                }
                            }
                        } else {
                            $dealStage = DealStage::select([
                                'deal_stages.*',
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
                            ->whereIn('leads.added_by', $goal2)
                            ->whereDate('deal_stages.created_at', '>=', $goal->startDate);

                            if (!is_null($goal->endDate)) {
                                $dealStage = $dealStage->whereDate('deal_stages.created_at', '<=', $goal->endDate);
                            }

                            $dealStage_amount = $dealStage->sum('deal_stages.amount');
                            $dealStage_count = $dealStage->count();
                            if ($goal->trackingType == 'value') {
                                $deal_amount = $dealStage_amount;
                            } else {
                                $deal_amount = $dealStage_count;
                            }

                            if ($deal_amount >= (int) $goal->trackingValue) {
                                $goal_update= GoalSetting::find($goal->id);
                                $goal_update->goal_status = 1;
                                $goal_update->save();
                                if ($goal->achievablePoints > 0) {
                                    $distribute_amount = $goal->achievablePoints / count($user_data);
                                    foreach ($user_data as $value) {
                                        $user_name = User::find($value);
                                        $user_last_point = CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();

                                        $point= new CashPoint();
                                        $point->user_id= $value;
                                        $point->activity= $user_name->name . ' For achieving '.$goal->frequency.' Goal '.$goal->title;
                                        $point->gained_as = "Individual";
                                        $point->points= $distribute_amount;

                                        if ($user_last_point != null) {
                                            $point->total_points_earn= $user_last_point->total_points_earn + $distribute_amount;
                                        } else {
                                            $point->total_points_earn=  $distribute_amount;
                                        }

                                        $point->save();
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        // activity log
        $user = Auth::user();
        $text = $user->getRole->name.' '.$user->name.' - Lead ('.$lead->client_name.') was converted';

        $link = '<a href="'.route('deals.show', $deal->id).'">'.$text.'</a>';

        $activityLog = new LeadsDealsActivityLog();
        $activityLog->lead_id = $deal->lead_id;
        $activityLog->deal_id = $deal->id;
        $activityLog->message = $link;
        $activityLog->created_by = Auth::id();
        $activityLog->save();

        //update previous lead

        $previous_lead = LeadsDealsActivityLog::where([
            'lead_id' => $deal->lead_id,
            'deal_id' => null
        ])->first();
        if ($previous_lead) {
            $previous_lead->deal_id = $deal->id;
            $previous_lead->save();
        }
        //END ACTIVITY LOG
        $deal_stage= new DealStageChange();
        $deal_stage->lead_id= $lead->id;
        $deal_stage->deal_id= $deal->short_code;
        $deal_stage->comments= $request->comments;
        $deal_stage->deal_stage_id=$deal->deal_stage;
        $deal_stage->updated_by= Auth::id();
        $deal_stage->save();


        if ($request->deal_stage == 4) {
            $lead_id= Lead::where('id',$request->id)->first();
            $agent= SalesCount::where('user_id',$lead_id->added_by)->first();
            if ($agent != null) {
                $lead_ag= SalesCount::find($agent->id);

                $lead_ag->negotiation_started= $lead_ag->negotiation_started +1;
                $lead_ag->save();
            }
        }
        $lead= Lead::find($lead->id);
        $lead->deal_status=1;
        $lead->save();
        $lead_con_id= Lead::where('id',$request->id)->first();
        $agent_id= SalesCount::where('user_id',$lead_con_id->added_by)->first();
        if ($agent_id != null) {
            $lead_ag_id= SalesCount::find($agent_id->id);


            $lead_ag_id->deals_count= $lead_ag_id->deals_count +1;
            $lead_ag_id->save();
        }
        $users= User::where('role_id',1)->get();
        foreach ($users as $user) {
            Mail::to($user->email)->send(new LeadConversionMail($lead));
        }
        $deal= DealStage::where('lead_id',$lead->id)->first();
        // add pusher with admin role id 1
        $users = User::where('role_id', '1')->get();


        foreach ($users as $user) {
            $pusher_options = [
                'user_id' => $user->id,
                'role_id' => 1,
                'title' => 'Lead Converted Successfully',
                'body' => 'Please check new deals',
                'redirectUrl' => route('deals.show', $deal->id)
            ];

            $this->triggerPusher('lead-updated-channel', 'lead-updated', $pusher_options);
            $user->notify(new DealUpdate($deal, $pusher_options));
        }
        return response()->json([
            'status' => 'success',
            'deal_id' => $deal->id,
        ]);
    }
   //convert to deal to next step
    public function DealStageUpdate(Request $request)
    {
        $request->validate([
            'comments' => 'required',
        ]);

        $deal_stage= DealStage::where('id',$request->id)->first();
        if ($deal_stage->deal_stage == 5 && $request->won_lost == "No") {
            $deal= DealStage::find($request->id);
            $deal->comments=$request->comments;
            $deal->deal_status="Lost";
            $deal->won_lost="No";


            $deal->save();
            $deal_stage= new DealStageChange();
            $deal_stage->lead_id= $deal->lead_id;
            $deal_stage->deal_id= $deal->short_code;
            $deal_stage->comments= $request->comments;
            $deal_stage->deal_stage_id=$deal->deal_stage;
            $deal_stage->updated_by= Auth::id();
            $deal_stage->save();
            // $lead_id= Lead::where('id',$deal->lead_id)->first();
            // $lead= Lead::find($lead_id->id);
            // $lead->status_id= 4;
            // $lead->save();
            if (Auth::user()->role_id == 7) {
                $agent_id= SalesCount::where('user_id',Auth::id())->first();
                $lead_ag_id= SalesCount::find($agent_id->id);

                $lead_ag_id->lost_deals= $lead_ag_id->lost_deals +1;
                $lead_ag_id->save();
            }
        } else {
            $deal= DealStage::find($request->id);

            if($deal_stage->deal_stage == 0 )
            {
                $deal->deal_stage= $deal_stage->deal_stage+1;
                $deal->comments=$request->comments;
                $deal->won_lost=$request->won_lost;
                $deal->save();

                $deal_stage= new DealStageChange();
                $deal_stage->lead_id= $deal->lead_id;
                $deal_stage->deal_id= $deal->short_code;
                $deal_stage->comments= $request->comments;
                $deal_stage->deal_stage_id=$deal->deal_stage;
                $deal_stage->updated_by= Auth::id();
                $deal_stage->save();

                // activity log
                //$deal = Deal::where('deal_id', $deal->short_code)->first();

                $user = Auth::user();
                $text = $user->name.' moved the deal from Contact Made to Qualified';
                $link = '<a href="'.route('deals.show', $deal->id).'">'.$text.'</a>';

                $activityLog = new LeadsDealsActivityLog();
                $activityLog->lead_id = $deal->lead_id;
                $activityLog->deal_id = $deal->id;
                $activityLog->message = $link;
                $activityLog->created_by = Auth::id();
                $activityLog->save();

                //update previous lead
                $previous_lead = LeadsDealsActivityLog::where([
                    'lead_id' => $deal->lead_id,
                    'deal_id' => null
                ])->first();
                if ($previous_lead) {
                    $previous_lead->deal_id = $deal->id;
                    $previous_lead->save();
                }
                //END ACTIVITY LOG

                // $lead_id= Lead::where('id',$deal->lead_id)->first();
                // $lead= Lead::find($lead_id->id);
                // $lead->status_id= 4;
                // $lead->save();

                $pusher_options['title'] = 'Deals Qualified';
                $pusher_options['body'] = 'Go to the deals';
            } elseif ($deal_stage->deal_stage == 1) {
                $deal->deal_stage= $deal_stage->deal_stage+1;
                $deal->comments=$request->comments;
                $deal->won_lost=$request->won_lost;
                $deal->save();

                $deal_stage= new DealStageChange();
                $deal_stage->lead_id= $deal->lead_id;
                $deal_stage->deal_id= $deal->short_code;
                $deal_stage->comments= $request->comments;
                $deal_stage->deal_stage_id=$deal->deal_stage;
                $deal_stage->updated_by= Auth::id();
                $deal_stage->save();

                // activity log
                $user = Auth::user();
                $text = $user->name.' moved the deal from Qualified to Requirements Defined';
                $link = '<a href="'.route('deals.show', $deal->id).'">'.$text.'</a>';

                $activityLog = new LeadsDealsActivityLog();
                $activityLog->lead_id = $deal->lead_id;
                $activityLog->deal_id = $deal->id;
                $activityLog->message = $link;
                $activityLog->created_by = Auth::id();
                $activityLog->save();

                //update previous lead
                $previous_lead = LeadsDealsActivityLog::where([
                    'lead_id' => $deal->lead_id,
                    'deal_id' => null
                ])->first();
                if ($previous_lead) {
                    $previous_lead->deal_id = $deal->id;
                    $previous_lead->save();
                }
                //end activity log

                $pusher_options['title'] = 'Requirements Defined';
                $pusher_options['body'] = 'Go to the deals';
            } elseif ($deal_stage->deal_stage == 2) {
                $deal->deal_stage= $deal_stage->deal_stage+1;
                $deal->comments=$request->comments;
                $deal->won_lost=$request->won_lost;
                $deal->save();

                $deal_stage= new DealStageChange();
                $deal_stage->lead_id= $deal->lead_id;
                $deal_stage->deal_id= $deal->short_code;
                $deal_stage->comments= $request->comments;
                $deal_stage->deal_stage_id=$deal->deal_stage;
                $deal_stage->updated_by= Auth::id();
                $deal_stage->save();

                // activity log
                $user = Auth::user();
                $text = $user->name.' moved the deal from Requirements Defined to Proposal Made';
                $link = '<a href="'.route('deals.show', $deal->id).'">'.$text.'</a>';

                $activityLog = new LeadsDealsActivityLog();
                $activityLog->lead_id = $deal->lead_id;
                $activityLog->deal_id = $deal->id;
                $activityLog->message = $link;
                $activityLog->created_by = Auth::id();
                $activityLog->save();

                //update previous lead
                $previous_lead = LeadsDealsActivityLog::where([
                    'lead_id' => $deal->lead_id,
                    'deal_id' => null
                ])->first();
                if ($previous_lead) {
                    $previous_lead->deal_id = $deal->id;
                    $previous_lead->save();
                }
                //end activity log

                $pusher_options['title'] = 'Proposal Made';
                $pusher_options['body'] = 'Go to the deals';
            } elseif ($deal_stage->deal_stage == 3) {
                $deal->deal_stage= $deal_stage->deal_stage+1;
                $deal->comments=$request->comments;
                $deal->won_lost=$request->won_lost;
                $deal->save();

                $deal_stage= new DealStageChange();
                $deal_stage->lead_id= $deal->lead_id;
                $deal_stage->deal_id= $deal->short_code;
                $deal_stage->comments= $request->comments;
                $deal_stage->deal_stage_id=$deal->deal_stage;
                $deal_stage->updated_by= Auth::id();
                $deal_stage->save();

                // activity log
                $user = Auth::user();
                $text = $user->name.' moved the deal from Proposal Made to Negotiation Started';
                $link = '<a href="'.route('deals.show', $deal->id).'">'.$text.'</a>';

                $activityLog = new LeadsDealsActivityLog();
                $activityLog->lead_id = $deal->lead_id;
                $activityLog->deal_id = $deal->id;
                $activityLog->message = $link;
                $activityLog->created_by = Auth::id();
                $activityLog->save();

                //update previous lead
                $previous_lead = LeadsDealsActivityLog::where([
                    'lead_id' => $deal->lead_id,
                    'deal_id' => null
                ])->first();
                if ($previous_lead) {
                    $previous_lead->deal_id = $deal->id;
                    $previous_lead->save();
                }
                //end activity log
                $pusher_options['title'] = 'Negotiation Started';
                $pusher_options['body'] = 'Go to the deals';
            } elseif($deal_stage->deal_stage == 4) {
                $deal->deal_stage= $deal_stage->deal_stage+1;
                $deal->comments=$request->comments;
                $deal->won_lost=$request->won_lost;
                $deal->save();

                $deal_stage= new DealStageChange();
                $deal_stage->lead_id= $deal->lead_id;
                $deal_stage->deal_id= $deal->short_code;
                $deal_stage->comments= $request->comments;
                $deal_stage->deal_stage_id=$deal->deal_stage;
                $deal_stage->updated_by= Auth::id();
                $deal_stage->save();

                // activity log
                $user = Auth::user();
                $text = $user->name.' moved the deal from Negotiation Started to Milestone Breakdown';
                $link = '<a href="'.route('deals.show', $deal->id).'">'.$text.'</a>';

                $activityLog = new LeadsDealsActivityLog();
                $activityLog->lead_id = $deal->lead_id;
                $activityLog->deal_id = $deal->id;
                $activityLog->message = $link;
                $activityLog->created_by = Auth::id();
                $activityLog->save();

                //update previous lead
                $previous_lead = LeadsDealsActivityLog::where([
                    'lead_id' => $deal->lead_id,
                    'deal_id' => null
                ])->first();
                if ($previous_lead) {
                    $previous_lead->deal_id = $deal->id;
                    $previous_lead->save();
                }
                //end activity log

                $pusher_options['title'] = 'Milestone Breakdown';
                $pusher_options['body'] = 'Go to the deals';

                if (Auth::user()->role_id == 7) {
                    $agent= SalesCount::where('user_id',Auth::id())->first();
                    $lead_ag= SalesCount::find($agent->id);

                    $lead_ag->negotiation_started= $lead_ag->negotiation_started +1;
                    $lead_ag->save();
                }
            }
            else {
                // $deal->deal_stage= $deal_stage->deal_stage;
                // $deal->comments=$request->comments;
                // $deal->won_lost=$request->won_lost;
                // $deal->save();

                // $deal_stage= new DealStageChange();
                // $deal_stage->lead_id= $deal->lead_id;
                // $deal_stage->deal_id= $deal->short_code;
                // $deal_stage->comments= $request->comments;
                // $deal_stage->deal_stage_id=$deal->deal_stage;
                // $deal_stage->updated_by= Auth::id();
                // $deal_stage->save();

                // $pusher_options['title'] = 'Milestone Breakdown';
                // $pusher_options['body'] = 'Go to the deals';
            }

            $users = User::where('role_id', '7')->get();
            foreach ($users as $user) {
                $pusher_options['user_id'] = $user->id;
                $pusher_options['role_id'] = 7;
                $pusher_options['redirectUrl'] = route('deals.show', $deal->id);

                $this->triggerPusher('lead-updated-channel', 'lead-updated', $pusher_options);
                $user->notify(new DealUpdate($deal, $pusher_options));
            }
        }

        return response()->json([
            'status'=>400
        ]);
    }
    //lost deal
    public function DealStageUpdateLost(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'comments' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400
            ]);
        };
//        dd($request->all());
      $deal= DealStage::find($request->id);
//      dd($deal);
        $deal->comments=$request->comments;
        $deal->deal_status="Lost";
        $deal->won_lost="No";
        $deal->save();
        if (Auth::user()->role_id == 7) {
          $agent_id= SalesCount::where('user_id',Auth::id())->first();
          $lead_ag_id= SalesCount::find($agent_id->id);

          $lead_ag_id->lost_deals= $lead_ag_id->lost_deals +1;
          $lead_ag_id->save();
        }
        return response()->json([
            'status' => 'success'
        ]);
//    return back()->with('status_updated', 'Status Updated!!');
    }
//leads datatable
    public function index(LeadsDataTable $dataTable)
    {
        $this->viewLeadPermission = $viewPermission = user()->permission('view_lead');
        abort_403(!in_array($viewPermission, ['all', 'added', 'both', 'owned']));

        if (!request()->ajax()) {
            $this->totalLeads = Lead::get();
            $this->categories = LeadCategory::get();
            $this->sources = LeadSource::get();
            $this->status = LeadStatus::get();

            $this->totalClientConverted = $this->totalLeads->filter(function ($value, $key) {
                return $value->client_id != null;
            });

            $this->totalLeads = $this->totalLeads->count();
            $this->totalClientConverted = $this->totalClientConverted->count();

            $this->pendingLeadFollowUps = LeadFollowUp::where(DB::raw('DATE(next_follow_up_date)'), '<=', now()->format('Y-m-d'))
                ->join('leads', 'leads.id', 'lead_follow_up.lead_id')
                ->where('leads.next_follow_up', 'yes')
                ->groupBy('lead_follow_up.lead_id')
                ->get();
            $this->pendingLeadFollowUps = $this->pendingLeadFollowUps->count();

            $this->viewLeadAgentPermission = user()->permission('view_lead_agents');


            $this->leadAgents = LeadAgent::with('user')->whereHas('user', function ($q) {
                $q->where('status', 'active');
            });

            $this->leadAgents = $this->leadAgents->where(function ($q) {
                if ($this->viewLeadAgentPermission == 'all') {
                    $this->leadAgents = $this->leadAgents;
                }
                elseif ($this->viewLeadAgentPermission == 'added') {
                    $this->leadAgents = $this->leadAgents->where('added_by', user()->id);
                }
                elseif ($this->viewLeadAgentPermission == 'owned') {
                    $this->leadAgents = $this->leadAgents->where('user_id', user()->id);
                }
                elseif ($this->viewLeadAgentPermission == 'both') {
                    $this->leadAgents = $this->leadAgents->where('added_by', user()->id)->orWhere('user_id', user()->id);
                }
                else {
                    // This is $this->viewLeadAgentPermission == 'none'
                    $this->leadAgents = [];
                }
            })->get();

        }

        return $dataTable->render('leads.index', $this->data);

    }
//lead single page
    public function show($id)
    {
        $this->lead = Lead::with(['leadAgent', 'leadAgent.user', 'leadStatus'])->findOrFail($id)->withCustomFields();

        $leadAgentId = ($this->lead->leadAgent != null) ? $this->lead->leadAgent->user->id : 0;

        $this->viewPermission = user()->permission('view_lead');

        abort_403(!(
            $this->viewPermission == 'all'
            || ($this->viewPermission == 'added' && $this->lead->added_by == user()->id)
            || ($this->viewPermission == 'owned' && $this->lead->leadAgent->user->id == user()->id)
            || ($this->viewPermission == 'both' && ($this->lead->added_by == user()->id || $leadAgentId == user()->id))
        ));

        $this->pageTitle = ucfirst($this->lead->client_name);

        $this->categories = LeadCategory::all();

        $this->leadFormFields = LeadCustomForm::with('customField')->where('status', 'active')->where('custom_fields_id', '!=', 'null')->get();

        $this->leadId = $id;

        if (!empty($this->lead->getCustomFieldGroupsWithFields())) {
            $this->fields = $this->lead->getCustomFieldGroupsWithFields()->fields;
        }

        $this->view = 'leads.ajax.profile';

        $tab = request('tab');

        switch ($tab) {
        case 'files':
            $this->view = 'leads.ajax.files';
                break;
        case 'follow-up':
            $this->view = 'leads.ajax.follow-up';
                break;
        case 'proposals':
                return $this->proposals();
        case 'notes':
            return $this->notes();
        case 'gdpr':

            $this->consents = PurposeConsent::with(['lead' => function ($query) use ($id) {
                $query->where('lead_id', $id)
                    ->orderBy('created_at', 'desc');
            }])->get();

            $this->gdpr = GdprSetting::first();

                return $this->gdpr();
        default:
            $this->view = 'leads.ajax.profile';
                break;
        }

        if (request()->ajax()) {
            $html = view($this->view, $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->activeTab = ($tab == '') ? 'profile' : $tab;
        return view('leads.show', $this->data);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $this->addPermission = user()->permission('add_lead');
        abort_403(!in_array($this->addPermission, ['all', 'added']));

        $defaultStatus = LeadStatus::where('default', '1')->first();
        $this->columnId = ((request('column_id') != '') ? request('column_id') : $defaultStatus->id);
        $this->leadAgents = LeadAgent::with('user')->whereHas('user', function ($q) {
            $q->where('status', 'active');
        })->get();

        $lead = new Lead();

        if (!empty($lead->getCustomFieldGroupsWithFields())) {
            $this->fields = $lead->getCustomFieldGroupsWithFields()->fields;
        }

        $this->sources = LeadSource::all();
        $this->status = LeadStatus::all();
        $this->categories = LeadCategory::all();
        $this->countries = countries();
        $this->pageTitle = __('modules.lead.createTitle');
        $this->salutations = ['mr', 'mrs', 'miss', 'dr', 'sir', 'madam'];

        if (request()->ajax()) {
            $html = view('leads.ajax.create', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'leads.ajax.create';
        return view('leads.create', $this->data);

    }
    public function storeLead(Request $request)
    {
      //  dd($request->all());
    if ($request->project_type !='hourly'){
        $validator = Validator::make($request->all(), [
            'project_id' => 'required|unique:leads,project_id,'.$request->project_id.'|numeric',
        ], [
            'project_id.required' => 'The project id has already been taken!',
        ]);
    }else{
        $validator = Validator::make($request->all(), [
            'project_id'=>'required|unique:leads,project_id,'.$request->project_id,
        ], [
            'project_id.required' => 'The project id has already been taken!',
        ]);
    }
    if ($validator->fails()) {
        return response()->json(['status'=>400,'message'=> $validator]);
    }

        if (Auth::user()->role_id == 7) {

            $sales_ex= SalesCount::where('user_id',Auth::id())->first();
            $sales_count= SalesCount::find($sales_ex->id);

            $sales_count->leads_count= $sales_count->leads_count + 1;
            if ($sales_count->last_lead_date != null) {
                $sales_count->previous_lead_date= $sales_count->last_lead_date;
                $date= Carbon::now();
                $date1 = new DateTime($sales_count->previous_lead_date);
                $date2 = new DateTime($date);
                $difference = $date1->diff($date2);
                //$diffInSeconds = $difference->s; //45
                $diffInMinutes = $difference->i; //23
                //  dd($diffInMinutes);
                $sales_count->avg_lead_time=$diffInMinutes/$sales_count->leads_count;

            }
            $currency= Currency::where('id',$request->original_currency_id)->first();
            $val= ($request->value)/$currency->exchange_rate;
            $sales_count->last_lead_date= Carbon::now();
            $sales_count->lead_value= $sales_count->lead_value + $val;
            $sales_count->save();

        }
        //dd(Auth::id());
        //dd($request);
        $lead = new Lead();
        $lead->client_name= $request->client_name;

        $lead->project_id= $request->project_id;
        $lead->project_link= $request->project_link;
        $lead->actual_value= $request->value;
        $lead->deadline= $request->deadline;
        $currency= Currency::where('id',$request->original_currency_id)->first();
        $lead->value= ($request->value)/$currency->exchange_rate;
        $lead->original_currency_id =$request->original_currency_id;
        $lead->bid_value= $request->bid_value;
        $lead->bid_value2= $request->bid_value2;
        $lead->country= $request->country;
        $lead->project_type= $request->project_type;
        $lead->note= $request->description;
        $lead->status_id= 1;
        $lead->currency_id= 1;
        $lead->bidding_minutes= $request->bidding_minutes;
        $lead->bidding_seconds= $request->bidding_seconds;
        $lead->cover_letter= $request->cover_letter;
         $lead->explanation= $request->explanation;
        $lead->insight_screenshot= $request->insight_screenshot;
        $lead->bidpage_screenshot= $request->bidpage_screenshot;
        $lead->projectpage_screenshot =$request->projectpage_screenshot;

        $lead->save();
        $lead_agent= new LeadAgent();
        $lead_agent->user_id= Auth::id();
        $lead_agent->status= "enabled";
        $lead_agent->added_by= Auth::id();
        $lead_agent->last_updated_by= Auth::id();
        $lead_agent->save();

        //$user = Auth::user();
        //$text = $user->getRole->name.' '.$user->name.' created the lead ('.$lead->client_name.')';
        //$link = '<a href="'.route('leads.show', $lead->id).'">'.$text.'</a>';
        //$this->logProjectActivity($project->id, $link);

        if ($request->get('custom_fields_data')) {
            $lead->updateCustomFieldData($request->get('custom_fields_data'));
        }
        return response()->json([
            'success'=>'Lead Add Successfully'
        ],200);
    }
    public function updateLead(Request $request)
    {
//        dd($request->all());
        $request->validate([
            'project_id'=>'required|unique:leads,project_id,'.$request->project_id,
            'description' => 'required',
            'cover_letter' => 'required',
        ], [
            'description.required' => 'Copy the project description from Freelancer.com and paste it here!',
            'cover_letter.required' => 'Copy the cover letter you submitted when placing the bid and paste it here. Do not forget to format it (If needed)!',
        ]);
      $lead = Lead::find($request->id);
      $originalValues = $lead->getOriginal();
      $lead->client_name= $request->client_name;
      $lead->deadline= $request->deadline;

      $lead->project_id= $request->project_id;
      $lead->project_link= $request->project_link;
      //$lead->value= $request->value;
      $lead->actual_value= $request->value;
      $currency= Currency::where('id',$request->original_currency_id)->first();
      //dd($currency);
      $lead->value= ($request->value)/$currency->exchange_rate;
      $lead->original_currency_id =$request->original_currency_id;
      $lead->bid_value= $request->bid_value;
      $lead->bid_value2= $request->bid_value2;
      $lead->country= $request->country;
      $lead->project_type= $request->project_type;
      $lead->note= $request->description;
      $lead->cover_letter= $request->cover_letter;
      $lead->status_id= $request->status;
      $lead->currency_id= 1;
      $lead->bidding_minutes= $request->bidding_minutes;
      $lead->bidding_seconds= $request->bidding_seconds;
      //$lead->cover_letter= $request->cover_letter;
      $lead->insight_screenshot= $request->insight_screenshot;
      $lead-> bidpage_screenshot= $request-> bidpage_screenshot;
      $lead->projectpage_screenshot =$request->projectpage_screenshot;
    //  $lead->agent_id =Auth::id();
      $lead->save();
      foreach ($originalValues as $attribute => $originalValue) {
        $updatedValue = $lead->$attribute;

        if ($originalValue != $updatedValue) {
            $activity = new LeadActivity();
            $activity->lead_id = $lead->id;
            $activity->attribute = $attribute;
            $activity->old_value = $originalValue;
            $activity->new_value = $updatedValue;
            $activity->user_id = Auth::id();
            $activity->save();
        }
    }
      return redirect('/account/leads/')->with('messages.LeadAddedUpdate');



    }
    public function DealStage($id)
    {
      abort_403(user()->permission('view_contract') == 'none');

      if (!request()->ajax()) {
          if (in_array('client', user_roles())) {
              $this->clients = User::client();
          }
          else {
              $this->clients = User::allClients();
          }

          $this->contractTypes = ContractType::all();
          $this->contractCounts = Contract::count();
          $this->expiredCounts = Contract::where(DB::raw('DATE(`end_date`)'), '<', now()->format('Y-m-d'))->count();
          $this->aboutToExpireCounts = Contract::where(DB::raw('DATE(`end_date`)'), '>', now()->format('Y-m-d'))
              ->where(DB::raw('DATE(`end_date`)'), '<', now()->timezone($this->global->timezone)->addDays(7)->format('Y-m-d'))
              ->count();

      }
      $lead= Lead::where('id',$id)->first();
      $chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      $suffle = substr(str_shuffle($chars), 0, 6);
      $deal= new DealStage();
      $deal->short_code= 'DSEOP1'. $suffle;
      $deal->lead_id= $lead->id;
      $deal->status= 1;
      $deal->save();
      $lead= Lead::find($lead->id);
      $lead->deal_status=1;
      $lead->save();

      $deal= DealStage::where('id',$deal->id)->first();

      return back();
    }
    public function DealStageView($id)
    {
      abort_403(user()->permission('view_contract') == 'none');

      if (!request()->ajax()) {
          if (in_array('client', user_roles())) {
              $this->clients = User::client();
          }
          else {
              $this->clients = User::allClients();
          }

          $this->contractTypes = ContractType::all();
          $this->contractCounts = Contract::count();
          $this->expiredCounts = Contract::where(DB::raw('DATE(`end_date`)'), '<', now()->format('Y-m-d'))->count();
          $this->aboutToExpireCounts = Contract::where(DB::raw('DATE(`end_date`)'), '>', now()->format('Y-m-d'))
              ->where(DB::raw('DATE(`end_date`)'), '<', now()->timezone($this->global->timezone)->addDays(7)->format('Y-m-d'))
              ->count();

      }

      $deal= DealStage::where('lead_id',$id)->first();
        $lead= Lead::where('id',$id)->first();

        return view('contracts.dealstage',$this->data,compact('deal','lead'));
    }

    /**
     * @param StoreRequest $request
     * @return array|void
     * @throws \Froiden\RestAPI\Exceptions\RelatedResourceNotFoundException
     */
    /*public function store(StoreRequest $request)
    {
      //dd($request);
        $this->addPermission = user()->permission('add_lead');

        abort_403(!in_array($this->addPermission, ['all', 'added']));

        $lead = new Lead();
        $lead_notes = new LeadNote();
        $lead->company_name = $request->company_name;
        $lead->website = $request->website;
        $lead->address = $request->address;
        $lead->cell = $request->cell;
        $lead->office = $request->office;
        $lead->city = $request->city;
        $lead->state = $request->state;
        $lead->country = $request->country;
        $lead->postal_code = $request->postal_code;
        $lead->salutation = $request->salutation;
        $lead->client_name = $request->client_name;
        $lead->client_email = $request->client_email;
        $lead->mobile = $request->mobile;


        $lead->note = str_replace('<p><br></p>', '', trim($request->note));
        $lead->next_follow_up = $request->next_follow_up;
        $lead->agent_id = $request->agent_id;
        $lead->source_id = $request->source_id;
        $lead->category_id = $request->category_id;
        $lead->status_id = $request->status;
        $lead->value = ($request->value) ? $request->value : 0;
        $lead->currency_id = $this->global->currency->id;
        $lead->save();

        $lead_id = $lead->latest()->first()->id;


        $note_detail = str_replace('<p><br></p>', '', trim($request->note));

        if($note_detail != '') {
            $lead_notes->lead_id = $lead_id;
            $lead_notes->title = 'Note';
            $lead_notes->details = $note_detail;
            $lead_notes->save();
        }



        // To add custom fields data
        if ($request->get('custom_fields_data')) {
            $lead->updateCustomFieldData($request->get('custom_fields_data'));
        }

        // Log search
        $this->logSearchEntry($lead->id, $lead->client_name, 'leads.show', 'lead');

        if ($lead->client_email) {
            $this->logSearchEntry($lead->id, $lead->client_email, 'leads.show', 'lead');
        }

        if (!is_null($lead->company_name)) {
            $this->logSearchEntry($lead->id, $lead->company_name, 'leads.show', 'lead');
        }

        $redirectUrl = urldecode($request->redirect_url);

        if ($redirectUrl == '') {
            $redirectUrl = route('leads.index');
        }

        return Reply::successWithData(__('messages.LeadAddedUpdated'), ['redirectUrl' => $redirectUrl]);

    }*/

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $this->lead = Lead::with('currency', 'leadAgent', 'leadAgent.user')->findOrFail($id)->withCustomFields();
        $this->editPermission = user()->permission('edit_lead');

        abort_403(!($this->editPermission == 'all'
            || ($this->editPermission == 'added' && $this->lead->added_by == user()->id)
            || ($this->editPermission == 'owned' && !is_null( $this->lead->agent_id) && user()->id == $this->lead->leadAgent->user->id)
            || ($this->editPermission == 'both' && ((!is_null( $this->lead->agent_id) && user()->id == $this->lead->leadAgent->user->id)
            || user()->id == $this->lead->added_by)
        )));

        $this->leadAgents = LeadAgent::with('user')->whereHas('user', function ($q) {
            $q->where('status', 'active');
        })->get();

        if (!empty($this->lead->getCustomFieldGroupsWithFields())) {
            $this->fields = $this->lead->getCustomFieldGroupsWithFields()->fields;
        }

        $this->sources = LeadSource::all();
        $this->status = LeadStatus::all();
        $this->categories = LeadCategory::all();
        $this->countries = countries();
        $this->pageTitle = __('modules.lead.updateTitle');
        $this->salutations = ['mr', 'mrs', 'miss', 'dr', 'sir', 'madam'];

        if (request()->ajax()) {
            $html = view('leads.ajax.edit', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'leads.ajax.edit';
        return view('leads.create', $this->data);

    }

    /**
     * @param UpdateRequest $request
     * @param int $id
     * @return array|void
     * @throws \Froiden\RestAPI\Exceptions\RelatedResourceNotFoundException
     */
    public function update(UpdateRequest $request, $id)
    {
        $lead = Lead::with('leadAgent', 'leadAgent.user')->findOrFail($id);
        $this->editPermission = user()->permission('edit_lead');

        abort_403(!($this->editPermission == 'all'
            || ($this->editPermission == 'added' && $lead->added_by == user()->id)
            || ($this->editPermission == 'owned' && !is_null( $lead->agent_id) && user()->id == $lead->leadAgent->user->id)
            || ($this->editPermission == 'both' && ((!is_null($lead->agent_id) && user()->id == $lead->leadAgent->user->id)
            || user()->id == $lead->added_by)
        )));

        $lead->company_name = $request->company_name;
        $lead->website = $request->website;
        $lead->address = $request->address;
        $lead->salutation = $request->salutation;
        $lead->client_name = $request->client_name;
        $lead->client_email = $request->client_email;
        $lead->mobile = $request->mobile;
        $lead->agent_id = $request->agent_id;
        $lead->source_id = $request->source_id;
        $lead->next_follow_up = $request->next_follow_up;
        $lead->status_id = $request->status;
        $lead->category_id = $request->category_id;
        $lead->value = $request->value;
        $lead->note = str_replace('<p><br></p>', '', trim($request->note));
        $lead->currency_id = $this->global->currency->id;
        $lead->cell = $request->cell;
        $lead->office = $request->office;
        $lead->city = $request->city;
        $lead->state = $request->state;
        $lead->country = $request->country;
        $lead->postal_code = $request->postal_code;
        $lead->bidding_minutes= $request->bidding_minutes;
        $lead->bidding_seconds= $request->bidding_seconds;
        $lead->cover_letter= $request->cover_letter;
        $lead->insight_screenshot= $request->insight_screenshot;
        $lead-> bidpage_screenshot= $request-> bidpage_screenshot;
        $lead->projectpage_screenshot =$request->projectpage_screenshot;
        $lead->save();

        // To add custom fields data
        if ($request->get('custom_fields_data')) {
            $lead->updateCustomFieldData($request->get('custom_fields_data'));
        }

        return Reply::successWithData(__('messages.LeadUpdated'), ['redirectUrl' => route('leads.index')]);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $lead = Lead::with('leadAgent', 'leadAgent.user')->findOrFail($id);
        $this->deletePermission = user()->permission('delete_lead');

        abort_403(!($this->deletePermission == 'all'
            || ($this->deletePermission == 'added' && $lead->added_by == user()->id)
            || ($this->deletePermission == 'owned' && !is_null( $lead->agent_id) && user()->id == $lead->leadAgent->user->id)
            || ($this->deletePermission == 'both' && ((!is_null($lead->agent_id) && user()->id == $lead->leadAgent->user->id)
            || user()->id == $lead->added_by)
        )));

        Lead::destroy($id);
        return Reply::success(__('messages.LeadDeleted'));

    }

    /**
     * @param CommonRequest $request
     * @return array
     */
    public function changeStatus(CommonRequest $request)
    {
        $lead = Lead::findOrFail($request->leadID);
        $this->editPermission = user()->permission('edit_lead');

        abort_403(!($this->editPermission == 'all' || ($this->editPermission == 'added' && $lead->added_by == user()->id)));

        $lead->status_id = $request->statusID;
        $lead->save();

        return Reply::success(__('messages.leadStatusChangeSuccess'));
    }

    public function applyQuickAction(Request $request)
    {
        switch ($request->action_type) {
        case 'delete':
            $this->deleteRecords($request);
                return Reply::success(__('messages.deleteSuccess'));
        case 'change-status':
            $this->changeBulkStatus($request);
                return Reply::success(__('messages.statusUpdatedSuccessfully'));
        default:
                return Reply::error(__('messages.selectAction'));
        }
    }

    protected function deleteRecords($request)
    {
        abort_403(user()->permission('delete_lead') != 'all');

        Lead::whereIn('id', explode(',', $request->row_ids))->delete();
    }

    protected function changeBulkStatus($request)
    {
        abort_403(user()->permission('edit_lead') != 'all');

        Lead::whereIn('id', explode(',', $request->row_ids))->update(['status_id' => $request->status]);
    }

    /**
     *
     * @param int $leadID
     * @return void
     */
    public function followUpCreate($leadID)
    {
        $this->addPermission = user()->permission('add_lead_follow_up');

        abort_403(!in_array($this->addPermission, ['all', 'added']));

        $this->leadID = $leadID;
        $this->lead = Lead::findOrFail($leadID);
        return view('leads.followup.create', $this->data);

    }

    /**
     * @param FollowUpStoreRequest $request
     * @return array|void
     * @throws \Froiden\RestAPI\Exceptions\RelatedResourceNotFoundException
     */
    public function followUpStore(FollowUpStoreRequest $request)
    {
        $this->lead = Lead::findOrFail($request->lead_id);

        $this->addPermission = user()->permission('add_lead_follow_up');

        abort_403(!in_array($this->addPermission, ['all', 'added']));

        if ($this->lead->next_follow_up != 'yes') {
            return Reply::error(__('messages.leadFollowUpRestricted'));
        }

        $followUp = new LeadFollowUp();
        $followUp->lead_id = $request->lead_id;

        $followUp->next_follow_up_date = Carbon::createFromFormat($this->global->date_format . ' ' . $this->global->time_format, $request->next_follow_up_date . ' ' . $request->start_time)->format('Y-m-d H:i:s');

        $followUp->remark = $request->remark;

        $followUp->send_reminder = $request->send_reminder;
        $followUp->remind_time = $request->remind_time;
        $followUp->remind_type = $request->remind_type;

        $followUp->save();

        return Reply::success(__('messages.leadFollowUpAddedSuccess'));

    }

    public function editFollow($id)
    {
        $this->follow = LeadFollowUp::findOrFail($id);
        $this->editPermission = user()->permission('edit_lead_follow_up');
        abort_403(!($this->editPermission == 'all' || ($this->editPermission == 'added' && $this->follow->added_by == user()->id)));

        return view('leads.followup.edit', $this->data);
    }

    public function updateFollow(FollowUpStoreRequest $request)
    {
        $this->lead = Lead::findOrFail($request->lead_id);

        $followUp = LeadFollowUp::findOrFail($request->id);
        $this->editPermission = user()->permission('edit_lead_follow_up');

        abort_403(!($this->editPermission == 'all'
        || ($this->editPermission == 'added' && $followUp->added_by == user()->id)
        ));

        if ($this->lead->next_follow_up != 'yes') {
            return Reply::error(__('messages.leadFollowUpRestricted'));
        }


        $followUp->lead_id = $request->lead_id;

        $followUp->next_follow_up_date = Carbon::createFromFormat($this->global->date_format . ' ' . $this->global->time_format, $request->next_follow_up_date . ' ' . $request->start_time)->format('Y-m-d H:i:s');

        $followUp->remark = $request->remark;
        $followUp->send_reminder = $request->send_reminder;
        $followUp->remind_time = $request->remind_time;
        $followUp->remind_type = $request->remind_type;

        $followUp->save();

        return Reply::success(__('messages.leadFollowUpUpdatedSuccess'));

    }

    public function deleteFollow($id)
    {
        $followUp = LeadFollowUp::findOrFail($id);
        $this->deletePermission = user()->permission('delete_lead_follow_up');
        abort_403(!($this->deletePermission == 'all' || ($this->deletePermission == 'added' && $followUp->added_by == user()->id)));

        LeadFollowUp::destroy($id);

        return Reply::success(__('messages.deleteSuccess'));
    }

    public function proposals()
    {
        $viewPermission = user()->permission('view_lead_proposals');

        abort_403(!in_array($viewPermission, ['all', 'added']));

        $tab = request('tab');
        $this->activeTab = ($tab == '') ? 'overview' : $tab;
        $this->view = 'leads.ajax.proposal';
        $dataTable = new ProposalDataTable();

        return $dataTable->render('leads.show', $this->data);
    }

    public function gdpr()
    {
        $dataTable = new LeadGDPRDataTable();
        $tab = request('tab');
        $this->activeTab = ($tab == '') ? 'gdpr' : $tab;
        $this->view = 'leads.ajax.gdpr';
        return $dataTable->render('leads.show', $this->data);
    }

    public function consent(Request $request)
    {
        $leadId = $request->leadId;
        $this->consentId = $request->consentId;
        $this->leadId = $leadId;

        $this->consent = PurposeConsent::with(['lead' => function ($query) use ($request) {
            $query->where('lead_id', $request->leadId)
                ->orderBy('created_at', 'desc');
        }])
            ->where('id', $request->consentId)
            ->first();

        return view('leads.gdpr.consent-form', $this->data);
    }

    public function saveLeadConsent(Request $request, $id)
    {
        $lead = Lead::findOrFail($id);
        $consent = PurposeConsent::findOrFail($request->consent_id);

        if ($request->consent_description && $request->consent_description != '') {
            $consent->description = str_replace('<p><br></p>', '', trim($request->consent_description));
            $consent->save();
        }

        // Saving Consent Data
        $newConsentLead = new PurposeConsentLead();
        $newConsentLead->lead_id = $lead->id;
        $newConsentLead->purpose_consent_id = $consent->id;
        $newConsentLead->status = trim($request->status);
        $newConsentLead->ip = $request->ip();
        $newConsentLead->updated_by_id = $this->user->id;
        $newConsentLead->additional_description = $request->additional_description;
        $newConsentLead->save();

        return $request->status == 'agree' ? Reply::success(__('messages.consentOptIn')) : Reply::success(__('messages.consentOptOut'));
    }

    public function importLead()
    {
        $this->pageTitle = __('app.importExcel') . ' ' . __('app.menu.lead');

        $this->addPermission = user()->permission('add_lead');
        abort_403(!in_array($this->addPermission, ['all', 'added']));


        if (request()->ajax()) {
            $html = view('leads.ajax.import', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'leads.ajax.import';

        return view('leads.create', $this->data);
    }

    public function importStore(ImportRequest $request)
    {
        $this->file = Files::upload($request->import_file, 'import-files', false, false, false);
        $excelData = Excel::toArray(new LeadImport, public_path(Files::UPLOAD_FOLDER . '/import-files/' . $this->file))[0];
        $this->hasHeading = $request->has('heading');
        $this->heading = array();
        $this->fileHeading = array();

        $this->columns = LeadImport::fields();
        $this->importMatchedColumns = array();
        $this->matchedColumns = array();

        if ($this->hasHeading) {
            $this->heading = (new HeadingRowImport)->toArray(public_path(Files::UPLOAD_FOLDER. '/import-files/' . $this->file))[0][0];

            // Excel Format None for get Heading Row Without Format and after change back to config
            HeadingRowFormatter::default('none');
            $this->fileHeading = (new HeadingRowImport)->toArray(public_path(Files::UPLOAD_FOLDER.'/import-files/' . $this->file))[0][0];
            HeadingRowFormatter::default(config('excel.imports.heading_row.formatter'));

            array_shift($excelData);
            $this->matchedColumns = collect($this->columns)->whereIn('id', $this->heading)->pluck('id');
            $importMatchedColumns = array();

            foreach ($this->matchedColumns as $matchedColumn) {
                $importMatchedColumns[$matchedColumn] = 1;
            }

            $this->importMatchedColumns = $importMatchedColumns;
        }

        $this->importSample = array_slice($excelData, 0, 5);

        $view = view('leads.ajax.import_progress', $this->data)->render();

        return Reply::successWithData(__('messages.importUploadSuccess'), ['view' => $view]);
    }

    public function importProcess(ImportProcessRequest $request)
    {
        // clear previous import
        Artisan::call('queue:clear database --queue=import_lead');
        Artisan::call('queue:flush');
        // Get index of an array not null value with key
        $columns = array_filter($request->columns, function ($value) {
            return $value !== null;
        });

        $excelData = Excel::toArray(new LeadImport, public_path(Files::UPLOAD_FOLDER . '/import-files/' . $request->file))[0];

        if ($request->has_heading) {
            array_shift($excelData);
        }

        $jobs = [];

        foreach ($excelData as $row) {

            $jobs[] = (new ImportLeadJob($row, $columns));
        }

        $batch = Bus::batch($jobs)->onConnection('database')->onQueue('import_lead')->name('import_lead')->dispatch();

        Files::deleteFile($request->file, 'import-files');

        return Reply::successWithData(__('messages.importProcessStart'), ['batch' => $batch]);
    }

    public function notes()
    {
        $dataTable = new LeadNotesDataTable();
        $viewPermission = user()->permission('view_lead');

        abort_403 (!($viewPermission == 'all' || $viewPermission == 'added' || $viewPermission == 'both'));
        $tab = request('tab');
        ($tab == '') ? $this->activeTab = 'profile' : $this->activeTab = $tab;
        $this->view = 'leads.ajax.notes';
        return $dataTable->render('leads.show', $this->data);
    }

    public function getLead(Request $request)
    {
        $startDate = $request->start_date ?? null;
        $endDate = $request->end_date ?? null;
        $convert_status = $request->convert_status;
        $limit = $request->limit ??  10;

        $leadsQuery = Lead::select(
            'leads.id',
            'leads.added_by',
            'leads.client_id',
            'leads.category_id',
            'client_name',
            'actual_value',
            'bidding_minutes',
            'bidding_seconds',
            'bid_value',
            'bid_value2',
            'project_link',
            'project_id',
            'company_name',
            'lead_status.type as statusName',
            'lead_status.label_color as lead_status_label_color',
            'status_id',
            'deal_status',
            'currency_id',
            'original_currency_id',
            'leads.created_at as lead_created_at',
            'users.name as agent_name',
            'users.image',
            'currencies.currency_symbol as currency_symbol',
        )
            ->leftJoin('lead_status', 'lead_status.id', 'leads.status_id')
            ->leftJoin('users', 'users.id', 'leads.added_by')
            ->leftJoin('currencies', 'currencies.id', 'leads.currency_id')
            ->where('leads.status', '!=', 'DM');

            if ($startDate !== null && $endDate !== null) {
                $leadsQuery->where(function ($query) use ($startDate, $endDate) {
                    $query->whereBetween(DB::raw('DATE(leads.`created_at`)'), [$startDate, $endDate]);
                    $query->orWhereBetween(DB::raw('DATE(leads.`updated_at`)'), [$startDate, $endDate]);
                });
            }
            if ($request->search != '') {
                $leadsQuery->where(function ($query) {
                    $query->where('leads.client_name', 'like', '%' . request('search') . '%')
                    ->orWhere('leads.company_name', 'like', '%' . request('search') . '%')
    
                    ->orWhere('leads.project_link', 'like', '%' . request('search') . '%')
                    ->orWhere('leads.project_id', 'like', '%' . request('search') . '%')
                    ->orWhere('leads.actual_value', 'like', '%' . request('search') . '%')
                    ->orWhere('users.name', 'like', '%' . request('search') . '%');
                });
            }
            if ($request->sales_executive_id != '') {
                $leadsQuery->where('leads.added_by',$request->sales_executive_id);
            }
            if ($convert_status != '') {
                $leadsQuery->where('leads.deal_status',$convert_status);
            }

            $leads = $leadsQuery
                ->orderBy('leads.id', 'desc')
                ->paginate($limit);

        $dealStages = DealStage::whereIn('lead_id', $leads->pluck('id'))->get();

        foreach ($leads as $lead) {
            $wonLost = 0;
            $leadDealStages = $dealStages->where('lead_id', $lead->id);

            if ($leadDealStages->isNotEmpty()) {
                $latestDealStage = $leadDealStages->sortByDesc('created_at')->first();

                if ($latestDealStage->deal_status == 'pending' && $latestDealStage->won_lost == 'Yes') {
                    $wonLost = 1;
                } elseif ($latestDealStage->deal_status == 'Lost') {
                    $wonLost = 2;
                } elseif ($latestDealStage->deal_status == 'pending' && ($latestDealStage->won_lost == 'No' || $latestDealStage->won_lost == null)) {
                    $wonLost = 3;
                }
            }

            $lead->won_lost = $wonLost;
        }


        return response()->json([
            'data' => $leads,
            'status' => 200
        ]);
    }


    public function exportLead(Request $request)
    {
        $startDate = $request->start_date ?? null;
        $endDate = $request->end_date ?? null;
        $convert_status = $request->convert_status;

        $leadsQuery = Lead::select(
            'leads.id',
            'leads.added_by',
            'leads.client_id',
            'leads.category_id',
            'client_name',
            'actual_value',
            'bidding_minutes',
            'bidding_seconds',
            'bid_value',
            'bid_value2',
            'project_link',
            'project_id',
            'company_name',
            'lead_status.type as statusName',
            'lead_status.label_color as lead_status_label_color',
            'status_id',
            'deal_status',
            'currency_id',
            'original_currency_id',
            'leads.created_at as lead_created_at',
            'users.name as agent_name',
            'users.image',
            'currencies.currency_symbol as currency_symbol',
        )
            ->leftJoin('lead_status', 'lead_status.id', 'leads.status_id')
            ->leftJoin('users', 'users.id', 'leads.added_by')
            ->leftJoin('currencies', 'currencies.id', 'leads.currency_id')
            ->where('leads.status', '!=', 'DM');

            if ($startDate !== null && $endDate !== null) {
                $leadsQuery->where(function ($query) use ($startDate, $endDate) {
                    $query->whereBetween(DB::raw('DATE(leads.`created_at`)'), [$startDate, $endDate]);
                    $query->orWhereBetween(DB::raw('DATE(leads.`updated_at`)'), [$startDate, $endDate]);
                });
            }
            if ($request->sales_executive_id != '') {
                $leadsQuery->where('leads.added_by',$request->sales_executive_id);
            }
            if ($convert_status != '') {
                $leadsQuery->where('leads.deal_status',$convert_status);
            }

            $leads = $leadsQuery
                ->orderBy('leads.id', 'desc')
                ->get();

                $dealStages = DealStage::whereIn('lead_id', $leads->pluck('id'))->get();

            foreach ($leads as $lead) {
                $wonLost = 0;
                $leadDealStages = $dealStages->where('lead_id', $lead->id);

                if ($leadDealStages->isNotEmpty()) {
                    $latestDealStage = $leadDealStages->sortByDesc('created_at')->first();

                    if ($latestDealStage->deal_status == 'pending' && $latestDealStage->won_lost == 'Yes') {
                        $wonLost = 1;
                    } elseif ($latestDealStage->deal_status == 'Lost') {
                        $wonLost = 2;
                    } elseif ($latestDealStage->deal_status == 'pending' && ($latestDealStage->won_lost == 'No' || $latestDealStage->won_lost == null)) {
                        $wonLost = 3;
                    }
                }

                $lead->won_lost = $wonLost;
            }

        return response()->json([
            'data' => $leads,
            'status' => 200
        ]);
    }

}


/** 
 * $won_lost = 0 =>Not Applicable
 * $won_lost = 1 =>Won
 * $won_lost = 2 =>Lost
 * $won_lost = 3 =>No Activity Yet
 */