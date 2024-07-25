<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <link rel="icon" type="image/png" sizes="16x16" href="{{ global_setting()->favicon_url }}">
    <meta name="msapplication-TileImage" content="{{ global_setting()->favicon_url }}">

    <!-- Font Awesome Icons -->
    <link rel="stylesheet" href="{{ asset('vendor/css/all.min.css') }}">

    <!-- Simple Line Icons -->
    <link rel="stylesheet" href="{{ asset('vendor/css/simple-line-icons.css') }}">

    <!-- Datepicker -->
    <link rel="stylesheet" href="{{ asset('vendor/css/datepicker.min.css') }}">

    <!-- TimePicker -->
    <link rel="stylesheet" href="{{ asset('vendor/css/bootstrap-timepicker.min.css') }}">

    <!-- Select Plugin -->
    <link rel="stylesheet" href="{{ asset('vendor/css/select2.min.css') }}">

    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="{{ asset('vendor/css/bootstrap-icons.css') }}">

    <!-- Wow js css -->
    <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/> -->
    @stack('datatable-styles')

    <!-- Template CSS -->
    <link type="text/css" rel="stylesheet" media="all" href="{{ asset('css/main.css') }}">
    <link href="https://www.jqueryscript.net/css/jquerysctipttop.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Condensed" type="text/css" />

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
        integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />

    <link rel="stylesheet" href="{{ asset('moving-countdown/style.css') }}" type="text/css" />

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.css">
    <!-- sp1 editor css -->
    <link rel="stylesheet" href="{{ asset('css/ck-editor.css') }}">
    <link rel="stylesheet" href="{{ asset('css/seopage1.css') }}">


    <!-- designation hierarchy && department hierarchy -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://code.jquery.com/jquery-migrate-3.0.0.min.js"></script>
    <script src="https://code.jscharting.com/latest/jscharting.js"></script>


    <title>@lang($pageTitle)</title>
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="{{ global_setting()->favicon_url }}">
    <meta name="theme-color" content="#ffffff">
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    @isset($activeSettingMenu)
        <style>
            .preloader-container {
                /*margin-left: 510px;
                        width: calc(100% - 510px);*/
                z-index: 99999;
                overflow: hidden;
            }

            .blur-code {
                filter: blur(3px);

            }

            .purchase-code {
                transition: filter .2s ease-out;
                margin-right: 4px;
            }

            .loader,
            .loader:after {
                border-radius: 50%;
                width: 10em;
                height: 10em;
            }

            .loader {
                margin: 60px auto;
                font-size: 10px;
                position: relative;
                text-indent: -9999em;
                border-top: 1.1em solid rgba(255, 255, 255, 0.2);
                border-right: 1.1em solid rgba(255, 255, 255, 0.2);
                border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);
                border-left: 1.1em solid #ffffff;
                -webkit-transform: translateZ(0);
                -ms-transform: translateZ(0);
                transform: translateZ(0);
                -webkit-animation: load8 1.1s infinite linear;
                animation: load8 1.1s infinite linear;
            }

            @-webkit-keyframes load8 {
                0% {
                    -webkit-transform: rotate(0deg);
                    transform: rotate(0deg);
                }

                100% {
                    -webkit-transform: rotate(360deg);
                    transform: rotate(360deg);
                }
            }

            @keyframes load8 {
                0% {
                    -webkit-transform: rotate(0deg);
                    transform: rotate(0deg);
                }

                100% {
                    -webkit-transform: rotate(360deg);
                    transform: rotate(360deg);
                }
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

        .fc a[data-navlink] {
            color: #99a5b5;
        }
    </style>


    {{-- Custom theme styles --}}
    @if (!user()->dark_theme)
        @include('sections.theme_css')
    @endif

    @if (file_exists(public_path() . '/css/app-custom.css'))
        <link href="{{ asset('css/app-custom.css') }}" rel="stylesheet">
    @endif

    <script src="{{ asset('vendor/jquery/jquery.min.js') }}"></script>
    <script src="{{ asset('vendor/jquery/modernizr.min.js') }}"></script>

    {{-- Timepicker --}}
    <script src="{{ asset('vendor/jquery/bootstrap-timepicker.min.js') }}"></script>
    @if ($pushSetting->status == 'active')
        <link rel="manifest" href="{{ asset('manifest.json') }}" />
        <script src="{{ asset('vendor/onesignal/OneSignalSDK.js') }}" async='async'></script>
        <script>
            var OneSignal = window.OneSignal || [];
            OneSignal.push(function() {
                OneSignal.SERVICE_WORKER_PARAM = {
                    scope: '/vendor/onesignal/'
                };
                OneSignal.SERVICE_WORKER_PATH = 'vendor/onesignal/OneSignalSDKWorker.js'
                OneSignal.SERVICE_WORKER_UPDATER_PATH = 'vendor/onesignal/OneSignalSDKUpdaterWorker.js'
                OneSignal.init({
                    appId: "{{ $pushSetting->onesignal_app_id }}",
                    autoRegister: false,
                    notifyButton: {
                        enable: true,
                        showCredit: false,
                        theme: "inverse",
                        size: "small",
                        position: '{{ user()->rtl ? 'bottom-left' : 'bottom-right' }}',
                        text: {
                            'tip.state.unsubscribed': "@lang('app.onesignal.tip.state.unsubscribed')",
                            'tip.state.subscribed': "@lang('app.onesignal.tip.state.subscribed')",
                            'tip.state.blocked': "@lang('app.onesignal.tip.state.blocked')",
                            'message.prenotify': "@lang('app.onesignal.message.prenotify')",
                            'message.action.subscribed': "@lang('app.onesignal.message.action.subscribed')",
                            'message.action.resubscribed': "@lang('app.onesignal.message.action.resubscribed')",
                            'message.action.unsubscribed': "@lang('app.onesignal.message.action.unsubscribed')",
                            'dialog.main.title': "@lang('app.onesignal.dialog.main.title')",
                            'dialog.main.button.subscribe': "@lang('app.onesignal.dialog.main.button.subscribe')",
                            'dialog.main.button.unsubscribe': "@lang('app.onesignal.dialog.main.button.unsubscribe')",
                            'dialog.blocked.title': "@lang('app.onesignal.dialog.blocked.title')",
                            'dialog.blocked.message': "@lang('app.onesignal.dialog.blocked.message')"
                        }
                    },
                    promptOptions: {
                        /* actionMessage limited to 90 characters */
                        actionMessage: "@lang('app.onesignal.actionMessage')",
                        /* acceptButtonText limited to 15 characters */
                        acceptButtonText: "@lang('app.onesignal.acceptButtonText')",
                        /* cancelButtonText limited to 15 characters */
                        cancelButtonText: "@lang('app.onesignal.cancelButtonText')"
                    }
                });
                OneSignal.on('subscriptionChange', function(isSubscribed) {
                    console.log("The user's subscription state is now:", isSubscribed);
                });


                if (Notification.permission === "granted") {
                    // Automatically subscribe user if deleted cookies and browser shows "Allow"
                    OneSignal.getUserId()
                        .then(function(userId) {
                            if (!userId) {
                                OneSignal.registerForPushNotifications();
                            } else {
                                let db_onesignal_id = '{{ $user->onesignal_player_id }}';

                                if (db_onesignal_id == null || db_onesignal_id !==
                                    userId) { //update onesignal ID if it is new
                                    updateOnesignalPlayerId(userId);
                                }
                            }
                        })
                } else {
                    OneSignal.isPushNotificationsEnabled(function(isEnabled) {

                        OneSignal.getUserId(function(userId) {
                            console.log("OneSignal User ID:", userId);
                            // (Output) OneSignal User ID: 270a35cd-4dda-4b3f-b04e-41d7463a2316
                            let db_onesignal_id = '{{ $user->onesignal_player_id }}';
                            console.log('database id : ' + db_onesignal_id);

                            if (db_onesignal_id == null || db_onesignal_id !==
                                userId) { //update onesignal ID if it is new
                                updateOnesignalPlayerId(userId);
                            }
                        });

                        if (isEnabled) {
                            console.log("Push notifications are enabled! - 2    ");
                            // console.log("unsubscribe");
                            // OneSignal.setSubscription(false);
                        } else {
                            console.log("Push notifications are not enabled yet. - 2");
                            OneSignal.showHttpPrompt();
                            // OneSignal.registerForPushNotifications({
                            //         modalPrompt: true
                            // });
                        }
                    });

                }
            });
        </script>
    @endif

    @if ($pusherSettings->status)
        <script src="https://js.pusher.com/7.0/pusher.min.js"></script>

        <script>
            var pusher = new Pusher('{{ $pusherSettings->pusher_app_key }}', {
                cluster: '{{ $pusherSettings->pusher_cluster }}',
                forceTLS: '{{ $pusherSettings->force_tls }}'
            });
        </script>
    @endif

    {{-- Include file for widgets if exist --}}
    @includeif('sections.custom_script')


    <script>
        var checkMiniSidebar = localStorage.getItem("mini-sidebar");
    </script>

</head>


<body id="body" class="{{ user()->dark_theme ? 'dark-theme' : '' }} {{ user()->rtl ? 'rtl' : '' }}">
    <script>
        if (checkMiniSidebar == "yes" || checkMiniSidebar == "") {
            $('body').addClass('sidebar-toggled');
        }
    </script>
    {{-- include topbar --}}
    @include('sections.topbar')

    {{-- include sidebar menu --}}
    @include('sections.sidebar')

    <!-- BODY WRAPPER START -->
    <div class="body-wrapper clearfix">

        <!-- REACT COMPONENT MASTER ACCESS -->
        <div id="react-root-container" ></div>
        <div id="react-timezone-modal"></div>
        <div id="react-features-container" ></div>
        <!-- REACT COMPONENT MASTER ACCESS -->

        <!-- MAIN CONTAINER START -->
        <section class="main-container bg-additional-grey" id="fullscreen">
 
            <div class="preloader-container d-flex justify-content-center align-items-center">
                <div class="spinner-border" role="status" aria-hidden="true"></div>
            </div>


            @yield('filter-section')

            <x-app-title class="d-block d-lg-none" :pageTitle="__($pageTitle)"></x-app-title>

            @yield('content')
            @if (Auth::user()->role_id == 4 && !Request::is('account/contracts/*') && !Request::is('account/deals/*'))
                @php
                    $now = \Carbon\Carbon::now()->toDateTimeString();
                    $deal_id = App\Models\Deal::where('status', 'pending')
                        ->orderBy('id', 'asc')
                        ->where('pm_id', Auth::id())
                        ->where('is_drafted', 0)
                        ->where(function ($query) use ($now) {
                            $query->where('authorization_status', 1)
                                ->orWhere(function ($subquery) use ($now) {
                                    $subquery->where('authorization_status', 2)
                                        ->where(function ($innerSubquery) use ($now) {
                                            $innerSubquery->whereRaw('
                                                (
                                                    (
                                                        (TIME(released_at) >= "23:30" OR TIME(released_at) < "07:00")
                                                        AND (DATE(released_at) < CURDATE())
                                                    )
                                                    OR
                                                    (
                                                        (TIME(released_at) >= "23:30" OR TIME(released_at) < "07:00")
                                                        AND TIME(?) >= "10:00"
                                                    )
                                                    OR
                                                    (
                                                        TIME(released_at) >= "07:00" AND TIME(released_at) < "23:30"
                                                        AND TIMESTAMPDIFF(SECOND, released_at, ?) > ?
                                                    )
                                                )
                                            ', [$now, $now, (180 * 60)]);
                                        });
                                });
                        })
                        ->get();
                @endphp
                @if (count($deal_id) > 0)
                    <div class="timer-card @if (\Session::get('timer_box_status') == 'off') minimized @endif">
                        <div class="header mt-3 rounded">
                            <h5 class="float-start">Project Acceptance ({{ $deal_id->count() }})</h5>
                            <button class="minimize-button" onclick="minimizeCard()">
                                <i id="handelButton" class="fa-solid fa-minimize"></i>
                            </button>
                        </div>
                        @foreach ($deal_id as $value)
                            @php
                                if ($deal_id != null) {
                                    $to = \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', \Carbon\Carbon::now());

                                    $from = \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $value->award_time);

                                    if (\Carbon\Carbon::now()->lt($to)) {
                                        $diff_in_minutes = $from->diffInMinutes($to);
                                    } else {
                                        $diff_in_minutes = 0;
                                    }
                                }
                            @endphp
                            @if ($value != null && $diff_in_minutes < 1200)
                                <div class="content">
                                    <div class="bg-timer-box my-3 rounded p-2 text-light">
                                        <p class="mb-0">New Deal Won: {{ $value->client_name }}</p>
                                        <span class="timer-count font-weight-bold"
                                            id="timer_{{ $value->id }}">00:00:00</span>
                                        <p>{{ \Carbon\Carbon::parse($value->award_time)->addHours(20)->format('Y-m-d (l), g:i A') }}
                                        </p>
                                        <a class="btn btn-success text-light rounded px-1 py-0 text-underline-none"
                                            href="/account/contracts/{{ $value->id }}" target="_blank"
                                            class="Accept">View <i class="fa-regular fa-eye"></i></a>
                                    </div>
                                </div>
                            @endif
                        @endforeach
                    </div>
                @endif
            @endif
            @if (Auth::user()->role_id == 1 && !Request::is('account/contracts/*') && !Request::is('account/deals/*'))
                @php
                    $now = \Carbon\Carbon::now()->toDateTimeString();
                    $deal_id = App\Models\Deal::where('status', 'pending')
                        ->orderBy('id', 'asc')
                        ->where('pm_id', Auth::id())
                        ->where('is_drafted', 0)
                        ->where(function ($query) use ($now) {
                            $query->where('authorization_status', 1)
                                ->orWhere(function ($subquery) use ($now) {
                                    $subquery->where('authorization_status', 2)
                                        ->where(function ($innerSubquery) use ($now) {
                                            $innerSubquery->whereRaw('
                                                (
                                                    (
                                                        (TIME(released_at) >= "23:30" OR TIME(released_at) < "07:00")
                                                        AND (DATE(released_at) < CURDATE())
                                                    )
                                                    OR
                                                    (
                                                        (TIME(released_at) >= "23:30" OR TIME(released_at) < "07:00")
                                                        AND TIME(?) >= "10:00"
                                                    )
                                                    OR
                                                    (
                                                        TIME(released_at) >= "07:00" AND TIME(released_at) < "23:30"
                                                        AND TIMESTAMPDIFF(SECOND, released_at, ?) > ?
                                                    )
                                                )
                                            ', [$now, $now, (180 * 60)]);
                                        });
                                });
                        })
                        ->get();
                @endphp
                @if (count($deal_id) > 0)
                    <div class="timer-card @if (\Session::get('timer_box_status') == 'off') minimized @endif">
                        <div class="header mt-3 rounded">
                            <h5 class="text-left mb-0">Won deals ({{ $deal_id->count() }})</h5>
                            <button class="minimize-button" onclick="minimizeCard()">
                                <i id="handelButton" class="fa-solid fa-minimize"></i>
                            </button>
                        </div>
                        @foreach ($deal_id as $value)
                            @php
                                if ($deal_id != null) {
                                    $to = \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', \Carbon\Carbon::now());

                                    $from = \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $value->award_time);

                                    $diff_in_minutes = $from->diffInMinutes($to);
                                }
                            @endphp
                            @if ($value != null && $diff_in_minutes < 1300)
                                <div class="content">
                                    <div class="bg-timer-box my-3 rounded p-2 text-light">
                                        <p class="mb-0">New Deal Won: {{ $value->client_name }}</p>
                                        <span class="timer-count font-weight-bold"
                                            id="timer_{{ $value->id }}">00:00:00</span>
                                        <p>{{ \Carbon\Carbon::parse($value->award_time)->addHours(20)->format('Y-m-d (l), g:i A') }}
                                        </p>
                                        <a class="btn btn-success text-light rounded px-1 py-0 text-underline-none"
                                            href="/account/contracts/{{ $value->id }}" target="_blank"
                                            class="Accept">View <i class="fa-regular fa-eye"></i></a>
                                    </div>
                                </div>
                            @endif
                        @endforeach
                    </div>
                @endif
            @endif
        </section>
        <!-- MAIN CONTAINER END -->
    </div>
    <!-- BODY WRAPPER END -->
    <div id="easyNotify"></div>
    <!-- also the modal itself -->
    <div id="myModalDefault" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog d-flex justify-content-center align-items-center">
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

    <!-- also the modal itself -->
    <div id="myModalXl" class="modal fade overflow-auto" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog d-flex justify-content-center align-items-center modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modelHeading">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">×</span></button>
                </div>
                <div class="modal-body bg-grey">
                    Loading...
                </div>

            </div>
        </div>
    </div>

    <x-right-modal />

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
        const pusher_setting = @json(pusher_settings());
        const SEARCH_KEYWORD = "{{ request('search_keyword') }}";

        const datepickerConfig = {
            formatter: (input, date, instance) => {
                input.value = moment(date).format('{{ global_setting()->moment_date_format }}')
            },
            showAllDates: true,
            customDays: ["@lang('app.weeks.Sun')", "@lang('app.weeks.Mon')", "@lang('app.weeks.Tue')",
                "@lang('app.weeks.Wed')", "@lang('app.weeks.Thu')", "@lang('app.weeks.Fri')",
                "@lang('app.weeks.Sat')"
            ],
            customMonths: ["@lang('app.months.January')", "@lang('app.months.February')",
                "@lang('app.months.March')", "@lang('app.months.April')", "@lang('app.months.May')",
                "@lang('app.months.June')", "@lang('app.months.July')", "@lang('app.months.August')",
                "@lang('app.months.September')", "@lang('app.months.October')",
                "@lang('app.months.November')", "@lang('app.months.December')"
            ],
            customOverlayMonths: ["@lang('app.monthsShort.Jan')", "@lang('app.monthsShort.Feb')",
                "@lang('app.monthsShort.Mar')", "@lang('app.monthsShort.Apr')",
                "@lang('app.monthsShort.May')", "@lang('app.monthsShort.Jun')",
                "@lang('app.monthsShort.Jul')", "@lang('app.monthsShort.Aug')",
                "@lang('app.monthsShort.Sep')", "@lang('app.monthsShort.Oct')",
                "@lang('app.monthsShort.Nov')", "@lang('app.monthsShort.Dec')"
            ],
            overlayButton: "@lang('app.submit')",
            overlayPlaceholder: "@lang('app.enterYear')",
            startDay: parseInt("{{ attendance_setting()->week_start_from }}")
        };

        const daterangeConfig = {
            "@lang('app.today')": [moment(), moment()],
            "@lang('app.last30Days')": [moment().subtract(29, 'days'), moment()],
            "@lang('app.thisMonth')": [moment().startOf('month'), moment().endOf(
                'month')],
            "@lang('app.lastMonth')": [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf(
                'month')],
            "@lang('app.last90Days')": [moment().subtract(89, 'days'), moment()],
            "@lang('app.last6Months')": [moment().subtract(6, 'months'), moment()],
            "@lang('app.last1Year')": [moment().subtract(1, 'years'), moment()]
        };

        const daterangeLocale = {
            "format": "{{ global_setting()->moment_date_format }}",
            "customRangeLabel": "@lang('app.customRange')",
            "separator": " @lang('app.to') ",
            "applyLabel": "@lang('app.apply')",
            "cancelLabel": "@lang('app.cancel')",
            "daysOfWeek": ['@lang('app.weeks.Sun')', '@lang('app.weeks.Mon')',
                '@lang('app.weeks.Tue')',
                '@lang('app.weeks.Wed')', '@lang('app.weeks.Thu')', '@lang('app.weeks.Fri')',
                '@lang('app.weeks.Sat')'
            ],
            "monthNames": ['@lang('app.months.January')', '@lang('app.months.February')',
                "@lang('app.months.March')", "@lang('app.months.April')",
                "@lang('app.months.May')",
                "@lang('app.months.June')", "@lang('app.months.July')",
                "@lang('app.months.August')",
                "@lang('app.months.September')", "@lang('app.months.October')",
                "@lang('app.months.November')", "@lang('app.months.December')"
            ],
            "firstDay": parseInt("{{ attendance_setting()->week_start_from }}")
        };

        const dropifyMessages = {
            default: "@lang('app.dragDrop')",
            replace: "@lang('app.dragDropReplace')",
            remove: "@lang('app.remove')",
            error: "@lang('messages.errorOccured')",
        };

        const DROPZONE_FILE_ALLOW = "{{ global_setting()->allowed_file_types }}";
        const DROPZONE_MAX_FILESIZE = "{{ global_setting()->allowed_file_size }}";
        Dropzone.prototype.defaultOptions.dictDefaultMessage = "{{ __('modules.projectTemplate.dropFile') }}";
    </script>

    <!-- Scripts -->
    <script>
        window.Laravel = {!! json_encode([
            'csrfToken' => csrf_token(),
            'user' => user(),
        ]) !!};
    </script>

    @stack('scripts')

    <script>
        $(window).on('load', function() {
            // setTimeout(removeLoader, 2000);
            init();
            $(".preloader-container").fadeOut("slow", function() {
                $(this).removeClass("d-flex");
            });
        });

        $('body').on('click', '.view-notification', function(event) {
            event.preventDefault();
            var id = $(this).data('notification-id');
            var href = $(this).attr('href');

            $.easyAjax({
                url: "{{ route('mark_single_notification_read') }}",
                type: "POST",
                data: {
                    '_token': "{{ csrf_token() }}",
                    'id': id
                },
                success: function() {
                    if (typeof href !== 'undefined') {
                        window.location = href;
                    }
                }
            });
        });

        $('body').on('click', '.img-lightbox', function() {
            var imageUrl = $(this).data('image-url');
            const url = "{{ route('invoices.show_image') . '?image_url=' }}" + encodeURIComponent(imageUrl);
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });

        function updateOnesignalPlayerId(userId) {
            $.easyAjax({
                url: '{{ route('profile.update_onesignal_id') }}',
                type: 'POST',
                data: {
                    'userId': userId,
                    '_token': '{{ csrf_token() }}'
                }
            })
        }

        if (SEARCH_KEYWORD != '' && $('#search-text-field').length > 0) {
            $('#search-text-field').val(SEARCH_KEYWORD);
            $('#reset-filters').removeClass('d-none');
        }

        $('body').on('click', '.show-hide-purchase-code', function() {
            $('> .icon', this).toggleClass('fa-eye-slash fa-eye');
            $(this).siblings('span').toggleClass('blur-code ');
        });
    </script>

    <script>
        let quillArray = {};

        function quillImageLoad(ID) {

            quillArray[ID] = new Quill(ID, {
                modules: {
                    toolbar: [
                        [{
                            header: [1, 2, 3, 4, 5, false]
                        }],
                        [{
                            'list': 'ordered'
                        }, {
                            'list': 'bullet'
                        }],
                        ['bold', 'italic', 'underline', 'strike'],
                        ['image', 'code-block', 'link'],
                        [{
                            'direction': 'rtl'
                        }],
                        ['clean']
                    ],
                    clipboard: {
                        matchVisual: false
                    },
                    "emoji-toolbar": true,
                    "emoji-textarea": true,
                    "emoji-shortname": true,
                },
                theme: 'snow'
            });
            $.each(quillArray, function(key, quill) {
                quill.getModule('toolbar').addHandler('image', selectLocalImage);
            });

        }
        /**
         * Step1. select local image
         *
         */
        function selectLocalImage() {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.click();

            // Listen upload local image and save to server
            input.onchange = () => {
                const file = input.files[0];

                // file type is only image.
                if (/^image\//.test(file.type)) {
                    saveToServer(file);
                } else {
                    console.warn('You could only upload images.');
                }
            };
        }

        /**
         * Step2. save to server
         *
         * @param {File} file
         */
        function saveToServer(file) {
            const fd = new FormData();
            fd.append('image', file);
            $.ajax({
                type: 'POST',
                url: "{{ route('image.store') }}",
                dataType: "json",
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                data: fd,
                contentType: false,
                processData: false,
                success: function(response) {
                    insertToEditor(response)
                },
            });
        }

        function insertToEditor(url) {
            // push image url to rich editor.
            $.each(quillArray, function(key, quill) {
                try {
                    let range = quill.getSelection();
                    quill.insertEmbed(range.index, 'image', url);
                } catch (err) {}
            });
        }
    </script>

    <script>
        $('body').on('click', '#pause-timer-btn', function() {
            var id = $(this).data('time-id');
            var url = "{{ route('timelogs.pause_timer', ':id') }}";
            url = url.replace(':id', id);
            var token = '{{ csrf_token() }}';
            $.easyAjax({
                url: url,
                blockUI: true,
                type: "POST",
                disableButton: true,
                buttonSelector: "#pause-timer-btn",
                data: {
                    timeId: id,
                    _token: token
                },
                success: function(response) {
                    if (response.status == 'success') {
                        if ($('#myActiveTimer').length > 0) {
                            $(MODAL_XL + ' .modal-content').html(response.html);

                            if ($('#allTasks-table').length) {
                                window.LaravelDataTables["allTasks-table"].draw();
                            }
                        } else {
                            window.location.reload();
                        }
                    }
                }
            })
        });

        $('body').on('click', '#resume-timer-btn', function() {
            var id = $(this).data('time-id');
            var url = "{{ route('timelogs.resume_timer', ':id') }}";
            url = url.replace(':id', id);
            var token = '{{ csrf_token() }}';
            $.easyAjax({
                url: url,
                blockUI: true,
                type: "POST",
                disableButton: true,
                buttonSelector: "#resume-timer-btn",
                data: {
                    timeId: id,
                    _token: token
                },
                success: function(response) {
                    if (response.status == 'success') {
                        if ($('#myActiveTimer').length > 0) {
                            $(MODAL_XL + ' .modal-content').html(response.html);
                        } else {
                            window.location.reload();
                        }
                    }
                }
            })
        });

        $('body').on('click', '.stop-active-timer', function() {
            var id = $(this).data('time-id');
            var url = "{{ route('timelogs.stop_timer', ':id') }}";
            url = url.replace(':id', id);
            var token = '{{ csrf_token() }}';
            $.easyAjax({
                url: url,
                type: "POST",
                data: {
                    timeId: id,
                    _token: token
                },
                success: function(response) {
                    if ($('#myActiveTimer').length > 0) {
                        $(MODAL_XL + ' .modal-content').html(response.html);
                        if (response.activeTimerCount > 0) {
                            $('#show-active-timer .active-timer-count').html(response.activeTimerCount);
                        } else {
                            window.location.reload();
                        }
                    } else {
                        window.location.reload();
                    }
                }
            })

        });
    </script>

    <script type="text/javascript" src="{{ asset('moving-countdown/script.js') }}"></script>
    <script type="text/javascript">
        @if (Auth::user()->role_id == 1 || (Auth::user()->role_id == 4 && !Request::is('account/contracts/*')))
            @if (isset($deal_id) && $deal_id != null)
                @foreach ($deal_id as $value)
                    @php
                        $currentDateTime = \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $value->award_time)->format('Y-m-d H:i:s');
                        $newDateTime = \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $currentDateTime)
                            ->addMinutes(1200)
                            ->format('Y-m-d H:i:s');
                        $minutes = \Carbon\Carbon::parse($newDateTime)->diffInMinutes(\Carbon\Carbon::now());
                        $seconds = \Carbon\Carbon::parse($newDateTime)->diffInSeconds(\Carbon\Carbon::now());
                    @endphp
                    @if ($minutes < 1200)
                        // let timeInMinutes_{{ $value->id }} = {{ $minutes }}; // set the time in minutes dynamically
                        // const deadline_{{ $value->id }} = timeInMinutes_{{ $value->id }} * 60; // convert minutes to seconds
                        const deadline_{{ $value->id }} = {{ $seconds }}; // convert minutes to seconds
                        let timerInterval_{{ $value->id }};
                        let timeRemaining_{{ $value->id }} = deadline_{{ $value->id }};
                        let timerElement_{{ $value->id }} = document.getElementById('timer_{{ $value->id }}');

                        // Initialize the timer
                        updateTimer_{{ $value->id }}();

                        // Start the countdown timer
                        timerInterval_{{ $value->id }} = setInterval(function() {
                            timeRemaining_{{ $value->id }}--;
                            updateTimer_{{ $value->id }}();

                            // If time has run out, stop the timer
                            if (timeRemaining_{{ $value->id }} <= 0) {
                                clearInterval(timerInterval_{{ $value->id }});
                            }
                        }, 1000);

                        function updateTimer_{{ $value->id }}() {
                            let hours = Math.floor(timeRemaining_{{ $value->id }} / 3600);
                            let minutes = Math.floor((timeRemaining_{{ $value->id }} % 3600) / 60);
                            let seconds = timeRemaining_{{ $value->id }} % 60;
                            timerElement_{{ $value->id }}.innerText =
                                `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                        }
                    @endif
                @endforeach
            @endif
        @endif
    </script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
    {!! Toastr::message() !!}

    <script src="{{ URL::asset('easy-notification/easyNotify.js') }}"></script>

    {{-- react script --}}

    <script src="{{ asset('js/manifest.js') }}"></script>
    <script src="{{ asset('js/vendor.js') }}"></script>
    <script src="{{ asset('js/react/app.js') }}"></script>

    {{-- react script --}}

    <script type="text/javascript">
        $(document).ready(function() {
            var channel = pusher.subscribe('lead-updated-channel');

            channel.bind('lead-updated', function(data) {
                // console.log(data.user_id, window.Laravel.user.id, data.role_id,window.Laravel.user.role_id);
                if (data.user_id == window.Laravel.user.id && data.role_id == window.Laravel.user.role_id) {
                    var options = {
                        title: data.title,
                        options: {
                            body: data.body,
                            icon: '{{ URL::asset('user-uploads/app-logo/c86157272a41bea229e0dcbe2ff9715b.png') }}',
                            lang: 'en-US',
                            onClick: function() {
                                window.location.href = data.redirectUrl;
                            }
                        }
                    };

                    $("#easyNotify").easyNotify(options);
                }
            }, channel.unbind());

            var notification = pusher.subscribe('notification-channel');

            notification.bind('notification', function(data) {
                if (data.user_id == window.Laravel.user.id && data.role_id == window.Laravel.user.role_id) {
                    var options = {
                        title: data.title,
                        options: {
                            body: data.body,
                            icon: '{{ URL::asset('user-uploads/app-logo/c86157272a41bea229e0dcbe2ff9715b.png') }}',
                            lang: 'en-US',
                            onClick: function() {
                                window.location.href = data.redirectUrl;
                            }
                        }
                    };

                    $("#easyNotify").easyNotify(options);
                }
            }, notification.unbind());
        })
    </script>
    <script src="{{ asset('vendor/jquery/daterangepicker.min.js') }}"></script>
    <script type="text/javascript">
        @php
            $startDate = \Carbon\Carbon::now()
                ->startOfMonth()
                ->subMonths(12)
                ->addDays(20);
            $today = \Carbon\Carbon::now()->format('d');
            if ($today > 20) {
                $endDate = \Carbon\Carbon::now()
                    ->startOfMonth()
                    ->addMonth(1)
                    ->addDays(19);
            } else {
                $endDate = \Carbon\Carbon::now()
                    ->startOfMonth()
                    ->addDays(19);
            }
        @endphp
        $(function() {
            var format = '{{ global_setting()->moment_format }}';
            var startDate = "{{ $startDate->format(global_setting()->date_format) }}";
            var endDate = "{{ $endDate->format(global_setting()->date_format) }}";
            var picker = $('#datatableRange_al');
            var start = moment(startDate, format);
            var end = moment(endDate, format);

            function cb(start, end) {
                $('#datatableRange_al').val(moment(start).subtract(1, 'year').format(
                        '{{ global_setting()->moment_date_format }}') +
                    ' @lang('app.to') ' + end.format('{{ global_setting()->moment_date_format }}'));
                $('#reset-filters').removeClass('d-none');
            }

            $('#datatableRange_al').daterangepicker({
                locale: daterangeLocale,
                linkedCalendars: false,
                startDate: start,
                endDate: end,
                ranges: daterangeConfig,
                opens: 'left',
                parentEl: '.dashboard-header',
            }, cb);
        });
    </script>
</body>

</html>
