<div class="modal fade" id="linkModal" tabindex="-1" aria-labelledby="linkModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="linkModalLabel">View Category</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                @php
                    $project = \App\Models\Project::find($portfolio->project_id);
                @endphp
                <section style="background-color: #f4f4f4;" class="py-3 linkShow rounded" id="linkShowId">
                    <div class="container-fluid">
                        <div class="mb-3">
                            <h5 class="f-20">Project Title:</h5>
                            <span>{{$portfolio->project_name}}</span>
                        </div>
                        <div class="mb-3">
                            <span class="f-20">Client Name:</span><br>
                            <img src="img/avatar.png" alt="" class="rounded-circle m-1" width="30" height="30"><span class="ml-2">{{$portfolio->user_name}}</span>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-3 mb-md-0">
                                <h5>Website Link:</h5>
                                <span>{{$portfolio->actual_link}}</span>
                            </div>
                            <div class="col-md-6">
                                <h5>Agree price:</h5>
                                <span>${{$portfolio->project_budget}}</span>
                            </div>
                        </div>
                        <div class="row mt-3">
                            {{--                                            <div class="col-md-6 mb-3 mb-md-0">--}}
                            {{--                                                <h5>Final price with bonus and additional requirements:</h5>--}}
                            {{--                                                <span>$ 4654 USD</span>--}}
                            {{--                                            </div>--}}
                            <div class="col-md-6 d-flex">
                                <h5>Theme Name:</h5>
                                @if (is_numeric($portfolio->theme_name))
                                    @php
                                        $website_theme = App\Models\ProjectWebsiteTheme::find($portfolio->theme_name);
                                    @endphp
                                    <p class="ml-2">
                                        {{ $website_theme->theme_name }}
                                    </p>
                                @else
                                    <p class="ml-2">
                                        --
                                    </p>
                                @endif
                            </div>

                        </div>
                        <div class="row mt-3">
                            <div class="col-md-6 mb-3 mb-md-0">
                                <h5>Total estimated hours:</h5>
                                @php
                                    $hours = floor($project->hours_allocated); // Extract the whole number of hours
                                    $minutes = ($project->hours_allocated - $hours) * 60; // Calculate the minutes
                                    // Create a Carbon instance to format the hours and minutes
                                    $time = \Carbon\Carbon::createFromTime($hours, $minutes);
                                    $formattedDuration = $time->format('H \H\o\u\r\s i \M\i\n');
                                @endphp
                                <span>{{$formattedDuration}}</span>
                            </div>
                            <div class="col-md-6">
                                <h5>Total Logged hours:</h5>
                                @php
                                    $project_time_logs_hours= \App\Models\ProjectTimeLog::where('project_id', $project->id)->sum('total_hours');
                                    $project_time_logs_minutes= \App\Models\ProjectTimeLog::where('project_id', $project->id)->sum('total_minutes');
                                    $project_time_logs=  ($project_time_logs_minutes / 60);
                                    $project_time_minutes = $project_time_logs_minutes % 60;
                                    $currentTime = \Carbon\Carbon::now();
                                    $totalMinutes = \DB::table('project_time_logs')
                                    ->where('project_id',$project->id)
                                    ->whereNull('end_time')
                                    ->select(DB::raw("SUM(TIME_TO_SEC(TIMEDIFF('$currentTime', start_time)))/60 as total_minutes"))
                                    ->value('total_minutes');
                                    $active_time_hours = intval(round($totalMinutes,1) / 60);
                                    $active_time_minutes = intval(round($totalMinutes,1) % 60);
                                    $update_hours = $project_time_minutes + $active_time_minutes / 60 ;
                                    $update_minutes = $project_time_minutes + $active_time_minutes / 60 ;
                                    if($project_time_minutes + $active_time_minutes >= 60)
                                    {
                                        $add_hours = intval(round(($project_time_minutes + $active_time_minutes) / 60, 1)) ;
                                        $add_minutes = ($project_time_minutes + $active_time_minutes) % 60;
                                    }else {
                                        $add_hours = 0;
                                        $add_minutes = $project_time_minutes + $active_time_minutes;
                                    }
                                    $total_hours = intval(round($project_time_logs, 1)) + $active_time_hours + $add_hours.'.'.$add_minutes;
                                    $logged_hours = intval(round($project_time_logs, 1)) + $active_time_hours + $add_hours . ' hrs '. $add_minutes . ' mins';
                                @endphp
                                <p class="ml-2">{{$logged_hours}}</p>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-6 mb-3 mb-md-0">
                                <h5>Average hourly price based on the final logged hours:</h5>
                                @if($total_hours != 0)
                                    <span>${{round($project->project_budget / $total_hours, 2)}}</span>
                                @else
                                    <span>$0</span>

                                @endif
                            </div>
                            <div class="col-md-6">
                                <h5>Total number of pages with page numbers:</h5>
                                <p class="ml-2">Main page name and number: {{$portfolio->main_page_number}} page</p>
                                <p class="ml-2">Secondary page name and number: {{$portfolio->secondary_page_number}} page</p>
                            </div>
                        </div>
                        <div class="mt-3">
                            @if($portfolio->description)
                            <h5>Is There Any Major Functions You Want To Mention About This Project? (Mention the name of the functionality and a brief description with screenshot)</h5>
                            @if($portfolio !=null)
                                <p>{!! $portfolio->description !!}</p>
                            @else
                                <p>No major functionalities to mention for this project</p>
                            @endif
                            @endif
                        </div>
                    </div>
                </section>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
