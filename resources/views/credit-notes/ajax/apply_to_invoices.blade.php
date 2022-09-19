<!-- ROW START -->
<div class="row">

    <div class="col-sm-12 mb-4">
        <x-alert type="warning" icon="info-circle">@lang('messages.sameCurrencyInvoiceNote')</x-alert>
    </div>

    @if ($nonPaidInvoices->count() > 0)
        <!--  USER CARDS START -->
        <div class="col-lg-12 col-md-12 mb-4 mb-xl-0 mb-lg-4 mb-md-0">
            <h4 class="my-3 f-21 text-capitalize font-weight-bold">{{ $creditNote->cn_number }}</h4>

            <div class="row">

                <div class="col-xl-3 col-sm-12 mb-4">
                    <x-cards.widget :title="__('modules.invoices.total')"
                        :value="number_format((float) $creditNote->total, 2, '.', '')" icon="file-invoice-dollar" />
                </div>
                <div class="col-xl-3 col-sm-12 mb-4">
                    <x-cards.widget :title="__('modules.credit-notes.creditAmountRemaining')"
                        :value="number_format((float) $creditNote->creditAmountRemaining(), 2, '.', '')"
                        icon="file-invoice-dollar" />
                </div>
                <div class="col-xl-6 col-sm-12 mb-4">
                    <x-cards.user :image="$creditNote->client->image_url">
                        <div class="row">
                            <div class="col-10">
                                <h4 class="card-title f-15 f-w-500 text-darkest-grey mb-0">
                                    {{ mb_ucwords($creditNote->client->name) }}
                                </h4>
                            </div>
                        </div>
                        <p class="f-13 font-weight-normal text-dark-grey mb-0">
                            {{ mb_ucwords($creditNote->client->clientDetails->company_name) }}
                        </p>
                        <p class="card-text f-12 text-lightest">@lang('app.lastLogin')

                            @if (!is_null($creditNote->client->last_login))
                                {{ $creditNote->client->last_login->timezone(global_setting()->timezone)->format(global_setting()->date_format . ' ' . global_setting()->time_format) }}
                            @else
                                --
                            @endif
                        </p>
                    </x-cards.user>
                </div>

            </div>


            <h4 class="mt-5 mb-3 f-21 text-capitalize font-weight-bold">@lang('app.client') @lang('app.unpaid')
                @lang('app.menu.invoices')</h4>

            <x-cards.data padding="false">
                <div class="table-responsive">
                    <x-table class="table-hover">
                        <x-slot name="thead">
                            <th>@lang('app.invoiceNumber') #</th>
                            <th>@lang('app.credit-notes.invoiceDate')</th>
                            <th>@lang('app.credit-notes.invoiceAmount')</th>
                            <th>@lang('app.credit-notes.invoiceBalanceDue')</th>
                            <th class="border-left">@lang('app.credit-notes.amountToCredit')</th>
                        </x-slot>

                        @forelse ($nonPaidInvoices as $invoice)
                            @php
                                $amountDue = $invoice->amountDue();
                            @endphp
                            @if ($amountDue > 0)
                                <tr>
                                    <td>
                                        <a class="text-darkest-grey"
                                            href="{{ route('invoices.show', [$invoice->id]) }}">{{ $invoice->invoice_number }}</a>
                                    </td>
                                    <td>
                                        {{ $invoice->issue_date->format(global_setting()->date_format) }}
                                    </td>
                                    <td>
                                        {{ currency_formatter($invoice->total, $invoice->currency->currency_symbol) }}
                                    </td>
                                    <td>
                                        {{ currency_formatter($amountDue, $invoice->currency->currency_symbol) }}
                                    </td>
                                    <td class="border-left">
                                        <input data-invoice-id="{{ $invoice->id }}"
                                            data-balance-due='{{ $amountDue }}' type="number"
                                            max="{{ min($creditNote->total, $amountDue) }}" min="0" value="0"
                                            step="1.00" class="form-control height-35 f-14 amt-to-credit">
                                    </td>
                                </tr>
                            @endif
                        @empty
                            <td colspan="3">
                                <x-cards.no-record icon="file-invoice-dollar" :message="__('messages.noRecordFound')" />
                            </td>
                        @endforelse
                    </x-table>
                </div>
            </x-cards.data>

        </div>

        <div class="col-sm-12 col-xl-4 offset-xl-8 text-right mt-3">
            <table class="table">
                <tbody>
                    <tr>
                        <td align="right">
                            <h5>@lang('app.credit-notes.amountToCredit'):</h5>
                        </td>
                        <td>
                            <h5>{{ $invoice->currency->currency_symbol }} <span class="amount-to-credit">0.00</span>
                            </h5>
                        </td>
                    </tr>
                    <tr>
                        <td align="right">
                            <h5>@lang('app.credit-notes.remainingAmount'):</h5>
                        </td>
                        <td>
                            <h5>
                                {{ $invoice->currency->currency_symbol }}
                                <span class="credit-note-balance-due">
                                    {{ number_format((float) $creditNote->creditAmountRemaining(), 2, '.', '') }}
                                </span>
                            </h5>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <x-form-actions>
            <x-forms.button-primary id="apply-invoice" class="mr-3" icon="check">@lang('app.apply')</x-forms.button-primary>
            <x-forms.button-cancel :link="route('creditnotes.show', $creditNote->id)" class="border-0">
                @lang('app.cancel')
            </x-forms.button-cancel>
        </x-form-actions>
    @else
        <x-cards.no-record icon="file-invoice-dollar" :message="__('messages.noUnpaidInvoiceFound')" />
    @endif

