@push('datatable-styles')
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css">


@endpush

<style>
           #add-button {
               background: white;
               border: 1px solid #1d82f5;
           }
           #remove-button {
               background: white;
               border: 1px solid red;
           }
           .btn-secondary2 {

	padding: 6px 11px;

}
       </style>
       <style>
               label.error {
                   color: #dc3545;
                   font-size: 14px;
               }
           </style>

<div class="modal fade" data-id="id" id="dealstmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title"  id="exampleModalLabel">Convert Lead to Deal (Contact Made)</h5>
        <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
      </div>
      <form class="" action="{{route('deal-stage')}}" id="lead-convert" method="post">
        @csrf
        <input type="hidden"  name="id"  id="mydata">


      <div class="modal-body">
          <div class="row">
              <div class="col-md-12">
                  <label for="input-state-2" class="form-label"><strong>Status <span style="color:red;">*<span></strong></label>
                  <input readonly class="form-control height-35 f-14" value="Contact Made"  name="deal_stage"  placeholder="Contract Made" autocomplete="off"></input>
              </div>
              <div class="col-md-12 mt-3">
                  <label for="Client Username">
                      <strong>Client Username<span style="color:red;">*<span></strong>
                      <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Type Client Username" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                          <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                      </svg>
                  </label>
                  <input class="form-control height-35 f-14 client-search"  name="client_username" id="client_username"  placeholder="Enter Client Username" autocomplete="off"></input>
                  <label id="clientUsernameError" class="error text-danger" for="client_username"></label>

              </div>
              <div class="col-md-12 mt-3">
                  <label for="Client Username">
                      <strong>Client Profile Link<span style="color:red;">*<span></strong>
                      <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Type profile link from Freelancer.com." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                          <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                      </svg>
                  </label>
                  <input class="form-control height-35 f-14" id="profile_link"  name="profile_link"  placeholder="Enter Profile Link" autocomplete="off"></input>
              </div>
              <label class="mt-3" for="Client Username"><strong>Client Message Thread Link</strong>
                  <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Type message thread link" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                      <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                  </svg>
              </label>
              <div class="col-md-9 dynamic-field" id="dynamic-field-1">
                  <div class="row">
                      <div class="col-md-12 my-2">
                          <div class="form-group">
                              <input type="text" id="message_link"  class="form-control height-35 f-14" placeholder="Add Link Here" name="message_link[]" autocomplete="off"/>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="col-md-3 my-2 form-group append-buttons">
                  <div class="clearfix">
                      <button type="button" id="add-button" class="btn btn-secondary2 float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                      <button type="button" id="remove-button" class="btn btn-secondary2 float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                  </div>
              </div>
              <div class="col-md-12 col-lg-12">
                  <div class="form-group">
                      <label class="text-dark-grey" data-label="true" for="commentsText"><strong>Comments</strong>
                          <sup class="mr-1">*</sup>
                          <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Comments" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                              <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                          </svg>
                      </label>
                      <textarea name="comments" id="commentsText" class="form-control"></textarea>
                     <script src="{{ asset('/ckeditor/ckeditor.js') }}"></script>
                      <script>
                          CKEDITOR.replace('comments');
                      </script>
                  </div>
              </div>
              <br>
              <ul id="errorMsg">

              </ul>
          </div>
      </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button  id="lead-convert-button" class="btn btn-primary">Convert</button>
            </div>
      </form>
    </div>
  </div>
