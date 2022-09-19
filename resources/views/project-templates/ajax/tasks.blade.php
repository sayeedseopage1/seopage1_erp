<!-- ROW START -->
<div class="row py-5">
    <div class="col-lg-12 col-md-12 mb-4 mb-xl-0 mb-lg-4">
        <!-- Add Task Export Buttons Start -->
        <div class="d-flex" id="table-actions">
            <x-forms.link-primary :link="route('project-template-task.create').'?project_id='.$template->id"
                class="mr-3 openRightModal" icon="plus">
                @lang('app.add')
                @lang('app.task')
            </x-forms.link-primary>

        </div>
        <!-- Add Task Export Buttons End -->
        <form action="" id="filter-form">
            <div class="d-flex my-3">

                <!-- SEARCH BY TASK START -->
                <div class="select-box py-2 px-0 mr-3">

                    <div class="input-group bg-grey rounded">
                        <div class="input-group-prepend">
                            <span class="input-group-text bg-additional-grey">
                                <i class="fa fa-search f-13 text-dark-grey"></i>
                            </span>
                        </div>
                        <input type="text" class="form-control f-14 p-1 height-35 border" id="search-text-field"
                            placeholder="@lang('app.startTyping')">
                    </div>
                </div>
                <!-- SEARCH BY TASK END -->

                <!-- RESET START -->
                <div class="select-box d-flex py-1 px-lg-2 px-md-2 px-0">
                    <x-forms.button-secondary class="btn-xs d-none" id="reset-filters" icon="times-circle">
                        @lang('app.clearFilters')
                    </x-forms.button-secondary>
                </div>
                <!-- RESET END -->
            </div>
        </form>


        <!-- Task Box Start -->
        <div class="d-flex flex-column w-tables rounded mt-3 bg-white">

            {!! $dataTable->table(['class' => 'table table-hover border-0']) !!}

        </div>
        <!-- Task Box End -->

    </div>

</div>
<!-- ROW END -->
@include('sections.datatable_js')

<script>
    $('#allTasks-table').on('preXhr.dt', function(e, settings, data) {

        var projectID = "{{ $template->id }}";
        var searchText = $('#search-text-field').val();
        data['projectId'] = projectID;
        data['searchText'] = searchText;
    });
    const showTable = () => {
        window.LaravelDataTables["allTasks-table"].draw();
    }

    $('#status, #search-text-field')
        .on('change keyup',
            function() {
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
        $('#filter-form .select-picker').val('all');
        $('#filter-form #status').val('not finished');
        $('#filter-form .select-picker').selectpicker("refresh");
        $('#reset-filters').addClass('d-none');
        showTable();
    });

    $('body').on('click', '.delete-table-row', function() {
        var id = $(this).data('user-id');
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
                var url = "{{ route('project-template-task.destroy', ':id') }}";
                url = url.replace(':id', id);

                var token = "{{ csrf_token() }}";

                $.easyAjax({
                    type: 'POST',
                    url: url,
                    data: {
                        '_token': token,
                        '_method': 'DELETE'
                    },
                    success: function(response) {
                        if (response.status == "success") {
                            showTable();
                        }
                    }
                });
            }
        });
    });

</script>
