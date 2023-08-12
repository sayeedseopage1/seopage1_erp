<!--Page list Edit Modal -->
<div class="modal fade" id="business_information_edit_modal" tabindex="-1" aria-labelledby="pageListEditModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="pageListEditModalLabel">Business profile/Leaflet/Brochure/Any important information</h5>
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
                    <h6>Business profile/Leaflet/Brochure/Any important information</h6>
                </div>
                <div class="col-md-9">
                    <div class="row">
                        <div class="col-md-6">
                            <textarea name="business_information" id="business_information" cols="3" rows="3" class="form-control placeholderText" placeholder="Put some details about your company here!"></textarea>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="">Want to share file?</label>
                                <div class="mt-2 d-flex">
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="share_file_info" value="1" id="share_file_info_yes">
                                        <label class="form-check-label mt-1 ml-1" for="share_file_info_yes">
                                            Yes
                                        </label>
                                    </div>
                                    <div class="form-check" style="margin-left: 10px;">
                                        <input class="form-check-input" type="radio" name="share_file_info" value="0" id="share_file_info_no">
                                        <label class="form-check-label mt-1 ml-1" for="share_file_info_no">
                                            No
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-3" id="folderLinkAddForm" style="display: none;">
                        <div class="col-md-8 dynamic-folder-link" id="dynamic-folder-link-list-1">
                            <div class="row mb-3">
                                <div class="col-md-12">
                                    <input type="text" name="folder_link[]" id="folder_link" class="form-control placeholderText height-35 f-14" placeholder="Enter google doc or sheet file or drive folder link here">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 append-buttons">
                            <div class="clearfix">
                                <button type="button" id="add-folder-button" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                                <button type="button" id="remove-folder-button" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary business_information_save" data-id="{{$product_category->id}}">Save changes</button>
        </div>
    </form>
      </div>
    </div>
  </div>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script>
    $(document).ready(function() {
        $('#share_file_info_yes').click(function() {
            $('#folderLinkAddForm').show();
        });

        $('#share_file_info_no').click(function() {
            $('#folderLinkAddForm').hide();
        });
    });
    
  $(document).ready(function() {
    $('.business_information_save').click(function(event) {
      event.preventDefault();
        var id = $(this).data('id');
        var share_file_info = $('input[name="share_file_info"]:checked').val();
        var folder_link = document.getElementsByName("folder_link[]");
        var folder_link_values = [];
        for (var i = 0; i < folder_link.length; i++) {
            folder_link_values.push(folder_link[i].value);
        }
      var data = {
        '_token': "{{ csrf_token() }}",
        'business_information': document.getElementById("business_information").value,
        'share_file_info': share_file_info,
        'folder_link': folder_link_values,
        'deal_id': {{$product_category->deal_id}},
      };
      $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });
      $.ajax({
        url: '/projects/update-sales-product-category-business-info/' + id,
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