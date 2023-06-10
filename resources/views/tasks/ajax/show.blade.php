<section>
   <div class="f-16 mb-3">
        <span> <strong>Subtask: </strong> </span>
        <span>Lorem Ipsum is simply dummy text of the printing and typesetting elit</span>
    </div>  

    <div class="row">
        <div class="col-8">
            <section class="p-3 bg-white rounded-lg">
                {{-- button section --}}
                <div class="d-flex flex-wrap border-bottom pb-3 sp1_task_btn_group">
                    
                    {{-- start timer --}}
                    <button type="button" class="d-flex align-items-center btn btn-sm btn-outline-dark mr-2">
                        <i class="bi bi-play" style="font-size: 24px;margin-bottom: -1px;"></i>
                        Start Timer
                    </button>
                    
                    {{-- timer  --}}
                    <button type="button" class="d-flex align-items-center btn btn-sm btn-outline-dark mr-2">
                        <i class="bi bi-clock" style="font-size: 18px;margin-bottom: -1px;"></i>
                        <span class="d-inline ml-1">00:05:44</span>
                    </button>
                    
                    {{-- stop timer  --}}
                    <button type="button" class="d-flex align-items-center btn btn-sm btn-outline-dark mr-2">
                        <i class="bi bi-stop-circle" style="font-size: 18px;margin-bottom: -1px;"></i>
                        <span class="d-inline ml-1">Stop Timer</span>
                    </button>
                   
                    {{-- make complete --}}
                    <button type="button" class="d-flex align-items-center btn btn-sm btn-outline-dark mr-2">
                        <i class="bi bi-check2" style="font-size: 20px;margin-bottom: -1px;"></i>
                        <span class="d-inline ml-1">Mark As Complete</span>
                    </button>

                    {{-- request time extension --}}
                    <button type="button" class="d-flex align-items-center btn btn-sm btn-outline-dark mr-2">
                        <i class="bi bi-plus" style="font-size: 20px;margin-bottom: -1px;"></i>
                        <span class="d-inline ml-1">Request Time Extension</span>
                    </button>


                    {{-- approved --}}
                    <button type="button" class="d-flex align-items-center btn btn-sm btn-outline-dark mr-2 text-white border-0" style="background: #069C3C;">
                        <span class="d-inline mr-1">Approved</span> 
                    </button>

                    {{-- awaiting for time extension --}}
                    <button type="button" class="d-flex align-items-center btn btn-sm btn-outline-dark mr-2 text-dark border-0"  style="background: #FAF5D0;">
                        <span class="d-inline mr-1">Awaiting for Time Extension</span> 
                    </button>

                    {{-- 3 dot --}}
                    <button type="button" class="d-flex align-items-center btn btn-sm btn-outline-dark mr-2 border-0 ml-auto">
                        <i class="bi bi-three-dots" style="font-size: 20px;margin-bottom: -1px;"></i>
                    </button>
                </div>
                {{-- button section end --}}



                {{-- details --}}
                <div class="d-flex flex-column py-3">
                    <div class="d-flex align-items-center mb-2">
                        <div class="" style="width: 150px;">Parent Task: </div>
                        <div class="">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
                    </div>

                    <div class="d-flex align-items-center mb-2">
                        <div class="" style="width: 150px;">Project : </div>
                        <div class="d-flex align-items-center">
                            <span style="display:block;width:6px;height:6px;border-radius:100%;background:red;margin-right:6px"></span>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </div>
                    </div>  

                    <div class="d-flex align-items-center mb-2">
                        <div class="" style="width: 150px;">Milestone : </div>
                        <div class="d-flex align-items-center">
                            <span style="display:block;width:6px;height:6px;border-radius:100%;background:var(--header_color);margin-right:6px"></span>
                            Lorem Ipsum is simply dummy text of the printing.
                        </div>
                    </div>                     

                    <div class="d-flex align-items-center mb-2">
                        <div class="" style="width: 150px;">Assigned To : </div>
                        <div class="d-flex align-items-center">
                            <div>
                                <img 
                                    src="/user-uploads/avatar/f5d726d59d4ffc925d66df2daf0c6b63.png"
                                    alt=""
                                    width='32px'
                                    height='32px'
                                    class="rounded-circle"
                                />
                            </div>
                            <div class="ml-2">
                                <span class="d-block f-14 font-weight-bold">Md Sadik Istiak <sup class="rounded-pill bg-dark text-white px-1" style="font-size: 10px">It's You</sup></span>

                                <span style="font-size:13px;color:rgba(111, 114, 122, 1)">UI/UX Designer</span>
                            </div>
                        </div>
                    </div>

                    <div class="d-flex align-items-center mb-2">
                        <div class="" style="width: 150px;">Assigned by : </div>
                        <div class="d-flex align-items-center">
                            <div>
                                <img 
                                    src="/user-uploads/avatar/40164f31bc7d575c7dbe99b24b408d75.png"
                                    alt=""
                                    width='32px'
                                    height='32px'
                                    class="rounded-circle"
                                />
                            </div>
                            <div class="ml-2">
                                <span class="d-block f-14 font-weight-bold">Tapas Mandal</span>
                                <span style="font-size:13px;color:rgba(111, 114, 122, 1)">Co-Ordinator</span>
                            </div>
                        </div>
                    </div>


                    <div class="d-flex align-items-center mb-2">
                        <div class="" style="width: 150px;">Priority : </div>
                        <div class="d-flex align-items-center">
                            <span style="display:block;width:6px;height:6px;border-radius:100%;background:rgba(252, 189, 1, 1);margin-right:6px"></span>
                            Medium
                        </div>
                    </div>  
                    
                    <div class="d-flex align-items-center mb-2">
                        <div class="" style="width: 150px;">Task Category : </div>
                        <div class="d-flex align-items-center"> 
                            Frontend Design
                        </div>
                    </div>   
                </div>
                {{-- end details --}}

                {{-- card --}}
                <div class="sp1_task_card mb-4">
                    <div class="sp1_task_card--head">
                        General Guidelines
                    </div>
                    <div class="sp1_task_card--body">
                       <div class="sp1_task_card--sub-card">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with 

                            <a href="#">Read full guideline</a>
                       </div>
                       
                       <div class="sp1_task_card--sub-card">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with 

                        <a href="#">Read full guideline</a>
                   </div>
                    </div>
                </div>
                {{-- end card --}}


                {{-- card --}}
                <div class="sp1_task_card mb-4">
                    <div class="sp1_task_card--head d-flex align-items-center justify-content-between" style="background: rgba(227, 62, 79, 1);color:#fff;">
                        <span>Task Revision from Client</span>

                        <span class="__icon"><i class="fa-solid fa-chevron-down"></i></span>
                    </div>
                    <div class="sp1_task_card--body">
                        {{-- sub card --}}
                        <div class="sp1_task_card--sub-card">
                            <div class="sp1_tc_sc-inx">
                                <h2>01</h2>
                                <span class="d-block"><strong>Date</strong> Jun 06, 23</span>
                                <span class="d-block"><strong>Time</strong>: 03:20 PM</span>
                            </div>
                            <div class="">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with 
                                <a href="#">Read full guideline</a>
                            </div>

                        </div>
                        {{-- end sub card --}}

                        {{-- sub card --}}
                        <div class="sp1_task_card--sub-card">
                            <div class="sp1_tc_sc-inx">
                                <h2>02</h2>
                                <span class="d-block"><strong>Date</strong> Jun 06, 23</span>
                                <span class="d-block"><strong>Time</strong>: 03:20 PM</span>
                            </div>
                            <div class="">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with 
                                <a href="#">Read full guideline</a>
                            </div>

                        </div>
                        {{-- end sub card --}}
                    </div>
                </div>
                {{-- end card --}}


                {{-- card --}}
                <div class="sp1_task_card mb-4">
                    <div class="sp1_task_card--head d-flex align-items-center justify-content-between" style="background: rgba(227, 62, 79, 1);color:#fff;">
                        <span>Task Revision from User</span>

                        <span class="__icon"><i class="fa-solid fa-chevron-down"></i></span>
                    </div>
                    <div class="sp1_task_card--body">
                        {{-- sub card --}}
                        <div class="sp1_task_card--sub-card">
                            <div class="sp1_tc_sc-inx">
                                <h2>01</h2>
                                <span class="d-block"><strong>Date</strong> Jun 06, 23</span>
                                <span class="d-block"><strong>Time</strong>: 03:20 PM</span>
                            </div>
                            <div class="">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with 
                                <a href="#">Read full guideline</a>
                            </div>

                        </div>
                        {{-- end sub card --}}

                        {{-- sub card --}}
                        <div class="sp1_task_card--sub-card">
                            <div class="sp1_tc_sc-inx">
                                <h2>02</h2>
                                <span class="d-block"><strong>Date</strong> Jun 06, 23</span>
                                <span class="d-block"><strong>Time</strong>: 03:20 PM</span>
                            </div>
                            <div class="">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with 
                                <a href="#">Read full guideline</a>
                            </div>

                        </div>
                        {{-- end sub card --}}
                    </div>
                </div>
                {{-- end card --}}

                {{-- card --}}
                <div class="sp1_task_card mb-4">
                    <div class="sp1_task_card--head">
                        Task Description
                    </div>
                    <div class="sp1_task_card--body">
                       <div class="sp1_task_card--sub-card">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with 

                            <a href="#">Read full guideline</a>
                       </div>
                       
                       <div class="sp1_task_card--sub-card">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with 

                        <a href="#">Read full guideline</a>
                   </div>
                    </div>
                </div>
                {{-- end card --}}

            </section>
        </div>
        <div class="col-4">
            <section class="d-flex flex-column">

                {{-- period --}}
                <div class="sp1_task_right_card mb-3"> 
                    <div class="d-flex align-items-center mb-2">
                        <span style="display:block;width:6px;height:6px;border-radius:100%;background:var(--header_color);margin-right:6px"></span>
                        Doing
                    </div> 
                    
                    <div class="d-flex align-items-center mb-2">
                        <div class="" style="width: 110px;">Start Date : </div>
                        <div class="d-flex align-items-center">
                            Jun 06, 2023
                        </div>
                    </div> 

                    <div class="d-flex align-items-center mb-2">
                        <div class="" style="width: 110px;">Due Date : </div>
                        <div class="d-flex align-items-center">
                            Jun 06, 2023
                        </div>
                    </div> 

                    <div class="d-flex align-items-center mb-2">
                        <div class="" style="width: 110px;">Time Estimate : </div>
                        <div class="d-flex align-items-center">
                            8 hour 30 min
                        </div>
                    </div> 

                    <div class="d-flex align-items-center mb-2">
                        <div class="" style="width: 110px;">Hours Logged : </div>
                        <div class="d-flex align-items-center">
                            8 hour 30 min
                        </div>
                    </div> 
                </div>
                {{-- end period --}}

                {{-- commets --}}
                <div class="sp1_task_right_card mb-3">  
                    
                    {{-- dropleft --}}
                    <div class="dropleft sp1_task_right_dropleft">
                        <button class="sp1_task_right_dl_toggle" data-toggle="dropdown" aria-haspopup="false" aria-expanded="false">
                            <i class="fa-solid fa-circle-chevron-left" style="color: #5488e3;"></i>
                        </button>

                        <div class="dropdown-menu sp1_task_right_dropleft_menu"
                            style="transform: translate3d(-437px, -6px, 0px) !important"
                        >
                            <div class="py-3">
                               <div class="sp1_task_comments">

                                    {{-- flex --}}
                                    <div class="sp1_task_write_comment">
                                        <div>
                                            <div style="width:45px;height:45px">
                                                <img 
                                                    src="/user-uploads/avatar/40164f31bc7d575c7dbe99b24b408d75.png" 
                                                    alt=""
                                                    width="32px"
                                                    height="32px"
                                                    class="rounded-circle"
                                                >
                                            </div>
                                        </div>
 
                                        <div class="sp1_task_comment_send_box active">
                                            <span class="placeholder">Write a comment...</span> 
                                            <div id="sp1_task_editor"></div>
                                            <div class="mt-2">
                                                <button class="btn btn-sm py-1 btn-primary">Send</button>
                                                <button class="btn btn-sm py-1 btn-primary">Cancel</button>
                                            </div>
                                        </div>
                                    </div> 
                               </div>
                            </div>
                        </div>
                    </div>
                    {{-- end dropleft --}}
                    

                    <div class="d-flex border-bottom pb-2 align-items-center justify-content-between mb-2 font-weight-bold">
                        <span class="f-16">Comment</span>
                        <a 
                            href="#" 
                            class="sp1_tark_add_item" 
                            aria-label="addButton"
                        > 
                            <i class="fa-solid fa-plus" style="font-size: 12px;"></i> 
                            Comment 
                        </a>
                    </div> 

                    <div class="sp1_task_right_card--body">
                        {{-- item --}}
                        <div class="d-flex align-items-center justify-content-between sp1_tark_right_item">
                            <div>
                                Lorem ipsum dolor sit amet...
                            </div>

                            <div class="d-flex align-items-center">
                                <a href="#" class="mr-2 py-2 sp1_task_righ_action_btn"><i class="fa-regular fa-eye"></i></a>
                                <a href="#" class="mr-2 py-2 sp1_task_righ_action_btn"><i class="fa-regular fa-pen-to-square"></i></a>
                            </div>
                        </div>
                        {{-- end item --}}

                        {{-- item --}}
                        <div class="d-flex align-items-center justify-content-between sp1_tark_right_item">
                            <div>
                                Lorem ipsum dolor sit amet...
                            </div>

                            <div class="d-flex align-items-center">
                                <a href="#" class="mr-2 py-2 sp1_task_righ_action_btn"><i class="fa-regular fa-eye"></i></a>
                                <a href="#" class="mr-2 py-2 sp1_task_righ_action_btn"><i class="fa-regular fa-pen-to-square"></i></a>
                            </div>
                        </div>
                        {{-- end item --}}
                        
                        {{-- item --}}
                        <div class="d-flex align-items-center justify-content-between sp1_tark_right_item">
                            <div>
                                Lorem ipsum dolor sit amet...
                            </div>

                            <div class="d-flex align-items-center">
                                <a href="#" class="mr-2 py-2 sp1_task_righ_action_btn"><i class="fa-regular fa-eye"></i></a>
                                <a href="#" class="mr-2 py-2 sp1_task_righ_action_btn"><i class="fa-regular fa-pen-to-square"></i></a>
                            </div>
                        </div>
                        {{-- end item --}}

                        
                        
                        {{-- item --}}
                        <div class="d-flex align-items-center justify-content-between sp1_tark_right_item">
                            <div>
                                Lorem ipsum dolor sit amet...
                            </div>

                            <div class="d-flex align-items-center">
                                <a href="#" class="mr-2 py-2 sp1_task_righ_action_btn"><i class="fa-regular fa-eye"></i></a>
                                <a href="#" class="mr-2 py-2 sp1_task_righ_action_btn"><i class="fa-regular fa-pen-to-square"></i></a>
                            </div>
                        </div>
                        {{-- end item --}}
                    </div>

                </div>
                {{-- end commets --}}


                {{-- Sub Task --}}
                <div class="sp1_task_right_card mb-3"> 
                        {{-- dropleft --}}
                    <div class="dropleft sp1_task_right_dropleft">
                        <button class="sp1_task_right_dl_toggle" data-toggle="dropdown" aria-haspopup="false" aria-expanded="false">
                            <i class="fa-solid fa-circle-chevron-left" style="color: #5488e3;"></i>
                        </button>

                        <div class="dropdown-menu sp1_task_right_dropleft_menu"
                            style="transform: translate3d(-437px, -6px, 0px) !important"
                        >
                            <div class="py-3">
                                Sub View section
                            </div>
                        </div>
                    </div>
                    {{-- end dropleft --}}

                    <div class="d-flex border-bottom pb-2 align-items-center justify-content-between mb-2 font-weight-bold">
                        <span class="f-16">Sub Task</span>
                        <a 
                            href="#" 
                            class="sp1_tark_add_item" 
                            aria-label="addButton"
                        > 
                            <i class="fa-solid fa-plus" style="font-size: 12px;"></i> 
                            Sub Task 
                        </a>
                    </div> 

                    <div class="sp1_task_right_card--body">
                        {{-- item --}}
                        <div class="d-flex align-items-center justify-content-between sp1_tark_right_item">
                            <div>
                                Lorem ipsum dolor sit amet...
                            </div>

                            <div class="d-flex align-items-center">
                                <a href="#" class="mr-2 py-2 sp1_task_righ_action_btn"><i class="fa-regular fa-eye"></i></a>
                                <a href="#" class="mr-2 py-2 sp1_task_righ_action_btn"><i class="fa-regular fa-pen-to-square"></i></a>
                            </div>
                        </div>
                        {{-- end item --}}

                        {{-- item --}}
                        <div class="d-flex align-items-center justify-content-between sp1_tark_right_item">
                            <div>
                                Lorem ipsum dolor sit amet...
                            </div>

                            <div class="d-flex align-items-center">
                                <a href="#" class="mr-2 py-2 sp1_task_righ_action_btn"><i class="fa-regular fa-eye"></i></a>
                                <a href="#" class="mr-2 py-2 sp1_task_righ_action_btn"><i class="fa-regular fa-pen-to-square"></i></a>
                            </div>
                        </div>
                        {{-- end item --}}
                        
                        {{-- item --}}
                        <div class="d-flex align-items-center justify-content-between sp1_tark_right_item">
                            <div>
                                Lorem ipsum dolor sit amet...
                            </div>

                            <div class="d-flex align-items-center">
                                <a href="#" class="mr-2 py-2 sp1_task_righ_action_btn"><i class="fa-regular fa-eye"></i></a>
                                <a href="#" class="mr-2 py-2 sp1_task_righ_action_btn"><i class="fa-regular fa-pen-to-square"></i></a>
                            </div>
                        </div>
                        {{-- end item --}}

                        
                        
                        {{-- item --}}
                        <div class="d-flex align-items-center justify-content-between sp1_tark_right_item">
                            <div>
                                Lorem ipsum dolor sit amet...
                            </div>

                            <div class="d-flex align-items-center">
                                <a href="#" class="mr-2 py-2 sp1_task_righ_action_btn"><i class="fa-regular fa-eye"></i></a>
                                <a href="#" class="mr-2 py-2 sp1_task_righ_action_btn"><i class="fa-regular fa-pen-to-square"></i></a>
                            </div>
                        </div>
                        {{-- end item --}}
                    </div>

                </div>
                {{-- end Sub Task --}}

                {{-- Note --}}
                <div class="sp1_task_right_card mb-3"> 
                    <div class="d-flex border-bottom pb-2 align-items-center justify-content-between mb-2 font-weight-bold">
                        <span class="f-16">Notes</span>
                        <a 
                            href="#" 
                            class="sp1_tark_add_item" 
                            aria-label="addButton"
                        > 
                            <i class="fa-solid fa-plus" style="font-size: 12px;"></i> 
                            Note 
                        </a>
                    </div> 

                    <div class="sp1_task_right_card--body">
                        {{-- item --}}
                        <div class="d-flex align-items-center justify-content-between sp1_tark_right_item">
                            <div>
                                Lorem ipsum dolor sit amet...
                            </div>

                            <div class="d-flex align-items-center">
                                <a href="#" class="mr-2 py-2 sp1_task_righ_action_btn"><i class="fa-regular fa-eye"></i></a>
                                <a href="#" class="mr-2 py-2 sp1_task_righ_action_btn"><i class="fa-regular fa-pen-to-square"></i></a>
                            </div>
                        </div>
                        {{-- end item --}}

                        {{-- item --}}
                        <div class="d-flex align-items-center justify-content-between sp1_tark_right_item">
                            <div>
                                Lorem ipsum dolor sit amet...
                            </div>

                            <div class="d-flex align-items-center">
                                <a href="#" class="mr-2 py-2 sp1_task_righ_action_btn"><i class="fa-regular fa-eye"></i></a>
                                <a href="#" class="mr-2 py-2 sp1_task_righ_action_btn"><i class="fa-regular fa-pen-to-square"></i></a>
                            </div>
                        </div>
                        {{-- end item --}}
                        
                        {{-- item --}}
                        <div class="d-flex align-items-center justify-content-between sp1_tark_right_item">
                            <div>
                                Lorem ipsum dolor sit amet...
                            </div>

                            <div class="d-flex align-items-center">
                                <a href="#" class="mr-2 py-2 sp1_task_righ_action_btn"><i class="fa-regular fa-eye"></i></a>
                                <a href="#" class="mr-2 py-2 sp1_task_righ_action_btn"><i class="fa-regular fa-pen-to-square"></i></a>
                            </div>
                        </div>
                        {{-- end item --}}

                        
                        
                        {{-- item --}}
                        <div class="d-flex align-items-center justify-content-between sp1_tark_right_item">
                            <div>
                                Lorem ipsum dolor sit amet...
                            </div>

                            <div class="d-flex align-items-center">
                                <a href="#" class="mr-2 py-2 sp1_task_righ_action_btn"><i class="fa-regular fa-eye"></i></a>
                                <a href="#" class="mr-2 py-2 sp1_task_righ_action_btn"><i class="fa-regular fa-pen-to-square"></i></a>
                            </div>
                        </div>
                        {{-- end item --}}
                    </div>

                </div>
                {{-- end Note --}}


                  {{-- Submitted Work --}}
                  <div class="sp1_task_right_card mb-3"> 
                    <div class="d-flex border-bottom pb-2 align-items-center justify-content-between mb-2 font-weight-bold">
                        <span class="f-16">Submitted Work</span> 
                    </div> 

                    <div class="sp1_task_right_card--body">
                        {{-- item --}}
                        <div class="d-flex align-items-center justify-content-between sp1_tark_right_item">
                            <div>
                                Lorem ipsum dolor sit amet...
                            </div>

                            <div class="d-flex align-items-center">
                                <a href="#" class="mr-2 py-2 sp1_task_righ_action_btn"><i class="fa-regular fa-eye"></i></a>
                                <a href="#" class="mr-2 py-2 sp1_task_righ_action_btn"><i class="fa-regular fa-pen-to-square"></i></a>
                            </div>
                        </div>
                        {{-- end item --}}

                        {{-- item --}}
                        <div class="d-flex align-items-center justify-content-between sp1_tark_right_item">
                            <div>
                                Lorem ipsum dolor sit amet...
                            </div>

                            <div class="d-flex align-items-center">
                                <a href="#" class="mr-2 py-2 sp1_task_righ_action_btn"><i class="fa-regular fa-eye"></i></a>
                                <a href="#" class="mr-2 py-2 sp1_task_righ_action_btn"><i class="fa-regular fa-pen-to-square"></i></a>
                            </div>
                        </div>
                        {{-- end item --}}
                        
                        {{-- item --}}
                        <div class="d-flex align-items-center justify-content-between sp1_tark_right_item">
                            <div>
                                Lorem ipsum dolor sit amet...
                            </div>

                            <div class="d-flex align-items-center">
                                <a href="#" class="mr-2 py-2 sp1_task_righ_action_btn"><i class="fa-regular fa-eye"></i></a>
                                <a href="#" class="mr-2 py-2 sp1_task_righ_action_btn"><i class="fa-regular fa-pen-to-square"></i></a>
                            </div>
                        </div>
                        {{-- end item --}}

                        
                        
                        {{-- item --}}
                        <div class="d-flex align-items-center justify-content-between sp1_tark_right_item">
                            <div>
                                Lorem ipsum dolor sit amet...
                            </div>

                            <div class="d-flex align-items-center">
                                <a href="#" class="mr-2 py-2 sp1_task_righ_action_btn"><i class="fa-regular fa-eye"></i></a>
                                <a href="#" class="mr-2 py-2 sp1_task_righ_action_btn"><i class="fa-regular fa-pen-to-square"></i></a>
                            </div>
                        </div>
                        {{-- end item --}}
                    </div>

                </div>
                {{-- end Submitted Work --}}


                 {{-- Time Logs--}}
                 <div class="sp1_task_right_card mb-3"> 
                    <div class="d-flex border-bottom pb-2 align-items-center justify-content-between mb-2 font-weight-bold">
                        <span class="f-16">Time Logs</span> 
                    </div> 

                    <div class="sp1_task_right_card--body">
                        {{-- item --}}
                        <div class="d-flex align-items-center justify-content-between sp1_tark_right_item py-2">
                            <div>
                                <img src='/user-uploads/avatar/f5d726d59d4ffc925d66df2daf0c6b63.png'alt="" width="24px" height="24px" class="rounded-circle" />
                            </div> 

                            <div>Jun 06, 2023</div> 
                            <div>5 Hours 30 min</div>
                        </div>
                        {{-- end item --}}

                        {{-- item --}}
                        <div class="d-flex align-items-center justify-content-between sp1_tark_right_item py-2">
                            <div>
                                <img src='/user-uploads/avatar/f5d726d59d4ffc925d66df2daf0c6b63.png'alt="" width="24px" height="24px" class="rounded-circle" />
                            </div> 

                            <div>Jun 06, 2023</div> 
                            <div>5 Hours 30 min</div>
                        </div>
                        {{-- end item --}}
                        {{-- item --}}
                        <div class="d-flex align-items-center justify-content-between sp1_tark_right_item py-2">
                            <div>
                                <img src='/user-uploads/avatar/f5d726d59d4ffc925d66df2daf0c6b63.png'alt="" width="24px" height="24px" class="rounded-circle" />
                            </div> 

                            <div>Jun 06, 2023</div> 
                            <div>5 Hours 30 min</div>
                        </div>
                        {{-- end item --}}
                        {{-- item --}}
                        <div class="d-flex align-items-center justify-content-between sp1_tark_right_item py-2">
                            <div>
                                <img src='/user-uploads/avatar/f5d726d59d4ffc925d66df2daf0c6b63.png'alt="" width="24px" height="24px" class="rounded-circle" />
                            </div> 

                            <div>Jun 06, 2023</div> 
                            <div>5 Hours 30 min</div>
                        </div>
                        {{-- end item --}}
                        {{-- item --}}
                        <div class="d-flex align-items-center justify-content-between sp1_tark_right_item py-2">
                            <div>
                                <img src='/user-uploads/avatar/f5d726d59d4ffc925d66df2daf0c6b63.png'alt="" width="24px" height="24px" class="rounded-circle" />
                            </div> 

                            <div>Jun 06, 2023</div> 
                            <div>5 Hours 30 min</div>
                        </div>
                        {{-- end item --}} 
                    </div>

                </div>
                {{-- end Time Logs--}}


                 {{-- History --}}
                 <div class="sp1_task_right_card mb-3"> 
                    <div class="d-flex border-bottom pb-2 align-items-center justify-content-between mb-2 font-weight-bold">
                        <span class="f-16">History</span> 
                    </div> 

                    <div class="sp1_task_right_card--body">
                        {{-- item --}}
                        <div class="d-flex align-items-center justify-content-between sp1_tark_right_item py-2">
                            <div>
                                Lorem ipsum dolor sit amet...
                            </div>
                        </div>
                        {{-- end item --}}
                        
                        {{-- item --}}
                        <div class="d-flex align-items-center justify-content-between sp1_tark_right_item py-2">
                            <div>
                                Lorem ipsum dolor sit amet...
                            </div>
                        </div>
                        {{-- end item --}}
                        
                        {{-- item --}}
                        <div class="d-flex align-items-center justify-content-between sp1_tark_right_item py-2">
                            <div>
                                Lorem ipsum dolor sit amet...
                            </div>
                        </div>
                        {{-- end item --}}
                    </div>

                </div>
                {{-- end History --}}
                
                 {{-- Review section --}}
                 <div class="sp1_task_right_card mb-3" style="max-height: 450px">  
                    <div class="d-flex border-bottom pb-2 align-items-center justify-content-between mb-2 font-weight-bold">
                        <span class="f-16">Task Review</span> 
                    </div> 
                    
                    <div class="d-flex align-items-center mb-2">
                        <div class="" style="width: 140px;">Deadline Meet : </div>
                        <div class="d-flex align-items-center">
                            <i class="fa-solid fa-star" style="color: #FFA500;"></i>
                            <i class="fa-solid fa-star" style="color: #FFA500;"></i>
                            <i class="fa-solid fa-star" style="color: #FFA500;"></i>
                            <i class="fa-solid fa-star" style="color: #FFA500;"></i>
                            <i class="fa-solid fa-star" style="color: #FFA500;"></i>
                        </div>
                    </div> 

                    <div class="d-flex align-items-center mb-2">
                        <div class="" style="width: 140px;">Submission Quality: </div>
                        <div class="d-flex align-items-center"> 
                            <i class="fa-solid fa-star" style="color: #FFA500;"></i>
                            <i class="fa-solid fa-star" style="color: #FFA500;"></i>
                            <i class="fa-solid fa-star" style="color: #FFA500;"></i>
                            <i class="fa-solid fa-star-half-stroke" style="color: #FFA500;"></i>
                            <i class="fa-regular fa-star" style="color: #b9b9b9;"></i>
                        </div>
                    </div> 

                    <div class="d-flex align-items-center mb-2">
                        <div class="" style="width: 140px;">Req. Fullfillment: </div>
                        <div class="d-flex align-items-center"> 
                            <i class="fa-solid fa-star" style="color: #FFA500;"></i>
                            <i class="fa-solid fa-star" style="color: #FFA500;"></i>
                            <i class="fa-solid fa-star" style="color: #FFA500;"></i>
                            <i class="fa-solid fa-star-half-stroke" style="color: #FFA500;"></i>
                            <i class="fa-regular fa-star" style="color: #b9b9b9;"></i>
                        </div>
                    </div> 

                    <div class="d-flex align-items-center mb-2">
                        <div class="" style="width: 140px;">Overall Task Ratings: </div>
                        <div class="d-flex align-items-center"> 
                            <i class="fa-solid fa-star" style="color: #FFA500;"></i>
                            <i class="fa-solid fa-star" style="color: #FFA500;"></i>
                            <i class="fa-solid fa-star" style="color: #FFA500;"></i>
                            <i class="fa-solid fa-star" style="color: #FFA500;"></i>
                            <i class="fa-solid fa-star" style="color: #FFA500;"></i>
                        </div>
                    </div> 

                    <div class="mb-2">
                        <span class="font-weight-bold d-block mb-1">Comments:</span>
                        <p style="color:#777;font-size:13px">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea omnis libero doloremque id earum voluptates eligendi, perspiciatis nemo a ut maxime vel ad dignissimos ex, mollitia necessitatibus? Libero, voluptatum perspiciatis.
                            <a href="#">Read More</a>
                        </p>
                         
                    </div> 
                </div>
                {{-- end Review section --}}

            </section>
        </div>
    </div>
    
