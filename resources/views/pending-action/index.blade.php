@extends('layouts.app')
@section('content')
<section class="p-2 p-md-4">
    <section class="p-3 bg-white rounded">
        <div class="sp1_pa_title mb-3">Required Actions</div>

        <section>
            {{-- navbar --}}
            <div class="d-flex align-items-center justify-content-between flex-wrap">
                <ul class="nav">
                    <li class="nav-item">
                        <a href="?tab=active" class="nav-link sp1_pa_nav_link @if(request()->query('tab') != 'past') active @endif">Active</a>
                    </li>

                    <li class="nav-item">
                        <a href="?tab=past" class="nav-link sp1_pa_nav_link @if(request()->query('tab') == 'past') active @endif">Past</a>
                    </li>
                </ul>
                {{-- date editor --}}
                <ul class="nav justify-content-end">
                    <li class="nav-item d-flex align-items-center mt-2">
                        <label class="mb-0 mr-2">Date: </label>
                        <input id="datatableRange_pending_action" readonly class="sp1_pa_date_picker"></input>
                    </li>
                </ul>
            </div>
        </section>

        {{-- search with some filter options --}}
        <section class="row pt-3 pb-1 border-bottom" style="border-color: #eef2f8;">
            {{-- search --}}
            <div class="col-12 col-lg-6 input-group mb-2 w-100 pr-2">
                <div class="input-group-prepend border-right-0" style="height: 39px;">
                    <div class="input-group-text  outline-none" style="background: #F7F7F7;">
                        <i class="bi bi-search" ></i>
                    </div>
                </div>
                <input type="text" class="form-control border-left-0 sp1_pa_search" name="search" id="search-input" value="{{ request()->query('search') }}" placeholder="Search Project what you need" style="background: #F7F7F7; height: 39px;">
            </div>

            {{--  --}}

            <div class="col-12 col-lg-6 d-flex flex-wrap align-items-center justify-content-start justify-content-lg-end mb-3">
                {{-- employee filter --}}
                <div class="d-flex align-items-center flex-wrap flex-md-nowrap">
                    <div class="d-flex align-items-center flex-wrap">
                        <div class="select-box d-flex pr-2 border-right-grey-sm-0">
                            <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('app.employee'):</p>
                            <div class="select-status">
                                <select class="form-control select-picker sp1_pa_search sp1_pa_employee_filter" name="employee" id="employee" data-live-search="true"
                                data-size="8">
                                <option value="all">All</option>
                                @foreach($users as $value)
                                <option data-content="<div class='d-inline-block mr-1'><img class='taskEmployeeImg rounded-circle' src='{{ URL::asset('user-uploads/avatar/'.$value->image ?? 'avatar_blank.png') }}'></div> {{ $value->name }}"
                                    value="{{ $value->name }}"> {{ $value->name }}</option>
                                @endforeach
                                </select>
                            </div>
                        </div>
                    </div>

                    {{-- per page item --}}
                    <div class="d-flex align-items-center mt-2 mt-md-0 mx-0 mx-md-2">
                        <div class="d-flex align-items-center">
                            <label for="exampleFormControlSelect1" class="mb-0 pr-1 pr-sm-0 mr-3 mr-sm-2">Show: </label>
                            <select class="form-control sp1_pa_search py-2 ml-4 ml-sm-0" name="per_page" id="per_page" style="width: 60px;">
                                <option value="10" @if(request()->query('per_page') == '10') selected @endif>10</option>
                                <option value="25" @if(request()->query('per_page') == '25') selected @endif>25</option>
                                <option value="50" @if(request()->query('per_page') == '50') selected @endif>50</option>
                                <option value="100" @if(request()->query('per_page') == '100') selected @endif>100</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {{-- item --}}
        <section class="sp1_pa_tasks">
            {{-- card --}}
            @forelse($authorization_action as $value)
            <div class="py-3 border-bottom" style="border-color: #eef2f8;">
                <div class="row">
                    <div class="col-12 col-lg-9">
                        <h6>{{ $value->title }}</h6>
                        @if(is_null($value->project))
                        {{dd($value)}}
                        @endif
                        <p class="sp1_pa_text">
                            @php
                                $description = '"<a href="'.$value->link.'">'.Str::title(Str::snake(class_basename($value->model_name), ' ')) .'</a> for project <a href="'.route('projects.show', $value->project_id).'">'.$value->project->project_name.'</a> (PM: <a href="'.route('employees.show', $value->project->pm_id).'">'.$value->project->pm->name.'</a>) from Client: <a href="'.route('clients.show', $value->project->client_id).'">'.$value->project->client->name.'</a> needs to be authorized"';
                            @endphp
                            {!! $description !!}
                        </p>
                        @if (request()->query('tab') != 'past')
                            <div class="d-flex align-items-center flex-wrap">
                                @if (in_array('review', $value->status_options))
                                    @if ($value->type == 'award_time_extension')
                                        <a href="{{ route('award_time_check.index') }}" class="sp1_pa_nav_link mb-2 mr-2" target="_blank">Approve</a>
                                    @else
                                        <button data-id="{{ $value->id }}" data-mode="review" class="sp1_pa_nav_link mb-2 mr-2">
                                            <a href="{{ $value->link }}" target="_blank">Review</a>
                                        </button>
                                    @endif
                                @endif

                                @if (in_array('approved', $value->status_options))
                                    @if ($value->type == 'deliverable_modification_by_top_managment' || $value->type == 'deliverable_modification_by_client')
                                        <a href="{{ $value->link }}" class="sp1_pa_nav_link mb-2 mr-2" target="_blank">Approve</a>
                                    @else
                                        <button data-id="{{ $value->id }}" data-description="{{ $description }}" data-title="{{ $value->title }}" data-mode="approved" class="sp1_pa_nav_link mb-2 mr-2 pending_action">Approve</button>
                                    @endif
                                @endif

                                @if (in_array('reject', $value->status_options))
                                    <button data-id="{{ $value->id }}" data-description="{{ $description }}" data-title="{{ $value->title }}" data-mode="deny" class="sp1_pa_nav_link mb-2 mr-2 pending_action">Deny</button>
                                @endif
                                @if (in_array('request_modification', $value->status_options))
                                    <button data-id="{{ $value->id }}" data-description="{{ $description }}" data-title="{{ $value->title }}" data-mode="request_modification" class="sp1_pa_nav_link mb-2 mr-2 pending_action">Request Modifications</button>
                                @endif
                            </div>
                        @endif
                        
                        @if (request()->query('tab') == 'past')
                            <p class="sp1_pa_text">
                                Authorized By: <a href="#">{{$value->authorization->name}}</a> at <i class="bi bi-stopwatch-fill"></i> {{\Carbon\Carbon::parse($value->approved_at)->format('h:iA')}} <i class="bi bi-calendar-event-fill"></i> {{\Carbon\Carbon::parse($value->approved_at)->format('F j, y')}} 
                            </p>
                        @endif
                        
                    </div>

                    <div class="col-12 col-lg-3">
                        <div class="d-flex d-lg-block ">
                            <div class="sp1_pa_time_item ml-lg-auto mr-2 mr-lg-0 mb-2">
                                <i class="bi bi-stopwatch-fill"></i>
                                <div>
                                    <span class="d-block">{{ $value->created_at->format('H:i A') }}</span>
                                    <span class="d-block">{{ $value->created_at->format('F d, y') }}</span>
                                </div>
                            </div>

                            {{-- <div class="sp1_pa_time_item ml-lg-auto">
                                <i class="bi bi-hourglass-split"></i>
                                <div>
                                    <span class="d-block">Time Left</span>
                                    <span class="d-block">
                                        06:20:10
                                    </span>
                                </div>
                            </div> --}}
                        </div>
                    </div>
                </div>
            </div>
            @empty
            <div class="row mx-auto mt-3">
                <span class="badge badge-warning">No Data !!</span>
            </div>
            @endforelse
            <div class="row ml-auto mt-3">
                {{ $authorization_action->links() }}       
            </div>
        </section>
        

        {{-- <nav aria-label="PaginationGroupButtons" class="mt-3">
            <ul class="pagination justify-content-end">
                <li class="page-item disabled">
                    <span class="page-link">Previous</span>
                </li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item active">
                    <span class="page-link">
                        2
                        <span class="sr-only">(current)</span>
                    </span>
                </li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                    <a class="page-link" href="#">Next</a>
                </li>
            </ul>
        </nav> --}}
    </section>
