@php
$deleteInvoicePermission = user()->permission('delete_invoices');
@endphp
<!-- ROW START -->
<div class="row">

    <!--  USER CARDS START -->
    <div class="col-lg-12 col-md-12 mb-4 mb-xl-0 mb-lg-4 mb-md-0">
        <h4 class="my-3 f-21 text-capitalize font-weight-bold">{{ $creditNote->cn_number }}</h4>

        <div class="row">

            <div class="col-xl-3 col-sm-12 mb-4">
                <x-cards.widget :title="__('modules.invoices.total')"
                    :value="currency_formatter($creditNote->total, $creditNote->currency->currency_symbol)" icon="file-invoice-dollar" />
            </div>
            <div class="col-xl-3 col-sm-12 mb-4">
                <x-cards.widget :title="__('modules.credit-notes.creditAmountRemaining')"
                    :value="currency_formatter($creditNote->creditAmountRemaining(), $creditNote->currency->currency_symbol)"
                    icon="file-invoice-dollar" widgetId="remainingAmount" />
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

        <h4 class="mt-5 mb-3 f-21 text-capitalize font-weight-bold">@lang('app.creditedInvoices')</h4>

        <x-cards.data padding="false">
            <x-table class="table-hover">
                <x-slot name="thead">
                    <th>@lang('app.invoiceNumber') #</th>
                    <th>@lang('app.credit-notes.amountCredited')</th>
                    <th>@lang('app.date')</th>
                    <th class="text-right">@lang('app.action')</th>
                </x-slot>

                @forelse ($payments as $payment)
                    <tr id="row{{$payment->id}}">
                        <td>
                            <a class="text-darkest-grey"
                                href="{{ route('invoices.show', [$payment->invoice->id]) }}">{{ $payment->invoice->invoice_number }}</a>
                        </td>
                        <td>
                            {{ currency_formatter($payment->amount, $payment->currency->currency_symbol) }}
                        </td>
                        <td>
                            {{ \Carbon\Carbon::parse($payment->created_at)->format(global_setting()->date_format) }}
                        </td>
                        <td class="text-right">
                            @if ($deleteInvoicePermission == 'all' || ($deleteInvoicePermission == 'added' && $payment->added_by == user()->id))
                                <x-forms.button-secondary
                                    onclick="deleteCreditedInvoice({{ $payment->credit_notes_id }}, {{ $payment->id }})"
                                    icon="trash">
                                    @lang('app.remove')
                                </x-forms.button-secondary>
                            @else
                                --
                            @endif
                        </td>
                    </tr>
                @empty
                    <td colspan="4">
                        <x-cards.no-record icon="file-invoice-dollar" :message="__('messages.noRecordFound')" />
                    </td>
                @endforelse
            </x-table>
        </x-cards.data>

    </div>

</div>
<!-- ROW END -->
<script>
    function deleteCreditedInvoice(credit_id, id) {
        Swal.fire({
            title: "@lang('messages.sweetAlertTitle')",
            text: "@lang('messages.recoverRecord')",
            icon: 'warning',
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: "@lang('messages.confirmRemove')",
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
                var url = "{{ route('creditnotes.delete_credited_invoice', [':id']) }}";
                url = url.replace(':id', id);

                $.easyAjax({
                    url: url,
                    type: 'POST',
                    container: '.content-wrapper',
                    blockUI: true,
                    redirect: true,
                    data: {
                        credit_id: credit_id,
                        _token: '{{ csrf_token() }}'
                    },
                    success: function(response) {
                        if (response.status == 'success') {
                            $('#remainingAmount').html(response.remainingAmount);
                            $('#row'+id).fadeOut(1000);
                        }
                    }
                })
            }
        });
    }

</script>
