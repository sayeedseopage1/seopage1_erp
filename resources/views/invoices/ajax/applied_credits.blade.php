   <!-- ROW START -->
   <div class="row">

       <!--  USER CARDS START -->
       <div class="col-lg-12 col-md-12 mb-4 mb-xl-0 mb-lg-4 mb-md-0">
           <h4 class="my-3 f-21 text-capitalize font-weight-bold">{{ $invoice->invoice_number }}</h4>

           <div class="row">

               <div class="col-xl-3 col-sm-12">
                   <x-cards.widget :title="__('modules.invoices.total')"
                       :value="number_format((float) $invoice->total, 2, '.', '')" icon="file-invoice-dollar" />
               </div>
               <div class="col-xl-3 col-sm-12">
                   <x-cards.widget :title="__('modules.invoices.total') . ' ' . __('modules.invoices.due')"
                       :value="number_format((float) $invoice->amountDue(), 2, '.', '')" icon="file-invoice-dollar" widgetId="remainingAmount" />
               </div>

           </div>

           <h4 class="mt-5 mb-3 f-21 text-capitalize font-weight-bold">@lang('app.menu.payments')</h4>

           <x-cards.data padding="false">
               <x-table class="table-hover">
                   <x-slot name="thead">
                       <th>#</th>
                       <th>@lang('app.amount')</th>
                       <th>@lang('app.date')</th>
                       <th>@lang('app.gateway')</th>
                       <th class="text-right">@lang('app.action')</th>
                   </x-slot>

                   @forelse ($payments as $payment)
                       <tr id="row{{$payment->id}}">
                           <td>
                               @if(isset($payment->creditNote))
                                    <a href="{{ route('creditnotes.show', [$payment->creditNote->id]) }}"
                                   class="text-dark-grey">{{ $payment->creditNote->cn_number }}</a>
                               @else
                                    --
                               @endif
                           </td>
                           <td>
                               {{ currency_formatter($payment->amount, $payment->currency->currency_symbol) }}
                           </td>
                           <td>
                               {{ \Carbon\Carbon::parse($payment->paid_on)->format(global_setting()->date_format) }}
                           </td>
                           <td>
                               {{ $payment->gateway ? $payment->gateway : '--' }}
                           </td>
                           <td class="text-right">
                               {{-- If payment done from payment gateway, then payment cannot be removed.  --}}
                               @if ((is_null($payment->transaction_id) && is_null($payment->payload_id) && !$invoice->credit_note && $payment->gateway) || ($payment->gateway == 'Offline' || $payment->gateway == ''))
                                    <x-forms.button-secondary
                                        onclick="deleteAppliedCredit({{ $payment->invoice_id }}, {{ $payment->id }})"
                                        icon="trash">
                                        @lang('app.remove')
                                    </x-forms.button-secondary>
                               @endif
                           </td>
                       </tr>
                   @empty
                       <td colspan="5">
                           <x-cards.no-record icon="file-invoice-dollar" :message="__('messages.noRecordFound')" />
                       </td>
                   @endforelse
               </x-table>
           </x-cards.data>

       </div>

   </div>
   <!-- ROW END -->
   <script>
       function deleteAppliedCredit(invoice_id, id) {
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
                   var url = "{{ route('invoices.delete_applied_credit', [':id']) }}";
                   url = url.replace(':id', id);

                   $.easyAjax({
                       url: url,
                       type: 'POST',
                       container: '.content-wrapper',
                       blockUI: true,
                       redirect: true,
                       data: {
                           invoice_id: invoice_id,
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
