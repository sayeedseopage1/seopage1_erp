@php
    $projectType = $project->deal->project_type;
    $milestones= App\Models\ProjectMilestone::where('project_id',$project->id)->get();

    if ($projectType == 'hourly') {
        $addedMilestones = App\Models\ProjectDeliverable::where('project_id',$project->id)->pluck('milestone_id');
        $milestone = App\Models\ProjectMilestone::where('project_id',$project->id)->whereNotIn('id',$addedMilestones)->first();
    }
@endphp
<div class="modal fade" id="deliverablesaddModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add Deliverable</h5>
        <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
      </div>

        <form class="" action="{{route('add-project-deliverable')}}" method="post" id="addDeliverable">
          @csrf
          <input type="hidden" name="project_id" value="{{$project->id}}">
      <div class="modal-body">
        <div class="row">
          <div class="col-md-6">
              <div class="form-group ">
            <label for="exampleFormControlTextarea1">Deliverable Type<span style="color:red;">*</span>
                    <svg class="svg-inline--fa fa-question-circle fa-w-16 svgText" data-toggle="popover" id="idNew" data-placement="top" data-content="Deliverable Type" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                        <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                    </svg>
            </label>
          <select class="form-control height-35 f-14" name="deliverable_type" id="deliverable_type">
            <option value="Graphics Design" title="All the graphic design tasks will be included here for example logo design, banner design, image design, image editing, image resize, infographic creation etc. etc.">Graphics Design</option>
            <option value="Minor revisions and finalizing the website" title="Any Minor revisions and finalizing a website works should be added under this item.">Minor revisions and finalizing a website</option>
            <option value="Website initial setup (Theme and plugin installation)" title="Any Website initial setup (Theme and plugin installation) works should be added under this item.">Website initial setup (Theme and plugin installation)</option>
            <option value="UI/UX Design" title="All the website designs & mockups should go under UX design. For example, these should all go under UI/UX design (Right now, listed under ): https://prnt.sc/ii2PJhYaTs9J">UI/UX Design</option>
            <option value="Main Page Development" title="All the pages that are money pages (that can generate money/leads) and all the pages that require significant work to develop should go under main page development. Some examples, of these pages are homepage (most important page of a website and generate most of the leads), service page (most important page after homepage), Property listing page (most important page for a real estate website) etc. ">Main Page Development</option>
            <option value="Website design change" title="Any website redesign work or section redesign work should be added under this item.">Website design change </option>
            <option value="Secondary Page Development" title="All the pages that are not money/lead generator or don’t require significant work should be listed as secondary pages. Some examples of these pages are contact (just needs a form in most cases), about (Don’t generate money/leads in most cases. Needed for information), FAQ (Needed for information), privacy policy (Generic & Needed for information), Refund policy (Generic & Needed for information)">Secondary Page Development</option>
            <option value="Content Creation" title="Any content related deliverables will be included here. For example, writing homepage text or writing 2000 words of content for the website as per the templates we will develop. ">Content Creation</option>
            <option value="Marketing" title="Any digital marketing deliverables will be included under this. Like, need to do on-page SEO for the 3 major pages (Home, service and property listing page) of the website after they will be developed by us, Need to run a google ads campaign after the site will be developed, Need to run a email marketing campaign after the site will be developed etc. etc. ">Marketing</option>
            <option value="Domain/Hosting" title="Anything related to domain/hosting setup or purchase, SSL setup, hosting switch etc. will be included here. ">Domain/Hosting</option>
            <option value="Products" title="Individual product uploading will be included here. For example, if we have to upload 30 products, you should select products, set quantity 30, and then need to write a brief description in the description field. Individual product page example: https://www.houze.com.sg/collections/bean-bag/products/houze-kashmir-bean-bag-2-sizes-4-colors">Products</option>
            <option value="Collection" title="Collection/category pages are the pages which included all the products in that collection. For example, this: https://www.houze.com.sg/collections/storage-boxes &#10; &#10;If we have to create 10 collection/category pages, select Collection from the dropdown, set quantity 10 and then in the description, write the names of those collection pages separated by comma.">Collection</option>
            <option value="Speed optimization" title="Any speed optimization works should be added under this item.">Speed optimization</option>
            <option value="Fixing Issues/Bugs" title="Any Fixing Issues/Bugs works should be added under this item.">Fixing Issues/Bugs</option>
            <option value="Fixing Responsiveness/Making something responsive" title="Any Fixing Responsiveness/Making something responsive works should be added under this item.">Fixing Responsiveness/Making something responsive</option>


            <option value="Others" title="Anything that is not specifically mentioned above should go to others. For example, any complex functionality, speed optimization, bug fixing or anything else not mentioned specifically above. If you select others, the top management will have to check and authorize those deliverables before you can proceed further.">Others</option>
          </select>
                  <label id="deliverableError" class="text-danger" for=""></label>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">

        <label for="exampleFormControlTextarea1">Milestone<span style="color:red;">*</span>
            <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Milestone" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
            </svg>
        </label>
      <select class="form-control height-35 f-14" name="milestone_id" id="milestone_id">

        @if ($projectType == 'fixed')
        @foreach($milestones as $milestone)
        <option value="{{$milestone->id}}">{{$milestone->milestone_title}}</option>
       @endforeach
       @elseif($milestone)
       <option value="{{$milestone->id}}">{{$milestone->milestone_title}}</option>

        @endif

      </select>
              <label id="milestoneError" class="text-danger" for=""></label>
      </div>
    </div>
            <div class="col-md-12">

              <div class="form-group">
              <label for="exampleFormControlInput1">Deliverable Title <span style="color:red;">*</span>
                  <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Deliverable Title" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                      <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                  </svg>
              </label>
              <input type="text" name="title" class="form-control height-35 f-14" id="title">
                  <label id="titleError" class="text-danger" for=""></label>
              </div>

            </div>
            <div class="col-md-6">
              <div class="form-group">
              <label for="estimation_time">Estimation Time (In Hours) <span style="color:red;">*</span>
                  <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Estimation Time (In Hours)" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                      <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                  </svg>
              </label>
              <input type="text" name="estimation_time" class="form-control height-35 f-14 mt-1" id="estimation_time">
                  <label id="estimationTimeError" class="text-danger" for=""></label>
              </div>

            </div>
            <div class="col-md-6">
              <div class="form-group">
              <label for="quantity">Quantity <span style="color:red;">*</span>
                  <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Quantity" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                      <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                  </svg>
              </label>
              <input type="text" name="quantity" class="form-control height-35 f-14 mt-1" id="quantity" >
                  <label id="quantityError" class="text-danger" for=""></label>
              </div>

            </div>
            <div class="col-md-6 mt-4">
              <div class="form-group">

            <label for="exampleFormControlTextarea1">Estimated completion date<span style="color:red;">*</span>
                <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Delivery Type" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                    <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                </svg>
            </label>
          <select class="form-control height-35 f-14" id="delivery-type" name="delivery-type">
            <option selected>On or Before</option>
            <option>Between</option>
          </select>
         <label id="deliveryTypeError" class="text-danger" for=""></label>
          </div>
        </div>
            <div class="col-md-6 mt-1">
                <div class="form-group my-3" style="position: relative;">
                    <label class="f-14 text-dark-grey mb-12" data-label="true" for="from_add">From
                        <sup class="f-14 mr-1">*</sup>
                        <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="From" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                            <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                        </svg>
                    </label>
                    <input type="text" class="form-control  date-picker height-35 f-14" placeholder="Select date" value="" name="from" id="from_add" autocomplete="off">
                    <label id="fromAddError" class="text-danger" for=""></label>
                </div>
            </div>
            <div class="col-md-6" style="display: none;" id="to">
                <div class="form-group my-3" style="position: relative;">
                    <label class="f-14 text-dark-grey mb-12" data-label="true" for="to_add">To
                        <sup class="f-14 mr-1">*</sup>
                        <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="To" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                            <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                        </svg>
                    </label>
                    <input type="text" class="form-control  date-picker height-35 f-14" placeholder="Select date" value="" name="to" id="to_add" autocomplete="off">
                    <label id="toAddError" class="text-danger" for=""></label>
                </div>
            </div>
            <div class="col-md-12">
                <div class="form-group">
                    <label class="text-dark-grey" data-label="true" for="descriptionText">Description
                        <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Description" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                            <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                        </svg>
                    </label>
                    <textarea name="description" id="descriptionText" class="form-control"></textarea>
                   <script src="{{ asset('/ckeditor/ckeditor.js') }}"></script>
                    <script>
                        CKEDITOR.replace('description');
                    </script>
                </div>
            </div>
    </div>
      </div>
      <div class="modal-footer">

        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="Submit" class="btn btn-primary add_milestone" id="addBtn">Add Deliverable</button>

      </div>
      </form>

    </div>
  </div>
