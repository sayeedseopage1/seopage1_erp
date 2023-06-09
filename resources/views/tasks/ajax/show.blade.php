@push('styles')
   <style type="text/css">
        .sp1_task_btn_group{
            border-color: #E7EFFC;
        }

        .sp1_task_btn_group button{
            border-color: rgba(0,0,0,.3);
        }

        .sp1_task_card{
            border-radius: 10px;
            border: 1px solid rgba(0,0,0,.05);
            box-shadow: 0 1px 3px rgba(0,0,0,.05);
        }

        .sp1_task_card--head{
            padding: 10px 16px;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            background:rgba(231, 239, 252, 1);
            font-size: 16px;
            font-weight: 600;
        }

        .sp1_task_card--head > .__icon{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background:rgba(231, 239, 252, 1);
            color:rgba(227, 62, 79, 1);
            font-size: 14px;
        }

        .sp1_task_card--body{
            padding: 10px 16px;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
        }

        .sp1_task_card--sub-card{
            margin-bottom: 16px;
            padding-bottom: 16px;
        }

        .sp1_task_card--sub-card:not(:last-child){
            border-bottom: 1px solid rgba(0,0,0,.05);
        }

        .sp1_tc_sc-inx{
            padding: 10px;
            border-radius: 16px;
            background: #f6f9ff;
            width: fit-content;
            float: left;
            margin: 0 10px 10px 0;
            border: 1px solid rgba(0,0,0,.05);
        }

        .sp1_tc_sc-inx > h2{
            font-weight: bold;
            color:rgba(227, 62, 79, 1);
            margin: 0;
            font-size: 24px;
        }

        .sp1_task_right_card{
            padding: 16px 24px;
            border-radius: 10px;
            background: #fff;
            box-shadow: 0 1px 3px rgba(0,0,0,.05);
            max-height: 180px;
            position: relative;
        }

        .sp1_task_right_card--body{
            height: 110px; 
            overflow-y: auto;
            padding-bottom: 5px;
            padding-right: 5px
        }

        .sp1_task_right_card--body::-webkit-scrollbar{ 
            width: 4px;
            border-radius: 4px !important;
        } 

        .sp1_task_right_card--body::-webkit-scrollbar-track{
            background: rgb(240, 240, 240) !important;
            border-radius: 4px;
            padding: 0 !important;
        }

        .sp1_task_right_card--body::-webkit-scrollbar-thumb{
            border: none;
        }

        .sp1_tark_add_item{
            color: #777;
            font-weight: 50;
            padding: 2px 10px;
            border-radius: 6px;
        }

        .sp1_tark_add_item:hover{
            background: rgba(0,0,0,.05);
        }

        .sp1_task_righ_action_btn{
            color: #777;
        }

        .sp1_task_righ_action_btn:hover{
            color: var(--header_color);
        }

        .sp1_tark_right_item:not(:last-child){
            border: 0;
            border-bottom: 1px solid rgba(0,0,0,.1);
            border-style: dashed;
        }

        .sp1_task_right_dropleft{ 
            position: absolute;
            top: 50%;
            left: -12px;
            transform: translateY(-50%);
        }

        .sp1_task_right_dl_toggle{
            padding: 0;
            width: fit-content;
            height: fit-content;
            border-radius: 50%;
            font-size: 24px;
            background: transparent;
        }

        .sp1_task_right_dropleft_menu{
            width: 650px;
            height: 550px;
            overflow-y: auto;
            padding:24px;
            left: 12px !important;
            top: -80px !important;
            border: 0.5px solid #84caf8 !important;
            box-shadow: 0 0 10px rgba(0,0,0,.1);
            background: rgb(250, 250, 252);
            border-radius: 16px;
        }

        .sp1_task_right_dropleft_menu::-webkit-scrollbar{ 
            width: 4px;
            border-radius: 4px !important;
        } 

        .sp1_task_right_dropleft_menu::-webkit-scrollbar-track{
            background: rgb(240, 240, 240) !important;
            border-radius: 4px;
            padding: 0 !important;
        }

        .sp1_task_right_dropleft_menu::-webkit-scrollbar-thumb{
            border: none;
        }
         
   </style> 
@endpush

<section>
   <div class="f-16 mb-3">
        <span> <strong>Subtask: </strong> </span>
        <span>Lorem Ipsum is simply dummy text of the printing and typesetting elit</span>
    </div> 

    {{-- <textarea name="sp1_task_editor" id="sp1_task_editor" class="form-control"></textarea> --}}
    <div id="sp1_task_editor"></div>

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
                               <div class="flex">
                                    {{-- comment here....  --}}
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
                });

                $(this).on('hide.bs.dropdown', function(){
                    $(this).removeAttr('style');
                    var menu = $(this).children('.dropdown-menu')
                    $(this).children('.sp1_task_right_dl_toggle').eq(0).removeAttr('style');
                    menu.on('click', function(e) {
                        e.stopPropagation(); 
                    });
                });
            });
        });  
    </script>   

    {{-- <script src="{{mix('js/sp1-editor.js')}}"></script> --}}

   {{-- editor script --}}
    {{-- <script type="text/javascript">
        const editor = new SP1Editor('sp1_editor'); 
        editor.init({
            defaultValue: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown <h3>heading text</h3> printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the <span style='color:red'>leap</span> into electronic typesetting, remaining essentially unchanged."
        });
    </script> --}}

   {{-- editor script --}}

   <script src="https://cdn.ckeditor.com/ckeditor5/38.0.1/classic/ckeditor.js"></script> 

   <!--
       Uncomment to load the Spanish translation
       <script src="https://cdn.ckeditor.com/ckeditor5/38.0.1/super-build/translations/es.js"></script>
   -->
   <script>
       // This sample still does not showcase all CKEditor 5 features (!)
       // Visit https://ckeditor.com/docs/ckeditor5/latest/features/index.html to browse all the features.
       ClassicEditor
    .create( document.querySelector( '#sp1_task_editor' ), {
        toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote' ],
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
        }
    } )
    .catch( error => {
        console.log( error );
    } );
   </script>


   {{-- <script src="{{asset('ckeditor/ckeditor.js')}}"></script>


   <script>  
       CKEDITOR.replace('sp1_task_editor', {
            filebrowserBrowseUrl: '/browser/browse.php',
            filebrowserUploadUrl: '/uploader/upload.php',
            // Define changes to default configuration here.
            // For complete reference see: https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_config.html

            // The toolbar groups arrangement.
            toolbarGroups: [
                { name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
                { name: 'links' },
                { name: 'insert' },
                { name: 'forms' },
                { name: 'tools' },
                { name: 'document',    groups: [ 'mode', 'document', 'doctools' ] },
                { name: 'others' },
                '/',
                { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
                { name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
                { name: 'styles' },
                { name: 'colors' },
                { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
                { name: 'about' }
            ],

            // Remove some buttons provided by the standard plugins.
            removeButtons: 'Subscript,Superscript',

            // Set the most common block elements.
            format_tags: 'p;h1;h2;h3;pre',

            // Simplify the dialog windows.
            removeDialogTabs: 'image:advanced;link:advanced', 
 
        });
   </script> --}}