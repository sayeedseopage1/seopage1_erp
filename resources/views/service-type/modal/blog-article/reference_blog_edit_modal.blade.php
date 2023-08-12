<!--Page list Edit Modal -->
<div class="modal fade" id="reference_blog_edit_modal" tabindex="-1" aria-labelledby="pageListEditModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="pageListEditModalLabel">Reference Blogs</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <form action="" method="post" id="reference_blog_form">
                @csrf
                <div class="row mt-3">
                    <div class="col-md-10 dynamic-blog-url" id="dynamic-blog-url-list-1">
                        <div class="row mb-3">
                            <div class="col-md-3">
                                <h6>Reference Blogs:</h6>
                            </div>
                            <div class="col-md-9">
                                <div class="form-group" style="margin-left: 50px;">
                                    <input type="url" id="blog_url" class="form-control placeholderText height-35 f-14" placeholder="Enter reference blog url" name="blog_url[]"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2 append-buttons">
                        <div class="clearfix">
                            <button type="button" id="add-blog-button" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                            <button type="button" id="remove-blog-button" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                        </div>
                    </div>
                </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary reference_blog_save" data-id="{{$blog_article->id}}">Save changes</button>
        </div>
    </form>
      </div>
    </div>
  </div>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script>
    
  $(document).ready(function() {
    $('.reference_blog_save').click(function(event) {
      event.preventDefault();
        var id = $(this).data('id');
        var blog_url = document.getElementsByName("blog_url[]");
        var blog_url_values = [];
        for (var i = 0; i < blog_url.length; i++) {
            blog_url_values.push(blog_url[i].value);
        }
      var data = {
        '_token': "{{ csrf_token() }}",
        'blog_url': blog_url_values,
        'deal_id': {{$blog_article->deal_id}},
      };
      $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });
      $.ajax({
        url: '/projects/update-sales-blog-article-reference-blog/' + id,
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
        var buttonAdd = $("#add-blog-button");
        var buttonRemove = $("#remove-blog-button");
        var className = ".dynamic-blog-url";
        var count = 0;
        var field = "";
        var maxFields = 50;

        function totalFields() {
            return $(className).length;
        }

        function addNewField() {
            var total = $('input[name="blog_url[]"]').length;
            count = totalFields() + 1;
            field = $("#dynamic-blog-url-list-1").clone();
            field.attr("id", "dynamic-blog-url-" + count);
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