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
        $url = 'https://v6.exchangerate-api.com/v6/acb4cb3dd77299b122d36480/latest/USD';

        try {
            DB::beginTransaction();
            $response = $client->request('GET', $url);
            $body = $response->getBody()->getContents();

            $data = json_decode($body, true);
            $aedValue = $data['conversion_rates']['AED'];
            foreach(Currency::get() as $currency){
                $currency->exchange_rate = $data['conversion_rates'][$currency->currency_code];
                $currency->save();
            }
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
        }
    }
}
