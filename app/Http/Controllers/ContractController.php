<?php

namespace App\Http\Controllers;

use App\DataTables\WonDealsDataTable;
use App\Events\ContractSignedEvent;
use App\Helper\Files;
use App\Helper\Reply;
use App\Http\Requests\Admin\Contract\StoreRequest;
use App\Http\Requests\Admin\Contract\UpdateRequest;
use App\Http\Requests\ClientContracts\SignRequest;
use App\Models\Contract;
use App\Models\ContractSign;
use App\Models\ContractTemplate;
use App\Models\ContractType;
use App\Models\Currency;
use App\Models\kpiSettingGenerateSale;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use App\Models\ContractCustomForm;
use App\Traits\CustomFieldsTrait;
use App\Models\CustomField;
use App\Models\CustomFieldData;
use App\Models\RoleUser;
use App\Models\Deal;
use Illuminate\Support\Facades\Redirect;
use App\Models\Project;
use App\Models\PMProject;
use App\Models\PMAssign;
use Auth;
use Crypt;
use App\Models\ClientForm;
use App\Models\ClientDetails;
use App\Models\DealStage;
use App\Models\Lead;
use App\Models\ProjectMember;
use App\Models\ProjectMilestone;
use Illuminate\Support\Facades\Validator;
use App\Models\SalesCount;
use Mail;
use App\Mail\WonDealMail;
use App\Models\Country;

use Toastr;
use Exception;
use App\Models\EmployeeDetails;
use App\Notifications\DealAuthorizationSendNotification;
use Notification;
use App\Models\kpiSetting;
use App\Models\CashPoint;
use App\Models\LeadsDealsActivityLog;
use App\Models\DealStageChange;


