<div class="table-responsive p-20">
    <x-table class="table-bordered">
        <x-slot name="thead">
            <th>#</th>
            <th>@lang('app.status')</th>
            <th>@lang('modules.lead.defaultLeadStatus')</th>
            <th>@lang('app.action')</th>
        </x-slot>

        @forelse($leadStatus as $key => $status)
            <tr class="row{{ $status->id }}">
                <td>{{ $key + 1 }}</td>
                <td>
                    <x-status :value="ucfirst($status->type)" :style="'color:'.$status->label_color" />
                </td>
                <td>
                    <x-forms.radio fieldId="status_id_{{ $status->id }}" class="set_default_status"
                        data-status-id="{{ $status->id }}" :fieldLabel="__('app.default')"
                        fieldName="project_admin" fieldValue="{{ $status->id }}"
                        :checked="($status->default == 1) ? 'checked' : ''">
                    </x-forms.radio>
                </td>

                <td>
                    <div class="task_view">
                        <a href="javascript:;" data-status-id="{{ $status->id }}"
                            class="edit-status task_view_more d-flex align-items-center justify-content-center"> <i
                                class="fa fa-edit icons mr-2"></i> @lang('app.edit')
                        </a>
                    </div>

                    @if (!$status->default)
                        <div class="task_view mt-1 mt-lg-0 mt-md-0">
                            <a href="javascript:;"
                                class="delete-status task_view_more d-flex align-items-center justify-content-center"
                                data-status-id="{{ $status->id }}">
                                <i class="fa fa-trash icons mr-2"></i> @lang('app.delete')
                            </a>
                        </div>
                    @endif

                </td>
            </tr>
        @empty
            <tr>
                <td colspan="4">
                    <x-cards.no-record icon="list" :message="__('messages.noLeadStatusAdded')" />
                </td>
            </tr>
        @endforelse
    </x-table>
</div>
