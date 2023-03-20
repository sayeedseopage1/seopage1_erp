@php
$addTaskPermission = ($project->project_admin == user()->id) ? 'all' : user()->permission('add_tasks');
@endphp

<link rel='stylesheet' href="{{ asset('vendor/css/dragula.css') }}" type='text/css' />
<link rel='stylesheet' href="{{ asset('vendor/css/drag.css') }}" type='text/css' />
<link rel="stylesheet" href="{{ asset('vendor/css/bootstrap-colorpicker.css') }}" />
<style>
    #colorpicker .form-group {
        width: 87%;
    }

    .b-p-tasks {
        min-height: 100px;
    }

    .content-wrapper {
        padding: 0;
    }

</style>

<!-- CONTENT WRAPPER START -->
<div class="w-task-board-box px-4 py-2 pt-3 bg-white">
    <!-- Add Task Export Buttons Start -->
    <div class="d-block d-lg-flex d-md-flex my-3">

        <x-alert type="warning" icon="info" class="d-lg-none">@lang('messages.dragDropScreenInfo')</x-alert>
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
     {{-- @if ($signature != null)
        <div id="table-actions" class="flex-grow-1 align-items-center">
            @if (($addTaskPermission == 'all' || $addTaskPermission == 'added') && !$project->trashed())
                <x-forms.link-primary :link="route('tasks.create').'?project_id='.$project->id"
                    class="mr-3 openRightModal float-left" icon="plus" data-redirect-url="{{ url()->full() }}">
                    @lang('app.add')
                    @lang('app.task')
                </x-forms.link-primary>
            @endif
            @if (user()->permission('change_status') == 'all' && !$project->trashed())
                <x-forms.button-secondary icon="plus" id="add-column">
                    @lang('modules.tasks.addBoardColumn')
                </x-forms.button-secondary>
            @endif
        </div>
        @endif  --}}
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
        @endif
        @endif
    </div>

    <div class="w-task-board-panel d-flex" id="taskboard-columns">
    </div>
</div>
<!-- CONTENT WRAPPER END -->

<script src="{{ asset('vendor/jquery/dragula.js') }}"></script>

<script>
    $(document).ready(function() {
        function loadData() {

            var projectID = "{{ $project->id }}";
            var startDate = null;
            var endDate = null;
            var projectAdmin = "{{ ($project->project_admin == user()->id) ? 1 : 0 }}";

            var url = "{{ route('taskboards.index') }}?startDate=" + encodeURIComponent(startDate) +
                '&endDate=' +
                encodeURIComponent(endDate) + '&projectID=' + projectID + '&project_admin=' + projectAdmin;

            $.easyAjax({
                url: url,
                container: '#taskboard-columns',
                type: "GET",
                success: function(response) {
                    if (response.status == 'success') {
                        $('#taskboard-columns').html(response.view);
                        $("body").tooltip({
                            selector: '[data-toggle="tooltip"]'
                        });                        
                    }
                }
            });
        }

        $('body').on('click', '.load-more-tasks', function() {
            var columnId = $(this).data('column-id');
            var totalTasks = $(this).data('total-tasks');
            var currentTotalTasks = $('#drag-container-' + columnId + ' .task-card').length;

            var projectID = "{{ $project->id }}";
            var startDate = null;
            var endDate = null;

            var url = "{{ route('taskboards.load_more') }}?startDate=" + encodeURIComponent(
                    startDate) +
                '&endDate=' +
                encodeURIComponent(endDate) + '&projectID=' + projectID + '&columnId=' + columnId +
                '&currentTotalTasks=' +
                currentTotalTasks +
                '&totalTasks=' + totalTasks + '&project_admin=' + projectAdmin;

            $.easyAjax({
                url: url,
                container: '#drag-container-' + columnId,
                blockUI: true,
                type: "GET",
                success: function(response) {
                    $('#drag-container-' + columnId).append(response.view);
                    if (response.load_more == 'show') {
                        $('#drag-container-' + columnId).closest('.b-p-body').find(
                            '.load-more-tasks');

                    } else {
                        $('#drag-container-' + columnId).closest('.b-p-body').find(
                                '.load-more-tasks')
                            .remove();
                    }

                    $("body").tooltip({
                        selector: '[data-toggle="tooltip"]'
                    });
                }
            });

        });

        var elem = document.getElementById("fullscreen");

        function openFullscreen() {
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
                elem.classList.add("full");
            } else if (elem.mozRequestFullScreen) {
                /* Firefox */
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) {
                /* Chrome, Safari & Opera */
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) {
                /* IE/Edge */
                elem.msRequestFullscreen();
            }
        }

        $('#add-column').click(function() {
            const url = "{{ route('taskboards.create') }}";
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });

        $('body').on('click', '.edit-column', function() {
            var id = $(this).data('column-id');
            var url = "{{ route('taskboards.edit', ':id') }}";
            url = url.replace(':id', id);

            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });

        $('body').on('click', '.delete-column', function() {
            var id = $(this).data('column-id');
            var url = "{{ route('taskboards.destroy', ':id') }}";
            url = url.replace(':id', id);

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
                        url: url,
                        type: 'POST',
                        data: {
                            '_token': '{{ csrf_token() }}',
                            '_method': 'DELETE'
                        },
                        success: function(response) {
                            if (response.status == 'success') {
                                window.location.reload();
                            }
                        }
                    });
                }
            });

        });

        $('body').on('click', '.collapse-column', function() {
            var boardColumnId = $(this).data('column-id');
            var type = $(this).data('type');

            $.easyAjax({
                url: "{{ route('taskboards.collapse_column') }}",
                type: 'POST',
                container: '#taskboard-columns',
                blockUI: true,
                data: {
                    boardColumnId: boardColumnId,
                    type: type,
                    '_token': '{{ csrf_token() }}'
                },
                success: function(response) {
                    if (response.status == 'success') {
                        loadData();
                    }
                }
            });
        });

        //pusher
        if ((pusher_setting.status === 1 && pusher_setting.taskboard === 1) || (pusher_setting.status == "1" && pusher_setting.taskboard == "1")) {

            var channel = pusher.subscribe('task-updated-channel');
            channel.bind('task-updated', function(data) {
                loadData()
            });
        }

        loadData();
    });
</script>