class ContractController extends AccountBaseController
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

    public function index(WonDealsDataTable $dataTable)
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

        return $dataTable->render('contracts.index', $this->data);
    }

    public function applyQuickAction(Request $request)
    {
        if ($request->action_type == 'delete') {
            $this->deleteRecords($request);
            return Reply::success(__('messages.deleteSuccess'));
        }

        return Reply::error(__('messages.selectAction'));
    }

    protected function deleteRecords($request)
    {
        abort_403(user()->permission('delete_contract') !== 'all');

        Contract::whereIn('id', explode(',', $request->row_ids))->delete();
        return true;
    }

    public function destroy($id)
    {
        $contract = Contract::findOrFail($id);
        $this->deletePermission = user()->permission('delete_contract');

        abort_403(
            !(
                $this->deletePermission == 'all' ||
                ($this->deletePermission == 'added' && user()->id == $contract->added_by) ||
                ($this->deletePermission == 'owned' && user()->id == $contract->client_id) ||
                ($this->deletePermission == 'both' && (user()->id == $contract->client_id || user()->id == $contract->added_by))
            )
        );

        Contract::destroy($id);
        return Reply::success(__('messages.contactDeleted'));
    }

    public function create()
    {
        $this->addPermission = user()->permission('add_contract');

        abort_403(!in_array($this->addPermission, ['all', 'added']));

        $this->contractId = request('id');
        $this->contract = null;

        if ($this->contractId != '') {
            $this->contract = Contract::findOrFail($this->contractId);
        }

        $this->templates = ContractTemplate::all();
        $this->clients = User::allClients();
        $this->contractTypes = ContractType::all();
        $this->currencies = Currency::all();
        $contract = new ContractCustomForm();

        if (!empty($contract->getCustomFieldGroupsWithFields())) {
            $this->fields = $contract->getCustomFieldGroupsWithFields()->fields;
        }

        $this->contractTemplate = request('template') ? ContractTemplate::findOrFail(request('template')) : null;

        if (request()->ajax()) {
            $this->pageTitle = __('app.add') . ' ' . __('app.menu.contract');
            $html = view('contracts.ajax.create', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'contracts.ajax.create';
        return view('contracts.create', $this->data);
    }

    // Custom module for seopage 1 to store deals

    public function ClientFormSubmit(Request $request)
    {
        //dd($request);
        $deal = Deal::find($request->id);
        if ($deal->submission_status != "Submitted") {
          $deal->submission_status = 'Awaiting for client Response';
          $deal->save();
        }

        return Redirect::back()->with('messages.contractAdded');
    }
    public function deleteDeal($id)
    {
        $deal = Deal::findOrFail($id)->delete();
        $notification = [
            'message' => 'Deal Deleted !!!',
            'alert-type' => 'success',
        ];
        return Redirect()
            ->back()
            ->with($notification);
    }

    public function dealdetails($id)
    {
        $this->pageTitle = 'Add Deal Details';
        $this->middleware(function ($request, $next) {
            abort_403(!in_array('contracts', $this->user->modules));
            return $next($request);
        });
        $deal = Deal::where('id', $id)->first();

        return view('contracts.dealdetails', $this->data, compact('deal'));
    }
    public function dealdetailsedit($id)
    {
        $this->pageTitle = 'Edit Deal Details';
        $this->middleware(function ($request, $next) {
            abort_403(!in_array('contracts', $this->user->modules));
            return $next($request);
        });
        $deal = Deal::where('id', $id)->first();

        return view('contracts.editdealdetails', $this->data, compact('deal'));
    }
    public function storeDeal(Request $request)
    {
        $current_time= Carbon::now()->format('d-m-Y H:i:s' );
        $award_date= strtotime($request->award_time);
        $aw_dt= date('Y-m-d H:i:s', $award_date );
        //dd($aw_dt);
        $validate = $request->validate([
            'user_name' => 'required',
            'client_name' => 'required',
            'project_name' => 'required',
            'amount' => 'required',
            'award_time' => 'required|date|before:'.$current_time,
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


        $existing_client= User::where('user_name',$request->user_name)->first();
        $chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        $suffle = substr(str_shuffle($chars), 0, 6);
        $deal = new Deal();
        $deal->deal_id = 'DSEOP1' . $suffle;
        $deal->project_name = $request->project_name;
        $deal->currency_id= 1;
        $deal->actual_amount=  $request->amount;
        $currency= Currency::where('id',$request->original_currency_id)->first();
        //dd($currency);
        $deal->award_time= $aw_dt;
        $deal->amount = ($request->amount)/$currency->exchange_rate;
        $deal->client_name = $request->client_name;
        $deal->client_username = $request->user_name;
        $deal->added_by = Auth::id();
        //$date= Carbon::now();
        $deal->original_currency_id= $request->original_currency_id;
        $date = date('Y-m-d H:i:s');

        $newDate = \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $date)
        ->format('Y-m-d');

        //dd($newDate);

        $deal->deal_creation_date = $newDate;

        $deal->start_date = $newDate;
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
            $user->login= 'disable';
            $user->email_notifications = 0;
            $country= Country::where('nicename',$request->country)->first();
            $user->country_id= $country->id;
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
        $deal_client->save();

        $contract = new Contract();
        $contract->id = $deal->id;
        $contract->deal_id = $deal->id;
        $contract->subject = $request->project_name;

        $contract->original_amount = $request->amount;
        $contract->actual_amount = $request->amount;
        //$deal->actual_amount=  $request->amount;
        $currency= Currency::where('id',$request->original_currency_id)->first();

        $contract->amount = ($request->amount)/$currency->exchange_rate;
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


        $currency= Currency::where('id',$request->original_currency_id)->first();
        //dd($currency);
        $project->project_budget = ($request->amount)/$currency->exchange_rate;

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

        if($existing_client != null) {
            // /dd("true");
            $find_pm_id = Project::where('client_id',$existing_client->id)->orderBy('id','desc')->where('id','!=',$project->id)->where('pm_id','!=',null)->first();

            $to = Carbon::createFromFormat('Y-m-d H:s:i', Carbon::now());
            $from = Carbon::createFromFormat('Y-m-d H:s:i', $find_pm_id->created_at);
            $diff_in_days = $from->diffInDays($to);
            
            // dd($diff_in_days, $find_pm_id);
            if ($diff_in_days < 90) {
                $deal_pm_id = Deal::find($deal->id);
                $deal_pm_id->pm_id = $find_pm_id->pm_id;
                $deal_pm_id->save();
                $project_pm_id= Project::find($project->id);
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
                $pm_project_update->amount = $pm_project_update->amount + ($deal->amount /2);
                $pm_project_update->actual_amount = $pm_project_update->actual_amount + $deal->amount;
                $pm_project_update->monthly_project_count = $pm_project_update->monthly_project_count + 1;
                $pm_project_update->monthly_project_amount = $pm_project_update->monthly_project_amount + ($deal->amount/2);
                $pm_project_update->monthly_actual_project_amount = $pm_project_update->monthly_actual_project_amount + $deal->amount;
                $pm_project_update->save();
            }

        }

        return response()->json([
            'status' => 'success',
            'redirectUrl' => route('dealDetails', $deal->id)
        ]);
    }
    public function storeLeadDeal(Request $request)
    {
        \DB::beginTransaction();
        $current_time= Carbon::now()->format('d-m-Y H:i:s' );
        $award_date= strtotime($request->award_time);
        $aw_dt= date('Y-m-d H:i:s', $award_date );

        $validated = $request->validate([
//            'user_name' => 'required',
            'client_name' => 'required',
//            'project_name' => 'required',
            'amount' => 'required|min:1',

            // 'current_time' => 'date|date_format:d-m-Y H:i A',
            'award_time' => 'required|date|before:'.$current_time,
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
        $value= '';

        if (is_array($message_links) || is_object($message_links)) {
            foreach ($message_links as $link) {
                //dd($d['day']);
                $value= $value  . $link .' <br> ';

            }
        }
        $existing_client= User::where('user_name',$request->user_name)->first();
        $chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        $suffle = substr(str_shuffle($chars), 0, 6);
        $deal = new Deal();
        $deal->deal_id = $request->deal_id;
        $deal->project_name = $request->project_name;
        $deal->profile_link= $request->profile_link;
        $deal->message_link= $value;
        $deal->original_currency_id= $request->original_currency_id;
        $deal->currency_id= 1;
        $deal->actual_amount=  $request->amount;
        $currency= Currency::where('id',$request->original_currency_id)->first();
        //  dd($currency);
        $deal->amount = ($request->amount)/$currency->exchange_rate;
        $deal->client_name = $request->client_name;
        $deal->client_username = $request->user_name;
        $deal->lead_id = $request->lead_id;
        $deal->added_by = Auth::id();
        //$date= Carbon::now();

        $date = date('Y-m-d H:i:s');

        $newDate = \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $date)->format('Y-m-d');

        //dd($newDate);

        $deal->deal_creation_date = $newDate;
        $deal->award_time= $aw_dt;

        $deal->start_date = $newDate;
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

        $user_name= User::where('user_name',$request->user_name)->first();
        if ($user_name == null) {
            if($lead != null)
            {
                $country= Country::where('nicename',$lead->country)->first();
            }

            $user = new User();
            $user->name = $request->client_name;
            $user->user_name = $request->user_name;
            $user->login= 'disable';
            $user->email_notifications = 0;
            if($lead != null)
            {
                $user->country_id= $country->id;
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
            $user= $user_name;
        }




        $deal_client = Deal::find($deal->id);
        $deal_client->client_id = $user->id;
        $deal_client->save();

        $contract = new Contract();
        $contract->id = $deal->id;
        $contract->deal_id = $deal->id;
        $contract->subject = $request->project_name;
        $contract->original_amount = $request->amount;
        //$deal->actual_amount=  $request->amount;
        $currency= Currency::where('id',$request->original_currency_id)->first();
        $contract->actual_amount = $request->amount;
        $contract->amount = ($request->amount)/$currency->exchange_rate;

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
        $currency= Currency::where('id',$request->original_currency_id)->first();
        //dd($currency);
        $project->project_budget = ($request->amount)/$currency->exchange_rate;
        $project->due = $deal->amount;

        $project->completion_percent = 0;
        $project->deal_id = $deal->id;
        $project->added_by = Auth::id();
        $project->status = 'not started';
        $project->public = 0;
        $project->save();
       

        if($existing_client != null)
        {
            // /dd("true");
           
            $find_pm_id = Project::where('client_id',$existing_client->id)->orderBy('id','desc')->where('id','!=',$project->id)->where('pm_id','!=',null)->first();
            $to = Carbon::createFromFormat('Y-m-d H:s:i', Carbon::now());

                $from = Carbon::createFromFormat('Y-m-d H:s:i', $find_pm_id->created_at);

                $diff_in_days = $from->diffInDays($to);
               // dd($diff_in_days, $find_pm_id);
                if ($diff_in_days < 90) {
                    $deal_pm_id = Deal::find($deal->id);
                    $deal_pm_id->pm_id = $find_pm_id->pm_id;
                    $deal_pm_id->save();
                    $project_pm_id= Project::find($project->id);
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
                    $pm_project_update->amount = $pm_project_update->amount + ($deal->amount /2);
                    $pm_project_update->actual_amount = $pm_project_update->actual_amount + $deal->amount;
                    $pm_project_update->monthly_project_count = $pm_project_update->monthly_project_count + 1;
                    $pm_project_update->monthly_project_amount = $pm_project_update->monthly_project_amount + ($deal->amount/2);
                    $pm_project_update->monthly_actual_project_amount = $pm_project_update->monthly_actual_project_amount + $deal->amount;
                    $pm_project_update->save();

         
                }
           
        }

        if($existing_client != null)
        {
            $find_pm_id = Project::where('client_id',$existing_client->id)->orderBy('id','desc')->where('id','!=',$project->id)->where('pm_id','!=',null)->first();

            $to = Carbon::createFromFormat('Y-m-d H:s:i', Carbon::now());
            $from = Carbon::createFromFormat('Y-m-d H:s:i', $find_pm_id->created_at);
            $diff_in_days = $from->diffInDays($to);

            // dd($diff_in_days, $find_pm_id);
            if ($diff_in_days < 90) {
                $deal_pm_id = Deal::find($deal->id);
                $deal_pm_id->pm_id = $find_pm_id->pm_id;
                $deal_pm_id->save();
                $project_pm_id= Project::find($project->id);
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
                $pm_project_update->amount = $pm_project_update->amount + ($deal->amount /2);
                $pm_project_update->actual_amount = $pm_project_update->actual_amount + $deal->amount;
                $pm_project_update->monthly_project_count = $pm_project_update->monthly_project_count + 1;
                $pm_project_update->monthly_project_amount = $pm_project_update->monthly_project_amount + ($deal->amount/2);
                $pm_project_update->monthly_actual_project_amount = $pm_project_update->monthly_actual_project_amount + $deal->amount;
                $pm_project_update->save();
            }
        }

      
        // activity log
        $user = Auth::user();
        $text = $user->getRole->name.' '.$user->name.' - Closed Deal ('.$deal->project_name.') for '.$deal->actual_amount.'$ (Client: '.$deal->client_name.')';
        $link = '<a href="'.route('deals.show', $deal->id).'">'.$text.'</a>';   
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
            'redirectUrl' => route('dealDetails', $deal->id)
        ]);
    }
    public function Milestone($id)
    {
        $milestones = ProjectMilestone::where('project_id', $id)->get();
        return response()->json([
            'milestones' => $milestones,
        ]);
    }
    public function storeMilestone(Request $request)
    {
//        dd($request->all());
        $total_value = $request->input('another_value') * 2;

        $project = Project::where('id', $request->project_id)->first();
        $deal= Deal::where('id',$project->deal_id)->first();
        $milestone_amount = ProjectMilestone::where('project_id', $project->id)->sum('actual_cost');
        $check = ($deal->actual_amount) - ($milestone_amount);
        // /dd($check);

        // $request->validate([
        //     'input_value' => 'required|numeric|max:' . $another_value,
        // ]);

        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'cost' => 'required|numeric|max:' . $check,

            'project_id' => 'required',

        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        } else {
            $milestone = new ProjectMilestone();
            $milestone->milestone_title = $request->title;
            $milestone->project_id = $request->project_id;
            $milestone->milestone_type = $request->milestone_type;

            $milestone->actual_cost=  $request->cost;
            $project= Project::where('id',$request->project_id)->first();
            $deal= Deal::where('id',$project->deal_id)->first();
            //dd($deal);
            $milestone->original_currency_id = $deal->original_currency_id;
            $currency= Currency::where('id',$deal->original_currency_id)->first();
            //dd($currency);
            $milestone->cost = ($request->cost)/$currency->exchange_rate;
            $milestone->summary = $request->summary;
            $milestone->currency_id = 1;


            $milestone->save();
            return response()->json([
                'status' => 200,
                'message' => 'Milestone Added Successfully',
            ]);
        }
    }
    public function editMilestone($id)
    {
      $milestone= ProjectMilestone::find($id);
      if($milestone)
      {
        return response()->json([
            'status' => 200,
            'milestone' => $milestone,
        ]);
      }else {
        return response()->json([
            'status' => 404,
            'message' => 'Milestone Not Found',
        ]);
      }

    }
    public function updateMilestone(Request $request, $id)
    {
//        dd($request->all());

        $projectmilestone = ProjectMilestone::where('id', $id)->first();
        $project_id = Project::where('id', $projectmilestone->project_id)->first();
        $deal= Deal::where('id',$project_id->deal_id)->first();
        $milestone_amount = ProjectMilestone::where('project_id', $project_id->id)->sum('actual_cost');
        $updated_amount= $milestone_amount - $projectmilestone->actual_cost;
        $check = ($deal->actual_amount) - ($updated_amount);
        //dd($check,$projectmilestone->actual_cost);

      $validator = Validator::make($request->all(), [
          'title' => 'required',
          'cost' => 'required|numeric|max:' . $check,


      ]);
      if ($validator->fails()) {
          return response()->json([
              'status' => 400,
              'errors' => $validator->messages(),
          ]);
      } else {
          $milestone = ProjectMilestone::find($id);
          //dd($id);
          if($milestone)
          {

                      $milestone->milestone_title = $request->title;

                      $milestone->actual_cost=  $request->cost;
                      $project= Project::where('id',$milestone->project_id)->first();
                      $deal= Deal::where('id',$project->deal_id)->first();
                      //dd($deal);
                      $milestone->original_currency_id = $deal->original_currency_id;
                      $currency= Currency::where('id',$deal->original_currency_id)->first();
                      //dd($currency);
                      $milestone->cost = ($request->cost)/$currency->exchange_rate;
                      $milestone->summary = $request->summary;
                      $milestone->currency_id = 1;
                      $milestone->milestone_type = $request->milestone_type;

                      $milestone->update();
                      return response()->json([
                          'status' => 200,
                          'message' => 'Milestone Updated Successfully',
                      ]);
          }else {
            return response()->json([
                'status' => 404,
                'message' => 'Milestone Not Found',
            ]);
          }


      }
    }

    public function deleteMilestone($id)
    {
    $milestone= ProjectMilestone::find($id);
    $milestone->delete();
    return response()->json([
        'status' => 200,
        'message' => 'Milestone Deleted Successfully',
    ]);

    }
    public function storedealDetails(Request $request)
    {
        //dd($request->all());
        $validated = $request->validate([
            'project_name' => 'required',
            'deadline' => 'required',
            'amount' => 'required',
            'description2' => 'required',
            'description3' => 'required',
            'description4' => 'required',
            'description5' => 'required',
            'description6' => 'required',
            'description7' => 'required',
            'description8' => 'required',
            'description9' => 'required',
        ], [
            'project_name.required' => 'Please enter the project name!',
            'deadline.required' => 'Please select project deadline from Freelancer.com!',
            'amount.required' => 'Please enter the project budget!',
            'description2.required' => 'What in 2-8 words are missing, please write the what in 2-8 words here!',
            'description3.required' => 'What in 3-4 lines are missing, please elaborate the "WHAT" 3-4 lines here!',
            'description4.required' => 'This field is required. Please provide reference websites and what the references are for here!',
            'description5.required' => 'Client\'s focus or concerning points are required. Please share as detailed explanation as you can!',
            'description6.required' => 'Login details are required. Please provide all the access details of the project!',
            'description7.required' => 'Logo files or Google drive link for logo files are required. Please provide all the access details of the project!',
            'description8.required' => 'To ensure all departments are aligned, we kindly request your confirmation on cross-departmental work for this project. Please let us know if cross-departmental work is involved or not.',
            'description9.required' => 'Notes for the project manager/technical team is required, please write if any notes for manager/technical team are available.',
        ]);
        //dd("hello");
        $project_milestone= Project::where('deal_id',$request->id)->first();
        $milestone= ProjectMilestone::where('project_id',$project_milestone->id)->first();
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
        DB::beginTransaction();

                  try {
                    $deal = Deal::find($request->id);
                    $deal->project_name = $request->project_name;
                    $deal->currency_id= 1;
                    $deal->actual_amount=  $request->amount;
                    $currency= Currency::where('id',$request->original_currency_id)->first();
                    //dd($currency);
                    $deal->amount = ($request->amount)/$currency->exchange_rate;
                    $deal->organization = $request->organization;
                    $deal->client_email = $request->client_email;
                  //  $deal->description = $request->description;
                    // $deal->pipeline_stage = $request->pipeline_stage;
                    $message_links = $request->message_link;
                    // /dd($message_links);
                    $value= '';

                    if (is_array($message_links) || is_object($message_links)) {
                      foreach ($message_links as $link) {
                        //dd($d['day']);
                        $value= $value  . $link .' <br> ';

                      }
                    }
                    $deal->deadline = $request->deadline;
                    $deal->currency_id = $request->currency_id;
                    $deal->message_link = $value;
                    $deal->profile_link = $request->profile_link;
                    $deal->description2 = $request->description2;
                    $deal->description3 = $request->description3;
                    $deal->description4 = $request->description4;
                    $deal->description5 = $request->description5;
                    $deal->description6 = $request->description6;
                    $deal->description7 = $request->description7;
                    $deal->description8 = $request->description8;
                    $deal->description9 = $request->description9;
                    $deal->save();
                    $project_id = Project::where('deal_id', $request->id)->first();
                    $project = Project::find($project_id->id);
                    $project->project_name = $request->project_name;
                    $project->project_summary = $request->description;
                    $project->deadline = $request->deadline;

                    $currency= Currency::where('id',$request->original_currency_id)->first();
                    //dd($currency);
                    $project->project_budget = ($request->amount)/$currency->exchange_rate;
                    $project->due = $deal->amount;
                    $project->currency_id = 1;
                    $project->save();


                      //for testing purpose
                      // $ceo= User::where('id',62)->first();
                      //   Mail::to($ceo->email)->send(new WonDealMail($project));
                    $contract_id = Contract::where('deal_id', $request->id)->first();
                    $contract = Contract::find($contract_id->id);
                    $contract->subject = $request->project_name;
                    $contract->actual_amount = $request->amount;
                    //$deal->actual_amount=  $request->amount;
                    $currency= Currency::where('id',$request->original_currency_id)->first();

                    $contract->amount = ($request->amount)/$currency->exchange_rate;
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
                    if($deal->pm_id == null)
                    {
                        $pm_count = PMAssign::select('monthly_project_count')->where('status',1)->min('monthly_project_count');
                        $pm_user = PMAssign::where('monthly_project_count', $pm_count)->where('status',1)->first();
                        if ($pm_count < 2) {
                            if ($pm_user != null) {
                                $pmassign = new PMProject();
                                $pmassign->project_id = $project->id;
                                $pmassign->status = 'pending';
                                $pmassign->pm_id = $pm_user->pm_id;
                                $pmassign->deal_id = $deal->id;
                                $pmassign->client_id = $client->id;
                                $pmassign->save();
                                $deal_assign = Deal::find($deal->id);
                                $deal_assign->pm_id = $pm_user->pm_id;
                                $deal_assign->save();
                                $pm_assign_project = Project::find($project->id);
                                $pm_assign_project->pm_id = $pmassign->pm_id;
                                $pm_assign_project->save();
                                //$email = $request->email;
    
    
                                //  $pm_project= PMAssign::where('pm_id',$pm_id->pm_id)->first();
                                $pm_project_find = PMAssign::where('pm_id', $pm_user->pm_id)->first();
                                $pm_project_update = PMAssign::find($pm_project_find->id);
                                $pm_project_update->project_count = $pm_project_update->project_count + 1;
                                $pm_project_update->amount = $pm_project_update->amount + $deal->amount;
                                $pm_project_update->actual_amount = $pm_project_update->actual_amount + $deal->amount;
                                $pm_project_update->monthly_project_count = $pm_project_update->monthly_project_count + 1;
                                $pm_project_update->monthly_project_amount = $pm_project_update->monthly_project_amount + $deal->amount;
                                $pm_project_update->actual_amount = $pm_project_update->actual_amount + $deal->amount;
                                $pm_project_update->monthly_actual_project_amount = $pm_project_update->monthly_actual_project_amount + $deal->amount;
                                $pm_project_update->save();
                            }
                        } else {
                            $items = PMAssign::where('status',1)->get();
                            // $pm_amount = $items->min('amount');
                            // $pm_count_id = $items->min('project_count');
                            //
                            // $pm_find_id = PMAssign::where('amount', $pm_amount)->first();
                            // $pm_min_pro = PMAssign::where('project_count', $pm_count_id)->first();
                            // $find_rest = PMAssign::where('project_count', $pm_count_id)->get();
                            //
                            // $fin_min = $find_rest->min('amount');
                            //
                            // $final_id = PMAssign::where('amount', $fin_min)->first();
    
                            $pm_amount = $items->min('monthly_project_amount');
                            $pm_count_id = $items->min('monthly_project_count');
    
                            $pm_find_id = PMAssign::where('monthly_project_amount', $pm_amount)->first();
                            $pm_min_pro = PMAssign::where('monthly_project_count', $pm_count_id)->first();
                            $find_rest = PMAssign::where('monthly_project_count', $pm_count_id)->get();
    
                            $fin_min = $find_rest->min('monthly_project_amount');
    
                            $final_id = PMAssign::where('monthly_project_amount', $fin_min)->first();
    
                            //  $exceptional =   $pm_count= PMAssign::select('project_count')->where('')->get();
    
                            if ($pm_find_id->monthly_project_count + 1 <= $pm_count_id * 1.5) {
                                $pmassign = new PMProject();
                                $pmassign->project_id = $project->id;
                                $pmassign->status = 'pending';
                                $pmassign->deal_id = $deal->id;
                                $pmassign->client_id = $client->id;
                                $pmassign->pm_id = $pm_find_id->pm_id;
                                $pmassign->save();
                                $deal_assign = Deal::find($deal->id);
                                $deal_assign->pm_id = $pm_find_id->pm_id;
                                $deal_assign->save();
                                $pm_assign_project = Project::find($project->id);
                                $pm_assign_project->pm_id = $pmassign->pm_id;
                                $pm_assign_project->save();
    
                                //  $pm_project= PMAssign::where('pm_id',$pm_id->pm_id)->first();
                                $pm_project_find = PMAssign::where('pm_id', $pm_find_id->pm_id)->first();
                                $pm_project_update = PMAssign::find($pm_project_find->id);
                                $pm_project_update->project_count = $pm_project_update->project_count + 1;
                                $pm_project_update->amount = $pm_project_update->amount + $deal->amount;
                                $pm_project_update->monthly_project_count = $pm_project_update->monthly_project_count + 1;
                                $pm_project_update->monthly_project_amount = $pm_project_update->monthly_project_amount + $deal->amount;
                                $pm_project_update->actual_amount = $pm_project_update->actual_amount + $deal->amount;
                                $pm_project_update->monthly_actual_project_amount = $pm_project_update->monthly_actual_project_amount + $deal->amount;
                                $pm_project_update->save();
                            } else {
                                $pmassign = new PMProject();
                                $pmassign->project_id = $project->id;
                                $pmassign->status = 'pending';
                                $pmassign->deal_id = $deal->id;
                                $pmassign->client_id = $client->id;
                                $pmassign->pm_id = $final_id->pm_id;
                                $pmassign->save();
                                $deal_assign = Deal::find($deal->id);
                                $deal_assign->pm_id = $final_id->pm_id;
                                $deal_assign->save();
                                $pm_assign_project = Project::find($project->id);
                                $pm_assign_project->pm_id = $pmassign->pm_id;
                                $pm_assign_project->save();
    
                                //  $pm_project= PMAssign::where('pm_id',$pm_id->pm_id)->first();
                                $pm_project_find = PMAssign::where('pm_id', $final_id->pm_id)->first();
                                $pm_project_update = PMAssign::find($pm_project_find->id);
                                $pm_project_update->project_count = $pm_project_update->project_count + 1;
                                $pm_project_update->amount = $pm_project_update->amount + $deal->amount;
                                $pm_project_update->monthly_project_count = $pm_project_update->monthly_project_count + 1;
                                $pm_project_update->monthly_project_amount = $pm_project_update->monthly_project_amount + $deal->amount;
                                $pm_project_update->actual_amount = $pm_project_update->actual_amount + $deal->amount;
                                $pm_project_update->monthly_actual_project_amount = $pm_project_update->monthly_actual_project_amount + $deal->amount;
                                $pm_project_update->save();
                            }
                        }
                    }
                  

                    $deal_pm_id = Deal::where('id',$request->id)->first();
                      $project_id= Project::where('deal_id',$deal_pm_id->id)->first();

                      $project_admin_update= Project::find($project_id->id);
                      $project_admin_update->added_by= $project_id->pm_id;
                      $project_admin_update->project_admin= $project_id->pm_id;
                      $project_admin_update->save();

                    $user= User::where('id',$deal_pm_id->pm_id)->first();
                    $this->triggerPusher('notification-channel', 'notification', [
                        'user_id' => $user->id,
                        'role_id' => 4,
                        'title' => 'New project',
                        'body' => 'You have new project. Please check',
                        'redirectUrl' => route('contracts.show', $deal_pm_id->id)
                    ]);
                      Mail::to($user->email)->send(new WonDealMail($project_id));

                      //  Mail::to($test->email)->send(new WonDealMail($project));
                        $users= User::where('role_id',1)->get();
                        foreach ($users as $usr) {
                          Mail::to($usr->email)->send(new WonDealMail($project_id));
                        }
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
                        $deal= Deal::find($deal->id);
                        $deal->authorization_status= 2;
                        $deal->save();
                        // $sender= User::where('id',Auth::id())->first();
                        // $users= User::where('role_id',8)->orWhere('role_id',1)->get();
                    
                        // foreach ($users as $key => $user) {
                        //    // Notification::send($users, new DealAuthorizationSendNotification($deal,$sender));
                        //     $this->triggerPusher('notification-channel', 'notification', [
                        //         'user_id' => $user->id,
                        //         'role_id' => $user->role_id,
                        //         'title' => 'Price authorization request from '.$sender->name,
                        //         'body' => $sender->name. ' send price authorization request for '.$deal->project_name,
                        //         'redirectUrl' => route('deals.show',$deal->id)
                        //     ]);
                        // }

                        // the bidder kpi points start fropm here.


                        $kpi= kpiSetting::first();

                       
                        $project_budget= ($deal->amount * $kpi->accepted_by_pm)/100;

                   

                            if($deal->lead_id != null)
                            {
                                $lead = Lead::where('id',$deal->lead_id)->first();
                                $user_name= User::where('id',$lead->added_by)->first(); 
                                $cash_points= CashPoint::where('user_id',$lead->added_by)->orderBy('id','desc')->first();
                                $point= new CashPoint();
                                $point->user_id= $lead->added_by;
                                $point->project_id= $project_id->id;
                                $point->activity= $user_name->name . ' created the bid';
                                $point->gained_as = "Individual";
                                $point->points= ($project_budget*$kpi->the_bidder)/100;
    
                                if ($cash_points != null) {
                               
                                    $point->total_points_earn= $cash_points->total_points_earn+ ($project_budget*$kpi->the_bidder)/100;
    
                                }else 
                                {
                                    $point->total_points_earn=  ($project_budget*$kpi->the_bidder)/100;
    
                                }
                                $point->save();
                               // dd($point);
    
                            }
                                    $deal_qualified= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',1)->first();

    
                                    $user_name= User::where('id',$deal_qualified->updated_by)->first(); 
                                    $cash_points_qualified= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                    $point= new CashPoint();
                                    $point->user_id= $deal_qualified->updated_by;
                                    $point->project_id= $project_id->id;
                                    $point->activity= $user_name->name . ' made the deal qulaify deal';
                                    $point->gained_as = "Individual";
                                    $point->points= ($project_budget*$kpi->qualify)/100;
    
                                    if ($cash_points_qualified != null) {
                                   
                                        $point->total_points_earn= $cash_points_qualified->total_points_earn+ ($project_budget*$kpi->qualify)/100;
    
                                    }else 
                                    {
                                        $point->total_points_earn=  ($project_budget*$kpi->qualify)/100;
    
                                    }
                                    $point->save();
                                  
    
                               
                                    $deal_short_code= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',2)->first();
    
                                    $user_name= User::where('id',$deal_short_code->updated_by)->first(); 
                                    $cash_points_requirements_defined= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                    $point= new CashPoint();
                                    $point->user_id= $deal_short_code->updated_by;
                                    $point->project_id= $project_id->id;
                                    $point->activity= $user_name->name . ' made the deal requirements defined';
                                    $point->gained_as = "Individual";
                                    $point->points= ($project_budget*$kpi->requirements_defined)/100;
    
                                    if ($cash_points_requirements_defined != null) {
                                   
                                        $point->total_points_earn= $cash_points_requirements_defined->total_points_earn+ ($project_budget*$kpi->requirements_defined)/100;
    
                                    }else 
                                    {
                                        $point->total_points_earn=  ($project_budget*$kpi->requirements_defined)/100;
    
                                    }
                                    $point->save();
                                   
    
                              
                                
                                    $deal_proposal= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',3)->first();
                                    $user_name= User::where('id',$deal_proposal->updated_by)->first(); 
                                    $cash_points_proposal_made= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                    $point= new CashPoint();
                                    $point->user_id= $deal_proposal->updated_by;
                                    $point->project_id= $project_id->id;
                                    $point->activity= $user_name->name . ' created the proposal';
                                    $point->gained_as = "Individual";
                                    $point->points= ($project_budget*$kpi->proposal_made)/100;
    
                                    if ($cash_points_proposal_made != null) {
                                   
                                        $point->total_points_earn= $cash_points_proposal_made->total_points_earn+ ($project_budget*$kpi->proposal_made)/100;
    
                                    }else 
                                    {
                                        $point->total_points_earn=  ($project_budget*$kpi->proposal_made)/100;
    
                                    }
                                    $point->save();
                                   
    
                                
                                    $deal_negotiation_started= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',4)->first();                               
                                    $user_name= User::where('id',$deal_negotiation_started->updated_by)->first(); 
                                    $cash_points_negotiation_started= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                    $point= new CashPoint();
                                    $point->user_id= $deal_negotiation_started->updated_by;
                                    $point->project_id= $project_id->id;
                                    $point->activity= $user_name->name . ' started negotiation started';
                                    $point->gained_as = "Individual";
                                    $point->points= ($project_budget*$kpi->negotiation_started)/100;
    
                                    if ($cash_points_negotiation_started != null) {
                                   
                                        $point->total_points_earn= $cash_points_negotiation_started->total_points_earn+ ($project_budget*$kpi->negotiation_started)/100;
    
                                    }else 
                                    {
                                        $point->total_points_earn=  ($project_budget*$kpi->negotiation_started)/100;
    
                                    }
                                    $point->save();

                                  
                                   
                               
                                    $deal_milestone_breakdown= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',5)->first();
                                    if($deal_milestone_breakdown != null)
                                    {
                                        $user_name= User::where('id',$deal_milestone_breakdown->updated_by)->first(); 

                                    $cash_points_milestone_breakdown= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                    $point= new CashPoint();
                                    $point->user_id= $deal_milestone_breakdown->updated_by;
                                    $point->project_id= $project_id->id;
                                    $point->activity= $user_name->name . ' created the milestone breakdown';
                                    $point->gained_as = "Individual";
                                    $point->points= ($project_budget*$kpi->milestone_breakdown)/100;
    
                                    if ($cash_points_milestone_breakdown != null) {
                                   
                                        $point->total_points_earn= $cash_points_milestone_breakdown->total_points_earn+ ($project_budget*$kpi->milestone_breakdown)/100;
    
                                    }else 
                                    {
                                        $point->total_points_earn=
                                        ($project_budget*$kpi->milestone_breakdown)/100;
    
                                    }
                                    $point->save();


                                    }

                                    $deal_id= Deal::where('id',$deal->id)->first();
                                    //dd($deal_id);
                                    $user_name= User::where('id',$deal_id->added_by)->first(); 

                                    $cash_points_close_deal= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                    $point= new CashPoint();
                                    $point->user_id= $deal_id->added_by;
                                    $point->project_id= $project_id->id;
                                    $point->activity= $user_name->name . ' closed the deal';
                                    $point->gained_as = "Individual";
                                    $point->points= ($project_budget*$kpi->closed_deal)/100;
    
                                    if ($cash_points_close_deal != null) {
                                   
                                        $point->total_points_earn= $cash_points_close_deal->total_points_earn+ ($project_budget*$kpi->closed_deal)/100;
    
                                    }else 
                                    {
                                        $point->total_points_earn=
                                        ($project_budget*$kpi->closed_deal)/100;
    
                                    }
                                    $point->save();
                                    $deal_id_contact= Deal::where('id',$request->id)->first();
                                    $user_name= User::where('id',$deal_id_contact->added_by)->first(); 

                                    $cash_points_contact= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                    $point= new CashPoint();
                                    $point->user_id= $deal_id_contact->added_by;
                                    $point->project_id= $project_id->id;
                                    $point->activity= $user_name->name . ' submitted the contact form for the project manager';
                                    $point->gained_as = "Individual";
                                    $point->points= ($project_budget*$kpi->contact_form)/100;
    
                                    if ($cash_points_contact != null) {
                                   
                                        $point->total_points_earn= $cash_points_contact->total_points_earn+ ($project_budget*$kpi->contact_form)/100;
    
                                    }else 
                                    {
                                        $point->total_points_earn=
                                        ($project_budget*$kpi->contact_form)/100;
    
                                    }
                                    $point->save();
                                   
                                    


                                    if ($deal->amount > $kpi->generate_single_deal) {

                                        $bonus_point= $kpi->bonus_point;
                                        if($deal->lead_id != null)
                             {
                                 $lead = Lead::where('id',$deal->lead_id)->first();
                                 $user_name= User::where('id',$lead->added_by)->first(); 
                                 $cash_points= CashPoint::where('user_id',$lead->added_by)->orderBy('id','desc')->first();
                                 $point= new CashPoint();
                                 $point->user_id= $lead->added_by;
                                 $point->project_id= $project_id->id;
                                 $point->activity= $user_name->name . ' created the bid';
                                 $point->gained_as = "Individual";
                                 $point->points= ($bonus_point*$kpi->the_bidder)/100;
     
                                 if ($cash_points != null) {
                                
                                     $point->total_points_earn= $cash_points->total_points_earn+ ($bonus_point*$kpi->the_bidder)/100;
     
                                 }else 
                                 {
                                     $point->total_points_earn=  ($bonus_point*$kpi->the_bidder)/100;
     
                                 }
                                 $point->save();
                                // dd($point);
     
                             }
                                     $deal_qualified= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',1)->first();
    
     
                                     $user_name= User::where('id',$deal_qualified->updated_by)->first(); 
                                     $cash_points_qualified= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                     $point= new CashPoint();
                                     $point->user_id= $deal_qualified->updated_by;
                                     $point->project_id= $project_id->id;
                                     $point->activity= $user_name->name . ' made the deal qulaify deal';
                                     $point->gained_as = "Individual";
                                     $point->points= ($bonus_point*$kpi->qualify)/100;
     
                                     if ($cash_points_qualified != null) {
                                    
                                         $point->total_points_earn= $cash_points_qualified->total_points_earn+ ($bonus_point*$kpi->qualify)/100;
     
                                     }else 
                                     {
                                         $point->total_points_earn=  ($bonus_point*$kpi->qualify)/100;
     
                                     }
                                     $point->save();
                                   
     
                                
                                     $deal_short_code= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',2)->first();
     
                                     $user_name= User::where('id',$deal_short_code->updated_by)->first(); 
                                     $cash_points_requirements_defined= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                     $point= new CashPoint();
                                     $point->user_id= $deal_short_code->updated_by;
                                     $point->project_id= $project_id->id;
                                     $point->activity= $user_name->name . ' made the deal requirements defined';
                                     $point->gained_as = "Individual";
                                     $point->points= ($bonus_point*$kpi->requirements_defined)/100;
     
                                     if ($cash_points_requirements_defined != null) {
                                    
                                         $point->total_points_earn= $cash_points_requirements_defined->total_points_earn+ ($bonus_point*$kpi->requirements_defined)/100;
     
                                     }else 
                                     {
                                         $point->total_points_earn=  ($bonus_point*$kpi->requirements_defined)/100;
     
                                     }
                                     $point->save();
                                    
     
                               
                                 
                                     $deal_proposal= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',3)->first();
                                     $user_name= User::where('id',$deal_proposal->updated_by)->first(); 
                                     $cash_points_proposal_made= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                     $point= new CashPoint();
                                     $point->user_id= $deal_proposal->updated_by;
                                     $point->project_id= $project_id->id;
                                     $point->activity= $user_name->name . ' created the proposal';
                                     $point->gained_as = "Individual";
                                     $point->points= ($bonus_point*$kpi->proposal_made)/100;
     
                                     if ($cash_points_proposal_made != null) {
                                    
                                         $point->total_points_earn= $cash_points_proposal_made->total_points_earn+ ($bonus_point*$kpi->proposal_made)/100;
     
                                     }else 
                                     {
                                         $point->total_points_earn=  ($bonus_point*$kpi->proposal_made)/100;
     
                                     }
                                     $point->save();
                                    
     
                                 
                                     $deal_negotiation_started= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',4)->first();                               
                                     $user_name= User::where('id',$deal_negotiation_started->updated_by)->first(); 
                                     $cash_points_negotiation_started= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                     $point= new CashPoint();
                                     $point->user_id= $deal_negotiation_started->updated_by;
                                     $point->project_id= $project_id->id;
                                     $point->activity= $user_name->name . ' started negotiation started';
                                     $point->gained_as = "Individual";
                                     $point->points= ($bonus_point*$kpi->negotiation_started)/100;
     
                                     if ($cash_points_negotiation_started != null) {
                                    
                                         $point->total_points_earn= $cash_points_negotiation_started->total_points_earn+ ($bonus_point*$kpi->negotiation_started)/100;
     
                                     }else 
                                     {
                                         $point->total_points_earn=  ($bonus_point*$kpi->negotiation_started)/100;
     
                                     }
                                     $point->save();
                                    
                                
                                     $deal_milestone_breakdown= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',5)->first();

                                     if($deal_milestone_breakdown != null)
                                     {
                                        $user_name= User::where('id',$deal_milestone_breakdown->updated_by)->first(); 
                                        $cash_points_milestone_breakdown= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                        $point= new CashPoint();
                                        $point->user_id= $deal_milestone_breakdown->updated_by;
                                        $point->project_id= $project_id->id;
                                        $point->activity= $user_name->name . ' created the milestone breakdown';
                                        $point->gained_as = "Individual";
                                        $point->points= ($bonus_point*$kpi->milestone_breakdown)/100;
        
                                        if ($cash_points_milestone_breakdown != null) {
                                       
                                            $point->total_points_earn= $cash_points_milestone_breakdown->total_points_earn+ ($bonus_point*$kpi->milestone_breakdown)/100;
        
                                        }else 
                                        {
                                            $point->total_points_earn=
                                            ($bonus_point*$kpi->milestone_breakdown)/100;
        
                                        }
                                        $point->save();
       

                                     }
                                     $deal_id= Deal::where('id',$deal->id)->first();
                                     //dd($deal_id);
                                     $user_name= User::where('id',$deal_id->added_by)->first(); 
 
                                     $cash_points_close_deal= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                     $point= new CashPoint();
                                     $point->user_id= $deal_id->added_by;
                                     $point->project_id= $project_id->id;
                                     $point->activity= $user_name->name . ' closed the deal';
                                     $point->gained_as = "Individual";
                                     $point->points= ($project_budget*$kpi->closed_deal)/100;
     
                                     if ($cash_points_close_deal != null) {
                                    
                                         $point->total_points_earn= $cash_points_close_deal->total_points_earn+ ($project_budget*$kpi->closed_deal)/100;
     
                                     }else 
                                     {
                                         $point->total_points_earn=
                                         ($project_budget*$kpi->closed_deal)/100;
     
                                     }
                                     $point->save();
                                     $deal_id_contact= Deal::where('id',$request->id)->first();
                                     $user_name= User::where('id',$deal_id_contact->added_by)->first(); 
 
                                     $cash_points_contact= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                     $point= new CashPoint();
                                     $point->user_id= $deal_id_contact->added_by;
                                     $point->project_id= $project_id->id;
                                     $point->activity= $user_name->name . ' submitted the contact form for the project manager';
                                     $point->gained_as = "Individual";
                                     $point->points= ($project_budget*$kpi->contact_form)/100;
     
                                     if ($cash_points_contact != null) {
                                    
                                         $point->total_points_earn= $cash_points_contact->total_points_earn+ ($project_budget*$kpi->contact_form)/100;
     
                                     }else 
                                     {
                                         $point->total_points_earn=
                                         ($project_budget*$kpi->contact_form)/100;
     
                                     }
                                     $point->save();
                                    

                                     
                                    
                                     }
                                     $currentMonth = Carbon::now()->month;
                                    // / dd($currentMonth);
                                  $monthly_deal = Deal::whereMonth('created_at', $currentMonth)->sum('amount');
                                    //$monthly_deal = 20000;

                                     $kpi_settings= kpiSettingGenerateSale::all();
                                    // dd($kpi_settings);
                                     $user_name= User::where('role_id',8)->first(); 
                                     $cash_points_team_lead= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                     foreach ($kpi_settings as $value) {
                                        // /dd($value);
                                        if ( $monthly_deal >= $value->generate_sales_from  &&  $monthly_deal <= $value->generate_sales_to ) {

                                     $point= new CashPoint();
                                     $point->user_id= $deal_id_contact->added_by;
                                     $point->project_id= $project_id->id;
                                     $point->activity= $user_name->name . ' for achieving monthly target';
                                     $point->gained_as = "Team";
                                     $point->points= ($project_budget*$value->generate_sales_amount)/100;
     
                                     if ($cash_points_team_lead != null) {
                                    
                                         $point->total_points_earn=$cash_points_team_lead->total_points_earn+ ($project_budget*$value->generate_sales_amount)/100;
     
                                     }else 
                                     {
                                         $point->total_points_earn=
                                         ($project_budget*$value->generate_sales_amount)/100;
     
                                     }
                                     $point->save();
                                            
                                        }
                                     }
                                     if ($monthly_deal > $kpi->generate_sales_above) {
                                        $user_name= User::where('role_id',8)->first(); 
                                        $cash_points_team_lead= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                        $point= new CashPoint();
                                     $point->user_id= $deal_id_contact->added_by;
                                     $point->project_id= $project_id->id;
                                     $point->activity= $user_name->name . ' for achieving monthly target';
                                     $point->gained_as = "Team";
                                     $point->points= ($project_budget*$kpi->generate_sales_above_point)/100;
     
                                     if ($cash_points_team_lead != null) {
                                    
                                         $point->total_points_earn=$cash_points_team_lead->total_points_earn+ ($project_budget*$kpi->generate_sales_above_point)/100;
     
                                     }else 
                                     {
                                         $point->total_points_earn=
                                         ($project_budget*$kpi->generate_sales_above_point)/100;
     
                                     }
                                     $point->save();
                                     }
                                   //  dd($point);


                                     // start team lead point calculation here

                                     // If sales team generates sales from To per month,  team lead will get  % points of the sales amount.
                                      
                                        
                                        
                                       
                                        



                                  //  dd($point);
    
                    

                      DB::commit();
                      // all good
                  } catch (\Exception $e) {
                      DB::rollback();
                      Toastr::error('Action Failed', 'Error', ["positionClass" => "toast-top-right", 'redirectUrl']);
                      return back();
                  }
//                    Toastr::success('Deal creation completed successfully!', 'Success', ["positionClass" => "toast-top-right", 'redirectUrl']);
//                    return redirect('/account/contracts');
                    return response()->json(['message' => 'Deal creation completed successfully']);



    }
    public function updatedealDetails(Request $request)
    {

    // dd($request->all());
        $validated = $request->validate([
            'project_name' => 'required',
            'deadline' => 'required',
            'amount' => 'required',
            'message_link' => 'required',
            'description2' => 'required',
            'description3' => 'required',
            'description4' => 'required',
            'description5' => 'required',
            'description6' => 'required',
            'description7' => 'required',
            'description8' => 'required',
            'description9' => 'required',
        ], [
            'project_name.required' => 'Please enter the project name!',
            'deadline.required' => 'Please select project deadline from Freelancer.com!',
            'amount.required' => 'Please enter the project budget!',
            'description2.required' => 'What in 2-8 words are missing, please write the what in 2-8 words here!',
            'description3.required' => 'What in 3-4 lines are missing, please elaborate the "WHAT" 3-4 lines here!',
            'description4.required' => 'This field is required. Please provide reference websites and what the references are for here!',
            'description5.required' => 'Client\'s focus or concerning points are required. Please share as detailed explanation as you can!',
            'description6.required' => 'Login details are required. Please provide all the access details of the project!',
            'description7.required' => 'Logo files or Google drive link for logo files are required. Please provide all the access details of the project!',
            'description8.required' => 'To ensure all departments are aligned, we kindly request your confirmation on cross-departmental work for this project. Please let us know if cross-departmental work is involved or not.',
            'description9.required' => 'Notes for the project manager/technical team is required, please write if any notes for manager/technical team are available.',
        ]);
//      dd("hello");
      $project_milestone= Project::where('deal_id',$request->id)->first();
      $milestone= ProjectMilestone::where('project_id',$project_milestone->id)->first();
//      dd($milestone);
        if ($milestone == null) {
            return response()->json([
                "message" => "The given data was invalid.",
                "errors" => [
                    "milestone_value" => [
                        "Milestone not found!!!."
                    ]
                ]
            ], 422);
        } else {
    DB::beginTransaction();

              try {
                // /dd($request);
                $deal = Deal::find($request->id);
                $deal->project_name = $request->project_name;
                $deal->currency_id= 1;
                $deal->actual_amount=  $request->amount;
                $currency= Currency::where('id',$request->original_currency_id)->first();
                //dd($currency);
                $deal->amount = ($request->amount)/$currency->exchange_rate;
                $deal->organization = $request->organization;
                $deal->client_email = $request->client_email;
              // /  $deal->description = $request->description;
              $message_links = $request->message_link;
              // /dd($message_links);
              $value= '';

              if (is_array($message_links) || is_object($message_links)) {
                foreach ($message_links as $link) {
                  //dd($d['day']);
                  $value= $value  . $link .' <br> ';

                }
              }
                $deal->deadline = $request->deadline;
                $deal->currency_id = $request->currency_id;
                $deal->message_link = $value;
                $deal->profile_link = $request->profile_link;
                $deal->description2 = $request->description2;
                $deal->description3 = $request->description3;
                $deal->description4 = $request->description4;
                $deal->description5 = $request->description5;
                $deal->description6 = $request->description6;
                $deal->description7 = $request->description7;
                $deal->description8 = $request->description8;
                $deal->description9 = $request->description9;
                $deal->updated_by = Auth::id();
//                dd($deal);
                $deal->save();
                $project_id = Project::where('deal_id', $request->id)->first();
                $project = Project::find($project_id->id);
                $project->project_name = $request->project_name;
                $project->project_summary = $request->description;
                $project->deadline = $request->deadline;
                $currency= Currency::where('id',$request->original_currency_id)->first();
                //dd($currency);
                $project->project_budget = ($request->amount)/$currency->exchange_rate;
                $project->due = $deal->amount;
                $project->currency_id = 1;
                $project->save();
                $contract_id = Contract::where('deal_id', $request->id)->first();
                $contract = Contract::find($contract_id->id);
                $contract->subject = $request->project_name;
                $contract->actual_amount = $request->amount;
                //$deal->actual_amount=  $request->amount;
                $currency= Currency::where('id',$request->original_currency_id)->first();

                $contract->amount = ($request->amount)/$currency->exchange_rate;
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
                  if ($deal->pm_id == null) {
                    $pm_count = PMAssign::select('monthly_project_count')->where('status',1)->min('monthly_project_count');
                  $pm_user = PMAssign::where('monthly_project_count', $pm_count)->where('status',1)->first();
                  if ($pm_count < 2) {
                      if ($pm_user != null) {
                          $pmassign = new PMProject();
                          $pmassign->project_id = $project->id;
                          $pmassign->status = 'pending';
                          $pmassign->pm_id = $pm_user->pm_id;
                          $pmassign->deal_id = $deal->id;
                          $pmassign->client_id = $client->id;
                          $pmassign->save();
                          $deal_assign = Deal::find($deal->id);
                          $deal_assign->pm_id = $pm_user->pm_id;
                          $deal_assign->save();
                          $pm_assign_project = Project::find($project->id);
                          $pm_assign_project->pm_id = $pmassign->pm_id;
                          $pm_assign_project->save();
                          //$email = $request->email;


                          //  $pm_project= PMAssign::where('pm_id',$pm_id->pm_id)->first();
                          $pm_project_find = PMAssign::where('pm_id', $pm_user->pm_id)->first();
                          $pm_project_update = PMAssign::find($pm_project_find->id);
                          $pm_project_update->project_count = $pm_project_update->project_count + 1;
                          $pm_project_update->amount = $pm_project_update->amount + $deal->amount;
                          $pm_project_update->monthly_project_count = $pm_project_update->monthly_project_count + 1;
                          $pm_project_update->monthly_project_amount = $pm_project_update->monthly_project_amount + $deal->amount;
                          $pm_project_update->actual_amount = $pm_project_update->actual_amount + $deal->amount;
                          $pm_project_update->monthly_actual_project_amount = $pm_project_update->monthly_actual_project_amount + $deal->amount;
                          $pm_project_update->save();
                      }
                  } else {
                      $items = PMAssign::where('status',1)->get();
                      // $pm_amount = $items->min('amount');
                      // $pm_count_id = $items->min('project_count');
                      //
                      // $pm_find_id = PMAssign::where('amount', $pm_amount)->first();
                      // $pm_min_pro = PMAssign::where('project_count', $pm_count_id)->first();
                      // $find_rest = PMAssign::where('project_count', $pm_count_id)->get();
                      //
                      // $fin_min = $find_rest->min('amount');
                      //
                      // $final_id = PMAssign::where('amount', $fin_min)->first();

                      $pm_amount = $items->min('monthly_project_amount');
                      $pm_count_id = $items->min('monthly_project_count');

                      $pm_find_id = PMAssign::where('monthly_project_amount', $pm_amount)->first();
                      $pm_min_pro = PMAssign::where('monthly_project_count', $pm_count_id)->first();
                      $find_rest = PMAssign::where('monthly_project_count', $pm_count_id)->get();

                      $fin_min = $find_rest->min('monthly_project_amount');

                      $final_id = PMAssign::where('monthly_project_amount', $fin_min)->first();

                      //  $exceptional =   $pm_count= PMAssign::select('project_count')->where('')->get();

                      if ($pm_find_id->monthly_project_count + 1 <= $pm_count_id * 1.5) {
                          $pmassign = new PMProject();
                          $pmassign->project_id = $project->id;
                          $pmassign->status = 'pending';
                          $pmassign->deal_id = $deal->id;
                          $pmassign->client_id = $client->id;
                          $pmassign->pm_id = $pm_find_id->pm_id;
                          $pmassign->save();
                          $deal_assign = Deal::find($deal->id);
                          $deal_assign->pm_id = $pm_find_id->pm_id;
                          $deal_assign->save();
                          $pm_assign_project = Project::find($project->id);
                          $pm_assign_project->pm_id = $pmassign->pm_id;
                          $pm_assign_project->save();

                          //  $pm_project= PMAssign::where('pm_id',$pm_id->pm_id)->first();
                          $pm_project_find = PMAssign::where('pm_id', $pm_find_id->pm_id)->first();
                          $pm_project_update = PMAssign::find($pm_project_find->id);
                          $pm_project_update->project_count = $pm_project_update->project_count + 1;
                          $pm_project_update->amount = $pm_project_update->amount + $deal->amount;
                          $pm_project_update->monthly_project_count = $pm_project_update->monthly_project_count + 1;
                          $pm_project_update->monthly_project_amount = $pm_project_update->monthly_project_amount + $deal->amount;
                          $pm_project_update->actual_amount = $pm_project_update->actual_amount + $deal->amount;
                          $pm_project_update->monthly_actual_project_amount = $pm_project_update->monthly_actual_project_amount + $deal->amount;
                          $pm_project_update->save();
                      } else {
                          $pmassign = new PMProject();
                          $pmassign->project_id = $project->id;
                          $pmassign->status = 'pending';
                          $pmassign->deal_id = $deal->id;
                          $pmassign->client_id = $client->id;
                          $pmassign->pm_id = $final_id->pm_id;
                          $pmassign->save();
                          $deal_assign = Deal::find($deal->id);
                          $deal_assign->pm_id = $final_id->pm_id;
                          $deal_assign->save();
                          $pm_assign_project = Project::find($project->id);
                          $pm_assign_project->pm_id = $pmassign->pm_id;
                          $pm_assign_project->save();

                          //  $pm_project= PMAssign::where('pm_id',$pm_id->pm_id)->first();
                          $pm_project_find = PMAssign::where('pm_id', $final_id->pm_id)->first();
                          $pm_project_update = PMAssign::find($pm_project_find->id);
                          $pm_project_update->project_count = $pm_project_update->project_count + 1;
                          $pm_project_update->amount = $pm_project_update->amount + $deal->amount;
                          $pm_project_update->monthly_project_count = $pm_project_update->monthly_project_count + 1;
                          $pm_project_update->monthly_project_amount = $pm_project_update->monthly_project_amount + $deal->amount;
                          $pm_project_update->actual_amount = $pm_project_update->actual_amount + $deal->amount;
                          $pm_project_update->monthly_actual_project_amount = $pm_project_update->monthly_actual_project_amount + $deal->amount;
                          $pm_project_update->save();
                      }
                  }

                  }
                 
                  $deal_pm_id = Deal::where('id',$request->id)->first();
                    $project_id= Project::where('deal_id',$deal_pm_id->id)->first();
                    $project_admin_update= Project::find($project_id->id);
                    $project_admin_update->added_by= $project_id->pm_id;
                    $project_admin_update->project_admin= $project_id->pm_id;
                    $project_admin_update->save();

                  
                   
                        
                  $user= User::where('id',$deal_pm_id->pm_id)->first();
                    Mail::to($user->email)->send(new WonDealMail($project_id));
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
                     // the bidder kpi points start fropm here.



                     $kpi= kpiSetting::first();
                       
                     $project_budget= ($deal->amount * $kpi->accepted_by_pm)/100;
                  
                     
                         if($deal->lead_id != null)
                         {
                             $lead = Lead::where('id',$deal->lead_id)->first();
                             $user_name= User::where('id',$lead->added_by)->first(); 
                             $cash_points= CashPoint::where('user_id',$lead->added_by)->orderBy('id','desc')->first();
                             $point= new CashPoint();
                             $point->user_id= $lead->added_by;
                             $point->project_id= $project_id->id;
                             $point->activity= $user_name->name . ' created the bid';
                             $point->gained_as = "Individual";
                             $point->points= ($project_budget*$kpi->the_bidder)/100;
 
                             if ($cash_points != null) {
                            
                                 $point->total_points_earn= $cash_points->total_points_earn+ ($project_budget*$kpi->the_bidder)/100;
 
                             }else 
                             {
                                 $point->total_points_earn=  ($project_budget*$kpi->the_bidder)/100;
 
                             }
                             $point->save();
                            // dd($point);
 
                         }
                                 $deal_qualified= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',1)->first();

 
                                 $user_name= User::where('id',$deal_qualified->updated_by)->first(); 
                                 $cash_points_qualified= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                 $point= new CashPoint();
                                 $point->user_id= $deal_qualified->updated_by;
                                 $point->project_id= $project_id->id;
                                 $point->activity= $user_name->name . ' made the deal qulaify deal';
                                 $point->gained_as = "Individual";
                                 $point->points= ($project_budget*$kpi->qualify)/100;
 
                                 if ($cash_points_qualified != null) {
                                
                                     $point->total_points_earn= $cash_points_qualified->total_points_earn+ ($project_budget*$kpi->qualify)/100;
 
                                 }else 
                                 {
                                     $point->total_points_earn=  ($project_budget*$kpi->qualify)/100;
 
                                 }
                                 $point->save();
                               
 
                            
                                 $deal_short_code= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',2)->first();
 
                                 $user_name= User::where('id',$deal_short_code->updated_by)->first(); 
                                 $cash_points_requirements_defined= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                 $point= new CashPoint();
                                 $point->user_id= $deal_short_code->updated_by;
                                 $point->project_id= $project_id->id;
                                 $point->activity= $user_name->name . ' made the deal requirements defined';
                                 $point->gained_as = "Individual";
                                 $point->points= ($project_budget*$kpi->requirements_defined)/100;
 
                                 if ($cash_points_requirements_defined != null) {
                                
                                     $point->total_points_earn= $cash_points_requirements_defined->total_points_earn+ ($project_budget*$kpi->requirements_defined)/100;
 
                                 }else 
                                 {
                                     $point->total_points_earn=  ($project_budget*$kpi->requirements_defined)/100;
 
                                 }
                                 $point->save();
                                
 
                           
                             
                                 $deal_proposal= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',3)->first();
                                 $user_name= User::where('id',$deal_proposal->updated_by)->first(); 
                                 $cash_points_proposal_made= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                 $point= new CashPoint();
                                 $point->user_id= $deal_proposal->updated_by;
                                 $point->project_id= $project_id->id;
                                 $point->activity= $user_name->name . ' created the proposal';
                                 $point->gained_as = "Individual";
                                 $point->points= ($project_budget*$kpi->proposal_made)/100;
 
                                 if ($cash_points_proposal_made != null) {
                                
                                     $point->total_points_earn= $cash_points_proposal_made->total_points_earn+ ($project_budget*$kpi->proposal_made)/100;
 
                                 }else 
                                 {
                                     $point->total_points_earn=  ($project_budget*$kpi->proposal_made)/100;
 
                                 }
                                 $point->save();
                                
 
                             
                                 $deal_negotiation_started= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',4)->first();                               
                                 $user_name= User::where('id',$deal_negotiation_started->updated_by)->first(); 
                                 $cash_points_negotiation_started= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                 $point= new CashPoint();
                                 $point->user_id= $deal_negotiation_started->updated_by;
                                 $point->project_id= $project_id->id;
                                 $point->activity= $user_name->name . ' started negotiation started';
                                 $point->gained_as = "Individual";
                                 $point->points= ($project_budget*$kpi->negotiation_started)/100;
 
                                 if ($cash_points_negotiation_started != null) {
                                
                                     $point->total_points_earn= $cash_points_negotiation_started->total_points_earn+ ($project_budget*$kpi->negotiation_started)/100;
 
                                 }else 
                                 {
                                     $point->total_points_earn=  ($project_budget*$kpi->negotiation_started)/100;
 
                                 }
                                 $point->save();
                                
                            
                                 $deal_milestone_breakdown= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',5)->first();
                                 $user_name= User::where('id',$deal_milestone_breakdown->updated_by)->first(); 
                                 $cash_points_milestone_breakdown= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                 $point= new CashPoint();
                                 $point->user_id= $deal_milestone_breakdown->updated_by;
                                 $point->project_id= $project_id->id;
                                 $point->activity= $user_name->name . ' created the milestone breakdown';
                                 $point->gained_as = "Individual";
                                 $point->points= ($project_budget*$kpi->milestone_breakdown)/100;
 
                                 if ($cash_points_milestone_breakdown != null) {
                                
                                     $point->total_points_earn= $cash_points_milestone_breakdown->total_points_earn+ ($project_budget*$kpi->milestone_breakdown)/100;
 
                                 }else 
                                 {
                                     $point->total_points_earn=
                                     ($project_budget*$kpi->milestone_breakdown)/100;
 
                                 }
                                 $point->save();
                                 $deal_id= Deal::where('id',$deal->id)->first();
                                 $user_name= User::where('id',$deal_id->added_by)->first(); 

                                 $cash_points_close_deal= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                 $point= new CashPoint();
                                 $point->user_id= $deal_id->added_by;
                                 $point->project_id= $project_id->id;
                                 $point->activity= $user_name->name . ' closed the deal';
                                 $point->gained_as = "Individual";
                                 $point->points= ($project_budget*$kpi->closed_deal)/100;
 
                                 if ($cash_points_close_deal != null) {
                                
                                     $point->total_points_earn= $cash_points_close_deal->total_points_earn+ ($project_budget*$kpi->closed_deal)/100;
 
                                 }else 
                                 {
                                     $point->total_points_earn=
                                     ($project_budget*$kpi->closed_deal)/100;
 
                                 }
                                 $point->save();
                                 $deal_id_contact= Deal::where('id',$request->id)->first();
                                 $user_name= User::where('id',$deal_id_contact->added_by)->first(); 

                                 $cash_points_contact= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                 $point= new CashPoint();
                                 $point->user_id= $deal_id_contact->added_by;
                                 $point->project_id= $project_id->id;
                                 $point->activity= $user_name->name . ' submitted the contact form for the project manager';
                                 $point->gained_as = "Individual";
                                 $point->points= ($project_budget*$kpi->contact_form)/100;
 
                                 if ($cash_points_contact != null) {
                                
                                     $point->total_points_earn= $cash_points_contact->total_points_earn+ ($project_budget*$kpi->contact_form)/100;
 
                                 }else 
                                 {
                                     $point->total_points_earn=
                                     ($project_budget*$kpi->contact_form)/100;
 
                                 }
                                 $point->save();
                                 $deal_id= Deal::where('id',$deal->id)->first();
                                 
                                 $user_name= User::where('id',$deal_id->added_by)->first(); 

                                 $cash_points_close_deal= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                 $point= new CashPoint();
                                 $point->user_id= $deal_id->added_by;
                                 $point->project_id= $project_id->id;
                                 $point->activity= $user_name->name . ' closed the deal';
                                 $point->gained_as = "Individual";
                                 $point->points= ($project_budget*$kpi->closed_deal)/100;
 
                                 if ($cash_points_close_deal != null) {
                                
                                     $point->total_points_earn= $cash_points_close_deal->total_points_earn+ ($project_budget*$kpi->closed_deal)/100;
 
                                 }else 
                                 {
                                     $point->total_points_earn=
                                     ($project_budget*$kpi->closed_deal)/100;
 
                                 }
                                 $point->save();
                                 $deal_id_contact= Deal::where('id',$request->id)->first();
                                 $user_name= User::where('id',$deal_id_contact->added_by)->first(); 

                                 $cash_points_contact= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                 $point= new CashPoint();
                                 $point->user_id= $deal_id_contact->added_by;
                                 $point->project_id= $project_id->id;
                                 $point->activity= $user_name->name . ' submitted the contact form for the project manager';
                                 $point->gained_as = "Individual";
                                 $point->points= ($project_budget*$kpi->contact_form)/100;
 
                                 if ($cash_points_contact != null) {
                                
                                     $point->total_points_earn= $cash_points_contact->total_points_earn+ ($project_budget*$kpi->contact_form)/100;
 
                                 }else 
                                 {
                                     $point->total_points_earn=
                                     ($project_budget*$kpi->contact_form)/100;
 
                                 }
                                 $point->save();


                                 if ($deal->amount > $kpi->generate_single_deal) 
                    {

                                    $bonus_point= $kpi->bonus_point;
                                    if($deal->lead_id != null)
                         {
                             $lead = Lead::where('id',$deal->lead_id)->first();
                             $user_name= User::where('id',$lead->added_by)->first(); 
                             $cash_points= CashPoint::where('user_id',$lead->added_by)->orderBy('id','desc')->first();
                             $point= new CashPoint();
                             $point->user_id= $lead->added_by;
                             $point->project_id= $project_id->id;
                             $point->activity= $user_name->name . ' created the bid';
                             $point->gained_as = "Individual";
                             $point->points= ($bonus_point*$kpi->the_bidder)/100;
 
                             if ($cash_points != null) {
                            
                                 $point->total_points_earn= $cash_points->total_points_earn+ ($bonus_point*$kpi->the_bidder)/100;
 
                             }else 
                             {
                                 $point->total_points_earn=  ($bonus_point*$kpi->the_bidder)/100;
 
                             }
                             $point->save();
                            // dd($point);
 
                         }
                                 $deal_qualified= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',1)->first();

 
                                 $user_name= User::where('id',$deal_qualified->updated_by)->first(); 
                                 $cash_points_qualified= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                 $point= new CashPoint();
                                 $point->user_id= $deal_qualified->updated_by;
                                 $point->project_id= $project_id->id;
                                 $point->activity= $user_name->name . ' made the deal qulaify deal';
                                 $point->gained_as = "Individual";
                                 $point->points= ($bonus_point*$kpi->qualify)/100;
 
                                 if ($cash_points_qualified != null) {
                                
                                     $point->total_points_earn= $cash_points_qualified->total_points_earn+ ($bonus_point*$kpi->qualify)/100;
 
                                 }else 
                                 {
                                     $point->total_points_earn=  ($bonus_point*$kpi->qualify)/100;
 
                                 }
                                 $point->save();
                               
 
                            
                                 $deal_short_code= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',2)->first();
 
                                 $user_name= User::where('id',$deal_short_code->updated_by)->first(); 
                                 $cash_points_requirements_defined= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                 $point= new CashPoint();
                                 $point->user_id= $deal_short_code->updated_by;
                                 $point->project_id= $project_id->id;
                                 $point->activity= $user_name->name . ' made the deal requirements defined';
                                 $point->gained_as = "Individual";
                                 $point->points= ($bonus_point*$kpi->requirements_defined)/100;
 
                                 if ($cash_points_requirements_defined != null) {
                                
                                     $point->total_points_earn= $cash_points_requirements_defined->total_points_earn+ ($bonus_point*$kpi->requirements_defined)/100;
 
                                 }else 
                                 {
                                     $point->total_points_earn=  ($bonus_point*$kpi->requirements_defined)/100;
 
                                 }
                                 $point->save();
                                
 
                           
                             
                                 $deal_proposal= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',3)->first();
                                 $user_name= User::where('id',$deal_proposal->updated_by)->first(); 
                                 $cash_points_proposal_made= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                 $point= new CashPoint();
                                 $point->user_id= $deal_proposal->updated_by;
                                 $point->project_id= $project_id->id;
                                 $point->activity= $user_name->name . ' created the proposal';
                                 $point->gained_as = "Individual";
                                 $point->points= ($bonus_point*$kpi->proposal_made)/100;
 
                                 if ($cash_points_proposal_made != null) {
                                
                                     $point->total_points_earn= $cash_points_proposal_made->total_points_earn+ ($bonus_point*$kpi->proposal_made)/100;
 
                                 }else 
                                 {
                                     $point->total_points_earn=  ($bonus_point*$kpi->proposal_made)/100;
 
                                 }
                                 $point->save();
                                
 
                             
                                 $deal_negotiation_started= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',4)->first();                               
                                 $user_name= User::where('id',$deal_negotiation_started->updated_by)->first(); 
                                 $cash_points_negotiation_started= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                 $point= new CashPoint();
                                 $point->user_id= $deal_negotiation_started->updated_by;
                                 $point->project_id= $project_id->id;
                                 $point->activity= $user_name->name . ' started negotiation started';
                                 $point->gained_as = "Individual";
                                 $point->points= ($bonus_point*$kpi->negotiation_started)/100;
 
                                 if ($cash_points_negotiation_started != null) {
                                
                                     $point->total_points_earn= $cash_points_negotiation_started->total_points_earn+ ($bonus_point*$kpi->negotiation_started)/100;
 
                                 }else 
                                 {
                                     $point->total_points_earn=  ($bonus_point*$kpi->negotiation_started)/100;
 
                                 }
                                 $point->save();
                                
                            
                                 $deal_milestone_breakdown= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',5)->first();
                                 if ($deal_milestone_breakdown != null) {
                                    $user_name= User::where('id',$deal_milestone_breakdown->updated_by)->first(); 
                                 $cash_points_milestone_breakdown= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                 $point= new CashPoint();
                                 $point->user_id= $deal_milestone_breakdown->updated_by;
                                 $point->project_id= $project_id->id;
                                 $point->activity= $user_name->name . ' created the milestone breakdown';
                                 $point->gained_as = "Individual";
                                 $point->points= ($bonus_point*$kpi->milestone_breakdown)/100;
 
                                 if ($cash_points_milestone_breakdown != null) {
                                
                                     $point->total_points_earn= $cash_points_milestone_breakdown->total_points_earn+ ($bonus_point*$kpi->milestone_breakdown)/100;
 
                                 }else 
                                 {
                                     $point->total_points_earn=
                                     ($bonus_point*$kpi->milestone_breakdown)/100;
 
                                 }
                                 $point->save();

                                 
                                 
                                 }
                                 $deal_id= Deal::where('id',$deal->id)->first();
                                 //dd($deal_id);
                                 $user_name= User::where('id',$deal_id->added_by)->first(); 

                                 $cash_points_close_deal= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                 $point= new CashPoint();
                                 $point->user_id= $deal_id->added_by;
                                 $point->project_id= $project_id->id;
                                 $point->activity= $user_name->name . ' closed the deal';
                                 $point->gained_as = "Individual";
                                 $point->points= ($project_budget*$kpi->closed_deal)/100;
 
                                 if ($cash_points_close_deal != null) {
                                
                                     $point->total_points_earn= $cash_points_close_deal->total_points_earn+ ($project_budget*$kpi->closed_deal)/100;
 
                                 }else 
                                 {
                                     $point->total_points_earn=
                                     ($project_budget*$kpi->closed_deal)/100;
 
                                 }
                                 $point->save();
                                 $deal_id_contact= Deal::where('id',$request->id)->first();
                                 $user_name= User::where('id',$deal_id_contact->added_by)->first(); 

                                 $cash_points_contact= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                 $point= new CashPoint();
                                 $point->user_id= $deal_id_contact->added_by;
                                 $point->project_id= $project_id->id;
                                 $point->activity= $user_name->name . ' submitted the contact form for the project manager';
                                 $point->gained_as = "Individual";
                                 $point->points= ($project_budget*$kpi->contact_form)/100;
 
                                 if ($cash_points_contact != null) {
                                
                                     $point->total_points_earn= $cash_points_contact->total_points_earn+ ($project_budget*$kpi->contact_form)/100;
 
                                 }else 
                                 {
                                     $point->total_points_earn=
                                     ($project_budget*$kpi->contact_form)/100;
 
                                 }
                                 $point->save();
                                
                                

                                
                                     // start team lead point calculation here

                                     // If sales team generates sales from To per month,  team lead will get  % points of the sales amount.


                     $kpi= kpiSetting::first();
                       
                     $project_budget= ($deal->amount * $kpi->accepted_by_pm)/100;
                  
                     
                         if($deal->lead_id != null)
                         {
                             $lead = Lead::where('id',$deal->lead_id)->first();
                             $user_name= User::where('id',$lead->added_by)->first(); 
                             $cash_points= CashPoint::where('user_id',$lead->added_by)->orderBy('id','desc')->first();
                             $point= new CashPoint();
                             $point->user_id= $lead->added_by;
                             $point->project_id= $project_id->id;
                             $point->activity= $user_name->name . ' created the bid';
                             $point->gained_as = "Individual";
                             $point->points= ($project_budget*$kpi->the_bidder)/100;
 
                             if ($cash_points != null) {
                            
                                 $point->total_points_earn= $cash_points->total_points_earn+ ($project_budget*$kpi->the_bidder)/100;
 
                             }else 
                             {
                                 $point->total_points_earn=  ($project_budget*$kpi->the_bidder)/100;
 
                             }
                             $point->save();
                            // dd($point);
 
                         }
                                 $deal_qualified= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',1)->first();

 
                                 $user_name= User::where('id',$deal_qualified->updated_by)->first(); 
                                 $cash_points_qualified= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                 $point= new CashPoint();
                                 $point->user_id= $deal_qualified->updated_by;
                                 $point->project_id= $project_id->id;
                                 $point->activity= $user_name->name . ' made the deal qulaify deal';
                                 $point->gained_as = "Individual";
                                 $point->points= ($project_budget*$kpi->qualify)/100;
 
                                 if ($cash_points_qualified != null) {
                                
                                     $point->total_points_earn= $cash_points_qualified->total_points_earn+ ($project_budget*$kpi->qualify)/100;
 
                                 }else 
                                 {
                                     $point->total_points_earn=  ($project_budget*$kpi->qualify)/100;
 
                                 }
                                 $point->save();
                               
 
                            
                                 $deal_short_code= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',2)->first();
 
                                 $user_name= User::where('id',$deal_short_code->updated_by)->first(); 
                                 $cash_points_requirements_defined= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                 $point= new CashPoint();
                                 $point->user_id= $deal_short_code->updated_by;
                                 $point->project_id= $project_id->id;
                                 $point->activity= $user_name->name . ' made the deal requirements defined';
                                 $point->gained_as = "Individual";
                                 $point->points= ($project_budget*$kpi->requirements_defined)/100;
 
                                 if ($cash_points_requirements_defined != null) {
                                
                                     $point->total_points_earn= $cash_points_requirements_defined->total_points_earn+ ($project_budget*$kpi->requirements_defined)/100;
 
                                 }else 
                                 {
                                     $point->total_points_earn=  ($project_budget*$kpi->requirements_defined)/100;
 
                                 }
                                 $point->save();
                                
 
                           
                             
                                 $deal_proposal= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',3)->first();
                                 $user_name= User::where('id',$deal_proposal->updated_by)->first(); 
                                 $cash_points_proposal_made= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                 $point= new CashPoint();
                                 $point->user_id= $deal_proposal->updated_by;
                                 $point->project_id= $project_id->id;
                                 $point->activity= $user_name->name . ' created the proposal';
                                 $point->gained_as = "Individual";
                                 $point->points= ($project_budget*$kpi->proposal_made)/100;
 
                                 if ($cash_points_proposal_made != null) {
                                
                                     $point->total_points_earn= $cash_points_proposal_made->total_points_earn+ ($project_budget*$kpi->proposal_made)/100;
 
                                 }else 
                                 {
                                     $point->total_points_earn=  ($project_budget*$kpi->proposal_made)/100;
 
                                 }
                                 $point->save();
                                
 
                             
                                 $deal_negotiation_started= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',4)->first();                               
                                 $user_name= User::where('id',$deal_negotiation_started->updated_by)->first(); 
                                 $cash_points_negotiation_started= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                 $point= new CashPoint();
                                 $point->user_id= $deal_negotiation_started->updated_by;
                                 $point->project_id= $project_id->id;
                                 $point->activity= $user_name->name . ' started negotiation started';
                                 $point->gained_as = "Individual";
                                 $point->points= ($project_budget*$kpi->negotiation_started)/100;
 
                                 if ($cash_points_negotiation_started != null) {
                                
                                     $point->total_points_earn= $cash_points_negotiation_started->total_points_earn+ ($project_budget*$kpi->negotiation_started)/100;
 
                                 }else 
                                 {
                                     $point->total_points_earn=  ($project_budget*$kpi->negotiation_started)/100;
 
                                 }
                                 $point->save();
                                
                            
                                 $deal_milestone_breakdown= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',5)->first();
                                 $user_name= User::where('id',$deal_milestone_breakdown->updated_by)->first(); 
                                 $cash_points_milestone_breakdown= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                 $point= new CashPoint();
                                 $point->user_id= $deal_milestone_breakdown->updated_by;
                                 $point->project_id= $project_id->id;
                                 $point->activity= $user_name->name . ' created the milestone breakdown';
                                 $point->gained_as = "Individual";
                                 $point->points= ($project_budget*$kpi->milestone_breakdown)/100;
 
                                 if ($cash_points_milestone_breakdown != null) {
                                
                                     $point->total_points_earn= $cash_points_milestone_breakdown->total_points_earn+ ($project_budget*$kpi->milestone_breakdown)/100;
 
                                 }else 
                                 {
                                     $point->total_points_earn=
                                     ($project_budget*$kpi->milestone_breakdown)/100;
 
                                 }
                                 $point->save();


                                 if ($deal->amount > $kpi->generate_single_deal) {

                                    $bonus_point= $kpi->bonus_point;
                                    if($deal->lead_id != null)
                         {
                             $lead = Lead::where('id',$deal->lead_id)->first();
                             $user_name= User::where('id',$lead->added_by)->first(); 
                             $cash_points= CashPoint::where('user_id',$lead->added_by)->orderBy('id','desc')->first();
                             $point= new CashPoint();
                             $point->user_id= $lead->added_by;
                             $point->project_id= $project_id->id;
                             $point->activity= $user_name->name . ' created the bid';
                             $point->gained_as = "Individual";
                             $point->points= ($bonus_point*$kpi->the_bidder)/100;
 
                             if ($cash_points != null) {
                            
                                 $point->total_points_earn= $cash_points->total_points_earn+ ($bonus_point*$kpi->the_bidder)/100;
 
                             }else 
                             {
                                 $point->total_points_earn=  ($bonus_point*$kpi->the_bidder)/100;
 
                             }
                             $point->save();
                            // dd($point);
 
                         }
                                 $deal_qualified= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',1)->first();

 
                                 $user_name= User::where('id',$deal_qualified->updated_by)->first(); 
                                 $cash_points_qualified= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                 $point= new CashPoint();
                                 $point->user_id= $deal_qualified->updated_by;
                                 $point->project_id= $project_id->id;
                                 $point->activity= $user_name->name . ' made the deal qulaify deal';
                                 $point->gained_as = "Individual";
                                 $point->points= ($bonus_point*$kpi->qualify)/100;
 
                                 if ($cash_points_qualified != null) {
                                
                                     $point->total_points_earn= $cash_points_qualified->total_points_earn+ ($bonus_point*$kpi->qualify)/100;
 
                                 }else 
                                 {
                                     $point->total_points_earn=  ($bonus_point*$kpi->qualify)/100;
 
                                 }
                                 $point->save();
                               
 
                            
                                 $deal_short_code= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',2)->first();
 
                                 $user_name= User::where('id',$deal_short_code->updated_by)->first(); 
                                 $cash_points_requirements_defined= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                 $point= new CashPoint();
                                 $point->user_id= $deal_short_code->updated_by;
                                 $point->project_id= $project_id->id;
                                 $point->activity= $user_name->name . ' made the deal requirements defined';
                                 $point->gained_as = "Individual";
                                 $point->points= ($bonus_point*$kpi->requirements_defined)/100;
 
                                 if ($cash_points_requirements_defined != null) {
                                
                                     $point->total_points_earn= $cash_points_requirements_defined->total_points_earn+ ($bonus_point*$kpi->requirements_defined)/100;
 
                                 }else 
                                 {
                                     $point->total_points_earn=  ($bonus_point*$kpi->requirements_defined)/100;
 
                                 }
                                 $point->save();
                                
 
                           
                             
                                 $deal_proposal= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',3)->first();
                                 $user_name= User::where('id',$deal_proposal->updated_by)->first(); 
                                 $cash_points_proposal_made= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                 $point= new CashPoint();
                                 $point->user_id= $deal_proposal->updated_by;
                                 $point->project_id= $project_id->id;
                                 $point->activity= $user_name->name . ' created the proposal';
                                 $point->gained_as = "Individual";
                                 $point->points= ($bonus_point*$kpi->proposal_made)/100;
 
                                 if ($cash_points_proposal_made != null) {
                                
                                     $point->total_points_earn= $cash_points_proposal_made->total_points_earn+ ($bonus_point*$kpi->proposal_made)/100;
 
                                 }else 
                                 {
                                     $point->total_points_earn=  ($bonus_point*$kpi->proposal_made)/100;
 
                                 }
                                 $point->save();
                                
 
                             
                                 $deal_negotiation_started= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',4)->first();                               
                                 $user_name= User::where('id',$deal_negotiation_started->updated_by)->first(); 
                                 $cash_points_negotiation_started= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                 $point= new CashPoint();
                                 $point->user_id= $deal_negotiation_started->updated_by;
                                 $point->project_id= $project_id->id;
                                 $point->activity= $user_name->name . ' started negotiation started';
                                 $point->gained_as = "Individual";
                                 $point->points= ($bonus_point*$kpi->negotiation_started)/100;
 
                                 if ($cash_points_negotiation_started != null) {
                                
                                     $point->total_points_earn= $cash_points_negotiation_started->total_points_earn+ ($bonus_point*$kpi->negotiation_started)/100;
 
                                 }else 
                                 {
                                     $point->total_points_earn=  ($bonus_point*$kpi->negotiation_started)/100;
 
                                 }
                                 $point->save();
                                
                            
                                 $deal_milestone_breakdown= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',5)->first();
                                 if($deal_milestone_breakdown != null)
                                 {
                                    $user_name= User::where('id',$deal_milestone_breakdown->updated_by)->first(); 
                                 $cash_points_milestone_breakdown= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                 $point= new CashPoint();
                                 $point->user_id= $deal_milestone_breakdown->updated_by;
                                 $point->project_id= $project_id->id;
                                 $point->activity= $user_name->name . ' created the milestone breakdown';
                                 $point->gained_as = "Individual";
                                 $point->points= ($bonus_point*$kpi->milestone_breakdown)/100;
 
                                 if ($cash_points_milestone_breakdown != null) {
                                
                                     $point->total_points_earn= $cash_points_milestone_breakdown->total_points_earn+ ($bonus_point*$kpi->milestone_breakdown)/100;
 
                                 }else 
                                 {
                                     $point->total_points_earn=
                                     ($bonus_point*$kpi->milestone_breakdown)/100;
 
                                 }
                                 $point->save();

                                 }

                                 

                                 }
                     }
                     $currentMonth = Carbon::now()->month;
                                    //  $monthly_deal = Deal::whereMonth('created_at', $currentMonth)->sum('amount');
                                    $monthly_deal = 30000;

                                     $kpi_settings= kpiSettingGenerateSale::all();
                                     $user_name= User::where('rolw_id',8)->first(); 
                                     $cash_points_team_lead= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                     foreach ($kpi_settings as $value) {
                                        if ($value->generate_sales_from >= $monthly_deal &&  $monthly_deal <= $value->generate_sales_to ) {

                                     $point= new CashPoint();
                                     $point->user_id= $deal_id_contact->added_by;
                                     $point->project_id= $project_id->id;
                                     $point->activity= $user_name->name . ' for achieving monthly target';
                                     $point->gained_as = "Individual";
                                     $point->points= ($project_budget*$value->generate_sales_amount)/100;
     
                                     if ($cash_points_team_lead != null) {
                                    
                                         $point->total_points_earn= $cash_points_contact->total_points_earn+ ($project_budget*$value->generate_sales_amount)/100;
     
                                     }else 
                                     {
                                         $point->total_points_earn=
                                         ($project_budget*$value->generate_sales_amount)/100;
     
                                     }
                                     $point->save();
                                            
                                        }
                                     }

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


    }
    public function DealUrl($id)
    {
        $this->pageTitle = 'Client Submission Information';
        $this->middleware(function ($request, $next) {
            abort_403(!in_array('contracts', $this->user->modules));
            return $next($request);
        });
        $deal = Deal::where('id', $id)->first();
        $client = ClientForm::where('deal_id', $deal->id)->first();

        return view('contracts.dealurl', compact('deal', 'client'), $this->data);
    }
    public function DealDeny(Request $request)
    {
        $deal = Deal::find($request->id);
        $deal->reason = $request->reason;
        $deal->status = 'Denied';
        $deal->save();

        $pm_id = PMProject::where('deal_id', $request->id)->first();
        $project = Project::find($pm_id->project_id);
        //  dd($project);
        $project->project_status = 'Denied';
        $project->status = 'Denied';
        $pmassign = PMAssign::where('pm_id', $pm_id->pm_id)->first();
        //  dd($pmassign);
        $pmassign_id = PMAssign::find($pmassign->id);
        //$deal_id=$request->id;
        $pmassign_id->project_count = $pmassign->project_count - 1;
        $pmassign_id->amount = $pmassign->amount - $deal->amount;
        $pmassign_id->save();
        // $pm_project= PMProject::find($pm_id->id);
        // $pm_project->delete();
        $agent_id = Project::where('id', $pm_id->project_id)->first();
        $agent = SalesCount::where('user_id', $agent_id->added_by)->first();
        $lead_ag = SalesCount::find($agent->id);

        $lead_ag->wrong_deals = $lead_ag->wrong_deals + 1;
        $lead_ag->save();
        return redirect('/account/contracts/' . $deal->id)->with('messages.contractAdded');
    }

    public function store(StoreRequest $request)
    {
        //dd($request);
        $contract = new Contract();

        $this->storeUpdate($request, $contract);

        return redirect()(route('contracts.index'), __('messages.contractAdded'));
    }

    public function edit($id)
    {
        $this->editPermission = user()->permission('edit_contract');
        $this->contract = Contract::with('signature', 'renewHistory', 'renewHistory.renewedBy')
            ->find($id)
            ->withCustomFields();

        abort_403(
            !(
                $this->editPermission == 'all' ||
                ($this->editPermission == 'added' && user()->id == $this->contract->added_by) ||
                ($this->editPermission == 'owned' && user()->id == $this->contract->client_id) ||
                ($this->editPermission == 'both' && (user()->id == $this->contract->client_id || user()->id == $this->contract->added_by))
            )
        );

        $this->clients = User::allClients();
        $this->contractTypes = ContractType::all();
        $this->currencies = Currency::all();
        if (!empty($this->contract->getCustomFieldGroupsWithFields())) {
            $this->fields = $this->contract->getCustomFieldGroupsWithFields()->fields;
        }

        if (request()->ajax()) {
            $this->pageTitle = __('app.update') . ' ' . __('app.menu.contract');
            $html = view('contracts.ajax.edit', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'contracts.ajax.edit';
        return view('contracts.create', $this->data);
    }

    public function update(UpdateRequest $request, $id)
    {
        $contract = Contract::findOrFail($id);

        $this->storeUpdate($request, $contract);

        return Reply::redirect(route('contracts.index'), __('messages.contractUpdated'));
    }

    private function storeUpdate($request, $contract)
    {
        $userrole = RoleUser::where('role_id', 4)->get();
        //dd($userrole);
        foreach ($userrole as $row) {
            $row->user_id;
            //dd($row->user_id);
        }
        $contract->client_id = $request->client;
        $contract->subject = $request->subject;
        $contract->amount = $request->amount;
        $contract->currency_id = $request->currency_id;
        $contract->original_amount = $request->amount;
        $contract->contract_name = $request->contract_name;
        $contract->alternate_address = $request->alternate_address;
        $contract->cell = $request->cell;
        $contract->office = $request->office;
        $contract->city = $request->city;
        $contract->state = $request->state;
        $contract->country = $request->country;
        $contract->postal_code = $request->postal_code;
        $contract->contract_type_id = $request->contract_type;
        $contract->start_date = Carbon::createFromFormat($this->global->date_format, $request->start_date)->format('Y-m-d');
        $contract->original_start_date = Carbon::createFromFormat($this->global->date_format, $request->start_date)->format('Y-m-d');
        $contract->end_date = $request->end_date == null ? $request->end_date : Carbon::createFromFormat($this->global->date_format, $request->end_date)->format('Y-m-d');
        $contract->original_end_date = $request->end_date == null ? $request->end_date : Carbon::createFromFormat($this->global->date_format, $request->end_date)->format('Y-m-d');
        $contract->description = str_replace('<p><br></p>', '', trim($request->description));
        $contract->contract_detail = $request->contract_detail;
        //

        if ($request->company_logo_delete == 'yes') {
            Files::deleteFile($contract->company_logo, 'contract-logo');
            $contract->company_logo = null;
        }

        if ($request->hasFile('company_logo')) {
            Files::deleteFile($contract->company_logo, 'contract-logo');
            $contract->company_logo = Files::upload($request->company_logo, 'contract-logo', 300);
        }

        if ($request->contract_detail) {
            $contract->contract_detail = $request->contract_detail;
        }

        $contract->save();

        // if ($request->get('custom_fields_data')) {
        //     $contract->updateCustomFieldData($request->get('custom_fields_data'));
        // }

        return $contract;
    }

    /**
     * @param int $id
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View|mixed|void
     */
    public function show($id)
    {
        $viewPermission = user()->permission('view_contract');
        $this->viewDiscussionPermission = $viewDiscussionPermission = user()->permission('view_contract_discussion');
        $this->viewContractFilesPermission = $viewContractFilesPermission = user()->permission('view_contract_files');

        $this->contract = Contract::with([

            'client',
            'client.clientDetails',
            'files' => function ($q) use ($viewContractFilesPermission) {
                if ($viewContractFilesPermission == 'added') {
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
            !(
                $viewPermission == 'all' ||
                ($viewPermission == 'added' && user()->id == $this->contract->added_by) ||
                ($viewPermission == 'owned' && user()->id == $this->contract->client_id) ||
                ($viewPermission == 'both' && (user()->id == $this->contract->client_id || user()->id == $this->contract->added_by))
            )
        );

        $this->pageTitle = __('Deals') . ' #' . $this->contract->deal->deal_id;

        $this->view = 'contracts.ajax.summary';

        $tab = request('tab');

        switch ($tab) {
            case 'discussion':
                $this->view = 'contracts.ajax.discussion';
                break;
            case 'files':
                $this->view = 'contracts.ajax.files';
                break;
            case 'renew':
                $this->view = 'contracts.ajax.renew';
                break;
            default:
                $this->view = 'contracts.ajax.summary';
                break;
        }

        if (request()->ajax()) {
            $html = view($this->view, $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->activeTab = $tab == '' ? 'profile' : $tab;

        return view('contracts.show', $this->data);
    }

    public function download($id)
    {
        $this->contract = Contract::findOrFail($id);
        $viewPermission = user()->permission('view_contract');
        $this->contract = Contract::with('signature', 'client', 'client.clientDetails', 'files')->findOrFail($id);

        abort_403(
            !(
                $viewPermission == 'all' ||
                ($viewPermission == 'added' && user()->id == $this->contract->added_by) ||
                ($viewPermission == 'owned' && user()->id == $this->contract->client_id) ||
                ($viewPermission == 'both' && (user()->id == $this->contract->client_id || user()->id == $this->contract->added_by))
            )
        );

        $pdf = app('dompdf.wrapper');

        $this->global = $this->settings = global_setting();

        $this->invoiceSetting = invoice_setting();

        $pdf->getDomPDF()->set_option('enable_php', true);
        App::setLocale($this->invoiceSetting->locale);
        Carbon::setLocale($this->invoiceSetting->locale);
        $pdf->loadView('contracts.contract-pdf', $this->data);

        $dom_pdf = $pdf->getDomPDF();
        $canvas = $dom_pdf->getCanvas();
        $canvas->page_text(530, 820, 'Page {PAGE_NUM} of {PAGE_COUNT}', null, 10);
        $filename = 'contract-' . $this->contract->id;

        return $pdf->download($filename . '.pdf');
    }

    public function downloadView($id)
    {
        $this->contract = Contract::findOrFail($id);
        $pdf = app('dompdf.wrapper');

        $this->global = $this->settings = global_setting();

        $this->invoiceSetting = invoice_setting();

        $pdf->getDomPDF()->set_option('enable_php', true);
        App::setLocale($this->invoiceSetting->locale);
        Carbon::setLocale($this->invoiceSetting->locale);
        $pdf->loadView('contracts.contract-pdf', $this->data);

        $dom_pdf = $pdf->getDomPDF();
        $canvas = $dom_pdf->getCanvas();
        $canvas->page_text(530, 820, 'Page {PAGE_NUM} of {PAGE_COUNT}', null, 10);
        $filename = 'contract-' . $this->contract->id;

        return [
            'pdf' => $pdf,
            'fileName' => $filename,
        ];
    }

    public function sign(SignRequest $request, $id)
    {
        //dd($request);
        $this->contract = Contract::with('signature')->findOrFail($id);

        if ($this->contract && $this->contract->signature) {
            return Reply::error(__('messages.alreadySigned'));
        }

        $sign = new ContractSign();
        $sign->full_name = $request->first_name . ' ' . $request->last_name;
        $sign->contract_id = $this->contract->id;
        $sign->email = $request->email;
        $imageName = null;

        if ($request->signature_type == 'signature') {
            $image = $request->signature; // your base64 encoded
            $image = str_replace('data:image/png;base64,', '', $image);
            $image = str_replace(' ', '+', $image);
            $imageName = str_random(32) . '.' . 'jpg';

            if (!File::exists(public_path(Files::UPLOAD_FOLDER . '/' . 'contract/sign'))) {
                File::makeDirectory(public_path(Files::UPLOAD_FOLDER . '/contract/sign'), 0775, true);
            }

            File::put(public_path() . '/' . Files::UPLOAD_FOLDER . '/contract/sign/' . $imageName, base64_decode($image));
        } else {
            if ($request->hasFile('image')) {
                $imageName = Files::upload($request->image, 'contract/sign', 300);
            }
        }

        $sign->signature = $imageName;
        $sign->save();

        event(new ContractSignedEvent($this->contract, $sign));

        return Reply::redirect(route('contracts.show', $this->contract->id));
    }
    public function UpdateDealID(Request $request)
    {
      $deal= Deal::find($request->deal_id);
      $deal->status= 'Denied';
      $deal->save();
      $project_id= Project::where('deal_id',$deal->id)->first();
      $project= Project::find($project_id->id);

      $project->status = 'canceled';
      $project->project_status= "Not Accepted";
      $project->save();
      return response()->json(
            [
                'success' => true,
                'message' => 'Data inserted successfully'
            ]
        );
    }
}
