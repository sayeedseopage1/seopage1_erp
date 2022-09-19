<link rel="stylesheet" href="{{ asset('vendor/css/dropzone.min.css') }}">

<style>
    .file-action {
        visibility: hidden;
    }

    .file-card:hover .file-action {
        visibility: visible;
    }

  #cancel-file {
  text-transform: capitalize;
  padding: 9px 11px;
  border: 1px solid #fff;
  background-color: #fff !important;
  color: #99A5B5 !important;
  position: relative;
  }
#cancel-file:hover {
background-color: black !important;
border: solid 1px #000 !important;
color: #fff !important;
}

#cancel-file.disabled:hover, #cancel-file:disabled:hover {
  border: 1px solid #fff !important;
  background-color: #fff !important;
  color: #99A5B5 !important;
  cursor: not-allowed;
}
</style>

<div class="row">
    <div class="col-sm-12">
        <x-form id="save-notice-data-form" method="PUT">
            <div class="add-client bg-white rounded">
                <h4 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                    @lang('modules.knowledgeBase.updateknowledge')</h4>
                <div class="row p-20">
                    <div class="col-lg-12">
                        <div class="row">

                            <div class="col-lg-4 col-md-6">
                                <x-forms.text fieldId="heading" :fieldLabel="__('modules.knowledgeBase.knowledgeHeading')"
                                    fieldName="heading" fieldRequired="true" :fieldPlaceholder="__('modules.knowledgeBase.knowledgeHeading')"
                                    :fieldValue="$knowledge->heading">
                                </x-forms.text>
                            </div>

                            <div class="col-md-6 knowledgecategory">
                                <div class="form-group my-3">
                                    <x-forms.label fieldId="knowledgebasecategory" fieldRequired="true" :fieldLabel="__('modules.knowledgeBase.knowledgeCategory')">
                                    </x-forms.label>

                                    <x-forms.input-group >
                                        <select class="form-control select-picker" name="category" id="category"
                                            data-live-search="true">
                                            <option value="">--</option>
                                            @foreach ($categories as $category)
                                                <option
                                                {{ isset($knowledge->category_id) && $knowledge->category_id == $category->id ? 'selected' : '' }}
                                                 value="{{ $category->id }}">
                                                    {{ mb_ucwords($category->name) }}</option>
                                            @endforeach
                                        </select>

                                        <x-slot name="append">
                                            <button id="addKnowledgeCategory" type="button"
                                                class="btn btn-outline-secondary border-grey">@lang('app.add')</button>
                                        </x-slot>

                                    </x-forms.input-group>
                                </div>
                            </div>

                            <div class="col-lg-4 col-md-6">
                                <div class="form-group my-3">
                                    <label class="f-14 text-dark-grey mb-12 w-100" for="usr">Notify</label>
                                    <div class="d-flex">
                                        <x-forms.radio fieldId="toEmployee"
                                            :fieldLabel="__('modules.notices.toEmployee')" fieldName="to"
                                            fieldValue="employee" :checked="$knowledge->to == 'employee'">
                                        </x-forms.radio>
                                        <x-forms.radio fieldId="toClient" :fieldLabel="__('modules.notices.toClients')"
                                            fieldValue="client" fieldName="to" :checked="$knowledge->to == 'client'">
                                        </x-forms.radio>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12">
                                <div class="form-group my-3">
                                    <x-forms.label class="my-3" fieldId="description-text"
                                        :fieldLabel="__('modules.knowledgeBase.knowledgeDesc')">
                                    </x-forms.label>
                                    <div id="description"> {!! $knowledge->description !!} </div>
                                    <textarea name="description" id="description-text" class="d-none"></textarea>
                                </div>
                            </div>
                                            <div class="col-md-12 mt-3">
                                                <a class="f-15 f-w-500" href="javascript:;" id="add-file"><i
                                                        class="icons icon-plus font-weight-bold mr-1"></i>@lang('modules.projects.uploadFile')</a>
                                            </div>

                                            <div class="row col-md-12 d-none" id="knowledge-base-file">
                                                <div class="col-md-12">
                                                    <x-forms.file-multiple :fieldLabel="__('modules.knowledgeBase.uploadFile')" fieldName="file" fieldId="file" />
                                                </div>
                                                <input type="hidden" name="knowledge_base_id" id="knowledge_base_id">
                                                <div class="col-md-12">
                                                    <div class="w-100 justify-content-end d-flex mt-2">
                                                        <button type="button" id="cancel-file" class="rounded f-14 p-2" >@lang('app.cancel')</button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-md-12 d-flex flex-wrap mt-3" id="knowledgebase-file-list">
                                                @forelse($knowledge->files as $file)

                                                    <x-file-card :fileName="$file->filename" :dateAdded="$file->created_at->diffForHumans()">
                                                        @if ($file->icon == 'images')
                                                            <img src="{{ $file->file_url }}">
                                                        @else
                                                            <i class="fa {{ $file->icon }} text-lightest"></i>
                                                        @endif
                                                            <x-slot name="action">
                                                                <div class="dropdown ml-auto file-action">
                                                                    <button
                                                                        class="btn btn-lg f-14 p-0 text-lightest text-capitalize rounded  dropdown-toggle"
                                                                        type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                        <i class="fa fa-ellipsis-h"></i>
                                                                    </button>

                                                                    <div class="dropdown-menu dropdown-menu-right border-grey rounded b-shadow-4 p-0"
                                                                        aria-labelledby="dropdownMenuLink" tabindex="0">
                                                                            <a class="cursor-pointer d-block text-dark-grey f-13 pt-3 px-3 "
                                                                                    target="_blank"
                                                                                    href="{{ $file->file_url }}">@lang('app.view')</a>

                                                                           <a class="cursor-pointer d-block text-dark-grey f-13 py-3 px-3 "
                                                                                href="{{ route('knowledgebase-files.download', md5($file->id)) }}">@lang('app.download')</a>
                                                                            <a class="cursor-pointer d-block text-dark-grey f-13 pb-3 px-3 delete-file"
                                                                                data-row-id="{{ $file->id }}"
                                                                                href="javascript:;">@lang('app.delete')</a>
                                                                    </div>
                                                                </div>
                                                            </x-slot>

                                                    </x-file-card>
                                                @empty
                                                    <div class="align-items-center d-flex flex-column text-lightest p-20 w-100">
                                                        <div id="no-files-uploaded">
                                                            <i class="fa fa-file-excel f-21 w-100"></i>

                                                            <div class="f-15 mt-4">
                                                                - @lang('messages.noFileUploaded') -
                                                            </div>
                                                        </div>
                                                    </div>
                                                @endforelse

                                            </div>


                        </div>
                    </div>

                </div>

                <x-form-actions>
                    <x-forms.button-primary id="save-notice" class="mr-3" icon="check">@lang('app.save')
                    </x-forms.button-primary>
                    <x-forms.button-cancel :link="route('knowledgebase.index')" class="border-0">@lang('app.cancel')
                    </x-forms.button-cancel>
                </x-form-actions>
            </div>
        </x-form>

    </div>
