@switch($stickyNotes->colour)
    @case('green')
        @php
            $colour = 'dark-green';
        @endphp
    @break
    @case('purple')
        @php
            $colour = 'dark-grey';
        @endphp
    @break
    @default
        @php
        $colour = $stickyNotes->colour;
        @endphp

@endswitch
<div id="notice-detail-section">
    <div class="row">
        <div class="col-sm-12">
            <div class="card bg-white border-0 b-shadow-4">
                <div class="card-header bg-white  border-bottom-grey text-capitalize justify-content-between p-20">
                    <div class="row">
                        <div class="col-10">
                            <h3 class="heading-h1 mb-3">@lang('app.note') @lang('app.details')</h3>
                        </div>
                        <div class="col-2 text-right">
                            <div class="dropdown">
                                <button
                                    class="btn btn-lg f-14 px-2 py-1 text-dark-grey text-capitalize rounded  dropdown-toggle"
                                    type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fa fa-ellipsis-h"></i>
                                </button>
                                @if($stickyNotes->status == 'Live')
                                <div class="dropdown-menu dropdown-menu-right border-grey rounded b-shadow-4 p-0"
                                    aria-labelledby="dropdownMenuLink" tabindex="0">
                                    <a class="dropdown-item"
                                        href="{{ route('sticky-notes.edit', $stickyNotes->id) }}">@lang('app.edit')</a>
                                    <a class="dropdown-item delete-snote"
                                        data-note-id="{{ $stickyNotes->id }}">@lang('app.delete')</a>
                                </div>
                                @endif
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body">

                    <x-cards.data-row :label="__('modules.sticky.colors')"
                        value="<i class='fa fa-square f-21 mr-2 text-{{ $colour }}'></i>" html="true" />
                    @if (Auth::user()->role_id == 4 || Auth::user()->role_id == 6 || Auth::user()->role_id == 5 || Auth::user()->role_id == 1 || Auth::user()->role_id == 8 || Auth::user()->role_id == 7 || Auth::user()->role_id == 9 || Auth::user()->role_id == 10)
                    <x-cards.data-row :label="__('Note Type')" :value="$stickyNotes->note_type" html="true" />
                    @if($stickyNotes->client_id)   
                    <x-cards.data-row :label="__('Client')" :value="$stickyNotes->client->name" html="true" />
                    @endif
                    @if($stickyNotes->project_id)   
                    <x-cards.data-row :label="__('Project')" :value="$stickyNotes->project->project_name" html="true" />
                    @endif
                    @if($stickyNotes->milestone_id)
                    <x-cards.data-row :label="__('Milestone')" :value="$stickyNotes->milestone->milestone_title" html="true" />
                    @endif
                    @if($stickyNotes->task_id)  
                    <x-cards.data-row :label="__('Task')" :value="$stickyNotes->task->heading" html="true" />
                    @endif
                    @if($stickyNotes->sub_task_id)  
                    <x-cards.data-row :label="__('Subtask')" :value="$stickyNotes->subtask->title" html="true" />
                    @endif
                    @if($stickyNotes->deal_id)  
                    <x-cards.data-row :label="__('Deal')" :value="$stickyNotes->deal->project_name" html="true" />
                    @endif
                    @if($stickyNotes->won_deal_id)  
                    <x-cards.data-row :label="__('Won Deal')" :value="$stickyNotes->won_deal->project_name" html="true" />
                    @endif
                    @endif
                    <x-cards.data-row :label="__('You will receive a reminder at')" :value="\Carbon\Carbon::parse($stickyNotes->reminder_at)->format('d-m-Y H:i A')" html="true" />
                    <x-cards.data-row :label="__('app.note')" :value="$stickyNotes->note_text" html="true" />
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    $('body').on('click', '.delete-snote', function() {
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
                var url = "{{ route('sticky-notes.destroy', $stickyNotes->id) }}";

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
