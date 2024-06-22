<?php

namespace App\Http\Controllers;

use App\Models\CashPoint;
use App\Models\Deal;
use App\Models\Seopage1Team;
use Carbon\Carbon;
use App\Models\Lead;
use App\Helper\Files;
use App\Helper\Reply;
use App\Models\Country;

use App\Jobs\ImportLeadJob;
use App\Models\GdprSetting;
use App\Models\LeadCategory;
use App\Models\LeadFollowUp;
use Illuminate\Support\Facades\Validate;
use Illuminate\Http\Request;
use App\Models\PurposeConsent;
use App\DataTables\LeadsDataTable;
use App\DataTables\DealsDataTable;
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
//use SweetAlert;
use Toastr;
use App\Notifications\DealAuthorizationSendNotification;
use Notification;
use App\Models\GoalSetting;;
use App\Models\RoleUser;
use Illuminate\Support\Facades\Route;

class DealController extends AccountBaseController
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

    public function index()
    {
      //  abort_403(user()->permission('view_deal') == 'none');

        if (!request()->ajax()) {
            if (in_array('client', user_roles())) {
                $this->clients = User::client();
            } else {
                $this->clients = User::allClients();
                // dd($this->clients);
            }

        }
        if(Auth::user()->role_id == 6 || Auth::user()->role_id == 13){
            abort(403);
        }

        return view('deals.index', $this->data);
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

        DealStage::whereIn('id', explode(',', $request->row_ids))->delete();
        return true;
    }

    public function destroy($id)
    {
        $deal = DealStage::findOrFail($id);
        $this->deletePermission = user()->permission('delete_contract');

        abort_403(
            !(
                $this->deletePermission == 'all' ||
                ($this->deletePermission == 'added' && user()->id == $contract->added_by) ||
                ($this->deletePermission == 'owned' && user()->id == $contract->client_id) ||
                ($this->deletePermission == 'both' && (user()->id == $contract->client_id || user()->id == $contract->added_by))
            )
        );

        DealStage::destroy($id);
        return Reply::success(__('Deal Deleted Successfully'));
    }

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
            $html = view('deals.ajax.create', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'deals.ajax.create';
        return view('deals.create', $this->data);
    }


    public function store(Request $request)
    {
    //    dd($request->all());
        // $request->validate([
        //     'client_name' => 'required',
        //     'client_username' => 'required',
        //     'project_name' => 'required',
        //     'project_link' => 'required|url',
        //     'project_type' => 'required',
        //     'amount' => 'required',
        //     'description' => 'required',
        //     'comments' => 'required',
        // ]);
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
        $deal->comments= $request->comments;
        $deal->added_by= Auth::id();
        $deal->converted_by= Auth::id();
        if($existing_client != null)
        {
            $deal->client_badge = 'existing client';

        }else {
            $deal->client_badge= 'new client';
        }
        $deal->save();
        $goals = GoalSetting::where([
            'goal_status' =>  0,
        ])->get();
        // /dd($goals);

        if($goals != null) {


        foreach ($goals as $goal) {
            $start = Carbon::parse($goal->startDate);
            $end = Carbon::parse($goal->endDate);
            $dateToCheck = Carbon::parse($deal->created_at);

            if ($dateToCheck->between($start, $end)) {

                if($goal->team_id != null) {
                    $team = Seopage1Team::find($goal->team_id);

                    $users = explode(',', $team->members);
                    $user_data = [];
                    foreach ($users as $key => $value) {
                        if ($value != '') {
                             //$user = User::find($value);
                            array_push($user_data,$value);
                        }
                    }
                } else {
                    $user_data[]= $goal->user_id;
                }
            }
            // Always use an array of user IDs, even if $goal->user_id is set
            if (isset($goal->user_id) || isset($user_data)) {

                $goal2 = $goal->user_id ? [$goal->user_id] : $user_data;


                if ($goal->entryType == 'Added') {

                    if($goal->dealType == 'New Client'){
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
                        ->whereIn('deal_stages.added_by', $goal2)
                        ->whereDate('deal_stages.created_at', '>=', $goal->startDate)
                        ->where('deal_stages.client_badge','=','new client');

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
                                    //$point->project_id= $find_project_id->id;
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
                        ->whereIn('deal_stages.added_by', $goal2)
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
                                    //$point->project_id= $find_project_id->id;
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


        //dd($deal_sum, $deal_count);
        return response()->json([
            'status' => 'success',
            'redirectUrl' => route('deals.index')
        ]);


//        return redirect()->route('deals.index',__('Deals Added'));
    }

    public function edit($id)
    {
        $this->editPermission = user()->permission('edit_contract');
        $this->deal = DealStage::
            find($id);

        //dd($this->deal);

        $this->currencies = Currency::all();


        if (request()->ajax()) {
            $this->pageTitle = __('app.update') . ' ' . __('Deal');
            $html = view('deals.ajax.edit', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'deals.ajax.edit';
        return view('deals.create', $this->data);
    }

    public function update(Request $request)
    {
    //    dd($request->all());
        // $request->validate([
        //     'client_name' => 'required',
        //     'client_username' => 'required',
        //     'project_name' => 'required',
        //     'project_link' => 'required|url',
        //     'amount' => 'required',
        //     'description' => 'required',

        // ]);

        $deal = DealStage::findOrFail($request->id);
        $deal->client_name= $request->client_name;

        $deal->client_username= $request->client_username;
      //  $deal->deal_stage= 0;
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
        $deal->comments= $request->comments;
        $deal->updated_by= Auth::id();

        $deal->save();

        //SweetAlert::message('Deal Updated Successfully!');

//         Toastr::success('Deals Updated Successfully', 'Success', ["positionClass" => "toast-top-right"]);
//        return redirect()->route('deals.index',__('Deals Updated'));
        return response()->json([
            'status' => 'success',
            'redirectUrl' => route('deals.index')
        ]);
    }
    // public function DealAuthorization(Request $request, $id)
    // {
    //     $deal= DealStage::find($id);
    //     $deal->authorization_status= 2;
    //     $deal->save();
    //     $sender= User::where('id',Auth::id())->first();
    //   $users= User::where('role_id',8)->orWhere('role_id',1)->get();

    //   foreach ($users as $key => $user) {
    //     Notification::send($users, new DealAuthorizationSendNotification($deal,$sender));
    //     $this->triggerPusher('notification-channel', 'notification', [
    //         'user_id' => $user->id,
    //         'role_id' => $user->role_id,
    //         'title' => 'Price authorization request from '.$sender->name,
    //         'body' => $sender->name. ' send price authorization request for '.$deal->project_name,
    //         'redirectUrl' => route('deals.show',$deal->id)
    //     ]);

    //   }
    //   return Reply::success('Authorizations send successfully');



    // }

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
      //dd($id);
        $viewPermission = user()->permission('view_contract');
        $this->viewDiscussionPermission = $viewDiscussionPermission = user()->permission('view_contract_discussion');
        $this->viewContractFilesPermission = $viewContractFilesPermission = user()->permission('view_contract_files');

        $this->deal = DealStage::findOrFail($id);
      //  dd($this->deal );
      if(Auth::user()->role_id == 6 || Auth::user()->role_id == 13){
        abort(403);
    }

        // abort_403(
        //     !(
        //         $viewPermission == 'all' ||
        //         ($viewPermission == 'added' && user()->id == $this->contract->added_by) ||
        //         ($viewPermission == 'owned' && user()->id == $this->contract->client_id) ||
        //         ($viewPermission == 'both' && (user()->id == $this->contract->client_id || user()->id == $this->contract->added_by))
        //     )
        // );

        $this->pageTitle = __('') . ucfirst($this->deal->short_code);

        $this->view = 'deals.ajax.deal_details';

        $tab = request('tab');

        switch ($tab) {
          case 'deal_details':
              $this->view = 'deals.ajax.deal_details';
              break;
            case 'files':
                $this->view = 'deals.ajax.files';
                break;
                case 'summary':
                    $this->view = 'deals.ajax.summary';
                    break;
            case 'followup':
                $this->view = 'deals.ajax.followup';
                break;
                case 'proposal':
                    $this->view = 'deals.ajax.proposal';
                    break;

            default:
                $this->view = 'deals.ajax.deal_details';
                break;
        }

        if (request()->ajax()) {
            $html = view($this->view, $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->activeTab = $tab == '' ? 'deal_details' : $tab;

        return view('deals.show', $this->data);
    }
    public function comments(Request $request)
    {
    if ($request->comment == null && $request->attach == null) {
      Toastr::error('Please add a comment', 'Failed', ["positionClass" => "toast-top-right"]);
     return back();
    }else {
      $deal= new DealStageChange();
      $deal->updated_by= Auth::id();
      $deal->deal_stage_id= $request->deal_stage_id;
      $deal->deal_id= $request->deal_id;

      if($request->comment != null )
      {

        $deal->comments= $request->comment;

        //$deal->save();
      }

      if($request->hasFile('attach'))

      {
        $files = $request->file('attach');
        $filename= null;
      //  dd($files);
        $value='';
        foreach ($files as $file) {
          $filename=null;
          if ($file) {
              $filename = time() . $file->getClientOriginalName();

              Storage::disk('public')->putFileAs(
                  'deal-files/',
                  $file,
                  $filename
              );

          }
            $value= $value  . $filename.',';


        }
        //dd($value);

      }else {
        $value= null;
      }

         $deal->attach= $value;


       $deal->save();
       Toastr::success('Comment Added Successfully', 'Success', ["positionClass" => "toast-top-right"]);
      return back();
    }

    }

    public function demo_serach()

    {

        return view('searchDemo');

    }



    /**

     * Show the form for creating a new resource.

     *

     * @return \Illuminate\Http\Response

     */

    public function SearchClient(Request $request)

    {


        $data = User::select(["name","user_name"])
        ->where('role_id',null)
        ->where('name', 'LIKE', '%'. $request->get('query'). '%')
        ->orwhere('user_name', 'LIKE', '%'. $request->get('query'). '%')
        ->get();


        return response()->json($data);
    }

    // CLIENT DEAL SECTION
    public function createClientDeal($id){
        $this->pageTitle = 'Deals';
        $this->client_id = $id;
        return view('clients.deal.create',$this->data);
    }

    public function storeClientDeal(Request $request){
        // dd($request->all());
            // DB::beginTransaction();
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
        $deal->actual_amount=  $request->amount;
        $deal->currency_id= 1;
        $deal->original_currency_id= $request->original_currency_id;
        $deal->project_type= $request->project_type;
        $currency= Currency::where('id',$request->original_currency_id)->first();
        //dd($currency);
        $deal->amount = ($request->amount)/$currency->exchange_rate;
        $deal->description= $request->description;
        $deal->added_by= Auth::id();
        $deal->converted_by= Auth::id();
        $deal->client_badge = 'existing client';
        $deal->save();
        $goals = GoalSetting::where([
            'goal_status' =>  0,
        ])->get();

        if($goals != null) {


        foreach ($goals as $goal) {
            $start = Carbon::parse($goal->startDate);
            $end = Carbon::parse($goal->endDate);
            $dateToCheck = Carbon::parse($deal->created_at);

            if ($dateToCheck->between($start, $end)) {

                if($goal->team_id != null) {
                    $team = Seopage1Team::find($goal->team_id);

                    $users = explode(',', $team->members);
                    $user_data = [];
                    foreach ($users as $key => $value) {
                        if ($value != '') {
                             //$user = User::find($value);
                            array_push($user_data,$value);
                        }
                    }
                } else {
                    $user_data[]= $goal->user_id;
                }
            }
            // Always use an array of user IDs, even if $goal->user_id is set
            if (isset($goal->user_id) || isset($user_data)) {

                $goal2 = $goal->user_id ? [$goal->user_id] : $user_data;


                if ($goal->entryType == 'Added') {

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
                        ->whereIn('deal_stages.added_by', $goal2)
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
                                    //$point->project_id= $find_project_id->id;
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

        // dd('ok');

        return response()->json([
            'status' => 'success',
            'redirectUrl' => route('deals.show',$deal->id)
        ]);

    }
/** DEAL TABLE GET API */
    public function getDealData(Request $request){
      //  dd($request->added_by_id, $request->closed_by);
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
            'leads.project_link as lead_project_link',
            'deals.sale_analysis_status as sale_analysis_status'
            )
            ->leftJoin('leads', 'leads.id', '=', 'deal_stages.lead_id')
            ->leftJoin('users as added_by', 'deal_stages.added_by', '=', 'added_by.id')
            ->leftJoin('users as lead_added_by', 'lead_added_by.id', '=', 'leads.added_by')
            ->leftJoin('currencies as amount', 'amount.id', 'deal_stages.currency_id')
            ->leftJoin('currencies as actual_amount', 'actual_amount.id', 'deal_stages.original_currency_id')
            ->leftJoin('deals', 'deals.deal_id', '=', 'deal_stages.short_code')
            ->where('deal_stages.convert_ld_status' ,'!=','DM');

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
                        ->orWhere('deal_stages.client_name', 'like', '%' . request('search') . '%')
                        ->orWhere('added_by.name', 'like', '%' . request('search') . '%');
                      ;
                });
            }
            if ($request->client_username != null) {
                $dealQuery->where('deal_stages.client_username', $request->client_username);
            }
            if ($request->has('added_by_id') && $request->input('added_by_id') !== 'all') {
                $dealQuery->where('deal_stages.added_by', $request->input('added_by_id'));
            }
            if ($request->has('closed_by') && $request->input('closed_by') !== 'all') {
                $dealQuery->where('deals.added_by', $request->input('closed_by'));
            }
            if ($request->status != null) {
                if ($request->status == 5) {
                    $dealQuery->where('deal_stages.deal_stage', $request->status)->where('won_lost', '=',null);
                }
                elseif ($request->status == 'pending') {
                    $dealQuery->where('deals.sale_analysis_status', '=', 'pending');
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
                ->orderBy('updated_at', 'desc')
                ->paginate($limit);

            foreach($deals_data as $item){
                $won_lost = '';
                $won_lost_bg = '';

                if($request->status == 'pending' && $item->sale_analysis_status == 'pending')
                {
                    $won_lost = 'Pending Sales Analysis';
                    $won_lost_bg = '#FCBD01';
                }
                elseif($item->won_lost != null){
                    if($item->won_lost== 'Yes'){
                        $won_lost = 'Won';
                        $won_lost_bg = '#00aa00';
                    }else {
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
                    }elseif ($item->deal_stage == 5){
                        $won_lost = 'Milestone Breakdown';
                        $won_lost_bg = '#C525F2';
                    }
                    else{
                        $won_lost = 'Pending Sales Analysis';
                        $won_lost_bg = '#FCBD01';
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


            $counts = Deal::select(DB::raw("COUNT(IF(sale_analysis_status = 'pending', 1, null)) as pending"))
            ->whereBetween(DB::raw('DATE(created_at)'), [$startDate, $endDate])
            ->orWhereBetween(DB::raw('DATE(updated_at)'), [$startDate, $endDate])
            ->first();

            $extra = collect($counts);
            $deals_data = $extra->merge($deals_data);

        return response()->json([
            'status'=> 200,
            'data' => $deals_data
        ]);
    }

    public function exportDeal(Request $request){
        $startDate = $request->start_date ?? null;
        $endDate = $request->end_date ?? null;

        $dealQuery = DealStage::select(
            'deal_stages.*',
            'added_by.id as added_by_id',
            'added_by.name as added_by_name',
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
            ->where('deal_stages.convert_ld_status' ,'!=','DM');

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
                        ->orWhere('deal_stages.client_name', 'like', '%' . request('search') . '%')
                        ->orWhere('added_by.name', 'like', '%' . request('search') . '%')
                        ;
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



    /**ALL Currencie API*/
    public function getAllCurrencie(){
        $currencies = Currency::all();

        return response()->json([
            'status'=>200,
            'data'=>$currencies
        ]);
    }
    public function getAllCountry(){
        $countries = Country::all();

        return response()->json([
            'status'=>200,
            'data'=>$countries
        ]);
    }

}
