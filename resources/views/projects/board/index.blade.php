@extends('layouts.app')

@push('datatable-styles')
    @include('sections.daterange_css')
@endpush

@push('styles')
    <!-- Drag and Drop CSS -->



<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css">
<link rel="stylesheet" href="{{asset('kanban/custom/css/style.css')}}">
@endpush


@section('filter-section')

@include('projects.filters')

@endsection


@section('content')

    <!-- CONTENT WRAPPER START -->
    <div class="w-task-board-box px-4 py-2 bg-white">
        <!-- Add Task Export Buttons Start -->
        <div class="d-block d-lg-flex d-md-flex my-3">

            <x-alert type="warning" icon="info" class="d-lg-none">@lang('messages.dragDropScreenInfo')</x-alert>

            <div id="table-actions" class="flex-grow-1 align-items-center">

                  {{--  <x-forms.link-primary :link="route('projects.create')" class="mr-3 openRightModal float-left" icon="plus">
                        @lang('app.add')
                        @lang('app.project')
                    </x-forms.link-primary> --}}


            </div>

            <div class="btn-group mt-2 mt-lg-0 mt-md-0" role="group">
                <a href="{{ route('projects.index') }}" class="btn btn-secondary f-14" data-toggle="tooltip"
                    data-original-title="@lang('modules.leaves.tableView')"><i class="side-icon bi bi-list-ul"></i></a>

                <a href="{{ route('projectboards.index') }}" class="btn btn-secondary f-14 btn-active" data-toggle="tooltip"
                    data-original-title="@lang('Kanban')"><i class="side-icon bi bi-kanban"></i></a>

            </div>
        </div>

        <div class="boardsContainer" id="sp1">
            <div class="outer-wrapper">

            <div class="custom_row">


                <!-- board  -->
                <!-- Incomplete  -->

                <div class="board">

                    <ul class="board_list">
                        <li class="red" style="border-left: 19px solid #D21010;"> Incomplete</li>
                        <li>0</li>
                    </ul>
                    <div id="sp1-scrollbar">


                        <div class="dropzone" id="yellow">

                            <div class="kanbanCard yellow">
                                <div class="content">
                                    <ul class="task_list">
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/7.png')}}" title="Sadik" alt=""> Client Name </a></li>
                                        <!-- <li><span>#749</span></li> -->
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/4.png')}}" title="Sadik" alt=""> Sadik Istiak </a></li>
                                    </ul>

                                    <ul class="task_list" id="projects_sp1_padding">
                                        <li><a href="#" title="wordpress theme development"><i class="fa-solid fa-layer-group"></i> Lorem ipsum dolor sit amet curn...</a> </li>
                                        <li class="clipboard_list_sp1"> <i class="fa-solid fa-clipboard-list"></i> 1/2 </li>
                                    </ul>


                                    <ul class="task_list">
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/11.jpg')}}" title="Sadik" alt=""> </a></li>
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/man.png')}}" title="Sadik" alt="">  </a></li>
                                        <li><span title="Sadik, kamal, Riyaz" >12+</span></li>
                                        <li><i class="fa-regular fa-comments"></i> 15 </li>
                                        <li><i class="fa-solid fa-paperclip"></i> 25 </li>
                                        <li style="font-size: 12px;"><i class="fa-regular fa-calendar-days"></i> 30-12-2022</li>
                                    </ul>
                                </div>

                            </div>
                        </div>

                        <div class="dropzone" id="yellow">

                            <div class="kanbanCard yellow">
                                <div class="content">
                                    <ul class="task_list">
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/7.png')}}" title="Sadik" alt=""> Client Name </a></li>
                                        <!-- <li><span>#749</span></li> -->
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/4.png')}}" title="Sadik" alt=""> Sadik Istiak </a></li>
                                    </ul>

                                    <ul class="task_list" id="projects_sp1_padding">
                                        <li><a href="#" title="wordpress theme development"><i class="fa-solid fa-layer-group"></i> Lorem ipsum dolor sit amet curn...</a> </li>
                                        <li class="clipboard_list_sp1"> <i class="fa-solid fa-clipboard-list"></i> 1/2 </li>
                                    </ul>


                                    <ul class="task_list">
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/11.jpg')}}" title="Sadik" alt=""> </a></li>
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/man.png')}}" title="Sadik" alt="">  </a></li>
                                        <li><span title="Sadik, kamal, Riyaz" >12+</span></li>
                                        <li><i class="fa-regular fa-comments"></i> 15 </li>
                                        <li><i class="fa-solid fa-paperclip"></i> 25 </li>
                                        <li style="font-size: 12px;"><i class="fa-regular fa-calendar-days"></i> 30-12-2022</li>
                                    </ul>
                                </div>

                            </div>
                        </div>

                        <div class="dropzone" id="yellow">

                            <div class="kanbanCard yellow">
                                <div class="content">
                                    <ul class="task_list">
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/7.png')}}" title="Sadik" alt=""> Client Name </a></li>
                                        <!-- <li><span>#749</span></li> -->
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/4.png')}}" title="Sadik" alt=""> Sadik Istiak </a></li>
                                    </ul>

                                    <ul class="task_list" id="projects_sp1_padding">
                                        <li><a href="#" title="wordpress theme development"><i class="fa-solid fa-layer-group"></i> Lorem ipsum dolor sit amet curn...</a> </li>
                                        <li class="clipboard_list_sp1"> <i class="fa-solid fa-clipboard-list"></i> 1/2 </li>
                                    </ul>


                                    <ul class="task_list">
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/11.jpg')}}" title="Sadik" alt=""> </a></li>
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/man.png')}}" title="Sadik" alt="">  </a></li>
                                        <li><span title="Sadik, kamal, Riyaz" >12+</span></li>
                                        <li><i class="fa-regular fa-comments"></i> 15 </li>
                                        <li><i class="fa-solid fa-paperclip"></i> 25 </li>
                                        <li style="font-size: 12px;"><i class="fa-regular fa-calendar-days"></i> 30-12-2022</li>
                                    </ul>
                                </div>

                            </div>
                        </div>

                        <div class="dropzone" id="yellow">

                            <div class="kanbanCard yellow">
                                <div class="content">
                                    <ul class="task_list">
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/7.png')}}" title="Sadik" alt=""> Client Name </a></li>
                                        <!-- <li><span>#749</span></li> -->
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/4.png')}}" title="Sadik" alt=""> Sadik Istiak </a></li>
                                    </ul>

                                    <ul class="task_list" id="projects_sp1_padding">
                                        <li><a href="#" title="wordpress theme development"><i class="fa-solid fa-layer-group"></i> Lorem ipsum dolor sit amet curn...</a> </li>
                                        <li class="clipboard_list_sp1"> <i class="fa-solid fa-clipboard-list"></i> 1/2 </li>
                                    </ul>


                                    <ul class="task_list">
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/11.jpg')}}" title="Sadik" alt=""> </a></li>
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/man.png')}}" title="Sadik" alt="">  </a></li>
                                        <li><span title="Sadik, kamal, Riyaz" >12+</span></li>
                                        <li><i class="fa-regular fa-comments"></i> 15 </li>
                                        <li><i class="fa-solid fa-paperclip"></i> 25 </li>
                                        <li style="font-size: 12px;"><i class="fa-regular fa-calendar-days"></i> 30-12-2022</li>
                                    </ul>
                                </div>

                            </div>
                        </div>

                        <div class="dropzone" id="yellow">

                            <div class="kanbanCard yellow">
                                <div class="content">
                                    <ul class="task_list">
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/7.png')}}" title="Sadik" alt=""> Client Name </a></li>
                                        <!-- <li><span>#749</span></li> -->
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/4.png')}}" title="Sadik" alt=""> Sadik Istiak </a></li>
                                    </ul>

                                    <ul class="task_list" id="projects_sp1_padding">
                                        <li><a href="#" title="wordpress theme development"><i class="fa-solid fa-layer-group"></i> Lorem ipsum dolor sit amet curn...</a> </li>
                                        <li class="clipboard_list_sp1"> <i class="fa-solid fa-clipboard-list"></i> 1/2 </li>
                                    </ul>


                                    <ul class="task_list">
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/11.jpg')}}" title="Sadik" alt=""> </a></li>
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/man.png')}}" title="Sadik" alt="">  </a></li>
                                        <li><span title="Sadik, kamal, Riyaz" >12+</span></li>
                                        <li><i class="fa-regular fa-comments"></i> 15 </li>
                                        <li><i class="fa-solid fa-paperclip"></i> 25 </li>
                                        <li style="font-size: 12px;"><i class="fa-regular fa-calendar-days"></i> 30-12-2022</li>
                                    </ul>
                                </div>

                            </div>
                        </div>

                        <div class="dropzone" id="yellow">

                            <div class="kanbanCard yellow">
                                <div class="content">
                                    <ul class="task_list">
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/7.png')}}" title="Sadik" alt=""> Client Name </a></li>
                                        <!-- <li><span>#749</span></li> -->
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/4.png')}}" title="Sadik" alt=""> Sadik Istiak </a></li>
                                    </ul>

                                    <ul class="task_list" id="projects_sp1_padding">
                                        <li><a href="#" title="wordpress theme development"><i class="fa-solid fa-layer-group"></i> Lorem ipsum dolor sit amet curn...</a> </li>
                                        <li class="clipboard_list_sp1"> <i class="fa-solid fa-clipboard-list"></i> 1/2 </li>
                                    </ul>


                                    <ul class="task_list">
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/11.jpg')}}" title="Sadik" alt=""> </a></li>
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/man.png')}}" title="Sadik" alt="">  </a></li>
                                        <li><span title="Sadik, kamal, Riyaz" >12+</span></li>
                                        <li><i class="fa-regular fa-comments"></i> 15 </li>
                                        <li><i class="fa-solid fa-paperclip"></i> 25 </li>
                                        <li style="font-size: 12px;"><i class="fa-regular fa-calendar-days"></i> 30-12-2022</li>
                                    </ul>
                                </div>

                            </div>
                        </div>

                        <div class="dropzone" id="yellow">

                            <div class="kanbanCard yellow">
                                <div class="content">
                                    <ul class="task_list">
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/7.png')}}" title="Sadik" alt=""> Client Name </a></li>
                                        <!-- <li><span>#749</span></li> -->
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/4.png')}}" title="Sadik" alt=""> Sadik Istiak </a></li>
                                    </ul>

                                    <ul class="task_list" id="projects_sp1_padding">
                                        <li><a href="#" title="wordpress theme development"><i class="fa-solid fa-layer-group"></i> Lorem ipsum dolor sit amet curn...</a> </li>
                                        <li class="clipboard_list_sp1"> <i class="fa-solid fa-clipboard-list"></i> 1/2 </li>
                                    </ul>


                                    <ul class="task_list">
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/11.jpg')}}" title="Sadik" alt=""> </a></li>
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/man.png')}}" title="Sadik" alt="">  </a></li>
                                        <li><span title="Sadik, kamal, Riyaz" >12+</span></li>
                                        <li><i class="fa-regular fa-comments"></i> 15 </li>
                                        <li><i class="fa-solid fa-paperclip"></i> 25 </li>
                                        <li style="font-size: 12px;"><i class="fa-regular fa-calendar-days"></i> 30-12-2022</li>
                                    </ul>
                                </div>

                            </div>
                        </div>

                        <div class="dropzone" id="yellow">

                            <div class="kanbanCard yellow">
                                <div class="content">
                                    <ul class="task_list">
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/7.png')}}" title="Sadik" alt=""> Client Name </a></li>
                                        <!-- <li><span>#749</span></li> -->
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/4.png')}}" title="Sadik" alt=""> Sadik Istiak </a></li>
                                    </ul>

                                    <ul class="task_list" id="projects_sp1_padding">
                                        <li><a href="#" title="wordpress theme development"><i class="fa-solid fa-layer-group"></i> Lorem ipsum dolor sit amet curn...</a> </li>
                                        <li class="clipboard_list_sp1"> <i class="fa-solid fa-clipboard-list"></i> 1/2 </li>
                                    </ul>


                                    <ul class="task_list">
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/11.jpg')}}" title="Sadik" alt=""> </a></li>
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/man.png')}}" title="Sadik" alt="">  </a></li>
                                        <li><span title="Sadik, kamal, Riyaz" >12+</span></li>
                                        <li><i class="fa-regular fa-comments"></i> 15 </li>
                                        <li><i class="fa-solid fa-paperclip"></i> 25 </li>
                                        <li style="font-size: 12px;"><i class="fa-regular fa-calendar-days"></i> 30-12-2022</li>
                                    </ul>
                                </div>

                            </div>
                        </div>



                    </div>

                </div>


                <!-- board  -->
                <!-- To Do  -->

                <div class="board">
                    <ul class="board_list">
                        <li class="blue">To Do</li>
                        <li>0</li>
                    </ul>

                    <div id="sp1-scrollbar">

                        <div class="dropzone" id="yellow">

                            <div class="kanbanCard yellow">
                                <div class="content">
                                    <ul class="task_list">
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/7.png')}}" title="Sadik" alt=""> Client Name </a></li>
                                        <!-- <li><span>#749</span></li> -->
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/4.png')}}" title="Sadik" alt=""> Sadik Istiak </a></li>
                                    </ul>

                                    <ul class="task_list" id="projects_sp1_padding">
                                        <li><a href="#" title="wordpress theme development"><i class="fa-solid fa-layer-group"></i> Lorem ipsum dolor sit amet curn...</a> </li>
                                        <li class="clipboard_list_sp1"> <i class="fa-solid fa-clipboard-list"></i> 1/2 </li>
                                    </ul>


                                    <ul class="task_list">
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/11.jpg')}}" title="Sadik" alt=""> </a></li>
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/man.png')}}" title="Sadik" alt="">  </a></li>
                                        <li><span title="Sadik, kamal, Riyaz" >12+</span></li>
                                        <li><i class="fa-regular fa-comments"></i> 15 </li>
                                        <li><i class="fa-solid fa-paperclip"></i> 25 </li>
                                        <li style="font-size: 12px;"><i class="fa-regular fa-calendar-days"></i> 30-12-2022</li>
                                    </ul>
                                </div>

                            </div>
                        </div>

                        <div class="dropzone" id="yellow">

                            <div class="kanbanCard yellow">
                                <div class="content">
                                    <ul class="task_list">
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/7.png')}}" title="Sadik" alt=""> Client Name </a></li>
                                        <!-- <li><span>#749</span></li> -->
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/4.png')}}" title="Sadik" alt=""> Sadik Istiak </a></li>
                                    </ul>

                                    <ul class="task_list" id="projects_sp1_padding">
                                        <li><a href="#" title="wordpress theme development"><i class="fa-solid fa-layer-group"></i> Lorem ipsum dolor sit amet curn...</a> </li>
                                        <li class="clipboard_list_sp1"> <i class="fa-solid fa-clipboard-list"></i> 1/2 </li>
                                    </ul>


                                    <ul class="task_list">
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/11.jpg')}}" title="Sadik" alt=""> </a></li>
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/man.png')}}" title="Sadik" alt="">  </a></li>
                                        <li><span title="Sadik, kamal, Riyaz" >12+</span></li>
                                        <li><i class="fa-regular fa-comments"></i> 15 </li>
                                        <li><i class="fa-solid fa-paperclip"></i> 25 </li>
                                        <li style="font-size: 12px;"><i class="fa-regular fa-calendar-days"></i> 30-12-2022</li>
                                    </ul>
                                </div>

                            </div>
                        </div>

                        <div class="dropzone" id="yellow">

                            <div class="kanbanCard yellow">
                                <div class="content">
                                    <ul class="task_list">
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/7.png')}}" title="Sadik" alt=""> Client Name </a></li>
                                        <!-- <li><span>#749</span></li> -->
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/4.png')}}" title="Sadik" alt=""> Sadik Istiak </a></li>
                                    </ul>

                                    <ul class="task_list" id="projects_sp1_padding">
                                        <li><a href="#" title="wordpress theme development"><i class="fa-solid fa-layer-group"></i> Lorem ipsum dolor sit amet curn...</a> </li>
                                        <li class="clipboard_list_sp1"> <i class="fa-solid fa-clipboard-list"></i> 1/2 </li>
                                    </ul>


                                    <ul class="task_list">
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/11.jpg')}}" title="Sadik" alt=""> </a></li>
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/man.png')}}" title="Sadik" alt="">  </a></li>
                                        <li><span title="Sadik, kamal, Riyaz" >12+</span></li>
                                        <li><i class="fa-regular fa-comments"></i> 15 </li>
                                        <li><i class="fa-solid fa-paperclip"></i> 25 </li>
                                        <li style="font-size: 12px;"><i class="fa-regular fa-calendar-days"></i> 30-12-2022</li>
                                    </ul>
                                </div>

                            </div>
                        </div>

                        <div class="dropzone" id="yellow">

                            <div class="kanbanCard yellow">
                                <div class="content">
                                    <ul class="task_list">
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/7.png')}}" title="Sadik" alt=""> Client Name </a></li>
                                        <!-- <li><span>#749</span></li> -->
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/4.png')}}" title="Sadik" alt=""> Sadik Istiak </a></li>
                                    </ul>

                                    <ul class="task_list" id="projects_sp1_padding">
                                        <li><a href="#" title="wordpress theme development"><i class="fa-solid fa-layer-group"></i> Lorem ipsum dolor sit amet curn...</a> </li>
                                        <li class="clipboard_list_sp1"> <i class="fa-solid fa-clipboard-list"></i> 1/2 </li>
                                    </ul>


                                    <ul class="task_list">
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/11.jpg')}}" title="Sadik" alt=""> </a></li>
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/man.png')}}" title="Sadik" alt="">  </a></li>
                                        <li><span title="Sadik, kamal, Riyaz" >12+</span></li>
                                        <li><i class="fa-regular fa-comments"></i> 15 </li>
                                        <li><i class="fa-solid fa-paperclip"></i> 25 </li>
                                        <li style="font-size: 12px;"><i class="fa-regular fa-calendar-days"></i> 30-12-2022</li>
                                    </ul>
                                </div>

                            </div>
                        </div>

                        <div class="dropzone" id="yellow">

                            <div class="kanbanCard yellow">
                                <div class="content">
                                    <ul class="task_list">
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/7.png')}}" title="Sadik" alt=""> Client Name </a></li>
                                        <!-- <li><span>#749</span></li> -->
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/4.png')}}" title="Sadik" alt=""> Sadik Istiak </a></li>
                                    </ul>

                                    <ul class="task_list" id="projects_sp1_padding">
                                        <li><a href="#" title="wordpress theme development"><i class="fa-solid fa-layer-group"></i> Lorem ipsum dolor sit amet curn...</a> </li>
                                        <li class="clipboard_list_sp1"> <i class="fa-solid fa-clipboard-list"></i> 1/2 </li>
                                    </ul>


                                    <ul class="task_list">
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/11.jpg')}}" title="Sadik" alt=""> </a></li>
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/man.png')}}" title="Sadik" alt="">  </a></li>
                                        <li><span title="Sadik, kamal, Riyaz" >12+</span></li>
                                        <li><i class="fa-regular fa-comments"></i> 15 </li>
                                        <li><i class="fa-solid fa-paperclip"></i> 25 </li>
                                        <li style="font-size: 12px;"><i class="fa-regular fa-calendar-days"></i> 30-12-2022</li>
                                    </ul>
                                </div>

                            </div>
                        </div>

                        <div class="dropzone" id="yellow">

                            <div class="kanbanCard yellow">
                                <div class="content">
                                    <ul class="task_list">
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/7.png')}}" title="Sadik" alt=""> Client Name </a></li>
                                        <!-- <li><span>#749</span></li> -->
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/4.png')}}" title="Sadik" alt=""> Sadik Istiak </a></li>
                                    </ul>

                                    <ul class="task_list" id="projects_sp1_padding">
                                        <li><a href="#" title="wordpress theme development"><i class="fa-solid fa-layer-group"></i> Lorem ipsum dolor sit amet curn...</a> </li>
                                        <li class="clipboard_list_sp1"> <i class="fa-solid fa-clipboard-list"></i> 1/2 </li>
                                    </ul>


                                    <ul class="task_list">
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/11.jpg')}}" title="Sadik" alt=""> </a></li>
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/man.png')}}" title="Sadik" alt="">  </a></li>
                                        <li><span title="Sadik, kamal, Riyaz" >12+</span></li>
                                        <li><i class="fa-regular fa-comments"></i> 15 </li>
                                        <li><i class="fa-solid fa-paperclip"></i> 25 </li>
                                        <li style="font-size: 12px;"><i class="fa-regular fa-calendar-days"></i> 30-12-2022</li>
                                    </ul>
                                </div>

                            </div>
                        </div>

                        <div class="dropzone" id="yellow">

                            <div class="kanbanCard yellow">
                                <div class="content">
                                    <ul class="task_list">
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/7.png')}}" title="Sadik" alt=""> Client Name </a></li>
                                        <!-- <li><span>#749</span></li> -->
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/4.png')}}" title="Sadik" alt=""> Sadik Istiak </a></li>
                                    </ul>

                                    <ul class="task_list" id="projects_sp1_padding">
                                        <li><a href="#" title="wordpress theme development"><i class="fa-solid fa-layer-group"></i> Lorem ipsum dolor sit amet curn...</a> </li>
                                        <li class="clipboard_list_sp1"> <i class="fa-solid fa-clipboard-list"></i> 1/2 </li>
                                    </ul>


                                    <ul class="task_list">
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/11.jpg')}}" title="Sadik" alt=""> </a></li>
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/man.png')}}" title="Sadik" alt="">  </a></li>
                                        <li><span title="Sadik, kamal, Riyaz" >12+</span></li>
                                        <li><i class="fa-regular fa-comments"></i> 15 </li>
                                        <li><i class="fa-solid fa-paperclip"></i> 25 </li>
                                        <li style="font-size: 12px;"><i class="fa-regular fa-calendar-days"></i> 30-12-2022</li>
                                    </ul>
                                </div>

                            </div>
                        </div>



                    </div>


                </div>

                <!-- board  -->
                <!-- Doing  -->

                <div class="board">
                    <ul class="board_list">
                        <li class="yellows">Doing</li>
                        <li>0</li>
                    </ul>

                    <div id="sp1-scrollbar">

                        <div class="dropzone" id="yellow">

                            <div class="kanbanCard yellow">
                                <div class="content">
                                    <ul class="task_list">
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/7.png')}}" title="Sadik" alt=""> Client Name </a></li>
                                        <!-- <li><span>#749</span></li> -->
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/4.png')}}" title="Sadik" alt=""> Sadik Istiak </a></li>
                                    </ul>

                                    <ul class="task_list" id="projects_sp1_padding">
                                        <li><a href="#" title="wordpress theme development"><i class="fa-solid fa-layer-group"></i> Lorem ipsum dolor sit amet curn...</a> </li>
                                        <li class="clipboard_list_sp1"> <i class="fa-solid fa-clipboard-list"></i> 1/2 </li>
                                    </ul>


                                    <ul class="task_list">
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/11.jpg')}}" title="Sadik" alt=""> </a></li>
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/man.png')}}" title="Sadik" alt="">  </a></li>
                                        <li><span title="Sadik, kamal, Riyaz" >12+</span></li>
                                        <li><i class="fa-regular fa-comments"></i> 15 </li>
                                        <li><i class="fa-solid fa-paperclip"></i> 25 </li>
                                        <li style="font-size: 12px;"><i class="fa-regular fa-calendar-days"></i> 30-12-2022</li>
                                    </ul>
                                </div>

                            </div>
                        </div>

                        <div class="dropzone" id="yellow">

                            <div class="kanbanCard yellow">
                                <div class="content">
                                    <ul class="task_list">
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/7.png')}}" title="Sadik" alt=""> Client Name </a></li>
                                        <!-- <li><span>#749</span></li> -->
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/4.png')}}" title="Sadik" alt=""> Sadik Istiak </a></li>
                                    </ul>

                                    <ul class="task_list" id="projects_sp1_padding">
                                        <li><a href="#" title="wordpress theme development"><i class="fa-solid fa-layer-group"></i> Lorem ipsum dolor sit amet curn...</a> </li>
                                        <li class="clipboard_list_sp1"> <i class="fa-solid fa-clipboard-list"></i> 1/2 </li>
                                    </ul>


                                    <ul class="task_list">
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/11.jpg')}}" title="Sadik" alt=""> </a></li>
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/man.png')}}" title="Sadik" alt="">  </a></li>
                                        <li><span title="Sadik, kamal, Riyaz" >12+</span></li>
                                        <li><i class="fa-regular fa-comments"></i> 15 </li>
                                        <li><i class="fa-solid fa-paperclip"></i> 25 </li>
                                        <li style="font-size: 12px;"><i class="fa-regular fa-calendar-days"></i> 30-12-2022</li>
                                    </ul>
                                </div>

                            </div>
                        </div>

                        <div class="dropzone" id="yellow">

                            <div class="kanbanCard yellow">
                                <div class="content">
                                    <ul class="task_list">
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/7.png')}}" title="Sadik" alt=""> Client Name </a></li>
                                        <!-- <li><span>#749</span></li> -->
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/4.png')}}" title="Sadik" alt=""> Sadik Istiak </a></li>
                                    </ul>

                                    <ul class="task_list" id="projects_sp1_padding">
                                        <li><a href="#" title="wordpress theme development"><i class="fa-solid fa-layer-group"></i> Lorem ipsum dolor sit amet curn...</a> </li>
                                        <li class="clipboard_list_sp1"> <i class="fa-solid fa-clipboard-list"></i> 1/2 </li>
                                    </ul>


                                    <ul class="task_list">
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/11.jpg')}}" title="Sadik" alt=""> </a></li>
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/man.png')}}" title="Sadik" alt="">  </a></li>
                                        <li><span title="Sadik, kamal, Riyaz" >12+</span></li>
                                        <li><i class="fa-regular fa-comments"></i> 15 </li>
                                        <li><i class="fa-solid fa-paperclip"></i> 25 </li>
                                        <li style="font-size: 12px;"><i class="fa-regular fa-calendar-days"></i> 30-12-2022</li>
                                    </ul>
                                </div>

                            </div>
                        </div>

                        <div class="dropzone" id="yellow">

                            <div class="kanbanCard yellow">
                                <div class="content">
                                    <ul class="task_list">
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/7.png')}}" title="Sadik" alt=""> Client Name </a></li>
                                        <!-- <li><span>#749</span></li> -->
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/4.png')}}" title="Sadik" alt=""> Sadik Istiak </a></li>
                                    </ul>

                                    <ul class="task_list" id="projects_sp1_padding">
                                        <li><a href="#" title="wordpress theme development"><i class="fa-solid fa-layer-group"></i> Lorem ipsum dolor sit amet curn...</a> </li>
                                        <li class="clipboard_list_sp1"> <i class="fa-solid fa-clipboard-list"></i> 1/2 </li>
                                    </ul>


                                    <ul class="task_list">
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/11.jpg')}}" title="Sadik" alt=""> </a></li>
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/man.png')}}" title="Sadik" alt="">  </a></li>
                                        <li><span title="Sadik, kamal, Riyaz" >12+</span></li>
                                        <li><i class="fa-regular fa-comments"></i> 15 </li>
                                        <li><i class="fa-solid fa-paperclip"></i> 25 </li>
                                        <li style="font-size: 12px;"><i class="fa-regular fa-calendar-days"></i> 30-12-2022</li>
                                    </ul>
                                </div>

                            </div>
                        </div>

                        <div class="dropzone" id="yellow">

                            <div class="kanbanCard yellow">
                                <div class="content">
                                    <ul class="task_list">
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/7.png')}}" title="Sadik" alt=""> Client Name </a></li>
                                        <!-- <li><span>#749</span></li> -->
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/4.png')}}" title="Sadik" alt=""> Sadik Istiak </a></li>
                                    </ul>

                                    <ul class="task_list" id="projects_sp1_padding">
                                        <li><a href="#" title="wordpress theme development"><i class="fa-solid fa-layer-group"></i> Lorem ipsum dolor sit amet curn...</a> </li>
                                        <li class="clipboard_list_sp1"> <i class="fa-solid fa-clipboard-list"></i> 1/2 </li>
                                    </ul>


                                    <ul class="task_list">
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/11.jpg')}}" title="Sadik" alt=""> </a></li>
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/man.png')}}" title="Sadik" alt="">  </a></li>
                                        <li><span title="Sadik, kamal, Riyaz" >12+</span></li>
                                        <li><i class="fa-regular fa-comments"></i> 15 </li>
                                        <li><i class="fa-solid fa-paperclip"></i> 25 </li>
                                        <li style="font-size: 12px;"><i class="fa-regular fa-calendar-days"></i> 30-12-2022</li>
                                    </ul>
                                </div>

                            </div>
                        </div>

                        <div class="dropzone" id="yellow">

                            <div class="kanbanCard yellow">
                                <div class="content">
                                    <ul class="task_list">
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/7.png')}}" title="Sadik" alt=""> Client Name </a></li>
                                        <!-- <li><span>#749</span></li> -->
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/4.png')}}" title="Sadik" alt=""> Sadik Istiak </a></li>
                                    </ul>

                                    <ul class="task_list" id="projects_sp1_padding">
                                        <li><a href="#" title="wordpress theme development"><i class="fa-solid fa-layer-group"></i> Lorem ipsum dolor sit amet curn...</a> </li>
                                        <li class="clipboard_list_sp1"> <i class="fa-solid fa-clipboard-list"></i> 1/2 </li>
                                    </ul>


                                    <ul class="task_list">
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/11.jpg')}}" title="Sadik" alt=""> </a></li>
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/man.png')}}" title="Sadik" alt="">  </a></li>
                                        <li><span title="Sadik, kamal, Riyaz" >12+</span></li>
                                        <li><i class="fa-regular fa-comments"></i> 15 </li>
                                        <li><i class="fa-solid fa-paperclip"></i> 25 </li>
                                        <li style="font-size: 12px;"><i class="fa-regular fa-calendar-days"></i> 30-12-2022</li>
                                    </ul>
                                </div>

                            </div>
                        </div>


                    </div>
                </div>


                <!-- board  -->
                <!-- Under Review -->

                <div class="board">
                    <ul class="board_list">
                        <li>Under Review</li>
                        <li>0</li>
                    </ul>

                    <div id="sp1-scrollbar">


                        <div class="dropzone" id="yellow">

                            <div class="kanbanCard yellow">
                                <div class="content">
                                    <ul class="task_list">
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/7.png')}}" title="Sadik" alt=""> Client Name </a></li>
                                        <!-- <li><span>#749</span></li> -->
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/4.png')}}" title="Sadik" alt=""> Sadik Istiak </a></li>
                                    </ul>

                                    <ul class="task_list" id="projects_sp1_padding">
                                        <li><a href="#" title="wordpress theme development"><i class="fa-solid fa-layer-group"></i> Lorem ipsum dolor sit amet curn...</a> </li>
                                        <li class="clipboard_list_sp1"> <i class="fa-solid fa-clipboard-list"></i> 1/2 </li>
                                    </ul>


                                    <ul class="task_list">
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/11.jpg')}}" title="Sadik" alt=""> </a></li>
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/man.png')}}" title="Sadik" alt="">  </a></li>
                                        <li><span title="Sadik, kamal, Riyaz" >12+</span></li>
                                        <li><i class="fa-regular fa-comments"></i> 15 </li>
                                        <li><i class="fa-solid fa-paperclip"></i> 25 </li>
                                        <li style="font-size: 12px;"><i class="fa-regular fa-calendar-days"></i> 30-12-2022</li>
                                    </ul>
                                </div>

                            </div>
                        </div>

                        <div class="dropzone" id="yellow">

                            <div class="kanbanCard yellow">
                                <div class="content">
                                    <ul class="task_list">
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/7.png')}}" title="Sadik" alt=""> Client Name </a></li>
                                        <!-- <li><span>#749</span></li> -->
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/4.png')}}" title="Sadik" alt=""> Sadik Istiak </a></li>
                                    </ul>

                                    <ul class="task_list" id="projects_sp1_padding">
                                        <li><a href="#" title="wordpress theme development"><i class="fa-solid fa-layer-group"></i> Lorem ipsum dolor sit amet curn...</a> </li>
                                        <li class="clipboard_list_sp1"> <i class="fa-solid fa-clipboard-list"></i> 1/2 </li>
                                    </ul>


                                    <ul class="task_list">
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/11.jpg')}}" title="Sadik" alt=""> </a></li>
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/man.png')}}" title="Sadik" alt="">  </a></li>
                                        <li><span title="Sadik, kamal, Riyaz" >12+</span></li>
                                        <li><i class="fa-regular fa-comments"></i> 15 </li>
                                        <li><i class="fa-solid fa-paperclip"></i> 25 </li>
                                        <li style="font-size: 12px;"><i class="fa-regular fa-calendar-days"></i> 30-12-2022</li>
                                    </ul>
                                </div>

                            </div>
                        </div>

                        <div class="dropzone" id="yellow">

                            <div class="kanbanCard yellow">
                                <div class="content">
                                    <ul class="task_list">
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/7.png')}}" title="Sadik" alt=""> Client Name </a></li>
                                        <!-- <li><span>#749</span></li> -->
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/4.png')}}" title="Sadik" alt=""> Sadik Istiak </a></li>
                                    </ul>

                                    <ul class="task_list" id="projects_sp1_padding">
                                        <li><a href="#" title="wordpress theme development"><i class="fa-solid fa-layer-group"></i> Lorem ipsum dolor sit amet curn...</a> </li>
                                        <li class="clipboard_list_sp1"> <i class="fa-solid fa-clipboard-list"></i> 1/2 </li>
                                    </ul>


                                    <ul class="task_list">
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/11.jpg')}}" title="Sadik" alt=""> </a></li>
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/man.png')}}" title="Sadik" alt="">  </a></li>
                                        <li><span title="Sadik, kamal, Riyaz" >12+</span></li>
                                        <li><i class="fa-regular fa-comments"></i> 15 </li>
                                        <li><i class="fa-solid fa-paperclip"></i> 25 </li>
                                        <li style="font-size: 12px;"><i class="fa-regular fa-calendar-days"></i> 30-12-2022</li>
                                    </ul>
                                </div>

                            </div>
                        </div>

                        <div class="dropzone" id="yellow">

                            <div class="kanbanCard yellow">
                                <div class="content">
                                    <ul class="task_list">
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/7.png')}}" title="Sadik" alt=""> Client Name </a></li>
                                        <!-- <li><span>#749</span></li> -->
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/4.png')}}" title="Sadik" alt=""> Sadik Istiak </a></li>
                                    </ul>

                                    <ul class="task_list" id="projects_sp1_padding">
                                        <li><a href="#" title="wordpress theme development"><i class="fa-solid fa-layer-group"></i> Lorem ipsum dolor sit amet curn...</a> </li>
                                        <li class="clipboard_list_sp1"> <i class="fa-solid fa-clipboard-list"></i> 1/2 </li>
                                    </ul>


                                    <ul class="task_list">
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/11.jpg')}}" title="Sadik" alt=""> </a></li>
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/man.png')}}" title="Sadik" alt="">  </a></li>
                                        <li><span title="Sadik, kamal, Riyaz" >12+</span></li>
                                        <li><i class="fa-regular fa-comments"></i> 15 </li>
                                        <li><i class="fa-solid fa-paperclip"></i> 25 </li>
                                        <li style="font-size: 12px;"><i class="fa-regular fa-calendar-days"></i> 30-12-2022</li>
                                    </ul>
                                </div>

                            </div>
                        </div>

                        <div class="dropzone" id="yellow">

                            <div class="kanbanCard yellow">
                                <div class="content">
                                    <ul class="task_list">
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/7.png')}}" title="Sadik" alt=""> Client Name </a></li>
                                        <!-- <li><span>#749</span></li> -->
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/4.png')}}" title="Sadik" alt=""> Sadik Istiak </a></li>
                                    </ul>

                                    <ul class="task_list" id="projects_sp1_padding">
                                        <li><a href="#" title="wordpress theme development"><i class="fa-solid fa-layer-group"></i> Lorem ipsum dolor sit amet curn...</a> </li>
                                        <li class="clipboard_list_sp1"> <i class="fa-solid fa-clipboard-list"></i> 1/2 </li>
                                    </ul>


                                    <ul class="task_list">
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/11.jpg')}}" title="Sadik" alt=""> </a></li>
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/man.png')}}" title="Sadik" alt="">  </a></li>
                                        <li><span title="Sadik, kamal, Riyaz" >12+</span></li>
                                        <li><i class="fa-regular fa-comments"></i> 15 </li>
                                        <li><i class="fa-solid fa-paperclip"></i> 25 </li>
                                        <li style="font-size: 12px;"><i class="fa-regular fa-calendar-days"></i> 30-12-2022</li>
                                    </ul>
                                </div>

                            </div>
                        </div>

                        <div class="dropzone" id="yellow">

                            <div class="kanbanCard yellow">
                                <div class="content">
                                    <ul class="task_list">
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/7.png')}}" title="Sadik" alt=""> Client Name </a></li>
                                        <!-- <li><span>#749</span></li> -->
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/4.png')}}" title="Sadik" alt=""> Sadik Istiak </a></li>
                                    </ul>

                                    <ul class="task_list" id="projects_sp1_padding">
                                        <li><a href="#" title="wordpress theme development"><i class="fa-solid fa-layer-group"></i> Lorem ipsum dolor sit amet curn...</a> </li>
                                        <li class="clipboard_list_sp1"> <i class="fa-solid fa-clipboard-list"></i> 1/2 </li>
                                    </ul>


                                    <ul class="task_list">
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/11.jpg')}}" title="Sadik" alt=""> </a></li>
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/man.png')}}" title="Sadik" alt="">  </a></li>
                                        <li><span title="Sadik, kamal, Riyaz" >12+</span></li>
                                        <li><i class="fa-regular fa-comments"></i> 15 </li>
                                        <li><i class="fa-solid fa-paperclip"></i> 25 </li>
                                        <li style="font-size: 12px;"><i class="fa-regular fa-calendar-days"></i> 30-12-2022</li>
                                    </ul>
                                </div>

                            </div>
                        </div>

                        <div class="dropzone" id="yellow">

                            <div class="kanbanCard yellow">
                                <div class="content">
                                    <ul class="task_list">
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/7.png')}}" title="Sadik" alt=""> Client Name </a></li>
                                        <!-- <li><span>#749</span></li> -->
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/4.png')}}" title="Sadik" alt=""> Sadik Istiak </a></li>
                                    </ul>

                                    <ul class="task_list" id="projects_sp1_padding">
                                        <li><a href="#" title="wordpress theme development"><i class="fa-solid fa-layer-group"></i> Lorem ipsum dolor sit amet curn...</a> </li>
                                        <li class="clipboard_list_sp1"> <i class="fa-solid fa-clipboard-list"></i> 1/2 </li>
                                    </ul>


                                    <ul class="task_list">
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/11.jpg')}}" title="Sadik" alt=""> </a></li>
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/man.png')}}" title="Sadik" alt="">  </a></li>
                                        <li><span title="Sadik, kamal, Riyaz" >12+</span></li>
                                        <li><i class="fa-regular fa-comments"></i> 15 </li>
                                        <li><i class="fa-solid fa-paperclip"></i> 25 </li>
                                        <li style="font-size: 12px;"><i class="fa-regular fa-calendar-days"></i> 30-12-2022</li>
                                    </ul>
                                </div>

                            </div>
                        </div>



                    </div>
                </div>


                <!-- Board -->
                <!-- Completed -->

                <div class="board">
                    <ul class="board_list">
                        <li>Completed</li>
                        <li>0</li>
                    </ul>
                    <div id="sp1-scrollbar">

                        <div class="dropzone" id="yellow">

                            <div class="kanbanCard yellow">
                                <div class="content">
                                    <ul class="task_list">
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/7.png')}}" title="Sadik" alt=""> Client Name </a></li>
                                        <!-- <li><span>#749</span></li> -->
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/4.png')}}" title="Sadik" alt=""> Sadik Istiak </a></li>
                                    </ul>

                                    <ul class="task_list" id="projects_sp1_padding">
                                        <li><a href="#" title="wordpress theme development"><i class="fa-solid fa-layer-group"></i> Lorem ipsum dolor sit amet curn...</a> </li>
                                        <li class="clipboard_list_sp1"> <i class="fa-solid fa-clipboard-list"></i> 1/2 </li>
                                    </ul>


                                    <ul class="task_list">
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/11.jpg')}}" title="Sadik" alt=""> </a></li>
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/man.png')}}" title="Sadik" alt="">  </a></li>
                                        <li><span title="Sadik, kamal, Riyaz" >12+</span></li>
                                        <li><i class="fa-regular fa-comments"></i> 15 </li>
                                        <li><i class="fa-solid fa-paperclip"></i> 25 </li>
                                        <li style="font-size: 12px;"><i class="fa-regular fa-calendar-days"></i> 30-12-2022</li>
                                    </ul>
                                </div>

                            </div>
                        </div>

                        <div class="dropzone" id="yellow">

                            <div class="kanbanCard yellow">
                                <div class="content">
                                    <ul class="task_list">
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/7.png')}}" title="Sadik" alt=""> Client Name </a></li>
                                        <!-- <li><span>#749</span></li> -->
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/4.png')}}" title="Sadik" alt=""> Sadik Istiak </a></li>
                                    </ul>

                                    <ul class="task_list" id="projects_sp1_padding">
                                        <li><a href="#" title="wordpress theme development"><i class="fa-solid fa-layer-group"></i> Lorem ipsum dolor sit amet curn...</a> </li>
                                        <li class="clipboard_list_sp1"> <i class="fa-solid fa-clipboard-list"></i> 1/2 </li>
                                    </ul>


                                    <ul class="task_list">
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/11.jpg')}}" title="Sadik" alt=""> </a></li>
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/man.png')}}" title="Sadik" alt="">  </a></li>
                                        <li><span title="Sadik, kamal, Riyaz" >12+</span></li>
                                        <li><i class="fa-regular fa-comments"></i> 15 </li>
                                        <li><i class="fa-solid fa-paperclip"></i> 25 </li>
                                        <li style="font-size: 12px;"><i class="fa-regular fa-calendar-days"></i> 30-12-2022</li>
                                    </ul>
                                </div>

                            </div>
                        </div>

                        <div class="dropzone" id="yellow">

                            <div class="kanbanCard yellow">
                                <div class="content">
                                    <ul class="task_list">
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/7.png')}}" title="Sadik" alt=""> Client Name </a></li>
                                        <!-- <li><span>#749</span></li> -->
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/4.png')}}" title="Sadik" alt=""> Sadik Istiak </a></li>
                                    </ul>

                                    <ul class="task_list" id="projects_sp1_padding">
                                        <li><a href="#" title="wordpress theme development"><i class="fa-solid fa-layer-group"></i> Lorem ipsum dolor sit amet curn...</a> </li>
                                        <li class="clipboard_list_sp1"> <i class="fa-solid fa-clipboard-list"></i> 1/2 </li>
                                    </ul>


                                    <ul class="task_list">
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/11.jpg')}}" title="Sadik" alt=""> </a></li>
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/man.png')}}" title="Sadik" alt="">  </a></li>
                                        <li><span title="Sadik, kamal, Riyaz" >12+</span></li>
                                        <li><i class="fa-regular fa-comments"></i> 15 </li>
                                        <li><i class="fa-solid fa-paperclip"></i> 25 </li>
                                        <li style="font-size: 12px;"><i class="fa-regular fa-calendar-days"></i> 30-12-2022</li>
                                    </ul>
                                </div>

                            </div>
                        </div>

                        <div class="dropzone" id="yellow">

                            <div class="kanbanCard yellow">
                                <div class="content">
                                    <ul class="task_list">
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/7.png')}}" title="Sadik" alt=""> Client Name </a></li>
                                        <!-- <li><span>#749</span></li> -->
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/4.png')}}" title="Sadik" alt=""> Sadik Istiak </a></li>
                                    </ul>

                                    <ul class="task_list" id="projects_sp1_padding">
                                        <li><a href="#" title="wordpress theme development"><i class="fa-solid fa-layer-group"></i> Lorem ipsum dolor sit amet curn...</a> </li>
                                        <li class="clipboard_list_sp1"> <i class="fa-solid fa-clipboard-list"></i> 1/2 </li>
                                    </ul>


                                    <ul class="task_list">
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/11.jpg')}}" title="Sadik" alt=""> </a></li>
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/man.png')}}" title="Sadik" alt="">  </a></li>
                                        <li><span title="Sadik, kamal, Riyaz" >12+</span></li>
                                        <li><i class="fa-regular fa-comments"></i> 15 </li>
                                        <li><i class="fa-solid fa-paperclip"></i> 25 </li>
                                        <li style="font-size: 12px;"><i class="fa-regular fa-calendar-days"></i> 30-12-2022</li>
                                    </ul>
                                </div>

                            </div>
                        </div>

                        <div class="dropzone" id="yellow">

                            <div class="kanbanCard yellow">
                                <div class="content">
                                    <ul class="task_list">
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/7.png')}}" title="Sadik" alt=""> Client Name </a></li>
                                        <!-- <li><span>#749</span></li> -->
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/4.png')}}" title="Sadik" alt=""> Sadik Istiak </a></li>
                                    </ul>

                                    <ul class="task_list" id="projects_sp1_padding">
                                        <li><a href="#" title="wordpress theme development"><i class="fa-solid fa-layer-group"></i> Lorem ipsum dolor sit amet curn...</a> </li>
                                        <li class="clipboard_list_sp1"> <i class="fa-solid fa-clipboard-list"></i> 1/2 </li>
                                    </ul>


                                    <ul class="task_list">
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/11.jpg')}}" title="Sadik" alt=""> </a></li>
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/man.png')}}" title="Sadik" alt="">  </a></li>
                                        <li><span title="Sadik, kamal, Riyaz" >12+</span></li>
                                        <li><i class="fa-regular fa-comments"></i> 15 </li>
                                        <li><i class="fa-solid fa-paperclip"></i> 25 </li>
                                        <li style="font-size: 12px;"><i class="fa-regular fa-calendar-days"></i> 30-12-2022</li>
                                    </ul>
                                </div>

                            </div>
                        </div>

                        <div class="dropzone" id="yellow">

                            <div class="kanbanCard yellow">
                                <div class="content">
                                    <ul class="task_list">
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/7.png')}}" title="Sadik" alt=""> Client Name </a></li>
                                        <!-- <li><span>#749</span></li> -->
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/4.png')}}" title="Sadik" alt=""> Sadik Istiak </a></li>
                                    </ul>

                                    <ul class="task_list" id="projects_sp1_padding">
                                        <li><a href="#" title="wordpress theme development"><i class="fa-solid fa-layer-group"></i> Lorem ipsum dolor sit amet curn...</a> </li>
                                        <li class="clipboard_list_sp1"> <i class="fa-solid fa-clipboard-list"></i> 1/2 </li>
                                    </ul>


                                    <ul class="task_list">
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/11.jpg')}}" title="Sadik" alt=""> </a></li>
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/man.png')}}" title="Sadik" alt="">  </a></li>
                                        <li><span title="Sadik, kamal, Riyaz" >12+</span></li>
                                        <li><i class="fa-regular fa-comments"></i> 15 </li>
                                        <li><i class="fa-solid fa-paperclip"></i> 25 </li>
                                        <li style="font-size: 12px;"><i class="fa-regular fa-calendar-days"></i> 30-12-2022</li>
                                    </ul>
                                </div>

                            </div>
                        </div>

                        <div class="dropzone" id="yellow">

                            <div class="kanbanCard yellow">
                                <div class="content">
                                    <ul class="task_list">
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/7.png')}}" title="Sadik" alt=""> Client Name </a></li>
                                        <!-- <li><span>#749</span></li> -->
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/4.png')}}" title="Sadik" alt=""> Sadik Istiak </a></li>
                                    </ul>

                                    <ul class="task_list" id="projects_sp1_padding">
                                        <li><a href="#" title="wordpress theme development"><i class="fa-solid fa-layer-group"></i> Lorem ipsum dolor sit amet curn...</a> </li>
                                        <li class="clipboard_list_sp1"> <i class="fa-solid fa-clipboard-list"></i> 1/2 </li>
                                    </ul>


                                    <ul class="task_list">
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/11.jpg')}}" title="Sadik" alt=""> </a></li>
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/man.png')}}" title="Sadik" alt="">  </a></li>
                                        <li><span title="Sadik, kamal, Riyaz" >12+</span></li>
                                        <li><i class="fa-regular fa-comments"></i> 15 </li>
                                        <li><i class="fa-solid fa-paperclip"></i> 25 </li>
                                        <li style="font-size: 12px;"><i class="fa-regular fa-calendar-days"></i> 30-12-2022</li>
                                    </ul>
                                </div>

                            </div>
                        </div>


                    </div>
                </div>



                <!-- Board -->
                <!-- Overdue -->

                <div class="board">
                    <ul class="board_list">
                        <li>Overdue</li>
                        <li>0</li>
                    </ul>

                    <div id="sp1-scrollbar">


                        <div class="dropzone" id="yellow">

                            <div class="kanbanCard yellow">
                                <div class="content">
                                    <ul class="task_list">
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/7.png')}}" title="Sadik" alt=""> Client Name </a></li>
                                        <!-- <li><span>#749</span></li> -->
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/4.png')}}" title="Sadik" alt=""> Sadik Istiak </a></li>
                                    </ul>

                                    <ul class="task_list" id="projects_sp1_padding">
                                        <li><a href="#" title="wordpress theme development"><i class="fa-solid fa-layer-group"></i> Lorem ipsum dolor sit amet curn...</a> </li>
                                        <li class="clipboard_list_sp1"> <i class="fa-solid fa-clipboard-list"></i> 1/2 </li>
                                    </ul>


                                    <ul class="task_list">
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/11.jpg')}}" title="Sadik" alt=""> </a></li>
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/man.png')}}" title="Sadik" alt="">  </a></li>
                                        <li><span title="Sadik, kamal, Riyaz" >12+</span></li>
                                        <li><i class="fa-regular fa-comments"></i> 15 </li>
                                        <li><i class="fa-solid fa-paperclip"></i> 25 </li>
                                        <li style="font-size: 12px;"><i class="fa-regular fa-calendar-days"></i> 30-12-2022</li>
                                    </ul>
                                </div>

                            </div>
                        </div>

                        <div class="dropzone" id="yellow">

                            <div class="kanbanCard yellow">
                                <div class="content">
                                    <ul class="task_list">
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/7.png')}}" title="Sadik" alt=""> Client Name </a></li>
                                        <!-- <li><span>#749</span></li> -->
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/4.png')}}" title="Sadik" alt=""> Sadik Istiak </a></li>
                                    </ul>

                                    <ul class="task_list" id="projects_sp1_padding">
                                        <li><a href="#" title="wordpress theme development"><i class="fa-solid fa-layer-group"></i> Lorem ipsum dolor sit amet curn...</a> </li>
                                        <li class="clipboard_list_sp1"> <i class="fa-solid fa-clipboard-list"></i> 1/2 </li>
                                    </ul>


                                    <ul class="task_list">
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/11.jpg')}}" title="Sadik" alt=""> </a></li>
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/man.png')}}" title="Sadik" alt="">  </a></li>
                                        <li><span title="Sadik, kamal, Riyaz" >12+</span></li>
                                        <li><i class="fa-regular fa-comments"></i> 15 </li>
                                        <li><i class="fa-solid fa-paperclip"></i> 25 </li>
                                        <li style="font-size: 12px;"><i class="fa-regular fa-calendar-days"></i> 30-12-2022</li>
                                    </ul>
                                </div>

                            </div>
                        </div>

                        <div class="dropzone" id="yellow">

                            <div class="kanbanCard yellow">
                                <div class="content">
                                    <ul class="task_list">
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/7.png')}}" title="Sadik" alt=""> Client Name </a></li>
                                        <!-- <li><span>#749</span></li> -->
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/4.png')}}" title="Sadik" alt=""> Sadik Istiak </a></li>
                                    </ul>

                                    <ul class="task_list" id="projects_sp1_padding">
                                        <li><a href="#" title="wordpress theme development"><i class="fa-solid fa-layer-group"></i> Lorem ipsum dolor sit amet curn...</a> </li>
                                        <li class="clipboard_list_sp1"> <i class="fa-solid fa-clipboard-list"></i> 1/2 </li>
                                    </ul>


                                    <ul class="task_list">
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/11.jpg')}}" title="Sadik" alt=""> </a></li>
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/man.png')}}" title="Sadik" alt="">  </a></li>
                                        <li><span title="Sadik, kamal, Riyaz" >12+</span></li>
                                        <li><i class="fa-regular fa-comments"></i> 15 </li>
                                        <li><i class="fa-solid fa-paperclip"></i> 25 </li>
                                        <li style="font-size: 12px;"><i class="fa-regular fa-calendar-days"></i> 30-12-2022</li>
                                    </ul>
                                </div>

                            </div>
                        </div>

                        <div class="dropzone" id="yellow">

                            <div class="kanbanCard yellow">
                                <div class="content">
                                    <ul class="task_list">
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/7.png')}}" title="Sadik" alt=""> Client Name </a></li>
                                        <!-- <li><span>#749</span></li> -->
                                        <li> <a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/4.png')}}" title="Sadik" alt=""> Sadik Istiak </a></li>
                                    </ul>

                                    <ul class="task_list" id="projects_sp1_padding">
                                        <li><a href="#" title="wordpress theme development"><i class="fa-solid fa-layer-group"></i> Lorem ipsum dolor sit amet curn...</a> </li>
                                        <li class="clipboard_list_sp1"> <i class="fa-solid fa-clipboard-list"></i> 1/2 </li>
                                    </ul>


                                    <ul class="task_list">
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/11.jpg')}}" title="Sadik" alt=""> </a></li>
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/man.png')}}" title="Sadik" alt="">  </a></li>
                                        <li><span title="Sadik, kamal, Riyaz" >12+</span></li>
                                        <li><i class="fa-regular fa-comments"></i> 15 </li>
                                        <li><i class="fa-solid fa-paperclip"></i> 25 </li>
                                        <li style="font-size: 12px;"><i class="fa-regular fa-calendar-days"></i> 30-12-2022</li>
                                    </ul>
                                </div>

                            </div>
                        </div>



                    </div>


                </div>


            </div>

            </div>

            <!-- bar   -->

            <div class="pseduo-track"></div>
        </div>


    </div>
    <!-- CONTENT WRAPPER END -->

