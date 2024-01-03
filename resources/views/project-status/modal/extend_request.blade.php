<div class="container-fluid">
    @php
        $project = App\Models\Project::where('id',$project_id)->first();
        $deal = App\Models\Deal::where('id',$project->deal_id)->first();
        $currency = App\Models\Currency::where('id',$deal->original_currency_id)->first();
        $client = App\Models\User::where('id',$project->client_id)->first();
    @endphp
    <div class="row">
        <div class="col-md-12">
            <div class="card mt-3 p-3" style="border: none">
                <div class="card-title">
                    <h5>Extend Request</h5>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <p>Project Name :</p>
                    </div>
                    <div class="col-md-8">
                        <p>{{$project->project_name}}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <p>Client :</p>
                    </div>
                    <div class="col-md-8">
                        <p>{{$client->name}}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <p>Project Budget :</p>
                    </div>
                    <div class="col-md-8">
                        <p>{{($project->project_budget).' '. $currency->currency_code}}</p>
                    </div>
                </div>
                <form enctype="multipart/form-data">
                    <div class="row mt-3">
                        <div class="col-md-4">
                            <label class="f-14 text-dark-grey mb-12" data-label="true" for="extended_day">Extended Day
                                <sup class="f-14 mr-1">*</sup>
                            </label>
                        </div>
                        <div class="col-md-8">
                            <div class="form-group">
                                <input type="number" class="form-control height-35 f-14" placeholder="0" name="extended_day" id="extended_day">
                                <label id="extended_day_error" class="text-danger" for="extended_day"></label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <label class="f-14 text-dark-grey mb-12" data-label="true" for="screenshot ">Screenshot
                                <sup class="f-14 mr-1">*</sup>
                            </label>
                        </div>
                        <div class="col-md-8">
                            <div class="form-group">
                                <input type="file" class="form-control height-35 f-14"  name="screenshot[]" id="screenshot" multiple>
                                <label id="screenshot_error" class="text-danger" for="screenshot"></label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="text-dark-grey" data-label="true" for="is_client_communication">Reason
                                    <sup class="mr-1">*</sup>
                                </label>
                                <textarea name="is_client_communication" id="is_client_communication" class="form-control"></textarea>
                               <script src="{{ asset('/ckeditor/ckeditor.js') }}"></script>
                                <script>
                                    CKEDITOR.replace('is_client_communication');
                                </script>
                                <label id="is_client_communication_error" class="text-danger" for="is_client_communication"></label>
                            </div>
                        </div>
                    </div>
                    <button type="button" class="btn btn-primary" id="extendedRequestBtn">Submit</button>
                </form>
            </div>
        </div>
    </div>
</div>

<script>
    $(document).ready(function () {
        $('#extendedRequestBtn').click(function (e) {
            e.preventDefault();
            $('#extendedRequestBtn').attr("disabled", true);
            $('#extendedRequestBtn').html("Processing...");

            var is_client_communication = CKEDITOR.instances.is_client_communication.getData();
            var formData = new FormData();
            formData.append('_token', "{{ csrf_token() }}");
            formData.append('extended_day', document.getElementById("extended_day").value);
            formData.append('is_client_communication', is_client_communication);
            formData.append('project_id', {{$project->id}});

            var screenshot = $('#screenshot')[0].files;
            for (var i = 0; i < screenshot.length; i++) {
                formData.append('screenshot[]', screenshot[i]);
            }

            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });

            $.ajax({
                type: "POST",
                url: "{{ route('store_pm_extend_request') }}",
                data: formData,
                dataType: "json",
                processData: false,
                contentType: false,
                success: function (response) {
                    toastr.success('Extend Request Submit Successfully');
                    window.location.reload();
                    $('#extendedRequestBtn').attr("disabled", false);
                    $('#extendedRequestBtn').html("Submit");
                },
                error: function (error) {
                    if (error.responseJSON.errors.screenshot) {
                        $('#screenshot_error').text(error.responseJSON.errors.screenshot);
                    } else {
                        $('#screenshot_error').text('');
                    }
                    if (error.responseJSON.errors.extended_day) {
                        $('#extended_day_error').text(error.responseJSON.errors.extended_day);
                    } else {
                        $('#extended_day_error').text('');
                    }
                    if (error.responseJSON.errors.is_client_communication) {
                        $('#is_client_communication_error').text(error.responseJSON.errors.is_client_communication);
                    } else {
                        $('#is_client_communication_error').text('');
                    }
                    $('#extendedRequestBtn').attr("disabled", false);
                    $('#extendedRequestBtn').html("Submit");
                }
            });
        });
    });
</script>