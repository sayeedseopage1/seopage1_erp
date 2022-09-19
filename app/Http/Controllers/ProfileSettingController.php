<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Models\Country;
use App\Models\EmergencyContact;
use App\Models\User;
use Illuminate\Support\Facades\Cache;

class ProfileSettingController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.profileSettings';
        $this->activeSettingMenu = 'profile_settings';
    }

    public function index()
    {
        $tab = request('tab');
        $this->user = User::find(user()->id);

        $this->countries = countries();

        $this->salutations = ['mr', 'mrs', 'miss', 'dr', 'sir', 'madam'];

        switch ($tab) {
        case 'emergency-contacts':
            $this->contacts = EmergencyContact::where('user_id', user()->id)->get();
            $this->view = 'profile-settings.ajax.emergency-contacts';
            break;
        default:
            $this->view = 'profile-settings.ajax.profile';
            break;
        }

        ($tab == '') ? $this->activeTab = 'profile' : $this->activeTab = $tab;

        if (request()->ajax()) {
            $html = view($this->view, $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle, 'activeTab' => $this->activeTab]);
        }

        return view('profile-settings.index', $this->data);
    }

}
