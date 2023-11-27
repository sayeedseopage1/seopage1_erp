<x-filters.filter-box>
    <!-- DATE START -->
    <div class="select-box d-flex pr-2 border-right-grey border-right-grey-sm-0">
        <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('app.date')</p>
        <div class="select-status d-flex">
            <input type="text" class="position-relative text-dark form-control border-0 p-2 text-left f-14 f-w-500"
                id="datatableRange" placeholder="@lang('placeholders.dateRange')">
        </div>
    </div>
    <!-- DATE END -->

    <!-- CLIENT START -->
   {{-- <div class="select-box d-flex py-2 px-lg-2 px-md-2 px-0 border-right-grey border-right-grey-sm-0">
        <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('modules.invoices.type')</p>
        <div class="select-status">
            <select class="form-control select-picker" name="type" id="type">
                <option value="all">@lang('modules.lead.all')</option>
                <option {{ request('type') == 'lead' ? 'selected' : '' }} value="lead">@lang('modules.lead.lead')
                </option>
                <option {{ request('type') == 'client' ? 'selected' : '' }} value="client">
                    @lang('modules.lead.client')</option>
            </select>
        </div>
    </div> --}}
    <!-- CLIENT END -->

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

    {{--  <div class="more-filter-items">
            <label class="f-14 text-dark-grey mb-12 text-capitalize" for="usr">@lang('app.dateFilterOn')</label>
            <div class="select-filter mb-4">
                <select class="form-control select-picker" name="date_filter_on" id="date_filter_on">
                    <option value="created_at">@lang('app.createdOn')</option>
                    <option value="next_follow_up_date">@lang('modules.lead.nextFollowUp')</option>
                </select>
            </div>
        </div> --}}

      {{--  <div class="more-filter-items">
            <label class="f-14 text-dark-grey mb-12 text-capitalize" for="usr">@lang('modules.lead.followUp')</label>
            <div class="select-filter mb-4">
                <div class="select-others">
                    <select class="form-control select-picker" data-container="body" id="followUp">
                        <option value="all">@lang('modules.lead.all')</option>
                        <option value="yes">@lang('app.yes')</option>
                        <option value="no">@lang('app.no')</option>
                    </select>
                </div>
            </div>
        </div> --}}
            <?php
            $sales_executives= App\Models\User::where('role_id',7)->orWhere('role_id',8)->get();
            ?>
            <div class="more-filter-items">
                <label class="f-14 text-dark-grey mb-12 text-capitalize" for="usr">@lang('Created By')</label>
                <div class="select-filter mb-4">
                    <div class="select-others">
                        <select class="form-control select-picker" data-container="body" id="sales_executive_id">
                             <option>--</option>
                            @foreach($sales_executives as $row) 
                            <option value="{{$row->name}}">{{ucfirst($row->name)}}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
            </div>

            <!-- <div class="more-filter-items">
                <label class="f-14 text-dark-grey mb-12 text-capitalize" for="usr">@lang('Status')</label>
                <div class="select-filter mb-4">
                    <div class="select-others">
                        <select class="form-control select-picker" data-container="body" id="leads_status">
                            <option value="1">Not Converted to Deal</option>
                            <option value="3 ">Converted to Deal  </option>
                        </select>
                    </div>
                </div>
            </div> -->

        {{--  <div class="more-filter-items">
            <label class="f-14 text-dark-grey mb-12 text-capitalize"
                for="usr">@lang('modules.tickets.chooseAgents')</label>
            <div class="select-filter mb-4">
                <div class="select-others">
                    <select class="form-control select-picker" id="filter_agent_id" data-live-search="true" data-container="body" data-size="8">
                        <option value="all">@lang('modules.lead.all')</option>
                        @if ($leadAgents)
                        @foreach ($leadAgents as $emp)
                            <option
                                @if (request('assignee') == 'me' && $emp->user_id == user()->id)
                                    selected
                                @endif
                                data-content="<div class='d-inline-block mr-1'><img class='taskEmployeeImg rounded-circle' src='{{ $emp->user->image_url }}' ></div> {{ ucfirst($emp->user->name) }}"
                                value="{{ $emp->id }}">{{ mb_ucwords($emp->user->name) }}</option>
                        @endforeach
                        @endif
                    </select>
                </div>
            </div>
        </div> --}}

        {{--  <div class="more-filter-items">
            <label class="f-14 text-dark-grey mb-12 text-capitalize"
                for="usr">@lang('modules.lead.leadCategory')</label>
            <div class="select-filter mb-4">
                <div class="select-others">
                    <select class="form-control select-picker" id="filter_category_id" data-live-search="true" data-container="body" data-size="8">
                        <option value="all">@lang('app.all')</option>
                        @foreach ($categories as $category)
                            <option value="{{ $category->id }}">{{ $category->category_name }}</option>
                        @endforeach
                    </select>
                </div>
            </div>
        </div> --}}

      {{--  <div class="more-filter-items">
            <label class="f-14 text-dark-grey mb-12 text-capitalize" for="usr">@lang('modules.lead.leadSource')</label>
            <div class="select-filter mb-4">
                <div class="select-others">
                    <select class="form-control select-picker" id="filter_source_id" data-live-search="true" data-container="body" data-size="8">
                        <option value="all">@lang('app.all')</option>
                        @foreach ($sources as $source)
                            <option value="{{ $source->id }}">{{ $source->type }}</option>
                        @endforeach
                    </select>
                </div>
            </div>
        </div> --}}

    </x-filters.more-filter-box>
    <!-- MORE FILTERS END -->
