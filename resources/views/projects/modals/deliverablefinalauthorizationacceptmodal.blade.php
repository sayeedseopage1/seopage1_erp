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
                <h5>Project Deliverables</h5>
                    <hr>
                <td width="80%">
                    <div style="height: 300px; overflow-y: scroll;">
                        <table class="inv-num-date text-dark f-13 mt-3">
                        <thead>
                        <tr class="bg-light-grey border-right-0 f-w-500">
                            <th scope="col" class="text-center">#</th>
                            <th scope="col" class="text-center">Type</th>
                            <th scope="col" class="text-center">Title</th>
                            <th scope="col" class="text-center">Milestone</th>
                            <th scope="col" class="text-center">Milestone Cost</th>
                            <th scope="col" class="text-center">Estimation Hours</th>
                            <th scope="col" class="text-center">Quantity</th>
                            <th scope="col" class="text-center">Description</th>
                            <th scope="col" class="text-center">Estimated completion date</th>
                            @if($signature == null)
                                <th scope="col" class="text-center">Action</th>
                            @endif
                        </tr>
                        </thead>
                        <tbody >
                        @forelse($deliverables as $deliverable)
                            <tr>
                                <td>{{$loop->index+1}}</td>
                                <td class="text-center">{{$deliverable->deliverable_type}}</td>
                                <td class="text-center">{{$deliverable->title}}</td>
                                @if($deliverable->milestone_id != null)
                                    <td class="text-center">{{$deliverable->milestone->milestone_title}}</td>
                                @else
                                    <td class="text-center">--</td>
                                @endif
                                @if($deliverable->milestone_id != null)
                                    <td class="text-center">{{$deliverable->milestone->actual_cost}}{{$currency->currency_symbol}}</td>
                                @else
                                    <td class="text-center">--</td>
                                @endif
                                @if($deliverable->estimation_time != null)
                                    <td class="text-center">{{$deliverable->estimation_time}} hours</td>
                                @else
                                    <td class="text-center">--</td>
                                @endif
                                <td class="text-center">{{$deliverable->quantity}}</td>
                                <td class="text-center">{!!$deliverable->description!!}</td>
                                @if($deliverable->to != null)
                                    <td class="text-center">Between {{$deliverable->from}} & {{$deliverable->to}}</td>
                                @else
                                    <td class="text-center">On {{$deliverable->from}}</td>

                                @endif
                                @if($signature == null)
                                    <td class="text-center">
                                        <button class="btn btn primary" data-toggle="modal" data-target="#deliverableseditModal{{$deliverable->id}}"><i class="fas fa-edit"></i></button>
                                        <button class="btn btn primary deleteDeliverable" data-id="{{ $deliverable->id }}"><i class="fas fa-trash"></i></button>
                                        @if($deliverable->authorization == 0 && Auth::user()->role_id == 1)
                                            <button class="btn btn-success" data-toggle="modal" data-target="#deliverablesapproveModal{{$deliverable->id}}">Approve</button>
                                        @endif

                                    </td>
                                @endif
                            </tr>
                            @if($signature == null)
                                {{--@include('projects.modals.clientdeliverableeditmodal')--}}
                                @include('projects.modals.clientdeliverabledeletemodal')
                                @include('projects.modals.clientdeliverableapprovemodal')
                            @endif
                        @empty
                            <tr>
                                No Data
                            </tr>
                        @endforelse
                        </tbody>

                    </table>
                    </div>
                </td>
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
        var data= {
            '_token': "{{ csrf_token() }}",
            'project_id': {{$project->id}},
        }
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
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
