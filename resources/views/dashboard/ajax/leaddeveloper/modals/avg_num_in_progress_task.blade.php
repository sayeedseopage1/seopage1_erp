<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
<div class="modal fade" id="avg_num_in_progress_task{{count($total_in_progress_date_range_table_lead)}}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-title"><h4>Submitted Tasks: {{$submit_number_of_tasks_in_this_month_lead}}</h4>
         
             </div>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <table id="total_in_progress_date_range_table_lead_table" class="display" style="width:100%">
                <thead>
                  <tr>
                    <th scope="col">Sl No</th>
                    <th scope="col">Assign Date</th>
                    <th scope="col">Task Name</th>
                    <th scope="col">Client Name</th>
                    <th scope="col">Submission Date</th>
                    <th scope="col">Deadline</th>
                    <th scope="col">status</th>
                    <th scope="col">Revision Count</th>
                  </tr>
                </thead>
                <tbody>
                    @foreach($total_in_progress_date_range_table_lead as $row)
                    <tr>
                        <td>{{$loop->index+1}}</td>
                        <td>
                            {{$row->assign_date}}
                          
                        </td>
                        <td>
                            <a href="{{route('tasks.show',$row->id)}}">{{$row->heading}}<a>
                         
                        </td>
                        <td>
                            @if($row->cl_id != null)
                            {{$row->cl_name}}
                            @elseif($row->client_name != null)
                            {{$row->client_name}}
                            @else 
                           <a href="{{route('clients.show',$row->clientId)}}"> {{$row->clientName}}</a>

                            @endif

                        </td>
                        <td>
                            @if($row->board_column_id == 1 || $row->board_column_id == 2 || $row->board_column_id == 3)
                            N\A 
                            @else 
                            {{$row->submission_date}}
                        @endif
                    </td>
                        <td>{{$row->due_date}}</td>
                        <td>
                          <span style="color: {{$row->label_color}}"> {{$row->column_name}}</span>
                        </td>
                        <td class="revision-count" data-task-id="{{ $row->id }}" style="cursor:pointer">{{$row->revision_count ?? '--'}}</td>
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
      new DataTable('#total_in_progress_date_range_table_lead_table',{
        "dom": 't<"d-flex"l<"ml-auto"ip>><"clear">',
      });
      $('.revision-count').on('click', function () {
            var taskId = $(this).data('task-id');
            var url = '{{ route('revision-count-dashboard', ':taskId') }}'.replace(':taskId', taskId);

            // Reference 'this' to use inside the AJAX success function
            var self = $(this);

            // Make an AJAX request to fetch task history data
            $.ajax({
                url: url,
                type: 'GET',
                success: function (data) {
              //  console.log(data);
                    // Format the task history data for display in the popover
                    var popoverContent = '<ul >';
                    $.each(data, function (index, revision) {
                        
                        // popoverContent += '<li class="history_color">' + history.column_name + ' (' + history?.created_on + ')</li>';
                        popoverContent += `<li> ${revision.created_at} (${revision.final_responsible_person}) </li>`;
                     

                    });
                    popoverContent += '</ul>';

                    // Open a Bootstrap popover and display the task history data
                    self.popover({
                        content: popoverContent,
                        html: true,
                        title: 'Task Revisions',
                        placement: 'auto',
                        trigger: 'manual' // Set trigger to 'manual' to control popover manually
                    }).popover('show');
                },
                error: function (xhr, status, error) {
                    console.error('Error fetching task revisions:', error);
                }
            });
        });
  </script>
