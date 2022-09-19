<style>
    #logo {
        height: 33px;
    }
</style>

<!-- INVOICE CARD START -->
@if(!is_null($order->client_id) && !is_null($order->clientDetails))
    @php
        $client = $order->client;
    @endphp
@endif
@php
$editOrderPermission = user()->permission('edit_order');
$deleteOrderPermission = user()->permission('delete_order');
@endphp

<div class="card border-0 invoice">
    <!-- CARD BODY START -->
    <div class="card-body">

        @if ($message = Session::get('success'))
            <div class="alert alert-success alert-dismissable">
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button>
                <i class="fa fa-check"></i> {!! $message !!}
            </div>
            <?php Session::forget('success'); ?>
        @endif

        @if ($message = Session::get('error'))
            <div class="custom-alerts alert alert-danger fade in">
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button>
                {!! $message !!}
            </div>
            <?php Session::forget('error'); ?>
        @endif

        <div class="invoice-table-wrapper">
            <table width="100%" class="">
                <tr class="inv-logo-heading">
                    <td><img src="{{ invoice_setting()->logo_url }}" alt="{{ mb_ucwords(global_setting()->company_name) }}"
                            id="logo" /></td>
                    <td align="right" class="font-weight-bold f-21 text-dark text-uppercase mt-4 mt-lg-0 mt-md-0">
                        @lang('app.order')</td>
                </tr>
                <tr class="inv-num">
                    <td class="f-14 text-dark">
                        <p class="mt-3 mb-0">
                            {{ mb_ucwords(global_setting()->company_name) }}<br>
                            @if (!is_null($settings) && $order->address)
                                {!! nl2br($order->address->address) !!}<br>
                            @endif
                            {{ global_setting()->company_phone }}<br>
                            @if ($invoiceSetting->show_gst == 'yes' && $order->address)
                                <br>{{ $order->address->tax_name }}: {{ $order->address->tax_number }}
                            @endif
                        </p><br>
                    </td>
                    <td align="right">
                        <table class="inv-num-date text-dark f-13 mt-3">
                            <tr>
                                <td class="bg-light-grey border-right-0 f-w-500">
                                    @lang('modules.orders.orderNumber')</td>
                                <td class="border-left-0">{{ $pageTitle }}</td>
                            </tr>
                            <tr>
                                <td class="bg-light-grey border-right-0 f-w-500">
                                    @lang('modules.orders.orderDate')</td>
                                <td class="border-left-0">
                                    {{ \Carbon\Carbon::parse($order->order_date)->format(global_setting()->date_format) }}
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            <table width="100%">
                <tr class="inv-unpaid">

                    <td class="f-14 text-dark">
                        <p class="mt-3 mb-0">
                        @if ($order->client->name && $invoiceSetting->show_client_name == 'yes')
                            {{ mb_ucwords($order->client->name) }}<br>
                        @endif

                        @if ($order->client->email && $invoiceSetting->show_client_email == 'yes')
                            {{ $order->client->email }}<br>
                        @endif

                        @if ($order->client->mobile && $invoiceSetting->show_client_phone == 'yes')
                            {{ $order->client->mobile }}<br>
                        @endif

                        @if ($order->client->clientDetails->company_name && $invoiceSetting->show_client_company_name == 'yes')
                            {{ mb_ucwords($order->client->clientDetails->company_name) }}<br>
                        @endif

                        @if ($order->client->clientDetails->address && $invoiceSetting->show_client_company_address == 'yes')
                            {!! nl2br($order->client->clientDetails->address) !!}
                        @endif
                        </p>
                    </td>

                    <td align="right" class="mt-lg-0 mt-md-0">
                        @if ($order->credit_note)
                            <span class="unpaid text-warning border-warning">@lang('app.credit-note')</span>
                        @else

                            <span
                                class="unpaid @switch($order->status)
                                @case('pending') text-warning border-warning @break
                                @case('on-hold') text-info border-info @break
                                @case('failed') text-dark border-dark @break
                                @case('processing') text-primary border-primary @break
                                @case('completed') text-success border-success @break
                                @case('canceled') text-red border-red @break
                                @case('refunded') text-body border-dark @break
                                @default @endswitch rounded f-15 ">@lang('modules.invoices.'.$order->status)</span>
                        @endif
                    </td>
                </tr>
                <tr>
                    <td height="30" colspan="2"></td>
                </tr>
            </table>
            <table width="100%" class="inv-desc d-none d-lg-table d-md-table">
                <tr>
                    <td colspan="2">
                        <table class="inv-detail f-14 table-responsive-sm" width="100%">
                            <tr class="i-d-heading bg-light-grey text-dark-grey font-weight-bold">
                                <td class="border-right-0" width="35%">@lang('app.description')</td>
                                @if($invoiceSetting->hsn_sac_code_show)
                                    <td class="border-right-0 border-left-0" align="right">@lang("app.hsnSac")</td>
                                @endif
                                <td class="border-right-0 border-left-0" align="right">@lang("modules.invoices.qty")
                                </td>
                                <td class="border-right-0 border-left-0" align="right">
                                    @lang("modules.invoices.unitPrice") ({{ $order->currency->currency_code }})
                                </td>
                                <td class="border-right-0 border-left-0" align="right">@lang("modules.invoices.tax")</td>
                                <td class="border-left-0" align="right">
                                    @lang("modules.invoices.amount")
                                    ({{ $order->currency->currency_code }})</td>
                            </tr>

                            @foreach ($order->items as $item)
                                <tr class="text-dark">
                                    <td>{{ ucfirst($item->item_name) }}</td>
                                    @if($invoiceSetting->hsn_sac_code_show)
                                        <td align="right">{{ $item->hsn_sac_code }}</td>
                                    @endif
                                    <td align="right">{{ $item->quantity }}</td>
                                    <td align="right">
                                        {{ currency_formatter($item->unit_price, '') }}</td>
                                    <td align="right">{{ $item->tax_list }}</td>
                                    <td align="right">{{ currency_formatter($item->amount, '') }}
                                    </td>
                                </tr>
                                @if ($item->item_summary != '' || $item->orderItemImage)
                                    <tr class="text-dark">
                                        <td colspan="{{ $invoiceSetting->hsn_sac_code_show ? '6' : '5' }}" class="border-bottom-0">
                                            {!! nl2br(strip_tags($item->item_summary, ['p', 'b', 'strong', 'a'])) !!}
                                            @if ($item->orderItemImage)
                                                <p class="mt-2">
                                                    <a href="javascript:;" class="img-lightbox" data-image-url="{{ $item->orderItemImage->file_url }}">
                                                        <img src="{{ $item->orderItemImage->file_url }}" width="80" height="80" class="img-thumbnail">
                                                    </a>
                                                </p>
                                            @endif
                                        </td>
                                    </tr>
                                @endif
                                @if ($item->has('product') && $item->product && $item->product->downloadable && $item->product->download_file_url && $order->status == 'completed')
                                    <tr class="text-dark">
                                        <td colspan="{{ $invoiceSetting->hsn_sac_code_show ? '6' : '5' }}" class="border-bottom-0">
                                            <p class="mt-2">
                                                <x-forms.link-secondary icon="download" :link="$item->product->download_file_url" class="mr-3" download="{{ $item->product->name }}">@lang('app.download')</x-forms.link-secondary>
                                            </p>
                                        </td>
                                    </tr>

                                @endif
                            @endforeach


                            <tr>
                                <td colspan="{{ $invoiceSetting->hsn_sac_code_show ? '4' : '3' }}" class="blank-td border-bottom-0 border-left-0 border-right-0"></td>
                                <td class="p-0 border-right-0">
                                    <table width="100%">
                                        <tr class="text-dark-grey" align="right">
                                            <td class="w-50 border-top-0 border-left-0">
                                                @lang("modules.invoices.subTotal")</td>
                                        </tr>
                                        @if ($discount != 0 && $discount != '')
                                            <tr class="text-dark-grey" align="right">
                                                <td class="w-50 border-top-0 border-left-0">
                                                    @lang("modules.invoices.discount")</td>
                                            </tr>
                                        @endif
                                        @foreach ($taxes as $key => $tax)
                                            <tr class="text-dark-grey" align="right">
                                                <td class="w-50 border-top-0 border-left-0">
                                                    {{ mb_strtoupper($key) }}</td>
                                            </tr>
                                        @endforeach
                                        <tr class="bg-light-grey text-dark f-w-500 f-16" align="right">
                                            <td class="w-50 border-bottom-0 border-left-0">
                                                @lang("modules.invoices.total")</td>
                                        </tr>
                                    </table>
                                </td>
                                <td class="p-0 border-right-0" align="right">
                                    <table width="100%">
                                        <tr class="text-dark-grey" align="right">
                                            <td class="border-top-0 border-left-0">
                                                {{ currency_formatter($order->sub_total, '') }}</td>
                                        </tr>
                                        @if ($discount != 0 && $discount != '')
                                            <tr class="text-dark-grey" align="right">
                                                <td class="border-top-0 border-left-0">
                                                    {{ currency_formatter($discount, '') }}</td>
                                            </tr>
                                        @endif
                                        @foreach ($taxes as $key => $tax)
                                            <tr class="text-dark-grey" align="right">
                                                <td class="border-top-0 border-left-0">
                                                    {{ currency_formatter($tax, '') }}</td>
                                            </tr>
                                        @endforeach
                                        <tr class="bg-light-grey text-dark f-w-500 f-16" align="right">
                                            <td class="border-bottom-0 border-left-0">
                                                {{ currency_formatter($order->total, '') }}
                                                {{ $order->currency->currency_code }}</td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>

                </tr>
            </table>
            <table width="100%" class="inv-desc-mob d-block d-lg-none d-md-none">

                @foreach ($order->items as $item)
                    @if ($item->type == 'item')

                        <tr>
                            <th width="50%" class="bg-light-grey text-dark-grey font-weight-bold">
                                @lang('app.description')</th>
                            <td class="p-0 ">
                                <table>
                                    <tr width="100%">
                                        <td class="border-left-0 border-right-0 border-top-0">
                                            {{ ucfirst($item->item_name) }}</td>
                                    </tr>
                                    @if ($item->item_summary != '' || $item->orderItemImage)
                                        <tr>
                                            <td class="border-left-0 border-right-0 border-bottom-0">
                                                {!! nl2br(strip_tags($item->item_summary, ['p', 'b', 'strong', 'a'])) !!}
                                                @if ($item->orderItemImage)
                                                    <p class="mt-2">
                                                        <a href="javascript:;" class="img-lightbox" data-image-url="{{ $item->orderItemImage->file_url }}">
                                                            <img src="{{ $item->orderItemImage->file_url }}" width="80" height="80" class="img-thumbnail">
                                                        </a>
                                                    </p>
                                                @endif
                                            </td>
                                        </tr>
                                    @endif
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <th width="50%" class="bg-light-grey text-dark-grey font-weight-bold">
                                @lang("modules.invoices.qty")</th>
                            <td width="50%">{{ $item->quantity }}</td>
                        </tr>
                        <tr>
                            <th width="50%" class="bg-light-grey text-dark-grey font-weight-bold">
                                @lang("modules.invoices.unitPrice")
                                ({{ $order->currency->currency_code }})</th>
                            <td width="50%">{{ currency_formatter($item->unit_price, '') }}</td>
                        </tr>
                        <tr>
                            <th width="50%" class="bg-light-grey text-dark-grey font-weight-bold">
                                @lang("modules.invoices.amount")
                                ({{ $order->currency->currency_code }})</th>
                            <td width="50%">{{ currency_formatter($item->amount, '') }}</td>
                        </tr>
                        <tr>
                            <td height="3" class="p-0 " colspan="2"></td>
                        </tr>
                    @endif
                @endforeach

                <tr>
                    <th width="50%" class="text-dark-grey font-weight-normal">@lang("modules.invoices.subTotal")
                    </th>
                    <td width="50%" class="text-dark-grey font-weight-normal">
                        {{ currency_formatter($order->sub_total, '') }}</td>
                </tr>
                @if ($discount != 0 && $discount != '')
                    <tr>
                        <th width="50%" class="text-dark-grey font-weight-normal">@lang("modules.invoices.discount")
                        </th>
                        <td width="50%" class="text-dark-grey font-weight-normal">
                            {{ currency_formatter($discount, '') }}</td>
                    </tr>
                @endif

                @foreach ($taxes as $key => $tax)
                    <tr>
                        <th width="50%" class="text-dark-grey font-weight-normal">{{ mb_strtoupper($key) }}</th>
                        <td width="50%" class="text-dark-grey font-weight-normal">
                            {{ currency_formatter($tax, '') }}</td>
                    </tr>
                @endforeach
                <tr>
                    <th width="50%" class="text-dark-grey font-weight-bold">@lang("modules.invoices.total")</th>
                    <td width="50%" class="text-dark-grey font-weight-bold">
                        {{ currency_formatter($order->total, '') }}</td>
                </tr>
            </table>
            <table class="inv-note">
                <tr>
                    <td height="30" colspan="2"></td>
                </tr>
                <tr>
                    <td>
                        <table>
                            <tr>@lang('app.clientNote')</tr>
                            <tr>
                                <p class="text-dark-grey">{!! !empty($order->note) ? $order->note : '--' !!}</p>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <!-- CARD BODY END -->
    <!-- CARD FOOTER START -->
    <div class="card-footer bg-white border-0 d-flex justify-content-start py-0 py-lg-4 py-md-4 mb-4 mb-lg-3 mb-md-3 ">

        <div class="d-flex">


                <div class="inv-action mr-3 mr-lg-3 mr-md-3 dropup">
                    <button class="dropdown-toggle btn-primary" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">@lang('app.action')
                        <span><i class="fa fa-chevron-up f-15"></i></span>
                    </button>
                    <!-- DROPDOWN - INFORMATION -->
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton" tabindex="0">
                        <li><a href="{{ route('orders.download', $order->id) }}" class="dropdown-item"><i class="fa fa-download f-w-500 mr-2 f-11"></i> @lang('app.download')</a></li>
                        @if(
                            (in_array('admin', user_roles()) || in_array('employee', user_roles()))
                        )
                        @if (($editOrderPermission == 'all' || ($editOrderPermission == 'added' && $order->added_by == user()->id)) && $order->status == 'completed')
                            <li>
                                <a class="dropdown-item f-14 text-dark orderStatus" data-status="refunded"
                                href="javascript:;">
                                    <i class="fa fa-money-bill f-w-500 mr-2 f-11"></i> @lang('app.refund')
                                </a>
                            </li>
                        @endif

                        @if (($editOrderPermission == 'all' || (in_array($editOrderPermission, ['added', 'both']) && $order->added_by == user()->id)) && in_array($order->status, ['pending', 'on-hold', 'failed', 'processing']))
                            <li>
                                <a class="dropdown-item f-14 text-dark orderStatus" data-status="completed"
                                href="javascript:;">
                                    <i class="fa fa-check f-w-500 mr-2 f-11"></i> @lang('app.orderMarkAsComplete')
                                </a>
                            </li>
                        @endif

                        @if (in_array($order->status, ['completed', 'refunded']))
                            <li>
                                <a class="dropdown-item f-14 text-dark"
                                href="{{ route('invoices.show', $order->invoice->id) }}">
                                    <i class="fa fa-receipt f-w-500 mr-2 f-11"></i> @lang('app.viewInvoice')
                                </a>
                            </li>
                        @endif

                        @if (!in_array($order->status, ['completed', 'canceled', 'refunded']) && ($editOrderPermission == 'all'|| ($editOrderPermission == 'both' && ($order->added_by == user()->id || $order->client_id == user()->id)) || ($editOrderPermission == 'added' && $order->added_by == user()->id) || ($editOrderPermission == 'owned' && $order->client_id == user()->id)))
                            <li>
                                <a class="dropdown-item f-14 text-dark openRightModal" href="{{route('orders.edit', $order->id)}}">
                                    <i class="fa fa-edit f-w-500 mr-2 f-11"></i> @lang('app.edit')
                                </a>
                            </li>
                        @endif

                        @if (!in_array($order->status, ['completed', 'refunded']) && ($deleteOrderPermission == 'all'|| ($deleteOrderPermission == 'both' && ($order->added_by == user()->id || $order->client_id == user()->id)) || ($deleteOrderPermission == 'added' && $order->added_by == user()->id) || ($deleteOrderPermission == 'owned' && $order->client_id == user()->id)))
                            <li>
                                <a class="dropdown-item f-14 text-dark deleteOrder" data-order-id="{{$order->id}}"
                                href="javascript:;">
                                    <i class="fa fa-trash f-w-500 mr-2 f-11"></i> @lang('app.delete')
                                </a>
                            </li>
                        @endif
                        @endif
                    </ul>
                </div>

            {{-- PAYMENT GATEWAY --}}
            @if (in_array('client', user_roles()) && $order->total > 0 && in_array($order->status, ['pending', 'failed'])
            && ($credentials->paypal_status == 'active' || $credentials->stripe_status == 'active' || $credentials->paystack_status == 'active' || $credentials->flutterwave_status == 'active' || $credentials->mollie_status == 'active' || $credentials->razorpay_status == 'active' || $credentials->authorize_status == 'active' || $credentials->payfast_status == 'active'|| $credentials->square_status == 'active' || $methods->count() > 0))
                <div class="inv-action mr-3 mr-lg-3 mr-md-3 dropup">
                    <button class="dropdown-toggle btn-primary rounded mr-3 mr-lg-0 mr-md-0 f-15" type="button"
                        id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false">@lang('modules.invoices.payNow')
                        <span><i class="fa fa-chevron-down f-15"></i></span>
                    </button>
                    <!-- DROPDOWN - INFORMATION -->
                    <ul class="dropdown-menu dropdown-menu-left" aria-labelledby="dropdownMenuButton" tabindex="0">
                        @if ($credentials->stripe_status == 'active')
                            <li>
                                <a class="dropdown-item f-14 text-dark" href="javascript:;"
                                    data-order-id="{{ $order->id }}" id="stripeModal">
                                    <i class="fab fa-stripe-s f-w-500 mr-2 f-11"></i>
                                    @lang('modules.invoices.payStripe')
                                </a>
                            </li>
                        @endif

                        @if ($credentials->paystack_status == 'active')
                            <li>
                                <a class="dropdown-item f-14 text-dark" href="javascript:void(0);" data-order-id="{{ $order->id }}"  id="paystackModal">
                                    <img style="height: 15px;" src="https://s3-eu-west-1.amazonaws.com/pstk-integration-logos/paystack.jpg"> @lang('modules.invoices.payPaystack')</a>
                            </li>
                        @endif
                        @if ($credentials->flutterwave_status == 'active')
                            <li>
                                <a class="dropdown-item f-14 text-dark" href="javascript:void(0);" data-order-id="{{ $order->id }}"  id="flutterwaveModal">
                                    <img style="height: 15px;" src="{{ asset('img/flutterwave.png') }}"> @lang('modules.invoices.payFlutterwave')</a>
                            </li>
                        @endif
                        @if ($credentials->payfast_status == 'active')
                            <li>
                                <a class="dropdown-item f-14 text-dark" href="javascript:void(0);"
                                    id="payfastModal">
                                    <img style="height: 15px;" src="{{ asset('img/payfast.png') }}">
                                    @lang('modules.invoices.payPayfast')</a>
                            </li>
                        @endif

                        @if ($credentials->square_status == 'active')
                            <li>
                                <a class="dropdown-item f-14 text-dark" href="javascript:void(0);"
                                    id="squareModal">
                                    <img style="height: 15px;" src="{{ asset('img/square.svg') }}">
                                    @lang('modules.invoices.paySquare')</a>
                            </li>
                        @endif

                        @if ($credentials->authorize_status == 'active')
                        <li>
                            <a class="dropdown-item f-14 text-dark" href="javascript:void(0);"
                                data-order-id="{{ $order->id }}" id="authorizeModal">
                                <img style="height: 15px;" src="{{ asset('img/authorize.png') }}">
                                @lang('modules.invoices.payAuthorize')</a>
                        </li>
                        @endif

                        @if ($credentials->mollie_status == 'active')
                            <li>
                                <a class="dropdown-item f-14 text-dark" href="javascript:void(0);" data-order-id="{{ $order->id }}"  id="mollieModal">
                                    <img style="height: 10px;" src="{{ asset('img/mollie.svg') }}"> @lang('modules.invoices.payMollie')</a>
                            </li>
                        @endif

                        @if ($credentials->razorpay_status == 'active')
                            <li>
                                <a class="dropdown-item f-14 text-dark" href="javascript:;" id="razorpayPaymentButton">
                                    <i class="fa fa-credit-card f-w-500 mr-2 f-11"></i>
                                    @lang('modules.invoices.payRazorpay')
                                </a>
                            </li>
                        @endif
                        @if ($credentials->paypal_status == 'active')
                            <li>
                                <a class="dropdown-item f-14 text-dark" href="{{ route('paypal', [$order->id]) }}?type=order">
                                    <i class="fab fa-paypal f-w-500 mr-2 f-11"></i> @lang('modules.invoices.payPaypal')
                                </a>
                            </li>
                        @endif
                        @if ($methods->count() > 0)
                            <li>
                                <a class="dropdown-item f-14 text-dark" href="javascript:;" id="offlinePaymentModal"
                                    data-order-id="{{ $order->id }}">
                                    <i class="fa fa-money-bill f-w-500 mr-2 f-11"></i>
                                    @lang('modules.invoices.payOffline')
                                </a>
                            </li>
                        @endif
                    </ul>
                </div>
            @endif
            {{-- PAYMENT GATEWAY --}}
        </div>

    </div>
    <!-- CARD FOOTER END -->

