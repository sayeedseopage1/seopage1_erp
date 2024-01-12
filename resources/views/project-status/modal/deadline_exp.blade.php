<!-- Modal -->
<div class="modal fade" id="deadlineExplanation{{$item->project_id}}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog modal-xl">
    <div class="modal-content">
    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Deadline Explanation</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button>
    </div>
    @php
        $project = App\Models\Project::where('id',$item->project_id)->first();
        $client = App\Models\User::where('id',$project->client_id)->first();
    @endphp
    <div class="modal-body">
        <div class="container">
            <div class="row">
                <div class="col-md-2">
                    <p>Project Name :</p>
                </div>
                <div class="col-md-10">
                    <p>{{$project->project_name}}</p>
                </div>
            </div>
            <div class="row">
                <div class="col-md-2">
                    <p>Client Name :</p>
                </div>
                <div class="col-md-10">
                    <p>{{$client->name}}</p>
                </div>
            </div>
            <div class="row">
                <div class="col-md-2">
                    <p>Project Category :</p>
                </div>
                <div class="col-md-10">
                    <p>{{$item->project_category}}</p>
                </div>
            </div>
            <div class="row">
                <div class="col-md-2">
                    <p>Project Start Date :</p>
                </div>
                <div class="col-md-10">
                    <p>{{$project->start_date}}</p>
                </div>
            </div>
            <div class="row">
                <div class="col-md-2">
                    <p>Deadline :</p>
                </div>
                <div class="col-md-10">
                    <p>{{$project->deadline}}</p>
                </div>
            </div>
            <div class="row">
                <div class="col-md-2">
                    <p>Description :</p>
                </div>
                <div class="col-md-10">
                    <p>{{$item->description ? : '--'}}</p>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-md-12">
                    <form id="submitForm">
                        <div class="form-group">
                            <label class="text-dark-grey" data-label="true" for="reason">Reason
                                <sup class="mr-1">*</sup>
                            </label>
                            <textarea name="reason" id="reason{{$item->project_id}}" class="form-control"></textarea>
                           <script src="{{ asset('/ckeditor/ckeditor.js') }}"></script>
                            <script>
                                console.log("reason" + {!! $item->project_id !!});
                                CKEDITOR.replace("reason" + {!! $item->project_id !!});
                            </script>
                            <label id="reason_error" class="text-danger" for="reason"></label>
                        </div>
                        <button type="submit" id="reasonSubmit" class="btn btn-primary">Submit</button>
                      </form>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
    </div>
    </div>
</div>
</div>

<script>
    $( document ).ready(function() {
    $('#reasonSubmit').click(function(e){
        e.preventDefault();
        $('#reasonSubmit').attr("disabled", true);
        $('#reasonSubmit').html("Processing...");
        var reason = CKEDITOR.instances.reason.getData();
        var data= {
            '_token': "{{ csrf_token() }}",
            'reason': reason,
            'project_pm_goal_id' : {{$item->id}}
        }
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type: "POST",
            url: "{{route('project-status-reason-submit')}}",
            data: data,
            dataType: "json",
            success: function (response) {
                toastr.success('Reason Submit Successfully');
                window.location.reload();
                $('#reasonSubmit').attr("disabled", false);
                $('#reasonSubmit').html("Submit");
            },
            error: function(error) {
                if(error.responseJSON.errors.reason){
                    $('#reason_error').text(error.responseJSON.errors.reason);
                }else{
                    $('#reason_error').text('');
                }
                $('#reasonSubmit').attr("disabled", false);
                $('#reasonSubmit').html("Submit");
            }
        });
    });
    });

</script>