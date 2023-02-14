@php
$addTaskPermission = ($project->project_admin == user()->id) ? 'all' : user()->permission('add_tasks');
$viewUnassignedTasksPermission = ($project->project_admin == user()->id) ? 'all' : user()->permission('view_unassigned_tasks');
$projectArchived = $project->trashed();
@endphp

<!-- ROW START -->
<div class="row py-5">
    <div class="col-lg-12 col-md-12 mb-4 mb-xl-0 mb-lg-4">
        <!-- Add Task Export Buttons Start -->
        @if ($projectArchived)
            <x-alert type="info" icon="info-circle">@lang('messages.archivedTaskNotWork')</x-alert>
        @endif
       
        @if($project->project_status == 'Accepted')
        @php
           $project_creation_date= $project->created_at;
           $current_date= \Carbon\Carbon::now();
           $diff_in_minutes = $current_date->diffInMinutes($project_creation_date); 
          //dd($project_creation_date, $current_date, $diff_in_minutes);
        @endphp
        @if(Auth::user()->role_id == 4 || Auth::user()->role_id == 6)
        @php
        $signature= App\Models\ContractSign::where('project_id',$project->id)->first();
     @endphp
     @if($diff_in_minutes < 2880 && $signature == null)
     <div class="d-flex" id="table-actions">
        @if (($addTaskPermission == 'all' || $addTaskPermission == 'added' || $project->project_admin == user()->id) && !$projectArchived)
            <x-forms.link-primary :link="route('tasks.create').'?task_project_id='.$project->id"
                class="mr-3 openRightModal" icon="plus" data-redirect-url="{{ url()->full() }}">
                @lang('app.add')
                @lang('app.task')
            </x-forms.link-primary>
        @endif
    </div> 

    @elseif($diff_in_minutes >= 2880 && $signature != null)
    <div class="d-flex" id="table-actions">
        @if (($addTaskPermission == 'all' || $addTaskPermission == 'added' || $project->project_admin == user()->id) && !$projectArchived)
            <x-forms.link-primary :link="route('tasks.create').'?task_project_id='.$project->id"
                class="mr-3 openRightModal" icon="plus" data-redirect-url="{{ url()->full() }}">
                @lang('app.add')
                @lang('app.task')
            </x-forms.link-primary>
        @endif
    </div> 

    @else 
    <div class="d-flex" id="table-actions">
        <button id="task-disable" class="btn-primary rounded f-14 p-2 mr-3 float-left">
            <svg class="svg-inline--fa fa-plus fa-w-14 mr-1" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg><!-- <i class="fa fa-plus mr-1"></i> Font Awesome fontawesome.com -->
        Add Task
        </button>
    </div>

     @endif
    
     
         
     
     @else 
     <div class="d-flex" id="table-actions">
        @if (($addTaskPermission == 'all' || $addTaskPermission == 'added' || $project->project_admin == user()->id) && !$projectArchived)
            <x-forms.link-primary :link="route('tasks.create').'?task_project_id='.$project->id"
                class="mr-3 openRightModal" icon="plus" data-redirect-url="{{ url()->full() }}">
                @lang('app.add')
                @lang('app.task')
            </x-forms.link-primary>
        @endif
    </div>

        @endif
        @endif
       
       
        <!-- Add Task Export Buttons End -->


        <div class="d-flex justify-content-between">
            <form action="" class="flex-grow-1 " id="filter-form">
                <div class="d-flex mt-3">
                    <!-- STATUS START -->
                    <div class="select-box py-2 px-0 mr-3">
                        <x-forms.label :fieldLabel="__('app.status')" fieldId="status" />
                        <select class="form-control select-picker" name="status" id="status">
                            <option value="not finished">@lang('modules.tasks.hideCompletedTask')</option>
                            <option value="all">@lang('app.all')</option>
                            @foreach ($taskBoardStatus as $status)
                                <option value="{{ $status->id }}">{{ $status->slug == 'completed' || $status->slug == 'incomplete' ? __('app.' . $status->slug) : mb_ucwords($status->column_name) }}</option>
                            @endforeach
                        </select>
                    </div>
                    <!-- STATUS END -->

                    <!-- STATUS START -->
                    <div class="select-box py-2 px-0 mr-3">
                        <x-forms.label :fieldLabel="__('modules.tasks.assignTo')" fieldId="assignedTo" />
                        <select class="form-control select-picker" id="assignedTo" data-live-search="true"
                        data-container="body" data-size="8">
                            <option value="all">@lang('app.all')</option>
                            @foreach ($project->membersMany as $employee)
                                <option
                                    data-content="<div class='d-inline-block mr-1'><img class='taskEmployeeImg rounded-circle' src='{{ $employee->image_url }}' ></div> {{ ucfirst($employee->name) }}"
                                    value="{{ $employee->id }}">{{ mb_ucwords($employee->name) }}</option>
                            @endforeach
                            @if ($viewUnassignedTasksPermission == 'all')
                                <option value="unassigned">@lang('modules.tasks.unassigned')</option>
                            @endif
                        </select>
                    </div>
                    <!-- STATUS END -->

                    <!-- STATUS START -->
                    <div class="select-box py-2 px-0 mr-3">
                        <x-forms.label :fieldLabel="__('modules.projects.milestones')" fieldId="milestone_id" />
                        <select class="form-control select-picker" id="milestone_id" data-live-search="true" data-container="body" data-size="8">
                            <option value="all">@lang('app.all')</option>
                            @foreach ($project->milestones as $milestone)
                                <option value="{{ $milestone->id }}">{{ $milestone->milestone_title }}</option>
                            @endforeach
                        </select>
                    </div>
                    <!-- STATUS END -->


                    <!-- SEARCH BY TASK START -->
                    <div class="select-box py-2 px-lg-2 px-md-2 px-0 mr-3">
                        <x-forms.label fieldId="status" />
                        <div class="input-group bg-grey rounded">
                            <div class="input-group-prepend">
                                <span class="input-group-text bg-additional-grey">
                                    <i class="fa fa-search f-13 text-dark-grey"></i>
                                </span>
                            </div>
                            <input type="text" class="form-control f-14 p-1 height-35 border" id="search-text-field"
                                placeholder="@lang('app.startTyping')">
                        </div>
                    </div>
                    <!-- SEARCH BY TASK END -->

                    <!-- RESET START -->
                    <div class="select-box d-flex py-2 px-lg-2 px-md-2 px-0 mt-4">
                        <x-forms.button-secondary class="btn-xs d-none height-35" id="reset-filters"
                            icon="times-circle">
                            @lang('app.clearFilters')
                        </x-forms.button-secondary>
                    </div>
                    <!-- RESET END -->
                </div>
            </form>

            {{-- <x-datatable.actions class="mt-5">
                <div class="select-status mr-3 pl-3">
                    <select name="action_type" class="form-control select-picker" id="quick-action-type" disabled>
                        <option value="">@lang('app.selectAction')</option>
                        <option value="change-status">@lang('modules.tasks.changeStatus')</option>
                        <option value="delete">@lang('app.delete')</option>
                    </select>
                </div>
                <div class="select-status mr-3 d-none quick-action-field" id="change-status-action">
                    <select name="status" class="form-control select-picker">
                        @foreach ($taskBoardStatus as $status)
                            <option value="{{ $status->id }}">{{ $status->slug == 'completed' || $status->slug == 'incomplete' ? __('app.' . $status->slug) : mb_ucwords($status->column_name) }}</option>
                        @endforeach
                    </select>
                </div>
            </x-datatable.actions> --}}
        </div>


        <!-- Task Box Start -->
        <div class="d-flex flex-column w-tables rounded mt-3 bg-white">

            {!! $dataTable->table(['class' => 'table table-hover border-0 w-100']) !!}

        </div>
        <!-- Task Box End -->

    </div>

