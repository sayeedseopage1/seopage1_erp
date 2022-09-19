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
                            @lang('app.addNew') @lang('modules.leaves.leaveType')
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

                <div class="form-group">
                    <div class="d-block d-lg-flex d-md-flex">
                        <x-forms.radio fieldId="login-yes" :fieldLabel="__('modules.leaves.countLeavesFromDateOfJoining')"
                            fieldName="leaves_start_from" fieldValue="joining_date"
                            :checked="global_setting()->leaves_start_from == 'joining_date'">
                        </x-forms.radio>
                        <x-forms.radio fieldId="login-no" :fieldLabel="__('modules.leaves.countLeavesFromStartOfYear')"
                            fieldValue="year_start" fieldName="leaves_start_from"
                            :checked="global_setting()->leaves_start_from == 'year_start'">
                        </x-forms.radio>
                    </div>
                </div>

                <div class="table-responsive">
                    <x-table class="table-bordered">
                        <x-slot name="thead">
                            <th>@lang('modules.leaves.leaveType')</th>
                            <th>@lang('modules.leaves.noOfLeaves')</th>
                            <th>@lang('modules.leaves.monthLimit')</th>
                            <th>@lang('modules.leaves.leavePaidStatus')</th>
                            <th class="text-right">@lang('app.action')</th>
                        </x-slot>

                        @forelse($leaveTypes as $key=>$leaveType)
                            <tr id="type-{{ $leaveType->id }}">
                                <td>
                                    <p class="f-w-500 mb-0"><i class="fa fa-circle mr-1 text-yellow"
                                            style="color: {{ $leaveType->color }}"></i>{{ mb_ucwords($leaveType->type_name) }}
                                    </p>
                                </td>
                                <td> {{ $leaveType->no_of_leaves }}</td>
                                <td> {{ ($leaveType->monthly_limit > 0) ? $leaveType->monthly_limit : '--' }}</td>
                                <td>
                                    @if ($leaveType->paid == 1)
                                        @lang('modules.credit-notes.paid')
                                    @else
                                        @lang('modules.credit-notes.unpaid')
                                    @endif
                                </td>
                                <td class="text-right">
                                    <div class="task_view">
                                        <a href="javascript:;" data-leave-id="{{ $leaveType->id }}"
                                            class="editNewLeaveType task_view_more d-flex align-items-center justify-content-center">
                                            <i class="fa fa-edit icons mr-2"></i> @lang('app.edit')
                                        </a>
                                    </div>
                                    <div class="task_view mt-1 mt-lg-0 mt-md-0">
                                        <a href="javascript:;" data-leave-id="{{ $leaveType->id }}"
                                            class="delete-category task_view_more d-flex align-items-center justify-content-center">
                                            <i class="fa fa-trash icons mr-2"></i> @lang('app.delete')
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="4">
                                    <x-cards.no-record icon="list" :message="__('messages.noLeaveTypeAdded')" />
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

            var id = $(this).data('leave-id');

            Swal.fire({
                title: "@lang('messages.sweetAlertTitle')",
                text: "@lang('messages.deleteLeaveType')",
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

                    var url = "{{ route('leaveType.destroy', ':id') }}";
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
                                $('#type-' + id).fadeOut();
                            }
                        }
                    });
                }
            });
        });

        $('input[name=leaves_start_from]').click(function() {
            var leaveCountFrom = $('input[name=leaves_start_from]:checked').val();
            $.easyAjax({
                url: "{{ route('leaves-settings.store') }}",
                type: "POST",
                data: {
                    '_token': '{{ csrf_token() }}',
                    'leaveCountFrom': leaveCountFrom
                }
            })
        });

        // add new leave type
        $('#addNewLeaveType').click(function() {
            var url = "{{ route('leaveType.create') }}";
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });

        $(MODAL_LG).on('shown.bs.modal', function () {
            $('#page_reload').val('true')
        })

        // add new leave type
        $('.editNewLeaveType').click(function() {

            var id = $(this).data('leave-id');

            var url = "{{ route('leaveType.edit', ':id ') }}";
            url = url.replace(':id', id);

            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });

    </script>
@endpush
