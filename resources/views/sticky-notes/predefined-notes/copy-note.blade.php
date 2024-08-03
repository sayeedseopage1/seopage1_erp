@php
    $notes = \App\Models\PredefinedNote::where('user_id', Auth::user()->id)->orderBy('id', 'desc')->get();
@endphp
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
<div class="modal fade" id="noteCopy" tabindex="-1" aria-labelledby="noteAddLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
    <div class="modal-content">
        <div class="modal-header">
        <h5 class="modal-title" id="noteAddLabel">Predefined Notes</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        </div>
        <div class="modal-body">
            <table id="PredefinedNoteTable" class="display" style="width:100%">
                <thead>
                    <tr>
                        <th>Sl No</th>
                        <th>Predefined Note</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($notes as $item)
                    <tr>
                        <td>{{ $loop->iteration }}</td>
                        <td>{{ Str::limit($item->note_text, 50) }}</td>
                        <td>
                            <a class="copyBtn" style="color: black" href="javascript:void(0)" data-note-text="{{ $item->note_text }}">
                                <i class="fa fa-clone mr-2"></i>Copy
                            </a>
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
    </div>
</div>
<script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
<script>
    new DataTable('#PredefinedNoteTable', {
        "dom": 't<"d-flex"l<"ml-auto"ip>><"clear">',
    });

    //copy text
    document.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('.copyBtn').forEach(function(copyButton) {
            copyButton.addEventListener('click', async function(event) {
                var textToCopy = copyButton.getAttribute('data-note-text');
                if (textToCopy) {
                    try {
                        await navigator.clipboard.writeText(textToCopy);
                        toastr.success('Copy successful');
                    } catch (err) {
                        toastr.error('Failed to copy text');
                    }
                } else {
                    toastr.error('No text to copy');
                }
            });
        });
    });
</script>