<?php

namespace App\Http\Controllers;

use Response;
use App\Models\User;
use App\Helper\Reply;
use Illuminate\Http\Request;
use App\Events\TwoFactorCodeEvent;
use App\Http\Requests\TwoFaCodeValidation;

class TwoFASettingController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.twoFactorAuthentication';
        $this->activeSettingMenu = '2fa_settings';
    }

    public function verify()
    {
        $this->method = request()->method;
        $this->status = request()->status;

        return view('auth.password-confirm-modal', $this->data);
    }

    //phpcs:ignore
    public function update(Request $request, $id)
    {
        $user = User::find(user()->id);

        $method = $request->method;
        $twoFaVerifyVia = $method;
        $status = $request->status;
        $currentMethod = $user->two_fa_verify_via;

        if ($currentMethod == $method && $status == 'disable') {
            $twoFaVerifyVia = null;

        } elseif ($currentMethod == 'both') {

            if ($method == 'email' && $status == 'disable') {
                $twoFaVerifyVia = 'google_authenticator';

            } elseif ($method == 'google_authenticator' && $status == 'disable') {
                $twoFaVerifyVia = 'email';
            }
        } elseif ($currentMethod != $method && !is_null($currentMethod) && $status == 'enable') {
            $twoFaVerifyVia = 'both';
        }

        $user->two_fa_verify_via = $twoFaVerifyVia;

        if ($twoFaVerifyVia == 'email' || is_null($twoFaVerifyVia)) {
            $user->two_factor_secret = null;
            $user->two_factor_recovery_codes = null;
            $user->two_factor_confirmed = 0;
        }

        $user->save();
        session()->forget('user');

        return Reply::success(__('messages.statusUpdatedSuccessfully'));
    }

    public function download()
    {
        $user = User::find(auth()->user()->id);

        // Prepare content
        $codes = json_decode(decrypt($user->two_factor_recovery_codes));

        $content = '';

        foreach ($codes as $code) {
            $content .= $code;
            $content .= "\n";
        }

        // File name that will be used in the download
        $fileName = 'codes.txt';

        $headers = ['Content-type' => 'text/plain', 'Content-Disposition' => sprintf('attachment; filename="%s"', $fileName),'Content-Length' => strlen($content)];

        return Response::make($content, 200, $headers);
    }

    public function showConfirm()
    {
        return view('security-settings.ajax.validate-confirm-modal', $this->data);
    }

    public function confirm(TwoFaCodeValidation $request)
    {
        $confirmed = $request->user()->confirmTwoFactorAuth($request->code);

        if (!$confirmed) {
            return Reply::error(__('messages.invalid2FaCode'));
        }

        return Reply::success(__('messages.updateSuccess'));
    }

    public function showEmailConfirm()
    {
        $checkUser = User::find(user()->id);
        $checkUser->generateTwoFactorCode();
        event(new TwoFactorCodeEvent($checkUser));
        return view('security-settings.ajax.validate-email-confirm-modal', $this->data);
    }

    public function emailConfirm(TwoFaCodeValidation $request)
    {
        $user = User::find(user()->id);

        if ($user->two_factor_code != $request->code || $user->two_factor_expires_at->isPast()) {
            return Reply::error(__('messages.invalid2FaCode'));
        }

        $currentMethod = $user->two_fa_verify_via;

        if ($currentMethod == 'google_authenticator') {
            $twoFaVerifyVia = 'both';

        } else {
            $twoFaVerifyVia = 'email';
        }

        if ($twoFaVerifyVia == 'email' || is_null($twoFaVerifyVia)) {
            $user->two_factor_secret = null;
            $user->two_factor_recovery_codes = null;
            $user->two_factor_confirmed = 0;
        }

        $user->two_fa_verify_via = $twoFaVerifyVia;
        $user->two_factor_email_confirmed = 1;
        $user->two_factor_code = null;
        $user->two_factor_expires_at = null;
        $user->save();
        session()->forget('user');

        return Reply::success(__('messages.updateSuccess'));
    }

}
