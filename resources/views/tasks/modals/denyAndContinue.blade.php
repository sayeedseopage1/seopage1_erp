<style>
    .modal:nth-of-type(even) {
        z-index: 1052 !important;
    }
    .modal-backdrop.show:nth-of-type(even) {
        z-index: 1051 !important;
    }
</style>
<form action="{{route('tasks.deny_and_continue')}}" method="post">
    @csrf
    <div class="modal" id="denyAndContinue">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Please Explain Why Did You Deny?</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <div class="">
                        <textarea name="text2" id="text2" class="form-control"></textarea>
                        <script src="https://cdn.ckeditor.com/4.19.1/standard/ckeditor.js"></script>
                        <script>
                            CKEDITOR.replace('text2',{
                                height:100,
                            });
                        </script>
                    </div>
                    <div class="modal-footer">
                        <a data-toggle="modal" href="#acceptAndContinue2" class="btn btn-primary">Next</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="acceptAndContinue2">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Task Revision</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <div class="container">
                        @php
                            $subtasks = \App\Models\SubTask::where('task_id',$task->id)->get();
                        @endphp
                        <div class="mb-3">
                            <label for="" class="form-label">Select Sub Tasks</label>
                            <select class="selectpicker form-control" multiple aria-label="Default select example" data-live-search="true" id="subTask">
                                @foreach($subtasks as $item)
                                    <option value="{{$item->id}}">{{$item->title}}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="" class="form-label">Revision Acknowledgement</label>
                            <select class="form-control height-35 f-14">
                                <option value="">--</option>
                                <option value="task_has_revision_because_requirements_are_not_fulfilled_according_to_my_instructions">Task has revision because requirements are not fulfilled according to my instructions</option>
                                <option value="task_has_revision_because_i_have_customized_previous_instructions">Task has revision because I have customized previous instructions</option>
                                <option value="task_has_revision_because_i_have_added_additional_instructions_to_previous_instructions">Task has revision because I have added additional instructions to previous instructions</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="" class="form-label">Comment</label>
                            <textarea name="comment2" id="comment2" class="form-control"></textarea>
                            <script src="https://cdn.ckeditor.com/4.19.1/standard/ckeditor.js"></script>
                            <script>
                                CKEDITOR.replace('comment2',{
                                    height:100,
                                });
                            </script>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <a href="#" class="btn btn-secondary" data-dismiss="modal">Close</a>
                    <a href="#" class="btn btn-primary" id="denyBtn">Deny & Continue</a>
                </div>
            </div>
        </div>
    </div>
</form>

<script>
    $('#denyBtn').click(function(e){
        e.preventDefault();
        $('#denyBtn').attr("disabled", true);
        $('#denyBtn').html("Processing...");
        var text2 = CKEDITOR.instances.text2.getData();
        var data= {
            '_token': "{{ csrf_token() }}",
            'text2': text2,
            'task_id': {{$task->id}},
        }
        // console.log(data);
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type: "POST",
            url: "{{route('tasks.deny_and_continue')}}",
            data: data,
            dataType: "json",
            success: function (response) {
                // console.log(response.status);
                if(response.status==200){
                    $('#denyAndContinue').trigger("reset");
                    $('#denyBtn').attr("disabled", false);
                    $('#denyBtn').html("Submit");
                    window.location.reload();
                    toastr.success('Task Deny And Continue Successfully');
                }

            },
        });
    });

</script>
