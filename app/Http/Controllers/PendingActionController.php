<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\PendingAction;
use App\Models\PendingActionPast;
use Auth;
use Illuminate\Http\Request;
use App\Models\ProjectDeliverablesClientDisagree;
use App\Models\AuthorizationAction;
use App\Models\ProjectDeliverable;
use App\Models\QualifiedSale;
use App\Models\PMProject;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Carbon\Carbon;
use Notification;
use App\Notifications\ProjectDelivarableFinalAuthorizationClientNotification;
use App\Notifications\ProjectDeliverableFinalAuthorizationNotificationAccept;
use App\Notifications\DeliverableOthersAuthorizationAcceptNotification;
use DB;
use App\Models\Role;
use Toastr;
use App\Models\ProjectSubmission;

class PendingActionController extends AccountBaseController
{
    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'Pending Action';
        $this->activeSettingMenu = 'pending_action';
        $this->middleware(function ($request, $next) {
            // abort_403(user()->permission('manage_company_setting') !== 'all');
            return $next($request);
        });
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $this->authorization_action = AuthorizationAction::query();

        if ($request->tab && $request->tab == 'past') {
            $this->authorization_action = $this->authorization_action->where('status', '!=', '0');
        } else {
            $this->authorization_action = $this->authorization_action->where('status', '0');
        }

        if (isset($request->start_time) || isset($request->end_date)) {
            if ($request->start_date == $request->end_date) {
                $this->authorization_action = $this->authorization_action->wheredate('created_at', '=', carbon::parse($request->start_date)->format('y-m-d'));
            } else {
                if ($request->start_date) {
                    $this->authorization_action = $this->authorization_action->whereDate('created_at', '>=', Carbon::parse($request->start_date)->format('Y-m-d'));
                }

                if ($request->end_date) {
                    $this->authorization_action = $this->authorization_action->whereDate('created_at', '<=', Carbon::parse($request->end_date)->format('Y-m-d'));
                }
            }
        }


        if (isset($request->search)) {
            $this->authorization_action = $this->authorization_action->where('title', 'LIKE', '%' . $request->search . '%');
        }

        $per_page = 10;
        if (isset($request->per_page) && is_int($request->per_page)) {
            $per_page = $request->per_page;
        }

        $uniqueUsers = AuthorizationAction::where('authorization_by', $this->user->id)->groupBy('authorization_for')->get()->pluck('authorization_for');
        $this->users = User::select([
            'id', 'name', 'image'
        ])->whereIn('id', $uniqueUsers)->get();
       
        if ($this->user->role_id != 1) {
            //dd("True");
            $this->authorization_action = $this->authorization_action->where('authorization_for', $this->user->id)->orderBy('id', 'desc')->paginate($per_page);
        }
        else 
        {
            $this->authorization_action = $this->authorization_action->where('type','!=','task_assigned_on_lead_developer' )->orderBy('id', 'desc')->paginate($per_page);
        }

       
        //dd($this->authorization_action->get());
        return view('pending-action.index', $this->data);
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
        // DB::beginTransaction();
        $authorization_action = AuthorizationAction::findOrFail($id);
        $type = $authorization_action->type;
        $error = true;

