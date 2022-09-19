<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Http\Requests\TicketEmailSetting\UpdateRequest;
use App\Models\TicketEmailSetting;
use Illuminate\Http\Request;

class TicketEmailSettingController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.emailSync';
        $this->activeSettingMenu = 'ticket_settings';
    }

    public function update(UpdateRequest $request, $id)
    {
        $emailSetting = TicketEmailSetting::find($id);
        $data = $request->all();

        if ($request->has('status')) {
            $data['status'] = 1;

        } else {
            $data['status'] = 0;
        }

        $emailSetting->update($data);
        return Reply::success(__('messages.updatedSuccessfully'));

    }

}
