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

    @stack('datatable-styles')

    <!-- Template CSS -->
    <link type="text/css" rel="stylesheet" media="all" href="{{ asset('css/main.css') }}">
    <link href="https://www.jqueryscript.net/css/jquerysctipttop.css" rel="stylesheet" type="text/css" />
       <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Condensed" type="text/css" />

       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
       integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
       crossorigin="anonymous" referrerpolicy="no-referrer"/>

       <link rel="stylesheet" href="{{asset('sticky/css/style.css')}}" type="text/css" />
       <link rel="stylesheet" href="https://cdn.bootcss.com/toastr.js/latest/css/toastr.min.css">


    <!-- designation hierarchy && department hierarchy -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" ></script>
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
                margin-left: 510px;
                width: calc(100% - 510px)
            }

            .blur-code {
                filter: blur(3px);

            }

            .purchase-code {
                transition: filter .2s ease-out;
                margin-right: 4px;
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

    @if ($pusherSettings->status && app()->environment('codecanyon'))
        <script src="https://js.pusher.com/7.0/pusher.min.js"></script>

        <script>
            // Enable pusher logging - don't include this in production
            // Pusher.logToConsole = true;

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


        <!-- MAIN CONTAINER START -->
        <section class="main-container bg-additional-grey" id="fullscreen">

            <div class="preloader-container d-flex justify-content-center align-items-center">
                <div class="spinner-border" role="status" aria-hidden="true"></div>
            </div>


            @yield('filter-section')

            <x-app-title class="d-block d-lg-none" :pageTitle="__($pageTitle)"></x-app-title>

            @yield('content')
            @if(Auth::user()->role_id == 4)
            <?php
            $deal_id= App\Models\Deal::where('status','pending')->orderBy('id','asc')->where('pm_id',Auth::id())->first();
            if ($deal_id != null) {
              $to = \Carbon\Carbon::createFromFormat('Y-m-d H:s:i', \Carbon\Carbon::now());

              $from = \Carbon\Carbon::createFromFormat('Y-m-d H:s:i', $deal_id->award_time);

              $diff_in_minutes = $from->diffInMinutes($to);
            }
             ?>
             @if($deal_id != null && $diff_in_minutes < 1200)
            <div id="mydiv">
        <div class="wrapper-timezone2" id="mydivheader">
            <p>New Deal Won: {{$deal_id->deal_id}}</p>
            <div class="clock2">
                <div class="column">
                    <div class="timer2" id="hours2"></div>
                </div>

                <div class="column">
                    <div class="timer2" id="minutes2"></div>
                </div>

                <div class="column">
                    <div class="timer2" id="seconds2"></div>
                </div>
            </div>

            <a href="/account/contracts/{{$deal_id->id}}" target="_blank" class="Accept">View <i class="fa-regular fa-eye"></i></a>
        </div>

    </div>
    @endif
    @endif
    @if(Auth::user()->role_id == 1)
    <?php
    $deal_id= App\Models\Deal::where('status','pending')->orderBy('id','asc')->first();
    if ($deal_id != null) {
      $to = \Carbon\Carbon::createFromFormat('Y-m-d H:s:i', \Carbon\Carbon::now());

      $from = \Carbon\Carbon::createFromFormat('Y-m-d H:s:i', $deal_id->award_time);

      $diff_in_minutes = $from->diffInMinutes($to);
    }
     ?>
     @if($deal_id != null)
    <div id="mydiv">
<div class="wrapper-timezone2" id="mydivheader">
    <p>New Deal Won: {{$deal_id->deal_id}}</p>
    <div class="clock2">
        <div class="column">
            <div class="timer2" id="hours2"></div>
        </div>

        <div class="column">
            <div class="timer2" id="minutes2"></div>
        </div>

        <div class="column">
            <div class="timer2" id="seconds2"></div>
        </div>
    </div>

    <a href="/account/contracts/{{$deal_id->id}}" target="_blank" class="Accept">View <i class="fa-regular fa-eye"></i></a>
</div>

</div>
@endif

    @endif


        </section>
        <!-- MAIN CONTAINER END -->
    </div>
    <!-- BODY WRAPPER END -->

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
            "@lang('app.thisMonth')": [moment().startOf('month'), moment().endOf('month')],
            "@lang('app.lastMonth')": [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month')
                .endOf(
                    'month')
            ],
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
            "daysOfWeek": ['@lang("app.weeks.Sun")', '@lang("app.weeks.Mon")',
                '@lang("app.weeks.Tue")',
                '@lang("app.weeks.Wed")', '@lang("app.weeks.Thu")', '@lang("app.weeks.Fri")',
                '@lang("app.weeks.Sat")'
            ],
            "monthNames": ['@lang("app.months.January")', '@lang("app.months.February")',
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
            // Animate loader off screen
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
            const url = "{{ route('invoices.show_image').'?image_url=' }}"+encodeURIComponent(imageUrl);
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




      @if(Auth::user()->role_id == 1 || Auth::user()->role_id == 4)
       @if($deal_id != null)
       <?php
       $currentDateTime = \Carbon\Carbon::createFromFormat('Y-m-d H:i:s',$deal_id->award_time)->format('Y-m-d H:i:s');

       $newDateTime = \Carbon\Carbon::createFromFormat('Y-m-d H:i:s',$currentDateTime)->addMinutes(1200)->format('Y-m-d H:i:s');
       //dd($newDateTime);
        ?>

       <input type="hidden" id="award_time2" value="{{$newDateTime}}">
        <input type="hidden" id="deal_id" value="{{$deal_id->id}}">
        <input type="hidden" id="left_time" value="{{$diff_in_minutes}}">

        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.13.0/moment.js"></script>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment-timezone/0.5.4/moment-timezone-with-data.js"></script>


        <script>
            $(function(){
                function timer(settings){
                    var award_time = $('#award_time2').val();

                    var config = {
                        endDate:  $('#award_time2').val(),
                        timeZone: 'Asia/Dhaka',
                        hours: $('#hours2'),
                        minutes: $('#minutes2'),
                        seconds: $('#seconds2'),
                        newSubMessage: 'and should be back online in a few minutes...'
                    };
                    function prependZero(number){
                        return number < 10 ? '0' + number : number;
                    }
                    $.extend(true, config, settings || {});
                    var currentTime = moment();
                    var endDate = moment.tz(config.endDate, config.timeZone);
                    var diffTime = endDate.valueOf() - currentTime.valueOf();
                    var duration = moment.duration(diffTime, 'milliseconds');
                    var days = duration.days();
                    var interval = 1000;
                    var subMessage = $('.sub-message');
                    var clock = $('.clock2');
                    var left_time = $('#left_time').val();
                    if(diffTime < 0){
                        endEvent(subMessage, config.newSubMessage, clock);
                      //to get current url

                      if (left_time < 1200) {

                             var deal_id = $('#deal_id').val();

            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });

                           $.ajax({
                               type:"POST",
                               cache:false,
                               url:"{{route('update-deal-id')}}",

                               data:{deal_id:deal_id},


                             success: function(data) {


                             }
                           });

                      }



                        return;
                    }
                    if(days > 0){
                        $('#days').text(prependZero(days));
                        $('.days').css('display', 'inline-block');
                    }
                    var intervalID = setInterval(function(){
                        duration = moment.duration(duration - interval, 'milliseconds');
                        var hours = duration.hours(),
                            minutes = duration.minutes(),
                            seconds = duration.seconds();
                        days = duration.days();
                        if(hours  <= 0 && minutes <= 0 && seconds  <= 0 && days <= 0){
                            clearInterval(intervalID);
                            endEvent(subMessage, config.newSubMessage, clock);
                            window.location.reload();
                        }
                        if(days === 0){
                            $('.days').hide();
                        }
                        $('#days').text(prependZero(days));
                        config.hours.text(prependZero(hours));
                        config.minutes.text(prependZero(minutes));
                        config.seconds.text(prependZero(seconds));
                    }, interval);
                }
                function endEvent($el, newText, hideEl){
                    $el.text(newText);
                    hideEl.hide();
                }
                timer();
            });

        </script>


         <!-- drag  -->

 <script>
    // Make the DIV element draggable:
    dragElement(document.getElementById("mydiv"));

    function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
    }
 </script>
 @endif
 @endif
 <script src="http://cdn.bootcss.com/toastr.js/latest/js/toastr.min.js"></script>
    {!! Toastr::message() !!}
</body>

</html>
