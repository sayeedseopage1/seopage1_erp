<div class="modal-header">
    <h5 class="modal-title" id="modelHeading">@lang('modules.projects.uploadFile')</h5>
    <button type="button"  class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">×</span></button>
</div>
<div class="modal-body">
    <x-form id="createTaskCategory">
        <input type="hidden" name="credit_note_id" value="{{ $creditNoteId }}">

        <div class="row">
            <div class="col-lg-12">
                <x-forms.file allowedFileExtensions="txt pdf doc xls xlsx docx rtf png jpg jpeg" class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('modules.projects.uploadFile')"
                    fieldName="file" fieldId="credit-file" :popover="__('messages.fileFormat.multipleImageFile')" />
            </div>
        </div>
    </x-form>
</div>
<div class="modal-footer">
    <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.cancel')</x-forms.button-cancel>
    <x-forms.button-primary id="save-category" icon="check">@lang('app.save')</x-forms.button-primary>
</div>

<script>
    $('#save-category').click(function() {
        var url = "{{ route('creditnotes.store_file') }}";
        $.easyAjax({
            url: url,
            container: '#createTaskCategory',
            type: "POST",
            file: true,
            disableButton: true,
            buttonSelector: "#save-category",
            data: $('#createTaskCategory').serialize(),
            success: function(response) {
                if (response.status == 'success') {
                    $(MODAL_LG).modal('hide');
                }
            }
        })
    });
    init(MODAL_LG);

</script>
