<div class="col-lg-12 col-md-12 ntfcn-tab-content-left w-100 p-4 ">

    <!-- Add Task Export Buttons Start -->
    <div class="d-block d-lg-flex d-md-flex justify-content-between action-bar">
        <div id="table-actions" class="flex-grow-1 align-items-center">
            <x-forms.button-primary id="add-consent" icon="plus" class="mr-3 float-left mb-2 mb-lg-0 mb-md-0">@lang('app.add')
                @lang('app.menu.consent')</x-forms.button-primary>
        </div>

        <x-datatable.actions>
            <div class="select-status mr-3 pl-3">
                <select name="action_type" class="form-control select-picker" id="quick-action-type" disabled>
                    <option value="">@lang('app.selectAction')</option>
                    <option value="delete">@lang('app.delete')</option>
                </select>
            </div>
        </x-datatable.actions>
    </div>
    <!-- Add Task Export Buttons End -->

    <div class="row">
        {!! $dataTable->table(['class' => 'table table-hover border-0 w-100 table-sm-responsive']) !!}
    </div>

</div>

@include('sections.datatable_js')

<script>
    const showTable = () => {
        window.LaravelDataTables["consent-table"].draw();
    }

    $('#quick-action-type').change(function() {
        const actionValue = $(this).val();
        if (actionValue != '') {
            $('#quick-action-apply').removeAttr('disabled');

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

    $('body').on('click', '.delete-table-row', function() {
        var id = $(this).data('consent-id');

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
                var url = "{{ route('gdpr_settings.purpose_delete', ':id') }}";
                url = url.replace(':id', id);

                var token = "{{ csrf_token() }}";

                $.easyAjax({
                    type: 'POST',
                    url: url,
                    blockUI: true,
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

    const applyQuickAction = () => {
        const rowdIds = $("#consent-table input:checkbox:checked").map(function() {
            return $(this).val();
        }).get();

        const action_type = $('#quick-action-type').val();

        const url = "{{ route('gdpr_settings.apply_quick_action') }}?row_ids=" + rowdIds;

        const token = "{{ csrf_token() }}";

        $.easyAjax({
            url: url,
            container: '#quick-action-form',
            type: "POST",
            disableButton: true,
            buttonSelector: "#quick-action-apply",
            data: {
                '_token': token,
                'action_type': action_type
            },
            blockUI: true,
            success: function(response) {
                if (response.status == 'success') {
                    showTable();
                    resetActionButtons();
                    deSelectAll();
                }
            }
        })
    };

    $(body).on('click', '#add-consent', function() {
        const url = "{{ route('gdpr.add_consent') }}";
        $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
        $.ajaxModal(MODAL_LG, url);
    })

    $(body).on('click', '.edit-consent', function() {

        const consentID = $(this).data('consent-id');

        var url = "{{ route('gdpr.edit_consent', ':id') }}";
        url = url.replace(':id', consentID);

        $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
        $.ajaxModal(MODAL_LG, url);
    })
</script>
