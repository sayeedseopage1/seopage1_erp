@extends('layouts.app')

@push('datatable-styles')
    @include('sections.daterange_css')
@endpush

@push('styles')
    <!-- Drag and Drop CSS -->


    <link rel='stylesheet' href="{{ asset('vendor/css/dragula.css') }}" type='text/css' />
    <link rel='stylesheet' href="{{ asset('vendor/css/drag.css') }}" type='text/css' />
    <link rel="stylesheet" href="{{ asset('vendor/css/bootstrap-colorpicker.css') }}" />
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

    <style>
        #colorpicker .form-group {
            width: 87%;
        }

        .b-p-tasks {
            min-height: 100px;
        }

    </style>
    <style>

      #draggable {

          width: 150px;

          height: 150px;

          padding: 0.5em;

      }
      .inner-card{

  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  /* box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px; */
	/* box-shadow: 3px 3px 11px rgba(0, 0, 0, 0.2); */
  max-width: 18%;
	margin: 5px;
	border-radius: 5px;
      }
    </style>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css">
@endpush
  <link href="{{asset('kanban/assets/css/icons.min.css')}}" rel="stylesheet" type="text/css" />
<link href="{{asset('kanban/assets/css/app.min.css')}}" rel="stylesheet" type="text/css" id="app-style"/>

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

        <div class="row">
            <div class="col-12">

                <div class="board">

                    <?php
                    $projectStatus = App\Models\ProjectStatusSetting::where('status','active')->orderBy('priority')->get();
                     ?>


                    <div class="row mb-3 ms-2">
                      @foreach($projectStatus as $st)
                      <?php
                        $projects= App\Models\Project::where('status',$st->status_name)->get();
                        $project_count= App\Models\Project::where('status',$st->status_name)->count();
                      ?>
                      <div class="col-md-3 inner-card p-2 todo-item">
                        <li class="list-group-item text-center text-uppercase">
                            <p class="mb-0 f-15 mr-3 text-dark-grey font-weight-bold text-uppercase"><svg class="svg-inline--fa fa-circle fa-w-16 mr-2 text-yellow" style="color:{{$st->color}};;" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg>
                              <!-- <i class="fa fa-circle mr-2 text-yellow" style="color: #d21010"></i> Font Awesome fontawesome.com -->{{$st->status_name}} ({{$project_count}})
                </p>
                        </li>
                          <ul class="list-group  connectedSortable" id="todo-item-drop">
                              <h1 class="" style="opacity:0;"></h1>


                            @if(!empty($projects) && $projects->count())

                              @foreach($projects as $key=>$value)


                              <div item-id="{{$value->id}}" class="card mb-0">
                                         <div class="card-body p-3">

                                             <h6 class="mb-2 mt-1">
                                                 <a href="http://127.0.0.1:8000/account/projects/{{$value->id}}" class="text-body">{{$value->project_name}}</a>
                                             </h6>

                                             <a class="text-dark" href="http://127.0.0.1:8000/account/clients/{{$value->client_id}}">
                                             <p class="mb-0">
                                                <i class="fa-solid fa-person-military-pointing fa-x"></i>
                                                 <img src="{{asset('img/avatar.png')}}"  class="avatar-xs rounded-circle me-1 ">
                                                 <span class="align-middle">{{$value->client_name->name}} (Client)</span>
                                             </p>
                                             </a>
                                             <a class="text-dark" href="http://127.0.0.1:8000/account/employees/{{$value->pm_id}}">
                                             <p class="mb-0">
                                                <i class="fa-solid fa-user"></i>
                                                 <img src="{{asset('img/avatar.png')}}"  class="avatar-xs rounded-circle me-1 ">
                                                 <span class="align-middle">{{$value->pm_name->name}} (PM)</span>
                                             </p>
                                             </a>
                                             <a class="text-dark" href="http://127.0.0.1:8000/account/employees/{{$value->pm_id}}">
                                             <p class="mb-2">
                                               <i class="fa-solid fa-people-roof"></i>

                                                 <img src="{{asset('img/avatar.png')}}"  class="avatar-xs rounded-circle me-1 ">
                                                  <img src="{{asset('img/avatar.png')}}"  class="avatar-xs rounded-circle me-1 ">
                                                   <img src="{{asset('img/avatar.png')}}"  class="avatar-xs rounded-circle me-1 ">
                                                    <img src="{{asset('img/avatar.png')}}"  class="avatar-xs rounded-circle me-1 ">
                                                     <img src="{{asset('img/avatar.png')}}"  class="avatar-xs rounded-circle me-1 ">
                                                      <img src="{{asset('img/avatar.png')}}"  class="avatar-xs rounded-circle me-1 ">

                                             </p>
                                             </a>
                                             <span class="float badge bg-light text-black"><i class="fa-solid fa-clock"></i> {{($value->deadline)->toFormattedDateString()}}</span>
                                             <span class="float-end badge bg-warning"><i class="fa-solid fa-badge-check"></i> Tasks: 0/3</span>


                                         </div> <!-- end card-body -->
                                     </div>

                              @endforeach

                            @endif

                          </ul>

                      </div>
                  {{--   <div class="col-md-3 inner-card p-2 inprogress-item">
                            <li class="list-group-item text-center" style="color:red">IN PROGRESS</li>
                          <ul class="list-group  connectedSortable" id="inprogress-item-drop">
                              <h1 class="" style="opacity:0;"></h1>

                            @if(!empty($inprogressItem) && $inprogressItem->count())

                              @foreach($inprogressItem as $key=>$value)


                              <div item-id="{{$value->id}}" class="card mb-0">
                                         <div class="card-body p-3">
                                             <small class="float-end text-muted">Apr 8, 2023</small>
                                             <span class="badge bg-danger">Deadline</span>

                                             <h6 class="mb-2">
                                                 <a href="http://127.0.0.1:8000/account/projects/229" class="text-body">{{$value->title}}</a>
                                             </h6>
                                             <a class="text-dark" href="http://127.0.0.1:8000/account/clients/132">
                                             <p class="mb-0">

                                                 <img src="{{asset('img/avatar.png')}}"  class="avatar-xs rounded-circle me-1 ">
                                                 <span class="align-middle">Sailendrah Apannah (Client)</span>
                                             </p>
                                             </a>






                                         </div> <!-- end card-body -->
                                     </div>

                              @endforeach

                            @endif

                          </ul>

                      </div>

                        <div class="col-md-3 inner-card p-2 complete-item">

                          <li class="list-group-item text-center" style="color:green">COMPLETED</li>
                            <ul class="list-group shadow-lg connectedSortable" id="complete-item-drop">
                              <h1 class="" style="opacity:0;"></h1>

                              @if(!empty($completeItem) && $completeItem->count())

                                @foreach($completeItem as $key=>$value)

                                <div item-id="{{$value->id}}" class="card mb-0">
                                           <div class="card-body p-3">
                                               <small class="float-end text-muted">Apr 8, 2023</small>
                                               <span class="badge bg-danger">Deadline</span>

                                               <h6 class="mb-2">
                                                   <a href="http://127.0.0.1:8000/account/projects/229" class="text-body">{{$value->title}}</a>
                                               </h6>
                                               <a class="text-dark" href="http://127.0.0.1:8000/account/clients/132">
                                               <p class="mb-0">

                                                   <img src="{{asset('img/avatar.png')}}"  class="avatar-xs rounded-circle me-1 ">
                                                   <span class="align-middle">Sailendrah Apannah (Client)</span>
                                               </p>
                                               </a>






                                           </div> <!-- end card-body -->
                                       </div>


                                @endforeach

                              @endif

                            </ul>

                        </div> --}}
                      @endforeach


                    </div>


                </div> <!-- end .board-->
            </div> <!-- end col -->
        </div>
    </div>
    <!-- CONTENT WRAPPER END -->
    <script src="{{asset('kanban/assets/js/vendor.min.js')}}"></script>
    <script src="{{asset('kanban/assets/js/app.min.js')}}"></script>

    <!-- dragula js-->
    <script src="{{asset('kanban/assets/js/vendor/dragula.min.js')}}"></script>

    <!-- demo js -->
    <script src="{{asset('kanban/assets/js/ui/component.dragula.js')}}"></script>
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
