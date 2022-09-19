<!-- CREATE INVOICE START -->
<div class="bg-white rounded b-shadow-4 create-inv">
    <!-- HEADING START -->
    <div class="px-lg-4 px-md-4 px-3 py-3">
        <h4 class="mb-0 f-21 font-weight-normal text-capitalize">@lang('app.create') @lang('app.timeLog')
            @lang('app.invoice')</h4>
    </div>
    <!-- HEADING END -->
    <hr class="m-0 border-top-grey">
    <!-- FORM START -->
    <x-form class="c-inv-form" id="storePayments">

        <!-- INVOICE NUMBER, PROJECT, COMPANY NAME, INVOICE DATE, DUE DATE, CURRENCY, TIMELOG FROM AND TO START -->
        <div class="row px-lg-4 px-md-4 px-3 py-3">
            <!-- INVOICE NUMBER START -->
            <div class="col-md-3">
                <div class="form-group mb-lg-0 mb-md-0 mb-4">
                    <x-forms.label class="mb-12" fieldId="invoice_number"
                        :fieldLabel="__('modules.invoices.invoiceNumber')" fieldRequired="true">
                    </x-forms.label>
                    <x-forms.input-group>
                        <x-slot name="prepend">
                            <span
                                class="input-group-text">{{ invoice_setting()->invoice_prefix }}#{{ $zero }}</span>
                        </x-slot>
                        <input type="text" name="invoice_number" id="invoice_number" class="form-control height-35 f-15"
                            value="{{ is_null($lastInvoice) ? 1 : $lastInvoice }}">
                    </x-forms.input-group>
                </div>
            </div>
            <!-- INVOICE NUMBER END -->

            <!-- PROJECT START -->
            <div class="col-lg-3 col-md-6">
                @if (isset($project) && !is_null($project))
                    <div class="form-group mb-4">
                        <x-forms.label fieldId="due_date" :fieldLabel="__('app.project')">
                        </x-forms.label>
                        <div class="input-group">
                            <input type="hidden" name="project_id" id="project_id" value="{{ $project->id }}">
                            <input type="text" value="{{ $project->project_name }}"
                                class="form-control height-35 f-15 readonly-background" readonly>
                        </div>
                    </div>
                @else
                    <div class="form-group c-inv-select mb-4">
                        <x-forms.label fieldId="project_id" :fieldLabel="__('app.project')">
                        </x-forms.label>
                        <div class="select-others height-35 rounded">
                            <select class="form-control select-picker" data-live-search="true" data-size="8"
                                name="project_id" id="project_id">
                                @foreach ($projects as $project)
                                    <option value="{{ $project->id }}">{{ mb_ucwords($project->project_name) }}
                                    </option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                @endif
            </div>
            <!-- PROJECT END -->

            <!-- COMPANY NAME START -->
            <div class="col-lg-3 col-md-6">
                <div class="form-group mb-lg-0 mb-4">
                    <x-forms.label fieldId="company_name" :fieldLabel="__('app.client')">
                    </x-forms.label>
                    <div class="input-group" id="client_company_div">
                        <input type="text" id="company_name" name="company_name"
                            class="px-6 position-relative text-dark font-weight-normal form-control height-35 rounded p-0 text-left f-15"
                            placeholder="" value="">
                    </div>
                </div>
            </div>
            <!-- COMPANY NAME END -->

            <!-- INVOICE DATE START -->
            <div class="col-lg-3 col-md-6">
                <div class="form-group mb-lg-0 mb-4">
                    <x-forms.label fieldId="due_date" :fieldLabel="__('modules.invoices.invoiceDate')">
                    </x-forms.label>
                    <div class="input-group">
                        <input type="text" id="invoice_date" name="issue_date"
                            class="px-6 position-relative text-dark font-weight-normal form-control height-35 rounded p-0 text-left f-15"
                            placeholder="@lang('placeholders.date')"
                            value="{{ Carbon\Carbon::now(global_setting()->timezone)->format(global_setting()->date_format) }}">
                    </div>
                </div>
            </div>
            <!-- INVOICE DATE END -->

            <!-- DUE DATE START -->
            <div class="col-lg-3 col-md-6">
                <div class="form-group mb-lg-0 mb-4">
                    <x-forms.label fieldId="due_date" :fieldLabel="__('app.dueDate')"></x-forms.label>
                    <div class="input-group ">
                        <input type="text" id="due_date" name="due_date"
                            class="px-6 position-relative text-dark font-weight-normal form-control height-35 rounded p-0 text-left f-15"
                            placeholder="@lang('placeholders.date')"
                            value="{{ Carbon\Carbon::now(global_setting()->timezone)->addDays($invoiceSetting->due_after)->format(global_setting()->date_format) }}">
                    </div>
                </div>
            </div>
            <!-- DUE DATE END -->

            <!-- CURRENCY START -->
            <div class="col-lg-3 col-md-6">
                <div class="form-group c-inv-select mb-lg-0 mb-4">
                    <x-forms.label fieldId="currency_id" :fieldLabel="__('modules.invoices.currency')">
                    </x-forms.label>

                    <div class="select-others height-35 rounded" id="select_currency_id">
                        <select class="form-control select-picker" name="currency_id" id="currency_id">
                            @foreach ($currencies as $currency)
                                <option @if (isset($estimate))
                                    @if ($currency->id == $estimate->currency_id) selected @endif
                                @else
                                    @if ($currency->id == global_setting()->currency_id) selected @endif
                            @endif
                            value="{{ $currency->id }}">
                            {{ $currency->currency_code . ' (' . $currency->currency_symbol . ')' }}
                            </option>
                            @endforeach
                        </select>
                    </div>
                </div>
            </div>
            <!-- CURRENCY END -->

            <!-- TIMELOG FROM START -->
            <div class="col-lg-3 col-md-6">
                <div class="form-group mb-lg-0 mb-4">
                    <x-forms.label fieldId="timelog_from" :fieldLabel="__('modules.timeLogs.timeLogFrom')">
                    </x-forms.label>
                    <div class="input-group">
                        <input type="text" id="timelog_from" name="timelog_from"
                            class="px-6 position-relative text-dark font-weight-normal form-control height-35 rounded p-0 text-left f-15"
                            placeholder="@lang('placeholders.date')"
                            value="{{ $startDate->format(global_setting()->date_format) }}">
                    </div>
                </div>
            </div>
            <!-- TIMELOG FROM END -->

            <!-- TIMELOG TO START -->
            <div class="col-lg-3 col-md-6">
                <div class="form-group mb-lg-0 mb-4">
                    <x-forms.label fieldId="timelog_to" :fieldLabel="__('modules.timeLogs.timeLogTo')">
                    </x-forms.label>
                    <div class="input-group">
                        <input type="text" id="timelog_to" name="timelog_to"
                            class="px-6 position-relative text-dark font-weight-normal form-control height-35 rounded p-0 text-left f-15"
                            placeholder="@lang('placeholders.date')"
                            value="{{ $endDate->format(global_setting()->date_format) }}">
                    </div>
                </div>
            </div>
            <!-- TIMELOG TO END -->

            <!-- CALCULATE TAX START -->
            <div class="col-lg-3 col-md-6 mt-4">
                <div class="form-group mb-lg-0 mb-4">
                    <x-forms.label fieldId="calculate_tax" :fieldLabel="__('modules.invoices.calculateTax')">
                    </x-forms.label>
                    <div class="select-others height-35 rounded">
                        <select class="form-control select-picker" data-live-search="true" data-size="8"
                            name="calculate_tax" id="calculate_tax">
                            <option value="after_discount">@lang('modules.invoices.afterDiscount')</option>
                            <option value="before_discount">@lang('modules.invoices.beforeDiscount')</option>
                        </select>
                    </div>
                </div>
            </div>
            <!-- CALCULATE TAX END -->

            <div class="col-lg-3 col-md-6 mt-4">
                <div class="form-group c-inv-select mb-4">
                    <x-forms.label fieldId="company_address_id" :fieldLabel="__('modules.invoices.generatedBy')">
                    </x-forms.label>
                    <div class="select-others height-35 rounded">
                        <select class="form-control select-picker" data-live-search="true" data-size="8"
                            name="company_address_id" id="company_address_id">
                            @foreach ($companyAddresses as $item)
                                <option {{ $item->is_default ? 'selected' : '' }} value="{{ $item->id }}">
                                    {{ $item->location }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
            </div>


        </div>
        <!-- INVOICE NUMBER, PROJECT, COMPANY NAME, INVOICE DATE, DUE DATE, CURRENCY, TIMELOG FROM AND TO END -->

        <hr class="m-0 border-top-grey">

        <!-- TIMELOG ITEMS START -->
        <div id="sortable">
        </div>
        <!-- TIMELOG ITEMS END -->


        <hr class="m-0 border-top-grey">

        <!-- TOTAL, DISCOUNT START -->
        <div class="d-flex px-lg-4 px-md-4 px-3 pb-3 c-inv-total">
            <table width="100%" class="text-right f-14 text-capitalize">
                <tbody>
                    <tr>
                        <td width="50%" class="border-0 d-lg-table d-md-table d-none"></td>
                        <td width="50%" class="p-0 border-0 c-inv-total-right">
                            <table width="100%">
                                <tbody>
                                    <tr>
                                        <td colspan="2" class="border-top-0 text-dark-grey">
                                            @lang('modules.invoices.subTotal')</td>
                                        <td width="30%" class="border-top-0 sub-total">0.00</td>
                                        <input type="hidden" class="sub-total-field" name="sub_total" value="0">
                                    </tr>
                                    <tr>
                                        <td width="20%" class="text-dark-grey">@lang('modules.invoices.discount')
                                        </td>
                                        <td width="40%" style="padding: 5px;">
                                            <table width="100%">
                                                <tbody>
                                                    <tr>
                                                        <td width="70%" class="c-inv-sub-padding">
                                                            <input type="number" min="0" name="discount_value"
                                                                class="form-control f-14 border-0 w-100 text-right discount_value"
                                                                placeholder="0"
                                                                value="{{ isset($estimate) ? $estimate->discount : '0' }}">
                                                        </td>
                                                        <td width="30%" align="left" class="c-inv-sub-padding">
                                                            <div
                                                                class="select-others select-tax height-35 rounded border-0">
                                                                <select class="form-control select-picker"
                                                                    id="discount_type" name="discount_type">
                                                                    <option @if (isset($estimate) && $estimate->discount_type == 'percent') selected @endif
                                                                        value="percent">%</option>
                                                                    <option @if (isset($estimate) && $estimate->discount_type == 'fixed') selected @endif value="fixed">
                                                                        @lang('modules.invoices.amount')</option>
                                                                </select>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td><span
                                                id="discount_amount">{{ isset($estimate) ? number_format((float) $estimate->discount, 2, '.', '') : '0.00' }}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>@lang('modules.invoices.tax')</td>
                                        <td colspan="2" class="p-0 border-0">
                                            <table width="100%" id="invoice-taxes">
                                                <tr>
                                                    <td colspan="2"><span class="tax-percent">0.00</span></td>
                                                </tr>
                                            </table>
                                        </td>

                                    </tr>
                                    <tr class="bg-amt-grey f-16 f-w-500">
                                        <td colspan="2">@lang('modules.invoices.total')</td>
                                        <td><span class="total">0.00</span></td>
                                        <input type="hidden" class="total-field" name="total" value="0">
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- TOTAL, DISCOUNT END -->

        <!-- NOTE AND TERMS AND CONDITIONS START -->
        <div class="d-flex flex-wrap px-lg-4 px-md-4 px-3 py-3">
            <div class="col-md-6 col-sm-12 c-inv-note-terms p-0 mb-lg-0 mb-md-0 mb-3">
                <label class="f-14 text-dark-grey mb-12 text-capitalize w-100"
                    for="usr">@lang('modules.invoices.note')</label>
                <textarea class="form-control" name="note" id="note" rows="4"
                    placeholder="@lang('placeholders.invoices.note')"></textarea>
            </div>
            <div class="col-md-6 col-sm-12 p-0 c-inv-note-terms">
                <label class="f-14 text-dark-grey mb-12 text-capitalize w-100"
                    for="usr">@lang('modules.invoiceSettings.invoiceTerms')</label>
                {!! nl2br($invoiceSetting->invoice_terms) !!}
            </div>
        </div>
        <!-- NOTE AND TERMS AND CONDITIONS END -->

        <!-- CANCEL SAVE SEND START -->
        <x-form-actions class="c-inv-btns d-block d-lg-flex d-md-flex">
            <div class="d-flex mb-3 mb-lg-0 mb-md-0">

                <x-forms.button-primary id="save-form" class="border-0 mr-3" icon="check">@lang('app.save')
                </x-forms.button-primary>

                <x-forms.button-cancel :link="route('invoices.index')" class="border-0 mr-3">@lang('app.cancel')
                </x-forms.button-cancel>
            </div>
        </x-form-actions>
        <!-- CANCEL SAVE SEND END -->

    </x-form>
    <!-- FORM END -->
</div>
<!-- CREATE INVOICE END -->


<script>
    $(document).ready(function() {

        if ($('.custom-date-picker').length > 0) {
            datepicker('.custom-date-picker', {
                position: 'bl',
                ...datepickerConfig
            });
        }

        const dp1 = datepicker('#invoice_date', {
            position: 'bl',
            ...datepickerConfig
        });
        const dp2 = datepicker('#due_date', {
            position: 'bl',
            ...datepickerConfig
        });
        const dp3 = datepicker('#timelog_from', {
            position: 'bl',
            onSelect: (instance, date) => {
                if (typeof dp4.dateSelected !== 'undefined' && dp4.dateSelected.getTime() < date
                    .getTime()) {
                    dp4.setDate(date, true)
                }
                if (typeof dp4.dateSelected === 'undefined') {
                    dp4.setDate(date, true)
                }
                dp4.setMin(date);
                fetchTimelogs();
            },
            ...datepickerConfig
        });
        const dp4 = datepicker('#timelog_to', {
            position: 'bl',
            onSelect: (instance, date) => {
                dp3.setMax(date);
                fetchTimelogs();
            },
            ...datepickerConfig
        });

        $('body').on('change', '#timelog_from, #timelog_to', function() {
            fetchTimelogs();
        });

        $('body').on('change', '#client_company_id', function() {
            checkShippingAddress();
        });

        $('body').on('change', '#project_id', function() {
            getCompanyName();
        });

        getCompanyName();

        function getCompanyName() {
            var projectID = $('#project_id').val();
            var url = "{{ route('invoices.get_client_company') }}";
            if (projectID != '') {
                url = "{{ route('invoices.get_client_company', ':id') }}";
                url = url.replace(':id', projectID);
            }

            $.ajax({
                type: 'GET',
                url: url,
                success: function(data) {

                    $('#client_company_div').html(data.html);
                    $('#select_currency_id').html(data.currency);
                    if ($('#show_shipping_address').prop('checked') === true) {
                        checkShippingAddress();
                    }
                    fetchTimelogs();
                }
            });
        }

        function fetchTimelogs() {
            var timelogFrom = $('#timelog_from').val();
            var timelogTo = $('#timelog_to').val();
            var token = "{{ csrf_token() }}";
            var projectId = $('#project_id').val();

            $.easyAjax({
                url: "{{ route('invoices.fetch_timelogs') }}",
                type: "POST",
                data: {
                    '_token': token,
                    timelogFrom: timelogFrom,
                    timelogTo: timelogTo,
                    projectId: projectId
                },
                success: function(response) {
                    $("#sortable").html(response.html);
                    var noOfRows = $(document).find('#sortable .item-row').length;
                    $('#sortable').find(".quantity").each(function(index, element) {
                        var i = index;
                        var itemRow = $(this).closest('.item-row').find('select.type');
                        itemRow.attr('id', 'multiselect' + i);
                        itemRow.attr('name', 'taxes[' + i + '][]');
                        $(document).find('#multiselect' + i).selectpicker();
                    });

                    calculateTotal();
                }
            });
        }

        function checkShippingAddress() {
            var projectId = $('#project_id').val();
            var clientId = $('#client_company_id').length > 0 ? $('#client_company_id').val() : $('#client_id')
                .val();
            var showShipping = $('#show_shipping_address').prop('checked') === true ? 'yes' : 'no';

            var url = `{{ route('invoices.check_shipping_address') }}?showShipping=${showShipping}`;
            if (clientId !== '') {
                url += `&clientId=${clientId}`;
            }

            $.ajax({
                type: 'GET',
                url: url,
                success: function(response) {
                    if (response) {
                        if (response.switch === 'off') {
                            showShippingSwitch.click();
                        } else {
                            if (response.show !== undefined) {
                                $('#shippingAddress').html('');
                            } else {
                                $('#shippingAddress').html(response.view);
                            }
                        }
                    }
                }
            });
        }

        $('body').on('click', '#save-form', function() {
            calculateTotal();

            var discount = $('.discount-amount').html();
            var total = $('.total-field').val();

            if (parseFloat(discount) > parseFloat(total)) {
                $.toast({
                    heading: 'Error',
                    text: 'Discount cannot be more than total amount.',
                    position: 'top-right',
                    loaderBg: '#ff6849',
                    icon: 'error',
                    hideAfter: 3500
                });
                return false;
            }

            $.easyAjax({
                url: "{{ route('invoices.store') }}",
                container: '#storePayments',
                type: "POST",
                blockUI: true,
                redirect: true,
                data: $('#storePayments').serialize(),
                success: function(response) {
                    if (response.status == 'success') {
                        window.location.href = response.redirectUrl;
                    }
                }
            })
        });

        $('#storePayments').on('click', '.remove-item', function() {
            $(this).closest('.item-row').fadeOut(300, function() {
                $(this).remove();
                $('select.customSequence').each(function(index) {
                    $(this).attr('name', 'taxes[' + index + '][]');
                    $(this).attr('id', 'multiselect' + index + '');
                });
                calculateTotal();
            });
        });

        $('#storePayments').on('keyup', '.quantity,.cost_per_item,.item_name, .discount_value', function() {
            var quantity = $(this).closest('.item-row').find('.quantity').val();
            var perItemCost = $(this).closest('.item-row').find('.cost_per_item').val();
            var amount = (quantity * perItemCost);

            $(this).closest('.item-row').find('.amount').val(decimalupto2(amount));
            $(this).closest('.item-row').find('.amount-html').html(decimalupto2(amount));

            calculateTotal();
        });

        $('#storePayments').on('change', '.type, #discount_type', function() {
            var quantity = $(this).closest('.item-row').find('.quantity').val();
            var perItemCost = $(this).closest('.item-row').find('.cost_per_item').val();
            var amount = (quantity * perItemCost);

            $(this).closest('.item-row').find('.amount').val(decimalupto2(amount));
            $(this).closest('.item-row').find('.amount-html').html(decimalupto2(amount));

            calculateTotal();
        });

        function decimalupto2(num) {
            var amt = Math.round(num * 100) / 100;
            return parseFloat(amt.toFixed(2));
        }

        init(RIGHT_MODAL);

    }); // end of document.ready()
</script>
