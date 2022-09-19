<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use App\Models\User;
use App\Helper\Files;
use App\Models\Invoice;
use App\Models\Setting;
use App\Models\InvoiceItems;
use Illuminate\Console\Command;
use App\Models\InvoiceItemImage;
use App\Models\RecurringInvoice;
use Illuminate\Support\Facades\DB;
use App\Traits\UniversalSearchTrait;
use App\Models\RecurringInvoiceItemImage;
use App\Notifications\NewInvoiceRecurring;

class AutoCreateRecurringInvoices extends Command
{
    use UniversalSearchTrait;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'recurring-invoice-create';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'auto create recurring invoices ';

    /**
     * Execute the console command.
     *
     * @return mixed
     */

    public function handle()
    {
        $company = Setting::with('currency')->first();

        $recurringInvoices = RecurringInvoice::with(['recurrings', 'items', 'items.recurringInvoiceItemImage'])
            ->where('status', 'active')
            ->get();

        $recurringInvoices->each(function ($recurring) use ($company) {
            if ($recurring->unlimited_recurring == 1 || ($recurring->unlimited_recurring == 0 && $recurring->recurrings->count() < $recurring->billing_cycle)) {
                $today = now()->timezone($company->timezone);
                $isMonthly = ($today->day === $recurring->day_of_month);
                $isWeekly = ($today->dayOfWeek === $recurring->day_of_week);
                $isBiWeekly = ($isWeekly && $today->weekOfYear % 2 === 0);
                $isQuarterly = ($isMonthly && $today->month % 3 === 1);
                $isHalfYearly = ($isMonthly && $today->month % 6 === 1);
                $isAnnually = ($isMonthly && $today->month % 12 === 1);

                if (
                    $recurring->rotation === 'daily' ||
                    ($recurring->rotation === 'weekly' && $isWeekly) ||
                    ($recurring->rotation === 'bi-weekly' && $isBiWeekly) ||
                    ($recurring->rotation === 'monthly' && $isMonthly) ||
                    ($recurring->rotation === 'quarterly' && $isQuarterly) ||
                    ($recurring->rotation === 'half-yearly' && $isHalfYearly) ||
                    ($recurring->rotation === 'annually' && $isAnnually)
                ) {
                    $this->invoiceCreate($recurring);
                }
            }
        });
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */

    public function invoiceCreate($invoiceData)
    {
        $recurring = $invoiceData;

        $diff = $recurring->issue_date->diffInDays($recurring->due_date);
        $currentDate = now();
        $dueDate = $currentDate->addDays($diff)->format('Y-m-d');

        $invoice = new Invoice();
        $invoice->invoice_recurring_id = $recurring->id;
        $invoice->project_id = $recurring->project_id ?? null;
        $invoice->client_id = $recurring->client_id ? $recurring->client_id : null;
        $invoice->invoice_number = $this->lastInvoiceNumber() + 1;
        $invoice->issue_date = $currentDate->format('Y-m-d');
        $invoice->due_date = $dueDate;
        $invoice->sub_total = round($recurring->sub_total, 2);
        $invoice->discount = round($recurring->discount_value, 2);
        $invoice->discount_type = $recurring->discount_type;
        $invoice->total = round($recurring->total, 2);
        $invoice->currency_id = $recurring->currency_id;
        $invoice->note = $recurring->note;
        $invoice->show_shipping_address = $recurring->show_shipping_address;
        $invoice->send_status = 1;
        $invoice->company_address_id = default_address()->id;
        $invoice->save();

        if ($invoice->show_shipping_address) {
            if ($invoice->project_id != null && $invoice->project_id != '') {
                $client = $invoice->project->clientdetails;
                $client->shipping_address = $invoice->project->client->clientDetails->shipping_address;

                $client->save();
            }
            elseif ($invoice->client_id != null && $invoice->client_id != '') {
                $client = $invoice->clientdetails;
                $client->shipping_address = $invoice->client->clientDetails->shipping_address;
                $client->save();
            }
        }

        foreach ($recurring->items as $key => $item) {

            $invoiceItem = InvoiceItems::create(
                [
                    'invoice_id' => $invoice->id,
                    'item_name' => $item->item_name,
                    'item_summary' => $item->item_summary,
                    'hsn_sac_code' => (isset($item->hsn_sac_code)) ? $item->hsn_sac_code : null,
                    'type' => 'item',
                    'quantity' => $item->quantity,
                    'unit_price' => $item->unit_price,
                    'amount' => $item->amount,
                    'taxes' => $item->taxes
                ]
            );

            if ($item->recurringInvoiceItemImage) {
                // Add invoice item image
                InvoiceItemImage::create(
                    [
                        'invoice_item_id' => $invoiceItem->id,
                        'filename' => $item->recurringInvoiceItemImage->filename,
                        'hashname' => $item->recurringInvoiceItemImage->hashname,
                        'size' => $item->recurringInvoiceItemImage->size,
                        'external_link' => $item->recurringInvoiceItemImage->external_link
                    ]
                );

                // Copy files here
                if ($item->recurringInvoiceItemImage->filename != '') {

                    $source = public_path(Files::UPLOAD_FOLDER . '/') . RecurringInvoiceItemImage::FILE_PATH . '/' . $item->id . '/' . $item->recurringInvoiceItemImage->hashname;

                    $path = public_path(Files::UPLOAD_FOLDER . '/') . InvoiceItemImage::FILE_PATH . '/' . $invoiceItem->id . '/';

                    $filename = $item->recurringInvoiceItemImage->hashname;

                    if (!file_exists($path)) {
                        mkdir($path, 0777, true);
                    }

                    copy($source, $path . $filename);
                }
            }

        }


        if (($invoice->project && $invoice->project->client_id != null) || $invoice->client_id != null) {
            $clientId = ($invoice->project && $invoice->project->client_id != null) ? $invoice->project->client_id : $invoice->client_id;
            // Notify client
            $notifyUser = User::withoutGlobalScopes(['active'])->findOrFail($clientId);

            $notifyUser->notify(new NewInvoiceRecurring($invoice));
        }

        // Log search
        $this->logSearchEntry($invoice->id, $invoice->invoice_number, 'invoices.show', 'invoice');
    }

    /**
     * @return mixed
     */
    public static function lastInvoiceNumber()
    {
        $invoice = DB::select('SELECT MAX(CAST(`invoice_number` as UNSIGNED)) as invoice_number FROM `invoices`');
        return $invoice[0]->invoice_number;
    }

}
