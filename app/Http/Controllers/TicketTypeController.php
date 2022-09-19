<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Http\Requests\TicketType\StoreTicketType;
use App\Http\Requests\TicketType\UpdateTicketType;
use App\Models\TicketType;

class TicketTypeController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.ticketTypes';
        $this->activeSettingMenu = 'ticket_types';
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $this->ticketTypes = TicketType::all();
        return view('ticket-settings.create-ticket-type-modal', $this->data);
    }

    /**
     * @param StoreTicketType $request
     * @return array
     * @throws \Froiden\RestAPI\Exceptions\RelatedResourceNotFoundException
     */
    public function store(StoreTicketType $request)
    {
        $type = new TicketType();
        $type->type = $request->type;
        $type->save();

        $allTypes = TicketType::all();

        $select = '';

        foreach($allTypes as $type){
            $select .= '<option value="'.$type->id.'">'.mb_ucwords($type->type).'</option>';
        }

        return Reply::successWithData(__('messages.ticketTypeAddSuccess'), ['optionData' => $select]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $this->type = TicketType::findOrFail($id);
        return view('ticket-settings.edit-ticket-type-modal', $this->data);
    }

    /**
     * @param UpdateTicketType $request
     * @param int $id
     * @return array
     * @throws \Froiden\RestAPI\Exceptions\RelatedResourceNotFoundException
     */
    public function update(UpdateTicketType $request, $id)
    {
        $type = TicketType::findOrFail($id);
        $type->type = $request->type;
        $type->save();

        return Reply::success(__('messages.ticketTypeUpdateSuccess'));
    }

    /**
     * @param int $id
     * @return array
     */
    public function destroy($id)
    {
        TicketType::destroy($id);

        return Reply::success(__('messages.ticketTypeDeleteSuccess'));
    }

}
