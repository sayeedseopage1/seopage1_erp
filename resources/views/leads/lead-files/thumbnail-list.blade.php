@php
    $deleteTaskFilePermission = user()->permission('delete_task_files');
    $viewLeadFilePermission = user()->permission('view_lead_files');
@endphp

<div class="row">
    @forelse($lead->files as $file)

        @if ($viewLeadFilePermission == 'all' || ($viewLeadFilePermission == 'added' && $file->added_by == user()->id))
            <div class="col-md-4 col-lg-3 mt-2">
                <x-file-card :fileName="$file->filename" :dateAdded="$file->created_at->diffForHumans()">
                    @if ($file->icon == 'images')
                        <img src="{{ $file->file_url }}">
                    @else
                        <i class="fa {{ $file->icon }} text-lightest"></i>
                    @endif

                        <x-slot name="action">
                            <div class="dropdown ml-auto file-action">
                                <button class="btn btn-lg f-14 p-0 text-lightest text-capitalize rounded  dropdown-toggle"
                                    type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fa fa-ellipsis-h"></i>
                                </button>

                                <div class="dropdown-menu dropdown-menu-right border-grey rounded b-shadow-4 p-0"
                                    aria-labelledby="dropdownMenuLink" tabindex="0">
                                    @if ($viewLeadFilePermission == 'all' || ($viewLeadFilePermission == 'added' && $file->added_by == user()->id))
                                        <a class="cursor-pointer d-block text-dark-grey f-13 pt-3 px-3 " target="_blank"
                                                href="{{ $file->file_url }}">@lang('app.view')</a>
                                        <a class="cursor-pointer d-block text-dark-grey f-13 py-3 px-3 "
                                            href="{{ route('lead-files.download', $file->id) }}">@lang('app.download')</a>
                                    @endif

                                    @if ($deleteTaskFilePermission == 'all' || ($deleteTaskFilePermission == 'added' && $file->added_by == user()->id))
                                        <a class="cursor-pointer d-block text-dark-grey f-13 pb-3 px-3 delete-lead-file"
                                            data-file-id="{{ $file->id }}" href="javascript:;">@lang('app.delete')</a>
                                    @endif
                                </div>
                            </div>
                        </x-slot>

                </x-file-card>
            </div>
        @endif

    @empty
        <div class="align-items-center d-flex flex-column text-lightest p-20 w-100">
            <i class="fa fa-file-excel f-21 w-100"></i>

            <div class="f-15 mt-4">
                - @lang('messages.noFileUploaded') -
            </div>
        </div>
    @endforelse
</div>
