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
                    <li class="contact" style="border-left: 19px solid #D21010;"> Contact Made</li>
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
                    <li class="qualify">Qualified</li>
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
                                    <li> <a href="#" title="{{$qualify->client_username}}"> @if($qualify->client != null)
                                    <img src="{{asset('user-uploads/avatar/'. $client->image)}}"  alt="">
                                    @else
                                    <img src="{{asset('user-uploads/avatar/avatar_blank.png')}}"  alt="">
                                    @endif {{$qualify->client_username}} </a></li>
                                    <li class="clipboard_list_sp1"> <a  href="/account/deals/{{$qualify->id}}">#{{$qualify->short_code}}</a> </li>
                                    <!-- <li> <a href="#" title="Sadik"> <img src="{{asset('deal-kanban/img/4.png')}}" title="Sadik" alt=""> Sadik Istiak </a></li> -->
                                </ul>

                                <ul class="task_list" id="projects_sp1_padding">
                                    <li><a href="#" title="{{$qualify->project_name}}"><i class="fa-solid fa-layer-group"></i> {{Str::limit($qualify->project_name,40)}}</a> </li>
                                    <!-- <li class="clipboard_list_sp1"> <i class="fa-solid fa-clipboard-list"></i> 1/2 </li> -->
                                </ul>

                                <ul class="task_list">
                                  <li><a href="/account/employees/{{$qualify->user->id}}" title="{{$qualify->user->name}}">
                                    @if($qualify->user->image == null)
                                    <img src="{{asset('user-uploads/avatar/avatar_blank.png')}}"

                                     title="{{$qualify->user->name}}" alt="">
                                     @else
                                     <img src="{{asset('user-uploads/avatar/'. $qualify->user->image)}}"

                                      title="{{$qualify->user->name}}" alt="">

                                     @endif

                                    </a></li>
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
                    <li class="requirement">Requirements Defined</li>
                    <?php
                    $req_count= App\Models\DealStage::where('deal_stage',2)->count();
                    $req= App\Models\DealStage::where('deal_stage',2)->get();
                     ?>
                    <li>{{$req_count}}</li>
                </ul>

                <div id="sp1-scrollbar">
                  @foreach($req as $rq)
                  <?php
                  $client= App\Models\User::where('user_name',$rq->client_username)->first();
                   ?>

                    <div class="dropzone" id="yellow">

                        <div class="kanbanCard yellow">
                            <div class="content">
                                <ul class="task_list">
                                    <li> <a href="#" title="{{$rq->client_username}}"> @if($rq->client != null)
                                    <img src="{{asset('user-uploads/avatar/'. $client->image)}}"  alt="">
                                    @else
                                    <img src="{{asset('user-uploads/avatar/avatar_blank.png')}}"  alt="">
                                    @endif {{$rq->client_username}}</a></li>
                                    <li class="clipboard_list_sp1"> <a  href="/account/deals/{{$rq->id}}">#{{$rq->short_code}}</a> </li>
                                    <!-- <li> <a href="#" title="Sadik"> <img src="{{asset('deal-kanban/img/4.png')}}" title="Sadik" alt=""> Sadik Istiak </a></li> -->
                                </ul>

                                <ul class="task_list" id="projects_sp1_padding">
                                    <li><a href="#" title="{{$rq->project_name}}"><i class="fa-solid fa-layer-group"></i> {{Str::limit($rq->project_name,40)}}</a> </li>
                                    <!-- <li class="clipboard_list_sp1"> <i class="fa-solid fa-clipboard-list"></i> 1/2 </li> -->
                                </ul>

                                <ul class="task_list">
                                  <li><a href="/account/employees/{{$rq->user->id}}" title="{{$rq->user->name}}">
                                    @if($rq->user->image == null)
                                    <img src="{{asset('user-uploads/avatar/avatar_blank.png')}}"

                                     title="{{$rq->user->name}}" alt="">
                                     @else
                                     <img src="{{asset('user-uploads/avatar/'. $rq->user->image)}}"

                                      title="{{$rq->user->name}}" alt="">

                                     @endif

                                    </a></li>
                                  <?php
                                  $rq_comment_count= App\Models\DealStageChange::where('deal_id',$rq->short_code)->where('deal_stage_id',2)->where('comments','!=',null)->count();
                                  $rq_attach_count= App\Models\DealStageChange::where('deal_id',$rq->short_code)->where('deal_stage_id',2)->where('attach','!=',null)->count();

                                   ?>
                                   <li><i class="fa-regular fa-comments"></i> {{$rq_comment_count}} </li>
                                   <li><i class="fa-solid fa-paperclip"></i> {{$rq_attach_count}} </li>
                                   <li style="font-size: 12px;"><i class="fa-regular fa-calendar-days"></i> {{$rq->created_at->format('d-m-Y')}}</li>
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
                    <li class="proposal">Proposal Made</li>
                    <?php
                    $proposal_count= App\Models\DealStage::where('deal_stage',3)->count();
                    $proposal= App\Models\DealStage::where('deal_stage',3)->get();
                     ?>
                    <li>{{$proposal_count}}</li>
                </ul>

                <div id="sp1-scrollbar">
                  @foreach($proposal as $prop)
                  <?php
                  $client= App\Models\User::where('user_name',$prop->client_username)->first();
                   ?>

                    <div class="dropzone" id="yellow">

                        <div class="kanbanCard yellow">
                            <div class="content">
                                <ul class="task_list">
                                    <li> <a href="#" title="{{$prop->client_username}}">  @if($prop->client != null)
                                    <img src="{{asset('user-uploads/avatar/'. $client->image)}}"  alt="">
                                    @else
                                    <img src="{{asset('user-uploads/avatar/avatar_blank.png')}}"  alt="">
                                    @endif {{$prop->client_username}} </a></li>
                                    <li class="clipboard_list_sp1"> <a  href="/account/deals/{{$prop->id}}">#{{$prop->short_code}}</a> </li>
                                    <!-- <li> <a href="#" title="Sadik"> <img src="{{asset('deal-kanban/img/4.png')}}" title="Sadik" alt=""> Sadik Istiak </a></li> -->
                                </ul>

                                <ul class="task_list" id="projects_sp1_padding">
                                    <li><a href="#" title="{{$prop->project_name}}"><i class="fa-solid fa-layer-group"></i> {{Str::limit($prop->project_name,40)}}</a> </li>
                                    <!-- <li class="clipboard_list_sp1"> <i class="fa-solid fa-clipboard-list"></i> 1/2 </li> -->
                                </ul>

                                <ul class="task_list">
                                  <li><a href="/account/employees/{{$prop->user->id}}" title="{{$prop->user->name}}">
                                    @if($prop->user->image == null)
                                    <img src="{{asset('user-uploads/avatar/avatar_blank.png')}}"

                                     title="{{$prop->user->name}}" alt="">
                                     @else
                                     <img src="{{asset('user-uploads/avatar/'. $prop->user->image)}}"

                                      title="{{$prop->user->name}}" alt="">

                                     @endif

                                    </a></li>
                                  <?php
                                  $prop_comment_count= App\Models\DealStageChange::where('deal_id',$prop->short_code)->where('deal_stage_id',3)->where('comments','!=',null)->count();
                                  $prop_attach_count= App\Models\DealStageChange::where('deal_id',$prop->short_code)->where('deal_stage_id',3)->where('attach','!=',null)->count();

                                   ?>
                                   <li><i class="fa-regular fa-comments"></i> {{$prop_comment_count}} </li>
                                   <li><i class="fa-solid fa-paperclip"></i> {{$prop_attach_count}} </li>
                                   <li style="font-size: 12px;"><i class="fa-regular fa-calendar-days"></i> {{$prop->created_at->format('d-m-Y')}}</li>
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
                    <li class="negotiation">Negotiation Started</li>
                    <?php
                    $negotiation_count= App\Models\DealStage::where('deal_stage',4)->where('won_lost',null)->count();
                    $negotiation= App\Models\DealStage::where('deal_stage',4)->where('won_lost',null)->get();
                     ?>
                    <li>{{$negotiation_count}}</li>
                </ul>
                <div id="sp1-scrollbar">
                  @foreach($negotiation as $neg)
                  <?php
                  $client= App\Models\User::where('user_name',$neg->client_username)->first();
                   ?>
                    <div class="dropzone" id="yellow">

                        <div class="kanbanCard yellow">
                            <div class="content">
                                <ul class="task_list">
                                    <li> <a href="#" title="{{$neg->client_username}}"> @if($neg->client != null)
                                    <img src="{{asset('user-uploads/avatar/'. $client->image)}}"  alt="">
                                    @else
                                    <img src="{{asset('user-uploads/avatar/avatar_blank.png')}}"  alt="">
                                    @endif {{$neg->client_username}}</a></li>
                                    <li class="clipboard_list_sp1"> <a  href="/account/deals/{{$neg->id}}">#{{$neg->short_code}}</a> </li>
                                    <!-- <li> <a href="#" title="Sadik"> <img src="{{asset('deal-kanban/img/4.png')}}" title="Sadik" alt=""> Sadik Istiak </a></li> -->
                                </ul>

                                <ul class="task_list" id="projects_sp1_padding">
                                    <li><a href="#" title="{{$neg->project_name}}"><i class="fa-solid fa-layer-group"></i> {{Str::limit($neg->project_name,40)}}</a> </li>
                                    <!-- <li class="clipboard_list_sp1"> <i class="fa-solid fa-clipboard-list"></i> 1/2 </li> -->
                                </ul>

                                <ul class="task_list">
                                  <li><a href="/account/employees/{{$neg->user->id}}" title="{{$neg->user->name}}">
                                    @if($neg->user->image == null)
                                    <img src="{{asset('user-uploads/avatar/avatar_blank.png')}}"

                                     title="{{$neg->user->name}}" alt="">
                                     @else
                                     <img src="{{asset('user-uploads/avatar/'. $neg->user->image)}}"

                                      title="{{$neg->user->name}}" alt="">

                                     @endif

                                    </a></li>
                                  <?php
                                  $neg_comment_count= App\Models\DealStageChange::where('deal_id',$neg->short_code)->where('deal_stage_id',4)->where('comments','!=',null)->count();
                                  $neg_attach_count= App\Models\DealStageChange::where('deal_id',$neg->short_code)->where('deal_stage_id',4)->where('attach','!=',null)->count();

                                   ?>
                                   <li><i class="fa-regular fa-comments"></i> {{$neg_comment_count}} </li>
                                   <li><i class="fa-solid fa-paperclip"></i> {{$neg_attach_count}} </li>
                                   <li style="font-size: 12px;"><i class="fa-regular fa-calendar-days"></i> {{$neg->created_at->format('d-m-Y')}}</li>
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
                    <li class="won">Won</li>
                    <?php
                    $won_count= App\Models\Deal::count();
                    $won= App\Models\Deal::get();
                  //  dd($won);
                     ?>
                    <li>{{$won_count}}</li>
                </ul>

                <div id="sp1-scrollbar">
                  @foreach($won as $w)
                  <?php
                  $client= App\Models\User::where('user_name',$w->client_username)->first();
                   ?>

                    <div class="dropzone" id="yellow">

                        <div class="kanbanCard yellow">
                            <div class="content">
                                <ul class="task_list">
                                    <li> <a href="/account/clients/{{$w->client_id}}" title="{{$w->client_username}}">
                                      @if($w->client != null)
                                      <img src="{{asset('user-uploads/avatar/'. $client->image)}}"  alt="">
                                      @else
                                      <img src="{{asset('user-uploads/avatar/avatar_blank.png')}}"  alt="">
                                      @endif {{$w->client_username}} </a></li>
                                    <li class="clipboard_list_sp1"> <a  href="/account/contracts/{{$w->id}}">#{{$w->deal_id}}</a> </li>
                                    <!-- <li> <a href="#" title="Sadik"> <img src="{{asset('deal-kanban/img/4.png')}}" title="Sadik" alt=""> Sadik Istiak </a></li> -->
                                </ul>

                                <ul class="task_list" id="projects_sp1_padding">
                                  <?php
                                  $project= App\Models\Project::where('deal_id',$w->id)->first();


                                   ?>
                                    <li><a href="/account/projects/{{$project->id}}" title="{{$w->project_name}}"><i class="fa-solid fa-layer-group"></i> {{Str::limit($w->project_name,40)}}</a> </li>
                                    <!-- <li class="clipboard_list_sp1"> <i class="fa-solid fa-clipboard-list"></i> 1/2 </li> -->
                                </ul>

                                <ul class="task_list">
                                      <li><a href="/account/employees/{{$w->user->id}}" title="{{$w->user->name}}">
                                  @if($w->user->image == null)
                                  <img src="{{asset('user-uploads/avatar/avatar_blank.png')}}"

                                   title="{{$w->user->name}}" alt="">
                                   @else
                                   <img src="{{asset('user-uploads/avatar/'. $w->user->image)}}"

                                    title="{{$w->user->name}}" alt="">

                                   @endif
                                     </a></li>
                                  <?php
                                  $w_comment_count= App\Models\DealStageChange::where('deal_id',$w->deal_id)->where('deal_stage_id',4)->where('comments','!=',null)->count();
                                  $w_attach_count= App\Models\DealStageChange::where('deal_id',$w->deal_id)->where('deal_stage_id',4)->where('attach','!=',null)->count();

                                   ?>
                                   <li><i class="fa-regular fa-comments"></i> {{$w_comment_count}} </li>
                                   <li><i class="fa-solid fa-paperclip"></i> {{$w_attach_count}} </li>
                                   <li style="font-size: 12px;"><i class="fa-regular fa-calendar-days"></i> {{$w->created_at->format('d-m-Y')}}</li>
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
                    <li class="lost">Lost</li>
                    <?php
                    $lost_count= App\Models\DealStage::where('won_lost','No')->count();
                    $lost=  App\Models\DealStage::where('won_lost','No')->get();
                     ?>
                    <li>{{$lost_count}}</li>
                </ul>

                <div id="sp1-scrollbar">

                    @foreach($lost as $l)
                    <?php
                    $client= App\Models\User::where('user_name',$l->client_username)->first();
                     ?>
                    <div class="dropzone" id="yellow">

                        <div class="kanbanCard yellow">
                            <div class="content">
                                <ul class="task_list">
                                    <li> <a href="#" title="{{$l->client_username}}">
                                      @if($l->client != null)
                                      <img src="{{asset('user-uploads/avatar/'. $client->image)}}"  alt="">
                                      @else
                                      <img src="{{asset('user-uploads/avatar/avatar_blank.png')}}"  alt="">
                                      @endif {{$l->client_username}} </a></li>
                                    <li class="clipboard_list_sp1"> <a  href="/account/contracts/{{$l->id}}">#{{$l->short_code}}</a> </li>
                                    <!-- <li> <a href="#" title="Sadik"> <img src="{{asset('deal-kanban/img/4.png')}}" title="Sadik" alt=""> Sadik Istiak </a></li> -->
                                </ul>

                                <ul class="task_list" id="projects_sp1_padding">
                                    <li><a href="#" title="{{$l->project_name}}"><i class="fa-solid fa-layer-group"></i> {{Str::limit($l->project_name,40)}}</a> </li>
                                    <!-- <li class="clipboard_list_sp1"> <i class="fa-solid fa-clipboard-list"></i> 1/2 </li> -->
                                </ul>

                                <ul class="task_list">
                                  @if($l->user->image == null)
                                  <img src="{{asset('user-uploads/avatar/avatar_blank.png')}}"

                                   title="{{$l->user->name}}" alt="">
                                   @else
                                   <img src="{{asset('user-uploads/avatar/'. $l->user->image)}}"

                                    title="{{$l->user->name}}" alt="">

                                   @endif
                                  <?php
                                  $l_comment_count= App\Models\DealStageChange::where('deal_id',$l->deal_id)->where('deal_stage_id',4)->where('comments','!=',null)->count();
                                  $l_attach_count= App\Models\DealStageChange::where('deal_id',$l->deal_id)->where('deal_stage_id',4)->where('attach','!=',null)->count();

                                   ?>
                                   <li><i class="fa-regular fa-comments"></i> {{$l_comment_count}} </li>
                                   <li><i class="fa-solid fa-paperclip"></i> {{$l_attach_count}} </li>
                                   <li style="font-size: 12px;"><i class="fa-regular fa-calendar-days"></i> {{$l->created_at->format('d-m-Y')}}</li>
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
