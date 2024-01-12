<div class="container-fluid">
    @php
        $project = App\Models\Project::where('id',$project_id)->first();
        $deal = App\Models\Deal::where('id',$project->deal_id)->first();
        $currency = App\Models\Currency::where('id',$deal->original_currency_id)->first();
        $client = App\Models\User::where('id',$project->client_id)->first();
        $pm = App\Models\User::where('id',$project->pm_id)->first();
        $pm_goal = App\Models\ProjectPmGoal::where('project_id',$project->id)->groupBy('project_id')->first();
        $pm_goal_file = App\Models\ProjectPmGoalFile::where('project_id',$project->id)->get();
        // dd($pm_goal_file);
    @endphp
    <div class="row">
        <div class="col-md-12">
            <div class="card mt-3 p-3" style="border: none">
                <div class="card-title">
                    <h5>Reciew Extend Request</h5>
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
                        <p>Project Manager :</p>
                    </div>
                    <div class="col-md-8">
                        <p>{{$pm->name}}</p>
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
                <div class="mt-3">
                    <p>Screenshot:</p>
                    <div class="d-flex">
                        @foreach ($pm_goal_file as $image)
                            @if($image !=null)
                                <a class="mx-2" href="https://seopage1storage.s3.ap-southeast-1.amazonaws.com/{{ $image->file_name }}" target="_blank">
                                    <img src="https://seopage1storage.s3.ap-southeast-1.amazonaws.com/{{ $image->file_name }}" alt="" class="img-thumbnail" width="100" height="100">
                                </a>
                            @endif
                        @endforeach
                    </div>
                </div>
                <br>
                <hr>
                <br>
                <form id="submitForm">
                    @csrf
                    <div class="row mt-3">
                        <div class="col-md-4">
                            <label class="f-14 text-dark-grey mb-12" data-label="true" for="extended_day">Extended Day
                                <sup class="f-14 mr-1">*</sup>
                            </label>
                        </div>
                        <div class="col-md-8">
                            <div class="form-group">
                                <input type="number" class="form-control height-35 f-14" value="{{$pm_goal->extended_day}}" name="extended_day" id="extended_day">
                                <label id="extended_day_error" class="text-danger" for="extended_day"></label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="text-dark-grey" data-label="true" for="is_any_negligence">Reason
                                    <sup class="mr-1">*</sup>
                                </label>
                                <textarea name="is_any_negligence" id="is_any_negligence" class="form-control"></textarea>
                               <script src="{{ asset('/ckeditor/ckeditor.js') }}"></script>
                                <script>
                                    CKEDITOR.replace('is_any_negligence');
                                </script>
                                <label id="is_any_negligence_error" class="text-danger" for="is_any_negligence"></label>
                            </div>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary acceptBtn" data-id="1">Accept</button>
                    <button type="submit" class="btn btn-danger rejectBtn" data-id="0">Reject</button>
                </form>
            </div>
        </div>
    </div>
</div>

<script>
    $(document).ready(function() {
        $('#submitForm').on('submit',function (e) {
            e.preventDefault();
            var dataId = $(document.activeElement).data('id');
            $(document.activeElement).attr("disabled", true);
            $(document.activeElement).html("Processing...");
            var is_any_negligence = CKEDITOR.instances.is_any_negligence.getData();
            var data= {
                '_token': "{{ csrf_token() }}",
                'extended_day': document.getElementById("extended_day").value,
                'is_any_negligence': is_any_negligence,
                'project_id' : {{$project->id}},
                'status': dataId,
            }
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                type: "POST",
                url: "{{route('project-status-extend-request-accept')}}",
                data: data,
                dataType: "json",
                success: function (response) {
                    toastr.success('Extend Request Submite Successfully');
                    window.location.reload();
                    $(document.activeElement).attr("disabled", false);
                    $(document.activeElement).html("Accept");
                },
                error: function(error) {
                    if(error.responseJSON.errors.extended_day){
                        $('#extended_day_error').text(error.responseJSON.errors.extended_day);
                    }else{
                        $('#extended_day_error').text('');
                    }
                    if(error.responseJSON.errors.is_any_negligence){
                        $('#is_any_negligence_error').text(error.responseJSON.errors.is_any_negligence);
                    }else{
                        $('#is_any_negligence_error').text('');
                    }
                    $(document.activeElement).attr("disabled", false);
                    $(document.activeElement).html("Accept");
                }
            });
        });
    });
</script>