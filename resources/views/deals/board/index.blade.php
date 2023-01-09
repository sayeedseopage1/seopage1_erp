@extends('layouts.app')

@push('datatable-styles')
    @include('sections.daterange_css')
@endpush

@push('styles')
    <!-- Drag and Drop CSS -->


       <link rel="stylesheet" href="{{asset('deal-kanban/css/style.css')}}">
       <link rel="stylesheet"
     href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
     integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
     crossorigin="anonymous" referrerpolicy="no-referrer"/>

     <link href="https://fonts.googleapis.com/css?family=Nunito:400,500,700,800,900" rel="stylesheet">
    <style>
        #colorpicker .form-group {
            width: 87%;
        }

        .b-p-tasks {
            min-height: 100px;
        }
        .kanbanCard {
	         width: 323px;
        }
        .board_list li:nth-child(2) {
        	background: #E8EEF3;
        	padding: 7px;
        	width: auto;
        	height: auto;
        	line-height: 10px;
        	border-radius: 4px;
        	font-weight: 800;
        }

        ::-webkit-scrollbar-thumb {
          border-radius: 6px;
          background-color: #aaa8a8;
          border: 1px solid #e3e8ec !important;
      }

      .board_list {
      	width: 338px;
      }
    </style>

@endpush

@section('filter-section')

    <x-filters.filter-box>
        <!-- DATE START -->
        <div class="select-box d-flex pr-2 border-right-grey border-right-grey-sm-0">
            <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('app.date')</p>
            <div class="input-group input-daterange">
                <input type="text"
                    class="position-relative text-dark date-range-field form-control border-0 p-0 text-left f-14 f-w-500"
                    id="start-date" placeholder="@lang('app.startDate')">
                <div class="input-group-addon datePickerInput d-flex align-items-center pr-3">@lang('app.to')</div>
                <input type="text" class="date-range-field1 text-dark form-control border-0 p-0 text-left f-14 f-w-500"
                    id="end-date" placeholder="@lang('app.endDate')">
            </div>
        </div>
        <!-- DATE END -->

        <!-- SEARCH BY TASK START -->
        <div class="task-search d-flex  py-1 px-lg-3 px-0 border-right-grey align-items-center">
            <form class="w-100 mr-1 mr-lg-0 mr-md-1 ml-md-1 ml-0 ml-lg-0">
                <div class="input-group bg-grey rounded">
                    <div class="input-group-prepend">
                        <span class="input-group-text border-0 bg-additional-grey">
                            <i class="fa fa-search f-13 text-dark-grey"></i>
                        </span>
                    </div>
                    <input type="text" class="form-control f-14 p-1 border-additional-grey" id="search-text-field"
                        placeholder="@lang('app.startTyping')">
                </div>
            </form>
        </div>
        <!-- SEARCH BY TASK END -->

        <!-- RESET START -->
        <div class="select-box d-flex py-1 px-lg-2 px-md-2 px-0">
            <x-forms.button-secondary class="btn-xs d-none" id="reset-filters" icon="times-circle">
                @lang('app.clearFilters')
            </x-forms.button-secondary>
        </div>
        <!-- RESET END -->

        <!-- MORE FILTERS START -->
        <x-filters.more-filter-box>


            <div class="more-filter-items">
                <label class="f-14 text-dark-grey mb-12 text-capitalize" for="usr">@lang('app.project')</label>
                <div class="select-filter mb-4">
                    <div class="select-others">
                        <select class="form-control select-picker" name="project_id" id="project_id" data-live-search="true" data-container="body"
                            data-size="8">
                            <option value="all">@lang('app.all')</option>
                            <?php
                            $projects= App\Models\Project::all();
                             ?>
                            @foreach ($projects as $project)
                                <option value="{{ $project->id }}">{{ mb_ucwords($project->project_name) }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
            </div>







            <div class="more-filter-items">
                <label class="f-14 text-dark-grey mb-12 text-capitalize" for="usr">@lang('app.billableTask')</label>
                <div class="select-filter mb-4">
                    <div class="select-others">
                        <select class="form-control select-picker" id="billable_task" data-live-search="true" data-container="body" data-size="8">
                            <option value="all">@lang('app.all')</option>
                            <option value="1">@lang('app.yes')</option>
                            <option value="0">@lang('app.no')</option>
                        </select>
                    </div>
                </div>
            </div>

        </x-filters.more-filter-box>
        <!-- MORE FILTERS END -->
    </x-filters.filter-box>

@endsection


@section('content')

    <!-- CONTENT WRAPPER START -->
    <div class="w-task-board-box px-4 py-2 bg-white">
        <!-- Add Task Export Buttons Start -->
        <div class="d-block d-lg-flex d-md-flex my-3">

            <!-- <x-alert type="warning" icon="info" class="d-lg-none">@lang('messages.dragDropScreenInfo')</x-alert> -->

            <div id="table-actions" class="flex-grow-1 align-items-center">

                  {{--  <x-forms.link-primary :link="route('projects.create')" class="mr-3 openRightModal float-left" icon="plus">
                        @lang('app.add')
                        @lang('app.project')
                    </x-forms.link-primary> --}}


            </div>

            <div class="btn-group mt-2 mt-lg-0 mt-md-0" role="group">
                <a href="{{ route('deals.index') }}" class="btn btn-secondary f-14" data-tooltip-bottom="tooltip"
                    data-original-title="@lang('modules.leaves.tableView')"><i class="side-icon bi bi-list-ul"></i></a>

                <a href="{{ route('dealboards.index') }}" class="btn btn-secondary f-14 btn-active" data-tooltip-bottom="tooltip"
                    data-original-title="@lang('Kanban')"><i class="side-icon bi bi-kanban"></i></a>

            </div>
        </div>

        <div class="boardsContainer" id="sp1">
        <div class="outer-wrapper">

        <div class="custom_row">


            <!-- board  -->
            <!--  Contact Made  -->

            <div class="board">

                <ul class="board_list">
                    <li class="red" style="border-left: 19px solid #D21010;"> Contact Made</li>
                    <?php
                    $contact_made_count= App\Models\DealStage::where('deal_stage',0)->count();
                    $contact_made= App\Models\DealStage::where('deal_stage',0)->get();
                     ?>
                    <li>{{$contact_made_count}}</li>
                </ul>
                <div id="sp1-scrollbar">

                  @foreach($contact_made as $contact)
                  <?php
                  $client= App\Models\User::where('user_name',$contact->client_username)->first();
                   ?>
                    <div class="dropzone" id="yellow">

                        <div class="kanbanCard yellow">
                            <div class="content">
                                <ul class="task_list">
                                    <li> <a href="#" title="{{$contact->client_username}}">
                                      @if($contact->client != null)
                                      <img src="{{asset('user-uploads/avatar/'. $client->image)}}"  alt="">
                                      @else
                                      <img src="{{asset('user-uploads/avatar/avatar_blank.png')}}"  alt="">
                                      @endif
                                      {{$contact->client_username}} </a></li>
                                    <li class="clipboard_list_sp1"> <a  href="/account/deals/{{$contact->id}}">#{{$contact->short_code}}</a> </li>
                                    <!-- <li> <a href="#" title="Sadik"> <img src="{{asset('deal-kanban/img/4.png')}}" title="Sadik" alt=""> Sadik Istiak </a></li> -->
                                </ul>

                                <ul class="task_list" id="projects_sp1_padding">
                                    <li><a href="#" title="{{$contact->project_name}}"><i class="fa-solid fa-layer-group"></i> {{Str::limit($contact->project_name,40)}}</a> </li>
                                    <!-- <li class="clipboard_list_sp1"> <i class="fa-solid fa-clipboard-list"></i> 1/2 </li> -->
                                </ul>


                                <ul class="task_list">
                                    <li><a href="/account/employees/{{$contact->user->id}}" title="{{$contact->user->name}}">
                                      @if($contact->user->image == null)
                                      <img src="{{asset('user-uploads/avatar/avatar_blank.png')}}"

                                       title="{{$contact->user->name}}" alt="">
                                       @else
                                       <img src="{{asset('user-uploads/avatar/'. $contact->user->image)}}"

                                        title="{{$contact->user->name}}" alt="">

                                       @endif

                                      </a></li>
                                      <?php
                                      $contact_comment_count= App\Models\DealStageChange::where('deal_id',$contact->short_code)->where('deal_stage_id',0)->where('comments','!=',null)->count();
                                      $contact_attach_count= App\Models\DealStageChange::where('deal_id',$contact->short_code)->where('deal_stage_id',0)->where('attach','!=',null)->count();

                                       ?>
                                    <li><i class="fa-regular fa-comments"></i> {{$contact_comment_count}} </li>
                                    <li><i class="fa-solid fa-paperclip"></i> {{$contact_attach_count}} </li>
                                    <li style="font-size: 12px;"><i class="fa-regular fa-calendar-days"></i> {{$contact->created_at->format('d-m-Y')}}</li>
                                </ul>
                            </div>

                        </div>
                    </div>
                  @endforeach





                </div>

            </div>


            <!-- board  -->
            <!-- Qualified  -->

            <div class="board">
                <ul class="board_list">
                    <li class="blue">Qualified</li>
                    <?php
                    $qualified_count= App\Models\DealStage::where('deal_stage',1)->count();
                    $qualified= App\Models\DealStage::where('deal_stage',1)->get();
                     ?>
                    <li>{{$qualified_count}}</li>
                </ul>

                <div id="sp1-scrollbar">
                    @foreach($qualified as $qualify)
                    <?php
                    $client= App\Models\User::where('user_name',$qualify->client_username)->first();
                     ?>
                   <div class="dropzone" id="yellow">

                        <div class="kanbanCard yellow">
                            <div class="content">
                                <ul class="task_list">
                                    <li> <a href="#" title="{{$qualify->client_username}}"> @if($contact->client != null)
                                    <img src="{{asset('user-uploads/avatar/'. $client->image)}}"  alt="">
                                    @else
                                    <img src="{{asset('user-uploads/avatar/avatar_blank.png')}}"  alt="">
                                    @endif {{$qualify->client_username}} </a></li>
                                    <li class="clipboard_list_sp1"> <a href="/account/deals/{{$qualify->id}}">#{{$qualify->short_code}}</a> </li>
                                    <!-- <li> <a href="#" title="Sadik"> <img src="{{asset('deal-kanban/img/4.png')}}" title="Sadik" alt=""> Sadik Istiak </a></li> -->
                                </ul>

                                <ul class="task_list" id="projects_sp1_padding">
                                    <li><a href="#" title="{{$qualify->project_name}}"><i class="fa-solid fa-layer-group"></i> {{Str::limit($qualify->project_name,40)}}</a> </li>
                                    <!-- <li class="clipboard_list_sp1"> <i class="fa-solid fa-clipboard-list"></i> 1/2 </li> -->
                                </ul>

                                <ul class="task_list">
                                  <?php
                                  $qualify_comment_count= App\Models\DealStageChange::where('deal_id',$qualify->short_code)->where('deal_stage_id',1)->where('comments','!=',null)->count();
                                  $qualify_attach_count= App\Models\DealStageChange::where('deal_id',$qualify->short_code)->where('deal_stage_id',1)->where('attach','!=',null)->count();

                                   ?>
                                   <li><i class="fa-regular fa-comments"></i> {{$qualify_comment_count}} </li>
                                   <li><i class="fa-solid fa-paperclip"></i> {{$qualify_attach_count}} </li>
                                   <li style="font-size: 12px;"><i class="fa-regular fa-calendar-days"></i> {{$qualify->created_at->format('d-m-Y')}}</li>
                                </ul>
                            </div>

                        </div>
                    </div>


                    @endforeach


                </div>


            </div>

            <!-- board  -->
            <!-- Requirements Defined  -->

            <div class="board">
                <ul class="board_list">
                    <li class="yellows">Requirements Defined</li>
                    <?php
                    $req_count= App\Models\DealStage::where('deal_stage',2)->count();
                    $req= App\Models\DealStage::where('deal_stage',2)->get();
                     ?>
                    <li>{{$req_count}}</li>
                </ul>

                <div id="sp1-scrollbar">
                  @foreach($req as $rq)

                    <div class="dropzone" id="yellow">

                        <div class="kanbanCard yellow">
                            <div class="content">
                                <ul class="task_list">
                                    <li> <a href="#" title="Sadik"> <img src="{{asset('deal-kanban/img/7.png')}}" title="Sadik" alt=""> {{$rq->client_username}}</a></li>
                                    <li class="clipboard_list_sp1"> <a href="#">#{{$rq->short_code}}</a> </li>
                                    <!-- <li> <a href="#" title="Sadik"> <img src="{{asset('deal-kanban/img/4.png')}}" title="Sadik" alt=""> Sadik Istiak </a></li> -->
                                </ul>

                                <ul class="task_list" id="projects_sp1_padding">
                                    <li><a href="#" title="wordpress theme development"><i class="fa-solid fa-layer-group"></i> {{Str::limit($rq->project_name,40)}}</a> </li>
                                    <!-- <li class="clipboard_list_sp1"> <i class="fa-solid fa-clipboard-list"></i> 1/2 </li> -->
                                </ul>

                                <ul class="task_list">
                                    <li><a href="#" title="Sadik"> <img src="{{asset('deal-kanban/img/11.jpg')}}" title="Sadik" alt=""> </a></li>
                                    <li><a href="#" title="Sadik"> <img src="{{asset('deal-kanban/img/man.png')}}" title="Sadik" alt="">  </a></li>
                                    <li><span title="Sadik, kamal, Riyaz" ><a href="">12+</a></span></li>
                                    <li><i class="fa-regular fa-comments"></i> 15 </li>
                                    <li><i class="fa-solid fa-paperclip"></i> 25 </li>
                                    <li style="font-size: 12px;"><i class="fa-regular fa-calendar-days"></i> 30-12-2022</li>
                                </ul>
                            </div>

                        </div>
                    </div>

                  @endforeach




                </div>
            </div>


            <!-- board  -->
            <!-- Proposal Made -->

            <div class="board">
                <ul class="board_list">
                    <li>Proposal Made</li>
                    <?php
                    $proposal_count= App\Models\DealStage::where('deal_stage',3)->count();
                    $proposal= App\Models\DealStage::where('deal_stage',3)->get();
                     ?>
                    <li>{{$proposal_count}}</li>
                </ul>

                <div id="sp1-scrollbar">
                  @foreach($proposal as $prop)

                    <div class="dropzone" id="yellow">

                        <div class="kanbanCard yellow">
                            <div class="content">
                                <ul class="task_list">
                                    <li> <a href="#" title="Sadik"> <img src="{{asset('deal-kanban/img/7.png')}}" title="Sadik" alt=""> {{$prop->client_username}} </a></li>
                                    <li class="clipboard_list_sp1"> <a href="#">#{{$prop->short_code}}</a> </li>
                                    <!-- <li> <a href="#" title="Sadik"> <img src="{{asset('deal-kanban/img/4.png')}}" title="Sadik" alt=""> Sadik Istiak </a></li> -->
                                </ul>

                                <ul class="task_list" id="projects_sp1_padding">
                                    <li><a href="#" title="wordpress theme development"><i class="fa-solid fa-layer-group"></i> {{Str::limit($prop->project_name,40)}}</a> </li>
                                    <!-- <li class="clipboard_list_sp1"> <i class="fa-solid fa-clipboard-list"></i> 1/2 </li> -->
                                </ul>

                                <ul class="task_list">
                                    <li><a href="#" title="Sadik"> <img src="{{asset('deal-kanban/img/11.jpg')}}" title="Sadik" alt=""> </a></li>
                                    <li><a href="#" title="Sadik"> <img src="{{asset('deal-kanban/img/man.png')}}" title="Sadik" alt="">  </a></li>
                                    <li><span title="Sadik, kamal, Riyaz" ><a href="">12+</a></span></li>
                                    <li><i class="fa-regular fa-comments"></i> 15 </li>
                                    <li><i class="fa-solid fa-paperclip"></i> 25 </li>
                                    <li style="font-size: 12px;"><i class="fa-regular fa-calendar-days"></i> 30-12-2022</li>
                                </ul>
                            </div>

                        </div>
                    </div>
                @endforeach





                </div>
            </div>


            <!-- Board -->
            <!-- Negotiation Started -->

            <div class="board">
                <ul class="board_list">
                    <li>Negotiation Started</li>
                    <?php
                    $negotiation_count= App\Models\DealStage::where('deal_stage',4)->where('won_lost',null)->count();
                    $negotiation= App\Models\DealStage::where('deal_stage',4)->where('won_lost',null)->get();
                     ?>
                    <li>{{$negotiation_count}}</li>
                </ul>
                <div id="sp1-scrollbar">
                  @foreach($negotiation as $neg)
                    <div class="dropzone" id="yellow">

                        <div class="kanbanCard yellow">
                            <div class="content">
                                <ul class="task_list">
                                    <li> <a href="#" title="Sadik"> <img src="{{asset('deal-kanban/img/7.png')}}" title="Sadik" alt=""> {{$neg->client_username}}</a></li>
                                    <li class="clipboard_list_sp1"> <a href="#">#{{$neg->short_code}}</a> </li>
                                    <!-- <li> <a href="#" title="Sadik"> <img src="{{asset('deal-kanban/img/4.png')}}" title="Sadik" alt=""> Sadik Istiak </a></li> -->
                                </ul>

                                <ul class="task_list" id="projects_sp1_padding">
                                    <li><a href="#" title="wordpress theme development"><i class="fa-solid fa-layer-group"></i> {{Str::limit($neg->project_name,40)}}</a> </li>
                                    <!-- <li class="clipboard_list_sp1"> <i class="fa-solid fa-clipboard-list"></i> 1/2 </li> -->
                                </ul>

                                <ul class="task_list">
                                    <li><a href="#" title="Sadik"> <img src="{{asset('deal-kanban/img/11.jpg')}}" title="Sadik" alt=""> </a></li>
                                    <li><a href="#" title="Sadik"> <img src="{{asset('deal-kanban/img/man.png')}}" title="Sadik" alt="">  </a></li>
                                    <li><span title="Sadik, kamal, Riyaz" ><a href="">12+</a></span></li>
                                    <li><i class="fa-regular fa-comments"></i> 15 </li>
                                    <li><i class="fa-solid fa-paperclip"></i> 25 </li>
                                    <li style="font-size: 12px;"><i class="fa-regular fa-calendar-days"></i> 30-12-2022</li>
                                </ul>
                            </div>

                        </div>
                    </div>
                  @endforeach



                </div>
            </div>



            <!-- Board -->
            <!-- Won -->

            <div class="board">
                <ul class="board_list">
                    <li>Won</li>
                    <?php
                    $won_count= App\Models\Deal::count();
                    $won= App\Models\Deal::get();
                  //  dd($won);
                     ?>
                    <li>{{$won_count}}</li>
                </ul>

                <div id="sp1-scrollbar">
                  @foreach($won as $w)

                    <div class="dropzone" id="yellow">

                        <div class="kanbanCard yellow">
                            <div class="content">
                                <ul class="task_list">
                                    <li> <a href="#" title="Sadik"> <img src="{{asset('deal-kanban/img/7.png')}}" title="Sadik" alt=""> {{$w->client_username}} </a></li>
                                    <li class="clipboard_list_sp1"> <a href="#">#{{$w->deal_id}}</a> </li>
                                    <!-- <li> <a href="#" title="Sadik"> <img src="{{asset('deal-kanban/img/4.png')}}" title="Sadik" alt=""> Sadik Istiak </a></li> -->
                                </ul>

                                <ul class="task_list" id="projects_sp1_padding">
                                    <li><a href="#" title="wordpress theme development"><i class="fa-solid fa-layer-group"></i> {{Str::limit($w->project_name,40)}}</a> </li>
                                    <!-- <li class="clipboard_list_sp1"> <i class="fa-solid fa-clipboard-list"></i> 1/2 </li> -->
                                </ul>

                                <ul class="task_list">
                                    <li><a href="#" title="Sadik"> <img src="{{asset('deal-kanban/img/11.jpg')}}" title="Sadik" alt=""> </a></li>
                                    <li><a href="#" title="Sadik"> <img src="{{asset('deal-kanban/img/man.png')}}" title="Sadik" alt="">  </a></li>
                                    <li><span title="Sadik, kamal, Riyaz" ><a href="">12+</a></span></li>
                                    <li><i class="fa-regular fa-comments"></i> 15 </li>
                                    <li><i class="fa-solid fa-paperclip"></i> 25 </li>
                                    <li style="font-size: 12px;"><i class="fa-regular fa-calendar-days"></i> 30-12-2022</li>
                                </ul>
                            </div>

                        </div>
                    </div>
                    @endforeach



                </div>


            </div>


            <!-- Board -->
            <!-- Lost -->

            <div class="board">
                <ul class="board_list">
                    <li>Lost</li>
                    <?php
                    $lost_count= App\Models\DealStage::where('won_lost','No')->count();
                    $lost=  App\Models\DealStage::where('won_lost','No')->get();
                     ?>
                    <li>{{$lost_count}}</li>
                </ul>

                <div id="sp1-scrollbar">

                    @foreach($lost as $l)
                    <div class="dropzone" id="yellow">

                        <div class="kanbanCard yellow">
                            <div class="content">
                                <ul class="task_list">
                                    <li> <a href="#" title="Sadik"> <img src="{{asset('deal-kanban/img/7.png')}}" title="Sadik" alt=""> {{$l->client_username}} </a></li>
                                    <li class="clipboard_list_sp1"> <a href="#">#{{$l->short_code}}</a> </li>
                                    <!-- <li> <a href="#" title="Sadik"> <img src="{{asset('deal-kanban/img/4.png')}}" title="Sadik" alt=""> Sadik Istiak </a></li> -->
                                </ul>

                                <ul class="task_list" id="projects_sp1_padding">
                                    <li><a href="#" title="wordpress theme development"><i class="fa-solid fa-layer-group"></i> {{$l->project_name}}</a> </li>
                                    <!-- <li class="clipboard_list_sp1"> <i class="fa-solid fa-clipboard-list"></i> 1/2 </li> -->
                                </ul>

                                <ul class="task_list">
                                    <li><a href="#" title="Sadik"> <img src="{{asset('deal-kanban/img/11.jpg')}}" title="Sadik" alt=""> </a></li>
                                    <li><a href="#" title="Sadik"> <img src="{{asset('deal-kanban/img/man.png')}}" title="Sadik" alt="">  </a></li>
                                    <li><span title="Sadik, kamal, Riyaz" ><a href="">12+</a></span></li>
                                    <li><i class="fa-regular fa-comments"></i> 15 </li>
                                    <li><i class="fa-solid fa-paperclip"></i> 25 </li>
                                    <li style="font-size: 12px;"><i class="fa-regular fa-calendar-days"></i> 30-12-2022</li>
                                </ul>
                            </div>

                        </div>
                    </div>
                    @endforeach




                </div>
            </div>
        </div>

        </div>

        <!-- bar   -->

        <div class="pseduo-track"></div>
    </div>




    </div>

@endsection

@push('scripts')
    @include('sections.daterange_js')
    <script src="{{ asset('vendor/jquery/dragula.js') }}"></script>

    <script>
        function showTable() {
            var dateRangePicker = $('#datatableRange').data('daterangepicker');
            var startDate = $('#datatableRange').val();

            if (startDate == '') {
                startDate = null;
                endDate = null;
            } else {
                startDate = dateRangePicker.startDate.format('{{ global_setting()->moment_date_format }}');
                endDate = dateRangePicker.endDate.format('{{ global_setting()->moment_date_format }}');
            }

            var searchText = $('#search-text-field').val();
            var type = $('#type').val();
            var followUp = $('#followUp').val();
            var agent = $('#filter_agent_id').val();
            var category_id = $('#filter_category_id').val();
            var source_id = $('#filter_source_id').val();

            var url = "{{ route('leadboards.index') }}?startDate=" + encodeURIComponent(startDate) + '&endDate=' +
                encodeURIComponent(endDate) + '&type=' + type + '&followUp=' + followUp + '&agent=' +
                agent + '&category_id=' + category_id + '&source_id=' + source_id +
                '&searchText=' + searchText;

            $.easyAjax({
                url: url,
                container: '#taskboard-columns',
                type: "GET",
                success: function(response) {
                    $('#taskboard-columns').html(response.view);
                    $("body").tooltip({
                        selector: '[data-toggle="tooltip"]'
                    });
                }
            });
        }

        $('body').on('click', '.load-more-tasks', function() {
            var columnId = $(this).data('column-id');
            var totalTasks = $(this).data('total-tasks');
            var currentTotalTasks = $('#drag-container-' + columnId + ' .task-card').length;

            var dateRangePicker = $('#datatableRange').data('daterangepicker');
            var startDate = $('#datatableRange').val();

            if (startDate == '') {
                startDate = null;
                endDate = null;
            } else {
                startDate = dateRangePicker.startDate.format('{{ global_setting()->moment_date_format }}');
                endDate = dateRangePicker.endDate.format('{{ global_setting()->moment_date_format }}');
            }

            var type = $('#type').val();
            var followUp = $('#followUp').val();
            var agent = $('#filter_agent_id').val();
            var category_id = $('#filter_category_id').val();
            var source_id = $('#filter_source_id').val();
            var searchText = $('#search-text-field').val();

            var url = "{{ route('leadboards.load_more') }}?startDate=" + encodeURIComponent(startDate) +
                '&endDate=' +
                encodeURIComponent(endDate) + '&type=' + type + '&followUp=' + followUp + '&agent=' +
                agent + '&category_id=' + category_id + '&source_id=' + source_id +
                '&searchText=' + searchText + '&columnId=' + columnId + '&currentTotalTasks=' + currentTotalTasks +
                '&totalTasks=' + totalTasks;

            $.easyAjax({
                url: url,
                container: '#drag-container-' + columnId,
                blockUI: true,
                type: "GET",
                success: function(response) {
                    $('#drag-container-' + columnId).append(response.view);
                    if (response.load_more == 'show') {
                        $('#drag-container-' + columnId).closest('.b-p-body').find('.load-more-tasks');

                    } else {
                        $('#drag-container-' + columnId).closest('.b-p-body').find('.load-more-tasks')
                            .remove();
                    }

                    $("body").tooltip({
                        selector: '[data-toggle="tooltip"]'
                    });
                }
            });

        });

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

        $('#add-column').click(function() {
            const url = "{{ route('lead-status-settings.create') }}";
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });

        $('body').on('click', '.edit-column', function() {
            var statusId = $(this).data('column-id');
            var url = "{{ route('lead-status-settings.edit', ':id ') }}";
            url = url.replace(':id', statusId);

            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });

        $('body').on('click', '.delete-column', function() {
            var id = $(this).data('column-id');
            var url = "{{ route('lead-status-settings.destroy', ':id') }}";
            url = url.replace(':id', id);

            Swal.fire({
                title: "@lang('messages.sweetAlertTitle')",
                text: "@lang('messages.recoverRecord')",
                icon: 'warning',
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: "@lang('messages.confirmDelete')",
                cancelButtonText: "@lang('app.cancel')",
                customClass: {
                    confirmButton: 'btn btn-primary mr-3',
                    cancelButton: 'btn btn-secondary'
                },
                showClass: {
                    popup: 'swal2-noanimation',
                    backdrop: 'swal2-noanimation'
                },
                buttonsStyling: false
            }).then((result) => {
                if (result.isConfirmed) {
                    $.easyAjax({
                        url: url,
                        type: 'POST',
                        data: {
                            '_token': '{{ csrf_token() }}',
                            '_method': 'DELETE'
                        },
                        success: function(response) {
                            if (response.status == 'success') {
                                window.location.reload();
                            }
                        }
                    });
                }
            });

        });


        $('body').on('click', '.collapse-column', function() {
            var boardColumnId = $(this).data('column-id');
            var type = $(this).data('type');

            $.easyAjax({
                url: "{{ route('leadboards.collapse_column') }}",
                type: 'POST',
                container: '#taskboard-columns',
                blockUI: true,
                data: {
                    boardColumnId: boardColumnId,
                    type: type,
                    '_token': '{{ csrf_token() }}'
                },
                success: function(response) {
                    if (response.status == 'success') {
                        showTable();
                    }
                }
            });
        });

        showTable();
    </script>
@endpush
