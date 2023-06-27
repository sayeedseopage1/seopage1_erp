<?php

namespace App\Http\Controllers;

use App\Models\DealStage;
use App\Models\DealStageChange;
use App\Models\kpiSettingGenerateSale;
use App\Models\ProjectCms;
use App\Models\ProjectPortfolio;
use App\Models\ProjectWebsitePlugin;
use App\Models\ProjectWebsiteTheme;
use App\Models\ProjectWebsiteType;
use App\Models\QualifiedSale;
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
use App\DataTables\ProjectsDataTable;
use App\DataTables\TimeLogsDataTable;
use App\DataTables\DiscussionDataTable;
use Illuminate\Support\Facades\Artisan;
use Maatwebsite\Excel\HeadingRowImport;
use App\DataTables\ProjectNotesDataTable;
use App\Http\Requests\Project\StoreProject;
use App\DataTables\ArchiveProjectsDataTable;
use App\DataTables\ArchiveTasksDataTable;
use App\Http\Requests\Project\UpdateProject;
use Maatwebsite\Excel\Imports\HeadingRowFormatter;
use App\Http\Requests\Admin\Employee\ImportRequest;
use App\Http\Requests\Admin\Employee\ImportProcessRequest;
use App\Models\ProjectNote;
use App\Models\ProjectStatusSetting;
use App\Models\PMProject;
use App\Models\PMAssign;
use App\Models\Deal;
use App\Models\RoleUser;
use App\Models\DelivarableColumnEdit;
use App\Models\GoalSetting;
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
use App\Models\ProjectDeliverablesClientDisagree;
use App\Notifications\QCSubmissionNotification;
use App\Notifications\QcSubmissionAcceptNotification;
use App\Notifications\ProjectDeliverableTimeExtendNotification;
use App\Notifications\ProjectDeliverableTimeAcceptNotification;
use App\Notifications\DeliverableOthersAuthorizationNotification;
use App\Notifications\DeliverableOthersAuthorizationAcceptNotification;
use App\Notifications\ProjectDeliverableFinalAuthorizationNotification;
use App\Notifications\ProjectDeliverableFinalAuthorizationNotificationAccept;
use App\Notifications\ProjectDelivarableFinalAuthorizationClientNotification;
use App\Models\LeadsDealsActivityLog;
use App\Models\kpiSetting;
use App\Models\CashPoint;
use App\Models\Seopage1Team;
use App\Models\AuthorizationAction;

