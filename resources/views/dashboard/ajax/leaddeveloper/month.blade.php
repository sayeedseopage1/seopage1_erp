<div class="row">
    <div class="col-md-4">
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of tasks received</h5>
                <div class="d-flex flex-wrap">
                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal" data-target="#number_of_task_received{{$number_of_tasks_received_lead}}">
                            {{$number_of_tasks_received_lead}}
                        </a>
                        {{-- <span class="f-12 font-weight-normal text-lightest">
                            @lang('Received tasks this cycle')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#"></i>
                         
                        </span> --}}
                    </p>
                    {{-- @include('dashboard.ajax.leaddeveloper.modals.number_of_task_received') --}}
    
                  
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
                        <a href="#" data-toggle="modal" data-target="#submit_number_of_tasks_in_this_month_lead{{$submit_number_of_tasks_in_this_month_lead}}">
                         
    
                        {{$submit_number_of_tasks_in_this_month_lead}}
                          
                        </a>
                        {{-- <span class="f-12 font-weight-normal text-lightest">
                            @lang('Primary pages')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#"></i>
                         
                        </span> --}}
                    </p>
                    {{-- @include('dashboard.ajax.leaddeveloper.modals.number_of_task_submitted') --}}
                   
    
                   
                  
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
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of approved tasks on 1st attempt by Project Manager</h5>
                <div class="d-flex flex-wrap">
                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal" data-target="#">
                            {{$first_attempt_approve_task_in_this_month_lead}}
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
    <div class="col-md-4">
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of approved tasks on 1st attempt by Client</h5>
                <div class="d-flex flex-wrap">
                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal" data-target="#num_of_approved_task_attempt_by_client{{count($first_attempt_approve_task_data_client_lead)}}">
                            {{$first_attempt_approve_task_in_this_month_client_lead}}
                        </a>
                      
                    </p>
                    @include('dashboard.ajax.leaddeveloper.modals.num_of_approved_task_attempt_by_client')			   
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
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Avg number of attempts needed for approval by Project Manager</h5>
                <div class="d-flex flex-wrap">
    
                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal" data-target="#">
                         
    
                            {{round($average_submission_aproval_in_this_month_lead,2)}}
                          
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
                        <a href="#" data-toggle="modal" data-target="#avg_num_of_approval_by_client{{count($first_attempt_approve_task_data_client_lead)}}">
                         
    
                            {{round($average_submission_aproval_in_this_month_client_lead,2)}}
                          
                        </a>
                        @include('dashboard.ajax.leaddeveloper.modals.avg_num_of_approval_by_client')			   
                       
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
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Percentage of tasks with revisions</h5>
                <div class="d-flex flex-wrap">
    
                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal" data-target="#percentage_of_task_with_revision{{count($revision_data_lead)}}">
                         
    
                            {{round($percentage_of_tasks_with_revision_lead,2)}}%
                          
                        </a>
                        @include('dashboard.ajax.leaddeveloper.modals.percentage_of_task_with_revision')			   
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
                    Total number of revisions
                    </h5>
                <div class="d-flex flex-wrap">
    
                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal" data-target="#total_num_of_revision{{count($revision_data_lead)}}">
                         
    
                            {{round($number_of_total_revision_for_this_month_lead,2)}}
                          
                        </a>
                        @include('dashboard.ajax.leaddeveloper.modals.total_num_of_revision')			   
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
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey"> Average task submission time (In days)</h5>
                <div class="d-flex flex-wrap">
    
                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal" data-target="#avg_task_submission_in_day{{count($average_submit_data_lead)}}">
                         
    
                            {{round($average_submission_day_in_this_month_lead,2)}} Days
                          
                        </a>
                        @include('dashboard.ajax.leaddeveloper.modals.avg_task_submission_in_day')			   
                       
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
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Average number of in-progress tasks</h5>
                <div class="d-flex flex-wrap">
    
                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal" data-target="#avg_num_in_progress_task{{count($total_in_progress_date_range_table_lead)}}">
                         
    
                            {{round($average_in_progress_date_range_lead ,2)}}
                          
                        </a>
                        @include('dashboard.ajax.leaddeveloper.modals.avg_num_in_progress_task')			   
                       
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
                    Percentage of tasks where deadline was missed 
                    </h5>
                <div class="d-flex flex-wrap">
    
                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal" data-target="#percentage_of_tasks_deadline_missed{{count($estimate_missed_task_data_lead)}}">
                         
    
                            {{round($percentage_of_tasks_deadline_lead,2)}}%
                          
                        </a>
                        @include('dashboard.ajax.leaddeveloper.modals.percentage_of_tasks_deadline_missed')	
                       
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
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Percentage of tasks where given estimated time was missed</h5>
                <div class="d-flex flex-wrap">
    
                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal" data-target="#percentage_task_estimate_time_missed{{count($estimate_missed_task_data_lead)}}">
                         
                            {{round($percentage_number_task_cross_estimate_time_lead,2)}}%
                          
                        </a>
                        @include('dashboard.ajax.leaddeveloper.modals.percentage_task_estimate_time_missed')	
                       
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
    
                    <h6 class="mb-0 f-18 font-weight-bold mr-5">
                        No. of disputes filed:
                        <a href="#" data-toggle="modal" data-target="#">
                         
    
                          {{$number_of_dispute_filed_own_lead}} 
                          
                          
                        </a>
                       
                    </h6>
                    <h6 class="mb-0 f-18 font-weight-bold mr-5">
                        No. of disputes (Overall):
                        <a href="#" data-toggle="modal" data-target="#no_of_dispute_overall{{count($number_of_dispute_filed_all_data_lead)}}">
                         
    
                            {{$number_of_dispute_filed_all_lead}}
                          
                          
                        </a>
                        @include('dashboard.ajax.leaddeveloper.modals.no_of_dispute_overall')			   
                    </h6>
                  
    
                  
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
    
                        <h6 class="mb-0 f-18 font-weight-bold mr-5">
                            No. of disputes lost(Raised By Developer):
                            <a href="#" data-toggle="modal" data-target="#no_of_dispute_lost{{count($number_of_dispute_lost_own_data_lead )}}">
                             
    
                                 {{ $number_of_dispute_lost_own_lead}}
    
                            </a>
                            @include('dashboard.ajax.leaddeveloper.modals.no_of_dispute_lost')			   
                           
                        </h6>
                        <h6 class="mb-0 f-18 font-weight-bold mr-5">
                            No. of disputes lost(Overall):
                            <a href="#" data-toggle="modal" data-target="#no_of_dispute_lost_overall{{count($number_of_dispute_lost_all_data_lead)}}">
                             
    
                                 {{ $number_of_dispute_lost_all_lead}}
                              
                            </a>
                            @include('dashboard.ajax.leaddeveloper.modals.no_of_dispute_lost_overall')			   
                           
                        </h6>
    
                      
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
                            <a href="#" data-toggle="modal" data-target="#hours_spent_in_revision{{count($spent_revision_developer_data_lead)}}">
                                {{round($spent_revision_developer_lead,2)}} Hours
                              
                            </a>
                           
                        </p>

                        @include('dashboard.ajax.leaddeveloper.modals.hours_spent_in_revision')			   
        
                      
                    </div>
                </div>
                <div class="d-block">
                    <i class="fa fa-list text-lightest f-27"></i>
                </div>
            </div>
        </div>
    
    </div>
    <div class="row my-5">
				
        <div class="col-sm-6 col-lg-6 p-3">
            <x-cards.data :title="__('')" padding="false" otherClasses="h-200">
                <x-table class="border-0 pb-3 admin-dash-table table-hover mt-3">
                    <x-slot name="thead">
                        <th class="pl-20">#</th>
                        <th>Creation Date</th>
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
                            @if($task->board_column_id == 2 || $task->board_column_id == 1 || $task->board_column_id == 3)
                            N\A 
                            @else 
                            {{$task->submission_date}}
                          
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


        <div class="col-sm-6 col-lg-6 p-3">
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