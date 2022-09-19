<?php

/**
 * Created by PhpStorm.
 * User: DEXTER
 * Date: 23/11/17
 * Time: 6:07 PM
 */

namespace App\Traits;

use App\Helper\Reply;
use App\Models\Currency;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;

trait CurrencyExchange
{

    public function updateExchangeRates()
    {
        $setting = global_setting();
        $currencies = Currency::where('id', '<>', $setting->currency_id)->get();
        $currencyApiKeyVersion = $setting->currency_key_version;
        $currencyApiKey = ($setting->currency_converter_key) ? $setting->currency_converter_key : env('CURRENCY_CONVERTER_KEY');

        if ($currencyApiKey == null) {
                return false;
        }

        foreach ($currencies as $currency) {

            try {
                $currency = Currency::findOrFail($currency->id);

                $client = new Client();

                if ($currency->is_cryptocurrency == 'no') {

                    // get exchange rate
                    $res = $client->request('GET', 'https://'.$currencyApiKeyVersion.'.currconv.com/api/v7/convert?q=' . $setting->currency->currency_code . '_' . $currency->currency_code . '&compact=ultra&apiKey=' . $currencyApiKey);
                    $conversionRate = $res->getBody();
                    $conversionRate = json_decode($conversionRate, true);

                    if (!empty($conversionRate)) {
                        $currency->exchange_rate = $conversionRate[mb_strtoupper($setting->currency->currency_code) . '_' . $currency->currency_code];
                    }

                } else {
                    // get exchange rate
                    $res = $client->request('GET', 'https://'.$currencyApiKeyVersion.'.currconv.com/api/v7/convert?q=' . $setting->currency->currency_code . '_USD&compact=ultra&apiKey=' . $currencyApiKey);
                    $conversionRate = $res->getBody();
                    $conversionRate = json_decode($conversionRate, true);

                    $usdExchangePrice = $conversionRate[mb_strtoupper($setting->currency->currency_code) . '_USD'];
                    $currency->exchange_rate = $usdExchangePrice;
                }

                $currency->save();
            }
            catch (\Throwable $th) {
                Log::info($th);
            }

            return $currency;
        }
    }

}
