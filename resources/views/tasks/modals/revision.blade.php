<div class="modal fade" id="revision" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Tasks Revision</h5>
                <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                @php
                    $taskRevisionComment = \App\Models\TaskRevision::where('task_id',$task->id)->first();
                @endphp
                <h6 class="text-center">Task Revision Form Project Manager</h6>
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
                    <button class="btn-secondary rounded f-14 p-2 mr-2" data-toggle="modal" data-target="#acceptAndContinue"> Accept & Continue</button>
                    <button class="btn-secondary  rounded f-14 p-2 mr-2" data-toggle="modal" data-target="#denyAndContinue"> Deny & Continue</button>
{{--                    <button class="btn-secondary  rounded f-14 p-2" data-toggle="modal" data-target="#subTaskRevision">Sub Task Revision</button>--}}
{{--                    @include('tasks.modals.subTaskRevision')--}}
                    @include('tasks.modals.acceptAndContinue')
                    @include('tasks.modals.denyAndContinue')
                </div>
            </div>
        </div>
    </div>
</div>



