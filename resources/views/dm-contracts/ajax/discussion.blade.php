@php
$addContractDiscussionPermission = user()->permission('add_contract_discussion');
$editContractDiscussionPermission = user()->permission('edit_contract_discussion');
$deleteContractDiscussionPermission = user()->permission('delete_contract_discussion');
@endphp

<!-- TAB CONTENT START -->
<div class="tab-pane fade show active" role="tabpanel" aria-labelledby="nav-email-tab">

    <x-cards.data :title="__('modules.contracts.discussion')">
        @if ($addContractDiscussionPermission == 'all' || $addContractDiscussionPermission == 'added')

            <div class="row">
                <div class="col-md-12">
                    <a class="f-15 f-w-500" href="javascript:;" id="add-comment"><i
                            class="icons icon-plus font-weight-bold mr-1"></i>@lang('app.add')
                        @lang('modules.tasks.comment')</a>
                </div>
            </div>

            <x-form id="save-comment-data-form" class="d-none">
                <div class="col-md-12 ">
                    <div class="media">
                        <img src="{{ user()->image_url }}" class="align-self-start mr-3 taskEmployeeImg rounded"
                            alt="{{ mb_ucwords(user()->name) }}">
                        <div class="media-body bg-white">
                            <div class="form-group">
                                <div id="task-comment"></div>
                                <textarea name="comment" class="form-control invisible d-none"
                                    id="task-comment-text"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="w-100 justify-content-end d-flex mt-2">
                        <x-forms.button-cancel id="cancel-comment" class="border-0 mr-3">@lang('app.cancel')
                        </x-forms.button-cancel>
                        <x-forms.button-primary id="submit-comment" icon="location-arrow">@lang('app.submit')
                            </x-button-primary>
                    </div>

                </div>
            </x-form>
        @endif


        <div class="d-flex flex-wrap justify-content-between mt-3" id="comment-list">
            @if ($viewDiscussionPermission != 'none')
                @forelse ($contract->discussion as $discussion)
                    <div class="card w-100 rounded-0 border-0 comment">
                        <div class="card-horizontal">
                            <div class="card-img my-1 ml-0">
                                <a href="{{ route('employees.show', $discussion->user->id) }}">
                                    <img src="{{ $discussion->user->image_url }}"
                                        alt="{{ mb_ucwords($discussion->user->name) }}"></a>
                            </div>
                            <div class="card-body border-0 pl-0 py-1">
                                <div class="d-flex flex-grow-1">
                                    <h4 class="card-title f-15 f-w-500 mr-3"><a class="text-dark"
                                            href="{{ route('employees.show', $discussion->user->id) }}">{{ mb_ucwords($discussion->user->name) }}</a>
                                    </h4>
                                    <p class="card-date f-11 text-lightest mb-0">
                                        {{ ucfirst($discussion->created_at->diffForHumans()) }}
                                    </p>
                                    <div class="dropdown ml-auto comment-action">
                                        <button
                                            class="btn btn-lg f-14 p-0 text-lightest text-capitalize rounded  dropdown-toggle"
                                            type="button" data-toggle="dropdown" aria-haspopup="true"
                                            aria-expanded="false">
                                            <i class="fa fa-ellipsis-h"></i>
                                        </button>

                                        <div class="dropdown-menu dropdown-menu-right border-grey rounded b-shadow-4 p-0"
                                            aria-labelledby="dropdownMenuLink" tabindex="0">
                                            @if ($editContractDiscussionPermission == 'all' || ($editContractDiscussionPermission == 'added' && $discussion->added_by == user()->id))
                                                <a class="cursor-pointer d-block text-dark-grey f-13 py-3 px-3 edit-comment"
                                                    href="javascript:;"
                                                    data-row-id="{{ $discussion->id }}">@lang('app.edit')</a>
                                            @endif

                                            @if ($deleteContractDiscussionPermission == 'all' || ($deleteContractDiscussionPermission == 'added' && $discussion->added_by == user()->id))
                                                <a class="cursor-pointer d-block text-dark-grey f-13 pb-3 px-3 delete-comment"
                                                    data-row-id="{{ $discussion->id }}"
                                                    href="javascript:;">@lang('app.delete')</a>
                                            @endif
                                        </div>
                                    </div>
                                </div>
                                <div class="card-text f-14 text-dark-grey text-justify">{!! ucfirst($discussion->message) !!}
                                </div>
                            </div>
                        </div>
                    </div>
                @empty
                    <div class="align-items-center d-flex flex-column text-lightest p-20 w-100">
                        <i class="fa fa-comment-alt f-21 w-100"></i>

                        <div class="f-15 mt-4">
                            - @lang('messages.noCommentFound') -
                        </div>
                    </div>
                @endforelse
            @endif
        </div>
    </x-cards.data>
</div>
<!-- TAB CONTENT END -->

<script>
    var add_task_comments = "{{ $addContractDiscussionPermission }}";

    $('#add-comment').click(function() {
        $(this).closest('.row').addClass('d-none');
        $('#save-comment-data-form').removeClass('d-none');
    });

    $('#cancel-comment').click(function() {
        $('#save-comment-data-form').addClass('d-none');
        $('#add-comment').closest('.row').removeClass('d-none');
    });

    $(document).ready(function() {
        if (add_task_comments == "all" || add_task_comments == "added") {
            quillImageLoad('#task-comment');
        }

        $('#submit-comment').click(function() {
            var comment = document.getElementById('task-comment').children[0].innerHTML;
            document.getElementById('task-comment-text').value = comment;

            var token = '{{ csrf_token() }}';

            const url = "{{ route('contractDiscussions.store') }}";

            $.easyAjax({
                url: url,
                container: '#save-comment-data-form',
                type: "POST",
                disableButton: true,
                blockUI: true,
                buttonSelector: "#submit-comment",
                data: {
                    '_token': token,
                    comment: comment,
                    contract_id: '{{ $contract->id }}'
                },
                success: function(response) {
                    if (response.status == "success") {
                        $('#comment-list').html(response.view);
                        document.getElementById('task-comment').children[0].innerHTML = "";
                        $('#task-comment-text').val('');
                    }

                }
            });
        });

        $('body').on('click', '.delete-comment', function() {
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
                    var url = "{{ route('contractDiscussions.destroy', ':id') }}";
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
                                $('#comment-list').html(response.view);
                            }
                        }
                    });
                }
            });
        });

        $('body').on('click', '.edit-comment', function() {
            var id = $(this).data('row-id');
            var url = "{{ route('contractDiscussions.edit', ':id') }}";
            url = url.replace(':id', id);
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });

    });
</script>
