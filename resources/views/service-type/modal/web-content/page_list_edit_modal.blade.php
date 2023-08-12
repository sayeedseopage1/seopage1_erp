<!--Page list Edit Modal -->
<div class="modal fade" id="pageListEditModal{{$web_content->id}}" tabindex="-1" aria-labelledby="pageListEditModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="pageListEditModalLabel">Page list Edit</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <div class="row">
                <div class="col-md-10 dynamic-page-add" id="dynamic-page-add-list-1">
                    <form id="pageListForm">
                        @csrf
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="">Type Page name</label>
                                <input type="text" name="page_name[]" id="page_name" class="form-control placeholderText height-35 f-14" placeholder="Type page name">
                            </div>
                        </div>
                        <div class="col-md-3">
                            <label for="">Quantity</label>
                            <input type="number" name="quantity[]" id="quantity" class="form-control placeholderText height-35 f-14" placeholder="Type page quantity">
                        </div>
                        <div class="col-md-5">
                            <label for="">Approximate word count per page</label>
                            <input type="text" name="approximate_word[]" id="approximate_word" class="form-control placeholderText height-35 f-14" placeholder="Approximate word count per page">
                        </div>
                    </div>
                </div>
                <div class="col-md-2 append-buttons" style="margin-top: 22px;">
                    <div class="clearfix">
                        <button type="button" id="add-page" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                        <button type="button" id="remove-page" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                    </div>
                </div>
            </form>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary pageListSave" data-id="{{$web_content->id}}">Save changes</button>
        </div>
      </div>
    </div>
  </div>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script>
    
  $(document).ready(function() {
    $('.pageListSave').click(function(event) {
      event.preventDefault();
      var id = $(this).data('id');
      var page_name = document.getElementsByName("page_name[]");
      var page_name_values = [];
      for (var i = 0; i < page_name.length; i++) {
        if (page_name[i].value.trim() !== '') {
          page_name_values.push(page_name[i].value);
        }
      }
      var quantity = document.getElementsByName("quantity[]");
      var quantity_values = [];
      for (var i = 0; i < quantity.length; i++) {
        if (quantity[i].value.trim() !== '') {
          quantity_values.push(quantity[i].value);
        }
      }
      var approximate_word = document.getElementsByName("approximate_word[]");
      var approximate_word_values = [];
      for (var i = 0; i < approximate_word.length; i++) {
        if (approximate_word[i].value.trim() !== '') {
          approximate_word_values.push(approximate_word[i].value);
        }
      }
      var data = {
        '_token': "{{ csrf_token() }}",
        'page_name': page_name_values,
        'quantity': quantity_values,
        'approximate_word': approximate_word_values,
        'deal_id': {{$web_content->deal_id}},
      };
      $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });
      $.ajax({
        url: '/projects/update-sales-page-list/' + id,
        method: 'put',
        data: data,
        dataType: "json",
        success: function(response) {
          window.location.reload();
          $("#pageListForm").trigger("reset");
          toastr.success('Change Successfully');
        },
        error: function(error) {
          // console.log(response);
        }
      });
    });
  });

  $(document).ready(function() {
    var buttonAdd = $("#add-page");
    var buttonRemove = $("#remove-page");
    var className = ".dynamic-page-add";
    var count = 0;
    var field = "";
    var maxFields = 50;

    function totalFields() {
      return $(className).length;
    }

    function addNewField() {
      var total = $('input[name="link[]"]').length;
      count = totalFields() + 1;
      field = $("#dynamic-page-add-list-1").clone();
      field.attr("id", "dynamic-page-add-" + count);
      field.children("label").attr("for", "linkError_" + 'total').text("Field " + count);
      field.find("input").attr("id", "linkError_" + 'total').val("");
      field.append('<span id="linkError_' + total + '" class="text-danger" for="link"></span>');
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

    buttonAdd.click(function() {
      addNewField();
      enableButtonRemove();
      disableButtonAdd();
    });

    buttonRemove.click(function() {
      removeLastField();
      disableButtonRemove();
      enableButtonAdd();
    });
  });
  </script>