@php
$editPermission = user()->permission('edit_holiday');
$deletePermission = user()->permission('delete_holiday');
@endphp
<div id="holiday-detail-section">
    <div class="row">
        <div class="col-sm-12">
            <div class="card bg-white border-0 b-shadow-4">
                <div class="card-header bg-white  border-bottom-grey text-capitalize justify-content-between p-20">
                    <div class="row">
                        <div class="col-lg-10 col-10">
                            <h3 class="heading-h1 mb-3">@lang('app.menu.holiday') @lang('app.details')</h3>
                        </div>
                        <div class="col-lg-2 col-2 text-right">
                            @if (
                                ($editPermission == 'all' || ($editPermission == 'added' && $holiday->added_by == user()->id))
                                || ($deletePermission == 'all' || ($deletePermission == 'added' && $holiday->added_by == user()->id))
                                )
                                <div class="dropdown">
                                    <button
                                        class="btn btn-lg f-14 px-2 py-1 text-dark-grey text-capitalize rounded  dropdown-toggle"
                                        type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fa fa-ellipsis-h"></i>
                                    </button>

                                    <div class="dropdown-menu dropdown-menu-right border-grey rounded b-shadow-4 p-0"
                                        aria-labelledby="dropdownMenuLink" tabindex="0">
                                        @if ($editPermission == 'all' || ($editPermission == 'added' && $holiday->added_by == user()->id))
                                            <a class="dropdown-item openRightModal"
                                            href="{{ route('holidays.edit', $holiday->id) }}">@lang('app.edit')</a>
                                        @endif
                                        @if ($deletePermission == 'all' || ($deletePermission == 'added' && $holiday->added_by == user()->id))
                                            <a class="dropdown-item delete-holiday" >@lang('app.delete')</a>
                                        @endif
                                    </div>
                                </div>
                            @endif
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <x-cards.data-row :label="__('app.date')" :value="$holiday->date->format(global_setting()->date_format)" html="true" />
                    <x-cards.data-row :label="__('modules.holiday.occasion')" :value="$holiday->occassion" html="true" />
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    $('body').on('click', '.delete-holiday', function() {
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
                var url = "{{ route('holidays.destroy', $holiday->id) }}";

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
                            window.location.href = response.redirectUrl;
                        }
                    }
                });
            }
        });
    });
</script>
