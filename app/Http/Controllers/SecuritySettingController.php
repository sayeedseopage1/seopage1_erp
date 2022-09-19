<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Http\Requests\GoogleCaptcha\UpdateGoogleCaptchaSetting;
use App\Models\Setting;
use App\Models\SmtpSetting;
use App\Models\User;
use Illuminate\Support\Facades\Artisan;
use GuzzleHttp\Client;

class SecuritySettingController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = __('app.menu.securitySettings');
        $this->activeSettingMenu = 'security_settings';
        $this->middleware(function ($request, $next) {
            return $next($request);
        });
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $this->user = user();
        $this->smtpSetting = smtp_setting();
        $this->setting = global_setting();

        $this->view = 'security-settings.ajax.google-recaptcha';

        $tab = request('tab');

        switch ($tab) {
        case 'recaptcha':
            abort_403(user()->permission('manage_security_setting') !== 'all');
            $this->view = 'security-settings.ajax.google-recaptcha';
                break;
        default:
            $this->view = 'security-settings.ajax.two-factor-authentication';
                break;
        }

        ($tab == '') ? $this->activeTab = '2fa' : $this->activeTab = $tab;

        if (request()->ajax()) {
            $html = view($this->view, $this->data)->render();

            return Reply::dataOnly([
                'status' => 'success',
                'html' => $html,
                'title' => $this->pageTitle
            ]);
        }

        return view('security-settings.index', $this->data);
    }

    /**
     * @param UpdateGoogleCaptchaSetting $request
     * @param int $id
     * @return array
     * @throws \Froiden\RestAPI\Exceptions\RelatedResourceNotFoundException
     */
    public function update(UpdateGoogleCaptchaSetting $request, $id)
    {
        $google_capcha_setting = Setting::find($id);

        if ($request->version == 'v3') {
            $google_capcha_setting->google_recaptcha_v3_site_key = $request->google_recaptcha_v3_site_key;
            $google_capcha_setting->google_recaptcha_v3_secret_key = $request->google_recaptcha_v3_secret_key;
            $google_capcha_setting->google_recaptcha_v3_status = 'active';
            $google_capcha_setting->google_recaptcha_v2_status = 'deactive';
        }
        elseif ($request->version == 'v2') {
            $google_capcha_setting->google_recaptcha_v2_site_key = $request->google_recaptcha_v2_site_key;
            $google_capcha_setting->google_recaptcha_v2_secret_key = $request->google_recaptcha_v2_secret_key;
            $google_capcha_setting->google_recaptcha_v2_status = 'active';
            $google_capcha_setting->google_recaptcha_v3_status = 'deactive';
        }

        if (!$request->google_recaptcha_status) {
            $google_capcha_setting->google_recaptcha_v2_status = 'deactive';
            $google_capcha_setting->google_recaptcha_v3_status = 'deactive';
            $google_capcha_setting->google_recaptcha_status = 'deactive';
        }
        elseif ($request->google_recaptcha_status) {
            $google_capcha_setting->google_recaptcha_status = 'active';
        }

        $google_capcha_setting->save();

        session()->forget('global_setting');

        if ($request->cache) {
            Artisan::call('optimize');
            Artisan::call('route:clear');
        }
        else {
            Artisan::call('config:clear');
            Artisan::call('route:clear');
            Artisan::call('view:clear');
            Artisan::call('cache:clear');
        }

        return Reply::success(__('messages.updatedSuccessfully'));
    }

    public function verify()
    {
        $this->key = request()->key;
        return view('security-settings.verify-recaptcha-v3', $this->data);
    }

    public function validateGoogleRecaptcha($googleRecaptchaResponse, $secret)
    {
        $client = new Client();
        $response = $client->post('https://www.google.com/recaptcha/api/siteverify',
            [
                'form_params' => [
                    'secret' => $secret,
                    'response' => $googleRecaptchaResponse,
                    'remoteip' => $_SERVER['REMOTE_ADDR']
                ]
            ]
        );

        $body = json_decode((string)$response->getBody());

        return $body->success;
    }

}
