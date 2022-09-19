<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Http\Requests\ProjectMembers\SaveGroupMembers;
use App\Http\Requests\ProjectMembers\StoreProjectMembers;
use App\Models\EmployeeDetails;
use App\Models\Project;
use App\Models\ProjectMember;
use App\Models\ProjectTemplate;
use App\Models\Team;
use App\Models\User;
use App\Models\ProjectTemplateMember;

class ProjectTemplateMemberController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.projects';
        $this->middleware(function ($request, $next) {
            abort_403(!in_array('projects', $this->user->modules));
            return $next($request);
        });
    }

    /**
     * XXXXXXXXXXX
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $id = request('id');

        $this->project = ProjectTemplate::findOrFail($id);
        $this->employees = User::doesntHave('templateMember', 'and', function ($query) use ($id) {
            $query->where('project_template_id', $id);
        })
            ->join('role_user', 'role_user.user_id', '=', 'users.id')
            ->join('roles', 'roles.id', '=', 'role_user.role_id')
            ->select('users.id', 'users.name', 'users.email', 'users.created_at', 'users.image')
            ->where('roles.name', 'employee')
            ->groupBy('users.id')
            ->get();
        $this->groups = Team::all();
        $this->projectId = $id;
        return view('project-templates.project-member.create', $this->data);
    }

    /**
     * @param StoreProjectMembers $request
     * @return array
     * @throws \Froiden\RestAPI\Exceptions\RelatedResourceNotFoundException
     */
    public function store(StoreProjectMembers $request)
    {
        $users = $request->user_id;

        foreach ($users as $user) {
            $member = new ProjectTemplateMember();
            $member->user_id = $user;
            $member->project_template_id = $request->project_id;
            $member->save();
        }

        return Reply::success(__('messages.membersAddedSuccessfully'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $projectMember = ProjectTemplateMember::findOrFail($id);

        $projectMember->delete();

        return Reply::success(__('messages.memberRemovedFromProject'));
    }

    public function storeGroup(SaveGroupMembers $request)
    {
        $groups = $request->group_id;
        $project = Project::find($request->project_id);

        foreach ($groups as $group) {

            $members = EmployeeDetails::join('users', 'users.id', '=', 'employee_details.user_id')
                ->where('employee_details.department_id', $group)
                ->where('users.status', 'active')
                ->select('employee_details.*')
                ->get();

            foreach ($members as $user) {
                $check = ProjectMember::where('user_id', $user->user_id)->where('project_id', $request->project_id)->first();

                if (is_null($check)) {
                    $member = new ProjectMember();
                    $member->user_id = $user->user_id;
                    $member->project_id = $request->project_id;
                    $member->save();
                }
            }
        }

        return Reply::success(__('messages.membersAddedSuccessfully'));
    }

}
