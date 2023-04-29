<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Font Awesome Icons -->
    <link rel="stylesheet" href="{{ asset('vendor/css/all.min.css') }}">

    <link rel="stylesheet" href="{{ asset('vendor/css/select2.min.css') }}">

    <!-- Simple Line Icons -->
    <link rel="stylesheet" href="{{ asset('vendor/css/simple-line-icons.css') }}">

    <!-- Template CSS -->
    <link type="text/css" rel="stylesheet" media="all" href="{{ asset('css/main.css') }}">
    <link rel='stylesheet' href="{{ asset('vendor/css/dragula.css') }}" type='text/css' />
    <link rel='stylesheet' href="{{ asset('vendor/css/drag.css') }}" type='text/css' />

    <title>@lang($pageTitle)</title>
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="{{ global_setting()->favicon_url }}">
    <meta name="theme-color" content="#ffffff">
    <link rel="icon" type="image/png" sizes="16x16" href="{{ global_setting()->favicon_url }}">

    @isset($activeSettingMenu)
        <style>
            .preloader-container {
                margin-left: 510px;
                width: calc(100% - 510px)
            }

        </style>
    @endisset

    @stack('styles')

    <style>
        :root {
            --fc-border-color: #E8EEF3;
            --fc-button-text-color: #99A5B5;
            --fc-button-border-color: #99A5B5;
            --fc-button-bg-color: #ffffff;
            --fc-button-active-bg-color: #171f29;
            --fc-today-bg-color: #f2f4f7;
        }

        .preloader-container {
            height: 100vh;
            width: 100%;
            margin-left: 0;
            margin-top: 0;
        }

        .fc a[data-navlink] {
            color: #99a5b5;
        }

        .b-p-tasks {
            min-height: 100px;
        }

    </style>
    <style>
        #logo {
            height: 33px;
        }

    </style>


    <script src="{{ asset('vendor/jquery/jquery.min.js') }}"></script>
    <script src="{{ asset('vendor/jquery/modernizr.min.js') }}"></script>
    
    <script>
        var checkMiniSidebar = localStorage.getItem("mini-sidebar");
    </script>

</head>


<body id="body">

    @php
        if (is_null(global_setting()->light_logo)) {
            $logo = asset('img/worksuite-logo.png');
        } else {
            $logo = asset_url('app-logo/' . global_setting()->light_logo);
        }
    @endphp

    <!-- BODY WRAPPER START -->
    <div class="body-wrapper clearfix">

        <!-- MAIN CONTAINER START -->
        <section class="bg-additional-grey" id="fullscreen">

            <div class="preloader-container d-flex justify-content-center align-items-center">
                <div class="spinner-border" role="status" aria-hidden="true"></div>
            </div>


            <x-app-title class="d-block d-lg-none" :pageTitle="__($pageTitle)"></x-app-title>

            <!-- CONTENT WRAPPER START -->
            <div class="content-wrapper">

                <div class="row">
                    <div class="col-12 mb-4">
                        <img src="{{ $logo }}" class="height-35 rounded">
                        <div class="mt-2 f-12 text-dark-grey">{{ global_setting()->company_name }}</div>
                    </div>
                </div>


                @yield('content')

                <div class="row">
                    <div class="col-12 f-11 text-dark-grey">
                        &copy; {{ now()->year }} | {{ global_setting()->company_name }}
                    </div>
                </div>
            </div>

        </section>
        <!-- MAIN CONTAINER END -->
    </div>
    <!-- BODY WRAPPER END -->

    <x-right-modal />


    <!-- also the modal itself -->
    <div id="myModal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog d-flex justify-content-center align-items-center modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modelHeading">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">×</span></button>
                </div>
                <div class="modal-body">
                    Loading...
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-cancel rounded mr-3" data-dismiss="modal">Close</button>
                    <button type="button" class="btn-primary rounded">Save changes</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Global Required Javascript -->
    <script src="{{ asset('js/main.js') }}"></script>

    <script>
        const MODAL_DEFAULT = '#myModalDefault';
        const MODAL_LG = '#myModal';
        const MODAL_XL = '#myModalXl';
        const MODAL_HEADING = '#modelHeading';
        const RIGHT_MODAL = '#task-detail-1';
        const RIGHT_MODAL_CONTENT = '#right-modal-content';
        const RIGHT_MODAL_TITLE = '#right-modal-title';
        const global_setting = @json(global_setting());


        const datepickerConfig = {
            formatter: (input, date, instance) => {
                const value = moment(date).format('{{ global_setting()->moment_date_format }}')
                input.value = value
            },
            showAllDates: true,
            customDays: ['@lang("app.weeks.Sun")', '@lang("app.weeks.Mon")', '@lang("app.weeks.Tue")',
                '@lang("app.weeks.Wed")', '@lang("app.weeks.Thu")', '@lang("app.weeks.Fri")',
                '@lang("app.weeks.Sat")'
            ],
            customMonths: ['@lang("app.months.January")', '@lang("app.months.February")',
                '@lang("app.months.March")', '@lang("app.months.April")', '@lang("app.months.May")',
                '@lang("app.months.June")', '@lang("app.months.July")', '@lang("app.months.August")',
                '@lang("app.months.September")', '@lang("app.months.October")',
                '@lang("app.months.November")', '@lang("app.months.December")'
            ],
            customOverlayMonths: ['@lang("app.monthsShort.Jan")', '@lang("app.monthsShort.Feb")',
                '@lang("app.monthsShort.Mar")', '@lang("app.monthsShort.Apr")',
                '@lang("app.monthsShort.May")', '@lang("app.monthsShort.Jun")',
                '@lang("app.monthsShort.Jul")', '@lang("app.monthsShort.Aug")',
                '@lang("app.monthsShort.Sep")', '@lang("app.monthsShort.Oct") ',
                '@lang("app.monthsShort.Nov")', '@lang("app.monthsShort.Dec")'
            ],
            overlayButton: "@lang('app.submit')",
            overlayPlaceholder: "@lang('app.enterYear')"
        };

        const dropifyMessages = {
            default: '@lang("app.dragDrop")',
            replace: '@lang("app.dragDropReplace")',
            remove: '@lang("app.remove")',
            error: '@lang("app.largeFile")'
        };
    </script>
    <script>
        var allowDrag = 'false';
    </script>

    @stack('scripts')

    <script>
        $(window).on('load', function() {
            // Animate loader off screen
            init();
            $(".preloader-container").fadeOut("slow", function() {
                $(this).removeClass("d-flex");
            });
        });
    </script>

</body>

</html>
