<?php

namespace App\Http\Controllers;

use App\DataTables\ConsentDataTable;
use App\DataTables\CustomerDataRemovalDataTable;
use App\DataTables\LeadDataRemovalDataTable;
use App\Helper\Reply;
use App\Http\Requests\Gdpr\CreateRequest;
use App\Models\GdprSetting;
use App\Models\PurposeConsent;
use App\Models\RemovalRequest;
use App\Models\RemovalRequestLead;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class GdprSettingsController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.gdpr';
        $this->activeSettingMenu = 'gdpr_settings';
        $this->gdprSetting = GdprSetting::first();
        $this->middleware(function ($request, $next) {
            abort_403(!(user()->permission('manage_gdpr_setting') == 'all' || in_array('client', user_roles())));
            return $next($request);
        });
    }

    public function index()
    {
        $this->view = 'gdpr-settings.ajax.general';

        $tab = request('tab');

        switch ($tab) {
        case 'right-to-erasure':
            $this->view = 'gdpr-settings.ajax.right-to-erasure';
                break;
        case 'right-to-data-portability':
            $this->view = 'gdpr-settings.ajax.right-to-data-portability';
                break;
        case 'right-to-informed':
            $this->view = 'gdpr-settings.ajax.right-to-informed';
                break;
        case 'right-to-access':
            $this->view = 'gdpr-settings.ajax.right-to-access';
                break;
        case 'consent-settings':
            $this->view = 'gdpr-settings.ajax.consent-settings';
                break;
        case 'consent-lists':
                return $this->consentList();
        case 'removal-requests':
                return $this->removalRequest();
        case 'removal-requests-lead':
                return $this->removalRequestLead();
        default:
            $this->view = 'gdpr-settings.ajax.general';
                break;
        }

        ($tab == '') ? $this->activeTab = 'general' : $this->activeTab = $tab;

        if (request()->ajax()) {
            $html = view($this->view, $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle, 'activeTab' => $this->activeTab]);
        }

        return view('gdpr-settings.index', $this->data);

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function updateGeneral(Request $request)
    {
        $this->gdprSetting->update($request->all());
        session()->forget('gdpr_setting');
        cache()->forget('global-setting');
        return Reply::success(__('messages.gdprUpdated'));
    }

    public function storeConsent(CreateRequest $request)
    {
        $consent = new PurposeConsent();
        $consent->create($request->all());
        session()->forget('gdpr_setting');
        cache()->forget('global-setting');
        return Reply::success(__('messages.gdprUpdated'));
    }

    public function updateConsent(CreateRequest $request, $id)
    {
        $consent = PurposeConsent::findOrFail($id);
        $consent->update($request->all());
        session()->forget('gdpr_setting');
        cache()->forget('global-setting');

        return Reply::success(__('messages.gdprUpdated'));
    }

    public function addConsent()
    {
        return view('gdpr-settings.create-consent-modal', $this->data);
    }

    public function editConsent($id)
    {
        $this->consent = PurposeConsent::findOrFail($id);
        return view('gdpr-settings.edit-consent-modal', $this->data);
    }

    public function removalRequest()
    {
        $this->view = 'gdpr-settings.ajax.removal-request';

        $dataTable = new CustomerDataRemovalDataTable();
        $tab = request('tab');
        ($tab == '') ? $this->activeTab = 'removal-requests' : $this->activeTab = $tab;
        $this->view = 'gdpr-settings.ajax.removal-request';
        return $dataTable->render('gdpr-settings.index', $this->data);
    }

    public function removalRequestLead()
    {
        $this->view = 'gdpr-settings.ajax.removal-request-lead';

        $dataTable = new LeadDataRemovalDataTable();

        $tab = request('tab');
        ($tab == '') ? $this->activeTab = 'removal-requests-lead' : $this->activeTab = $tab;
        $this->view = 'gdpr-settings.ajax.removal-request-lead';
        return $dataTable->render('gdpr-settings.index', $this->data);
    }

    public function consentList()
    {
        $this->view = 'gdpr-settings.ajax.consent-lists';

        $dataTable = new ConsentDataTable();

        $tab = request('tab');
        ($tab == '') ? $this->activeTab = 'consent' : $this->activeTab = $tab;
        $this->view = 'gdpr-settings.ajax.consent-lists';
        return $dataTable->render('gdpr-settings.index', $this->data);
    }

    /**
     * XXXXXXXXXXX
     *
     * @return \Illuminate\Http\Response
     */
    public function applyQuickAction(Request $request)
    {
        switch ($request->action_type) {
        case 'delete':
            $this->deleteRecords($request);
                return Reply::success(__('messages.deleteSuccess'));
        default:
                return Reply::error(__('messages.selectAction'));
        }
    }

    protected function deleteRecords($request)
    {
        PurposeConsent::whereIn('id', explode(',', $request->row_ids))->delete();
    }

    public function purposeDelete($id)
    {
        PurposeConsent::destroy($id);
        session()->forget('gdpr_setting');
        cache()->forget('global-setting');
        return Reply::success('Deleted successfully');
    }

    public function approveRejectClient($id, $type)
    {
        $removal = RemovalRequest::findorFail($id);
        $removal->status = $type;
        $removal->save();
        try {
            if ($type == 'approved' && $removal->user) {
                $removal->user->delete();
            }

        } catch (\Exception $e) {
            Log::info($e);
        }
        session()->forget('gdpr_setting');
        cache()->forget('global-setting');
        return Reply::success('Approved successfully');
    }

    public function approveRejectLead($id, $type)
    {
        $removal = RemovalRequestLead::findorFail($id);
        $removal->status = $type;
        $removal->save();

        try {
            if ($type == 'approved' && $removal->lead) {
                $removal->lead->delete();
            }

        } catch (\Exception $e) {
            Log::info($e);
        }
        session()->forget('gdpr_setting');
        cache()->forget('global-setting');
        return Reply::success('successfully');
    }

}
