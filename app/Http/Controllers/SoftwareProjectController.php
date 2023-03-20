<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Task;
use App\Models\Team;
use App\Models\User;
use App\Helper\Files;
use App\Helper\Reply;
use App\Models\Pinned;
use App\Models\Expense;
use App\Models\Invoice;
use App\Models\Payment;
use App\Models\SoftwareProject;
use App\Models\Project;
use App\Models\SubTask;
use App\Models\Currency;
use App\Models\TaskUser;
use App\Models\ProjectFile;
use Illuminate\Http\Request;
use App\Models\ProjectMember;
use App\Imports\ProjectImport;
use App\Jobs\ImportProjectJob;
use App\Models\MessageSetting;
use App\Models\ProjectActivity;
use App\Models\ProjectCategory;
use App\Models\ProjectTemplate;
use App\Models\TaskboardColumn;
use App\Traits\ProjectProgress;
use App\DataTables\TasksDataTable;
use App\Models\DiscussionCategory;
use Illuminate\Support\Facades\DB;
use App\Models\ProjectTimeLogBreak;
use Illuminate\Support\Facades\Bus;
use Maatwebsite\Excel\Facades\Excel;
use App\DataTables\ExpensesDataTable;
use App\DataTables\InvoicesDataTable;
use App\DataTables\PaymentsDataTable;
use App\DataTables\SoftwareProjectsDataTable;
use App\DataTables\TimeLogsDataTable;
use App\DataTables\DiscussionDataTable;
use Illuminate\Support\Facades\Artisan;
use Maatwebsite\Excel\HeadingRowImport;
use App\DataTables\ProjectNotesDataTable;
use App\Http\Requests\SoftwareProject\StoreSoftwareProject;
use App\DataTables\ArchiveProjectsDataTable;
use App\DataTables\ArchiveTasksDataTable;
use App\Http\Requests\Project\UpdateProject;
use App\Http\Requests\SoftwareProject\UpdateSoftwareProject;
use Maatwebsite\Excel\Imports\HeadingRowFormatter;
use App\Http\Requests\Admin\Employee\ImportRequest;
use App\Http\Requests\Admin\Employee\ImportProcessRequest;
use App\Models\ProjectNote;
use App\Models\ProjectStatusSetting;
use App\Models\PMProject;
use App\Models\PMAssign;
use App\Models\Deal;
use App\Models\RoleUser;
use Auth;
use App\Models\Lead;
use Response;
use Illuminate\Support\Facades\App;
use App\Events\ProjectSignedEvent;
use App\Http\Requests\ClientContracts\SignRequest;
use App\Models\ContractSign;
use Illuminate\Support\Facades\File;
use App\Models\ProjectDeliverable;
use Toastr;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use App\Models\ProjectDispute;
use Notification;
use App\Notifications\ProjectDisputeNotification;
use App\Models\ProjectMilestone;
use App\Models\ProjectSubmission;
use App\Models\ProjectNiche;
use App\Notifications\ProjectReviewNotification;
use App\Notifications\ProjectReviewAcceptNotification;
use App\Notifications\ProjectSubmissionNotification;
use App\Notifications\ProjectSubmissionAcceptNotification;
use App\Models\QCSubmission;
use App\Notifications\QCSubmissionNotification;
use App\Notifications\QcSubmissionAcceptNotification;
use App\Notifications\ProjectDeliverableTimeExtendNotification;
use App\Notifications\ProjectDeliverableTimeAcceptNotification;

use App\Notifications\DeliverableOthersAuthorizationNotification;
use App\Notifications\DeliverableOthersAuthorizationAcceptNotification;

use App\Notifications\ProjectDeliverableFinalAuthorizationNotification;
use App\Notifications\ProjectDeliverableFinalAuthorizationNotificationAccept;