</section>
<div class="modal fade" id="pending_action_comment_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="pending_aciton_title"></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            </div>
            <div class="modal-body">
                <form>
                    <input type="hidden" id="pending_action_id" name="id" value="">
                    <input type="hidden" class="action_mode" name="mode" value="">
                    <div class="card">
                        <div class="card-body" id="peinding_action_description"></div>
                    </div>
                    <div class="form-group">
                        <label for="message-text" class="col-form-label">Message:</label>
                        <textarea class="form-control" id="message-text"></textarea>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" id="action_mode"></button>
            </div>
        </div>
    </div>
</div>
@endsection
@push('scripts')
<script>
    $(document).ready(function() {
        var debounceTimer;

        $('#action_mode').click(function(e) {
            e.preventDefault();
            var id = $('#pending_action_id').val();
            var mode = $('.action_mode').val();

            var url = '{{ route('pending-action.update', ':id') }}';
            url = url.replace(':id', id);

            $.easyAjax({
                disableButton: true,
                buttonSelector: "#action_mode",
                url: url,
                type: 'PUT',
                //disableButtonText: 'Processing...',
                data: {
                    _token: '{{ csrf_token() }}',
                    id: id,
                    description: $('#message-text').val(),
                    method: 'put',
                    mode: mode,
                },
                beforeSend: function() {
                    // Change the button text to 'Processing...' when the request is sent
                    $('#action_mode').text('Processing...');
                    $('#action_mode').attr('disabled', 'disabled');
                },
                success: function(resp) {
                    if(resp.type == 'redirect') {
                        window.open(resp.url, '_blank');
                    } else if(resp.status == 'success' || resp.success == true) {
                        window.location.reload();
                    }
                }
            })
        });

        $('.pending_action').click(function(e) {
            e.preventDefault();
            $('#pending_action_id').val($(this).data('id'));
            $('#pending_aciton_title').text($(this).data('title'));
            $('#peinding_action_description').html($(this).data('description'));
            $('#action_mode').text($(this).data('mode'));
            $('.action_mode').val($(this).data('mode'));
            $('#pending_action_comment_modal').modal('show');
        })

        $(function() {
            var format = 'YYYY-MM-DD';
            var startDate = "{{ \Carbon\Carbon::now()->subMonth(1)->format('Y-m-d') }}";
            var endDate = "{{ \Carbon\Carbon::now()->format('Y-m-d') }}";
            var picker = $('#datatableRange_pending_action');
            var start = moment(startDate, format);
            var end = moment(endDate, format);

            function cb_pending_action(start, end) {
                var startDateParam = start.format('YYYY-MM-DD');
                var endDateParam = end.format('YYYY-MM-DD');

                $('#datatableRange_pending_action').val(moment(start).format('DD-MM-YYYY') + ' To ' + end.format( 'DD-MM-YYYY'));
                $('#reset-filters').removeClass('d-none');

                // Get the current URL
                var currentUrl = window.location.href;
                // Check if the URL already contains query parameters
                var hasQueryParams = currentUrl.indexOf('?') !== -1;

                // Construct the start_date and end_date query parameters
                var queryParams = 'start_date=' + startDateParam + '&end_date=' + endDateParam;

                // Remove any existing start_date and end_date query parameters from the URL
                currentUrl = currentUrl.replace(/(&|\?)start_date=\d{4}-\d{2}-\d{2}(&|&amp;)end_date=\d{4}-\d{2}-\d{2}/g, '');

                // Construct the updated URL based on whether there are existing query parameters
                var updatedUrl = hasQueryParams ? currentUrl + '&' + queryParams : currentUrl + '?' + queryParams;
                // Redirect to the updated URL or perform further actions with the updated URL
                window.location.href = updatedUrl;
            }

            $('#datatableRange_pending_action').daterangepicker({
                locale: daterangeLocale,
                linkedCalendars: false,
                startDate: start,
                endDate: end,
                ranges: daterangeConfig,
                opens: 'left',
                parentEl: '.dashboard-header',
            }, cb_pending_action);
        });
        
        $('#search-input').on('input', function() {
            clearTimeout(debounceTimer);

            debounceTimer = setTimeout(function() {
                var searchTerm = $.trim($('#search-input').val());

                var currentUrl = window.location.href;
                var newUrl;

                // Update or add the 'search' parameter
                if (currentUrl.includes('?')) {
                    newUrl = currentUrl.replace(/(search=)[^\&]+/, '$1' + searchTerm);
                } else {
                    newUrl = currentUrl + '?search=' + searchTerm;
                }

                // Redirect to the new URL
                window.location.href = newUrl;
            }, 500);
        });


        $('#per_page').change(function() {
            var searchTerm = $('#per_page').val();
            var currentUrl = window.location.href;
            var params = {
                per_page: searchTerm,
            };
            var serializedParams = $.param(params);
            var newUrl = currentUrl + (currentUrl.indexOf('?') === -1 ? '?' : '&') + serializedParams;
            // Redirect to the new URL
            window.location.href = newUrl;
        })
    })
</script>
@endpush
