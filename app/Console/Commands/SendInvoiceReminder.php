<?php

namespace App\Console\Commands;

use App\Events\InvoiceReminderAfterEvent;
use App\Events\InvoiceReminderEvent;
use App\Models\Invoice;
use App\Models\Setting;
use Carbon\Carbon;
use Illuminate\Console\Command;

use function Amp\Promise\first;

class SendInvoiceReminder extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'send-invoice-reminder';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'send invoice reminder to the client before and after due date of invoice';

    /**
     * Execute the console command.
     *
     * @return mixed
     */

    public function handle()
    {
        $company = Setting::with('currency')->first();
        $invoice_setting = invoice_setting()->send_reminder;
        $invoice_reminder = invoice_setting()->reminder;
        $reminder_after_days = invoice_setting()->send_reminder_after;

        if ($invoice_setting != 0) {
            $invoices = Invoice::whereNotNull('due_date')
                ->whereDate('due_date', Carbon::now($company->timezone)->addDays($invoice_setting))
                ->where('status', '!=', 'paid')
                ->where('status', '!=', 'canceled')
                ->where('status', '!=', 'draft')
                ->get();

            if ($invoices) {
                foreach ($invoices as $invoice) {
                    $notifyUser = $invoice->client;

                    if (!is_null($notifyUser)) {
                        event(new InvoiceReminderEvent($invoice, $notifyUser, $invoice_setting));
                    }
                }
            }
        }

        if ($invoice_reminder == 'after') {
            $invoices_after = Invoice::whereNotNull('due_date')
                ->whereDate('due_date', Carbon::now($company->timezone)->subDays($reminder_after_days))
                ->where('status', '!=', 'paid')
                ->where('status', '!=', 'canceled')
                ->where('status', '!=', 'draft')
                ->get();

        }
        else{
            $invoices_every = Invoice::whereNotNull('due_date')
                ->whereDate('due_date', '<', now())
                ->where('status', '!=', 'paid')
                ->where('status', '!=', 'canceled')
                ->where('status', '!=', 'draft')
                ->get();

        }


        if (isset($invoices_after)) {
            foreach ($invoices_after as $invoice) {
                $notifyUser = $invoice->client;

                if (!is_null($notifyUser)) {
                    event(new InvoiceReminderAfterEvent($invoice, $notifyUser, $reminder_after_days));
                }

            }
        }

        if (isset($invoices_every)) {
            foreach ($invoices_every as $invoice) {
                $notifyUser = $invoice->client;
                $date_diff = $invoice->due_date->diffInDays(Carbon::now());

                if ($reminder_after_days != 0) {
                    if($date_diff % $reminder_after_days == 0 && !is_null($notifyUser)) {
                        event(new InvoiceReminderAfterEvent($invoice, $notifyUser, $reminder_after_days));
                    }
                }

            }
        }
    }

}
