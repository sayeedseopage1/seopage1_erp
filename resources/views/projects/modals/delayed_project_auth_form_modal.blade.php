<div class="modal fade" id="delayed_project_auth_form_modal{{ $project_request_time_extension->id }}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Delayed Project Time Extension</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            @php
                $delayed_project = \App\Models\ProjectRequestTimeExtension::where('id',$project_request_time_extension->id)->orderBy('id','desc')->first();
            @endphp
            <form action="" method="post">
                @csrf
                <div class="modal-body">
                    <div class="card" style="border: none">
                        <div class="row">
                            <div class="col-md-12">
                                <h5>Files for proper reason :</h5>
                                @php
                                    $images = explode('|', $delayed_project->file);
                                @endphp
                                <div>
                                    @foreach($images as $image)
                                        @if($image)
                                        <a href="{{asset($image)}}" target="_blank">
                                            <img src="{{asset($image)}}" class="img-thumbnail" alt="img" width="20%" height="20%    ">
                                        </a>
                                        @else
                                            --
                                        @endif
                                    @endforeach
                                </div>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-12">
                                <h5 class="mt-3">Any other comment you want share/client comment:</h5>
                                <span>{!! $delayed_project->comment !!}</span>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-12">
                                <h5>No of days you want to extend</h5>
                                <select name="day" id="day" class="form-control height-35 f-14">
                                    <option value="">Select One</option>
                                    <option value="1" {{ $delayed_project->day == 1 ? 'selected' : '' }}>1</option>
                                    <option value="2" {{ $delayed_project->day == 2 ? 'selected' : '' }}>2</option>
                                    <option value="3" {{ $delayed_project->day == 3 ? 'selected' : '' }}>3</option>
                                    <option value="4" {{ $delayed_project->day == 4 ? 'selected' : '' }}>4</option>
                                    <option value="5" {{ $delayed_project->day == 5 ? 'selected' : '' }}>5</option>
                                    <option value="6" {{ $delayed_project->day == 6 ? 'selected' : '' }}>6</option>
                                    <option value="7" {{ $delayed_project->day == 7 ? 'selected' : '' }}>7</option>
                                </select>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-12">
                                <h5>Admin Comment</h5>
                                <textarea name="admin_comment" id="admin_comment" class="form-control"></textarea>
                            <script src="{{ asset('/ckeditor/ckeditor.js') }}"></script>
                                <script>
                                    CKEDITOR.replace('admin_comment');
                                </script>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" id="approvedBtn" class="btn btn-primary" data-project="{{ $delayed_project->project_id }}">Approve</button>
                    <button type="button" id="denyBtn" class="btn btn-danger" data-project="{{ $delayed_project->project_id }}">Deny</button>
                </div>
            </form>
        </div>
    </div>
</div>
  <script>
    $('#approvedBtn').click(function(e){
        e.preventDefault();
        var admin_comment = CKEDITOR.instances.admin_comment.getData();
        var projectId = $(this).data("project");
        var data= {
            '_token': "{{ csrf_token() }}",
            'id': {{ $delayed_project->id }},
            'projectId': projectId,
            'admin_comment': admin_comment,
            'day': document.getElementById("day").value,
        }
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
         $.ajax({
            type: "POST",
            url: "{{ route('approved-request-extension') }}",
            data: data,
            dataType: "json",
            success: function (response) {
                toastr.success('Appllroved Successfully');
                window.location.reload();
            },
            error: function(error) {
                //
            }
        });
    });
</script>
  <script>
    $('#denyBtn').click(function(e){
        e.preventDefault();
        var admin_comment = CKEDITOR.instances.admin_comment.getData();
        var projectId = $(this).data("project");
        var data= {
            '_token': "{{ csrf_token() }}",
            'id': {{ $delayed_project->id }},
            'projectId': projectId,
            'admin_comment': admin_comment,
            'day': document.getElementById("day").value,
        }
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
         $.ajax({
            type: "POST",
            url: "{{ route('deny-request-extension') }}",
            data: data,
            dataType: "json",
            success: function (response) {
                toastr.success('Deny Successfully');
                window.location.reload();
            },
            error: function(error) {
                //
            }
        });
    });
</script>
