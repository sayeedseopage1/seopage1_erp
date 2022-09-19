@php
$addDocumentPermission = user()->permission('add_client_document');
$editDocumentPermission = user()->permission('edit_client_document');
$viewDocumentPermission = user()->permission('view_client_document');
$deleteDocumentPermission = user()->permission('delete_client_document');
@endphp

<style>
    .file-action {
        visibility: hidden;
    }

    .file-card:hover .file-action {
        visibility: visible;
    }

</style>

<!-- TAB CONTENT START -->
<div class="tab-pane fade show active mt-5" role="tabpanel" aria-labelledby="nav-email-tab">
    <x-cards.data :title="__('app.menu.documents')">

        @if ($addDocumentPermission == 'all' || $addDocumentPermission == 'added')

            <div class="row">
                <div class="col-md-12">
                    <a class="f-15 f-w-500" href="javascript:;" id="add-client-file"><i
                            class="icons icon-plus font-weight-bold mr-1"></i>@lang('app.add')
                        @lang('app.file')</a>
                </div>
            </div>

            <x-form id="save-client-file-data-form" class="d-none">
                <input type="hidden" name="user_id" value="{{ $client->id }}">
                <div class="row">
                    <div class="col-md-12">
                        <x-forms.text :fieldLabel="__('modules.projects.fileName')" fieldName="name"
                            fieldRequired="true" fieldId="file_name" />
                    </div>
                    <div class="col-md-12">
                        <x-forms.file :fieldLabel="__('modules.projects.uploadFile')" fieldName="file"
                            fieldRequired="true" fieldId="client_file" allowedFileExtensions="txt pdf doc xls xlsx docx rtf png jpg jpeg" :popover="__('messages.fileFormat.multipleImageFile')" />
                    </div>
                    <div class="col-md-12">
                        <div class="w-100 justify-content-end d-flex mt-2">
                            <x-forms.button-cancel id="cancel-document" class="border-0 mr-3">@lang('app.cancel')
                            </x-forms.button-cancel>
                            <x-forms.button-primary id="submit-document" icon="check">@lang('app.submit')
                                </x-forms.button-primary>
                        </div>
                    </div>
                </div>
            </x-form>
        @endif

        <div class="d-flex flex-wrap mt-3" id="task-file-list">
            @forelse($client->clientDocuments as $file)

                <x-file-card :fileName="$file->name" :dateAdded="$file->created_at->diffForHumans()">
                    @if ($file->icon == 'images')
                        <img src="{{ $file->doc_url }}">
                    @else
                        <i class="fa {{ $file->icon }} text-lightest"></i>
                    @endif
                    @if ($viewDocumentPermission == 'all' || ($viewDocumentPermission == 'added' && $file->added_by == user()->id))
                        <x-slot name="action">
                            <div class="dropdown ml-auto file-action">
                                <button
                                    class="btn btn-lg f-14 p-0 text-lightest text-capitalize rounded  dropdown-toggle"
                                    type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fa fa-ellipsis-h"></i>
                                </button>

                                <div class="dropdown-menu dropdown-menu-right border-grey rounded b-shadow-4 p-0"
                                    aria-labelledby="dropdownMenuLink" tabindex="0">
                                    @if ($viewDocumentPermission == 'all' || ($viewDocumentPermission == 'added' && $file->added_by == user()->id))

                                            <a class="cursor-pointer d-block text-dark-grey f-13 pt-3 px-3 "
                                                target="_blank"
                                                href="{{ $file->doc_url }}">@lang('app.view')</a>

                                        <a class="cursor-pointer d-block text-dark-grey f-13 py-3 px-3 "
                                            href="{{ route('client-docs.download', md5($file->id)) }}">@lang('app.download')</a>
                                    @endif

                                    @if ($editDocumentPermission == 'all' || ($editDocumentPermission == 'added' && $file->added_by == user()->id))
                                        <a class="cursor-pointer d-block text-dark-grey pb-3 f-13 px-3 edit-file"
                                            href="javascript:;" data-file-id="{{ $file->id }}">@lang('app.edit')</a>
                                    @endif

                                    @if ($deleteDocumentPermission == 'all' || ($deleteDocumentPermission == 'added' && $file->added_by == user()->id))
                                        <a class="cursor-pointer d-block text-dark-grey f-13 pb-3 px-3 delete-file"
                                            data-row-id="{{ $file->id }}"
                                            href="javascript:;">@lang('app.delete')</a>
                                    @endif
                                </div>
                            </div>
                        </x-slot>
                    @endif

                </x-file-card>
            @empty
                <div class="align-items-center d-flex flex-column text-lightest p-20 w-100">
                    <i class="fa fa-file-excel f-21 w-100"></i>

                    <div class="f-15 mt-4">
                        - @lang('messages.noFileUploaded') -
                    </div>
                </div>
            @endforelse

        </div>

    </x-cards.data>
</div>
<!-- TAB CONTENT END -->

<script>
    $('#add-client-file').click(function() {
        $(this).closest('.row').addClass('d-none');
        $('#save-client-file-data-form').removeClass('d-none');
    });

    $('body').on('click', '.edit-file', function() {
        var fileId = $(this).data('file-id');
        var url = "{{ route('client-docs.edit', ':id') }}";
        url = url.replace(':id', fileId);

        $(MODAL_DEFAULT + ' ' + MODAL_HEADING).html('...');
        $.ajaxModal(MODAL_DEFAULT, url);
    });

    $('#cancel-document').click(function() {
        $('#save-client-file-data-form').addClass('d-none');
        $('#add-client-file').closest('.row').removeClass('d-none');
    });

    $('#submit-document').click(function() {
        var url = "{{ route('client-docs.store') }}";

        $.easyAjax({
            url: url,
            container: '#save-client-file-data-form',
            type: "POST",
            disableButton: true,
            buttonSelector: "#submit-document",
            file: true,
            data: $('#editSettings').serialize(),
            success: function(response) {
                if (response.status == 'success') {
                    $('#task-file-list').html(response.view);
                    $('#save-client-file-data-form')[0].reset();
                    $(".dropify-clear").trigger("click");
                }
            }
        })
    });

    $('body').on('click', '.delete-file', function() {
        var id = $(this).data('row-id');
        Swal.fire({
            title: "@lang('messages.sweetAlertTitle')",
            text: "@lang('messages.recoverRecord')",
            icon: 'warning',
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: "@lang('messages.confirmDelete')",
            cancelButtonText: "@lang('app.cancel')",
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
                var url = "{{ route('client-docs.destroy', ':id') }}";
                url = url.replace(':id', id);

                var token = "{{ csrf_token() }}";

                $.easyAjax({
                    type: 'POST',
                    url: url,
                    data: {
                        '_token': token,
                        '_method': 'DELETE'
                    },
                    success: function(response) {
                        if (response.status == "success") {
                            $('#task-file-list').html(response.view);
                        }
                    }
                });
            }
        });
    });
</script>
