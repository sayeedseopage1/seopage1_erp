<div class="row">
    <div class="col-sm-12">
        <x-form id="save-payment-data-form">

            <div class="add-client bg-white rounded">
                <h4 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                    @lang('modules.payments.paymentDetails')</h4>
                <div class="row p-20">

                    <div class="col-md-4">
                        <input type="hidden" name="default_client" value="{{ $defaultClient ?? '' }}">
                        @if (isset($project) || !is_null($project))
                            <input type="hidden" id="payment_project_id" name="project_id"
                                value="{{ !is_null($project) ? $project->id : '' }}">
                            <x-forms.text :fieldLabel="__('app.project')" fieldName="projectName" fieldId="projectName"
                                :fieldValue="!is_null($project) ? $project->project_name : ''" fieldReadOnly="true" />
                        @else
                            <x-forms.select fieldId="payment_project_id" :fieldLabel="__('app.project')"
                                fieldName="project_id" search="true">
                                <option value="">--</option>
                                @foreach ($projects as $data)
                                    <option data-currency-id="{{ $data->currency_id }}" @if (isset($project) && $data->id == $project->id) selected @endif
                                        value="{{ $data->id }}">
                                        {{ $data->project_name }}</option>
                                @endforeach
                            </x-forms.select>
                        @endif
                    </div>

                    <div class="col-md-4">

                        @if (isset($invoice))
                            <input type="hidden" fieldId="invoice_id" name="invoice_id" value="{{ $invoice->id }}">
                            <x-forms.text :fieldLabel="__('app.invoice')" fieldName="invoice_number"
                                fieldId="invoice_number" :fieldValue="$invoice->invoice_number" fieldReadOnly="true" />
                        @else
                            <x-forms.select fieldId="payment_invoice_id" :fieldLabel="__('app.invoice')"
                                fieldName="invoice_id" search="true">
                                <option value="">--</option>
                                @foreach ($invoices as $inv)
                                    @php
                                        $paidAmount = $inv->amountPaid();
                                    @endphp
                                    @if($inv->milestone_id != null)
                                    @php
                                    $milestone= App\Models\ProjectMilestone::where('id',$inv->milestone_id)->first();
                                    @endphp
                                    <option data-currency-id="{{ $inv->currency->id }}"
                                        data-content="{{ $inv->invoice_number . ' - ' . __('app.total') . ': <span class=\'text-dark f-w-500 mr-2\'>' . currency_formatter($inv->total, $inv->currency->currency_symbol) . ' </span>' . __('modules.invoices.due') . ': <span class=\'text-red\'>' . currency_formatter(max($inv->total - $paidAmount, 0), $inv->currency->currency_symbol) .' '. '<span class=\'badge badge-primary\'>'.' (Payment for '.$milestone->milestone_title.')'.'</span>'.'</span>' }}"
                                        value="{{ $inv->id }}">{{ $inv->invoice_number }} {{$milestone->milestone_title}}</option>

                                    @else
                                    <option data-currency-id="{{ $inv->currency->id }}"
                                        data-content="{{ $inv->invoice_number . ' - ' . __('app.total') . ': <span class=\'text-dark f-w-500 mr-2\'>' . currency_formatter($inv->total, $inv->currency->currency_symbol) . ' </span>' . __('modules.invoices.due') . ': <span class=\'text-red\'>' . currency_formatter(max($inv->total - $paidAmount, 0), $inv->currency->currency_symbol) . '</span>' }}"
                                        value="{{ $inv->id }}">{{ $inv->invoice_number }}</option>
                                        @endif
                                @endforeach
                            </x-forms.select>
                        @endif

                    </div>


                    <div class="col-md-4">
                        <x-forms.datepicker fieldId="paid_on" :fieldLabel="__('modules.payments.paidOn')"
                            fieldName="paid_on" :fieldPlaceholder="__('placeholders.date')"
                            :fieldValue="\Carbon\Carbon::now()->timezone(global_setting()->timezone)->format(global_setting()->date_format)" />
                    </div>


                </div>
                <div class="row pl-20 pr-20">

                    <div class="col-md-3">
                        <x-forms.number fieldId="amount" :fieldLabel="__('modules.invoices.amount')" fieldName="amount"
                            :fieldValue="$unpaidAmount ?? ''" :fieldPlaceholder="__('placeholders.price')"
                            fieldRequired="true" />
                    </div>

                    <div class="col-md-3">
                        <x-forms.select fieldId="currency_id" :fieldLabel="__('app.currency')" fieldName="currency_id"
                            search="true">
                            @if (isset($invoice))
                                <option value="{{ $invoice->currency->id }}">
                                    {{ $invoice->currency->currency_code . ' (' . $invoice->currency->currency_symbol . ')' }}
                                </option>
                            @else
                                <option value="">--</option>
                                @foreach ($currencies as $currency)
                                    <option @if ($currency->id == global_setting()->currency_id) selected @endif value="{{ $currency->id }}">
                                        {{ $currency->currency_code . ' (' . $currency->currency_symbol . ')' }}
                                    </option>
                                @endforeach
                            @endif
                        </x-forms.select>
                    </div>
                    
                    <div class="col-md-3">
                        <x-forms.text fieldId="transaction_id" :fieldLabel="__('modules.payments.transactionId')"
                            fieldName="transaction_id" :fieldPlaceholder="__('placeholders.payments.transactionId')" :fieldValue="strtoupper(Str::random(12))" fieldReadOnly="true"/>
                    </div>

                    <div class="col-md-3">
                        <x-forms.text fieldId="gateway" :fieldLabel="__('modules.payments.paymentGateway')"
                            fieldName="gateway" :fieldPlaceholder="__('placeholders.payments.paymentGateway')" />
                    </div>

                    <div class="col-lg-12">
                        <x-forms.file allowedFileExtensions="txt pdf doc xls xlsx docx rtf png jpg jpeg" class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('app.receipt')" fieldName="bill"
                            fieldId="bill" :popover="__('messages.fileFormat.multipleImageFile')" />
                    </div>

                    <div class="col-md-12">
                        <div class="form-group my-3">
                            <x-forms.textarea class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('app.remark')"
                                fieldName="remarks" fieldId="remarks"
                                :fieldPlaceholder="__('placeholders.payments.remark')" />
                        </div>
                    </div>

                </div>

                <x-form-actions>
                    <x-forms.button-primary id="save-payment-form" class="mr-3" icon="check">@lang('app.save')
                    </x-forms.button-primary>
                    <x-forms.button-cancel :link="route('payments.index')" class="border-0">@lang('app.cancel')
                    </x-forms.button-cancel>
                </x-form-actions>

            </div>
        </x-form>

    </div>
