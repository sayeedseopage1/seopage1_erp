@php
$managePermission = user()->permission('manage_emergency_contact');
@endphp

<!-- TAB CONTENT START -->
<div class="tab-pane fade show active mt-5" role="tabpanel" aria-labelledby="nav-email-tab">

    @if ($managePermission == 'all' || ($employee->id == user()->id))
        <div class="d-flex justify-content-between action-bar mb-3">
            <x-forms.link-primary
                class="mr-3 float-left emergency-contacts-btn"
                link="javascript:;"
                icon="plus">
                @lang('app.create') @lang('app.new')
            </x-forms.link-primary>
        </div>
    @endif

    <x-cards.data :title="__('modules.emergencyContact.emergencyContact')">

        <div class="table-responsive">
            <x-table class="table-bordered">
                <x-slot name="thead">
                    <th>@lang('app.name')</th>
                    <th>@lang('app.email')</th>
                    <th>@lang('app.mobile')</th>
                    <th>@lang('app.relationship')</th>
                    <th class="text-right">@lang('app.action')</th>
                </x-slot>

               @forelse ($employee->emergencyContacts as $count => $contact)
                    <tr class="tableRow{{$contact->id}}">
                        <td>{{ $contact->name }}</td>
                        <td>{{ $contact->email }}</td>
                        <td>{{ $contact->mobile }}</td>
                        <td>{{ $contact->relation }}</td>
                        <td class="text-right">

                            <div class="task_view">

                                <div class="dropdown">
                                    <a class="task_view_more d-flex align-items-center justify-content-center dropdown-toggle" type="link"
                                        id="dropdownMenuLink-{{$count}}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-boundary="viewport">
                                        <i class="icon-options-vertical icons"></i>
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink-{{$count}}" tabindex="0">

                                        @if ($managePermission == 'all')
                                            <a href="javascript:;" class="dropdown-item show-contact" data-contact-id="{{ $contact->id }}"><i class="fa fa-eye mr-2"></i>@lang('app.view')</a>

                                            <a class="dropdown-item edit-contact" href="javascript:;" data-contact-id="{{ $contact->id }}">
                                                <i class="fa fa-edit mr-2"></i>
                                                @lang('app.edit')
                                            </a>

                                            <a class="dropdown-item delete-table-row" href="javascript:;" data-row-id="{{ $contact->id }}">
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
        </div>

    </x-cards.data>
</div>
<!-- TAB CONTENT END -->

<script>

    $('body').on('click', '.delete-table-row', function() {
        var id = $(this).data('row-id');
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
                var url = "{{ route('emergency-contacts.destroy', ':id') }}";
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
                            $('.tableRow'+id).hide();
                        }
                    }
                });
            }
        });
    });

    // Add new emergency contact modal
    $('body').on('click', '.emergency-contacts-btn', function() {
        var url = "{{ route('emergency-contacts.create') }}?user_id="+"{{ $employee->id }}";

        $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
        $.ajaxModal(MODAL_LG, url);
    });

    // Edit emergency contact modal
    $('body').on('click', '.edit-contact', function() {
        var id = $(this).data('contact-id');

        var url = "{{ route('emergency-contacts.edit', ':id') }}";
        url = url.replace(':id', id);

        $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
        $.ajaxModal(MODAL_LG, url);
    });

    // Show emergency contact modal
    $('body').on('click', '.show-contact', function() {
        var id = $(this).data('contact-id');

        var url = "{{ route('emergency-contacts.show', ':id') }}";
        url = url.replace(':id', id);

        $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
        $.ajaxModal(MODAL_LG, url);
    });
</script>
