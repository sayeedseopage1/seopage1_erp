<link rel="stylesheet" href="{{asset('toastr/toastr.min.css')}}">
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
            <form  action="{{route('task-status-revision')}}" method="post" id="revisionForm" onsubmit='disableButton()'>
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
                                <span id="comments2Error" class="invalid-feedback" style="display: none;"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" id="submitBtnRevision_ajax" class="btn btn-primary" name="pm_revision">Submit</button>
                </div>
            </form>
        </div>
    </div>
</div>

<script src="{{asset('toastr/toastr.min.js')}}"></script>
<script>
    function disableButton() {
        var btn = document.getElementById('submitBtnRevision_ajax');
        btn.disabled = true;
        btn.innerText = 'Processing...'
    }
</script>
<script>
    document.getElementById("revisionForm").addEventListener("submit", function(event) {
        var comments2Value = CKEDITOR.instances.comments2.getData().trim();
        var comments2Error = document.getElementById("comments2Error");

        if (comments2Value === "") {
            comments2Error.textContent = "Comments field is required.";
            comments2Error.style.display = "block";
            event.preventDefault(); // Prevent form submission
        }
    });


    $('.revision_reason_btn').click(function() {
        $('#revision_reason').val($(this).attr('name'))
    })

    $('#openBtn').click(function(){
        $('#myModal').modal({show:true});
    })
</script>
