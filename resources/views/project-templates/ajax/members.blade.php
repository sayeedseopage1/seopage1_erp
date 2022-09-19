<!-- ROW START -->
<div class="row py-5">
    <div class="col-lg-12 col-md-12 mb-4 mb-xl-0 mb-lg-4">
        <x-forms.button-primary icon="plus" id="add-project-member" class="type-btn mb-3">
            @lang('modules.projects.addMemberTitle')
        </x-forms.button-primary>

            <x-cards.data :title="__('modules.projects.members')"
                otherClasses="border-0 p-0 d-flex justify-content-between align-items-center table-responsive-sm">
                <x-table class="border-0 pb-3 admin-dash-table table-hover">

                    <x-slot name="thead">
                        <th class="pl-20">#</th>
                        <th>@lang('app.name')</th>
                        <th class="text-right pr-20">@lang('app.action')</th>
                    </x-slot>

                    @forelse($template->members as $key=>$member)
                        <tr id="row-{{ $member->id }}">
                            <td class="pl-20">{{ $key + 1 }}</td>
                            <td>
                                <x-employee :user="$member->user" />
                            </td>

                            <td class="text-right pr-20">
                                <x-forms.button-secondary data-row-id="{{ $member->id }}" icon="trash"
                                        class="delete-row">
                                        @lang('app.delete')</x-forms.button-secondary>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="5">
                                <x-cards.no-record icon="user" :message="__('messages.noMemberAddedToProject')" />
                            </td>
                        </tr>
        @endforelse
        </x-table>
        </x-cards.data>
    </div>

</div>
<!-- ROW END -->

<script>
    $('#add-project-member').click(function() {
        const url = "{{ route('project-template-member.create') }}" + "?id={{ $template->id }}";
        $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
        $.ajaxModal(MODAL_LG, url);

    });

    $('.delete-row').click(function() {

        var id = $(this).data('row-id');
        var url = "{{ route('project-template-member.destroy', ':id') }}";
        url = url.replace(':id', id);

        var token = "{{ csrf_token() }}";

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
                $.easyAjax({
                    type: 'POST',
                    url: url,
                    data: {
                        '_token': token,
                        '_method': 'DELETE'
                    },
                    success: function(response) {
                        if (response.status == "success") {
                            $('#row-' + id).fadeOut();
                        }
                    }
                });
            }
        });

    });

</script>