</section>




{{-- script --}}


    <script>

        // drop left control
        $(document).ready(function(){ 
            
            $('.sp1_task_right_dropleft').each(function(){ 
                $(this).on('show.bs.dropdown', function(){
                    $(this).attr('style', 'z-index:10');
                    var menu = $(this).children('.dropdown-menu')
                    $(this).children('.sp1_task_right_dl_toggle').eq(0).attr('style', 'opacity:1;position:absolute;z-index:100;top:50%;transform:translateY(-50%) rotate(180deg);')
                    menu.attr('style', 'z-index:99')
                    menu.on('click', function(e) {
                        e.stopPropagation(); 
                    });

                    var dropleft = $(this)

                    $(this).children('.sp1_task_right_dl_toggle').eq(0).on('click', function(){
                        dropleft.dropdown('hide');
                        dropleft.removeAttr('style');
                        var menu = dropleft.children('.dropdown-menu')
                        dropleft.children('.sp1_task_right_dl_toggle').eq(0).removeAttr('style'); 
                    })
                });

                $(this).on('hide.bs.dropdown', function(e){
                    $(this).children('.sp1_task_right_dl_toggle').eq(0).off('click');
                    e.preventDefault();
                });

                
                
            });
        });  
    </script>   

    <script src="{{asset('ckeditor5/ckeditor.js')}}"></script>

