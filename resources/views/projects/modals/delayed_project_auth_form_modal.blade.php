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
                <h5>No of days you want to extend : {{ $delayed_project->day }} Days</h5>
                <h5>Files for proper reason :</h5>
                @php
                    $images = explode('|', $delayed_project->file);
                @endphp
                <div>
                    @foreach($images as $image)
                        @if($image)
                            <img src="{{asset($image)}}" class="img-thumbnail" alt="img" style="width: 20%">
                        @else
                            --
                        @endif
                    @endforeach
                </div>
                <h5 class="mt-3">Any other comment you want share/client comment:</h5>
                <span>{!! $delayed_project->comment !!}</span>
            </div>
        </div>
        <div class="modal-footer">
          <button type="button" id="approvedBtn" class="btn btn-primary" data-project="{{ $delayed_project->project_id }}">Approve</button>
          <button type="button" class="btn btn-danger" data-id="2">Deny</button>
        </div>
        </form>
      </div>
    </div>
  </div>
  <script>
    $('#approvedBtn').click(function(e){
        e.preventDefault();
        // var dataId = $(this).data("id");
        var projectId = $(this).data("project");
        var data= {
            '_token': "{{ csrf_token() }}",
            'id': {{ $delayed_project->id }},
            'projectId': projectId,
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
