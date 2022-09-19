<style>
    #logo {
        height: 33px;
    }
</style>

@php
    $addPaymentPermission = user()->permission('add_payments');
    $deleteInvoicePermission = user()->permission('delete_invoices');
    $editInvoicePermission = user()->permission('edit_invoices');
@endphp

<!-- INVOICE CARD START -->
@if (!is_null($invoice->project) && !is_null($invoice->project->client) && !is_null($invoice->project->client->clientDetails))
    @php
        $client = $invoice->project->client;
    @endphp
@elseif(!is_null($invoice->client_id) && !is_null($invoice->clientDetails))
    @php
        $client = $invoice->client;
    @endphp
@endif

@if (!$invoice->send_status && $invoice->status != 'canceled' && $invoice->amountDue() > 0)
    <x-alert icon="info-circle" type="warning">
        @lang('messages.unsentInvoiceInfo')
    </x-alert>
@endif

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
            <table width="100%">
                <tr class="inv-logo-heading">
                    <td><img src="{{ invoice_setting()->logo_url }}" alt="{{ mb_ucwords(global_setting()->company_name) }}"
                            id="logo" /></td>
                    <td align="right" class="font-weight-bold f-21 text-dark text-uppercase mt-4 mt-lg-0 mt-md-0">
                        @lang('app.invoice')</td>
                </tr>
                <tr class="inv-num">
                    <td class="f-14 text-dark">
                        <p class="mt-3 mb-0">
                            {{ mb_ucwords(global_setting()->company_name) }}<br>
                            @if (!is_null($settings) && $invoice->address)
                                {!! nl2br($invoice->address->address) !!}<br>
                            @endif
                            {{ global_setting()->company_phone }}
                            @if ($invoiceSetting->show_gst == 'yes' && $invoice->address)
                                <br>{{ $invoice->address->tax_name }}: {{ $invoice->address->tax_number }}
                            @endif
                        </p><br>
                    </td>
                    <td align="right">
                        <table class="inv-num-date text-dark f-13 mt-3">
                            <tr>
                                <td class="bg-light-grey border-right-0 f-w-500">
                                    @lang('modules.invoices.invoiceNumber')</td>
                                <td class="border-left-0">{{ $invoice->invoice_number }}</td>
                            </tr>
                            @if ($creditNote)
                                <tr>
                                    <td class="bg-light-grey border-right-0 f-w-500">@lang('app.credit-note')</td>
                                    <td class="border-left-0">{{ $creditNote->cn_number }}</td>
                                </tr>
                            @endif
                            <tr>
                                <td class="bg-light-grey border-right-0 f-w-500">
                                    @lang('modules.invoices.invoiceDate')</td>
                                <td class="border-left-0">{{ $invoice->issue_date->format(global_setting()->date_format) }}
                                </td>
                            </tr>

                            @if (empty($invoice->order_id) && $invoice->status === 'unpaid' && $invoice->due_date->year > 1)
                                <tr>
                                    <td class="bg-light-grey border-right-0 f-w-500">@lang('app.dueDate')</td>
                                    <td class="border-left-0">{{ $invoice->due_date->format(global_setting()->date_format) }}
                                    </td>
                                </tr>
                            @endif
                        </table>
                    </td>
                </tr>
                <tr>
                    <td height="20"></td>
                </tr>
            </table>
            <table width="100%">
                <tr class="inv-unpaid">
                    <td class="f-14 text-dark">
                        <p class="mb-0 text-left">
                            @if (
                                ($invoice->client || $invoice->clientDetails)
                                && ($invoice->client->name || $invoice->client->email || $invoice->client->mobile || $invoice->clientDetails->company_name || $invoice->clientDetails->address )
                                && (invoice_setting()->show_client_name == 'yes' || invoice_setting()->show_client_email == 'yes' || invoice_setting()->show_client_phone == 'yes' || invoice_setting()->show_client_company_name == 'yes' || invoice_setting()->show_client_company_address == 'yes')
                            )
                                <span class="text-dark-grey text-capitalize">@lang("modules.invoices.billedTo")</span><br>

                                @if ($invoice->client && $invoice->client->name && invoice_setting()->show_client_name == 'yes')
                                    {{ mb_ucwords($invoice->client->name) }}<br>
                                @endif

                                @if ($invoice->client && $invoice->client->email && invoice_setting()->show_client_email == 'yes')
                                {{ $invoice->client->email }}<br>
                                @endif

                                @if ($invoice->client && $invoice->client->mobile && invoice_setting()->show_client_phone == 'yes')
                                    {{ $invoice->client->mobile }}<br>
                                @endif

                                @if ($invoice->clientDetails && $invoice->clientDetails->company_name && invoice_setting()->show_client_company_name == 'yes')
                                    {{ mb_ucwords($invoice->clientDetails->company_name) }}<br>
                                @endif

                                @if ($invoice->clientDetails && $invoice->clientDetails->address && invoice_setting()->show_client_company_address == 'yes')
                                    {!! nl2br($invoice->clientDetails->address) !!}
                                @endif

                            @endif

                            @if (($invoiceSetting->show_project == 1) && (isset($invoice->project)))
                            <br><br>
                            <span class="text-dark-grey text-capitalize">@lang("modules.invoices.projectName")</span><br>
                            {{ $invoice->project->project_name }}
                            @endif

                            @if ($invoiceSetting->show_gst == 'yes' && !is_null($client->clientDetails->gst_number))
                                <br>
                                @lang('app.gstIn'): {{ $client->clientDetails->gst_number }}
                            @endif
                        </p>
                    </td>
                    @if ($invoice->show_shipping_address == 'yes')
                        <td class="f-14 text-black">
                            <p class="mb-0 text-left"><span
                                    class="text-dark-grey text-capitalize">@lang("app.shippingAddress")</span><br>
                                {!! nl2br($client->clientDetails->shipping_address) !!}</p>
                        </td>
                    @endif
                    <td align="right" class="mt-4 mt-lg-0 mt-md-0">
                        @if ($invoice->credit_note)
                            <span class="unpaid text-warning border-warning rounded">@lang('app.credit-note')</span>
                        @else
                            <span
                                class="unpaid {{ $invoice->status == 'partial' ? 'text-primary border-primary' : '' }} {{ $invoice->status == 'paid' ? 'text-success border-success' : '' }} rounded f-15 ">@lang('modules.invoices.'.$invoice->status)</span>
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
                                @if ($invoiceSetting->hsn_sac_code_show)
                                    <td class="border-right-0 border-left-0" align="right">@lang("app.hsnSac")</td>
                                @endif
                                <td class="border-right-0 border-left-0" align="right">@lang("modules.invoices.qty")
                                </td>
                                <td class="border-right-0 border-left-0" align="right">
                                    @lang("modules.invoices.unitPrice") ({{ $invoice->currency->currency_code }})
                                </td>
                                <td class="border-right-0 border-left-0" align="right">@lang("modules.invoices.tax")</td>
                                <td class="border-left-0" align="right" width="{{ $invoiceSetting->hsn_sac_code_show ? '17%' : '20%' }}">
                                    @lang("modules.invoices.amount")
                                    ({{ $invoice->currency->currency_code }})</td>
                            </tr>
                            @foreach ($invoice->items as $item)
                                @if ($item->type == 'item')
                                    <tr class="text-dark font-weight-semibold f-13">
                                        <td>{{ ucfirst($item->item_name) }}</td>
                                        @if ($invoiceSetting->hsn_sac_code_show)
                                            <td align="right">{{ $item->hsn_sac_code }}</td>
                                        @endif
                                        <td align="right">{{ $item->quantity }}</td>
                                        <td align="right">
                                            {{ currency_formatter($item->unit_price, '') }}</td>
                                        <td align="right">{{ $item->tax_list }}</td>
                                        <td align="right">{{ currency_formatter($item->amount, '') }}
                                        </td>
                                    </tr>
                                    @if ($item->item_summary || $item->invoiceItemImage)
                                        <tr class="text-dark f-12">
                                            <td colspan="{{ $invoiceSetting->hsn_sac_code_show ? '6' : '5' }}"
                                                class="border-bottom-0">
                                                {!! nl2br($item->item_summary) !!}
                                                @if ($item->invoiceItemImage)
                                                    <p class="mt-2">
                                                        <a href="javascript:;" class="img-lightbox" data-image-url="{{ $item->invoiceItemImage->file_url }}">
                                                            <img src="{{ $item->invoiceItemImage->file_url }}" width="80" height="80" class="img-thumbnail">
                                                        </a>
                                                    </p>
                                                @endif
                                            </td>
                                        </tr>
                                    @endif
                                @endif
                            @endforeach

                            <tr>
                                <td colspan="{{ $invoiceSetting->hsn_sac_code_show ? '4' : '3' }}" class="blank-td border-bottom-0 border-left-0 border-right-0"></td>
                                <td class="p-0 border-right-0" align="right">
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
                                        <tr class=" text-dark-grey font-weight-bold" align="right">
                                            <td class="w-50 border-bottom-0 border-left-0">
                                                @lang("modules.invoices.total")</td>
                                        </tr>
                                        <tr class="bg-light-grey text-dark f-w-500 f-16" align="right">
                                            <td class="w-50 border-bottom-0 border-left-0">
                                                @lang("modules.invoices.total")
                                                @lang("modules.invoices.due")</td>
                                        </tr>
                                    </table>
                                </td>
                                <td class="p-0 border-left-0" align="right">
                                    <table width="100%">
                                        <tr class="text-dark-grey" align="right">
                                            <td class="border-top-0 border-right-0">
                                                {{ currency_formatter($invoice->sub_total, '') }}</td>
                                        </tr>
                                        @if ($discount != 0 && $discount != '')
                                            <tr class="text-dark-grey" align="right">
                                                <td class="border-top-0 border-right-0">
                                                    {{ currency_formatter($discount, '') }}</td>
                                            </tr>
                                        @endif
                                        @foreach ($taxes as $key => $tax)
                                            <tr class="text-dark-grey" align="right">
                                                <td class="border-top-0 border-right-0">
                                                    {{ currency_formatter($tax, '') }}</td>
                                            </tr>
                                        @endforeach
                                        <tr class=" text-dark-grey font-weight-bold" align="right">
                                            <td class="border-bottom-0 border-right-0">
                                                {{ currency_formatter($invoice->total, '') }}</td>
                                        </tr>
                                        <tr class="bg-light-grey text-dark f-w-500 f-16" align="right">
                                            <td class="border-bottom-0 border-right-0">
                                                {{ currency_formatter($invoice->amountDue(), '') }}
                                                {{ $invoice->currency->currency_code }}</td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>

                </tr>
            </table>
            <table width="100%" class="inv-desc-mob d-block d-lg-none d-md-none">

                @foreach ($invoice->items as $item)
                    @if ($item->type == 'item')

                        <tr>
                            <th width="50%" class="bg-light-grey text-dark-grey font-weight-bold">
                                @lang('app.description')</th>
                            <td class="p-0 ">
                                <table>
                                    <tr width="100%" class="font-weight-semibold f-13">
                                        <td class="border-left-0 border-right-0 border-top-0">
                                            {{ ucfirst($item->item_name) }}</td>
                                    </tr>
                                    @if ($item->item_summary != '' || $item->invoiceItemImage)
                                        <tr>
                                            <td class="border-left-0 border-right-0 border-bottom-0 f-12">
                                                {!! nl2br(strip_tags($item->item_summary, ['p', 'b', 'strong', 'a'])) !!}
                                                @if ($item->invoiceItemImage)
                                                    <p class="mt-2">
                                                        <a href="javascript:;" class="img-lightbox" data-image-url="{{ $item->invoiceItemImage->file_url }}">
                                                            <img src="{{ $item->invoiceItemImage->file_url }}" width="80" height="80" class="img-thumbnail">
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
                                ({{ $invoice->currency->currency_code }})</th>
                            <td width="50%">{{ currency_formatter($item->unit_price, '') }}</td>
                        </tr>
                        <tr>
                            <th width="50%" class="bg-light-grey text-dark-grey font-weight-bold">
                                @lang("modules.invoices.amount")
                                ({{ $invoice->currency->currency_code }})</th>
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
                        {{ currency_formatter($invoice->sub_total, '') }}</td>
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
                        {{ currency_formatter($invoice->total, '') }}</td>
                </tr>
                <tr>
                    <th width="50%" class="f-16 bg-light-grey text-dark font-weight-bold">
                        @lang("modules.invoices.total")
                        @lang("modules.invoices.due")</th>
                    <td width="50%" class="f-16 bg-light-grey text-dark font-weight-bold">
                        {{ currency_formatter($invoice->amountDue(), '') }}
                        {{ $invoice->currency->currency_code }}</td>
                </tr>
            </table>
            <table class="inv-note">
                <tr>
                    <td height="30" colspan="2"></td>
                </tr>
                <tr>
                    <td>
                        <table>
                            <tr>@lang('app.note')</tr>
                            <tr>
                                <p class="text-dark-grey">{!! !empty($invoice->note) ? $invoice->note : '--' !!}</p>
                            </tr>
                        </table>
                    </td>
                    <td align="right">
                        <table>
                            <tr>@lang('modules.invoiceSettings.invoiceTerms')</tr>
                            <tr>
                                <p class="text-dark-grey">{!! nl2br($invoiceSetting->invoice_terms) !!}</p>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table>
                            <tr>
                                @if (isset($taxes) && invoice_setting()->tax_calculation_msg == 1)
                                    <p class="text-dark-grey">
                                        @if ($invoice->calculate_tax == 'after_discount')
                                            @lang('messages.calculateTaxAfterDiscount')
                                        @else
                                            @lang('messages.calculateTaxBeforeDiscount')
                                        @endif
                                    </p>
                                @endif
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

                    @if ($invoice->status == 'paid' && !in_array('client', user_roles()) && $invoice->amountPaid() == 0)
                        <li>
                            <a class="dropdown-item f-14 text-dark"
                                href="{{ route('invoices.edit', [$invoice->id]) }}">
                                <i class="fa fa-edit f-w-500 mr-2 f-11"></i> @lang('app.edit')
                            </a>
                        </li>
                    @endif

                    @if(
                        $invoice->status != 'paid' &&
                        $invoice->status != 'canceled' &&
                        is_null($invoice->invoice_recurring_id) &&
                        (
                            $editInvoicePermission == 'all' ||
                            ($editInvoicePermission == 'added' && $invoice->added_by == user()->id) ||
                            ($editInvoicePermission == 'owned' && $invoice->client_id == user()->id) ||
                            ($editInvoicePermission == 'both' && ($invoice->client_id == user()->id ||
                            $invoice->added_by == user()->id))
                        )
                    )
                        <li>
                            <a class="dropdown-item f-14 text-dark"
                                href="{{ route('invoices.edit', [$invoice->id]) }}">
                                <i class="fa fa-edit f-w-500 mr-2 f-11"></i> @lang('app.edit')
                            </a>
                        </li>
                    @endif

                    @if (($firstInvoice->id == $invoice->id && $invoice->status == 'unpaid' && $deleteInvoicePermission == 'all') || ($deleteInvoicePermission == 'added' && $invoice->added_by == user()->id && $firstInvoice->id == $invoice->id))
                        <li>
                            <a class="dropdown-item f-14 text-dark delete-invoice"
                                href="javascript:;" data-invoice-id="{{ $invoice->id }}">
                                <i class="fa fa-trash f-w-500 mr-2 f-11"></i> @lang('app.delete')
                            </a>
                        </li>
                    @endif

                    <li>
                        <a class="dropdown-item f-14 text-dark"
                            href="{{ route('invoices.download', [$invoice->id]) }}">
                            <i class="fa fa-download f-w-500 mr-2 f-11"></i> @lang('app.download')
                        </a>
                    </li>

                    @if ($invoice->status != 'canceled' && $invoice->status != 'paid' && !$invoice->credit_note && !in_array('client', user_roles()))
                        <li>
                            <a class="dropdown-item f-14 text-dark sendButton" href="javascript:;"
                                data-invoice-id="{{ $invoice->id }}">
                                <i class="fa fa-paper-plane f-w-500 mr-2 f-11"></i> @lang('app.send')
                            </a>
                        </li>
                    @endif

                    @if ($invoice->status != 'canceled')
                        @if ($invoice->clientDetails)
                            @if (!is_null($invoice->clientDetails->shipping_address))
                                @if ($invoice->show_shipping_address == 'yes')
                                    <li>
                                        <a class="dropdown-item f-14 text-dark toggle-shipping-address" href="javascript:;" data-invoice-id="{{ $invoice->id }}">
                                            <i class="fa fa-eye-slash f-w-500 mr-2 f-11"></i> @lang('app.hideShippingAddress')
                                        </a>
                                    </li>
                                @else
                                    <li>
                                        <a class="dropdown-item f-14 text-dark toggle-shipping-address" href="javascript:;" data-invoice-id="{{ $invoice->id }}">
                                            <i class="fa fa-eye f-w-500 mr-2 f-11"></i> @lang('app.showShippingAddress')
                                        </a>
                                    </li>
                                @endif
                            @else
                                <li>
                                    <a class="dropdown-item f-14 text-dark add-shipping-address" href="javascript:;" data-invoice-id="{{ $invoice->id }}">
                                        <i class="fa fa-plus f-w-500 mr-2 f-11"></i> @lang('app.addShippingAddress')
                                    </a>
                                </li>
                            @endif
                        @else
                            @if ($invoice->project->clientDetails)
                                @if (!is_null($invoice->project->clientDetails->shipping_address))
                                    @if ($invoice->show_shipping_address == 'yes')
                                        <li>
                                            <a class="dropdown-item f-14 text-dark toggle-shipping-address" href="javascript:;" data-invoice-id="{{ $invoice->id }}">
                                                <i class="fa fa-eye-slash f-w-500 mr-2 f-11"></i> @lang('app.hideShippingAddress')
                                            </a>
                                        </li>
                                    @else
                                        <li>
                                            <a class="dropdown-item f-14 text-dark toggle-shipping-address" href="javascript:;" data-invoice-id="{{ $invoice->id }}">
                                                <i class="fa fa-eye f-w-500 mr-2 f-11"></i> @lang('app.showShippingAddress')
                                            </a>
                                        </li>
                                    @endif
                                @else
                                    <li>
                                        <a class="dropdown-item f-14 text-dark add-shipping-address" href="javascript:;" data-invoice-id="{{ $invoice->id }}">
                                            <i class="fa plus f-w-500 mr-2 f-11"></i> @lang('app.addShippingAddress')
                                        </a>
                                    </li>
                                @endif
                            @endif
                        @endif
                    @endif

                    @if ($invoice->status != 'paid' && $invoice->status != 'draft' && $invoice->status != 'canceled' && !in_array('client', user_roles()) && $invoice->send_status == 1)
                        <li>
                            <a class="dropdown-item f-14 text-dark reminderButton" href="javascript:;"
                                data-invoice-id="{{ $invoice->id }}">
                                <i class="fa fa-bell f-w-500 mr-2 f-11"></i> @lang('app.paymentReminder')
                            </a>
                        </li>
                    @endif

                    @if (!in_array('client', user_roles()) && in_array('payments', $user->modules) && $invoice->credit_note == 0 && $invoice->status != 'draft' && $invoice->status != 'paid' && $invoice->status != 'canceled' && $invoice->send_status)
                        @if ($addPaymentPermission == 'all' || ($addPaymentPermission == 'added' && $invoice->added_by == user()->id))
                            <li>
                                <a class="dropdown-item f-14 text-dark openRightModal"
                                    data-redirect-url="{{ route('invoices.show', $invoice->id) }}"
                                    href="{{ route('payments.create') . '?invoice_id=' . $invoice->id . '&default_client=' . $invoice->client_id }}"
                                    data-invoice-id="{{ $invoice->id }}">
                                    <i class="fa fa-plus f-w-500 mr-2 f-11"></i> @lang('modules.payments.addPayment')
                                </a>
                            </li>
                        @endif
                    @endif

                    @if (!in_array($invoice->status, ['canceled', 'draft']) && !$invoice->credit_note && $invoice->send_status)
                        <li>
                            <a class="dropdown-item f-14 text-dark btn-copy" href="javascript:;"
                                data-clipboard-text="{{ route('front.invoice', $invoice->hash) }}">
                                <i class="fa fa-copy f-w-500  mr-2 f-12"></i>
                                @lang('modules.invoices.copyPaymentLink')
                            </a>
                        </li>
                        <li>
                            <a class="dropdown-item f-14 text-dark"
                                href="{{ route('front.invoice', $invoice->hash) }}" target="_blank">
                                <i class="fa fa-external-link-alt f-w-500  mr-2 f-12"></i>
                                @lang('modules.payments.paymentLink')
                            </a>
                        </li>
                    @endif

                    @if ($firstInvoice->id != $invoice->id && ($invoice->status == 'unpaid' || $invoice->status == 'draft') && !in_array('client', user_roles()))
                        <li>
                            <a class="dropdown-item f-14 text-dark cancel-invoice" data-invoice-id="{{ $invoice->id }}"
                                href="javascript:;">
                                <i class="fa fa-times f-w-500  mr-2 f-12"></i>
                                @lang('app.cancel')
                            </a>
                        </li>
                    @endif

                    @if ($invoice->appliedCredits() > 0)
                        <li>
                            <a class="dropdown-item f-14 text-dark openRightModal"
                                href="{{ route('invoices.applied_credits', $invoice->id) }}">
                                <i class="fa fa-money-bill-alt f-w-500  mr-2 f-12"></i>
                                @lang('app.view') @lang('app.invoice') @lang('app.menu.payments')
                            </a>
                        </li>
                    @endif
                </ul>
            </div>

            {{-- PAYMENT GATEWAY --}}
            @if (in_array('client', user_roles()) && $invoice->total > 0 && ($invoice->status == 'unpaid' || $invoice->status == 'partial') && ($credentials->paypal_status == 'active' || $credentials->stripe_status == 'active' || $credentials->paystack_status == 'active'|| $credentials->flutterwave_status == 'active'|| $credentials->mollie_status == 'active' || $credentials->razorpay_status == 'active' || $credentials->payfast_status == 'active' || $credentials->square_status == 'active' || $credentials->authorize_status == 'active' || $methods->count() > 0))
                <div class="inv-action mr-3 mr-lg-3 mr-md-3 dropup">
                    <button class="dropdown-toggle btn-primary rounded mr-3 mr-lg-0 mr-md-0 f-15" type="button"
                        id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false">@lang('modules.invoices.payNow')
                        <span><i class="fa fa-chevron-down f-15"></i></span>
                    </button>
                    <!-- DROPDOWN - INFORMATION -->
                    <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton" tabindex="0">
                        @if ($credentials->stripe_status == 'active')
                            <li>
                                <a class="dropdown-item f-14 text-dark" href="javascript:;"
                                    data-invoice-id="{{ $invoice->id }}" id="stripeModal">
                                    <i class="fab fa-stripe-s f-w-500 mr-2 f-11"></i>
                                    @lang('modules.invoices.payStripe')
                                </a>
                            </li>
                        @endif
                        @if ($credentials->paystack_status == 'active')
                            <li>
                                <a class="dropdown-item f-14 text-dark" href="javascript:void(0);" data-invoice-id="{{ $invoice->id }}"  id="paystackModal">
                                    <img style="height: 15px;" src="https://s3-eu-west-1.amazonaws.com/pstk-integration-logos/paystack.jpg"> @lang('modules.invoices.payPaystack')</a>
                            </li>
                        @endif
                        @if ($credentials->flutterwave_status == 'active')
                            <li>
                                <a class="dropdown-item f-14 text-dark" href="javascript:void(0);" data-invoice-id="{{ $invoice->id }}"  id="flutterwaveModal">
                                    <img style="height: 15px;"  src="{{ asset('img/flutterwave.png') }}"> @lang('modules.invoices.payFlutterwave')</a>
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
                            data-invoice-id="{{ $invoice->id }}" id="authorizeModal">
                                <img style="height: 15px;" src="{{ asset('img/authorize.png') }}">
                                @lang('modules.invoices.payAuthorize')</a>
                        </li>
                        @endif

                        @if ($credentials->mollie_status == 'active')
                            <li>
                                <a class="dropdown-item f-14 text-dark" href="javascript:void(0);" data-invoice-id="{{ $invoice->id }}"  id="mollieModal">
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
                                <a class="dropdown-item f-14 text-dark"
                                    href="{{ route('paypal', [$invoice->id]) }}">
                                    <i class="fab fa-paypal f-w-500 mr-2 f-11"></i> @lang('modules.invoices.payPaypal')
                                </a>
                            </li>
                        @endif
                        @if ($methods->count() > 0)
                            <li>
                                <a class="dropdown-item f-14 text-dark" href="javascript:;" id="offlinePaymentModal"
                                    data-invoice-id="{{ $invoice->id }}">
                                    <i class="fa fa-money-bill f-w-500 mr-2 f-11"></i>
                                    @lang('modules.invoices.payOffline')
                                </a>
                            </li>
                        @endif
                    </ul>
                </div>
            @endif
            {{-- PAYMENT GATEWAY --}}

            <x-forms.button-cancel :link="route('invoices.index')" class="border-0 mr-3">@lang('app.cancel')
            </x-forms.button-cancel>

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
                            :value="$invoice->custom_fields_data['field_'.$field->id] ?? '--'" />
                    @elseif($field->type == 'textarea')
                        <x-cards.data-row :label="$field->label" html="true"
                            :value="$invoice->custom_fields_data['field_'.$field->id] ?? '--'" />
                    @elseif($field->type == 'radio')
                        <x-cards.data-row :label="$field->label"
                            :value="(!is_null($invoice->custom_fields_data['field_' . $field->id]) ? $invoice->custom_fields_data['field_' . $field->id] : '--')" />
                    @elseif($field->type == 'checkbox')
                        <x-cards.data-row :label="$field->label"
                            :value="(!is_null($invoice->custom_fields_data['field_' . $field->id]) ? $invoice->custom_fields_data['field_' . $field->id] : '--')" />
                    @elseif($field->type == 'select')
                        <x-cards.data-row :label="$field->label"
                            :value="(!is_null($invoice->custom_fields_data['field_' . $field->id]) && $invoice->custom_fields_data['field_' . $field->id] != '' ? $field->values[$invoice->custom_fields_data['field_' . $field->id]] : '--')" />
                    @elseif($field->type == 'date')
                        <x-cards.data-row :label="$field->label"
                            :value="(!is_null($invoice->custom_fields_data['field_' . $field->id]) && $invoice->custom_fields_data['field_' . $field->id] != '' ? \Carbon\Carbon::parse($invoice->custom_fields_data['field_' . $field->id])->format(global_setting()->date_format) : '--')" />
                    @endif
                @endforeach
            </x-cards.data>
        </div>
    </div>
