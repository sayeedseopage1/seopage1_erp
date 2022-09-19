<div id="task-detail-section">

    <div class="row">
        <div class="col-sm-12">
            <div class="card bg-white border-0 b-shadow-4">
                <div class="card-header bg-white  border-bottom-grey text-capitalize justify-content-between p-20">
                    <div class="row">
                        <div class="col-md-8">
                            <h3 class="heading-h1 mb-3">{{ $task->heading }}</h3>
                        </div>
                        <div class="col-md-4 text-right">
                            <div class="dropdown">
                                <button
                                    class="btn btn-lg f-14 px-2 py-1 text-dark-grey text-capitalize rounded  dropdown-toggle"
                                    type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fa fa-ellipsis-h"></i>
                                </button>

                                <div class="dropdown-menu dropdown-menu-right border-grey rounded b-shadow-4 p-0"
                                     aria-labelledby="dropdownMenuLink" tabindex="0">

                                    <a class="cursor-pointer d-block text-dark-grey f-13 px-3 py-2 openRightModal"
                                       href="{{ route('project-template-task.edit', $task->id) }}">@lang('app.edit')
                                        @lang('app.task')</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card-body">
                    <div class="col-12 px-0 pb-3 d-flex">
                        <p class="mb-0 text-lightest f-14 w-30 d-inline-block text-capitalize">@lang('app.project')</p>
                        <p class="mb-0 text-dark-grey f-14">
                            @if ($task->project_template_id)
                                    {{ $task->projectTemplate->project_name }}
                            @else
                                --
                            @endif
                        </p>

                    </div>
                    <div class="col-12 px-0 pb-3 d-flex">
                        <p class="mb-0 text-lightest f-14 w-30 d-inline-block text-capitalize">
                            @lang('modules.tasks.priority')</p>
                        <p class="mb-0 text-dark-grey f-14">
                            @if ($task->priority == 'high')
                                <i class="fa fa-circle mr-1 text-red f-10"></i>
                            @elseif ($task->priority == 'medium')
                                <i class="fa fa-circle mr-1 text-yellow f-10"></i>
                            @else
                                <i class="fa fa-circle mr-1 text-dark-green f-10"></i>
                            @endif
                            @lang($task->priority)
                        </p>
                    </div>

                    <div class="col-12 px-0 pb-3 d-flex">
                        <p class="mb-0 text-lightest f-14 w-30 d-inline-block text-capitalize">
                            @lang('modules.tasks.assignTo')</p>
                        <p class="mb-0 text-dark-grey f-14">
                        @foreach ($task->usersMany as $item)
                            <div class="taskEmployeeImg rounded-circle mr-1">
                                <a href="{{ route('employees.show', $item->id) }}">
                                    <img data-toggle="tooltip" data-original-title="{{ mb_ucwords($item->name) }}"
                                         src="{{ $item->image_url }}">
                                </a>
                            </div>
                            @endforeach
                            </p>
                    </div>

                    <x-cards.data-row :label="__('modules.tasks.taskCategory')"
                                      :value="$task->category->category_name ?? '--'" html="true" />
                    <x-cards.data-row :label="__('app.description')" :value="$task->description" html="true" />

                </div>
            </div>

            <!-- TASK TABS START -->
            <div class="bg-additional-grey rounded my-3">

                <a class="mb-0 d-block d-lg-none text-dark-grey s-b-mob-sidebar" onclick="openSettingsSidebar()"><i
                        class="fa fa-ellipsis-v"></i></a>

                <div class="s-b-inner s-b-notifications bg-white b-shadow-4 rounded">

                    <x-tab-section class="task-tabs">

                        <x-tab-item class="ajax-tab" :active="(request('view') === 'sub_task' || !request('view'))"
                                    link="#">
                            @lang('modules.tasks.subTask')</x-tab-item>
                    </x-tab-section>


                    <div class="s-b-n-content">
                        <div class="tab-content" id="nav-tabContent">
                            @include($tab)
                        </div>
                    </div>
                </div>

            </div>
            <!-- TASK TABS END -->

        </div>

    </div>

    <script>
        $(document).ready(function() {

            $('body').on('click', '.delete-subtask', function() {
                var id = $(this).data('row-id');
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
                        var url = "{{ route('project-template-sub-task.destroy', ':id') }}";
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
                                    $('#sub-task-list').html(response.view);
                                }
                            }
                        });
                    }
                });
            });

            $('body').on('click', '.edit-subtask', function() {
                var id = $(this).data('row-id');
                var url = "{{ route('project-template-sub-task.edit', ':id') }}";
                url = url.replace(':id', id);
                $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
                $.ajaxModal(MODAL_LG, url);
            });

            init(RIGHT_MODAL);
        });

    </script>
</div>
