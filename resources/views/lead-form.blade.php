<!DOCTYPE html>

<html lang="en">

    <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta field_name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <!-- Font Awesome Icons -->
        <link rel="stylesheet" href="{{ asset('vendor/css/all.min.css') }}">

        <!-- Template CSS -->
        <link type="text/css" rel="stylesheet" media="all" href="{{ asset('css/main.css') }}">

        <!-- DatePicker CSS -->
        <link rel="stylesheet" href="{{ asset('vendor/css/datepicker.min.css') }}">


        <title>@lang($pageTitle)</title>
        <meta field_name="msapplication-TileColor" content="#ffffff">
        <meta field_name="msapplication-TileImage" content="{{ global_setting()->favicon_url }}">
        <meta field_name="theme-color" content="#ffffff">

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
            .fc a[data-navlink] {
                color: #99a5b5;
            }
        </style>

    </head>

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->


    <body><!-- change dark theme class according to application dark theme setting -->
        <div class="row">
            <div class="col-md-12">
                <div class="white-box p-t-20">
                    <x-form id="createLead" method="POST">
                        <div class="form-body">
                            <div class="row">
                                @foreach ($leadFormFields as $item)
                                    @if ($item->custom_fields_id === null)
                                        @if ($item->field_name == 'country')
                                            <div class="col-md-6">
                                                <x-forms.select fieldId="country" :fieldLabel="__('modules.leads.'.$item->field_name)" :fieldName="$item->field_name" :fieldRequired="$item->required == 1"
                                                    search="true">
                                                    <option value="">--</option>
                                                    @foreach ($countries as $item)
                                                        <option data-tokens="{{ $item->iso3 }}"
                                                            data-content="<span class='flag-icon flag-icon-{{ strtolower($item->iso) }} flag-icon-squared'></span> {{ $item->nicename }}"
                                                            value="{{ $item->nicename }}">{{ $item->nicename }}</option>
                                                    @endforeach
                                                </x-forms.select>
                                            </div>
                                        @else
                                            <div class="col-md-6">
                                                <x-forms.text
                                                :fieldId="$item->field_name"
                                                :fieldLabel="__('modules.leads.'.$item->field_name)"
                                                :fieldName="$item->field_name"
                                                :fieldRequired="$item->required == 1">
                                                </x-forms.text>
                                            </div>
                                        @endif
                                    @else
                                        @if($item->customField->type == 'text')
                                            <div class="col-md-6">
                                                <x-forms.text
                                                fieldId="custom_fields_data[{{ $item->field_name . '_' . $item->customField->id }}]"
                                                :fieldLabel="mb_ucwords($item->field_display_name)"
                                                fieldName="custom_fields_data[{{ $item->field_name . '_' . $item->customField->id }}]"
                                                :fieldRequired="($item->required === 1) ? true : false">
                                                </x-forms.text>
                                            </div>
                                        @elseif($item->customField->type == 'password')
                                            <div class="col-md-6">
                                                <x-forms.password
                                                fieldId="custom_fields_data[{{ $item->field_name . '_' . $item->customField->id }}]"
                                                :fieldLabel="mb_ucwords($item->field_display_name)"
                                                fieldName="custom_fields_data[{{ $item->field_name . '_' . $item->customField->id }}]"
                                                :fieldPlaceholder="$item->label"
                                                :fieldRequired="($item->required === 1) ? true : false">
                                                </x-forms.password>
                                            </div>
                                        @elseif($item->customField->type == 'number')
                                            <div class="col-md-6">
                                                <x-forms.number
                                                fieldId="custom_fields_data[{{ $item->field_name . '_' . $item->customField->id }}]"
                                                :fieldLabel="mb_ucwords($item->field_display_name)"
                                                fieldName="custom_fields_data[{{ $item->field_name . '_' . $item->customField->id }}]"
                                                :fieldRequired="($item->required === 1) ? true : false">
                                                </x-forms.number>
                                            </div>
                                        @elseif($item->customField->type == 'textarea')
                                            <div class="col-md-6">
                                                <x-forms.textarea
                                                :fieldLabel="mb_ucwords($item->field_display_name)"
                                                fieldName="custom_fields_data[{{ $item->field_name . '_' . $item->customField->id }}]"
                                                fieldId="custom_fields_data[{{ $item->field_name . '_' . $item->customField->id }}]"
                                                :fieldRequired="($item->required === 1) ? true : false">
                                                </x-forms.textarea>
                                            </div>
                                        @elseif($item->customField->type == 'radio')
                                            <div class="col-md-6">
                                                <div class="form-group my-3">
                                                    <x-forms.label
                                                    fieldId="custom_fields_data[{{ $item->field_name . '_' . $item->customField->id }}]"
                                                    :fieldLabel="mb_ucwords($item->field_display_name)"
                                                    :fieldRequired="($item->required === 1) ? true : false">
                                                    </x-forms.label>
                                                    <div class="d-flex">
                                                        @foreach (json_decode($item->customField->values) as $key => $value)
                                                            <x-forms.radio fieldId="optionsRadios{{ $key . $item->customField->id }}"
                                                            :fieldLabel="$value"
                                                            fieldName="custom_fields_data[{{ $item->field_name . '_' . $item->customField->id }}]"
                                                            :fieldValue="$value" :checked="($key == 0) ? true : false" />
                                                        @endforeach
                                                    </div>
                                                </div>
                                            </div>
                                        @elseif($item->customField->type == 'select')
                                            <div class="col-md-6">
                                                <div class="form-group my-3">
                                                    <x-forms.select
                                                    fieldId="custom_fields_data[{{ $item->field_name . '_' . $item->customField->id }}]"
                                                    :fieldLabel="mb_ucwords($item->field_display_name)"
                                                    fieldName="custom_fields_data[{{ $item->field_name . '_' . $item->customField->id }}]"
                                                    :fieldRequired="($item->required === 1) ? true : false"
                                                    search="true">
                                                        <option value="">--</option>
                                                        @foreach(json_decode($item->customField->values) as $item)
                                                            <option value="{{ $item }}">{{ $item }}</option>
                                                        @endforeach
                                                    </x-forms.select>
                                                </div>
                                            </div>
                                        @elseif($item->customField->type == 'date')
                                            <div class="col-md-6">
                                                <x-forms.datepicker custom="true"
                                                fieldId="custom_fields_data[{{ $item->field_name . '_' . $item->customField->id }}]"
                                                :fieldRequired="($item->required === 1) ? true : false"
                                                :fieldLabel="mb_ucwords($item->field_display_name)"
                                                fieldName="custom_fields_data[{{ $item->field_name . '_' . $item->customField->id }}]"
                                                :fieldValue="now()->timezone(global_setting()->timezone)->format(global_setting()->date_format)"
                                                :fieldPlaceholder="$item->label" />
                                            </div>
                                        @elseif($item->customField->type == 'checkbox')
                                            <div class="col-md-6">
                                                <div class="form-group my-3">
                                                    <x-forms.label
                                                    fieldId="custom_fields_data[{{ $item->field_name . '_' . $item->customField->id }}]"
                                                    :fieldLabel="mb_ucwords($item->field_display_name)"
                                                    :fieldRequired="($item->required === 1) ? true : false">
                                                    </x-forms.label>
                                                    <div class="d-flex checkbox-{{$item->customField->id}}">
                                                        <input type="hidden" field_name="custom_fields_data[{{$item->field_name.'_'.$item->customField->id}}]" id="{{$item->field_name.'_'.$item->customField->id}}">
                                                        @foreach (json_decode($item->customField->values) as $key => $value)
                                                            <x-forms.checkbox fieldId="optionsRadios{{ $key . $item->customField->id }}"
                                                            :fieldLabel="$value"
                                                            fieldName="$item->field_name.'_'.$item->customField->id.'[]'"
                                                            :fieldValue="$value"
                                                            onchange="checkboxChange('checkbox-{{$item->customField->id}}', '{{$item->field_name.'_'.$item->customField->id}}')"
                                                            :fieldRequired="($item->required === 1) ? true : false" />
                                                        @endforeach
                                                    </div>
                                                </div>
                                            </div>
                                        @endif
                                    @endif
                                @endforeach

                                @if(global_setting()->google_recaptcha_status == 'active' && global_setting()->google_recaptcha_v2_status == 'active' && global_setting()->ticket_form_google_captcha == 1)
                                    <div class="col-md-12 col-lg-12 mt-2 mb-2" id="captcha_container"></div>
                                @endif

                                {{-- This is used for google captcha v3 --}}
                                <input type="hidden" id="g_recaptcha" field_name="g_recaptcha">

                                @if ($errors->has('g-recaptcha-response'))
                                    <div class="help-block with-errors">{{ $errors->first('g-recaptcha-response') }}</div>
                                @endif

                            </div>
                        </div>
                        <div class="form-actions">
                            <button type="submit" id="save-form" class="btn btn-primary"> <i class="fa fa-check"></i> @lang('app.save')</button>
                            <button type="reset" class="btn btn-secondary ml-3">@lang('app.reset')</button>
                        </div>
                    </x-form>

                    <div class="row">
                        <div class="col-sm-12 col-md-12">
                            <div class="alert alert-success" id="success-message" style="display:none"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>


    <!-- jQuery -->
    <script src="{{ asset('vendor/jquery/jquery.min.js') }}"></script>

    <!-- Global Required Javascript -->
    <script src="{{ asset('vendor/bootstrap/javascript/bootstrap-native.js') }}"></script>

    <!-- Font Awesome -->
    <script src="{{ asset('vendor/jquery/all.min.js') }}"></script>

    <!-- Template JS -->
    <script src="{{ asset('js/main.js') }}"></script>
    <script src="{{ asset('vendor/froiden-helper/helper.js') }}"></script>

    <script>
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
    </script>
    <script>

        if ($('.custom-date-picker').length > 0) {
            datepicker('.custom-date-picker', {
                position: 'bl',
                ...datepickerConfig
            });
        }

        $(".select-picker").selectpicker();

        $('#save-form').click(function () {
            $.easyAjax({
                url: "{{route('front.lead_store')}}",
                container: '#createLead',
                type: "POST",
                redirect: true,
                disableButton: true,
                blockUI: true,
                data: $('#createLead').serialize(),
                success: function (response) {
                    if (response.status == "success") {
                        $('#createLead')[0].reset();
                        $('#createLead').hide();
                        $('#success-message').html(response.message);
                        $('#success-message').show();
                    }
                }
            })
        });
    </script>

    @if(global_setting()->google_recaptcha_status == 'active' && global_setting()->google_recaptcha_v2_status == 'active')
        <script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit"
                async defer></script>
        <script>
            var gcv3;
            var onloadCallback = function () {
                // Renders the HTML element with id 'captcha_container' as a reCAPTCHA widget.
                // The id of the reCAPTCHA widget is assigned to 'gcv3'.
                gcv3 = grecaptcha.render('captcha_container', {
                    'sitekey': '{{global_setting()->google_recaptcha_v2_site_key}}',
                    'theme': 'light',
                    'callback': function (response) {
                        if (response) {
                            $('#g_recaptcha').val(response);
                        }
                    },
                });
            };
        </script>
    @endif

    @if(global_setting()->google_recaptcha_status == 'active' && global_setting()->google_recaptcha_v3_status == 'active')
        <script
            src="https://www.google.com/recaptcha/api.js?render={{global_setting()->google_recaptcha_v3_site_key}}"></script>
        <script>
            grecaptcha.ready(function () {
                grecaptcha.execute('{{global_setting()->google_recaptcha_v3_site_key}}').then(function (token) {
                    // Add your logic to submit to your backend server here.
                    $('#g_recaptcha').val(token);
                });
            });
        </script>
    @endif

</html>
