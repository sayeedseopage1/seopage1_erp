<div class="row">
<div class="col-md-4">
    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
        <div class="d-block text-capitalize">
            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of tasks received</h5>
            <div class="d-flex flex-wrap">
                <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                    <a href="#" data-toggle="modal" data-target="#number_of_task_received{{$number_of_tasks_received}}">
                        {{$number_of_tasks_received}}
                    </a>
                    {{-- <span class="f-12 font-weight-normal text-lightest">
                        @lang('Received tasks this cycle')
                        <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#"></i>
                     
                    </span> --}}
                </p>
                @include('dashboard.ajax.developerdashboard.modals.number_of_task_received')
            

              
            </div>
        </div>
        <div class="d-block">
            <i class="fa fa-list text-lightest f-27"></i>
        </div>
    </div>
</div>
<div class="col-md-4">
    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
        <div class="d-block text-capitalize">
            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of submitted tasks</h5>
            <div class="d-flex flex-wrap">

                <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                    <a href="#" data-toggle="modal" data-target="#submit_number_of_tasks_in_this_month{{$submit_number_of_tasks_in_this_month}}">
                     

                    {{$submit_number_of_tasks_in_this_month}}
                      
                    </a>
                    {{-- <span class="f-12 font-weight-normal text-lightest">
                        @lang('Primary pages')
                        <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#"></i>
                     
                    </span> --}}
                </p>
                @include('dashboard.ajax.developerdashboard.modals.number_of_task_submitted')
               

               
              
            </div>
        </div>
        <div class="d-block">
            <i class="fa fa-list text-lightest f-27"></i>
        </div>
    </div>
</div>
<div class="col-md-4">
    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
        <div class="d-block text-capitalize">
            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of approved tasks on 1st attempt by Lead Developer</h5>
            <div class="d-flex flex-wrap">
                <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                    <a href="#" data-toggle="modal" data-target="#first_attempt_approve_task{{count($first_attempt_approve_task_in_this_month)}}">
                       {{count($first_attempt_approve_task_in_this_month)}}
                    </a>
                  
                </p>
                @include('dashboard.ajax.developerdashboard.modals.first_attempt_approve_task_data')
            

              
              
            </div>
        </div>
        <div class="d-block">
            <i class="fa fa-list text-lightest f-27"></i>
        </div>
    </div>
</div>

</div>
<div class="row mt-3">
    <div class="col-md-4">
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of approved tasks on 1st attempt by Client</h5>
                <div class="d-flex flex-wrap">
                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal" data-target="#first_attempt_approve_task_client{{count($first_attempt_approve_task_in_this_month_client_data)}}">
                            {{count($first_attempt_approve_task_in_this_month_client_data)}}
                        </a>
                      
                    </p>
                    @include('dashboard.ajax.developerdashboard.modals.first_attempt_approve_task_client_data')
          
                  
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
<div class="col-md-4">
    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
        <div class="d-block text-capitalize">
            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Avg number of attempts needed for approval by Lead Developer</h5>
            <div class="d-flex flex-wrap">

                <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                    <a href="#" data-toggle="modal" data-target="#">
                     

                        {{round($average_submission_aproval_in_this_month,2)}}
                      
                    </a>
                   
                </p>

              
            </div>
        </div>
        <div class="d-block">
            <i class="fa fa-list text-lightest f-27"></i>
        </div>
    </div>
</div>
<div class="col-md-4">
    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
        <div class="d-block text-capitalize">
            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Avg number of attempts needed for approval by Client</h5>
            <div class="d-flex flex-wrap">

                <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                    <a href="#" data-toggle="modal" data-target="#avg_task_approval_client{{count($average_number_of_tasks_approved_client_data)}}">
                        {{round($average_submission_aproval_in_this_month_client,2)}}
                    </a>   
                </p>
                @include('dashboard.ajax.developerdashboard.modals.avg_task_approval_client')

              
            </div>
        </div>
        <div class="d-block">
            <i class="fa fa-list text-lightest f-27"></i>
        </div>
    </div>
</div>



</div>
<div class="row mt-3">
<div class="col-md-3">
    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
        <div class="d-block text-capitalize">
            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Percentage of tasks with revisions</h5>
            <div class="d-flex flex-wrap">

                <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                    <a href="#" data-toggle="modal" data-target="#percentage_task_with_revision{{count($revision_task_data)}}">
                        {{round($percentage_of_tasks_with_revision,2)}}%
                    </a>
                </p>
                @include('dashboard.ajax.developerdashboard.modals.percentage_task_with_revision')

              
            </div>
        </div>
        <div class="d-block">
            <i class="fa fa-list text-lightest f-27"></i>
        </div>
    </div>
