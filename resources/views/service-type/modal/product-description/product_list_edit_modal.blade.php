<!--Page list Edit Modal -->
<div class="modal fade" id="product_list_edit_modal" tabindex="-1" aria-labelledby="pageListEditModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="pageListEditModalLabel">Add product list</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <form action="" method="post" id="reference_blog_form">
                @csrf
                <div class="row mt-3">
                  <div class="col-md-10 dynamic-productList" id="dynamic-productList-list-1">
                      <div class="row mb-3">
                          <div class="col-md-3">
                              <h6 class="mt-1">Add product list:</h6>
                          </div>
                          <div class="col-md-9">
                              <div class="form-group" style="margin-left: 50px;">
                                  <input type="text" id="product_list" class="form-control placeholderText height-35 f-14" placeholder="Paste products page link, or google sheet link here" name="product_list[]"/>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="col-md-2 append-buttons">
                      <div class="clearfix">
                          <button type="button" id="add-productList-button" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                          <button type="button" id="remove-productList-button" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                      </div>
                  </div>
              </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary product_list_save" data-id="{{$product_description->id}}">Save changes</button>
        </div>
    </form>
      </div>
    </div>
  </div>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script>
    
  $(document).ready(function() {
    $('.product_list_save').click(function(event) {
      event.preventDefault();
        var id = $(this).data('id');
        var product_list = document.getElementsByName("product_list[]");
        var product_list_values = [];
        for (var i = 0; i < product_list.length; i++) {
            product_list_values.push(product_list[i].value);
        }
      var data = {
        '_token': "{{ csrf_token() }}",
        'product_list': product_list_values,
        'deal_id': {{$product_description->deal_id}},
      };
      $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });
      $.ajax({
        url: '/projects/update-sales-product-description-product-list/' + id,
        method: 'put',
        data: data,
        dataType: "json",
        success: function(response) {
          window.location.reload();
          $("#reference_blog_form ").trigger("reset");
          toastr.success('Change Successfully');
        },
        error: function(error) {
          // console.log(response);
        }
      });
    });
  });

  $(document).ready(function () {
        var buttonAdd = $("#add-productList-button");
        var buttonRemove = $("#remove-productList-button");
        var className = ".dynamic-productList";
        var count = 0;
        var field = "";
        var maxFields = 50;

        function totalFields() {
            return $(className).length;
        }

        function addNewField() {
            var total = $('input[name="product_list[]"]').length;
            count = totalFields() + 1;
            field = $("#dynamic-productList-list-1").clone();
            field.attr("id", "dynamic-productList-" + count);
            field.children("label").attr("for", "linkError_" + 'total').text("Field " + count);
            field.find("input").attr("id", "linkError_" + 'total').val("");
            field.append('<span id="linkError_'+total+'" class="text-danger" for="link"></span>');
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