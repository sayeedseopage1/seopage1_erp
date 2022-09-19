@php
$addDocumentPermission = user()->permission('add_documents');
$viewDocumentPermission = user()->permission('view_documents');
$deleteDocumentPermission = user()->permission('delete_documents');
$editDocumentPermission = user()->permission('edit_documents');
@endphp

@forelse($files as $file)
    @if ($viewDocumentPermission == 'all' || ($viewDocumentPermission == 'added' && $file->added_by == user()->id))
        <x-file-card :fileName="$file->name" :dateAdded="$file->created_at->diffForHumans()">
            @if ($file->icon == 'images')
                <img src="{{ $file->doc_url }}">
            @else
                <i class="fa {{ $file->icon }} text-lightest"></i>
            @endif

                <x-slot name="action">
                    <div class="dropdown ml-auto file-action">
                        <button class="btn btn-lg f-14 p-0 text-lightest text-capitalize rounded  dropdown-toggle" type="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fa fa-ellipsis-h"></i>
                        </button>

                        <div class="dropdown-menu dropdown-menu-right border-grey rounded b-shadow-4 p-0"
                            aria-labelledby="dropdownMenuLink" tabindex="0">
                            @if ($viewDocumentPermission == 'all' || ($viewDocumentPermission == 'added' && $file->added_by == user()->id))
                                @if ($file->icon != 'fa-file-image')
                                    <a class="cursor-pointer d-block text-dark-grey f-13 pt-3 px-3 " target="_blank"
                                        href="{{ $file->doc_url }}">@lang('app.view')</a>
                                @endif
                                <a class="cursor-pointer d-block text-dark-grey f-13 py-3 px-3 "
                                    href="{{ route('employee-docs.download', md5($file->id)) }}">@lang('app.download')</a>
                            @endif

                            @if ($editDocumentPermission == 'all' || ($editDocumentPermission == 'added' && $file->added_by == user()->id))
                                <a class="cursor-pointer d-block text-dark-grey pb-3 f-13 px-3 edit-file"
                                    href="javascript:;" data-file-id="{{ $file->id }}">@lang('app.edit')</a>
                            @endif

                            @if ($deleteDocumentPermission == 'all' || ($deleteDocumentPermission == 'added' && $file->added_by == user()->id))
                                <a class="cursor-pointer d-block text-dark-grey f-13 pb-3 px-3 delete-file"
                                    data-row-id="{{ $file->id }}" href="javascript:;">@lang('app.delete')</a>
                            @endif
                        </div>
                    </div>
                </x-slot>

        </x-file-card>
    @endif
@empty
    <div class="align-items-center d-flex flex-column text-lightest p-20 w-100">
        <i class="fa fa-file-excel f-21 w-100"></i>

        <div class="f-15 mt-4">
            - @lang('messages.noFileUploaded') -
        </div>
    </div>
@endforelse
