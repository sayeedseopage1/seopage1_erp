@php
    $task_guideline_authorization = App\Models\PmTaskGuidelineAuthorization::where('project_id',$project->id)->where('status', 0)->get();
@endphp
<div class="modal fade" id="task_auth_form_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Task Guideline Needs to be Authorized by Admin</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <div class="container">
                <h5 class="text-center mb-3">Submitted Information</h5>
                <form method="GET" id="authForm">
                    @csrf
                    @foreach ($task_guideline_authorization as $item)
                    <div class="row border border-dark mb-2 py-2">
                        <div class="col-4 text-center">
                            <h6 class="mt-2">{{ $item->name }}</h6>
                        </div>
                        <div class="col-4 text-center">
                            <h6 class="mt-2">No</h6>
                        </div>
                        <div class="col-4">
                            <button type="button" class="btn btn-secondary mr-2 border-dark approve-button" data-id="{{ $item->id }}">Approve</button>
                            <button type="button" class="btn btn-secondary  ml-2 border-dark deny-button" data-id="{{ $item->id }}">Deny</button>
                        </div>
                    </div>
                    @endforeach
                </form>
            </div>
        </div>
      </div>
    </div>
  </div>
  <script>
    $(document).ready(function() {
        $(".approve-button").on("click", function(e) {
            e.preventDefault();
            var id = $(this).data("id");
            var rowElement = $(this).closest('.row');

            $.ajax({
                url: '/task-guideline-approved-authorization/' + id,
                type: "GET",
                dataType: "json",
                success: function(response) {
                    toastr.success('Authorization Approved Successfully');
                    rowElement.hide();
                    if(response.count==0){
                        window.location.reload();
                    }
                },
                error: function(xhr, status, error) {
                    console.log(xhr.responseText);
                }
            });
        });
    });
    $(document).ready(function() {
        $(".deny-button").on("click", function(e) {
            e.preventDefault();
            var id = $(this).data("id");
            var rowElement = $(this).closest('.row');
            $.ajax({
                url: '/task-guideline-deny-authorization/' + id,
                type: "GET",
                dataType: "json",
                success: function(response) {
                    toastr.info('Authorization Deny Successfully');
                    rowElement.hide();
                    if(response.count==0){
                        window.location.reload();
                    }
                },
                error: function(xhr, status, error) {
                    console.log(xhr.responseText);
                }
            });
        });
    });
</script>