</div>
<div class="col-md-3">
    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
        <div class="d-block text-capitalize">
            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">
                Total number of revisions
                </h5>
            <div class="d-flex flex-wrap">
                <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                    <a href="#" data-toggle="modal" data-target="#total_no_of_revision{{count($revision_task_data)}}">
                        {{round($number_of_total_revision_for_this_month,2)}}%
                    </a>
                </p>
                @include('dashboard.ajax.developerdashboard.modals.total_num_of_revision')

              
            </div>
        </div>
        <div class="d-block">
            <i class="fa fa-list text-lightest f-27"></i>
        </div>
    </div>
</div>
<div class="col-md-3">
    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
        <div class="d-block text-capitalize">
            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Avg. logged time for complete tasks (In Hours)</h5>
            <div class="d-flex flex-wrap">

                <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                    <a href="#" data-toggle="modal" data-target="#avg_logged_time_complete_task{{$submit_number_of_tasks_in_this_month}}">
                     

                        {{round($average_submission_time_in_this_month,2)}} Hours
                      
                    </a>
                   
                </p>
                @include('dashboard.ajax.developerdashboard.modals.avg_logged_time_complete_task')

              
            </div>
        </div>
        <div class="d-block">
            <i class="fa fa-list text-lightest f-27"></i>
        </div>
    </div>
</div>
<div class="col-md-3">
    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
        <div class="d-block text-capitalize">
            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey"> Average task submission time (In days)</h5>
            <div class="d-flex flex-wrap">

                <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                    <a href="#" data-toggle="modal" data-target="#avg_task_submission_time_in_days{{$submit_number_of_tasks_in_this_month}}">
                     

                        {{round($average_submission_day_in_this_month,2)}} Days
                      
                    </a>
                   
                </p>
                @include('dashboard.ajax.developerdashboard.modals.avg_task_submission_time_in_days')

              
            </div>
        </div>
        <div class="d-block">
            <i class="fa fa-list text-lightest f-27"></i>
        </div>
    </div>
</div>




</div>
<div class="row mt-3">
<div class="col-md-4">
    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
        <div class="d-block text-capitalize">
            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Average number of in-progress tasks</h5>
            <div class="d-flex flex-wrap">

                <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                    <a href="#" data-toggle="modal" data-target="#avg_num_in_progress{{count($total_in_progress_date_range_table)}}">
                     

                        {{round($average_in_progress_date_range ,2)}}
                      
                    </a>
                   
                </p>
                @include('dashboard.ajax.developerdashboard.modals.avg_num_in_progress')

              
            </div>
        </div>
        <div class="d-block">
            <i class="fa fa-list text-lightest f-27"></i>
        </div>
    </div>
</div>
<div class="col-md-4">
    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
        <div class="d-block text-capitalize">
            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">
                Percentage of tasks where deadline was missed 
                </h5>
            <div class="d-flex flex-wrap">
                <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                    <a href="#" data-toggle="modal" data-target="#deadline_was_missed{{count($deadline_missed_task_data)}}">
                        {{round($percentage_of_tasks_deadline,2)}}%
                    </a>
                </p>
                {{-- @include('dashboard.ajax.developerdashboard.modals.percentage_task_deadline_missed')               --}}
            </div>
        </div>
        <div class="d-block">
            <i class="fa fa-list text-lightest f-27"></i>
        </div>
    </div>
</div>
<div class="col-md-4">
    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
        <div class="d-block text-capitalize">
            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Percentage of tasks where given estimated time was missed</h5>
            <div class="d-flex flex-wrap">
                <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                    <a href="#" data-toggle="modal" data-target="#estimated_time_was_missed{{count($estimate_missed_task_data)}}">
                        {{round($percentage_number_task_cross_estimate_time,2)}}%
                    </a>
                </p>
                @include('dashboard.ajax.developerdashboard.modals.estimated_time_was_missed')

              
            </div>
        </div>
        <div class="d-block">
            <i class="fa fa-list text-lightest f-27"></i>
        </div>
    </div>
</div>



