<div class="col-xl-12 col-lg-12 col-md-12 ntfcn-tab-content-left w-100 p-20">
    <div class="row">
        <div class="table-responsive">

            <x-table class="table-bordered">
                <x-slot name="thead">
                    <th>#</th>
                    <th width="25%">@lang('app.menu.method')</th>
                    <th width="25%">@lang('app.description')</th>
                    <th>@lang('app.status')</th>
                    <th class="text-right">@lang('app.action')</th>
                </x-slot>

                @forelse($offlineMethods as $key => $method)
                    <tr class="row{{ $method->id }}">
                        <td>{{ $key + 1 }}</td>
                        <td>{{ mb_ucwords($method->name) }}</td>
                        <td class="text-break">{!! mb_ucwords($method->description) !!} </td>
                        <td>
                            @if ($method->status == 'yes') <label
                                class="label label-success">@lang('modules.offlinePayment.active')</label> @else <label
                                    class="label label-danger">@lang('modules.offlinePayment.inActive')</label>
                            @endif
                        </td>

                        <td class="text-right">
                            <div class="task_view">
                                <a class="task_view_more d-flex align-items-center justify-content-center edit-type"
                                    href="javascript:;" data-type-id="{{ $method->id }}">
                                    <i class="fa fa-edit icons mr-2"></i> @lang('app.edit')
                                </a>
                            </div>
                            <div class="task_view">
                                <a class="task_view_more d-flex align-items-center justify-content-center delete-type"
                                    href="javascript:;" data-type-id="{{ $method->id }}">
                                    <i class="fa fa-trash icons mr-2"></i> @lang('app.delete')
                                </a>
                            </div>
                        </td>

                    </tr>
                @empty
                    <tr>
                        <td colspan="5" class="text-center">
                            <x-cards.no-record icon="key" :message="__('messages.noMethodsAdded')" />
                        </td>
                    </tr>
                @endforelse
            </x-table>

        </div>
    </div>
</div>
