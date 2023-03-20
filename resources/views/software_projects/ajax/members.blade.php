@php
$addProjectMemberPermission = user()->permission('add_project_members');
$viewProjectMemberPermission = user()->permission('view_project_members');
$editProjectMemberPermission = user()->permission('edit_project_members');
$deleteProjectMemberPermission = user()->permission('delete_project_members');
$viewProjectHourlyRatePermission = user()->permission('view_project_hourly_rates');
@endphp

<!-- ROW START -->
<div class="row py-5">
    <div class="col-lg-12 col-md-12 mb-4 mb-xl-0 mb-lg-4">
        @if (($addProjectMemberPermission == 'all' || $addProjectMemberPermission == 'added' || $project->project_admin == user()->id) && !$project->trashed())
            <x-forms.button-primary icon="plus" id="add-project-member" class="type-btn mb-3">
                @lang('modules.projects.addMemberTitle')
            </x-forms.button-primary>
        @endif

        @if ($viewProjectMemberPermission == 'all')
            <x-cards.data :title="__('modules.projects.members')"
                otherClasses="border-0 p-0 d-flex justify-content-between align-items-center table-responsive-sm">
                <x-table class="border-0 pb-3 admin-dash-table table-hover">

                    <x-slot name="thead">
                        <th class="pl-20">#</th>
                        <th>@lang('app.name')</th>
                        @if ($viewProjectHourlyRatePermission == 'all')
                            <th>@lang('modules.employees.hourlyRate')</th>
                        @endif
                        <th>@lang('app.role') <i class="fa fa-question-circle" data-toggle="popover" data-placement="top" data-content="@lang('modules.projects.projectAdminInfo')" data-html="true" data-trigger="hover"></i></th>
                        <th class="text-right pr-20">@lang('app.action')</th>
                    </x-slot>

                    @forelse($project->members as $key=>$member)
                        <tr id="row-{{ $member->id }}">
                            <td class="pl-20">{{ $key + 1 }}</td>
                            <td>
                                <x-employee :user="$member->user" />
                            </td>
                            @if($viewProjectHourlyRatePermission == 'all')
                                <td>
                                    @if ($editProjectMemberPermission == 'all')
                                        <input type="number" min="0" step=".01"
                                            class="height-35 f-14 p-2 border rounded change-hourly-rate form-control"
                                            value="{{ $member->hourly_rate }}" data-row-id="{{ $member->id }}">
                                    @else
                                        {{ $member->hourly_rate }}
                                    @endif
                                </td>
                            @endif
                            <td>
                                @if ($editProjectMemberPermission == 'all')
                                    <x-forms.radio fieldId="project_admin_{{ $member->user->id }}"
                                        class="assign_role" data-user-id="{{ $member->user->id }}"
                                        :fieldLabel="__('app.projectAdmin')" fieldName="project_admin"
                                        fieldValue="{{ $member->user->id }}"
                                        :checked="($member->user->id == $project->project_admin) ? 'checked' : ''">
                                    </x-forms.radio>
                                @elseif($member->user->id == $project->project_admin)
                                    @lang('app.projectAdmin')
                                @else
                                    --
                                @endif

                            </td>
                            <td class="text-right pr-20">
                                @if ($member->user->id == $project->project_admin
                                && $editProjectMemberPermission == 'all')
                                    <x-forms.button-secondary data-row-id="{{ $member->id }}" icon="times"
                                        class="remove-admin">
                                        @lang('app.remove') @lang('app.projectAdmin')</x-forms.button-secondary>
                                @endif

                                @if ($deleteProjectMemberPermission == 'all')
                                    <x-forms.button-secondary data-row-id="{{ $member->id }}" icon="trash"
                                        class="delete-row">
                                        @lang('app.delete')</x-forms.button-secondary>
                                @endif
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
        @endif
    </div>

</div>
<!-- ROW END -->

<script>
    $('#add-project-member').click(function() {
        const url = "{{ route('project-members.create') }}" + "?id={{ $project->id }}";
        $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
        $.ajaxModal(MODAL_LG, url);

    });

    $('.delete-row').click(function() {

        var id = $(this).data('row-id');
        var url = "{{ route('project-members.destroy', ':id') }}";
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


    $('.change-hourly-rate').blur(function() {
        let id = $(this).data('row-id');
        let value = $(this).val();

        var url = "{{ route('project-members.update', ':id') }}";
        url = url.replace(':id', id);

        var token = "{{ csrf_token() }}";

        $.easyAjax({
            url: url,
            container: '#row-' + id,
            type: "POST",
            blockUI: true,
            data: {
                'hourly_rate': value,
                '_token': token,
                '_method': 'PUT'
            }
        });
    });


    $('body').on('click', '.assign_role', function() {
        var userId = $(this).data('user-id');
        var projectId = '{{ $project->id }}';
        var token = "{{ csrf_token() }}";

        $.easyAjax({
            url: "{{ route('projects.assign_project_admin') }}",
            type: "POST",
            data: {
                userId: userId,
                projectId: projectId,
                _token: token
            },
            blockUI: true,
            container: '.admin-dash-table',
            success: function(response) {
                if (response.status == "success") {
                    window.location.reload();
                }
            }
        });
    });

    $('body').on('click', '.remove-admin', function() {
        var userId = null;
        var projectId = '{{ $project->id }}';
        var token = "{{ csrf_token() }}";

        $.easyAjax({
            url: "{{ route('projects.assign_project_admin') }}",
            type: "POST",
            data: {
                userId: userId,
                projectId: projectId,
                _token: token
            },
            success: function(response) {
                if (response.status == "success") {
                    window.location.reload();
                }
            }
        });

    });
</script>
