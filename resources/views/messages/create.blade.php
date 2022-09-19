<link rel="stylesheet" href="{{ asset('vendor/css/dropzone.min.css') }}">

<div class="modal-header">
    <h5 class="modal-title" id="modelHeading">@lang("modules.messages.startConversation")</h5>
    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">×</span></button>
</div>
<div class="modal-body">
    <x-form id="createConversationForm">
        <div class="row">

            <div class="col-md-12 {{ isset($clientId) ? 'd-none' : '' }}">
                <div class="form-group">
                    <div class="d-flex">

                        @if (!in_array('client', user_roles()))
                            @if (
                            $messageSetting->allow_client_employee == 'yes' && in_array('employee', user_roles())
                            || $messageSetting->allow_client_admin == 'yes' && in_array('admin', user_roles())
                            )
                                <x-forms.radio fieldId="user-type-employee" :fieldLabel="__('app.member')"
                                    fieldValue="employee" fieldName="user_type" checked="true">
                                </x-forms.radio>
                                <x-forms.radio fieldId="user-type-client" :fieldLabel="__('app.client')"
                                    fieldValue="client" fieldName="user_type">
                                </x-forms.radio>
                            @else
                                <input type="hidden" name="user_type" value="employee">
                            @endif
                        @endif

                        @if (in_array('client', user_roles()))
                            @if ($messageSetting->allow_client_employee == 'yes' || $messageSetting->allow_client_admin == 'yes')
                                <input type="hidden" name="user_type" value="employee">
                            @endif
                        @endif
                    </div>
                </div>
            </div>

            <div class="col-md-12" id="member-list">
                <div class="form-group">
                    <x-forms.select fieldId="selectEmployee" :fieldLabel="__('modules.messages.chooseMember')"
                        fieldName="user_id" search="true" fieldRequired="true">
                        <option value="">--</option>
                        @foreach ($employees as $item)
                            <option
                                data-content="<span class='badge badge-pill badge-light border'><div class='d-inline-block mr-1'><img class='taskEmployeeImg rounded-circle' src='{{ $item->image_url }}' ></div> {{ ucfirst($item->name) }}</span>"
                                value="{{ $item->id }}">{{ mb_ucwords($item->name) }}</option>
                        @endforeach
                    </x-forms.select>
                </div>
            </div>

            @if ((
                ($messageSetting->allow_client_admin == 'yes' && in_array('admin', user_roles()))
                || ($messageSetting->allow_client_employee == 'yes'  && in_array('employee', user_roles())))
                && !in_array('client', user_roles()
            ))
                <div class="col-md-12 d-none" id="client-list">
                    <div class="form-group">

                        @if (isset($clientId))
                            <x-forms.text :fieldReadOnly="true" :fieldLabel="__('modules.client.clientName')" fieldName="client_name"
                            fieldId="client_name" fieldPlaceholder="" :fieldValue="$client->name" />
                            <input type="hidden" name="client_id" id="client_id" value="{{ $clientId }}">
                        @else
                            <x-forms.select fieldId="client_id" :fieldLabel="__('modules.client.clientName')"
                                fieldName="client_id" search="true" fieldRequired="true">
                                <option value="">--</option>
                                @foreach ($clients as $item)
                                    <option
                                        data-content="<span class='badge badge-pill badge-light border'><div class='d-inline-block mr-1'><img class='taskEmployeeImg rounded-circle' src='{{ $item->image_url }}' ></div> {{ ucfirst($item->name) }}</span>"
                                        value="{{ $item->id }}" @if (isset($client) && $client->id == $item->id) selected @endif>{{ mb_ucwords($item->name) }}
                                    </option>
                                @endforeach
                                </select>
                            </x-forms.select>

                        @endif

                    </div>
                </div>
            @endif

            <div class="col-md-12">
                <div class="form-group">
                    <x-forms.textarea class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('modules.messages.message')"
                        fieldRequired="true" fieldName="message" fieldId="message"
                        :fieldPlaceholder="__('modules.messages.typeMessage')">
                    </x-forms.textarea>
                </div>
            </div>

            <div class="col-md-12">
                <x-forms.file-multiple class="mr-0 mr-lg-2 mr-md-2"
                    :fieldLabel="__('app.add') . ' ' .__('app.file')" fieldName="file"
                    fieldId="message-file-upload-dropzone" />
                <input type="hidden" name="message_id" id="message_id">
                <input type="hidden" name="type" id="message">

                {{-- These inputs fields are used for file attchment --}}
                <input type="hidden" name="user_list" id="user_list">
                <input type="hidden" name="message_list" id="message_list">
                <input type="hidden" name="receiver_id" id="receiver_id">
            </div>

        </div>
    </x-form>
