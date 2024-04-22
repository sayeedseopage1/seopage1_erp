@extends('layouts.app')
@push('datatable-styles')
    @include('sections.datatable_css')
@endpush
@section('filter-section')
    <x-filters.filter-box>
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
        {{-- <div class="align-items-center border-right-grey px-0 py-1">
            <div class="col-auto">
                <label class="sr-only" for="inlineFormInputGroup"></label>
                <div class="border input-group rounded">
                    <div class="input-group-prepend">
                        <div class="input-group-text">  <i class="fa fa-calendar-alt mr-2 f-14 text-dark-grey"></i></div>
                    </div>
                    <input type="text" class="position-relative text-dark form-control border-0 p-2 text-left f-14 f-w-500" id="datatableRange2" placeholder="Start Date And End Date">
               </div>
            </div>
        </div> --}}

        <!-- RESET START -->
        <div class="select-box d-flex py-1 px-lg-2 px-md-2 px-0">
            <x-forms.button-secondary class="btn-xs d-none" id="reset-filters" icon="times-circle">
                @lang('app.clearFilters')
            </x-forms.button-secondary>
        </div>
        <!-- RESET END -->

    </x-filters.filter-box>
@endsection

@section('content')
    <!-- CONTENT WRAPPER START -->
    <div class="content-wrapper">
        <button type="button" class="btn-primary rounded f-14 mt-5" data-toggle="modal" data-target="#nicheaddmodal">
            <i class="fa fa-plus mr-1"></i>Add Category
        </button>
        <div class="d-flex flex-column w-tables rounded mt-3 bg-white">
                {!! $dataTable->table(['class' => 'table table-hover border-0 w-100']) !!}
        </div>
    </div>
    @include('projects.modals.addnichemodal')
    <!-- CONTENT WRAPPER END -->
@endsection

@push('scripts')
    @include('sections.datatable_js')

    <script>
        $('#project-niche-table').on('preXhr.dt', function(e, settings, data) {

            var searchText = $('#search-text-field').val();

            
            data['searchText'] = searchText;
        });

        const showTable = () => {
            window.LaravelDataTables["project-niche-table"].draw();
        }



        $('#search-text-field').on('change keyup', function() {
           if ($('#search-text-field').val() != "") {
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

    <script>
        $('body').on('click', '.project-niche-modal', function() {
            let id = $(this).data('project-niche-id');
            let searchQuery = "?id=" + id;
            let url = "{{ route('edit-niche-category') }}" + searchQuery;

            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });
    </script>
@endpush