<?php

namespace App\Http\Controllers;

use App\DataTables\ContractsDataTable;
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

class ContractController extends AccountBaseController
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

    public function index(ContractsDataTable $dataTable)
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
        $validated = $request->validate([
            'user_name' => 'required|unique:users|max:255',
            'client_name' => 'required',
            'project_name' => 'required',
            'amount' => 'required',
            'original_currency_id' => 'required',
        ]);

        //  dd($request->date);
        $chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        $suffle = substr(str_shuffle($chars), 0, 6);
        $deal = new Deal();
        $deal->deal_id = 'DSEOP1' . $suffle;
        $deal->project_name = $request->project_name;
        $deal->currency_id= 1;
        $deal->actual_amount=  $request->amount;
        $currency= Currency::where('id',$request->original_currency_id)->first();
        //dd($currency);
        $deal->amount = ($request->amount)/$currency->exchange_rate;
        $deal->client_name = $request->client_name;
        $deal->client_username = $request->user_name;
        $deal->added_by = Auth::id();
        //$date= Carbon::now();

        $date = date('Y-m-d H:i:s');

        $newDate = \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $date)
        ->format('Y-m-d');

        //dd($newDate);

        $deal->deal_creation_date = $newDate;

        $deal->start_date = $newDate;
        $deal->save();
        if (Auth::user()->role_id == 7) {
            $agent_id = SalesCount::where('user_id', Auth::id())->first();
            $lead_ag_id = SalesCount::find($agent_id->id);

            $lead_ag_id->won_deals = $lead_ag_id->won_deals + 1;
            $lead_ag_id->deal_value = $lead_ag_id->deal_value + $request->amount;
            $lead_ag_id->save();
        }

        $user = new User();
        $user->name = $request->client_name;
        $user->user_name = $request->user_name;
        $user->save();
        $role = new RoleUser();
        $role->role_id = 3;
        $role->user_id = $user->id;
        $role->save();
        $client = new ClientDetails();
        $client->user_id = $user->id;

        $client->client_username = $request->client_username;
        $client->save();
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
        $project->project_budget = $deal->amount;

        $project->completion_percent = 0;
        $project->deal_id = $deal->id;
        $project->added_by = Auth::id();
        $project->status = 'not started';
        $project->public = 0;
        $project->due = $deal->amount;
        $project->save();
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

        $pm_count = PMAssign::select('project_count')->min('project_count');
        $pm_user = PMAssign::where('project_count', $pm_count)->first();
        if ($pm_count < 2) {
            if ($pm_user != null) {
                $pmassign = new PMProject();
                $pmassign->project_id = $project->id;
                $pmassign->status = 'pending';
                $pmassign->pm_id = $pm_user->pm_id;
                $pmassign->deal_id = $deal->id;
                $pmassign->client_id = $user->id;
                $pmassign->save();
                $deal_assign = Deal::find($deal->id);
                $deal_assign->pm_id = $pmassign->pm_id;
                $deal_assign->save();
                $pm_assign_project = Project::find($project->id);
                $pm_assign_project->pm_id = $pmassign->pm_id;
                $pm_assign_project->save();
                //  $pm_project= PMAssign::where('pm_id',$pm_id->pm_id)->first();
                $pm_project_find = PMAssign::where('pm_id', $pm_user->pm_id)->first();
                $pm_project_update = PMAssign::find($pm_project_find->id);
                $pm_project_update->project_count = $pm_project_update->project_count + 1;
                $pm_project_update->amount = $pm_project_update->amount + $deal->amount;
                $pm_project_update->save();
            }
        } else {
            $items = PMAssign::all();
            $pm_amount = $items->min('amount');
            $pm_count_id = $items->min('project_count');

            $pm_find_id = PMAssign::where('amount', $pm_amount)->first();
            $pm_min_pro = PMAssign::where('project_count', $pm_count_id)->first();
            $find_rest = PMAssign::where('project_count', $pm_count_id)->get();

            $fin_min = $find_rest->min('amount');

            $final_id = PMAssign::where('amount', $fin_min)->first();

            //  $exceptional =   $pm_count= PMAssign::select('project_count')->where('')->get();

            if ($pm_find_id->project_count + 1 <= $pm_count_id * 1.5) {
                $pmassign = new PMProject();
                $pmassign->project_id = $project->id;
                $pmassign->status = 'pending';
                $pmassign->deal_id = $deal->id;
                $pmassign->client_id = $user->id;
                $pmassign->pm_id = $pm_find_id->pm_id;
                $pmassign->save();
                $deal_assign = Deal::find($deal->id);
                $deal_assign->pm_id = $pmassign->pm_id;
                $deal_assign->save();
                $pm_assign_project = Project::find($project->id);
                $pm_assign_project->pm_id = $pmassign->pm_id;
                $pm_assign_project->save();
                //  $pm_project= PMAssign::where('pm_id',$pm_id->pm_id)->first();
                $pm_project_find = PMAssign::where('pm_id', $pm_find_id->pm_id)->first();
                $pm_project_update = PMAssign::find($pm_project_find->id);
                $pm_project_update->project_count = $pm_project_update->project_count + 1;
                $pm_project_update->amount = $pm_project_update->amount + $deal->amount;
                $pm_project_update->save();
            } else {
                $pmassign = new PMProject();
                $pmassign->project_id = $project->id;
                $pmassign->status = 'pending';
                $pmassign->deal_id = $deal->id;
                $pmassign->client_id = $user->id;
                $pmassign->pm_id = $final_id->pm_id;
                $pmassign->save();
                $deal_assign = Deal::find($deal->id);
                $deal_assign->pm_id = $pmassign->pm_id;
                $deal_assign->save();
                $pm_assign_project = Project::find($project->id);
                $pm_assign_project->pm_id = $pmassign->pm_id;
                $pm_assign_project->save();
          //  $pm_project= PMAssign::where('pm_id',$pm_id->pm_id)->first();
                $pm_project_find = PMAssign::where('pm_id', $final_id->pm_id)->first();
                $pm_project_update = PMAssign::find($pm_project_find->id);
                $pm_project_update->project_count = $pm_project_update->project_count + 1;
                $pm_project_update->amount = $pm_project_update->amount + $deal->amount;
                $pm_project_update->save();
            }
        }

        return redirect('/deals/details/' . $deal->id)->with('messages.contractAdded');
    }
    public function storeLeadDeal(Request $request)
    {
        //dd($request->lead_id);
        $validated = $request->validate([
            'user_name' => 'required|unique:users|max:255',
            'client_name' => 'required',
            'project_name' => 'required',
            'amount' => 'required',
        ]);
      //dd($request);
        $deal_stage = DealStage::where('id', $request->id)->first();

        $deal = DealStage::find($request->id);
        //dd($deal);
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
            $lead_id = Lead::where('id', $request->lead_id)->first();
            $agent = SalesCount::where('user_id', $lead_id->added_by)->first();
            $lead_ag = SalesCount::find($agent->id);

            $lead_ag->negotiation_started = $lead_ag->negotiation_started + 1;
        //    $lead_ag->save();
        }
        $chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        $suffle = substr(str_shuffle($chars), 0, 6);
        $deal = new Deal();
        $deal->deal_id = $request->deal_id;
        $deal->project_name = $request->project_name;
        $deal->original_currency_id= $request->original_currency_id;
        $deal->currency_id= 1;
        $deal->actual_amount=  $request->amount;
        $currency= Currency::where('id',$request->original_currency_id)->first();
        //dd($currency);
        $deal->amount = ($request->amount)/$currency->exchange_rate;
        $deal->client_name = $request->client_name;
        $deal->client_username = $request->user_name;
        $deal->lead_id = $request->lead_id;
        $deal->added_by = Auth::id();
        //$date= Carbon::now();

        $date = date('Y-m-d H:i:s');

        $newDate = \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $date)
        ->format('Y-m-d');

        //dd($newDate);

        $deal->deal_creation_date = $newDate;

        $deal->start_date = $newDate;
        $deal->save();
        $lead_con_id = Lead::where('id', $request->lead_id)->first();
        $agent_id = SalesCount::where('user_id', $lead_con_id->added_by)->first();
        $lead_ag_id = SalesCount::find($agent_id->id);

        $lead_ag_id->won_deals = $lead_ag_id->won_deals + 1;
        $lead_ag_id->deal_value = $lead_ag_id->deal_value + $request->amount;
        $lead_ag_id->save();

        $lead = Lead::find($request->lead_id);
        $lead->status_id = 3;
        $lead->save();

        $user = new User();
        $user->name = $request->client_name;
        $user->user_name = $request->user_name;
        $user->save();
        $role = new RoleUser();
        $role->role_id = 3;
        $role->user_id = $user->id;
        $role->save();
        $client = new ClientDetails();
        $client->user_id = $user->id;

        $client->client_username = $request->client_username;
        $client->save();
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
        $project->project_budget = $deal->amount;
        $project->due = $deal->amount;

        $project->completion_percent = 0;
        $project->deal_id = $deal->id;
        $project->added_by = Auth::id();
        $project->status = 'not started';
        $project->public = 0;
        $project->save();

        $pm_count = PMAssign::select('project_count')->min('project_count');
        $pm_user = PMAssign::where('project_count', $pm_count)->first();
        if ($pm_count < 2) {
            if ($pm_user != null) {
                $pmassign = new PMProject();
                $pmassign->project_id = $project->id;
                $pmassign->status = 'pending';
                $pmassign->pm_id = $pm_user->pm_id;
                $pmassign->deal_id = $deal->id;
                $pmassign->client_id = $user->id;
                $pmassign->save();
                $deal_assign = Deal::find($deal->id);
                $deal_assign->pm_id = $pm_user->pm_id;
                $deal_assign->save();
                $pm_assign_project = Project::find($project->id);
                $pm_assign_project->pm_id = $pmassign->pm_id;
                $pm_assign_project->save();
                //  $pm_project= PMAssign::where('pm_id',$pm_id->pm_id)->first();
                $pm_project_find = PMAssign::where('pm_id', $pm_user->pm_id)->first();
                $pm_project_update = PMAssign::find($pm_project_find->id);
                $pm_project_update->project_count = $pm_project_update->project_count + 1;
                $pm_project_update->amount = $pm_project_update->amount + $$deal->amount;
                $pm_project_update->save();
            }
        } else {
            $items = PMAssign::all();
            $pm_amount = $items->min('amount');
            $pm_count_id = $items->min('project_count');

            $pm_find_id = PMAssign::where('amount', $pm_amount)->first();
            $pm_min_pro = PMAssign::where('project_count', $pm_count_id)->first();
            $find_rest = PMAssign::where('project_count', $pm_count_id)->get();

            $fin_min = $find_rest->min('amount');

            $final_id = PMAssign::where('amount', $fin_min)->first();

            //  $exceptional =   $pm_count= PMAssign::select('project_count')->where('')->get();

            if ($pm_find_id->project_count + 1 <= $pm_count_id * 1.5) {
                $pmassign = new PMProject();
                $pmassign->project_id = $project->id;
                $pmassign->status = 'pending';
                $pmassign->deal_id = $deal->id;
                $pmassign->client_id = $user->id;
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
                $pm_project_update->save();
            } else {
                $pmassign = new PMProject();
                $pmassign->project_id = $project->id;
                $pmassign->status = 'pending';
                $pmassign->deal_id = $deal->id;
                $pmassign->client_id = $user->id;
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
                $pm_project_update->save();
            }
        }

        return redirect('/deals/details/' . $deal->id)->with('messages.contractAdded');
    }
    public function Milestone($id)
    {
        //dd($id);
        $milestones = ProjectMilestone::where('project_id', $id)->get();
        return response()->json([
            'milestones' => $milestones,
        ]);
    }
    public function storeMilestone(Request $request)
    {
        //  dd($request);
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'cost' => 'required',
            'summary' => 'required',
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
            $milestone->cost = $request->cost;
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
      //dd($request);
      $validator = Validator::make($request->all(), [
          'title' => 'required',
          'cost' => 'required',
          'summary' => 'required',

      ]);
      if ($validator->fails()) {
          return response()->json([
              'status' => 400,
              'errors' => $validator->messages(),
          ]);
      } else {
          $milestone = ProjectMilestone::find($id);
          if($milestone)
          {

                      $milestone->milestone_title = $request->title;

                      $milestone->cost = $request->cost;
                      $milestone->summary = $request->summary;
                      $milestone->currency_id = 1;

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
        //  dd($request->client_username);
        $validated = $request->validate([
            'project_name' => 'required',
            'client_name' => 'required',
            'description' => 'required',
            'description2' => 'required',
            'description3' => 'required',
            'description4' => 'required',
            'description5' => 'required',
            'description6' => 'required',
            'description7' => 'required',
            'description8' => 'required',
            'description9' => 'required',


            'message_link' => 'required',
            'profile_link'=>'required',

        ]);
        //dd("hello");
        $deal = Deal::find($request->id);
        $deal->project_name = $request->project_name;
        $deal->currency_id= 1;
        $deal->actual_amount=  $request->amount;
        $currency= Currency::where('id',$request->original_currency_id)->first();
        //dd($currency);
        $deal->amount = ($request->amount)/$currency->exchange_rate;
        $deal->organization = $request->organization;
        $deal->client_email = $request->client_email;
        $deal->description = $request->description;
        // $deal->pipeline_stage = $request->pipeline_stage;
        $deal->deadline = $request->deadline;
        $deal->currency_id = $request->currency_id;
        $deal->message_link = $request->message_link;
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
        $project->project_budget = $request->amount;
        $project->currency_id = $request->currency_id;
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
        // $clientdetail= ClientDetails::find($client_id->id);
        // //dd($clientdetail);
        // $clientdetail->company_name= $request->organization;
        // $clientdetail->save();
        return redirect('/account/contracts')->with('messages.contractAdded');
    }
    public function updatedealDetails(Request $request)
    {
        //  dd($request->client_username);
        $deal = Deal::find($request->id);
        $deal->project_name = $request->project_name;
        $deal->currency_id= 1;
        $deal->actual_amount=  $request->amount;
        $currency= Currency::where('id',$request->original_currency_id)->first();
        //dd($currency);
        $deal->amount = ($request->amount)/$currency->exchange_rate;
        $deal->organization = $request->organization;
        $deal->client_email = $request->client_email;
        $deal->description = $request->description;

        $deal->deadline = $request->deadline;
        $deal->currency_id = $request->currency_id;
        $deal->message_link = $request->message_link;
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
        $deal->save();
        $project_id = Project::where('deal_id', $request->id)->first();
        $project = Project::find($project_id->id);
        $project->project_name = $request->project_name;
        $project->project_summary = $request->description;
        $project->deadline = $request->deadline;
        $project->project_budget = $request->amount;
        $project->currency_id = $request->currency_id;
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
        // $clientdetail= ClientDetails::find($client_id->id);
        // //dd($clientdetail);
        // $clientdetail->company_name= $request->organization;
        // $clientdetail->save();
        return redirect('/account/contracts/' . $deal->id)->with('messages.contractAdded');
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
            'signature',
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
}
