<div class="modal fade" id="revision" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Revision</h5>
                <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
            </div>
            <form  action="{{route('tasks.client_has_revision')}}" method="post">
                @csrf
                <div class="modal-body">
                    <div class="container">
                        <div class="mb-3">
                            <label class="f-14 text-dark-grey"  for="">Select Sub Task</label>
                            <span style="color:red;">*</span>
                            <i class="fa fa-question-circle" data-toggle="popover" data-placement="top" data-content="" data-html="true" data-trigger="hover"></i>
                            <div class="select-others height-35 rounded">
                                <div class="dropdown bootstrap-select form-control height-35 f-14 select-picker">
                                    @php
                                        $subTasks = \App\Models\SubTask::where('task_id',$task->id)->get();
                                    @endphp
                                    <div class="dropdown bootstrap-select form-control height-35 f-14 select-picker dropup">
                                        <select class="form-control height-35 f-14 select-picker" name="subTask_id" id="subTask_id" tabindex="null">
                                            <option value="">--</option>
                                            @foreach($subTasks as $val)
                                                <option value="{{$val->id}}">{{$val->title}}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="text-dark-grey" data-label="true" for="descriptionText">Comments</label>
                            <span style="color:red;">*</span>
                            <i class="fa fa-question-circle" data-toggle="popover" data-placement="top" data-content="" data-html="true" data-trigger="hover"></i>
                            <textarea name="description" id="descriptionText" class="form-control"></textarea>
                            <script src="https://cdn.ckeditor.com/4.19.1/standard/ckeditor.js"></script>
                            <script>
                                CKEDITOR.replace('description',{
                                    height:100,
                                });
                            </script>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary" name="client_has_revision" id="submitBtn">Submit</button>

                </div>
            </form>
        </div>
    </div>
</div>



