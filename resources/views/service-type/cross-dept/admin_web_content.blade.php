@extends('layouts.app')
@section('content')
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="card mt-3" style="border: none">
                    <div class="card-body">
                        <table id="webContentTable" class="display" style="width:100%">
                            <thead>
                              <tr>
                                <th scope="col">Sl No</th>
                                <th scope="col">Project Name</th>
                                <th scope="col">Milestone Name</th>
                                <th scope="col">Client Name</th>
                                <th scope="col">PM Name</th>
                                <th scope="col">Added By</th>
                              </tr>
                            </thead>
                            <tbody>
                                @foreach ($web_contents as $item)
                                    @php
                                        $deal = \App\Models\Deal::where('id',$item->deal_id)->first();
                                        $client = \App\Models\User::where('id',$deal->client_id)->first();
                                        $project_milestone = \App\Models\ProjectMilestone::where('id',$item->milestone_id)->first();
                                        $project = \App\Models\Project::where('id',$project_milestone->project_id)->first();
                                        $pm = \App\Models\User::where('id',$project->pm_id)->first();
                                        $dealAddedBy = \App\Models\User::where('id',$deal->added_by)->first();
                                    @endphp
                                <tr>
                                    <td>{{ $loop->iteration }}</td>
                                    <td>
                                        <a href="{{ route('projects.show',$project->id) }}">{{ $project->project_name }}</a>
                                    </td>
                                    <td>{{ $project_milestone->milestone_title }}</td>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <div class="" style="width: 28px;">
                                                <div style="width: 32px; height: 28px;">
                                                    @if ($client->image)
                                                        <img src="{{ asset('user-uploads/avatar/'.$client->image) }}" alt="" width="24" height="24" style="width: 28px; height: 28px;" class="rounded-circle">
                                                    @else
                                                        <img src="{{ asset('img/avatar.png') }}" alt="" width="24" height="24" style="width: 28px; height: 28px;" class="rounded-circle">
                                                    @endif
                                                </div>
                                            </div>
                                            <a href="{{ route('clients.show',$client->id) }}" class="ml-2">{{ $client->name }}</a>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <div class="" style="width: 28px;">
                                                <div style="width: 32px; height: 28px;">
                                                    @if ($pm->image)
                                                        <img src="{{ asset('user-uploads/avatar/'.$pm->image) }}" alt="" width="24" height="24" style="width: 28px; height: 28px;" class="rounded-circle">
                                                    @else
                                                        <img src="{{ asset('img/avatar.png') }}" alt="" width="24" height="24" style="width: 28px; height: 28px;" class="rounded-circle">
                                                    @endif
                                                </div>
                                            </div>
                                            <a href="{{ route('employees.show',$pm->id) }}" class="ml-2">{{ $pm->name }}</a>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <div class="" style="width: 28px;">
                                                <div style="width: 32px; height: 28px;">
                                                    @if ($dealAddedBy->image)
                                                        <img src="{{ asset('user-uploads/avatar/'.$dealAddedBy->image) }}" alt="" width="24" height="24" style="width: 28px; height: 28px;" class="rounded-circle">
                                                    @else
                                                        <img src="{{ asset('img/avatar.png') }}" alt="" width="24" height="24" style="width: 28px; height: 28px;" class="rounded-circle">
                                                    @endif
                                                </div>
                                            </div>
                                            <a href="{{ route('employees.show',$dealAddedBy->id) }}" class="ml-2">{{ $dealAddedBy->name }}</a>
                                        </div>
                                    </td>
                                </tr>
                                @endforeach
                            </tbody>
                          </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
    <script>
        new DataTable('#webContentTable',{
          "dom": 't<"d-flex"l<"ml-auto"ip>><"clear">',
        });
    </script>
@endsection
