<style>
    .customSequence .btn {
        border: none;
    }

    .customSequence .filter-option {
        font-size: 11px;
    }

    .desktop-description {
        resize: none;
    }

    .customSequence .dropdown-toggle::after {
        visibility: hidden;
    }

</style>

<!-- CREATE INVOICE START -->
<div class="bg-white rounded b-shadow-4 create-inv">
    <!-- HEADING START -->
    <div class="px-lg-4 px-md-4 px-3 py-3">
        <h4 class="mb-0 f-21 font-weight-normal text-capitalize"><i class="bi bi-cart3"></i> @lang('app.cart')</h4>
    </div>
    <!-- HEADING END -->
    <hr class="m-0 border-top-grey">
    <!-- FORM START -->
    <x-form class="c-inv-form" id="saveInvoiceForm">

        @if (count($products) == 0)
            <div class="row px-lg-4 px-md-4 px-3 py-5">
                <div class="col-sm-12">
                    <x-alert type="danger">@lang('messages.addItem')</x-alert>
                </div>
            </div>

             <!-- CANCEL SAVE SEND START -->
             <x-form-actions class="c-inv-btns d-block d-lg-flex d-md-flex">
                <div class="d-flex mb-3 mb-lg-0 mb-md-0">

                    <x-forms.button-cancel :link="route('products.index')" class="border-0 mr-3">@lang('app.cancel')
                    </x-forms.button-cancel>

                </div>
            </x-form-actions>
            <!-- CANCEL SAVE SEND END -->
        @else


            <!-- INVOICE NUMBER, DATE, DUE DATE, FREQUENCY START -->
            <div class="row px-lg-4 px-md-4 px-3 py-5">
                <!-- INVOICE NUMBER START -->
                <div class="col-md-3">
                    <span class="f-21 f-w-500 text-dark" id="basic-addon1">
                        @lang('app.order')#{{ is_null($lastOrder) ? 1 : $lastOrder }}
                    </span>
                </div>
                <!-- INVOICE NUMBER END -->

            </div>
            <!-- INVOICE NUMBER, DATE, DUE DATE, FREQUENCY END -->


            <!-- CLIENT DETAILS START -->
            <x-cards.user :image="user()->image_url">
                <div class="row">
                    <div class="col-10">
                        <h4 class="card-title f-15 f-w-500 text-darkest-grey mb-0">
                            {{ mb_ucwords(user()->name) }}
                        </h4>
                    </div>
                </div>
                <p class="f-13 font-weight-normal text-dark-grey mb-0">
                    {{ mb_ucwords(user()->clientDetails->company_name) }}
                </p>
                <p class="card-text f-12 text-lightest">@lang('app.lastLogin')

                    @if (!is_null(user()->last_login))
                        {{ user()->last_login->timezone(global_setting()->timezone)->format(global_setting()->date_format . ' ' . global_setting()->time_format) }}
                    @else
                        --
                    @endif
                </p>
            </x-cards.user>
            <!-- CLIENT DETAILS END -->

            <hr class="m-0 border-top-grey">


            <div id="sortable">
                @foreach ($products as $key => $item)
                    <!-- DESKTOP DESCRIPTION TABLE START -->
                    <div class="d-flex px-4 py-3 c-inv-desc item-row">

                        <div class="c-inv-desc-table w-100 d-lg-flex d-md-flex d-block">
                            <table width="100%">
                                <tbody>
                                    <tr class="text-dark-grey font-weight-bold f-14">
                                        <td width="{{ $invoiceSetting->hsn_sac_code_show ? '40%' : '50%' }}"
                                            class="border-0 inv-desc-mbl btlr">@lang('app.description')</td>
                                        @if ($invoiceSetting->hsn_sac_code_show)
                                            <td width="10%" class="border-0" align="right">@lang("app.hsnSac")
                                            </td>
                                        @endif
                                        <td width="10%" class="border-0" align="right">
                                            @lang("modules.invoices.qty")
                                        </td>
                                        <td width="10%" class="border-0" align="right">
                                            @lang("modules.invoices.unitPrice")</td>
                                        <td width="13%" class="border-0" align="right">
                                            @lang('modules.invoices.tax')
                                        </td>
                                        <td width="17%" class="border-0 bblr-mbl" align="right">
                                            @lang('modules.invoices.amount')</td>
                                    </tr>
                                    <tr>
                                        <td class="border-bottom-0 btrr-mbl btlr">
                                            <input hidden name="item_id[]" value="{{ $item->id }}">
                                            <input type="text" class="f-14 border-0 w-100 item_name bg-additional-grey" readonly
                                                name="item_name[]" placeholder="@lang('modules.expenses.itemName')"
                                                value="{{ $item->name }}">
                                        </td>
                                        @if ($invoiceSetting->hsn_sac_code_show)
                                            <td class="border-bottom-0">
                                                <span>{{ $item->hsn_sac_code }}</span>
                                                <input type="hidden"
                                                    class="form-control f-14 border-0 w-100 text-right hsn_sac_code"
                                                    value="{{ $item->hsn_sac_code }}" name="hsn_sac_code[]">
                                            </td>
                                        @endif
                                        <td class="border-bottom-0 d-block d-lg-none d-md-none">
                                            <input type="text" readonly class="f-14 border-0 w-100 mobile-description bg-additional-grey"
                                                placeholder="@lang('placeholders.invoices.description')"
                                                name="item_summary[]" value="{{ strip_tags($item->description) }}">
                                        </td>
                                        <td class="border-bottom-0">
                                            <input type="number" min="1" class="f-14 border-0 w-100 text-right quantity"
                                                value="{{ $quantityArray[$item->id] }}" name="quantity[]">
                                        </td>
                                        <td class="border-bottom-0">
                                            <input type="number" min="1"
                                                class="f-14 border-0 w-100 text-right cost_per_item bg-additional-grey" placeholder="0.00"
                                                value="{{ $item->price }}" name="cost_per_item[]" readonly>
                                        </td>
                                        <td class="border-bottom-0">
                                            <div class="select-others height-35 rounded border-0">
                                                <select id="multiselect" disabled name="taxes[{{ $key }}][]"
                                                    multiple="multiple"
                                                    class="select-picker type customSequence border-0 bg-additional-grey" data-size="3">
                                                    @foreach ($taxes as $tax)
                                                        <option data-rate="{{ $tax->rate_percent }}"
                                                            @if (isset($item->taxes) && array_search($tax->id, json_decode($item->taxes)) !== false) selected @endif value="{{ $tax->id }}">
                                                            {{ $tax->tax_name }}:
                                                            {{ $tax->rate_percent }}%</option>
                                                    @endforeach
                                                </select>
                                            </div>
                                        </td>
                                        <td rowspan="2" align="right" valign="top" class="bg-amt-grey btrr-bbrr">
                                            <span
                                                class="amount-html">{{ number_format((float) ($quantityArray[$item->id] * $item->price), 2, '.', '') }}</span>
                                            <input type="hidden" class="amount" name="amount[]"
                                                value="{{ number_format((float) ($quantityArray[$item->id] * $item->price), 2, '.', '') }}">
                                        </td>
                                    </tr>
                                    <tr class="d-none d-md-block d-lg-table-row">
                                        <td colspan="{{ $invoiceSetting->hsn_sac_code_show ? '4' : '3' }}"
                                            class="dash-border-top bblr">
                                            <textarea type="text" readonly
                                                class="f-14 border-0 w-100 desktop-description" name="item_summary[]"
                                                placeholder="@lang('placeholders.invoices.description')">{{ strip_tags($item->description) }}</textarea>
                                        </td>
                                        <td class="border-left-0">
                                            <input type="file" class="dropify" disabled name="invoice_item_image[]" data-allowed-file-extensions="png jpg jpeg" data-messages-default="test" data-height="70" data-default-file="{{ $item->image_url }}" data-show-remove="false" />
                                            <input type="hidden" name="invoice_item_image_url[]" value="{{ $item->image_url }}">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <a href="javascript:;"
                                class="d-flex align-items-center justify-content-center ml-3 remove-item"
                                data-item-id="{{ $item->id }}"><i
                                    class="fa fa-times-circle f-20 text-lightest"></i></a>
                        </div>
                    </div>
                    <!-- DESKTOP DESCRIPTION TABLE END -->
                @endforeach
            </div>

            <hr class="m-0 border-top-grey">

            <!-- TOTAL, DISCOUNT START -->
            <div class="d-flex px-lg-4 px-md-4 px-3 pb-3 c-inv-total">
                <table width="100%" class="text-right f-14 text-capitalize">
                    <tbody>
                        <tr>
                            <td width="50%" class="border-0 d-lg-table d-md-table d-none"></td>
                            <td width="50%" class="p-0 border-0">
                                <table width="100%">
                                    <tbody>
                                        <tr>
                                            <td colspan="2" class="border-top-0 text-dark-grey">
                                                @lang('modules.invoices.subTotal')</td>
                                            <td width="30%" class="border-top-0 sub-total">0.00</td>
                                            <input type="hidden" class="sub-total-field" name="sub_total" value="0">
                                            <input type="hidden" id="discount_type" name="discount_type" value="fixed">
                                            <input type="hidden" class="discount_value" name="discount_value" value="0">
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
                        for="usr">@lang('app.clientNote')</label>
                    <textarea class="form-control" name="note" id="note" rows="4"></textarea>
                </div>

            </div>
            <!-- NOTE AND TERMS AND CONDITIONS END -->

            <!-- CANCEL SAVE SEND START -->
            <x-form-actions class="c-inv-btns d-block d-lg-flex d-md-flex">
                <div class="d-flex mb-3 mb-lg-0 mb-md-0">

                    <x-forms.button-primary class="save-form mr-3" :link="route('invoices.index')">
                        @lang('modules.invoices.placeOrder')
                    </x-forms.button-primary>

                    <x-forms.link-secondary class="mr-3" :link="route('products.index')">
                        @lang('app.view') @lang('app.menu.products')
                    </x-forms.link-secondary>

                    <x-forms.button-cancel :link="route('products.index')" class="border-0 mr-3">@lang('app.cancel')
                    </x-forms.button-cancel>

                </div>
            </x-form-actions>
            <!-- CANCEL SAVE SEND END -->
        @endif


    </x-form>
    <!-- FORM END -->
