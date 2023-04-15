{{--<link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.css" rel="stylesheet">--}}
<link rel="stylesheet" href="{{ asset('vendor/css/dropzone.min.css') }}">

<div class="row">
    <div class="col-sm-12">
        <form action="#" method="post" id="updateDeal">
          @csrf
          <input type="hidden" name="id" value="{{$deal->id}}">
            <div class="add-client bg-white rounded">
                <h4 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                    @lang('Update Deal')</h4>
                <div class="row p-20">
                    <div class="col-lg-4 col-md-6">
                        <label for="">Client Name</label>
                        <sup class="text-danger f-14 mr-1">*</sup>
                        <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Type Client Name" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                            <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                        </svg>
                        <input type="text" class="form-control height-35 f-14" name="client_name" id="client_name" value="{{$deal->client_name}}" autocomplete="off">
                        <label id="clientNameError" class="error text-danger" for="client_name"></label>
                    </div>
                    <div class="col-lg-4 col-md-6">
                        <label for="">Client User Name</label>
                        <sup class="text-danger f-14 mr-1">*</sup>
                        <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Type Client Username" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                            <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                        </svg>
                        <input type="text" class="form-control height-35 f-14" name="client_username" id="client_username" value="{{$deal->client_username}}" autocomplete="off" readonly>
                        <label id="clientUserNameError" class="error text-danger" for="client_username"></label>
                    </div>
                    <div class="col-lg-4 col-md-4">
                        <label for="">Project Name</label>
                        <sup class="text-danger f-14 mr-1">*</sup>
                        <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Type project name from Freelancer.com." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                            <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                        </svg>
                        <input type="text" class="form-control height-35 f-14" name="project_name" id="project_name" value="{{$deal->project_name}}" autocomplete="off">
                        <label id="projectNameError" class="error text-danger" for="project_name"></label>
                    </div>
                      <?php
                       $currencies= App\Models\Currency::all();

                       ?>
                    <div class="col-md-6 col-lg-6 mt-3 ">
                        <div class="form-group c-inv-select mb-lg-0 mb-md-0 mb-4">
                            <label class="f-14 text-dark-grey mb-12" data-label="" for="original_currency_id">Currency</label>
                            <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Copy the project URL from the browser and paste it here." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                            </svg>
                            <div class="select-others height-35 rounded">
                                <div class="dropdown bootstrap-select form-control height-35 f-14 select-picker">
                                    <select class="form-control height-35 f-14 select-picker" name="original_currency_id" id="original_currency_id">
                                        <option selected="" value="{{$deal->original_currency_id}}">  {{ $deal->original_currency->currency_code . ' (' . $deal->original_currency->currency_symbol . ')' }}</option>
                                        @foreach($currencies as $currency)
                                            <option value="{{ $currency->id }}">{{ $currency->currency_code . ' (' . $currency->currency_symbol . ')' }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6 mt-3">
                        <label for="">Project Budget</label>
                        <sup class="text-danger f-14 mr-1">*</sup>
                        <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Enter the project budget from Freelancer.com." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                            <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                        </svg>
                        <input type="text" class="form-control height-35 f-14" name="amount" id="amount" value="{{$deal->actual_amount}}" autocomplete="off">
                        <label id="amountError" class="error text-danger" for="amount"></label>
                    </div>
                    <div class="col-lg-12 col-md-12 mt-3">
                        <label for="">Project Link</label>
                        <sup class="text-danger f-14 mr-1">*</sup>
                        <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Copy the project URL from the browser and paste it here." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                            <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                        </svg>
                        <input type="text" class="form-control height-35 f-14" name="project_link" id="project_link" value="{{$deal->project_link}}" autocomplete="off">
                        <label id="projectLinkError" class="error text-danger" for="project_link"></label>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group">
                            <label class="text-dark-grey" data-label="true" for="description">Project Description
                                <sup class="mr-1">*</sup>
                                <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Copy the project description from Freelancer.com and paste it here." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                    <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                </svg>
                            </label>
                            <textarea name="description" value="{{$deal->description}}" id="description" class="form-control">{!!$deal->description!!}</textarea>
                            <script src="http://cdn.ckeditor.com/4.19.1/standard/ckeditor.js"></script>
                            <script>
                                CKEDITOR.replace('description');
                            </script>
                            <label id="descriptionError" class="error text-danger" for="description"></label>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6">
                      <button type="submit" class="btn btn-primary" id="updateBtn" disabled>Update Deal</button>
                </div>
                <br>
                <br>
            </div>
        </form>
    </div>
</div>


<script src="{{ asset('vendor/jquery/dropzone.min.js') }}"></script>
<script>
    $('#updateBtn').click(function(e){
        // alert("success");
        e.preventDefault();
        var description = CKEDITOR.instances.description.getData();
        // console.log(description);
        var data= {
            '_token': "{{ csrf_token() }}",
            'client_name': document.getElementById("client_name").value,
            'client_username': document.getElementById("client_username").value,
            'project_name': document.getElementById("project_name").value,
            'original_currency_id': document.getElementById("original_currency_id").value,
            'amount': document.getElementById("amount").value,
            'project_link': document.getElementById("project_link").value,
            'description': description,
            'id': {{$deal->id}},
        }
        // console.log(data);
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type: "POST",
            url: "{{route('update.deal')}}",
            data: data,
            dataType: "json",
            success: function (response) {
                console.log(response.status);
                $('#createDeal').trigger("reset");
                $('.error').html("");
                if (response.status == 'success') {
                    toastr.success('Deals Updated Successfully');
                    window.location.href = response.redirectUrl;
                }
            },
            error: function(error) {
                if (error) {
                    $('#clientNameError').html(error.responseJSON.errors.client_name);
                    $('#clientUserNameError').html(error.responseJSON.errors.client_username);
                    $('#projectNameError').html(error.responseJSON.errors.project_name);
                    $('#projectLinkError').html(error.responseJSON.errors.project_link);
                    $('#amountError').html(error.responseJSON.errors.amount);
                    $('#descriptionError').html(error.responseJSON.errors.description);
                    $('#commentsError').html(error.responseJSON.errors.comments);
                }
            }
        });
    });

</script>
<script>
    const form = document.getElementById('updateDeal');
    const button = document.getElementById('updateBtn');
    const name = document.getElementById('client_name');
    const username = document.getElementById('client_username');
    const projectName = document.getElementById('project_name');
    const projectLink = document.getElementById('project_link');
    const amount = document.getElementById('amount');


    form.addEventListener('input', () => {
        let valid = true;
        if (name.value.trim() === '') {
            valid = false;
            clientNameError.textContent = 'Please enter the client name!';
        } else {
            clientNameError.textContent = '';
        }
        if (username.value.trim() === '') {
            valid = false;
            clientUserNameError.textContent = 'Please select client user name!';
        } else {
            clientUserNameError.textContent = '';
        }
        if (projectName.value.trim() === '') {
            valid = false;
            projectNameError.textContent = 'Please select project name!';
        } else {
            projectNameError.textContent = '';
        }
        if (projectLink.value.trim() === '') {
            valid = false;
            projectLinkError.textContent = 'Please enter correct project link (Freelancer.com) with https!';
        } else {
            projectLinkError.textContent = '';
        }
        if (amount.value.trim() === '') {
            valid = false;
            amountError.textContent = 'Please select project budget!';
        } else {
            amountError.textContent = '';
        }
        $("#updateBtn").attr("disabled", false);
        $("#updateBtn").html("Update Deal");
    });
</script>
<script>
    $("#updateBtn").on('click',function() {
        $("#updateBtn").attr("disabled", true);
        $("#updateBtn").html("Updating...");
    });
</script>
<script>


        $('body').on('click', '.add-lead-agent', function() {
            var url = '{{ route('lead-agent-settings.create') }}';
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });

        $('body').on('click', '.add-lead-source', function() {
            var url = '{{ route('lead-source-settings.create') }}';
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });

        $('body').on('click', '.add-lead-category', function() {
            var url = '{{ route('leadCategory.create') }}';
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });

        $('.toggle-other-details').click(function() {
            $(this).find('svg').toggleClass('fa-chevron-down fa-chevron-up');
            $('#other-details').toggleClass('d-none');
        });

        init(RIGHT_MODAL);
    });

    function checkboxChange(parentClass, id){
        var checkedData = '';
        $('.'+parentClass).find("input[type= 'checkbox']:checked").each(function () {
            checkedData = (checkedData !== '') ? checkedData+', '+$(this).val() : $(this).val();
        });
        $('#'+id).val(checkedData);
    }
</script>
{{--  <script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.js"></script>--}}
<script type="text/javascript">
$(document).ready(function() {
  $('#description3').summernote();

});
</script>
