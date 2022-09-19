<div class="modal-header">
    <h5 class="modal-title" id="modelHeading">@lang('app.note')</h5>
    <button type="button"  class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">×</span></button>
</div>
<div class="modal-body">

    <x-form id="edit-note-data-form" method="PUT">
        <div class="row">
            <div class="col-md-12 p-20 ">
                <div class="media">
                    <img src="{{ $note->user->image_url }}" class="align-self-start mr-3 taskEmployeeImg rounded"
                        alt="{{ mb_ucwords($note->user->name) }}">
                    <div class="media-body bg-white">
                        <div class="form-group">
                            <div id="task-edit-note">{!! $note->note !!}</div>
                            <textarea name="note" class="form-control invisible d-none"
                                id="task-edit-note-text">{!!  $note->note !!}</textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </x-form>
</div>
<div class="modal-footer">
    <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.cancel')</x-forms.button-cancel>
    <x-forms.button-primary id="save-edit-note" icon="check">@lang('app.save')</x-forms.button-primary>
</div>

<script>
    var edit_task_notes = "{{ user()->permission('edit_task_notes') }}";

    $(document).ready(function() {
        if (edit_task_notes == "all" || edit_task_notes == "added") {
            quillImageLoad('#task-edit-note');
        }

        $('#save-edit-note').click(function() {
            var note = document.getElementById('task-edit-note').children[0].innerHTML;
            document.getElementById('task-edit-note-text').value = note;

            var token = '{{ csrf_token() }}';

            const url = "{{ route('task-note.update', $note->id) }}";

            $.easyAjax({
                url: url,
                container: '#edit-note-data-form',
                type: "POST",
                disableButton: true,
                blockUI: true,
                buttonSelector: "#save-edit-note",
                data: {
                    '_token': token,
                    note: note,
                    '_method': 'PUT',
                    taskId: '{{ $note->task->id }}'
                },
                success: function(response) {
                    if (response.status == "success") {
                        document.getElementById('note-list').innerHTML = response.view;
                        $(MODAL_LG).modal('hide');
                    }

                }
            });
        });

    });

</script>
