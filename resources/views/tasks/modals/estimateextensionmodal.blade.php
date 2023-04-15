<div class="modal fade" id="estimationextensionrequest" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Make Extension Request</h5>
                <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
            </div>
            <form action="#" method="post" enctype="multipart/form-data" id="taskChange">
                @csrf
               
                <input type="hidden" name="user_id" value="{{Auth::user()->id}}">

                <div class="modal-body">
                    <div class="row ml-2">
                    <div class="col-md-6 mt-4">
                        <div class="form-group">
              
                      <label for="exampleFormControlTextarea1">Select Deliverable<span style="color:red;">*</span>
                          <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Milestone" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                              <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                          </svg>
                      </label>
                    <select class="form-control height-35 f-14" name="milestone_id" id="milestone_id">
                        @php
                            $deliverables= App\Models\ProjectDeliverable::where('project_id',$project->id)->get();
                           // dd($deliverables);
                        @endphp
                      @foreach($deliverables as $milestone)
                      <option value="{{$milestone->id}}">{{$milestone->title}}</option>
                     @endforeach
              
                    </select>
                            <label id="milestoneError" class="text-danger" for=""></label>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group mt-3">
                            <label class="f-14 text-dark-grey mb-12" data-label="true" for="milestone_title">Previous Date
                                    <sup class="f-14 mr-1">*</sup>
                            
                            </label>
                             <input type="text" readonly class="form-control height-35 f-14" placeholder="Enter milestone title" value="2023-04-10" name="milestone_title" id="milestone_title">
                            
                                </div>
                    </div>
                    </div>
                    <div class="row ml-2">
                        
                            <div class="col-md-6">
                                <div class="form-group mt-3">
                                        <label class="f-14 text-dark-grey mb-12" data-label="true" for="milestone_title">Due Date
                                                <sup class="f-14 mr-1">*</sup>
                                        
                                        </label>
                                         <input type="text" readonly class="form-control height-35 f-14" placeholder="Enter milestone title" value="2023-04-10" name="milestone_title" id="milestone_title">
                                        
                                            </div>
                               
                            </div>
                            <div class="col-md-6">
                                <div class="form-group mt-3">
                                        <label class="f-14 text-dark-grey mb-12" data-label="true" for="milestone_title">Request Time (In hours)
                                                <sup class="f-14 mr-1">*</sup>
                                        
                                        </label>
                                         <input type="text" class="form-control height-35 f-14" placeholder="Enter milestone title" value="2023-04-10" name="milestone_title" id="milestone_title">
                                        
                                            </div>
                               
                            </div>

                    </div>
                   
                   
                    <div class="row ml-1 mx-0">
                        
                        <div class="mb-3 mt-3 ml-3">
                            Explain Reason<sup class="f-14 mr-1 text-danger">*</sup>
                           
                        </div>
                        <div class="col-md-12">
                            <textarea name="text" id="text" class="form-control"></textarea>
                           <script src="//cdn.ckeditor.com/4.21.0/standard/ckeditor.js"></script>
                            <script>
                                CKEDITOR.replace('text',{
                                    height :100,
                                });
                            </script>
                            <label id="textError" class="text-danger" for="text"></label>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary" id="submitBtn">Submit</button>
                </div>
            </form>
        </div>
    </div>
</div>
<script>
    
</script>
