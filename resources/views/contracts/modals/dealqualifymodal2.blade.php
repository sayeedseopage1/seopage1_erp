<div class="modal fade" id="qualifymodal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                @if($deal->deal_stage == 0)
                    <h5 class="modal-title" id="exampleModalLabel">Contact Made <span>&#8594;</span> Qualified</h5>

                @elseif($deal->deal_stage == 1)
                    <h5 class="modal-title" id="exampleModalLabel">Qualified <span>&#8594;</span> Requirements Defined</h5>
                @elseif($deal->deal_stage == 2)
                    <h5 class="modal-title" id="exampleModalLabel">Requirements Defined<span>&#8594;</span> Proposal Made</h5>
                @elseif($deal->deal_stage == 3)
                    <h5 class="modal-title" id="exampleModalLabel">Proposal Made <span>&#8594;</span> Negotiation Started</h5>

                @endif
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form  action="{{route('deal-stage-update')}}" method="post" id="qualifyForm">
                @csrf
                <div class="modal-body">
                    <input type="hidden" name="id" value="{{$deal->id}}">
                    <div class="mb-3">
                        <label for="message-text" class="col-form-label">Comments</label>
                        <textarea name="comments" id="comments1" class="form-control"></textarea>
                       <script src="{{ asset('/ckeditor/ckeditor.js') }}"></script>
                        <script>
                            CKEDITOR.replace('comments',{
                                height: '100'
                            });
                        </script>
                        <span class="text-danger" id="commentError"></span>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary" id="submitBtn">Submit</button>
                </div>
            </form>
        </div>
    </div>
</div>

<script src="https://cdn.ckeditor.com/4.19.1/standard/ckeditor.js"></script>
<script>
    $('#submitBtn').click(function(e){
        // alert('ok');
        e.preventDefault();
        // console.log(formData);
        $('#submitBtn').attr("disabled", true);
        $('#submitBtn').html("Processing...");
        var comments = CKEDITOR.instances.comments1.getData();
        // console.log(comments);
        var data= {
            '_token': "{{ csrf_token() }}",
            'comments': comments,
            'id': {{$deal->id}},
        }
        // console.log(data);
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type: "POST",
            url: "{{route('deal-stage-update')}}",
            data: data,
            dataType: "json",
            success: function (response) {
                if(response.status==400){
                    $('#qualifyForm').trigger("reset");
                    $('#qualifymodal2').hide('');
                    window.location.reload();
                    $('#submitBtn').attr("disabled", false);
                    $('#submitBtn').html("Submit");
                }
            },
            error: function(error) {
                // console.log(response);
                if(error.responseJSON.errors.comments){
                    $('#commentError').text(error.responseJSON.errors.comments);
                }else{
                    $('#commentError').text('');
                }
                $('#submitBtn').attr("disabled", false);
                $('#submitBtn').html("Submit");
            }
        });
    });

</script>

