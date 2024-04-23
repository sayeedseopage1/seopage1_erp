@php
    $pmGoal = App\Models\ProjectPmGoal::where('id',$project_status)->first();
    $project = App\Models\Project::where('id',$pmGoal->project_id)->first();
    $client = App\Models\User::where('id',$pmGoal->client_id)->first();
@endphp
<div id="holiday-detail-section">
    <div class="row">
        <div class="col-sm-12">
            <div class="card bg-white border-0 b-shadow-4">
                <div class="card-header bg-white  border-bottom-grey text-capitalize justify-content-between p-20">
                    <div class="row">
                        <div class="col-lg-10 col-10">
                            <h3 class="heading-h1 mb-3">Goal Details</h3>
                        </div>
                        <div class="col-lg-2 col-2 text-right">
                            {{-- @if (
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
                            @endif --}}
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="col-12 px-0 pb-3 d-lg-flex d-md-flex d-block">
                        <p class="mb-0 text-lightest f-14 w-30 text-capitalize">Project Name</p>
                        <div class="mb-0 text-dark-grey f-14 w-70 text-wrap p-0"><a href="{{route('projects.show',$project->id)}}">{{$project->project_name}}</a></div>
                    </div>
                    <div class="col-12 px-0 pb-3 d-lg-flex d-md-flex d-block">
                        <p class="mb-0 text-lightest f-14 w-30 text-capitalize">Client</p>
                        <div class="mb-0 text-dark-grey f-14 w-70 text-wrap p-0"><a href="{{route('clients.show',$client->id)}}">{{$client->name}}</a></div>
                    </div>
                    <x-cards.data-row :label="__('Goal Name')" :value="$pmGoal->goal_name" html="true" />
                    <x-cards.data-row :label="__('Goal Start Date')" :value="$pmGoal->goal_start_date" html="true" />
                    <x-cards.data-row :label="__('Goal Deadline')" :value="$pmGoal->goal_end_date" html="true" />
                    <x-cards.data-row :label="__('Duration')" :value="$pmGoal->duration . ' Days'" html="true" />
                    {{-- <x-cards.data-row :label="__('Suggestion')" :value="$pmGoal->suggestion??'--'" html="true" /> --}}
                </div>
            </div>
        </div>
    </div>
</div>

{{-- <script>
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
</script> --}}