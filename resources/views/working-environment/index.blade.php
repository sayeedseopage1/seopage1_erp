@extends('layouts.app')
@section('content')
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-colorpicker/3.4.0/css/bootstrap-colorpicker.min.css" />
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="card mt-3">
                    <div class="card-body">
                        <h3 class="text-center mb-5">Working Environment</h3>
                        <form action="{{route('working-environment-store')}}" method="post">
                            <input type="hidden" name="project_id" id="project_id" value="{{$project_id}}">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="url" class="form-label">Working/Staging Site’s URL</label>
                                        <input type="url" class="form-control height-35 f-14" id="site_url" name="site_url" placeholder="Type Working/Staging Site’s URL">
                                        <span id="site_url_error" class="text-danger"></span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="url" class="form-label">Working/Staging Site’s Login URL</label>
                                        <input type="url" class="form-control height-35 f-14" id="login_url" name="login_url" placeholder="Type Working/Staging Site’s Login URL">
                                        <span id="login_url_error" class="text-danger"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="email" class="form-label">Working/Staging Site’s Login Username/Email </label>
                                        <input type="email" class="form-control height-35 f-14" id="email" name="email" placeholder="Type Working/Staging Site’s Login Username/Email">
                                        <span id="email_error" class="text-danger"></span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="url" class="form-label">Frontend Password</label>
                                        <input type="text" class="form-control height-35 f-14" id="password" name="password" placeholder="Type Frontend Password">
                                        <span id="password_error" class="text-danger"></span>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary mt-3" id="submit-button">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-colorpicker/3.4.0/js/bootstrap-colorpicker.min.js"></script>
    <script>
        $('#submit-button').click(function(e){
            e.preventDefault();
            $('#submit-button').attr("disabled", true);
            $('#submit-button').html("Processing...");
            var data= {
                '_token': "{{ csrf_token() }}",
                'site_url': document.getElementById("site_url").value,
                'login_url': document.getElementById("login_url").value,
                'email': document.getElementById("email").value,
                'password': document.getElementById("password").value,
                'project_id': document.getElementById("project_id").value,
            }
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                type: "POST",
                url: "{{route('working-environment-store')}}",
                data: data,
                dataType: "json",
                success: function (response) {
                    $(location).prop('href', '{{url('account/projects/'.$project_id.'?tab=tasks')}}');
                    toastr.success('Working Environment Added Successfully');
                    $('#submit-button').attr("disabled", false);
                    $('#submit-button').html("Submit");
                },
                error: function(error) {
                    // console.log(response);
                    if(error.responseJSON.errors.site_url){
                        $('#site_url_error').text(error.responseJSON.errors.site_url);
                    }else{
                        $('#site_url_error').text('');
                    }
                    if(error.responseJSON.errors.login_url){
                        $('#login_url_error').text(error.responseJSON.errors.login_url);
                    }else{
                        $('#login_url_error').text('');
                    }
                    if(error.responseJSON.errors.email){
                        $('#email_error').text(error.responseJSON.errors.email);
                    }else{
                        $('#email_error').text('');
                    }
                    if(error.responseJSON.errors.password){
                        $('#password_error').text(error.responseJSON.errors.password);
                    }else{
                        $('#password_error').text('');
                    }
                    $('#submit-button').attr("disabled", false);
                    $('#submit-button').html("Submit");
                }
            });
        });
    </script>
@endsection
