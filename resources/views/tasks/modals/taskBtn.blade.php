<link rel="stylesheet" href="http://cdn.bootcss.com/toastr.js/latest/css/toastr.min.css">
<style>
    .modal:nth-of-type(even) {
        z-index: 1052 !important;
    }
    .modal-backdrop.show:nth-of-type(even) {
        z-index: 1051 !important;
    }

</style>

<div class="modal" id="taskBtn">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-body">
                <a data-toggle="modal" href="#taskRevision" class="btn btn-primary mb-3 revision_reason_btn" name="task_has_revision_because_requirements_are_not_fulfilled_according_to_my_instructions">Task has revision because requirements are not fulfilled according to my instructions</a>
                <a data-toggle="modal" href="#taskRevision" class="btn btn-primary mb-3 revision_reason_btn" name="task_has_revision_because_i_have_customized_previous_instructions">Task has revision because I have customized previous instructions</a>
                <a data-toggle="modal" href="#taskRevision" class="btn btn-primary revision_reason_btn" name="task_has_revision_because_i_have_added_additional_instructions_to_previous_instructions">Task has revision because I have added additional instructions to previous instructions</a>
            </div>
        </div>
    </div>
</div>
<div class="modal" id="taskRevision">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Revision of Task</h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <form  action="{{route('task-status-revision')}}" method="post">
                @csrf
                <input type="hidden" name="task_id" value="{{$task->id}}">
                <input type="hidden" name="user_id" value="{{$task->last_updated_by}}">
                <input type="hidden" id="revision_reason" name="revision_acknowledgement" value="">
                <div class="modal-body">
                    <div class="container">
                        <div class="row flex-column">
                            <div class="mb-3">
                                Comments
                                <sup class="f-14 text-danger">*</sup>
                                <i class="fa fa-question-circle" data-toggle="popover" data-placement="top" data-content="Comments" data-html="true" data-trigger="hover"></i>
                            </div>
                            <div class="">
                                <textarea name="comments2" id="comments2" class="form-control"></textarea>
                                <script src="https://cdn.ckeditor.com/4.19.1/standard/ckeditor.js"></script>
                                <script>
                                    CKEDITOR.replace('comments2',{
                                        height:100,
                                    });
                                </script>
                                <span id="commentsError" class="text-danger" ></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" id="submitBtnRevision_ajax" class="btn btn-primary" name="pm_revision" onclick="submitBtnRevision()">Submit</button>
                </div>
            </form>
        </div>
    </div>
</div>
<script src="http://cdn.bootcss.com/toastr.js/latest/js/toastr.min.js"></script>
<script>
    /*$('.revision_reason_btn').click(function(e){
        e.preventDefault();
        var revision_reason = this.name;
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type: "POST",
            url: "{{route('tasks.revision_reason')}}",
            data: {
                '_token': "{{ csrf_token() }}",
                'task_id': {{$task->id}},
                'revision_reason': revision_reason,
            },
            dataType: "json",
            success: function (response) {
                // console.log(response.status);
                // if(response.status==200){
                //     // window.location.reload();
                //     toastr.success('Task Revision Reason Successfully');
                // }

            },
        });
    });*/


    $('.revision_reason_btn').click(function() {
        $('#revision_reason').val($(this).attr('name'))
    })

    $('#openBtn').click(function(){
        $('#myModal').modal({show:true});
    })
</script>
