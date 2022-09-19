<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Models\Lead;
use App\Models\LeadSource;
use App\Models\LeadStatus;
use Illuminate\Http\Request;
use App\Http\Requests\Gdpr\RemoveLeadRequest;
use App\Http\Requests\GdprLead\UpdateRequest;
use App\Models\PurposeConsent;
use App\Models\PurposeConsentLead;
use App\Models\RemovalRequestLead;

class PublicLeadGdprController extends AccountBaseController
{

    public function updateLead(UpdateRequest $request, $id)
    {
        $gdprSetting = gdpr_setting();

        if(!$gdprSetting->public_lead_edit) {
            return Reply::error('messages.unAuthorisedUser');
        }

        $lead = Lead::whereRaw('md5(id) = ?', $id)->firstOrFail();
        $lead->company_name = $request->company_name;
        $lead->website = $request->website;
        $lead->address = $request->address;
        $lead->client_name = $request->client_name;
        $lead->client_email = $request->client_email;
        $lead->mobile = $request->mobile;
        $lead->note = str_replace('<p><br></p>', '', trim($request->note));
        $lead->status_id = $request->status;
        $lead->source_id = $request->source;
        $lead->next_follow_up = $request->next_follow_up;
        $lead->save();

        return Reply::success('messages.LeadUpdated');
    }

    public function consent($hash)
    {
        $this->pageTitle = 'modules.gdpr.consent';
        $this->gdprSetting = gdpr_setting();

        abort_if(!$this->gdprSetting->consent_leads, 404);

        $lead = Lead::where('hash', $hash)->firstOrFail();
        $this->consents = PurposeConsent::with(['lead' => function($query) use($lead) {
            $query->where('lead_id', $lead->id)
                ->orderBy('created_at', 'desc');
        }])->get();

        $this->lead = $lead;

        return view('public-gdpr.consent', $this->data);
    }

    public function updateConsent(Request $request, $id)
    {
        $lead = Lead::whereRaw('md5(id) = ?', $id)->firstOrFail();

        $allConsents = $request->has('consent_customer') ? $request->consent_customer : [];

        foreach ($allConsents as $allConsentId => $allConsentStatus)
        {
            $newConsentLead = new PurposeConsentLead();
            $newConsentLead->lead_id = $lead->id;
            $newConsentLead->purpose_consent_id = $allConsentId;
            $newConsentLead->status = $allConsentStatus;
            $newConsentLead->ip = $request->ip();
            $newConsentLead->save();
        }

        return Reply::success('messages.consentupdated');
    }

    public function removeLeadRequest(RemoveLeadRequest $request)
    {
        $gdprSetting = gdpr_setting();

        if(!$gdprSetting->lead_removal_public_form) {
            return Reply::error('messages.unAuthorisedUser');
        }

        $lead = Lead::find($request->lead_id);

        $removal = new RemovalRequestLead();
        $removal->lead_id = $request->lead_id;
        $removal->name = $lead->company_name;
        $removal->description = str_replace('<p><br></p>', '', trim($request->description));
        $removal->save();

        return Reply::success('modules.gdpr.removalRequestSuccess');
    }

}
