@extends('layouts.app')

@push('styles')

    <link rel="stylesheet" href="{{ asset('vendor/css/tagify.css') }}">

    <style>
        .tagify {
            width: 100%;
        }

        .tags-look .tagify__dropdown__item {
            display: inline-block;
            border-radius: 3px;
            padding: .3em .5em;
            border: 1px solid #CCC;
            background: #F3F3F3;
            margin: .2em;
            font-size: .85em;
            color: black;
            transition: 0s;
        }

        .tags-look .tagify__dropdown__item--active {
            color: white;
        }

        .tags-look .tagify__dropdown__item:hover {
            background: var(--header_color);
        }

        #datatable{
            margin-bottom: -20px;
        }

    </style>

    <style>
        /* Set the size of the div element that contains the map */
        #map {
            height: 400px;
            /* The height is 400 pixels */
            width: 100%;
            /* The width is the width of the web page */
        }

        #description {
            font-family: Roboto;
            font-size: 15px;
            font-weight: 300;
        }

        #infowindow-content .title {
            font-weight: bold;
        }

        #infowindow-content {
            display: none;
        }

        #map #infowindow-content {
            display: inline;
        }

        .pac-card {
            background-color: #fff;
            border: 0;
            border-radius: 2px;
            box-shadow: 0 1px 4px -1px rgba(0, 0, 0, 0.3);
            margin: 10px;
            padding: 0 0.5em;
            font: 400 18px Roboto, Arial, sans-serif;
            overflow: hidden;
            font-family: Roboto;
            padding: 0;
        }

        #pac-container {
            padding-bottom: 12px;
            margin-right: 12px;
        }

        .pac-controls {
            display: inline-block;
            padding: 5px 11px;
        }

        .pac-controls label {
            font-family: Roboto;
            font-size: 13px;
            font-weight: 300;
        }

        #pac-input {
            background-color: #fff;
            font-size: 15px;
            font-weight: 300;
            margin-left: 12px;
            padding: 0 11px 0 13px;
            text-overflow: ellipsis;
            width: 400px;
        }

        #pac-input:focus {
            border-color: #4d90fe;
        }

        #title {
            font-size: 18px;
            font-weight: 500;
            padding: 10px 12px;
        }

    </style>

@endpush

