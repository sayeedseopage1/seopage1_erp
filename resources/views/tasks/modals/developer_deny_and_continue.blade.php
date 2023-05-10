<style>
    .modal:nth-of-type(even) {
        z-index: 1052 !important;
    }
    .modal-backdrop.show:nth-of-type(even) {
        z-index: 1051 !important;
    }
</style>
<form action="{{route('tasks.deny_continue')}}" method="post">
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
                        <script src="{{ asset('/ckeditor/ckeditor.js') }}"></script>
                        <script>
                            CKEDITOR.replace('text2',{
                                height:100,
                            });
                        </script>
                    </div>
                    <div class="modal-footer">
                        <a data-toggle="modal" href="#denyAndContinue2" class="btn btn-primary">Next</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="denyAndContinue2">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Task Revision</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <div class="container">
                        <div class="mb-3">
                            <label for="" class="form-label">Revision Acknowledgement</label>
                            <select class="form-control height-35 f-14" id="revision_acknowledgement_deny">
                                <option value="">--</option>
                                <option value="task_has_revision_because_requirements_are_not_fulfilled_according_to_my_instructions">Task has revision because requirements are not fulfilled according to lead developer's instructions</option>
                                <option value="task_has_revision_because_i_have_customized_previous_instructions">Task has revision because i made some changes outside instructions</option>
                                <option value="task_has_revision_because_i_have_added_additional_instructions_to_previous_instructions">Task has revision because lead developer has added additional instructions to previous instructions</option>
                            </select>
                        </div>
                        
                        <div class="mb-3" id="commentContainer_deny">
                            <label for="" class="form-label">Comment</label>
                            <textarea name="comment_deny" id="comment_deny" class="form-control"></textarea>
                            <script src="{{ asset('/ckeditor/ckeditor.js') }}"></script>
                            <script>
                                CKEDITOR.replace('comment_deny',{
                                    height:100,
                                });
                            </script>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <a href="#" class="btn btn-secondary" data-dismiss="modal">Close</a>
                    <a href="#" class="btn btn-primary" mode="deny" id="denyBtn">Deny & Continue</a>
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
            'mode' : $(this).attr('mode'),
            'revision_acknowledgement': document.getElementById("revision_acknowledgement_deny").value,
            'comment': CKEDITOR.instances.comment_deny.getData(),
            'task_id': '{{$task->id}}',
            'revision_id': '{{$taskRevisionComment->id}}', 
        }
        // console.log(data);
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type: "POST",
            url: "{{route("accept_or_revision_by_developer")}}",
            data: data,
            dataType: "json",
            success: function (response) {
                // console.log(response.status);
                if(response.status==200){
                    $('#denyAndContinue').trigger("reset");
                    $('#denyBtn').attr("disabled", false);
                    $('#denyBtn').html("Deny & Continue");
                    window.location.reload();
                    toastr.success('Task Accept And Continue Successfully');
                }

            },
        });
    });
</script>


