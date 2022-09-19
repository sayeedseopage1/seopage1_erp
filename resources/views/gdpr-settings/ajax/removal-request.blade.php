<div class="col-lg-12 col-md-12 ntfcn-tab-content-left w-100 p-4 ">
    <div class="row">
            <!-- Task Box Start -->
            <div class="d-flex flex-column w-tables w-100">
                {!! $dataTable->table(['class' => 'table table-hover border-0 w-100']) !!}
            </div>
            <!-- Task Box End -->
    </div>
</div>

@include('sections.datatable_js')

<script>

    const showTable = () => {
        window.LaravelDataTables["removal-request-customer"].draw();
    }

    $('body').on('click', '.table-action', function() {
        var id = $(this).data('consent-id');
        var type = $(this).data('type');

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
                var url = "{{ route('gdpr.customer.approve_reject', [':id', ':type']) }}";
                url = url.replace(':id', id);
                url = url.replace(':type', type);

                var token = "{{ csrf_token() }}";

                $.easyAjax({
                    type: 'GET',
                    url: url,
                    blockUI: true,
                    data: {
                        '_token': token,
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
