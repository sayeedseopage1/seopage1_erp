@php
$addLeadFollowUpPermission = user()->permission('add_lead_follow_up');
$viewLeadFollowUpPermission = user()->permission('view_lead_follow_up');
$editLeadFollowUpPermission = user()->permission('edit_lead_follow_up');
$deleteLeadFollowUpPermission = user()->permission('delete_lead_follow_up');
@endphp

<!-- ROW START -->
<div class="row">
    <!--  USER CARDS START -->
    <div class="col-xl-12 col-lg-12 col-md-12 mb-4 mb-xl-0 mb-lg-4 mb-md-0">

        @if (($addLeadFollowUpPermission == 'all' || $addLeadFollowUpPermission == 'added') && $lead->next_follow_up == 'yes')
            <x-forms.button-primary icon="plus" id="add-lead-followup" class="type-btn mb-3">
                @lang('modules.followup.newFollowUp')
            </x-forms.button-primary>
        @endif

        @if ($viewLeadFollowUpPermission == 'all' || $viewLeadFollowUpPermission == 'added')
            <x-cards.data :title="__('modules.lead.followUp')"
                otherClasses="border-0 p-0 d-flex justify-content-between align-items-center table-responsive-sm">
                <x-table class="border-0 pb-3 admin-dash-table table-hover">

                    <x-slot name="thead">
                        <th class="pl-20">#</th>
                        <th>@lang('app.createdOn')</th>
                        <th>@lang('modules.lead.nextFollowUp')</th>
                        <th>@lang('app.remark')</th>
                        <th class="text-right pr-20">@lang('app.action')</th>
                    </x-slot>

                    @forelse($lead->follow as $key => $follow)
                        <tr id="row-{{ $follow->id }}">
                            <td class="pl-20">{{ $key + 1 }}</td>
                            <td>
                                {{ $follow->created_at->timezone(global_setting()->timezone)->format(global_setting()->date_format . ' ' . global_setting()->time_format) }}
                            </td>
                            <td>
                                {{ $follow->next_follow_up_date->format(global_setting()->date_format . ' ' . global_setting()->time_format) }}
                            </td>
                            <td>
                                {!! $follow->remark != '' ? ucfirst(nl2br($follow->remark)) : '--' !!}
                            </td>
                            <td class="text-right pr-20">
                                <div class="task_view">
                                    <div class="dropdown">
                                        <a class="task_view_more d-flex align-items-center justify-content-center dropdown-toggle"
                                            type="link" id="dropdownMenuLink-3" data-toggle="dropdown"
                                            aria-haspopup="true" aria-expanded="false">
                                            <i class="icon-options-vertical icons"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-right">
                                            @if ($editLeadFollowUpPermission == 'all' || ($editLeadFollowUpPermission == 'added' && $follow->added_by == user()->id))
                                                <a class="dropdown-item edit-lead-followup"
                                                    data-follow-id="{{ $follow->id }}" href="javascript:;">
                                                    <i class="fa fa-edit mr-2"></i>
                                                    @lang('app.edit')
                                                </a>
                                            @endif
                                            @if ($deleteLeadFollowUpPermission == 'all' || ($deleteLeadFollowUpPermission == 'added' && $follow->added_by == user()->id))
                                                <a class="dropdown-item delete-table-row" href="javascript:;"
                                                    data-follow-id="{{ $follow->id }}">
                                                    <i class="fa fa-trash mr-2"></i>
                                                    @lang('app.delete')
                                                </a>
                                            @endif
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="5">
                                <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
                            </td>
                        </tr>
                    @endforelse
                </x-table>
            </x-cards.data>
        @endif

    </div>
    <!--  USER CARDS END -->
</div>
<!-- ROW END -->

<script>
    // Delete lead followup
    $('body').on('click', '.delete-table-row', function() {
        var id = $(this).data('follow-id');
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
                var url = "{{ route('leads.follow_up_delete', ':id') }}";
                url = url.replace(':id', id);

                var token = "{{ csrf_token() }}";

                $.easyAjax({
                    type: 'POST',
                    url: url,
                    blockUI: true,
                    data: {
                        '_token': token,
                    },
                    success: function(response) {
                        if (response.status == "success") {
                            window.location.reload();
                        }
                    }
                });
            }
        });
    });

    $('#add-lead-followup').click(function() {
        const url = "{{ route('leads.follow_up', $leadId) }}";
        $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
        $.ajaxModal(MODAL_LG, url);
    })

    $('.edit-lead-followup').click(function() {
        var id = $(this).data('follow-id');
        var url = "{{ route('leads.follow_up_edit', ':id') }}";
        url = url.replace(':id', id);
        $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
        $.ajaxModal(MODAL_LG, url);
    });
</script>
