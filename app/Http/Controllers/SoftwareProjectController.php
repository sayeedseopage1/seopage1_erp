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
            $chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            $random = substr(str_shuffle($chars), 0, 12);
        
                $project_update= SoftwareProject::find($project->id);
                $project_update->project_short_code = $random;
                $project_update->save();
               
           





            

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
        //$project->project_short_code = $request->project_code;

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
       
     dd($id);
      

    }
   

    
   

   




}
