@php
$manageCategoryPermission = user()->permission('manage_discussion_category');
@endphp
<link rel="stylesheet" href="{{ asset('vendor/css/bootstrap-colorpicker.css') }}" />

<div class="modal-header">
    <h5 class="modal-title" id="modelHeading">@lang('modules.discussions.discussionCategory')</h5>
    <button type="button"  class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">×</span></button>
</div>
<div class="modal-body">
    <x-table class="table-bordered" headType="thead-light">
        <x-slot name="thead">
            <th>#</th>
            <th></th>
            <th>@lang('modules.projectCategory.categoryName')</th>
            <th class="text-right">@lang('app.action')</th>
        </x-slot>

        @forelse($categories as $key=>$category)
            <tr id="cat-{{ $category->id }}">
                <td>{{ $key + 1 }}</td>
                <td>
                    <i class="fa fa-circle" style="color: {{ $category->color }}"></i>
                </td>
                <td data-row-id="{{ $category->id }}" contenteditable="true">{{ mb_ucwords($category->name) }}</td>
                <td class="text-right">
                    @if ($manageCategoryPermission == 'all')
                        <x-forms.button-secondary data-cat-id="{{ $category->id }}" icon="trash" class="delete-category">
                            @lang('app.delete')
                        </x-forms.button-secondary>
                    @endif
                </td>
            </tr>
        @empty
            <tr>
                <td colspan="3">@lang('messages.noRecordFound')</td>
            </tr>
        @endforelse
    </x-table>

    <x-form id="createTaskCategory">
        <div class="row border-top-grey ">
            <div class="col-sm-6 col-md-6">
                <x-forms.text fieldId="category_name" :fieldLabel="__('modules.projectCategory.categoryName')"
                    fieldName="category_name" fieldRequired="true" :fieldPlaceholder="__('placeholders.category')">
                </x-forms.text>
            </div>
            <div class="col-sm-6 col-md-6">
                <div class="form-group my-3">
                    <x-forms.label fieldId="colorselector" fieldRequired="true"
                        :fieldLabel="__('modules.sticky.colors')">
                    </x-forms.label>
                    <x-forms.input-group id="colorpicker">
                        <input type="text" class="form-control height-35 f-14"
                            placeholder="{{ __('placeholders.colorPicker') }}" name="color" id="colorselector">

                        <x-slot name="append">
                            <span class="input-group-text height-35 colorpicker-input-addon"><i></i></span>
                        </x-slot>
                    </x-forms.input-group>
                </div>
            </div>


        </div>
    </x-form>
</div>
<div class="modal-footer">
    <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.cancel')</x-forms.button-cancel>
    <x-forms.button-primary id="save-category" icon="check">@lang('app.save')</x-forms.button-primary>
</div>

<script src="{{ asset('vendor/jquery/bootstrap-colorpicker.js') }}"></script>
<script>
    $('#colorpicker').colorpicker({
        "color": "#16813D"
    });
    $('.delete-category').click(function() {

        var id = $(this).data('cat-id');
        var url = "{{ route('discussion-category.destroy', ':id') }}";
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
                        if (response.status == 'success') {
                            $('#discussion_category').html(response.data);
                            $('#discussion_category').selectpicker('refresh');
                            showTable();
                            $(MODAL_LG).modal('hide');
                        }
                    }
                });
            }
        });

    });

    $('#save-category').click(function() {
        var url = "{{ route('discussion-category.store') }}";
        $.easyAjax({
            url: url,
            container: '#createTaskCategory',
            disableButton: true,
            blockUI: true,
            buttonSelector: "#save-category",
            type: "POST",
            data: $('#createTaskCategory').serialize(),
            success: function(response) {
                if (response.status == 'success') {
                    $('#discussion_category').html(response.data);
                    $('#discussion_category').selectpicker('refresh');
                    $(MODAL_LG).modal('hide');
                }
            }
        })
    });

    $('[contenteditable=true]').focus(function() {
        $(this).data("initialText", $(this).html());
        let rowId = $(this).data('row-id');
    }).blur(function() {
        if ($(this).data("initialText") !== $(this).html()) {
            let id = $(this).data('row-id');
            let value = $(this).html();

            var url = "{{ route('discussion-category.update', ':id') }}";
            url = url.replace(':id', id);

            var token = "{{ csrf_token() }}";

            $.easyAjax({
                url: url,
                container: '#row-' + id,
                type: "POST",
                data: {
                    'name': value,
                    '_token': token,
                    '_method': 'PUT'
                },
                blockUI: true,
                success: function(response) {
                    if (response.status == 'success') {
                        $('#discussion_category').html(response.data);
                        $('#discussion_category').selectpicker('refresh');
                    }
                }
            })
        }
    });

</script>