</div>
<!-- CREATE INVOICE END -->

<script>
    $(document).ready(function() {

        $('body').on('click', '#show-shipping-field', function() {
            $('#add-shipping-field, #client_shipping_address').toggleClass('d-none');
        });

        $('#add-products').on('changed.bs.select', function(e, clickedIndex, isSelected, previousValue) {
            e.stopImmediatePropagation()
            var id = $(this).val();
            if (previousValue != id && id != '') {
                addProduct(id);
            }
        });

        $('#saveInvoiceForm').on('click', '.remove-item', function() {
            var id = $(this).data('item-id');
            var url = "{{ route('products.remove_cart_item', ':id') }}";
            url = url.replace(':id', id);
            var $this = $(this);

            $.easyAjax({
                url: url,
                container: '#saveInvoiceForm',
                type: "POST",
                blockUI: true,
                data: {
                    _token: "{{ csrf_token() }}"
                },
                success: function(response) {
                    $this.closest('.item-row').fadeOut(300, function() {
                        $this.remove();
                        $('select.customSequence').each(function(index) {
                            $this.attr('name', 'taxes[' + index + '][]');
                            $this.attr('id', 'multiselect' + index + '');
                        });
                        calculateTotal();
                    });
                }
            });
        });


        $('.save-form').click(function() {
            $('.type').prop('disabled', false);

            if (KTUtil.isMobileDevice()) {
                $('.desktop-description').remove();
            } else {
                $('.mobile-description').remove();
            }

            calculateTotal();

            var discount = $('#discount_amount').html();
            var total = $('.sub-total-field').val();

            if (parseFloat(discount) > parseFloat(total)) {
                Swal.fire({
                    icon: 'error',
                    text: "{{ __('messages.discountExceed') }}",

                    customClass: {
                        confirmButton: 'btn btn-primary',
                    },
                    showClass: {
                        popup: 'swal2-noanimation',
                        backdrop: 'swal2-noanimation'
                    },
                    buttonsStyling: false
                });
                return false;
            }

            $.easyAjax({
                url: "{{ route('orders.store') }}",
                container: '#saveInvoiceForm',
                type: "POST",
                blockUI: true,
                redirect: true,
                disableButton: true,
                buttonSelector: ".save-form",
                data: $('#saveInvoiceForm').serialize() + "&type=send"
            })

        });

        $('#saveInvoiceForm').on('click', '.remove-item', function() {
            $(this).closest('.item-row').fadeOut(300, function() {
                $(this).remove();
                $('select.customSequence').each(function(index) {
                    $(this).attr('name', 'taxes[' + index + '][]');
                    $(this).attr('id', 'multiselect' + index + '');
                });
                calculateTotal();
            });
        });

        $('#saveInvoiceForm').on('keyup', '.quantity,.cost_per_item,.item_name, .discount_value', function() {
            var quantity = $(this).closest('.item-row').find('.quantity').val();
            var perItemCost = $(this).closest('.item-row').find('.cost_per_item').val();
            var amount = (quantity * perItemCost);

            $(this).closest('.item-row').find('.amount').val(decimalupto2(amount));
            $(this).closest('.item-row').find('.amount-html').html(decimalupto2(amount));

            calculateTotal();
        });

        $('#saveInvoiceForm').on('change', '.type, #discount_type', function() {
            var quantity = $(this).closest('.item-row').find('.quantity').val();
            var perItemCost = $(this).closest('.item-row').find('.cost_per_item').val();
            var amount = (quantity * perItemCost);

            $(this).closest('.item-row').find('.amount').val(decimalupto2(amount));
            $(this).closest('.item-row').find('.amount-html').html(decimalupto2(amount));

            calculateTotal();
        });

        $('#saveInvoiceForm').on('input', '.quantity', function() {
            var quantity = $(this).closest('.item-row').find('.quantity').val();
            var perItemCost = $(this).closest('.item-row').find('.cost_per_item').val();
            var amount = (quantity * perItemCost);

            $(this).closest('.item-row').find('.amount').val(decimalupto2(amount));
            $(this).closest('.item-row').find('.amount-html').html(decimalupto2(amount));

            calculateTotal();
        });

        calculateTotal();

        init(RIGHT_MODAL);
    });
</script>
