<x-filters.filter-box>

    <?php

    $projectStatus= App\Models\ProjectStatus::all();
    ?>
  {{--  <div
        class="select-box d-flex py-2 {{ !in_array('client', user_roles()) ? 'px-lg-2 px-md-2 px-0' : '' }}  border-right-grey border-right-grey-sm-0">
        <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('app.status')</p>
        <div class="select-status">
            <select class="form-control select-picker" name="status" id="status" data-live-search="true" data-size="8">
                <option value="not finished">@lang('modules.projects.hideFinishedProjects')</option>
                <option {{ request('status') == 'all' ? 'selected' : '' }} value="all">@lang('app.all')</option>
                <option {{ request('status') == 'overdue' ? 'selected' : '' }} value="overdue">@lang('app.overdue')
                </option>
                @foreach ($projectStatus as $status)
                    <option value="{{$status->status_name}}">{{ ucfirst($status->status_name) }}</option>
                @endforeach
            </select>
        </div>
    </div> --}}

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
            <label class="f-14 text-dark-grey mb-12 text-capitalize"
                for="usr">@lang('modules.projects.projectCategory')</label>
            <div class="select-filter mb-4">
                <div class="select-others">
                    <select class="form-control select-picker" name="category_id" id="category_id"
                        data-live-search="true" data-container="body" data-size="8">
                        <option selected value="all">@lang('app.all')</option>
                        @foreach ($categories as $category)
                            <option value="{{ $category->id }}">{{ $category->category_name }}</option>
                        @endforeach
                    </select>
                </div>
            </div>
        </div>







    </x-filters.more-filter-box>
    <!-- MORE FILTERS END -->

</x-filters.filter-box>

@push('scripts')
    <script>
    var deadLineStartDate = '';
    var deadLineEndDate = '';

    $('#projects-table').on('preXhr.dt', function(e, settings, data) {

        var status = $('#status').val();
        var clientID = $('#client_id').val();
        var categoryID = $('#category_id').val();


        var searchText = $('#search-text-field').val();

        @if (request('deadLineStartDate') && request('deadLineEndDate'))
            deadLineStartDate = '{{ request("deadLineStartDate") }}';
            deadLineEndDate = '{{ request("deadLineEndDate") }}'
        @endif

        data['status'] = status;
        data['client_id'] = clientID;

        data['category_id'] = categoryID;

        data['deadLineStartDate'] = deadLineStartDate;
        data['deadLineEndDate'] = deadLineEndDate;
        data['searchText'] = searchText;
        @if (!is_null(request('start')) && !is_null(request('end')))
            data['startDate'] = '{{ request('start') }}';
            data['endDate'] = '{{ request('end') }}';
        @endif
    });

    const showTable = () => {
        window.LaravelDataTables["projects-table"].draw();
    }



    $('#client_id, #status, #search-text-field, #employee_id, #team_id, #category_id, #pinned').on('change keyup',
        function() {
            if ($('#status').val() != "not finished") {
                $('#reset-filters').removeClass('d-none');
                showTable();
            } else if ($('#employee_id').val() != "all") {
                $('#reset-filters').removeClass('d-none');
                showTable();
            } else if ($('#team_id').val() != "all") {
                $('#reset-filters').removeClass('d-none');
                showTable();
            } else if ($('#category_id').val() != "all") {
                $('#reset-filters').removeClass('d-none');
                showTable();
            } else if ($('#client_id').val() != "all") {
                $('#reset-filters').removeClass('d-none');
                showTable();
            } else if ($('#pinned').val() != "all") {
                $('#reset-filters').removeClass('d-none');
                showTable();
            } else if ($('#search-text-field').val() != "") {
                $('#reset-filters').removeClass('d-none');
                showTable();
            } else {
                $('#reset-filters').addClass('d-none');
                showTable();
            }
        });

    $('.show-pinned').click(function() {
        if ($(this).hasClass('btn-active')) {
            $('#pinned').val('all');
        } else {
            $('#pinned').val('pinned');
        }

        $('#pinned').selectpicker('refresh');
        $(this).toggleClass('btn-active')
        $('#reset-filters').removeClass('d-none');
        showTable();
    });

    $('#reset-filters').click(function() {
        $('#filter-form')[0].reset();
        $('.filter-box #status').val('not finished');
        $('.filter-box .select-picker').selectpicker("refresh");
        $('#reset-filters').addClass('d-none');
        showTable();
    });

    $('#reset-filters-2').click(function() {
        $('#filter-form')[0].reset();
        $('.filter-box #status').val('not finished');
        $('.filter-box .select-picker').selectpicker("refresh");
        $('#reset-filters').addClass('d-none');
        showTable();
    });

    </script>
@endpush
