<?php

namespace App\Http\Controllers;

use App\Models\Currency;
use Illuminate\Http\Request;
use App\Helper\Reply;
use App\Http\Requests\Currency\StoreCurrency;
use App\Http\Requests\Currency\StoreCurrencyExchangeKey;
use App\Models\CurrencyFormatSetting;
use GuzzleHttp\Client;
use App\Traits\CurrencyExchange;

class CurrencySettingController extends AccountBaseController
{
    use CurrencyExchange;

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.currencySettings';
        $this->activeSettingMenu = 'currency_settings';
        $this->middleware(function ($request, $next) {
            abort_403(user()->permission('manage_currency_setting') !== 'all');
            return $next($request);
        });
    }

    /**
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View|mixed
     */
    public function index()
    {
        $this->currencies = Currency::all();
        $this->currencyFormatSetting = currency_format_setting();
        $this->defaultFormattedCurrency = currency_formatter('1234567.89');

        $tab = request('tab');

        switch ($tab) {
        case 'currency-format-setting':
            $this->view = 'currency-settings.ajax.currency-format-setting';
                break;
        default:
            $this->view = 'currency-settings.ajax.currency-setting';
                break;
        }

        $this->activeTab = ($tab == '') ? 'currency-setting' : $tab;

        if (request()->ajax()) {
            $html = view($this->view, $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle, 'activeTab' => $this->activeTab]);
        }

        return view('currency-settings.index', $this->data);

    }

    /**
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function create()
    {
        $this->currencies = Currency::all();
        return view('currency-settings.create', $this->data);
    }

    /**
     * @param StoreCurrency $request
     * @return array|string[]
     * @throws \Froiden\RestAPI\Exceptions\RelatedResourceNotFoundException
     */
    public function store(StoreCurrency $request)
    {
        $currency = new Currency();
        $currency->currency_name = $request->currency_name;
        $currency->currency_symbol = $request->currency_symbol;
        $currency->currency_code = $request->currency_code;
        $currency->usd_price = $request->usd_price;
        $currency->is_cryptocurrency = $request->is_cryptocurrency;
        $currency->exchange_rate = $request->exchange_rate;
        $currency->usd_price = $request->usd_price;

        $currency->save();

        $this->updateExchangeRates();

        return Reply::redirect(route('currency-settings.index'), __('messages.currencyAdded'));
    }

    public function show($id)
    {
        return redirect(route('currency-settings.edit', $id));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $this->currency = Currency::findOrFail($id);

        if (request()->ajax()) {
            $html = view('currency-settings.edit', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        return view('currency-settings.edit', $this->data);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $currency = Currency::findOrFail($id);
        $currency->currency_name = $request->currency_name;
        $currency->currency_symbol = $request->currency_symbol;
        $currency->currency_code = $request->currency_code;
        $currency->exchange_rate = $request->exchange_rate;

        $currency->usd_price = $request->usd_price;
        $currency->is_cryptocurrency = $request->is_cryptocurrency;

        $currency->save();

        return Reply::redirect(route('currency-settings.index'), __('messages.currencyUpdated'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return array
     */
    public function destroy($id)
    {
        if ($this->global->currency_id == $id) {
            return Reply::error(__('modules.currencySettings.cantDeleteDefault'));
        }

        Currency::destroy($id);
        return Reply::success(__('messages.currencyDeleted'));
    }

    public function exchangeRate($currency)
    {
        $currencyApiKey = ($this->global->currency_converter_key) ?: config('app.currency_converter_key');
        $currencyApiKeyVersion = $this->global->currency_key_version;

        try {
            // Get exchange rate
            $client = new Client();
            $res = $client->request('GET', 'https://'.$currencyApiKeyVersion.'.currconv.com/api/v7/convert?q=' . $this->global->currency->currency_code . '_' . $currency . '&compact=ultra&apiKey=' . $currencyApiKey);
            $conversionRate = $res->getBody();
            $conversionRate = json_decode($conversionRate, true);
            $rate = $conversionRate[mb_strtoupper($this->global->currency->currency_code) . '_' . $currency];
            return Reply::dataOnly(['status' => 'success', 'value' => $rate]);

        } catch (\Throwable $th) {
            return Reply::error(__('messages.errorOccured'));
        }
    }

    /**
     * @return array
     */
    public function updateExchangeRate()
    {
        $setting = global_setting();
        $currencyApiKey = ($setting->currency_converter_key) ? $setting->currency_converter_key : env('CURRENCY_CONVERTER_KEY');

        if (is_null($currencyApiKey)) {
            return Reply::error(__('messages.currencyExchangeKeyNotFound'));
        }

        $this->updateExchangeRates();
        return Reply::success(__('messages.exchangeRateUpdateSuccess'));
    }

    public function updateCurrencyFormat(Request $request)
    {
        $currencyFormatSetting = CurrencyFormatSetting::first();
        $currencyFormatSetting->currency_position = $request->currency_position;
        $currencyFormatSetting->no_of_decimal = $request->no_of_decimal;
        $currencyFormatSetting->thousand_separator = $request->thousand_separator;
        $currencyFormatSetting->decimal_separator = $request->decimal_separator;
        $currencyFormatSetting->save();

        session()->forget('currency_format_setting');

        return Reply::success('Setting Updated');
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function currencyExchangeKey()
    {
        return view('currency-settings.currency-exchange-modal', $this->data);
    }

    /**
     * @param StoreCurrencyExchangeKey $request
     * @return array
     */
    public function currencyExchangeKeyStore(StoreCurrencyExchangeKey $request)
    {
        $this->global->currency_converter_key = $request->currency_converter_key;
        $this->global->currency_key_version = $request->currency_key_version;
        $this->global->save();

        // remove session
        session()->forget('global_setting');


        return Reply::success(__('messages.currencyConvertKeyUpdated'));
    }

    public function convertCurrencyAmount($currencyId, $amount)
    {
        return $amount / Currency::find($currencyId)->exchange_rate ?? 1;
    }
}
