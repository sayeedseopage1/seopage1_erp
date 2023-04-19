<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.14.0-beta2/css/bootstrap-select.min.css'>
<div class="modal fade" id="subTaskRevision" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Sub Task Revision</h5>
                <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
            </div>
            <form  action="{{route('tasks.subtask_revision')}}" method="post">
                @csrf
                <input type="hidden" name="task_id" value="{{$task->id}}">
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
                            <label for="" class="form-label">Comment</label>
                            <textarea name="subTaskComment" id="subTaskComment" class="form-control"></textarea>
                            <script src="https://cdn.ckeditor.com/4.19.1/standard/ckeditor.js"></script>
                            <script>
                                CKEDITOR.replace('subTaskComment',{
                                    height:100,
                                });
                            </script>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary" id="subTaskAdd">Submit</button>

                </div>
            </form>
        </div>
    </div>
</div>
<script src='https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.14.0-beta2/js/bootstrap-select.min.js'></script>

<script>
    $('#subTaskAdd').click(function(e){
        e.preventDefault();
        $('#subTaskAdd').attr("disabled", true);
        $('#subTaskAdd').html("Processing...");
        var subTaskComment = CKEDITOR.instances.subTaskComment.getData();
        var subTask = Array.from(document.getElementById("subTask").selectedOptions).map(option => option.value);
        var data= {
            '_token': "{{ csrf_token() }}",
            'subTaskComment': subTaskComment,
            'subTasks': subTask,
            'task_id': {{$task->id}},
        }
        console.log(data);
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type: "POST",
            url: "{{route('tasks.subtask_revision')}}",
            data: data,
            dataType: "json",
            success: function (response) {
                // console.log(response.status);
                if(response.status==200){
                    $('#subTaskRevision').trigger("reset");
                    $('#subTaskAdd').attr("disabled", false);
                    $('#subTaskAdd').html("Submit");
                    window.location.reload();
                    toastr.success('Sub Task Add Successfully');
                }

            },
        });
    });

</script>
