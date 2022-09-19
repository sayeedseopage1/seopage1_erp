@extends('layouts.app')

@section('content')

    <!-- SETTINGS START -->
    <div class="w-100 d-flex ">

        <x-setting-sidebar :activeMenu="$activeSettingMenu" />

        <x-setting-card>
            <x-slot name="header">
                <div class="s-b-n-header" id="tabs">
                    <nav class="tabs border-bottom-grey">
                        <ul class="nav -primary" id="nav-tab" role="tablist">
                            <li>
                                <a class="nav-item nav-link f-15 active paypal" data-toggle="tab"
                                href="{{ route('payment-gateway-settings.index') }}" role="tab" aria-controls="nav-paypal"
                                aria-selected="true">@lang('app.paypal') <i class="fa fa-circle ml-1 {{ $credentials->paypal_status == 'active' ? 'text-light-green' : 'text-red' }}"></i></a>
                            </li>
                            <li>
                                <a class="nav-item nav-link f-15 stripe" data-toggle="tab"
                                href="{{ route('payment-gateway-settings.index') }}?tab=stripe" role="tab"
                                aria-controls="nav-stripe" aria-selected="false">@lang('app.stripe') <i class="fa fa-circle ml-1 {{ $credentials->stripe_status == 'active' ? 'text-light-green' : 'text-red' }}"></i></a>
                            </li>
                            <li>
                                <a class="nav-item nav-link f-15 razorpay" data-toggle="tab"
                                href="{{ route('payment-gateway-settings.index') }}?tab=razorpay" role="tab"
                                aria-controls="nav-razorpay" aria-selected="false">@lang('app.razorpay') <i class="fa fa-circle ml-1 {{ $credentials->razorpay_status == 'active' ? 'text-light-green' : 'text-red' }}"></i></a>
                            </li>
                            <li>
                                <a class="nav-item nav-link f-15 paystack" data-toggle="tab"
                                href="{{ route('payment-gateway-settings.index') }}?tab=paystack" role="tab"
                                aria-controls="nav-paystack" aria-selected="false">@lang('app.paystack') <i class="fa fa-circle ml-1 {{ $credentials->paystack_status == 'active' ? 'text-light-green' : 'text-red' }}"></i></a>
                            </li>
                            <li>
                                <a class="nav-item nav-link f-15 mollie" data-toggle="tab"
                                href="{{ route('payment-gateway-settings.index') }}?tab=mollie" role="tab"
                                aria-controls="nav-mollie" aria-selected="false">@lang('app.mollie') <i                                    class="fa fa-circle ml-1 {{ $credentials->mollie_status == 'active' ? 'text-light-green' : 'text-red' }}"></i></a>
                            </li>
                            <li>
                                <a class="nav-item nav-link f-15 payfast" data-toggle="tab"
                                href="{{ route('payment-gateway-settings.index') }}?tab=payfast" role="tab"
                                aria-controls="nav-payfast" aria-selected="false">@lang('app.payfast') <i                                    class="fa fa-circle ml-1 {{ $credentials->payfast_status == 'active' ? 'text-light-green' : 'text-red' }}"></i></a>
                            </li>

                            <li>
                                <a class="nav-item nav-link f-15 authorize" data-toggle="tab"
                                href="{{ route('payment-gateway-settings.index') }}?tab=authorize" role="tab"
                                aria-controls="nav-authorize" aria-selected="false">@lang('app.authorize') <i                                    class="fa fa-circle ml-1 {{ $credentials->authorize_status == 'active' ? 'text-light-green' : 'text-red' }}"></i></a>
                            </li>

                            <li>
                                <a class="nav-item nav-link f-15 square" data-toggle="tab"
                                href="{{ route('payment-gateway-settings.index') }}?tab=square" role="tab"
                                aria-controls="nav-square" aria-selected="false">@lang('app.square') <i                                    class="fa fa-circle ml-1 {{ $credentials->square_status == 'active' ? 'text-light-green' : 'text-red' }}"></i></a>
                            </li>
                            <li>
                                <a class="nav-item nav-link f-15 flutterwave" data-toggle="tab"
                                href="{{ route('payment-gateway-settings.index') }}?tab=flutterwave" role="tab"
                                aria-controls="nav-flutterwave" aria-selected="false">@lang('app.flutterwave') <i                                    class="fa fa-circle ml-1 {{ $credentials->flutterwave_status == 'active' ? 'text-light-green' : 'text-red' }}"></i></a>
                            </li>

                            <li>
                                <a class="nav-item nav-link f-15 offline" data-toggle="tab"
                                href="{{ route('payment-gateway-settings.index') }}?tab=offline" role="tab"
                                aria-controls="nav-offline" aria-selected="false">@lang('modules.offlinePayment.title')</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </x-slot>

            <x-slot name="buttons">
                <div class="row">
                    <div class="col-md-12 mb-3">
                        <x-forms.button-primary icon="plus" id="addMethod" class="addMethod d-none">
                            @lang('modules.offlinePayment.addMethod')
                        </x-forms.button-primary>
                    </div>
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
    /*******************************************************
                     More btn in projects menu Start
            *******************************************************/

    const container = document.querySelector('.tabs');
    const primary = container.querySelector('.-primary');
    const primaryItems = container.querySelectorAll('.-primary > li:not(.-more)');
    container.classList.add('--jsfied'); // insert "more" button and duplicate the list

    primary.insertAdjacentHTML('beforeend', `
    <li class="-more bg-grey">
        <button type="button" class="px-4 h-100 w-100 d-lg-flex d-md-flex align-items-center justify-content-center py-3" aria-haspopup="true" aria-expanded="false">
        More <span>&darr;</span>
        </button>
        <ul class="-secondary" id="hide-project-menues">
        ${primary.innerHTML}
        </ul>
    </li>
    `);
    const secondary = container.querySelector('.-secondary');
    const secondaryItems = secondary.querySelectorAll('li');
    const allItems = container.querySelectorAll('li');
    const moreLi = primary.querySelector('.-more');
    const moreBtn = moreLi.querySelector('button');
    moreBtn.addEventListener('click', e => {
        e.preventDefault();
        container.classList.toggle('--show-secondary');
        moreBtn.setAttribute('aria-expanded', container.classList.contains('--show-secondary'));
    }); // adapt tabs

    const doAdapt = () => {
        // reveal all items for the calculation
        allItems.forEach(item => {
            item.classList.remove('--hidden');
        }); // hide items that won't fit in the Primary

        let stopWidth = 200; // need to change according tab counts
        let hiddenItems = [];
        const primaryWidth = primary.offsetWidth;
        primaryItems.forEach((item, i) => {
            if (primaryWidth >= stopWidth + item.offsetWidth) {
                stopWidth += item.offsetWidth;
            } else {
                item.classList.add('--hidden');
                hiddenItems.push(i);
            }
        }); // toggle the visibility of More button and items in Secondary

        if (!hiddenItems.length) {
            moreLi.classList.add('--hidden');
            container.classList.remove('--show-secondary');
            moreBtn.setAttribute('aria-expanded', false);
        } else {
            secondaryItems.forEach((item, i) => {
                if (!hiddenItems.includes(i)) {
                    item.classList.add('--hidden');
                }
            });
        }
    };

    doAdapt(); // adapt immediately on load

    window.addEventListener('resize', doAdapt); // adapt on window resize
    // hide Secondary on the outside click

    document.addEventListener('click', e => {
        let el = e.target;

        while (el) {
            if (el === secondary || el === moreBtn) {
                return;
            }

            el = el.parentNode;
        }

        container.classList.remove('--show-secondary');
        moreBtn.setAttribute('aria-expanded', false);
    });
    /*******************************************************
             More btn in projects menu End
    *******************************************************/
