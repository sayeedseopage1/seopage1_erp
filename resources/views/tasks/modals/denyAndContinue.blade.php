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
                        <span id="text2_error" class="text-danger"></span>
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
                                <option value="task_has_revision_because_requirements_are_not_fulfilled_according_to_my_instructions">Task has revision because requirements are not fulfilled according to my instructions</option>
                                <option value="task_has_revision_because_i_have_customized_previous_instructions">Task has revision because I have customized previous instructions</option>
                                <option value="task_has_revision_because_i_have_added_additional_instructions_to_previous_instructions">Task has revision because I have added additional instructions to previous instructions</option>
                            </select>
                        </div>
                        @php
                            $subtasks = \App\Models\SubTask::where('task_id',$task->id)->get();
                        @endphp
                        @if($subtasks->isNotEmpty())
                        <div class="mb-3">
                            <label for="" class="form-label">Select Sub Tasks</label>
                            <select class="selectpicker form-control" multiple aria-label="Default select example" data-live-search="true" id="subTask_deny">
                                @foreach($subtasks as $item)
                                    <option value="{{$item->id}}" >{{$item->title}}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="mb-3" id="commentContainer_deny" style="display:none">
                            <label for="" class="form-label">Comment</label>
                            <textarea name="comment" id="comment" class="form-control"></textarea>
                            <script src="{{ asset('/ckeditor/ckeditor.js') }}"></script>
                            <script>
                                CKEDITOR.replace('comment_deny',{
                                    height:100,
                                });
                            </script>
                        </div>
                        @endif
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
    @if($subtasks->isNotEmpty())
        <script>
        //    SELECT OPTION CODE
        const dropdown_deny = document.getElementById("subTask_deny");
        const _deny = document.getElementById("commentContainer_deny");
        dropdown_deny.addEventListener("change", function() {
            _deny.innerHTML = "";

            const selectedOptions = Array.from(dropdown_deny.selectedOptions);
            for (const option of selectedOptions) {
                const textAreaContainer = document.createElement("div");
                textAreaContainer.classList.add("mb-2");

                const label = document.createElement("label");
                label.textContent = option.text;
                textAreaContainer.appendChild(label);

                const textArea = document.createElement("textarea");
                var id = Math.random().toString(36).substr(2,9);
                textArea.id = id;
                textArea.classList.add("myClass_deny");
                CKEDITOR.replace(textArea, {
                    height: 80
                });
                textAreaContainer.appendChild(textArea);

                _deny.appendChild(textAreaContainer);
            }

            if (selectedOptions.length > 0) {
                _deny.style.display = "block";
            } else {
                _deny.style.display = "none";
            }
        });

        $('#denyBtn').click(function(e){
            e.preventDefault();
            $(this).prop("disabled", true);
            $('#denyBtn').html("Processing...");
            var text2 = CKEDITOR.instances.text2.getData();
            var subTask = Array.from(document.getElementById("subTask_deny").selectedOptions).map(option => option.value);
            const elements = document.getElementsByClassName("myClass_deny");
            const textAreaData = [];
            for (let i = 0; i < elements.length; i++) {
                const id = elements[i].id;
                var editorData = CKEDITOR.instances[id].getData();
                textAreaData.push(editorData);
            }

            var data= {
                '_token': "{{ csrf_token() }}",
                'text2': text2,
                'subTask': subTask,
                'revision_acknowledgement': document.getElementById("revision_acknowledgement_deny").value,
                'comment': textAreaData,
                'task_id': {{$task->id}},
                'revision_id': '{{$taskRevisionComment->id}}'
            }
            // console.log(data);
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                type: "POST",
                url: "{{route('tasks.deny_continue')}}",
                data: data,
                dataType: "json",
                success: function (response) {
                    // console.log(response.status);
                    if(response.status==200){
                        $('#denyAndContinue').trigger("reset");
                        $('#denyBtn').prop("disabled", false);
                        $('#denyBtn').html("Deny & Continue");
                        window.location.reload();
                        toastr.success('Task Accept And Continue Successfully');
                    }

                },
                error: function(error) {
                    if(error.responseJSON.errors.text2){
                        $('#text2_error').text(error.responseJSON.errors.text2);
                    }else{
                        $('#text2_error').text('');
                    }
                    $('#denyBtn').attr("disabled", false);
                    $('#denyBtn').html("Deny & Continue");
                }
            });
        });
    </script>
    @else
        <script>
            $('#denyBtn').click(function(e){
                e.preventDefault();
                $(this).prop("disabled", true);
                $('#denyBtn').html("Processing...");
                var text2 = CKEDITOR.instances.text2.getData();
                var data= {
                    '_token': "{{ csrf_token() }}",
                    'text2': text2,
                    'revision_acknowledgement': document.getElementById("revision_acknowledgement_deny").value,
                    'task_id': {{$task->id}},
                    'revision_id': '{{$taskRevisionComment->id}}'
                }
                // console.log(data);
                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                });
                $.ajax({
                    type: "POST",
                    url: "{{route('tasks.deny_continue')}}",
                    data: data,
                    dataType: "json",
                    success: function (response) {
                        // console.log(response.status);
                        if(response.status==200){
                            $('#denyAndContinue').trigger("reset");
                            $('#denyBtn').prop("disabled", false);
                            $('#denyBtn').html("Deny & Continue");
                            window.location.reload();
                            toastr.success('Task Accept And Continue Successfully');
                        }

                    },
                    error: function(error) {
                        if(error.responseJSON.errors.text2){
                            $('#text2_error').text(error.responseJSON.errors.text2);
                        }else{
                            $('#text2_error').text('');
                        }
                        $('#denyBtn').attr("disabled", false);
                        $('#denyBtn').html("Deny & Continue");
                    }
                });
            });
        </script>
    @endif

