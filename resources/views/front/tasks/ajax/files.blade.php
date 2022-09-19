<style>
    .file-action {
        visibility: hidden;
    }

    .file-card:hover .file-action {
        visibility: visible;
    }

</style>

<!-- TAB CONTENT START -->
<div class="tab-pane fade show active" role="tabpanel" aria-labelledby="nav-email-tab">

    <div class="d-flex flex-wrap p-20" id="task-file-list">
        @forelse($task->files as $file)
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
                                @if ($file->icon != 'images')
                                    <a class="cursor-pointer d-block text-dark-grey f-13 pt-3 px-3 " target="_blank"
                                        href="{{ $file->file_url }}">@lang('app.view')</a>
                                @endif
                                <a class="cursor-pointer d-block text-dark-grey f-13 py-3 px-3 "
                                    href="{{ route('task_files.download', md5($file->id)) }}">@lang('app.download')</a>
                        </div>
                    </div>
                </x-slot>

            </x-file-card>
        @empty
            <x-cards.no-record :message="__('messages.noFileUploaded')" icon="file" />
        @endforelse

    </div>

</div>
<!-- TAB CONTENT END -->
