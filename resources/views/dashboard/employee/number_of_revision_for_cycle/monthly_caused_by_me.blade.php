<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
<div class="modal fade" id="monthlyCausedByMe{{count($caused_by_me_for_previous_cycle)}}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Caused By Me: {{ count($caused_by_me_for_previous_cycle) }}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <table id="monthlycausedByMeTable" class="display" style="width:100%">
                <thead>
                    <tr>
                    <th scope="col">Sl No</th>
                    <th scope="col">Project Name</th>
                    <th scope="col">Task Hadding</th>
                    <th scope="col">Revision By</th>
                    <th scope="col">Status</th>
                    <th scope="col">Creation Date</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($caused_by_me_for_previous_cycle as $item)
                        @php
                            $project = \App\Models\Project::where('id',$item->project_id)->first();
                            $user = \App\Models\User::where('id',$item->added_by)->first();
                        @endphp
                    <tr>
                        <td>{{ $loop->iteration }}</td>
                        <td>
                            <a href="{{ route('projects.show',$project->id) }}">{{ $project->project_name }}</a>
                        </td>
                        <td>
                            <a href="{{ route('tasks.show',$item->task_id) }}">{{ $item->heading }}</a>
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
                            @if ($item->approval_status == 'accepted')
                                <span class="badge badge-success">{{ $item->approval_status }}</span>
                            @endif
                            @if ($item->approval_status == 'pending')
                                <span class="badge badge-info">{{ $item->approval_status }}</span>
                            @endif
                        </td>
                        <td>{{ $item->created_at }}</td>
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
      new DataTable('#monthlycausedByMeTable',{
        "dom": 't<"d-flex"l<"ml-auto"ip>><"clear">',
      });
  </script>