class SoftwareProjectController extends AccountBaseController
{
    use ProjectProgress;

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'Software Development Projects';
        $this->middleware(function ($request, $next) {

            abort_403(!in_array('projects', $this->user->modules));
            //dd($this->user->modules);
            return $next($request);
        });
    }

    /**
     * XXXXXXXXXXX
     *
     * @return \Illuminate\Http\Response
     */
    public function index(SoftwareProjectsDataTable $dataTable)
    {
    //  dd($dataTable);
        $viewPermission = user()->permission('view_projects');
        abort_403(!in_array($viewPermission, ['all', 'added', 'owned', 'both']));

        if (!request()->ajax()) {


            if (in_array('client', user_roles())) {
                $this->clients = User::client();
                //dd($this->clients);
            }
            else {
                $this->clients = User::allClients();
                $this->allEmployees = User::allEmployees(null, true, ($viewPermission == 'all' ? 'all' : null));
            }

            $this->categories = ProjectCategory::all();
            $this->departments = Team::all();
            $this->projectStatus = ProjectStatusSetting::where('status', 'active')->get();
            $project = Project::where('project_status', 'Accepted')->get();

            //dd($project);

        }

        //dd($this->data);


       

      return $dataTable->render('software_projects.index', $this->data);

    }
    public function ProjectOverviewFilter(Request $request)
    {
    //  dd($request);
          //   $start_date = Carbon::createFromFormat($this->global->date_format, $request->start_date)->format('Y-m-d');
          // //  dd($start_date);
          //    $due_date =  Carbon::createFromFormat($this->global->date_format, $request->due_date)->format('Y-m-d');
          //    $type_id= $request->type_id;
          //    $status_id= $request->status_id;
          //   if ($start_date != null) {
          //     $data2= Project::where('start_date','>=',$start_date)->get();
          //   }
          //   if ($due_date != null) {
          //       $data2= Project::where('deadline','>=',$due_date)->get();
          //   }
          //   if ($type_id != null && $type_id == 'budget') {
          //       $data2= Project::orderBy('project_budget','desc')->get();
          //   }if ($type_id != null && $type_id == 'progress') {
          //       $data2= Project::orderBy('completion_percent')->get();
          //   }
          //   if ($status_id != null) {
          //     $data2= Project::where('status',$status_id)->get();
          //   }
          //   $data2->get();
          // return Response::json($data2);
         //$projects= Project::query();
         if($request->ajax()){
           if ($request->type_id == "budget") {

              $projects= Project::orderBy('project_budget','desc')->get();

           }else {
             $projects= Project::orderBy('completion_percent','desc')->get();
           }
           if ($request->status_id) {
               $projects= Project::where('status',$request->status_id)->get();
           }

         }
         //$projects= $qu->get();
         return Response::json(['projects'=>$projects]);
    }
    /**
     * XXXXXXXXXXX
     *
     * @return array
     */
    public function applyQuickAction(Request $request)
    {
        switch ($request->action_type) {
        case 'delete':
            $this->deleteRecords($request);
                return Reply::success(__('messages.deleteSuccess'));
        case 'archive':
            $this->archiveRecords($request);
                return Reply::success(__('messages.projectArchiveSuccessfully'));
        case 'change-status':
            $this->changeStatus($request);
                return Reply::success(__('messages.statusUpdatedSuccessfully'));
        default:
                return Reply::error(__('messages.selectAction'));
        }
    }

    protected function deleteRecords($request)
    {
        abort_403(user()->permission('delete_projects') != 'all');

        Project::withTrashed()->whereIn('id', explode(',', $request->row_ids))->forceDelete();

        $items = explode(',', $request->row_ids);

        foreach ($items as $item) {
            // Delete project files
            Files::deleteDirectory(ProjectFile::FILE_PATH . '/' . $item);
        }
    }

    protected function archiveRecords($request)
    {
        abort_403(user()->permission('edit_projects') != 'all');

        Project::whereIn('id', explode(',', $request->row_ids))->delete();
    }

    public function archiveDestroy($id)
    {
        Project::destroy($id);
        return Reply::success(__('messages.projectArchiveSuccessfully'));
    }

    protected function changeStatus($request)
    {
        abort_403(user()->permission('edit_projects') != 'all');

        Project::whereIn('id', explode(',', $request->row_ids))->update(['status' => $request->status]);
    }

    public function updateStatus(Request $request, $id)
    {
        Project::find($id)
            ->update([
                'status' => $request->status
            ]);

        return Reply::success(__('messages.updatedSuccessfully'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $project = Project::withTrashed()->findOrFail($id);
        $this->deletePermission = user()->permission('delete_projects');
        abort_403(!($this->deletePermission == 'all' || ($this->deletePermission == 'added' && $project->added_by == user()->id)));

        // Delete project files
        Files::deleteDirectory(ProjectFile::FILE_PATH . '/' . $id);
        $project->forceDelete();

        return Reply::success(__('messages.projectDeleted'));

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
       

        $this->pageTitle = __('app.add') . ' ' . __('app.project');
        $this->clients = User::allClients();
        $this->categories = ProjectCategory::all();
        $this->templates = ProjectTemplate::all();
        $this->currencies = Currency::all();
        $this->teams = Team::all();
        $this->employees = User::all();
        $this->redirectUrl = request()->redirectUrl;

        $this->projectTemplate = request('template') ? ProjectTemplate::with('membersMany')->findOrFail(request('template')) : null;

        if ($this->projectTemplate) {
            $this->projectTemplateMembers = $this->projectTemplate->membersMany ? $this->projectTemplate->membersMany->pluck('id')->toArray() : null;
        }

        $project = new Project();

        if (!empty($project->getCustomFieldGroupsWithFields())) {
            $this->fields = $project->getCustomFieldGroupsWithFields()->fields;
        }

        if (in_array('client', user_roles())) {
            $this->client = User::find(user()->id);

        }
        else {
            $this->client = isset(request()->default_client) ? User::find(request()->default_client) : null;
        }

        if (request()->ajax()) {
            $html = view('software_projects.ajax.create', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'software_projects.ajax.create';
        return view('software_projects.create', $this->data);

    }

    /**
     * @param StoreSoftwareProject $request
     * @return array|mixed
     * @throws \Throwable
     */
    public function store(StoreSoftwareProject $request)
    {
       // dd($request);
        // $this->addPermission = user()->permission('add_projects');

        // abort_403(!in_array($this->addPermission, ['all', 'added']));

        DB::beginTransaction();

        try {
            // $this->addPermission = user()->permission('add_projects');

            $startDate = Carbon::createFromFormat($this->global->date_format, $request->start_date)->format('Y-m-d');
            $deadline = !$request->has('without_deadline') ? Carbon::createFromFormat($this->global->date_format, $request->deadline)->format('Y-m-d') : null;


            $project = new SoftwareProject();
           // $notes = new SoftwareProjectNote();
            $project->project_name = $request->project_name;
            $project->project_short_code = $request->project_code;

            $project->project_summary = ($request->project_summary !== '<p><br></p>') ? $request->project_summary : null;

            $project->start_date = $startDate;
            $project->deadline = $deadline;
            $project->added_by = Auth::id();
          //  $project->notes= $request->notes;

            // if ($request->notes != '') {
            //     $project->notes = str_replace('<p><br></p>', '', trim($request->notes));
            //     $notes->title = 'Note';
            //     $notes->details = $request->notes;
               
            // }

            if ($request->category_id != '') {
                $project->category_id = $request->category_id;
            }

        //    / $project->client_id = $request->client_id;
            // $request->client_view_task = $request->client_view_task ? 'enable' : 'disable';
            // $project->allow_client_notification = ($request->client_view_task) && ($request->client_task_notification) ? 'enable' : 'disable';
        //    / $request->manual_timelog = $request->manual_timelog ? 'enable' : 'disable';

            if ($request->team_id > 0) {
                $project->team_id = $request->team_id;
            }

            

           

            $project->save();
           





            

            // To add custom fields data
           
            // Commit Transaction
            DB::commit();


            $redirectUrl = urldecode($request->redirect_url);

            if ($redirectUrl == '') {
                $redirectUrl = route('software_projects.index');
            }

           // return Reply::dataOnly(['projectID' => $project->id, 'redirectUrl' => $redirectUrl]);
            return Reply::successWithData(__('Projects added successfully'), ['projectID' => $project->id, 'redirectUrl' => $redirectUrl]);

        } catch (\Swift_TransportException $e) {
            // Rollback Transaction
            DB::rollback();
            return Reply::error('Please configure SMTP details to add project. Visit Settings -> notification setting to set smtp', 'smtp_error');
        } catch (\Exception $e) {
            // Rollback Transaction
            DB::rollback();
            return Reply::error('Some error occured when inserting the data. Please try again or contact support');
        }
    }

    public function edit($id)
    {
        $this->project = SoftwareProject::
             findOrFail($id);
           

       


       

        $this->pageTitle = __('app.update') . ' ' . __('Software Development Project');

      

        $this->clients = User::allClients();
        $this->categories = ProjectCategory::all();
        $this->currencies = Currency::all();
        $this->teams = Team::all();
        $this->projectStatus = ProjectStatusSetting::where('status', 'active')->get();

       

        if (request()->ajax()) {
            $html = view('software_projects.ajax.edit', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }


        abort_403(user()->permission('edit_projects') == 'added' && $this->project->added_by != user()->id);
        $this->view = 'software_projects.ajax.edit';

        return view('software_projects.create', $this->data);

    }
    public function dispute($id)
    {
        $this->project = Project::with('client', 'members', 'members.user', 'members.user.session', 'members.user.employeeDetail.designation', 'milestones', 'milestones.currency')
            ->withTrashed()
            ->findOrFail($id)
            ->withCustomFields();

        $memberIds = $this->project->members->pluck('user_id')->toArray();

        $this->editPermission = user()->permission('edit_projects');
        $this->editProjectMembersPermission = user()->permission('edit_project_members');

        abort_403(!(
            $this->editPermission == 'all'
            || ($this->editPermission == 'added' && user()->id == $this->project->added_by)
            || ($this->editPermission == 'owned' && user()->id == $this->project->client_id && in_array('client', user_roles()))
            || ($this->editPermission == 'owned' && in_array(user()->id, $memberIds) && in_array('employee', user_roles()))
            || ($this->editPermission == 'both' && (user()->id == $this->project->client_id || user()->id == $this->project->added_by))
            || ($this->editPermission == 'both' && in_array(user()->id, $memberIds) && in_array('employee', user_roles()))
        ));

        $this->pageTitle = __('Dispute') . ' ' . __('app.project');

        if (!empty($this->project->getCustomFieldGroupsWithFields())) {
            $this->fields = $this->project->getCustomFieldGroupsWithFields()->fields;
        }

        $this->clients = User::allClients();
        $this->categories = ProjectCategory::all();
        $this->currencies = Currency::all();
        $this->teams = Team::all();
        $this->projectStatus = ProjectStatusSetting::where('status', 'active')->get();

        if ($this->editPermission == 'all' || $this->editProjectMembersPermission == 'all') {
            $this->employees = User::allEmployees(null, null, ($this->editPermission == 'all' ? 'all' : null));
        }
        else{
            $this->employees = '';
        }

        if (request()->ajax()) {
            $html = view('projects.ajax.dispute', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }


        abort_403(user()->permission('edit_projects') == 'added' && $this->project->added_by != user()->id);
        $this->view = 'projects.ajax.dispute';

        return view('projects.create', $this->data);

    }
    public function storeDispute(Request $request)
    {

    // $validator=  $request->validate([
    //       'client_username' => 'required',
    //       'project_value' => 'required',
    //       'project_name' => 'required',
    //       'description1' => 'required',
    //       'description2' => 'required',
    //       'description3' => 'required',
    //       'description4' => 'required',
    //       'description5' => 'required',
    //       'description6' => 'required',
    //       'description7' => 'required',
    //       'description8' => 'required',
    //
    //       'description10' => 'required',
    //       'description11' => 'required',
    //       'description12' => 'required',
    //       'description13' => 'required',
    //       'description14' => 'required',
    //       'description15' => 'required',
    //       'description16' => 'required',
    //       'description17' => 'required',
    //       'pm_name' => 'required',
    //       'pm_email' => 'required',
    //
    //   ]);
      //dd("Dispute is Valid");

        $dispute = new ProjectDispute();
        $dispute->client_username= $request->client_username;
        $dispute->project_value= $request->project_value;
        $dispute->project_id= $request->project_id;
        $dispute->description1= $request->description1;
        $dispute->description2= $request->description2;
        $dispute->description3= $request->description3;
        $dispute->description4= $request->description4;
        $dispute->description5= $request->description5;
        $dispute->description6= $request->description6;
        $dispute->description7= $request->description7;
        $dispute->description8= $request->description8;
        $dispute->description9= $request->description9;
        $dispute->description11= $request->description11;
        $dispute->description10= $request->description10;
        $dispute->description12= $request->description12;
        $dispute->description13= $request->description13;
        $dispute->description14= $request->description14;
        $dispute->description15= $request->description15;
        $dispute->description16= $request->description16;
        $dispute->description17= $request->description17;
        $dispute->pm_email= $request->pm_email;
        $dispute->pm_name= $request->pm_name;
        $dispute->pm_id= Auth::id();
        $dispute->save();
        $project= Project::find($dispute->project_id);
        $project->status ='canceled';
        $project->save();
        $users= User::where('role_id',1)->get();
        foreach ($users as $user) {


           Notification::send($user, new ProjectDisputeNotification($project));
        }

        Toastr::success('Submitted Successfully', 'Success', ["positionClass" => "toast-top-right"]);
        //  return Redirect::route('projects.index');
          return redirect('/account/projects/' .$dispute->project_id);



    }
    public function disputeView($id)
    {
        $this->project = Project::with('client', 'members', 'members.user', 'members.user.session', 'members.user.employeeDetail.designation', 'milestones', 'milestones.currency')
            ->withTrashed()
            ->findOrFail($id)
            ->withCustomFields();

        $memberIds = $this->project->members->pluck('user_id')->toArray();

        $this->editPermission = user()->permission('edit_projects');
        $this->editProjectMembersPermission = user()->permission('edit_project_members');

        abort_403(!(
            $this->editPermission == 'all'
            || ($this->editPermission == 'added' && user()->id == $this->project->added_by)
            || ($this->editPermission == 'owned' && user()->id == $this->project->client_id && in_array('client', user_roles()))
            || ($this->editPermission == 'owned' && in_array(user()->id, $memberIds) && in_array('employee', user_roles()))
            || ($this->editPermission == 'both' && (user()->id == $this->project->client_id || user()->id == $this->project->added_by))
            || ($this->editPermission == 'both' && in_array(user()->id, $memberIds) && in_array('employee', user_roles()))
        ));

        $this->pageTitle = __('Dispute') . ' ' . __('app.project');

        if (!empty($this->project->getCustomFieldGroupsWithFields())) {
            $this->fields = $this->project->getCustomFieldGroupsWithFields()->fields;
        }

        $this->clients = User::allClients();
        $this->categories = ProjectCategory::all();
        $this->currencies = Currency::all();
        $this->teams = Team::all();
        $this->dispute = ProjectDispute::where('project_id',$id)->first();
        $this->projectStatus = ProjectStatusSetting::where('status', 'active')->get();

        if ($this->editPermission == 'all' || $this->editProjectMembersPermission == 'all') {
            $this->employees = User::allEmployees(null, null, ($this->editPermission == 'all' ? 'all' : null));
        }
        else{
            $this->employees = '';
        }

        if (request()->ajax()) {
            $html = view('projects.ajax.disputeview', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }


        abort_403(user()->permission('edit_projects') == 'added' && $this->project->added_by != user()->id);
        $this->view = 'projects.ajax.disputeview';

        return view('projects.create', $this->data);

    }


    /**
     * @param UpdateProject $request
     * @param int $id
     * @return array
     * @throws \Froiden\RestAPI\Exceptions\RelatedResourceNotFoundException
     */
    public function update(UpdateSoftwareProject $request, $id)
    {

      //  dd($request->all());
        $project = SoftwareProject::findOrFail($id);
       
        $project->project_name = $request->project_name;
        $project->project_short_code = $request->project_code;

        $project->project_summary = ($request->project_summary !== '<p><br></p>') ? $request->project_summary : null;
       

        $project->start_date = Carbon::createFromFormat($this->global->date_format, $request->start_date)->format('Y-m-d');

        if (!$request->has('without_deadline')) {
            $project->deadline = Carbon::createFromFormat($this->global->date_format, $request->deadline)->format('Y-m-d');
        }
        else {
            $project->deadline = null;
        }

       

        if ($request->category_id != '') {
            $project->category_id = $request->category_id;
        }

        

      

       

        $project->team_id = null;

        if ($request->team_id > 0) {
            $project->team_id = $request->team_id;
        }

       

       
      //  dd($project);
   
        
        $project->save();
       



        $redirectUrl = urldecode($request->redirect_url);

        if ($redirectUrl == '') {
            $redirectUrl = route('software_projects.index');
        }

        return Reply::successWithData(__('messages.projectUpdated'), ['projectID' => $project->id, 'redirectUrl' => $redirectUrl]);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $this->viewPermission = user()->permission('view_projects');
        $viewFilePermission = user()->permission('view_project_files');
        $viewMilestonePermission = user()->permission('view_project_milestones');
        $this->viewPaymentPermission = user()->permission('view_project_payments');
        $this->viewProjectTimelogPermission = user()->permission('view_project_timelogs');
        $this->viewExpensePermission = user()->permission('view_project_expenses');
        $this->viewRatingPermission = user()->permission('view_project_rating');
        $this->viewBurndownChartPermission = user()->permission('view_project_burndown_chart');
        $this->viewProjectMemberPermission = user()->permission('view_project_members');

        $this->project = Project::with(['client', 'members', 'members.user', 'members.user.session', 'members.user.employeeDetail.designation', 'milestones' => function ($q) use ($viewMilestonePermission) {
            if ($viewMilestonePermission == 'added') {
                $q->where('added_by', user()->id);
            }
        },
            'milestones.currency', 'files' => function ($q) use ($viewFilePermission) {
                if ($viewFilePermission == 'added') {
                    $q->where('added_by', user()->id);
                }
            }])
            ->withTrashed()
            ->findOrFail($id)
            ->withCustomFields();


        $memberIds = $this->project->members->pluck('user_id')->toArray();
        abort_403(!(
            $this->viewPermission == 'all'
            || $this->project->public
            || $this->viewProjectMemberPermission == 'all'
            || ($this->viewPermission == 'added' && user()->id == $this->project->added_by)
            || ($this->viewPermission == 'owned' && user()->id == $this->project->client_id && in_array('client', user_roles()))
            || ($this->viewPermission == 'owned' && in_array(user()->id, $memberIds) && in_array('employee', user_roles()))
            || ($this->viewPermission == 'both' && (user()->id == $this->project->client_id || user()->id == $this->project->added_by))
            || ($this->viewPermission == 'both' && (in_array(user()->id, $memberIds) || user()->id == $this->project->added_by) && in_array('employee', user_roles()))
        ));

        $this->pageTitle = ucfirst($this->project->project_name);

        if (!empty($this->project->getCustomFieldGroupsWithFields())) {
            $this->fields = $this->project->getCustomFieldGroupsWithFields()->fields;
        }

        $this->messageSetting = MessageSetting::first();
        $this->projectStatus = ProjectStatusSetting::where('status', 'active')->get();
        $this->deliverables= ProjectDeliverable::where('project_id',$this->project->id)->get();

        $tab = request('tab');

        switch ($tab) {
        case 'members':
            abort_403(!(
                $this->viewProjectMemberPermission == 'all'
            ));
            $this->view = 'projects.ajax.members';
                break;
        case 'milestones':
            $this->view = 'projects.ajax.milestones';
                break;
        case 'deliverables':
                    $this->view = 'projects.ajax.deliverables';
                        break;
        case 'taskboard':
            session()->forget('pusher_settings');
            $this->view = 'projects.ajax.taskboard';
                break;
        case 'tasks':
            $this->taskBoardStatus = TaskboardColumn::all();
                return (!$this->project->trashed()) ? $this->tasks($this->project->project_admin == user()->id) : $this->archivedTasks($this->project->project_admin == user()->id);
        case 'gantt':
            $this->taskBoardStatus = TaskboardColumn::all();
            $this->view = 'projects.ajax.gantt';
                break;
        case 'invoices':
                return $this->invoices();
        case 'files':
            $this->view = 'projects.ajax.files';
                break;
        case 'timelogs':
                return $this->timelogs($this->project->project_admin == user()->id);
        case 'expenses':
                return $this->expenses();
        case 'payments':
                return $this->payments();
        case 'discussion':
            $this->discussionCategories = DiscussionCategory::orderBy('order', 'asc')->get();
                return $this->discussions($this->project->project_admin == user()->id);
        case 'notes':
                return $this->notes($this->project->project_admin == user()->id);
        case 'rating':
                return $this->rating($this->project->project_admin == user()->id);
        case 'burndown-chart':
            $this->fromDate = now($this->global->timezone)->startOfMonth();
            $this->toDate = now($this->global->timezone);
                return $this->burndownChart($this->project);
        default:
            $this->activities = ProjectActivity::getProjectActivities($id, 10);
            $this->taskChart = $this->taskChartData($id);
            $this->hoursBudgetChart = $this->hoursBudgetChartData($this->project);
            $this->amountBudgetChart = $this->amountBudgetChartData($this->project);
            $this->taskBoardStatus = TaskboardColumn::all();
            $this->earnings = Payment::where('status', 'complete')
                ->where('project_id', $id)
                ->sum('amount');
            $hoursLogged = $this->project->times()->sum('total_minutes');

            $breakMinutes = ProjectTimeLogBreak::projectBreakMinutes($id);

            $this->hoursLogged = intdiv($hoursLogged - $breakMinutes, 60);
            $this->expenses = Expense::where(['project_id' => $id, 'status' => 'approved'])->sum('price');
            $this->view = 'projects.ajax.overview';
                break;
        }


        if (request()->ajax()) {
            $html = view($this->view, $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        ($tab == '') ? $this->activeTab = 'overview' : $this->activeTab = $tab;

        // abort_403(user()->permission('view_projects') == 'added' && $this->project->added_by != user()->id);

        return view('projects.show', $this->data);

    }

    /**
     * XXXXXXXXXXX
     *
     * @return array
     */
    public function taskChartData($id)
    {
        $taskStatus = TaskboardColumn::all();
        $data['labels'] = $taskStatus->pluck('column_name');
        $data['colors'] = $taskStatus->pluck('label_color');
        $data['values'] = [];

        foreach ($taskStatus as $label) {
            $data['values'][] = Task::where('project_id', $id)->where('tasks.board_column_id', $label->id)->count();
        }

        return $data;
    }

    /**
     * XXXXXXXXXXX
     *
     * @return array
     */
    public function hoursBudgetChartData($project)
    {
        $hoursBudget = $project->hours_allocated ? $project->hours_allocated : 0;
        $hoursLogged = $project->times()->sum('total_minutes');
        $hoursLogged = intdiv($hoursLogged, 60);
        $overRun = $hoursLogged - $hoursBudget;
        $overRun = $overRun < 0 ? 0 : $overRun;

        $data['labels'] = [__('app.planned'), __('app.actual')];
        $data['colors'] = ['#2cb100', '#d30000'];
        $data['threshold'] = $hoursBudget;
        $dataset = [
            [
                'name' => __('app.planned'),
                'values' => [$hoursBudget, $hoursBudget],
            ],
            [
                'name' => __('app.overrun'),
                'values' => [0, $overRun],
            ],
        ];
        $data['datasets'] = $dataset;

        return $data;
    }

    /**
     * XXXXXXXXXXX
     *
     * @return \Illuminate\Http\Response
     */
    public function amountBudgetChartData($project)
    {
        $amountBudget = $project->project_budget ? $project->project_budget : 0;
        $earnings = Payment::where('status', 'complete')
            ->where('project_id', $project->id)
            ->sum('amount');
        $plannedOverun = $earnings < $amountBudget ? $earnings : $amountBudget;
        $overRun = $earnings - $amountBudget;
        $overRun = $overRun < 0 ? 0 : $overRun;

        $data['labels'] = [__('app.planned'), __('app.actual')];
        $data['colors'] = ['#2cb100', '#d30000'];
        $data['threshold'] = $amountBudget;
        $dataset = [
            [
                'name' => __('app.planned'),
                'values' => [$amountBudget, $plannedOverun],
            ],
            [
                'name' => __('app.overrun'),
                'values' => [0, $overRun],
            ],
        ];
        $data['datasets'] = $dataset;

        return $data;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function storePin(Request $request)
    {
        $pinned = new Pinned();
        $pinned->task_id = $request->task_id;
        $pinned->project_id = $request->project_id;
        $pinned->save();

        return Reply::success(__('messages.pinnedSuccess'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return array
     */
    public function destroyPin(Request $request, $id)
    {
        Pinned::where('project_id', $id)->where('user_id', user()->id)->delete();
        return Reply::success(__('messages.pinnedRemovedSuccess'));
    }

    public function assignProjectAdmin(Request $request)
    {
        $userId = $request->userId;
        $projectId = $request->projectId;
        $project = Project::findOrFail($projectId);
        $project->project_admin = $userId;
        $project->save();

        return Reply::success(__('messages.roleAssigned'));
    }

    public function tasks($projectAdmin = false)
    {
        $dataTable = new TasksDataTable();

        if (!$projectAdmin) {
            $viewPermission = user()->permission('view_project_tasks');
            abort_403(!in_array($viewPermission, ['all', 'added', 'owned']));

            $viewPermission = user()->permission('view_tasks');
            abort_403(!in_array($viewPermission, ['all', 'added', 'owned', 'both']));
        }

        $tab = request('tab');
        ($tab == '') ? $this->activeTab = 'overview' : $this->activeTab = $tab;
        $this->view = 'projects.ajax.tasks';
        return $dataTable->render('projects.show', $this->data);

    }

    public function archivedTasks($projectAdmin = false)
    {
        $dataTable = new ArchiveTasksDataTable();

        if (!$projectAdmin) {
            $viewPermission = user()->permission('view_project_tasks');
            abort_403(!in_array($viewPermission, ['all', 'added', 'owned']));

            $viewPermission = user()->permission('view_tasks');
            abort_403(!in_array($viewPermission, ['all', 'added', 'owned', 'both']));
        }

        $tab = request('tab');
        ($tab == '') ? $this->activeTab = 'overview' : $this->activeTab = $tab;
        $this->view = 'projects.ajax.tasks';
        return $dataTable->render('projects.show', $this->data);

    }

    public function ganttData()
    {
        $id = request('projectID');
        $assignedTo = request('assignedTo');
        $projectTask = request('projectTask');
        $taskStatus = request('taskStatus');
        $milestones = request('milestones');
        $withoutDueDate = false;

        if ($assignedTo != 'all') {
            $tasks = Task::projectTasks($id, $assignedTo, null, $withoutDueDate);
        }
        else {
            $tasks = Task::projectTasks($id, null, null, $withoutDueDate);
        }

        if ($projectTask) {
            $tasks = $tasks->whereIn('id', explode(',', $projectTask));
        }

        if ($taskStatus) {
            $tasks = $tasks->whereIn('board_column_id', explode(',', $taskStatus));
        }

        if ($milestones != '') {
            $tasks = $tasks->whereIn('milestone_id', explode(',', $milestones));
        }

        $data = array();

        $count = 0;

        foreach ($tasks as $key => $task) {
            $data[$count] = [
                'id' => 'task-' . $task->id,
                'name' => ucfirst($task->heading),
                'start' => ((!is_null($task->start_date)) ? $task->start_date->format('Y-m-d') : ((!is_null($task->due_date)) ? $task->due_date->format('Y-m-d') : null)),
                'end' => (!is_null($task->due_date)) ? $task->due_date->format('Y-m-d') : $task->start_date->format('Y-m-d'),
                'progress' => 0,
                'bg_color' => $task->boardColumn->label_color,
                'taskid' => $task->id,
                'draggable' => true
            ];

            if (!is_null($task->dependent_task_id)) {
                $data[$count]['dependencies'] = 'task-' . $task->dependent_task_id;
            }

            $count++;
        }

        return response()->json($data);
    }

    public function invoices()
    {
        $dataTable = new InvoicesDataTable;
        $viewPermission = user()->permission('view_project_invoices');
        abort_403(!in_array($viewPermission, ['all', 'added', 'owned']));

        $tab = request('tab');
        ($tab == '') ? $this->activeTab = 'overview' : $this->activeTab = $tab;
        $this->view = 'projects.ajax.invoices';
        return $dataTable->render('projects.show', $this->data);
    }

    /**
     * XXXXXXXXXXX
     *
     * @return \Illuminate\Http\Response
     */
    public function invoiceList($id)
    {
        $options = '<option value="">--</option>';

        $viewPermission = user()->permission('view_invoices');

        if (($viewPermission == 'all' || $viewPermission == 'added')) {

            if ($id != 0) {
                $invoices = Invoice::with('payment', 'currency')->where('project_id', $id)->pending()->get();
            }
            else {
                $invoices = Invoice::with('payment')->where(function ($q) {
                    $q->where('status', 'unpaid')
                        ->orWhere('status', 'partial');
                })->get();
            }

            foreach ($invoices as $item) {
                $paidAmount = $item->amountPaid();

                $options .= '<option data-currency-id="' . $item->currency->id . '" data-content="' . $item->invoice_number . ' - ' . __('app.total') . ': <span class=\'text-dark f-w-500 mr-2\'>' . currency_formatter($item->total, $item->currency->currency_symbol) . ' </span>' . __('modules.invoices.due') . ': <span class=\'text-red\'>' . currency_formatter(max(($item->total - $paidAmount), 0), $item->currency->currency_symbol) . '</span>" value="' . $item->id . '"> ' . $item->invoice_number . ' </option>';
            }
        }

        return Reply::dataOnly(['status' => 'success', 'data' => $options]);
    }

    /**
     * XXXXXXXXXXX
     *
     * @return \Illuminate\Http\Response
     */
    public function members($id)
    {
        $options = '';

        $project = Project::where('public', '1')->find($id);
        $checkPublic = $project > 'public' ? 1 : 0;

        if ($id == 0 || $checkPublic == 1 ) {
            $members = User::allEmployees();

            foreach ($members as $item) {
                $self_select = (user() && user()->id == $item->id) ? '<span class=\'ml-2 badge badge-secondary\'>' . __('app.itsYou') . '</span>' : '';

                $options .= '<option  data-content="<span class=\'badge badge-pill badge-light border\'><div class=\'d-inline-block mr-1\'><img class=\'taskEmployeeImg rounded-circle\' src=' . $item->image_url . ' ></div></span>  ' . $item->name. ''.$self_select.'" value="' . $item->id . '"> ' . $item->name.'</option>';
            }

            $projectShortCode = '--';
        }
        else {
            $members = ProjectMember::with('user')->where('project_id', $id)->get();

            foreach ($members as $item) {
                $options .= '<option  data-content="<div class=\'d-inline-block mr-1\'><img class=\'taskEmployeeImg rounded-circle\' src=' . $item->user->image_url . ' ></div>  ' . $item->user->name . '" value="' . $item->user->id . '"> ' . $item->user->name . ' </option>';
            }

            $project = Project::find($id);
            $projectShortCode = $project->project_short_code;
        }

        return Reply::dataOnly(['status' => 'success', 'unique_id' => $projectShortCode, 'data' => $options]);
    }

    public function timelogs($projectAdmin = false)
    {
        $dataTable = new TimeLogsDataTable();

        if (!$projectAdmin) {
            $viewPermission = user()->permission('view_project_timelogs');
            abort_403(!in_array($viewPermission, ['all', 'added', 'owned']));
        }

        $tab = request('tab');
        ($tab == '') ? $this->activeTab = 'overview' : $this->activeTab = $tab;
        $this->view = 'projects.ajax.timelogs';
        return $dataTable->render('projects.show', $this->data);
    }

    public function expenses()
    {
        $dataTable = new ExpensesDataTable();
        $viewPermission = user()->permission('view_project_expenses');
        abort_403(!in_array($viewPermission, ['all', 'added', 'owned']));

        $tab = request('tab');
        ($tab == '') ? $this->activeTab = 'overview' : $this->activeTab = $tab;
        $this->view = 'projects.ajax.expenses';
        return $dataTable->render('projects.show', $this->data);

    }

    public function payments()
    {
        $dataTable = new PaymentsDataTable();
        $viewPermission = user()->permission('view_project_payments');
        abort_403(!in_array($viewPermission, ['all', 'added', 'owned']));

        $tab = request('tab');
        ($tab == '') ? $this->activeTab = 'overview' : $this->activeTab = $tab;
        $this->view = 'projects.ajax.payments';
        return $dataTable->render('projects.show', $this->data);

    }

    public function discussions($projectAdmin = false)
    {
        $dataTable = new DiscussionDataTable();

        if (!$projectAdmin) {
            $viewPermission = user()->permission('view_project_discussions');
            abort_403(!in_array($viewPermission, ['all', 'added']));
        }

        $tab = request('tab');
        ($tab == '') ? $this->activeTab = 'overview' : $this->activeTab = $tab;
        $this->view = 'projects.ajax.discussion';
        return $dataTable->render('projects.show', $this->data);

    }

    public function burndown(Request $request, $id)
    {
        $this->project = Project::with(['tasks' => function ($query) use ($request) {
            if ($request->startDate !== null && $request->startDate != 'null' && $request->startDate != '') {
                $query->where(DB::raw('DATE(`start_date`)'), '>=', Carbon::createFromFormat($this->global->date_format, $request->startDate));
            }

            if ($request->endDate !== null && $request->endDate != 'null' && $request->endDate != '') {
                $query->where(DB::raw('DATE(`due_date`)'), '<=', Carbon::createFromFormat($this->global->date_format, $request->endDate));
            }

            $query->whereNotNull('due_date');
        }])->withTrashed()->findOrFail($id);

        $this->totalTask = $this->project->tasks->count();
        $datesArray = [];
        $startDate = $request->startDate ? Carbon::createFromFormat($this->global->date_format, $request->startDate) : Carbon::parse($this->project->start_date);

        if ($this->project->deadline) {
            $endDate = $request->endDate ? Carbon::createFromFormat($this->global->date_format, $request->endDate) : Carbon::parse($this->project->deadline);
        }
        else {
            $endDate = $request->endDate ? Carbon::createFromFormat($this->global->date_format, $request->endDate) : now();
        }

        for ($startDate; $startDate <= $endDate; $startDate->addDay()) {
            $datesArray[] = $startDate->format($this->global->date_format);
        }

        $uncompletedTasks = [];
        $createdTasks = [];
        $deadlineTasks = [];
        $deadlineTasksCount = [];
        $this->datesArray = json_encode($datesArray);

        foreach ($datesArray as $key => $value) {

            if (Carbon::createFromFormat($this->global->date_format, $value)->lessThanOrEqualTo(Carbon::now())) {
                $uncompletedTasks[$key] = $this->project->tasks->filter(function ($task) use ($value) {

                    if (is_null($task->completed_on)) {
                        return true;
                    }

                    return $task->completed_on ? $task->completed_on->greaterThanOrEqualTo(Carbon::createFromFormat($this->global->date_format, $value)) : false;
                })->count();

                $createdTasks[$key] = $this->project->tasks->filter(function ($task) use ($value) {
                    return Carbon::createFromFormat($this->global->date_format, $value)->startOfDay()->equalTo($task->created_at->startOfDay());
                })->count();

                if ($key > 0) {
                    $uncompletedTasks[$key] += $createdTasks[$key];
                }

            }

            $deadlineTasksCount[] = $this->project->tasks->filter(function ($task) use ($value) {
                return Carbon::createFromFormat($this->global->date_format, $value)->startOfDay()->equalTo($task->due_date->startOfDay());
            })->count();

            if ($key == 0) {
                $deadlineTasks[$key] = $this->totalTask - $deadlineTasksCount[$key];
            }
            else {
                $newKey = $key - 1;
                $deadlineTasks[$key] = $deadlineTasks[$newKey] - $deadlineTasksCount[$key];
            }
        }

        $this->uncompletedTasks = json_encode($uncompletedTasks);
        $this->deadlineTasks = json_encode($deadlineTasks);

        if ($request->ajax()) {
            return $this->data;
        }

        $this->startDate = $request->startDate ? Carbon::parse($request->startDate)->format($this->global->date_format) : Carbon::parse($this->project->start_date)->format($this->global->date_format);
        $this->endDate = $endDate->format($this->global->date_format);

        return view('projects.ajax.burndown', $this->data);
    }

    public function notes($projectAdmin = false)
    {
        $dataTable = new ProjectNotesDataTable();

        if (!$projectAdmin) {
            $viewPermission = user()->permission('view_project_note');
            abort_403(!in_array($viewPermission, ['all', 'added', 'owned', 'both']));
        }

        $tab = request('tab');
        ($tab == '') ? $this->activeTab = 'profile' : $this->activeTab = $tab;
        $this->view = 'projects.ajax.notes';
        return $dataTable->render('projects.show', $this->data);

    }

    public function burndownChart($project)
    {
        $viewPermission = user()->permission('view_project_burndown_chart');
        abort_403(!(in_array($viewPermission, ['all']) || $project->project_admin == user()->id));

        $tab = request('tab');
        ($tab == '') ? $this->activeTab = 'burndown-chart' : $this->activeTab = $tab;
        $this->view = 'projects.ajax.burndown';
        return view('projects.show', $this->data);

    }

    public function rating($projectAdmin)
    {

        if (!$projectAdmin) {
            $viewPermission = user()->permission('view_project_rating');
            abort_403(!in_array($viewPermission, ['all', 'added']));
        }

        $tab = request('tab');
        ($tab == '') ? $this->activeTab = 'rating' : $this->activeTab = $tab;
        $this->view = 'projects.ajax.rating';
        return view('projects.show', $this->data);

    }

    /**
     * XXXXXXXXXXX
     *
     * @return \Illuminate\Http\Response
     */
    public function archive(ArchiveProjectsDataTable $dataTable)
    {
        $viewPermission = user()->permission('view_projects');
        abort_403($viewPermission == 'none');

        if (!request()->ajax()) {

            if (in_array('client', user_roles())) {
                $this->clients = User::client();
            }
            else {
                $this->clients = User::allClients();
                $this->allEmployees = User::allEmployees();
            }

            $this->categories = ProjectCategory::all();
            $this->departments = Team::all();
        }

        return $dataTable->render('projects.archive', $this->data);

    }

    public function archiveRestore($id)
    {
        $project = Project::withTrashed()->findOrFail($id);
        $project->restore();

        return Reply::success(__('messages.projectRevertSuccessfully'));
    }

    public function importProject()
    {
        $this->pageTitle = __('app.importExcel') . ' ' . __('app.menu.projects');

        $this->addPermission = user()->permission('add_projects');
        abort_403(!in_array($this->addPermission, ['all', 'added']));


        if (request()->ajax()) {
            $html = view('projects.ajax.import', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'projects.ajax.import';

        return view('projects.create', $this->data);
    }

    public function importStore(ImportRequest $request)
    {
        $this->file = Files::upload($request->import_file, 'import-files', false, false, false);
        $excelData = Excel::toArray(new ProjectImport, public_path('user-uploads/import-files/' . $this->file))[0];
        $this->hasHeading = $request->has('heading');
        $this->heading = array();
        $this->fileHeading = array();

        $this->columns = ProjectImport::fields();
        $this->importMatchedColumns = array();
        $this->matchedColumns = array();

        if ($this->hasHeading) {
            $this->heading = (new HeadingRowImport)->toArray(public_path('user-uploads/import-files/' . $this->file))[0][0];

            // Excel Format None for get Heading Row Without Format and after change back to config
            HeadingRowFormatter::default('none');
            $this->fileHeading = (new HeadingRowImport)->toArray(public_path('user-uploads/import-files/' . $this->file))[0][0];
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

        $view = view('projects.ajax.import_progress', $this->data)->render();

        return Reply::successWithData(__('messages.importUploadSuccess'), ['view' => $view]);
    }

    public function importProcess(ImportProcessRequest $request)
    {
        // clear previous import
        Artisan::call('queue:clear database --queue=import_project');
        Artisan::call('queue:flush');
        // Get index of an array not null value with key
        $columns = array_filter($request->columns, function ($value) {
            return $value !== null;
        });

        $excelData = Excel::toArray(new ProjectImport, public_path('user-uploads/import-files/' . $request->file))[0];

        if ($request->has_heading) {
            array_shift($excelData);
        }

        $jobs = [];

        foreach ($excelData as $row) {

            $jobs[] = (new ImportProjectJob($row, $columns));
        }

        $batch = Bus::batch($jobs)->onConnection('database')->onQueue('import_project')->name('import_project')->dispatch();

        Files::deleteFile($request->file, 'import-files');

        return Reply::successWithData(__('messages.importProcessStart'), ['batch' => $batch]);
    }
    public function deliverables($id)
    {
      //dd($id);
    }
    public function download($id)
    {
        $this->project = Project::findOrFail($id);
      //  $viewPermission = user()->permission('view_project');
        $this->project = Project::with('client', 'client.clientDetails', 'files')->findOrFail($id);

        // abort_403(
        //     !(
        //         $viewPermission == 'all' ||
        //         ($viewPermission == 'added' && user()->id == $this->project->added_by) ||
        //         ($viewPermission == 'owned' && user()->id == $this->project->client_id) ||
        //         ($viewPermission == 'both' && (user()->id == $this->project->client_id || user()->id == $this->project->added_by))
        //     )
        // );
        $project_name= Project::where('id',$id)->first();

        $pdf = app('dompdf.wrapper');

        $this->global = $this->settings = global_setting();

        $this->invoiceSetting = invoice_setting();

        $pdf->getDomPDF()->set_option('enable_php', true);
        App::setLocale($this->invoiceSetting->locale);
        Carbon::setLocale($this->invoiceSetting->locale);
        $pdf->loadView('projects.project-pdf', $this->data);

        $dom_pdf = $pdf->getDomPDF();
        $canvas = $dom_pdf->getCanvas();
        $canvas->page_text(530, 820, 'Page {PAGE_NUM} of {PAGE_COUNT}', null, 10);
        $filename = str_slug($project_name->project_name) . '-agreement-' . $project_name->id;

        return $pdf->download($filename . '.pdf');
    }

    public function downloadView($id)
    {
        $this->project = Project::findOrFail($id);
        $pdf = app('dompdf.wrapper');

        $this->global = $this->settings = global_setting();

        $this->invoiceSetting = invoice_setting();

        $pdf->getDomPDF()->set_option('enable_php', true);
        App::setLocale($this->invoiceSetting->locale);
        Carbon::setLocale($this->invoiceSetting->locale);
        $pdf->loadView('projects.project-pdf', $this->data);

        $dom_pdf = $pdf->getDomPDF();
        $canvas = $dom_pdf->getCanvas();
        $canvas->page_text(530, 820, 'Page {PAGE_NUM} of {PAGE_COUNT}', null, 10);
        $filename = str_slug($project_name->project_name) . '-agreement-' . $project_name->id;

        return [
            'pdf' => $pdf,
            'fileName' => $filename,
        ];
    }
    public function sign(SignRequest $request, $id)
    {
        //dd($request,$id);
        $this->project = Project::with('signature')->findOrFail($id);

        if ($this->project && $this->project->signature) {
            return Reply::error(__('messages.alreadySigned'));
        }

        $sign = new ContractSign();
        $sign->full_name = $request->first_name . ' ' . $request->last_name;
        $sign->project_id = $this->project->id;
        $sign->email = $request->email;
        $imageName = null;

        if ($request->signature_type == 'signature') {
            $image = $request->signature; // your base64 encoded
            $image = str_replace('data:image/png;base64,', '', $image);
            $image = str_replace(' ', '+', $image);
            $imageName = str_random(32) . '.' . 'jpg';

            if (!File::exists(public_path(Files::UPLOAD_FOLDER . '/' . 'project/sign'))) {
                File::makeDirectory(public_path(Files::UPLOAD_FOLDER . '/project/sign'), 0775, true);
            }

            File::put(public_path() . '/' . Files::UPLOAD_FOLDER . '/project/sign/' . $imageName, base64_decode($image));
        } else {
            if ($request->hasFile('image')) {
                $imageName = Files::upload($request->image, 'project/sign', 300);
            }
        }

        $sign->signature = $imageName;
        $sign->save();

        event(new ProjectSignedEvent($this->project, $sign));

        return Reply::redirect(route('projects.show', $this->project->id));
    }
    public function projectDeliverable(Request $request)
    {
//        dd($request->all());
        $validate = $request->validate([
                'deliverable_type' => 'required',
                'milestone_id' => 'required',
                'title' => 'required',
                'estimation_time' => 'required',
                'quantity' => 'required',
                'delivery-type' => 'required',
                'from' => 'required',
                'to' => 'required',
            ]
        );
        if ($validate) {

      $deliverable= new ProjectDeliverable();
      if($request->deliverable_type == 'Others')
      {
      $deliverable->authorization = 0;
      }
      else{
        $deliverable->authorization = 1;

      }
      $deliverable->project_id= $request->project_id;
      $deliverable->title= $request->title;
      $deliverable->estimation_time=$request->estimation_time;
      $deliverable->deliverable_type= $request->deliverable_type;
      $deliverable->quantity= $request->quantity;
      $deliverable->from= $request->from;
      $deliverable->to= $request->to;
      $deliverable->milestone_id= $request->milestone_id;
      $deliverable->description= $request->description;
      $deliverable->save();
      $project_id= Project::where('id',$deliverable->project_id)->first();
      $project= Project::find($deliverable->project_id);
      $project->hours_allocated = $project_id->hours_allocated + $deliverable->estimation_time;
      $project->save();

      $log_user = Auth::user();

              $activity = new ProjectActivity();
              $activity->activity= $log_user->name .' added project deliverable : '.$deliverable->title;
            //   if($attribute == 'project_summary')
            //   {
            //       $activity->activity= $log_user->name .' updated project summary' ;
            //   }else
            //   {
            //       $activity->activity= $log_user->name .' updated '.$print.' from '.$originalValue.' to '. $updatedValue ;
            //   }

              $activity->project_id = $project->id;
              // $activity->attribute = $attribute;
              // $activity->old_value = $originalValue;
              // $activity->new_value = $updatedValue;
              // $activity->user_id = Auth::id();
              $activity->save();



      if($request->deliverable_type == 'Others')
      {
        $project_id= Project::where('id',$project->id)->first();

        $users= User::where('role_id',1)->get();
        foreach ($users as $user) {
            Notification::send($user, new DeliverableOthersAuthorizationNotification($project_id));
        }
      }


//      Toastr::success('Deliverable Added Successfully', 'Success', ["positionClass" => "toast-top-right"]);
//        return Redirect::back();
            return response()->json([
                'status'=>200,
            ]);
        }
    }
    public function updateDeliverable(Request $request)
    {
       $deliverable_id = ProjectDeliverable::where('id',$request->id)->first();
        $project_id= Project::where('id',$deliverable_id->project_id)->first();
        $project= Project::find($deliverable_id->project_id);
        $project->hours_allocated = $project_id->hours_allocated - $deliverable_id->estimation_time;
        $project->save();
      $deliverable= ProjectDeliverable::find($request->id);
      if($request->deliverable_type == 'Others')
      {
      $deliverable->authorization = 0;
      }
      else{
        $deliverable->authorization = 1;

      }


      $deliverable->title= $request->title;
      $deliverable->deliverable_type= $request->deliverable_type;
      $deliverable->quantity= $request->quantity;
      $deliverable->from= $request->from;
      $deliverable->to= $request->to;
      $deliverable->estimation_time=$request->estimation_time;
      $deliverable->milestone_id= $request->milestone_id;
      $deliverable->description= $request->description;
      $deliverable->save();
      $project_id_update= Project::where('id',$deliverable->project_id)->first();
      $project_update= Project::find($project_id_update->id);
      $project_update->deliverable_authorization = 0;
      $project_update->hours_allocated = $project_id_update->hours_allocated + $request->estimation_time;
      $project_update->save();

      $log_user = Auth::user();

      $activity = new ProjectActivity();
      $activity->activity= $log_user->name .' updated project deliverable : '.$deliverable->title;
    //   if($attribute == 'project_summary')
    //   {
    //       $activity->activity= $log_user->name .' updated project summary' ;
    //   }else
    //   {
    //       $activity->activity= $log_user->name .' updated '.$print.' from '.$originalValue.' to '. $updatedValue ;
    //   }

      $activity->project_id = $project_update->id;
      // $activity->attribute = $attribute;
      // $activity->old_value = $originalValue;
      // $activity->new_value = $updatedValue;
      // $activity->user_id = Auth::id();
      $activity->save();

      if($request->deliverable_type == 'Others')
      {
        $project_id= Project::where('id',$project_update->id)->first();

        $users= User::where('role_id',1)->get();
        foreach ($users as $user) {
            Notification::send($user, new DeliverableOthersAuthorizationNotification($project_id));
        }
      }


      Toastr::success('Deliverable Updated Successfully', 'Success', ["positionClass" => "toast-top-right"]);
        return Redirect::back();
    }
    public function deleteDeliverable($id)
    {
        $deliverable_id = ProjectDeliverable::where('id',$id)->first();
        $project= Project::find($deliverable_id->project_id);
        $project->hours_allocated= $project->hours_allocated - $deliverable_id->estimation_time;
        $project->save();




      $deliverable = ProjectDeliverable::findOrFail($id)->delete();
      $log_user = Auth::user();

      $activity = new ProjectActivity();
      $activity->activity= $log_user->name .' deleted project deliverable : '.$deliverable_id->title;

      $activity->project_id = $project->id;

      $activity->save();


      Toastr::success('Deliverable Deleted Successfully', 'Success', ["positionClass" => "toast-top-right"]);
        return Redirect::back();
    }
    public function approveDeliverable($id)
    {
        $deliverable_id = ProjectDeliverable::where('id',$id)->first();
        $project= ProjectDeliverable::find($deliverable_id->id);
        $project->authorization = 1;
        $project->save();
        $project_id= Project::where('id',$deliverable_id->project_id)->first();

        $user= User::where('id',$project_id->pm_id)->first();

            Notification::send($user, new DeliverableOthersAuthorizationAcceptNotification($project_id));


      Toastr::success('Approved Successfully', 'Success', ["positionClass" => "toast-top-right"]);
        return Redirect::back();
    }
    public function InComplete(Request $request)
    {
      $project= Project::find($request->id);
      $project->dispute_status = 1;
      $project->save();
      Toastr::success('Status Changed Successfully', 'Success', ["positionClass" => "toast-top-right"]);
        return Redirect::back();
    }
    public function qc($id,$milestone_id)
    {
        $this->project = Project::with('client', 'members', 'members.user', 'members.user.session', 'members.user.employeeDetail.designation', 'milestones', 'milestones.currency')
            ->withTrashed()
            ->findOrFail($id)
            ->withCustomFields();

        $memberIds = $this->project->members->pluck('user_id')->toArray();

        $this->editPermission = user()->permission('edit_projects');
        $this->editProjectMembersPermission = user()->permission('edit_project_members');

        abort_403(!(
            $this->editPermission == 'all'
            || ($this->editPermission == 'added' && user()->id == $this->project->added_by)
            || ($this->editPermission == 'owned' && user()->id == $this->project->client_id && in_array('client', user_roles()))
            || ($this->editPermission == 'owned' && in_array(user()->id, $memberIds) && in_array('employee', user_roles()))
            || ($this->editPermission == 'both' && (user()->id == $this->project->client_id || user()->id == $this->project->added_by))
            || ($this->editPermission == 'both' && in_array(user()->id, $memberIds) && in_array('employee', user_roles()))
        ));

        $this->pageTitle = __('Project') . ' ' . __('Q&C Form');

        if (!empty($this->project->getCustomFieldGroupsWithFields())) {
            $this->fields = $this->project->getCustomFieldGroupsWithFields()->fields;
        }

        $this->clients = User::allClients();
        $this->categories = ProjectCategory::all();
        $this->currencies = Currency::all();
        $this->teams = Team::all();
        $this->projectStatus = ProjectStatusSetting::where('status', 'active')->get();
        $this->milestone_id = $milestone_id;

        if ($this->editPermission == 'all' || $this->editProjectMembersPermission == 'all') {
            $this->employees = User::allEmployees(null, null, ($this->editPermission == 'all' ? 'all' : null));
        }
        else{
            $this->employees = '';
        }

        if (request()->ajax()) {
            $html = view('projects.ajax.q&c', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }


        abort_403(user()->permission('edit_projects') == 'added' && $this->project->added_by != user()->id);
        $this->view = 'projects.ajax.q&c';

        return view('projects.create', $this->data);

    }
    public function ProjectCompletion($id)
    {



        $this->editPermission = user()->permission('edit_projects');
        $this->editProjectMembersPermission = user()->permission('edit_project_members');



        $this->pageTitle = __('Project') . ' ' . __('Completion Form');


        $this->clients = User::allClients();
        $this->categories = ProjectNiche::all();
        $this->currencies = Currency::all();
        $this->teams = Team::all();
        $this->projectStatus = ProjectStatusSetting::where('status', 'active')->get();
        $this->milestone= ProjectMilestone::where('id',$id)->first();
        // /dd(  $this->milestone);

        if ($this->editPermission == 'all' || $this->editProjectMembersPermission == 'all') {
            $this->employees = User::allEmployees(null, null, ($this->editPermission == 'all' ? 'all' : null));
        }
        else{
            $this->employees = '';
        }

        if (request()->ajax()) {
            $html = view('projects.ajax.project-completion', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }


        abort_403(user()->permission('edit_projects') == 'added' && $this->milestone->added_by != user()->id);
        $this->view = 'projects.ajax.project-completion';

        return view('projects.create', $this->data);

    }
    public function ProjectCompletionSubmit(Request $request)
     {
       //dd($request);
      $validated = $request->validate([
          'qc_protocol' => 'required',

          'rating' => 'required',
          'comments'=> 'required',
          'comments2'=> 'required',
          'comments3'=> 'required',
          'requirements' => 'required',
          'price' => 'required',


          'notify' => 'required',

      ]);
      //dd($request);
      $milestone= new ProjectSubmission();
      $milestone->qc_protocol= $request->qc_protocol;
      $milestone->milestone_id= $request->milestone_id;

      $project= ProjectMilestone::where('id',$request->milestone_id)->first();
      $milestone->project_id= $project->project_id;

      $milestone->login_yes = $request->login_yes;
      $milestone->login_information = $request->login_information;
      $milestone->login_url= $request->login_url;
      $milestone->login= $request->login;
      $milestone->password= $request->password;
      $milestone->screenshot= $request->screenshot;
      $milestone->drive_yes = $request->drive_yes;
      $milestone->drive_information = $request->drive_information;
      $milestone->google_link= $request->google_link;
      $milestone->rating= $request->rating;
      $milestone->comments= $request->comments;
      $milestone->comments3= $request->comments3;
      $milestone->comments2= $request->comments2;
      $milestone->requirements= $request->requirements;
      $milestone->price= $request->price;
      $milestone->niche= $request->niche;
      $milestone->dummy_yes = $request->dummy_yes;
      $milestone->dummy_information = $request->dummy_information;
      $milestone->dummy_link= $request->dummy_link;
      $milestone->notify= $request-> notify;
      $milestone->actual_yes = $request->actual_yes;
      $milestone->actual_information = $request->actual_information;
      $milestone->actual_link= $request->actual_link;
      $milestone->status = 'pending';

      $milestone->save();
      $milestone_update= ProjectMilestone::where('id',$milestone->milestone_id)->first();
      $milestone_update->project_completion_status= 2;
      $milestone_update->save();
      //$user= User::where('id',$project->pm_id)->first();


      $users= User::where('role_id',1)->get();
      foreach ($users as $user) {

      Notification::send($user, new ProjectSubmissionNotification($milestone));
    }

      Toastr::success('Submitted Successfully', 'Success', ["positionClass" => "toast-top-right"]);

      return redirect('/account/projects/'.$milestone->project_id.'?tab=milestones');



    }
    public function Niche()
    {
        //dd($id);
        $categories = ProjectNiche::all();
        //dd($categories);
        return response()->json([
            'categories' => $categories,
        ]);
    }
    public function storeNiche(Request $request)
    {
        //  dd($request);
        $validator = Validator::make($request->all(), [
            'category_name' => 'required',


        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        } else {
            $category = new ProjectNiche();
            $category->category_name = $request->category_name;

            $category->save();
            return response()->json([
                'status' => 200,
                'message' => 'Category Added Successfully',
            ]);
        }
    }
    public function deleteNiche($id)
    {
    $milestone= ProjectNiche::find($id);
    $milestone->delete();
    return response()->json([
        'status' => 200,
        'message' => 'Category Deleted Successfully',
    ]);

    }
    public function ProjectAccept(Request $request)
    {
      // /dd($request);
      $project= Project::find($request->project_id);
      $project->status= 'in progress';
      $project->project_status= 'Accepted';
      $project->admin_comment= $request->admin_comment;
      $project->save();
      $user= User::where('id',$project->pm_id)->first();



         Notification::send($user, new ProjectReviewAcceptNotification($project));

      Toastr::success('Project Accepted Successfully', 'Success', ["positionClass" => "toast-top-right"]);
      return back();

    }
    public function ProjectDeny(Request $request)
    {
      //dd($request);
      $project= Project::find($request->project_id);
      $project->status= 'canceled';
      $project->project_status= 'Canceled';
      $project->admin_comment= $request->admin_comment;
      $project->save();
      $user= User::where('id',$project->pm_id)->first();



        Notification::send($user, new ProjectReviewAcceptNotification($project));
      Toastr::success('Project Canceled Successfully', 'Success', ["positionClass" => "toast-top-right"]);
      return back();
    }
    public function ProjectSubmissionAccept(Request $request)
    {
      $project= ProjectSubmission::find($request->id);
      $project->admin_comment= $request->admin_comment;
      if ($request->deny != null) {
      $project->status= 'revision';
    }else {
        $project->status= 'accepted';
    }
    $project->save();
    if ($request->deny != null) {
      $milestone= ProjectMilestone::where('id',$project->milestone_id)->first();
      $mile= ProjectMilestone::find($milestone->id);
      $mile->project_completion_status= 0;
      $mile->save();
    }else {
      $milestone= ProjectMilestone::where('id',$project->milestone_id)->first();
      $mile= ProjectMilestone::find($milestone->id);
      $mile->project_completion_status= 1;
      $mile->save();
    }
    $project_id= Project::where('id',$project->project_id)->first();

    $user= User::where('id',$project_id->pm_id)->first();



      Notification::send($user, new ProjectSubmissionAcceptNotification($project_id));

    Toastr::success('Project Submission Request Accepted Successfully', 'Success', ["positionClass" => "toast-top-right"]);
    return back();

    }
    public function ProjectSubmissionQC(Request $request)
    {
      $project = new QCSubmission();
      $project->milestone_id= $request->milestone_id;
      $milestone_id= ProjectMilestone::where('id',$request->milestone_id)->first();
      $project->project_id= $milestone_id->project_id;
      $project->favicon= $request->favicon;
      $project->webmail= $request->webmail;
      $project->site_https= $request->site_https;
      $project->contact_form= $request->contact_form;
      $project->social_media= $request->social_media;
      $project->login_link= $request->login_link;
      $project->scroll_down= $request->scroll_down;
      $project->lorem_text= $request->lorem_text;
      $project->logical_issues= $request->logical_issues;
      $project->loading_speed= $request->loading_speed;
      $project->migration= $request->migration;
      $project->mobile_speed= $request->mobile_speed;
      $project->links_working= $request->links_working;
      $project->backup_plugin= $request->backup_plugin;
      $project->uptime_monitoring= $request->uptime_monitoring;
      $project->final_backup= $request->final_backup;
      $project->slogan= $request->slogan;
      $project->agree= $request->agree;
      $project->step_1= $request->step_1;
      $project->status= 'pending';
      $project->save();
      $milestone= ProjectMilestone::where('id',$project->milestone_id)->first();
      $milestone_update= ProjectMilestone::find($milestone->id);
      $milestone_update->qc_status = 2;
      $milestone_update->save();
      $users= User::where('role_id',1)->get();
      foreach ($users as $user) {

      Notification::send($user, new QCSubmissionNotification($milestone));
    }

      Toastr::success('Submitted Successfully', 'Success', ["positionClass" => "toast-top-right"]);

      return redirect('/account/projects/'.$milestone->project_id.'?tab=milestones');



    }
    public function ProjectQcSubmissionAccept(Request $request)
    {
    //  dd($request);
      $project= QcSubmission::find($request->id);
      $project->admin_comment= $request->admin_comment;
      if ($request->deny != null) {
      $project->status= 'revision';
    }else {
        $project->status= 'accepted';
    }
    $project->save();
    if ($request->deny != null) {
      $milestone= ProjectMilestone::where('id',$project->milestone_id)->first();
      $mile= ProjectMilestone::find($milestone->id);
      $mile->qc_status= 3;
      $mile->save();
    }else {
      $milestone= ProjectMilestone::where('id',$project->milestone_id)->first();
      $mile= ProjectMilestone::find($milestone->id);
      $mile->qc_status= 1;
      $mile->save();
    }
    $project_id= Project::where('id',$project->project_id)->first();

    $user= User::where('id',$project_id->pm_id)->first();



      Notification::send($user, new QcSubmissionAcceptNotification($project_id));

    Toastr::success('Project Q&C Request Accepted Successfully', 'Success', ["positionClass" => "toast-top-right"]);
    return back();

    }

    public function DeliverableAuthorizationRequest(Request $request)
    {
        // //dd($request);
        // $comments = $request->comments;
        // $comments_without_br = str_replace('<br>', '', $comments);
        // $explanation = explode("<p></p>", $comments_without_br);
       //dd($explanation );
        $validated = $request->validate([
            'comments' => ['required','string','min:10'],


        ]);

        $project= PMProject::where('project_id',$request->project_id)->first();

        $pm_project= PMProject::find($project->id);
        $pm_project->reason= $request->comments;
        $pm_project->save();

        $project_id= Project::where('id',$request->project_id)->first();
        $log_user = Auth::user();

        $activity = new ProjectActivity();
        $activity->activity= $log_user->name .' send project deliverable time extention request ';

        $activity->project_id = $request->project_id;

        $activity->save();


        $users= User::where('role_id',1)->get();
        foreach ($users as $user) {
            Notification::send($user, new ProjectDeliverableTimeExtendNotification($project_id));
        }

        Toastr::success('Authorization request send Successfully', 'Success', ["positionClass" => "toast-top-right"]);
        return back();


    }
    public function DeliverableAuthorizationAccept(Request $request)
    {
        // //dd($request);
        // $comments = $request->comments;
        // $comments_without_br = str_replace('<br>', '', $comments);
        // $explanation = explode("<p></p>", $comments_without_br);
       //dd($explanation );


        $project= PMProject::where('project_id',$request->project_id)->first();

        $pm_project= PMProject::find($project->id);
        $pm_project->deliverable_status= 1;
        $pm_project->save();

        $project_id= Project::where('id',$request->project_id)->first();
        $log_user = Auth::user();

        $activity = new ProjectActivity();
        $activity->activity= 'Top management accepted project deliverable time extention request ';

        $activity->project_id = $request->project_id;

        $activity->save();

        $user= User::where('id',$project_id->pm_id)->get();

            Notification::send($user, new ProjectDeliverableTimeAcceptNotification($project_id));


        Toastr::success('Authorization request accepted Successfully', 'Success', ["positionClass" => "toast-top-right"]);
        return back();


    }
    public function DeliverableFinalAuthorizationSend($id)
    {
        //dd($id);

       // $project= Project::where('project_id',$request->project_id)->first();
       $project=Project::find($id);
       $project->authorization_status = 'submitted';
       $project->save();


        $project_id= Project::where('id',$id)->first();
        $log_user = Auth::user();

        $activity = new ProjectActivity();
        $activity->activity= $log_user->name .' send project deliverable for final authorization';

        $activity->project_id = $project_id->id;

        $activity->save();

        $users= User::where('role_id',1)->get();
        foreach ($users as $user) {
            Notification::send($user, new ProjectDeliverableFinalAuthorizationNotification($project_id));
        }

        Toastr::success('Authorization request send Successfully', 'Success', ["positionClass" => "toast-top-right"]);
        return back();


    }
    public function DeliverableFinalAuthorizationAccept(Request $request)
    {
        $project=Project::find($request->project_id);
        $project->authorization_status = 'approved';
        $project->deliverable_authorization= 1;
        $project->save();



         $project_id= Project::where('id',$request->project_id)->first();
         $log_user = Auth::user();

         $activity = new ProjectActivity();
         $activity->activity= 'Top management finally authorized project deliverable';

         $activity->project_id = $project_id->id;

         $activity->save();

         $user= User::where('id',$project->pm_id)->first();

             Notification::send($user, new ProjectDeliverableFinalAuthorizationNotificationAccept($project_id));


         Toastr::success('Authorization request accepted successfully', 'Success', ["positionClass" => "toast-top-right"]);
         return back();
    }





}
