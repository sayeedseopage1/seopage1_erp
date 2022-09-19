@php
    $editSubTaskPermission = user()->permission('edit_sub_tasks');
    $deleteSubTaskPermission = user()->permission('delete_sub_tasks');
@endphp

@forelse ($task->subtasks as $subtask)
    <div class="card w-100 rounded-0 border-0 subtask mb-3">

        <div class="card-horizontal">
            <div class="card-body pt-0">
                <div class="d-flex flex-grow-1">
                    <p class="card-title f-14 mr-3 text-dark">
                        {!! $subtask->status == 'complete' ? '<s>' . ucfirst($subtask->title) . '</s>' :
                        ucfirst($subtask->title) !!}
                    </p>
                    <div class="dropdown ml-auto subtask-action">
                        <button class="btn btn-lg f-14 p-0 text-lightest text-capitalize rounded  dropdown-toggle"
                            type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fa fa-ellipsis-h"></i>
                        </button>

                        <div class="dropdown-menu dropdown-menu-right border-grey rounded b-shadow-4 p-0"
                            aria-labelledby="dropdownMenuLink" tabindex="0">
                            <a class="cursor-pointer d-block text-dark-grey f-13 py-3 px-3 edit-subtask"
                                href="javascript:;" data-row-id="{{ $subtask->id }}">@lang('app.edit')</a>

                            <a class="cursor-pointer d-block text-dark-grey f-13 pb-3 px-3 delete-subtask"
                                data-row-id="{{ $subtask->id }}" href="javascript:;">@lang('app.delete')</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@empty
    <div class="align-items-center d-flex flex-column text-lightest p-20 w-100">
        <i class="fa fa-tasks f-21 w-100"></i>

        <div class="f-15 mt-4">
            - @lang('messages.noSubTaskFound') -
        </div>
    </div>
@endforelse
