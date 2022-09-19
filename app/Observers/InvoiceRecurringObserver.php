<?php

namespace App\Observers;

use App\Models\Notification;
use App\Models\RecurringInvoice;
use App\Models\RecurringInvoiceItemImage;
use App\Models\RecurringInvoiceItems;
use App\Helper\Files;

class InvoiceRecurringObserver
{

    public function saving(RecurringInvoice $invoice)
    {
        if (!isRunningInConsoleOrSeeding()) {
            $invoice->last_updated_by = user()->id;
        }

        if (request()->has('calculate_tax')) {
            $invoice->calculate_tax = request()->calculate_tax;
        }
    }

    public function creating(RecurringInvoice $invoice)
    {
        if (!isRunningInConsoleOrSeeding()) {
            $invoice->added_by = user()->id;
        }
    }

    public function created(RecurringInvoice $invoice)
    {
        if (!isRunningInConsoleOrSeeding()) {

            if (!empty(request()->item_name)) {

                $itemsSummary = request()->item_summary;
                $cost_per_item = request()->cost_per_item;
                $quantity = request()->quantity;
                $hsn_sac_code = request()->hsn_sac_code;
                $amount = request()->amount;
                $tax = request()->taxes;
                $invoice_item_image = request()->invoice_item_image;
                $invoice_item_image_url = request()->invoice_item_image_url;

                foreach (request()->item_name as $key => $item) :
                    if (!is_null($item)) {
                        $recurringInvoiceItem = RecurringInvoiceItems::create(
                            [
                                'invoice_recurring_id' => $invoice->id,
                                'item_name' => $item,
                                'item_summary' => $itemsSummary[$key] ? $itemsSummary[$key] : '',
                                'type' => 'item',
                                'hsn_sac_code' => (isset($hsn_sac_code[$key]) && !is_null($hsn_sac_code[$key])) ? $hsn_sac_code[$key] : null,
                                'quantity' => $quantity[$key],
                                'unit_price' => round($cost_per_item[$key], 2),
                                'amount' => round($amount[$key], 2),
                                'taxes' => ($tax ? (array_key_exists($key, $tax) ? json_encode($tax[$key]) : null) : null)
                            ]
                        );
                    }

                    /* Invoice file save here */
                    if ((isset($invoice_item_image[$key]) || isset($invoice_item_image_url[$key])) && isset($recurringInvoiceItem)) {

                        $filename = '';

                        if (isset($invoice_item_image[$key])) {
                            $filename = Files::uploadLocalOrS3($invoice_item_image[$key], RecurringInvoiceItemImage::FILE_PATH . '/' . $recurringInvoiceItem->id);
                        }

                        RecurringInvoiceItemImage::create(
                            [
                                'invoice_recurring_item_id' => $recurringInvoiceItem->id,
                                'filename' => !isset($invoice_item_image_url[$key]) ? $invoice_item_image[$key]->getClientOriginalName() : '',
                                'hashname' => !isset($invoice_item_image_url[$key]) ? $filename : '',
                                'size' => !isset($invoice_item_image_url[$key]) ? $invoice_item_image[$key]->getSize() : '',
                                'external_link' => $invoice_item_image_url[$key] ?? ''
                            ]
                        );
                    }

                endforeach;
            }

        }
    }

    public function deleting(RecurringInvoice $invoice)
    {
        $notifyData = ['App\Notifications\InvoiceRecurringStatus', 'App\Notifications\NewRecurringInvoice',];

        Notification::whereIn('type', $notifyData)
            ->whereNull('read_at')
            ->where('data', 'like', '{"id":' . $invoice->id . ',%')
            ->delete();
    }

}
