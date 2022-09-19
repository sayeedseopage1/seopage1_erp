<x-table class="table-bordered">
    <x-slot name="thead">
        <th>#</th>
        <th>@lang('modules.knowledgeBase.knowledgeHeading')</th>
        <th>@lang('modules.knowledgeBase.knowledgeCategory')</th>
        <th>@lang('app.to')</th>
        <th class="text-right">@lang('app.action')</th>
    </x-slot>

    @forelse ($knowledgebases as $key => $item)
        <tr>
            <td>{{ $key + 1 }}</td>
            <td>
                <a href="{{ route('knowledgebase.show', $item->id) }}"
                    class="openRightModal text-darkest-grey d-block">{{ $item->heading }}</a>
            </td>
            <td>{{ ucfirst($item->knowledgebasecategory->name) }}</td>
            <td>{{ ucfirst($item->to) }}</td>
            <td class="text-right">
                @if ($editKnowledgebasePermission == 'all' || ($editKnowledgebasePermission == 'added' && $item->added_by == user()->id))
                    <div class="task_view">
                        <a href="{{ route('knowledgebase.edit', $item->id) }}"
                            class="task_view_more d-flex align-items-center justify-content-center openRightModal">
                            <i class="fa fa-edit icons mr-2"></i> @lang('app.edit')
                        </a>
                    </div>
                @endif
                @if ($deleteKnowledgebasePermission == 'all' || ($deleteKnowledgebasePermission == 'added' && $item->added_by == user()->id))
                    <div class="task_view ml-2">
                        <a href="javascript:;" data-article-id="{{ $item->id }}"
                            class="task_view_more d-flex align-items-center justify-content-center delete-article">
                            <i class="fa fa-trash icons mr-2"></i> @lang('app.delete')
                        </a>
                    </div>
                @endif
            </td>
        </tr>
    @empty
        <tr>
            <td colspan="4">
                <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
            </td>
        </tr>
    @endforelse
</x-table>