</div>

<script>
    $(document).ready(function() {

        datepicker('#paid_on', {
            position: 'bl',
            ...datepickerConfig
        });

        $('#payment_invoice_id').change(function() {
            if ($('#payment_invoice_id').val() != '' || $('#payment_project_id').val() != '') {
                var curId = $('#payment_invoice_id option:selected').attr('data-currency-id');
                $('#currency_id').removeAttr('disabled');
                $('#currency_id').selectpicker('refresh');
                $('#currency_id').val(curId);
                $('#currency_id').prop('disabled', true);
                $('#currency_id').selectpicker('refresh');
            } else {
                $('#currency_id').prop('disabled', false);
                $('#currency_id').selectpicker('refresh');
            }
        });

        $('#save-payment-form').click(function() {
            const url = "{{ route('payments.store') }}";

            $.easyAjax({
                url: url,
                container: '#save-payment-data-form',
                type: "POST",
                disableButton: true,
                blockUI: true,
                buttonSelector: "#save-payment-form",
                file: true,
                data: $('#save-payment-data-form').serialize(),
                success: function(response) {
                    if (response.status == 'success') {
                        window.location.href = response.redirectUrl;
                    }
                }
            });
        });

        $('#payment_project_id').change(function() {
            var id = $(this).val();
            if (id == '') {
                id = 0;
            }

            if ($('#payment_invoice_id').val() != '' || $('#payment_project_id').val() != '') {
                var curId = $('#payment_project_id option:selected').attr('data-currency-id');
                $('#currency_id').removeAttr('disabled');
                $('#currency_id').selectpicker('refresh');
                $('#currency_id').val(curId);
                $('#currency_id').prop('disabled', true);
                $('#currency_id').selectpicker('refresh');
            } else {
                $('#currency_id').prop('disabled', false);
                $('#currency_id').selectpicker('refresh');
            }

            var url = "{{ route('projects.invoice_list', ':id') }}";
            url = url.replace(':id', id);
            var token = "{{ csrf_token() }}";

            $.easyAjax({
                url: url,
                container: '#save-payment-data-form',
                type: "POST",
                blockUI: true,
                data: {
                    _token: token
                },
                success: function(response) {
                    if (response.status == 'success') {
                        $('#payment_invoice_id').html(response.data);
                        $('#payment_invoice_id').selectpicker('refresh');
                    }
                }
            });
        });

        init(RIGHT_MODAL);
    });
</script>
