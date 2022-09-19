<!-- SETTINGS START -->
<div class="w-100 d-flex ">
    <div class="col-lg-12 col-md-12 ntfcn-tab-content-left w-100 p-4 ">
        @include('sections.password-autocomplete-hide')
        <div class="row">
            <div class="col-lg-12 mb-2">
                <x-forms.checkbox :fieldLabel="__('modules.accountSettings.googleRecaptcha')" fieldName="google_recaptcha_status" fieldId="google_recaptcha_status" fieldValue="active" fieldRequired="true" :checked="global_setting()->google_recaptcha_status == 'active'" />
            </div>
            <div class="col-lg-12 google_recaptcha_details @if(global_setting()->google_recaptcha_status !== 'active') d-none @endif">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="form-group my-3">
                            <label class="f-14 text-dark-grey mb-12 w-100"
                                for="usr">Recaptcha Version</label>
                            <div class="d-flex">
                                <x-forms.radio fieldId="send_reminder_admin" fieldLabel="V2"
                                    fieldName="version" fieldValue="v2" :checked="global_setting()->google_recaptcha_v2_status == 'active'">
                                </x-forms.radio>
                                <x-forms.radio fieldId="send_reminder_member" fieldLabel="V3"
                                    fieldName="version" fieldValue="v3" :checked="global_setting()->google_recaptcha_v3_status == 'active'">
                                </x-forms.radio>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-12 @if(global_setting()->google_recaptcha_v2_status === 'deactive') d-none @endif" id="v2" >
                        <div class="row">
                            <div class="col-lg-5">
                                <x-forms.text class="mr-0 mr-lg-2 mr-md-2"
                                    fieldLabel="Google Recaptcha V2 Key"
                                    fieldPlaceholder="e.g. 6LeL_s8ZAAAAAMVC2clQdxxxXXXxxxxxXXX" fieldName="google_recaptcha_v2_site_key"
                                    fieldId="google_recaptcha_v2_site_key" :fieldValue="global_setting()->google_recaptcha_v2_site_key" fieldRequired="true" />
                            </div>
                            <div class="col-lg-5">
                                <x-forms.label class="mt-3" fieldId="google_recaptcha_secret"
                                    fieldLabel="Google Recaptcha V2 Secret" fieldRequired="true">
                                </x-forms.label>
                                <x-forms.input-group>


                                    <input type="password" value="{{ global_setting()->google_recaptcha_v2_secret_key }}"
                                        placeholder="e.g. XXXXXXxxxxxXXXXXXxxxxx" name="google_recaptcha_v2_secret_key"
                                        id="google_recaptcha_v2_secret_key" class="form-control height-35 f-14">
                                    <x-slot name="append">
                                        <button type="button" data-toggle="tooltip"
                                            data-original-title="@lang('app.viewPassword')"
                                            class="btn btn-outline-secondary border-grey height-35 toggle-password"><i class="fa fa-eye"></i></button>
                                    </x-slot>
                                </x-forms.input-group>

                            </div>
                            <div class="col-lg-2">
                                <x-forms.button-primary class="mr-3 mt-5" id="verify-v2" icon="check">Verify
                                </x-forms.button-primary>
                            </div>
                            <div class="col-lg-12" id="captcha_container"></div>
                        </div>
                    </div>
                    <div class="col-lg-12 @if(global_setting()->google_recaptcha_v3_status === 'deactive') d-none @endif" id="v3">
                        <div class="row">
                            <div class="col-lg-5">
                                <x-forms.text class="mr-0 mr-lg-2 mr-md-2"
                                    fieldLabel="Google Recaptcha V3 Key"
                                    fieldPlaceholder="e.g. 6LeL_s8ZAAAAAMVC2clQdxxxXXXxxxxxXXX" fieldName="google_recaptcha_v3_site_key"
                                    fieldId="google_recaptcha_v3_site_key" :fieldValue="global_setting()->google_recaptcha_v3_site_key" fieldRequired="true" />
                            </div>
                            <div class="col-lg-5">
                                <x-forms.label class="mt-3" fieldId="google_recaptcha_secret"
                                    fieldLabel="Google Recaptcha V3 Secret" fieldRequired="true">
                                </x-forms.label>
                                <x-forms.input-group>
                                    <input type="password" value="{{ global_setting()->google_recaptcha_v3_secret_key }}"
                                        placeholder="e.g. XXXXXXxxxxxXXXXXXxxxxx" name="google_recaptcha_v3_secret_key"
                                        id="google_recaptcha_v3_secret_key" class="form-control height-35 f-14">
                                    <x-slot name="append">
                                        <button type="button" data-toggle="tooltip"
                                            data-original-title="@lang('app.viewPassword')"
                                            class="btn btn-outline-secondary border-grey height-35 toggle-password"><i class="fa fa-eye"></i></button>
                                    </x-slot>
                                </x-forms.input-group>
                            </div>
                            <div class="col-lg-2">
                                <x-forms.button-primary class="mr-3 mt-5" icon="check" id="verify-v3">@lang('app.verify')
                                </x-forms.button-primary>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <a href="https://www.google.com/recaptcha/admin/create" class="text-lightest f-12" target="_blank"><u>@lang('modules.accountSettings.generateCredentials') <i class="fa fa-external-link-alt"></i></u></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- SETTINGS END -->

