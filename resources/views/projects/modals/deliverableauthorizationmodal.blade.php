
<div class="modal fade" id="deliverableauthorization" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Send for authorization</h5>
                <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
            </div>
            <form class="" action="{{route('deliverable-authorization-request')}}" method="post">
                @csrf
                <input type="hidden" name="project_id" value="{{$project->id}}">
                <div class="modal-body">
                    @if($errors->has('comments'))
                        <div class="alert alert-danger">{{ $errors->first('comments') }}</div>
                    @endif

                    <div class="col-md-12 col-lg-12">
                        <div class="form-group">
                            <x-forms.label class="my-3" fieldId="comments"
                                           :fieldLabel="__('Explain about the Delay')">
                            </x-forms.label>
                            <div id="comments"></div>
                            <textarea name="comments" id="comments-text"
                                      class="d-none">Comments</textarea>
                        </div>
                    </div>


                </div>
                <div class="modal-footer">

                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="Submit" id="comments-form" class="btn btn-primary add_milestone" >Submit for approval</button>

                </div>
            </form>

        </div>
    </div>
</div>

<script type="text/javascript">

    $(document).ready(function() {
        // Listen for change event on select element
        $('#delivery-type').change(function() {
            // Get the selected value
            var selectedValue = $(this).val();

            // Hide all forms by default
            $('#to').hide();

            // Show the relevant form based on the selected option
            if (selectedValue === 'Between') {
                $('#to').show();
            } else{
                $('#to').hide();
            }
        });
    });

</script>

<script>
    $(document).ready(function() {

        quillImageLoad('#comments');



    });

    $('#comments-form').click(function() {
        var note = document.getElementById('comments').children[0].innerHTML;
        document.getElementById('comments-text').value = note;
    });

</script>
@if (count($errors) > 0 )
    <script>
        $( document ).ready(function() {
            $('#deliverableauthorization').modal('show');
        });
    </script>
@endif
