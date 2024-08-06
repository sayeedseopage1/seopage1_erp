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
        <x-forms.link-primary :link="route('sticky-notes.create')" class="mr-3 float-left" icon="plus">
            @lang('modules.sticky.addNote')
        </x-forms.link-primary>
        <a href="{{ route('sticky-notes.predefined') }}" class="btn-secondary rounded f-14 p-2 mr-3 float-left">
            <i class="fa fa-plus mr-1"></i>Add Predefined Notes
        </a>
        <a href="{{ route('sticky-notes.index', ['status' => 'Completed']) }}" class="btn-success rounded f-14 p-2 mr-3 float-left">
            <i class="fa fa-check-circle mr-1"></i>Completed
        </a>
        <a href="{{ route('sticky-notes.index', ['status' => 'Deleted']) }}" class="btn-warning rounded f-14 p-2 mr-3 float-left">
            <i class="fa fa-trash mr-1"></i>Deleted
        </a>
    </div>
</div>

<div class="row mt-4 sticky-notes-data">
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

    // Mark as complete
    $('body').on('click', '.mark-as-complete', function() {
        var id = $(this).data('note-id');
        console.log(id);
        Swal.fire({
            title: "@lang('messages.sweetAlertTitle')",
            icon: 'warning',
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: "Yes Mark as Complete",
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
                var url = "{{ route('sticky-notes.mark-as-complete', ':id') }}";
                url = url.replace(':id', id);

                var token = "{{ csrf_token() }}";

                $.easyAjax({
                    type: 'POST',
                    url: url,
                    data: {
                        '_token': token,
                        '_method': 'GET'
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
