@php
$addContractDiscussionPermission = user()->permission('add_contract_discussion');
$editContractDiscussionPermission = user()->permission('edit_contract_discussion');
$deleteContractDiscussionPermission = user()->permission('delete_contract_discussion');
@endphp

@forelse ($discussions as $discussion)
    <div class="card w-100 rounded-0 border-0 comment">
        <div class="card-horizontal">
            <div class="card-img my-1 ml-0">
                <a href="{{ route('employees.show', $discussion->user->id) }}">
                    <img src="{{ $discussion->user->image_url }}" alt="{{ mb_ucwords($discussion->user->name) }}"></a>
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
                        <button class="btn btn-lg f-14 p-0 text-lightest text-capitalize rounded  dropdown-toggle"
                            type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fa fa-ellipsis-h"></i>
                        </button>

                        <div class="dropdown-menu dropdown-menu-right border-grey rounded b-shadow-4 p-0"
                            aria-labelledby="dropdownMenuLink" tabindex="0">
                            @if ($editContractDiscussionPermission == 'all' || ($editContractDiscussionPermission == 'added' && $discussion->added_by == user()->id))
                                <a class="cursor-pointer d-block text-dark-grey f-13 py-3 px-3 edit-comment"
                                    href="javascript:;" data-row-id="{{ $discussion->id }}">@lang('app.edit')</a>
                            @endif

                            @if ($deleteContractDiscussionPermission == 'all' || ($deleteContractDiscussionPermission == 'added' && $discussion->added_by == user()->id))
                                <a class="cursor-pointer d-block text-dark-grey f-13 pb-3 px-3 delete-comment"
                                    data-row-id="{{ $discussion->id }}" href="javascript:;">@lang('app.delete')</a>
                            @endif
                        </div>
                    </div>
                </div>
                <div class="card-text f-14 text-dark-grey text-justify ql-editor">{!! ucfirst($discussion->message) !!}
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
