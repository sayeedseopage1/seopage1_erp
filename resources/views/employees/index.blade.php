@extends('layouts.app')

@push('datatable-styles')
    @include('sections.datatable_css')
@endpush

@section('filter-section')

    <x-filters.filter-box>
        <!-- CLIENT START -->
        <div class="select-box py-2 d-flex pr-2 border-right-grey border-right-grey-sm-0">
            <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('app.employee')</p>
            <div class="select-status">
                <select class="form-control select-picker" name="employee" id="employee" data-live-search="true"
                    data-size="8">
                    @if ($employees->count() > 1)
                        <option value="all">@lang('app.all')</option>
                    @endif
                    @foreach ($employees as $employee)
                        <option
                            data-content="<div class='d-inline-block mr-1'><img class='taskEmployeeImg rounded-circle' src='{{ $employee->image_url }}' ></div> {{ ucfirst($employee->name) }}"
                            value="{{ $employee->id }}">{{ ucfirst($employee->name) }}</option>
                    @endforeach
                </select>
            </div>
        </div>

        <!-- CLIENT END -->

        <!-- DESIGNATION START -->
        <div class="select-box d-flex py-2 px-lg-2 px-md-2 px-0 border-right-grey border-right-grey-sm-0">
            <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('app.designation')</p>
            <div class="select-status">
                <select class="form-control select-picker" name="designation" id="designation">
                    <option value="all">@lang('app.all')</option>
                    @foreach ($designations as $designation)
                        <option value="{{ $designation->id }}">{{ ucfirst($designation->name) }}</option>
                    @endforeach
                </select>
            </div>
        </div>
        <!-- DESIGNATION END -->


        <!-- SEARCH BY TASK START -->
        <div class="task-search d-flex  py-1 px-lg-3 px-0 border-right-grey align-items-center">
            <form class="w-100 mr-1 mr-lg-0 mr-md-1 ml-md-1 ml-0 ml-lg-0">
                <div class="input-group bg-grey rounded">
                    <div class="input-group-prepend">
                        <span class="input-group-text border-0 bg-additional-grey">
                            <i class="fa fa-search f-13 text-dark-grey"></i>
                        </span>
                    </div>
                    <input type="text" class="form-control f-14 p-1 border-additional-grey" id="search-text-field"
                        placeholder="@lang('app.startTyping')">
                </div>
            </form>
        </div>
        <!-- SEARCH BY TASK END -->

        <!-- RESET START -->
        <div class="select-box d-flex py-1 px-lg-2 px-md-2 px-0">
            <x-forms.button-secondary class="btn-xs d-none" id="reset-filters" icon="times-circle">
                @lang('app.clearFilters')
            </x-forms.button-secondary>
        </div>
        <!-- RESET END -->

        <!-- MORE FILTERS START -->
        <x-filters.more-filter-box>
            <div class="more-filter-items">
                <label class="f-14 text-dark-grey mb-12 text-capitalize" for="usr">@lang('app.department')</label>
                <div class="select-filter mb-4">
                    <div class="select-others">
                        <select class="form-control select-picker" name="department"  data-container="body" id="department">
                            <option value="all">@lang('app.all')</option>
                            @foreach ($departments as $department)
                                <option value="{{ $department->id }}">{{ ucfirst($department->team_name) }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
            </div>

            <div class="more-filter-items">
                <label class="f-14 text-dark-grey mb-12 text-capitalize" for="usr">@lang('modules.employees.role')</label>
                <div class="select-filter mb-4">
                    <div class="select-others">
                        <select class="form-control select-picker" name="role" id="role" data-container="body">
                            <option value="all">@lang('app.all')</option>
                            @foreach ($roles as $role)
                                @if ($role->id <= 3)
                                    <option value="{{ $role->id }}">{{ __('app.' . $role->name) }}</option>
                                @else
                                    <option value="{{ $role->id }}">{{ ucfirst($role->name) }}</option>
                                @endif
                            @endforeach
                        </select>
                    </div>
                </div>
            </div>

            <div class="more-filter-items">
                <label class="f-14 text-dark-grey mb-12 text-capitalize" for="usr">@lang('app.status')</label>
                <div class="select-filter mb-4">
                    <div class="select-others">
                        <select class="form-control select-picker" name="status" id="status" data-container="body">
                            <option value="all">@lang('app.all')</option>
                            <option selected value="active">@lang('app.active')</option>
                            <option value="deactive">@lang('app.inactive')</option>
                            <option {{ request('status') == 'ex_employee' ? 'selected' : '' }} value="ex_employee">
                                @lang('modules.employees.exEmployee')</option>
                        </select>
                    </div>
                </div>
            </div>

        </x-filters.more-filter-box>
        <!-- MORE FILTERS END -->
    </x-filters.filter-box>

@endsection

@php
$addEmployeePermission = user()->permission('add_employees');
$addDesignationPermission = user()->permission('add_designation');
$viewDesignationPermission = user()->permission('view_designation');
@endphp

@section('content')
    <!-- CONTENT WRAPPER START -->
    <div class="content-wrapper">
        <!-- Add Task Export Buttons Start -->
        <div class="d-flex justify-content-between action-bar">

            <div id="table-actions" class="d-block d-lg-flex align-items-center">
                @if ($addEmployeePermission == 'all')
                    <x-forms.link-primary :link="route('employees.create')" class="mr-3 openRightModal" icon="plus">
                        @lang('app.add')
                        @lang('app.employee')
                    </x-forms.link-primary>

                    <x-forms.button-secondary class="mr-3 invite-member mb-2 mb-lg-0" icon="plus">
                        @lang('app.invite') @lang('app.employee')
                    </x-forms.button-secondary>
                @endif

                @if ($addEmployeePermission == 'all')
                    <x-forms.link-secondary :link="route('employees.import')" class="mr-3 openRightModal mb-2 mb-lg-0" icon="file-upload">
                        @lang('app.importExcel')
                    </x-forms.link-secondary>
                @endif
            </div>

            <x-datatable.actions>
                <div class="select-status mr-3 pl-3">
                    <select name="action_type" class="form-control select-picker" id="quick-action-type" disabled>
                        <option value="">@lang('app.selectAction')</option>
                        <option value="change-status">@lang('modules.tasks.changeStatus')</option>
                        <option value="delete">@lang('app.delete')</option>
                    </select>
                </div>
                <div class="select-status mr-3 d-none quick-action-field" id="change-status-action">
                    <select name="status" class="form-control select-picker">
                        <option value="deactive">@lang('app.inactive')</option>
                        <option value="active">@lang('app.active')</option>
                    </select>
                </div>
            </x-datatable.actions>

        </div>
        <!-- Add Task Export Buttons End -->
        <!-- Task Box Start -->
        <div class="d-flex flex-column w-tables rounded mt-3 bg-white">

            {!! $dataTable->table(['class' => 'table table-hover border-0 w-100']) !!}

        </div>
        <!-- Task Box End -->
    </div>
    <!-- CONTENT WRAPPER END -->

@endsection

@push('scripts')
    @include('sections.datatable_js')

    <script>

        var startDate = null;
        var endDate = null;
        var lastStartDate = null;
        var lastEndDate = null;

        @if(request('startDate') != '' && request('endDate') != '' )
            startDate = '{{ request("startDate") }}';
            endDate = '{{ request("endDate") }}';
        @endif

        @if(request('lastStartDate') !=='' && request('lastEndDate') !=='' )
            lastStartDate = '{{ request("lastStartDate") }}';
            lastEndDate = '{{ request("lastEndDate") }}';
        @endif

        $('#employees-table').on('preXhr.dt', function(e, settings, data) {
            var status = $('#status').val();
            var employee = $('#employee').val();
            var role = $('#role').val();
            var skill = $('#skill').val();
            var designation = $('#designation').val();
            var department = $('#department').val();
            var searchText = $('#search-text-field').val();
            data['status'] = status;
            data['employee'] = employee;
            data['role'] = role;
            data['skill'] = skill;
            data['designation'] = designation;
            data['department'] = department;
            data['searchText'] = searchText;

            /* If any of these following filters are applied, then dashboard conditions will not work  */
            if(status == "all" || employee == "all" || role == "all"  || designation == "all" || searchText == ""){
                data['startDate'] = startDate;
                data['endDate'] = endDate;
                data['lastStartDate'] = lastStartDate;
                data['lastEndDate'] = lastEndDate;
            }

        });

        const showTable = () => {
            window.LaravelDataTables["employees-table"].draw();
        }

        $('#employee, #status, #search-text-field, #role, #skill, #designation, #department').on('change keyup',
            function() {
                if ($('#status').val() != "all") {
                    $('#reset-filters').removeClass('d-none');
                    showTable();
                } else if ($('#employee').val() != "all") {
                    $('#reset-filters').removeClass('d-none');
                    showTable();
                } else if ($('#role').val() != "all") {
                    $('#reset-filters').removeClass('d-none');
                    showTable();
                } else if ($('#designation').val() != "all") {
                    $('#reset-filters').removeClass('d-none');
                    showTable();
                } else if ($('#department').val() != "all") {
                    $('#reset-filters').removeClass('d-none');
                    showTable();
                } else if ($('#search-text-field').val() != "") {
                    $('#reset-filters').removeClass('d-none');
                    showTable();
                } else {
                    $('#reset-filters').addClass('d-none');
                    showTable();
                }
            });

        $('#reset-filters').click(function() {
            $('#filter-form')[0].reset();
            $('.filter-box .select-picker').selectpicker("refresh");
            $('#reset-filters').addClass('d-none');
            showTable();
        });

        $('#reset-filters-2').click(function() {
            $('#filter-form')[0].reset();
            $('.filter-box .select-picker').selectpicker("refresh");
            $('#reset-filters').addClass('d-none');
            showTable();
        });

        $('#quick-action-type').change(function() {
            const actionValue = $(this).val();
            if (actionValue != '') {
                $('#quick-action-apply').removeAttr('disabled');

                if (actionValue == 'change-status') {
                    $('.quick-action-field').addClass('d-none');
                    $('#change-status-action').removeClass('d-none');
                } else {
                    $('.quick-action-field').addClass('d-none');
                }
            } else {
                $('#quick-action-apply').attr('disabled', true);
                $('.quick-action-field').addClass('d-none');
            }
        });

        $('#quick-action-apply').click(function() {
            const actionValue = $('#quick-action-type').val();
            if (actionValue == 'delete') {
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
                        applyQuickAction();
                    }
                });

            } else {
                applyQuickAction();
            }
        });

        $('body').on('click', '.delete-table-row', function() {
            var id = $(this).data('user-id');
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
                    var url = "{{ route('employees.destroy', ':id') }}";
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
                                showTable();
                            }
                        }
                    });
                }
            });
        });

        const applyQuickAction = () => {
            var rowdIds = $("#employees-table input:checkbox:checked").map(function() {
                return $(this).val();
            }).get();

            var url = "{{ route('employees.apply_quick_action') }}?row_ids=" + rowdIds;

            $.easyAjax({
                url: url,
                container: '#quick-action-form',
                type: "POST",
                disableButton: true,
                buttonSelector: "#quick-action-apply",
                data: $('#quick-action-form').serialize(),
                blockUI: true,
                success: function(response) {
                    if (response.status == 'success') {
                        showTable();
                        resetActionButtons();
                        deSelectAll();
                    }
                }
            })
        };


        $('body').on('change', '.assign_role', function() {
            var id = $(this).data('user-id');
            var role = $(this).val();
            var token = "{{ csrf_token() }}";

            if (typeof id !== 'undefined') {
                $.easyAjax({
                    url: "{{ route('employees.assign_role') }}",
                    type: "POST",
                    blockUI: true,
                    container: '#employees-table',
                    data: {
                        role: role,
                        userId: id,
                        _token: token
                    },
                    
                    success: function(response) {
                        if (response.status == "success") {
                            window.LaravelDataTables["employees-table"].draw();
                        }
                    }
                })
            }

        });

        $('#designation-setting').click(function() {
            const url = "{{ route('designations.create') }}";
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        })

        $('.department-setting').click(function() {
            const url = "{{ route('departments.create') }}";
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });

        $('body').on('change', '.pm_enable_disable', function() {
            var pm_id = $(this).data('user-id');
            var status = $(this).val();
            var token = "{{ csrf_token() }}";

            if (typeof pm_id !== 'undefined') {
                $.easyAjax({
                    url: "{{ route('project-assign') }}",
                    type: "POST",
                    blockUI: true,
                    container: '#employees-table',
                    data: {
                        status: status,
                        id: pm_id,
                        _token: token
                    },
                    success: function(response) {
                        if (response.status == "success") {
                            window.LaravelDataTables["employees-table"].draw();
                        }
                    }
                })
            }
        });
    </script>
@endpush
