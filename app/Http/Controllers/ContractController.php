<?php

namespace App\Http\Controllers;

use Auth;
use Mail;
use Crypt;
use Toastr;
use DateTime;
use Exception;
use DataTables;
use Notification;
use Carbon\Carbon;
use App\Models\Deal;
use App\Models\Lead;
use App\Models\User;
use App\Helper\Files;
use App\Helper\Reply;
use App\Models\Country;
use App\Models\Project;
use App\Models\BasicSeo;
use App\Models\Contract;
use App\Models\Currency;
use App\Models\PMAssign;
use App\Models\RoleUser;
use App\Mail\WonDealMail;
use App\Models\CashPoint;
use App\Models\DealStage;
use App\Models\PMProject;
use App\Models\ClientForm;
use App\Models\kpiSetting;
use App\Models\SalesCount;
use App\Models\WebContent;
use App\Models\BlogArticle;
use App\Models\CustomField;
use App\Models\ContractSign;
use App\Models\ContractType;
use Illuminate\Http\Request;
use App\Models\ClientDetails;
use App\Models\PendingAction;
use App\Models\ProjectMember;
use App\Models\QualifiedSale;
use App\Models\CustomFieldData;
use App\Models\DealStageChange;
use App\Models\EmployeeDetails;
use App\Models\AwardTimeIncress;
use App\Models\ContractTemplate;
use App\Models\ProjectMilestone;
use App\Models\PendingActionPast;
use App\Traits\CustomFieldsTrait;
use App\Models\ContractCustomForm;
use App\Models\ProductDescription;
use Illuminate\Support\Facades\DB;
use App\Events\ContractSignedEvent;
use App\Models\AuthorizationAction;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\File;
use App\DataTables\WonDealsDataTable;
use App\Models\LeadsDealsActivityLog;
use App\Models\kpiSettingGenerateSale;
use Illuminate\Support\Facades\Redirect;
use App\Models\ProductCategoryCollection;
use Illuminate\Support\Facades\Validator;
use App\Notifications\WonDealNotification;
use App\Notifications\HourlyDealNotification;
use App\Http\Requests\Admin\Contract\StoreRequest;
use App\Http\Requests\ClientContracts\SignRequest;
use App\Http\Requests\Admin\Contract\UpdateRequest;
use App\Http\Controllers\HelperPendingActionController;
use App\Notifications\DealAuthorizationSendNotification;

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
//this function belongs to won deal table page. At first we used laravel yajra datatables and then we converted it to react table
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

    //there is no use of below functions currently

    // public function applyQuickAction(Request $request)
    // {
    //     if ($request->action_type == 'delete') {
    //         $this->deleteRecords($request);
    //         return Reply::success(__('messages.deleteSuccess'));
    //     }

    //     return Reply::error(__('messages.selectAction'));
    // }

    // protected function deleteRecords($request)
    // {
    //     abort_403(user()->permission('delete_contract') !== 'all');

    //     Contract::whereIn('id', explode(',', $request->row_ids))->delete();
    //     return true;
    // }

    // public function destroy($id)
    // {
    //     $contract = Contract::findOrFail($id);
    //     $this->deletePermission = user()->permission('delete_contract');

    //     abort_403(
    //         !($this->deletePermission == 'all' ||
    //             ($this->deletePermission == 'added' && user()->id == $contract->added_by) ||
    //             ($this->deletePermission == 'owned' && user()->id == $contract->client_id) ||
    //             ($this->deletePermission == 'both' && (user()->id == $contract->client_id || user()->id == $contract->added_by))
    //         )
    //     );

    //     Contract::destroy($id);
    //     return Reply::success(__('messages.contactDeleted'));
    // }

    // public function create()
    // {
    //     $this->addPermission = user()->permission('add_contract');

    //     abort_403(!in_array($this->addPermission, ['all', 'added']));

    //     $this->contractId = request('id');
    //     $this->contract = null;

    //     if ($this->contractId != '') {
    //         $this->contract = Contract::findOrFail($this->contractId);
    //     }

    //     $this->templates = ContractTemplate::all();
    //     $this->clients = User::allClients();
    //     $this->contractTypes = ContractType::all();
    //     $this->currencies = Currency::all();
    //     $contract = new ContractCustomForm();

    //     if (!empty($contract->getCustomFieldGroupsWithFields())) {
    //         $this->fields = $contract->getCustomFieldGroupsWithFields()->fields;
    //     }

    //     $this->contractTemplate = request('template') ? ContractTemplate::findOrFail(request('template')) : null;

    //     if (request()->ajax()) {
    //         $this->pageTitle = __('app.add') . ' ' . __('app.menu.contract');
    //         $html = view('contracts.ajax.create', $this->data)->render();
    //         return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
    //     }

    //     $this->view = 'contracts.ajax.create';
    //     return view('contracts.create', $this->data);
    // }

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
        if(Auth::user()->role_id!=1 && $deal->status!='pending') abort_403(true);
        return view('contracts.editdealdetails', $this->data, compact('deal'));
    }
