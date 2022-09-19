<div class="modal-header">
    <h5 class="modal-title" id="modelHeading">@lang('app.verify') @lang('app.password')</h5>
    <button type="button"  class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">×</span></button>
</div>
<div class="modal-body">

    <x-form id="checkForpassword">
        <div class="row border-top-grey ">
            <div class="col-sm-12">
                <x-forms.password
                    fieldId="password"
                    :fieldLabel="__('app.password')"
                    fieldName="password"
                    :fieldPlaceholder="__('app.password')"
                    :fieldRequired="true">
                </x-forms.password>
            </div>
        </div>
    </x-form>

</div>
<div class="modal-footer">
    <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.cancel')</x-forms.button-cancel>
    <x-forms.button-primary id="check-password" icon="check">@lang('app.check')</x-forms.button-primary>
</div>

<script>

    $('#check-password').click(function() {
        let url = "{{ route('project_notes.check_password') }}";

        let token = "{{ csrf_token() }}";

        let password = $('#password').val();

        let noteId = "{{ $note->id }}";

        $.easyAjax({
            url: url,
            container: '#checkForpassword',
            type: "POST",
            data: { note_id : noteId, '_token': token, password: password },
            success: function(response) {
                if (response.status == 'success') {
                    $(MODAL_LG).modal('hide');
                    getNoteDetail(noteId);
                }
            }
        })
    });

</script>
