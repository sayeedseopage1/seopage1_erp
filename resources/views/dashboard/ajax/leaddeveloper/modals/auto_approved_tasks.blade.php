<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
<div id="auto_approved_tasks{{count($auto_approved_tasks_data)}}" class="modal fade" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <div class="modal-title">
                    <h4>
                        Total number of received tasks : __
                    </h4>
                    <h4>
                        Total number of approved tasks :{{ round($number_of_approval, 2) }}
                    </h4>
                    <h4>
                        Auto approval count :{{ round($auto_approved_tasks, 2) }}
                    </h4>
                    <h4>
                        Manual approval count :{{ round($manually_approved_tasks, 2) }}
                    </h4>

                </div>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <table id="auto_approved_tasks_table" class="display" style="width:100%">
                    <thead>
                        <tr>
                            <th scope="col">Sl No</th>
                            <th scope="col">Task Name</th>
                            <th scope="col">Client Name</th>
                            <th scope="col">Project Manager</th>
                            <th scope="col">Task receive date</th>
                            <th scope="col">Assign date</th>
                            <th scope="col">Approved on</th>
                            <th scope="col">Approval type</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($auto_approved_tasks_data as $row)
                            <tr>
                                <td>{{ $loop->iteration }}</td>
                                <td>
                                    <a href="{{ route('tasks.show', $row->id) }}">{{ $row->heading }}<a>
                                </td>
                                <td>
                                    @if ($row?->project?->client)
                                        <a href="{{ route('clients.show', $row->project->client->id) }}">
                                            {{ $row->project->client->name }}</a>
                                    @endif
                                </td>
                                <td>
                                    {{ $row?->project?->pm?->name }}
                                </td>
                                <td>
                                    {{ $row?->created_at }}
                                </td>
                                <td>{{ $row?->firstSubTask?->created_at ?? 'none' }}</td>
                                <td>{{ $row?->latestAuthUserApproved?->created_at ?? 'none' }}</td>
                                <td>
                                    @if (in_array($row->id, $manually_approved_task_ids))
                                        Manually Approved
                                    @else
                                        Auto Approved
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
    new DataTable('#auto_approved_tasks_table', {
        "dom": 't<"d-flex"l<"ml-auto"ip>><"clear">',
    });
</script>
