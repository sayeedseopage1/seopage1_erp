<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Http\Requests\TicketAgentGroups\StoreAgentGroup;
use App\Models\TicketAgentGroups;
use App\Models\TicketGroup;
use App\Models\User;
use Illuminate\Http\Request;

class TicketAgentController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.ticketAgents';
        $this->activeSettingMenu = 'ticket_settings';
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $this->employees = User::doesntHave('agent')
            ->join('role_user', 'role_user.user_id', '=', 'users.id')
            ->join('roles', 'roles.id', '=', 'role_user.role_id')
            ->select('users.id', 'users.name', 'users.email', 'users.created_at')
            ->where('roles.name', 'employee')
            ->get();
        $this->groups = TicketGroup::all();
        return view('ticket-settings.create-agent-modal', $this->data);

    }

    public function store(StoreAgentGroup $request)
    {
        $users = $request->user_id;

        foreach ($users as $user) {
            $agent = new TicketAgentGroups();
            $agent->agent_id = $user;
            $agent->group_id = $request->group_id;
            $agent->added_by = user()->id;
            $agent->save();
        }

        if (request()->ajax()) {
            $groups = TicketGroup::with('enabledAgents', 'enabledAgents.user')->get();
            $agentList = '';

            foreach ($groups as $group) {
                if (count($group->enabledAgents) > 0) {

                    $agentList .= '<optgroup label="' . mb_ucwords($group->group_name) . '">';

                    foreach ($group->enabledAgents as $agent) {
                        $agentList .= '<option value="' . $agent->user->id . '">' . mb_ucwords($agent->user->name) . ' [' . $agent->user->email . ']' . '</option>';
                    }

                    $agentList .= '</optgroup>';
                }
            }

            return Reply::successWithData(__('messages.agentAddedSuccessfully'), ['teamData' => $agentList]);
        }

        return Reply::success(__('messages.agentAddedSuccessfully'));
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
        $agent = TicketAgentGroups::findOrFail($id);
        $agent->status = $request->status;
        $agent->last_updated_by = user()->id;
        $agent->save();

        return Reply::success(__('messages.statusUpdatedSuccessfully'));
    }

    public function updateGroup(Request $request, $id)
    {
        $agent = TicketAgentGroups::findOrFail($id);
        $agent->group_id = $request->groupId;
        $agent->last_updated_by = user()->id;
        $agent->save();

        return Reply::success(__('messages.groupUpdatedSuccessfully'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        TicketAgentGroups::destroy($id);

        return Reply::success(__('messages.agentRemoveSuccess'));
    }

}
