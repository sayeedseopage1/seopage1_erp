<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\DataTables\DMWonDealDatatable;
use App\Models\ClientDetails;
use App\Models\ClientForm;
use App\Models\User;
use App\Models\ContractType;
use App\Models\Contract;
use App\Models\Country;
use App\Models\Currency;
use App\Models\Deal;
use App\Models\PMAssign;
use App\Models\PMProject;
use App\Models\Project;
use App\Models\ProjectMember;
use App\Models\ProjectMilestone;
use App\Models\QualifiedSale;
use App\Models\RoleUser;
use App\Models\SalesCount;
use App\Notifications\DealAuthorizationSendNotification;
use App\Notifications\HourlyDealNotification;
use App\Notifications\WonDealNotification;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Notification;
use Toastr;
use Auth;
use App\Helper\Reply;
use App\Models\AwardTimeIncress;
use App\Models\AuthorizationAction;
use App\Http\Controllers\HelperPendingActionController;
use App\Models\DealStage;

class DMContractController extends AccountBaseController
{
    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'Won Deals';
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
    public function index(DMWonDealDatatable $dataTable)
    {
        abort_403(user()->permission('view_contract') == 'none');

        if (!request()->ajax()) {
            if (in_array('client', user_roles())) {
                $this->clients = User::client();
            } else {
                $this->clients = User::allClients();
            }

            $this->contractTypes = ContractType::all();
            $this->contractCounts = Contract::count();
            $this->expiredCounts = Contract::where(DB::raw('DATE(`end_date`)'), '<', now()->format('Y-m-d'))->count();
            $this->aboutToExpireCounts = Contract::where(DB::raw('DATE(`end_date`)'), '>', now()->format('Y-m-d'))
                ->where(
                    DB::raw('DATE(`end_date`)'),
                    '<',
                    now()
                        ->timezone($this->global->timezone)
                        ->addDays(7)
                        ->format('Y-m-d')
                )
                ->count();
        }

        return $dataTable->render('dm-contracts.index', $this->data);
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $viewPermission = user()->permission('view_contract');
        $this->viewDiscussionPermission = $viewDiscussionPermission = user()->permission('view_contract_discussion');
        $this->viewContractFilesPermission = $viewContractFilesPermission = user()->permission('view_contract_files');
        $this->viewContractMilestonePermission = $viewContractMilestonePermission = user()->permission('view_contract_milestone');
        $this->viewContractCrossDepartmentalWorkPermission = $viewContractCrossDepartmentalWorkPermission = user()->permission('view_contract_cross_departmental_work');

        $this->contract = Contract::with([

            'client',
            'client.clientDetails',
            'files' => function ($q) use ($viewContractFilesPermission) {
                if ($viewContractFilesPermission == 'added') {
                    $q->where('added_by', user()->id);
                }
            },
            'milestone' => function ($q) use ($viewContractMilestonePermission) {
                if ($viewContractMilestonePermission == 'added') {
                    $q->where('added_by', user()->id);
                }
            },
            'cross_departmental_work' => function ($q) use ($viewContractCrossDepartmentalWorkPermission) {
                if ($viewContractCrossDepartmentalWorkPermission == 'added') {
                    $q->where('added_by', user()->id);
                }
            },
            'renewHistory',
            'renewHistory.renewedBy',
            'discussion' => function ($q) use ($viewDiscussionPermission) {
                if ($viewDiscussionPermission == 'added') {
                    $q->where('contract_discussions.added_by', user()->id);
                }
            },
            'discussion.user',
        ])->findOrFail($id);

        abort_403(
            !($viewPermission == 'all' ||
                ($viewPermission == 'added' && user()->id == $this->contract->added_by) ||
                ($viewPermission == 'owned' && user()->id == $this->contract->client_id) ||
                ($viewPermission == 'both' && (user()->id == $this->contract->client_id || user()->id == $this->contract->added_by))
            )
        );

        $this->pageTitle = __('Deals') . ' #' . $this->contract->deal->deal_id;

        $this->view = 'dm-contracts.ajax.summary';

        $tab = request('tab');

        switch ($tab) {
            case 'discussion':
                $this->view = 'dm-contracts.ajax.discussion';
                break;
            case 'files':
                $this->view = 'dm-contracts.ajax.files';
                break;
            case 'milestone':
                $this->view = 'dm-contracts.ajax.milestone';
                break;
            case 'cross_departmental_work':
                $this->view = 'dm-contracts.ajax.cross_departmental_work';
                break;
            case 'renew':
                $this->view = 'dm-contracts.ajax.renew';
                break;
            default:
                $this->view = 'dm-contracts.ajax.summary';
                break;
        }

        if (request()->ajax()) {
            $html = view($this->view, $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->activeTab = $tab == '' ? 'profile' : $tab;

        return view('dm-contracts.show', $this->data);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function dmDealDetailsedit($id)
    {
        $this->pageTitle = 'Edit Deal Details';
        $this->middleware(function ($request, $next) {
            abort_403(!in_array('contracts', $this->user->modules));
            return $next($request);
        });
        $deal = Deal::where('id', $id)->first();

        return view('dm-contracts.editdealdetails', $this->data, compact('deal'));
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

    public function dmDealdetails($id)
    {
        $this->pageTitle = 'Add Deal Details';
        $this->middleware(function ($request, $next) {
            abort_403(!in_array('contracts', $this->user->modules));
            return $next($request);
        });
        $deal = Deal::where('id', $id)->first();

        return view('dm-contracts.dealdetails', $this->data, compact('deal'));
    }

    public function dmStoredealDetails(Request $request)
    {
        // dd($request->all());

         $deal_hourly_checked = Deal::where('id', $request->id)->first();
         if ($deal_hourly_checked->project_type != 'hourly') {
             $validated = $request->validate([
                 'project_name' => 'required',
                 'deadline' => 'required',
                 'amount' => 'required',
                 'message_link' => 'required',
                 'description2' => 'required',
                 'description3' => 'required',
                 'description5' => 'required',
                 'description6' => 'required',
                 'description7' => 'required',
                 'description8' => 'required',
                 'description9' => 'required',
                 'deal_category' => 'required',
                 'project_summary' => $request->has('project_summary') ? 'required' : '',

             ], [
                 'project_name.required' => 'Please enter the project name!',
                 'deadline.required' => 'Please select project deadline from Freelancer.com!',
                 'amount.required' => 'Please enter the project budget!',
                 'description2.required' => 'What in 2-8 words are missing, please write the what in 2-8 words here!',
                 'description3.required' => 'What in 3-4 lines are missing, please elaborate the "WHAT" 3-4 lines here!',
                 'description5.required' => 'Client\'s focus or concerning points are required. Please share as detailed explanation as you can!',
                 'description6.required' => 'Login details are required. Please provide all the access details of the project!',
                 'description7.required' => 'Logo files or Google drive link for logo files are required. Please provide all the access details of the project!',
                 'description8.required' => 'To ensure all departments are aligned, we kindly request your confirmation on cross-departmental work for this project. Please let us know if cross-departmental work is involved or not.',
                 'description9.required' => 'Notes for the project manager/technical team is required, please write if any notes for manager/technical team are available.',
                 'deal_category.required' => 'This field is required!',
                 'project_summary.required' => 'This field is required!',
             ]);
         } else {
             $validated = $request->validate([
                 'project_name' => 'required',
                 'estimated_hour_task' => 'required',
                 'hourly_rate' => 'required',
                 'hubstaff_tracking' => 'required',
                 'tracked_hours' => 'required',
                 'second_day_tracked_hours' => 'required',
                 'expect_amount' => 'required',
                 'certain_amount_hour' => 'required',
                 'long_project' => 'required',
                 'description2' => 'required',
                 'description3' => 'required',
                 'description5' => 'required',
                 'description6' => 'required',
                 'description7' => 'required',
                 'description8' => 'required',
                 'description9' => 'required',
                 'deal_category' => 'required',
                 'project_summary' => $request->has('project_summary') ? 'required' : '',
             ], [
                 'project_name.required' => 'Please enter the project name!',
                 'estimated_hour_task.required' => 'This field is required!',
                 'hourly_rate.required' => 'This field is required!',
                 'hubstaff_tracking.required' => 'This field is required!',
                 'tracked_hours.required' => 'This field is required!',
                 'second_day_tracked_hours.required' => 'This field is required!',
                 'expect_amount.required' => 'This field is required!',
                 'certain_amount_hour.required' => 'This field is required!',
                 'long_project.required' => 'This field is required!',
                 'description2.required' => 'What in 2-8 words are missing, please write the what in 2-8 words here!',
                 'description3.required' => 'What in 3-4 lines are missing, please elaborate the "WHAT" 3-4 lines here!',
                 'description5.required' => 'Client\'s focus or concerning points are required. Please share as detailed explanation as you can!',
                 'description6.required' => 'Login details are required. Please provide all the access details of the project!',
                 'description7.required' => 'Logo files or Google drive link for logo files are required. Please provide all the access details of the project!',
                 'description8.required' => 'To ensure all departments are aligned, we kindly request your confirmation on cross-departmental work for this project. Please let us know if cross-departmental work is involved or not.',
                 'description9.required' => 'Notes for the project manager/technical team is required, please write if any notes for manager/technical team are available.',
                 'deal_Category.required' => 'This field is required!',
                 'project_summary.required' => 'This field is required!',
             ]);
         }
         //dd("hello");
         $project_milestone = Project::where('deal_id', $request->id)->first();
         $won_deal_id = Deal::where('id', $request->id)->first();
         if ($won_deal_id->project_type != 'hourly') {


             $milestone = ProjectMilestone::where('project_id', $project_milestone->id)->first();
             //      dd($milestone);
             $won_deal_id = Deal::where('id', $request->id)->first();
             if ($won_deal_id->project_type != 'hourly') {


                 $milestone = ProjectMilestone::where('project_id', $project_milestone->id)->first();
                 if ($milestone == null) {
                     return response()->json([
                         "message" => "The given data was invalid.",
                         "errors" => [
                             "milestone_value" => [
                                 "Milestone not found!!!."
                             ]
                         ]
                     ], 422);
                 }
             }
         }
         DB::beginTransaction();

         try {
             $deal = Deal::find($request->id);
             $deal->project_name = $request->project_name;
             $deal->currency_id = 1;
             $deal->actual_amount =  $request->amount;
             $currency = Currency::where('id', $request->original_currency_id)->first();
             //dd($currency);
             $deal->amount = ($request->amount) / $currency->exchange_rate;
             $deal->organization = $request->organization;
             $deal->client_email = $request->client_email;
             //  $deal->description = $request->description;
             // $deal->pipeline_stage = $request->pipeline_stage;
             $message_links = $request->message_link;
             // /dd($message_links);
             $value = '';

             if (is_array($message_links) || is_object($message_links)) {
                 foreach ($message_links as $link) {
                     //dd($d['day']);
                     $value = $value  . $link . ' <br> ';
                 }
             }
             $deal->deal_category = $request->deal_category;
             $deal->deadline = $request->deadline;
             $deal->estimated_hour_task = $request->estimated_hour_task;
             $deal->hourly_rate = $request->hourly_rate;
             $deal->hubstaff_tracking = $request->hubstaff_tracking;
             $deal->tracked_hours = $request->tracked_hours;
             $deal->second_day_tracked_hours = $request->second_day_tracked_hours;
             $deal->expect_amount = $request->expect_amount;
             $deal->certain_amount_hour = $request->certain_amount_hour;
             $deal->long_project = $request->long_project;
             $deal->currency_id = $request->currency_id;
             $deal->message_link = $value;
             $deal->profile_link = $request->profile_link;
             $deal->description2 = $request->description2;
             $deal->description3 = $request->description3;
             $deal->description5 = $request->description5;
             $deal->description6 = $request->description6;
             $deal->description7 = $request->description7;
             $deal->description8 = $request->description8;
             $deal->description9 = $request->description9;
             $deal->dept_status = 'DM';

             $deal->save();
            // dd('ok');
             $project_id = Project::where('deal_id', $request->id)->first();
             $project = Project::find($project_id->id);
             $project->project_name = $request->project_name;

             $project->deadline = $request->deadline;

             $currency = Currency::where('id', $request->original_currency_id)->first();
             //dd($currency);
             $project->project_budget = ($request->amount) / $currency->exchange_rate;
             $project->due = $deal->amount;
             $project->currency_id = 1;
             $project->project_summary = $request->project_summary;
             $project->dept_status = 'DM';
             $project->save();
            //  dd('oh');

             if ($deal->project_type == 'hourly') {
                 // dd("true");
                 $milestone = new ProjectMilestone();
                 $milestone->project_id = $project->id;

                 $milestone->currency_id = 1;
                 $milestone->milestone_title = $project->project_name . '- InitialMilestone';

                 $milestone->original_currency_id = $deal->original_currency_id;
                 $milestone->cost = 0;

                 $milestone->actual_cost = 0;

                 $milestone->invoice_created = 0;
                 $milestone->status = 'incomplete';
                 $milestone->added_by = Auth::id();
                 $milestone->last_updated_by = Auth::id();
                 $milestone->milestone_type = 'Client Created this Milestone';
                 //dd($milestone->actual_cost,$milestone->invoice_created,$milestone->status,$milestone->added_by,$milestone->last_updated_by, $milestone->milestone_type);
                
                 $milestone->save();
                //   dd('milestone');


             }

             //for testing purpose
             // $ceo= User::where('id',62)->first();
             //   Mail::to($ceo->email)->send(new WonDealMail($project));
             $contract_id = Contract::where('deal_id', $request->id)->first();
             $contract = Contract::find($contract_id->id);
             $contract->subject = $request->project_name;
             $contract->actual_amount = $request->amount;
             //$deal->actual_amount=  $request->amount;
             $currency = Currency::where('id', $request->original_currency_id)->first();

             $contract->amount = ($request->amount) / $currency->exchange_rate;
             $contract->original_amount = $request->amount;
             $contract->description = $request->description;
             $contract->currency_id = $request->currency_id;
             $contract->save();
             $client_id = User::where('id', $contract_id->client_id)->first();
             $client = User::find($client_id->id);
             $client->email = $request->client_email;
             $client->name = $request->client_name;
             $client->save();

             $lead_developer_id = RoleUser::where('role_id', 6)->get();
             //dd($lead_developer_id);
             foreach ($lead_developer_id as $lead) {
                 $lead_developer = new ProjectMember();
                 $lead_developer->user_id = $lead->user_id;
                 $lead_developer->project_id = $project->id;
                 $lead_developer->hourly_rate = 0;
                 $lead_developer->lead_developer_id = $lead->user_id;
                 $lead_developer->save();
             }

             // $pm_count = PMAssign::select('project_count')->min('project_count');
             // $pm_user = PMAssign::where('project_count', $pm_count)->first();




                         $pmassign = new PMProject();
                         $pmassign->project_id = $project->id;
                         $pmassign->status = 'pending';
                         $pmassign->pm_id = 62;
                         $pmassign->deal_id = $deal->id;
                         $pmassign->client_id = $client->id;
                         $pmassign->save();
                         $deal_assign = Deal::find($deal->id);
                         $deal_assign->pm_id = 62;
                         $deal_assign->save();
                         $pm_assign_project = Project::find($project->id);
                         $pm_assign_project->pm_id = 62;
                         $pm_assign_project->save();
                         //$email = $request->email;









             $deal_pm_id = Deal::where('id', $request->id)->first();

             $project_id = Project::where('deal_id', $deal_pm_id->id)->first();

             $project_admin_update = Project::find($project_id->id);
             $project_admin_update->added_by = 62;
             $project_admin_update->project_admin = 62;
             $project_admin_update->save();



             //qualified sales start from here
             $qualified_sale = new QualifiedSale();
             $qualified_sale->project_name = $deal->project_name;

             $qualified_sale->deal_id = $deal->id;

             $qualified_sale->project_id = $project->id;
             $qualified_sale->deal_short_code = $deal->deal_id;

             $qualified_sale->date = Carbon::now();

             $qualified_sale->client_id = $deal->client_id;

             $qualified_sale->client_name = $deal->client_name;
             $qualified_sale->pm_id = 62;

             $qualified_sale->pm_name = 'Abu Sayeed';

             // $actual_currency= Currency::where('id',$deal->currency_id)->first();

             $qualified_sale->amount = $deal->amount;
             //$qualified_sale->actual_amount= $deal->actual_amount . $currency->currency_code;
             $qualified_sale->save();
             $helper = new HelperPendingActionController();


             $helper->WonDealAcceptAuthorization($project,$qualified_sale->pm_id);
 

            //  dd('oooo');




             //qualified sales start from here

             $user = User::where('id', $deal_pm_id->pm_id)->first();
             $this->triggerPusher('notification-channel', 'notification', [
                 'user_id' => $user->id,
                 'role_id' => 4,
                 'title' => 'New project',
                 'body' => 'You have new project. Please check',
                 'redirectUrl' => route('contracts.show', $deal_pm_id->id)
             ]);
             if ($deal->project_type == 'fixed') {
                 $user = User::where('id', $deal_pm_id->pm_id)->first();
                 Notification::send($user, new WonDealNotification($deal));
                }else{
                    Notification::send($user, new HourlyDealNotification($deal));
                }



             //  Mail::to($test->email)->send(new WonDealMail($project));
             if ($deal->project_type == 'fixed') {
                 $users = User::where('role_id', 1)->get();
                 foreach ($users as $usr) {
                     Notification::send($usr, new WonDealNotification($deal));
                 }
             }else{
                 $users = User::where('role_id', 1)->get();
                 foreach ($users as $usr) {
                     Notification::send($usr, new HourlyDealNotification($deal));
                 }
             }

                $project_member = new ProjectMember();
                $project_member->user_id = Auth::id();
                $project_member->added_by = Auth::id();
                $project_member->project_id = $project->id;
                $project_member->save();

             // $check_new_pm= User::where('id',$deal->pm_id)->first();
             // $new_pm = EmployeeDetails::where('user_id',$check_new_pm->id)->first();
             // $to = Carbon::createFromFormat('Y-m-d H:s:i', Carbon::now());

             // $from = Carbon::createFromFormat('Y-m-d H:s:i', $new_pm->joining_date);

             // $diff_in_days = $from->diffInDays($to);
             // if($diff_in_days < 30)
             // {
             //     $startOfWeek = Carbon::now()->startOfWeek();
             //     $endOfWeek = Carbon::now()->endOfWeek();
             //     $new_pm_project_count= Project::where('pm_id',$new_pm->user_id)->where('created_at',[$startOfWeek, $endOfWeek])->count();
             //     if($new_pm_project_count > 1)
             //     {
             //         $new_pm_assign = PMAssign::where('pm_id',$new_pm->user_id)->first();
             //         $new_pm_status= PMAssign::find($new_pm_assign->id);
             //         $new_pm_status->status = 0;
             //         $new_pm_status->save();
             //     }



             // $clientdetail= ClientDetails::find($client_id->id);
             // //dd($clientdetail);
             // $clientdetail->company_name= $request->organization;
             // $clientdetail->save();
             $deal = Deal::find($deal->id);
             $deal->authorization_status = 2;
             $deal->save();

             $sender = User::where('id', Auth::id())->first();


             //sales lead
            //  $users = User::where('role_id', 8)->get();

            //  foreach ($users as $key => $user) {
            //      //start authorization action
            //      $authorization_action = new AuthorizationAction();
            //      $authorization_action->model_name = $deal->getMorphClass();
            //      $authorization_action->model_id = $deal->id;
            //      $authorization_action->type = 'saleslead_price_authorization';
            //      $authorization_action->deal_id = $project_id->deal_id;
            //      $authorization_action->project_id = $project_id->id;
            //      $authorization_action->link = route('authorization_request', $project_id->deal_id);
            //      $authorization_action->title = 'Sales Lead Price Authorization';
            //      $authorization_action->authorization_for = $user->id;
            //      $authorization_action->save();
            //      //end authorization action


            //      Notification::send($user, new DealAuthorizationSendNotification($deal, Auth::user()));

            //      $this->triggerPusher('notification-channel', 'notification', [
            //          'user_id' => $user->id,
            //          'role_id' => $user->role_id,
            //          'title' => 'Price authorization request from ' . Auth::user()->name,
            //          'body' => Auth::user()->name . ' send price authorization request for ' . $deal->project_name,
            //          'redirectUrl' => route('deals.show', $project_id->deal_id)
            //      ]);
            //  }

             //start authorization action
            //  $authorization_action = new AuthorizationAction();
            //  $authorization_action->model_name = $deal->getMorphClass();
            //  $authorization_action->model_id = $deal->id;
            //  $authorization_action->type = 'project_manager_accept_project';
            //  $authorization_action->deal_id = $project_id->deal_id;
            //  $authorization_action->project_id = $project_id->id;
            //  $authorization_action->link = route('projects.edit', $project_id->id);
            //  $authorization_action->title = 'Required action to accept project';
            //  $authorization_action->authorization_for = $project_id->pm_id;
            //  $authorization_action->save();
             //end authorization action

            //  if(Auth::user()->role_id==4){
            //      $project_member = new ProjectMember();
            //      $project_member->user_id = Auth::id();
            //      $project_member->added_by = Auth::id();
            //      $project_member->project_id = $project->id;
            //      $project_member->save();
            //  }
           // dd($deal);

             DB::commit();
             // all good
         } catch (\Exception $e) {
             DB::rollback();
             Toastr::error('Action Failed', 'Error', ["positionClass" => "toast-top-right", 'redirectUrl']);
             return back();
         }
         return response()->json(['message' => 'Deal creation completed successfully']);
     }
     public function storeDMDeal(Request $request)
     {
        // dd($request->all());
        $current_time = Carbon::now()->format('d-m-Y H:i:s');
        $award_date = strtotime($request->award_time);
        $aw_dt = date('Y-m-d H:i:s', $award_date);
        //dd($aw_dt);
        $validate = $request->validate([
            'user_name' => 'required',
            'client_name' => 'required',
            'project_name' => 'required',
            'amount' => 'required',
            'award_time' => 'required|date|before:' . $current_time,
        ]);
        //        if ($validate) {
        $to = Carbon::parse($request->current_time);
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

        // DB::beginTransaction();
        $existing_client = User::where('user_name', $request->user_name)->first();
        $chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        $suffle = substr(str_shuffle($chars), 0, 6);
        $deal = new Deal();
        $deal->deal_id = 'DSEOP1' . $suffle;
        $deal->project_name = $request->project_name;
        $deal->currency_id = 1;
        $deal->actual_amount =  $request->amount;

        $currency = Currency::where('id', $request->original_currency_id)->first();
        //dd($currency);
        $deal->award_time = $aw_dt;
        $deal->amount = ($request->amount) / $currency->exchange_rate;
        $deal->client_name = $request->client_name;
        $deal->client_username = $request->user_name;
        $deal->added_by = Auth::id();
        $deal->dept_status = 'DM';
        $deal->original_currency_id = $request->original_currency_id;
        $date = date('Y-m-d H:i:s');

        $newDate = Carbon::createFromFormat('Y-m-d H:i:s', $date)
            ->format('Y-m-d');

        //dd($newDate);

        $deal->deal_creation_date = $newDate;

        $deal->start_date = $newDate;
        if ($existing_client != null) {
            $deal->client_badge = 'existing client';
        } else {
            $deal->client_badge = 'new client';
        }

        $deal->save();
        if (Auth::user()->role_id == 7) {
            $agent_id = SalesCount::where('user_id', Auth::id())->first();
            if ($agent_id != null) {
                $lead_ag_id = SalesCount::find($agent_id->id);

                $lead_ag_id->won_deals = $lead_ag_id->won_deals + 1;
                $lead_ag_id->deal_value = $lead_ag_id->deal_value + $deal->amount;
                $lead_ag_id->save();
            }
        }
        $getUser = User::where('user_name', $request->user_name)->first();
        if (is_null($getUser)) {
            $user = new User();
            $user->name = $request->client_name;
            $user->user_name = $request->user_name;
            $user->login = 'disable';
            $user->email_notifications = 0;
            $country = Country::where('nicename', $request->country)->first();
            $user->country_id = $country->id;
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
            $user = $getUser;
        }

        $deal_client = Deal::find($deal->id);
        $deal_client->client_id = $user->id;
        $deal->submission_status= 'Submitted';

        $client_details= ClientForm::where('client_username',$user->user_name)->first();
       // dd($client_details);
        if ($client_details != null) {
            $deal_client->submission_status = 'Submitted';

            $new_client_form= ClientForm::new();
            $new_client_form->deal_id = $deal->id;
            $new_client_form->client_username= $client_details->client_username;
            $new_client_form->client_email= $client_details->client_email;
            $new_client_form->client_phone =$client_details->client_phone;
            $new_client_form->client_whatsapp= $client_details->client_whatsapp;
            $new_client_form->client_skypr= $client_details->client_skype;
            $new_client_form->client_telegram= $client_details->client_telegram;
            $new_client_form->client_messenger =$client_details->client_messenger;
            $new_client_form->client_imo= $client_details->client_imo;
            $new_client_form->message= $client_details->message;
            $new_client_form->timezone= $client_details->timezone;
            $new_client_form->day= $client_details->day;
            $new_client_form->checklist= $client_details->checklist;
            $new_client_form->save();
        }
        $deal_client->save();

       // dd("skdnaskdnkas");
        $contract = new Contract();
        $contract->id = $deal->id;
        $contract->deal_id = $deal->id;
        $contract->subject = $request->project_name;

        $contract->original_amount = $request->amount;
        $contract->actual_amount = $request->amount;
        //$deal->actual_amount=  $request->amount;
        $currency = Currency::where('id', $request->original_currency_id)->first();

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

        $project->completion_percent = 0;
        $project->deal_id = $deal->id;
        $project->added_by = Auth::id();
        $project->status = 'not started';
        $project->public = 0;
        $project->due = $deal->amount;


        if ($project->save()) {

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

        if ($existing_client != null) {
            // /dd("true");
            $find_pm_id = Project::where('client_id', $existing_client->id)->orderBy('id', 'desc')->where('id', '!=', $project->id)->where('pm_id', '!=', null)->first();

            $to = Carbon::createFromFormat('Y-m-d H:s:i', Carbon::now());
            $from = Carbon::createFromFormat('Y-m-d H:s:i', $find_pm_id->created_at);
            $diff_in_days = $from->diffInDays($to);

            // dd($diff_in_days, $find_pm_id);
            // if ($diff_in_days < 90) {
            //     $deal_pm_id = Deal::find($deal->id);
            //     $deal_pm_id->pm_id = $find_pm_id->pm_id;
            //     $deal_pm_id->save();
            //     $project_pm_id = Project::find($project->id);
            //     $project_pm_id->pm_id = $find_pm_id->pm_id;
            //     $project_pm_id->save();
            //     // dd($project_pm_id);

            //     $pmassign = new PMProject();
            //     $pmassign->project_id = $project->id;
            //     $pmassign->status = 'pending';
            //     $pmassign->pm_id = $find_pm_id->pm_id;
            //     $pmassign->deal_id = $deal->id;
            //     $pmassign->client_id = $existing_client->id;
            //     $pmassign->save();
            //     $pm_project_find = PMAssign::where('pm_id', $find_pm_id->pm_id)->first();
            //     $pm_project_update = PMAssign::find($pm_project_find->id);
            //     $pm_project_update->project_count = $pm_project_update->project_count + 1;
            //     $pm_project_update->amount = $pm_project_update->amount + ($deal->amount / 2);
            //     $pm_project_update->actual_amount = $pm_project_update->actual_amount + $deal->amount;
            //     $pm_project_update->monthly_project_count = $pm_project_update->monthly_project_count + 1;
            //     $pm_project_update->monthly_project_amount = $pm_project_update->monthly_project_amount + ($deal->amount / 2);
            //     $pm_project_update->monthly_actual_project_amount = $pm_project_update->monthly_actual_project_amount + $deal->amount;
            //     $pm_project_update->save();
            // }
            //fix pm to admin
            if ($diff_in_days < 90) {
                $deal_pm_id = Deal::find($deal->id);
                $deal_pm_id->pm_id = 62;
                $deal_pm_id->save();
                $project_pm_id = Project::find($project->id);
                $project_pm_id->pm_id = 62;
                $project_pm_id->save();
                // dd($project_pm_id);

                $pmassign = new PMProject();
                $pmassign->project_id = $project->id;
                $pmassign->status = 'pending';
                $pmassign->pm_id = 62;
                $pmassign->deal_id = $deal->id;
                $pmassign->client_id = $existing_client->id;
                $pmassign->save();
                // $pm_project_find = PMAssign::where('pm_id', $find_pm_id->pm_id)->first();
                // $pm_project_update = PMAssign::find($pm_project_find->id);
                // $pm_project_update->project_count = $pm_project_update->project_count + 1;
                // $pm_project_update->amount = $pm_project_update->amount + ($deal->amount / 2);
                // $pm_project_update->actual_amount = $pm_project_update->actual_amount + $deal->amount;
                // $pm_project_update->monthly_project_count = $pm_project_update->monthly_project_count + 1;
                // $pm_project_update->monthly_project_amount = $pm_project_update->monthly_project_amount + ($deal->amount / 2);
                // $pm_project_update->monthly_actual_project_amount = $pm_project_update->monthly_actual_project_amount + $deal->amount;
                // $pm_project_update->save();
            }

            //fix pm to admin
        }

        return response()->json([
            'status' => 'success',
            'redirectUrl' => route('dm-dealDetails', $deal->id)
        ]);
    }

    public function updateDmDealDetails(Request $request)
    {
            //    dd($request->all());
        $deal_hourly_checked = Deal::where('id', $request->id)->first();
        if ($deal_hourly_checked->project_type != 'hourly') {
            $validated = $request->validate([
                'project_name' => 'required',
                'deadline' => 'required',
                'amount' => 'required',
                'message_link' => 'required',
                'description2' => 'required',
                'description3' => 'required',
                'description5' => 'required',
                'description6' => 'required',
                'description7' => 'required',
                'description8' => 'required',
                'description9' => 'required',
                'deal_category' => 'required',
                'project_summary' => $request->has('project_summary') ? 'required' : '',
            ], [
                'project_name.required' => 'Please enter the project name!',
                'deadline.required' => 'Please select project deadline from Freelancer.com!',
                'amount.required' => 'Please enter the project budget!',
                'description2.required' => 'What in 2-8 words are missing, please write the what in 2-8 words here!',
                'description3.required' => 'What in 3-4 lines are missing, please elaborate the "WHAT" 3-4 lines here!',
                'description5.required' => 'Client\'s focus or concerning points are required. Please share as detailed explanation as you can!',
                'description6.required' => 'Login details are required. Please provide all the access details of the project!',
                'description7.required' => 'Logo files or Google drive link for logo files are required. Please provide all the access details of the project!',
                'description8.required' => 'To ensure all departments are aligned, we kindly request your confirmation on cross-departmental work for this project. Please let us know if cross-departmental work is involved or not.',
                'description9.required' => 'Notes for the project manager/technical team is required, please write if any notes for manager/technical team are available.',
                'deal_category.required' => 'This field is required!',
                'project_summary.required' => 'This field is required!',
            ]);
        } else {
            $validated = $request->validate([
                'project_name' => 'required',
                'estimated_hour_task' => 'required',
                'hourly_rate' => 'required',
                'hubstaff_tracking' => 'required',
                'tracked_hours' => 'required',
                'second_day_tracked_hours' => 'required',
                'expect_amount' => 'required',
                'certain_amount_hour' => 'required',
                'long_project' => 'required',
                'description2' => 'required',
                'description3' => 'required',
                'description5' => 'required',
                'description6' => 'required',
                'description7' => 'required',
                'description8' => 'required',
                'description9' => 'required',
                'deal_category' => 'required',
                'project_summary' => $request->has('project_summary') ? 'required' : '',
            ], [
                'project_name.required' => 'Please enter the project name!',
                'estimated_hour_task.required' => 'This field is required!',
                'hourly_rate.required' => 'This field is required!',
                'hubstaff_tracking.required' => 'This field is required!',
                'tracked_hours.required' => 'This field is required!',
                'second_day_tracked_hours.required' => 'This field is required!',
                'expect_amount.required' => 'This field is required!',
                'certain_amount_hour.required' => 'This field is required!',
                'long_project.required' => 'This field is required!',
                'description2.required' => 'What in 2-8 words are missing, please write the what in 2-8 words here!',
                'description3.required' => 'What in 3-4 lines are missing, please elaborate the "WHAT" 3-4 lines here!',
                'description5.required' => 'Client\'s focus or concerning points are required. Please share as detailed explanation as you can!',
                'description6.required' => 'Login details are required. Please provide all the access details of the project!',
                'description7.required' => 'Logo files or Google drive link for logo files are required. Please provide all the access details of the project!',
                'description8.required' => 'To ensure all departments are aligned, we kindly request your confirmation on cross-departmental work for this project. Please let us know if cross-departmental work is involved or not.',
                'description9.required' => 'Notes for the project manager/technical team is required, please write if any notes for manager/technical team are available.',
                'deal_category.required' => 'This field is required!',
                'project_summary.required' => 'This field is required!',
            ]);
        }
        //      dd("hello");
        $project_milestone = Project::where('deal_id', $request->id)->first();
        $milestone = ProjectMilestone::where('project_id', $project_milestone->id)->first();
        //      dd($milestone);
        $won_deal_id = Deal::where('id', $request->id)->first();
        if ($won_deal_id->project_type != 'hourly') {



            $milestone = ProjectMilestone::where('project_id', $project_milestone->id)->first();
            if ($milestone == null) {
                return response()->json([
                    "message" => "The given data was invalid.",
                    "errors" => [
                        "milestone_value" => [
                            "Milestone not found!!!."
                        ]
                    ]
                ], 422);
            }
        }


        DB::beginTransaction();

        try {
            // /dd($request);
            $deal = Deal::find($request->id);
            $deal->project_name = $request->project_name;
            $deal->deal_category = $request->deal_category;
            $deal->currency_id = 1;
            $deal->actual_amount =  $request->amount;
            $currency = Currency::where('id', $request->original_currency_id)->first();
            //dd($currency);
            $deal->amount = ($request->amount) / $currency->exchange_rate;
            $deal->organization = $request->organization;
            $deal->client_email = $request->client_email;
            // /  $deal->description = $request->description;
            $message_links = $request->message_link;
            // /dd($message_links);
            $value = '';

            if (is_array($message_links) || is_object($message_links)) {
                foreach ($message_links as $link) {
                    //dd($d['day']);
                    $value = $value  . $link . ' <br> ';
                }
            }
            $deal->deadline = $request->deadline;
            $deal->estimated_hour_task = $request->estimated_hour_task;
            $deal->hourly_rate = $request->hourly_rate;
            $deal->hubstaff_tracking = $request->hubstaff_tracking;
            $deal->tracked_hours = $request->tracked_hours;
            $deal->second_day_tracked_hours = $request->second_day_tracked_hours;
            $deal->expect_amount = $request->expect_amount;
            $deal->certain_amount_hour = $request->certain_amount_hour;
            $deal->long_project = $request->long_project;
            $deal->currency_id = $request->currency_id;
            $deal->message_link = $value;
            $deal->profile_link = $request->profile_link;
            $deal->description2 = $request->description2;
            $deal->description3 = $request->description3;
            $deal->description5 = $request->description5;
            $deal->description6 = $request->description6;
            $deal->description7 = $request->description7;
            $deal->description8 = $request->description8;
            $deal->description9 = $request->description9;
            $deal->updated_by = Auth::id();
            $deal->dept_status = 'DM';
            $deal->save();

            $project_id = Project::where('deal_id', $request->id)->first();
            $project = Project::find($project_id->id);
            $project->project_name = $request->project_name;

            $project->deadline = $request->deadline;
            $currency = Currency::where('id', $request->original_currency_id)->first();
            //dd($currency);
            $project->project_budget = ($request->amount) / $currency->exchange_rate;
            $project->due = $deal->amount;
            $project->currency_id = 1;
            $project->project_summary = $request->project_summary;
            $project->save();

            if ($deal->project_type == 'hourly') {

                $milestone = new ProjectMilestone();
                $milestone->project_id = $project->id;


                $milestone->currency_id = 1;
                $milestone->milestone_title = $project->project_name . '- InitialMilestone';

                $milestone->original_currency_id = $deal->original_currency_id;
                $milestone->cost = 0;

                $milestone->actual_cost = 0;

                $milestone->invoice_created = 0;
                $milestone->status = 'incomplete';
                $milestone->added_by = Auth::id();
                $milestone->last_updated_by = Auth::id();
                $milestone->milestone_type = 'Client Created this Milestone';
                //dd($milestone->actual_cost,$milestone->invoice_created,$milestone->status,$milestone->added_by,$milestone->last_updated_by, $milestone->milestone_type);

                $milestone->save();
                //  dd($milestone);


            }
            $contract_id = Contract::where('deal_id', $request->id)->first();
            $contract = Contract::find($contract_id->id);
            $contract->subject = $request->project_name;
            $contract->actual_amount = $request->amount;
            //$deal->actual_amount=  $request->amount;
            $currency = Currency::where('id', $request->original_currency_id)->first();

            $contract->amount = ($request->amount) / $currency->exchange_rate;
            $contract->original_amount = $request->amount;
            $contract->description = $request->description;
            $contract->currency_id = $request->currency_id;
            $contract->save();

            $client_id = User::where('id', $contract_id->client_id)->first();
            $client = User::find($client_id->id);
            $client->email = $request->client_email;
            $client->name = $request->client_name;
            $client->save();

            if ($deal->pm_id == null) {
                $lead_developer_id = RoleUser::where('role_id', 6)->get();
                //dd($lead_developer_id);
                foreach ($lead_developer_id as $lead) {
                    $lead_developer = new ProjectMember();
                    $lead_developer->user_id = $lead->user_id;
                    $lead_developer->project_id = $project->id;
                    $lead_developer->hourly_rate = 0;
                    $lead_developer->lead_developer_id = $lead->user_id;
                    $lead_developer->save();
                }

                // $pm_count = PMAssign::select('project_count')->min('project_count');
                // $pm_user = PMAssign::where('project_count', $pm_count)->first();
                // if ($deal->pm_id == null) {
                //     $pm_count = PMAssign::select('monthly_project_count')->where('status', 1)->min('monthly_project_count');
                //     $pm_user = PMAssign::where('monthly_project_count', $pm_count)->where('status', 1)->first();
                //     if ($pm_count < 2) {
                //         if ($pm_user != null) {
                //             $pmassign = new PMProject();
                //             $pmassign->project_id = $project->id;
                //             $pmassign->status = 'pending';
                //             $pmassign->pm_id = $pm_user->pm_id;
                //             $pmassign->deal_id = $deal->id;
                //             $pmassign->client_id = $client->id;
                //             $pmassign->save();
                //             $deal_assign = Deal::find($deal->id);
                //             $deal_assign->pm_id = $pm_user->pm_id;
                //             $deal_assign->save();
                //             $pm_assign_project = Project::find($project->id);
                //             $pm_assign_project->pm_id = $pmassign->pm_id;
                //             $pm_assign_project->save();
                //             //$email = $request->email;


                //             //  $pm_project= PMAssign::where('pm_id',$pm_id->pm_id)->first();
                //             $pm_project_find = PMAssign::where('pm_id', $pm_user->pm_id)->first();
                //             $pm_project_update = PMAssign::find($pm_project_find->id);
                //             $pm_project_update->project_count = $pm_project_update->project_count + 1;
                //             $pm_project_update->amount = $pm_project_update->amount + $deal->amount;
                //             $pm_project_update->monthly_project_count = $pm_project_update->monthly_project_count + 1;
                //             $pm_project_update->monthly_project_amount = $pm_project_update->monthly_project_amount + $deal->amount;
                //             $pm_project_update->actual_amount = $pm_project_update->actual_amount + $deal->amount;
                //             $pm_project_update->monthly_actual_project_amount = $pm_project_update->monthly_actual_project_amount + $deal->amount;
                //             $pm_project_update->save();
                //         }
                //     } else {
                //         $items = PMAssign::where('status', 1)->get();
                //         // $pm_amount = $items->min('amount');
                //         // $pm_count_id = $items->min('project_count');
                //         //
                //         // $pm_find_id = PMAssign::where('amount', $pm_amount)->first();
                //         // $pm_min_pro = PMAssign::where('project_count', $pm_count_id)->first();
                //         // $find_rest = PMAssign::where('project_count', $pm_count_id)->get();
                //         //
                //         // $fin_min = $find_rest->min('amount');
                //         //
                //         // $final_id = PMAssign::where('amount', $fin_min)->first();

                //         $pm_amount = $items->min('monthly_project_amount');
                //         $pm_count_id = $items->min('monthly_project_count');

                //         $pm_find_id = PMAssign::where('monthly_project_amount', $pm_amount)->first();
                //         $pm_min_pro = PMAssign::where('monthly_project_count', $pm_count_id)->first();
                //         $find_rest = PMAssign::where('monthly_project_count', $pm_count_id)->get();

                //         $fin_min = $find_rest->min('monthly_project_amount');

                //         $final_id = PMAssign::where('monthly_project_amount', $fin_min)->first();

                //         //  $exceptional =   $pm_count= PMAssign::select('project_count')->where('')->get();

                //         if ($pm_find_id->monthly_project_count + 1 <= $pm_count_id * 1.5) {
                //             $pmassign = new PMProject();
                //             $pmassign->project_id = $project->id;
                //             $pmassign->status = 'pending';
                //             $pmassign->deal_id = $deal->id;
                //             $pmassign->client_id = $client->id;
                //             $pmassign->pm_id = $pm_find_id->pm_id;
                //             $pmassign->save();
                //             $deal_assign = Deal::find($deal->id);
                //             $deal_assign->pm_id = $pm_find_id->pm_id;
                //             $deal_assign->save();
                //             $pm_assign_project = Project::find($project->id);
                //             $pm_assign_project->pm_id = $pmassign->pm_id;
                //             $pm_assign_project->save();

                //             //  $pm_project= PMAssign::where('pm_id',$pm_id->pm_id)->first();
                //             $pm_project_find = PMAssign::where('pm_id', $pm_find_id->pm_id)->first();
                //             $pm_project_update = PMAssign::find($pm_project_find->id);
                //             $pm_project_update->project_count = $pm_project_update->project_count + 1;
                //             $pm_project_update->amount = $pm_project_update->amount + $deal->amount;
                //             $pm_project_update->monthly_project_count = $pm_project_update->monthly_project_count + 1;
                //             $pm_project_update->monthly_project_amount = $pm_project_update->monthly_project_amount + $deal->amount;
                //             $pm_project_update->actual_amount = $pm_project_update->actual_amount + $deal->amount;
                //             $pm_project_update->monthly_actual_project_amount = $pm_project_update->monthly_actual_project_amount + $deal->amount;
                //             $pm_project_update->save();
                //         } else {
                //             $pmassign = new PMProject();
                //             $pmassign->project_id = $project->id;
                //             $pmassign->status = 'pending';
                //             $pmassign->deal_id = $deal->id;
                //             $pmassign->client_id = $client->id;
                //             $pmassign->pm_id = $final_id->pm_id;
                //             $pmassign->save();
                //             $deal_assign = Deal::find($deal->id);
                //             $deal_assign->pm_id = $final_id->pm_id;
                //             $deal_assign->save();
                //             $pm_assign_project = Project::find($project->id);
                //             $pm_assign_project->pm_id = $pmassign->pm_id;
                //             $pm_assign_project->save();

                //             //  $pm_project= PMAssign::where('pm_id',$pm_id->pm_id)->first();
                //             $pm_project_find = PMAssign::where('pm_id', $final_id->pm_id)->first();
                //             $pm_project_update = PMAssign::find($pm_project_find->id);
                //             $pm_project_update->project_count = $pm_project_update->project_count + 1;
                //             $pm_project_update->amount = $pm_project_update->amount + $deal->amount;
                //             $pm_project_update->monthly_project_count = $pm_project_update->monthly_project_count + 1;
                //             $pm_project_update->monthly_project_amount = $pm_project_update->monthly_project_amount + $deal->amount;
                //             $pm_project_update->actual_amount = $pm_project_update->actual_amount + $deal->amount;
                //             $pm_project_update->monthly_actual_project_amount = $pm_project_update->monthly_actual_project_amount + $deal->amount;
                //             $pm_project_update->save();
                //         }
                //     }
                // }

                //fix pm to admin
                if ($deal->pm_id == null) {



                            $pmassign = new PMProject();
                            $pmassign->project_id = $project->id;
                            $pmassign->status = 'pending';
                            $pmassign->pm_id = 62;
                            $pmassign->deal_id = $deal->id;
                            $pmassign->client_id = $client->id;
                            $pmassign->save();
                            $deal_assign = Deal::find($deal->id);
                            $deal_assign->pm_id = 62;
                            $deal_assign->save();
                            $pm_assign_project = Project::find($project->id);
                            $pm_assign_project->pm_id = 62;
                            $pm_assign_project->save();
                            //$email = $request->email;

                }

                //fix pm to admin

                $deal_pm_id = Deal::where('id', $request->id)->first();
                $project_id = Project::where('deal_id', $deal_pm_id->id)->first();
                $project_admin_update = Project::find($project_id->id);
                $project_admin_update->added_by = 62;
                $project_admin_update->project_admin = 62;
                $project_admin_update->save();

                $qualified_sale = new QualifiedSale();
                $qualified_sale->project_name = $deal->project_name;

                $qualified_sale->deal_id = $deal->id;
                $qualified_sale->project_id = $project->id;
                $qualified_sale->deal_short_code = $deal->deal_id;
                $qualified_sale->date = Carbon::now();
                $qualified_sale->client_id = $deal->client_id;
                $qualified_sale->client_name = $deal->client_name;
                $qualified_sale->pm_id = 62;
                $qualified_sale->pm_name = "Abu Sayeed";

                $qualified_sale->amount = $deal->amount;

                $qualified_sale->save();
                // /dd($qualified_sale);



                if ($deal->project_type == 'fixed') {
                    $user = User::where('id', $deal_pm_id->pm_id)->first();
                    Notification::send($user, new WonDealNotification($deal));
                }else{
                    Notification::send($user, new HourlyDealNotification($deal));
                }
                $users = User::where('role_id', 8)->get();

                foreach ($users as $key => $user) {
                    //start authorization action
                    // $authorization_action = new AuthorizationAction();
                    // $authorization_action->model_name = $deal->getMorphClass();
                    // $authorization_action->model_id = $deal->id;
                    // $authorization_action->type = 'saleslead_price_authorization';
                    // $authorization_action->deal_id = $project_id->deal_id;
                    // $authorization_action->project_id = $project_id->id;
                    // $authorization_action->link = route('authorization_request', $project_id->deal_id);
                    // $authorization_action->title = 'Sales Lead Price Authorization';
                    // $authorization_action->authorization_for = $user->id;
                    // $authorization_action->save();
                    // dd($authorization_action);
                    //end authorization action


                    Notification::send($user, new DealAuthorizationSendNotification($deal, Auth::user()));

                    $this->triggerPusher('notification-channel', 'notification', [
                        'user_id' => $user->id,
                        'role_id' => $user->role_id,
                        'title' => 'Price authorization request from ' . Auth::user()->name,
                        'body' => Auth::user()->name . ' send price authorization request for ' . $deal->project_name,
                        'redirectUrl' => route('deals.show', $project_id->deal_id)
                    ]);
                }
                $project_member = new ProjectMember();
                $project_member->user_id = Auth::id();
                $project_member->added_by = Auth::id();
                $project_member->project_id = $project->id;
                $project_member->save();
                // dd("true");

                //start authorization action
                // $authorization_action = new AuthorizationAction();
                // $authorization_action->model_name = $deal->getMorphClass();
                // $authorization_action->model_id = $deal->id;
                // $authorization_action->type = 'project_manager_accept_project';
                // $authorization_action->deal_id = $project_id->deal_id;
                // $authorization_action->project_id = $project_id->id;
                // $authorization_action->link = route('projects.edit', $project_id->id);
                // $authorization_action->title = 'Project manager accept Project';
                // $authorization_action->authorization_for = $project_id->pm_id;
                // $authorization_action->save();
                //dd($authorization_action);
                // $check_new_pm= User::where('id',$deal->pm_id)->first();
                // $new_pm = EmployeeDetails::where('user_id',$check_new_pm->id)->first();
                // $to = Carbon::createFromFormat('Y-m-d H:s:i', Carbon::now());

                // $from = Carbon::createFromFormat('Y-m-d H:s:i', $new_pm->joining_date);

                // $diff_in_days = $from->diffInDays($to);
                // if($diff_in_days < 30)
                // {
                //     $startOfWeek = Carbon::now()->startOfWeek();
                //     $endOfWeek = Carbon::now()->endOfWeek();
                //     $new_pm_project_count= Project::where('pm_id',$new_pm->user_id)->where('created_at',[$startOfWeek, $endOfWeek])->count();
                //     if($new_pm_project_count > 1)
                //     {
                //         $new_pm_assign = PMAssign::where('pm_id',$new_pm->user_id)->first();
                //         $new_pm_status= PMAssign::find($new_pm_assign->id);
                //         $new_pm_status->status = 0;
                //         $new_pm_status->save();
                //     }

                // }





                //  Mail::to($test->email)->send(new WonDealMail($project));
                //   $users= User::where('role_id',1)->get();
                //   foreach ($users as $usr) {
                //     Mail::to($usr->email)->send(new WonDealMail($project_id));
                //   }



            }
            // $deal= Deal::find($deal->id);
            //         $deal->authorization_status= 2;
            //         $deal->save();
            //         $sender= User::where('id',Auth::id())->first();
            //         $users= User::where('role_id',8)->orWhere('role_id',1)->get();

            //         foreach ($users as $key => $user) {
            //            // Notification::send($users, new DealAuthorizationSendNotification($deal,$sender));
            //             $this->triggerPusher('notification-channel', 'notification', [
            //                 'user_id' => $user->id,
            //                 'role_id' => $user->role_id,
            //                 'title' => 'Price authorization request from '.$sender->name,
            //                 'body' => $sender->name. ' send price authorization request for '.$deal->project_name,
            //                 'redirectUrl' => route('deals.show',$deal->id)
            //             ]);
            //         }
            // if(Auth::user()->role_id==4){
            //     $project_member = new ProjectMember();
            //     $project_member->user_id = Auth::id();
            //     $project_member->added_by = Auth::id();
            //     $project_member->project_id = $project->id;
            //     $project_member->save();
            // }

            DB::commit();
            // all good
        } catch (\Exception $e) {
            DB::rollback();
            Toastr::error('Something went wrong', 'Error', ["positionClass" => "toast-top-right", 'redirectUrl']);
            return back();
            // something went wrong
        }

        return response()->json(['message' => 'Deal Updated Successfully']);
    }
    public function dmDealUrl($id)
    {
        $this->pageTitle = 'Client Submission Information';
        $this->middleware(function ($request, $next) {
            abort_403(!in_array('contracts', $this->user->modules));
            return $next($request);
        });
        $deal = Deal::where('id', $id)->first();
        $client = ClientForm::where('deal_id', $deal->id)->first();

        return view('dm-contracts.dealurl', compact('deal', 'client'), $this->data);
    }

    public function dm_award_time_increase_index()
    {
        if ($this->user->role_id == 1) {
            $this->award_time_request = AwardTimeIncress::where('status', '0')->orderBy('id', 'desc')->get();
            return view('dm-contracts.award_time_extention', $this->data);
        } else {
            abort(403);
        }
    }

    public function dm_award_time_incress_store(Request $request)
    {
        $data = new AwardTimeIncress();
        $data->request_from = Auth::id();
        $data->deal_id = $request->id;
        $data->incress_hours = $request->hours;
        $data->pm_comment = $request->description;
        $data->dept_status = 'DM';

        if ($data->save()) {

            $authorization_action = new AuthorizationAction();
            $authorization_action->model_name = $data->getMorphClass();
            $authorization_action->model_id = $data->id;
            $authorization_action->type = 'award_time_extension';
            $authorization_action->deal_id = $data->deal_id;
            $project= Project::where('deal_id',$data->deal_id)->first();
            $authorization_action->project_id = $project->id;
            $authorization_action->link = route('deals.show', $data->id);
            $authorization_action->title = 'Won deal award time extension';
            $authorization_action->authorization_for = 62;
            $authorization_action->save();

            return response()->json([
                'status' => 'success'
            ]);
        }
    }

    public function dm_award_time_incress_update(Request $request)
    {
        $deal = Deal::find($request->id);
//    / dd($deal->id);
        if ($deal) {
            $mode = '0';
            if ($request->mode == 'approve') {
                $mode = '1';
                //$total_secoends = 20 * 60 * 60;
                $second_left = Carbon::now()->diffInSeconds($deal->award_time);
                //$total_secoend_left = $total_secoends - $secoend_left;

                $request_seconds = $request->hours * 60 * 60;
              //  $total_seconds= $second_left;
               // dd($second_left+$request_seconds);
                $old_award_time = $deal->award_time;
                //$original_format = 'Y-m-d H:i:s'; // Change this format to match the format of $deal->award_time




                $award_time = Carbon::now()->addHours($request->hours);
                $award_time= $award_time->addHours(-20);
              //  dd($award_time);

               // dd($second_left);
                if ($deal->status =='Denied') {
                    $deal->award_time = $award_time;
                    $deal->old_award_time = $old_award_time;
                  //  dd("false",$deal->award_time);
                } elseif($deal->status =='pending') {
                    $deal->award_time = $award_time;
                    $deal->old_award_time = $old_award_time;
                    //dd("true",$deal->award_time);
                }
               // dd($deal->award_time);
                $deal->status= 'pending';

                $deal->save();
                $project_id = Project::where('deal_id',$deal->id)->first();
                $project= Project::find($project_id->id);
                $project->project_status = 'pending';
                $project->status = 'not started';
                $project->save();

            } elseif ($request->mode == 'reject') {
                $mode = '2';
            }

            if ($mode != '0') {
                $award_time_request = AwardTimeIncress::find($request->request_id);
                $award_time_request->admin_comment = $request->description;
                $award_time_request->approved_by = $this->user->id;
                $award_time_request->status = $mode;
                if ($award_time_request->save()) {
                    return response()->json([
                        'status' => 'success'
                    ]);
                }
            }
        }
    }
}
