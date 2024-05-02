<?php

namespace App\DataTables;

use App\Models\PMProject;
use Carbon\Carbon;
use App\Models\Project;
use App\Models\CustomField;
use App\Models\CustomFieldGroup;
use App\DataTables\BaseDataTable;
use App\Models\ProjectStatusSetting;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;
use Illuminate\Support\Facades\DB;
use App\Models\Currency;
use App\Models\Deal;
use App\Models\User;
use Auth;
use App\Models\Task;
use App\Models\ContractSign;
use App\Models\ProjectDeadlineExtension;
use App\Models\ProjectMilestone;
use App\Models\ProjectPmGoal;
use App\Models\ProjectTimeLog;
use Str;

class ProjectsDataTable extends BaseDataTable
{

    private $editProjectsPermission;
    private $deleteProjectPermission;
    private $viewProjectPermission;
    private $viewGanttPermission;

    public function __construct()
    {
        parent::__construct();
        $this->editProjectsPermission = user()->permission('edit_projects');
        $this->deleteProjectPermission = user()->permission('delete_projects');
        $this->viewProjectPermission = user()->permission('view_projects');
        $this->viewGanttPermission = user()->permission('view_project_gantt_chart');
        $this->viewProjectMemberPermission = user()->permission('view_project_members');
    }