</div>
<div class="modal-footer">
    <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.cancel')</x-forms.button-cancel>
    <x-forms.button-primary id="save-message" icon="check">@lang('app.send')</x-forms.button-primary>
</div>

<script src="{{ asset('vendor/jquery/dropzone.min.js') }}"></script>

<script>

    $('#selectEmployee').selectpicker();

    $("input[name=user_type]").click(function() {
        if ($(this).val() == 'employee') {
            $('#member-list').removeClass('d-none');
            $('#client-list').addClass('d-none');
        } else {
            $('#member-list').addClass('d-none');
            $('#client-list').removeClass('d-none');
        }
    });

    /* Upload images */
    Dropzone.autoDiscover = false;

    //Dropzone class
    taskDropzone1 = new Dropzone("#message-file-upload-dropzone", {
        dictDefaultMessage: "{{ __('app.dragDrop') }}",
        url: "{{ route('message-file.store') }}",
        headers: {
            'X-CSRF-TOKEN': '{{ csrf_token() }}'
        },
        paramName: "file",
        maxFilesize: DROPZONE_MAX_FILESIZE,
        maxFiles: 10,
        autoProcessQueue: false,
        uploadMultiple: true,
        addRemoveLinks: true,
        parallelUploads: 10,
        acceptedFiles: DROPZONE_FILE_ALLOW,
        init: function () {
            taskDropzone1 = this;
            this.on("success", function(file, response) {
                $('#message_list').val(response.message_list);
                setContent();
                $.easyUnblockUI();
                taskDropzone1.removeAllFiles(true);
            })
        }
    });
    taskDropzone1.on('sending', function (file, xhr, formData) {
        var ids = $('#message_id').val();
        formData.append('message_id', ids);
        formData.append('type', 'message');
        formData.append('receiver_id', $('#receiver_id').val());
        $.easyBlockUI();
    });
    taskDropzone1.on('uploadprogress', function () {
        $.easyBlockUI();
    });

    $('#save-message').click(function() {
        var url = "{{ route('messages.store') }}";
        $.easyAjax({
            url: url,
            container: '#createConversationForm',
            disableButton: true,
            blockUI: true,
            buttonSelector: "#save-message",
            type: "POST",
            data: $('#createConversationForm').serialize(),
            success: function(response) {

                $('#user_list').val(response.user_list);
                $('#message_list').val(response.message_list);
                $('#receiver_id').val(response.receiver_id);
                $('.message-user').html(response.userName);

                if (taskDropzone1.getQueuedFiles().length > 0) {
                    message_id = response.message_id;
                    $('#message_id').val(response.message_id);
                    taskDropzone1.processQueue();
                } else {
                    setContent();
                }

                $('.show-user-messages').removeClass('active');
                $('#user-no-'+response.receiver_id+' a').addClass('active');
                let receiverId = $('#chatBox').data('chat-for-user');
                $('#user-no-'+receiverId+' a').addClass('active');

            }
        })
    });

    function setContent() {
        @if (isset($client))
            let clientId = $('#client_id').val();
            var redirectUrl = "{{ route('messages.index') }}?clientId="+clientId;
            window.location.href = redirectUrl;
        @endif

        document.getElementById('msgLeft').innerHTML = $('#user_list').val();
        document.getElementById('chatBox').innerHTML = $('#message_list').val();
        $('#sendMessageForm').removeClass('d-none');

        if ($("input[name=user_type]").length > 0 && $("input[name=user_type]").val() ==
            'client') {
            var userId = $('#client-list').val();
        } else {
            var userId = $('#selectEmployee').val();
        }

        $('#current_user_id').val(userId);
        $('#receiver_id').val(userId);
        $(MODAL_LG).modal('hide');

        scrollChat();
    }

    // If request comes from project overview tab where client id is set, then it will select that client name default
    @if (isset($client))
        $("#user-type-client").prop("checked", true);
        $('#member-list, #client-list').toggleClass('d-none');
    @endif

    init('#createConversationForm');
</script>