</div>

<script src="{{ asset('vendor/jquery/dropzone.min.js') }}"></script>

<script>
    $(document).ready(function() {

        quillImageLoad('#description');

        Dropzone.autoDiscover = false;
        knowledgeBaseDropzone = new Dropzone("div#file", {
            dictDefaultMessage: "{{ __('app.dragDrop') }}",
            url: "{{ route('knowledgebase-files.store') }}",
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
            init: function() {
                knowledgeBaseDropzone = this;
            }
        });
        //

        knowledgeBaseDropzone.on('sending', function(file, xhr, formData) {
                var ids = "{{ $knowledge->id }}";
                formData.append('knowledge_base_id', ids);
                $.easyBlockUI();
            });

        knowledgeBaseDropzone.on('uploadprogress', function() {
            $.easyBlockUI();
        });
        knowledgeBaseDropzone.on('completemultiple', function(file) {
            window.location.href = "{{ route('knowledgebase.index') }}";        });
        knowledgeBaseDropzone.on('error', function(file) {
        });

        $('#add-file').click(function() {
            $(this).addClass('d-none');
        $('#knowledge-base-file').removeClass('d-none');
        $('#no-files-uploaded').addClass('d-none');
        });

        $('#cancel-file').click(function() {
            $('#knowledge-base-file').toggleClass('d-none');
            $('#add-file').toggleClass('d-none');
            $('#no-files-uploaded').toggleClass('d-none');
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
                    var url = "{{ route('knowledgebase-files.destroy', ':id') }}";
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
                                $('#knowledgebase-file-list').html(response.view);
                            }
                        }
                    });
                }
            });
        });

        // show/hide project detail
        $(document).on('change', 'input[type=radio][name=to]', function() {
            $('.department').toggleClass('d-none');
        });

        $('#save-notice').click(function() {
            const url = "{{ route('knowledgebase.update', [$knowledge->id]) }}";

            var note = document.getElementById('description').children[0].innerHTML;
            document.getElementById('description-text').value = note;

            $.easyAjax({
                url: url,
                container: '#save-notice-data-form',
                type: "POST",
                disableButton: true,
                blockUI: true,
                buttonSelector: "#save-notice",
                file: true,
                data: $('#save-notice-data-form').serialize(),
                success: function(response) {
                    if (response.status == 'success') {
                        if (knowledgeBaseDropzone.getQueuedFiles().length > 0) {
                            knowledgeBaseDropzone.processQueue();
                        }
                        if ($(MODAL_XL).hasClass('show')) {
                            $(MODAL_XL).hide();
                            window.location.reload();
                        } else {
                            window.location.href = response.redirectUrl;
                        }
                    }
                }
            });
        });


        $('#addKnowledgeCategory').click(function() {
            const url = "{{ route('knowledgebasecategory.create') }}";
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        })


        init(RIGHT_MODAL);


    });
</script>
