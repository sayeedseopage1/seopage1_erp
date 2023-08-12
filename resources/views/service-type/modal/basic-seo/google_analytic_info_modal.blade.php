<!--Page list Edit Modal -->
<div class="modal fade" id="google_analytic_info_modal" tabindex="-1" aria-labelledby="pageListEditModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="pageListEditModalLabel">Do you have a google analytics account created?</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <form action="" method="post" id="business_information_form">
                @csrf
                <div class="row mt-3">
                    <div class="col-md-3">
                        <h6>Do you have a google analytics account created?</h6>
                    </div>
                    <div class="col-md-9">
                        <div class="form-group d-flex">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="google_analytic_info" value="1" id="yesBtn2">
                                <label class="form-check-label mt-1 ml-1" for="yesBtn2">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check" style="margin-left: 10px;">
                                <input class="form-check-input" type="radio" name="google_analytic_info" value="0" id="noBtn2">
                                <label class="form-check-label mt-1 ml-1" for="noBtn2">
                                    No
                                </label>
                            </div>
                        </div>
                        <span id="google_analytic_info_error" class="text-danger"></span>
                        <div class="mt-3" id="googleAnalyticYes" style="display:none;">
                            <div class="d-flex">
                                <label for="">add info@seopage1.net as an admin there</label>
                                <div class="form-check" style="margin-left: 30px;">
                                    <input class="form-check-input" type="radio" name="done2" value="1" id="done2">
                                    <label class="form-check-label" for="done2">
                                        Done
                                    </label>
                                </div>
                            </div>
                            <span id="done2_error" class="text-danger"></span>
                        </div>
                        <div class="mt-3" id="googleAnalyticNo" style="display:none;">
                            <div class="row">
                                <label for="">Please open and share a gmail login and password so we can use it to create an account for you</label>
                                <div class="col-md-6">
                                    <input type="email" name="email2" id="email2" class="form-control placeholderText height-35 f-14" placeholder="Type email here">
                                    <span id="email2_error" class="text-danger"></span>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" name="password2" id="password2" class="form-control placeholderText height-35 f-14" placeholder="Type password here">
                                    <span id="password2_error" class="text-danger"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary google_analytic_save" data-id="{{$basic_seo->id}}">Save changes</button>
        </div>
    </form>
      </div>
    </div>
  </div>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script>
   $('#yesBtn2').click(function() {
            $('#googleAnalyticYes').show();
            $('#googleAnalyticNo').hide();
        });
        $('#noBtn2').click(function() {
            $('#googleAnalyticYes').hide();
            $('#googleAnalyticNo').show();
        });
    
  $(document).ready(function() {
    $('.google_analytic_save').click(function(event) {
      event.preventDefault();
        var id = $(this).data('id');
        var google_analytic_info = $('input[name="google_analytic_info"]:checked').val();
        var done2 = $('input[name="done2"]:checked').val();
      var data = {
        '_token': "{{ csrf_token() }}",
        'google_analytic_info': google_analytic_info,
        'done2': done2,
        'email2': document.getElementById("email2").value,
        'password2': document.getElementById("password2").value,
        'deal_id': {{$basic_seo->deal_id}},
      };
      $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });
      $.ajax({
        url: '/projects/update-sales-basic-seo-google-analytic/' + id,
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

  $(document).ready(function () {
        var buttonAdd = $("#add-folder-button");
        var buttonRemove = $("#remove-folder-button");
        var className = ".dynamic-folder-link";
        var count = 0;
        var field = "";
        var maxFields = 50;

        function totalFields() {
            return $(className).length;
        }

        function addNewField() {
            var total = $('input[name="folder_link[]"]').length;
            count = totalFields() + 1;
            field = $("#dynamic-folder-link-list-1").clone();
            field.attr("id", "dynamic-folder-link-" + count);
            field.find('input[name="folder_link[]"]').val("");
            field.find('input[name="folder_link[]"]').attr("id", "folder_link_" + count);
            $(className + ":last").after($(field));
        }


        function removeLastField() {
            if (totalFields() > 1) {
                $(className + ":last").remove();
            }
        }

        function enableButtonRemove() {
            if (totalFields() === 2) {
                buttonRemove.removeAttr("disabled");
                buttonRemove.addClass("shadow-sm");
            }
        }

        function disableButtonRemove() {
            if (totalFields() === 1) {
                buttonRemove.attr("disabled", "disabled");
                buttonRemove.removeClass("shadow-sm");
            }
        }

        function disableButtonAdd() {
            if (totalFields() === maxFields) {
                buttonAdd.attr("disabled", "disabled");
                buttonAdd.removeClass("shadow-sm");
            }
        }

        function enableButtonAdd() {
            if (totalFields() === maxFields - 1) {
                buttonAdd.removeAttr("disabled");
                buttonAdd.addClass("shadow-sm");
            }
        }

        buttonAdd.click(function () {
            addNewField();
            enableButtonRemove();
            disableButtonAdd();
        });

        buttonRemove.click(function () {
            removeLastField();
            disableButtonRemove();
            enableButtonAdd();
        });
    });
  </script>