<?php

namespace App\Http\Controllers;

use App\DataTables\DMLeadsDatatable;
use App\Http\Controllers\Controller;
use App\Models\Lead;
use App\Models\LeadCategory;
use App\Models\LeadSource;
use App\Models\LeadStatus;
use App\Models\LeadFollowUp;
use App\Models\LeadAgent;
use Illuminate\Support\Facades\DB;
use App\Helper\Reply;
use Illuminate\Http\Request;
use Auth;
use App\Models\SalesCount;
use Carbon\Carbon;
use DateTime;
use App\Models\Currency;
use App\Models\LeadActivity;
use App\Models\LeadCustomForm;
use App\Models\PurposeConsent;
use App\Models\GdprSetting;
use App\DataTables\ProposalDataTable;
use App\DataTables\LeadGDPRDataTable;
use App\DataTables\LeadNotesDataTable;
use Illuminate\Support\Facades\Validator;
use App\Models\DealStage;
use App\Models\LeadsDealsActivityLog;
use App\Models\DealStageChange;
use App\Models\User;
use App\Notifications\DealUpdate;

class DMLeadController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'Leads';
        $this->activeSettingMenu = 'leads';
        $this->middleware(function ($request, $next) {
            abort_403(!in_array('leads', $this->user->modules));
            return $next($request);
        });
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(DMLeadsDatatable $dataTable)
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

        return $dataTable->render('dm-lead.index', $this->data);

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
            $html = view('dm-lead.ajax.create', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'dm-lead.ajax.create';
        return view('dm-lead.create', $this->data);

    }

    public function storeDmLeadSource(Request $request){
        $request->validate([
            'lead_source' => 'required',
        ], [
            'lead_source.required' => 'Please select lead source!',
        ]);

        $lead_s = new Lead();
        $lead_s->lead_source = $request->lead_source;
        $lead_s->save();

        return response()->json(['status'=>200]);

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if ($request->project_type !='hourly'){
            $request->validate([
                'client_name' => 'required|max:255',
                'country' => 'required',
                'project_link' => 'required|url',
                'deadline' => 'required|date',
                'original_currency_id' => 'required',
                'bid_value' => 'required',
                'bid_value2' => 'required',
                'value' => 'required',
                'project_type' => 'required',
                'description' => 'required',
                'cover_letter' => 'required',
            ], [
                'client_name.required' => 'Please enter the project name!',
                'country.required' => 'Please select client country!',
                'project_link.required' => 'Please enter correct project link (Freelancer.com) with https!',
                'deadline.required' => 'Please select project deadline from Freelancer.com!',
                'original_currency_id.required' => 'Please select correct currency!',
                'project_type.required' => 'The project type field is required!',
                'bid_value.required' => 'Please enter minimum project budget!',
                'bid_value2.required' => 'Please enter maximum project budget!',
                'value.required' => 'Please enter bid value!',
                'description.required' => 'Copy the project description from Freelancer.com and paste it here!',
                'cover_letter.required' => 'Copy the cover letter you submitted when placing the bid and paste it here. Do not forget to format it (If needed)!',

            ]);
        }else{
            $request->validate([
                'client_name' => 'required|max:255',
                'country' => 'required',
                'project_link' => 'required|url',
                'original_currency_id' => 'required',
                'bid_value' => 'required',
                'bid_value2' => 'required',
                'value' => 'required',
                'project_type' => 'required',
                'description' => 'required',
                'cover_letter' => 'required',
            ], [
                'client_name.required' => 'Please enter the project name!',
                'project_type.required' => 'The project type field is required!',
                'country.required' => 'Please select client country!',
                'project_link.required' => 'Please enter correct project link (Freelancer.com) with https!',
                'original_currency_id.required' => 'Please select correct currency!',
                'bid_value.required' => 'Please enter minimum project budget!',
                'bid_value2.required' => 'Please enter maximum project budget!',
                'value.required' => 'Please enter bid value!',
                'description.required' => 'Copy the project description from Freelancer.com and paste it here!',
                'cover_letter.required' => 'Copy the cover letter you submitted when placing the bid and paste it here. Do not forget to format it (If needed)!',
            ]);
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
        $lead = Lead::where('id',$request->lead_id)->first();
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
        $lead->total_spent= $request->total_spent;
        $lead->note= $request->description;
        $lead->status_id= 1;
        $lead->currency_id= 1;
        $lead->cover_letter= $request->cover_letter;
        $lead->status= 'DM';

        $lead->save();

        $lead_agent= new LeadAgent();
        $lead_agent->user_id= Auth::id();
        $lead_agent->status= "enabled";
        $lead_agent->added_by= Auth::id();
        $lead_agent->last_updated_by= Auth::id();
        $lead_agent->save();

        if ($request->get('custom_fields_data')) {
            $lead->updateCustomFieldData($request->get('custom_fields_data'));
        }
        return response()->json([
            'success'=>'Lead Add Successfully'
        ],200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
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

        $this->view = 'dm-lead.ajax.profile';

        $tab = request('tab');

        switch ($tab) {
        case 'files':
            $this->view = 'dm-lead.ajax.files';
                break;
        case 'follow-up':
            $this->view = 'dm-lead.ajax.follow-up';
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
            $this->view = 'dm-lead.ajax.profile';
                break;
        }

        if (request()->ajax()) {
            $html = view($this->view, $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->activeTab = ($tab == '') ? 'profile' : $tab;
        return view('dm-lead.show', $this->data);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
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
            $html = view('dm-lead.ajax.edit', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'dm-lead.ajax.edit';
        return view('dm-lead.create', $this->data);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function updateDMLead(Request $request)
    {
        $request->validate([
            'description' => 'required',
            'cover_letter' => 'required',
        ], [
            'description.required' => 'Copy the project description from Freelancer.com and paste it here!',
            'cover_letter.required' => 'Copy the cover letter you submitted when placing the bid and paste it here. Do not forget to format it (If needed)!',
        ]);
      $lead = Lead::where('id',$request->id)->first();
      $originalValues = $lead->getOriginal();
      $lead->client_name= $request->client_name;
      $lead->deadline= $request->deadline;
      $lead->project_id= $request->project_id ?? null;
      $lead->project_link= $request->project_link;
      $lead->actual_value= $request->value;
      $currency= Currency::where('id',$request->original_currency_id)->first();
      $lead->value= ($request->value)/$currency->exchange_rate;
      $lead->original_currency_id =$request->original_currency_id;
      $lead->bid_value= $request->bid_value;
      $lead->bid_value2= $request->bid_value2;
      $lead->country= $request->country;
      $lead->project_type= $request->project_type;
      $lead->note= $request->description;
      $lead->cover_letter= $request->cover_letter;
      $lead->currency_id= 1;
      $lead->total_spent= $request->total_spent;
      $lead->lead_source= $request->lead_source;
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
      return redirect(route('digital-marketing-lead.index'))->with('messages.LeadAddedUpdate');
    }




    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
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

    public function proposals()
    {
        $viewPermission = user()->permission('view_lead_proposals');

        abort_403(!in_array($viewPermission, ['all', 'added']));

        $tab = request('tab');
        $this->activeTab = ($tab == '') ? 'overview' : $tab;
        $this->view = 'dm-lead.ajax.proposal';
        $dataTable = new ProposalDataTable();

        return $dataTable->render('dm-lead.show', $this->data);
    }

    public function gdpr()
    {
        $dataTable = new LeadGDPRDataTable();
        $tab = request('tab');
        $this->activeTab = ($tab == '') ? 'gdpr' : $tab;
        $this->view = 'dm-lead.ajax.gdpr';
        return $dataTable->render('dm-lead.show', $this->data);
    }

    public function notes()
    {
        $dataTable = new LeadNotesDataTable();
        $viewPermission = user()->permission('view_lead');

        abort_403 (!($viewPermission == 'all' || $viewPermission == 'added' || $viewPermission == 'both'));
        $tab = request('tab');
        ($tab == '') ? $this->activeTab = 'profile' : $this->activeTab = $tab;
        $this->view = 'dm-lead.ajax.notes';
        return $dataTable->render('dm-lead.show', $this->data);
    }
    public function dmDealStageChange(Request $request)
    {
        // dd($request->all());
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
        $value= json_encode($request['message_link']);
        // DB::beginTransaction();
        $deal= new DealStage();
        $deal->short_code= 'DSEOP1'. $suffle;
        $deal->lead_id= $lead->id;
        $deal->status= 1;
        $deal->deal_stage= 0;
        $deal->comments= $request->comments;
        $deal->profile_link= $request->profile_link;
        $deal->project_type= $lead->project_type;
        $deal->message_link= $value;
        $deal->client_username= $request->client_username;
        $deal->currency_id= 1;
        $deal->project_name= $lead->client_name;
        $deal->original_currency_id= $lead->original_currency_id;
        $deal->amount= $lead->value;
        $deal->actual_amount= $lead->actual_value;
        $deal->added_by= Auth::id();
        $deal->converted_by= Auth::id();
        $deal->convert_ld_status = 'DM';
        $deal->save();

        //goal achieve check start here
        // $goals = GoalSetting::where([
        //     'goal_status' =>  0,
        // ])->get();

        // if($goals != null) {
        //     foreach ($goals as $goal) {
        //         $start = Carbon::parse($goal->startDate);
        //         $end = Carbon::parse($goal->endDate);
        //         $dateToCheck = Carbon::parse($deal->created_at);

        //         if ($dateToCheck->between($start, $end)) {

        //             if($goal->team_id != null)
        //             {
        //                 $team = Seopage1Team::find($goal->team_id);

        //                 $users = explode(',', $team->members);
        //                 $user_data = [];
        //                 foreach ($users as $key => $value) {
        //                     if ($value != '') {
        //                         array_push($user_data,$value);
        //                     }
        //                 }
        //             } else {
        //                 $user_data[]= $goal->user_id;
        //             }
        //         }

        //         if (isset($goal->user_id) || isset($user_data)) {
        //             // Always use an array of user IDs, even if $goal->user_id is set
        //             $goal2 = $goal->user_id ? [$goal->user_id] : $user_data;


        //             if ($goal->entryType == 'Added') {
        //                 if($goal->dealType == 'New Client')
        //                 {
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
        //                     ->whereIn('leads.added_by', $goal2)
        //                     ->whereDate('deal_stages.created_at', '>=', $goal->startDate)
        //                     ->groupBy('deal_stages.client_username');

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
        //                     ->whereIn('leads.added_by', $goal2)
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
        // foreach ($users as $user) {
        //     Mail::to($user->email)->send(new LeadConversionMail($lead));
        // }
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
}