<script src='https://www.google.com/recaptcha/api.js'></script>

<script>

    $(document).on('click', '#verify-v2', function() {

        let captchaContainerV2 = null;
        let key = $('#google_recaptcha_v2_site_key').val();
        let secret = $('#google_recaptcha_v2_secret_key').val();

        if(key === '' || secret ==='') {
            return Swal.fire({ icon: 'warning', text: 'Error..! Recaptcha key and secret are required.', })
        }

        try {
            captchaContainer = grecaptcha.render('captcha_container', {
                'sitekey' : key,
                'callback' : function(response) {
                    if(response) {
                        saveForm();
                    }
                },
                'error-callback': function() {
                    errorMsg();
                }
            });
        } catch (error) {
            errorMsg();
        }
    });

    $(document).on('click', '#verify-v3', function() {

        let key = $('#google_recaptcha_v3_site_key').val();
        let secret = $('#google_recaptcha_v3_secret_key').val();
        var url = "{{ route('verify_google_recaptcha_v3')}}?key="+key;

        if(key === '' || secret ==='') {
            return Swal.fire({ icon: 'warning', text: 'Error..! Recaptcha key and secret are required.', })
        }

        var url = url;
        $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
        $.ajaxModal(MODAL_LG, url);

    });

    // Show/hide project detail
    $(document).on('change', '#google_recaptcha_status', function() {
        $('.google_recaptcha_details').toggleClass('d-none');
        if($(this).is(":checked") === false) {
            saveForm();
        }
    });

    /* Show/hide corresponding version key and secret */
    $('input[type=radio][name=version]').change(function() {
        if (this.value == 'v2') {
            $('#v2').removeClass('d-none');
            $('#v3').addClass('d-none');
        }
        else if (this.value == 'v3') {
            $('#v3').removeClass('d-none');
            $('#v2').addClass('d-none');
        }
    });

    function saveForm()
    {
        var url = "{{ route('security-settings.update', global_setting()->id ) }}";
        $.easyAjax({
            url: url,
            container: '#editSettings',
            type: "POST",
            redirect: true,
            disableButton: true,
            blockUI: true,
            data: $('#editSettings').serialize(),
            buttonSelector: "#save-form",
            success: function (response) {
                window.location.reload();
            }
        })
    }

    function errorMsg()
    {
        var form = $("#editSettings");
        var checkedValue = form.find("input[name=version]:checked").val();
        if(checkedValue == 'v3') {
            let msg = `<x-alert type="danger" icon="info-circle">
                Unexpected error occured.
            </x-alert>`;
            $('#portlet-body').html(msg);
            $('#portlet-body').attr('data-error', true);
            $('#save-method').hide();
            return false;
        }

        Swal.fire({
            title: "Error..!",
            text: "Invalid recaptcha credentials.",
            icon: 'warning',
            showCancelButton: false,
            focusConfirm: false,
            confirmButtonText: "Ok",
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
                window.location.reload();
            }
        });
    }
</script>