</script>

    <script>
        /* manage menu active class */
        $('.nav-item').removeClass('active');
        const activeTab = "{{ $activeTab }}";
        $('.' + activeTab).addClass('active');

        (activeTab == 'offline') ? $('.addMethod').removeClass('d-none'): $('.addMethod').addClass('d-none');

       $("body").on("click", "#editSettings .nav a", function(event) {
            event.preventDefault();

            $('.nav-item').removeClass('active');
            $(this).addClass('active');

            ($(this).hasClass('offline')) ? $('.addMethod').removeClass('d-none'): $('.addMethod').addClass(
                'd-none');

            const requestUrl = this.href;

            $.easyAjax({
                url: requestUrl,
                blockUI: true,
                container: "#nav-tabContent",
                historyPush: true,
                success: function(response) {
                    if (response.status == "success") {
                        $('#nav-tabContent').html(response.html);
                        init('.settings-box');
                        init('#F');
                    }
                }
            });
        });

        $("body").on("change", "#paypal_status", function(event) {
            $('#paypal_details').toggleClass('d-none');
        });

        $("body").on("change", "#paypal_mode", function() {
            $('#sandbox_paypal_details').toggleClass('d-none');
            $('#live_paypal_details').toggleClass('d-none');
        });

        $("body").on("change", "#stripe_mode", function() {
            $('#test_stripe_details').toggleClass('d-none');
            $('#live_stripe_details').toggleClass('d-none');
        });

        $("body").on("change", "#razorpay_mode", function() {
            $('#test_razorpay_details').toggleClass('d-none');
            $('#live_razorpay_details').toggleClass('d-none');
        });

        $("body").on("change", "#stripe_status", function(event) {
            $('#stripe_details').toggleClass('d-none');
        });

        $("body").on("change", "#paystack_status", function(event) {
            $('#paystack_details').toggleClass('d-none');
        });

        $("body").on("change", "#flutterwave_status", function(event) {
            $('#flutterwave_details').toggleClass('d-none');
        });

        $("body").on("change", "#mollie_status", function(event) {
            $('#mollie_details').toggleClass('d-none');
        });

        $("body").on("change", "#payfast_status", function(event) {
            $('#payfast_details').toggleClass('d-none');
        });

        $("body").on("change", "#authorize_status", function(event) {
            $('#authorize_details').toggleClass('d-none');
        });

        $("body").on("change", "#square_status", function(event) {
            $('#square_details').toggleClass('d-none');
        });

        $("body").on("change", "#razorpay_status", function(event) {
            $('#razorpay_details').toggleClass('d-none');
        });

        // Save paypal, stripe and razorpay credentials
        $("body").on("click", "#save_paypal_data, #save_stripe_data, #save_razorpay_data, #save_paystack_data, #save_flutterwave_data, #save_mollie_data, #save_payfast_data, #save_authorize_data, #save_square_data", function(event) {
            $.easyAjax({
                url: "{{ route('payment-gateway-settings.update', [$credentials->id]) }}",
                container: '#editSettings',
                type: "POST",
                redirect: true,
                disableButton: true,
                blockUI: true,
                data: $('#editSettings').serialize(),
                success: function() {
                    window.location.reload();
                }
            })
        });

        // Edit new offline payment method
        $('body').on('click', '.edit-type', function() {
            var typeId = $(this).data('type-id');
            var url = "{{ route('offline-payment-setting.edit', ':id') }}";
            url = url.replace(':id', typeId);
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        })

        // Add new offline payment method
        $('body').on('click', '.addMethod', function() {
            var url = "{{ route('offline-payment-setting.create') }}";
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);

        });

        // Delete offline payment method
        $('body').on('click', '.delete-type', function() {
            var id = $(this).data('type-id');
            Swal.fire({
                title: "@lang('messages.sweetAlertTitle')",
                text: "@lang('messages.removeMethodText')",
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

                    var url = "{{ route('offline-payment-setting.destroy', ':id') }}";
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
                                $('.row' + id).fadeOut();
                            }
                        }
                    });
                }
            });
        });
    </script>

@endpush
