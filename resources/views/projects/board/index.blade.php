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

            <!-- <x-alert type="warning" icon="info" class="d-lg-none">@lang('messages.dragDropScreenInfo')</x-alert> -->

            <div id="table-actions" class="flex-grow-1 align-items-center">

                  {{--  <x-forms.link-primary :link="route('projects.create')" class="mr-3 openRightModal float-left" icon="plus">
                        @lang('app.add')
                        @lang('app.project')
                    </x-forms.link-primary> --}}


            </div>

            <div class="btn-group mt-2 mt-lg-0 mt-md-0" role="group">
                <a href="{{ route('projects.index') }}" class="btn btn-secondary f-14" data-tooltip-left="Projects"
                    data-original-title="@lang('modules.leaves.tableView')"><i class="side-icon bi bi-list-ul"></i></a>

                <a href="{{ route('projectboards.index') }}" class="btn btn-secondary f-14 btn-active" data-tooltip-left="Kanban Board"
                    data-original-title="@lang('Kanban')"><i class="side-icon bi bi-kanban"></i></a>

            </div>
        </div>

        <div class="boardsContainer" id="sp1">
          <div class="outer-wrapper">

          <div class="custom_row">
            <?php
              $project_status= App\Models\ProjectStatusSetting::where('status','active')->orderBy('priority','asc')->get();

             ?>

              <!-- board  -->
              <!-- Incomplete  -->
              @foreach($project_status as $data)
              <div class="board">
                <?php
                $projects= App\Models\Project::where('status',$data->status_name)->orderBy('updated_at','desc')->get();
                $project_counts= App\Models\Project::where('status',$data->status_name)->count();
                 ?>

                  <ul class="board_list">
                      <li class="red" style="border-left: 19px solid {{$data->color}};"> {{ucfirst(strtoupper($data->status_name))}}</li>
                      <li>{{$project_counts}}</li>
                  </ul>
                  <div id="sp1-scrollbar">


                     @foreach($projects as $project)
                     <?php
                     $complete_tasks= App\Models\Task::where('status','completed')->where('project_id',$project->id)->count();
                     $incomplete_tasks= App\Models\Task::where('project_id',$project->id)->count();
                     $project_files= App\Models\ProjectFile::where('project_id',$project->id)->count();

                      ?>
                      <div class="dropzone" id="yellow">

                          <div class="kanbanCard yellow">
                              <div class="content">
                                  <ul class="task_list">
                                      <li> <a class="openRightModal"  href="/account/clients/{{$project->client_id}}" title="{{$project->client_name->name}}" data-tooltip-bottom="{{$project->client_name->name}}">
                                        @if($project->client_name->image != null)
                                        <img data-original-title="{{$project->client_name->name}}" src="{{asset('user-uploads/avatar/'. $project->client_name->image)}}"

                                        alt="{{$project->client_name->name}}">
                                        @else
                                        <img src="{{asset('user-uploads/avatar/avatar_blank.png')}}"

                                        title="{{$project->client_name->name}}" alt="{{$project->client_name->name}}" >


                                        @endif
                                         {{$project->client_name->name}} </a></li>
                                      <!-- <li><span>#749</span></li> -->
                                      @if($project->pm_id != null)
                                      <li> <a class="openRightModal RightModal2" id="RightModal2"  href="/account/employees/{{$project->pm_id}}" title="{{$project->pm_name->name}}" data-tooltip-bottom="{{$project->pm_name->name}}">


                                        @if($project->pm_name->image != null)
                                        <img src="{{asset('user-uploads/avatar/'. $project->pm_name->image)}}"

                                        title="{{$project->pm_name->name}}" alt="{{$project->pm_name->name}}" data-toggle="tooltip">
                                        @else
                                        <img src="{{asset('user-uploads/avatar/avatar_blank.png')}}"

                                        title="{{$project->pm_name->name}}" alt="{{$project->pm_name->name}}" data-toggle="tooltip">


                                        @endif


                                        {{$project->pm_name->name}} </a></li>
                                        @endif
                                  </ul>

                                  <ul class="task_list" id="projects_sp1_padding">
                                      <li><a class="openRightModal RightModal" id="RightModal" href="/account/projects/{{$project->id}}" data-tooltip-bottom="{{$project->project_name}}"><i class="fa-solid fa-layer-group"></i> {{Str::limit($project->project_name,32)}}</a> </li>
                                      <li class="clipboard_list_sp1"> <i class="fa-solid fa-clipboard-list"></i> {{$complete_tasks}}/{{$incomplete_tasks}} </li>
                                  </ul>


                                  <ul class="task_list">
                                    <?php
                                      $project_members = App\Models\ProjectMember::where('project_id',$project->id)->orderBy('id','desc')->get();

                                     ?>
                                     @foreach($project_members as $key => $member)
                                     @if($key < 3)
                                      <li>
                                        <a class="openRightModal"  href="/account/employees/{{$member->user_id}}" title="{{$member->usr->name}}" data-tooltip-right="{{$member->usr->name}}">
                                            @if($member->usr->image != null)
                                            <img src="{{asset('user-uploads/avatar/'. $member->usr->image)}}" title="{{$member->usr->name}}" alt="">
                                          @else
                                            <img src="{{asset('user-uploads/avatar/avatar_blank.png')}}" title="{{$member->usr->name}}" alt="">
                                          @endif


                                      </a></li>
                                      @endif
                                      @endforeach
                                      <!-- <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/man.png')}}" title="Sadik" alt="">  </a></li>
                                        <li><a href="#" title="Sadik"> <img src="{{asset('kanban/custom/img/man.png')}}" title="Sadik" alt="">  </a></li> -->

                                          @if(count($project_members) > 3)

                                          <a class="openRightModal"  href="/account/projects/{{$project->id}}?tab=members">
                                      <li><span  data-tooltip="Click to See All Members" >{{count($project_members)-3}}+</span></a></li>
                                      @endif
                                      <li><i class="fa-regular fa-comments"></i> 0 </li>
                                      <li><i class="fa-solid fa-paperclip"></i> {{$project_files}} </li>
                                      <li style="font-size: 12px;"><i class="fa-regular fa-calendar-days"></i>
                                        @if($project->deadline != null)
                                        {{$project->deadline->format('d-m-Y')}}
                                        @else
                                        No Deadline
                                        @endif
                                      </li>
                                  </ul>
                              </div>

                          </div>
                      </div>

                    @endforeach



                  </div>

              </div>
              @endforeach


              <!-- board  -->
              <!-- To Do  -->




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
<script type="text/javascript">



$(document).ready(function(){
  $(".RightModal").click(function(){
  //alert("success");
    $(".activity").hide();
  });
$(".RightModal2").click(function(){
  //alert("success");
    $(".activity2").hide();
  });
});



</script>

@endpush