    /**
     * Build DataTable class.
     *
     * @param mixed $query Results from query() method.
     * @return \Yajra\DataTables\DataTableAbstract
     */
    public function dataTable($query)
    {
        //dd($query);
        $project = new Project();
        //dd($project);
        //dd($row);


        $customFieldsGroupsId = CustomFieldGroup::where('model', $project->customFieldModel)->pluck('id')->first();
        $customFields = CustomField::where('custom_field_group_id', $customFieldsGroupsId)->where('export', 1)->get();
        $datatables = datatables()->eloquent($query);
        // /dd($datatables);

        $datatables->addColumn('check', function ($row) {
            return '<input type="checkbox" class="select-table-row" id="datatable-row-' . $row->id . '"  name="datatable_ids[]" value="' . $row->id . '" onclick="dataTableRowCheck(' . $row->id . ')">';
        });
        $datatables->addColumn('action', function ($row) {
            $memberIds = $row->members->pluck('user_id')->toArray();
            //dd($memberIds);

            $action = '<div class="task_view">

                <div class="dropdown">
                    <a class="task_view_more d-flex align-items-center justify-content-center dropdown-toggle" type="link"
                        id="dropdownMenuLink-' . $row->id . '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="icon-options-vertical icons"></i>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink-' . $row->id . '" tabindex="0">';
                    if(Auth::user()->role_id == 4){
                        $pd_extension = ProjectDeadlineExtension::where('project_id',$row->id)->first();
                        if($pd_extension && $pd_extension !=null && $pd_extension->status ==1){ 
                            $action .= '<a class="dropdown-item" href="javascript:;"><i class="fa-solid fa-clock mr-2"></i>' . __('Pending') . '</a>';
                        }else{
                            $action .= '<a data-project-id="' . $row->id . '" class="dropdown-item project-deadline-extension" href="javascript:;"><i class="fa fa-plus mr-2"></i>' . __('Extend Deadline') . '</a>';
                        }
                    }
                    $pm_project= PMProject::where('project_id',$row->id)->first();
                    if(Auth::user()->role_id == 4 && $pm_project->delayed_status == 0)
                    {
                        $action .= '<a href="' . route('request-extension', [$row->id]) . '" class="dropdown-item"><i class="fa fa-plus mr-2"></i>' . __('Request extension') . '</a>';

                    }

            $action .= '<a href="' . route('projects.show', [$row->id]) . '" class="dropdown-item"><i class="fa fa-eye mr-2"></i>' . __('app.view') . '</a>';
            if ($row->status == 'under review' && Auth::user()->role_id == 1) {
                $action .= '<a href="' . route('project-accept', [$row->id]) . '" class="dropdown-item"><i class="fa fa-check-circle mr-2"></i>' . __('Accept') . '</a>';

                $action .= '<a href="' . route('project-deny', [$row->id]) . '" class="dropdown-item"><i class="fa fa-minus-circle mr-2"></i>' . __('Deny') . '</a>';
            }

            if (
                $this->editProjectsPermission == 'all'
                || ($this->editProjectsPermission == 'added' && user()->id == $row->added_by)
                || ($this->editProjectsPermission == 'owned' && user()->id == $row->client_id && in_array('client', user_roles()))
                || ($this->editProjectsPermission == 'owned' && in_array(user()->id, $memberIds) && in_array('employee', user_roles()))
                || ($this->editProjectsPermission == 'both' && (user()->id == $row->client_id || user()->id == $row->added_by))
                || ($this->editProjectsPermission == 'both' && in_array(user()->id, $memberIds) && in_array('employee', user_roles()))
            ) {
                $action .= '<a class="dropdown-item openRightModal" href="' . route('projects.edit', [$row->id]) . '">
                            <i class="fa fa-edit mr-2"></i>
                            ' . trans('app.edit') . '
                        </a>';
            }


            if ($this->viewGanttPermission == 'all' || ($this->viewGanttPermission == 'added' && user()->id == $row->added_by) || ($this->viewGanttPermission == 'owned' && user()->id == $row->client_id)) {
                $action .= '<a class="dropdown-item" href="' . route('projects.show', $row->id) . '?tab=gantt' . '">
                            <i class="fa fa-project-diagram mr-2"></i>
                            ' . trans('modules.projects.viewGanttChart') . '
                        </a>';
            }

            $action .= '<a class="dropdown-item" target="_blank" href="' . route('front.gantt', $row->hash) . '">
                    <i class="fa fa-share-square mr-2"></i>
                    ' . trans('modules.projects.viewPublicGanttChart') . '
                </a>';

            $action .= '<a class="dropdown-item" target="_blank" href="' . route('front.taskboard', $row->hash) . '">
                    <i class="fa fa-share-square mr-2"></i>
                    ' . trans('app.public') . ' ' . __('modules.tasks.taskBoard') . '
                </a>';

            if (
                $this->deleteProjectPermission == 'all'
                || ($this->deleteProjectPermission == 'added' && user()->id == $row->added_by)
                || ($this->deleteProjectPermission == 'owned' && user()->id == $row->client_id && in_array('client', user_roles()))
                || ($this->deleteProjectPermission == 'owned' && in_array(user()->id, $memberIds) && in_array('employee', user_roles()))
                || ($this->deleteProjectPermission == 'both' && (user()->id == $row->client_id || user()->id == $row->added_by))
                || ($this->deleteProjectPermission == 'both' && in_array(user()->id, $memberIds) && in_array('employee', user_roles()))
            ) {
                $action .= '<a class="dropdown-item archive" href="javascript:;" data-user-id="' . $row->id . '">
                            <i class="fa fa-archive mr-2"></i>
                            ' . trans('app.archive') . '
                        </a>';
                $action .= '<a class="dropdown-item delete-table-row" href="javascript:;" data-user-id="' . $row->id . '">
                            <i class="fa fa-trash mr-2"></i>
                            ' . trans('app.delete') . '
                        </a>';
            }

            $action .= '</div>
                </div>
            </div>';

            return $action;
        });
        $datatables->addColumn('members', function ($row) {
            if ($row->public) {
                return '--';
            }

            $members = '<div class="position-relative">';

            if (count($row->members) > 0) {
                foreach ($row->members as $key => $member) {
                    if ($key < 4) {
                        $img = '<img data-toggle="tooltip" data-original-title="' . mb_ucwords($member->user->name) . '" src="' . $member->user->image_url . '">';

                        $position = $key > 0 ? 'position-absolute' : '';
                        $members .= '<div class="taskEmployeeImg rounded-circle ' . $position . '" style="left:  ' . ($key * 13) . 'px"><a href="' . route('employees.show', $member->user->id) . '">' . $img . '</a></div> ';
                    }
                }
            } else {
                $members .= '<a href="' . route('projects.show', $row->id) . '?tab=members" class="f-12 text-dark-grey"><i class="fa fa-plus" ></i> ' . __('modules.projects.addMemberTitle') . '</a>';
            }

            if (count($row->members) > 4) {
                $members .= '<div class="taskEmployeeImg more-user-count text-center rounded-circle bg-amt-grey position-absolute" style="left:  52px"><a href="' . route('projects.show', $row->id) . '?tab=members" class="text-dark f-10">+' . (count($row->members) - 4) . '</a></div> ';
            }

            $members .= '</div>';

            return $members;
        });
        $datatables->addColumn('name', function ($row) {
            $members = [];

            if (count($row->members) > 0) {

                foreach ($row->members as $member) {
                    $members[] = $member->user->name;
                }

                return implode(',', $members);
            }
        });
        $datatables->addColumn('project', function ($row) {
            return ucfirst($row->project_name);
        });
        $datatables->addColumn('project_value', function ($row) {
            $project_id = Project::where('id', $row->id)->first();
            $deal = Deal::where('id', $project_id->deal_id)->first();
            $currency = Currency::where('id', $deal->original_currency_id)->first();

            //dd($deal);
            if ($deal->upsell_amount == 0) {
                $project_value = $deal->actual_amount . $currency->currency_symbol ;
            }else
            {
                $project_value = $deal->actual_amount+ $deal->upsell_actual_amount . $currency->currency_symbol . ('<span class="badge badge-success">Upsold Amount ('.$deal->upsell_actual_amount.$currency->currency_symbol.')</span>');
            }
            if(Auth::user()->role_id == 6)
            {
                $project_value = 'N/A';

            }


            return $project_value;
        });

        $customFieldsId = $customFields->pluck('id');
        $fieldData = DB::table('custom_fields_data')->where('model', 'App\Models\Project')->whereIn('custom_field_id', $customFieldsId)->select('id', 'custom_field_id', 'model_id', 'value')->get();

        foreach ($customFields as $customField) {
            $datatables->addColumn($customField->name, function ($row) use ($fieldData, $customField) {

                $finalData = $fieldData->filter(function ($value) use ($customField, $row) {
                    return $value->custom_field_id == $customField->id && $value->model_id == $row->id;
                })->first();

                if ($customField->type == 'select') {
                    $data = $customField->values;
                    $data = json_decode($data); // string to array

                    return $finalData ? (($finalData->value >= 0 && $finalData->value != null) ? $data[$finalData->value] : '--') : '--';
                }

                return $finalData ? $finalData->value : '--';
            });
        }

        $datatables->editColumn('project_name', function ($row) {
            $pin = '';
            $deal = Deal::find($row->deal_id);
            $category = ProjectPmGoal::where('project_id',$row->id)->first();
            if (($row->pinned_project)) {
                $pin .= '<span class="badge badge-secondary"><i class="fa fa-thumbtack"></i> ' . __('app.pinned') . '</span>';
            }

            if (($row->public)) {
                $pin = '<span class="badge badge-primary"><i class="fa fa-globe"></i> ' . __('app.public') . '</span>';
            }
            if ($row->status == 'not started' && Auth::user()->role_id == 4) {
                $html = '<div class="media align-items-center">
                          <div class="media-body">
                      <h5 class="mb-0 f-13 text-darkest-grey"><a>' . ucfirst($row->project_name) . '</a></h5>
                      <p class="mb-0">' . $pin . '</p>';
                if ($deal->project_type == 'hourly') {
                    $html .= '<span class="badge badge-success">Hourly</span>';
                }
                if ($category != null) {
                    $html .= '<span class="badge badge-primary">'.$category->project_category.'</span>';
                }
                $html .= '</div>
                  </div>';
                return $html;
            } else {
                $html = '<div class="media align-items-center">
                          <div class="media-body">
                      <h5 class="mb-0 f-13 text-darkest-grey"><a title="' . ucfirst($row->project_name) . '" href="' . route('projects.show', [$row->id]) . '">' . ucfirst(Str::limit($row->project_name, 15)) . '</a></h5>
                      <p class="mb-0">' . $pin . '</p>';
                if ($deal->project_type == 'hourly') {
                    $html .= '<span class="badge badge-success">Hourly</span>';
                }
                if ($category != null) {
                    $html .= '<span class="badge badge-primary">'.$category->project_category.'</span>';
                }
                $html .= '</div>
                  </div>';
                return $html;
            }
        });
        $datatables->editColumn('start_date', function ($row) {
            return $row->start_date->format($this->global->date_format);
        });
        $datatables->editColumn('project_award_time', function ($row) {

            $proejct_awart_time= PMProject::where('project_id',$row->id)->first();
            return $proejct_awart_time->created_at;
        });
        $datatables->editColumn('deadline', function ($row) {

            if (is_null($row->deadline)) {
                return '--';
            }
            if ($row->status == 'finished') {
                return '<span style="color:green;;"><strong>' . $row->deadline->format($this->global->date_format) . '</strong></span>';
            } else {
                if ($row->deadline->endOfDay()->isPast()) {
                    return '<span style="color:#d50000;"><strong>' . $row->deadline->format($this->global->date_format) . '</strong></span>';
                } elseif ($row->deadline->isToday()) {
                    return '<span style="color:#ef5350;">' . __('app.today') . '</span>';
                }
            }


            // elseif($row->deadline->isToday()+1 ){
            //     return '<span class="text-warning">' . __('Tommorow') . '</span>';
            // }
            return '<span >' . $row->deadline->format($this->global->date_format) . '</span>';

            // return '--';
        });


        $datatables->addColumn('client_name', function ($row) {
            if (!is_null($row->client_id)) {
                return $row->client->name;
            }
        });
        $datatables->addColumn('hours_allocated', function ($row) {
            $project = Project::where('id', $row->id)->first();
            if (!is_null($project->hours_allocated)) {
                return $project->hours_allocated . ' hours';
            } else {
                return '--';
            }
        });
        $datatables->addColumn('hours_logged', function ($row) {
            $project = Project::where('id', $row->id)->first();
            $project_time_logs_hours = ProjectTimeLog::where('project_id', $project->id)->sum('total_hours');
            $project_time_logs_minutes = ProjectTimeLog::where('project_id', $project->id)->sum('total_minutes');
            $project_time_logs =  ($project_time_logs_minutes / 60);
            $project_time_minutes = $project_time_logs_minutes % 60;

            $currentTime = Carbon::now();
            $totalMinutes = DB::table('project_time_logs')
                ->where('project_id', $row->id)
                ->whereNull('end_time')
                ->select(DB::raw("SUM(TIME_TO_SEC(TIMEDIFF('$currentTime', start_time)))/60 as total_minutes"))
                ->value('total_minutes');
            $active_time_hours = intval(round($totalMinutes, 1) / 60);
            $active_time_minutes = intval(round($totalMinutes, 1) % 60);
            $update_hours = $project_time_minutes + $active_time_minutes / 60;
            $update_minutes = $project_time_minutes + $active_time_minutes / 60;
            // $add_hours = 0;
            if ($project_time_minutes + $active_time_minutes >= 60) {
                $add_hours = intval(round(($project_time_minutes + $active_time_minutes) / 60, 1));
                $add_minutes = ($project_time_minutes + $active_time_minutes) % 60;
            } else {
                $add_hours = 0;
                $add_minutes = $project_time_minutes + $active_time_minutes;
            }



            return intval(round($project_time_logs, 1)) + $active_time_hours + $add_hours . ' hrs ' . $add_minutes . ' mins';
        });
        $datatables->addColumn('client_email', function ($row) {
            if (!is_null($row->client_id)) {
                return $row->client->email;
            }
        })
            ->addColumn('deliverable_sign', function ($row) {

                //  dd($row->added_by->name);
                //return $row->won_lost;
                $sign = ContractSign::where('project_id', $row->id)->first();

                if ($sign != null) {

                    return '<badge style="background-color:#00aa00 !important;" class="badge badge-success text-center">Yes</badge>';
                } else {
                    return '<badge style="background-color:#FF0000 !important;" class="badge badge-danger text-center">No</badge>';
                }
            })
            ->addColumn('project_status', function ($row) {
                return $row->status;
            })

            ->editColumn('client_id', function ($row) {
                if (is_null($row->client_id)) {
                    return '';
                }

                return view('components.client', [
                    'user' => $row->client
                ]);
            });
        $datatables->editColumn('status', function ($row) {

           // dd($row);

            $projectStatus = ProjectStatusSetting::all();

            foreach ($projectStatus as $status) {
                $var = Project::where('id', $row->id)->first();
                if ($var->delayed_status == 1) {
                    $delayed_status = '';
                    $delayed_status .= '<br><span class="badge badge-danger">Delayed</span>' ;
                    # code...
                }else
                {
                    $delayed_status = '';
                }


                if ($row->status == $status->status_name) {
                    $color = $status->color;
                    $text = '';
                    if ($row->status == 'partially finished') {

                        $text .= $var->milestone_cancel_count . ' milestone was canceled $' . $var->milestone_cancel_amount . '';
                    } else {
                        $text = '';
                    }
                    return ' <i class="fa fa-circle mr-1 f-10" style="color:' . $color . '"></i>' . '<span class="text-capitalize" title="' . $text . '">' . ucfirst($status->status_name) . '</span>'.$delayed_status;
                }
            }
        });
        $datatables->editColumn('completion_percent', function ($row) {

            $milestones = ProjectMilestone::where('project_id', $row->id)->count();
            $completed_milestones = ProjectMilestone::where('project_id', $row->id)->where('status', 'complete')->count();



            if ($milestones < 1) {
                $completion = 0;
                $statusColor = 'danger';
            } elseif ($milestones >= 1) {
                $percentage = round(($completed_milestones / $milestones) * 100, 2);
                //dd($percentage);
                if ($percentage < 50) {
                    $completion = $percentage;
                    $statusColor = 'danger';
                } elseif ($percentage >= 50 && $percentage < 75) {
                    $completion = $percentage;
                    $statusColor = 'warning';
                } elseif ($percentage >= 75 && $percentage < 99) {
                    $completion = $percentage;
                    $statusColor = 'info';
                } else {
                    $completion = $percentage;
                    $statusColor = 'success';
                }
            }
            // if ($row->completion_percent < 50) {
            //     $statusColor = 'danger';
            // }
            // elseif ($row->completion_percent >= 50 && $row->completion_percent < 75) {
            //     $statusColor = 'warning';
            // }
            // else {
            //     $statusColor = 'success';
            // }

            return '<div class="progress" style="height: 15px;">
                <div class="progress-bar f-12 bg-' . $statusColor . '" role="progressbar" style="width: ' . $completion . '%;" aria-valuenow="' . $completion . '" aria-valuemin="0" aria-valuemax="100">' . $completion . '%</div>
              </div>';
        });

        $datatables->addColumn('completion_export', function ($row) {
            return $row->completion_percent . '% ' . __('app.complete');
        });
        $datatables->addColumn('short_code', function ($row) {
            if ($row->status == 'not started' && Auth::user()->role_id == 4) {
                return  '<div class="media align-items-center">
                          <div class="media-body">
                      <h5 class="mb-0 f-13 text-darkest-grey"><a>' . ucfirst($row->project_short_code) . '</a></h5>

                      </div>
                  </div>';
            } else {
                return  '<div class="media align-items-center">
                          <div class="media-body">
                      <h5 class="mb-0 f-13 text-darkest-grey"><a href="' . route('projects.show', [$row->id]) . '">' . ucfirst($row->project_short_code) . '</a></h5>

                      </div>
                  </div>';
            }

            //  return ucfirst($row->project_short_code);
        });
        $datatables->addColumn('project_manager', function ($row) {

            if ($row->pm_id != null) {
                $project_manager = ucfirst($row->salutation) . ' ' . ucfirst($row->pm->name);

                return '<div class="media align-items-center">
                          <div class="media-body">
                      <h5 class="mb-0 f-13 text-darkest-grey"><a href="' . route('employees.show', [$row->pm_id]) . '">' . $project_manager . '</a></h5>

                      </div>
                    </div>';
            } else {
                return '--';
            }

            //  return $row->pm->name;
        });

        $datatables->addIndexColumn();
        $datatables->setRowId(function ($row) {
            return 'row-' . $row->id;
        });

        $datatables->addColumn('tasks', function ($row) {
            $tasks = $row->tasks;
            $completed = 0;

            foreach ($tasks as $value) {
                if ($value->status == 'completed') {
                    $completed = $completed + 1;
                }
            }

            return '(' . $completed . ' / ' . $tasks->count() . ')';
        });

        $datatables->addColumn('milestone', function ($row) {
            $data = $row->milestones;
            $completed = 0;

            foreach ($data as $value) {
                if ($value->status == 'complete') {
                    $completed = $completed + 1;
                }
            }

            return '(' . $completed . ' / ' . $data->count() . ')';
        });
        $datatables->rawColumns(['project_name','pm_id', 'action', 'completion_percent', 'members', 'status', 'client_id', 'check', 'short_code', 'project_manager', 'deliverable_sign', 'deadline', 'hours_allocated','project_value']);
        $datatables->removeColumn('project_summary');
        $datatables->removeColumn('notes');
        $datatables->removeColumn('category_id');
        $datatables->removeColumn('feedback');

        return $datatables;
    }

