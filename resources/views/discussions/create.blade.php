<link rel="stylesheet" href="{{ asset('vendor/css/dropzone.min.css') }}">

<x-form id="createMethods" method="POST" class="ajax-form">
<div class="modal-header">
    <h5 class="modal-title">@lang('app.new') @lang('modules.projects.discussion')</h5>
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
</div>
<div class="modal-body">
    <div class="portlet-body">

            <input type="hidden" name="project_id" value="{{ $projectId }}">
            <div class="row">
                <div class="col-md-12">
                    <div class="my-3">
                        <x-forms.select fieldId="discussion_category_id" :fieldLabel="__('app.category')"
                            fieldName="discussion_category" search="true" fieldRequired="true">
                            @foreach ($categories as $item)
                                <option
                                    data-content="<i class='fa fa-circle mr-2' style='color: {{ $item->color }}'></i> {{ mb_ucwords($item->name) }}"
                                    value="{{ $item->id }}">
                                    {{ mb_ucwords($item->name) }}
                                </option>
                            @endforeach
                        </x-forms.select>
                    </div>
                </div>

                <div class="col-md-12">
                    <x-forms.text :fieldLabel="__('app.title')" fieldName="title" fieldRequired="true"
                        fieldId="title" autocomplete="off" />
                </div>
                <div class="col-md-12">
                    <div class="form-group my-3">
                        <x-forms.label :fieldLabel="__('app.description')" fieldRequired="true" fieldId="description">
                        </x-forms.label>
                        <div id="description"></div>
                        <textarea name="description"  id="description-text" class="d-none"></textarea>
                    </div>
                </div>
                <div class="col-md-12">
                    <x-forms.file-multiple class="mr-0 mr-lg-2 mr-md-2"
                        :fieldLabel="__('app.add') . ' ' .__('app.file')" fieldName="file"
                        fieldId="discussion-file-upload-dropzone" />
                    <input type="hidden" name="discussion_id" id="discussion_id">
                    <input type="hidden" name="type" id="discussion">
                </div>
            </div>

    </div>
</div>
<div class="modal-footer">
    <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.cancel')</x-forms.button-cancel>
    <x-forms.button-primary id="save-discussion" icon="check">@lang('app.save')</x-forms.button-primary>
</div>
</x-form>
<script src="{{ asset('vendor/jquery/dropzone.min.js') }}"></script>
<script>
    quillImageLoad('#description');
    var discussion_reply_id;
    /* Upload images */
    Dropzone.autoDiscover = false;
    //Dropzone class
    taskDropzone = new Dropzone("#discussion-file-upload-dropzone", {
        dictDefaultMessage: "{{ __('app.dragDrop') }}",
        url: "{{ route('discussion-files.store') }}",
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
            taskDropzone = this;
        }
    });
    taskDropzone.on('sending', function (file, xhr, formData) {
        var ids = $('#discussion_id').val();
        formData.append('discussion_id', ids);
        formData.append('type', 'discussion');
        formData.append('discussion_reply_id', discussion_reply_id);
        $.easyBlockUI();
    });
    taskDropzone.on('uploadprogress', function () {
        $.easyBlockUI();
    });
    taskDropzone.on('completemultiple', function () {
        window.location.href = "{{ route('projects.show', $projectId) }}?tab=discussion";
    });

    // Save discussion
    $('#save-discussion').click(function() {
        var note = document.getElementById('description').children[0].innerHTML;
        document.getElementById('description-text').value = note;

        $.easyAjax({
            url: "{{ route('discussion.store') }}",
            container: '#createMethods',
            type: "POST",
            blockUI: true,
            disableButton: true,
            buttonSelector: "#save-discussion",
            data: $('#createMethods').serialize(),
            success: function(response) {
                if (response.status === 'success') {
                    if (taskDropzone.getQueuedFiles().length > 0) {
                        discussion_id = response.discussion_id;
                        $('#discussion_id').val(response.discussion_id);
                        discussion_reply_id = response.discussion_reply_id;
                        taskDropzone.processQueue();
                    } else {
                        window.location.href = "{{ route('projects.show', $projectId) }}?tab=discussion";
                    }
                }
            }
        })
    });

    init('#createMethods');

</script>
