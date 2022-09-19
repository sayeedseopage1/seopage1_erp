<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Font Awesome Icons -->
    <link rel="stylesheet" href="{{ asset('vendor/css/all.min.css') }}">

    <!-- Template CSS -->
    <link type="text/css" rel="stylesheet" media="all" href="{{ asset('css/main.css') }}">

    <title>@lang($pageTitle)</title>
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="{{ global_setting()->favicon_url }}">
    <meta name="theme-color" content="#ffffff">

    @isset($activeSettingMenu)
        <style>
            .preloader-container {
                margin-left: 510px;
                width: calc(100% - 510px)
            }
        </style>
    @endisset

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

    <script src="{{ asset('vendor/jquery/jquery.min.js') }}"></script>
    <script src="{{ asset('vendor/jquery/modernizr.min.js') }}"></script>
</head>


<body id="body">

    <!-- BODY WRAPPER START -->
    <div class="body-wrapper clearfix">

        <div class="row">
            <div class="col-sm-12">
                <x-form id="updateconsent">
                    <div class="add-client bg-white rounded">
                        <h4 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                            @lang($pageTitle)</h4>
                        <div class="col-lg-9 col-xl-10">
                            <div class="row">
                                @forelse($consents as $consent)
                                <div class="col-lg-12">
                                    <div class="form-group my-3">
                                        <h4>{{ $consent->name }}</h4>
                                        <label class="f-14 text-dark-grey mb-12 w-100" for="usr">{{ $consent->description }}</label>

                                        @if($consent->lead)
                                            <div class="d-flex">
                                                @if($consent->lead->status == 'agree')
                                                    <x-forms.radio fieldId="no{{$consent->id}}" :fieldLabel="__('modules.gdpr.disagree')" fieldValue="disagree"
                                                        fieldName="consent_customer[{{$consent->id}}]" checked="">
                                                    </x-forms.radio>
                                                @else
                                                    <x-forms.radio fieldId="yes{{$consent->id}}" :fieldLabel="__('modules.gdpr.agree')" fieldName="consent_customer[{{$consent->id}}]"
                                                        fieldValue="agree" checked="">
                                                    </x-forms.radio>
                                                @endif
                                            </div>
                                        @else
                                            <div class="d-flex">
                                                <x-forms.radio fieldId="yes{{$consent->id}}" :fieldLabel="__('modules.gdpr.agree')" fieldName="consent_customer[{{$consent->id}}]"
                                                    fieldValue="agree" checked="">
                                                </x-forms.radio>
                                                <x-forms.radio fieldId="no{{$consent->id}}" :fieldLabel="__('modules.gdpr.disagree')" fieldValue="disagree"
                                                    fieldName="consent_customer[{{$consent->id}}]" checked="">
                                                </x-forms.radio>
                                            </div>
                                        @endif

                                    </div>
                                </div>
                                @empty
                                    <p class="text-center">
                                        <strong>@lang('messages.noConsentFound')</strong>
                                        <x-cards.no-record icon="list" :message="__('messages.noConsentFound')" />
                                    </p>
                                @endforelse

                            </div>
                        </div>

                        <div class="w-100 border-top-grey d-flex justify-content-end px-4 py-3">
                            <x-forms.button-primary id="save-form" icon="check">@lang('app.save')
                            </x-forms.button-primary>
                        </div>
                    </div>
                </x-form>

            </div>
        </div>

    </div>
    <!-- BODY WRAPPER END -->

    <!-- Global Required Javascript -->
    <script src="{{ asset('js/main.js') }}"></script>

    <script>
         $(body).on('click', '#save-form', function() {
            $.easyAjax({
                url: "{{ route('front.gdpr.consent.update', [md5($lead->id)]) }}",
                container: '#updateconsent',
                type: "POST",
                disableButton: true,
                buttonSelector: "#save-form",
                data: $('#updateconsent').serialize(),
                success: function(response) {
                    if (response.status == "success") {
                        window.location.reload();
                    }
                }
            })
        })
    </script>

</body>

</html>