@section('content')

    <!-- SETTINGS START -->
    <div class="w-100 d-flex ">

        <x-setting-sidebar :activeMenu="$activeSettingMenu"/>

        <x-setting-card>
            <x-slot name="buttons">
                @include('app-settings.cron-message')
            </x-slot>

            <x-slot name="header">
                <div class="s-b-n-header" id="tabs">
                    <h2 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                        @lang($pageTitle)</h2>
                </div>
            </x-slot>

            <div class="col-lg-12 col-md-12 ntfcn-tab-content-left w-100 p-4 ">
                @method('PUT')
                <div class="row">

                    <div class="col-lg-3">
                        <x-forms.select fieldId="date_format" :fieldLabel="__('modules.accountSettings.dateFormat')"
                                        fieldName="date_format" search="true">
                            @foreach ($dateFormat as $format)
                                <option value="{{ $format }}"
                                        @if (global_setting()->date_format == $format) selected @endif>
                                    {{ $format }} ({{ $dateObject->format($format) }})
                                </option>
                            @endforeach
                        </x-forms.select>
                    </div>
                    <div class="col-lg-3">
                        <x-forms.select fieldId="time_format" :fieldLabel="__('modules.accountSettings.timeFormat')"
                                        fieldName="time_format" search="true">
                            <option value="h:i A" @if (global_setting()->time_format == 'h:i A') selected @endif>
                                12 Hour ({{ now(global_setting()->timezone)->format('h:i A') }})
                            </option>
                            <option value="h:i a" @if (global_setting()->time_format == 'h:i a') selected @endif>
                                12 Hour ({{ now(global_setting()->timezone)->format('h:i a') }})
                            </option>
                            <option value="H:i" @if (global_setting()->time_format == 'H:i') selected @endif>
                                24 Hour ({{ now(global_setting()->timezone)->format('H:i') }})
                            </option>
                        </x-forms.select>
                    </div>
                    <div class="col-lg-2">
                        <x-forms.select fieldId="timezone" :fieldLabel="__('modules.accountSettings.defaultTimezone')"
                                        fieldName="timezone" search="true">
                            @foreach ($timezones as $tz)
                                <option @if (global_setting()->timezone == $tz) selected @endif>{{ $tz }}
                                </option>
                            @endforeach
                        </x-forms.select>
                    </div>
                    <div class="col-lg-2">
                        <x-forms.select fieldId="currency_id"
                                        :fieldLabel="__('modules.accountSettings.defaultCurrency')"
                                        fieldName="currency_id" search="true">
                            @foreach ($currencies as $currency)
                                <option @if ($currency->id == global_setting()->currency_id)
                                        selected
                                        @endif value="{{ $currency->id }}">
                                    {{ $currency->currency_symbol . ' (' . $currency->currency_code . ')' }}
                                </option>
                            @endforeach
                        </x-forms.select>
                    </div>
                    <div class="col-lg-2">
                        <x-forms.select fieldId="locale" :fieldLabel="__('modules.accountSettings.language')"
                                        fieldName="locale" search="true">
                            @foreach ($languageSettings as $language)
                                <option {{ global_setting()->locale == $language->language_code ? 'selected' : '' }}
                                        data-content="<span class='flag-icon flag-icon-{{ ($language->flag_code == 'en') ? 'gb' : strtolower($language->flag_code) }} flag-icon-squared'></span> {{ $language->language_name }}"
                                        value="{{ $language->language_code }}">{{ $language->language_name }}</option>
                            @endforeach
                        </x-forms.select>
                    </div>
                    <div class="col-lg-3">
                        <x-forms.select fieldId="session_driver"
                                        :fieldLabel="__('modules.accountSettings.sessionDriver')"
                                        :popover="__('modules.accountSettings.sessionInfo')" fieldName="session_driver">
                            <option {{ global_setting()->session_driver == 'file' ? 'selected' : '' }} value="file">
                                @lang('modules.accountSettings.sessionFile')</option>
                            <option
                                {{ global_setting()->session_driver == 'database' ? 'selected' : '' }} value="database">
                                @lang('modules.accountSettings.sessionDatabase')</option>
                        </x-forms.select>
                        @if (global_setting()->session_driver == 'database')
                            <small><a id="delete-sessions" href="javascript:;"><i class="fa fa-trash"></i>
                                    @lang('modules.accountSettings.deleteSessions')</a></small>
                        @endif
                    </div>
                    <div class="col-lg-3 mt-lg-5">
                        <x-forms.checkbox :checked="global_setting()->app_debug"
                                          :fieldLabel="__('modules.accountSettings.appDebug')"
                                          fieldName="app_debug" :popover="__('modules.accountSettings.appDebugInfo')"
                                          fieldId="app_debug"/>
                    </div>
                    <div class="col-lg-3 mt-lg-5">
                        <x-forms.checkbox :checked="global_setting()->system_update"
                                          :fieldLabel="__('modules.accountSettings.updateEnableDisable')"
                                          fieldName="system_update"
                                          :popover="__('modules.accountSettings.updateEnableDisableTest')"
                                          fieldId="system_update"/>
                    </div>
                    <div class="col-lg-3 mt-lg-5">
                        @php
                            $cleanCache = '';
                        @endphp
                        @if ($cachedFile)
                            @php
                                $cleanCache = '<a id="clear-cache" href="javascript:;"><i class="fa fa-trash"></i>' . __('modules.accountSettings.clearCache') . '</a>';
                            @endphp

                        @endif
                        <x-forms.checkbox :checked="$cachedFile" :fieldLabel="__('app.enableCache')" fieldName="cache"
                                          fieldId="cache" :fieldHelp="$cleanCache"/>
                    </div>
                </div>
                <div class="row">

                    <div class="col-sm-12 mt-lg-5">
                        <h4 class="f-16 font-weight-500 text-capitalize">
                            @lang('modules.accountSettings.fileUploadSetting')</h4>
                    </div>

                    <div class="col-lg-3">

                        <label for="allowed_file_size" class="mt-3">
                            @lang('modules.accountSettings.allowedFileSize') <sup class="f-14">*</sup>
                        </label>

                        <x-forms.input-group>
                            <input type="number" name="allowed_file_size" id="allowed_file_size"
                                   value="{{ global_setting()->allowed_file_size }}"
                                   placeholder="@lang('modules.emailSettings.mailPassword')"
                                   class="form-control height-35 f-14"/>
                            <x-slot name="preappend">
                                <label class="input-group-text border-grey bg-white height-35">MB</label>
                            </x-slot>
                        </x-forms.input-group>

                    </div>

                    <div class="col-lg-12 mt-4">
                        <label for="allowed_file_types">
                            @lang('modules.accountSettings.allowedFileType') <sup class="f-14">*</sup>
                        </label>
                        <textarea type="text" name="allowed_file_types" id="allowed_file_types"
                                  placeholder="e.g. application/x-zip-compressed"
                                  class="form-control f-14">{{ global_setting()->allowed_file_types }}</textarea>
                    </div>

                    <div class="col-sm-12 mt-lg-5 mb-4">
                        <h4 class="f-16 font-weight-500 text-capitalize">
                            @lang('app.client') @lang('app.signUp') @lang('app.settings')</h4>
                    </div>

                    <div class="col-lg-3">
                        <x-forms.checkbox :checked="global_setting()->allow_client_signup"
                                          :fieldLabel="__('modules.accountSettings.allowClientSignup')"
                                          fieldName="allow_client_signup"
                                          fieldId="allow_client_signup"/>
                    </div>
                    <div class="col-lg-5 {{ !global_setting()->allow_client_signup ? 'd-none' : '' }}"
                         id="admin-approval">
                        <x-forms.checkbox :checked="global_setting()->admin_client_signup_approval"
                                          :fieldLabel="__('modules.accountSettings.needClientSignupApproval')"
                                          fieldName="admin_client_signup_approval"
                                          fieldId="admin_client_signup_approval"/>
                    </div>

                </div>
                <div class="row  mt-4">
                    <div class="col-lg-6">
                        <x-forms.text :fieldLabel="__('modules.accountSettings.google_map_key')"
                                      fieldPlaceholder="e.g. AIzaSyDSl2bG7XXXXXXXXXXXXXXXXXX"
                                      fieldName="google_map_key" fieldId="google_map_key"
                                      :fieldValue="global_setting()->google_map_key"/>
                    </div>

                    <div class="col-lg-3">
                        <x-forms.text :fieldLabel="__('modules.accountSettings.latitude')"
                                      fieldPlaceholder="e.g. 38.895"
                                      fieldName="latitude" fieldId="latitude" :fieldValue="global_setting()->latitude"/>
                    </div>

                    <div class="col-lg-3">
                        <x-forms.text :fieldLabel="__('modules.accountSettings.longitude')"
                                      fieldPlaceholder="e.g. -77.0364"
                                      fieldName="longitude" fieldId="longitude"
                                      :fieldValue="global_setting()->longitude"/>
                    </div>

                    <div class="col-lg-12 mt-4">
                        <h4 class="f-16 font-weight-500 text-capitalize">
                            @lang('modules.accountSettings.businessMapLocation')</h4>

                        <div class="pac-card" id="pac-card">
                            <div>
                                <div id="title">@lang('modules.accountSettings.autocompleteSearch')</div>
                                <div id="type-selector" class="pac-controls d-none">
                                    <input type="radio" name="type" id="changetype-all" checked="checked"/>
                                    <label for="changetype-all">All</label>

                                    <input type="radio" name="type" id="changetype-establishment"/>
                                    <label for="changetype-establishment">establishment</label>

                                    <input type="radio" name="type" id="changetype-address"/>
                                    <label for="changetype-address">address</label>

                                    <input type="radio" name="type" id="changetype-geocode"/>
                                    <label for="changetype-geocode">geocode</label>

                                    <input type="radio" name="type" id="changetype-cities"/>
                                    <label for="changetype-cities">(cities)</label>

                                    <input type="radio" name="type" id="changetype-regions"/>
                                    <label for="changetype-regions">(regions)</label>
                                </div>
                                <br/>
                                <div id="strict-bounds-selector" class="pac-controls d-none">
                                    <input type="checkbox" id="use-location-bias" value="" checked/>
                                    <label for="use-location-bias">Bias to map viewport</label>

                                    <input type="checkbox" id="use-strict-bounds" value=""/>
                                    <label for="use-strict-bounds">Strict bounds</label>
                                </div>
                            </div>
                            <div id="pac-container">
                                <input id="pac-input" type="text" placeholder="@lang('placeholders.location')"/>
                            </div>
                        </div>

                        <div id="infowindow-content">
                            <span id="place-name" class="title"></span><br/>
                            <span id="place-address"></span>
                        </div>

                        <div id="map" class="border rounded"></div>

                    </div>
                </div>
            </div>

            <x-slot name="action">
                <!-- Buttons Start -->
                <div class="w-100 border-top-grey">
                    <x-setting-form-actions>
                        <x-forms.button-primary id="save-form" class="mr-3" icon="check">@lang('app.save')
                        </x-forms.button-primary>

                        <x-forms.button-cancel :link="url()->previous()" class="border-0">@lang('app.cancel')
                        </x-forms.button-cancel>

                    </x-setting-form-actions>
                    <div class="d-flex d-lg-none d-md-none p-4">
                        <div class="d-flex w-100">
                            <x-forms.button-primary class="mr-3 w-100" icon="check">@lang('app.save')
                            </x-forms.button-primary>
                        </div>
                        <x-forms.button-cancel :link="url()->previous()" class="w-100">@lang('app.cancel')
                        </x-forms.button-cancel>
                    </div>
                </div>
                <!-- Buttons End -->
            </x-slot>

        </x-setting-card>

    </div>
    <!-- SETTINGS END -->