</div>
<div class="row mt-3">
<div class="col-md-4">
    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
        <div class="d-block text-capitalize">
            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Rejection rate</h5>
            <div class="d-flex flex-wrap">

                <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                    <a href="#" data-toggle="modal" data-target="#">
                     

                    0%
                      
                    </a>
                   
                </p>

              
            </div>
        </div>
        <div class="d-block">
            <i class="fa fa-list text-lightest f-27"></i>
        </div>
    </div>
</div>
<div class="col-md-4">
    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
        <div class="d-block text-capitalize">
            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">
                Cancelation rate 
                </h5>
            <div class="d-flex flex-wrap">

                <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                    <a href="#" data-toggle="modal" data-target="#">
                     

                    0%
                      
                    </a>
                   
                </p>

              
            </div>
        </div>
        <div class="d-block">
            <i class="fa fa-list text-lightest f-27"></i>
        </div>
    </div>
</div>
<div class="col-md-4">
    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
        <div class="d-block text-capitalize">
            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Rate of reassign</h5>
            <div class="d-flex flex-wrap">

                <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                    <a href="#" data-toggle="modal" data-target="#">
                     

                    0
                      
                    </a>
                   
                </p>

              
            </div>
        </div>
        <div class="d-block">
            <i class="fa fa-list text-lightest f-27"></i>
        </div>
    </div>
</div>



</div>
<div class="row mt-3">
<div class="col-md-5">
    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
        <div class="d-block text-capitalize">
            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of disputes filed</h5>
            <div class="d-flex flex-wrap">

                <p class="mb-0 f-18 font-weight-bold mr-5">
                    No. of disputes filed:
                    
                    <a href="#" data-toggle="modal" data-target="#dispute_file_own{{count($number_of_dispute_filed_own_data) }}">
                        {{$number_of_dispute_filed_own}} 
                    </a>
                    @include('dashboard.ajax.developerdashboard.modals.dispute_file_own')
                   
                </p>
                <p class="mb-0 f-18 font-weight-bold mr-5">
                    No. of disputes (Overall):
                    <a href="#" data-toggle="modal" data-target="#disput_file_all_data{{count($number_of_dispute_filed_all_data)}}">
                        {{$number_of_dispute_filed_all}}
                    </a>
                    @include('dashboard.ajax.developerdashboard.modals.dispute_file_all_data')
                </p>
              

              
            </div>
        </div>
        <div class="d-block">
            <i class="fa fa-list text-lightest f-27"></i>
        </div>
    </div>
</div>
<div class="col-md-7">
    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
        <div class="d-block text-capitalize">
            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">
                No. of disputes lost
                </h5>
                <div class="d-flex flex-wrap">

                    <p class="mb-0 f-18 font-weight-bold mr-5">
                        No. of disputes lost(Raised By Developer):
                        <a href="#" data-toggle="modal" data-target="#no_of_dispute_lost{{count($number_of_dispute_filed_own_data) }}">
                         

                             {{ $number_of_dispute_lost_own}}

                        </a>
                        @include('dashboard.ajax.developerdashboard.modals.no_of_dispute_lost')
                       
                    </p>
                    <p class="mb-0 f-18 font-weight-bold mr-5">
                        No. of disputes lost(Overall):
                        <a href="#" data-toggle="modal" data-target="#no_of_dispute_lost_overall{{count($number_of_dispute_filed_all_data)}}">
                         

                             {{ $number_of_dispute_lost_all}}
                          
                        </a>
                        @include('dashboard.ajax.developerdashboard.modals.no_of_dispute_lost_overall')
                    </p>

                  
                </div>
        </div>
        <div class="d-block">
            <i class="fa fa-list text-lightest f-27"></i>
        </div>
    </div>
</div>


</div>
<div class="row mt-3">
    <div class="col-md-4">
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Hours spent in revisions</h5>
                <div class="d-flex flex-wrap">
    
                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal" data-target="#hours_spent_in_revision_modal{{count($spent_revision_developer_data)}}">
                            {{round($spent_revision_developer,2)}} Hours
                          
                        </a>
                       
                    </p>
                    @include('dashboard.ajax.developerdashboard.modals.hours_spent_in_revision_modal')
    
                  
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>

