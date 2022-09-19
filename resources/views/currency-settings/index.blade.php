@extends('layouts.app')

@section('content')

    <!-- SETTINGS START -->
    <div class="w-100 d-flex ">

        <x-setting-sidebar :activeMenu="$activeSettingMenu" />

        <x-setting-card>

            <x-slot name="alert">
                <div class="row">
                    <div class="col-md-12">
                        <x-alert type="info" icon="info-circle">
                            @lang('messages.exchangeRateNote')
                        </x-alert>
                    </div>
                </div>
            </x-slot>

            <x-slot name="buttons">
                <div class="row">
                    <div class="col-md-12 mb-3">
                        <x-forms.link-primary :link="route('currency-settings.create')" class="mr-1 mb-2 mb-lg-0 mb-md-0" icon="plus">
                            @lang('modules.currencySettings.addNewCurrency')
                        </x-forms.link-primary>
                        <x-forms.button-secondary icon="key" id="addCurrencyExchangeKey">
                            @lang('modules.accountSettings.currencyConverterKey')
                        </x-forms.button-secondary>
                    </div>
                </div>
            </x-slot>

            <x-slot name="header" >
                <div class="s-b-n-header" id="tabs">
                    <nav class="tabs px-4 border-bottom-grey">
                        <div class="nav" id="nav-tab" role="tablist">
                            <a class="nav-item nav-link f-15 active currency-setting" href="{{ route('currency-settings.index') }}" role="tab" aria-controls="nav-ticketAgents" aria-selected="true">@lang('modules.accountSettings.currencySetting')
                            </a>
                            <a class="nav-item nav-link f-15 currency-format-setting" href="{{route('currency-settings.index')}}?tab=currency-format-setting" role="tab" aria-controls="nav-ticketTypes" aria-selected="true" ajax="false"> @lang('modules.accountSettings.currencyFormatSetting')
                            </a>
                        </div>
                    </nav>
                </div>
            </x-slot>

            {{-- include tabs here --}}
            @include($view)

        </x-setting-card>

    </div>
    <!-- SETTINGS END -->

@endsection

@push('scripts')
<script>

    /* manage menu active class */
    $('.nav-item').removeClass('active');
    const activeTab = "{{ $activeTab }}";
    $('.' + activeTab).addClass('active');

   $("body").on("click", "#editSettings .nav a", function(event) {
        event.preventDefault();

        $('.nav-item').removeClass('active');
        $(this).addClass('active');

        const requestUrl = this.href;

        $.easyAjax({
            url: requestUrl,
            blockUI: true,
            container: "#nav-tabContent",
            historyPush: true,
            success: function(response) {
                if (response.status == "success") {
                    $('#nav-tabContent').html(response.html);
                    init('#nav-tabContent');
                }
            }
        });
    });

    // Delete currency
    $('body').on('click', '.delete-table-row', function() {
        var id = $(this).data('currency-id');
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
                var url = "{{ route('currency-settings.destroy', ':id') }}";
                url = url.replace(':id', id);

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
                            $('.row'+id).fadeOut();
                        }
                    }
                });
            }
        });
    });

    // update exchange rates
    $('#update-exchange-rates').click(function() {
        var url = "{{ route('currency_settings.update_exchange_rates') }}";
        $.easyAjax({
            url: url,
            type: "GET",
            blockUI: true,
            success: function(response) {
                if (response.status == "success") {
                    $.unblockUI();
                    window.location.reload();
                }
            }
        })
    });

    // Currency code converter modal open script
    $('#addCurrencyExchangeKey').click(function() {
        const url = "{{ route('currency_settings.exchange_key') }}";
        $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
        $.ajaxModal(MODAL_LG, url);
    });

    $("body").on("click", "#save-currency-format", function() {
        $.easyAjax({
            url: "{{route('currency_settings.update_currency_format')}}",
            container: '#editSettings',
            type: "GET",
            blockUI: true,
            disableButton: true,
            redirect: true,
            buttonSelector: "#save-currency-format",
            data: $('#editSettings').serialize()
        })
    });

    $("body").on("change keyup", "#currency_position, #thousand_separator, #decimal_separator, #no_of_decimal", function() {
        let number              = 1234567.89;
        let no_of_decimal       = $('#no_of_decimal').val();
        let thousand_separator  = $('#thousand_separator').val();
        let currency_position   = $('#currency_position').val();
        let decimal_separator   = $('#decimal_separator').val();

        let formatted_currency  =  number_format(number, no_of_decimal, decimal_separator, thousand_separator, currency_position);
        $('#formatted_currency').html(formatted_currency);
    });

    function number_format(number, decimals, dec_point, thousands_sep, currency_position)
    {

        // Strip all characters but numerical ones.
        number = (number + '').replace(/[^0-9+\-Ee.]/g, '');

        var currency_symbol = '{{global_setting()->currency->currency_symbol}}';

        var n = !isFinite(+number) ? 0 : +number,
            prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
            sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
            dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
            s = '',
            toFixedFix = function (n, prec) {
                var k = Math.pow(10, prec);
                return '' + Math.round(n * k) / k;
            };
        // Fix for IE parseFloat(0.55).toFixed(0) = 0;
        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
        if (s[0].length > 3) {
            s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
        }
        if ((s[1] || '').length < prec) {
            s[1] = s[1] || '';
            s[1] += new Array(prec - s[1].length + 1).join('0');
        }

        // number = dec_point == '' ? s[0] : s.join(dec);

        number = s.join(dec);

        switch (currency_position) {
            case 'left':
                number = currency_symbol+number;
                break;
            case 'right':
                number = number+currency_symbol;
                break;
            case 'left_with_space':
                number = currency_symbol+' '+number;
                break;
            case 'right_with_space':
                number = number+' '+currency_symbol;
                break;
            default:
                number = currency_symbol+number;
                break;
        }
        return number;
    }

</script>
@endpush