</x-filters.filter-box>

@push('scripts')
    <script>
        $('#search-text-field, #type, #followUp, #sales_executive_id, #category_id, #filter_source_id, #date_filter_on')
            .on('change keyup', function() {
                if ($('#search-text-field').val() != "") {
                    $('#reset-filters').removeClass('d-none');
                    showTable();
                } else if ($('#type').val() != "all") {
                    $('#reset-filters').removeClass('d-none');
                    showTable();
                } else if ($('#followUp').val() != "all") {
                    $('#reset-filters').removeClass('d-none');
                    showTable();
                } else if ($('#sales_executive_id').val() != "") {
                    $('#reset-filters').removeClass('d-none');
                    showTable();
                } else if ($('#category_id').val() != "all") {
                    $('#reset-filters').removeClass('d-none');
                    showTable();
                } else if ($('#filter_source_id').val() != "all") {
                    $('#reset-filters').removeClass('d-none');
                    showTable();
                } else if ($('#date_filter_on').val() != "created_at") {
                    $('#reset-filters').removeClass('d-none');
                    showTable();
                } else {
                    $('#reset-filters').addClass('d-none');
                    showTable();
                }
            });

        $('#reset-filters').click(function() {
            $('#filter-form')[0].reset();

            $('.filter-box #status').val('not finished');
            $('.filter-box #date_filter_on').val('created_at');
            $('.filter-box .select-picker').selectpicker("refresh");
            $('#reset-filters').addClass('d-none');
            showTable();
        });

        $('#reset-filters-2').click(function() {
            $('#filter-form')[0].reset();

            $('.filter-box #status').val('not finished');
            $('.filter-box #date_filter_on').val('created_at');
            $('.filter-box .select-picker').selectpicker("refresh");
            $('#reset-filters').addClass('d-none');
            showTable();
        });

        $('#sales_executive_id').on('change', function() {
            var sales_emp = $('#sales_executive_id :selected').val();
            $('#search-text-field').val(sales_emp);
            var table = $('#leads-table').DataTable();
            table.draw();
        });

        // $('#leads_status').on('change', function() {
        //     $.easyAjax({
        //         url: '{{route('leads.index')}}',
        //         type: "POST",
        //         data: {
        //             _token: '{{csrf_token()}}',
        //             status: 0
        //         },
        //         success: function(response) {
        //             if (response.status == 'success') {
        //                 showTable();
        //                 // resetActionButtons();
        //                 // deSelectAll();
        //             }
        //         }
        //     })
        // })

        /*$('#leads-table').on('preXhr.dt', function(e, settings, data) {

            var dateRangePicker = $('#datatableRange').data('daterangepicker');
            var startDate = $('#datatableRange').val();

            if (startDate == '') {
                startDate = null;
                endDate = null;
            } else {
                startDate = dateRangePicker.startDate.format('DD-MM-YYYY');
                endDate = dateRangePicker.endDate.format('DD-MM-YYYY');
            }

            var searchText = $('#search-text-field').val();




            var date_filter_on = $('#date_filter_on').val();

            data['startDate'] = startDate;
            data['endDate'] = endDate;
            data['searchText'] = searchText;
            data['status'] = $('#leads_status :selected').val();

            data['date_filter_on'] = date_filter_on;
            // showTable()
        });*/

    </script>
@endpush
