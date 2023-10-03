<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
<div class="modal fade" id="monthlyDisputeForCycle{{count($dispute_for_previous_cycle)}}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Disputed: {{ count($dispute_for_previous_cycle) }}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <table id="monthlyDisputeTable" class="display" style="width:100%">
                <thead>
                    <tr>
                        <th scope="col">Sl No</th>
                        <th scope="col">Revision Date</th>
                        <th scope="col">Project Name</th>
                        <th scope="col">Client Name</th>
                        <th scope="col">Revision Request Raised By</th>
                        <th scope="col">Person Responsible For Revision</th>
                        <th scope="col">Reason For Revision</th>
                        <th scope="col">Dispute Start Date</th>
                        <th scope="col">Resolved</th>
                        <th scope="col">Verdict</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($dispute_for_previous_cycle as $item)
                        @php
                            $user = \App\Models\User::where('id',$item->client_id)->first();
                            $raisedBy = \App\Models\User::where('id',$item->added_by)->first();
                            $personResponsible = \App\Models\User::where('id',$item->ld_id)->first();
                            if ($item->status==1) {
                                $win = \App\Models\User::where('id',$item->winner)->first();
                            }
                        @endphp
                        <tr>
                            <td>{{ $loop->iteration }}</td>
                            <td>
                                <p>{{ $item->revision_date }}</p>
                            </td>
                            <td>
                                <a href="{{ route('projects.show',$item->project_id) }}">{{ $item->project_name }}</a>
                            </td>
                            <td>
                                <div class="d-flex align-items-center">
                                    <div class="" style="width: 28px;">
                                        <div style="width: 32px; height: 28px;">
                                            @if ($user->image)
                                                <img src="{{ asset('user-uploads/avatar/'.$user->image) }}" alt="" width="24" height="24" style="width: 28px; height: 28px;" class="rounded-circle">
                                            @else
                                                <img src="{{ asset('img/avatar.png') }}" alt="" width="24" height="24" style="width: 28px; height: 28px;" class="rounded-circle">
                                            @endif
                                        </div>
                                    </div>
                                    <a href="{{ route('employees.show',$user->id) }}" class="pl-2 ">{{ $user->name }}</a>
                                </div>
                            </td>
                            <td>
                                <div class="d-flex align-items-center">
                                    <div class="" style="width: 28px;">
                                        <div style="width: 32px; height: 28px;">
                                            @if ($raisedBy->image)
                                                <img src="{{ asset('user-uploads/avatar/'.$raisedBy->image) }}" alt="" width="24" height="24" style="width: 28px; height: 28px;" class="rounded-circle">
                                            @else
                                                <img src="{{ asset('img/avatar.png') }}" alt="" width="24" height="24" style="width: 28px; height: 28px;" class="rounded-circle">
                                            @endif
                                        </div>
                                    </div>
                                    <a href="{{ route('employees.show',$raisedBy->id) }}" class="pl-2 ">{{ $raisedBy->name }}</a>
                                </div>
                            </td>
                            <td>
                                <div class="d-flex align-items-center">
                                    <div class="" style="width: 28px;">
                                        <div style="width: 32px; height: 28px;">
                                            @if ($personResponsible->image)
                                                <img src="{{ asset('user-uploads/avatar/'.$personResponsible->image) }}" alt="" width="24" height="24" style="width: 28px; height: 28px;" class="rounded-circle">
                                            @else
                                                <img src="{{ asset('img/avatar.png') }}" alt="" width="24" height="24" style="width: 28px; height: 28px;" class="rounded-circle">
                                            @endif
                                        </div>
                                    </div>
                                    <a href="{{ route('employees.show',$personResponsible->id) }}" class="pl-2 ">{{ $personResponsible->name }}</a>
                                </div>
                            </td>
                            <td>
                                <p>{{ $item->revision_acknowledgement }}</p>
                            </td>
                            <td>
                                <p>{{ $item->created_at }}</p>
                            </td>
                            <td>
                                @if ($item->dispute_status == 1)
                                    <span class="badge badge-success">Yes</span>
                                @else
                                    <span class="badge badge-danger">No</span>
                                @endif
                            </td>
                            <td>
                                @if ($item->status==1)
                                    <div class="d-flex align-items-center">
                                        <div class="" style="width: 28px;">
                                            <div style="width: 32px; height: 28px;">
                                                @if ($win->image)
                                                    <img src="{{ asset('user-uploads/avatar/'.$win->image) }}" alt="" width="24" height="24" style="width: 28px; height: 28px;" class="rounded-circle">
                                                @else
                                                    <img src="{{ asset('img/avatar.png') }}" alt="" width="24" height="24" style="width: 28px; height: 28px;" class="rounded-circle">
                                                @endif
                                            </div>
                                        </div>
                                        <a href="{{ route('employees.show',$win->id) }}" class="pl-2 ">{{ $win->name }}</a>
                                    </div>
                                @else
                                <p>--</p>
                                @endif
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  <script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
  <script>
      new DataTable('#monthlyDisputeTable',{
        "dom": 't<"d-flex"l<"ml-auto"ip>><"clear">',
      });
  </script>