class ProjectController extends AccountBaseController
{
    use ProjectProgress;

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.projects';
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
    public function index(ProjectsDataTable $dataTable)
    {
        $viewPermission = user()->permission('view_projects');
        abort_403(!in_array($viewPermission, ['all', 'added', 'owned', 'both']));

        if (!request()->ajax()) {


            if (in_array('client', user_roles())) {
                $this->clients = User::client();
                //dd($this->clients);
            } else {
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




        return $dataTable->render('projects.index', $this->data);
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
        if ($request->ajax()) {
            if ($request->type_id == "budget") {

                $projects = Project::orderBy('project_budget', 'desc')->get();
            } else {
                $projects = Project::orderBy('completion_percent', 'desc')->get();
            }
            if ($request->status_id) {
                $projects = Project::where('status', $request->status_id)->get();
            }
        }
        //$projects= $qu->get();
        return Response::json(['projects' => $projects]);
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
        $this->addPermission = user()->permission('add_projects');
        abort_403(!in_array($this->addPermission, ['all', 'added']));

        $this->pageTitle = __('app.add') . ' ' . __('app.project');
        $this->clients = User::allClients();
        $this->categories = ProjectCategory::all();
        $this->templates = ProjectTemplate::all();
        $this->currencies = Currency::all();
        $this->teams = Team::all();
        $this->employees = User::allEmployees(null, true, ($this->addPermission == 'all' ? 'all' : null));
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
        } else {
            $this->client = isset(request()->default_client) ? User::find(request()->default_client) : null;
        }

        if (request()->ajax()) {
            $html = view('projects.ajax.create', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'projects.ajax.create';
        return view('projects.create', $this->data);
    }

    /**
     * @param StoreProject $request
     * @return array|mixed
     * @throws \Throwable
     */
    public function store(StoreProject $request)
    {
        $this->addPermission = user()->permission('add_projects');

        abort_403(!in_array($this->addPermission, ['all', 'added']));

        DB::beginTransaction();

        try {
            $this->addPermission = user()->permission('add_projects');

            $startDate = Carbon::createFromFormat($this->global->date_format, $request->start_date)->format('Y-m-d');
            $deadline = !$request->has('without_deadline') ? Carbon::createFromFormat($this->global->date_format, $request->deadline)->format('Y-m-d') : null;
            $project = new Project();
            $notes = new ProjectNote();
            $project->project_name = $request->project_name;
            $project->project_short_code = $request->project_code;

            $project->project_summary = ($request->project_summary !== '<p><br></p>') ? $request->project_summary : null;

            $project->start_date = $startDate;
            $project->deadline = $deadline;

            if ($request->notes != '') {
                $project->notes = str_replace('<p><br></p>', '', trim($request->notes));
                $notes->title = 'Note';
                $notes->details = $request->notes;
                $notes->client_id = $request->client_id;
            }

            if ($request->category_id != '') {
                $project->category_id = $request->category_id;
            }

            $project->client_id = $request->client_id;
            $request->client_view_task = $request->client_view_task ? 'enable' : 'disable';
            $project->allow_client_notification = ($request->client_view_task) && ($request->client_task_notification) ? 'enable' : 'disable';
            $request->manual_timelog = $request->manual_timelog ? 'enable' : 'disable';

            if ($request->team_id > 0) {
                $project->team_id = $request->team_id;
            }

            $project->project_budget = $request->project_budget;
            $project->currency_id = $request->currency_id != '' ? $request->currency_id : global_setting()->currency_id;
            $project->hours_allocated = $request->hours_allocated;

            $defualtStatus = ProjectStatusSetting::where('default_status', 1)->get();

            foreach ($defualtStatus as $defualt) {
                $project->status = $defualt->status_name;
            }

            if ($request->public) {
                $project->public = $request->public ? 1 : 0;
            }


            $project->save();
            $lead_developer_id = RoleUser::where('role_id', 6)->get();
            //dd($lead_developer_id);
            foreach ($lead_developer_id as $lead) {
                $lead_developer = new ProjectMember();
                $lead_developer->user_id = $lead->user_id;
                $lead_developer->project_id = $project->id;
                $lead_developer->lead_developer_id = $lead->user_id;
                $lead_developer->hourly_rate = 0;
                $lead_developer->save();
            }


            //seopage1 custom module
            $pm_count = PMAssign::select('project_count')->min('project_count');
            $pm_user = PMAssign::where('project_count', $pm_count)->first();
            if ($pm_count < 2) {
                if ($pm_user != null) {
                    $pmassign = new PMProject();
                    $pmassign->project_id = $project->id;
                    $pmassign->status = $project->status;
                    $pmassign->pm_id = $pm_user->pm_id;

                    $pmassign->save();
                    //  $pm_project= PMAssign::where('pm_id',$pm_id->pm_id)->first();
                    $pm_project_find = PMAssign::where('pm_id', $pm_user->pm_id)->first();
                    $pm_project_update = PMAssign::find($pm_project_find->id);
                    $pm_project_update->project_count = $pm_project_update->project_count + 1;
                    $pm_project_update->amount = $pm_project_update->amount + $project->project_budget;
                    $pm_project_update->save();
                }
            } else {
                $items = PMAssign::all();
                $pm_amount =  $items->min('amount');
                $pm_count_id =  $items->min('project_count');

                $pm_find_id = PMAssign::where('amount', $pm_amount)->first();
                $pm_min_pro = PMAssign::where('project_count',  $pm_count_id)->first();
                $find_rest = PMAssign::where('project_count', $pm_count_id)->get();

                $fin_min = $find_rest->min('amount');

                $final_id = PMAssign::where('amount', $fin_min)->first();

                //  $exceptional =   $pm_count= PMAssign::select('project_count')->where('')->get();

                if (($pm_find_id->project_count + 1) <= $pm_count_id * 1.5) {
                    $pmassign = new PMProject();
                    $pmassign->project_id = $project->id;
                    $pmassign->status = $project->status;

                    $pmassign->pm_id = $pm_find_id->pm_id;
                    $pmassign->save();
                    //  $pm_project= PMAssign::where('pm_id',$pm_id->pm_id)->first();
                    $pm_project_find = PMAssign::where('pm_id', $pm_find_id->pm_id)->first();
                    $pm_project_update = PMAssign::find($pm_project_find->id);
                    $pm_project_update->project_count = $pm_project_update->project_count + 1;
                    $pm_project_update->amount = $pm_project_update->amount + $project->project_budget;
                    $pm_project_update->save();
                } else {

                    $pmassign = new PMProject();
                    $pmassign->project_id = $project->id;
                    $pmassign->status = $project->status;

                    $pmassign->pm_id =  $final_id->pm_id;
                    $pmassign->save();
                    //  $pm_project= PMAssign::where('pm_id',$pm_id->pm_id)->first();
                    $pm_project_find = PMAssign::where('pm_id', $final_id->pm_id)->first();
                    $pm_project_update = PMAssign::find($pm_project_find->id);
                    $pm_project_update->project_count = $pm_project_update->project_count + 1;
                    $pm_project_update->amount = $pm_project_update->amount + $project->project_budget;
                    $pm_project_update->save();
                }
            }



            $project_id = $project->latest()->first();
            $notes->project_id = $project_id->id;
            $notes->save();


            $this->logSearchEntry($project->id, $project->project_name, 'projects.show', 'project');

            $this->logProjectActivity($project->id, 'messages.addedAsNewProject');

            if ($request->template_id) {
                $template = ProjectTemplate::with('membersMany')->findOrFail($request->template_id);

                foreach ($template->tasks as $task) {
                    $projectTask = new Task();

                    $projectTask->project_id = $project->id;
                    $projectTask->heading = $task->heading;
                    $projectTask->task_category_id = $task->project_template_task_category_id;
                    $projectTask->description = str_replace('<p><br></p>', '', trim($task->description));
                    $projectTask->start_date = $startDate;
                    $projectTask->due_date = $deadline;
                    $projectTask->is_private = 0;
                    $projectTask->save();

                    foreach ($task->usersMany as $value) {
                        TaskUser::create(
                            [
                                'user_id' => $value->id,
                                'task_id' => $projectTask->id
                            ]
                        );
                    }

                    foreach ($task->subtasks as $value) {
                        SubTask::create(
                            [
                                'title' => $value->title,
                                'task_id' => $projectTask->id
                            ]
                        );
                    }
                }
            }

            // To add custom fields data
            if ($request->get('custom_fields_data')) {
                $project->updateCustomFieldData($request->get('custom_fields_data'));
            }

            // Commit Transaction
            DB::commit();


            $redirectUrl = urldecode($request->redirect_url);

            if ($redirectUrl == '') {
                $redirectUrl = route('projects.index');
            }

            return Reply::dataOnly(['projectID' => $project->id, 'redirectUrl' => $redirectUrl]);
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
        $this->project = Project::with('client', 'members', 'members.user', 'members.user.session', 'members.user.employeeDetail.designation', 'milestones', 'milestones.currency')
            ->withTrashed()
            ->findOrFail($id)
            ->withCustomFields();

        $memberIds = $this->project->members->pluck('user_id')->toArray();

        $this->editPermission = user()->permission('edit_projects');
        $this->editProjectMembersPermission = user()->permission('edit_project_members');

        abort_403(!($this->editPermission == 'all'
            || ($this->editPermission == 'added' && user()->id == $this->project->added_by)
            || ($this->editPermission == 'owned' && user()->id == $this->project->client_id && in_array('client', user_roles()))
            || ($this->editPermission == 'owned' && in_array(user()->id, $memberIds) && in_array('employee', user_roles()))
            || ($this->editPermission == 'both' && (user()->id == $this->project->client_id || user()->id == $this->project->added_by))
            || ($this->editPermission == 'both' && in_array(user()->id, $memberIds) && in_array('employee', user_roles()))
        ));

        $this->pageTitle = __('app.update') . ' ' . __('app.project');

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
        } else {
            $this->employees = '';
        }

        if (request()->ajax()) {
            $html = view('projects.ajax.edit', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }


        abort_403(user()->permission('edit_projects') == 'added' && $this->project->added_by != user()->id);
        $this->view = 'projects.ajax.edit';

        return view('projects.create', $this->data);
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

        abort_403(!($this->editPermission == 'all'
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
        } else {
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

        $validator =  $request->validate([
            'client_username' => 'required',
            'project_value' => 'required|numeric|min:0',
            'description1' => 'required',
            'description2' => 'required',
            'description3' => 'required',
            'description4' => 'required',
            'description5' => 'required',
            'description6' => 'required',
            'description7' => 'required',
            'description8' => 'required',
            'description10' => 'required',
            'description11' => 'required',
            'description12' => 'required',
            'description13' => 'required',
            'description14' => 'required',
            'description15' => 'required',
            'description16' => 'required',
            'description17' => 'required',
            'pm_name' => 'required',
            'pm_email' => 'required|email',

        ], [
            'client_username.required' => 'This field is required!',
            'project_value.required' => 'This field is required!',
            'description1.required' => 'This field is required!',
            'description2.required' => 'This field is required!',
            'description3.required' => 'This field is required!',
            'description4.required' => 'This field is required!',
            'description5.required' => 'This field is required!',
            'description6.required' => 'This field is required!',
            'description7.required' => 'This field is required!',
            'description8.required' => 'This field is required!',
            'description10.required' => 'This field is required!',
            'description11.required' => 'This field is required!',
            'description12.required' => 'This field is required!',
            'description13.required' => 'This field is required!',
            'description14.required' => 'This field is required!',
            'description15.required' => 'This field is required!',
            'description16.required' => 'This field is required!',
            'description17.required' => 'This field is required!',
            'pm_name.required' => 'This field is required!',
            'pm_email.required' => 'This field is required!',
            'pm_email.email' => 'Please enter your current email for example(example@gmail.com)!',
        ]);

        $dispute = new ProjectDispute();
        $dispute->client_username = $request->client_username;
        $dispute->project_value = $request->project_value;
        $dispute->project_id = $request->project_id;
        $dispute->description1 = $request->description1;
        $dispute->description2 = $request->description2;
        $dispute->description3 = $request->description3;
        $dispute->description4 = $request->description4;
        $dispute->description5 = $request->description5;
        $dispute->description6 = $request->description6;
        $dispute->description7 = $request->description7;
        $dispute->description8 = $request->description8;
        $dispute->description9 = $request->description9;
        $dispute->description11 = $request->description11;
        $dispute->description10 = $request->description10;
        $dispute->description12 = $request->description12;
        $dispute->description13 = $request->description13;
        $dispute->description14 = $request->description14;
        $dispute->description15 = $request->description15;
        $dispute->description16 = $request->description16;
        $dispute->description17 = $request->description17;
        $dispute->pm_email = $request->pm_email;
        $dispute->pm_name = $request->pm_name;
        $dispute->pm_id = Auth::id();
        $dispute->save();
        $project = Project::find($dispute->project_id);
        $project->status = 'canceled';
        $project->save();
        $users = User::where('role_id', 1)->get();
        foreach ($users as $user) {


            Notification::send($user, new ProjectDisputeNotification($project));
        }

        //        Toastr::success('Submitted Successfully', 'Success', ["positionClass" => "toast-top-right"]);
        //  return Redirect::route('projects.index');
        //          return redirect('/account/projects/' .$dispute->project_id);
        return response()->json([
            'status' => 200,
            'redirectUrl' => url('/account/projects/' . $dispute->project_id)

        ]);
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

        abort_403(!($this->editPermission == 'all'
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
        $this->dispute = ProjectDispute::where('project_id', $id)->first();
        $this->projectStatus = ProjectStatusSetting::where('status', 'active')->get();

        if ($this->editPermission == 'all' || $this->editProjectMembersPermission == 'all') {
            $this->employees = User::allEmployees(null, null, ($this->editPermission == 'all' ? 'all' : null));
        } else {
            $this->employees = '';
        }

        if (request()->ajax()) {
            $html = view('projects.modals.final_dispute_view', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }


        abort_403(user()->permission('edit_projects') == 'added' && $this->project->added_by != user()->id);
        $this->view = 'projects.modals.final_dispute_view';

        return view('projects.create', $this->data);
    }


    /**
     * @param UpdateProject $request
     * @param int $id
     * @return array
     * @throws \Froiden\RestAPI\Exceptions\RelatedResourceNotFoundException
     */
    public function update(UpdateProject $request, $id)
    {
        //        dd($request->all());

        //kpi distribution start from here
        //DB::beginTransaction();
        $find_project_id = Project::where('id', $id)->first();
        $find_deal_id = Deal::where('id', $find_project_id->deal_id)->first();
        $dealStage = DealStage::where('short_code', $find_deal_id->deal_id)->first();
        if ($dealStage != null) {
            if ($find_project_id->status == 'not started') {

                $kpi = kpiSetting::where('kpi_status', '1')->first();


                $project_budget = ($find_deal_id->amount * $kpi->accepted_by_pm) / 100;

                if ($find_deal_id->lead_id != null) {
                    $lead = Lead::where('id', $find_deal_id->lead_id)->first();
                    $user_name = User::where('id', $lead->added_by)->first();
                    $cash_points = CashPoint::where('user_id', $lead->added_by)->orderBy('id', 'desc')->first();
                    $point = new CashPoint();
                    $point->user_id = $lead->added_by;
                    $point->project_id = $find_project_id->id;
                    $point->activity = '<a style="color:blue" href="' . route('employees.show', $user_name->id) . '">' . $user_name->name . '</a> created the bid Project : <a style="color:blue" href="' . route('projects.show', $find_project_id->id) . '">' . $find_project_id->project_name . '</a>, Client: <a style="color:blue" href="' . route('clients.show', $find_project_id->client_id) . '">' . $find_project_id->client_name->name . '</a> (Accpeted By PM(' . $kpi->accepted_by_pm . '%))';
                    $point->gained_as = "Individual";
                    $point->points = ($project_budget * $kpi->the_bidder) / 100;

                    if ($cash_points != null) {

                        $point->total_points_earn = $cash_points->total_points_earn + ($project_budget * $kpi->the_bidder) / 100;
                    } else {
                        $point->total_points_earn =  ($project_budget * $kpi->the_bidder) / 100;
                    }
                    $point->save();
                }
                $deal_qualified = DealStageChange::where('deal_id', $find_deal_id->deal_id)->where('deal_stage_id', 1)->first();


                $user_name = User::where('id', $deal_qualified->updated_by)->first();
                $cash_points_qualified = CashPoint::where('user_id', $user_name->id)->orderBy('id', 'desc')->first();
                $point = new CashPoint();
                $point->user_id = $deal_qualified->updated_by;
                $point->project_id = $find_project_id->id;
                $point->activity = '<a style="color:blue" href="' . route('employees.show', $user_name->id) . '">' . $user_name->name . '</a> made the deal qualify deal Project : <a style="color:blue" href="' . route('projects.show', $find_project_id->id) . '">' . $find_project_id->project_name . '</a>, Client: <a style="color:blue" href="' . route('clients.show', $find_project_id->client_id) . '">' . $find_project_id->client_name->name . '</a> (Accpeted By PM(' . $kpi->accepted_by_pm . '%))';
                $point->gained_as = "Individual";
                $point->points = ($project_budget * $kpi->qualify) / 100;

                if ($cash_points_qualified != null) {

                    $point->total_points_earn = $cash_points_qualified->total_points_earn + ($project_budget * $kpi->qualify) / 100;
                } else {
                    $point->total_points_earn =  ($project_budget * $kpi->qualify) / 100;

                }
                $point->save();




                $deal_short_code = DealStageChange::where('deal_id', $find_deal_id->deal_id)->where('deal_stage_id', 2)->first();

                $user_name = User::where('id', $deal_short_code->updated_by)->first();
                $cash_points_requirements_defined = CashPoint::where('user_id', $user_name->id)->orderBy('id', 'desc')->first();
                $point = new CashPoint();
                $point->user_id = $deal_short_code->updated_by;
                $point->project_id = $find_project_id->id;
                $point->activity = '<a style="color:blue" href="' . route('employees.show', $user_name->id) . '">' . $user_name->name . '</a> made the deal requirements defined Project : <a style="color:blue" href="' . route('projects.show', $find_project_id->id) . '">' . $find_project_id->project_name . '</a>, Client: <a style="color:blue" href="' . route('clients.show', $find_project_id->client_id) . '">' . $find_project_id->client_name->name . '</a> (Accpeted By PM(' . $kpi->accepted_by_pm . '%))';
                $point->gained_as = "Individual";
                $point->points = ($project_budget * $kpi->requirements_defined) / 100;

                if ($cash_points_requirements_defined != null) {

                    $point->total_points_earn = $cash_points_requirements_defined->total_points_earn + ($project_budget * $kpi->requirements_defined) / 100;
                } else {
                    $point->total_points_earn =  ($project_budget * $kpi->requirements_defined) / 100;

                }
                $point->save();





                $deal_proposal = DealStageChange::where('deal_id', $find_deal_id->deal_id)->where('deal_stage_id', 3)->first();
                $user_name = User::where('id', $deal_proposal->updated_by)->first();
                $cash_points_proposal_made = CashPoint::where('user_id', $user_name->id)->orderBy('id', 'desc')->first();
                $point = new CashPoint();
                $point->user_id = $deal_proposal->updated_by;
                $point->project_id = $find_project_id->id;
                $point->activity = '<a style="color:blue" href="' . route('employees.show', $user_name->id) . '">' . $user_name->name . '</a> created the proposal Project : <a style="color:blue" href="' . route('projects.show', $find_project_id->id) . '">' . $find_project_id->project_name . '</a>, Client: <a style="color:blue" href="' . route('clients.show', $find_project_id->client_id) . '">' . $find_project_id->client_name->name . '</a> (Accpeted By PM(' . $kpi->accepted_by_pm . '%))';
                $point->gained_as = "Individual";
                $point->points = ($project_budget * $kpi->proposal_made) / 100;

                if ($cash_points_proposal_made != null) {

                    $point->total_points_earn = $cash_points_proposal_made->total_points_earn + ($project_budget * $kpi->proposal_made) / 100;
                } else {
                    $point->total_points_earn =  ($project_budget * $kpi->proposal_made) / 100;

                }
                $point->save();




                $deal_negotiation_started = DealStageChange::where('deal_id', $find_deal_id->deal_id)->where('deal_stage_id', 4)->first();
                $user_name = User::where('id', $deal_negotiation_started->updated_by)->first();
                $cash_points_negotiation_started = CashPoint::where('user_id', $user_name->id)->orderBy('id', 'desc')->first();
                $point = new CashPoint();
                $point->user_id = $deal_negotiation_started->updated_by;
                $point->project_id = $find_project_id->id;
                $point->activity = '<a style="color:blue" href="' . route('employees.show', $user_name->id) . '">' . $user_name->name . '</a> started negotiation started Project : <a style="color:blue" href="' . route('projects.show', $find_project_id->id) . '">' . $find_project_id->project_name . '</a>, Client: <a style="color:blue" href="' . route('clients.show', $find_project_id->client_id) . '">' . $find_project_id->client_name->name . '</a> (Accpeted By PM(' . $kpi->accepted_by_pm . '%))';
                $point->gained_as = "Individual";
                $point->points = ($project_budget * $kpi->negotiation_started) / 100;

                if ($cash_points_negotiation_started != null) {

                    $point->total_points_earn = $cash_points_negotiation_started->total_points_earn + ($project_budget * $kpi->negotiation_started) / 100;
                } else {
                    $point->total_points_earn =  ($project_budget * $kpi->negotiation_started) / 100;

                }
                $point->save();




                $deal_milestone_breakdown = DealStageChange::where('deal_id', $find_deal_id->deal_id)->where('deal_stage_id', 5)->first();
                if ($deal_milestone_breakdown != null) {
                    $user_name = User::where('id', $deal_milestone_breakdown->updated_by)->first();

                    $cash_points_milestone_breakdown = CashPoint::where('user_id', $user_name->id)->orderBy('id', 'desc')->first();
                    $point = new CashPoint();
                    $point->user_id = $deal_milestone_breakdown->updated_by;
                    $point->project_id = $find_project_id->id;
                    $point->activity = '<a style="color:blue" href="' . route('employees.show', $user_name->id) . '">' . $user_name->name . '</a> created the milestone breakdown Project : <a style="color:blue" href="' . route('projects.show', $find_project_id->id) . '">' . $find_project_id->project_name . '</a>, Client: <a style="color:blue" href="' . route('clients.show', $find_project_id->client_id) . '">' . $find_project_id->client_name->name . '</a> (Accpeted By PM(' . $kpi->accepted_by_pm . '%))';
                    $point->gained_as = "Individual";
                    $point->points = ($project_budget * $kpi->milestone_breakdown) / 100;

                    if ($cash_points_milestone_breakdown != null) {

                        $point->total_points_earn = $cash_points_milestone_breakdown->total_points_earn + ($project_budget * $kpi->milestone_breakdown) / 100;
                    } else {
                        $point->total_points_earn =
                            ($project_budget * $kpi->milestone_breakdown) / 100;
                    }
                    $point->save();
                }

                $deal_id = Deal::where('id', $find_deal_id->id)->first();
                //dd($deal_id);
                $user_name = User::where('id', $deal_id->added_by)->first();

                $cash_points_close_deal = CashPoint::where('user_id', $user_name->id)->orderBy('id', 'desc')->first();
                $point = new CashPoint();
                $point->user_id = $deal_id->added_by;
                $point->project_id = $find_project_id->id;
                $point->activity = '<a style="color:blue" href="' . route('employees.show', $user_name->id) . '">' . $user_name->name . '</a> closed the deal Project : <a style="color:blue" href="' . route('projects.show', $find_project_id->id) . '">' . $find_project_id->project_name . '</a>, Client: <a style="color:blue" href="' . route('clients.show', $find_project_id->client_id) . '">' . $find_project_id->client_name->name . '</a> (Accpeted By PM(' . $kpi->accepted_by_pm . '%))';
                $point->gained_as = "Individual";
                $point->points = ($project_budget * $kpi->closed_deal) / 100;

                if ($cash_points_close_deal != null) {

                    $point->total_points_earn = $cash_points_close_deal->total_points_earn + ($project_budget * $kpi->closed_deal) / 100;
                } else {
                    $point->total_points_earn =
                        ($project_budget * $kpi->closed_deal) / 100;
                }
                $point->save();
                $deal_id_contact = Deal::where('id', $find_deal_id->id)->first();
                $user_name = User::where('id', $deal_id_contact->added_by)->first();

                $cash_points_contact = CashPoint::where('user_id', $user_name->id)->orderBy('id', 'desc')->first();
                $point = new CashPoint();
                $point->user_id = $deal_id_contact->added_by;
                $point->project_id = $find_project_id->id;
                $point->activity = '<a style="color:blue" href="' . route('employees.show', $user_name->id) . '">' . $user_name->name . '</a> submitted the contact form for the project manager Project : <a style="color:blue" href="' . route('projects.show', $find_project_id->id) . '">' . $find_project_id->project_name . '</a>, Client: <a style="color:blue" href="' . route('clients.show', $find_project_id->client_id) . '">' . $find_project_id->client_name->name . '</a> (Accpeted By PM(' . $kpi->accepted_by_pm . '%))';
                $point->gained_as = "Individual";
                $point->points = ($project_budget * $kpi->contact_form) / 100;

                if ($cash_points_contact != null) {

                    $point->total_points_earn = $cash_points_contact->total_points_earn + ($project_budget * $kpi->contact_form) / 100;
                } else {
                    $point->total_points_earn =
                        ($project_budget * $kpi->contact_form) / 100;

                }
                $point->save();
                if($find_deal_id->authorization_status == 1)
                {

                $team_lead= User::where('role_id',8)->first();
                $earned_point= ($project_budget*$kpi->authorized_by_leader)/100;
                $cash_points_team_lead= Cashpoint::where('user_id',$team_lead->id)->sum('points');
               // dd($cash_points_team_lead);
                $point= new CashPoint();
                $point->user_id= $team_lead->id;
                $point->project_id= $find_project_id->id;
                $point->activity= '<a style="color:blue" href="'.route('employees.show',$team_lead->id).'">'.$team_lead->name .
                    '</a> authorized the deal : <a style="color:blue" href="'.route('projects.show',$find_project_id->id).'">'
                    .$find_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$find_project_id->client_id).'">'.
                    $find_project_id->client_name->name;
        
                $point->gained_as = "Individual";
                $point->points= $earned_point;
                $point->type = 'Authorization Bonus';
        
                if ($cash_points_team_lead != null) {
                    $point->total_points_earn=$cash_points_team_lead+ $earned_point/100;
                } else {
                    $point->total_points_earn= $earned_point/100;
                }
        
                $point->save();
            }
          //  dd($point);
                // if ($find_deal_id->authorization_status == 1) {
                //     $earned_point = ($kpi->authorized_by_leader * $project_budget) / 100;

                //     $user_name= User::where('role_id',8)->first();
                //     $cash_points_team_lead= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                //     //kpi point
                //     $point= new CashPoint();
                //     $point->user_id= $user_name->id;
                //     $point->project_id= $find_project_id->id;
                //     $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> for authorizing deal Project : <a style="color:blue" href="'.route('projects.show',$find_project_id->id).'">'.$find_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$find_project_id->client_id).'">'. $find_project_id->client_name->name. '</a> (Accpeted By PM('.$kpi->accepted_by_pm.'%))';
                //     $point->gained_as = "Individual";
                //     $point->points= $earned_point;

                //     if ($cash_points_team_lead != null) {
                //         $point->total_points_earn=$cash_points_team_lead->total_points_earn+ $earned_point;
                //     } else {
                //         $point->total_points_earn= $earned_point;
                //     }

                //     $point->save();
                // }





                if ($find_deal_id->amount > $kpi->generate_single_deal) {


                    $bonus_point = $kpi->bonus_point;
                    if ($find_deal_id->lead_id != null) {
                        $lead = Lead::where('id', $find_deal_id->lead_id)->first();
                        $user_name = User::where('id', $lead->added_by)->first();
                        $cash_points = CashPoint::where('user_id', $lead->added_by)->orderBy('id', 'desc')->first();
                        $point = new CashPoint();
                        $point->user_id = $lead->added_by;
                        $point->project_id = $find_project_id->id;
                        $point->bonus_type = "Bonus";
                        $point->type = "Single Deal Bonus";
                        $point->activity = '<a style="color:blue" href="' . route('employees.show', $user_name->id) . '">' . $user_name->name . '</a> created the bid Project : <a style="color:blue" href="' . route('projects.show', $find_project_id->id) . '">' . $find_project_id->project_name . '</a>, Client: <a style="color:blue" href="' . route('clients.show', $find_project_id->client_id) . '">' . $find_project_id->client_name->name . '</a>(Higher Single Deal(' . $kpi->bonus_point . ' points))';
                        $point->gained_as = "Individual";
                        $point->points = $bonus_point * 24 / 100;

                        if ($cash_points != null) {

                            $point->total_points_earn = $cash_points->total_points_earn + $bonus_point * 24 / 100;
                        } else {
                            $point->total_points_earn =  $bonus_point * 24 / 100;

                        }
                        $point->save();
                        // dd($point);

                    }

                    $deal_qualified = DealStageChange::where('deal_id', $find_deal_id->deal_id)->where('deal_stage_id', 1)->first();


                    $user_name = User::where('id', $deal_qualified->updated_by)->first();
                    $cash_points_qualified = CashPoint::where('user_id', $user_name->id)->orderBy('id', 'desc')->first();
                    $point = new CashPoint();
                    $point->user_id = $deal_qualified->updated_by;
                    $point->project_id = $find_project_id->id;
                    $point->bonus_type = "Bonus";
                    $point->activity = '<a style="color:blue" href="' . route('employees.show', $user_name->id) . '">' . $user_name->name . '</a> made the deal qualify deal Project : <a style="color:blue" href="' . route('projects.show', $find_project_id->id) . '">' . $find_project_id->project_name . '</a>, Client: <a style="color:blue" href="' . route('clients.show', $find_project_id->client_id) . '">' . $find_project_id->client_name->name . '</a>(Higher Single Deal(' . $kpi->bonus_point . ' points))';
                    $point->gained_as = "Individual";
                    $point->type = "Single Deal Bonus";
                    $point->points = $bonus_point * 4 / 100;

                    if ($cash_points_qualified != null) {

                        $point->total_points_earn = $cash_points_qualified->total_points_earn + $bonus_point * 4 / 100;
                    } else {
                        $point->total_points_earn =  $bonus_point * 4 / 100;

                    }
                    $point->save();




                    $deal_short_code = DealStageChange::where('deal_id', $find_deal_id->deal_id)->where('deal_stage_id', 2)->first();

                    $user_name = User::where('id', $deal_short_code->updated_by)->first();
                    $cash_points_requirements_defined = CashPoint::where('user_id', $user_name->id)->orderBy('id', 'desc')->first();
                    $point = new CashPoint();
                    $point->user_id = $deal_short_code->updated_by;
                    $point->project_id = $find_project_id->id;
                    $point->bonus_type = "Bonus";
                    $point->activity = '<a style="color:blue" href="' . route('employees.show', $user_name->id) . '">' . $user_name->name . '</a> made the deal requirements defined Project : <a style="color:blue" href="' . route('projects.show', $find_project_id->id) . '">' . $find_project_id->project_name . '</a>, Client: <a style="color:blue" href="' . route('clients.show', $find_project_id->client_id) . '">' . $find_project_id->client_name->name . '</a>(Higher Single Deal(' . $kpi->bonus_point . ' points))';
                    $point->gained_as = "Individual";
                    $point->type = "Single Deal Bonus";
                    $point->points = $bonus_point * 17 / 100;

                    if ($cash_points_requirements_defined != null) {

                        $point->total_points_earn = $cash_points_requirements_defined->total_points_earn + $bonus_point * 17 / 100;
                    } else {
                        $point->total_points_earn = $bonus_point * 17 / 100;

                    }
                    $point->save();





                    $deal_proposal = DealStageChange::where('deal_id', $find_deal_id->deal_id)->where('deal_stage_id', 3)->first();
                    $user_name = User::where('id', $deal_proposal->updated_by)->first();
                    $cash_points_proposal_made = CashPoint::where('user_id', $user_name->id)->orderBy('id', 'desc')->first();
                    $point = new CashPoint();
                    $point->user_id = $deal_proposal->updated_by;
                    $point->project_id = $find_project_id->id;
                    $point->bonus_type = "Bonus";
                    $point->activity = '<a style="color:blue" href="' . route('employees.show', $user_name->id) . '">' . $user_name->name . '</a> created the proposal Project : <a style="color:blue" href="' . route('projects.show', $find_project_id->id) . '">' . $find_project_id->project_name . '</a>, Client: <a style="color:blue" href="' . route('clients.show', $find_project_id->client_id) . '">' . $find_project_id->client_name->name . '</a>(Higher Single Deal(' . $kpi->bonus_point . ' points))';
                    $point->gained_as = "Individual";
                    $point->type = "Single Deal Bonus";
                    $point->points = $bonus_point * 12 / 100;

                    if ($cash_points_proposal_made != null) {

                        $point->total_points_earn = $cash_points_proposal_made->total_points_earn + $bonus_point * 12 / 100;
                    } else {
                        $point->total_points_earn =  $bonus_point * 12 / 100;

                    }
                    $point->save();




                    $deal_negotiation_started = DealStageChange::where('deal_id', $find_deal_id->deal_id)->where('deal_stage_id', 4)->first();
                    $user_name = User::where('id', $deal_negotiation_started->updated_by)->first();
                    $cash_points_negotiation_started = CashPoint::where('user_id', $user_name->id)->orderBy('id', 'desc')->first();
                    $point = new CashPoint();
                    $point->user_id = $deal_negotiation_started->updated_by;
                    $point->project_id = $find_project_id->id;
                    $point->bonus_type = "Bonus";
                    $point->activity = '<a style="color:blue" href="' . route('employees.show', $user_name->id) . '">' . $user_name->name . '</a> started negotiation started Project : <a style="color:blue" href="' . route('projects.show', $find_project_id->id) . '">' . $find_project_id->project_name . '</a>, Client: <a style="color:blue" href="' . route('clients.show', $find_project_id->client_id) . '">' . $find_project_id->client_name->name . '</a>(Higher Single Deal(' . $kpi->bonus_point . ' points))';
                    $point->gained_as = "Individual";
                    $point->type = "Single Deal Bonus";
                    $point->points = $bonus_point * 12 / 100;

                    if ($cash_points_negotiation_started != null) {

                        $point->total_points_earn = $cash_points_negotiation_started->total_points_earn + $bonus_point * 12 / 100;
                    } else {
                        $point->total_points_earn =  $bonus_point * 12 / 100;

                    }
                    $point->save();



                    $deal_milestone_breakdown = DealStageChange::where('deal_id', $find_deal_id->deal_id)->where('deal_stage_id', 5)->first();

                    if ($deal_milestone_breakdown != null) {
                        $user_name = User::where('id', $deal_milestone_breakdown->updated_by)->first();
                        $cash_points_milestone_breakdown = CashPoint::where('user_id', $user_name->id)->orderBy('id', 'desc')->first();
                        $point = new CashPoint();
                        $point->user_id = $deal_milestone_breakdown->updated_by;
                        $point->project_id = $find_project_id->id;
                        $point->bonus_type = "Bonus";
                        $point->activity = '<a style="color:blue" href="' . route('employees.show', $user_name->id) . '">' . $user_name->name . '</a> created the milestone breakdown Project : <a style="color:blue" href="' . route('projects.show', $find_project_id->id) . '">' . $find_project_id->project_name . '</a>, Client: <a style="color:blue" href="' . route('clients.show', $find_project_id->client_id) . '">' . $find_project_id->client_name->name . '</a>(Higher Single Deal(' . $kpi->bonus_point . ' points))';
                        $point->gained_as = "Individual";
                        $point->type = "Single Deal Bonus";
                        $point->points = $bonus_point * 14 / 100;

                        if ($cash_points_milestone_breakdown != null) {

                            $point->total_points_earn = $cash_points_milestone_breakdown->total_points_earn + $bonus_point * 14 / 100;
                        } else {
                            $point->total_points_earn =
                                $bonus_point * 14 / 100;
                        }
                        $point->save();

                    }
                    $deal_id = Deal::where('id', $find_deal_id->id)->first();
                    //dd($deal_id);

                    $user_name = User::where('id', $deal_id->added_by)->first();

                    $cash_points_close_deal = CashPoint::where('user_id', $user_name->id)->orderBy('id', 'desc')->first();
                    $point = new CashPoint();
                    $point->user_id = $deal_id->added_by;
                    $point->project_id = $find_project_id->id;
                    $point->bonus_type = "Bonus";
                    $point->activity = '<a style="color:blue" href="' . route('employees.show', $user_name->id) . '">' . $user_name->name . '</a> closed the deal Project : <a style="color:blue" href="' . route('projects.show', $find_project_id->id) . '">' . $find_project_id->project_name . '</a>, Client: <a style="color:blue" href="' . route('clients.show', $find_project_id->client_id) . '">' . $find_project_id->client_name->name . '</a>(Higher Single Deal(' . $kpi->bonus_point . ' points))';
                    $point->gained_as = "Individual";
                    $point->type = "Single Deal Bonus";
                    $point->points = $bonus_point * 17 / 100;

                    if ($cash_points_close_deal != null) {

                        $point->total_points_earn = $cash_points_close_deal->total_points_earn + $bonus_point * 17 / 100;
                    } else {
                        $point->total_points_earn =
                            $bonus_point * 17 / 100;
                    }
                    $point->save();

                    $cash_points = CashPoint::where('type', 'Single Deal Bonus')
                        ->havingRaw('COUNT(user_id) > 1')
                        ->groupBy('user_id')
                        ->select('user_id', \DB::raw('SUM(points) as total_cash_points'))
                        ->get();
                    foreach ($cash_points as $total_points) {
                        $user_name = User::where('id', $total_points->user_id)->first();
                        $cash_points_user = CashPoint::where('user_id', $total_points->user_id)->orderBy('id', 'desc')->first();
                        $point = new CashPoint();
                        $point->project_id = $find_project_id->id;
                        $point->user_id = $total_points->user_id;
                        $point->bonus_type = "Bonus";
                        $point->activity = '<a style="color:blue" href="' . route('employees.show', $user_name->id) . '">' . $user_name->name . '</a> closed the deal Project : <a style="color:blue" href="' . route('projects.show', $find_project_id->id) . '">' . $find_project_id->project_name . '</a>, Client: <a style="color:blue" href="' . route('clients.show', $find_project_id->client_id) . '">' . $find_project_id->client_name->name . '</a>(Higher Single Deal(' . $kpi->bonus_point . ' points))';
                        $point->gained_as = "Individual";
                        $point->points = $total_points->total_cash_points;
                        if ($cash_points_user != null) {

                            $point->total_points_earn = $cash_points_user->total_points_earn + $total_points->total_cash_points;
                        } else {
                            $point->total_points_earn =
                                $total_points->total_cash_points;
                        }


                        // Set other fields as needed
                        $point->save();
                       
                        CashPoint::where('user_id', $total_points->user_id)->where('type', 'Single Deal Bonus')->delete();
                        $updated_total_points=  CashPoint::where('user_id', $total_points->user_id)->orderBy('id','desc')->first();
                        $total_points=  CashPoint::where('user_id', $total_points->user_id)->sum('points');
                       // dd($total_points,$point);
                        $point_update= CashPoint::find($updated_total_points->id);
                        $point_update->total_points_earn = $point->total_points_earn- $point->points;
                        $point_update->save();
                    }


                    // Delete previous duplicated entries for the user


                    // Create a new cash point entry with the sum of points


                }
                $currentMonth = Carbon::now()->month;
                //     // / dd($currentMonth);
                $monthly_deal = Deal::whereMonth('created_at', $currentMonth)->sum('amount');



                if ($monthly_deal > $kpi->after && $monthly_deal >= $monthly_deal + $kpi->additional_sales_amount) {

                    $project_budget_additional = $kpi->additional_sales_amount;

                    if ($find_deal_id->lead_id != null) {
                        $lead = Lead::where('id', $find_deal_id->lead_id)->first();
                        $user_name = User::where('id', $lead->added_by)->first();
                        $cash_points = CashPoint::where('user_id', $lead->added_by)->orderBy('id', 'desc')->first();
                        $point = new CashPoint();
                        $point->user_id = $lead->added_by;
                        $point->project_id = $find_project_id->id;
                        $point->bonus_type = "Bonus";
                        $point->activity = '<a style="color:blue" href="' . route('employees.show', $user_name->id) . '">' . $user_name->name . '</a> created the bid Project : <a style="color:blue" href="' . route('projects.show', $find_project_id->id) . '">' . $find_project_id->project_name . '</a>, Client: <a style="color:blue" href="' . route('clients.show', $find_project_id->client_id) . '">' . $find_project_id->client_name->name . '</a>Additional milestone reach ' . $kpi->after_reach_amount . '%';
                        $point->gained_as = "Individual";
                        $point->points = ($project_budget_additional * $kpi->the_bidder) / 100;

                        if ($cash_points != null) {

                            $point->total_points_earn = $cash_points->total_points_earn + ($project_budget_additional * $kpi->the_bidder) / 100;
                        } else {
                            $point->total_points_earn =  ($project_budget_additional * $kpi->the_bidder) / 100;

                        }
                        $point->save();
                        // dd($point);

                    }

                    $deal_qualified = DealStageChange::where('deal_id', $find_deal_id->deal_id)->where('deal_stage_id', 1)->first();


                    $user_name = User::where('id', $deal_qualified->updated_by)->first();
                    $cash_points_qualified = CashPoint::where('user_id', $user_name->id)->orderBy('id', 'desc')->first();
                    $point = new CashPoint();
                    $point->user_id = $deal_qualified->updated_by;
                    $point->project_id = $find_project_id->id;
                    $point->bonus_type = "Bonus";
                    $point->activity = '<a style="color:blue" href="' . route('employees.show', $user_name->id) . '">' . $user_name->name . '</a> made the deal qualify deal Project : <a style="color:blue" href="' . route('projects.show', $find_project_id->id) . '">' . $find_project_id->project_name . '</a>, Client: <a style="color:blue" href="' . route('clients.show', $find_project_id->client_id) . '">' . $find_project_id->client_name->name . '</a>Additional milestone reach ' . $kpi->after_reach_amount . '%';
                    $point->gained_as = "Individual";
                    $point->points = ($project_budget_additional * $kpi->qualify) / 100;

                    if ($cash_points_qualified != null) {

                        $point->total_points_earn = $cash_points_qualified->total_points_earn + ($project_budget_additional * $kpi->qualify) / 100;
                    } else {
                        $point->total_points_earn =  ($project_budget_additional * $kpi->qualify) / 100;

                    }
                    $point->save();




                    $deal_short_code = DealStageChange::where('deal_id', $find_deal_id->deal_id)->where('deal_stage_id', 2)->first();

                    $user_name = User::where('id', $deal_short_code->updated_by)->first();
                    $cash_points_requirements_defined = CashPoint::where('user_id', $user_name->id)->orderBy('id', 'desc')->first();
                    $point = new CashPoint();
                    $point->user_id = $deal_short_code->updated_by;
                    $point->project_id = $find_project_id->id;
                    $point->bonus_type = "Bonus";
                    $point->activity = '<a style="color:blue" href="' . route('employees.show', $user_name->id) . '">' . $user_name->name . '</a> made the deal requirements defined Project : <a style="color:blue" href="' . route('projects.show', $find_project_id->id) . '">' . $find_project_id->project_name . '</a>, Client: <a style="color:blue" href="' . route('clients.show', $find_project_id->client_id) . '">' . $find_project_id->client_name->name . '</a>Additional milestone reach ' . $kpi->after_reach_amount . '%';
                    $point->gained_as = "Individual";
                    $point->points = ($project_budget_additional * $kpi->requirements_defined) / 100;

                    if ($cash_points_requirements_defined != null) {

                        $point->total_points_earn = $cash_points_requirements_defined->total_points_earn + ($project_budget_additional * $kpi->requirements_defined) / 100;
                    } else {
                        $point->total_points_earn =  ($project_budget_additional * $kpi->requirements_defined) / 100;

                    }
                    $point->save();





                    $deal_proposal = DealStageChange::where('deal_id', $find_deal_id->deal_id)->where('deal_stage_id', 3)->first();
                    $user_name = User::where('id', $deal_proposal->updated_by)->first();
                    $cash_points_proposal_made = CashPoint::where('user_id', $user_name->id)->orderBy('id', 'desc')->first();
                    $point = new CashPoint();
                    $point->user_id = $deal_proposal->updated_by;
                    $point->project_id = $find_project_id->id;
                    $point->bonus_type = "Bonus";
                    $point->activity = '<a style="color:blue" href="' . route('employees.show', $user_name->id) . '">' . $user_name->name . '</a> created the proposal Project : <a style="color:blue" href="' . route('projects.show', $find_project_id->id) . '">' . $find_project_id->project_name . '</a>, Client: <a style="color:blue" href="' . route('clients.show', $find_project_id->client_id) . '">' . $find_project_id->client_name->name . '</a>Additional milestone reach ' . $kpi->after_reach_amount . '%';
                    $point->gained_as = "Individual";
                    $point->points = ($project_budget_additional * $kpi->proposal_made) / 100;

                    if ($cash_points_proposal_made != null) {

                        $point->total_points_earn = $cash_points_proposal_made->total_points_earn + ($project_budget_additional * $kpi->proposal_made) / 100;
                    } else {
                        $point->total_points_earn =  ($project_budget_additional * $kpi->proposal_made) / 100;

                    }
                    $point->save();




                    $deal_negotiation_started = DealStageChange::where('deal_id', $find_deal_id->deal_id)->where('deal_stage_id', 4)->first();
                    $user_name = User::where('id', $deal_negotiation_started->updated_by)->first();
                    $cash_points_negotiation_started = CashPoint::where('user_id', $user_name->id)->orderBy('id', 'desc')->first();
                    $point = new CashPoint();
                    $point->user_id = $deal_negotiation_started->updated_by;
                    $point->project_id = $find_project_id->id;
                    $point->activity = '<a style="color:blue" href="' . route('employees.show', $user_name->id) . '">' . $user_name->name . '</a> started negotiation started Project : <a style="color:blue" href="' . route('projects.show', $find_project_id->id) . '">' . $find_project_id->project_name . '</a>, Client: <a style="color:blue" href="' . route('clients.show', $find_project_id->client_id) . '">' . $find_project_id->client_name->name . '</a>Additional milestone reach ' . $kpi->after_reach_amount . '%';
                    $point->gained_as = "Individual";
                    $point->bonus_type = "Bonus";
                    $point->points = ($project_budget_additional * $kpi->negotiation_started) / 100;

                    if ($cash_points_negotiation_started != null) {

                        $point->total_points_earn = $cash_points_negotiation_started->total_points_earn + ($project_budget_additional * $kpi->negotiation_started) / 100;
                    } else {
                        $point->total_points_earn =  ($project_budget_additional * $kpi->negotiation_started) / 100;

                    }
                    $point->save();





                    $deal_milestone_breakdown = DealStageChange::where('deal_id', $find_deal_id->deal_id)->where('deal_stage_id', 5)->first();
                    if ($deal_milestone_breakdown != null) {
                        $user_name = User::where('id', $deal_milestone_breakdown->updated_by)->first();

                        $cash_points_milestone_breakdown = CashPoint::where('user_id', $user_name->id)->orderBy('id', 'desc')->first();
                        $point = new CashPoint();
                        $point->user_id = $deal_milestone_breakdown->updated_by;
                        $point->project_id = $find_project_id->id;
                        $point->activity = '<a style="color:blue" href="' . route('employees.show', $user_name->id) . '">' . $user_name->name . '</a> created the milestone breakdown Project : <a style="color:blue" href="' . route('projects.show', $find_project_id->id) . '">' . $find_project_id->project_name . '</a>, Client: <a style="color:blue" href="' . route('clients.show', $find_project_id->client_id) . '">' . $find_project_id->client_name->name . '</a>Additional milestone reach ' . $kpi->after_reach_amount . '%';
                        $point->gained_as = "Individual";
                        $point->bonus_type = "Bonus";
                        $point->points = ($project_budget_additional * $kpi->milestone_breakdown) / 100;

                        if ($cash_points_milestone_breakdown != null) {

                            $point->total_points_earn = $cash_points_milestone_breakdown->total_points_earn + ($project_budget_additional * $kpi->milestone_breakdown) / 100;
                        } else {
                            $point->total_points_earn =
                                ($project_budget_additional * $kpi->milestone_breakdown) / 100;
                        }
                        $point->save();
                    }

                    $deal_id = Deal::where('id', $find_deal_id->id)->first();
                    //dd($deal_id);
                    $user_name = User::where('id', $deal_id->added_by)->first();

                    $cash_points_close_deal = CashPoint::where('user_id', $user_name->id)->orderBy('id', 'desc')->first();
                    $point = new CashPoint();
                    $point->user_id = $deal_id->added_by;
                    $point->project_id = $find_project_id->id;
                    $point->activity = '<a style="color:blue" href="' . route('employees.show', $user_name->id) . '">' . $user_name->name . '</a> closed the deal Project : <a style="color:blue" href="' . route('projects.show', $find_project_id->id) . '">' . $find_project_id->project_name . '</a>, Client: <a style="color:blue" href="' . route('clients.show', $find_project_id->client_id) . '">' . $find_project_id->client_name->name . '</a>Additional milestone reach ' . $kpi->after_reach_amount . '%';
                    $point->gained_as = "Individual";
                    $point->bonus_type = "Bonus";
                    $point->points = ($project_budget_additional * $kpi->closed_deal) / 100;

                    if ($cash_points_close_deal != null) {

                        $point->total_points_earn = $cash_points_close_deal->total_points_earn + ($project_budget_additional * $kpi->closed_deal) / 100;
                    } else {
                        $point->total_points_earn =
                            ($project_budget_additional * $kpi->closed_deal) / 100;
                    }
                    $point->save();
                    $deal_id_contact = Deal::where('id', $find_deal_id->id)->first();
                    $user_name = User::where('id', $deal_id_contact->added_by)->first();

                    $cash_points_contact = CashPoint::where('user_id', $user_name->id)->orderBy('id', 'desc')->first();
                    $point = new CashPoint();
                    $point->user_id = $deal_id_contact->added_by;
                    $point->project_id = $find_project_id->id;
                    $point->bonus_type = "Bonus";
                    $point->activity = '<a style="color:blue" href="' . route('employees.show', $user_name->id) . '">' . $user_name->name . '</a> submitted the contact form for the project manager Project : <a style="color:blue" href="' . route('projects.show', $find_project_id->id) . '">' . $find_project_id->project_name . '</a>, Client: <a style="color:blue" href="' . route('clients.show', $find_project_id->client_id) . '">' . $find_project_id->client_name->name . '</a>Additional milestone reach ' . $kpi->after_reach_amount . '%';
                    $point->gained_as = "Individual";
                    $point->points = ($project_budget_additional * $kpi->contact_form) / 100;

                    if ($cash_points_contact != null) {

                        $point->total_points_earn = $cash_points_contact->total_points_earn + ($project_budget_additional * $kpi->contact_form) / 100;
                    } else {
                        $point->total_points_earn =
                            ($project_budget_additional * $kpi->contact_form) / 100;
                    }
                    $point->save();
                }

                //points for sales team lead 
                $kpi_settings = kpiSettingGenerateSale::where('kpi_id', $kpi->id)->where('bonus_status', 0)->get();
                // dd($kpi_settings);
                $user_name = User::where('role_id', 8)->first();
                $cash_points_team_lead = CashPoint::where('user_id', $user_name->id)->orderBy('id', 'desc')->first();
                foreach ($kpi_settings as $value) {
                    // /dd($value);
                    if ($monthly_deal >= $value->generate_sales_from  &&  $monthly_deal <= $value->generate_sales_to) {
                        $budget = $value->generate_sales_to - $value->generate_sales_from;

                        $point = new CashPoint();
                        $point->user_id = $user_name->id;
                        // / $point->project_id= $find_project_id->id;
                        $point->activity = '<a style="color:blue" href="' . route('employees.show', $user_name->id) . '">' . $user_name->name . '</a> for achieving monthly target from $' . $value->generate_sales_from . ' to $' . $value->generate_sales_to;
                        $point->gained_as = "Individual";
                        $point->points = ($budget * $value->generate_sales_amount) / 100;

                        if ($cash_points_team_lead != null) {

                            $point->total_points_earn = $cash_points_team_lead->total_points_earn + ($budget * $value->generate_sales_amount) / 100;
                        } else {
                            $point->total_points_earn =
                                ($budget * $value->generate_sales_amount) / 100;
                        }
                        // $point->created_at= $find_project_id->created_at;
                        $point->bonus_type = "Bonus";
                        $point->save();
                        $update_settings = kpiSettingGenerateSale::find($value->id);
                        $update_settings->bonus_status = 1;
                        $update_settings->save();
                    }
                }
                $last_value = kpiSettingGenerateSale::where('kpi_id', $kpi->id)->orderBy('id', 'desc')->first();
                $budget = $kpi->generate_sales_above - $last_value->generate_sales_from;
                if ($monthly_deal > $kpi->generate_sales_above) {
                    $user_name = User::where('role_id', 8)->first();
                    $cash_points_team_lead = CashPoint::where('user_id', $user_name->id)->orderBy('id', 'desc')->first();
                    $point = new CashPoint();
                    $point->user_id = $user_name->id;
                    // $point->project_id= $find_project_id->id;
                    $point->activity = '<a style="color:blue" href="' . route('employees.show', $user_name->id) . '">' . $user_name->name . '</a> for achieving monthly target above $' . $kpi->generate_sales_above;
                    $point->gained_as = "Individual";
                    $point->bonus_type = "Bonus";
                    $point->points = ($budget * $kpi->generate_sales_above_point) / 100;

                    if ($cash_points_team_lead != null) {

                        $point->total_points_earn = $cash_points_team_lead->total_points_earn + ($budget * $kpi->generate_sales_above_point) / 100;
                    } else {
                        $point->total_points_earn =
                            ($budget * $kpi->generate_sales_above_point) / 100;
                    }
                    // / $point->created_at= $find_project_id->created_at;
                    $point->save();
                    $update_kpi = kpiSetting::find($kpi->id);
                    $update_kpi->bonus_status = 1;
                    $update_kpi->save();
                }





                //points for sales team lead end

                //5% kpi setting start

                $goals = GoalSetting::where([
                    'goal_status' =>  0,
                ])->get();

                foreach($goals as $goal) {
                    $start = Carbon::parse($goal->startDate);
                    $end = Carbon::parse($goal->endDate);
                    $dateToCheck = Carbon::parse($find_deal_id->created_at);

                    if ($dateToCheck->between($start, $end)) {
                        if ($goal->entryType == 'Added') {
                            $user_id[] = $goal->user_id;
                        } elseif ($goal->entryType == 'Won') {
                            $team = Seopage1Team::find($goal->team_id);
                            $user_id = explode(',', rtrim($team->members, ','));
                        }
                        if (isset($goal->user_id) || isset($user_id)) {
                            $array = [];
                            if ($goal->dealType == 'All Clients' || $goal->dealType == 'Existing Client') {
                                $deals_data = Deal::select([
                                    'deals.*',
                                    'pm.id as pm_id',
                                    'pm.name as pm_name',

                                    DB::raw('COALESCE(leads.added_by, deals.added_by) as bidder')
                                ])
                                    ->leftJoin('leads', 'leads.id', 'deals.lead_id')
                                    ->join('users as pm', 'pm.id', '=', 'deals.pm_id')
                                    ->whereDate('deals.created_at', '>=', $goal->startDate);

                                if (!is_null($goal->endDate)) {
                                    $deals_data = $deals_data->whereDate('deals.created_at', '<=', $goal->endDate);
                                }
                                $deals_data = $deals_data->where('deals.status', '!=','Denied')
                                    // ->whereIn('deals.added_by', $user_id)
                                    ->orderBy('deals.id', 'desc')
                                    ->get();
                                $team_total_amount = 0;

                                foreach ($deals_data as $key => $value) {
                                    $check_client = Deal::whereDate('created_at', '>=', $goal->startDate);
                                    if (!is_null($goal->endDate)) {
                                        $check_client = $check_client->whereDate('created_at', '<=', $goal->endDate);
                                    }
                                    $check_client = $check_client->select('client_id')->groupBy('client_id')->get();

                                    if ($goal->trackingType == 'count') {
                                        $value->amount = 1;
                                        $value->tracking_type = 'count';
                                    }

                                    if ($value->project_type == 'hourly') {
                                        $project = Project::where('deal_id', $value->id)->first();
                                        if (!is_null($project)) {
                                            $payments = Payment::where([
                                                'project_id' => $project->id,
                                            ])->whereBetween(DB::raw('DATE(paid_on)'), [$goal->startDate, $goal->endDate])->get();

                                            if (count($payments) > 0 ) {
                                                $value->amount = $payments->sum('amount');
                                            } else {
                                                $value->amount = 0;
                                            }
                                        } else {
                                            $value->amount = 0;
                                        }
                                    }

                                    $value->deal_stage = DealStageChange::where('deal_id', $value->deal_id)->groupBy('deal_stage_id')->get();
                                    $value->bidder_amount = round((24 * $value->amount) / 100, 2);
                                    $value->team_total_amount = 0;


                                    foreach ($value->deal_stage as $key => $deal_stage) {
                                        $amount = 0;
                                        if ($deal_stage->deal_stage_id ==  1) {
                                            $value->qualified_by = $deal_stage->updated_by;
                                            $amount = round((4 * $value->amount) / 100, 2);
                                            $value->qualified_amount = $amount;
                                        } elseif ($deal_stage->deal_stage_id == 2) {
                                            $value->required_defined = $deal_stage->updated_by;
                                            $amount = round((17 * $value->amount) / 100, 2);
                                            $value->required_defined_amount = $amount;
                                        } elseif ($deal_stage->deal_stage_id == 3) {
                                            $value->proposal_made = $deal_stage->updated_by;
                                            $amount = round((12 * $value->amount) / 100, 2);
                                            $value->proposal_made_amount = $amount;
                                        } elseif ($deal_stage->deal_stage_id == 4) {
                                            $value->negotiation_started = $deal_stage->updated_by;
                                            $amount = round((12 * $value->amount) / 100, 2);
                                            $value->negotiation_started_amount = $amount;
                                        } elseif ($deal_stage->deal_stage_id == 5) {
                                            $value->milestone_breakdown = $deal_stage->updated_by;
                                            $amount = round((14 * $value->amount) / 100, 2);
                                            $value->milestone_breakdown_amount = $amount;
                                        }

                                        if (in_array($deal_stage->updated_by, $user_id)) {
                                            $team_total_amount = $team_total_amount + $amount;
                                            $value->team_total_amount = $team_total_amount;
                                        }
                                    }

                                    $value->won_deal_amount = round((17 * $value->amount) / 100, 2);
                                    $team_summation = DealStageChange::where('deal_id', $value->deal_id)->whereIn('updated_by', $user_id)->get();

                                    if (in_array($value->added_by, $user_id)) {
                                        //$team_total_amount = $team_total_amount + $amount;
                                        $value->team_total_amount = round($value->team_total_amount + $value->won_deal_amount, 2);
                                    }

                                    if (in_array($value->bidder, $user_id)) {
                                        //$team_total_amount = $team_total_amount + $amount;
                                        $value->team_total_amount = round($value->team_total_amount + $value->bidder_amount, 2);
                                    }

                                    $array[] = $value;
                                }
                                if($goal->team_id == 1) {
                                    if (is_null($goal->endDate)) {
                                        $end_date = Carbon::parse($goal->startDate);
                                        if ($goal->frequency == 'Monthly') {
                                            $end_date = $end_date->addMonths()->format('Y-m-d');
                                        } elseif ($goal->frequency == 'Quarterly') {
                                            $end_date = $end_date->addMonths(3)->format('Y-m-d');
                                        } elseif ($goal->frequency == 'Yearly') {
                                            $end_date = $end_date->addMonths(12)->format('Y-m-d');
                                        } else {
                                            $end_date = $end_date->addDays(10)->format('Y-m-d');
                                        }
                                    } else {
                                        $end_date = $goal->endDate;
                                    }

                                    if($goal->trackingType == 'value') {
                                        $team_total_amount = Deal::where('status','!=','Denied')->where('client_badge','new client')
                                            ->whereDate('start_date', '>=', $goal->startDate)
                                            ->whereDate('start_date', '<=', $end_date)
                                            ->sum('amount');
                                    } else {
                                        $team_total_amount = Deal::where('status','!=','Denied')->where('client_badge','new client')
                                            ->whereDate('start_date', '>=', $goal->startDate)
                                            ->whereDate('start_date', '<=', $end_date)
                                            ->count();
                                    }
                                }
                                if ($team_total_amount >= (int) $goal->trackingValue) {
                                    $goal->goal_status = 1;
                                    $goal->save();

                                    if ($goal->achievablePoints > 0) {

                                        $distribute_amount = $goal->achievablePoints / count($user_id);

                                        foreach ($user_id as $value) {

                                            $user_name = User::find($value);
                                            $user_last_point = CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();

                                            $point= new CashPoint();
                                            $point->user_id= $value;
                                            $point->project_id= $find_project_id->id;
                                            $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> For achieving '.$goal->frequency.' Goal '.$goal->title;
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

                            } elseif ($goal->dealType == 'New Client') {
                                $deals_data = Deal::select([
                                    'deals.*',
                                    'pm.id as pm_id',
                                    'pm.name as pm_name',

                                    DB::raw('COALESCE(leads.added_by, deals.added_by) as bidder')
                                ])
                                    ->leftjoin('leads', 'leads.id', 'deals.lead_id')
                                    ->join('users as pm', 'pm.id', '=', 'deals.pm_id')
                                    ->whereDate('deals.created_at', '>=', $goal->startDate)
                                    ->where('deals.client_badge','=','new client');
                                ;

                                if (!is_null($goal->endDate)) {
                                    $deals_data = $deals_data->whereDate('deals.created_at', '<=', $goal->endDate);
                                }
                                $deals_data = $deals_data->where('deals.status', '!=','Denied')
                                    // ->whereIn('deals.added_by', $user_id)

                                    ->orderBy('deals.id', 'desc')
                                    ->get();
                                $team_total_amount = 0;

                                foreach ($deals_data as $key => $value) {
                                    if ($goal->trackingType == 'count') {
                                        $value->amount = 1;
                                        $value->tracking_type = 'count';
                                    }

                                    if ($value->project_type == 'hourly') {
                                        $project = Project::where('deal_id', $value->id)->first();
                                        if (!is_null($project)) {
                                            $payments = Payment::where([
                                                'project_id' => $project->id,
                                            ])->whereBetween(DB::raw('DATE(paid_on)'), [$goal->startDate, $goal->endDate])->get();

                                            if (count($payments) > 0 ) {
                                                $value->amount = $payments->sum('amount');
                                            } else {
                                                $value->amount = 0;
                                            }
                                        } else {
                                            $value->amount = 0;
                                        }
                                    }

                                    $value->deal_stage = DealStageChange::where('deal_id', $value->deal_id)->groupBy('deal_stage_id')->get();
                                    $value->bidder_amount = round((24 * $value->amount) / 100, 2);
                                    $value->team_total_amount = 0;


                                    foreach ($value->deal_stage as $key => $deal_stage) {
                                        $amount = 0;
                                        if ($deal_stage->deal_stage_id ==  1) {
                                            $value->qualified_by = $deal_stage->updated_by;
                                            $amount = round((4 * $value->amount) / 100, 2);
                                            $value->qualified_amount = $amount;
                                        } elseif ($deal_stage->deal_stage_id == 2) {
                                            $value->required_defined = $deal_stage->updated_by;
                                            $amount = round((17 * $value->amount) / 100, 2);
                                            $value->required_defined_amount = $amount;
                                        } elseif ($deal_stage->deal_stage_id == 3) {
                                            $value->proposal_made = $deal_stage->updated_by;
                                            $amount = round((12 * $value->amount) / 100, 2);
                                            $value->proposal_made_amount = $amount;
                                        } elseif ($deal_stage->deal_stage_id == 4) {
                                            $value->negotiation_started = $deal_stage->updated_by;
                                            $amount = round((12 * $value->amount) / 100, 2);
                                            $value->negotiation_started_amount = $amount;
                                        } elseif ($deal_stage->deal_stage_id == 5) {
                                            $value->milestone_breakdown = $deal_stage->updated_by;
                                            $amount = round((14 * $value->amount) / 100, 2);
                                            $value->milestone_breakdown_amount = $amount;
                                        }

                                        if (in_array($deal_stage->updated_by, $user_id)) {
                                            $team_total_amount = $team_total_amount + $amount;
                                            $value->team_total_amount = $team_total_amount;
                                        }
                                    }

                                    $value->won_deal_amount = round((17 * $value->amount) / 100, 2);
                                    $team_summation = DealStageChange::where('deal_id', $value->deal_id)->whereIn('updated_by', $user_id)->get();

                                    if (in_array($value->added_by, $user_id)) {
                                        $value->team_total_amount = round($value->team_total_amount + $value->won_deal_amount, 2);
                                    }

                                    if (in_array($value->bidder, $user_id)) {
                                        $value->team_total_amount = round($value->team_total_amount + $value->bidder_amount, 2);
                                    }

                                    $array[] = $value;



                                }
                                if($goal->team_id == 1) {
                                    if (is_null($goal->endDate)) {
                                        $end_date = Carbon::parse($goal->startDate);
                                        if ($goal->frequency == 'Monthly') {
                                            $end_date = $end_date->addMonths()->format('Y-m-d');
                                        } elseif ($goal->frequency == 'Quarterly') {
                                            $end_date = $end_date->addMonths(3)->format('Y-m-d');
                                        } elseif ($goal->frequency == 'Yearly') {
                                            $end_date = $end_date->addMonths(12)->format('Y-m-d');
                                        } else {
                                            $end_date = $end_date->addDays(10)->format('Y-m-d');
                                        }
                                    } else {
                                        $end_date = $goal->endDate;
                                    }

                                    if($goal->trackingType == 'value') {
                                        $team_total_amount = Deal::where('status','!=','Denied')->where('client_badge','new client')
                                            ->whereDate('start_date', '>=', $goal->startDate)
                                            ->whereDate('start_date', '<=', $end_date)
                                            ->sum('amount');
                                    } else {
                                        $team_total_amount = Deal::where('status','!=','Denied')->where('client_badge','new client')
                                            ->whereDate('start_date', '>=', $goal->startDate)
                                            ->whereDate('start_date', '<=', $end_date)
                                            ->count();
                                    }
                                }
                                if ($team_total_amount >= (int) $goal->trackingValue) {
                                    $goal->goal_status = 1;
                                    $goal->save();

                                    if ($goal->achievablePoints > 0) {

                                        $distribute_amount = $goal->achievablePoints / count($user_id);

                                        foreach ($user_id as $value) {

                                            $user_name = User::find($value);
                                            $user_last_point = CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();

                                            $point= new CashPoint();
                                            $point->user_id= $value;
                                            $point->project_id= $find_project_id->id;
                                            $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> For achieving '.$goal->frequency.' Goal '.$goal->title;
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


                //5% kpi setting end
            }

        }
         //dd($find_project_id);



        //kpi distribution ends here
        $project = Project::findOrFail($id);
        $originalValues = $project->getOriginal();
        $project->project_name = $request->project_name;
        $project->project_short_code = $request->project_code;
        if ($project->status == 'not started') {
            $project->requirement_defined = $request->requirement_defined;
            $project->deadline_meet = $request->deadline_meet;
            $qualified_sale_id = QualifiedSale::where('project_id', $project->id)->first();
            if ($qualified_sale_id != null) {
                $qualified_sale = QualifiedSale::find($qualified_sale_id->id);
                $qualified_sale->accepted_by_project_manager = 1;
                $qualified_sale->project_manager_needs_define = $request->requirement_defined;
                $qualified_sale->project_manager_deadline_comment = $request->deadline_meet;
                $total_points = CashPoint::where('project_id', $project->id)->sum('points');
                $qualified_sale->total_points = $total_points;
                $qualified_sale->save();
            }
            // $project->project_challenge = ($request->project_challenge !== '<p><br></p>') ? $request->project_challenge : null;
            // if ($request->project_challenge != 'No Challenge') {

            //     $project->status = 'under review';
            //     $admin = User::where('role_id', 1)->get();
            //     foreach ($admin  as $user) {

            //         Notification::send($user, new ProjectReviewNotification($project));
            //     }
            // }
            $users = User::where('role_id', 1)->get();

           
        }


        $project->project_summary = ($request->project_summary !== '<p><br></p>') ? $request->project_summary : null;


        $project->start_date = Carbon::createFromFormat($this->global->date_format, $request->start_date)->format('Y-m-d');
        if ($project->deal->project_type != 'hourly') {
            if (!$request->has('without_deadline')) {
                $project->deadline = Carbon::createFromFormat($this->global->date_format, $request->deadline)->format('Y-m-d');
            } else {
                $project->deadline = null;
            }
        }

        if ($request->notes != '') {
            $project->notes = str_replace('<p><br></p>', '', trim($request->notes));
        }

        if ($request->category_id != '') {
            $project->category_id = $request->category_id;
        }

        if ($request->client_view_task) {
            $project->client_view_task = 'enable';
        } else {
            $project->client_view_task = 'disable';
        }

        if (($request->client_view_task) && ($request->client_task_notification)) {
            $project->allow_client_notification = 'enable';
        } else {
            $project->allow_client_notification = 'disable';
        }

        if ($request->manual_timelog) {
            $project->manual_timelog = 'enable';
        } else {
            $project->manual_timelog = 'disable';
        }

        $project->team_id = null;

        if ($request->team_id > 0) {
            $project->team_id = $request->team_id;
        }

        $project->client_id = ($request->client_id == 'null' || $request->client_id == '') ? null : $request->client_id;

        if ($request->calculate_task_progress) {
            $project->calculate_task_progress = 'true';
            $project->completion_percent = $this->calculateProjectProgress($id);
        } else {
            $project->calculate_task_progress = 'false';
            $project->completion_percent = $request->completion_percent;
        }
        //  dd($project);
        $deal = Deal::where('id', $project->deal_id)->first();

        $currency = Currency::where('id', $deal->original_currency_id)->first();
        //dd($currency);
        $project->project_budget = $deal->amount;

        $project->currency_id = 1;

        //$project->hours_allocated = 0;
        $project->status = 'in progress';
        $project->project_status = 'Accepted';
        //$project->added_by= Auth::id();
        $project->last_updated_by = Auth::id();
        //$project_admin= User::where('role_id',6)->first();
        $project->project_admin = $project->pm_id;

        if ($request->public) {
            $project->public = 1;
        }

        if ($request->private) {
            $project->public = 0;
        }


        if (!$request->private && !$request->public && $request->member_id) {
            $project->membersMany()->sync($request->member_id);
        }


        $project->comments = $request->comments;
        $project->save();
        if ($request->project_challenge != 'No Challenge') {
            $project_update = Project::find($request->project_id);
             $project->status = 'under review';
            $project_update->save();
 
             $authorization_action = new AuthorizationAction();
             $authorization_action->model_name = $project->getMorphClass();
             $authorization_action->model_id = $project->id;
             $authorization_action->type = 'project_challenge';
             $authorization_action->deal_id = $project_update->deal_id;
             $authorization_action->project_id = $project_update->id;
             $authorization_action->link = route('projects.show', $project_update->id);
             $authorization_action->title = 'Project Challenge Authorization';
             $authorization_action->authorization_for = 62;
             $authorization_action->save();
 
             foreach ($users as $user) {
                 Notification::send($user, new ProjectReviewNotification($project));
             }
         }


        // $this->logProjectActivity($project->id, 'Project accepted by ');
       

        if ($project->project_status != 'Accepted') {
            foreach ($users as $user) {
                $this->triggerPusher('notification-channel', 'notification', [
                    'user_id' => $user->id,
                    'role_id' => 1,
                    'title' => 'Project Accepted',
                    'body' => 'Project Manager accept this project',
                    'redirectUrl' => route('projects.show', $project->id)
                ]);
            }
        } else {
            //authorizatoin action start here
            // $authorization_action = new AuthorizationAction();
            // $authorization_action->model_name = $project->getMorphClass();
            // $authorization_action->model_id = $project->id;
            // $authorization_action->type = 'project_challenge';
            // $authorization_action->deal_id = $project->deal_id;
            // $authorization_action->project_id = $project->id;
            // $authorization_action->link = route('projects.show', $project->id);
            // $authorization_action->title = 'Project Challenge Authorization';
            // $authorization_action->authorization_for = 1;
            // $authorization_action->save();
            //end authorization action here

            foreach ($users as $user) {
                $this->triggerPusher('notification-channel', 'notification', [
                    'user_id' => $user->id,
                    'role_id' => 1,
                    'title' => 'Project Accepted',
                    'body' => 'Project Manager update this project',
                    'redirectUrl' => route('projects.show', $project->id)
                ]);
            }
        }

        $project_manager = new ProjectMember();
        $project_manager->user_id = Auth::id();
        $project_manager->project_id = $project->id;

        $project_manager->hourly_rate = 0;
        $project_manager->save();

        $lead_developer_id = RoleUser::where('role_id', 6)->get();
        //dd($lead_developer_id);
        foreach ($lead_developer_id as $lead) {
            $lead_developer = new ProjectMember();
            $lead_developer->user_id = $lead->user_id;
            $lead_developer->project_id = $project->id;
            $lead_developer->lead_developer_id = $lead->user_id;
            $lead_developer->hourly_rate = 0;
            $lead_developer->save();
        }

        //$deal_id = PMProject::where('project_id',$project->deal_id)->first();
        //dd($deal_id);
        $deal = Deal::find($project->deal_id);
        $deal->status = 'Accepted';
        $deal->save();

        $pmproject = PMProject::where('project_id', $project->id)->first();
        $pmproject->status = 'Accepted';
        $pmproject->save();

        if ($request->graphics_design != null) {
            $deliverable = new ProjectDeliverable();
            $deliverable->project_id = $project->id;
            $deliverable->deliverable_type = $request->graphics_design;
            $deliverable->title = $request->graphics_title;
            $deliverable->quantity = $request->graphics_quantity;
            $deliverable->from = $request->graphics_from;
            $deliverable->to = $request->graphics_to;
            $deliverable->description = $request->graphics_deliverable_description;
            $deliverable->save();
        }
        if ($request->ux_design != null) {
            $deliverable = new ProjectDeliverable();
            $deliverable->project_id = $project->id;
            $deliverable->deliverable_type = $request->ux_design;
            $deliverable->title = $request->ux_title;
            $deliverable->quantity = $request->ux_quantity;
            $deliverable->from = $request->ux_from;
            $deliverable->to = $request->ux_to;
            $deliverable->description = $request->ux_deliverable_description;
            $deliverable->save();
        }
        if ($request->main_page_development != null) {
            $deliverable = new ProjectDeliverable();
            $deliverable->project_id = $project->id;
            $deliverable->title = $request->main_title;
            $deliverable->deliverable_type = $request->main_page_development;
            $deliverable->quantity = $request->main_quantity;
            $deliverable->from = $request->main_from;
            $deliverable->to = $request->main_to;
            $deliverable->description = $request->main_deliverable_description;
            $deliverable->save();
        }
        if ($request->secondary_page_development != null) {
            $deliverable = new ProjectDeliverable();
            $deliverable->project_id = $project->id;
            $deliverable->deliverable_type = $request->secondary_page_development;
            $deliverable->title = $request->secondary_title;
            $deliverable->quantity = $request->secondary_quantity;
            $deliverable->from = $request->secondary_from;
            $deliverable->to = $request->secondary_to;
            $deliverable->description = $request->secondary_deliverable_description;
            $deliverable->save();
        }
        if ($request->content_creation != null) {
            $deliverable = new ProjectDeliverable();
            $deliverable->project_id = $project->id;
            $deliverable->deliverable_type = $request->content_creation;
            $deliverable->title = $request->content_title;
            $deliverable->quantity = $request->content_quantity;
            $deliverable->from = $request->content_from;
            $deliverable->to = $request->content_to;
            $deliverable->description = $request->content_deliverable_description;
            $deliverable->save();
        }
        if ($request->marketing != null) {
            $deliverable = new ProjectDeliverable();
            $deliverable->project_id = $project->id;
            $deliverable->deliverable_type = $request->marketing;
            $deliverable->title = $request->marketing_title;
            $deliverable->quantity = $request->marketing_quantity;
            $deliverable->from = $request->marketing_from;
            $deliverable->to = $request->marketing_to;
            $deliverable->description = $request->marketing_deliverable_description;
            $deliverable->save();
        }
        if ($request->domain_hosting != null) {
            $deliverable = new ProjectDeliverable();
            $deliverable->project_id = $project->id;
            $deliverable->deliverable_type = $request->domain_hosting;
            $deliverable->title = $request->domain_title;
            $deliverable->quantity = $request->domain_quantity;
            $deliverable->from = $request->domain_from;
            $deliverable->to = $request->domain_to;
            $deliverable->description = $request->domain_deliverable_description;
            $deliverable->save();
        }
        if ($request->products != null) {
            $deliverable = new ProjectDeliverable();
            $deliverable->project_id = $project->id;
            $deliverable->deliverable_type = $request->products;
            $deliverable->title = $request->products_title;
            $deliverable->from = $request->products_from;
            $deliverable->to = $request->products_to;
            $deliverable->quantity = $request->products_quantity;
            $deliverable->description = $request->products_deliverable_description;
            $deliverable->save();
        }
        if ($request->collection != null) {
            $deliverable = new ProjectDeliverable();
            $deliverable->project_id = $project->id;
            $deliverable->deliverable_type = $request->collection;
            $deliverable->title = $request->collection_title;
            $deliverable->quantity = $request->collection_quantity;
            $deliverable->from = $request->collection_from;
            $deliverable->to = $request->collection_to;
            $deliverable->description = $request->collection_deliverable_description;
            $deliverable->save();
        }
        if ($request->others != null) {
            $deliverable = new ProjectDeliverable();
            $deliverable->project_id = $project->id;
            $deliverable->deliverable_type = $request->others;
            $deliverable->title = $request->others_title;
            $deliverable->quantity = $request->others_quantity;
            $deliverable->from = $request->others_from;
            $deliverable->to = $request->others_to;
            $deliverable->description = $request->others_deliverable_description;
            $deliverable->save();
        }


        // To add custom fields data
        if ($request->get('custom_fields_data')) {
            $project->updateCustomFieldData($request->get('custom_fields_data'));
        }

        if ($project->project_status != 'Accepted') {
            $pm_name = User::where('id', $project->pm_id)->first();

            $text = 'Project accepted by ' . $pm_name->name;
            $link = '<a style="color:blue" href="' . route('projects.show', $project->id) . '?tab=deliverable">' . $text . '</a>';
            $this->logProjectActivity($project->id, $link);
        } else {
            $log_user = Auth::user();
            foreach ($originalValues as $attribute => $originalValue) {
                if ($attribute === 'updated_at' || $attribute === 'last_updated_by') {
                    continue;
                }

                $updatedValue = $project->$attribute;

                if ($attribute == 'project_summary' && $originalValue != $updatedValue) {
                    if ($attribute == 'project_name') {
                        $print = 'project name';
                    } else {
                        $print = $attribute;
                    }
                    $activity = new ProjectActivity();
                    if ($attribute == 'project_summary') {
                        $activity->activity = $log_user->name . ' updated project summary';
                        $activity->old_data = $originalValue;
                    } else {
                        $activity->activity = $log_user->name . ' updated ' . $print . ' from ' . $originalValue . ' to ' . $updatedValue;
                    }

                    $activity->project_id = $project->id;
                    // $activity->attribute = $attribute;
                    // $activity->old_value = $originalValue;
                    // $activity->new_value = $updatedValue;
                    // $activity->user_id = Auth::id();
                    $activity->save();
                }
            }
        }



        $redirectUrl = urldecode($request->redirect_url);

        if ($redirectUrl == '') {
            $redirectUrl = route('projects.index');
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

        $this->project = Project::with([
            'client', 'members', 'members.user', 'members.user.session', 'members.user.employeeDetail.designation', 'milestones' => function ($q) use ($viewMilestonePermission) {
                if ($viewMilestonePermission == 'added') {
                    $q->where('added_by', user()->id);
                }
            },
            'milestones.currency', 'files' => function ($q) use ($viewFilePermission) {
                if ($viewFilePermission == 'added') {
                    $q->where('added_by', user()->id);
                }
            }
        ])
            ->withTrashed()
            ->findOrFail($id)
            ->withCustomFields();


        $memberIds = $this->project->members->pluck('user_id')->toArray();
        abort_403(!($this->viewPermission == 'all'
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
        $this->deliverables = ProjectDeliverable::where('project_id', $this->project->id)->get();

        $tab = request('tab');

        switch ($tab) {
            case 'members':
                abort_403(!($this->viewProjectMemberPermission == 'all'
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
            case 'activity_log':
                $this->activityLog = ProjectActivity::where('project_id', $this->project->id)->orderBy('id', 'desc')->get();
                $this->lead_deal_activity_log = LeadsDealsActivityLog::where('project_id', $this->project->id)->orderBy('id', 'desc')->get();
                $this->view = 'projects.ajax.activity_log';
                break;
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
        } else {
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
                'start' => ((!is_null($task->start_date)) ? $task->start_date : ((!is_null($task->due_date)) ? $task->due_date : null)),
                'end' => (!is_null($task->due_date)) ? $task->due_date : $task->start_date,
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
            } else {
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

        if ($id == 0 || $checkPublic == 1) {
            $members = User::allEmployees();

            foreach ($members as $item) {
                $self_select = (user() && user()->id == $item->id) ? '<span class=\'ml-2 badge badge-secondary\'>' . __('app.itsYou') . '</span>' : '';

                $options .= '<option  data-content="<span class=\'badge badge-pill badge-light border\'><div class=\'d-inline-block mr-1\'><img class=\'taskEmployeeImg rounded-circle\' src=' . $item->image_url . ' ></div></span>  ' . $item->name . '' . $self_select . '" value="' . $item->id . '"> ' . $item->name . '</option>';
            }

            $projectShortCode = '--';
        } else {
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

    public function activity_log($projectAdmin = false, $project)
    {
        if (!$projectAdmin) {
            $viewPermission = user()->permission('view_project_timelogs');
            abort_403(!in_array($viewPermission, ['all', 'added', 'owned']));
        }

        $activityLog = ProjectActivity::where('project_id', $project->id)->orderBy('id', 'desc')->get();
        $this->view = 'projects.ajax.activity_log';
        //return view($this->view, $activityLog)->render();
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
        } else {
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
            } else {
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
            } else {
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
        $project_name = Project::where('id', $id)->first();

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
        $validate = $request->validate([
            'deliverable_type' => 'required',
            'milestone_id' => 'required',
            'title' => 'required',
            'estimation_time' => 'required',
            'quantity' => 'required',
            'delivery-type' => 'required',
            'from' => 'required',
        ]);
        if ($validate) {
            $deliverable = new ProjectDeliverable();
            if ($request->deliverable_type == 'Others' || $request->deliverable_type == 'Fixing Issues/Bugs') {
                $deliverable->authorization = 0;
            } else {
                $deliverable->authorization = 1;
            }
            $deliverable->project_id = $request->project_id;
            $deliverable->title = $request->title;
            $deliverable->estimation_time = $request->estimation_time;
            $deliverable->deliverable_type = $request->deliverable_type;
            $deliverable->quantity = $request->quantity;
            $deliverable->from = $request->from;
            $deliverable->to = $request->to;
            $deliverable->milestone_id = $request->milestone_id;
            $deliverable->description = $request->description;
            $deliverable->save();
            $project_id = Project::where('id', $deliverable->project_id)->first();
            $project = Project::find($deliverable->project_id);
            $project->hours_allocated = $project_id->hours_allocated + $deliverable->estimation_time;

            if ($project->deliverable_authorization == 1 && $project->authorization_status == 'approved' && Auth::user()->role_id == 4) {
                $project->deliverable_authorization = 0;
                $project->authorization_status = 'pending';
            }
            $project->save();

            $log_user = Auth::user();

            $activity = new ProjectActivity();
            $activity->activity = $log_user->name . ' added project deliverable : ' . $deliverable->title;
            $activity->project_id = $project->id;
            $activity->save();

            $text = Auth::user()->name . ' added project deliverable : ' . $deliverable->title;
            $link = '<a style="color:blue" href="' . route('projects.show', $project->id) . '?tab=deliverable">' . $text . '</a>';
            $this->logProjectActivity($project->id, $link);

            $users = User::where('role_id', 1)->get();
            foreach ($users as $user) {
                $this->triggerPusher('notification-channel', 'notification', [
                    'user_id' => $user->id,
                    'role_id' => 1,
                    'title' => 'New Delivarable',
                    'body' => 'Project Manager add a Delivarable. Please check',
                    'redirectUrl' => route('projects.show', $project->id) . '?tab=deliverables'
                ]);
            }

            if ($request->deliverable_type == 'Others' || $request->deliverable_type == 'Fixing Issues/Bugs') {
                $authorization_action = new AuthorizationAction();
                $authorization_action->model_name = $deliverable->getMorphClass();
                $authorization_action->model_id = $deliverable->id;
                $authorization_action->type = 'other_type_deliverable';
                $authorization_action->deal_id = $project_id->deal_id;
                $authorization_action->project_id = $project_id->id;
                $authorization_action->link = route('projects.show', $project_id->id) . '?tab=deliverable';
                $authorization_action->title = Auth::user()->name . '  send '.$request->deliverable_type.' delivarable authorization request ';
                $authorization_action->authorization_for = 62;
                $authorization_action->save();
                //end authorization action

                $project_id = Project::where('id', $project->id)->first();
                foreach ($users as $user) {
                    Notification::send($user, new DeliverableOthersAuthorizationNotification($project_id));
                }
            }

            return response()->json([
                'status' => 200,
            ]);
        }
    }
    public function updateDeliverable(Request $request)
    {
        $validate = $request->validate([
            'deliverable_type' => 'required_unless:authrization_after_edit,true',
            'milestone_id' => 'required_unless:authrization_after_edit,true',
            'title' => 'required_unless:authrization_after_edit,true',
            'estimation_time' => 'required_unless:authrization_after_edit,true',
            'quantity' => 'required_unless:authrization_after_edit,true',
            'from' => 'required_unless:authrization_after_edit,true',
        ]);
        $deliverable = ProjectDeliverable::find($request->id);

        if ($request->deliverable_type == 'Others' || $request->deliverable_type == 'Fixing Issues/Bugs') {
            $deliverable->authorization = 0;
        } else {
            $deliverable->authorization = 1;
        }
        if ($request->authrization_after_edit == 'true') {
            if ($request->description) {
                $data = DelivarableColumnEdit::where([
                    'delivarable_id' => $deliverable->id,
                    'column_name' => 'description',
                    'status' => '0'
                ])->latest()->first();
                if ($data) {
                    $data->old_data = $deliverable->description;
                    $data->new_data = $request->description;
                    $data->status = '1';
                    $data->save();
                }
            }
            if ($request->title) {
                $data = DelivarableColumnEdit::where([
                    'delivarable_id' => $deliverable->id,
                    'column_name' => 'title',
                    'status' => '0'
                ])->latest()->first();
                if ($data) {
                    $data->old_data = $deliverable->title;
                    $data->new_data = $request->title;
                    $data->status = '1';
                    $data->save();
                }
            }
            if ($request->deliverable_type) {
                $data = DelivarableColumnEdit::where([
                    'delivarable_id' => $deliverable->id,
                    'column_name' => 'type',
                    'status' => '0'
                ])->latest()->first();
                if ($data) {
                    $data->old_data = $deliverable->deliverable_type;
                    $data->new_data = $request->deliverable_type;
                    $data->status = '1';
                    $data->save();
                }
            }
            if ($request->estimation_time) {
                $data = DelivarableColumnEdit::where([
                    'delivarable_id' => $deliverable->id,
                    'column_name' => 'estimation_time',
                    'status' => '0'
                ])->latest()->first();
                if ($data) {
                    $data->old_data = $deliverable->estimation_time;
                    $data->new_data = $request->estimation_time;
                    $data->status = '1';
                    $data->save();
                }
            }
            if ($request->quantity) {
                $data = DelivarableColumnEdit::where([
                    'delivarable_id' => $deliverable->id,
                    'column_name' => 'quantity',
                    'status' => '0'
                ])->latest()->first();
                if ($data) {
                    $data->old_data = $deliverable->quantity;
                    $data->new_data = $request->quantity;
                    $data->status = '1';
                    $data->save();
                }
            }
            if ($request->from || $request->to) {
                $data = DelivarableColumnEdit::where([
                    'delivarable_id' => $deliverable->id,
                    'column_name' => 'estimation_completed_date',
                    'status' => '0'
                ])->latest()->first();
                if ($data) {
                    $time = '';
                    if (!is_null($deliverable->from)) {
                        $time .= $deliverable->from;
                    }
                    if (!is_null($deliverable->to)) {
                        $time .= '-' . $deliverable->to;
                    }
                    $data->old_data = $time;
                    $data->new_data = $request->to ?? '' . ' , ' . $request->from ?? '';
                    $data->status = '1';
                    $data->save();
                }
            }
        }

        $deliverable->title = $request->title ?? $deliverable->title;
        $deliverable->deliverable_type = $request->deliverable_type ?? $deliverable->deliverable_type;
        $deliverable->quantity = $request->quantity ?? $deliverable->quantity;
        $deliverable->from = $request->from ?? $deliverable->from;
        $deliverable->to = $request->to ?? $deliverable->to;
        $deliverable->estimation_time = $request->estimation_time ?? $deliverable->estimation_time;
        $deliverable->milestone_id = $request->milestone_id ?? $deliverable->milestone_id;
        $deliverable->description = $request->description ?? $deliverable->description;
        $deliverable->save();
        $project_id_update = Project::where('id', $deliverable->project_id)->first();
        $deliverable_estimation_count = ProjectDeliverable::where('project_id', $project_id_update->id)->sum('estimation_time');
        $project_update = Project::find($project_id_update->id);
        $project_update->deliverable_authorization = 0;
        $project_update->hours_allocated = $deliverable_estimation_count;
        $project_update->save();

        $log_user = Auth::user();

        $text = Auth::user()->name . ' updated project deliverable : ' . $deliverable->title;
        $link = '<a style="color:blue" href="' . route('projects.show', $project_id_update->id) . '?tab=deliverable">' . $text . '</a>';
        $this->logProjectActivity($project_id_update->id, $link);

        if ($request->deliverable_type == 'Others' || $request->deliverable_type == 'Fixing Issues/Bugs') {
            $project_id = Project::where('id', $project_update->id)->first();

            $users = User::where('role_id', 1)->get();
            foreach ($users as $user) {
                Notification::send($user, new DeliverableOthersAuthorizationNotification($project_id));
            }
        }

        Toastr::success('Deliverable Updated Successfully', 'Success', ["positionClass" => "toast-top-right"]);
        return Redirect::back();
    }
    public function deleteDeliverable($id)
    {
        $deliverable_id = ProjectDeliverable::where('id', $id)->first();
        $project = Project::find($deliverable_id->project_id);
        $project->hours_allocated = $project->hours_allocated - $deliverable_id->estimation_time;
        $project->save();




        $deliverable = ProjectDeliverable::findOrFail($id)->delete();
        $log_user = Auth::user();

        $text = Auth::user()->name . ' deleted project deliverable : ' . $deliverable_id->title;
        $link = '<a style="color:blue" href="' . route('projects.show', $project->id) . '?tab=deliverable">' . $text . '</a>';
        $this->logProjectActivity($project->id, $link);
        return response()->json(['status' => 400]);
    }
    public function approveDeliverable($id)
    {
        $deliverable_id = ProjectDeliverable::where('id', $id)->first();
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

        Toastr::success('Approved Successfully', 'Success', ["positionClass" => "toast-top-right"]);
        return Redirect::back();
    }
    public function InComplete(Request $request)
    {
        //        dd($request->all());
        $project = Project::find($request->id);
        $project->dispute_status = 1;
        $project->save();
        return response()->json([
            'status' => 400,
        ]);
    }
    public function qc($id, $milestone_id)
    {
        $this->project = Project::with('client', 'members', 'members.user', 'members.user.session', 'members.user.employeeDetail.designation', 'milestones', 'milestones.currency')
            ->withTrashed()
            ->findOrFail($id)
            ->withCustomFields();

        $memberIds = $this->project->members->pluck('user_id')->toArray();

        $this->editPermission = user()->permission('edit_projects');
        $this->editProjectMembersPermission = user()->permission('edit_project_members');

        abort_403(!($this->editPermission == 'all'
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
        } else {
            $this->employees = '';
        }

        $this->qcData = QCSubmission::where([
            'project_id' => $id,
            'milestone_id' => $milestone_id
        ])->first();

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
        $this->milestone = ProjectMilestone::where('id', $id)->first();
        // /dd(  $this->milestone);

        if ($this->editPermission == 'all' || $this->editProjectMembersPermission == 'all') {
            $this->employees = User::allEmployees(null, null, ($this->editPermission == 'all' ? 'all' : null));
        } else {
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
        //      dd($request);
        $validated = $request->validate([
            'qc_protocol' => 'required',
            'login_information' => 'required',
            'drive_information' => 'required',
            'rating' => 'required',
            'requirements' => 'required',
            'comments' => 'required',
            'comments2' => 'required',
            'comments3' => 'required',
            'dummy_yes' => 'required',
            'dummy_information' => 'required',
            'main_page_number' => 'required',
            'secondary_page_number' => 'required',
            'backup_email_address' => 'required',
            'theme_name' => 'required',
            'theme_url' => 'required',
            'day_interval' => 'required',
            'notify' => 'required',
            'actual_yes' => 'required',
            'actual_information' => 'required',
            'website_plugin_box_information' => 'required',
            'price' => 'required',
            'login_url' => 'required_if:login_information,1',
            'login' => 'required_if:login_information,1',
            'password' => 'required_if:login_information,1',
            'screenshot' => 'required_if:login_information,1',
            'google_link' => 'required_if:drive_information,1',
            'dummy_link' => 'required_if:dummy_information,1',
            'actual_link' => 'required_if:actual_information,1',
        ], [
            'qc_protocol.required' => 'This field is required. Please select Yes or No!!',
            'login_information.required' => 'This field is required. You have mark this checkbox!!',
            'login_url' => 'This field is required. Please input the login URL here!!',
            'login' => 'This field is required. Please input the user id or email here!!',
            'password' => 'This field is required. Please input the password here!!',
            'screenshot' => 'This field is required. Please take a screenshot when you are logged in and input the screenshot link here!!',
            'drive_information.required' => 'This field is required. Please confirm that you have uploaded the backup in Google Drive!!',
            'google_link' => 'This field is required. Please input the Google Drive link here!!',
            'rating.required' => 'This field is required. Please give rating to the technical team!!',
            'requirements.required' => 'This field is required. Please give rating to the sales team for defining requirements!!',
            'comments.required' => 'Comment is required. Please write you opinion about technical team!!',
            'comments2.required' => 'Comment is required. Please write you opinion about defined requirements from sales team!!',
            'comments3.required' => 'Comment is required. Please write you opinion about defined price from sales team!!',
            'dummy_yes.required' => 'This field is required. Please select Yes or No',
            'dummy_information.required' => 'This field is required.',
            'notify.required' => 'This field is required. Please select Yes or No!!',
            'actual_yes.required' => 'This field is required. Please select Yes or No!!',
            'price.required' => 'This field is required. Please give rating to the sales team for defining price!!',
            'actual_link' => 'This field is required. Please input the actual site link here!!',
            'dummy_link' => 'This field is required. Please input the Dummy or Test site link!!',
            'main_page_number.required' => 'This field is required!!',
            'secondary_page_number.required' => 'This field is required!!',
            'backup_email_address.required' => 'This field is required!!',
            'day_interval.required' => 'This field is required!!',
            'theme_name.required' => 'This field is required!!',
            'theme_url.required' => 'This field is required!!',
            'website_plugin_box_information.required' => 'This field is required. Please select Yes or No!!',
        ]);
        //      dd($request);
        $milestone = new ProjectSubmission();
        $milestone->qc_protocol = $request->qc_protocol;
        $milestone->milestone_id = $request->milestone_id;

        $project = ProjectMilestone::where('id', $request->milestone_id)->first();
        $milestone->project_id = $project->project_id;

        $milestone->login_yes = $request->login_yes;
        $milestone->login_information = $request->login_information;
        $milestone->login_url = $request->login_url;
        $milestone->login = $request->login;
        $milestone->password = $request->password;
        $milestone->screenshot = $request->screenshot;
        $milestone->drive_yes = $request->drive_yes;
        $milestone->drive_information = $request->drive_information;
        $milestone->google_link = $request->google_link;
        $milestone->rating = $request->rating;
        $milestone->comments = $request->comments;
        $milestone->comments3 = $request->comments3;
        $milestone->comments2 = $request->comments2;
        $milestone->requirements = $request->requirements;
        $milestone->price = $request->price;
        $milestone->niche = $request->niche;
        $milestone->dummy_yes = $request->dummy_yes;
        $milestone->dummy_information = $request->dummy_information;
        $milestone->dummy_link = $request->dummy_link;
        $milestone->notify = $request->notify;
        $milestone->actual_yes = $request->actual_yes;
        $milestone->actual_information = $request->actual_information;
        $milestone->actual_link = $request->actual_link;
        $milestone->status = 'pending';

        $milestone->save();

        $website_themes = new ProjectWebsiteTheme();
        $website_themes->theme_name = $request->theme_name;
        $website_themes->theme_url = $request->theme_url;
        $website_themes->save();

        foreach($request->plugin_name as $key => $plugin_name) {
            $website_plugins = new ProjectWebsitePlugin();
            $website_plugins->plugin_name = $plugin_name;
            $website_plugins->plugin_url = $request->plugin_url[$key] ;
            $website_plugins->save();
        }

        $data = $request->all();

//        $plugin_names = json_encode($data['plugin_name']);
//        $plugin_urls = json_encode($data['plugin_url']);

        $project_portfolio = new ProjectPortfolio();
        $project_portfolio->project_id = $project->project_id;
        $project_portfolio->cms_category = $data['cms_category'];
        $project_portfolio->website_type = $data['website_type'];
        $project_portfolio->niche = $data['niche'];
        $project_portfolio->sub_niche = $data['sub_niche'];
        $project_portfolio->theme_name = $website_themes->id;
        $project_portfolio->theme_url = $website_themes->id;
        $project_portfolio->plugin_information = $data['website_plugin_box_information'];
        $project_portfolio->main_page_number = $data['main_page_number'];
        $project_portfolio->secondary_page_number = $data['secondary_page_number'];
        $project_portfolio->backup_email_address = $data['backup_email_address'];
        $project_portfolio->day_interval = $data['day_interval'];
        $project_portfolio->description = $data['description'];
        $project_portfolio->portfolio_link = $data['actual_link'];
        $project_portfolio->added_by = $data['added_by'];
        $project_portfolio->plugin_name = $website_plugins->id;
        $project_portfolio->plugin_url = $website_plugins->id;
        $project_portfolio->save();
        $milestone_update = ProjectMilestone::where('id', $milestone->milestone_id)->first();
        $milestone_update->project_completion_status = 2;
        $milestone_update->save();


        //$user= User::where('id',$project->pm_id)->first();

        // authorization action section
        $project_id = Project::find($project->project_id);

        $authorization_action = new AuthorizationAction();
        $authorization_action->model_name = $milestone->getMorphClass();
        $authorization_action->model_id = $milestone->id;
        $authorization_action->type = 'project_completion';
        $authorization_action->deal_id = $project_id->deal_id;
        $authorization_action->project_id = $project_id->id;
        $authorization_action->link = route('projects.show', $project_id->id);
        $authorization_action->title = Auth::user()->name . ' send project completion authorization request ';
        $authorization_action->authorization_for = 62;
        $authorization_action->save();
        //end authorization action
        $users = User::where('role_id', 1)->get();
        foreach ($users as $user) {

            Notification::send($user, new ProjectSubmissionNotification($milestone));
        }

        //      Toastr::success('Submitted Successfully', 'Success', ["positionClass" => "toast-top-right"]);

        //      return redirect('/account/projects/'.$milestone->project_id.'?tab=milestones');
        return response()->json([
            'status' => 'success',
            'redirectUrl' => url('/account/projects/' . $milestone->project_id . '?tab=milestones')
        ]);
        //        route('dealDetails', $deal->id)

    }
    public function viewCms()
    {
        $this->pageTitle = 'CMS';
        $this->all_cms = DB::table('project_cms')->orderBy('id', 'desc')->paginate(10);
        return view('projects.cms.index', $this->data);
    }
    public function storeCms(Request $request)
    {
        $validated = $request->validate([
            'cms_name' => 'required',
        ], [
            'cms_name.required' => 'This field is required!!',
        ]);
        $cms = new ProjectCms();
        $cms->cms_name = $request->cms_name;
        $cms->save();
        return response()->json(['status' => 200]);
    }
    public function updateCms(Request $request, $id)
    {
        $cms = ProjectCms::find($id);
        $cms->cms_name = $request->cms_name;
        $cms->save();

        return response()->json(['status' => 200]);
    }
    // VIEW PROJECT WEBSITE SECTION
    public function viewWebsiteType()
    {
        $this->pageTitle = 'Website Type';
        $this->website_types = DB::table('project_website_types')->orderBy('id', 'desc')->paginate(10);
        return view('projects.website-type.index', $this->data);
    }
    public function storeWebsiteType(Request $request)
    {
        $validated = $request->validate([
            'website_type' => 'required',
        ], [
            'website_type.required' => 'This field is required!!',
        ]);
        $project_website_type = new ProjectWebsiteType();
        $project_website_type->website_type = $request->website_type;
        $project_website_type->save();
        return response()->json(['status' => 200]);
    }
    public function updateWebsiteType(Request $request, $id)
    {
        $project_website_type = ProjectWebsiteType::find($id);
        $project_website_type->website_type = $request->website_type;
        $project_website_type->save();

        return response()->json(['status' => 200]);
    }
    // VIEW PROJECT WEBSITE THEME SECTION
    public function viewWebsiteTheme()
    {
        $this->pageTitle = 'Website Theme';
        $this->website_themes = DB::table('project_website_themes')->orderBy('id', 'desc')->paginate(10);
        return view('projects.website-theme.index', $this->data);
    }
    public function storeWebsiteTheme(Request $request)
    {
        $validated = $request->validate([
            'theme_name' => 'required',
            'theme_url' => 'required|url',
        ], [
            'theme_name.required' => 'This field is required!!',
            'theme_url.required' => 'This field is required!!',
        ]);
        $project_website_theme = new ProjectWebsiteTheme();
        $project_website_theme->theme_name = $request->theme_name;
        $project_website_theme->theme_url = $request->theme_url;
        $project_website_theme->save();
        return response()->json(['status' => 200]);
    }
    public function updateWebsiteTheme(Request $request, $id)
    {
        $project_website_theme = ProjectWebsiteTheme::find($id);
        $project_website_theme->theme_name = $request->theme_name;
        $project_website_theme->theme_url = $request->theme_url;
        $project_website_theme->save();

        return response()->json(['status' => 200]);
    }

    // VIEW PROJECT WEBSITE PLUGIN SECTION
    public function viewWebsitePlugin()
    {
        $this->pageTitle = 'Website Plugin';
        $this->website_plugins = DB::table('project_website_plugins')->orderBy('id', 'desc')->paginate(10);
        return view('projects.website-plugin.index', $this->data);
    }
    public function storeWebsitePlugin(Request $request)
    {
        foreach ($request->plugin_name as $key => $plugin_name) {
            $project_website_plugin = new ProjectWebsitePlugin();
            $project_website_plugin->plugin_name = $plugin_name;
            $project_website_plugin->plugin_url  = $request->plugin_url[$key];
            $project_website_plugin->save();
        }
        return response()->json(['status' => 200]);
    }
    public function updateWebsitePlugin(Request $request, $id)
    {
        $project_website_plugin = ProjectWebsitePlugin::find($id);
        $project_website_plugin->plugin_name = $request->plugin_name;
        $project_website_plugin->plugin_url = $request->plugin_url;
        $project_website_plugin->save();

        return response()->json(['status' => 200]);
    }

    // VIEW PROJECT CATEGORY SECTION
    public function viewCategory()
    {
        $this->pageTitle = 'Categories';
        $this->categories = ProjectNiche::with('parent', 'child')->paginate(10);
        return view('projects.category.index', $this->data);
    }

    public function parentCategoryId($id)
    {
        $sub_categories = ProjectNiche::where('parent_category_id', $id)->get();
        return $sub_categories;
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
        //        dd($request->all());
        $request->validate([
            'category_name' => 'required',
        ], [
            'category_name.required' => 'Please enter the category name!',
        ]);
        $category = new ProjectNiche();
        $category->category_name = $request->category_name;
        $category->parent_category_id = $request->parent_category_id;
        //        $category->sub_category_id = $request->sub_category_id;

        $category->save();
        return response()->json([
            'status' => 200,
            'message' => 'Category Added Successfully',
        ]);
    }
    public function updateCategory(Request $request, $id)
    {
        $update_category = ProjectNiche::find($id);
        $update_category->category_name = $request->category_name;
        $update_category->parent_category_id = $request->parent_category_id;
        $update_category->save();
        return response()->json([
            'status' => 200,
        ]);
    }
    public function deleteNiche($id)
    {
        $milestone = ProjectNiche::find($id);
        $milestone->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Category Deleted Successfully',
        ]);
    }
    public function ProjectAccept(Request $request)
    {
        $project = Project::find($request->project_id);
        $project->status = 'in progress';
        $project->project_status = 'Accepted';
        $project->admin_comment = $request->admin_comment;
        $project->save();
        $user = User::where('id', $project->pm_id)->first();

        //if request comes from original authrization serction then data will be update form authorizatin action
        if (is_null($request->authorization_form)) {
            $authorization_action = AuthorizationAction::where([
                'project_id' => $project->id,
                'type' => 'project_challenge',
                'authorization_for' => $this->user->id,
                'status' => '0'
            ])->first();
            if ($authorization_action) {
                $authorization_action->description = $request->admin_comment;
                $authorization_action->authorization_by = $this->user->id;
                $authorization_action->approved_at = Carbon::now();
                $authorization_action->status = '1';
                $authorization_action->save();
            }
        }

        Notification::send($user, new ProjectReviewAcceptNotification($project));

        Toastr::success('Project Accepted Successfully', 'Success', ["positionClass" => "toast-top-right"]);
        return back();
    }



    public function ProjectDeny(Request $request)
    {
        //dd($request);
        $project = Project::find($request->project_id);
        $project->status = 'canceled';
        $project->project_status = 'Canceled';
        $project->admin_comment = $request->admin_comment;
        $project->save();
        $user = User::where('id', $project->pm_id)->first();

        if (is_null($request->authorization_form)) {
            $authorization_action = AuthorizationAction::where([
                'project_id' => $project->id,
                'type' => 'project_challenge',
                'authorization_for' => $this->user->id,
                'status' => '0'
            ])->first();
            if ($authorization_action) {
                $authorization_action->description = $request->admin_comment;
                $authorization_action->authorization_by = $this->user->id;
                $authorization_action->approved_at = Carbon::now();
                $authorization_action->status = '1';
                $authorization_action->save();
            }
        }

        Notification::send($user, new ProjectReviewAcceptNotification($project));
        Toastr::success('Project Canceled Successfully', 'Success', ["positionClass" => "toast-top-right"]);
        return back();
    }

    public function ProjectSubmissionAccept(Request $request)
    {
        $project = ProjectSubmission::find($request->id);
        $project->admin_comment = $request->admin_comment;
        if ($request->deny != null) {
            $project->status = 'revision';
        } else {
            $project->status = 'accepted';
        }
        $project->save();
        if ($request->deny != null) {
            $milestone = ProjectMilestone::where('id', $project->milestone_id)->first();
            $mile = ProjectMilestone::find($milestone->id);
            $mile->project_completion_status = 0;
            $mile->save();
        } else {
            $milestone = ProjectMilestone::where('id', $project->milestone_id)->first();
            $mile = ProjectMilestone::find($milestone->id);
            $mile->project_completion_status = 1;
            $mile->save();
        }
        $project_id = Project::where('id', $project->project_id)->first();

        $user = User::where('id', $project_id->pm_id)->first();



        if (is_null($request->authorization_form)) {
            $authorization_action = AuthorizationAction::where([
                'project_id' => $project_id->id,
                'type' => 'project_completion',
                'authorization_for' => $this->user->id,
                'status' => '0'
            ])->first();
            if ($authorization_action) {
                $authorization_action->description = $request->admin_comment;
                $authorization_action->authorization_by = $this->user->id;
                $authorization_action->approved_at = Carbon::now();
                $authorization_action->status = '1';
                $authorization_action->save();
            }
        }


        Notification::send($user, new ProjectSubmissionAcceptNotification($project_id));

        Toastr::success('Project Submission Request Accepted Successfully', 'Success', ["positionClass" => "toast-top-right"]);
        return back();
    }
    public function ProjectSubmissionQC(Request $request)
    {
        $project = QCSubmission::where([
            'milestone_id' => $request->milestone_id,
            'project_id' => $request->project_id,
        ])->first();


        if (!$project) {
            $project = new QCSubmission();
        }
        if ($request->step == '1') {
            $project->milestone_id = $request->milestone_id;
            $milestone_id = ProjectMilestone::find($request->milestone_id);
            $project->project_id = $milestone_id->project_id;
            $project->site_https = $request->site_https;
            $project->favicon = $request->favicon;
            $project->webmail = $request->webmail;
            $project->contact_form = $request->contact_form;
            $project->social_media = $request->social_media;
            $project->login_link = $request->login_link;
            $project->scroll_down = $request->scroll_down;
            $project->lorem_text = $request->lorem_text;
            $project->logical_issues = $request->logical_issues;
            $project->loading_speed = $request->loading_speed;
            $project->mobile_speed = $request->mobile_speed;
            $project->step_1 = 1;

            if ($project->save()) {
                return redirect()->route('qc_form', [$request->project_id, $request->milestone_id])->with('qc_step1_success', 'success');
            }
        } elseif ($request->step == '2') {
            $project->migration = $request->migration;
            $project->links_working = $request->links_working;
            $project->backup_plugin = $request->backup_plugin;
            $project->uptime_monitoring = $request->uptime_monitoring;
            $project->final_backup = $request->final_backup;
            $project->slogan = $request->slogan;
            $project->agree = $request->agree;
            $project->status = 'pending';
            if ($project->save()) {
                $deal = Project::find($request->project_id);

                $authorization_action = new AuthorizationAction();
                $authorization_action->model_name = $project->getMorphClass();
                $authorization_action->model_id = $project->id;
                $authorization_action->type = 'project_qc';
                $authorization_action->deal_id = $deal->deal_id;
                $authorization_action->project_id = $project->project_id;
                $authorization_action->link = route('projects.show', $project->project_id);
                $authorization_action->title = Auth::user()->name . ' send QC form authorization request ';
                $authorization_action->authorization_for = 62;
                $authorization_action->save();

                $milestone = ProjectMilestone::where('id', $request->milestone_id)->first();
                //dd($milestone);
                $milestone_update = ProjectMilestone::find($milestone->id);
                $milestone_update->qc_status = 2;
                $milestone_update->save();
                $users = User::where('role_id', 1)->get();

                foreach ($users as $user) {
                    Notification::send($user, new QCSubmissionNotification($milestone));
                }

                Toastr::success('Submitted Successfully', 'Success', ["positionClass" => "toast-top-right"]);
                return redirect('/account/projects/' . $milestone->project_id . '?tab=milestones');
            }
        }
    }

    public function ProjectQcSubmissionAccept(Request $request)
    {

        // DB::beginTransaction();
        $project = QcSubmission::find($request->id);
        $project->admin_comment = $request->admin_comment_qc;
        if ($request->deny != null) {
            $project->status = 'revision';
        } else {
            $project->status = 'accepted';
        }
        $project->save();

        if ($request->deny != null) {
            $milestone = ProjectMilestone::where('id', $project->milestone_id)->first();
            $mile = ProjectMilestone::find($milestone->id);
            $mile->qc_status = 0;
            $mile->save();
            $project_id = Project::where('id', $project->project_id)->first();

            $user = User::where('id', $project_id->pm_id)->first();



            Notification::send($user, new QcSubmissionAcceptNotification($project_id));

            $qc_submission = QcSubmission::find($request->id);
            $qc_submission->delete();
        } else {
            $milestone = ProjectMilestone::where('id', $project->milestone_id)->first();
            // dd($milestone);
            $mile = ProjectMilestone::find($milestone->id);
            $mile->qc_status = 1;
            $mile->save();
        }

        $project_id = Project::where('id', $project->project_id)->first();

        //update authoziation action
        if (is_null($request->authorization_form)) {
            $authorization_action = AuthorizationAction::where([
                'project_id' => $project_id->id,
                'type' => 'project_qc',
                'authorization_for' => $this->user->id,
                'status' => '0'
            ])->first();
            if ($authorization_action) {
                $authorization_action->description = $request->admin_comment;
                $authorization_action->authorization_by = $this->user->id;
                $authorization_action->approved_at = Carbon::now();
                $authorization_action->status = '1';
                $authorization_action->save();
            }
        }
        //end authorization action

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
            'comments' => ['required', 'string', 'min:10'],
        ]);

        $project = PMProject::where('project_id', $request->project_id)->first();

        $pm_project = PMProject::find($project->id);
        $pm_project->reason = $request->comments;
        $pm_project->save();

        $project_id = Project::where('id', $request->project_id)->first();
        $log_user = Auth::user();

        //authorizatoin action start here
        $authorization_action = new AuthorizationAction();
        $authorization_action->model_name = $pm_project->getMorphClass();
        $authorization_action->model_id = $pm_project->id;
        $authorization_action->type = 'project_deliverable_time_extention';
        $authorization_action->deal_id = $project_id->deal_id;
        $authorization_action->project_id = $project_id->id;
        $authorization_action->link = route('projects.show', $project_id->id) . '?tab=deliverables';
        $authorization_action->title = Auth::user()->name . ' send project deliverable time extention request ';
        $authorization_action->authorization_for = 62;
        $authorization_action->save();
        //end authorization action here

        $text = Auth::user()->name . '  send project deliverable time extention request ';
        $link = '<a style="color:blue" href="' . route('projects.show', $project->id) . '?tab=deliverable">' . $text . '</a>';
        $this->logProjectActivity($project->id, $link);

        $users = User::where('role_id', 1)->get();
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


        $project = PMProject::where('project_id', $request->project_id)->first();

        $pm_project = PMProject::find($project->id);
        $pm_project->deliverable_status = 1;
        $pm_project->save();

        $project_id = Project::where('id', $request->project_id)->first();
        $log_user = Auth::user();

        //update authoziation action
        if (is_null($request->authorization_form)) {
            $authorization_action = AuthorizationAction::where([
                'project_id' => $project_id->id,
                'type' => 'project_deliverable_time_extention',
                'authorization_for' => $this->user->id,
                'status' => '0'
            ])->first();
            if ($authorization_action) {
                $authorization_action->description = $this->user->name . ' Accept this request';
                $authorization_action->authorization_by = $this->user->id;
                $authorization_action->approved_at = Carbon::now();
                $authorization_action->status = '1';
                $authorization_action->save();
            }
        }
        //end authorization action

        $text = Auth::user()->name . ' accepted project deliverable time extention request';
        $link = '<a style="color:blue" href="' . route('projects.show', $project->id) . '?tab=deliverable">' . $text . '</a>';
        $this->logProjectActivity($project->id, $link);

        $user = User::where('id', $project_id->pm_id)->get();
        Notification::send($user, new ProjectDeliverableTimeAcceptNotification($project_id));


        Toastr::success('Authorization request accepted Successfully', 'Success', ["positionClass" => "toast-top-right"]);
        return back();
    }
    public function DeliverableFinalAuthorizationSend($id)
    {
        // $project= Project::where('project_id',$request->project_id)->first();
        $project = Project::find($id);
        $project->authorization_status = 'submitted';
        $project->save();


        $project_id = Project::where('id', $id)->first();
        $log_user = Auth::user();
        //authorizatoin action start here
        $authorization_action = new AuthorizationAction();
        $authorization_action->model_name = $project->getMorphClass();
        $authorization_action->model_id = $project->id;
        $authorization_action->type = 'deliverable';
        $authorization_action->deal_id = $project_id->deal_id;
        $authorization_action->project_id = $project_id->id;
        $authorization_action->link = route('projects.show', $project_id->id) . '?tab=deliverables';
        $authorization_action->title = $this->user->name . ' send project deliverable authorization request';
        $authorization_action->authorization_for = 62;
        $authorization_action->save();
        //end authorization action here

        $users = User::where('role_id', 1)->get();
        foreach ($users as $user) {
            $this->triggerPusher('notification-channel', 'notification', [
                'user_id' => $user->id,
                'role_id' => 1,
                'title' => 'Delivarable Authorization Request',
                'body' => 'Project Manager send deliverable authorization request',
                'redirectUrl' => route('projects.show', $project_id->id) . '?tab=deliverables'
            ]);
            Notification::send($user, new ProjectDeliverableFinalAuthorizationNotification($project_id));
        }

        $text = Auth::user()->name . ' send project deliverable authorization request';
        $link = '<a style="color:blue" href="' . route('projects.show', $project->id) . '?tab=deliverable">' . $text . '</a>';
        $this->logProjectActivity($project->id, $link);

        return response()->json(['status' => 400]);
    }
    public function DeliverableFinalAuthorizationAccept(Request $request)
    {

//        dd($request->all());
        if ($request->denyAuthorization) {
            $project = Project::find($request->project_id);
            $project->authorization_status = 'canceled';
            $project->project_status = 'canceled';
            $project->deliverable_authorization = 2;
            $project->save();
        }else{
            $project=Project::find($request->project_id);
            $project->authorization_status = 'approved';
            $project->deliverable_authorization= 1;
            $project->save();
        }


        $qualified_sale_id = QualifiedSale::where('project_id', $project->id)->first();


        if($qualified_sale_id != null)
        {
            if ($request->denyAuthorization) {
                $qualified_sale = QualifiedSale::find($qualified_sale_id->id);
                $qualified_sale->authorized_by_admin = 2;
                $qualified_sale->admin_authorization_comment = $request->admin_authorization_comment;
                $qualified_sale->admin_id = Auth::id();
                $qualified_sale->save();
            }else{
                $qualified_sale= QualifiedSale::find($qualified_sale_id->id);
                $qualified_sale->authorized_by_admin = 1;
                $qualified_sale->admin_authorization_comment = $request->admin_authorization_comment;
                $qualified_sale->admin_id = Auth::id();
                $qualified_sale->save();
            }


        }


        $pm_project = PMProject::where('project_id', $project->id)->first();
        $pm_project_update = PMProject::find($pm_project->id);
        $pm_project_update->deliverable_status = 1;
        $pm_project_update->save();

        $project_id = Project::where('id', $request->project_id)->first();

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

        if (is_null($request->authorization_form)) {
            $authorization_action = AuthorizationAction::where([
                'project_id' => $project_id->id,
                'type' => 'deliverable',
                'authorization_for' => $this->user->id,
                'status' => '0'
            ])->first();
            if ($authorization_action) {
                $authorization_action->description = $this->user->name . ' Accept this request';
                $authorization_action->authorization_by = $this->user->id;
                $authorization_action->approved_at = Carbon::now();
                $authorization_action->status = '1';
                $authorization_action->save();
            }
        }

        $log_user = Auth::user();

        $text = Auth::user()->name . ' finally authorized project deliverable';
        $link = '<a style="color:blue" href="' . route('projects.show', $project->id) . '?tab=deliverable">' . $text . '</a>';
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
        return response()->json([
            'status' => 400
        ]);
    }

    public function modification_form_show(ProjectDeliverable $id)
    {
        $data = new \stdClass();
        $data->id = $id->id;
        $data->type = $id->deliverable_type;
        $data->title = $id->title;
        $data->estimation_time = $id->estimation_time;
        $data->quantity = $id->quantity;
        $data->description = $id->description;
        $data->estimation_completed_date = $id->from ?? $id->to;

        $this->deliverable = json_encode($data);
        $this->pageTitle = 'Deliverable Change Request Form';
        $this->isShowUrl = false;
        return view('projects.modals.deliverable_edit_permission', $this->data);
    }

    public function set_column_edit_permission(Request $request)
    {
        if (count($request->permission_column) == count($request->data)) {
            $deliverable = ProjectDeliverable::find($request->delivarable_id);
            $project = Project::find($deliverable->project_id);

            foreach ($request->permission_column as $key => $value) {
                $data = new DelivarableColumnEdit();
                $data->delivarable_id = $request->delivarable_id;
                $data->column_name = $request->permission_column[$key];
                $data->comment = $request->data[$key];
                $data->save();
            }

            //authorizatoin action start here
            $authorization_action = new AuthorizationAction();
            $authorization_action->model_name = $deliverable->getMorphClass();
            $authorization_action->model_id = $deliverable->id;
            $authorization_action->type = 'deliverable_modification_by_top_managment';
            $authorization_action->deal_id = $project->deal_id;
            $authorization_action->project_id = $project->id;
            $authorization_action->link = route('projects.show', $project->id) . '?tab=deliverables';
            $authorization_action->title = $this->user->name . ' Send deliverable modification request';
            $authorization_action->authorization_for = $project->pm_id;
            $authorization_action->save();
            //end authorization action here

            $data = ProjectDeliverable::find($request->delivarable_id);
            $url = route('projects.show', $data->project_id) . '?tab=deliverables';

            $text = Auth::user()->name . ' send delivarable change request to project manager';
            $link = '<a style="color:blue" href="' . $url . '">' . $text . '</a>';
            $this->logProjectActivity($data->project->id, $link);

            $this->triggerPusher('notification-channel', 'notification', [
                'user_id' => $data->project->pm_id,
                'role_id' => 4,
                'title' => 'Delivarable Modification Request',
                'body' => 'Admin send "' . implode(',', $request->permission_column) . '" column change request',
                'redirectUrl' => $url
            ]);

            Toastr::success('Delivarable change request send to project manager', 'Success', ["positionClass" => "toast-top-right"]);
            return redirect()->to($url);
        }
    }

    public function project_activity_time_log_ajax(Request $request)
    {
        $date = explode(' To ', $request->date_range);
        $activityLog = ProjectActivity::where('project_id', $request->project_id);

        if ($request->employee != 'all') {
            $activityLog->where('added_by', $request->employee);
        }

        $activityLog = $activityLog->whereBetween('created_at', [Carbon::parse($date[0])->format('Y-m-d H:i:s'), Carbon::parse($date[1])->format('Y-m-d H:i:s')])
            ->orderBy('id', 'desc')
            ->get();

        $lead_deal_activity_log = LeadsDealsActivityLog::where('project_id', $request->project_id)->orderBy('id', 'desc')->get();

        $view = view('projects.ajax.activity_log', compact('activityLog', 'lead_deal_activity_log'))->render();

        return response()->json([
            'success' => 200,
            'html' => $view
        ]);
    }
    public function deliverableEstimationTime($deliverableId)
    {
        $deliverable = ProjectDeliverable::find($deliverableId);
        return $deliverable->estimation_time;
    }
    public function deliverableDueDate($deliverableId)
    {
        $deliverable = ProjectDeliverable::find($deliverableId);
        $html = '';

        if ($deliverable->to != null) {
            $html .= 'Between ' . $deliverable->from . ' & ' . $deliverable->to . '';
        } else {
            $html .= 'On ' . $deliverable->from . '';
        }

        return $html;
    }
    public function timeExtension(Request $request)
    {
        //        dd($request->all());
        $request->validate([
            'new_date' => 'required',
        ], [
            'new_date.required' => 'This field is required!',
        ]);
    }

    public function getSubNiches($niche_id)
    {
        $sub_niches = ProjectNiche::find($niche_id)->child;
        return response()->json($sub_niches);
    }

    public function filterSubcategories(Request $request)
    {
        //        $categoryId = $request->category_id;
        $search = $request->search;

        $query = ProjectNiche::query();

        //        if (!empty($categoryId)) {
        //            $query->where('parent_category_id', $categoryId);
        //        }

        if (!empty($search)) {
            $query->where('category_name', 'like', '%' . $search . '%');
        }

        $categories = $query->orderBy('id', 'desc')->paginate(10);
        foreach ($categories as $category) {
            $category->parent_category_name = ProjectNiche::where('id', $category->parent_category_id)->first();
        }

        if ($categories->count() >= 1) {
            return response()->json(['categories' => $categories]);
        } else {
            return response()->json(['status' => 400]);
        }
    }

    public function get_project_json($type = null)
    {
        if (!is_null($type)) {
            if ($type = 'in_progress') {
                $mode = 'in progress';
            } else if ($type == 'partially_finished') {
                $mode = 'partially finished';
            } else if ($type == 'finished') {
                $mode = 'finished';
            } else if ($type == 'canceled') {
                $mode = 'canceled';
            } else {
            }
            $data = Project::select('id', 'project_name')->where('status', $mode)->get();
        } else {

            $data = Project::select('id', 'project_name')->where('status', 'in progress')->get();
        }

        return response()->json($data);
    }
}
