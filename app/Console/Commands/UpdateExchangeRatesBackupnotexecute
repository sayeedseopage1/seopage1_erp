<?php

namespace App\Console\Commands;

use App\Models\Currency;
use App\Models\Setting;
use GuzzleHttp\Client;
use Illuminate\Console\Command;

class UpdateExchangeRates extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'update-exchange-rate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Updates the exchange rates for all the currencies in currencies table.';


    /**
     * Execute the console command.
     *
     * @return mixed
     */

    public function handle()
    {
        $currencies = Currency::all();
        $setting = Setting::first();
        $currencyApiKey = ($setting->currency_converter_key) ?: config('app.currency_converter_key');
        $currencyApiKeyVersion = $setting->currency_key_version;

        foreach($currencies as $currency){

            $currency = Currency::findOrFail($currency->id);

            // get exchange rate
            $client = new Client();
            $res = $client->request('GET', 'https://'.$currencyApiKeyVersion.'.currconv.com/api/v7/convert?q='.$setting->currency->currency_code.'_'.$currency->currency_code.'&compact=ultra&apiKey='.$currencyApiKey);
            $conversionRate = $res->getBody();
            $conversionRate = json_decode($conversionRate, true);

            $currency->exchange_rate = $conversionRate[$setting->currency->currency_code.'_'.$currency->currency_code];
            $currency->save();
        }
    }

}
