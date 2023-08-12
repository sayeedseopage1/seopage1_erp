<!--Page list Edit Modal -->
<div class="modal fade" id="google_business_account_info_modal" tabindex="-1" aria-labelledby="pageListEditModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="pageListEditModalLabel">Do you have a google my business account created?</h5>
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
                        <h6>Do you have a google my business account created?</h6>
                    </div>
                    <div class="col-md-9">
                        <div class="form-group d-flex">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="google_business_account_info" value="1" id="yesBtn3">
                                <label class="form-check-label mt-1 ml-1" for="yesBtn3">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check" style="margin-left: 10px;">
                                <input class="form-check-input" type="radio" name="google_business_account_info" value="0" id="noBtn3">
                                <label class="form-check-label mt-1 ml-1" for="noBtn3">
                                    No
                                </label>
                            </div>
                        </div>
                        <span id="google_business_account_info_error" class="text-danger"></span>
                        <div class="mt-3" id="googleBusinessAccountYes" style="display:none;">
                            <div class="d-flex">
                                <label for="">add info@seopage1.net as an admin there</label>
                                <div class="form-check" style="margin-left: 30px;">
                                    <input class="form-check-input" type="radio" name="done3" value="1" id="done3">
                                    <label class="form-check-label mt-1 ml-1" for="done3">
                                        Done
                                    </label>
                                </div>
                            </div>
                            <span id="done3_error" class="text-danger"></span>
                        </div>
                        <div class="mt-3" id="googleBusinessAccountNo" style="display:none;">
                            <div class="row">
                                <label for="">Please open and share a gmail login and password so we can use it to create an account for you</label>
                                <div class="col-md-6">
                                    <input type="email" name="email3" id="email3" class="form-control placeholderText height-35 f-14" placeholder="Type email here">
                                    <span id="email3_error" class="text-danger"></span>
                                </div>
                                <div class="col-md-6">
                                    <input type="password" name="password3" id="password3" class="form-control placeholderText height-35 f-14" placeholder="Type password here">
                                    <span id="password3_error" class="text-danger"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary google_account_info_save" data-id="{{$basic_seo->id}}">Save changes</button>
        </div>
    </form>
      </div>
    </div>
  </div>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script>
    $('#yesBtn3').click(function() {
            $('#googleBusinessAccountYes').show();
            $('#googleBusinessAccountNo').hide();
        });
        $('#noBtn3').click(function() {
            $('#googleBusinessAccountYes').hide();
            $('#googleBusinessAccountNo').show();
        });
    
  $(document).ready(function() {
    $('.google_account_info_save').click(function(event) {
      event.preventDefault();
        var id = $(this).data('id');
        var google_business_account_info = $('input[name="google_business_account_info"]:checked').val();
        var done3 = $('input[name="done3"]:checked').val();
      var data = {
        '_token': "{{ csrf_token() }}",
        'google_business_account_info': google_business_account_info,
        'done3': done3,
        'email3': document.getElementById("email3").value,
        'password3': document.getElementById("password3").value,
        'deal_id': {{$basic_seo->deal_id}},
      };
      $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });
      $.ajax({
        url: '/projects/update-sales-basic-seo-google-account-info/' + id,
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