</div>
<!-- INVOICE CARD END -->

{{-- Custom fields data --}}
@if (isset($fields) && count($fields) > 0)
    <div class="row mt-4">
        <!-- TASK STATUS START -->
        <div class="col-md-12">
            <x-cards.data>
                @foreach ($fields as $field)
                    @if ($field->type == 'text' || $field->type == 'password' || $field->type == 'number')
                        <x-cards.data-row :label="$field->label"
                            :value="$order->custom_fields_data['field_'.$field->id] ?? '--'" />
                    @elseif($field->type == 'textarea')
                        <x-cards.data-row :label="$field->label" html="true"
                            :value="$order->custom_fields_data['field_'.$field->id] ?? '--'" />
                    @elseif($field->type == 'radio')
                        <x-cards.data-row :label="$field->label"
                            :value="(!is_null($order->custom_fields_data['field_' . $field->id]) ? $order->custom_fields_data['field_' . $field->id] : '--')" />
                    @elseif($field->type == 'select')
                        <x-cards.data-row :label="$field->label"
                            :value="(!is_null($order->custom_fields_data['field_' . $field->id]) && $order->custom_fields_data['field_' . $field->id] != '' ? $field->values[$order->custom_fields_data['field_' . $field->id]] : '--')" />
                    @elseif($field->type == 'date')
                        <x-cards.data-row :label="$field->label"
                            :value="(!is_null($order->custom_fields_data['field_' . $field->id]) && $order->custom_fields_data['field_' . $field->id] != '' ? \Carbon\Carbon::parse($order->custom_fields_data['field_' . $field->id])->format(global_setting()->date_format) : '--')" />
                    @endif
                @endforeach
            </x-cards.data>
        </div>
    </div>
