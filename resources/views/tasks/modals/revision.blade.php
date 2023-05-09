<div class="modal fade" id="revision" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Tasks Revision By project manager</h5>
                <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                @php
                    $taskRevisionComment = \App\Models\TaskRevision::where('task_id',$task->id)->orderBy('id', 'desc')->first();
                    $revision_acknowledgement = $taskRevisionComment->revision_acknowledgement ?? $taskRevisionComment->revision_reason;
                @endphp
                <h6 class="text-center">
                    <b class="text-danger">Reason: </b>
                    @if($revision_acknowledgement == "task_has_revision_because_requirements_are_not_fulfilled_according_to_my_instructions")
                        Task has revision because requirements are not fulfilled according to projece manager's instructions
                    @elseif($revision_acknowledgement == "task_has_revision_because_i_have_customized_previous_instructions")
                        Task has revision because project manager made some changes outside instructions.
                    @elseif($revision_acknowledgement == "task_has_revision_because_i_have_added_additional_instructions_to_previous_instructions")
                        Task has revision because project manager has added additional instructions to previous instructions
                    @endif
                </h6>
                <div class="card mb-3">
                    <div class="card-body">
                        @if($taskRevisionComment->comment)
                            <p>{!! $taskRevisionComment->comment !!}</p>
                        @else
                            <p class="text-center text-danger">No Comment Found</p>
                        @endif
                    </div>
                </div>
                <div class="mb-1 text-center">
                    <button class="btn-secondary rounded f-14 p-2 mr-2" name="aceept" data-toggle="modal" data-target="#acceptAndContinue"> Accept & Continue</button>
                    <button class="btn-secondary  rounded f-14 p-2 mr-2" name="denay" data-toggle="modal" data-target="#denyAndContinue"> Deny & Continue</button>
                    @include('tasks.modals.acceptAndContinue')
                    @include('tasks.modals.denyAndContinue')
                </div>
            </div>
        </div>
    </div>
</div>



