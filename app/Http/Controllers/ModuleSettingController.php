<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Models\ModuleSetting;
use App\Models\Role;
use App\Models\Session;
use Illuminate\Http\Request;

class ModuleSettingController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.moduleSettings';
        $this->activeSettingMenu = 'module_settings';
        $this->middleware(function ($request, $next) {
            abort_403(!(user()->permission('manage_module_setting') == 'all'));
            return $next($request);
        });
    }

    public function index()
    {

        $tab = request('tab');

        switch ($tab) {
        case 'employee':
            $this->modulesData = ModuleSetting::where('type', 'employee')->get();
                break;
        case 'client':
            $this->modulesData = ModuleSetting::where('type', 'client')->get();
                break;
        default:
            $this->modulesData = ModuleSetting::where('type', 'admin')->get();
                break;
        }

        $this->view = 'module-settings.ajax.modules';
        ($tab == '') ? $this->activeTab = 'admin' : $this->activeTab = $tab;

        if (request()->ajax()) {
            $html = view($this->view, $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle, 'activeTab' => $this->activeTab]);
        }

        return view('module-settings.index', $this->data);
    }

    public function update(Request $request, $id)
    {
        $setting = ModuleSetting::findOrFail($id);
        $setting->status = $request->status;
        $setting->save();

        $role = Role::with('roleuser')->where('name', $setting->type)->first();
        $roleusers = $role->roleuser->pluck('user_id')->toArray();

        $deleteSessions = new AppSettingController();
        $deleteSessions->deleteSessions($roleusers);

        session()->forget('user_modules');

        return Reply::success(__('messages.settingsUpdated'));
    }

}
