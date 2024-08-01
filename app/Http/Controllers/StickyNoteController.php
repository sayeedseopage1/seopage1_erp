<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Http\Requests\Sticky\StoreStickyNote;
use App\Http\Requests\Sticky\UpdateStickyNote;
use App\Models\Deal;
use App\Models\DealStage;
use App\Models\Project;
use App\Models\ProjectMilestone;
use App\Models\StickyNote;
use App\Models\SubTask;
use App\Models\Task;
use App\Models\TaskUser;
use App\Models\User;
use Brian2694\Toastr\Facades\Toastr;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class StickyNoteController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.stickyNotes';
    }

    public function index()
    {
        $this->stickyNotes = StickyNote::where('user_id', user()->id)->orderBy('updated_at', 'desc')->get();

        if (request()->ajax()) {
            $this->pageTitle = __('app.menu.stickyNotes');
            $html = view('sticky-notes.ajax.notes', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'sticky-notes.ajax.notes';

        return view('sticky-notes.index', $this->data);
    }

    /**
     * XXXXXXXXXXX
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $this->stickyNotes = StickyNote::where('user_id', user()->id)->orderBy('updated_at', 'desc')->get();
        // For PM
        $this->find_client = Project::where('pm_id', user()->id)->where('status', 'in progress')->pluck('client_id')->toArray();
        $this->clients = User::whereIn('id', $this->find_client)->select('id','name')->get();
        // For lead develoepr
        $this->lead_dev_clients = Project::where('projects.status','in progress')->whereIn('projects.id', function($query) {
            $query->select('tasks.project_id')
                ->from('tasks')
                ->leftJoin('task_users', 'task_users.task_id', '=', 'tasks.id')
                ->whereNotNull('tasks.project_id')
                ->where('tasks.board_column_id', '!=', 4)
                ->where('task_users.user_id', user()->id)
                ->groupBy('tasks.project_id');
        })
        ->leftJoin('users', 'users.id', '=', 'projects.client_id')
        ->select(['users.id', 'users.name'])
        ->get();
        // For Developer
        $this->dev_clients = Project::where('projects.status','in progress')->whereIn('projects.id', function($query) {
            $query->select('tasks.project_id')
                ->from('tasks')
                ->leftJoin('sub_tasks', 'sub_tasks.task_id', '=', 'tasks.id')
                ->whereNotNull('tasks.project_id')
                ->where('tasks.board_column_id', '!=', 4)
                ->where('sub_tasks.assigned_to', user()->id)
                ->groupBy('tasks.project_id');
        })
        ->leftJoin('users', 'users.id', '=', 'projects.client_id')
        ->select(['users.id', 'users.name'])
        ->get();
        

        $this->pageTitle = __('modules.sticky.addNote');

        if (request()->ajax()) {
            $this->pageTitle = __('modules.sticky.addNote');
            $html = view('sticky-notes.ajax.create', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'sticky-notes.ajax.create';

        return view('sticky-notes.index', $this->data);
    }

    public function store(Request $request)
    {
        if (Auth::user()->role_id == 4) {
            $validated = $request->validate([
                'colour' => 'required',
                'note_type' => 'required',
                'client_id' => ['required_if:note_type,Project'],
                'project_id' => ['required_if:note_type,Project'],
                'reminder_time' => 'required',
                'notetext' => 'required',
            ]);
        }elseif(Auth::user()->role_id == 6){
            $validated = $request->validate([
                'colour' => 'required',
                'note_type' => 'required',
                'client_id' => ['required_if:note_type,Task'],
                'task_id' => ['required_if:note_type,Task'],
                'subtask_id' => ['required_if:note_type,Task'],
                'reminder_time' => 'required',
                'notetext' => 'required',
            ]);
        }elseif(Auth::user()->role_id == 5){
            $validated = $request->validate([
                'colour' => 'required',
                'note_type' => 'required',
                'client_id' => ['required_if:note_type,Sub-Task'],
                'subtask_id' => ['required_if:note_type,Sub-Task'],
                'reminder_time' => 'required',
                'notetext' => 'required',
            ]);
        }elseif(Auth::user()->role_id == 1 || Auth::user()->role_id == 8){
            $validated = $request->validate([
                'colour' => 'required',
                'note_type' => 'required',
                'client_id' => ['required_if:note_type,Project','required_if:note_type,Deal','required_if:note_type,Won Deal'],
                'project_id' => ['required_if:note_type,Project'],
                'milestone_id' => ['required_if:note_type,Project'],
                'task_id' => ['required_if:note_type,Project'],
                'deal_id' => ['required_if:note_type,Deal'],
                'won_deal_id' => ['required_if:note_type,Won Deal'],
                'reminder_time' => 'required',
                'notetext' => 'required',
            ]);
        }
        $sticky = new StickyNote();
        $sticky->colour     = $request->colour;
        //PM Notes Start
        $sticky->note_type = $request->note_type;
        $sticky->client_id = $request->client_id;
        $sticky->project_id = $request->project_id;
        $sticky->milestone_id = $request->milestone_id;
        $sticky->task_id = $request->task_id;
        //PM Notes End
        //Lead lead/dev Notes start
        $sticky->sub_task_id = $request->subtask_id;
        //Lead lead/dev Notes end
        //Lead admin/teamlead Notes start
        $sticky->deal_id = $request->deal_id;
        $sticky->won_deal_id = $request->won_deal_id;
        //Lead lead/dev Notes end
        $sticky->reminder_time = Carbon::now()->addHours($request->reminder_time);
        $sticky->note_text  = $request->notetext;
        $sticky->user_id = Auth::user()->id;
        $sticky->save();

        return response()->json(['status' => 200]);
    }

    public function show($id)
    {
        $this->stickyNotes = StickyNote::where('user_id', user()->id)->where('id', $id)->firstOrFail();
        $this->pageTitle = __('app.note') . ' ' . __('app.details');

        if (request()->ajax()) {
            $html = view('sticky-notes.ajax.show', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'sticky-notes.ajax.show';

        return view('sticky-notes.index', $this->data);
    }

    public function edit($id)
    {
        $this->stickyNote = StickyNote::with('client','project','milestone','task','subtask','deal','won_deal')->where('user_id', user()->id)->where('id', $id)->firstOrFail();
        $this->pageTitle = __('app.edit') . ' ' . __('app.note');

        if (request()->ajax()) {
            $html = view('sticky-notes.ajax.edit', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }
        
        $this->view = 'sticky-notes.ajax.edit';
        return view('sticky-notes.index', $this->data);
    }

    public function update(UpdateStickyNote $request, $id)
    {
        if (Auth::user()->role_id == 4) {
            $validated = $request->validate([
                'reminder_time' => 'required',
                'notetext' => 'required',
            ]);
        }
        $sticky = StickyNote::findOrFail($id);
        $sticky->note_text  = $request->notetext;
        $sticky->reminder_time = Carbon::now()->addHours($request->reminder_time);
        $sticky->user_id = Auth::user()->id;
        $sticky->save();

        return response()->json(['status' => 200]);
    }

    public function destroy($id)
    {
        $note = StickyNote::find($id);
        $note->status = 'Deleted';
        $note->save();
        return Reply::successWithData(__('messages.deleteSuccess'), ['redirectUrl' => route('sticky-notes.index')]);
    }

    public function clientProject(Request $request)
    {
        if(Auth::user()->role_id == 4){
            $findClientProject = Project::where('client_id', $request->client_id)->where('pm_id', Auth::user()->id)->where('status', 'in progress')->select('id', 'project_name')->get();

            return response()->json($findClientProject);
        }elseif(Auth::user()->role_id == 6){
            $leadDevTasks = Project::leftJoin('tasks', 'projects.id', '=', 'tasks.project_id')
                        ->leftJoin('task_users', 'tasks.id', '=', 'task_users.task_id')
                        ->where('projects.client_id', $request->client_id)
                        ->where('projects.status', 'in progress')
                        ->where('tasks.subtask_id', null)
                        ->where('tasks.board_column_id', '!=', 4)
                        ->where('task_users.user_id', Auth::user()->id)
                        ->select('tasks.id', 'heading')
                        ->get();

         return response()->json($leadDevTasks);
         
        }elseif(Auth::user()->role_id == 5){
            $devsubtasks = Project::leftJoin('tasks', 'projects.id', '=', 'tasks.project_id')
                        ->leftJoin('sub_tasks', 'tasks.id', '=', 'sub_tasks.task_id')
                        ->where('projects.client_id', $request->client_id)
                        ->where('projects.status', 'in progress')
                        ->where('tasks.subtask_id', null)
                        ->where('tasks.board_column_id', '!=', 4)
                        ->where('sub_tasks.assigned_to', Auth::user()->id)
                        ->select('sub_tasks.id', 'title')
                        ->get();

         return response()->json($devsubtasks);

        }elseif(Auth::user()->role_id == 1 || Auth::user()->role_id == 8){
            if($request->note_type == 'Project'){
                $findClientProject = Project::where('client_id', $request->client_id)->where('status', 'in progress')->select('id', 'project_name')->get();
                return response()->json(['data'=> $findClientProject, 'status'=>'project']);

            }elseif($request->note_type == 'Deal'){
                $client = User::where('id', $request->client_id)->first();
                $findClientDeals = DealStage::where('client_username', $client->user_name)->get(['id', 'project_name']);
                return response()->json(['data'=> $findClientDeals, 'status'=>'deal']);

            }elseif($request->note_type == 'Won Deal'){
                $findClientWonDeals = Deal::where('client_id', $request->client_id)->where('status', 'Accepted')->get(['id', 'project_name']);
                return response()->json(['data'=> $findClientWonDeals, 'status'=>'won_deal']);
            }
            
        }
    }

    public function projectMilestone(Request $request)
    {
        $findProjectMilestone = ProjectMilestone::where('project_id', $request->project_id)->select('id', 'milestone_title')->get();
        $findProjectTask = Task::where(['project_id' => $request->project_id,'subtask_id' => null,'board_column_id' => 4])->get();
        return response()->json(['project_milestones' => $findProjectMilestone, 'project_tasks' => $findProjectTask]);
    }
    
    public function milestoneTask(Request $request)
    {
        $findMilestoneTask = Task::where(['milestone_id' => $request->milestone_id,'subtask_id' => null,'board_column_id' => 4])->get();

        return response()->json($findMilestoneTask);
    }
    public function taskSubtask(Request $request)
    {
        $findSubTask = SubTask::where('task_id', $request->task_id)->select('id', 'title')->get();
        return response()->json($findSubTask);
    }

    public function noteClients(Request $request)
    {
        if($request->note_type == 'Project'){
            $find_project_clients = Project::where('status','in progress')->pluck('client_id')->toArray();
            $datas = User::whereIn('id', $find_project_clients)->select('id','name')->get();
        }elseif($request->note_type == 'Deal'){
            $deal_clients = DealStage::where('won_lost', null)->pluck('client_username')->toArray();
            $datas = User::whereIn('user_name', $deal_clients)->select('id','name')->get();
        }elseif($request->note_type == 'Won Deal'){
            $find_deal_client = Deal::where('client_id','!=',null)->where('status','Accepted')->pluck('client_id')->toArray();
            $datas = User::whereIn('id', $find_deal_client)->select('id','name')->get();
        }

        return response()->json($datas);
    }

    public function noteComplete($id)
    {
        $note = StickyNote::find($id);
        $note->status = 'Completed';
        $note->save();
        return Reply::successWithData(__('Mark as Completed'), ['redirectUrl' => route('sticky-notes.index')]);
    }

}