</div>
<div class="row mt-3">
				
    <div class="col-sm-6 col-lg-6">
        <x-cards.data :title="__('')" padding="false" otherClasses="h-200">
            <x-table class="border-0 pb-3 admin-dash-table table-hover mt-3">
                <x-slot name="thead">
                    <th class="pl-20">#</th>
                    <th>Date</th>
                    <th>Task Name</th>
                    <th>Client Name</th>
                    <th>Submittion date</th>
                    <th>Current Status</th>
                    
                
                </x-slot>

                @forelse($tasks as $task)
                
                <tr>
                    <td class="pl-20">{{$loop->index+1}}</td>
                    <td>
                       {{$task->created_at}}
                    </td>
                    <td>
                       <a href="{{route('tasks.show',$task->id)}}"> {{$task->heading}}</a>
                    
                    </td>
                    <td>
                        @if($task->ProjectId != null)

                        <a href="{{route('clients.show',$task->client_id)}}">{{$task->clientName}}</a>
                        @elseif($task->task_client_name != null)
                        {{$task->task_client_name}}
                        @else 
                        {{$task->cl_name}}

                        @endif
                        
                    </td>

                    <td>
                        @if($task->board_column_id != 2 || $task->board_column_id != 1 || $task->board_column_id != 3)
                        {{$task->submission_date}}
                        @else 
                        N\A 
                        @endif
                        
                    </td>
                    <td>
                        <span class="task-status" data-task-id="{{ $task->id }}" style="color: {{ $task->label_color }}; cursor:pointer">
                            {{ $task->column_name }}
                        </span>


                        
                    
                    </td>
                    
                    
                    
                  
                </tr>
                @empty
                
                <tr>
                    <td colspan="10" class="shadow-none">
                        <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
                    </td>
                </tr>
                @endforelse
                
            </x-table>
        </x-cards.data>
    </div>

    <div class="col-sm-6 col-lg-6">
        <x-cards.data :title="__('')" padding="false" otherClasses="h-200">
            <x-table class="border-0 pb-3 admin-dash-table table-hover mt-3">
                <x-slot name="thead">
                    <th class="pl-20">#</th>
                    <th>Creation Date</th>
                    <th>task Name</th>
                    <th>Client Name</th>
                    <th>Current Status</th>
                    
            
                </x-slot>

                
                
                @forelse($past_tasks as $task)
                    
                <tr>
                    <td class="pl-20">{{$loop->index+1}}</td>
                    <td>
                       {{$task->created_at}}
                    </td>
                    <td>
                        <a href="{{route('tasks.show',$task->id)}}"> {{$task->heading}}</a>
                    
                    </td>
                    <td>
                        @if($task->ProjectId != null)

                        <a href="{{route('clients.show',$task->client_id)}}">{{$task->clientName}}</a>
                        @elseif($task->task_client_name != null)
                        {{$task->task_client_name}}
                        @else 
                        {{$task->cl_name}}

                        @endif
                        
                    </td>

                  
                    <td>
                        <span class="task-status" data-task-id="{{ $task->id }}" style="color: {{ $task->label_color }}; cursor:pointer">
                            {{ $task->column_name }}
                        </span>


                       
                        
                    
                    </td>
                    
                    
                    
                  
                </tr>
                @empty
                
                <tr>
                    <td colspan="10" class="shadow-none">
                        <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
                    </td>
                </tr>
                @endforelse
                
            </x-table>
        </x-cards.data>
    </div>
    <!-- CARD BODY START -->

</div>
<script>
	$(document).ready(function () {
        // Enable Bootstrap popovers
        $('[data-toggle="popover"]').popover();

        // Handle click on task status element
        $('.task-status').on('click', function () {
            var taskId = $(this).data('task-id');
            var url = '{{ route('task_history_dashboard', ':taskId') }}'.replace(':taskId', taskId);

            // Reference 'this' to use inside the AJAX success function
            var self = $(this);

            // Make an AJAX request to fetch task history data
            $.ajax({
                url: url,
                type: 'GET',
                success: function (data) {
                console.log(data);
                    // Format the task history data for display in the popover
                    var popoverContent = '<ul >';
                    $.each(data, function (index, history) {
                        
                        // popoverContent += '<li class="history_color">' + history.column_name + ' (' + history?.created_on + ')</li>';
                        popoverContent += `<li> ${history.column_name} (${history.created_on}) </li>`;
                     

                    });
                    popoverContent += '</ul>';

                    // Open a Bootstrap popover and display the task history data
                    self.popover({
                        content: popoverContent,
                        html: true,
                        title: 'Task History',
                        placement: 'auto',
                        trigger: 'manual' // Set trigger to 'manual' to control popover manually
                    }).popover('show');
                },
                error: function (xhr, status, error) {
                    console.error('Error fetching task history:', error);
                }
            });
        });
    });

        </script>
