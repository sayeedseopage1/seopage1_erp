<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Http\Requests\LeadSetting\StoreLeadAgent;
use App\Models\LeadAgent;
use App\Models\User;

class LeadAgentSettingController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->middleware(function ($request, $next) {
            abort_403(!in_array('leads', $this->modules));
            return $next($request);
        });
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $this->addPermission = user()->permission('add_lead_agent');

        abort_403(!in_array($this->addPermission, ['all', 'added']));

        $this->employees = User::doesntHave('leadAgent')
            ->join('role_user', 'role_user.user_id', '=', 'users.id')
            ->join('roles', 'roles.id', '=', 'role_user.role_id')
            ->select('users.id', 'users.name', 'users.email', 'users.created_at', 'users.image')
            ->where('roles.name', 'employee')
            ->get();

        return view('lead-settings.create-agent-modal', $this->data);
    }

    public function store(StoreLeadAgent $request)
    {
        $this->addPermission = user()->permission('add_lead_agent');
        abort_403(!in_array($this->addPermission, ['all', 'added']));

        $users = $request->agent_name;

        foreach ($users as $user) {
            $agent = new LeadAgent();
            $agent->user_id = $user;
            $agent->save();
        }

        $leadAgents = LeadAgent::with('user')->whereHas('user', function ($q) {
            $q->where('status', 'active');
        })->get();

        $list = '<option value="">--</option>';

        foreach ($leadAgents as $item) {

            $list .= '<option
                data-content="<div class=\'d-inline-block mr-1\'><img class=\'taskEmployeeImg rounded-circle\' src=' . $item->user->image_url . ' ></div> ' . ucfirst($item->user->name) . '"
                value="' . $item->id . '"> ' . $item->user->name . ' </option>';
        }

        return Reply::successWithData(__('messages.leadStatusAddSuccess'), ['data' => $list]);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $leadAgent = LeadAgent::findOrFail($id);
        $this->deletePermission = user()->permission('delete_lead_agent');

        abort_403(!($this->deletePermission == 'all' || ($this->editPermission == 'added' && $leadAgent->added_by == user()->id)));

        LeadAgent::destroy($id);
        $agentData = LeadAgent::select('lead_agents.id', 'lead_agents.user_id', 'users.name')
            ->join('users', 'users.id', 'lead_agents.user_id')
            ->get();
        $employeeData = User::doesntHave('leadAgent')
            ->join('role_user', 'role_user.user_id', '=', 'users.id')
            ->join('roles', 'roles.id', '=', 'role_user.role_id')
            ->select('users.id', 'users.name', 'users.email', 'users.created_at')
            ->where('roles.name', 'employee')
            ->get();

        $empDatas = [];

        foreach ($employeeData as $empData) {
            $empDatas[] = ['name' => $empData->name, 'email' => $empData->email, 'id' => $empData->id, 'created_at' => $empData->created_at,];
        }

        return Reply::successWithData(__('messages.leadStatusDeleteSuccess'), ['data' => $agentData, 'empData' => $empDatas]);

    }

}
