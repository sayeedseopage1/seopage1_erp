@php
    $editSubTaskPermission = user()->permission('edit_sub_tasks');
    $deleteSubTaskPermission = user()->permission('delete_sub_tasks');
    $addSubTaskPermission = user()->permission('add_sub_tasks');
    $viewSubTaskPermission = user()->permission('view_sub_tasks');
@endphp

@forelse ($task->subtasks as $subtask)
<div class="card w-100 rounded-0 border-0 subtask mb-3">

    <div class="card-horizontal">
        <div class="d-flex">
            <x-forms.checkbox :fieldId="'checkbox'.$subtask->id" class="task-check"
                data-sub-task-id="{{ $subtask->id }}"
                :checked="($subtask->status == 'complete') ? true : false" fieldLabel=""
                :fieldName="'checkbox'.$subtask->id" />

        </div>
        <div class="card-body pt-0">
            <div class="d-flex">
                @if ($subtask->assigned_to)
                    <x-employee-image :user="$subtask->assignedTo" />
                @endif

                <p class="card-title f-14 mr-3 text-dark flex-grow-1">
                    {!! $subtask->status == 'complete' ? '<s>' . ucfirst($subtask->title) . '</s>' : '<a class="view-subtask" href="javascript:;" style="color:black;" data-row-id=' . $subtask->id . ' >' .  ucfirst($subtask->title) . '</a>' !!}
                    {!! $subtask->due_date ? '<span class="f-11 text-lightest"><br>'.__('modules.invoices.due') . ': ' . $subtask->due_date->format(global_setting()->date_format) . '</span>' : '' !!}
                </p>
                <div class="dropdown ml-auto subtask-action">
                    <button
                        class="btn btn-lg f-14 p-0 text-lightest text-capitalize rounded  dropdown-toggle"
                        type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fa fa-ellipsis-h"></i>
                    </button>

                    <div class="dropdown-menu dropdown-menu-right border-grey rounded b-shadow-4 p-0"
                        aria-labelledby="dropdownMenuLink" tabindex="0">

                        @if ($viewSubTaskPermission == 'all' || ($viewSubTaskPermission == 'added' && $subtask->added_by == user()->id))
                            <a class="dropdown-item view-subtask" href="javascript:;"
                                data-row-id="{{ $subtask->id }}">@lang('app.view')</a>
                        @endif

                        @if ($editSubTaskPermission == 'all' || ($editSubTaskPermission == 'added' && $subtask->added_by == user()->id))
                            <a class="dropdown-item edit-subtask" href="javascript:;"
                                data-row-id="{{ $subtask->id }}">@lang('app.edit')</a>
                        @endif

                        @if ($deleteSubTaskPermission == 'all' || ($deleteSubTaskPermission == 'added' && $subtask->added_by == user()->id))
                            <a class="dropdown-item delete-subtask" data-row-id="{{ $subtask->id }}"
                                href="javascript:;">@lang('app.delete')</a>
                        @endif
                    </div>
                </div>
            </div>


            @if (count($subtask->files) > 0)
                <div class="d-flex flex-wrap mt-4">
                    @foreach ($subtask->files as $file)
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
                                            href="{{ route('sub-task-files.download', md5($file->id)) }}">@lang('app.download')</a>

                                        @if (user()->id == $user->id)
                                            <a class="cursor-pointer d-block text-dark-grey f-13 pb-3 px-3 delete-sub-task-file"
                                                data-row-id="{{ $file->id }}"
                                                href="javascript:;">@lang('app.delete')</a>
                                        @endif
                                    </div>
                                </div>
                            </x-slot>
                        </x-file-card>
                    @endforeach
                </div>
            @endif

        </div>
    </div>
</div>
@empty
    <x-cards.no-record :message="__('messages.noSubTaskFound')" icon="tasks" />
@endforelse
