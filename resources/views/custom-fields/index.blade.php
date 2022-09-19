@extends('layouts.app')

@push('styles')

@include('sections.datatable_css')
<style>
    .value-list li {
        list-style: disc;
    }
</style>

@endpush

@section('content')

    <!-- SETTINGS START -->
    <div class="w-100 d-flex">

        <x-setting-sidebar :activeMenu="$activeSettingMenu" />

        <x-setting-card>

            <x-slot name="buttons">
                <div class="row">
                    <div class="col-md-12 mb-2">
                        <x-forms.button-primary icon="plus" id="add-field" class="mb-2"> @lang('modules.customFields.addField')
                        </x-forms.button-primary>
                    </div>
                </div>
            </x-slot>

            <x-slot name="header">
                <div class="s-b-n-header" id="tabs">
                    <h2 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                        @lang($pageTitle)</h2>
                </div>
            </x-slot>

            <!-- LEAVE SETTING START -->
            <div class="col-lg-12 col-md-12 ntfcn-tab-content-left">
                <x-table class="table w-100 table-sm-responsive">
                    <x-slot name="thead">
                        <th>#</th>
                        <th>@lang('app.module')</th>
                        <th>@lang('modules.customFields.label')</th>
                        <th>@lang('app.name')</th>
                        <th>@lang('modules.invoices.type')</th>
                        <th>@lang('app.value')</th>
                        <th>@lang('app.required')</th>
                        <th class="text-right">@lang('app.action')</th>
                    </x-slot>
                </x-table>
            </div>
            <!-- LEAVE SETTING END -->

        </x-setting-card>

    </div>
    <!-- SETTINGS END -->

@endsection

@push('scripts')

<script src="{{ asset('vendor/datatables/jquery.dataTables.min.js') }}"></script>
<script src="{{ asset('vendor/datatables/dataTables.bootstrap4.min.js') }}"></script>
<script src="{{ asset('vendor/datatables/dataTables.buttons.min.js') }}"></script>
<script src="{{ asset('vendor/datatables/buttons.bootstrap4.min.js') }}"></script>
<script src="{{ asset('vendor/datatables/buttons.server-side.js') }}"></script>

<script>

    $(function() {

        var table = $('#example').dataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            ajax: '{!! route('custom-fields.index') !!}',
            order: [[ 0, "asc" ]],
            deferRender: true,
            language: {
                "url": "<?php echo __("app.datatable") ?>"
            },
            "fnDrawCallback": function( oSettings ) {
                $("body").tooltip({
                    selector: '[data-toggle="tooltip"]'
                });
            },
            columns: [
                {data: 'id', name: 'id', orderable: true, searchable: false, visible:false},
                {data: 'module', name: 'custom_field_groups.name', orderable: true, searchable: true},
                {data: 'label', name: 'label', orderable: true, searchable: true},
                {data: 'name', name: 'name', orderable: true, searchable: true},
                {data: 'type', name: 'type', orderable: true, searchable: true},
                {data: 'values', name: 'values', orderable: true, searchable: true},
                {data: 'required', name: 'required', orderable: true, searchable: true},
                {data: 'action', name: 'action', orderable: false, searchable: false, width: "25%", className: "text-right"}
            ]
        });

        $('body').on('click', '.sa-params', function(){
            var id = $(this).data('user-id');

            Swal.fire({
                title: "@lang('messages.sweetAlertTitle')",
                text: "@lang('messages.deleteField')",
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

                    var url = "{{ route('custom-fields.destroy',':id') }}";
                    url = url.replace(':id', id);

                    var token = "{{ csrf_token() }}";

                    $.easyAjax({
                        type: 'POST',
                        url: url,
                        blockUI: true,
                        data: {'_token': token, '_method': 'DELETE'},
                        success: function (response) {
                            if (response.status == "success") {
                                $.unblockUI();
                                table._fnDraw();
                            }
                        }
                    });
                }
            });
        });

    });

    $('body').on('click', '#add-field', function() {
        var url = "{{ route('custom-fields.create')}}";
        $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
        $.ajaxModal(MODAL_LG, url);
    });

    $('body').on('click', '.edit-custom-field', function() {
        var id = $(this).data('user-id');
        var url = "{{ route('custom-fields.edit',':id') }}";
        url = url.replace(':id', id);
        $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
        $.ajaxModal(MODAL_LG, url);
    });

</script>
@endpush
