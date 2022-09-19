<div class="col-lg-12 col-md-12 w-100 p-4 ">
    <div class="row">

            <!-- Task Box Start -->
            <div class="d-flex flex-column w-tables w-100">

                {!! $dataTable->table(['class' => 'table table-hover border-0']) !!}

                <x-datatable.actions>
                <div class="select-status mr-3 pl-3">
                    <select name="action_type" class="form-control select-picker" id="quick-action-type" disabled>
                        <option value="">@lang('app.selectAction')</option>
                        <option value="change-status">@lang('modules.tasks.changeStatus')</option>
                    </select>
                </div>
                <div class="select-status mr-3 d-none quick-action-field" id="change-status-action">
                    <select name="status" id="status" class="form-control select-picker">
                        <option value="approved">@lang('app.approve')</option>
                        <option value="rejected">@lang('app.reject')</option>
                    </select>
                </div>
            </x-datatable.actions>

            </div>
            <!-- Task Box End -->

    </div>
</div>

@include('sections.datatable_js')

<script>

    const showTable = () => {
        window.LaravelDataTables["removal-request-customer"].draw();
    }

    $('#quick-action-type').change(function() {
        const actionValue = $(this).val();
        if (actionValue != '') {
            $('#quick-action-apply').removeAttr('disabled');

            if (actionValue == 'change-status') {
                $('.quick-action-field').addClass('d-none');
                $('#change-status-action').removeClass('d-none');
            } else {
                $('.quick-action-field').addClass('d-none');
            }
        } else {
            $('#quick-action-apply').attr('disabled', true);
            $('.quick-action-field').addClass('d-none');
        }
    });

    $('#quick-action-apply').click(function() {
        const actionValue = $('#quick-action-type').val();
        if (actionValue == 'delete') {
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
                    applyQuickAction();
                }
            });

        } else {
            applyQuickAction();
        }
    });

    const applyQuickAction = () => {
        const rowdIds = $("#removal-request-customer input:checkbox:checked").map(function() {
            return $(this).val();
        }).get();

        const url = "{{ route('gdpr_settings.apply_quick_action') }}?row_ids=" + rowdIds;

        const token = "{{ csrf_token() }}";
        const status = $('#status').val();
        const action_type = $('#quick-action-type').val();

        $.easyAjax({
            url: url,
            container: '#editSettings',
            type: "POST",
            disableButton: true,
            buttonSelector: "#quick-action-apply",
            data: {
                status: status,
                action_type: action_type,
                _token: token
            },
            success: function(response) {
                if (response.status == 'success') {
                    showTable();
                    deSelectAll();
                }
            }
        })
    };

</script>
