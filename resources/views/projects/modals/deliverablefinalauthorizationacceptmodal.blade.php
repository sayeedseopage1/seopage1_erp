@php
    $contractSign = App\Models\ContractSign::where('project_id',$project->id)->first();
    if($contractSign != null){
        $milestones = App\Models\ProjectMilestone::where('project_id',$contractSign->project_id)->whereDate('created_at','>',$contractSign->created_at)->get();
        $findProject = App\Models\Project::where('id',$project->id)->first();
        $milestonCreatedBy = App\Models\User::where('id',$findProject->pm_id)->first();
        $deliverables = App\Models\ProjectDeliverable::where('project_id',$contractSign->project_id)->whereDate('created_at','>',$contractSign->created_at)->get();
        // dd($deliverables);
    }
@endphp
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
                    @if ($contractSign != null)
                        @if (count($milestones) > 0)
                            <table class="table mb-3">
                                <h5 class="text-center p-1">Milestone Table</h5>
                                <thead class="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Creation Date</th>
                                    <th scope="col">Milestone Title</th>
                                    <th scope="col">Milestone Cost</th>
                                    <th scope="col">Created By</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    @foreach ($milestones as $mItem)
                                        <th scope="row">{{ $loop->iteration }}</th>
                                        <td>{{ $mItem->created_at }}</td>
                                        <td>{{ $mItem->milestone_title }}</td>
                                        <td>{{ $mItem->actual_cost }}</td>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                <div class="" style="width: 28px;">
                                                    <div style="width: 32px; height: 28px;">
                                                        @if ($milestonCreatedBy->image)
                                                            <img src="{{ asset('user-uploads/avatar/'.$milestonCreatedBy->image) }}" alt="" width="24" height="24" style="width: 28px; height: 28px;" class="rounded-circle">
                                                        @else
                                                            <img src="{{ asset('img/avatar.png') }}" alt="" width="24" height="24" style="width: 28px; height: 28px;" class="rounded-circle">
                                                        @endif
                                                    </div>
                                                </div>
                                                <a href="{{ route('employees.show',$milestonCreatedBy->id) }}" class="pl-2 ">{{ $milestonCreatedBy->name }}</a>
                                            </div>
                                        </td>
                                    @endforeach
                                </tr>
                                </tbody>
                            </table>
                        @endif
                        @if (count($deliverables) >= 0)
                            <h4 class="text-red mb-4">PM added a milestone but didnt add a deliverable. Do you still want to authorize?</h4>
                        @endif
                        @if (count($deliverables) > 0)
                            <table class="table mb-3">
                                <h5 class="text-center p-1">Deliverable Table</h5>
                                <thead class="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Milestone</th>
                                    <th scope="col">Created By</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    @foreach ($deliverables as $dItem)
                                        @php
                                            $dMilestone = App\Models\ProjectMilestone::where('id',$dItem->milestone_id)->first();
                                        @endphp
                                        <th scope="row">{{ $loop->iteration }}</th>
                                        <td>{{ $dItem->deliverable_type }}</td>
                                        <td>{{ $dItem->title }}</td>
                                        <td>{{ $dMilestone->milestone_title }}</td>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                <div class="" style="width: 28px;">
                                                    <div style="width: 32px; height: 28px;">
                                                        @if ($milestonCreatedBy->image)
                                                            <img src="{{ asset('user-uploads/avatar/'.$milestonCreatedBy->image) }}" alt="" width="24" height="24" style="width: 28px; height: 28px;" class="rounded-circle">
                                                        @else
                                                            <img src="{{ asset('img/avatar.png') }}" alt="" width="24" height="24" style="width: 28px; height: 28px;" class="rounded-circle">
                                                        @endif
                                                    </div>
                                                </div>
                                                <a href="{{ route('employees.show',$milestonCreatedBy->id) }}" class="pl-2 ">{{ $milestonCreatedBy->name }}</a>
                                            </div>
                                        </td>
                                    @endforeach
                                </tr>
                                </tbody>
                            </table>
                        @endif
                    @endif


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
                    {{-- <button type="button" class="btn btn-secondary" data-dismiss="modal" id="closeBtn">Close</button> --}}
                    <button type="Submit" id="denyBtn" class="btn btn-danger" value="denyAuthorization">Deny</button>
                    <button type="Submit" id="authorizationBtn" class="btn btn-success mx-3" >Authorize</button>

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

    $('#denyBtn').click(function(e){
        e.preventDefault();
        var id = $(this).attr('data-id');
        var admin_authorization_comment = CKEDITOR.instances.admin_authorization_comment.getData();
        var denyAuthorizationValue = $('#denyBtn').val();
        var data= {
            '_token': "{{ csrf_token() }}",
            'project_id': {{$project->id}},
            'admin_authorization_comment': admin_authorization_comment,
            'denyAuthorization': denyAuthorizationValue,
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
