

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

        <div id="table-actions" class="flex-grow-1 align-items-center">

        </div>
    </div>

    <div class="w-task-board-panel d-flex" id="taskboard-columns">
    </div>
</div>
<!-- CONTENT WRAPPER END -->

<script src="{{ asset('vendor/jquery/dragula.js') }}"></script>

<script>
    $(document).ready(function() {
        function loadData() {


            var startDate = null;
            var endDate = null;


            var url = "{{ route('taskboards.index') }}?startDate=" + encodeURIComponent(startDate) +
                '&endDate=' +
                encodeURIComponent(endDate) ;

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


            var startDate = null;
            var endDate = null;

            var url = "{{ route('taskboards.load_more') }}?startDate=" + encodeURIComponent(
                    startDate) +
                '&endDate=' +
                encodeURIComponent(endDate) +  '&columnId=' + columnId +
                '&currentTotalTasks=' +
                currentTotalTasks +
                '&totalTasks=' + totalTasks;

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
