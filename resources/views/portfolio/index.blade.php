  @extends('layouts.app')
@push('styles')
    <style>
        .categoryLink{
            background-color: #ffffff;
            border-radius: 6px;
            margin-right: 10px;
            border: 1px solid rgba(0,0,0,0.1);
            padding: 1px 10px 1px 3px;
            color: #484a50;
            margin-bottom: 10px;
            cursor: pointer;
        }
        .categoryLink:hover {
            box-shadow: 0 0 3px rgba(82, 118, 226, 0.3);
            color: #4a6fdf !important;
            border-color: #4a6fdf;
        }
        .copyBtn{
            position: relative;
            padding: 0px;
            height: 38px;
            width: 38px;
            border: none !important;
            border-color: rgba(0,0,0,0);
            color: rgba(0,0,0,.3);
        }
        .copyBtn:hover{
            background: transparent;
            color: #0c6af3;
        }
        .copyBtn:before {
            content: "Copied";
            position: absolute;
            top: -45px;
            right: 0px;
            background: #5c81dc;
            padding: 6px 8px;
            border-radius: 15px;
            font-size: 13px;
            display: none;
        }
        .copyBtn:after {
            content: "";
            position: absolute;
            top: -20px;
            right: 25px;
            width: 10px;
            height: 10px;
            background: #5c81dc;
            transform: rotate(45deg);
            display: none;
        }
        .copyBtn.active:before,
        .copyBtn.active:after {
            display: block;
        }
    </style>
