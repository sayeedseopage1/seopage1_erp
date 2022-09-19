<div class="table-responsive p-20">
    <x-table class="table-bordered">
        <x-slot name="thead">
            <th>#</th>
            <th>@lang('app.name')</th>
            <th class="text-right">@lang('app.action')</th>
        </x-slot>

        @forelse($leadSources as $key => $source)
            <tr class="row{{ $source->id }}">
                <td>{{ ($key+1) }}</td>
                <td>{{ mb_ucwords($source->type) }}</td>
                <td class="text-right">
                    <div class="task_view">
                        <a href="javascript:;" data-source-id="{{ $source->id }}"
                            class="task_view_more d-flex align-items-center justify-content-center dropdown-toggle edit-source">
                            <i class="fa fa-edit icons mr-2"></i> @lang('app.edit')
                        </a>
                    </div>
                    <div class="task_view mt-1 mt-lg-0 mt-md-0">
                        <a href="javascript:;" data-source-id="{{ $source->id }}"
                            class="task_view_more d-flex align-items-center justify-content-center dropdown-toggle delete-source">
                            <i class="fa fa-trash icons mr-2"></i> @lang('app.delete')
                        </a>
                    </div>
                </td>
            </tr>
        @empty
            <tr>
                <td colspan="4">
                    <x-cards.no-record icon="list" :message="__('messages.noLeadSourceAdded')" />
                </td>
            </tr>
        @endforelse
    </x-table>
</div>
