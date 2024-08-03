@extends('layouts.app')

@section('content')
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
    <div class="content-wrapper">
        <div class="card border-0">
            <div class="card-body">
                <div class="row">
                    <div class="col-sm-12">
                        <a href="javascript:void(0)" class="btn-primary rounded f-14 p-2 mr-3 float-left mb-3" data-toggle="modal" data-target="#noteAdd">
                            <i class="fa fa-plus mr-1"></i>Add Note
                        </a>

                        <table id="PredefinedNoteTable" class="display" style="width:100%">
                            <thead>
                                <tr>
                                    <th scope="col">Sl No</th>
                                    <th scope="col">Predefined Note</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($predefinedNotes as $item)
                                <tr>
                                    <td>{{ $loop->iteration }}</td>
                                    <td>{{ Str::limit($item->note_text, 250) }}</td>
                                    <td>
                                        <div class="dropdown">
                                            <button class="btn btn-lg f-14 px-2 py-0 text-dark-grey text-capitalize rounded  dropdown-toggle"
                                                type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i class="fa fa-ellipsis-v"></i>
                                            </button>
                                            <div class="dropdown-menu dropdown-menu-right border-grey rounded b-shadow-4 p-0" aria-labelledby="dropdownMenuLink" tabindex="0">
                                                <a class="dropdown-item copyNote" href="javascript:void(0)" data-note-text="{{ $item->note_text }}">
                                                    <i class="fa fa-clone mr-2"></i>Copy
                                                </a>
                                                <a class="dropdown-item editNote" href="javascript:void(0)" data-note-id="{{ $item->id }}">
                                                    <i class="fa fa-edit mr-2"></i>@lang('app.edit')
                                                </a>
                                                <a class="dropdown-item deleteNote" data-note-id="{{ $item->id }}" href="javascript:;">
                                                    <i class="fa fa-trash mr-2"></i>@lang('app.delete')
                                                </a>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!--Predefined Note Add Modal -->
    <div class="modal fade" id="noteAdd" tabindex="-1" aria-labelledby="noteAddLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title" id="noteAddLabel">Add Note</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="form-group">
                        <label for="note_text">Note
                            <span class="text-danger">*</span>
                        </label>
                        <textarea class="form-control" style="overflow-y: scroll; height:200px" id="note_text" name="note_text" rows="5"></textarea>
                        <span class="text-danger" id="note_text_error"></span>
                    </div>
                    <button type="submit" id="save-note" class="btn btn-primary rounded f-14 p-2">Submit</button>
                </form>
            </div>
        </div>
        </div>
    </div>

    <script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
    <script>
        new DataTable('#PredefinedNoteTable', {
            "dom": 't<"d-flex"l<"ml-auto"ip>><"clear">',
        });

        $(document).ready(function() {        
            $('#save-note').click(function(e){
                e.preventDefault();
                $('#save-note').attr("disabled", true);
                $('#save-note').html("Processing...");

                var data= {
                    '_token': "{{ csrf_token() }}",
                    'note_text': document.getElementById("note_text").value,
                }
                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                });
                $.ajax({
                    type: "POST",
                    url: "{{route('predefined-notes.store')}}",
                    data: data,
                    dataType: "json",
                    success: function (response) {
                        if (response.status==200) {
                            toastr.success('Note Added Successfully');
                            window.location.reload();
                            $('#save-note').attr("disabled", false);
                            $('#save-note').html("Submit");
                        }
                    },
                    error: function(error) {
                        if(error.responseJSON.errors.note_text){
                            $('#note_text_error').text(error.responseJSON.errors.note_text);
                        }else{
                            $('#note_text_error').text('');
                        }
                        $('#save-note').attr("disabled", false);
                        $('#save-note').html("Submit");
                    }
                });
            });
        });

        $('body').on('click', '.editNote', function() {
            let id = $(this).data('note-id');
            console.log(id);
            let searchQuery = "?id=" + id;
            let url = "{{ route('predefined-notes.edit') }}" + searchQuery;

            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });

        $('body').on('click', '.deleteNote', function() {
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
                    var url = "{{ route('predefined-notes.destroy', ':id') }}";
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

        //copy text
        document.addEventListener('DOMContentLoaded', function() {
            document.querySelectorAll('.copyNote').forEach(function(copyButton) {
                copyButton.addEventListener('click', function(event) {
                    var textToCopy = copyButton.getAttribute('data-note-text');
                    if (textToCopy) {
                        var temporaryTextarea = document.createElement('textarea');
                        temporaryTextarea.style.position = 'absolute';
                        temporaryTextarea.style.left = '-9999px';
                        temporaryTextarea.value = textToCopy;
                        document.body.appendChild(temporaryTextarea);
                        temporaryTextarea.select();
                        document.execCommand('copy');
                        document.body.removeChild(temporaryTextarea);
                        toastr.success('Copy successful');
                    } else {
                        toastr.error('No text to copy');
                    }
                });
            });
        });

    </script>
@endsection