//storing new deals
    public function storeDeal(Request $request)
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
        //$date= Carbon::now();
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
        $project->project_budget = (($request->amount) + ($request->upsell_amount)) / $currency->exchange_rate;

        $project->completion_percent = 0;
        $project->deal_id = $deal->id;
        $project->added_by = Auth::id();
        $project->status = 'not started';
        $project->public = 0;
        $project->due = $deal->amount + $deal->upsell_amount;


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
       // dd($project);

        if ($existing_client != null) {
            // /dd("true");
            $find_pm_id = Project::where('client_id', $existing_client->id)->orderBy('id', 'desc')->where('id', '!=', $project->id)->where('pm_id', '!=', null)->first();

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

        return response()->json([
            'status' => 'success',
            'redirectUrl' => route('dealDetails', $deal->id)
        ]);
    }
    //storing lead to deal
    public function storeLeadDeal(Request $request)
    {
        // dd($request->all());
        DB::beginTransaction();
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

        if ($request->project_type != 'hourly') {
            $request->validate([
                'deadline' => 'required|date',
            ]);
        }


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
        } elseif ($deal_stage->deal_stage == 6) {
            $deal->deal_stage = 6;
            $deal->save();
        } else {
            $deal->deal_stage = $deal_stage->deal_stage;
            $deal->comments = $deal_stage->comments;
            $deal->won_lost = 'Yes';
            $deal->status = 'pending';
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
        $deal = $deal ? Deal::where('lead_id', $deal->lead_id)->first() ?: new Deal() : new Deal();
        $deal->deal_id = $request->deal_id;
        $deal->project_name = $request->project_name;
        $deal->profile_link = $request->profile_link;
        $deal->message_link = $value;
        $deal->original_currency_id = $request->original_currency_id;
        $deal->currency_id = 1;
        $deal->project_type = $request->project_type;
        $deal->actual_amount =  $request->amount;
        $deal->is_drafted = 1;
        $currency = Currency::where('id', $request->original_currency_id)->first();
        //  dd($currency);
        $deal->amount = ($request->amount) / $currency->exchange_rate;
        $deal->client_name = $request->client_name;
        $deal->client_username = $request->user_name;
        $deal->lead_id = $request->lead_id;
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

        if ($deal->project_type == 'hourly') {
            $today = \Carbon\Carbon::now();
            $deadline = $today->addYear();
            $deal->deadline = $deadline;
        } else {
            $deal->deadline = $request->deadline;
        }

        $deal->save();
        // dd($deal);
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
        $deal->submission_status = 'Submitted';

        $client_details = ClientForm::where('client_username', $user->user_name)->first();
        // /dd($client_details);
        if ($client_details != null) {
            $deal_client->submission_status = 'Submitted';

            $new_client_form = new ClientForm();
            $new_client_form->deal_id = $deal->id;
            $new_client_form->client_username = $client_details->client_username;
            $new_client_form->client_email = $client_details->client_email;
            $new_client_form->client_phone = $client_details->client_phone;
            $new_client_form->client_whatsapp = $client_details->client_whatsapp;
            $new_client_form->client_skype = $client_details->client_skype;
            $new_client_form->client_telegram = $client_details->client_telegram;
            $new_client_form->client_messenger = $client_details->client_messenger;
            $new_client_form->client_imo = $client_details->client_imo;
            $new_client_form->message = $client_details->message;
            $new_client_form->timezone = $client_details->timezone;
            $new_client_form->day = $client_details->day;
            $new_client_form->checklist = $client_details->checklist;
            $new_client_form->save();
        }
        // dd($new_client_form);
        $deal_client->save();

        $contract = Contract::find($deal->id) ?: new Contract();
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
        $project->project_budget = (($request->amount) + ($request->upsell_amount)) / $currency->exchange_rate;
        $project->due = $deal->amount + $deal->upsell_amount;

        $project->completion_percent = 0;
        $project->deal_id = $deal->id;
        $project->added_by = Auth::id();
        $project->status = 'not started';
        $project->public = 0;
        $project->save();
        //   dd($project);

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
        $text = $user->getRole->name . ' ' . $user->name . ' - Closed Deal (' . $deal->project_name . ') for ' . $deal->actual_amount . '$ (Client: ' . $deal->client_name . ')';
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
            'redirectUrl' => route('account.sale-risk-policies.risk-analysis', $deal->id)
        ]);
    }
    public function Milestone($id)
    {
        $milestones = ProjectMilestone::where('project_id', $id)->get();
        return response()->json([
            'milestones' => $milestones,
        ]);
    }
    //storing milestone on deal details
    public function storeMilestone(Request $request)
    {
            //    dd($request->all());
        $total_value = $request->input('another_value') * 2;

        $project = Project::where('id', $request->project_id)->first();
        $deal = Deal::where('id', $project->deal_id)->first();
        $milestone_amount = ProjectMilestone::where('project_id', $project->id)->sum('actual_cost');
        $check = ($deal->actual_amount + $deal->upsell_actual_amount) - ($milestone_amount);
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
            $milestone->service_type = $request->service_type;

            $milestone->actual_cost =  $request->cost;
            $project = Project::where('id', $request->project_id)->first();
            $deal = Deal::where('id', $project->deal_id)->first();

            //dd($deal);
            $milestone->original_currency_id = $deal->original_currency_id;
            $currency = Currency::where('id', $deal->original_currency_id)->first();
            //dd($currency);
            $milestone->cost = ($request->cost) / $currency->exchange_rate;
            // if($request->milestone_type == 'Client Created this Milestone')
            // {
            //     $deal->settled_milestone_amount= $deal->settled_milestone_amount+ (($request->cost) / $currency->exchange_rate);
            //     $milestone->active_status= 1;

            // }else
            // {
            //     $deal->unsettled_milestone_amount= $deal->unsettled_milestone_amount+ (($request->cost) / $currency->exchange_rate);
            //     $milestone->active_status= 0;

            // }
            // $deal->save();

            $milestone->summary = $request->summary;
            $milestone->currency_id = 1;
            $milestone->added_by = Auth::id();


            $milestone->save();


            if($request->service_type == 'web-content'){
                $web_content = WebContent::where('random_id', $request->random_id)->first();
                $web_content->milestone_id = $milestone->id;
                $web_content->save();
            }
            if($request->service_type == 'blogs-articles'){
                $blog_article = BlogArticle::where('random_id', $request->random_id)->first();
              //  dd($blog_article);
                $blog_article->milestone_id = $milestone->id;
                $blog_article->save();
            }
            if($request->service_type == 'product-description'){
                $product_description = ProductDescription::where('random_id', $request->random_id)->first();
                $product_description->milestone_id = $milestone->id;
                $product_description->save();
            }
            if($request->service_type == 'product-category'){
                $product_category = ProductCategoryCollection::where('random_id', $request->random_id)->first();
                $product_category->milestone_id = $milestone->id;
                $product_category->save();
            }
            if($request->service_type == 'basic-seo'){
                $basic_seo = BasicSeo::where('random_id', $request->random_id)->first();
                $basic_seo->milestone_id = $milestone->id;
                $basic_seo->save();
            }


            return response()->json([
                'status' => 200,
                'message' => 'Milestone Added Successfully',
            ]);
        }
    }
    //edit milestones on deal details
    public function editMilestone($id)
    {
        $milestone = ProjectMilestone::find($id);
        if ($milestone) {
            return response()->json([
                'status' => 200,
                'milestone' => $milestone,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Milestone Not Found',
            ]);
        }
    }
    //updating milestones on deal details page
    public function updateMilestone(Request $request, $id)
    {

        $projectmilestone = ProjectMilestone::where('id', $id)->first();
        $project_id = Project::where('id', $projectmilestone->project_id)->first();
        $deal = Deal::where('id', $project_id->deal_id)->first();

        $milestone_amount = ProjectMilestone::where('project_id', $project_id->id)->sum('actual_cost');
        $updated_amount = $milestone_amount - $projectmilestone->actual_cost;
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
            if ($milestone) {

                $milestone->milestone_title = $request->title;

                $milestone->actual_cost =  $request->cost;
                $project = Project::where('id', $milestone->project_id)->first();
                $deal = Deal::where('id', $project->deal_id)->first();

                //dd($deal);
                $milestone->original_currency_id = $deal->original_currency_id;
                $currency = Currency::where('id', $deal->original_currency_id)->first();
                //dd($currency);
                $milestone->cost = ($request->cost) / $currency->exchange_rate;
                // if($milestone->milestone_type == 'Client Created this Milestone')
                // {
                //     $deal->settled_milestone_amount= $deal->settled_milestone_amount+ (($request->cost) / $currency->exchange_rate);


                // }else
                // {
                //     $deal->settled_milestone_amount= $deal->unsettled_milestone_amount+ (($request->cost) / $currency->exchange_rate);

                // }
                // $deal->save();
                $milestone->summary = $request->summary;
                $milestone->currency_id = 1;
                $milestone->milestone_type = $request->milestone_type;
                $milestone->service_type = $request->service_type;

                $milestone->update();
                return response()->json([
                    'status' => 200,
                    'message' => 'Milestone Updated Successfully',
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Milestone Not Found',
                ]);
            }
        }
    }
