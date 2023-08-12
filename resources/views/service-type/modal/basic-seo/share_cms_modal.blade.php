<!--Page list Edit Modal -->
<div class="modal fade" id="share_cms_modal" tabindex="-1" aria-labelledby="pageListEditModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="pageListEditModalLabel">Share CMS Access</h5>
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
                        <h6>Share CMS Access</h6>
                    </div>
                    <div class="col-md-9">
                        <div class="form-group d-flex">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="share_cms_access_info" value="1" id="yesBtn4" >
                                <label class="form-check-label ml-1 mt-1" for="yesBtn4">
                                    Share Direct Access
                                </label>
                            </div>
                            <div class="form-check" style="margin-left: 10px;">
                                <input class="form-check-input" type="radio" name="share_cms_access_info" value="0" id="noBtn4">
                                <label class="form-check-label ml-1 mt-1" for="noBtn4">
                                    Share Admin Access With My Email
                                </label>
                            </div>
                        </div>
                        <span id="share_cms_access_info_error" class="text-danger"></span>
                        <div class="mt-3" id="shareCMSYes" style="display:none;">
                            <div class="row">
                                <div class="col-md-4">
                                    <label for="">Login URl</label>
                                    <input type="url" name="url" id="url" class="form-control placeholderText height-35 f-14" placeholder="https://admin.com">
                                    <span id="url_error" class="text-danger"></span>
                                </div>
                                <div class="col-md-4">
                                    <label for="">Email/Username</label>
                                    <input type="text" name="user_name" id="user_name" class="form-control placeholderText height-35 f-14" placeholder="Type email/username here">
                                    <span id="user_name_error" class="text-danger"></span>
                                </div>
                                <div class="col-md-4">
                                    <label for="">Password</label>
                                    <input type="text" name="password4" id="password4" class="form-control placeholderText height-35 f-14" placeholder="Type password here">
                                    <span id="password4_error" class="text-danger"></span>
                                </div>
                            </div>
                        </div>
                        <div class="mt-3" id="shareCMSNo" style="display:none;">
                            <div class="d-flex">
                                <label for="">Please add info@seopage1.net as an admin there</label>
                                <div class="form-check" style="margin-left: 30px;">
                                    <input class="form-check-input" type="radio" name="confirmAdding" value="1" id="confirmAdding">
                                    <label class="form-check-label ml-1 mt-1" for="confirmAdding">
                                        Confirm After Adding
                                    </label>
                                </div>
                            </div>
                            <span id="confirmAdding_error" class="text-danger"></span>
                        </div>
                    </div>
                </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary share_cms_save" data-id="{{$basic_seo->id}}">Save changes</button>
        </div>
    </form>
      </div>
    </div>
  </div>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script>
    $('#yesBtn4').click(function() {
            $('#shareCMSYes').show();
            $('#shareCMSNo').hide();
        });
        $('#noBtn4').click(function() {
            $('#shareCMSYes').hide();
            $('#shareCMSNo').show();
        });
    
  $(document).ready(function() {
    $('.share_cms_save').click(function(event) {
      event.preventDefault();
        var id = $(this).data('id');
        var share_cms_access_info = $('input[name="share_cms_access_info"]:checked').val();
        var confirmAdding = $('input[name="confirmAdding"]:checked').val();
      var data = {
        '_token': "{{ csrf_token() }}",
        'share_cms_access_info': share_cms_access_info,
        'url': document.getElementById("url").value,
        'user_name': document.getElementById("user_name").value,
        'password4': document.getElementById("password4").value,
        'confirmAdding': confirmAdding,
        'deal_id': {{$basic_seo->deal_id}},
      };
      $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });
      $.ajax({
        url: '/projects/update-sales-basic-seo-cms/' + id,
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