<div class="table-responsive p-20">
    <x-table class="table-bordered">
        <x-slot name="thead">
            <th>#</th>
            <th width="35%">@lang('modules.projectCategory.categoryName')</th>
            <th class="text-right">@lang('app.action')</th>
        </x-slot>

         @forelse($leadCategories as $key => $category)
            <tr class="row{{ $category->id }}">
                <td>{{ ($key+1) }}</td>
                <td>{{ mb_ucwords($category->category_name) }}</td>
                <td class="text-right">
                    <div class="task_view">
                        <a href="javascript:;" data-category-id="{{ $category->id }}" class="edit-category task_view_more d-flex align-items-center justify-content-center" > <i class="fa fa-edit icons mr-2"></i>  @lang('app.edit')
                        </a>
                    </div>
                    <div class="task_view">
                        <a href="javascript:;" class="delete-category task_view_more d-flex align-items-center justify-content-center" data-category-id="{{ $category->id }}">
                            <i class="fa fa-trash icons mr-2"></i> @lang('app.delete')
                        </a>
                    </div>
                </td>
            </tr>
        @empty
            <tr>
                <td colspan="4">
                    <x-cards.no-record icon="list" message="No lead category added" />
                </td>
            </tr>
        @endforelse
    </x-table>
</div>