@endpush
@section('content')

    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="card mt-3">
                    <div class="card-body">
                        {{-- {{ dd($website_themes) }} --}}
                        <div class="row">
                            <div class="col-12 col-sm-4 col-md-3 col-xl-2 p-2 d-flex flex-column">
                                <label style="font-size: 13px; font-weight: bold; color:#999eac; white-space:nowrap;" for="">Select CMS Category</label>
                                <div class="dropdown bootstrap-select form-control select-picker" style="width: 100%; box-shadow: 0 1px 3pxpx rgba(0,0,0,0.1);">
                                    <select name="cms_id" id="cms_id" data-live-search="true" class="w-100 form-control select-picker error" data-size="8">
                                        <option value="">--</option>
                                        @foreach ($project_cmss as $project_cms)
                                            <option value="{{ $project_cms->id }}">{{ $project_cms->cms_name }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>

                            <div class="col-12 col-sm-4 col-md-3 col-xl-2 p-2 d-flex flex-column">
                                <label style="font-size: 13px; font-weight: bold; color:#999eac; white-space:nowrap;" for="">Website Types</label>
                                <div class="dropdown bootstrap-select form-control select-picker" style="width: 100%; box-shadow: 0 1px 3pxpx rgba(0,0,0,0.1);">
                                    <select name="website_type" id="website_type" data-live-search="true" class="w-100 form-control select-picker error" data-size="8">
                                        <option value="">--</option>
                                        @foreach ($website_types as $website_type)
                                            <option value="{{$website_type->id}}">{{$website_type->website_type}}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>


                            <div class="col-12 col-sm-4 col-md-3 col-xl-2 p-2 d-flex flex-column">
                                <label style="font-size: 13px; font-weight: bold; color:#999eac; white-space:nowrap;" for="">Select Website Category</label>
                                <div class="dropdown bootstrap-select form-control select-picker" style="width: 100%; box-shadow: 0 1px 3pxpx rgba(0,0,0,0.1);">
                                    <select name="website_category" id="website_category" data-live-search="true" class="w-100 form-control select-picker error" data-size="8">
                                        <option value="">--</option>
                                        @foreach ($website_categories as $website_category)
                                            <option value="{{$website_category->id}}">{{$website_category->category_name}}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>


                            <div class="col-12 col-sm-4 col-md-3 col-xl-2 p-2 d-flex flex-column">
                                <label style="font-size: 13px; font-weight: bold; color:#999eac; white-space:nowrap;" for="">Select Website Subcategory</label>
                                <div style="width: 100%; box-shadow: 0 1px 3pxpx rgba(0,0,0,0.1);">
                                    <select class="form-control height-35 f-14" name="website_sub_cat" id="website_sub_cat" data-live-search="true" data-size="8">
                                        <option value="">--</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-12 col-sm-4 col-md-3 col-xl-2 p-2 d-flex flex-column">
                                <label style="font-size: 13px; font-weight: bold; color:#999eac; white-space:nowrap;" for="">Select Website Theme</label>
                                <div class="dropdown bootstrap-select form-control select-picker" style="width: 100%; box-shadow: 0 1px 3pxpx rgba(0,0,0,0.1);">
                                    <select name="theme_name" id="theme_name" data-live-search="true" class="form-control select-picker error" data-size="8">
                                        <option value="">--</option>

                                        @foreach ($website_themes as $website_theme)
                                            <option value="{{$website_theme->id}}">{{$website_theme->theme_name}}</option>

                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <div class="col-12 col-sm-4 col-md-3 col-xl-2 p-2 d-flex flex-column">
                                <label style="font-size: 13px; font-weight: bold; color:#999eac; white-space:nowrap;" for="">Select Website Plugin</label>
                                <div class="dropdown bootstrap-select form-control select-picker" style="width: 100%; box-shadow: 0 1px 3pxpx rgba(0,0,0,0.1);">
                                    <select name="website_plugin" id="website_plugin" x-placement="bottom-end" data-live-search="true" style="width: 200px !important;" class="form-control select-picker error" data-size="8">
                                        <option value="">--</option>
                                        @foreach ($website_plugins as $website_plugin)
                                            <option value="{{$website_plugin->id}}">{{$website_plugin->plugin_name}}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                        </div>

                        <br>
                        <div class="displayFilterData">
                            <p class="mt-2 f-18" style="color:#5e6168; font-weight: 500">Website Category: <span id="displaySelectedCategory">Seopage1</span></p>
                            <div id="categoryLinkWrapper" class="d-flex flex-wrap m-0 p-0">
                                <div class="categoryLink" >
                                    <img src="/user-uploads/favicon/14d159b3d5548dfbc48b977da1ede616.png" alt="" class="rounded-circle m-1" width="26" height="26" style="border: 2px solid #dddddd;">
                                    <span>www.seopage1.com</span>
                                </div>
                            </div>
                        </div>

                        <!--Modal Start-->
                        <div class="portfolioModal"></div>
{{--                        <div class="modal fade" id="linkModal" tabindex="-1" aria-labelledby="linkModalLabel" aria-hidden="true">--}}
{{--                            <div class="modal-dialog modal-xl">--}}
{{--                                <div class="modal-content">--}}
{{--                                    <div class="modal-header">--}}
{{--                                        <h5 class="modal-title" id="linkModalLabel">View Category</h5>--}}
{{--                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">--}}
{{--                                            <span aria-hidden="true">&times;</span>--}}
{{--                                        </button>--}}
{{--                                    </div>--}}
{{--                                    <div class="modal-body">--}}
{{--                                        @foreach($portfolios as $index => $portfolio)--}}
{{--                                            @php--}}
{{--                                                $project = \App\Models\Project::find($portfolio->project_id);--}}
{{--                                            @endphp--}}
{{--                                            <section style="background-color: #f4f4f4;" class="py-3 linkShow rounded" id="linkShowId{{$index}}">--}}
{{--                                                <div class="container-fluid">--}}
{{--                                                    <div class="mb-3">--}}
{{--                                                        <h5 class="f-20">Project Title:</h5>--}}
{{--                                                        <span>{{$portfolio->project_name}}</span>--}}
{{--                                                    </div>--}}


{{--                                                    <div class="mb-3">--}}
{{--                                                        <span class="f-20">Client Name: {{$portfolio->user_name}}</span><br>--}}
{{--                                                        <img src="img/avatar.png" alt="" class="rounded-circle m-1" width="30" height="30"><span class="ml-2">{{$portfolio->user_name}}</span>--}}
{{--                                                    </div>--}}
{{--                                                    <div class="row">--}}
{{--                                                        <div class="col-md-6 mb-3 mb-md-0">--}}
{{--                                                            <h5>Website Link:</h5>--}}
{{--                                                            <span>{{$portfolio->actual_link}}</span>--}}
{{--                                                        </div>--}}
{{--                                                        <div class="col-md-6">--}}
{{--                                                            <h5>Agree price:</h5>--}}
{{--                                                            <span>${{$portfolio->project_budget}}</span>--}}
{{--                                                        </div>--}}
{{--                                                    </div>--}}
{{--                                                    <div class="row mt-3">--}}
{{--                                                        --}}{{--                                            <div class="col-md-6 mb-3 mb-md-0">--}}
{{--                                                        --}}{{--                                                <h5>Final price with bonus and additional requirements:</h5>--}}
{{--                                                        --}}{{--                                                <span>$ 4654 USD</span>--}}
{{--                                                        --}}{{--                                            </div>--}}
{{--                                                        <div class="col-md-6 d-flex">--}}
{{--                                                            <h5>Theme Name:</h5>--}}
{{--                                                            <p class="ml-2">{{$portfolio->theme_name}}</p>--}}
{{--                                                        </div>--}}

{{--                                                    </div>--}}
{{--                                                    <div class="row mt-3">--}}
{{--                                                        <div class="col-md-6 mb-3 mb-md-0">--}}
{{--                                                            <h5>Total estimated hours:</h5>--}}
{{--                                                            @php--}}
{{--                                                                $hours = floor($project->hours_allocated); // Extract the whole number of hours--}}
{{--                                                                $minutes = ($project->hours_allocated - $hours) * 60; // Calculate the minutes--}}
{{--                                                                // Create a Carbon instance to format the hours and minutes--}}
{{--                                                                $time = \Carbon\Carbon::createFromTime($hours, $minutes);--}}
{{--                                                                $formattedDuration = $time->format('H \H\o\u\r\s i \M\i\n');--}}
{{--                                                            @endphp--}}
{{--                                                            <span>{{$formattedDuration}}</span>--}}
{{--                                                        </div>--}}
{{--                                                        <div class="col-md-6">--}}
{{--                                                            <h5>Total Logged hours:</h5>--}}
{{--                                                            @php--}}
{{--                                                                $project_time_logs_hours= \App\Models\ProjectTimeLog::where('project_id', $project->id)->sum('total_hours');--}}
{{--                                                                $project_time_logs_minutes= \App\Models\ProjectTimeLog::where('project_id', $project->id)->sum('total_minutes');--}}
{{--                                                                $project_time_logs=  ($project_time_logs_minutes / 60);--}}
{{--                                                                $project_time_minutes = $project_time_logs_minutes % 60;--}}
{{--                                                                $currentTime = \Carbon\Carbon::now();--}}
{{--                                                                $totalMinutes = \DB::table('project_time_logs')--}}
{{--                                                                ->where('project_id',$project->id)--}}
{{--                                                                ->whereNull('end_time')--}}
{{--                                                                ->select(DB::raw("SUM(TIME_TO_SEC(TIMEDIFF('$currentTime', start_time)))/60 as total_minutes"))--}}
{{--                                                                ->value('total_minutes');--}}
{{--                                                                $active_time_hours = intval(round($totalMinutes,1) / 60);--}}
{{--                                                                $active_time_minutes = intval(round($totalMinutes,1) % 60);--}}
{{--                                                                $update_hours = $project_time_minutes + $active_time_minutes / 60 ;--}}
{{--                                                                $update_minutes = $project_time_minutes + $active_time_minutes / 60 ;--}}
{{--                                                                if($project_time_minutes + $active_time_minutes >= 60)--}}
{{--                                                                {--}}
{{--                                                                    $add_hours = intval(round(($project_time_minutes + $active_time_minutes) / 60, 1)) ;--}}
{{--                                                                    $add_minutes = ($project_time_minutes + $active_time_minutes) % 60;--}}
{{--                                                                }else {--}}
{{--                                                                    $add_hours = 0;--}}
{{--                                                                    $add_minutes = $project_time_minutes + $active_time_minutes;--}}
{{--                                                                }--}}
{{--                                                                $total_hours = intval(round($project_time_logs, 1)) + $active_time_hours + $add_hours.'.'.$add_minutes;--}}
{{--                                                                $logged_hours = intval(round($project_time_logs, 1)) + $active_time_hours + $add_hours . ' hrs '. $add_minutes . ' mins';--}}
{{--                                                            @endphp--}}
{{--                                                            <p class="ml-2">{{$logged_hours}}</p>--}}
{{--                                                        </div>--}}
{{--                                                    </div>--}}
{{--                                                    <div class="row mt-3">--}}
{{--                                                        <div class="col-md-6 mb-3 mb-md-0">--}}
{{--                                                            <h5>Average hourly price based on the final logged hours:</h5>--}}
{{--                                                            @if($total_hours != 0)--}}
{{--                                                                <span>${{round($project->project_budget / $total_hours, 2)}}</span>--}}
{{--                                                            @else--}}
{{--                                                                <span>$0</span>--}}

{{--                                                            @endif--}}
{{--                                                        </div>--}}
{{--                                                        <div class="col-md-6">--}}
{{--                                                            <h5>Total number of pages with page numbers:</h5>--}}
{{--                                                            <p class="ml-2">Main page name and number: {{$portfolio->main_page_number}} page ({{$portfolio->main_page_name}})</p>--}}
{{--                                                            <p class="ml-2">Secondary page name and number: {{$portfolio->secondary_page_number}} page ({{$portfolio->secondary_page_name}})</p>--}}
{{--                                                        </div>--}}
{{--                                                    </div>--}}
{{--                                                    <div class="mt-3">--}}
{{--                                                        <h5>Is There Any Major Functions You Want To Mention About This Project? (Mention the name of the functionality and a brief description with screenshot)</h5>--}}
{{--                                                        @if($portfolio !=null)--}}
{{--                                                        <p>{!! $portfolio->description !!}</p>--}}
{{--                                                        @else--}}
{{--                                                        <p>--</p>--}}
{{--                                                         @endif--}}
{{--                                                    </div>--}}
{{--                                                </div>--}}
{{--                                            </section>--}}

{{--                                        @endforeach--}}
{{--                                    </div>--}}
{{--                                    <div class="modal-footer">--}}
{{--                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>--}}
{{--                                    </div>--}}
{{--                                </div>--}}
{{--                            </div>--}}
{{--                        </div>--}}
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
@push('scripts')
<script>
    $(document).ready(function() {
        $('#cms_id, #website_type, #website_category, #sub_niche, #theme_name, #website_plugin').change(function(event) {
            var selectedCategoryId = $('#cms_id').val();
            var websiteType = $('#website_type').val();
            var website_category = $('#website_category').val();
            var sub_niche = $('#sub_cat').val();
            var theme_name = $('#theme_name').val();
            var website_plugin = $('#website_plugin').val();
            var selectedCmsName = $(this).find(':selected').text();

            $.ajax({
                url: "{{ route('filter-cms-categories') }}",
                method: 'GET',
                data: {
                    category_id: selectedCategoryId,
                    website_type: websiteType,
                    website_category: website_category,
                    sub_niche: sub_niche,
                    theme_name: theme_name,
                    website_plugin: website_plugin
                },
                success: function(response) {
                    $('.displayFilterData').empty();

                    var categoryHtml = '<p class="mt-2 f-20">Website Category: ' + selectedCmsName + '</p>';
                    $('.displayFilterData').append(categoryHtml);

                    var rowHtml = '<div class="row"></div>';
                    $('.displayFilterData').append(rowHtml);

                    $.each(response, function(index, category) {
                        var linkHtml = '<div class="col-md-4">' +
                            '<div id="categoryLinkWrapper" class="m-0 p-0">' +
                            '<div class="categoryLink d-flex align-items-center">' +
                            '<img src="/user-uploads/favicon/14d159b3d5548dfbc48b977da1ede616.png" alt="" class="rounded-circle m-1" width="26" height="26" style="border: 2px solid #dddddd;">';

                            linkHtml += '<a href="#" class="mr-auto linkBtn"  data-id="' + category.id + '">' + category.portfolio_link + '</a>'
                            linkHtml += '<button type="submit" class="btn btn-outline-primary copyBtn"><i class="fa fa-clone"></i></button>' +
                            '</div>' +
                            '</div>' +
                            '</div>';

                        $('.displayFilterData .row').append(linkHtml);
                        CopyTextLink();
                    });

                    $(document).ready(function() {
                        $(document).on('click', '.linkBtn', function(e) {
                            e.preventDefault();
                            var dataId = $(this).data('id');
                            $.ajax({
                                url: '/filter-data-show/' + dataId,
                                type: "GET",
                                dataType: "html",
                                success: function (data) {
                                    $('.portfolioModal').append(data);
                                    $('#linkModal').modal('show');
                                },
                                error: function(xhr, status, error) {
                                    // Handle the error response here
                                    console.error(error);
                                }
                            });
                        });
                    });

                    // var linkBtns = document.querySelectorAll(".linkBtn");
                    // linkBtns.forEach(function(linkBtn, index) {
                    //     linkBtn.addEventListener("click", function(event) {
                    //         event.preventDefault();
                    //
                    //         var linkShows = document.querySelectorAll(".linkShow");
                    //         linkShows.forEach(function(linkShow) {
                    //             linkShow.style.display = "none";
                    //         });
                    //
                    //         var linkShowId = document.getElementById("linkShowId" + index);
                    //         console.log(linkShowId);
                    //         if (linkShowId) {
                    //             linkShowId.style.display = "block";
                    //         }
                    //     });
                    // });
                },
                error: function(xhr, status, error) {
                    console.log(xhr.responseText);
                }
            });
        });
    });
    function CopyTextLink() {
        $('.categoryLink').each(function () {
            var text = $(this).children('a.linkBtn').text();
            var copyBtn = $(this).children('.copyBtn');

            copyBtn.on('click', function () {
                copyBtn.addClass('active');

                var tempInput = $('<input>');
                tempInput.val(text);
                $('body').append(tempInput);
                tempInput.select();
                document.execCommand('copy');
                tempInput.remove();

                setTimeout(function () {
                    copyBtn.removeClass('active');
                }, 1000);
            });
        });
    }
    $('.linkBtn').click(function(e) {
        e.preventDefault();

        var target = $(this).attr('href');

        $(target).collapse('toggle');
    });
</script>
<script>
    // AUTO SELECT SUBCATEGORY SECTION
    $(document).ready(function () {
        $('#website_category').change(function () {
            var website_cat_id = $(this).val();
            if (website_cat_id) {
                $.ajax({
                    url: '/portfolio/get-sub-category/' + website_cat_id,
                    type: "GET",
                    dataType: "json",
                    success: function (data) {
                        $('#website_sub_cat').empty();
                        $.each(data, function (index, website_sub_cat) {
                            $('#website_sub_cat').append('<option value="' + website_sub_cat.id + '">' + website_sub_cat.category_name + '</option>');
                        });
                    }
                });
            } else {
                $('#website_sub_cat').empty();
            }
        });
    });
</script>
@endpush
