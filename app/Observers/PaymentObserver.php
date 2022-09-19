<?php

namespace App\Observers;

use App\Models\User;
use App\Models\Order;
use App\Models\Invoice;
use App\Models\Payment;
use App\Models\Notification;
use App\Events\NewPaymentEvent;
use Illuminate\Support\Facades\Log;
use App\Events\InvoicePaymentReceivedEvent;

class PaymentObserver
{

    public function saving(Payment $payment)
    {
        if (!isRunningInConsoleOrSeeding() && user()) {
            $payment->last_updated_by = user()->id;
        }
    }

    public function creating(Payment $payment)
    {
        if (!isRunningInConsoleOrSeeding()) {
            $payment->added_by = user() ? user()->id : null;
        }
    }

    public function saved(Payment $payment)
    {
        if (!isRunningInConsoleOrSeeding()) {
            if (($payment->project_id && $payment->project->client_id != null) || ($payment->invoice_id && $payment->invoice->client_id != null) && $payment->gateway != 'Offline') {
                // Notify client
                $clientId = ($payment->project_id && $payment->project->client_id != null) ? $payment->project->client_id : $payment->invoice->client_id;

                $notifyUser = User::withoutGlobalScope('active')->findOrFail($clientId);

                if($notifyUser){
                    event(new NewPaymentEvent($payment, $notifyUser));
                }
            }
        }
    }

    public function created(Payment $payment)
    {
        if (($payment->invoice_id || $payment->order_id) && $payment->status == 'complete')
        {

            if($payment->invoice_id) {
                $invoice = Invoice::latest()->find($payment->invoice_id);
            }
            elseif($payment->order_id) {
                $invoice = Invoice::where('order_id', $payment->invoice_id)->latest()->first();
            }

            $due = 0;

            if(isset($payment->invoice)){
                $due = $payment->invoice->due_amount;
            }
            elseif(isset($payment->order)) {
                $due = $payment->order->total;
            }

            $dueAmount = $due - $payment->amount;

            if(isset($invoice)){
                $invoice->due_amount = $dueAmount;
                $invoice->saveQuietly();
            }

            // Notify all admins
            try{
                if (!isRunningInConsoleOrSeeding() ) {
                    if($payment->gateway != 'Offline'){
                        event(new InvoicePaymentReceivedEvent($payment));
                    }
                }
            }catch (\Exception $e){
                Log::info($e);
            }

        }
    }

    public function deleting(Payment $payment)
    {
        // change invoice status if exists
        if ($payment->invoice) {
            $due = $payment->invoice->amountDue() + $payment->amount;

            if ($due <= 0) {
                $payment->invoice->status = 'paid';
            }
            else if ((float)$due >= (float)$payment->invoice->total) {
                $payment->invoice->status = 'unpaid';
            }
            else {
                $payment->invoice->status = 'partial';
            }

            $payment->invoice->saveQuietly();
        }

        if ($payment->order_id) {
            $order = Order::find($payment->order_id);
            $order->status = 'pending';
            $order->save();
        }

        $notifyData = ['App\Notifications\NewPayment','App\Notifications\PaymentReminder'];

        Notification::whereIn('type', $notifyData)
            ->whereNull('read_at')
            ->where('data', 'like', '{"id":'.$payment->id.',%')
            ->delete();
    }

}
