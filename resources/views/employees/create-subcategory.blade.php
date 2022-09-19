@php
    $deleteClientSubCategoryPermission = user()->permission('delete_client_subcategory');
@endphp

<div class="modal-header">
    <h5 class="modal-title" id="modelHeading">@lang('modules.client.clientSubCategory')</h5>
    <button type="button"  class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">×</span></button>
</div>
<div class="modal-body">
    <x-table class="table-bordered" headType="thead-light">
        <x-slot name="thead">
            <th>#</th>
            <th>@lang('modules.productCategory.subCategory')</th>
            <th>@lang('modules.productCategory.category')</th>
            <th class="text-right">@lang('app.action')</th>
        </x-slot>

        @forelse($subcategories as $key=>$subcategory)
            <tr id="cat-{{ $subcategory->id }}">
                <td>{{ $key + 1 }}</td>
                <td>{{ mb_ucwords($subcategory->category_name) }}</td>
                <td>{{ mb_ucwords($subcategory->clientCategory->category_name) }}</td>

                <td class="text-right">
                    @if ($deleteClientSubCategoryPermission == 'all' || $deleteClientSubCategoryPermission == 'added')
                        <x-forms.button-secondary data-cat-id="{{ $subcategory->id }}" icon="trash" class="delete-category">
                            @lang('app.delete')
                        </x-forms.button-secondary>
                    @endif
                </td>
            </tr>
        @empty
            <tr>
                <td colspan="4">@lang('messages.noRecordFound')</td>
            </tr>
        @endforelse
    </x-table>

    <x-form id="createProjectCategory">
        <div class="row border-top-grey ">
            <div class="col-sm-12 col-md-6">
                <x-forms.select fieldId="category_id" :fieldLabel="__('modules.client.clientCategory')"
                    fieldName="category_id" search="true">
                    @forelse($categories as $category)
                        <option value="{{ $category->id }}">{{ mb_ucwords($category->category_name) }}</option>
                    @empty
                        <option value="">@lang('messages.noCategoryAdded')</option>
                    @endforelse
                </x-forms.select>
            </div>
            <div class="col-sm-12 col-md-6">
                <x-forms.text fieldId="category_name" :fieldLabel="__('modules.projectCategory.categoryName')"
                    fieldName="category_name" fieldRequired="true" fieldPlaceholder="e.g. Potential Client">
                </x-forms.text>
            </div>

        </div>
    </x-form>
</div>
<div class="modal-footer">
    <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.cancel')</x-forms.button-cancel>
    <x-forms.button-primary id="save-category" icon="check">@lang('app.save')</x-forms.button-primary>
</div>

<script>
    init(MODAL_LG);
    $('.delete-category').click(function() {

        var id = $(this).data('cat-id');
        var url = "{{ route('clientSubCategory.destroy', ':id') }}";
        url = url.replace(':id', id);

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
                    blockUI: true,
                    data: {
                        '_token': token,
                        '_method': 'DELETE'
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

                            $('#sub_category_id').html(options);
                            $('#sub_category_id').selectpicker('refresh');
                        }
                    }
                });
            }
        });

    });

    $('#save-category').click(function() {
        var url = "{{ route('clientSubCategory.store') }}";
        $.easyAjax({
            url: url,
            container: '#createProjectCategory',
            type: "POST",
            data: $('#createProjectCategory').serialize(),
            success: function(response) {
                if (response.status == 'success') {
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

                        $('#sub_category_id').html(options);
                        $('#sub_category_id').selectpicker('refresh');
                        $(MODAL_LG).modal('hide');
                    }
                }
            }
        })
    });

</script>