@endsection

@push('scripts')
    <script src="{{ asset('vendor/jquery/tagify.min.js') }}"></script>

    <script>
        var input = document.querySelector('textarea[id=allowed_file_types]');

        var whitelist = [
            'image/*', 'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/docx',
            'application/pdf', 'text/plain', 'application/msword',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/zip',
            'application/x-zip-compressed', 'application/x-compressed', 'multipart/x-zip', '.xlsx', 'video/x-flv',
            'video/mp4', 'application/x-mpegURL', 'video/MP2T', 'video/3gpp', 'video/quicktime', 'video/x-msvideo',
            'video/x-ms-wmv', 'application/sla', '.stl'
        ];

        // init Tagify script on the above inputs
        tagify = new Tagify(input, {
            whitelist: whitelist,
            userInput: false,
            dropdown: {
                classname: "tags-look",
                enabled: 0,
                closeOnSelect: false
            }
        });

        $('#allow_client_signup').change(function () {
            $('#admin-approval').toggleClass('d-none');
        });

        $('#save-form').click(function () {
            const url = "{{ route('app-settings.update', ['1']) }}";

            $.easyAjax({
                url: url,
                container: '#editSettings',
                type: "POST",
                disableButton: true,
                buttonSelector: "#save-form",
                data: $('#editSettings').serialize(),
                success: function () {
                    window.location.reload();
                }
            })
        });

        $('#clear-cache').click(function () {
            const url = "{{ url('clear-cache') }}";
            $.easyAjax({
                url: url,
                type: "GET",
                success: function () {
                    window.location.reload();
                }
            })
        });

        $('body').on('click', '#delete-sessions', function () {
            var id = $(this).data('invoice-id');
            Swal.fire({
                title: "@lang('messages.sweetAlertTitle')",
                text: "@lang('messages.sessionDeleteConfirmation')",
                icon: 'warning',
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: "@lang('app.delete')",
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

                    var url = "{{ route('app-settings.delete_sessions') }}";

                    var token = "{{ csrf_token() }}";

                    $.easyAjax({
                        url: url,
                        type: "POST",
                        container: '#editSettings',
                        data: {
                            _token: token
                        },
                        success: function () {
                            window.location.reload();
                        }
                    });
                }
            });
        });
    </script>

    <script
        src="https://maps.googleapis.com/maps/api/js?key={{ global_setting()->google_map_key }}&callback=initMap&libraries=places&v=weekly"
        async>
    </script>

    <script>
        const myLatLng = {
            lat: parseFloat(global_setting.latitude),
            lng: parseFloat(global_setting.longitude)
        };

        function initMap() {
            const map = new google.maps.Map(document.getElementById("map"), {
                center: myLatLng,
                zoom: 17,
                mapTypeControl: false
            });

            const card = document.getElementById("pac-card");
            const pacinput = document.getElementById("pac-input");
            pacinput.classList.add("form-control", "height-35", "f-14");

            const biasInputElement = document.getElementById("use-location-bias");
            const strictBoundsInputElement = document.getElementById("use-strict-bounds");
            const options = {
                fields: ["formatted_address", "geometry", "name"],
                strictBounds: false,
                types: ["establishment"],
            };

            map.controls[google.maps.ControlPosition.TOP_LEFT].push(card);

            const autocomplete = new google.maps.places.Autocomplete(pacinput, options);

            // Bind the map's bounds (viewport) property to the autocomplete object,
            // so that the autocomplete requests use the current map bounds for the
            // bounds option in the request.
            autocomplete.bindTo("bounds", map);

            const infowindow = new google.maps.InfoWindow();
            const infowindowContent = document.getElementById("infowindow-content");

            infowindow.setContent(infowindowContent);

            const marker = new google.maps.Marker({
                map,
                anchorPoint: new google.maps.Point(0, -29),
                position: myLatLng,
                Draggable: true,
                Title: global_setting.company_name
            });

            marker.addListener('drag', handleEvent);
            marker.addListener('dragend', handleEvent);

            autocomplete.addListener("place_changed", () => {
                infowindow.close();
                marker.setVisible(false);

                const place = autocomplete.getPlace();

                if (!place.geometry || !place.geometry.location) {
                    // User entered the name of a Place that was not suggested and
                    // pressed the Enter key, or the Place Details request failed.
                    window.alert("No details available for input: '" + place.name + "'");
                    return;
                }

                // If the place has a geometry, then present it on a map.
                if (place.geometry.viewport) {
                    map.fitBounds(place.geometry.viewport);
                } else {
                    map.setCenter(place.geometry.location);
                    map.setZoom(17);
                }

                $('#latitude').val(place.geometry.location.lat());
                $('#longitude').val(place.geometry.location.lng());

                marker.setPosition(place.geometry.location);
                marker.setVisible(true);
                infowindowContent.children["place-name"].textContent = place.name;
                infowindowContent.children["place-address"].textContent =
                    place.formatted_address;
                infowindow.open(map, marker);
            });

            // Sets a listener on a radio button to change the filter type on Places
            // Autocomplete.
            function setupClickListener(id, types) {
                const radioButton = document.getElementById(id);

                radioButton.addEventListener("click", () => {
                    autocomplete.setTypes(types);
                    input.value = "";
                });
            }

            function handleEvent(event) {
                document.getElementById('latitude').value = event.latLng.lat();
                document.getElementById('longitude').value = event.latLng.lng();
            }

            setupClickListener("changetype-all", []);
            setupClickListener("changetype-address", ["address"]);
            setupClickListener("changetype-establishment", ["establishment"]);
            setupClickListener("changetype-geocode", ["geocode"]);
            setupClickListener("changetype-cities", ["(cities)"]);
            setupClickListener("changetype-regions", ["(regions)"]);
            biasInputElement.addEventListener("change", () => {
                if (biasInputElement.checked) {
                    autocomplete.bindTo("bounds", map);
                } else {
                    // User wants to turn off location bias, so three things need to happen:
                    // 1. Unbind from map
                    // 2. Reset the bounds to whole world
                    // 3. Uncheck the strict bounds checkbox UI (which also disables strict bounds)
                    autocomplete.unbind("bounds");
                    autocomplete.setBounds({
                        east: 180,
                        west: -180,
                        north: 90,
                        south: -90
                    });
                    strictBoundsInputElement.checked = biasInputElement.checked;
                }

                input.value = "";
            });
            strictBoundsInputElement.addEventListener("change", () => {
                autocomplete.setOptions({
                    strictBounds: strictBoundsInputElement.checked,
                });
                if (strictBoundsInputElement.checked) {
                    biasInputElement.checked = strictBoundsInputElement.checked;
                    autocomplete.bindTo("bounds", map);
                }

                input.value = "";
            });
        }
    </script>
@endpush
