<!--Page list Edit Modal -->
<div class="modal fade" id="reference_website_edit_modal" tabindex="-1" aria-labelledby="pageListEditModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="pageListEditModalLabel">Competitors/Reference Website</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <div class="row">
                <form action="" id="reference_website_form">
                <div class="col-md-10 mb-3 dynamic-product " id="dynamic-product-list-1">
                    <div class="row">
                        <div class="col-md-5">
                            <div class="form-group">
                                <label for="">Competitors/Reference Website</label>
                                <input type="text" id="reference_website" class="form-control placeholderText height-35 f-14" placeholder="Type your reference website" name="reference_website[]"/>
                            </div>
                        </div>
                        <div class="col-md-7">
                            <div class="form-group">
                                <label for="">Does your competitor's content match exactly to what you do?</label>
                                <div class="mt-2 d-flex">
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="competitor_content" value="1" id="yesBtn1">
                                        <label class="form-check-label mt-1 ml-1" for="yesBtn1">
                                            Yes
                                        </label>
                                    </div>
                                    <div class="form-check" style="margin-left: 10px;">
                                        <input class="form-check-input" type="radio" name="competitor_content" value="0" id="noBtn1">
                                        <label class="form-check-label mt-1 ml-1" for="noBtn1">
                                            No
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="noForm" style="display: none;">
                        <div class="row">
                            <div class="col-4">
                                <label class="form-label" for="">What are the major differences?</label>
                            </div>

                            <div class="col-4">
                                <label class="form-label" for="">What are things that they do, and you don't?</label>
                            </div>
                            <div class="col-4">
                                <label class="form-label" for="">What are things that they don't, and you do?</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-4">
                                <textarea name="description1[]" id="description1" rows="3" class="form-control placeholderText" placeholder="Type your input here"></textarea>
                                <span id="description1_error" class="text-danger"></span>
                            </div>

                            <div class="col-4">
                                <textarea name="description2[]" id="description2"  rows="3" class="form-control placeholderText" placeholder="Type your input here"></textarea>
                                <span id="description2_error" class="text-danger"></span>
                            </div>
                            <div class="col-4">
                                <textarea name="description3[]" id="description3" rows="3" class="form-control placeholderText" placeholder="Type your input here"></textarea>
                                <span id="description3_error" class="text-danger"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-2 d-flex">
                    <button type="button" id="add-button" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                    <button type="button" id="remove-button" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary reference_website_save" data-id="{{$web_content->id}}">Save changes</button>
        </div>
    </form>
      </div>
    </div>
  </div>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script>
    $(document).ready(function() {
        $('#noBtn1').click(function() {
            $('#noForm').show();
        });

        $('#yesBtn1').click(function() {
            $('#noForm').hide();
        });
    });
    
  $(document).ready(function() {
    $('.reference_website_save').click(function(event) {
      event.preventDefault();
      var id = $(this).data('id');
      var reference_website = document.getElementsByName("reference_website[]");
        var reference_website_values = [];
        for (var i = 0; i < reference_website.length; i++) {
            reference_website_values.push(reference_website[i].value);
        }
        var description1 = document.getElementsByName("description1[]");
        var description1_values = [];
        for (var i = 0; i < description1.length; i++) {
            description1_values.push(description1[i].value);
        }
        var description2 = document.getElementsByName("description2[]");
        var description2_values = [];
        for (var i = 0; i < description2.length; i++) {
            description2_values.push(description2[i].value);
        }
        var description3 = document.getElementsByName("description3[]");
        var description3_values = [];
        for (var i = 0; i < description3.length; i++) {
            description3_values.push(description3[i].value);
        }
        var competitor_content = $('input[name="competitor_content"]:checked').val();
      var data = {
        '_token': "{{ csrf_token() }}",
        'reference_website': reference_website_values,
        'competitor_content': competitor_content,
        'description1': description1_values,
        'description2': description2_values,
        'description3': description3_values,
        'deal_id': {{$web_content->deal_id}},
      };
      $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });
      $.ajax({
        url: '/projects/update-sales-reference-website/' + id,
        method: 'put',
        data: data,
        dataType: "json",
        success: function(response) {
          window.location.reload();
          $("#reference_website_form").trigger("reset");
          toastr.success('Change Successfully');
        },
        error: function(error) {
          // console.log(response);
        }
      });
    });
  });

  $(document).ready(function () {
        var buttonAdd = $("#add-button");
        var buttonRemove = $("#remove-button");
        var className = ".dynamic-product";
        var count = 0;
        var field = "";
        var maxFields = 50;

        function totalFields() {
            return $(className).length;
        }

        function addNewField() {
            var total = $('input[name="link[]"]').length;
            count = totalFields() + 1;
            field = $("#dynamic-product-list-1").clone();
            field.attr("id", "dynamic-product-" + count);
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