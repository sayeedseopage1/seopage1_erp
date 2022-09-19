<link rel="stylesheet" href="{{ asset('vendor/css/tagify.css') }}">

<style>
    .tagify_tags .height-35 { height: auto !important; }
</style>

<div class="modal-header">
    <h5 class="modal-title" id="modelHeading">@lang('app.inviteMember') {{ mb_ucwords($companyName) }}</h5>
    <button type="button"  class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">×</span></button>
</div>
<div class="modal-body">
    <div class="row">
        <div class="col-sm-12">

            <nav class="tabs border-bottom-grey">
                <div class="nav" id="myTabs" role="tablist">
                    <a class="nav-item nav-link f-15 active" href="#inviteEmail" data-toggle="tab" id="inviteEmail-tab"
                        role="tab" aria-controls="inviteEmail"
                        aria-selected="true">@lang('modules.employees.inviteEmail')
                    </a>

                    <a class="nav-item nav-link f-15" href="#inviteLink" role="tab" data-toggle="tab"
                        id="inviteLink-tab" aria-controls="inviteLink" aria-selected="false">
                        @lang('modules.employees.inviteLink')
                    </a>
                </div>
            </nav>
            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="inviteEmail" role="tabpanel"
                    aria-labelledby="inviteEmail-tab">
                    <p>
                        <x-alert type="secondary" icon="info-circle">@lang('messages.inviteInfo')</x-alert>
                    </p>

                    <x-form id="inviteEmailForm">
                        <div class="row">
                            <div class="col-sm-12">
                                <x-forms.text class="tagify_tags" fieldId="email" :fieldLabel="__('app.email')" fieldName="email"
                                    :fieldRequired="true" :fieldPlaceholder="__('placeholders.email')">
                                </x-forms.text>
                                <x-forms.textarea fieldId="message" :fieldLabel="__('modules.messages.message')"
                                    fieldName="message" :fieldPlaceholder="__('modules.employees.message')">
                                </x-forms.textarea>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <x-forms.button-primary id="send-invite" icon="paper-plane">
                                    @lang('modules.employees.sendInvite')
                                </x-forms.button-primary>
                            </div>
                        </div>
                    </x-form>
                </div>
                <div class="tab-pane fade" id="inviteLink" role="tabpanel" aria-labelledby="inviteLink-tab">
                    <x-form id="inviteLinkForm">
                        <div class="row py-3">
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <x-forms.label fieldId="createLinkLabel"
                                        :fieldLabel="__('modules.employees.createLinkLabel')"></x-forms.label>
                                    <x-forms.radio fieldId="allowAnyEmail" checked="true"
                                        :fieldLabel="__('modules.employees.allowAnyEmail')" fieldName="allow_email"
                                        fieldValue="any">
                                    </x-forms.radio>

                                    @php
                                        $companyDomain = explode('@', global_setting()->company_email);
                                    @endphp

                                    <div class="form-check-inline custom-control custom-radio my-3 mr-3">
                                        <input type="radio" value="selected" class="custom-control-input"
                                            id="onlyAllowEmail" name="allow_email">
                                        <label class="custom-control-label cursor-pointer" for="onlyAllowEmail">
                                            @lang('modules.employees.onlyAllow')

                                            <x-forms.input-group class="mt-2 tagify_tags">
                                                <x-slot name="prepend">
                                                    <span class="input-group-text height-35 border">@</span>
                                                </x-slot>
                                                <input type="text" name="email_domain" id="email_domain"
                                                    placeholder="@lang('placeholders.emailDomain')"
                                                    value="{{ $companyDomain[1] }}"
                                                    class="form-control height-35 f-14">
                                            </x-forms.input-group>
                                        </label>
                                    </div>


                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <x-forms.button-primary id="create-link" icon="link">
                                    @lang('modules.employees.createLink')
                                </x-forms.button-primary>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12" id="invite-link-section">
                            </div>
                            <div class="col-sm-12">
                                <button type="button" data-clipboard-target="#invitation-link-text"
                                    class="btn-copy btn btn-sm btn-secondary d-none"><i class="fa fa-copy"></i>
                                    @lang('app.copy')</button>
                            </div>
                        </div>
                    </x-form>
                </div>
            </div>

        </div>

    </div>
</div>

<script src="{{ asset('vendor/jquery/tagify.min.js') }}"></script>
<script src="{{ asset('vendor/jquery/clipboard.min.js') }}"></script>
<script>
    var input = document.querySelector('input[name=email]'),
        // init Tagify script on the above inputs
        tagify = new Tagify(input, {
            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            callbacks: {
                // "invalid": onInvalidTag
            },
            dropdown: {
                position: 'text',
                enabled: 1 // show suggestions dropdown after 1 typed character
            }
        });

    $('#send-invite').click(function() {
        var url = "{{ route('employees.send_invite') }}";
        $.easyAjax({
            url: url,
            container: '#inviteEmailForm',
            type: "POST",
            disableButton: true,
            blockUI: true,
            buttonSelector: "#send-invite",
            data: $('#inviteEmailForm').serialize(),
            success: function(response) {
                if (response.status == 'success') {
                    $(MODAL_LG).modal('hide');
                }
            }
        })
    });

    $('#create-link').click(function() {
        var url = "{{ route('employees.create_link') }}";
        $.easyAjax({
            url: url,
            container: '#inviteLinkForm',
            type: "POST",
            disableButton: true,
            blockUI: true,
            buttonSelector: "#create-link",
            data: $('#inviteLinkForm').serialize(),
            success: function(response) {
                if (response.status == 'success') {
                    var inviteLink =
                        "<h5 class='mt-4'>{{ __('messages.inviteLinkSuccess') }}</h5>" +
                        "<p><em id='invitation-link-text'>" + response.link + "</em></p>";
                    $('#invite-link-section').html(inviteLink);
                    $('.btn-copy').removeClass('d-none');
                }
            }
        })
    });

    var clipboard = new ClipboardJS('.btn-copy');

    clipboard.on('success', function(e) {
        Swal.fire({
            icon: 'success',
            text: "{{ __('messages.inviteLinkCopied') }}",
            toast: true,
            position: 'top-end',
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            customClass: {
                confirmButton: 'btn btn-primary',
            },
            showClass: {
                popup: 'swal2-noanimation',
                backdrop: 'swal2-noanimation'
            },
        })
    });

</script>
