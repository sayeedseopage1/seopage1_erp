<style>
    /* .card-img-overlay {
        visibility: hidden;
    }

    .sticky-note:hover .card-img-overlay {
        visibility: visible; */
    }

</style>

<div class="d-flex">
    <div id="table-actions" class="flex-grow-1 align-items-center">
        <x-forms.link-primary :link="route('sticky-notes.create')" class="mr-3 openRightModal float-left" icon="plus">
            @lang('modules.sticky.addNote')
        </x-forms.link-primary>
    </div>
</div>

<div class="row mt-4">
    @forelse ($stickyNotes as $item)
        <div class="col-sm-12 col-md-6 col-lg-3 mb-4">
            <x-cards.sticky-note :stickyNote="$item" />
        </div>
    @empty
        <x-cards.no-record icon="sticky-note" :message="__('messages.noRecordFound')" />
    @endforelse
</div>

<script>
    $('body').on('click', '.delete-note', function() {
        var id = $(this).data('note-id');
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
                var url = "{{ route('sticky-notes.destroy', ':id') }}";
                url = url.replace(':id', id);

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
