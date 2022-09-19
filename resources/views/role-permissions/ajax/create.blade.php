<div class="modal-header">
    <h5 class="modal-title" id="modelHeading">@lang('modules.client.clientCategory')</h5>
    <button type="button"  class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">×</span></button>
</div>
<div class="modal-body">
    <x-table class="table-bordered" headType="thead-light">
        <x-slot name="thead">
            <th>#</th>
            <th>@lang('app.role')</th>
            <th></th>
            <th class="text-right">@lang('app.action')</th>
        </x-slot>

        @forelse($roles as $key=>$role)
            <tr id="cat-{{ $role->id }}">
                <td>{{ $key + 1 }}</td>
                <td data-row-id="{{ $role->id }}" @if (!in_array($role->name, ['admin', 'employee', 'client'])) contenteditable="true" @endif>{{ mb_ucwords($role->name) }}
                </td>
                <td><span class="text-lightest"><span class="badge badge-primary">{{ $role->unsynced_users_count }}</span> @lang('app.unsyncedUsers')</span></td>
                <td class="text-right">
                    @if (!in_array($role->name, ['admin', 'employee', 'client']))
                        <x-forms.button-secondary data-cat-id="{{ $role->id }}" icon="trash" class="delete-category">
                            @lang('app.delete')
                        </x-forms.button-secondary>
                    @else
                        <span class="text-lightest">@lang('messages.defaultRoleCantDelete')</span>
                        
                        @if (in_array($role->name, ['employee', 'client']))
                            <x-forms.button-secondary class="reset-permission ml-2" data-role-id="{{ $role->id }}" icon="sync">
                                @lang('app.reset') @lang('modules.permission.permissions')
                            </x-forms.button-secondary>
                        @endif
                    @endif

            </tr>
        @empty
            <tr>
                <td colspan="3">@lang('messages.noRecordFound')</td>
            </tr>
        @endforelse
    </x-table>

    <x-form id="createProjectCategory">
        <div class="row border-top-grey ">
            <div class="col-sm-8">
                <x-forms.text fieldId="role_name" :fieldLabel="__('modules.permission.roleName')" fieldName="name"
                    fieldRequired="true" fieldPlaceholder="e.g. HR">
                </x-forms.text>
            </div>
            <div class="col-sm-4">
                <x-forms.select fieldId="import_from_role" :fieldLabel="__('modules.permission.importFromRole')" fieldName="import_from_role">
                    <option value="">--</option>
                    @foreach ($roles as $item)
                        <option value="{{ $item->id }}">{{ mb_ucwords($item->name) }}</option>
                    @endforeach
                </x-forms.select>
            </div>

        </div>
    </x-form>
</div>
<div class="modal-footer">
    <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.close')</x-forms.button-cancel>
    <x-forms.button-primary id="save-category" icon="check">@lang('app.save')</x-forms.button-primary>
</div>

<script>
    init(MODAL_LG);

    $('.delete-category').click(function() {

        var id = $(this).data('cat-id');
        var url = "{{ route('role-permissions.delete_role') }}";

        var token = "{{ csrf_token() }}";

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
                $.easyAjax({
                    type: 'POST',
                    url: url,
                    data: {
                        '_token': token,
                        'roleId': id
                    },
                    success: function(response) {
                        if (response.status == "success") {
                            $('#cat-' + id).fadeOut();
                            var options = [];
                            var rData = [];
                            rData = response.data;
                            $.each(rData, function(index, value) {
                                var selectData = '';
                                selectData = '<option value="' + value.id + '">' +
                                    value
                                    .category_name + '</option>';
                                options.push(selectData);
                            });

                            $('#category_id').html('<option value="">--</option>' +
                                options);
                            $('#category_id').selectpicker('refresh');

                            $('#sub_category_id').html('<option value="">--</option>');
                            $('#sub_category_id').selectpicker('refresh');
                        }
                    }
                });
            }
        });

    });

    $('#save-category').click(function() {
        var url = "{{ route('role-permissions.store_role') }}";
        $.easyAjax({
            url: url,
            container: '#createProjectCategory',
            type: "POST",
            data: $('#createProjectCategory').serialize(),
            success: function(response) {
                if (response.status == 'success') {
                    window.location.reload();
                }
            }
        })
    });

    $('[contenteditable=true]').focus(function() {
        $(this).data("initialText", $(this).html());
        let rowId = $(this).data('row-id');
    }).blur(function() {
        // ...if content is different...
        if ($(this).data("initialText") !== $(this).html()) {
            let id = $(this).data('row-id');
            let value = $(this).html();

            var url = "{{ route('role-permissions.update', ':id') }}";
            url = url.replace(':id', id);

            var token = "{{ csrf_token() }}";

            $.easyAjax({
                url: url,
                container: '#cat-' + id,
                type: "POST",
                data: {
                    'role_name': value,
                    '_token': token,
                    '_method': 'PUT'
                },
                blockUI: true,
                success: function(response) {
                    if (response.status == 'success') {
                        var options = [];
                        var rData = [];
                        rData = response.data;
                        $.each(rData, function(index, value) {
                            var selectData = '';
                            selectData = '<option value="' + value.id + '">' + value
                                .category_name + '</option>';
                            options.push(selectData);
                        });

                        $('#category_id').html('<option value="">--</option>' + options);
                        $('#category_id').selectpicker('refresh');

                        $('#sub_category_id').html('<option value="">--</option>');
                        $('#sub_category_id').selectpicker('refresh');
                    }
                }
            })
        }
    });

</script>
