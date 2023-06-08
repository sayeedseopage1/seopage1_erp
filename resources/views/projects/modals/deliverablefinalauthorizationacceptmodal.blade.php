<style>
    #collapse1 {
        overflow-y: scroll;
        height: 200px;
    }
</style>
<!-- Modal -->
<div class="modal fade" id="deliverablesfinalauthorizationacceptModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Accept authorization</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="card-body">
                    <div class="form-group">
                        <textarea name="admin_authorization_comment" id="admin_authorization_comment" class="form-control"></textarea>
                        <script src="{{ asset('/ckeditor/ckeditor.js') }}"></script>
                        <script>
                            CKEDITOR.replace('admin_authorization_comment');
                        </script>
                    </div>
                </div>
            </div>
            <form class="" action="{{route('deliverable-final-authorization-accept')}}" method="post">
                @csrf
                <input type="hidden" name="project_id" value="{{$project->id}}">
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" id="closeBtn">Close</button>
                    <button type="Submit" id="authorizationBtn" class="btn btn-primary" >Authorization</button>
                </div>
            </form>
        </div>
    </div>
</div>
<script>
    $('#authorizationBtn').click(function(e){
        // alert("success");
        e.preventDefault();
        var id = $(this).attr('data-id');
        var admin_authorization_comment = CKEDITOR.instances.admin_authorization_comment.getData();
        var data= {
            '_token': "{{ csrf_token() }}",
            'project_id': {{$project->id}},
            'admin_authorization_comment': admin_authorization_comment,
        }
        console.log(data);
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.easyAjax({
            blockUI: true,
            disableButton: true,
            buttonSelector: "#authorizationBtn",
            type: "POST",
            url: "{{route('deliverable-final-authorization-accept')}}",
            data: data,
            dataType: "json",
            success: function (response) {
                if (response.status == 400) {
                    toastr.success('Authorization request accepted successfully');
                    window.location.reload();
                }
            },
        });
    });

</script>
