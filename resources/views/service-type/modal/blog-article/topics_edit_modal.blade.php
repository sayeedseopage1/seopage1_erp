<!--Page list Edit Modal -->
<div class="modal fade" id="topics_edit_modal" tabindex="-1" aria-labelledby="pageListEditModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="pageListEditModalLabel">Topics</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <form action="" method="post" id="topices_form">
                @csrf
                <div class="row mt-3">
                    <div class="col-md-3">
                        <h6 class="mt-1">Topics:</h6>
                    </div>
                    <div class="col-md-9">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <div class="d-flex">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="topic_info" value="1" id="topicBtn1">
                                            <label class="form-check-label mt-1 ml-1" for="topicBtn1">
                                                Research and collect topics for me
                                            </label>
                                        </div>
                                        <div class="form-check" style="margin-left: 10px;">
                                            <input class="form-check-input" type="radio" name="topic_info" value="0" id="topicBtn2">
                                            <label class="form-check-label mt-1 ml-1" for="topicBtn2">
                                                I have the topics
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-3" id="topicForm" style="display: none;">
                            <div class="col-md-8 dynamic-topic-link" id="dynamic-topic-link-list-1">
                                <div class="row mb-3">
                                    <div class="col-md-12">
                                        <input type="text" name="topic_link[]" id="topic_link" class="form-control placeholderText height-35 f-14" placeholder="Share google doc or sheet or drive link where topics are available">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 append-buttons">
                                <div class="clearfix">
                                    <button type="button" id="add-topic-button" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                                    <button type="button" id="remove-topic-button" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary reference_website_save" data-id="{{$blog_article->id}}">Save changes</button>
        </div>
    </form>
      </div>
    </div>
  </div>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script>
    $(document).ready(function() {
        $('#topicBtn2').click(function() {
            $('#topicForm').show();
        });

        $('#topicBtn1').click(function() {
            $('#topicForm').hide();
        });
    });
    
  $(document).ready(function() {
    $('.reference_website_save').click(function(event) {
      event.preventDefault();
        var id = $(this).data('id');
        var topic_info = $('input[name="topic_info"]:checked').val();
        var topic_link = document.getElementsByName("topic_link[]");
        var topic_link_values = [];
        for (var i = 0; i < topic_link.length; i++) {
            topic_link_values.push(topic_link[i].value);
        }
      var data = {
        '_token': "{{ csrf_token() }}",
        'topic_info': topic_info,
        'topic_link': topic_link_values,
        'deal_id': {{$blog_article->deal_id}},
      };
      $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });
      $.ajax({
        url: '/projects/update-sales-blog-article-topics-info/' + id,
        method: 'put',
        data: data,
        dataType: "json",
        success: function(response) {
          window.location.reload();
          $("#topices_form ").trigger("reset");
          toastr.success('Change Successfully');
        },
        error: function(error) {
          // console.log(response);
        }
      });
    });
  });

  $(document).ready(function () {
        var buttonAdd = $("#add-topic-button");
        var buttonRemove = $("#remove-topic-button");
        var className = ".dynamic-topic-link";
        var count = 0;
        var field = "";
        var maxFields = 50;

        function totalFields() {
            return $(className).length;
        }

        function addNewField() {
            var total = $('input[name="topic-link[]"]').length;
            count = totalFields() + 1;
            field = $("#dynamic-topic-link-list-1").clone();
            field.attr("id", "dynamic-topic-link-" + count);
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