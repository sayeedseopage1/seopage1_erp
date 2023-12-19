<!-- Modal -->
<div class="modal fade" id="lead_source_add_modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog ">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Lead Source</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form>
        <div class="modal-body">
            <div class="form-group">
                <label class="f-14 text-dark-grey mb-12" data-label="true" for="lead_source">Lead Source
                    <sup class="f-14 mr-1">*</sup>
                    <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Select the lead source name." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                        <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                    </svg>
                </label>
                <div class="dropdown bootstrap-select form-control select-picker">
                    <select name="lead_source" id="lead_source" data-live-search="true" class="form-control select-picker error" data-size="8">
                        <option value="">--</option>
                            <option value="Upwork.com">Upwork.com</option>
                            <option value="Freelancer.com">Freelancer.com</option>
                    </select>
                    <label id="lead_sourceError" class="error" for="lead_source"></label>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" id="leadSourceBtn" class="btn btn-primary">Submit</button>
        </div>
        </form>
      </div>
    </div>
  </div>

  <script>
    $('#leadSourceBtn').click(function(e){
        e.preventDefault();
        $('#leadSourceBtn').attr("disabled", true);
        $('#leadSourceBtn').html("Processing...");
        var data= {
            '_token': "{{ csrf_token() }}",
            'lead_source': document.getElementById("lead_source").value,
        }
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type: "POST",
            url: "{{route('store-dm-lead-source')}}",
            data: data,
            dataType: "json",
            success: function (response) {
                $(location).prop('href', '{{url('/account/digital-marketing-lead/create')}}');
                toastr.success('Lead Source Added Successfully');
                $('#leadSourceBtn').attr("disabled", false);
                $('#leadSourceBtn').html("Submit");
            },
            error: function(error) {
                if(error.responseJSON.errors.lead_source){
                    $('#lead_sourceError').text(error.responseJSON.errors.lead_source);
                }else{
                    $('#lead_sourceError').text('');
                }
                $('#leadSourceBtn').attr("disabled", false);
                $('#leadSourceBtn').html("Submit");
            }
        });
    });
  </script>