<style>
    .alert {
        word-break: break-word;
    }
</style>
<div class="modal-header">
    <h5 class="modal-title" id="modelHeading">@lang('app.storageSetting.testAWSSetting')</h5>
    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">×</span></button>
</div>

<div class="modal-body">
    <div class="portlet-body">
        <x-form id="AWSForm" method="POST" class="ajax-form">

            <input type="hidden" name="file_url" id="file_url">
            <div class="form-body">
                <div class="row">
                    <div class="col-lg-12">
                        <x-forms.file allowedFileExtensions="txt pdf doc xls xlsx docx rtf png jpg jpeg"
                                      class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('app.storageSetting.uploadFile')"
                                      fieldName="file" fieldId="file" :popover="__('messages.fileFormat.multipleImageFile')"/>
                    </div>
                </div>
            </div>
        </x-form>
    </div>
</div>

<div class="modal-footer">
    <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.close')</x-forms.button-cancel>
    <a href="javascript:;" id="show-file" class="d-none">@lang('app.storageSetting.viewFile')</a>

    <x-forms.button-secondary class="btn-xs mr-3 d-none" id="show-file" icon="eye">
        @lang('app.storageSetting.viewFile')
    </x-forms.button-secondary>

    <x-forms.button-primary id="test-aws-submit" icon="check">@lang('app.submit')</x-forms.button-primary>
</div>

<script>

    $("#file").dropify({
        messages: dropifyMessages
    });

    $('#show-file').click(function () {
        const url = $('#file_url').val();
        window.open(url, '_blank');
    })

    // Save source
    $('#test-aws-submit').click(function () {
        $.easyAjax({
            url: "{{ route('storage-settings.aws_test') }}",
            container: '#AWSForm',
            type: "POST",
            blockUI: true,
            disableButton: true,
            messagePosition: 'inline',
            buttonSelector: "#test-aws-submit",
            file: true,
            data: $('#AWSForm').serialize(),
            success: function (response) {
                if (response.status === "success") {
                    $('.alert-success').append(` <a href="${response.fileurl}" target="_blank">@lang('app.storageSetting.viewFile')</a>`);
                    $('#file_url').val(response.fileurl);
                    $('#show-file').removeClass('d-none');
                }
            }
        })
    });
</script>
