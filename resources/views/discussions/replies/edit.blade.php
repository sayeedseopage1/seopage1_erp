<div class="modal-header">
    <h5 class="modal-title">@lang('app.update') @lang('app.reply')</h5>
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
</div>
<div class="modal-body">
    <div class="portlet-body">
        <x-form id="createMethods" method="PUT" class="ajax-form">
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group my-3">
                        <x-forms.label fieldReuired="true" fieldId="description" :fieldLabel="__('app.reply')">
                        </x-forms.label>
                        <div id="description">{!! $reply->body !!}</div>
                        <textarea name="description" id="description-text" class="d-none"></textarea>
                    </div>
                </div>
            </div>
        </x-form>
    </div>
</div>
<div class="modal-footer">
    <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.cancel')</x-forms.button-cancel>
    <x-forms.button-primary id="save-discussion" icon="check">@lang('app.save')</x-forms.button-primary>
</div>

<script>
    quillImageLoad('#description');


    // save discussion
    $('#save-discussion').click(function() {
        var note = document.getElementById('description').children[0].innerHTML;
        document.getElementById('description-text').value = note;

        $.easyAjax({
            url: "{{ route('discussion-reply.update', $reply->id) }}",
            container: '#createMethods',
            type: "POST",
            blockUI: true,
            data: $('#createMethods').serialize(),
            success: function(response) {
                if (response.status == "success") {
                    $('#right-modal-content').html(response.html);
                    $(MODAL_XL).modal('hide');
                }
            }
        })
    });

    init('#createMethods');

</script>
