<div class="row">
<div class="col-md-4">
    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
        <div class="d-block text-capitalize">
            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of tasks received</h5>
            <div class="d-flex flex-wrap">
                <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                    <a href="#" data-toggle="modal" data-target="#">
                        {{$number_of_tasks_received}}
                    </a>
                    {{-- <span class="f-12 font-weight-normal text-lightest">
                        @lang('Received tasks this cycle')
                        <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#"></i>
                     
                    </span> --}}
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
            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of submitted tasks</h5>
            <div class="d-flex flex-wrap">

                <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                    <a href="#" data-toggle="modal" data-target="#">
                     

                    {{$submit_number_of_tasks_in_this_month}}
                      
                    </a>
                    {{-- <span class="f-12 font-weight-normal text-lightest">
                        @lang('Primary pages')
                        <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#"></i>
                     
                    </span> --}}
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
            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of approved tasks on 1st attempt by Lead Developer</h5>
            <div class="d-flex flex-wrap">
                <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                    <a href="#" data-toggle="modal" data-target="#">
                        {{$first_attempt_approve_task_in_this_month}}
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
                    <a href="#" data-toggle="modal" data-target="#">
                        {{$first_attempt_approve_task_in_this_month_client}}
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
                    <a href="#" data-toggle="modal" data-target="#">
                     

                        {{round($average_submission_aproval_in_this_month_client,2)}}
                      
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
<div class="col-md-3">
    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
        <div class="d-block text-capitalize">
            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Percentage of tasks with revisions</h5>
            <div class="d-flex flex-wrap">

                <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                    <a href="#" data-toggle="modal" data-target="#">
                     

                        {{round($percentage_of_tasks_with_revision,2)}}%
                      
                    </a>
                   
                </p>

              
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
                    <a href="#" data-toggle="modal" data-target="#">
                     

                        {{round($number_of_total_revision_for_this_month,2)}}
                      
                    </a>
                   
                </p>

              
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
                    <a href="#" data-toggle="modal" data-target="#">
                     

                        {{round($average_submission_time_in_this_month,2)}} Hours
                      
                    </a>
                   
                </p>

              
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
                    <a href="#" data-toggle="modal" data-target="#">
                     

                        {{round($average_submission_day_in_this_month,2)}} Days
                      
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
            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Average number of in-progress tasks</h5>
            <div class="d-flex flex-wrap">

                <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                    <a href="#" data-toggle="modal" data-target="#">
                     

                        {{round($average_in_progress_date_range ,2)}}
                      
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
                Percentage of tasks where deadline was missed 
                </h5>
            <div class="d-flex flex-wrap">

                <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                    <a href="#" data-toggle="modal" data-target="#">
                     

                        {{round($percentage_of_tasks_deadline,2)}}%
                      
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
            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Percentage of tasks where given estimated time was missed</h5>
            <div class="d-flex flex-wrap">

                <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                    <a href="#" data-toggle="modal" data-target="#">
                     
                        {{round($percentage_number_task_cross_estimate_time,2)}}%
                      
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
                     

                      {{$number_of_dispute_filed_own}} 
                      
                      
                    </a>
                   
                </h6>
                <h6 class="mb-0 f-18 font-weight-bold mr-5">
                    No. of disputes (Overall):
                    <a href="#" data-toggle="modal" data-target="#">
                     

                        {{$number_of_dispute_filed_all}}
                      
                      
                    </a>
                   
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
                        <a href="#" data-toggle="modal" data-target="#">
                         

                             {{ $number_of_dispute_lost_own}}

                        </a>
                       
                    </h6>
                    <h6 class="mb-0 f-18 font-weight-bold mr-5">
                        No. of disputes lost(Overall):
                        <a href="#" data-toggle="modal" data-target="#">
                         

                             {{ $number_of_dispute_lost_all}}
                          
                        </a>
                       
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
                        <a href="#" data-toggle="modal" data-target="#">
                            {{round($spent_revision_developer,2)}} Hours
                          
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