<script>

        class MyUploadAdapter{
            constructor(loader) {
                this.loader = loader;
            }

            upload() {
                return this.loader.file
                .then((file) => {
                    // Perform the upload logic here
                    return new Promise((resolve, reject) => {
                    // Simulating a successful upload after a delay of 2 seconds
                    setTimeout(() => {
                        resolve({});
                    }, 2000);
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
            }

            abort() {
                // Implement the abort logic if needed
            }
        }

        function MyUploadAdapterPlugin( editor ) {
            editor.plugins.get( 'FileRepository' ).createUploadAdapter = function( loader ) {
                // Custom upload adapter.
                // ...
                console.log(loader.file)
                return new MyUploadAdapter(loader);
            };
        }



        ClassicEditor.create( document.querySelector( '#sp1_task_editor' ), {
            toolbar: [ 'undo','redo', '|','heading', '|', 'bold', 'italic', 'link', 'blockQuote', '|', 'bulletedList', 'numberedList', '|', 'insertTable', '|','imageUpload','mediaEmbed'],

            image:{
                toolbar:["imageStyle:inline","imageStyle:block","imageStyle:side","|","toggleImageCaption","imageTextAlternative"]
            },
            table:{
                contentToolbar:["tableColumn","tableRow","mergeTableCells"]
            },

            heading: {
                options: [
                    { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                    { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                    { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                    { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                    { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                    { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
                    { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' },
                ]
            },
            extraPlugins:[MyUploadAdapterPlugin]
        } )
        .catch( error => {
            console.log( error );
        } );
   </script>