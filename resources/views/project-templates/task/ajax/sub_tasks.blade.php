<!-- TAB CONTENT START -->
<div class="tab-pane fade show active" role="tabpanel" aria-labelledby="nav-email-tab">

    <div class="p-20">

        <div class="row">
            <div class="col-md-12">
                <a class="f-15 f-w-500" href="javascript:;" id="add-sub-task"><i
                        class="icons icon-plus font-weight-bold mr-1"></i>@lang('app.add')
                    @lang('modules.tasks.subTask')</a>
            </div>
        </div>

        <x-form id="save-subtask-data-form" class="d-none">
            <input type="hidden" name="task_id" value="{{ $task->id }}">
            <div class="row">
                <div class="col-md-8">
                    <x-forms.text :fieldLabel="__('app.title')" fieldName="title" fieldRequired="true"
                        fieldId="title" :fieldPlaceholder="__('placeholders.task')" />
                </div>
                <div class="col-md-12">
                    <div class="w-100 justify-content-end d-flex mt-2">
                        <x-forms.button-cancel id="cancel-subtask" class="border-0 mr-3">@lang('app.cancel')
                        </x-forms.button-cancel>
                        <x-forms.button-primary id="save-subtask" icon="location-arrow">@lang('app.submit')
                            </x-button-primary>
                    </div>
                </div>
            </div>
        </x-form>
    </div>


    <div class="d-flex flex-wrap justify-content-between p-20" id="sub-task-list">

        <x-table class="border-0 pb-3 admin-dash-table table-hover">

            <x-slot name="thead">
                <th class="pl-20">#</th>
                <th>@lang('app.name')</th>
                <th class="text-right pr-20">@lang('app.action')</th>
            </x-slot>

            @forelse ($task->subtasks as $key => $subtask)
                <tr id="row-{{ $subtask->id }}">
                    <td class="pl-20">{{ $key + 1 }}</td>
                    <td>
                        {{ucfirst($subtask->title)}}
                    </td>

                    <td class="text-right pr-20">
                        <x-forms.button-secondary data-row-id="{{ $subtask->id }}" icon="trash"
                                                  class="delete-subtask">
                            @lang('app.delete')</x-forms.button-secondary>
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="5">
                        <x-cards.no-record icon="tasks" :message="__('messages.noSubTaskFound')" />
                    </td>
                </tr>
            @endforelse
        </x-table>

    </div>

</div>
<!-- TAB CONTENT END -->

<script>
    $(document).ready(function() {

        $('#save-subtask').click(function() {

            const url = "{{ route('project-template-sub-task.store') }}";

            $.easyAjax({
                url: url,
                container: '#save-subtask-data-form',
                type: "POST",
                disableButton: true,
                blockUI: true,
                buttonSelector: "#save-subtask",
                data: $('#save-subtask-data-form').serialize(),
                success: function(response) {
                    if (response.status == "success") {
                        window.location.reload();
                    }

                }
            });
        });

        $('body').on('click', '#add-sub-task', function() {
            $(this).closest('.row').addClass('d-none');
            $('#save-subtask-data-form').removeClass('d-none');
        });


        $('#cancel-subtask').click(function() {
            $('#save-subtask-data-form').addClass('d-none');
            $('#add-sub-task').closest('.row').removeClass('d-none');
        });


    });

</script>
