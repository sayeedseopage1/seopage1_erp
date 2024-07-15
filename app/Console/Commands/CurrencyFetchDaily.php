<?php

namespace App\Console\Commands;

use App\Models\Currency;
use GuzzleHttp\Client;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class CurrencyFetchDaily extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'currency-fetch:daily';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'This command fetch realtime currency data and update the currency rate of this system';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $client = new Client();
        $urlOne = 'https://v6.exchangerate-api.com/v6/acb4cb3dd77299b122d36480/latest/USD';
        $urlTwo = 'https://openexchangerates.org/api/latest.json?app_id=dcaeb890e6ee40d4a35b08f2c0ea70f3';

        try {
            DB::beginTransaction();
            $response = $client->request('GET', $urlTwo);
            $body = $response->getBody()->getContents();

            $data = json_decode($body, true);
            foreach(Currency::get() as $currency){
                // $currency->exchange_rate = $data['conversion_rates'][$currency->currency_code]; // For $urlOne
                $currency->exchange_rate = $data['rates'][$currency->currency_code]; // For $urlTwo
                $currency->save();
            }
            DB::commit();
        } catch (\Exception $e) {
            // throw $e;
            DB::rollBack();
        }
    }
}
