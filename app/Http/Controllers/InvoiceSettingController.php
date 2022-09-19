<?php

namespace App\Http\Controllers;

use App\Helper\Files;
use App\Helper\Reply;
use App\Http\Requests\UpdateInvoiceSetting;
use App\Models\InvoiceSetting;

class InvoiceSettingController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();

        $this->pageTitle = 'app.menu.financeSettings';
        $this->activeSettingMenu = 'invoice_settings';
        $this->middleware(function ($request, $next) {
            abort_403(!(user()->permission('manage_finance_setting') == 'all'));
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
        $this->invoiceSetting = InvoiceSetting::first();
        return view('invoice-settings.index', $this->data);
    }

    /**
     * @param UpdateInvoiceSetting $request
     * @return array
     * @throws \Froiden\RestAPI\Exceptions\RelatedResourceNotFoundException
     * @throws \Illuminate\Contracts\Filesystem\FileNotFoundException
     */
    public function update(UpdateInvoiceSetting $request)
    {
        $setting = InvoiceSetting::first();
        $setting->invoice_prefix        = $request->invoice_prefix;
        $setting->invoice_digit         = $request->invoice_digit;
        $setting->estimate_prefix       = $request->estimate_prefix;
        $setting->estimate_digit        = $request->estimate_digit;
        $setting->credit_note_prefix    = $request->credit_note_prefix;
        $setting->credit_note_digit     = $request->credit_note_digit;
        $setting->template              = $request->template;
        $setting->due_after             = $request->due_after;
        $setting->invoice_terms         = $request->invoice_terms;
        $setting->show_gst              = $request->has('show_gst') ? 'yes' : 'no';
        $setting->hsn_sac_code_show     = $request->has('hsn_sac_code_show') ? 1 : 0;
        $setting->tax_calculation_msg   = $request->has('show_tax_calculation_msg') ? 1 : 0;
        $setting->show_project          = $request->has('show_project') ? 1 : 0;
        $setting->send_reminder         = $request->send_reminder;
        $setting->reminder              = $request->reminder;
        $setting->send_reminder_after   = $request->send_reminder_after;
        $setting->locale                = $request->locale;
        $setting->show_client_name      = $request->has('show_client_name') ? 'yes' : 'no';
        $setting->show_client_email     = $request->has('show_client_email') ? 'yes' : 'no';
        $setting->show_client_phone     = $request->has('show_client_phone') ? 'yes' : 'no';
        $setting->show_client_company_name = $request->has('show_client_company_name') ? 'yes' : 'no';
        $setting->show_client_company_address   = $request->has('show_client_company_address') ? 'yes' : 'no';

        if ($request->hasFile('logo')) {
            Files::deleteFile($setting->logo, 'app-logo');
            $setting->logo = Files::upload($request->logo, 'app-logo');
        }

        $setting->save();

        session()->forget('invoice_setting');

        return Reply::success(__('messages.settingsUpdated'));
    }

}
