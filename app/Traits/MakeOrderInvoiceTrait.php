<?php

namespace App\Traits;

use App\Models\Order;
use App\Models\Invoice;
use App\Models\Payment;
use App\Models\OrderItems;
use App\Models\InvoiceItems;
use Illuminate\Support\Carbon;
use Illuminate\Database\Eloquent\Collection;

trait MakeOrderInvoiceTrait
{

    /**
     * makeOrderInvoice to generate order's invoice and return invoice.
     *
     * @param  Order|Collection $order
     * @param  string $status
     * @return Invoice $invoice
     */
    public function makeOrderInvoice(Order $order, $status = 'completed')
    {

        $order->status = $status;
        $order->save();

        if($order->invoice)
        {
            /** @phpstan-ignore-next-line */
            $order->invoice->status = $status == 'completed' ? 'paid' : 'unpaid';
            $order->push();
            return $order->invoice;
        }

        /* Step2 - make an invoice related to recently paid order_id */
        $invoice = new Invoice();
        $invoice->order_id = $order->id;
        $invoice->client_id = $order->client_id;
        $invoice->sub_total = $order->sub_total;
        $invoice->discount = $order->discount;
        $invoice->discount_type = $order->discount_type;
        $invoice->total = $order->total;
        $invoice->currency_id = $order->currency_id;
        $invoice->status = $status == 'completed' ? 'paid' : 'unpaid';
        $invoice->note = str_replace('<p><br></p>', '', trim($order->note));
        $invoice->issue_date = now();
        $invoice->send_status = 1;
        $invoice->invoice_number = Invoice::lastInvoiceNumber() + 1;
        $invoice->due_amount = 0;
        $invoice->save();

        /* Make invoice items */
        $orderItems = OrderItems::where('order_id', $order->id)->get();

        foreach ($orderItems as $item){
            InvoiceItems::create(
                [
                    'invoice_id'   => $invoice->id,
                    'item_name'    => $item->item_name,
                    'item_summary' => $item->item_summary,
                    'type'         => 'item',
                    'quantity'     => $item->quantity,
                    'unit_price'   => $item->unit_price,
                    'amount'       => $item->amount,
                    'taxes'        => $item->taxes
                ]
            );
        }

        return $invoice;
    }

}
