<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Stripe\Stripe;
use App\Models\Tax;
use App\Models\User;
use App\Helper\Reply;
use App\Models\Order;
use App\Models\Country;
use App\Models\Invoice;
use App\Models\Payment;
use App\Models\Product;
use App\Models\Project;
use App\Models\Currency;
use App\Models\OrderItems;
use App\Models\CreditNotes;
use App\Models\InvoiceItems;
use Illuminate\Http\Request;
use App\Events\NewOrderEvent;
use App\Models\CompanyAddress;
use App\Models\CreditNoteItem;
use App\Models\OrderItemImage;
use App\Events\NewInvoiceEvent;
use App\Models\InvoiceItemImage;
use Illuminate\Support\Facades\DB;
use App\DataTables\OrdersDataTable;
use App\Models\CreditNoteItemImage;
use Illuminate\Support\Facades\App;
use App\Models\OfflinePaymentMethod;
use Illuminate\Support\Facades\Cookie;
use App\Http\Requests\Orders\PlaceOrder;
use App\Http\Requests\Orders\UpdateOrder;
use App\Models\PaymentGatewayCredentials;
use App\Http\Requests\Stripe\StoreStripeDetail;

class OrderController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.orders';
        $this->middleware(function ($request, $next) {
            abort_403(!in_array('orders', $this->user->modules));
            return $next($request);
        });
    }

    public function index(OrdersDataTable $dataTable)
    {
        $viewPermission = user()->permission('view_order');
        abort_403(!in_array($viewPermission, ['all', 'added', 'owned', 'both']));

        if (!request()->ajax()) {
            $this->projects = Project::allProjects();

            if (in_array('client', user_roles())) {
                $this->clients = User::client();
            }
            else {
                $this->clients = User::allClients();
            }
        }

        return $dataTable->render('orders.index', $this->data);
    }

    public function create()
    {
        $this->addPermission = user()->permission('add_order');

        abort_403(in_array('client', user_roles()) || !in_array($this->addPermission, ['all', 'added', 'both']));

        $this->pageTitle = __('modules.orders.createOrder');
        $this->clients = User::allClients();
        $this->products = Product::all();
        $this->companyAddresses = CompanyAddress::all();

        if (request()->ajax()) {
            $html = view('orders.ajax.admin_create', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'orders.ajax.admin_create';
        return view('orders.create', $this->data);

    }

    /**
     * XXXXXXXXXXX
     *
     * @return \Illuminate\Http\Response
     */
    public function store(PlaceOrder $request)
    {
        if (!in_array('client', user_roles())) {
            $this->addPermission = user()->permission('add_order');
            abort_403(!in_array($this->addPermission, ['all', 'added']));
        }

        $items = $request->item_name;
        $cost_per_item = $request->cost_per_item;
        $quantity = $request->quantity;
        $amount = $request->amount;

        if (!empty($items)) {
            foreach ($items as $itm) {
                if (is_null($itm)) {
                    return Reply::error(__('messages.itemBlank'));
                }
            }
        }
        else {
            return Reply::error(__('messages.addItem'));
        }

        foreach ($quantity as $qty) {
            if (!is_numeric($qty) && (intval($qty) < 1)) {
                return Reply::error(__('messages.quantityNumber'));
            }
        }

        foreach ($cost_per_item as $rate) {
            if (!is_numeric($rate)) {
                return Reply::error(__('messages.unitPriceNumber'));
            }
        }

        foreach ($amount as $amt) {
            if (!is_numeric($amt)) {
                return Reply::error(__('messages.amountNumber'));
            }
        }

        $order = new Order();
        $order->client_id = $request->client_id ?: user()->id;
        $order->order_date = now()->format('Y-m-d');
        $order->sub_total = round($request->sub_total, 2);
        $order->total = round($request->total, 2);
        $order->discount = $request->discount_value;
        $order->discount_type = $request->discount_type;
        $order->status = $request->has('status') ? $request->status : 'pending';
        $order->currency_id = $this->global->currency_id;
        $order->note = str_replace('<p><br></p>', '', trim($request->note));
        $order->show_shipping_address = (($request->has('shipping_address') && $request->shipping_address != '') ? 'yes' : 'no');
        $order->company_address_id = $request->company_address_id ?: null;
        $order->save();

        if ($order->show_shipping_address == 'yes') {
            /** @phpstan-ignore-next-line */
            $client = $order->clientdetails;
            $client->shipping_address = $request->shipping_address;
            $client->saveQuietly();
        }

        if($request->has('status') && $request->status == 'completed'){
            $clientId = $order->client_id;
            // Notify client
            $notifyUser = User::withoutGlobalScope('active')->findOrFail($clientId);

            if ($notifyUser) {
                event(new NewOrderEvent($order, $notifyUser));
            }

            $invoice = $this->makeOrderInvoice($order);
            $this->makePayment($order->total, $invoice, 'complete');
        }

        // Log search
        $this->logSearchEntry($order->id, $order->id, 'orders.show', 'order');

        return response(Reply::redirect(route('orders.show', $order->id), __('messages.orderCreated')))->withCookie(Cookie::forget('productDetails'));
    }

    public function addItem(Request $request)
    {
        $this->item = Product::with('tax')->find($request->id);

        $this->invoiceSetting = invoice_setting();

        $exchangeRate = Currency::find($request->currencyId);

        if (!is_null($exchangeRate) && !is_null($exchangeRate->exchange_rate)) {
            if ($this->item->total_amount != '') {
                $this->item->price = floor($this->item->total_amount * $exchangeRate->exchange_rate);
            }
            else {
                /** @phpstan-ignore-next-line */
                $this->item->price = $this->item->price * $exchangeRate->exchange_rate;
            }
        }
        else {
            if ($this->item->total_amount != '') {
                $this->item->price = $this->item->total_amount;
            }
        }

        $this->item->price = number_format((float)$this->item->price, 2, '.', '');
        $this->taxes = Tax::all();
        $view = view('orders.ajax.add_item', $this->data)->render();
        return Reply::dataOnly(['status' => 'success', 'view' => $view]);
    }

    public function edit($id)
    {
        $this->order = Order::with('client')->findOrFail($id);

        $this->editPermission = user()->permission('edit_order');

        abort_403(in_array('client', user_roles()) || !($this->editPermission == 'all' || ($this->editPermission == 'both' && ($this->order->added_by == user()->id || $this->order->client_id == user()->id)) || ($this->editPermission == 'added' && $this->order->added_by == user()->id) || ($this->editPermission == 'owned' && $this->order->client_id == user()->id)));

        abort_403(in_array($this->order->status, ['completed', 'canceled', 'refunded']));
        $this->pageTitle = __('app.order').'#'.$this->order->id;

        $this->currencies = Currency::all();
        $this->taxes = Tax::all();
        $this->products = Product::all();
        $this->clients = User::allClients();
        $this->companyAddresses = CompanyAddress::all();

        if (request()->ajax()) {
            $html = view('orders.ajax.edit', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'orders.ajax.edit';
        return view('orders.create', $this->data);
    }

    public function update(UpdateOrder $request, $id)
    {
        $items = $request->item_name;
        $itemsSummary = $request->item_summary;
        $hsn_sac_code = $request->hsn_sac_code;
        $cost_per_item = $request->cost_per_item;
        $quantity = $request->quantity;
        $amount = $request->amount;
        $tax = $request->taxes;
        $invoice_item_image_url = $request->invoice_item_image_url;
        $item_ids = $request->item_ids;

        if ($request->total == 0) {
            return Reply::error(__('messages.amountIsZero'));
        }

        foreach ($quantity as $qty) {
            if (!is_numeric($qty) && $qty < 1) {
                return Reply::error(__('messages.quantityNumber'));
            }
        }

        foreach ($cost_per_item as $rate) {
            if (!is_numeric($rate)) {
                return Reply::error(__('messages.unitPriceNumber'));
            }
        }

        foreach ($amount as $amt) {
            if (!is_numeric($amt)) {
                return Reply::error(__('messages.amountNumber'));
            }
        }

        foreach ($items as $itm) {
            if (is_null($itm)) {
                return Reply::error(__('messages.itemBlank'));
            }
        }

        $order = Order::findOrFail($id);

        if ($order->status == 'completed') {
            return Reply::error(__('messages.invalidRequest'));
        }

        $order->sub_total = round($request->sub_total, 2);
        $order->total = round($request->total, 2);
        $order->note = str_replace('<p><br></p>', '', trim($request->note));
        $order->show_shipping_address = $request->show_shipping_address;
        $order->discount = $request->discount_value;
        $order->discount_type = $request->discount_type;
        $order->status = $request->has('status') ? $request->status : $order->status;
        $order->company_address_id = $request->company_address_id ?: null;
        $order->save();

        // delete old data
        if(isset($item_ids) && !empty($item_ids)) {
            OrderItems::whereNotIn('id', $item_ids)->where('order_id', $order->id)->delete();
        }

        foreach ($items as $key => $item) :

            $order_item_id = isset($item_ids[$key]) ? $item_ids[$key] : 0;

            $orderItem = OrderItems::find($order_item_id);

            if($orderItem === null) {
                $orderItem = new OrderItems();
            }

            $orderItem->order_id = $order->id;
            $orderItem->item_name = $item;
            $orderItem->item_summary = $itemsSummary[$key];
            $orderItem->type = $item;
            $orderItem->hsn_sac_code = (isset($hsn_sac_code[$key]) ? $hsn_sac_code[$key] : null);
            $orderItem->quantity = $quantity[$key];
            $orderItem->unit_price = round($cost_per_item[$key], 2);
            $orderItem->amount = round($amount[$key], 2);
            $orderItem->taxes = $tax ? (array_key_exists($key, $tax) ? json_encode($tax[$key]) : null) : null;
            $orderItem->save();

            // Save order image url
            if(isset($invoice_item_image_url[$key]))
            {
                OrderItemImage::create(
                    [
                        'order_item_id' => $orderItem->id,
                        'external_link' => isset($invoice_item_image_url[$key]) ? $invoice_item_image_url[$key] : ''
                    ]
                );
            }

        endforeach;

        if ($request->has('shipping_address')) {
            if ($order->client_id != null && $order->client_id != '') {
                /** @phpstan-ignore-next-line */
                $client = $order->clientdetails;
            }

            if (isset($client)) {
                $client->shipping_address = $request->shipping_address;
                $client->save();
            }
        }

        if($request->has('status') && $request->status == 'completed' && !$order->invoice){
            $invoice = $this->makeOrderInvoice($order);
            $this->makePayment($order->total, $invoice, 'complete');
        }

        return Reply::redirect(route('orders.index'), __('messages.orderUpdated'));
    }

    public function show($id)
    {
        $this->order = Order::with('client')->findOrFail($id);

        $this->viewPermission = user()->permission('view_order');
        abort_403(!($this->viewPermission == 'all' || ($this->viewPermission == 'both' && ($this->order->added_by == user()->id || $this->order->client_id == user()->id)) || ($this->viewPermission == 'owned' && $this->order->client_id == user()->id) || ($this->viewPermission == 'added' && $this->order->added_by == user()->id)));

        $this->pageTitle = __('app.order').'#'.$id;

        $this->discount = 0;

        /** @phpstan-ignore-next-line */
        if ($this->order->discount > 0) {
            /** @phpstan-ignore-next-line */
            if ($this->order->discount_type == 'percent') {
                $this->discount = (($this->order->discount / 100) * $this->order->sub_total);
            }
            else {
                $this->discount = $this->order->discount;
            }
        }

        $taxList = array();

        /** @phpstan-ignore-next-line */
        $items = OrderItems::whereNotNull('taxes')
            ->where('order_id', $this->order->id)
            ->get();

        foreach ($items as $item) {
            /** @phpstan-ignore-next-line */
            if (isset($this->order) && $this->order->discount > 0 && $this->order->discount_type == 'percent') {
                $item->amount = $item->amount - (($this->order->discount / 100) * $item->amount);
            }

            foreach (json_decode($item->taxes) as $tax) {
                $this->tax = OrderItems::taxbyid($tax)->first();

                if (!isset($taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'])) {
                    $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = ($this->tax->rate_percent / 100) * $item->amount;
                }
                else {
                    $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] + (($this->tax->rate_percent / 100) * $item->amount);
                }
            }
        }

        $this->taxes = $taxList;
        $this->settings = global_setting();
        $this->creditNote = 0;

        $this->credentials = PaymentGatewayCredentials::first();
        $this->methods = OfflinePaymentMethod::activeMethod();

        return view('orders.show', $this->data);
    }

    public function destroy($id)
    {
        $order = Order::findOrFail($id);


        $this->deletePermission = user()->permission('delete_order');
        abort_403(in_array('client', user_roles()) || !($this->deletePermission == 'all' || ($this->deletePermission == 'both' && ($order->added_by == user()->id || $order->client_id == user()->id)) || ($this->deletePermission == 'added' && $order->added_by == user()->id) || ($this->deletePermission == 'owned' && $order->client_id == user()->id)));

        Order::destroy($id);

        return Reply::success(__('messages.orderDeleted'));
    }

    public function offlinePaymentModal(Request $request)
    {
            $this->orderID = $request->order_id;
            $this->methods = OfflinePaymentMethod::activeMethod();

            return view('orders.offline.index', $this->data);
    }

    public function stripeModal(Request $request)
    {
        $this->orderID = $request->order_id;
        $this->countries = countries();
        return view('orders.stripe.index', $this->data);
    }

    public function saveStripeDetail(StoreStripeDetail $request)
    {
        $id = $request->order_id;
        $this->order = Order::with(['client'])->findOrFail($id);
        $this->settings = $this->global;
        $this->credentials = PaymentGatewayCredentials::first();

        $client = null;

        if (isset($this->order) && !is_null($this->order->client_id)) {
            /** @phpstan-ignore-next-line */
            $client = $this->order->client;
        }

        if (($this->credentials->test_stripe_secret || $this->credentials->live_stripe_secret) && !is_null($client)) {
            Stripe::setApiKey($this->credentials->stripe_mode == 'test' ? $this->credentials->test_stripe_secret : $this->credentials->live_stripe_secret);

            $total = $this->order->total;
            $totalAmount = $total;

            $customer = \Stripe\Customer::create([
                'email' => $client->email,
                'name' => $request->clientName,
                'address' => [
                    'line1' => $request->clientName,
                    'city' => $request->city,
                    'state' => $request->state,
                    'country' => $request->country,
                ],
            ]);

            $intent = \Stripe\PaymentIntent::create([
                'amount' => $totalAmount * 100,
                /** @phpstan-ignore-next-line */
                'currency' => $this->order->currency->currency_code,
                'customer' => $customer->id,
                'setup_future_usage' => 'off_session',
                'payment_method_types' => ['card'],
                'description' => $this->order->id . ' Payment',
                'metadata' => ['integration_check' => 'accept_a_payment', 'order_id' => $id]
            ]);

            $this->intent = $intent;
        }

        $customerDetail = [
            'email' => $client->email,
            'name' => $request->clientName,
            'line1' => $request->clientName,
            'city' => $request->city,
            'state' => $request->state,
            'country' => $request->country,
        ];

        $this->customerDetail = $customerDetail;

        $view = view('orders.stripe.stripe-payment', $this->data)->render();

        return Reply::dataOnly(['view' => $view, 'intent' => $this->intent]);
    }

    /* This method will be called when payment fails from front end */
    public function paymentFailed($orderId)
    {
        $order = Order::find($orderId);
        $order->status = 'failed';
        $order->save();

        $errorMessage = null;

        if(request()->gateway == 'Razorpay'){
            $errorMessage = ['code' => request()->errorMessage['code'], 'message' => request()->errorMessage['description']];
        }

        if(request()->gateway == 'Stripe'){
            $errorMessage = ['code' => request()->errorMessage['type'], 'message' => request()->errorMessage['message']];
        }

        /* make new payment entry with status=failed and other details */
        $payment = new Payment();
        $payment->order_id = $order->id;
        $payment->currency_id = $order->currency_id;
        $payment->amount = $order->total;
        $payment->gateway = request()->gateway;
        $payment->paid_on = now();
        $payment->status = 'failed';
        $payment->payment_gateway_response = $errorMessage;
        $payment->save();

        return Reply::error(__('messages.paymentFailed'));
    }

    public function makeInvoice($orderId)
    {
        /* Step1 -  Set order status paid */
        $order = Order::find($orderId);
        $order->status = 'completed';
        $order->save();

        if(!$order->invoice){
            /* Step2 - make an invoice related to recently paid order_id */
            $invoice = new Invoice();
            $invoice->order_id = $orderId;
            $invoice->client_id = $order->client_id;
            $invoice->sub_total = $order->sub_total;
            $invoice->total = $order->total;
            $invoice->currency_id = $order->currency_id;
            $invoice->status = 'paid';
            $invoice->note = str_replace('<p><br></p>', '', trim($order->note));
            $invoice->issue_date = now();
            $invoice->send_status = 1;
            $invoice->invoice_number = Invoice::lastInvoiceNumber() + 1;
            $invoice->due_amount = 0;
            $invoice->save();

            /* Make invoice items */
            $orderItems = OrderItems::where('order_id', $order->id)->get();

            foreach ($orderItems as $item){
                $invoiceItem = InvoiceItems::create(
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

                // Save invoice item image
                if(isset($item->orderItemImage))
                {
                    $invoiceItemImage = new InvoiceItemImage();
                    $invoiceItemImage->invoice_item_id = $invoiceItem->id;
                    $invoiceItemImage->external_link = $item->orderItemImage->external_link;
                    $invoiceItemImage->save();
                }

            }
        }
        else
        {
            $invoice = $order->invoice;
        }

        /* Step3 - make payment of recently created invoice_id */
        $payment = new Payment();
        /** @phpstan-ignore-next-line */
        $payment->invoice_id = $invoice->id;
        $payment->order_id = $orderId;
        $payment->currency_id = $order->currency_id;
        $payment->amount = request()->paymentIntent['amount'] / 100;
        $payment->payload_id = request()->paymentIntent['id'];
        $payment->gateway = 'Stripe';
        $payment->paid_on = now();
        $payment->status = 'complete';
        $payment->save();

        return Reply::success(__('Order successful'));
    }

    public function changeStatus(Request $request)
    {
        $order = Order::findOrFail($request->orderId);

        if($request->status == 'completed' ){
            $invoice = $this->makeOrderInvoice($order);
            $this->makePayment($order->total, $invoice, 'complete');
        }

        /** @phpstan-ignore-next-line */
        if($request->status == 'refunded' && $order->invoice && !$order->invoice->credit_note && $order->status == 'completed'){
            $this->createCreditNote($order->invoice);
        }

        $order->status = $request->status;
        $order->save();

        return Reply::success(__('messages.orderStatusChanged'));
    }

    public function makeOrderInvoice($order)
    {
        if($order->invoice)
        {
            /** @phpstan-ignore-next-line */
            $order->invoice->status = 'paid';
            $order->push();
            return $order->invoice;
        }

        $invoice = new Invoice();
        $invoice->order_id = $order->id;
        $invoice->client_id = $order->client_id;
        $invoice->sub_total = $order->sub_total;
        $invoice->discount = $order->discount;
        $invoice->discount_type = $order->discount_type;
        $invoice->total = $order->total;
        $invoice->currency_id = $order->currency_id;
        $invoice->status = 'paid';
        $invoice->note = str_replace('<p><br></p>', '', trim($order->note));
        $invoice->issue_date = now();
        $invoice->send_status = 1;
        $invoice->invoice_number = Invoice::lastInvoiceNumber() + 1;
        $invoice->due_amount = 0;
        $invoice->hash = \Illuminate\Support\Str::random(32);
        $invoice->added_by = user() ? user()->id : null;
        $invoice->saveQuietly();

        /* Make invoice items */
        $orderItems = OrderItems::where('order_id', $order->id)->get();

        foreach ($orderItems as $item){
            $invoiceItem = new InvoiceItems();
            $invoiceItem->invoice_id = $invoice->id;
            $invoiceItem->item_name = $item->item_name;
            $invoiceItem->item_summary = $item->item_summary;
            $invoiceItem->type = 'item';
            $invoiceItem->quantity = $item->quantity;
            $invoiceItem->unit_price = $item->unit_price;
            $invoiceItem->amount = $item->amount;
            $invoiceItem->taxes = $item->taxes;
            $invoiceItem->saveQuietly();

            // Save invoice item image
            if(isset($item->orderItemImage))
            {
                $invoiceItemImage = new InvoiceItemImage();
                $invoiceItemImage->invoice_item_id = $invoiceItem->id;
                $invoiceItemImage->external_link = $item->orderItemImage->external_link;
                $invoiceItemImage->save();
            }

        }

        $notifyUser = User::withoutGlobalScope('active')->findOrFail($order->client_id);
        event(new NewInvoiceEvent($invoice, $notifyUser));

        return $invoice;
    }

    public function makePayment($amount, $invoice, $status = 'pending', $transactionId = null, $gateway = 'Offline')
    {
        $payment = Payment::where('invoice_id', $invoice->id)->first();

        $payment = ($payment && $transactionId) ? $payment : new Payment();
        $payment->project_id = $invoice->project_id;
        $payment->invoice_id = $invoice->id;
        $payment->order_id = $invoice->order_id;
        $payment->gateway = $gateway;
        $payment->transaction_id = $transactionId;
        $payment->event_id = $transactionId;
        $payment->currency_id = $invoice->currency_id;
        $payment->amount = $amount;
        $payment->paid_on = now();
        $payment->status = $status;
        $payment->save();

        return $payment;
    }

    public function createCreditNote($invoice)
    {

        DB::beginTransaction();

        $clientId = null;

        if ($invoice->client_id) {
            $clientId = $invoice->client_id;
        }
        elseif (!is_null($invoice->project) && $invoice->project->client_id) {
            $clientId = $invoice->project->client_id;
        }

        $creditNote = new CreditNotes();

        $creditNote->project_id = ($invoice->project_id) ? $invoice->project_id : null;
        $creditNote->client_id = $clientId;
        $creditNote->cn_number = CreditNotes::count() + 1;
        $creditNote->invoice_id = $invoice->id;
        $creditNote->issue_date = now()->format(global_setting()->date_format);
        $creditNote->sub_total = round($invoice->sub_total, 2);
        $creditNote->discount = round($invoice->discount, 2);
        $creditNote->discount_type = $invoice->discount_type;
        $creditNote->total = round($invoice->total, 2);
        $creditNote->adjustment_amount = round(0, 2);
        $creditNote->currency_id = $invoice->currency_id;
        $creditNote->save();

        if ($invoice) {

            $invoice->credit_note = 1;

            if ($invoice->status != 'paid') {
                $amount = round($invoice->total, 2);

                if (round($invoice->total, 2) > round($invoice->total - $invoice->getPaidAmount(), 2)) {
                    // create payment for invoice total
                    if ($invoice->status == 'partial') {
                        $amount = round($invoice->total - $invoice->getPaidAmount(), 2);
                    }

                    $invoice->status = 'paid';
                }
                else {
                    $amount = round($invoice->total, 2);
                    $invoice->status = 'partial';
                    $creditNote->status = 'closed';

                    if (round($invoice->total, 2) == round($invoice->total - $invoice->getPaidAmount(), 2)) {
                        if ($invoice->status == 'partial') {
                            $amount = round($invoice->total - $invoice->getPaidAmount(), 2);
                        }

                        $invoice->status = 'paid';
                    }
                }
            }

            $invoice->save();
        }

        DB::commit();

        foreach ($invoice->items as $key => $item) {
            $creditNoteItem = null;

            if (!is_null($item)) {
                $creditNoteItem = CreditNoteItem::create([
                    'credit_note_id' => $creditNote->id,
                    'item_name' => $item->item_name,
                    'type' => 'item',
                    'item_summary' => $item->item_summary,
                    'hsn_sac_code' => $item->hsn_sac_code,
                    'quantity' => $item->quantity,
                    'unit_price' => round($item->unit_price, 2),
                    'amount' => round($item->amount, 2),
                    'taxes' => $item->taxes,
                ]);
            }

            $invoice_item_image_url = $item->invoiceItemImage ? (!empty($item->invoiceItemImage->external_link) ? $item->invoiceItemImage->external_link : $item->invoiceItemImage->file_url) : null;
            /* Invoice file save here */
            if($creditNoteItem && $invoice_item_image_url){
                CreditNoteItemImage::create(
                    [
                        'credit_note_item_id' => $creditNoteItem->id,
                        'external_link' => $invoice_item_image_url,
                    ]
                );
            }
        }

        // Log search
        $this->logSearchEntry($creditNote->id, $creditNote->cn_number, 'creditnotes.show', 'creditNote');

        return Reply::redirect(route('creditnotes.index'), __('messages.creditNoteCreated'));
    }

    public function download($id)
    {
        $this->invoiceSetting = invoice_setting();

        $this->order = Order::with('client')->findOrFail($id);

        $this->viewPermission = user()->permission('view_order');
        abort_403(!($this->viewPermission == 'all' || ($this->viewPermission == 'both' && ($this->order->added_by == user()->id || $this->order->client_id == user()->id)) || ($this->viewPermission == 'owned' && $this->order->client_id == user()->id) || ($this->viewPermission == 'added' && $this->order->added_by == user()->id)));


        App::setLocale($this->invoiceSetting->locale);
        Carbon::setLocale($this->invoiceSetting->locale);

        $pdfOption = $this->domPdfObjectForDownload($id);
        $pdf = $pdfOption['pdf'];
        $filename = $pdfOption['fileName'];

        return $pdf->download($filename . '.pdf');
    }

    public function domPdfObjectForDownload($id)
    {
        $this->invoiceSetting = invoice_setting();
        $this->order = Order::with('client')->findOrFail($id);
        App::setLocale($this->invoiceSetting->locale);
        Carbon::setLocale($this->invoiceSetting->locale);

        $this->paidAmount = $this->order->total;

        $this->discount = 0;

        if ($this->order->discount > 0) {
            if ($this->order->discount_type == 'percent') {
                $this->discount = (($this->order->discount / 100) * $this->order->sub_total);
            }
            else {
                $this->discount = $this->order->discount;
            }
        }

        $taxList = array();

        $items = OrderItems::whereNotNull('taxes')->where('order_id', $this->order->id)->get();

        foreach ($items as $item) {

            foreach (json_decode($item->taxes) as $tax) {
                $this->tax = OrderItems::taxbyid($tax)->first();

                if (!isset($taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'])) {

                    $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = $item->amount * ($this->tax->rate_percent / 100);
                }
                else {
                    $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] + ($item->amount * ($this->tax->rate_percent / 100));
                }
            }
        }

        $this->taxes = $taxList;

        $this->settings = global_setting();

        $this->invoiceSetting = invoice_setting();

        $pdf = app('dompdf.wrapper');
        $pdf->loadView('orders.pdf.' . $this->invoiceSetting->template, $this->data);
        $filename = $this->order->order_number;

        return [
            'pdf' => $pdf,
            'fileName' => $filename
        ];
    }

}
