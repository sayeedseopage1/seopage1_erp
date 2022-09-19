<!-- START -->
<div class="d-flex justify-content-between align-items-center p-3 border-bottom-grey rounded-top bg-white">
    <span>
        <p class="f-15 f-w-500 mb-0">{{ ucfirst($discussion->title) }}</p>
        <p class="f-11 text-lightest mb-0">@lang('modules.tickets.requestedOn')
            {{ $discussion->created_at->timezone(global_setting()->timezone)->format(global_setting()->date_format . ' ' . global_setting()->time_format) }}
        </p>
    </span>
    <span>
        <p class="mb-0 text-capitalize">
            <x-status :style="'color:'.$discussion->category->color" :value="$discussion->category->name" />
        </p>
    </span>
</div>
<!-- END -->
@foreach ($discussion->replies as $key => $message)
    @php
        $replyUser = $message->user;
    @endphp
    <div class="card ticket-message border-0 rounded-bottom
        @if (user()->id == $replyUser->id) bg-white-shade @endif
        " id="message-{{ $message->id }}">
        <div class="card-horizontal">
            <div class="card-img">
                <a href="{{ route('employees.show', $replyUser->id) }}"><img class=""
                        src="{{ $replyUser->image_url }}" alt="{{ $replyUser->name }}"></a>
            </div>
            <div class="card-body border-0 pl-0">
                <div class="d-flex">
                    <a href="{{ route('employees.show', $replyUser->id) }}">
                        <h4 class="card-title f-15 f-w-500 text-dark mr-3">{{ $replyUser->name }}</h4>
                    </a>
                    <p class="card-date f-11 text-lightest mb-0 mr-3">
                        {{ $message->created_at->timezone(global_setting()->timezone)->format(global_setting()->date_format . ' ' . global_setting()->time_format) }}
                    </p>
                    <div class="dropdown ml-auto message-action">
                        <button class="btn btn-lg f-14 p-0 text-lightest text-capitalize rounded  dropdown-toggle"
                            type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fa fa-ellipsis-h"></i>
                        </button>

                        <div class="dropdown-menu dropdown-menu-right border-grey rounded b-shadow-4 p-0"
                            aria-labelledby="dropdownMenuLink" tabindex="0">

                            <a class="dropdown-item add-reply" data-row-id="{{ $message->id }}"
                                data-discussion-id="{{ $discussion->id }}" href="javascript:;">@lang('app.reply')</a>

                            @if ($key != 0 && is_null($discussion->best_answer_id) && $discussion->user_id == $replyUser->id)
                                <a class="dropdown-item set-best-answer" data-row-id="{{ $message->id }}"
                                    href="javascript:;">@lang('modules.discussions.bestReply')</a>
                            @endif

                            @if ($replyUser->id == user()->id)
                                <a class="dropdown-item edit-reply" data-row-id="{{ $message->id }}"
                                    data-discussion-id="{{ $discussion->id }}"
                                    href="javascript:;">@lang('app.edit')</a>
                                @if ($key != 0)
                                    <a class="dropdown-item delete-message" data-row-id="{{ $message->id }}"
                                        href="javascript:;">@lang('app.delete')</a>
                                @endif
                            @endif
                        </div>
                    </div>

                </div>
                <div class="card-text text-dark-grey text-justify ql-editor p-0">{!! $message->body !!}</div>

                @if ($discussion->best_answer_id == $message->id)
                    <span class="badge badge-success">@lang('modules.discussions.bestReply')</span>
                @endif

              {{--   <!-- TICKET MESSAGE START -->
                <div class="ticket-msg border-right-grey" data-menu-vertical="1" data-menu-scroll="1"
                    data-menu-dropdown-timeout="500" id="ticketMsg">
                    <div class="d-flex flex-wrap">
                        @foreach ($message->files as $file)
                            <x-file-card :fileName="$file->filename"
                                :dateAdded="$file->created_at->diffForHumans()">
                                @if ($file->icon == 'images')
                                    <img src="{{ $file->file_url }}">
                                @else
                                    <i class="fa {{ $file->icon }} text-lightest"></i>
                                @endif

                                <x-slot name="action">
                                    <div class="dropdown ml-auto file-action">
                                        <button
                                            class="btn btn-lg f-14 p-0 text-lightest text-capitalize rounded  dropdown-toggle"
                                            type="button" data-toggle="dropdown" aria-haspopup="true"
                                            aria-expanded="false">
                                            <i class="fa fa-ellipsis-h"></i>
                                        </button>

                                        <div class="dropdown-menu dropdown-menu-right border-grey rounded b-shadow-4 p-0"
                                            aria-labelledby="dropdownMenuLink" tabindex="0">
                                            @if ($file->icon != 'images')
                                                <a class="cursor-pointer d-block text-dark-grey f-13 pt-3 px-3 "
                                                    target="_blank"
                                                    href="{{ $file->file_url }}">@lang('app.view')</a>
                                            @endif

                                            <a class="cursor-pointer d-block text-dark-grey f-13 py-3 px-3 "
                                                href="{{ route('discussion_file.download', md5($file->id)) }}">@lang('app.download')</a>

                                            @if (user()->id == $user->id)
                                                <a class="cursor-pointer d-block text-dark-grey f-13 pb-3 px-3 delete-file"
                                                    data-row-id="{{ $file->id }}"
                                                    href="javascript:;">@lang('app.delete')</a>
                                            @endif
                                        </div>
                                    </div>
                                </x-slot>
                            </x-file-card>
                        @endforeach
                    </div>
                </div>
                <!-- TICKET MESSAGE END --> --}}

            </div>

        </div>
         {{-- *** --}}
            <!-- TICKET MESSAGE START -->
            <div class="ticket-msg border-right-grey mt-3 ml-3" data-menu-vertical="1" data-menu-scroll="1"
            data-menu-dropdown-timeout="500" id="ticketMsg">
                <div class="d-flex flex-wrap">
                    @foreach ($message->files as $file)
                        <x-file-card :fileName="$file->filename"
                            :dateAdded="$file->created_at->diffForHumans()">
                            @if ($file->icon == 'images')
                                <img src="{{ $file->file_url }}">
                            @else
                                <i class="fa {{ $file->icon }} text-lightest"></i>
                            @endif

                            <x-slot name="action">
                                <div class="dropdown ml-auto file-action">
                                    <button
                                        class="btn btn-lg f-14 p-0 text-lightest text-capitalize rounded  dropdown-toggle"
                                        type="button" data-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false">
                                        <i class="fa fa-ellipsis-h"></i>
                                    </button>

                                    <div class="dropdown-menu dropdown-menu-right border-grey rounded b-shadow-4 p-0"
                                        aria-labelledby="dropdownMenuLink" tabindex="0">
                                        
                                            <a class="cursor-pointer d-block text-dark-grey f-13 pt-3 px-3 "
                                                target="_blank"
                                                href="{{ $file->file_url }}">@lang('app.view')</a>


                                        <a class="cursor-pointer d-block text-dark-grey f-13 py-3 px-3 "
                                            href="{{ route('discussion_file.download', md5($file->id)) }}">@lang('app.download')</a>

                                        @if (user()->id == $user->id)
                                            <a class="cursor-pointer d-block text-dark-grey f-13 pb-3 px-3 delete-file"
                                                data-row-id="{{ $file->id }}"
                                                href="javascript:;">@lang('app.delete')</a>
                                        @endif
                                    </div>
                                </div>
                            </x-slot>
                        </x-file-card>
                    @endforeach
                </div>
            </div>
            <!-- TICKET MESSAGE END -->
            {{-- *** --}}
    </div><!-- card end -->

@endforeach



<script>
    $('body').on('click', '.delete-file', function() {
        var id = $(this).data('row-id');
        var discussionFile = $(this);
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
                var url = "{{ route('discussion-files.destroy', ':id') }}";
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
                            discussionFile.closest('.card').remove();
                        }
                    }
                });
            }
        });
    });
</script>
