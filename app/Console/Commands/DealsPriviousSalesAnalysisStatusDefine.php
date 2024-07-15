<?php

namespace App\Console\Commands;

use App\Models\Deal;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

use function Clue\StreamFilter\fun;

class DealsPriviousSalesAnalysisStatusDefine extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'deal-status-define';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $salesTableCreateDate = DB::table('migrations')->where('migration', '2024_03_04_151733_create_sales_risk_policies_table')->first() ?: (object)['created_at' => '2024-04-24 00:00:00'];

        Deal::get()->each(function ($item) use($salesTableCreateDate) {
            if (strtotime($item->created_at) < strtotime($salesTableCreateDate->created_at)) {
                if ($item->status == 'Accepted') $item->sale_analysis_status = 'previous-won';
                else if ($item->status == 'Denied') $item->sale_analysis_status = 'previous-denied';

                $item->save();
            }

        });
        echo "Deals table updated sale_analysis_status column updated.";
        return Command::SUCCESS;
    }
}
