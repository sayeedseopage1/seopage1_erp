<?php

namespace App\Http\Controllers;

use App\Helper\Files;
use App\Helper\Reply;
use App\Http\Requests\User\UpdateProfile;
use App\Models\EmployeeDetails;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ProfileController extends AccountBaseController
{

    public function update(UpdateProfile $request, $id)
    {
        // For profile image to be uploaded locally
        config(['filesystems.default' => 'local']);

        $user = User::withoutGlobalScope('active')->findOrFail($id);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->salutation = $request->salutation;
        $user->gender = $request->gender;
        $user->country_id = $request->phone_code;
        $user->mobile = $request->mobile;
        $user->email_notifications = $request->email_notifications;
        $user->locale = $request->locale;
        $user->rtl = $request->rtl;
        $user->google_calendar_status = $request->google_calendar_status;

        if (!is_null($request->password)) {
            $user->password = Hash::make($request->password);
        }

        if ($request->image_delete == 'yes') {
            Files::deleteFile($user->image, 'avatar');
            $user->image = null;
        }

        if ($request->hasFile('image')) {
            Files::deleteFile($user->image, 'avatar');
            $user->image = Files::upload($request->image, 'avatar', 300);
        }

        if ($request->has('telegram_user_id')) {
            $user->telegram_user_id = $request->telegram_user_id;
        }

        $user->save();

        if ($user->clientDetails) {
            $fields = $request->only($user->clientDetails->getFillable());

            $user->clientDetails->fill($fields);
            $user->clientDetails->save();
        }

        // adding address to employee_details
        $this->addEmployeeDetail($request, $user);
        session()->forget('user');

        $this->logUserActivity($user->id, 'messages.updatedProfile');

        $redirectUrl = urldecode($request->redirect_url);

        if ($redirectUrl == '') {
            $redirectUrl = route('profile-settings.index');
        }

        return Reply::successWithData(__('messages.profileUpdated'), ['redirectUrl' => $redirectUrl]);
    }

    public function addEmployeeDetail($request, $user)
    {
        $employee = EmployeeDetails::where('user_id', $user->id)->first();

        if (empty($employee)) {
            $employee = new EmployeeDetails();
            $employee->user_id = $user->id;
        }

        $employee->date_of_birth = $request->date_of_birth ? Carbon::createFromFormat($this->global->date_format, $request->date_of_birth)->format('Y-m-d') : null;
        $employee->address = $request->address;
        $employee->slack_username = $request->slack_username;
        $employee->about_me = $request->about_me;
        $employee->save();
    }

    public function darkTheme(Request $request)
    {
        $user = user();
        $user->dark_theme = $request->darkTheme;
        $user->save();
        session()->forget('user');
        return Reply::success(__('messages.settingsUpdated'));
    }

    public function updateOneSignalId(Request $request)
    {
        $user = user();
        $user->onesignal_player_id = $request->userId;
        $user->save();
        session()->forget('user');
    }

}
