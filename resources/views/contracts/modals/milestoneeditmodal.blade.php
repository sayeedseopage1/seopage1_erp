
<div class="modal fade" id="editmilestone" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Edit Milestone</h5>
                <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
            </div>

            <?php
            $currencies= App\Models\Currency::all();

            ?>




            <div class="modal-body">

                <ul id="updateform_errList">

                </ul>
                <input type="hidden" id="milestone_id" value="">

                <div class="row">


                    <div class="col-md-6">

                        <div class="form-group">
                            <label for="exampleFormControlInput1">Milestone Title <span style="color:red;">*</span>
                                <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Write the milestone description here like “Home page development”, “Hosting setup” etc. Don’t put Milestone 1, Milestone 2 etc. here." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                    <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                </svg>
                            </label>
                            <input type="text" name="title" id="title" class="form-control title height-35 f-14" id="exampleFormControlInput1"  placeholder="Milestone Name">
                        </div>

                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Milestone Cost <span style="color:red;">*</span></label>
                            <input type="text" id="cost" name="cost" class="form-control cost height-35 f-14" id="exampleFormControlInput1"  placeholder="Milestone Cost">
                        </div>

                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Currency <span style="color:red;">*</span></label>
                            <input type="text"  readonly value="{{$deal->original_currency->currency_code}}({{ $deal->original_currency->currency_symbol}})"  class="form-control cost height-35 f-14" id="exampleFormControlInput1"  placeholder="Milestone Cost">
                        </div>

                    </div>
                    <div class="col-md-6">
                        <div class="form-group">

                            <label for="exampleFormControlTextarea1">Milestone Type <span style="color:red;">*</span></label>
                            <select class="form-control milestone_type height-35 f-14" id="milestone_type" name="milestone_type">

                                <option value="Proposed Milestone">Proposed Milestone</option>
                                <option value="Client Agreed to this Milestone">Client Agreed to this Milestone</option>
                                <option value="Client Created this Milestone">Client Created this Milestone</option>

                            </select>
                        </div>
                    </div>

                    <div class="col-md-12">
                        <div class="form-group">
                            <label for="exampleFormControlTextarea1">Milestone Summary
                                <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="If you don’t have anything to elaborate here, just keep it same as milestone title." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                    <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                </svg>
                            </label>
                            <textarea  name="summary"  id="summary2" class="form-control" rows="3" ></textarea>
                           <script src="//cdn.ckeditor.com/4.21.0/standard/ckeditor.js"></script>
                            <script>
                                CKEDITOR.replace('summary2');
                            </script>

                        </div>

                    </div>



                </div>





            </div>
            <div class="modal-footer">

                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary update_milestone" >Update Milestone</button>

            </div>

        </div>
    </div>
</div>
