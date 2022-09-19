<?php

namespace App\Http\Controllers;

use App\Helper\Files;
use App\Helper\Reply;
use App\Models\GdprSetting;
use App\Models\PurposeConsent;
use App\Models\PurposeConsentUser;
use App\Models\User;
use Illuminate\Http\Request;

class GdprController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.gdpr';
        $this->gdprSetting = GdprSetting::first();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->view = 'gdpr.ajax.right-to-informed';

        $this->user = User::find($this->user->id);

        $this->consents = PurposeConsent::with(['user' => function($query) {
            $query->where('client_id', $this->user->id)
                ->orderBy('created_at', 'desc');
        }])->get();

        $tab = request('tab');

        switch ($tab) {
        case 'right-to-erasure':
            $this->view = 'gdpr.ajax.right-to-erasure';
                break;
        case 'right-to-data-portability':
            $this->view = 'gdpr.ajax.right-to-data-portability';
                break;
        case 'right-to-access':
            $this->view = 'gdpr.ajax.right-to-access';
                break;
        case 'consent':
            $this->view = 'gdpr.ajax.consent';
            break;
        default:
            $this->view = 'gdpr.ajax.right-to-informed';
            break;
        }

        ($tab == '') ? $this->activeTab = 'right-to-informed' : $this->activeTab = $tab;

        if (request()->ajax()) {
            $html = view($this->view, $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle, 'activeTab' => $this->activeTab]);
        }

        return view('gdpr.index', $this->data);
    }

    public function updateClientConsent(Request $request)
    {
        $allConsents = $request->has('consent_customer') ? $request->consent_customer : [];

        foreach ($allConsents as $allConsentId => $allConsentStatus)
        {
            $newConsentLead = new PurposeConsentUser();
            $newConsentLead->client_id = $this->user->id;
            $newConsentLead->updated_by_id = $this->user->id;
            $newConsentLead->purpose_consent_id = $allConsentId;
            $newConsentLead->status = $allConsentStatus;
            $newConsentLead->ip = $request->ip();
            $newConsentLead->save();

        }

        return Reply::success(__('messages.gdprUpdated'));
    }

    public function downloadJson(Request $request)
    {
        $table = User::with('clientDetails', 'attendance', 'employee', 'employeeDetail', 'projects', 'member', 'group')->find(user()->id);
        $filename = Files::UPLOAD_FOLDER.'/user.json';
        $handle = fopen($filename, 'w+');
        fputs($handle, $table->toJson(JSON_PRETTY_PRINT));
        fclose($handle);
        $headers = array('Content-type' => 'application/json');

        return response()->download($filename, 'user.json', $headers);
    }

}
