@extends('layouts.app')

@push('datatable-styles')
    @include('sections.daterange_css')
@endpush

@push('styles')
    <!-- Drag and Drop CSS -->


    <link rel='stylesheet' href="{{ asset('vendor/css/dragula.css') }}" type='text/css' />
    <link rel='stylesheet' href="{{ asset('vendor/css/drag.css') }}" type='text/css' />
    <link rel="stylesheet" href="{{ asset('vendor/css/bootstrap-colorpicker.css') }}" />


    <style>
        #colorpicker .form-group {
            width: 87%;
        }

        .b-p-tasks {
            min-height: 100px;
        }

    </style>

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

                    <x-forms.link-primary :link="route('projects.create')" class="mr-3 openRightModal float-left" icon="plus">
                        @lang('app.add')
                        @lang('app.project')
                    </x-forms.link-primary>


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

                  @foreach($status as $st)
                  <?php
                  $count= App\Models\Project::where('status_id',$st->id)->count();

                   ?>
                    <div class="tasks" data-plugin="dragula" data-containers='["task-list-{{$st->id}}"]'>
                        <h5 class="mt-0 task-header text-uppercase" style="color: {{$st->color}};">{{$st->status_name  }} ({{$count}})</h5>

                        <div id="task-list-{{$st->id}}" class="task-list-items">
                            <?php
                            $projects = App\Models\Project::where('status_id',$st->id)->get();
                             ?>
                             @foreach($projects as $project)
                            <!-- Task Item -->
                            <?php
                              $client= App\Models\User::where('id',$project->client_id)->first();
                                $pm= App\Models\User::where('id',$project->pm_id)->first();
                                $tasks= App\Models\Task::where('project_id',$project->id)->count();
                                $completed_tasks= App\Models\Task::where('project_id',$project->id)->where('status','complete')->count();

                             ?>

                            <div class="card mb-0">
                                <div class="card-body p-3">
                                    <small class="float-end text-muted">{{($project->deadline)->toFormattedDateString()}}</small>
                                    <span class="badge bg-danger">Deadline</span>

                                    <h6 class="mt-2 mb-2">
                                        <a href="/account/projects/{{$project->id}}" class="text-body">{{$project->project_name}}</a>
                                    </h6>
                                    <a class="text-dark" href="/account/clients/{{$client->id}}">
                                    <p class="mb-0">

                                        <img src="{{asset('kanban/assets/images/avatar.jpg')}}" alt="user-img" class="avatar-xs rounded-circle me-1 " />
                                        <span class="align-middle">{{$client->name}} (Client)</span>
                                    </p>
                                    </a>

                                    <p class="mb-1 mt-1">
                                        <span class="pe-2 text-nowrap mb-2 d-inline-block">
                                            <i class="mdi mdi-briefcase-outline text-muted"></i>
                                            Tasks: {{$completed_tasks}}/{{$tasks}}
                                        </span>

                                    </p>

                                    <div class="dropdown float-end">
                                        <a href="#" class="dropdown-toggle text-muted arrow-none" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i class="mdi mdi-dots-vertical font-18"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-end">
                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item"><i class="mdi mdi-pencil me-1"></i>Edit</a>
                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item"><i class="mdi mdi-delete me-1"></i>Delete</a>
                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item"><i class="mdi mdi-plus-circle-outline me-1"></i>Add People</a>
                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item"><i class="mdi mdi-exit-to-app me-1"></i>Leave</a>
                                        </div>
                                    </div>
                                    <a class="text-dark" href="/account/employees/{{$pm->id}}">
                                    <p class="mb-0">
                                      @if($pm->image != null)
                                        <img src="{{asset('/user-uploads/avatar/'. $pm->image)}}" alt="user-img" class="avatar-xs rounded-circle me-1" />
                                        @else

                                        <img src="{{asset('kanban/assets/images/avatar.jpg')}}" alt="user-img" class="avatar-xs rounded-circle me-1" />
                                        @endif

                                        <span class="align-middle">{{$pm->name}} (PM)</span>
                                    </p>
                                    <a>

                                      <div class="row mt-2">
                                        <div class="col-md-6">
                                          <h6>Project Members</h6>



                                        </div>

                                      </div>
                                      <div class="col-md-12">
                                        <img data-toggle="tooltip" data-original-title="Developer 1" src="{{asset('kanban/assets/images/avatar.jpg')}}" alt="user-img" class="avatar-xs rounded-circle me-1" />
                                        <img data-toggle="tooltip" data-original-title="Developer 1"  src="{{asset('kanban/assets/images/avatar.jpg')}}" alt="user-img" class="avatar-xs rounded-circle me-1" />
                                        <img data-toggle="tooltip" data-original-title="Developer 1"  src="{{asset('kanban/assets/images/avatar.jpg')}}" alt="user-img" class="avatar-xs rounded-circle me-1" />
                                        <img data-toggle="tooltip" data-original-title="Developer 1"  src="{{asset('kanban/assets/images/avatar.jpg')}}" alt="user-img" class="avatar-xs rounded-circle me-1" />
                                        <img data-toggle="tooltip" data-original-title="Developer 1"  src="{{asset('kanban/assets/images/avatar.jpg')}}" alt="user-img" class="avatar-xs rounded-circle me-1" />





                                      </div>

                                </div> <!-- end card-body -->
                            </div>
                            <!-- Task Item End -->
                            @endforeach

                          {{-- <!-- Task Item -->
                            <div class="card mb-0">
                                <div class="card-body p-3">
                                    <small class="float-end text-muted">18 Jul 2018</small>
                                    <span class="badge bg-secondary text-light">Medium</span>

                                    <h5 class="mt-2 mb-2">
                                        <a href="#" data-bs-toggle="modal" data-bs-target="#task-detail-modal" class="text-body">Topnav layout design</a>
                                    </h5>

                                    <p class="mb-0">
                                        <span class="pe-2 text-nowrap mb-2 d-inline-block">
                                            <i class="mdi mdi-briefcase-outline text-muted"></i>
                                            Hyper
                                        </span>
                                        <span class="text-nowrap mb-2 d-inline-block">
                                            <i class="mdi mdi-comment-multiple-outline text-muted"></i>
                                            <b>28</b> Comments
                                        </span>
                                    </p>

                                    <div class="dropdown float-end">
                                        <a href="#" class="dropdown-toggle text-muted arrow-none" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i class="mdi mdi-dots-vertical font-18"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-end">
                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item"><i class="mdi mdi-pencil me-1"></i>Edit</a>
                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item"><i class="mdi mdi-delete me-1"></i>Delete</a>
                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item"><i class="mdi mdi-plus-circle-outline me-1"></i>Add People</a>
                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item"><i class="mdi mdi-exit-to-app me-1"></i>Leave</a>
                                        </div>
                                    </div>

                                    <p class="mb-0">
                                        <img src="{{asset('kanban/assets/images/users/avatar-1.jpg')}}" alt="user-img" class="avatar-xs rounded-circle me-1" />
                                        <span class="align-middle">Coder Themes</span>
                                    </p>
                                </div> <!-- end card-body -->
                            </div>
                            <!-- Task Item End -->

                            <!-- Task Item -->
                            <div class="card mb-0">
                                <div class="card-body p-3">
                                    <small class="float-end text-muted">11 Jul 2018</small>
                                    <span class="badge bg-success">Low</span>

                                    <h5 class="mt-2 mb-2">
                                        <a href="#" data-bs-toggle="modal" data-bs-target="#task-detail-modal" class="text-body">Invite user to a project</a>
                                    </h5>

                                    <p class="mb-0">
                                        <span class="pe-2 text-nowrap mb-2 d-inline-block">
                                            <i class="mdi mdi-briefcase-outline text-muted"></i>
                                            CRM
                                        </span>
                                        <span class="text-nowrap mb-2 d-inline-block">
                                            <i class="mdi mdi-comment-multiple-outline text-muted"></i>
                                            <b>68</b> Comments
                                        </span>
                                    </p>

                                    <div class="dropdown float-end">
                                        <a href="#" class="dropdown-toggle text-muted arrow-none" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i class="mdi mdi-dots-vertical font-18"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-end">
                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item"><i class="mdi mdi-pencil me-1"></i>Edit</a>
                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item"><i class="mdi mdi-delete me-1"></i>Delete</a>
                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item"><i class="mdi mdi-plus-circle-outline me-1"></i>Add People</a>
                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item"><i class="mdi mdi-exit-to-app me-1"></i>Leave</a>
                                        </div>
                                    </div>

                                    <p class="mb-0">
                                        <img src="{{asset('kanban/assets/images/users/avatar-3.jpg')}}" alt="user-img" class="avatar-xs rounded-circle me-1" />
                                        <span class="align-middle">Lucas Hardy</span>
                                    </p>
                                </div> <!-- end card-body -->
                            </div>
                            <!-- Task Item End -->
                            <!-- Task Item -->
                            <div class="card mb-0">
                                <div class="card-body p-3">
                                    <small class="float-end text-muted">18 Jul 2018</small>
                                    <span class="badge bg-danger">High</span>

                                    <h5 class="mt-2 mb-2">
                                        <a href="#" data-bs-toggle="modal" data-bs-target="#task-detail-modal" class="text-body">iOS App home page</a>
                                    </h5>

                                    <p class="mb-0">
                                        <span class="pe-2 text-nowrap mb-2 d-inline-block">
                                            <i class="mdi mdi-briefcase-outline text-muted"></i>
                                            iOS
                                        </span>
                                        <span class="text-nowrap mb-2 d-inline-block">
                                            <i class="mdi mdi-comment-multiple-outline text-muted"></i>
                                            <b>74</b> Comments
                                        </span>
                                    </p>

                                    <div class="dropdown float-end">
                                        <a href="#" class="dropdown-toggle text-muted arrow-none" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i class="mdi mdi-dots-vertical font-18"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-end">
                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item"><i class="mdi mdi-pencil me-1"></i>Edit</a>
                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item"><i class="mdi mdi-delete me-1"></i>Delete</a>
                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item"><i class="mdi mdi-plus-circle-outline me-1"></i>Add People</a>
                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item"><i class="mdi mdi-exit-to-app me-1"></i>Leave</a>
                                        </div>
                                    </div>

                                    <p class="mb-0">
                                        <img src="{{asset('kanban/assets/images/users/avatar-2.jpg')}}" alt="user-img" class="avatar-xs rounded-circle me-1" />
                                        <span class="align-middle">Robert Carlile</span>
                                    </p>
                                </div> <!-- end card-body -->
                            </div>
                            <!-- Task Item End -->
                            --}}



                        </div> <!-- end company-list-1-->
                    </div>
                    @endforeach

                {{--    <div class="tasks">
                        <h5 class="mt-0 task-header text-uppercase">In Progress (2)</h5>

                        <div id="task-list-two" class="task-list-items">

                            <!-- Task Item -->
                            <div class="card mb-0">
                                <div class="card-body p-3">
                                    <small class="float-end text-muted">22 Jun 2018</small>
                                    <span class="badge bg-secondary text-light">Medium</span>

                                    <h5 class="mt-2 mb-2">
                                        <a href="#" data-bs-toggle="modal" data-bs-target="#task-detail-modal" class="text-body">Write a release note</a>
                                    </h5>

                                    <p class="mb-0">
                                        <span class="pe-2 text-nowrap mb-2 d-inline-block">
                                            <i class="mdi mdi-briefcase-outline text-muted"></i>
                                            Hyper
                                        </span>
                                        <span class="text-nowrap mb-2 d-inline-block">
                                            <i class="mdi mdi-comment-multiple-outline text-muted"></i>
                                            <b>17</b> Comments
                                        </span>
                                    </p>

                                    <div class="dropdown float-end">
                                        <a href="#" class="dropdown-toggle text-muted arrow-none" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i class="mdi mdi-dots-vertical font-18"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-end">
                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item"><i class="mdi mdi-pencil me-1"></i>Edit</a>
                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item"><i class="mdi mdi-delete me-1"></i>Delete</a>
                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item"><i class="mdi mdi-plus-circle-outline me-1"></i>Add People</a>
                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item"><i class="mdi mdi-exit-to-app me-1"></i>Leave</a>
                                        </div>
                                    </div>

                                    <p class="mb-0">
                                        <img src="{{asset('kanban/assets/images/users/avatar-5.jpg')}}" alt="user-img" class="avatar-xs rounded-circle me-1" />
                                        <span class="align-middle">Sean White</span>
                                    </p>
                                </div> <!-- end card-body -->
                            </div>
                            <!-- Task Item End -->

                            <!-- Task Item -->
                            <div class="card mb-0">
                                <div class="card-body p-3">
                                    <small class="float-end text-muted">19 Jun 2018</small>
                                    <span class="badge bg-success">Low</span>

                                    <h5 class="mt-2 mb-2">
                                        <a href="#" data-bs-toggle="modal" data-bs-target="#task-detail-modal" class="text-body">Enable analytics tracking</a>
                                    </h5>

                                    <p class="mb-0">
                                        <span class="pe-2 text-nowrap mb-2 d-inline-block">
                                            <i class="mdi mdi-briefcase-outline text-muted"></i>
                                            CRM
                                        </span>
                                        <span class="text-nowrap mb-2 d-inline-block">
                                            <i class="mdi mdi-comment-multiple-outline text-muted"></i>
                                            <b>48</b> Comments
                                        </span>
                                    </p>

                                    <div class="dropdown float-end">
                                        <a href="#" class="dropdown-toggle text-muted arrow-none" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i class="mdi mdi-dots-vertical font-18"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-end">
                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item"><i class="mdi mdi-pencil me-1"></i>Edit</a>
                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item"><i class="mdi mdi-delete me-1"></i>Delete</a>
                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item"><i class="mdi mdi-plus-circle-outline me-1"></i>Add People</a>
                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item"><i class="mdi mdi-exit-to-app me-1"></i>Leave</a>
                                        </div>
                                    </div>

                                    <p class="mb-0">
                                        <img src="{{asset('kanban/assets/images/users/avatar-6.jpg')}}" alt="user-img" class="avatar-xs rounded-circle me-1" />
                                        <span class="align-middle">Louis Allen</span>
                                    </p>
                                </div> <!-- end card-body -->
                            </div>
                            <!-- Task Item End -->

                        </div> <!-- end company-list-2-->
                    </div>


                    <div class="tasks">
                        <h5 class="mt-0 task-header text-uppercase">Review (4)</h5>
                        <div id="task-list-three" class="task-list-items">

                            <!-- Task Item -->
                            <div class="card mb-0">
                                <div class="card-body p-3">
                                    <small class="float-end text-muted">2 May 2018</small>
                                    <span class="badge bg-danger">High</span>

                                    <h5 class="mt-2 mb-2">
                                        <a href="#" data-bs-toggle="modal" data-bs-target="#task-detail-modal" class="text-body">Kanban board design</a>
                                    </h5>

                                    <p class="mb-0">
                                        <span class="pe-2 text-nowrap mb-2 d-inline-block">
                                            <i class="mdi mdi-briefcase-outline text-muted"></i>
                                            CRM
                                        </span>
                                        <span class="text-nowrap mb-2 d-inline-block">
                                            <i class="mdi mdi-comment-multiple-outline text-muted"></i>
                                            <b>65</b> Comments
                                        </span>
                                    </p>

                                    <div class="dropdown float-end">
                                        <a href="#" class="dropdown-toggle text-muted arrow-none" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i class="mdi mdi-dots-vertical font-18"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-end">
                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item"><i class="mdi mdi-pencil me-1"></i>Edit</a>
                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item"><i class="mdi mdi-delete me-1"></i>Delete</a>
                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item"><i class="mdi mdi-plus-circle-outline me-1"></i>Add People</a>
                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item"><i class="mdi mdi-exit-to-app me-1"></i>Leave</a>
                                        </div>
                                    </div>

                                    <p class="mb-0">
                                        <img src="{{asset('kanban/assets/images/users/avatar-1.jpg')}}" alt="user-img" class="avatar-xs rounded-circle me-1" />
                                        <span class="align-middle">Coder Themes</span>
                                    </p>
                                </div> <!-- end card-body -->
                            </div>
                            <!-- Task Item End -->

                            <!-- Task Item -->
                            <div class="card mb-0">
                                <div class="card-body p-3">
                                    <small class="float-end text-muted">7 May 2018</small>
                                    <span class="badge bg-secondary text-light">Medium</span>

                                    <h5 class="mt-2 mb-2">
                                        <a href="#" data-bs-toggle="modal" data-bs-target="#task-detail-modal" class="text-body">Code HTML email template</a>
                                    </h5>

                                    <p class="mb-0">
                                        <span class="pe-2 text-nowrap mb-2 d-inline-block">
                                            <i class="mdi mdi-briefcase-outline text-muted"></i>
                                            CRM
                                        </span>
                                        <span class="text-nowrap mb-2 d-inline-block">
                                            <i class="mdi mdi-comment-multiple-outline text-muted"></i>
                                            <b>106</b> Comments
                                        </span>
                                    </p>

                                    <div class="dropdown float-end">
                                        <a href="#" class="dropdown-toggle text-muted arrow-none" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i class="mdi mdi-dots-vertical font-18"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-end">
                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item"><i class="mdi mdi-pencil me-1"></i>Edit</a>
                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item"><i class="mdi mdi-delete me-1"></i>Delete</a>
                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item"><i class="mdi mdi-plus-circle-outline me-1"></i>Add People</a>
                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item"><i class="mdi mdi-exit-to-app me-1"></i>Leave</a>
                                        </div>
                                    </div>

                                    <p class="mb-0">
                                        <img src="{{asset('kanban/assets/images/users/avatar-9.jpg')}}" alt="user-img" class="avatar-xs rounded-circle me-1" />
                                        <span class="align-middle">Zak Turnbull</span>
                                    </p>
                                </div> <!-- end card-body -->
                            </div>
                            <!-- Task Item End -->

                            <!-- Task Item -->
                            <div class="card mb-0">
                                <div class="card-body p-3">
                                    <small class="float-end text-muted">8 Jul 2018</small>
                                    <span class="badge bg-secondary text-light">Medium</span>

                                    <h5 class="mt-2 mb-2">
                                        <a href="#" data-bs-toggle="modal" data-bs-target="#task-detail-modal" class="text-body">Brand logo design</a>
                                    </h5>

                                    <p class="mb-0">
                                        <span class="pe-2 text-nowrap mb-2 d-inline-block">
                                            <i class="mdi mdi-briefcase-outline text-muted"></i>
                                            Design
                                        </span>
                                        <span class="text-nowrap mb-2 d-inline-block">
                                            <i class="mdi mdi-comment-multiple-outline text-muted"></i>
                                            <b>95</b> Comments
                                        </span>
                                    </p>

                                    <div class="dropdown float-end">
                                        <a href="#" class="dropdown-toggle text-muted arrow-none" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i class="mdi mdi-dots-vertical font-18"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-end">
                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item"><i class="mdi mdi-pencil me-1"></i>Edit</a>
                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item"><i class="mdi mdi-delete me-1"></i>Delete</a>
                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item"><i class="mdi mdi-plus-circle-outline me-1"></i>Add People</a>
                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item"><i class="mdi mdi-exit-to-app me-1"></i>Leave</a>
                                        </div>
                                    </div>

                                    <p class="mb-0">
                                        <img src="{{asset('kanban/assets/images/users/avatar-8.jpg')}}" alt="user-img" class="avatar-xs rounded-circle me-1" />
                                        <span class="align-middle">Lily Parkin</span>
                                    </p>
                                </div> <!-- end card-body -->
                            </div>
                            <!-- Task Item End -->

                            <!-- Task Item -->
                            <div class="card mb-0">
                                <div class="card-body p-3">
                                    <small class="float-end text-muted">22 Jul 2018</small>
                                    <span class="badge bg-danger">High</span>

                                    <h5 class="mt-2 mb-2">
                                        <a href="#" data-bs-toggle="modal" data-bs-target="#task-detail-modal" class="text-body">Improve animation loader</a>
                                    </h5>

                                    <p class="mb-0">
                                        <span class="pe-2 text-nowrap mb-2 d-inline-block">
                                            <i class="mdi mdi-briefcase-outline text-muted"></i>
                                            CRM
                                        </span>
                                        <span class="text-nowrap mb-2 d-inline-block">
                                            <i class="mdi mdi-comment-multiple-outline text-muted"></i>
                                            <b>39</b> Comments
                                        </span>
                                    </p>

                                    <div class="dropdown float-end">
                                        <a href="#" class="dropdown-toggle text-muted arrow-none" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i class="mdi mdi-dots-vertical font-18"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-end">
                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item"><i class="mdi mdi-pencil me-1"></i>Edit</a>
                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item"><i class="mdi mdi-delete me-1"></i>Delete</a>
                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item"><i class="mdi mdi-plus-circle-outline me-1"></i>Add People</a>
                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item"><i class="mdi mdi-exit-to-app me-1"></i>Leave</a>
                                        </div>
                                    </div>

                                    <p class="mb-0">
                                        <img src="{{asset('kanban/assets/images/users/avatar-4.jpg')}}" alt="user-img" class="avatar-xs rounded-circle me-1" />
                                        <span class="align-middle">Riley Steele</span>
                                    </p>
                                </div> <!-- end card-body -->
                            </div>
                            <!-- Task Item End -->

                        </div> <!-- end company-list-3-->
                    </div>

                    <div class="tasks">
                        <h5 class="mt-0 task-header text-uppercase">Done (1)</h5>
                        <div id="task-list-four" class="task-list-items">

                            <!-- Task Item -->
                            <div class="card mb-0">
                                <div class="card-body p-3">
                                    <small class="float-end text-muted">16 Jul 2018</small>
                                    <span class="badge bg-success">Low</span>

                                    <h5 class="mt-2 mb-2">
                                        <a href="#" data-bs-toggle="modal" data-bs-target="#task-detail-modal" class="text-body">Dashboard design</a>
                                    </h5>

                                    <p class="mb-0">
                                        <span class="pe-2 text-nowrap mb-2 d-inline-block">
                                            <i class="mdi mdi-briefcase-outline text-muted"></i>
                                            Hyper
                                        </span>
                                        <span class="text-nowrap mb-2 d-inline-block">
                                            <i class="mdi mdi-comment-multiple-outline text-muted"></i>
                                            <b>287</b> Comments
                                        </span>
                                    </p>

                                    <div class="dropdown float-end">
                                        <a href="#" class="dropdown-toggle text-muted arrow-none" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i class="mdi mdi-dots-vertical font-18"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-end">
                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item"><i class="mdi mdi-pencil me-1"></i>Edit</a>
                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item"><i class="mdi mdi-delete me-1"></i>Delete</a>
                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item"><i class="mdi mdi-plus-circle-outline me-1"></i>Add People</a>
                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item"><i class="mdi mdi-exit-to-app me-1"></i>Leave</a>
                                        </div>
                                    </div>

                                    <p class="mb-0">
                                        <img src="{{asset('kanban/assets/images/users/avatar-10.jpg')}}" alt="user-img" class="avatar-xs rounded-circle me-1" />
                                        <span class="align-middle">Harvey Dickinson</span>
                                    </p>
                                </div> <!-- end card-body -->
                            </div>
                            <!-- Task Item End -->

                        </div> <!-- end company-list-4-->
                    </div>
                    <div class="tasks">
                        <h5 class="mt-0 task-header text-uppercase">Done (1)</h5>
                        <div id="task-list-four" class="task-list-items">

                            <!-- Task Item -->
                            <div class="card mb-0">
                                <div class="card-body p-3">
                                    <small class="float-end text-muted">16 Jul 2018</small>
                                    <span class="badge bg-success">Low</span>

                                    <h5 class="mt-2 mb-2">
                                        <a href="#" data-bs-toggle="modal" data-bs-target="#task-detail-modal" class="text-body">Dashboard design</a>
                                    </h5>

                                    <p class="mb-0">
                                        <span class="pe-2 text-nowrap mb-2 d-inline-block">
                                            <i class="mdi mdi-briefcase-outline text-muted"></i>
                                            Hyper
                                        </span>
                                        <span class="text-nowrap mb-2 d-inline-block">
                                            <i class="mdi mdi-comment-multiple-outline text-muted"></i>
                                            <b>287</b> Comments
                                        </span>
                                    </p>

                                    <div class="dropdown float-end">
                                        <a href="#" class="dropdown-toggle text-muted arrow-none" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i class="mdi mdi-dots-vertical font-18"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-end">
                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item"><i class="mdi mdi-pencil me-1"></i>Edit</a>
                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item"><i class="mdi mdi-delete me-1"></i>Delete</a>
                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item"><i class="mdi mdi-plus-circle-outline me-1"></i>Add People</a>
                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item"><i class="mdi mdi-exit-to-app me-1"></i>Leave</a>
                                        </div>
                                    </div>

                                    <p class="mb-0">
                                        <img src="{{asset('kanban/assets/images/users/avatar-10.jpg')}}" alt="user-img" class="avatar-xs rounded-circle me-1" />
                                        <span class="align-middle">Harvey Dickinson</span>
                                    </p>
                                </div> <!-- end card-body -->
                            </div>
                            <!-- Task Item End -->

                        </div> <!-- end company-list-4-->
                    </div>
                    --}}

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


        var category_id = $('#filter_category_id').val();


        var url = "{{ route('projectboards.index') }}?startDate=" + encodeURIComponent(startDate) + '&endDate=' +
            encodeURIComponent(endDate) + '&type=' + type  + '&category_id=' + category_id +
            '&searchText=' + searchText;
        //console.log(url);
      //  var url = "{{ route('projectboards.index') }}";

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


        var category_id = $('#filter_category_id').val();

        var searchText = $('#search-text-field').val();

        var url = "{{ route('projectboards.load_more') }}?startDate=" + encodeURIComponent(startDate) +
            '&endDate=' +
            encodeURIComponent(endDate) + '&type=' + type +  '&category_id=' + category_id +
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






    $('body').on('click', '.collapse-column', function() {
        var boardColumnId = $(this).data('column-id');
        var type = $(this).data('type');

        $.easyAjax({
            url: "{{ route('projectboards.collapse_column') }}",
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
<!-- bundle -->

@endpush
