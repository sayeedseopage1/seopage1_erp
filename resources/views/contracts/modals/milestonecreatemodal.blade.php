
<div class="modal fade" id="milestoneaddmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Create Milestone</h5>
                <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
            </div>
            <?php
            $currencies= App\Models\Currency::all();

            ?>

            <div class="modal-body">

                <ul id="saveform_errList">

                </ul>
                <div class="row">


                    <div class="col-md-6">

                        <div class="form-group">
                            <label for="exampleFormControlInput1">Milestone Title <span style="color:red;">*</span></label>
                            <input type="text" name="title" class="form-control title height-35 f-14" id="exampleFormControlInput1"  placeholder="Milestone Name">
                        </div>

                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Milestone Cost <span style="color:red;">*</span></label>
                            <input type="text" name="cost" class="form-control cost height-35 f-14" id="exampleFormControlInput1"  placeholder="Milestone Cost">
                        </div>

                    </div>
                    <?php
                    $original_currency_id = App\Models\Currency::where('id',$deal->original_currency_id)->first();
                    ?>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Currency <span style="color:red;">*</span></label>
                            <input type="text" id="original_currency_id"  readonly value="{{$original_currency_id->currency_code}}({{$original_currency_id->currency_symbol}})"  class="form-control original_currency_id height-35 f-14" id="exampleFormControlInput1"  placeholder="{{$original_currency_id->currency_code}}({{$original_currency_id->currency_symbol}})">
                        </div>

                    </div>
                    <div class="col-md-6">
                        <div class="form-group">

                            <label for="exampleFormControlTextarea1">Milestone Type <span style="color:red;">*</span></label>
                            <select class="form-control milestone_type height-35 f-14" name="milestone_type">



                                <option value="Proposed Milestone">Proposed Milestone</option>
                                <option value="Client Agreed to this Milestone">Client Agreed to this Milestone</option>
                                <option value="Client Created this Milestone">Client Created this Milestone</option>

                            </select>
                        </div>
                    </div>



                    <div class="col-md-12">
                        <div class="form-group">
                            <label for="exampleFormControlTextarea1">Milestone Summary</label>
                            <textarea  name="summary" id="summary1" class="form-control" rows="3" ></textarea>
                            <script src="https://cdn.ckeditor.com/4.19.1/standard/ckeditor.js"></script>
                            <script>
                                CKEDITOR.replace('summary1');
                            </script>
                        </div>

                    </div>



                </div>





            </div>
            <div class="modal-footer">

                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary add_milestone" >Create Milestone</button>

            </div>

        </div>
    </div>
</div>
<script type="text/javascript">



</script>