        if ($type == 'task_time_extension_by_lead_developer') {
            $task_data = resolve($authorization_action->model_name)::find($authorization_action->model_id);
            $task_data->updated_by = $this->user->id;
            if ($request->mode == 'approved') {
                $task_data->status = 'approved';
            }
            $task_data->save();

            $path = parse_url($authorization_action->link, PHP_URL_PATH);
            $segments = explode('/', $path);
            $task_id = end($segments);

            $task = Task::find($task_id);
            $task->original_due_date = $task->due_date;
            $task->due_date = $task_data->due_date;
            $task->save();

            $authorization_action->description = $request->description;
            $authorization_action->authorization_by = $this->user->id;
            $authorization_action->approved_at = Carbon::now();
            $authorization_action->status = '1';
            $authorization_action->save();

            $error = false;
        } elseif ($type == 'deliverable') {
            if ($request->mode == 'approved') {
                $project = Project::find($authorization_action->project_id);
                $project->authorization_status = 'approved';
                $project->deliverable_authorization = 1;
                $project->save();

                $qualified_sale_id = QualifiedSale::where('project_id', $project->id)->first();
                if ($qualified_sale_id) {
                    $qualified_sale = QualifiedSale::find($qualified_sale_id->id);
                    $qualified_sale->authorized_by_admin = 1;
                    $qualified_sale->admin_authorization_comment = $this->user->name . ' approved this deliverable';
                    $qualified_sale->save();
                }

                $pm_project = PMProject::where('project_id', $project->id)->first();
                $pm_project_update = PMProject::find($pm_project->id);
                $pm_project_update->deliverable_status = 1;
                $pm_project_update->save();

                $project_id = Project::where('id', $authorization_action->project_id)->first();

                $client_revision = ProjectDeliverablesClientDisagree::where([
                    'project_id' => $project->id,
                    'status' => '0'
                ])->get();

                if ($client_revision) {
                    $client = User::where('id', $project->client_id)->first();
                    Notification::send($client, new ProjectDelivarableFinalAuthorizationClientNotification($project_id));

                    foreach ($client_revision as $value) {
                        $value->status = '1';
                        $value->save();
                    }
                }

                $text = $this->user->name . ' finally authorized project deliverable';
                $link = '<a href="' . route('projects.show', $project->id) . '?tab=deliverable">' . $text . '</a>';
                $this->logProjectActivity($project->id, $link);

                $user = User::where('id', $project->pm_id)->first();
                $this->triggerPusher('notification-channel', 'notification', [
                    'user_id' => $user->id,
                    'role_id' => 4,
                    'title' => 'Authorization request accepted',
                    'body' => 'Admin accept your authorization request',
                    'redirectUrl' => route('projects.show', $project_id->id) . '?tab=deliverables'
                ]);

                Notification::send($user, new ProjectDeliverableFinalAuthorizationNotificationAccept($project_id));

                $authorization_action->description = $request->description;
                $authorization_action->authorization_by = $this->user->id;
                $authorization_action->approved_at = Carbon::now();
                $authorization_action->status = '1';
                $authorization_action->save();

                $error = false;
            }
        } elseif ($type == 'other_type_deliverable') {
            if ($request->mode == 'approved') {
                $deliverable_id = resolve($authorization_action->model_name)::find($authorization_action->model_id);

                $project = ProjectDeliverable::find($deliverable_id->id);
                $project->authorization = 1;
                $project->save();
                $project_id = Project::where('id', $deliverable_id->project_id)->first();

                $user = User::where('id', $project_id->pm_id)->first();

                $this->triggerPusher('notification-channel', 'notification', [
                    'user_id' => $user->id,
                    'role_id' => 4,
                    'title' => 'Delivarable Approved',
                    'body' => 'Admin approved Delivarable. Go..',
                    'redirectUrl' => route('projects.show', $project_id->id) . '?tab=deliverables'
                ]);
                Notification::send($user, new DeliverableOthersAuthorizationAcceptNotification($project_id));

                $authorization_action->description = $request->description;
                $authorization_action->authorization_by = $this->user->id;
                $authorization_action->approved_at = Carbon::now();
                $authorization_action->status = '1';
                $authorization_action->save();

                $error = false;
            }
        } elseif ($type == 'project_challenge') {
            if ($request->mode == 'approved') {
                $p_request = new Request();
                $p_request->project_id = $authorization_action->project_id;
                $p_request->admin_comment = $request->description;
                $p_request->authorization_form = 'authorization_action';

                $project_controller = new ProjectController();
                $project_controller->ProjectAccept($p_request);

                $authorization_action->description = $request->description;
                $authorization_action->authorization_by = $this->user->id;
                $authorization_action->approved_at = Carbon::now();
                $authorization_action->status = '1';
                $authorization_action->save();

                $error = false;
            } elseif ($request->mode == 'deny') {
                $p_request = new Request();
                $p_request->project_id = $authorization_action->project_id;
                $p_request->admin_comment = $request->description;
                $p_request->authorization_form = 'authorization_action';

                $project_controller = new ProjectController();
                $project_controller->ProjectDeny($p_request);

                $authorization_action->description = $request->description;
                $authorization_action->authorization_by = $this->user->id;
                $authorization_action->approved_at = Carbon::now();
                $authorization_action->status = '2';
                $authorization_action->save();

                $error = false;
            }
        } elseif ($type == 'project_qc') {
            if ($request->mode == 'approved') {
                $p_request = new Request();
                $p_request->id = $authorization_action->model_id;
                $p_request->admin_comment_qc = $request->description;
                $p_request->authorization_form = 'authorization_action';

                $project_controller = new ProjectController();
                $project_controller->ProjectQcSubmissionAccept($p_request);

                $authorization_action->description = $p_request->admin_comment_qc;
                $authorization_action->authorization_by = $this->user->id;
                $authorization_action->approved_at = Carbon::now();
                $authorization_action->status = '1';
                $authorization_action->save();

                $error = false;
            } elseif ($request->mode == 'deny') {
                $p_request = new Request();
                $p_request->id = $authorization_action->model_id;
                $p_request->deny = true;
                $p_request->admin_comment_qc = $this->user->name . ' Deny this QC submission Request';
                $p_request->authorization_form = 'authorization_action';

                $project_controller = new ProjectController();
                $project_controller->ProjectQcSubmissionAccept($p_request);

                $authorization_action->description = $p_request->admin_comment_qc;
                $authorization_action->authorization_by = $this->user->id;
                $authorization_action->approved_at = Carbon::now();
                $authorization_action->status = '1';
                $authorization_action->save();

                $error = false;
            }
        } elseif ($type == 'project_completion') {
            if ($request->mode == 'approved') {
                $p_request = new Request();
                $p_request->id = $authorization_action->model_id;
                $p_request->admin_comment = $request->description;
                $p_request->authorization_form = 'authorization_action';

                $project_controller = new ProjectController();
                $project_controller->ProjectSubmissionAccept($p_request);

                $authorization_action->description = $p_request->admin_comment;
                $authorization_action->authorization_by = $this->user->id;
                $authorization_action->approved_at = Carbon::now();
                $authorization_action->status = '1';
                $authorization_action->save();

                $error = false;
            } elseif ($request->mode == 'deny') {
                $p_request = new Request();
                $p_request->id = $authorization_action->model_id;
                $p_request->deny = true;
                $p_request->admin_comment = $request->description;
                $p_request->authorization_form = 'authorization_action';

                $project_controller = new ProjectController();
                $project_controller->ProjectSubmissionAccept($p_request);

                $authorization_action->description = $p_request->admin_comment;
                $authorization_action->authorization_by = $this->user->id;
                $authorization_action->approved_at = Carbon::now();
                $authorization_action->status = '1';
                $authorization_action->save();

                $error = false;
            }
            //dd('ok');
        } elseif ($type == 'project_deliverable_time_extention') {
           
            if ($request->mode == 'approved') {
                $p_request = new Request();
                $p_request->project_id = $authorization_action->model_id;
                $p_request->authorization_form = 'authorization_action';

                $project_controller = new ProjectController();
                $project_controller->DeliverableAuthorizationAccept($p_request);

                $authorization_action->description = $request->description;
                $authorization_action->authorization_by = $this->user->id;
                $authorization_action->approved_at = Carbon::now();
                $authorization_action->status = '1';
                $authorization_action->save();

                //$project_id= Project::where('id',$authorization_action->model_id)->first();
                $project_id= PMProject::where('project_id',$authorization_action->project_id)->first();
            //    / dd($authorization_action->model_id);
                $pm_project=PMProject::find($project_id->id);
                $pm_project->deliverable_status = 1;
                $pm_project->save();
               // dd($pm_project);

                $error = false;
            }
        } elseif ($type == 'milestone_cancel') {
            if ($request->mode == 'approved') {
                $p_request = new Request();
                $p_request->milestoneId = $authorization_action->model_id;
                $p_request->authorization_form = 'authorization_action';

                $project_controller = new ProjectMilestoneController();
                $project_controller->CancelMilestoneApprove($p_request);

                $authorization_action->description = $request->description;
                $authorization_action->authorization_by = $this->user->id;
                $authorization_action->approved_at = Carbon::now();
                $authorization_action->status = '1';
                $authorization_action->save();

                $error = false;
            }
        } elseif ($type == 'task_approved_by_lead_develoer') {
            $authorization_action->description = $request->description;
            $authorization_action->authorization_by = $this->user->id;
            $authorization_action->approved_at = Carbon::now();
            $authorization_action->status = '1';
            $authorization_action->save();

            return response()->json([
                'type' => 'redirect',
                'url' => $authorization_action->link
            ]);
        } elseif ($type == 'task_revision_by_lead_developer') {
            $authorization_action->description = $request->description;
            $authorization_action->authorization_by = $this->user->id;
            $authorization_action->approved_at = Carbon::now();
            $authorization_action->status = '1';
            $authorization_action->save();

            return response()->json([
                'type' => 'redirect',
                'url' => $authorization_action->link
            ]);
        } elseif ($type == 'complete_milestone') {
            $authorization_action->description = $request->description;
            $authorization_action->authorization_by = $this->user->id;
            $authorization_action->approved_at = Carbon::now()->format('Y-m-d H:i:s');
            $authorization_action->status = '1';
            $authorization_action->save();

            return response()->json([
                'type' => 'redirect',
                'url' => $authorization_action->link
            ]);
        } elseif ($type == 'invoice_created') {
            $authorization_action->description = $request->description;
            $authorization_action->authorization_by = $this->user->id;
            $authorization_action->approved_at = Carbon::now()->format('Y-m-d H:i:s');
            $authorization_action->status = '1';
            $authorization_action->save();

            return response()->json([
                'type' => 'redirect',
                'url' => $authorization_action->link
            ]);
        } elseif ($type == 'payment_created') {
            $authorization_action->description = $request->description;
            $authorization_action->authorization_by = $this->user->id;
            $authorization_action->approved_at = Carbon::now()->format('Y-m-d H:i:s');
            $authorization_action->status = '1';
            $authorization_action->save();

            return response()->json([
                'type' => 'redirect',
                'url' => $authorization_action->link
            ]);
        } elseif ($type == 'task_assigned_on_lead_developer') {
            $authorization_action->description = $request->description;
            $authorization_action->authorization_by = $this->user->id;
            $authorization_action->approved_at = Carbon::now()->format('Y-m-d H:i:s');
            $authorization_action->status = '1';
            $authorization_action->save();

            return response()->json([
                'type' => 'redirect',
                'url' => $authorization_action->link
            ]);
        }elseif ($type == 'task_assign_by_lead_developer') {
            $authorization_action->description = $request->description;
            $authorization_action->authorization_by = $this->user->id;
            $authorization_action->approved_at = Carbon::now()->format('Y-m-d H:i:s');
            $authorization_action->status = '1';
            $authorization_action->save();

            return response()->json([
                'type' => 'redirect',
                'url' => $authorization_action->link
            ]);
        }elseif ($type == 'deliverable_modification_by_client') {
            
            
            $authorization_action->description = $request->description;
            $authorization_action->authorization_by = $this->user->id;
            $authorization_action->approved_at = Carbon::now()->format('Y-m-d H:i:s');
            $authorization_action->status = '1';
            $authorization_action->save();
            $error = false;
            

           
        }elseif ($type == 'task_submission_by_developer') {
            $authorization_action->description = $request->description;
            $authorization_action->authorization_by = $this->user->id;
            $authorization_action->approved_at = Carbon::now()->format('Y-m-d H:i:s');
            $authorization_action->status = '1';
            $authorization_action->save();

            return response()->json([
                'type' => 'redirect',
                'url' => $authorization_action->link
            ]);
        }
       
        
        //DB::commit();
        if ($error == false) {
            return response()->json([
                'success' => true
            ]);
        }
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
    public function get_pending_active_live_action(Request $request)
    {
        
        $authorization_for = $request->input('user_id', null);
        if (!is_null($authorization_for)) {
           $user = $authorization_for;
        }else 
        {
            $user = Auth::id();
        }
        // dd($authorization_for);
        $startDate = $request->input('startDate', null);
        $endDate = $request->input('endDate', null);
        $actions = PendingAction::
        select('pending_actions.*','client.name as client_name','pm.name as pm_name','projects.project_name')
        ->leftJoin('projects','projects.id','pending_actions.project_id')
        ->leftJoin('users as client','client.id','pending_actions.client_id')
        ->leftJoin('users as pm','pm.id','projects.pm_id')
        ->where('pending_actions.authorization_for',$user)
        ->where('pending_actions.past_status',0)
        ->where('pending_actions.expired_status',0);
        if (!is_null($startDate) && !is_null($endDate) &&  $startDate == $endDate) {


            $actions = $actions->whereDate('pending_actions.created_at', '=', Carbon::parse($startDate)->format('Y-m-d'))
          
            ;
        } else {
            if (!is_null($startDate)) {
                $actions = $actions->whereDate('pending_actions.created_at', '>=', Carbon::parse($startDate)->format('Y-m-d'))
              
                ;
            }
            if (!is_null($endDate)) {
                $actions = $actions->whereDate('pending_actions.created_at', '<=', Carbon::parse($endDate)->format('Y-m-d'))
              
                ;
            }
        }
       
           

        
      
        $actions= $actions->orderBy('pending_actions.id','desc')
        ->get();
        
        //dd($actions);
        foreach ($actions as $key => $action) {
            $action->button = json_decode($action->button);
        }
        return response()->json([
            'pending_actions' => $actions,
            'status' => 200,
        ]);
    }
    public function get_pending_expired_live_action(Request $request)
    {
       
        $authorization_for = $request->input('user_id', null);
    //   dd($authorization_for);
    if (!is_null($authorization_for)) {
        $user = $authorization_for;
     }else 
     {
         $user = Auth::id();
     }
        $startDate = $request->input('startDate', null);
        $endDate = $request->input('endDate', null);
        $actions = PendingAction::
        select('pending_actions.*','client.name as client_name','pm.name as pm_name','projects.project_name')
        ->leftJoin('projects','projects.id','pending_actions.project_id')
        ->leftJoin('users as client','client.id','pending_actions.client_id')
        ->leftJoin('users as pm','pm.id','projects.pm_id')
        ->where('pending_actions.authorization_for',$user)
        ->where('pending_actions.past_status',0)
        ->where('pending_actions.expired_status',1);
        if (!is_null($startDate) && !is_null($endDate) &&  $startDate == $endDate) {


            $actions = $actions->whereDate('pending_actions.created_at', '=', Carbon::parse($startDate)->format('Y-m-d'));
        } else {
            if (!is_null($startDate)) {
                $actions = $actions->whereDate('pending_actions.created_at', '>=', Carbon::parse($startDate)->format('Y-m-d'));
            }
            if (!is_null($endDate)) {
                $actions = $actions->whereDate('pending_actions.created_at', '<=', Carbon::parse($endDate)->format('Y-m-d'));
            }
        }
      
        $actions= $actions->orderBy('pending_actions.id','desc')
        ->get();
       
        foreach ($actions as $key => $action) {
            $action->button = json_decode($action->button);
        }
        return response()->json([
            'pending_actions' => $actions,
            'status' => 200,
        ]);
    }
    public function get_pending_past_action(Request $request)
    {
        $authorization_for = $request->input('user_id', null);
        if (!is_null($authorization_for)) {
            $user = $authorization_for;
         }else 
         {
             $user = Auth::id();
         }
        
        $startDate = $request->input('startDate', null);
        $endDate = $request->input('endDate', null);
        $actions = PendingActionPast::
        select('pending_action_pasts.*','client.name as client_name','pm.name as pm_name','projects.project_name',
        'authorize_by.name as authorize_by_name')
        ->leftJoin('projects','projects.id','pending_action_pasts.project_id')
        ->leftJoin('users as client','client.id','pending_action_pasts.client_id')
        ->leftJoin('users as pm','pm.id','projects.pm_id')
        ->leftJoin('users as authorize_by','authorize_by.id','pending_action_pasts.authorized_by')
        ->where('pending_action_pasts.authorization_for',$user);
      //  ->where('pending_action_pasts.past_status',1);
        if (!is_null($startDate) && !is_null($endDate) &&  $startDate == $endDate) {


            $actions = $actions->whereDate('pending_action_pasts.created_at', '=', Carbon::parse($startDate)->format('Y-m-d'));
        } else {
            if (!is_null($startDate)) {
                $actions = $actions->whereDate('pending_action_pasts.created_at', '>=', Carbon::parse($startDate)->format('Y-m-d'));
            }
            if (!is_null($endDate)) {
                $actions = $actions->whereDate('pending_action_pasts.created_at', '<=', Carbon::parse($endDate)->format('Y-m-d'));
            }
        }
       
        $actions= $actions->orderBy('pending_action_pasts.id','desc')
        ->get();
        foreach ($actions as $key => $action) {
            $action->button = json_decode($action->button);
        }
        return response()->json([
            'pending_actions' => $actions,
            'status' => 200,
        ]);
    }
    public function DeleteStagingSite(Request $request)
    {   
        
        $action= PendingAction::where('id',$request->authorization_id)->first();
        $action->authorized_by= Auth::id();
        $action->authorized_at= Carbon::now();
        $action->past_status = 1;
        $action->save();
       
        $project=Project::where('id',$action->project_id)->first();
        $dummy_link = ProjectSubmission::where('project_id',$project->id)->first();
        $client= User::where('id',$project->client_id)->first();
        $lead_developer= User::where('id',Auth::id())->first();
        $project_manager= User::where('id',$project->pm_id)->first();
        $past_action= new PendingActionPast();
        $past_action->item_name = $action->item_name;
        $past_action->code = $action->code;
        $past_action->serial = $action->serial;
        $past_action->action_id = $action->id;
        $past_action->heading = $action->heading;
        $past_action->message = 'Staging site '.$dummy_link->dummy_link.' for client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a> has been Deleted by lead developer <a>'.$lead_developer->name.'</a> (PM: <a href="'.route('employees.show',$project_manager->id).'">'.$project_manager->name.'</a>)';
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
        $past_action->developer_id = $action->developer_id;
        $past_action->save();
        Toastr::success('Action marked as completed successfully', 'Success', ["positionClass" => "toast-top-right"]);
        return back();


    }
    public function AssignTaskIgnore($id)
    {
        $actions= PendingAction::where('code','NTTA')->where('past_status',0)->where('developer_id',$id)->orderBy('id','desc')->get();
       
            if($actions != null)
            {
            foreach ($actions as $key => $action) {
    
                    $action->authorized_by= Auth::id();
                    $action->authorized_at= Carbon::now();
                    $action->past_status = 1;
                    $action->save();
                   
                    $developer= User::where('id',$id)->first();
                    
                   
                    $authorize_by= User::where('id',$action->authorized_by)->first();
                    $user_role= Role::where('id',$authorize_by->role_id)->first();
    
                    $past_action= new PendingActionPast();
                    $past_action->item_name = $action->item_name;
                    $past_action->code = $action->code;
                    $past_action->serial = $action->serial;
                    $past_action->action_id = $action->id;
                    $past_action->heading = $action->heading;
                    $past_action->message = $user_role->name.' <a href="'.route('employees.show',$authorize_by->id).'">'.$authorize_by->name.'</a> ignored assigning task to Developer <a href="'.route('employees.show',$developer->id).'">'.$developer->name.'</a>';
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
                    $past_action->developer_id = $action->developer_id;
                    $past_action->save();
                    Toastr::success('Action marked as completed successfully', 'Success', ["positionClass" => "toast-top-right"]);
                    return back();
    
    
            
        }
            # code...
        }
    }
    public function pastAction(Request $request)
    {
        // dd($request->all());
        $action = PendingAction::where('id',$request->id)->first();
        $task= Task::where('id',$action->task_id)->first();
        $project= Project::where('id',$task->project_id)->first();
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
        $past_action->message = $action->message .'was resolved by '.$authorize_by->name;
        $past_action->timeframe = $action->timeframe;
        $past_action->authorization_for = $action->authorization_for;
        $past_action->authorized_by = $action->authorized_by;
        $past_action->authorized_at = $action->authorized_at;
        $past_action->expired_status = $action->expired_status;
        $past_action->past_status = $action->past_status;
        $past_action->project_id = $action->project_id;
        $past_action->task_id = $action->task_id;
        $past_action->client_id = $action->client_id;
        $button = [
            [
                'button_name' => 'View',
                'button_color' => 'primary',
                'button_type' => 'modal',
                'button_url' => '',
                'modal_form'=> false,
            ]
        ];
        $past_action->button = json_encode($button);
        $past_action->save();
    }
}

