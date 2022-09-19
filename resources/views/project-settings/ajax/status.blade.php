<x-slot name="buttons">
    <div class="row">
        <div class="col-md-12 mb-2">
            <x-forms.button-primary icon="plus" id="add-status" class="addStatus mb-2"> @lang('modules.statusFields.addstatus')
            </x-forms.button-primary>

        </div>
    </div>
</x-slot>

<div class="col-lg-12 col-md-12 ntfcn-tab-content-left w-100 p-4">

    <div class="table-responsive">
        <x-table class="table-bordered">
            <x-slot name="thead">
                <th>#</th>
                <th>@lang('app.name')</th>
                <th style="width: 15%;">@lang('app.status')</th>
                <th style="width: 30%;">@lang('modules.statusFields.defualtStatus')</th>
                <th>@lang('app.action')</th>
            </x-slot>

            @forelse($projectStatusSetting as $key => $status)
                <tr id="status-{{ $status->id }}">
                    <td>
                        {{ $key + 1 }}
                    </td>
                    <td> <i class="fa fa-circle mr-1 f-15" style="color:{{$status->color}}"></i> {{ ucfirst($status->status_name) }}</td>
                    @if ($status->default_status == 1)
                        <td style="width: 15%;"> {{ ucfirst($status->status) }}</td>
                    @else
                        <td style="width: 15%;">
                            <div class="custom-control custom-switch">
                                <input type="checkbox" @if($status->status == 'active') checked
                                        @endif class="custom-control-input change-project-setting"
                                    id="{{ $status->id }}">
                                <label class="custom-control-label cursor-pointer f-14" for="{{ $status->id }}"></label>
                            </div>
                        </td>
                    @endif
                    @if ($status->status == 'active')
                        <td>
                            <x-forms.radio fieldId="status_{{ $status->id }}" class="default_status"
                                data-status-id="{{ $status->id }}" :fieldLabel="__('app.default')" fieldName="default_status"
                                fieldValue="{{ $status->id }}" :checked="($status->default_status == 1) ? 'checked' : ''">
                            </x-forms.radio>
                        </td>
                    @else
                        <td>@lang('modules.statusFields.change')</td>
                    @endif
                    <td>
                        <div class="task_view">
                            <a href="javascript:;" data-status-id="{{ $status->id }}"
                                class="editProjectStatus task_view_more d-flex align-items-center justify-content-center">
                                <i class="fa fa-edit icons mr-1"></i> @lang('app.edit')
                            </a>
                        </div>
                        @if ($status->default_status == 0)
                        <div class="task_view mt-1 mt-lg-0 mt-md-0 ml-1">
                            <a href="javascript:;" data-status-id="{{ $status->id }}"
                                class="delete-project-status task_view_more d-flex align-items-center justify-content-center">
                                <i class="fa fa-trash icons mr-1"></i> @lang('app.delete')
                            </a>
                        </div>
                        @endif
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="4">
                        <x-cards.no-record icon="map-marker-alt" :message="__('messages.noRecordFound')" />
                    </td>
                </tr>
            @endforelse
        </x-table>
    </div>

</div>

<script>
    $('.change-project-setting').change(function () {
        var id = this.id;

        if ($(this).is(':checked'))
            var status = 'active';
        else
            var status = 'inactive';

        var url = "{{route('project-settings.changeStatus', ':id')}}";
        url = url.replace(':id', id);
        $.easyAjax({
            url: url,
            type: "POST",
            blockUI: true,
            data: {'id': id, 'status': status, '_method': 'PUT', '_token': '{{ csrf_token() }}'},
            success: function(response) {
                if (response.status == "success") {
                    window.location.reload();
                }
            }
        })
    });

    $('body').on('click', '.default_status', function() {
        var statusID = $(this).data('status-id');
        var token = "{{ csrf_token() }}";

        $.easyAjax({
            url: "{{ route('project-settings.setDefault', ':id') }}",
            type: "POST",
            data: {
                id: statusID,
                _token: token
            },
            blockUI: true,
            success: function(response) {
                if (response.status == "success") {
                    window.location.reload();
                }
            }
        });
    });

    $('#add-status').click(function() {
        var url = "{{ route('project-settings.create') }}";
        $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
        $.ajaxModal(MODAL_LG, url);
    });

    $('.editProjectStatus').click(function() {

        var id = $(this).data('status-id');

        var url = "{{ route('project-settings.edit', ':id') }}";
        url = url.replace(':id', id);

        $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
        $.ajaxModal(MODAL_LG, url);
    });

    $('body').on('click', '.delete-project-status', function() {

        var id = $(this).data('status-id');

        Swal.fire({
            title: "@lang('messages.sweetAlertTitle')",
            text: "@lang('messages.recoverRecord')",
            icon: 'warning',
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: "@lang('messages.confirmDelete')",
            cancelButtonText: "@lang('app.cancel')",
            customClass: {
                confirmButton: 'btn btn-primary mr-3',
                cancelButton: 'btn btn-secondary'
            },
            showClass: {
                popup: 'swal2-noanimation',
                backdrop: 'swal2-noanimation'
            },
            buttonsStyling: false
        }).then((result) => {
            if (result.isConfirmed) {

                var url = "{{ route('project-settings.destroy', ':id') }}";
                url = url.replace(':id', id);

                var token = "{{ csrf_token() }}";

                $.easyAjax({
                    type: 'POST',
                    url: url,
                    blockUI: true,
                    data: {
                        '_token': token,
                        '_method': 'DELETE'
                    },
                    success: function(response) {
                        if (response.status == "success") {
                            $('#status-' + id).fadeOut();
                        }
                    }
                });
            }
        });
    });

</script>
