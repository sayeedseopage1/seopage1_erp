<div class="modal-header">
    <h5 class="modal-title" id="modelHeading">@lang('modules.knowledgeBase.knowledgeCategory')</h5>
    <button type="button"  class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">×</span></button>
</div>
<div class="modal-body">
    <x-table class="table-bordered client-cat-table" headType="thead-light">
        <x-slot name="thead">
            <th>#</th>
            <th>@lang('modules.projectCategory.categoryName')</th>
            <th class="text-right">@lang('app.action')</th>
        </x-slot>

        @forelse($categories as $key=>$category)
            <tr id="cat-{{ $category->id }}">
                <td>{{ $key + 1 }}</td>
                <td data-row-id="{{ $category->id }}" contenteditable="true">{{ mb_ucwords($category->name) }}
                </td>
                <td class="text-right">
                    {{-- @if ($deletePermission == 'all' || $deletePermission == 'added') --}}
                        <x-forms.button-secondary data-cat-id="{{ $category->id }}" icon="trash"
                            class="delete-category">
                            @lang('app.delete')
                        </x-forms.button-secondary>
                    {{-- @endif --}}
            </tr>
        @empty
            <tr>
                <td colspan="3">
                    <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
                </td>
            </tr>
        @endforelse
    </x-table>

    <x-form id="createknowledgebaseCategory">
        <div class="row border-top-grey ">
            <div class="col-sm-12">
                <x-forms.text fieldId="category_name" :fieldLabel="__('modules.projectCategory.categoryName')"
                    fieldName="category_name" fieldRequired="true" fieldPlaceholder="e.g. Finance">
                </x-forms.text>
            </div>

        </div>
    </x-form>
</div>
<div class="modal-footer">
    <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.close')</x-forms.button-cancel>
    <x-forms.button-primary id="save-category" icon="check">@lang('app.save')</x-forms.button-primary>
</div>

<script>
    $('.delete-category').click(function() {

        var id = $(this).data('cat-id');
        var url = "{{ route('knowledgebasecategory.destroy', ':id') }}";
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
                    data: {
                        '_token': token,
                        '_method': 'DELETE'
                    },
                    success: function(response) {
                        if (response.status == "success") {
                            $('#cat-' + id).fadeOut();
                            var options = [];
                            var rData = [];
                            rData = response.categories;
                            $.each(rData, function(index, value) {
                                var selectData = '';
                                selectData = '<option value="' + value.id + '">' +
                                    value
                                    .name + '</option>';
                                options.push(selectData);
                            });

                            $('#category').html('<option value="">--</option>' +
                                options);
                            $('#category').selectpicker('refresh');
                        }
                    }
                });
            }
        });

    });

    $('#save-category').click(function() {
        var url = "{{ route('knowledgebasecategory.store') }}";
        $.easyAjax({
            url: url,
            container: '#createknowledgebaseCategory',
            type: "POST",
            data: $('#createknowledgebaseCategory').serialize(),
            success: function(response) {
                if (response.status == 'success') {
                    $('#category').html(response.data);
                    $('#category').selectpicker('refresh');
                    $(MODAL_LG).modal('hide');
                }
            }
        })
    });

    $('.client-cat-table [contenteditable=true]').focus(function() {
        $(this).data("initialText", $(this).html());
        let rowId = $(this).data('row-id');
    }).blur(function() {
        // ...if content is different...
        if ($(this).data("initialText") !== $(this).html()) {
            let id = $(this).data('row-id');
            let value = $(this).html();

            var url = "{{ route('knowledgebasecategory.update', ':id') }}";
            url = url.replace(':id', id);

            var token = "{{ csrf_token() }}";

            $.easyAjax({
                url: url,
                container: '#cat-' + id,
                type: "POST",
                data: {
                    'category_name': value,
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
                                .name + '</option>';
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