</div>
<!-- ROW END -->
@include('sections.datatable_js')

<script>
    $('#allTasks-table').on('preXhr.dt', function(e, settings, data) {

        var projectID = "{{ $project->id }}";
        var status = $('#status').val();
        var searchText = $('#search-text-field').val();
        var assignedTo = $('#assignedTo').val();
        var trashedData = "{{ $project->trashed() == 1 ? 'true' : 'false' }}";
        var milestone_id = $('#milestone_id').val();
        data['projectId'] = projectID;
        data['status'] = status;
        data['assignedTo'] = assignedTo;
        data['searchText'] = searchText;
        data['trashedData'] = trashedData;
        data['milestone_id'] = milestone_id;
        data['project_admin'] = "{{ ($project->project_admin == user()->id) ? 1 : 0 }}";
    });
    const showTable = () => {
        window.LaravelDataTables["allTasks-table"].draw();
    }

    $('#status, #search-text-field, #assignedTo, #milestone_id')
        .on('change keyup',
            function() {
                if ($('#status').val() != "not finished") {
                    $('#reset-filters').removeClass('d-none');
                    showTable();
                } else if ($('#search-text-field').val() != "") {
                    $('#reset-filters').removeClass('d-none');
                    showTable();
                } else if ($('#assignedTo').val() != "all") {
                    $('#reset-filters').removeClass('d-none');
                    showTable();
                } else if ($('#milestone_id').val() != "all") {
                    $('#reset-filters').removeClass('d-none');
                    showTable();
                }else {
                    $('#reset-filters').addClass('d-none');
                    showTable();
                }
            });

    $('#reset-filters').click(function() {
        $('#filter-form')[0].reset();
        $('#filter-form #status').val('not finished');
        $('#filter-form .select-picker').selectpicker("refresh");
        $('#reset-filters').addClass('d-none');
        showTable();
    });

    $('#reset-filters-2').click(function() {
        $('#filter-form')[0].reset();

        $('.filter-box #status').val('not finished');
        $('.filter-box .select-picker').selectpicker("refresh");
        $('#reset-filters').addClass('d-none');
        showTable();
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
                var url = "{{ route('tasks.destroy', ':id') }}";
                url = url.replace(':id', id);

                var token = "{{ csrf_token() }}";

                $.easyAjax({
                    type: 'POST',
                    url: url,
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

    $('#allTasks-table').on('change', '.change-status', function() {
        var url = "{{ route('tasks.change_status') }}";
        var token = "{{ csrf_token() }}";
        var id = $(this).data('task-id');
        var status = $(this).val();

        if (id != "" && status != "") {
            $.easyAjax({
                url: url,
                type: "POST",
                data: {
                    '_token': token,
                    taskId: id,
                    status: status,
                    sortBy: 'id'
                },
                success: function(data) {
                    window.LaravelDataTables["allTasks-table"].draw();
                }
            });

        }
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

    $('#task-disable').click(function() {
        
       
            Swal.fire({
                title: "@lang('You cannot assign task as client of the project did not sign the deliverables.')",
                text: "@lang('')",
                icon: 'error',
                showCancelButton: true,
                focusConfirm: false,
                
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
            });

        } 
    );
    $('#task-disable2').click(function() {
        
       
        Swal.fire({
            title: "@lang('You cannot assign task as client of the project did not sign the deliverables.')",
            text: "@lang('')",
            icon: 'error',
            showCancelButton: true,
            focusConfirm: false,
            
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
        });

    } 
);


    const applyQuickAction = () => {
        var rowdIds = $("#allTasks-table input:checkbox:checked").map(function() {
            return $(this).val();
        }).get();

        var url = "{{ route('tasks.apply_quick_action') }}?row_ids=" + rowdIds;

        $.easyAjax({
            url: url,
            container: '#quick-action-form',
            type: "POST",
            disableButton: true,
            buttonSelector: "#quick-action-apply",
            data: $('#quick-action-form').serialize(),
            success: function(response) {
                if (response.status == 'success') {
                    showTable();
                    resetActionButtons();
                    deSelectAll();
                }
            }
        })
    };
</script>