@endsection

@push('scripts')
    @include('sections.daterange_js')
      <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="{{ asset('vendor/jquery/dragula.js') }}"></script>


    <script>




    var elem = document.getElementById("fullscreen");

    function openFullscreen() {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
            elem.classList.add("full");
        } else if (elem.mozRequestFullScreen) {
            /* Firefox */
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            /* Chrome, Safari & Opera */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            /* IE/Edge */
            elem.msRequestFullscreen();
        }
    }










</script>
<!-- bundle -->
<script>

$( function() {

  $( "#complete-item-drop, #inprogress-item-drop, #todo-item-drop" ).sortable({

    connectWith: ".connectedSortable",

    opacity: 0.5,

  }).disableSelection();


  $( ".connectedSortable" ).on( "sortupdate", function( event, ui ) {

      var inprogressArr = [];

      var completeArr = [];
      var todoArr = [];

      $("#todo-item-drop div").each(function( index ) {

        todoArr[index] = $(this).attr('item-id');

      });
      $("#complete-item-drop div").each(function( index ) {

        completeArr[index] = $(this).attr('item-id');

      });


      $("#inprogress-item-drop div").each(function( index ) {

        inprogressArr[index] = $(this).attr('item-id');

      });


      $.ajax({

          url: "{{ route('update.items') }}",

          method: 'POST',

          headers: {

              'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')

          },

          data: {todoArr:todoArr,inprogressArr:inprogressArr,completeArr:completeArr},
          // /console.log(data);
          success: function(data) {

          //  window.location.reload();

          }

      });



  });

});

</script>

@endpush