@endif

<script src="https://checkout.razorpay.com/v1/checkout.js"></script>

<script>

    $('body').on('click', '.orderStatus', function() {
        var url = "{{ route('orders.change_status') }}";
        var token = "{{ csrf_token() }}";
        var status = $(this).data('status');
        var statusMessage = '';

        switch (status) {
            case 'pending':
                statusMessage = "@lang('messages.orderStatus.pending')";
                break;
            case 'on-hold':
                statusMessage = "@lang('messages.orderStatus.onHold')";
                break;
            case 'failed':
                statusMessage = "@lang('messages.orderStatus.failed')";
                break;
            case 'processing':
                statusMessage = "@lang('messages.orderStatus.processing')";
                break;
            case 'completed':
                statusMessage = "@lang('messages.orderStatus.completed')";
                break;
            case 'canceled':
                statusMessage = "@lang('messages.orderStatus.canceled')";
                break;
            case 'refunded':
                statusMessage = "@lang('messages.orderStatus.refunded')";
                break;

            default:
                statusMessage = "@lang('messages.orderStatus.pending')";
                break;
        }

        Swal.fire({
            title: "@lang('messages.confirmation.orderStatusChange')",
            text: statusMessage,
            icon: 'warning',
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: "@lang('app.yes')",
            cancelButtonText: "@lang('app.cancel')",
            customClass: {
                confirmButton: 'btn btn-primary mr-3',
                cancelButton: 'btn btn-secondary'
            },
            showClass: {
                popup: 'swal2-noanimation',
                backdrop: 'swal2-noanimation'
            },
            buttonsStyling: false
        }).then((result) => {
            if (result.isConfirmed) {
                $.easyAjax({
                    url: url,
                    type: "POST",
                    container: '.content-wrapper',
                    blockUI: true,
                    data: {
                        '_token': token,
                        orderId: {{ $order->id }},
                        status: status
                    },
                    success: function(data) {
                        if (data.status == 'success') {
                            $.unblockUI();
                            window.location.reload();
                        }
                    }
                });
            }
        });

    });

    $('body').on('click', '.deleteOrder', function() {
        Swal.fire({
            title: "@lang('messages.sweetAlertTitle')",
            text: "@lang('messages.recoverRecord')",
            icon: 'warning',
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: "@lang('messages.confirmDelete')",
            cancelButtonText: "@lang('app.cancel')",
            customClass: {
                confirmButton: 'btn btn-primary mr-3',
                cancelButton: 'btn btn-secondary'
            },
            showClass: {
                popup: 'swal2-noanimation',
                backdrop: 'swal2-noanimation'
            },
            buttonsStyling: false
        }).then((result) => {
            if (result.isConfirmed) {
                var url = "{{ route('orders.destroy', $order->id) }}";

                var token = "{{ csrf_token() }}";

                $.easyAjax({
                    type: 'POST',
                    url: url,
                    blockUI: true,
                    data: {
                        '_token': token,
                        '_method': 'DELETE'
                    },
                    success: function(response) {
                        if (response.status == "success") {
                            window.location.href = "{{ route('orders.index') }}";
                        }
                    }
                });
            }
        });
    });

    $('body').on('click', '#stripeModal', function() {
        let orderId = $(this).data('order-id');
        let queryString = "?order_id=" + orderId;
        let url = "{{ route('orders.stripe_modal') }}" + queryString;

        $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
        $.ajaxModal(MODAL_LG, url);
    });


    $('body').on('click', '#paystackModal', function() {
        let id = $(this).data('order-id');
        let queryString = "?id="+id+"&type=order";
        let url = "{{ route('front.paystack_modal') }}"+queryString;

        $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
        $.ajaxModal(MODAL_LG, url);
    });

    $('body').on('click', '#flutterwaveModal', function() {
        let id = $(this).data('order-id');
        let queryString = "?id="+id+"&type=order";
        let url = "{{ route('front.flutterwave_modal') }}"+queryString;

        $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
        $.ajaxModal(MODAL_LG, url);
    });

    $('body').on('click', '#authorizeModal', function() {
        let id = $(this).data('order-id');
        let queryString = "?id="+id+"&type=order";
        let url = "{{ route('front.authorize_modal') }}"+queryString;

        $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
        $.ajaxModal(MODAL_LG, url);
    })

    $('body').on('click', '#mollieModal', function() {
        let id = $(this).data('order-id');
        let queryString = "?id="+id+"&type=order";
        let url = "{{ route('front.mollie_modal') }}"+queryString;

        $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
        $.ajaxModal(MODAL_LG, url);
    });

    $('body').on('click', '#payfastModal', function() {
        // Block model UI until payment happens
        $.easyBlockUI();

        $.easyAjax({
            url: "{{ route('payfast_public') }}",
            type: "POST",
            blockUI: true,
            data: {
                id:'{{$order->id}}',
                type:'order',
                _token: '{{ csrf_token() }}'
            },
            success: function(response) {
                if(response.status == 'success'){
                    $('body').append(response.form);
                    $('#payfast-pay-form').submit();
                }
            }
        });
    });

    $('body').on('click', '#squareModal', function() {
        // Block model UI until payment happens
        $.easyBlockUI();

        $.easyAjax({
            url: "{{route('square_public')}}",
            type: "POST",
            blockUI: true,
            data: {
                id:'{{$order->id}}',
                type:'order',
                _token: '{{ csrf_token() }}'
            }
        });
    });

    $('body').on('click', '#offlinePaymentModal', function() {
        let orderId = $(this).data('order-id');
        let queryString = "?order_id=" + orderId;
        let url = "{{ route('orders.offline_payment_modal') }}" + queryString;

        $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
        $.ajaxModal(MODAL_LG, url);
    });

    @if ($credentials->razorpay_status == 'active')
        $('body').on('click', '#razorpayPaymentButton', function() {
        var amount = "{{ number_format((float) $order->total, 2, '.', '') * 100 }}";
        var orderId = "{{ $order->id }}";
        var clientEmail = "{{ $user->email }}";

        var options = {
            "key": "{{ $credentials->razorpay_mode == 'test' ? $credentials->test_razorpay_key : $credentials->live_razorpay_key }}",
            "amount": amount,
            "currency": '{{ $order->currency->currency_code }}',
            "name": "{{ $companyName }}",
            "description": "Invoice Payment",
            "image": "{{ global_setting()->logo_url }}",
            "handler": function (response) {
                confirmRazorpayPayment(response.razorpay_payment_id, orderId);
            },
            "modal": {
            "ondismiss": function () {
            // On dismiss event
            }
            },
            "prefill": {
                "email": clientEmail
            },
            "notes": {
                "purchase_id": orderId, //invoice ID
                "type": "order"
            }
        };
        var rzp1 = new Razorpay(options);

        /* Make an entry to payment table when payment fails */
        rzp1.on('payment.failed', function (response){
            /* Response will be like this - code: "BAD_REQUEST_ERROR", reason: "payment_failed"
                , description: "Payment failed"
            */
            url = "{{ route('orders.payment_failed', ':id') }}";
            url = url.replace(':id', orderId);

            $.easyAjax({
                url: url,
                type: "POST",
                data: {errorMessage: response.error, gateway: 'Razorpay',  "_token" : "{{ csrf_token() }}"},
            })
        });

        rzp1.open();

        });

        // Confirmation after transaction
        function confirmRazorpayPayment(id, orderId) {
            // Block UI immediatly after payment modal disappear
            $.easyBlockUI();

            $.easyAjax({
                type: 'POST',
                url: "{{ route('pay_with_razorpay') }}",
                data: {_token:'{{ csrf_token() }}', paymentId: id, orderId: orderId, type: 'order'}
            })
        }

    @endif

</script>
