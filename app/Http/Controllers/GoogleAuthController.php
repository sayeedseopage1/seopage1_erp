<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Models\Setting;
use App\Services\Google;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class GoogleAuthController extends Controller
{

    public function index(Request $request, Google $google)
    {
        if (!$request->code) {
            /** @phpstan-ignore-next-line */
            return redirect($google->createAuthUrl());
        }

        /** @phpstan-ignore-next-line */
        $google->authenticate($request->code);
        $account = $google->service('Oauth2')->userinfo->get();
        $googleAccount = Setting::first();

        if (empty($googleAccount->user_id) && empty($googleAccount->google_id) && empty($googleAccount->name) && empty($googleAccount->token)) {
            Session::flash('message', __('app.googleCalendar').' '. __('app.account').' '. __('app.connected').' '. __('app.successfully'));
        }
        else {
            Session::flash('message', __('menu.googleCalendar').' '. __('app.account').' '. __('app.update').' '. __('app.successfully'));
        }

        $googleAccount->google_calendar_verification_status = 'verified';
        $googleAccount->google_id = $account->id;
        $googleAccount->name = $account->name;
        /** @phpstan-ignore-next-line */
        $googleAccount->token = $google->getAccessToken();
        $googleAccount->update();

        return redirect()->route('google-calendar-settings.index');
    }

    public function destroy()
    {
        $googleAccount = Setting::first();
        $googleAccount->google_calendar_verification_status = 'non_verified';
        $googleAccount->google_id = '';
        $googleAccount->name = '';
        $googleAccount->token = '';
        $googleAccount->save();

        session()->forget('company_setting');
        session()->forget('company');

        return Reply::success(__('messages.googleCalendar.removedSuccess'));
    }

}
