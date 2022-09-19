@php
$addFilePermission = user()->permission('add_project_files');
$viewFilePermission = user()->permission('view_project_files');
$deleteFilePermission = user()->permission('delete_project_files');
@endphp

@forelse($files as $file)
    <x-file-card :fileName="$file->filename" :dateAdded="$file->created_at->diffForHumans()">
        @if ($file->icon == 'images')
            <img src="{{ $file->file_url }}">
        @else
            <i class="fa {{ $file->icon }} text-lightest"></i>
        @endif

        @if ($viewFilePermission == 'all' || ($viewFilePermission == 'added' && $file->added_by == user()->id))
            <x-slot name="action">
                <div class="dropdown ml-auto file-action">
                    <button class="btn btn-lg f-14 p-0 text-lightest text-capitalize rounded  dropdown-toggle" type="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fa fa-ellipsis-h"></i>
                    </button>

                    <div class="dropdown-menu dropdown-menu-right border-grey rounded b-shadow-4 p-0"
                        aria-labelledby="dropdownMenuLink" tabindex="0">
                        @if ($viewFilePermission == 'all' || ($viewFilePermission == 'added' && $file->added_by == user()->id))
                            <a class="cursor-pointer d-block text-dark-grey f-13 pt-3 px-3 " target="_blank"
                                    href="{{ $file->file_url }}">@lang('app.view')</a>
                            <a class="cursor-pointer d-block text-dark-grey f-13 py-3 px-3 "
                                href="{{ route('files.download', md5($file->id)) }}">@lang('app.download')</a>
                        @endif

                        @if ($deleteFilePermission == 'all' || ($deleteFilePermission == 'added' && $file->added_by == user()->id))
                            <a class="cursor-pointer d-block text-dark-grey f-13 pb-3 px-3 delete-file"
                                data-row-id="{{ $file->id }}" href="javascript:;">@lang('app.delete')</a>
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
