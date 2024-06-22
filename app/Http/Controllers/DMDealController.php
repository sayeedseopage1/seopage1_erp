<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\DataTables\DMDealsDatatable;
use App\Models\Deal;
use App\Models\DealStage;
use App\Models\SalesCount;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Models\Currency;
use App\Models\Lead;
use Auth;
use App\Models\Country;
use App\Models\RoleUser;
use App\Models\ClientDetails;
use App\Models\ClientForm;
use App\Models\Contract;
use App\Models\PMAssign;
use App\Models\PMProject;
use App\Models\Project;
use App\Models\LeadsDealsActivityLog;
use Illuminate\Support\Facades\Validator;
use App\Helper\Reply;
use App\Models\DealStageChange;

class DMDealController extends AccountBaseController
{
    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'Deals';
        $this->middleware(function ($request, $next) {
            abort_403(!in_array('contracts', $this->user->modules));
            return $next($request);
        });
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(DMDealsDatatable $dataTable)
    {
        
        if (!request()->ajax()) {
            if (in_array('client', user_roles())) {
                $this->clients = User::client();
            } else {
                $this->clients = User::allClients();
            }

        }

        return $dataTable->render('dm-deals.index', $this->data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $this->addPermission = user()->permission('add_contract');

        abort_403(!in_array($this->addPermission, ['all', 'added']));

        $this->contractId = request('id');
        $this->deal = null;

        if ($this->contractId != '') {
            $this->deal = DealStage::findOrFail($this->contractId);
        }


        $this->currencies = Currency::all();

        if (request()->ajax()) {
            $this->pageTitle = __('') . ' ' . __('Create Deal');
            $html = view('dm-deals.ajax.create', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'dm-deals.ajax.create';
        return view('dm-deals.create', $this->data);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
    //            dd($request->all());
                $request->validate([
                    'client_name' => 'required',
                    'client_username' => 'required',
                    'project_name' => 'required',
                    'project_link' => 'required|url',
                    'project_type' => 'required',
                    'amount' => 'required',
                    'description' => 'required',
                    'comments' => 'required',
                ]);
                $existing_client= User::where('user_name',$request->user_name)->first();
                $chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                $suffle = substr(str_shuffle($chars), 0, 6);
                $deal = new DealStage();
                $deal->client_name= $request->client_name;
                $deal->short_code = 'DSEOP1' . $suffle;

                $deal->client_username= $request->client_username;
                $deal->deal_stage= 0;
                $deal->project_name = $request->project_name;
                $deal->project_link = $request->project_link;
                $deal->currency_id= 1;
                $deal->original_currency_id= $request->original_currency_id;
                $deal->project_type= $request->project_type;
                $deal->actual_amount=  $request->amount;
                $currency= Currency::where('id',$request->original_currency_id)->first();
                //dd($currency);
                $deal->amount = ($request->amount)/$currency->exchange_rate;
                $deal->description= $request->description;
                $deal->convert_ld_status= 'DM';
                $deal->added_by= Auth::id();
                $deal->converted_by= Auth::id();
                if($existing_client != null)
                {
                    $deal->client_badge = 'existing client';

                }else {
                    $deal->client_badge= 'new client';
                }
                $deal->save();

                // GOLE TEST


            //     $goals = GoalSetting::where([
            //         'goal_status' =>  0,
            //     ])->get();
            //     // /dd($goals);

            //     if($goals != null) {


            //     foreach ($goals as $goal) {
            //         $start = Carbon::parse($goal->startDate);
            //         $end = Carbon::parse($goal->endDate);
            //         $dateToCheck = Carbon::parse($deal->created_at);

            //         if ($dateToCheck->between($start, $end)) {

            //             if($goal->team_id != null) {
            //                 $team = Seopage1Team::find($goal->team_id);

            //                 $users = explode(',', $team->members);
            //                 $user_data = [];
            //                 foreach ($users as $key => $value) {
            //                     if ($value != '') {
            //                          //$user = User::find($value);
            //                         array_push($user_data,$value);
            //                     }
            //                 }
            //             } else {
            //                 $user_data[]= $goal->user_id;
            //             }
            //         }
            //         // Always use an array of user IDs, even if $goal->user_id is set
            //         if (isset($goal->user_id) || isset($user_data)) {

            //             $goal2 = $goal->user_id ? [$goal->user_id] : $user_data;


            //             if ($goal->entryType == 'Added') {

            //                 if($goal->dealType == 'New Client'){
            //                     $dealStage = DealStage::select([
            //                         'deal_stages.*',
            //                         'deal_stages.id as id',
            //                         'deal_stages.id as deal_id',
            //                         'deal_stages.client_username as client_username',
            //                         'deal_stages.project_name as deal_project_name',
            //                         'deal_stages.project_link as deal_project_link',
            //                         'deal_stages.amount as deal_amount',
            //                         'deal_stages.deal_stage as deal_stage',
            //                         'deal_stages.deal_status as deal_status',
            //                         'deal_stages.actual_amount as deal_original_amount',
            //                         'deal_stages.created_at as deal_created_at',
            //                         'leads.added_by as lead_converted_by',
            //                         'leads.id as lead_id',
            //                     ])
            //                     ->leftJoin('leads', 'leads.id', '=', 'deal_stages.lead_id')
            //                     ->whereIn('deal_stages.added_by', $goal2)
            //                     ->whereDate('deal_stages.created_at', '>=', $goal->startDate)
            //                     ->where('deal_stages.client_badge','=','new client');

            //                     if (!is_null($goal->endDate)) {
            //                         $dealStage = $dealStage->whereDate('deal_stages.created_at', '<=', $goal->endDate);
            //                     }
            //                     $dealStage_amount2 = $dealStage->get();
            //                     $dealStage_amount = $dealStage->sum('deal_stages.amount');
            //                     $dealStage_count = $dealStage->count();

            //                     if ($goal->trackingType == 'value') {
            //                         $deal_amount = $dealStage_amount;
            //                     } else {
            //                         $deal_amount = $dealStage_count;
            //                     }

            //                     if ($deal_amount >= (int) $goal->trackingValue) {
            //                         $goal_update= GoalSetting::find($goal->id);
            //                         $goal_update->goal_status = 1;
            //                         $goal_update->save();
            //                         if ($goal->achievablePoints > 0) {

            //                             $distribute_amount = $goal->achievablePoints / count($user_data);

            //                             foreach ($user_data as $value) {

            //                                 $user_name = User::find($value);
            //                                 $user_last_point = CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();

            //                                 $point= new CashPoint();
            //                                 $point->user_id= $value;
            //                                 //$point->project_id= $find_project_id->id;
            //                                 $point->activity= $user_name->name . ' For achieving '.$goal->frequency.' Goal '.$goal->title;
            //                                 $point->gained_as = "Individual";
            //                                 $point->points= $distribute_amount;

            //                                 if ($user_last_point != null) {
            //                                     $point->total_points_earn= $user_last_point->total_points_earn + $distribute_amount;
            //                                 } else {
            //                                     $point->total_points_earn=  $distribute_amount;
            //                                 }

            //                                 $point->save();
            //                             }
            //                         }
            //                     }

            //                 } else {
            //                     $dealStage = DealStage::select([
            //                         'deal_stages.*',
            //                         'deal_stages.id as id',
            //                         'deal_stages.id as deal_id',
            //                         'deal_stages.client_username as client_username',
            //                         'deal_stages.project_name as deal_project_name',
            //                         'deal_stages.project_link as deal_project_link',
            //                         'deal_stages.amount as deal_amount',
            //                         'deal_stages.deal_stage as deal_stage',
            //                         'deal_stages.deal_status as deal_status',
            //                         'deal_stages.actual_amount as deal_original_amount',
            //                         'deal_stages.created_at as deal_created_at',
            //                         'leads.added_by as lead_converted_by',
            //                         'leads.id as lead_id',
            //                     ])
            //                     ->leftJoin('leads', 'leads.id', '=', 'deal_stages.lead_id')
            //                     ->whereIn('deal_stages.added_by', $goal2)
            //                     ->whereDate('deal_stages.created_at', '>=', $goal->startDate);
            //                     if (!is_null($goal->endDate)) {
            //                         $dealStage = $dealStage->whereDate('deal_stages.created_at', '<=', $goal->endDate);
            //                     }

            //                     $dealStage_amount = $dealStage->sum('deal_stages.amount');
            //                     $dealStage_count = $dealStage->count();
            //                     if ($goal->trackingType == 'value') {
            //                         $deal_amount = $dealStage_amount;
            //                     } else {
            //                         $deal_amount = $dealStage_count;
            //                     }
            //                     if ($deal_amount >= (int) $goal->trackingValue) {
            //                         $goal_update= GoalSetting::find($goal->id);
            //                         $goal_update->goal_status = 1;
            //                         $goal_update->save();
            //                         if ($goal->achievablePoints > 0) {

            //                             $distribute_amount = $goal->achievablePoints / count($user_data);

            //                             foreach ($user_data as $value) {

            //                                 $user_name = User::find($value);
            //                                 $user_last_point = CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();

            //                                 $point= new CashPoint();
            //                                 $point->user_id= $value;
            //                                 //$point->project_id= $find_project_id->id;
            //                                 $point->activity= $user_name->name . ' For achieving '.$goal->frequency.' Goal '.$goal->title;
            //                                 $point->gained_as = "Individual";
            //                                 $point->points= $distribute_amount;

            //                                 if ($user_last_point != null) {
            //                                     $point->total_points_earn= $user_last_point->total_points_earn + $distribute_amount;
            //                                 } else {
            //                                     $point->total_points_earn=  $distribute_amount;
            //                                 }

            //                                 $point->save();
            //                             }
            //                         }
            //                     }
            //                 }
            //             }
            //         }
            //     }
            // }




                //goal achieve check end here

                $find_user= User::where('user_name', $request->client_username)->first();
                if($find_user == null )
                {
                    $user = new User();
                    $user->name = $request->client_name;
                    $user->user_name = $request->client_username;
                    $user->login= 'disable';
                    $user->email_notifications = 0;
                    $user->save();
                }

                $deal_stage= new DealStageChange();

                $deal_stage->deal_id= $deal->short_code;
                $deal_stage->comments= $request->comments;
                $deal_stage->deal_stage_id=$deal->deal_stage;
                $deal_stage->updated_by= Auth::id();
                $deal_stage->save();


                return response()->json([
                    'status' => 'success',
                    'redirectUrl' => route('digital-marketing-deals.index')
                ]);
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

    public function storeDMLeadDeal(Request $request)
    {
            //    dd($request->all());
        \DB::beginTransaction();
        $current_time = Carbon::now()->format('d-m-Y H:i:s');
        $award_date = strtotime($request->award_time);
        $aw_dt = date('Y-m-d H:i:s', $award_date);

        $validated = $request->validate([
            //            'user_name' => 'required',
            'client_name' => 'required',
            //            'project_name' => 'required',
            'amount' => 'required|min:1',

            // 'current_time' => 'date|date_format:d-m-Y H:i A',
            'award_time' => 'required|date|before:' . $current_time,
        ]);
        //  dd($request);
        $to = Carbon::parse($current_time);
        $from = Carbon::parse($request->award_time);

        $diff_in_minutes = $from->diffInMinutes($to);
        if ($diff_in_minutes > 1200) {
            return response()->json([
                "message" => "The given data was invalid.",
                "errors" => [
                    "award_time" => [
                        "The award time and current time difference should not be more than 20 hours!."
                    ]
                ]
            ], 422);
        }

        $deal_stage = DealStage::where('id', $request->id)->first();

        $deal = DealStage::find($request->id);

        if ($deal_stage->deal_stage == 0) {
            $deal->deal_stage = $deal_stage->deal_stage + 1;
            $deal->comments = $deal_stage->comments;
            $deal->won_lost = 'Yes';
            $deal->save();
        } elseif ($deal_stage->deal_stage == 1) {
            $deal->deal_stage = $deal_stage->deal_stage + 1;
            $deal->comments = $deal_stage->comments;
            $deal->won_lost = 'Yes';
            $deal->save();
        } elseif ($deal_stage->deal_stage == 2) {
            $deal->deal_stage = $deal_stage->deal_stage + 1;
            $deal->comments = $deal_stage->comments;
            $deal->won_lost = 'Yes';
            $deal->save();
        } else {
            $deal->deal_stage = $deal_stage->deal_stage;
            $deal->comments = $deal_stage->comments;
            $deal->won_lost = 'Yes';
            $deal->save();
            //$lead_id = Lead::where('id', $request->lead_id)->first();
            if (Auth::id() != null) {
                $agent = SalesCount::where('user_id', Auth::id())->first();
                if ($agent != null) {
                    $lead_ag = SalesCount::find($agent->id);

                    $lead_ag->negotiation_started = $lead_ag->negotiation_started + 1;
                    $lead_ag->save();
                }
            }
        }

        $message_links = $request->message_link;
        // /dd($message_links);
        $value = '';

        if (is_array($message_links) || is_object($message_links)) {
            foreach ($message_links as $link) {
                //dd($d['day']);
                $value = $value  . $link . ' <br> ';
            }
        }
        $existing_client = User::where('user_name', $request->user_name)->first();
        $chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        $suffle = substr(str_shuffle($chars), 0, 6);
        $deal = new Deal();
        $deal->deal_id = $request->deal_id;
        $deal->project_name = $request->project_name;
        $deal->profile_link = $request->profile_link;
        $deal->message_link = $value;
        $deal->original_currency_id = $request->original_currency_id;
        $deal->currency_id = 1;
        $deal->project_type = $request->project_type;
        $deal->actual_amount =  $request->amount;
        $currency = Currency::where('id', $request->original_currency_id)->first();
        //  dd($currency);
        $deal->amount = ($request->amount) / $currency->exchange_rate;
        $deal->client_name = $request->client_name;
        $deal->client_username = $request->user_name;
        $deal->lead_id = $request->lead_id;
        $deal->dept_status = 'DM';
        $deal->added_by = Auth::id();
        //$date= Carbon::now();

        $date = date('Y-m-d H:i:s');

        $newDate = Carbon::createFromFormat('Y-m-d H:i:s', $date)->format('Y-m-d');

        //dd($newDate);

        $deal->deal_creation_date = $newDate;
        $deal->award_time = $aw_dt;

        $deal->start_date = $newDate;
        if ($existing_client != null) {
            $deal->client_badge = 'existing client';
        } else {
            $deal->client_badge = 'new client';
        }
        $deal->save();
        //$lead_con_id = Lead::where('id', $request->lead_id)->first();
        if (Auth::id() != null) {
            $agent_id = SalesCount::where('user_id', Auth::id())->first();
            if ($agent_id != null) {
                $lead_ag_id = SalesCount::find($agent_id->id);

                $lead_ag_id->won_deals = $lead_ag_id->won_deals + 1;
                $lead_ag_id->deal_value = $lead_ag_id->deal_value + $deal->amount;
                $lead_ag_id->save();
            }
        }


        $lead = Lead::find($request->lead_id);
        if ($lead != null) {
            $lead->status_id = 3;
            $lead->save();
        }

        $user_name = User::where('user_name', $request->user_name)->first();
        if ($user_name == null) {
            if ($lead != null) {
                $country = Country::where('nicename', $lead->country)->first();
            }

            $user = new User();
            $user->name = $request->client_name;
            $user->user_name = $request->user_name;
            $user->login = 'disable';
            $user->email_notifications = 0;
            if ($lead != null) {
                $user->country_id = $country->id;
            }

            $user->save();
            $role = new RoleUser();
            $role->role_id = 3;
            $role->user_id = $user->id;
            $role->save();
            $client = new ClientDetails();
            $client->user_id = $user->id;

            $client->client_username = $request->client_username;
            $client->save();
        } else {
            $user = $existing_client;
        }




        $deal_client = Deal::find($deal->id);
        $deal_client->client_id = $user->id;
        $deal->submission_status= 'Submitted';

        $client_details= ClientForm::where('client_username',$user->user_name)->first();
        // /dd($client_details);
        if ($client_details != null) {
            $deal_client->submission_status = 'Submitted';

            $new_client_form= new ClientForm();
            $new_client_form->deal_id = $deal->id;
            $new_client_form->client_username= $client_details->client_username;
            $new_client_form->client_email= $client_details->client_email;
            $new_client_form->client_phone =$client_details->client_phone;
            $new_client_form->client_whatsapp= $client_details->client_whatsapp;
            $new_client_form->client_skype= $client_details->client_skype;
            $new_client_form->client_telegram= $client_details->client_telegram;
            $new_client_form->client_messenger =$client_details->client_messenger;
            $new_client_form->client_imo= $client_details->client_imo;
            $new_client_form->message= $client_details->message;
            $new_client_form->timezone= $client_details->timezone;
            $new_client_form->day= $client_details->day;
            $new_client_form->checklist= $client_details->checklist;
            $new_client_form->save();
        }
       // dd($new_client_form);
        $deal_client->save();

        $contract = new Contract();
        $contract->id = $deal->id;
        $contract->deal_id = $deal->id;
        $contract->subject = $request->project_name;
        $contract->original_amount = $request->amount;
        //$deal->actual_amount=  $request->amount;
        $currency = Currency::where('id', $request->original_currency_id)->first();
        $contract->actual_amount = $request->amount;
        $contract->amount = ($request->amount) / $currency->exchange_rate;

        $contract->start_date = $newDate;
        $contract->original_start_date = $newDate;
        $contract->client_id = $user->id;
        $contract->currency_id = 1;

        $contract->save();
        $deal_hash = $deal->id;
        //$key= Crypt::encrypt($deal_hash);
        $key = encrypt($deal_hash);

        $deal_hash_store = Deal::find($deal_hash);
        $deal_hash_store->hash = $key;
        $deal_hash_store->save();
        ///have to find project id
        $project = new Project();
        $project->client_id = $user->id;
        $project->project_name = $request->project_name;
        $project->project_short_code = 'PSEOP1' . $suffle;
        $project->start_date = $newDate;
        $project->deliverable_authorization = 0;
        $currency = Currency::where('id', $request->original_currency_id)->first();
        //dd($currency);
        $project->project_budget = ($request->amount) / $currency->exchange_rate;
        $project->due = $deal->amount;

        $project->completion_percent = 0;
        $project->deal_id = $deal->id;
        $project->added_by = Auth::id();
        $project->status = 'not started';
        $project->public = 0;
        $project->save();

        // dd($existing_client);
        if ($existing_client != null) {

            //  dd("true");

            $find_pm_id = Project::where('client_id', $existing_client->id)->orderBy('id', 'desc')->where('id', '!=', $project->id)->where('pm_id', '!=', null)->first();
            if ($find_pm_id != null) {

                $to = Carbon::createFromFormat('Y-m-d H:s:i', Carbon::now());


                $from = Carbon::createFromFormat('Y-m-d H:s:i', $find_pm_id->created_at);
                $diff_in_days = $from->diffInDays($to);

                // dd($diff_in_days, $find_pm_id);
                if ($diff_in_days < 90) {
                    $deal_pm_id = Deal::find($deal->id);
                    $deal_pm_id->pm_id = $find_pm_id->pm_id;
                    $deal_pm_id->save();
                    $project_pm_id = Project::find($project->id);
                    $project_pm_id->pm_id = $find_pm_id->pm_id;
                    $project_pm_id->save();
                    // dd($project_pm_id);

                    $pmassign = new PMProject();
                    $pmassign->project_id = $project->id;
                    $pmassign->status = 'pending';
                    $pmassign->pm_id = $find_pm_id->pm_id;
                    $pmassign->deal_id = $deal->id;
                    $pmassign->client_id = $existing_client->id;
                    $pmassign->save();
                    $pm_project_find = PMAssign::where('pm_id', $find_pm_id->pm_id)->first();
                    $pm_project_update = PMAssign::find($pm_project_find->id);
                    $pm_project_update->project_count = $pm_project_update->project_count + 1;
                    $pm_project_update->amount = $pm_project_update->amount + ($deal->amount / 2);
                    $pm_project_update->actual_amount = $pm_project_update->actual_amount + $deal->amount;
                    $pm_project_update->monthly_project_count = $pm_project_update->monthly_project_count + 1;
                    $pm_project_update->monthly_project_amount = $pm_project_update->monthly_project_amount + ($deal->amount / 2);
                    $pm_project_update->monthly_actual_project_amount = $pm_project_update->monthly_actual_project_amount + $deal->amount;
                    $pm_project_update->save();
                }
            }
        }

        // if($existing_client != null)
        // {
        //     $find_pm_id = Project::where('client_id',$existing_client->id)->orderBy('id','desc')->where('id','!=',$project->id)->where('pm_id','!=',null)->first();
        //     $to = Carbon::createFromFormat('Y-m-d H:s:i', Carbon::now());
        //     $from = Carbon::createFromFormat('Y-m-d H:s:i', $find_pm_id->created_at);
        //     $diff_in_days = $from->diffInDays($to);

        //     // dd($diff_in_days, $find_pm_id);
        //     if ($diff_in_days < 90) {
        //         $deal_pm_id = Deal::find($deal->id);
        //         $deal_pm_id->pm_id = $find_pm_id->pm_id;
        //         $deal_pm_id->save();
        //         $project_pm_id= Project::find($project->id);
        //         $project_pm_id->pm_id = $find_pm_id->pm_id;
        //         $project_pm_id->save();
        //         // dd($project_pm_id);

        //         $pmassign = new PMProject();
        //         $pmassign->project_id = $project->id;
        //         $pmassign->status = 'pending';
        //         $pmassign->pm_id = $find_pm_id->pm_id;
        //         $pmassign->deal_id = $deal->id;
        //         $pmassign->client_id = $existing_client->id;
        //         $pmassign->save();
        //         $pm_project_find = PMAssign::where('pm_id', $find_pm_id->pm_id)->first();
        //         $pm_project_update = PMAssign::find($pm_project_find->id);
        //         $pm_project_update->project_count = $pm_project_update->project_count + 1;
        //         $pm_project_update->amount = $pm_project_update->amount + ($deal->amount /2);
        //         $pm_project_update->actual_amount = $pm_project_update->actual_amount + $deal->amount;
        //         $pm_project_update->monthly_project_count = $pm_project_update->monthly_project_count + 1;
        //         $pm_project_update->monthly_project_amount = $pm_project_update->monthly_project_amount + ($deal->amount/2);
        //         $pm_project_update->monthly_actual_project_amount = $pm_project_update->monthly_actual_project_amount + $deal->amount;
        //         $pm_project_update->save();
        //     }
        // }



        // activity log
        $user = Auth::user();
        $text = $user->name . ' closed the deal for ' . $deal->actual_amount . '$';
        $link = '<a href="' . route('deals.show', $deal->id) . '">' . $text . '</a>';
        $activityLog = new LeadsDealsActivityLog();
        if ($lead != null) {
            $activityLog->lead_id = $lead->id;
        }
        $activityLog->deal_id = $deal_stage->id;
        $activityLog->won_deal_id = $contract->id;
        $activityLog->project_id = $project->id;
        $activityLog->message = $link;
        $activityLog->created_by = Auth::id();
        $activityLog->save();



        //update previous lead
        /*$previous_lead = LeadsDealsActivityLog::where([
            'lead_id' => $deal->lead_id,
            'deal_id' => null
        ])->first();
        if ($previous_lead) {
            $previous_lead->deal_id = $deal->id;
            $previous_lead->save();
        }*/
        //end activity log
        \DB::commit();
        if ($project) {
            $users = user::whereIn('role_id', [1, 4])->get();
            foreach ($users as $user) {
                $pusher_options = [
                    'user_id' => $user->id,
                    'role_id' => $user->role_id,
                    'title' => 'New project on the way',
                    'body' => 'Please check new project',
                    'redirectUrl' => route('projects.show', $project->id)
                ];

                $this->triggerPusher('lead-updated-channel', 'lead-updated', $pusher_options);
            }
        }

        return response()->json([
            'status' => 'success',
            'redirectUrl' => route('dm-dealDetails', $deal->id)
        ]);
    }
    public function dmDealStageUpdateLost(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'comments' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400
            ]);
        };
      $deal= DealStage::find($request->id);
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
    }

    public function getDmDealData(Request $request){
        $startDate = $request->start_date ?? null;
        $endDate = $request->end_date ?? null;
        $limit = $request->limit ??  10;

        $dealQuery = DealStage::select(
            'deal_stages.*',
            'added_by.id as added_by_id',
            'added_by.name as added_by_name',
            'added_by.image as added_by_image',
            'deal_stages.added_by as lead_added_by',
            'lead_added_by.name as lead_added_by_name',
            'lead_added_by.image as lead_added_by_image',
            'amount.currency_symbol as ammount_currency_symbol',
            'actual_amount.currency_symbol as actual_amount_currency_symbol',
            'leads.project_link as lead_project_link'
            )
            ->leftJoin('leads', 'leads.id', '=', 'deal_stages.lead_id')
            ->leftJoin('users as added_by', 'deal_stages.added_by', '=', 'added_by.id')
            ->leftJoin('users as lead_added_by', 'lead_added_by.id', '=', 'leads.added_by')
            ->leftJoin('currencies as amount', 'amount.id', 'deal_stages.currency_id')
            ->leftJoin('currencies as actual_amount', 'actual_amount.id', 'deal_stages.original_currency_id')
            ->where('deal_stages.convert_ld_status','DM');

            if ($startDate !== null && $endDate !== null) {
                $dealQuery->where(function ($q) use ($startDate, $endDate) {
                    $q->whereBetween(DB::raw('DATE(deal_stages.`created_at`)'), [$startDate, $endDate]);
                    $q->orWhereBetween(DB::raw('DATE(deal_stages.`updated_at`)'), [$startDate, $endDate]);
                });
            }
            if ($request->search !='') {
                $dealQuery->where(function ($query) {
                    $query->where('deal_stages.project_name', 'like', '%' . request('search') . '%')
                        ->orWhere('deal_stages.short_code', 'like', '%' . request('search') . '%')
                        ->orWhere('leads.project_link', 'like', '%' . request('search') . '%')
                        ->orWhere('deal_stages.client_username', 'like', '%' . request('search') . '%')
                        ->orWhere('deal_stages.client_name', 'like', '%' . request('search') . '%');
                });
            }
            if ($request->client_username != null) {
                $dealQuery->where('deal_stages.client_username', $request->client_username);
            }
            if ($request->has('closed_by') && $request->input('closed_by') !== 'all') {
                $dealQuery->where('deal_stages.converted_by', $request->input('closed_by'));
            }
            if ($request->status != null) {
                if ($request->status == 5) {
                    $dealQuery->where('deal_stages.deal_stage', $request->status)->where('won_lost', '=',null);
                }
                elseif ($request->status == 'won') {
                    $dealQuery->where('deal_stages.won_lost', '=','Yes');
                }
                elseif ($request->status == 'lost') {
                    $dealQuery->where('deal_stages.won_lost', '=','No');
                }
                else{
                    $dealQuery->where('deal_stages.deal_stage', $request->status);
                }
            }
            $deals_data = $dealQuery
                ->orderBy('id', 'desc')
                ->paginate($limit);

            foreach($deals_data as $item){
                $won_lost = '';
                $won_lost_bg = '';
                if($item->won_lost != null){
                    if($item->won_lost== 'Yes'){
                        $won_lost = 'Won';
                        $won_lost_bg = '#00aa00';
                    }else{
                        $won_lost = 'Lost';
                        $won_lost_bg = '#FF0000';
                    }
                }else{
                    if($item->deal_stage == 0){
                        $won_lost = 'Contact Made';
                        $won_lost_bg = '#FFFF00';
                    }elseif ($item->deal_stage == 1) {
                        $won_lost = 'Qualified';
                        $won_lost_bg = '#10e0ef';
                    }elseif ($item->deal_stage == 2) {
                        $won_lost = 'Requirements Defined';
                        $won_lost_bg = '#0000FF';
                    }elseif ($item->deal_stage == 3) {
                        $won_lost = 'Proposal Made';
                        $won_lost_bg = '#FFA500';
                    }elseif ($item->deal_stage == 4) {
                        $won_lost = 'Negotiation Started';
                        $won_lost_bg = '#A020F0';
                    }else{
                        $won_lost = 'Milestone Breakdown';
                        $won_lost_bg = '#C525F2';
                    }
                }
                $item->won_lost = $won_lost;
                $item->won_lost_bg = $won_lost_bg;

                if($item->won_lost == 'Won'){
                    $deal_id = Deal::where('deal_id',$item->short_code)->first();
                    $user= User::where('id',$deal_id->added_by)->first();
                    $item->deal_stages_converted_by = $user->id;
                    $item->deal_stages_converted_by_name = $user->name;
                    $item->deal_stages_converted_by_image = $user->image;
                }else{
                    $item->deal_stages_converted_by = null;
                    $item->deal_stages_converted_by_name = null;
                    $item->deal_stages_converted_by_image = null;
                }
            }

        return response()->json([
            'status'=> 200,
            'data' => $deals_data
        ]);
    }

    public function exportDmDeal(Request $request){
        $startDate = $request->start_date ?? null;
        $endDate = $request->end_date ?? null;

        $dealQuery = DealStage::select(
            'deal_stages.*',
            'added_by.id as added_by_id',
            'added_by.name as added_by_name',
            'added_by.image as added_by_image',
            'deal_stages.added_by as lead_added_by',
            'lead_added_by.name as lead_added_by_name',
            'lead_added_by.image as lead_added_by_image',
            'amount.currency_symbol as ammount_currency_symbol',
            'actual_amount.currency_symbol as actual_amount_currency_symbol',
            'leads.project_link as lead_project_link'
            )
            ->leftJoin('leads', 'leads.id', '=', 'deal_stages.lead_id')
            ->leftJoin('users as added_by', 'deal_stages.added_by', '=', 'added_by.id')
            ->leftJoin('users as lead_added_by', 'lead_added_by.id', '=', 'leads.added_by')
            ->leftJoin('currencies as amount', 'amount.id', 'deal_stages.currency_id')
            ->leftJoin('currencies as actual_amount', 'actual_amount.id', 'deal_stages.original_currency_id')
            ->where('deal_stages.convert_ld_status','DM');

            if ($startDate !== null && $endDate !== null) {
                $dealQuery->where(function ($q) use ($startDate, $endDate) {
                    $q->whereBetween(DB::raw('DATE(deal_stages.`created_at`)'), [$startDate, $endDate]);
                    $q->orWhereBetween(DB::raw('DATE(deal_stages.`updated_at`)'), [$startDate, $endDate]);
                });
            }
            if ($request->search !='') {
                $dealQuery->where(function ($query) {
                    $query->where('deal_stages.project_name', 'like', '%' . request('search') . '%')
                        ->orWhere('deal_stages.short_code', 'like', '%' . request('search') . '%')
                        ->orWhere('leads.project_link', 'like', '%' . request('search') . '%')
                        ->orWhere('deal_stages.client_username', 'like', '%' . request('search') . '%')
                        ->orWhere('deal_stages.client_name', 'like', '%' . request('search') . '%');
                });
            }
            if ($request->client_username != null) {
                $dealQuery->where('deal_stages.client_username', $request->client_username);
            }
            if ($request->has('closed_by') && $request->input('closed_by') !== 'all') {
                $dealQuery->where('deal_stages.converted_by', $request->input('closed_by'));
            }
            if ($request->status != null) {
                if ($request->status == 5) {
                    $dealQuery->where('deal_stages.deal_stage', $request->status)->where('won_lost', '=',null);
                }
                elseif ($request->status == 'won') {
                    $dealQuery->where('deal_stages.won_lost', '=','Yes');
                }
                elseif ($request->status == 'lost') {
                    $dealQuery->where('deal_stages.won_lost', '=','No');
                }
                else{
                    $dealQuery->where('deal_stages.deal_stage', $request->status);
                }
            }
            $deals_data = $dealQuery
                ->orderBy('id', 'desc')
                ->get();

            foreach($deals_data as $item){
                $won_lost = '';
                $won_lost_bg = '';
                if($item->won_lost != null){
                    if($item->won_lost== 'Yes'){
                        $won_lost = 'Won';
                        $won_lost_bg = '#00aa00';
                    }else{
                        $won_lost = 'Lost';
                        $won_lost_bg = '#FF0000';
                    }
                }else{
                    if($item->deal_stage == 0){
                        $won_lost = 'Contact Made';
                        $won_lost_bg = '#FFFF00';
                    }elseif ($item->deal_stage == 1) {
                        $won_lost = 'Qualified';
                        $won_lost_bg = '#10e0ef';
                    }elseif ($item->deal_stage == 2) {
                        $won_lost = 'Requirements Defined';
                        $won_lost_bg = '#0000FF';
                    }elseif ($item->deal_stage == 3) {
                        $won_lost = 'Proposal Made';
                        $won_lost_bg = '#FFA500';
                    }elseif ($item->deal_stage == 4) {
                        $won_lost = 'Negotiation Started';
                        $won_lost_bg = '#A020F0';
                    }else{
                        $won_lost = 'Milestone Breakdown';
                        $won_lost_bg = '#C525F2';
                    }
                }
                $item->won_lost = $won_lost;
                $item->won_lost_bg = $won_lost_bg;

                if($item->won_lost == 'Won'){
                    $deal_id = Deal::where('deal_id',$item->short_code)->first();
                    $user= User::where('id',$deal_id->added_by)->first();
                    $item->deal_stages_converted_by = $user->id;
                    $item->deal_stages_converted_by_name = $user->name;
                    $item->deal_stages_converted_by_image = $user->image;
                }else{
                    $item->deal_stages_converted_by = null;
                    $item->deal_stages_converted_by_name = null;
                    $item->deal_stages_converted_by_image = null;
                }
            }

        return response()->json([
            'status'=> 200,
            'data' => $deals_data
        ]);
    }

}