</div>
<!-- ROW END -->
<script>
    function getTotalAmountToCredit() {
        let amount = 0.00;

        $('.amt-to-credit').each(function() {
            if ($(this).val() != 0 && $(this).val() !== '') {
                amount += parseFloat($(this).val());
            }
        })

        return amount;
    }

    $('.amt-to-credit').focus(function() {
        $(this).select();
    });

    // this prevents from typing non-number text, including "e".
    function isNumber(evt) {
        evt = (evt) ? evt : window.event;
        let charCode = (evt.which) ? evt.which : evt.keyCode;
        if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();
        } else {
        return true;
        }
    }

    $('.amt-to-credit').on('change keyup', function() {

        var thisValue = $(this).val();

        if (isNumber(thisValue) !== true || thisValue < 0) {
            $(this).val(0);
        }

        if (thisValue == '') {
            thisValue = 0;
        }

        let creditBalance = parseFloat('{{ $creditNote->creditAmountRemaining() }}');

        if (parseFloat(thisValue) > parseFloat($(this).prop('max'))) {
            $(this).val($(this).prop('max'))
            thisValue = $(this).val()
        }

        let amount = getTotalAmountToCredit();
        let remainingAmount = creditBalance - amount;

        if(remainingAmount < 0) {
            $(this).val(0);
            return false;
        }

        if (remainingAmount <= 0) {
            $(this).prop('max', thisValue)
        } else {
            if (thisValue !== '' && thisValue !== '0') {
                $(this).prop('max', Math.min(remainingAmount + parseFloat(thisValue), parseFloat($(this)
                    .data('balance-due'))))
            } else {
                $(this).prop('max', remainingAmount)
            }
        }

        $('.amount-to-credit').html(amount.toFixed(2))
        $('.credit-note-balance-due').html(remainingAmount.toFixed(2))
    });

    $('#apply-invoice').click(function() {
        let data = {
            invoices: []
        };
        const remainingAmount = $('.credit-note-balance-due').html();

        $('.amt-to-credit').each(function() {
            const invoiceId = $(this).data('invoice-id');
            const value = $(this).val();

            data.invoices = [...data.invoices, {
                invoiceId: invoiceId,
                value: value
            }];
        })

        data = {
            ...data,
            remainingAmount: remainingAmount
        };

        let url = "{{ route('creditnotes.apply_invoice_credit', [':id']) }}";
        url = url.replace(':id', '{{ $creditNote->id }}');

        $.easyAjax({
            url: url,
            type: 'POST',
            container: '.content-wrapper',
            disableButton: true,
            blockUI: true,
            buttonSelector: "#apply-invoice",
            redirect: true,
            data: {
                ...data,
                _token: '{{ csrf_token() }}'
            }
        });
    });
</script>