</div>

<script type="text/javascript">

$(document).ready(function() {
  // Listen for change event on select element
  $('#delivery-type').change(function() {
    // Get the selected value
    var selectedValue = $(this).val();

    // Hide all forms by default
    $('#to').hide();

    // Show the relevant form based on the selected option
    if (selectedValue === 'Between') {
      $('#to').show();
    } else{
      $('#to').hide();
    }
  });
});

</script>
<script>
    $("#addDeliverable").submit(function(e){
        // alert('ok');
        e.preventDefault();
        $('#addBtn').attr("disabled", true);
        $('#addBtn').html("Processing...");
        var description = CKEDITOR.instances.descriptionText.getData();
        // console.log(description);
        var data ={
            '_token': "{{ csrf_token() }}",
            'deliverable_type': document.getElementById("deliverable_type").value,
            'milestone_id': document.getElementById("milestone_id").value,
            'title': document.getElementById("title").value,
            'estimation_time': document.getElementById("estimation_time").value,
            'quantity': document.getElementById("quantity").value,
            'delivery-type': document.getElementById("delivery-type").value,
            'from': document.getElementById("from_add").value,
            'to': document.getElementById("to_add").value,
            'description': description,
            'project_id': {{$project->id}},
        }
        // console.log(data);
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $.ajax({
            type:'POST',
            url:"{{ route('add-project-deliverable') }}",
            data:data,
            success:function(response){
                // console.log(response.status);
                if (response.status==200){
                    $("#addDeliverable").trigger('reset');
                    window.location.reload();
                    toastr.success('Deliverable Added Successfully');
                }
                $('#addBtn').attr("disabled", false);
                $('#addBtn').html("Add Deliverable");
            },
            error:function (error) {
                if(error.responseJSON.errors.deliverable_type){
                    $('#deliverableError').text(error.responseJSON.errors.deliverable_type);
                }else{
                    $('#nameError').text('');
                }if(error.responseJSON.errors.milestone_id){
                    $('#milestoneError').text(error.responseJSON.errors.milestone_id);
                }else{
                    $('#milestoneError').text('');
                }
                if(error.responseJSON.errors.title){
                    $('#titleError').text(error.responseJSON.errors.title);
                }else{
                    $('#titleError').text('');
                }
                if(error.responseJSON.errors.estimation_time){
                    $('#estimationTimeError').text(error.responseJSON.errors.estimation_time);
                }else{
                    $('#estimationTimeError').text('');
                }
                if(error.responseJSON.errors.quantity){
                    $('#quantityError').text(error.responseJSON.errors.quantity);
                }else{
                    $('#quantityError').text('');
                }
                if(error.responseJSON.errors.delivery_type){
                    $('#deliveryTypeError').text(error.responseJSON.errors.delivery-type);
                }else{
                    $('#deliveryTypeError').text('');
                }
                if(error.responseJSON.errors.from){
                    $('#fromAddError').text(error.responseJSON.errors.from);
                }else{
                    $('#fromAddError').text('');
                }
                if(error.responseJSON.errors.to){
                    $('#toAddError').text(error.responseJSON.errors.to);
                }else{
                    $('#toAddError').text('');
                }
                $('#addBtn').attr("disabled", false);
                $('#addBtn').html("Add Deliverable");
            }
        });

    });
</script>
