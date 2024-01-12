<!-- Modal -->
<div class="modal fade" id="resolve{{$item->project_id}}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Resolve</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        @php
            $project = App\Models\Project::where('id',$item->project_id)->first();
            $client = App\Models\User::where('id',$project->client_id)->first();
            $pm = App\Models\User::where('id',$project->pm_id)->first();
        @endphp
        <div class="modal-body">
            <div class="container">
                <div class="row">
                    <div class="col-md-2">
                        <p>Project Name :</p>
                    </div>
                    <div class="col-md-10">
                        <p>{{$project->project_name}}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2">
                        <p>Client Name :</p>
                    </div>
                    <div class="col-md-10">
                        <p>{{$client->name}}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2">
                        <p>Project Manager :</p>
                    </div>
                    <div class="col-md-10">
                        <p>{{$pm->name}}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2">
                        <p>Project Category :</p>
                    </div>
                    <div class="col-md-10">
                        <p>{{$item->project_category}}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2">
                        <p>Project Start Date :</p>
                    </div>
                    <div class="col-md-10">
                        <p>{{$project->start_date}}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2">
                        <p>Deadline :</p>
                    </div>
                    <div class="col-md-10">
                        <p>{{$project->deadline}}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2">
                        <p>Description :</p>
                    </div>
                    <div class="col-md-10">
                        <p>{{$item->description ? : '--'}}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2">
                        <p>Reason :</p>
                    </div>
                    <div class="col-md-10">
                        <p>{!!$item->reason ? : '--'!!}</p>
                    </div>
                </div>
                <hr>
                <form id="resolveFormSubmit">
                    <div class="row mt-5">
                        <div class="col-md-2">
                            <label class="f-14 text-dark-grey mb-12" data-label="true" for="rating">Rating
                                <sup class="f-14 mr-1">*</sup>
                            </label>
                        </div>
                        <div class="col-md-10">
                            <div class="form-group">
                                <select class="form-control height-35 f-14" id="rating" name="rating">
                                    <option value="">--</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                                <label id="rating_error" class="text-danger" for="rating"></label>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="text-dark-grey" data-label="true" for="suggestion">Suggestion
                                    <sup class="mr-1">*</sup>
                                </label>
                                <textarea name="suggestion" id="suggestion" class="form-control"></textarea>
                               <script src="{{ asset('/ckeditor/ckeditor.js') }}"></script>
                                <script>
                                    CKEDITOR.replace('suggestion');
                                </script>
                                <label id="suggestion_error" class="text-danger" for="suggestion"></label>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="text-dark-grey" data-label="true" for="comment">Comment
                                    <sup class="mr-1">*</sup>
                                </label>
                                <textarea name="comment" id="comment" class="form-control"></textarea>
                                <script>
                                    CKEDITOR.replace('comment');
                                </script>
                                <label id="comment_error" class="text-danger" for="comment"></label>
                            </div>
                            <button type="submit" id="resolveSubmit" class="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
        </div>
    </div>
    </div>
    
    <script>
        $('#resolveSubmit').click(function(e){
            e.preventDefault();
            $('#resolveSubmit').attr("disabled", true);
            $('#resolveSubmit').html("Processing...");
            var suggestion = CKEDITOR.instances.suggestion.getData();
            var comment = CKEDITOR.instances.comment.getData();
            var data= {
                '_token': "{{ csrf_token() }}",
                'rating': document.getElementById("rating").value,
                'suggestion': suggestion,
                'comment': comment,
                'project_pm_goal_id' : {{$item->id}}
            }
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                type: "POST",
                url: "{{route('project-status-resolve-submit')}}",
                data: data,
                dataType: "json",
                success: function (response) {
                    toastr.success('Resolved Successfully');
                    window.location.reload();
                    $('#resolveSubmit').attr("disabled", false);
                    $('#resolveSubmit').html("Submit");
                },
                error: function(error) {
                    if(error.responseJSON.errors.rating){
                        $('#rating_error').text(error.responseJSON.errors.rating);
                    }else{
                        $('#rating_error').text('');
                    }
                    if(error.responseJSON.errors.suggestion){
                        $('#suggestion_error').text(error.responseJSON.errors.suggestion);
                    }else{
                        $('#suggestion_error').text('');
                    }
                    if(error.responseJSON.errors.comment){
                        $('#comment_error').text(error.responseJSON.errors.comment);
                    }else{
                        $('#comment_error').text('');
                    }
                    $('#resolveSubmit').attr("disabled", false);
                    $('#resolveSubmit').html("Submit");
                }
            });
        });
    
    </script>