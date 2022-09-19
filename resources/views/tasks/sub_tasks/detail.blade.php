@php
$deleteSubTaskPermission = user()->permission('delete_sub_tasks');
@endphp

<div class="modal-header">
    <h5 class="modal-title" id="modelHeading">@lang('modules.tasks.subTask') @lang('app.details')</h5>
    <button type="button"  class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">×</span></button>
</div>
<div class="modal-body">
    <div id="leave-detail-section">
        <div class="row">
            <div class="col-sm-12">
                <x-cards.data-row :label="__('app.title')" :value="ucfirst($subTask->title)" />
                <x-cards.data-row :label="__('app.startDate')" :value="((!is_null($subTask->start_date)) ? $subTask->start_date->format(global_setting()->date_format) : '--')" html="true" />
                <x-cards.data-row :label="__('app.dueDate')" :value="((!is_null($subTask->due_date)) ? $subTask->due_date->format(global_setting()->date_format) : '--')" html="true" />

                @if ($subTask->assigned_to)
                    <div class="col-12 px-0 pb-3 d-block d-lg-flex d-md-flex">
                        <p class="mb-0 text-lightest f-14 w-30 d-inline-block text-capitalize">
                            @lang('modules.tasks.assignTo')</p>
                        <x-employee :user="$subTask->assignedTo" />
                    </div>
                @endif

                <x-cards.data-row :label="__('app.description')" :value="$subTask->description != '' ? $subTask->description : '--'" html="true" />

                @if (count($subTask->files) > 0)
                    <div class="d-flex flex-wrap mt-4">
                        @foreach ($subTask->files as $file)
                            <x-file-card :fileName="$file->filename" class="subTask{{ $file->id }}"
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

                                            @if ($deleteSubTaskPermission == 'all' || ($deleteSubTaskPermission == 'added' && $subTask->added_by == user()->id))
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
</div>
