@extends('layouts.app')

@section('content')

    <!-- SETTINGS START -->
    <div class="w-100 d-flex ">

        <x-setting-sidebar :activeMenu="$activeSettingMenu" />

        <x-setting-card>

            <x-slot name="buttons">
                <div class="row">
                    <div class="col-md-12 mb-2">
                        <x-forms.button-primary icon="plus" id="addNewLeaveType" class="addNewLeaveType mb-2">
                            @lang('app.addNew') @lang('app.address')
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
            <div class="col-lg-12 col-md-12 ntfcn-tab-content-left w-100 p-4">

                <div class="table-responsive">
                    <x-table class="table-bordered">
                        <x-slot name="thead">
                            <th>#</th>
                            <th>@lang('app.location')</th>
                            <th>@lang('app.address')</th>
                            <th>@lang('modules.invoices.taxName')</th>
                            <th>@lang('app.default')</th>
                            <th class="text-right">@lang('app.action')</th>
                        </x-slot>

                        @forelse($companyAddresses as $key => $address)
                            <tr id="address-{{ $address->id }}">
                                <td>
                                    {{ $key + 1 }}
                                </td>
                                <td> {{ $address->location }}</td>
                                <td> {!! nl2br($address->address) !!}</td>
                                <td> {{ ($address->tax_number) ? $address->tax_name . ' : ' . $address->tax_number : '' }}</td>
                                <td>
                                    <x-forms.radio fieldId="company_address_{{ $address->id }}"
                                        class="set_default" data-address-id="{{ $address->id }}"
                                        :fieldLabel="__('app.default')" fieldName="default_address"
                                        fieldValue="{{ $address->id }}"
                                        :checked="($address->is_default) ? 'checked' : ''">
                                    </x-forms.radio>
                                </td>
                                <td class="text-right">
                                    <div class="task_view">
                                        <a href="javascript:;" data-address-id="{{ $address->id }}"
                                            class="editNewLeaveType task_view_more d-flex align-items-center justify-content-center">
                                            <i class="fa fa-edit icons mr-1"></i> @lang('app.edit')
                                        </a>
                                    </div>
                                    @if (!$address->is_default)
                                        <div class="task_view mt-1 mt-lg-0 mt-md-0 ml-1">
                                            <a href="javascript:;" data-address-id="{{ $address->id }}"
                                                class="delete-category task_view_more d-flex align-items-center justify-content-center">
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
            <!-- LEAVE SETTING END -->

        </x-setting-card>

    </div>
    <!-- SETTINGS END -->

@endsection

@push('scripts')

    <script>
        $('body').on('click', '.delete-category', function() {

            var id = $(this).data('address-id');

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

                    var url = "{{ route('business-address.destroy', ':id') }}";
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
                                $('#address-' + id).fadeOut();
                            }
                        }
                    });
                }
            });
        });

        $('body').on('click', '.set_default', function() {
            var addressId = $(this).data('address-id');
            var token = "{{ csrf_token() }}";

            $.easyAjax({
                url: "{{ route('business-address.set_default') }}",
                type: "POST",
                data: {
                    addressId: addressId,
                    _token: token
                },
                blockUI: true,
                container: "#nav-tabContent",
                success: function(response) {
                    if (response.status == "success") {
                        window.location.reload();
                    }
                }
            });
        });
        
        // add new leave type
        $('#addNewLeaveType').click(function() {
            var url = "{{ route('business-address.create') }}";
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });

        $(MODAL_LG).on('shown.bs.modal', function() {
            $('#page_reload').val('true')
        })

        // add new leave type
        $('.editNewLeaveType').click(function() {

            var id = $(this).data('address-id');

            var url = "{{ route('business-address.edit', ':id') }}";
            url = url.replace(':id', id);

            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });
    </script>
@endpush