    /**
     * @param Project $model
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function query(Project $model)
    {
        $request = $this->request();
        //dd($request);
        $model = $model
            ->with('members', 'members.user', 'client', 'client.clientDetails', 'currency', 'client.session')
            ->leftJoin('p_m_projects', 'p_m_projects.project_id', 'projects.id')
            ->leftJoin('project_members', 'project_members.project_id', 'projects.id')
            ->leftJoin('users', 'project_members.user_id', 'users.id')
            ->leftJoin('users as client', 'projects.client_id', 'users.id')
            ->selectRaw('projects.id, projects.deal_id, projects.pm_id, projects.project_short_code, projects.hash, projects.added_by, projects.project_name, projects.start_date, projects.deadline, projects.client_id,
              projects.completion_percent, projects.project_budget, projects.currency_id,
            projects.status, users.name, client.name as client_name, client.email as client_email, projects.public,
           ( select count("id") from pinned where pinned.project_id = projects.id and pinned.user_id = ' . user()->id . ') as pinned_project');

        if ($request->pinned == 'pinned') {
            $model->join('pinned', 'pinned.project_id', 'projects.id');
            $model->where('pinned.user_id', user()->id);
        }

        if (!is_null($request->status) && $request->status != 'all') {
            if ($request->status == 'not finished') {
                $model->where('projects.completion_percent', '!=', 100);
            } else if ($request->status == 'overdue') {
                $model->where('projects.completion_percent', '!=', 100);
                $model->where('projects.status', '<>', 'canceled');

                if ($request->deadLineStartDate == '' && $request->deadLineEndDate == '') {
                    $model->whereDate('projects.deadline', '<', now(global_setting()->timezone)->toDateString());
                }
            } else {
                $model->where('projects.status', $request->status);
            }
        }

        if ($request->deadLineStartDate != '' && $request->deadLineEndDate != '') {
            $startDate = Carbon::createFromFormat($this->global->date_format, $request->deadLineStartDate)->toDateString();
            $endDate = Carbon::createFromFormat($this->global->date_format, $request->deadLineEndDate)->toDateString();
            $model->whereRaw('Date(projects.deadline) >= ?', [$startDate])->whereRaw('Date(projects.deadline) <= ?', [$endDate]);
        }

        if (!is_null($request->client_id) && $request->client_id != 'all') {
            $model->where('projects.client_id', $request->client_id);
        }

        if (!is_null($request->team_id) && $request->team_id != 'all') {
            $model->where('team_id', $request->team_id);
        }

        if (!is_null($request->category_id) && $request->category_id != 'all') {
            $model->where('category_id', $request->category_id);
        }

        if (!is_null($request->employee_id) && $request->employee_id != 'all') {
            $model->where('project_members.user_id', $request->employee_id);
        }

        if ($this->viewProjectPermission == 'added') {
            $model->where(function ($query) {

                return $query->where('projects.added_by', user()->id)
                    ->orWhere('projects.public', 1);
            });
        }

        if ($this->viewProjectPermission == 'owned' && in_array('employee', user_roles())) {
            $model->where(function ($query) {
                return $query->where('project_members.user_id', user()->id)
                    ->orWhere('projects.public', 1);
            });
        }

        if ($this->viewProjectPermission == 'both' && in_array('employee', user_roles())) {
            $model->where(function ($query) {
                return $query->where('projects.added_by', user()->id)
                    ->orWhere('project_members.user_id', user()->id)
                    ->orWhere('projects.public', 1);
            });
        }

        if ($request->searchText != '') {
            $model->where(function ($query) {
                $query->where('projects.project_name', 'like', '%' . request('searchText') . '%')
                    ->orWhere('users.name', 'like', '%' . request('searchText') . '%')
                    ->orWhere('projects.project_short_code', 'like', '%' . request('searchText') . '%'); // project short code
            });
        }

        if ($request->startDate && $request->endDate) {
            $startDate = Carbon::createFromFormat($this->global->date_format, $request->startDate)->toDateString();
            $endDate = Carbon::createFromFormat($this->global->date_format, $request->endDate)->toDateString();
            $model->whereBetween(DB::raw('DATE(p_m_projects.`created_at`)'), [$startDate, $endDate]);
        }

        $model->groupBy('projects.id');
        $model->orderBy('id', 'desc');
        return $model;
    }

    /**
     * Optional method if you want to use html builder.
     *
     * @return \Yajra\DataTables\Html\Builder
     */
    public function html()
    {
        return $this->builder()
            ->setTableId('projects-table')
            ->columns($this->getColumns())
            ->minifiedAjax()
            // ->orderBy(1)
            ->destroy(true)
            ->responsive(true)
            ->serverSide(true)
            ->processing(true)
            ->dom($this->domHtml)

            ->language(__('app.datatable'))
            ->parameters([
                'initComplete' => 'function () {
                    window.LaravelDataTables["projects-table"].buttons().container()
                     .appendTo( "#table-actions")
                 }',
                'fnDrawCallback' => 'function( oSettings ) {
                    $("body").tooltip({
                        selector: \'[data-toggle="tooltip"]\'
                    })
                }',
                'scrollX' => true
            ])
            ->buttons(Button::make(['extend' => 'excel', 'text' => '<i class="fa fa-file-export"></i> ' . trans('app.exportExcel')]));
    }

    /**
     * Get columns.
     *
     * @return array
     */
    protected function getColumns()
    {
        $project = new Project();
        $customFieldsGroupsId = CustomFieldGroup::where('model', $project->customFieldModel)->pluck('id')->first();
        $customFields = CustomField::where('custom_field_group_id', $customFieldsGroupsId)->where('export', 1)->get();
        $customFieldsDataMerge = [];

        $data = [
            'check' => [
                'title' => '<input type="checkbox" name="select_all_table" id="select-all-table" onclick="selectAllTable(this)">',
                'exportable' => false,
                'orderable' => false,
                'searchable' => false,
                'visible' => !in_array('client', user_roles())
            ],
            '#' => ['data' => 'DT_RowIndex', 'orderable' => false, 'searchable' => false, 'visible' => true],
            // __('app.id') => ['data' => 'id', 'name' => 'id', 'title' => __('app.id')],
            __('modules.taskCode') => ['data' => 'short_code', 'name' => 'project_short_code', 'visible' => false, 'title' => __('modules.taskCode')],
            __('modules.projects.projectName') => ['data' => 'project_name', 'name' => 'project_name', 'exportable' => false, 'title' => __('modules.projects.projectName')],
            __('app.project') => ['data' => 'project', 'name' => 'project_name', 'visible' => false, 'title' => __('app.project')],
            __('app.client') => ['data' => 'client_id', 'name' => 'client_id', 'width' => '15%', 'exportable' => false, 'title' => __('app.client')],
            __('app.client') . ' ' . __('app.email')  => ['data' => 'client_email', 'name' => 'client_id', 'visible' => false, 'title' => __('app.client') . ' ' . __('app.email')],
            __('app.customers')  => ['data' => 'client_name', 'name' => 'client_id', 'visible' => false, 'title' => __('app.customers')],
            __('app.project_value') => ['data' => 'project_value', 'name' => 'project_value',  'title' => __('Project Value')],
            __('app.project_manager') => ['data' => 'project_manager', 'name' => 'project_manager',  'title' => __('Project Manager')],

            __('modules.projects.startDate')  => ['data' => 'start_date', 'name' => 'start_date', 'visible' => true, 'title' => __('modules.projects.startDate')],
            __('modules.project_award_time')  => ['data' => 'project_award_time', 'name' => 'project_award_time', 'visible' => true, 'title' => __('Project Award Time')],
            __('app.deadline') => ['data' => 'deadline', 'name' => 'deadline', 'title' => __('app.deadline')],
            __('app.hours_allocated') => ['data' => 'hours_allocated', 'name' => 'hours_allocated',  'title' => __('Estimated Hours')],
            __('app.hours_logged') => ['data' => 'hours_logged', 'name' => 'hours_logged',  'title' => __('Total Hours Logged')],
            __('app.tasks') => ['data' => 'tasks', 'name' => 'tasks',  'title' => __('Tasks')],
            __('app.milestone') => ['data' => 'milestone', 'name' => 'milestone',  'title' => __('Milestones')],
            #delivarable
            __('app.progress') => ['data' => 'completion_percent', 'name' => 'completion_percent', 'exportable' => false, 'title' => __('app.progress')],
            __('app.deliverable_sign') => ['data' => 'deliverable_sign', 'name' => 'deliverable_sign',  'title' => __('Deliverable Signed')],
            __('app.status') => ['data' => 'status', 'name' => 'status', 'width' => '16%', 'exportable' => false, 'title' => __('app.status')],

            // __('modules.projects.members')  => ['data' => 'members', 'name' => 'members', 'exportable' => false, 'width' => '15%', 'title' => __('modules.projects.members')],
            __('modules.projects.projectMembers')  => ['data' => 'name', 'name' => 'name', 'visible' => false, 'title' => __('modules.projects.projectMembers')],
            __('app.completion') => ['data' => 'completion_export', 'name' => 'completion_export', 'visible' => false, 'title' => __('app.completion')],
            __('app.project') . ' ' . __('app.status') => ['data' => 'project_status', 'name' => 'status', 'visible' => false, 'title' => __('app.project') . ' ' . __('app.status')],
            Column::computed('action', __('app.action'))
                ->exportable(false)
                ->printable(false)
                ->orderable(false)
                ->searchable(false)
                ->addClass('text-right pr-20')
        ];



        foreach ($customFields as $customField) {
            $customFieldsData = [$customField->name => ['data' => $customField->name, 'name' => $customField->name, 'title' => $customField->name, 'visible' => false]];
            $customFieldsDataMerge = array_merge($customFieldsDataMerge, $customFieldsData);
        }


        $datamerge = array_merge($data, $customFieldsDataMerge);
        return $datamerge;
    }

    /**
     * Get filename for export.
     *
     * @return string
     */
    protected function filename()
    {
        return 'Projects_' . date('YmdHis');
    }

    public function pdf()
    {
        set_time_limit(0);

        if ('snappy' == config('datatables-buttons.pdf_generator', 'snappy')) {
            return $this->snappyPdf();
        }

        $pdf = app('dompdf.wrapper');
        $pdf->loadView('datatables::print', ['data' => $this->getDataForPrint()]);

        return $pdf->download($this->getFilename() . '.pdf');
    }
}