</div>
@push('scripts')
    <script type="text/javascript">
        function hello() {
            e.preventDefault();
            console.log('ooooo');
        }
        $('#lead-convert-button').click(function(e){
            e.preventDefault();
            // alert('success');
            var message_links = document.getElementsByName("message_link[]");
            var message_links_values = [];
            for (var i = 0; i < message_links.length; i++) {
                message_links_values.push(message_links[i].value);
            }
            var comments = CKEDITOR.instances.commentsText.getData();
            // console.log(message_links_values);
            var data= {
                '_token': "{{ csrf_token() }}",
                'client_username': document.getElementById("client_username").value,
                'profile_link': document.getElementById("profile_link").value,
                'message_link': message_links_values,
                'comments': comments,
                'id': document.getElementById("mydata").value,
            }
            // console.log(data);
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                type: "POST",
                url: "{{route('deal-stage')}}",
                data: data,
                dataType: "json",
                success: function (response) {
                    // console.log(response.status);
                    if (response.status == 400) {
                        $('#errorMsg').html("");
                        $("#lead-convert-button").text("Convert");
                        $("#lead-convert-button").attr("disabled", false);
                        $('#errorMsg').addClass('alert alert-danger');
                        $.each(response.errors, function (key, err_values){
                            $('#errorMsg').append('<li>'+err_values+'</li>');
                        });
                    }else{
                        $('#lead-convert').trigger("reset");
                        $('#dealstmodal').hide();
                        $('.table').DataTable().ajax.reload();
                    }
                },
            });
        });

    </script>
    <script>
        $("#lead-convert-button").on('click',function() {
            $("#lead-convert-button").attr("disabled", true);
            $("#lead-convert-button").text("Processing ...");
        })
    </script>
    <script>
        $(document).ready(function () {
            var buttonAdd = $("#add-button");
            var buttonRemove = $("#remove-button");
            var className = ".dynamic-field";
            var count = 0;
            var field = "";
            var maxFields = 50;

            function totalFields() {
                return $(className).length;
            }

            function addNewField() {
                count = totalFields() + 1;
                field = $("#dynamic-field-1").clone();
                field.attr("id", "dynamic-field-" + count);
                field.children("label").text("Field " + count);
                field.find("input").val("");
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
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            document.querySelector("form").addEventListener("submit", function() {
                document.querySelector("#lead-convert-button").setAttribute("disabled", "disabled");
            });
        });
    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-3-typeahead/4.0.1/bootstrap3-typeahead.min.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {
            $('#client_username').on('paste', function(e) {
                setTimeout(function() {
                    var trimmedValue = $('#client_username').val().trim();
                    var inputVal = '';
                    trimmedValue.split('').forEach(function(char, index) {
                        setTimeout(function() {
                            inputVal += char;
                            $('#client_username').val(inputVal);
                        }, index * 10); // Adjust the delay time as needed
                    });
                }, 0);
            });
        });
        
        $("#client_username").on('keydown', function(e) {
            $('#clientUsernameError').text('');
            if (e.keyCode === 32) {
                e.preventDefault();
                $('#clientUsernameError').text('Space not allowed!!!!');
                return false;
            }
        });

        $('.modal-body').click(function() {
            $('#clientUsernameError').text('');
        })

        $('#client_username').keypress(function() {
            $('#client_name').val('');
            $('#client_name').removeAttr('disabled');
            $('.existingClientSuccess').hide();
            $('.existingClientAdded').show();
        });

        $('#client_username').keyup(function() {
            $('#client_name').val('');
            $('#client_name').removeAttr('disabled');
            $('.existingClientSuccess').hide();
            $('.existingClientAdded').show();
        });

        var path = "{{ route('client-search') }}";

        $('.client-search').typeahead({
            source: function (query, process) {
                return $.get(path, {
                    query: $.trim(query)
                }, function (data) {
                    var results = data.map(function(item){
                        if (item.name.toLowerCase() == $('#client_username').val().toLowerCase() || item.user_name.toLowerCase() == $('#client_username').val().toLowerCase()) {
                            $('.existingClientSuccess').show();
                            getData(item.name, item.user_name);
                            return '';
                        } else {
                            return '<div class="my-custom-typeahead" name="'+item.name+'" username="'+item.user_name+'"><button class="getData">'+ item.name +' ('+item.user_name+' )</button></div>';
                        }
                    });
                    return process(results);
                });
            },
            highlighter: function (item) {
                return item;
            },
            updater: function (item) {
                var text = $(item).text(); // extract text content of button element
                this.$element.val('text'); // set value of input field to extracted text
                getData($(item).attr('name'), $(item).attr('username'))
                // $('#client_username').val($(item).attr('username'));
                return $.trim($(item).attr('username')); // return extracted text to highlighter function
            }
        })

        function getData(name, username) {
            $('#client_username').val(username);
            $('#client_name').val(name);
            $('#client_name').attr('disabled','disabled');
            $('.existingClientSuccess').show();
            $('.existingClientAdded').hide();
        }
    </script>
@endpush
