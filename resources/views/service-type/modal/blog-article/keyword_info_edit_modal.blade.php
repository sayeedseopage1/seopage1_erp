<!--Page list Edit Modal -->
<div class="modal fade" id="keyword_info_edit_modal" tabindex="-1" aria-labelledby="pageListEditModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="pageListEditModalLabel">Keywords</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <form action="" method="post" id="Keywords_form">
                @csrf
                <div class="row mt-3">
                    <div class="col-md-3">
                        <h6 class="mt-1">Keywords:</h6>
                    </div>
                    <div class="col-md-9">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <div class="d-flex">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="keyword_info" value="1" id="keywordBtn1">
                                            <label class="form-check-label mt-1 ml-1" for="keywordBtn1">
                                                Research and collect keywords for me
                                            </label>
                                        </div>
                                        <div class="form-check" style="margin-left: 10px;">
                                            <input class="form-check-input" type="radio" name="keyword_info" value="0" id="keywordBtn2">
                                            <label class="form-check-label mt-1 ml-1" for="keywordBtn2">
                                                I have the keywords
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-3" id="keywordForm" style="display: none;">
                            <div class="col-md-8 dynamic-keyword-link" id="dynamic-keyword-link-list-1">
                                <div class="row mb-3">
                                    <div class="col-md-12">
                                        <input type="text" name="keyword_link[]" id="keyword_link" class="form-control placeholderText height-35 f-14" placeholder="Share google doc or sheet or drive link where keywords are available">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 append-buttons">
                                <div class="clearfix">
                                    <button type="button" id="add-keyword-button" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                                    <button type="button" id="remove-keyword-button" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary keywords_save" data-id="{{$blog_article->id}}">Save changes</button>
        </div>
    </form>
      </div>
    </div>
  </div>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script>
    $(document).ready(function() {
        $('#keywordBtn2').click(function() {
            $('#keywordForm').show();
        });

        $('#keywordBtn1').click(function() {
            $('#keywordForm').hide();
        });
    });
    
  $(document).ready(function() {
    $('.keywords_save').click(function(event) {
      event.preventDefault();
        var id = $(this).data('id');
        var keyword_info = $('input[name="keyword_info"]:checked').val();
        var keyword_link = document.getElementsByName("keyword_link[]");
        var keyword_link_values = [];
        for (var i = 0; i < keyword_link.length; i++) {
            keyword_link_values.push(keyword_link[i].value);
        }
      var data = {
        '_token': "{{ csrf_token() }}",
        'keyword_info': keyword_info,
        'keyword_link': keyword_link_values,
        'deal_id': {{$blog_article->deal_id}},
      };
      $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });
      $.ajax({
        url: '/projects/update-sales-blog-article-keywords-info/' + id,
        method: 'put',
        data: data,
        dataType: "json",
        success: function(response) {
          window.location.reload();
          $("#Keywords_form ").trigger("reset");
          toastr.success('Change Successfully');
        },
        error: function(error) {
          // console.log(response);
        }
      });
    });
  });

  $(document).ready(function () {
        var buttonAdd = $("#add-keyword-button");
        var buttonRemove = $("#remove-keyword-button");
        var className = ".dynamic-keyword-link";
        var count = 0;
        var field = "";
        var maxFields = 50;

        function totalFields() {
            return $(className).length;
        }

        function addNewField() {
            var total = $('input[name="keyword-link[]"]').length;
            count = totalFields() + 1;
            field = $("#dynamic-keyword-link-list-1").clone();
            field.attr("id", "dynamic-keyword-link-" + count);
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