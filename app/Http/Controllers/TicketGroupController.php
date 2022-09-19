<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Http\Requests\TicketGroups\StoreTicketGroup;
use App\Models\BaseModel;
use App\Models\TicketGroup;

class TicketGroupController extends AccountBaseController
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
        $this->groups = TicketGroup::all();
        return view('ticket-settings.group-modal', $this->data);
    }

    /**
     * @param StoreTicketGroup $request
     * @return array
     * @throws \Froiden\RestAPI\Exceptions\RelatedResourceNotFoundException
     */
    public function store(StoreTicketGroup $request)
    {
        $group = new TicketGroup();
        $group->group_name = $request->group_name;
        $group->save();

        $groups = TicketGroup::all();
        $options = BaseModel::options($groups, null, 'group_name');

        return Reply::successWithData(__('messages.groupAddedSuccess'), ['data' => $options]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        TicketGroup::destroy($id);
        return Reply::success(__('messages.groupDeleteSuccess'));
    }

}