@endif

<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
<script src="{{ asset('vendor/jquery/clipboard.min.js') }}"></script>

<script>
    var clipboard = new ClipboardJS('.btn-copy');

    clipboard.on('success', function(e) {
        Swal.fire({
            icon: 'success',
            text: '@lang("app.copied")',
            toast: true,
            position: 'top-end',
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            customClass: {
                confirmButton: 'btn btn-primary',
            },
            showClass: {
                popup: 'swal2-noanimation',
                backdrop: 'swal2-noanimation'
            },
        })
    });

    $('body').on('click', '#stripeModal', function() {
        let invoiceId = $(this).data('invoice-id');
        let queryString = "?invoice_id=" + invoiceId;
        let url = "{{ route('invoices.stripe_modal') }}" + queryString;

        $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
        $.ajaxModal(MODAL_LG, url);
    });

    $('body').on('click', '#paystackModal', function() {
        let id = $(this).data('invoice-id');
        let queryString = "?id="+id+"&type=invoice";
        let url = "{{ route('front.paystack_modal') }}"+queryString;

        $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
        $.ajaxModal(MODAL_LG, url);
    })

    $('body').on('click', '#flutterwaveModal', function() {
        let id = $(this).data('invoice-id');
        let queryString = "?id="+id+"&type=invoice";
        let url = "{{ route('front.flutterwave_modal') }}"+queryString;

        $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
        $.ajaxModal(MODAL_LG, url);
    })

    $('body').on('click', '#authorizeModal', function() {
        let id = $(this).data('invoice-id');
        let queryString = "?id="+id+"&type=invoice";
        let url = "{{ route('front.authorize_modal') }}"+queryString;

        $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
        $.ajaxModal(MODAL_LG, url);
    })

    $('body').on('click', '#mollieModal', function() {
        let id = $(this).data('invoice-id');
        let queryString = "?id="+id+"&type=invoice";
        let url = "{{ route('front.mollie_modal') }}"+queryString;

        $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
        $.ajaxModal(MODAL_LG, url);
    })

    $('body').on('click', '#payfastModal', function() {
        // Block model UI until payment happens
        $.easyBlockUI();

        $.easyAjax({
            url: "{{ route('payfast_public') }}",
            type: "POST",
            blockUI: true,
            data: {
                id:'{{$invoice->id}}',
                type:'invoice',
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
                id:'{{$invoice->id}}',
                type:'invoice',
                _token: '{{ csrf_token() }}'
            }
        });
    });

    $('body').on('click', '#offlinePaymentModal', function() {
        let invoiceId = $(this).data('invoice-id');
        let queryString = "?invoice_id=" + invoiceId;
        let url = "{{ route('invoices.offline_payment_modal') }}" + queryString;

        $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
        $.ajaxModal(MODAL_LG, url);
    });

    @if ($credentials->razorpay_status == 'active')
        $('body').on('click', '#razorpayPaymentButton', function() {
            var amount = {{ number_format((float) $invoice->amountDue(), 2, '.', '') * 100 }};
            var invoiceId = {{ $invoice->id }};
            var clientEmail = "{{ $user->email }}";

            var options = {
                "key":
                "{{ $credentials->razorpay_mode == 'test' ? $credentials->test_razorpay_key : $credentials->live_razorpay_key }}",
                "amount": amount,
                "currency": '{{ $invoice->currency->currency_code }}',
                "name": "{{ $companyName }}",
                "description": "Invoice Payment",
                "image": "{{ global_setting()->logo_url }}",
                "handler": function (response) {
                    confirmRazorpayPayment(response.razorpay_payment_id,invoiceId);
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
                    "purchase_id": invoiceId, //invoice ID
                    "type": "invoice"
                }
            };
            var rzp1 = new Razorpay(options);

            rzp1.open();
        })

        //Confirmation after transaction
        function confirmRazorpayPayment(id, invoiceId) {
            // Block UI immediatly after payment modal disappear
            $.easyBlockUI();

            $.easyAjax({
                type: 'POST',
                url: "{{ route('pay_with_razorpay') }}",
                data: {paymentId: id,invoiceId: invoiceId,_token:'{{ csrf_token() }}'}
            });
        }

    @endif

    $('body').on('click', '.sendButton', function() {
        var id = $(this).data('invoice-id');
        var token = "{{ csrf_token() }}";

        var url = "{{ route('invoices.send_invoice', ':id') }}";
        url = url.replace(':id', id);

        $.easyAjax({
            type: 'POST',
            url: url,
            container: '.content-wrapper',
            blockUI: true,
            data: {
                '_token': token,
                'type': 'send'
            },
            success: function(response) {
                if (response.status == "success") {
                    window.location.reload();
                }
            }
        });
    });

    $('body').on('click', '.reminderButton', function() {
        var id = $(this).data('invoice-id');
        var token = "{{ csrf_token() }}";

        var url = "{{ route('invoices.payment_reminder', ':id') }}";
        url = url.replace(':id', id);

        $.easyAjax({
            type: 'GET',
            container: '#invoices-table',
            blockUI: true,
            url: url,
            success: function(response) {
                if (response.status == "success") {
                    $.unblockUI();
                    window.LaravelDataTables["invoices-table"].draw();
                }
            }
        });
    });

    $('body').on('click', '.cancel-invoice', function() {
        var id = $(this).data('invoice-id');
        Swal.fire({
            title: "@lang('messages.sweetAlertTitle')",
            text: "@lang('messages.invoiceText')",
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
                var token = "{{ csrf_token() }}";

                var url = "{{ route('invoices.update_status', ':id') }}";
                url = url.replace(':id', id);

                $.easyAjax({
                    type: 'GET',
                    url: url,
                    container: '#invoices-table',
                    blockUI: true,
                    success: function(response) {
                        if (response.status == "success") {
                            window.location.reload();
                        }
                    }
                });
            }
        });
    });

    $('body').on('click', '.delete-invoice', function() {
        var id = $(this).data('invoice-id');
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
                var token = "{{ csrf_token() }}";

                var url = "{{ route('invoices.destroy', ':id') }}";
                url = url.replace(':id', id);

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
                            window.location.href = "{{ route('invoices.index') }}";
                        }
                    }
                });
            }
        });
    });

    $('body').on('click', '.toggle-shipping-address', function() {
        let invoiceId = $(this).data('invoice-id');

        let url = "{{ route('invoices.toggle_shipping_address', ':id') }}";
        url = url.replace(':id', invoiceId);

        $.easyAjax({
            url: url,
            type: 'GET',
            container: '#invoices-table',
            blockUI: true,
            success: function (response) {
                if (response.status === 'success') {
                    window.location.reload();
                }
            }
        });
    });

    $('body').on('click', '.add-shipping-address', function() {
        let invoiceId = $(this).data('invoice-id');

        var url = "{{ route('invoices.shipping_address_modal', [':id']) }}";
        url = url.replace(':id', invoiceId);

        $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
        $.ajaxModal(MODAL_LG, url);
    });

</script>