//deleting mielstone on deal details page
    public function deleteMilestone($id)
    {
        $milestone = ProjectMilestone::find($id);
        $milestone->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Milestone Deleted Successfully',
        ]);
    }
    //storing deal large form


    public function storedealDetails(Request $request)
    {
    //    dd($request->all());
    //    DB::beginTransaction();
        $deal_hourly_checked = Deal::where('id', $request->id)->first();
        if ($deal_hourly_checked->project_type != 'hourly') {
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
                'deal_category' => 'required',
                'cms_id' => $request->input('deal_category') === 'Web Development' ? 'required' : '',
                'project_summary' => $request->has('project_summary') ? 'required' : '',

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
                'deal_category.required' => 'This field is required!',
                'cms_id.required' => 'This field is required!',
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
                'description4' => 'required',
                'description5' => 'required',
                'description6' => 'required',
                'description7' => 'required',
                'description8' => 'required',
                'description9' => 'required',
                'deal_category' => 'required',
                'cms_id' => $request->input('deal_category') === 'Web Development' ? 'required' : '',
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
                'description4.required' => 'This field is required. Please provide reference websites and what the references are for here!',
                'description5.required' => 'Client\'s focus or concerning points are required. Please share as detailed explanation as you can!',
                'description6.required' => 'Login details are required. Please provide all the access details of the project!',
                'description7.required' => 'Logo files or Google drive link for logo files are required. Please provide all the access details of the project!',
                'description8.required' => 'To ensure all departments are aligned, we kindly request your confirmation on cross-departmental work for this project. Please let us know if cross-departmental work is involved or not.',
                'description9.required' => 'Notes for the project manager/technical team is required, please write if any notes for manager/technical team are available.',
                'deal_Category.required' => 'This field is required!',
                'cms_id.required' => 'This field is required!',
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
            $item = explode("-", $request->input('cms_id'));
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

            $deal->cms_id = $item[0] ?? null;
            $deal->cms_name = $item[1] ?? null;
            $deal->deal_category = $request->deal_category;
            if ($deal->project_type == 'hourly') {
                $today = \Carbon\Carbon::now();
                $deadline = $today->addYear();
                $deal->deadline = $deadline;
            }else{
                $deal->deadline = $request->deadline;
            }
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
            $deal->description4 = $request->description4;
            $deal->description5 = $request->description5;
            $deal->description6 = $request->description6;
            $deal->description7 = $request->description7;
            $deal->description8 = $request->description8;
            $deal->description9 = $request->description9;
            $deal->is_final = $request->is_final;

            $deal->save();
           // dd($deal);
            $project_id = Project::where('deal_id', $request->id)->first();
            $project = Project::find($project_id->id);
            $project->project_name = $request->project_name;

            if ($deal->project_type == 'hourly') {
                $today = \Carbon\Carbon::now();
                $deadline = $today->addYear();
                $project->deadline = $deadline;
            }else{
                $project->deadline = $request->deadline;
            }

            $currency = Currency::where('id', $request->original_currency_id)->first();
            //dd($currency);
            $project->project_budget = (($request->amount) + ($request->upsell_amount)) / $currency->exchange_rate;
            $project->due = $deal->amount + $deal->upsell_amount;
            $project->currency_id = 1;
          //  $project->project_summary = $request->project_summary;
            $project->save();
          //  dd($project);

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
                //  dd($milestone);


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

        if(!$request->is_drafted && in_array($deal->sale_analysis_status, ['authorized','auto-authorized'])){
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
                $pm_count = PMAssign::select('monthly_project_count')->where('status', 1)->min('monthly_project_count');
                $pm_user = PMAssign::where('monthly_project_count', $pm_count)->where('status', 1)->first();
                if ($pm_count < 2) {
                    if ($pm_user != null) {
                        $pmassign = new PMProject();
                        $pmassign->project_id = $project->id;
                        $pmassign->status = 'pending';
                        if(Auth::user()->role_id==4){
                        $pmassign->pm_id = Auth::id();
                        }else{
                        $pmassign->pm_id = $pm_user->pm_id;
                        }
                        $pmassign->deal_id = $deal->id;
                        $pmassign->client_id = $client->id;
                        $pmassign->save();
                        $deal_assign = Deal::find($deal->id);
                        if(Auth::user()->role_id==4){
                        $deal_assign->pm_id = Auth::id();
                        }else{
                        $deal_assign->pm_id = $pm_user->pm_id;
                        }
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
                    $items = PMAssign::where('status', 1)->get();
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
                        if(Auth::user()->role_id==4){
                        $pmassign->pm_id = Auth::id();
                        }else{
                        $pmassign->pm_id = $pm_find_id->pm_id;
                        }
                        $pmassign->save();
                        $deal_assign = Deal::find($deal->id);
                        if(Auth::user()->role_id==4){
                        $deal_assign->pm_id = Auth::id();
                        }else{
                        $deal_assign->pm_id = $pm_find_id->pm_id;
                        }
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
                        if(Auth::user()->role_id==4){
                        $pmassign->pm_id = Auth::id();
                        }else{
                        $pmassign->pm_id = $final_id->pm_id;
                        }
                        $pmassign->save();
                        $deal_assign = Deal::find($deal->id);
                        if(Auth::user()->role_id==4){
                        $deal_assign->pm_id = Auth::id();
                        }else{
                        $deal_assign->pm_id = $final_id->pm_id;
                        }
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

            $deal_pm_id = Deal::where('id', $request->id)->first();
            $project_id = Project::where('deal_id', $deal_pm_id->id)->first();
            $project_admin_update = Project::find($project_id->id);
            $project_admin_update->added_by = $project_id->pm_id;
            $project_admin_update->project_admin = $project_id->pm_id;
            $project_admin_update->save();

            $qualified_sale = new QualifiedSale();
            $qualified_sale->project_name = $deal->project_name;

            $qualified_sale->deal_id = $deal->id;
            $qualified_sale->project_id = $project->id;
            $qualified_sale->deal_short_code = $deal->deal_id;
            $qualified_sale->date = Carbon::now();
            $qualified_sale->client_id = $deal->client_id;
            $qualified_sale->client_name = $deal->client_name;
            $qualified_sale->pm_id = $project_id->pm_id;
            $qualified_sale->pm_name = $project_id->pm_name->name;
            // $actual_currency= Currency::where('id',$deal->currency_id)->first();

            $qualified_sale->amount = $deal->amount;
            //$qualified_sale->actual_amount= $deal->actual_amount . $currency->currency_code;

            $qualified_sale->save();

            // $helper = new HelperPendingActionController();
            // $helper->WonDealAcceptAuthorization($project,$qualified_sale->pm_id);



            $user = User::where('id', $deal_pm_id->pm_id)->first();
            $this->triggerPusher('notification-channel', 'notification', [
                'user_id' => $user->id,
                'role_id' => 4,
                'title' => 'New project',
                'body' => 'You have new project. Please check',
                'redirectUrl' => route('contracts.show', $deal_pm_id->id)
            ]);
            // if ($deal->project_type == 'fixed') {
            //     $user = User::where('id', $deal_pm_id->pm_id)->first();
            //     Notification::send($user, new WonDealNotification($deal));
            // }else{
            //     Notification::send($user, new HourlyDealNotification($deal));
            // }
           // dd("skdlkasmd ");



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


            $sender = User::where('id', Auth::id())->first();


            //sales lead
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

        }

        $deal = Deal::find($deal->id);
        $deal->authorization_status = $request->is_drafted ? 0 : 2;
        $deal->is_drafted = $request->is_drafted;
        $deal->released_at = $request->is_drafted ? null : Carbon::now();
        $deal->save();

          //  dd($project);
            //need pending action


          //  dd($project);
            //need pending action
            if(Auth::user()->role_id==4){
                $project_member = new ProjectMember();
                $project_member->user_id = Auth::id();
                $project_member->added_by = Auth::id();
                $project_member->project_id = $project->id;
                $project_member->save();
            }
        //    / dd("asd asl d");


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
                'description4' => 'required',
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
                'description4.required' => 'This field is required. Please provide reference websites and what the references are for here!',
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
                'description4' => 'required',
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
                'description4.required' => 'This field is required. Please provide reference websites and what the references are for here!',
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

        if(!$won_deal_id->is_drafted && $request->is_drafted) abort_403(true);

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
            $item = explode("-", $request->input('cms_id'));
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
            if ($deal->project_type == 'hourly') {
                $today = \Carbon\Carbon::now();
                $deadline = $today->addYear();
                $deal->deadline = $deadline;
            }else{
                $deal->deadline = $request->deadline;
            }
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
            $deal->description4 = $request->description4;
            $deal->description5 = $request->description5;
            $deal->description6 = $request->description6;
            $deal->description7 = $request->description7;
            $deal->description8 = $request->description8;
            $deal->description9 = $request->description9;
            $deal->cms_id = $item[0] ?? null;
            $deal->cms_name = $item[1] ?? null;
            $deal->updated_by = Auth::id();
            //                dd($deal);
            $deal->save();

            $project_id = Project::where('deal_id', $request->id)->first();
            $project = Project::find($project_id->id);
            $project->project_name = $request->project_name;

            if ($deal->project_type == 'hourly') {
                $today = \Carbon\Carbon::now();
                $deadline = $today->addYear();
                $project->deadline = $deadline;
            }else{
                $project->deadline = $request->deadline;
            }
            $currency = Currency::where('id', $request->original_currency_id)->first();
            //dd($currency);
            $project->project_budget = (($request->amount) + ($request->upsell_amount)) / $currency->exchange_rate;
            $project->due = $deal->amount + $deal->upsell_amount;
            $project->currency_id = 1;
          //  $project->project_summary = $request->project_summary;
            $project->save();
        //    dd($project);

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

            if ($deal->pm_id == null && ($deal->is_drafted && !$request->is_drafted)) {
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
                    $pm_count = PMAssign::select('monthly_project_count')->where('status', 1)->min('monthly_project_count');
                    $pm_user = PMAssign::where('monthly_project_count', $pm_count)->where('status', 1)->first();
                    if ($pm_count < 2) {
                        if ($pm_user != null) {
                            $pmassign = new PMProject();
                            $pmassign->project_id = $project->id;
                            $pmassign->status = 'pending';
                            if(Auth::user()->role_id==4){
                            $pmassign->pm_id = Auth::id();
                            }else{
                            $pmassign->pm_id = $pm_user->pm_id;
                            }
                            $pmassign->deal_id = $deal->id;
                            $pmassign->client_id = $client->id;
                            $pmassign->save();
                            $deal_assign = Deal::find($deal->id);
                            if(Auth::user()->role_id==4){
                            $deal_assign->pm_id = Auth::id();
                            }else{
                            $deal_assign->pm_id = $pm_user->pm_id;
                            }
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
                        $items = PMAssign::where('status', 1)->get();
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
                            if(Auth::user()->role_id==4){
                            $pmassign->pm_id = Auth::id();
                            }else{
                            $pmassign->pm_id = $pm_find_id->pm_id;
                            }
                            $pmassign->save();
                            $deal_assign = Deal::find($deal->id);
                            if(Auth::user()->role_id==4){
                            $deal_assign->pm_id = Auth::id;
                            }else{
                            $deal_assign->pm_id = $pm_find_id->pm_id;
                            }
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
                            if(Auth::user()->role_id==4){
                            $pmassign->pm_id = Auth::id();
                            }else{
                            $pmassign->pm_id = $final_id->pm_id;
                            }
                            $pmassign->save();
                            $deal_assign = Deal::find($deal->id);
                            if(Auth::user()->role_id==4){
                            $deal_assign->pm_id = Auth::id();
                            }else{
                            $deal_assign->pm_id = $final_id->pm_id;
                            }
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

                $deal_pm_id = Deal::where('id', $request->id)->first();
                $project_id = Project::where('deal_id', $deal_pm_id->id)->first();
                $project_admin_update = Project::find($project_id->id);
                $project_admin_update->added_by = $project_id->pm_id;
                $project_admin_update->project_admin = $project_id->pm_id;
                $project_admin_update->save();

                $qualified_sale = new QualifiedSale();
                $qualified_sale->project_name = $deal->project_name;

                $qualified_sale->deal_id = $deal->id;
                $qualified_sale->project_id = $project->id;
                $qualified_sale->deal_short_code = $deal->deal_id;
                $qualified_sale->date = Carbon::now();
                $qualified_sale->client_id = $deal->client_id;
                $qualified_sale->client_name = $deal->client_name;
                $qualified_sale->pm_id = $project_id->pm_id;
                $qualified_sale->pm_name = $project_id->pm_name->name;

                $qualified_sale->amount = $deal->amount;

                $qualified_sale->save();

                // $helper = new HelperPendingActionController();
                // $helper->WonDealAcceptAuthorization($project,$qualified_sale->pm_id);

                // /dd($qualified_sale);



                // if ($deal->project_type == 'fixed') {
                //     $user = User::where('id', $deal_pm_id->pm_id)->first();
                //     Notification::send($user, new WonDealNotification($deal));
                // }else{
                //     Notification::send($user, new HourlyDealNotification($deal));
                // }

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
                
                $users = User::where('role_id', 8)->get();

                foreach ($users as $key => $user) {
                    //start authorization action
                    $authorization_action = new AuthorizationAction();
                    $authorization_action->model_name = $deal->getMorphClass();
                    $authorization_action->model_id = $deal->id;
                    $authorization_action->type = 'saleslead_price_authorization';
                    $authorization_action->deal_id = $project_id->deal_id;
                    $authorization_action->project_id = $project_id->id;
                    $authorization_action->link = route('authorization_request', $project_id->deal_id);
                    $authorization_action->title = 'Sales Lead Price Authorization';
                    $authorization_action->authorization_for = $user->id;
                    $authorization_action->save();
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
                // dd("true");

                //need pending action


                //need pending action
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
            $deal= Deal::find($deal->id);
            $deal->authorization_status = $deal->is_drafted && !$request->is_drafted ? 2 : $deal->authorization_status;
            $deal->is_drafted = $request->is_drafted;
            $deal->released_at = $request->is_drafted ? null : Carbon::now();
            $deal->save();

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
            if(Auth::user()->role_id==4){
                $project_member = new ProjectMember();
                $project_member->user_id = Auth::id();
                $project_member->added_by = Auth::id();
                $project_member->project_id = $project->id;
                $project_member->save();
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
            !($this->editPermission == 'all' ||
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

        $this->view = 'contracts.ajax.summary';

        $tab = request('tab');

        switch ($tab) {
            case 'discussion':
                $this->view = 'contracts.ajax.discussion';
                break;
            case 'files':
                $this->view = 'contracts.ajax.files';
                break;
            case 'milestone':
                $this->view = 'contracts.ajax.milestone';
                break;
            case 'cross_departmental_work':
                $this->view = 'contracts.ajax.cross_departmental_work';
                break;
            case 'renew':
                $this->view = 'contracts.ajax.renew';
                break;
            case 'sales-analysis-report':
                if (auth()->user()->role_id != 1) return redirect()->route('contracts.show', $id);
                $this->view = 'contracts.ajax.salesAnalysisReport';
                break;
            default:
                $this->view = 'contracts.ajax.summary';
                break;
        }

        $itemDeal = $this->data['contract']->deal;
        
        if((Auth::user()->role_id == 7 || Auth::user()->role_id == 8) && !($itemDeal->is_drafted == 0 && ($itemDeal->authorization_status == 1 || (((Carbon::now()->diffInSeconds($itemDeal->released_at) > 10800) && (Carbon::parse($itemDeal->released_at)->format('H:i:s') >= '07:00' && Carbon::parse($itemDeal->released_at)->format('H:i:s') < '23:30')) || ((Carbon::parse($itemDeal->released_at)->format('H:i:s') < '07:00' || Carbon::parse($itemDeal->released_at)->format('H:i:s') >= '23:30') && (Carbon::parse(now())->format('H:i:s') >= '10:00') || Carbon::parse($itemDeal->released_at)->format('Y-m-d') < now()->format('Y-m-d')))))){
            $this->data['contract']->deal->pm_id = null;
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
            !($viewPermission == 'all' ||
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
        $deal = Deal::find($request->deal_id);
        $deal->status = 'Denied';
        $deal->save();
        $project_id = Project::where('deal_id', $deal->id)->first();
        $project = Project::find($project_id->id);

        $project->status = 'canceled';
        $project->project_status = "Not Accepted";
        $project->save();
        return response()->json(
            [
                'success' => true,
                'message' => 'Data inserted successfully'
            ]
        );
    }

    public function authorization_request(Deal $data)
    {
        if($data->is_drafted) abort_403(true);

        $this->pageTitle = 'Authorize Deal';
        $this->middleware(function ($request, $next) {
            abort_403(!in_array('contracts', $this->user->modules));
            return $next($request);
        });
        $deal = $data;

        return view('contracts.dealdetails_authorization', $this->data, compact('deal'));
    }

    public function authorization_submit(Request $request)
    {
        $request->validate([
            'price_authorization' => 'required',
            'requirment_define' => 'required',
            'project_deadline_authorization' => 'required'
        ]);

        if ($request->denyDeal) {
            $deal = Deal::find($request->id);
            $deal->authorization_status = 2;
            $deal->price_authorization = $request->price_authorization;
            $deal->requirment_define = $request->requirment_define;
            $deal->project_deadline_authorization = $request->project_deadline_authorization;
        } else {
            $deal = Deal::find($request->id);
            $deal->authorization_status = 1;
            $deal->price_authorization = $request->price_authorization;
            $deal->requirment_define = $request->requirment_define;
            $deal->project_deadline_authorization = $request->project_deadline_authorization;
        }

        //kpi settings
        $kpiSetting = kpiSetting::where('kpi_status', 1)->first();
        $earned_point = ($kpiSetting->accepted_by_pm * $deal->amount / 100) * $kpiSetting->authorized_by_leader / 100;

        $user_name = User::where('role_id', 8)->first();
        $cash_points_team_lead = CashPoint::where('user_id', $user_name->id)->orderBy('id', 'desc')->first();
        //kpi point

        $project = Project::where('deal_id', $request->id)->first();

        $authorization_bonus_check = Cashpoint::where('project_id', $project->id)->where('user_id', $user_name->id)->where('type', 'Authorization Bonus')->first();
        // if ($authorization_bonus_check == null) {
        //     $point = new CashPoint();

        //     $point->user_id = $user_name->id;
        //     $point->project_id = $project->id;
        //     $point->activity = '<a style="color:blue" href="' . route('employees.show', $user_name->id) . '">' . $user_name->name .
        //         '</a> authorized the deal : <a style="color:blue" href="' . route('projects.show', $project->id) . '">'
        //         . $project->project_name . '</a>, Client: <a style="color:blue" href="' . route('clients.show', $project->client_id) . '">' .

        //         $project->client_name->name;

        //     $point->gained_as = "Individual";
        //     $point->points = $earned_point;

        //     if ($cash_points_team_lead != null) {
        //         $point->total_points_earn = $cash_points_team_lead->total_points_earn + $earned_point;
        //     } else {
        //         $point->total_points_earn = $earned_point;
        //     }

        //     $point->save();
        // }

        //update authoziation action
        if ($this->user->role_id == 4) {
            $type = 'project_manager_accept_project';
        } else {
            $type = 'saleslead_price_authorization';
        }

        $authorization_action = AuthorizationAction::where([
            'deal_id' => $deal->id,
            'project_id' => $project->id,
            'type' => $type,
            'authorization_for' => $this->user->id,
            'status' => '0'
        ])->first();

        if ($authorization_action) {
            $authorization_action->authorization_by = Auth::id();
            $authorization_action->approved_at = Carbon::now();
            $authorization_action->status = '1';
            $authorization_action->save();
        }

        //end authorization action
        $point= CashPoint::where('project_id',$project->id)->sum('points');
        $qualified_sale_id = QualifiedSale::where('deal_id', $deal->id)->first();
        if ($qualified_sale_id != null) {
            $qualified_sale = QualifiedSale::find($qualified_sale_id->id);
            $qualified_sale->authorized_by_sales_lead = 1;
            $qualified_sale->sales_lead_need_define = $request->requirment_define;
            $qualified_sale->sales_lead_price_authorization = $request->price_authorization;
            $qualified_sale->sales_lead_deadline_comment = $request->project_deadline_authorization;
            $qualified_sale->total_points = $point;
            $qualified_sale->sales_lead_id = Auth::id();
            $qualified_sale->save();
        }

        
        if(!$request->denyDeal){
            $user = User::where('id', $deal->pm_id)->first();
            if ($deal->project_type == 'fixed') {
                Notification::send($user, new WonDealNotification($deal));
            }else{
                Notification::send($user, new HourlyDealNotification($deal));
            }

            $deal->email_send_status = 1;

            $project = Project::where('deal_id', $deal->id)->first();
            $helper = new HelperPendingActionController();
            $helper->WonDealAcceptAuthorization($project, $project->pm_id);
        }

        if ($deal->save()) {
            return response()->json([
                'success' => true,
                'message' => 'Data inserted successfully'
            ]);
        }
    }

    public function award_time_increase_index()
    {
        if ($this->user->role_id == 1) {
            $this->award_time_request = AwardTimeIncress::where('status', '0')->orderBy('id', 'desc')->get();
            return view('contracts.award_time_extention', $this->data);
        } else {
            abort(403);
        }
    }

    public function award_time_incress_store(Request $request)
    {
        // DB::beginTransaction();
        $data = new AwardTimeIncress();
        $data->request_from = Auth::id();
        $data->deal_id = $request->id;
        $data->incress_hours = $request->hours;
        $data->pm_comment = $request->description;

        if ($data->save()) {

           //need pending action
           $project= Project::where('deal_id',$request->id)->first();
           $helper = new HelperPendingActionController();


           $helper->ProjectAcceptTimeExtensionAuthorization($project);
           //need pending action
            return response()->json([
                'status' => 'success'
            ]);
        }
    }

    public function award_time_incress_update(Request $request)
    {
      //  DB::beginTransaction();
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
                $helper = new HelperPendingActionController();


            $helper->WonDealAcceptAuthorization($project,$project->pm_id);

            } elseif ($request->mode == 'reject') {
                $mode = '2';
            }

            if ($mode != '0') {
                $award_time_request = AwardTimeIncress::find($request->request_id);
                $award_time_request->admin_comment = $request->description;
                $award_time_request->approved_by = $this->user->id;
                $award_time_request->status = $mode;
                if ($award_time_request->save()) {

                    $project= Project::where('deal_id',$award_time_request->deal_id)->first();
                    $actions = PendingAction::where('code','WDADA')->where('past_status',0)->where('project_id',$project->id)->get();
                    if($actions != null)
                    {
                    foreach ($actions as $key => $action) {

                            $action->authorized_by= Auth::id();
                            $action->authorized_at= Carbon::now();
                            $action->past_status = 1;
                            $action->save();
                            $project_manager= User::where('id',$project->pm_id)->first();
                            $client= User::where('id',$project->client_id)->first();
                            $authorize_by= User::where('id',$action->authorized_by)->first();

                            $past_action= new PendingActionPast();
                            $past_action->item_name = $action->item_name;
                            $past_action->code = $action->code;
                            $past_action->serial = $action->serial;
                            $past_action->action_id = $action->id;
                            $past_action->heading = $action->heading;
                            $past_action->message = 'PM <a href="'.route('employees.show',$project_manager->id).'">'.$project_manager->name.'</a> requested more time to accept deal <a href="'.route('contracts.show', $project->deal_id).'">'.$project->project_name.'</a> cancel authorization for project <a href="'.route('projects.show',$project->id).'">'.$project->project_name.'</a> from Client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a>(Deal awarded on: '.$deal->award_time.') (Extended by: '.$authorize_by->name.')';
                         //   $past_action->button = $action->button;
                            $past_action->timeframe = $action->timeframe;
                            $past_action->authorization_for = $action->authorization_for;
                            $past_action->authorized_by = $action->authorized_by;
                            $past_action->authorized_at = $action->authorized_at;
                            $past_action->expired_status = $action->expired_status;
                            $past_action->past_status = $action->past_status;
                            $past_action->project_id = $action->project_id;
                            $past_action->task_id = $action->task_id;
                            $past_action->client_id = $action->client_id;
                            $past_action->milestone_id = $action->milestone_id;
                            $past_action->save();
                          //  dd($past_action);


                    }
                }
                    return response()->json([
                        'status' => 'success'
                    ]);
                }
            }
        }
    }
// client dela store
public function storeClientDeal(Request $request){
    // dd($request->all());
    // DB::beginTransaction();

    $validated = $request->validate([
        'user_name' => 'required',
        'client_name' => 'required',
        'project_name' => 'required',
        'amount' => 'required|min:1',
    ]);

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
    $deal->amount =  0;
    $deal->actual_amount =  0;
    $deal->upsell_actual_amount =  $request->amount;
    $currency = Currency::where('id', $request->original_currency_id)->first();
    $deal->award_time = Carbon::now();
    $deal->upsell_amount = ($request->amount) / $currency->exchange_rate;
    $deal->client_name = $request->client_name;
    $deal->client_username = $request->user_name;
    $deal->lead_id = $request->lead_id;
    $deal->added_by = Auth::id();
    $deal->status = 'Accepted';
    //$date= Carbon::now();

    $date = date('Y-m-d H:i:s');

    $newDate = Carbon::createFromFormat('Y-m-d H:i:s', $date)->format('Y-m-d');

    //dd($newDate);

    $deal->deal_creation_date = $newDate;

    $deal->start_date = $newDate;
    $deal->client_badge = 'existing client';
    $deal->save();
//    dd($deal);
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
        $user = $existing_client;
       // dd($user);




    $deal_client = Deal::find($deal->id);

    $deal_client->client_id = $user->id;
    // $deal->submission_status= 'Submitted';

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
    $contract->original_amount = 0;
    $contract->actual_amount=  0;
    $contract->amount=  0;
    $currency = Currency::where('id', $request->original_currency_id)->first();
    $contract->upsell_actual_amount = $request->amount;
    $contract->upsell_amount = ($request->amount) / $currency->exchange_rate;

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
    $project->project_budget = $deal->amount + $deal->upsell_amount;
    $project->due = $deal->amount + $deal->upsell_amount;

    $project->completion_percent = 0;
    $project->deal_id = $deal->id;
    $project->added_by = Auth::id();
    $project->status = 'in progress';
    $project->project_status = 'Accepted';
    $project->pm_id = Auth::id();
    $project->public = 0;
    $project->save();
    // dd($project);

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
                $pm_project_update->amount = $pm_project_update->amount + ($deal->upsell_amount / 2);
                $pm_project_update->actual_amount = $pm_project_update->actual_amount + $deal->upsell_amount;
                $pm_project_update->monthly_project_count = $pm_project_update->monthly_project_count + 1;
                $pm_project_update->monthly_project_amount = $pm_project_update->monthly_project_amount + ($deal->upsell_amount / 2);
                $pm_project_update->monthly_actual_project_amount = $pm_project_update->monthly_actual_project_amount + $deal->upsell_amount;
                $pm_project_update->save();
            }
        }
    }


    // activity log
    $user = Auth::user();
    $text = $user->getRole->name . ' ' . $user->name . ' - Closed Deal (' . $deal->project_name . ') for ' . $deal->actual_amount . '$ (Client: ' . $deal->client_name . ')';
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
public function getAllContracts(Request $request){
    $startDate = $request->start_date ?? null;
    $endDate = $request->end_date ?? null;
    $limit = $request->limit ??  10;
    $now = \Carbon\Carbon::now()->toDateTimeString();
    $dealsQuery = Deal::select(
        'deals.*',
        'deals.status as deal_status',
        'added_by.name as added_by_name',
        'added_by.image as added_by_avatar',
        'pm.name as pm_name',
        'pm.image as pm_avatar',
        'client.image as client_avatar',
        'p_m_projects.created_at as closing_date',
        )
    ->leftJoin('users as added_by', 'added_by.id', 'deals.added_by')
    ->leftJoin('users as pm', 'pm.id', 'deals.pm_id')
    ->leftJoin('users as client', 'client.id', 'deals.client_id')
    ->leftJoin('p_m_projects', 'deals.id', 'p_m_projects.deal_id')
    ->where('deals.dept_status','WD')
    ->whereNotIn('deals.sale_analysis_status',['denied', 'analysis', 'pending']);

    if ($startDate !== null && $endDate !== null) {
        $dealsQuery->where(function ($q) use ($startDate, $endDate) {
            $q->whereBetween(DB::raw('DATE(deals.`created_at`)'), [$startDate, $endDate]);
            $q->WhereBetween(DB::raw('DATE(deals.`updated_at`)'), [$startDate, $endDate]);
        });
    }
    if ($request->search != '') {
        $dealsQuery->where(function ($query) {
            $query->where('deals.project_name', 'like', '%' . request('search') . '%')
                ->orWhere('deals.deal_id', 'like', '%' . request('search') . '%')
                ->orWhere('added_by.name', 'like', '%' . request('search') . '%')
                ->orWhere('pm.name', 'like', '%' . request('search') . '%')
                ->orWhere('client.name', 'like', '%' . request('search') . '%');
        });
    }
    if ($request->pm_id != null) {
        $dealsQuery->where('deals.pm_id', $request->pm_id);
    }
    if ($request->client_id != null) {
        $dealsQuery->where('deals.client_id', $request->client_id);
    }
    if ($request->closed_by != null) {
        $dealsQuery->where('deals.added_by', $request->closed_by);
    }
    if ($request->status != null) {
        $dealsQuery->where('deals.status', $request->status);
    }

    if (Auth::user()->role_id == 4) {
        $now = \Carbon\Carbon::now()->toDateTimeString();
        $dealsQuery->where('deals.pm_id',Auth::id())
        ->where('is_drafted', 0)
        ->where(function ($query) use ($now) {
            $query->where('authorization_status', 1)
                ->orWhere(function ($subquery) use ($now) {
                    $subquery->where('authorization_status', 2)
                        ->where(function ($innerSubquery) use ($now) {
                            $innerSubquery->whereRaw('
                                (
                                    (
                                        (TIME(released_at) >= "23:30" OR TIME(released_at) < "07:00")
                                        AND (DATE(released_at) < CURDATE())
                                    )
                                    OR
                                    (
                                        (TIME(released_at) >= "23:30" OR TIME(released_at) < "07:00")
                                        AND TIME(?) >= "10:00"
                                    )
                                    OR
                                    (
                                        TIME(released_at) >= "07:00" AND TIME(released_at) < "23:30"
                                        AND TIMESTAMPDIFF(SECOND, released_at, ?) > ?
                                    )
                                )
                            ', [$now, $now, (180 * 60)]);
                        });
                });
        });
    }
    $deals = $dealsQuery
        ->orderBy('deals.id', 'desc')
        ->paginate($limit);


    /**AMOUNT CHECK ITS UPSELL OR NOT START */
    foreach ($deals as $itemDeal){
        $amount = '';
        $project_name = '';
        if($itemDeal->project_type=="fixed" && $itemDeal->actual_amount == 0){
            $badge =  '<span class="badge badge-success ml-1">'. 'Upsold By PM'.'</span>';
            $amount = $itemDeal->upsell_actual_amount . ' ' . $itemDeal->original_currency->currency_symbol . $badge;
        }else{
            $amount = $itemDeal->actual_amount. ' ' . $itemDeal->original_currency->currency_symbol;
        }
        $itemDeal->value = $amount;

        if ($itemDeal->status == 'Accepted') {
            $project_id = Project::where('deal_id', $itemDeal->id)->first();
            $project_name = '<a class="openRightModal multiline-ellipsis text-hover-underline" href="' . route('projects.show', $project_id->id) . '" title="' . $itemDeal->project_name . '">' . $itemDeal->project_name . '</a>';
        } else {
            $project_name = '<p class="multiline-ellipsis" title="' . $itemDeal->project_name . '">' . $itemDeal->project_name . '</p>';
        }
        $itemDeal->project_name_html = $project_name;
        $itemDeal->short_code_html = '<a target="__blank" class="text-primary" href="' . route('contracts.show', $itemDeal->id) . '">' . $itemDeal->deal_id . '</a>';

        $action = '
            <div class="dropdown">
                <button class="btn f-14 px-0 py-0 text-dark-grey" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="icon-options-vertical icons"></i>
                </button>
                <div style="whith:200px; color:black;" class="dropdown-menu dropdown-menu-right border-grey rounded b-shadow-4 p-0" aria-labelledby="dropdownMenuLink" tabindex="0">';

        if ($itemDeal->submission_status == "Awaiting for client Response") {
            $action .= '<a class="dropdown-item" href="/account/deal-url/' . $itemDeal->id . '"><i class="fa-solid fa-file mr-2"></i>' . trans('Client Form') . '</a>';
        } else {
            $action .= '<a class="dropdown-item" href="deal-url/' . $itemDeal->id . '"><i class="fa-solid fa-file mr-2"></i>' . trans('Client Form') . '</a>';
        }

        $upDeal = Deal::where('id', $itemDeal->id)->first();
        $upSellAddedBy = User::where('id', $upDeal->added_by)->first();

        if ($upSellAddedBy->role_id == 4 && Auth::user()->role_id == 4) {
            $action .= '<a class="dropdown-item" href="/deals/details/edit/' . $itemDeal->id . '"><i class="fa-solid fa-pen-to-square mr-2"></i>' . trans('Edit') . '</a>';
        } elseif ($upSellAddedBy->role_id == 7 && Auth::user()->role_id == 7) {
            $action .= '<a class="dropdown-item" href="/deals/details/edit/' . $itemDeal->id . '"><i class="fa-solid fa-pen-to-square mr-2"></i>' . trans('Edit') . '</a>';
        } else {
            if (Auth::user()->role_id == 1 || Auth::user()->role_id == 8) {
                $action .= '<a class="dropdown-item" href="/deals/details/edit/' . $itemDeal->id . '"><i class="fa-solid fa-pen-to-square mr-2"></i>' . trans('Edit') . '</a>';
            }
        }

        if (Auth::user()->role_id == 8 || Auth::user()->role_id == 1) {
            if ($itemDeal->authorization_status == 0 || $itemDeal->authorization_status == '2') {
                if (Auth::user()->role_id == 8) {
                    $action .= '<a class="dropdown-item bg-warning" href="' . route("authorization_request", $itemDeal->id) . '"><i class="fa-solid fa-user mr-2' . ($itemDeal->auth) . '"></i>' . trans('Authorization Need') . '</a>';
                }
            } else {
                $action .= '<a class="dropdown-item bg-success" href="' . route("contracts.show", $itemDeal->id) . '"><i class="fa-solid fa-user mr-2' . ($itemDeal->auth) . '"></i>' . trans('Authorization Details') . '</a>';
            }
        }

        if (Auth::user()->role_id == 4 && $itemDeal->status == 'Denied') {
            $award_time_request = $itemDeal->has_award_time_request;

            if ($award_time_request) {
                if ($award_time_request->status == '2') {
                    $action .= '<a class="dropdown-item bg-primary text-light award_time_incress" data-id="' . $itemDeal->id . '" href="' . route("award_time_check.index", $itemDeal->id) . '"><i class="fa-solid fa-user mr-2' . ($itemDeal->auth) . '"></i>' . trans('Request to Increase Accept time') . '</a>';
                }
            } else {
                $action .= '<a class="dropdown-item bg-primary text-light award_time_incress" data-id="' . $itemDeal->id . '" href="' . route("award_time_check.index", $itemDeal->id) . '"><i class="fa-solid fa-user mr-2' . ($itemDeal->auth) . '"></i>' . trans('Request to Increase Accept time') . '</a>';
            }
        }

        $action .= '
                </div>
            </div>';


        $itemDeal->action = $action;

        if((Auth::user()->role_id == 7 || Auth::user()->role_id == 8) && !($itemDeal->is_drafted == 0 && ($itemDeal->authorization_status == 1 || (((Carbon::now()->diffInSeconds($itemDeal->released_at) > 10800) && (Carbon::parse($itemDeal->released_at)->format('H:i:s') >= '07:00' && Carbon::parse($itemDeal->released_at)->format('H:i:s') < '23:30')) || ((Carbon::parse($itemDeal->released_at)->format('H:i:s') < '07:00' || Carbon::parse($itemDeal->released_at)->format('H:i:s') >= '23:30') && (Carbon::parse(now())->format('H:i:s') >= '10:00') || Carbon::parse($itemDeal->released_at)->format('Y-m-d') < now()->format('Y-m-d')))))){
            $itemDeal->pm_name = null;
            $itemDeal->pm_avatar = null;
            $itemDeal->closing_date = null;
            $itemDeal->pm_id = null;
        }
        
    }
    /**AMOUNT CHECK ITS UPSELL OR NOT END */
    /**COUNT OF AWARD TIME REQUEST DATA START */
    $total_request = AwardTimeIncress::where('status', '0')->where('dept_status','WD')->count();
    /**COUNT OF AWARD TIME REQUEST DATA END */
    return response()->json([
        'data' => $deals,
        'total_request' =>$total_request,
        'status'=> 200,
    ]);
}

public function exportContracts(Request $request){
    $startDate = $request->start_date ?? null;
    $endDate = $request->end_date ?? null;

    $dealsQuery = Deal::select(
        'deals.*',
        'deals.status as deal_status',
        'added_by.name as added_by_name',
        'added_by.image as added_by_avatar',
        'pm.name as pm_name',
        'pm.image as pm_avatar',
        'client.image as client_avatar',
        'p_m_projects.created_at as closing_date',
        )
    ->leftJoin('users as added_by', 'added_by.id', 'deals.added_by')
    ->leftJoin('users as pm', 'pm.id', 'deals.pm_id')
    ->leftJoin('users as client', 'client.id', 'deals.client_id')
    ->leftJoin('p_m_projects', 'deals.id', 'p_m_projects.deal_id')
    ->where('deals.dept_status','WD');

    if ($startDate !== null && $endDate !== null) {
        $dealsQuery->where(function ($q) use ($startDate, $endDate) {
            $q->whereBetween(DB::raw('DATE(deals.`created_at`)'), [$startDate, $endDate]);
            $q->WhereBetween(DB::raw('DATE(deals.`updated_at`)'), [$startDate, $endDate]);
        });
    }
    if ($request->search != '') {
        $dealsQuery->where(function ($query) {
            $query->where('deals.project_name', 'like', '%' . request('search') . '%')
                ->orWhere('deals.deal_id', 'like', '%' . request('search') . '%')
                ->orWhere('users.name', 'like', '%' . request('search') . '%');
        });
    }
    if ($request->pm_id != null) {
        $dealsQuery->where('pm_id', $request->pm_id);
    }
    if ($request->client_id != null) {
        $dealsQuery->where('client_id', $request->client_id);
    }
    if ($request->closed_by != null) {
        $dealsQuery->where('added_by', $request->closed_by);
    }
    if ($request->status != null) {
        $dealsQuery->where('deals.status', $request->status);
    }

    if (Auth::user()->role_id == 4) {
        $dealsQuery->where('pm_id',Auth::id());
    }else {
    $deals = $dealsQuery
        ->orderBy('deals.id', 'desc')
        ->get();
    }

    /**AMOUNT CHECK ITS UPSELL OR NOT START */
    foreach ($deals as $itemDeal){
        $amount = '';
        $project_name = '';
        if($itemDeal->project_type=="fixed" && $itemDeal->actual_amount == 0){
            $amount = $itemDeal->upsell_actual_amount . ' ' . $itemDeal->original_currency->currency_symbol . ' (Upsold By PM)';
        }else{
            $amount = $itemDeal->actual_amount. ' ' . $itemDeal->original_currency->currency_symbol;
        }
        $itemDeal->value = $amount;

        if ($itemDeal->status == 'Accepted') {
            $project_id = Project::where('deal_id', $itemDeal->id)->first();
            $project_name = '<a class="openRightModal multiline-ellipsis text-hover-underline" href="' . route('projects.show', $project_id->id) . '" title="' . $itemDeal->project_name . '">' . $itemDeal->project_name . '</a>';
        } else {
            $project_name = '<p class="multiline-ellipsis" title="' . $itemDeal->project_name . '">' . $itemDeal->project_name . '</p>';
        }
        $itemDeal->project_name_html = $project_name;
        $itemDeal->short_code_html = '<a target="__blank" class="text-primary" href="' . route('contracts.show', $itemDeal->id) . '">' . $itemDeal->deal_id . '</a>';
    }
    /**AMOUNT CHECK ITS UPSELL OR NOT END */

    return response()->json([
        'data' => $deals,
        'status'=> 200,
    ]);
}

}
