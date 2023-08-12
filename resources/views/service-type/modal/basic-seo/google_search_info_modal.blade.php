<!--Page list Edit Modal -->
<div class="modal fade" id="google_search_info_modal" tabindex="-1" aria-labelledby="pageListEditModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="pageListEditModalLabel">Do you have a google search console account created?</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <form action="" method="post" id="business_information_form">
                @csrf
                <div class="row ">
                    <div class="col-md-3">
                        <h6>Do you have a google search console account created?</h6>
                    </div>
                    <div class="col-md-9">
                        <div class="form-group d-flex">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="google_search_info" value="1" id="yesBtn1">
                                <label class="form-check-label mt-1 ml-1" for="yesBtn1">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check" style="margin-left: 10px;">
                                <input class="form-check-input" type="radio" name="google_search_info" value="0" id="noBtn1">
                                <label class="form-check-label mt-1 ml-1" for="noBtn1">
                                    No
                                </label>
                            </div>
                        </div>
                        <div class="mt-3" id="googleSearchYes" style="display:none;">
                            <div class="d-flex">
                                <label for="">add info@seopage1.net as an admin there</label>
                                <div class="form-check mb-1" style="margin-left: 30px;">
                                    <input class="form-check-input" type="radio" name="done1" value="1" id="done1">
                                    <label class="form-check-label mt-1 ml-1" for="done1">
                                        Done
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="mt-3" id="googleSearchNo" style="display:none;">
                            <div class="row">
                                <label for="" class="ml-2">Please open and share a gmail login and password so we can use it to create an account for you</label>
                                <div class="col-md-6">
                                    <input type="email" name="email1" id="email1" class="form-control placeholderText height-35 f-14" placeholder="Type email here">
                                </div>
                                <div class="col-md-6">
                                    <input type="text" name="password1" id="password1" class="form-control placeholderText height-35 f-14" placeholder="Type password here">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary business_information_save" data-id="{{$basic_seo->id}}">Save changes</button>
        </div>
    </form>
      </div>
    </div>
  </div>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script>
     $('#yesBtn1').click(function() {
            $('#googleSearchYes').show();
            $('#googleSearchNo').hide();
        });
        $('#noBtn1').click(function() {
            $('#googleSearchYes').hide();
            $('#googleSearchNo').show();
        });
    
  $(document).ready(function() {
    $('.business_information_save').click(function(event) {
      event.preventDefault();
        var id = $(this).data('id');
        var google_search_info = $('input[name="google_search_info"]:checked').val();
        var done1 = $('input[name="done1"]:checked').val();
      var data = {
        '_token': "{{ csrf_token() }}",
        'google_search_info': google_search_info,
        'done1': done1,
        'email1': document.getElementById("email1").value,
        'password1': document.getElementById("password1").value,
        'deal_id': {{$basic_seo->deal_id}},
      };
      $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });
      $.ajax({
        url: '/projects/update-sales-basic-seo-google-search/' + id,
        method: 'put',
        data: data,
        dataType: "json",
        success: function(response) {
          window.location.reload();
          $("#business_information_form ").trigger("reset");
          toastr.success('Change Successfully');
        },
        error: function(error) {
          // console.log(response);
        }
      });
    });
  });
  </script>