@php
$viewLeadAgentPermission = user()->permission('view_lead_agents');
$viewLeadCategoryPermission = user()->permission('view_lead_category');
$viewLeadSourcesPermission = user()->permission('view_lead_sources');
$addLeadAgentPermission = user()->permission('add_lead_agent');
$addLeadSourcesPermission = user()->permission('add_lead_sources');
$addLeadCategoryPermission = user()->permission('add_lead_category');
$addLeadNotePermission = user()->permission('add_lead_note');
@endphp

<link rel="stylesheet" href="{{ asset('vendor/css/dropzone.min.css') }}">
<style>
        label.error {
            color: #dc3545;
            font-size: 14px;
        }
    </style>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
    integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
    />
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    
    <link rel="stylesheet" href="{{asset('lead/css/niceCountryInput.css')}}" />
    <link rel="stylesheet" href="{{asset('lead/css/editor.css')}}" />
    <link rel="stylesheet" href="{{asset('lead/css/style.css')}}" />
    <link rel="stylesheet" href="{{ asset('vendor/css/dropzone.min.css') }}">
    <div class="card">
<div class="card-body">

    <div class="row">

        <div class="col-sm-12">
    
            <form action="" method="" needs-validation id="splabel">
                <div class="row">
                      
                 <div class="col-md-6 col-xl-6">
                     <label for="" id="">
                         Project Name <span style="color:#fd3939">*</span> <i class="fa-solid fa-circle-question" data-bs-toggle="tooltip" title="Type project name from Freelancer.com."></i></span>
                     </label>
                     <input type="text" class="form-control" id="" name="" placeholder="Enter project name" required />
                 </div>
                 <div class="col-md-6 col-xl-6">
                     <label for="">
                         Client Country <span style="color:#fd3939">*</span> <span><i class="fa-solid fa-circle-question" data-bs-toggle="tooltip" title="Enter the country name."></i></span>
                     </label>
                     
                     <div class="niceCountryInputSelector" style="width: 100%;" data-selectedcountry="US" data-showspecial="false" data-showflags="true" data-i18nall="All selected"
                         data-i18nnofilter="No selection" data-i18nfilter="Filter" data-onchangecallback="onChangeCallback"/>
                     </div>
    
                 </div>
    
                 <div class="col-md-6 col-lg-6">
                     <label for="">
                         Project Link <span style="color:#fd3939">*</span> <span><i class="fa-solid fa-circle-question" data-bs-toggle="tooltip" title="Copy the project URL from the browser and paste it here."></i></span>
                     </label>
                     <input type="url" class="form-control" id="" placeholder="Enter project link from Freelancer.com " required />
                    
                 </div>
    
                 <div class="col-md-3 col-lg-3 sp1date_picker">
                     <label for="">
                         Deadline <span style="color:#fd3939">*</span> <span><i class="fa-solid fa-circle-question" data-bs-toggle="tooltip" title="Enter the deadline you provided when placing the bid."></i></span>
                     </label>
                     <!-- <input type="date" class="form-control" id="" placeholder="DD / MM / YY" required/> -->
                     <input type="text" name="checkIn" id="datepicker" value="" class="calendar" placeholder="DD / MM / YY" required/>
                 </div>
    
                 <div class="col-md-3 col-lg-3">
                     <label for="">
                         Currency <span style="color:#fd3939">*</span> <span><i class="fa-solid fa-circle-question" data-bs-toggle="tooltip" title="Select the currency from Freelancer.com based on the project currency."></i></span>
                     </label>
                     <select id="currency" name="currency" required>
                         <option value="1">USD $</option>
                         <option value="2">Euro</option>
                         <option value="3">BDT</option>
                     </select>
                 </div>
    
    
                 <div class="col-md-4">
                     <label for="">
                         Project Budget <span style="color:#fd3939">*</span> <span><i class="fa-solid fa-circle-question" data-bs-toggle="tooltip" title="Enter the project budget from Freelancer.com."></i></span>
                     </label>
                     <div class="row">
                         <div class="col-md-6">
                             <input type="number" class="form-control" type="number" min="0" max="12000" id="" name="" placeholder="Minimum" required/>
                         </div>
                         <div class="col-md-6">
                             <input type="number" class="form-control" type="number" min="0" max="12000" id="" name="" placeholder="Maxmimum" required/>
                         </div>
                     </div>
    
                 </div>
    
                 <div class="col-md-4">
                     <label for="">
                         Bid Value <span style="color:#fd3939">*</span> <span><i class="fa-solid fa-circle-question" data-bs-toggle="tooltip" title="Enter the bid value."></i></span>
                     </label>
                     <input type="number" class="form-control" type="number" min="0"  id="" name="" placeholder="Enter bid value" required/>
                 </div>
    
                 <div class="col-md-4">
                     <label for="">
                         Bidding Delay Time <span style="color:#fd3939">*</span> <span><i class="fa-solid fa-circle-question" data-bs-toggle="tooltip" title="Collect the bidding delay time from Freelancer.com and enter the exact delay time here."></i></span>
                     </label>
                     <div class="row">
                         <div class="col-md-6">
                             <input type="number" class="form-control" type="number" min="0" max="59" id="" name="" placeholder="Minutes" required/>
                         </div>
                         <div class="col-md-6">
                             <input type="number" class="form-control" type="number" min="0" max="59" id="" name="" placeholder="Seconds"/>
                         </div>
                     </div>
                 </div>
    
                 <div class="col-md-12">
                     <label for="">
                         Project Description <span style="color:#fd3939">*</span> <span><i class="fa-solid fa-circle-question" data-bs-toggle="tooltip" title="Copy the project description from Freelancer.com and paste it here."></i></span>
                     </label>
    
                     <textarea id="project_description_editor" required></textarea>
                 </div>
    
                 <div class="col-md-12">
                     <label for="">
                         Cover Letter <span style="color:#fd3939">*</span> <span><i class="fa-solid fa-circle-question" data-bs-toggle="tooltip" title="Copy the cover letter you submitted when placing the bid and paste it here. Do not forget to format it (If needed)."></i></span>
                     </label>
    
                     <textarea id="cover_later_editor" required></textarea>
                 </div>
    
                 
                 <div class="col-md-4">
                     <label for="">
                         Bids Insight Page (Screenshot) <span style="color:#fd3939">*</span> <span><i class="fa-solid fa-circle-question" data-bs-toggle="tooltip" title="Take a screenshot of the bids insight page, and share the link here."></i></span>
                     </label>
                     <input type="url" class="form-control" id="" placeholder="Enter the bid insight page screenshot link" required />
                 </div>
    
                 <div class="col-md-4">
                     <label for="">
                         Bids Page (Screenshot)<span> <i class="fa-solid fa-circle-question" data-bs-toggle="tooltip" title="Take a screenshot of the bid page, and share the link here."></i></span>
                     </label>
    
                     <input type="url" class="form-control" id="" placeholder="Enter the bid page screenshot link" required />
                 </div>
    
                 <div class="col-md-4">
                     <label for="">
                         Project Page (Screenshot) <span style="color:#fd3939">*</span> <span><i class="fa-solid fa-circle-question" data-bs-toggle="tooltip" title="Take a screenshot of the project page, and share the link here."></i></span>
                     </label>
    
                     <input type="url"  class="form-control" id="" placeholder="Enter the project page screenshot link" required />
                 </div>
    
                 <div class="col-md-12">
                     <label for="">
                         Explanation (If Delay)<span> <i class="fa-solid fa-circle-question" data-bs-toggle="tooltip" title="If you want to explain any reason for the delay time, you can write it here."></i></span>
                     </label>
    
                     <textarea id="explanation_editor"></textarea>
                 </div>
    
    
                 <div class="col-md-12">
                     <input type="submit" value="Create Lead" class="sp1sub">
                 </div>
    
                </div>
             </form>   
    
        </div>
    </div>
</div>

    </div>







<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.2/jquery.validate.min.js"></script>





<script>

        $(document).ready(function() {
          quillImageLoad('#description');
            quillImageLoad('#cover_letter');


        var previousDate = $("#previousDate").val();
            $("#store-lead").validate({
                rules: {
                    client_name: {
                        required: true,
                        maxlength: 100,
                        minlength: 10,
                    },
                    country:{
                        required: true,

                    },
                    project_link: {
                      url:true,
                      required: true,

                    },
                    deadline: {
                        required: true,
                        lessThan: previousDate,
                        date: true
                    },

                    original_currency_id: {
                        required: true,

                    },
                    bid_value: {
                        required: true,
                        number:true,
                        minValue:1
                    },
                    bid_value2: {
                        required: true,
                        number:true,
                        minValue: "#bid_value"
                    },
                    value: {
                        required: true,
                        number:true,
                        minValue:1
                    },
                    description: {
                        required: true,
                        minlength: 50
                    },
                    cover_letter: {
                        required: true,
                        minlength: 100
                    },
                    insight_screenshot: {
                      url:true,
                      required: true,

                    },

                    projectpage_screenshot: {
                      url:true,
                      required: true,

                    },
                },
                messages: {
                    client_name: {
                        required: "Project name is required",
                        maxlength: "Project name cannot be more than 100 characters",
                        minlength: "Project name cannot be less than 10 characters"
                    },
                    country: {
                        required: "Please Select a Country"

                    },
                    project_link: {
                        required: "Project link is required",
                        url: "Link must be a valid url"

                    },
                    deadline: {
                        required: "Deadline is required",
                        lessThan: "Date cannot be past date"
                    },
                    original_currency_id: {
                        required: "Please select a currency",

                    },
                    bid_value: {
                        required:  "Minimum Bid value is required",
                        minValue: "Minimum bid value should be greater than 0",
                    },
                    bid_value2: {
                      required:  "Maximum Bid value is required",
                      greaterThan: "Maximum bid value should be equal or greater than minimum bid value"
                    },
                    value: {
                      required:  "Bid value is required",

                    },
                    description: {
                        required: "Project description is required",
                        minlength: "Project description cannot be less than 10 characters"
                    },
                    cover_letter: {
                        required: "Cover letter is required",
                        minlength: "Cover letter cannot be less than 100 characters"
                    },
                    insight_screenshot: {
                        required: "Insight page screenshot is required",
                        url: "Link must be a valid url"

                    },

                    projectpage_screenshot: {
                        required: "Project page screenshot is required",
                        url: "Link must be a valid url"

                    },
                }
            });

        });
        $('#store-lead').click(function() {
            var note = document.getElementById('description').children[0].innerHTML;
            document.getElementById('description-text').value = note;
            var note2 = document.getElementById('cover_letter').children[0].innerHTML;
            document.getElementById('cover-letter-text').value = note2;
        });

    </script>
    <script>
$(document).ready(function() {
  $("#store-lead").submit(function() {
    $(".result").text("");
    $(".loading-icon").removeClass("hide");
    $(".submit-button").attr("disabled", true);
    $(".btn-txt").text("Processing ...");
  });
});
</script>

<script src="https://code.jquery.com/jquery-3.6.3.min.js" integrity="sha256-pvPw+upLPUjgMXY0G+8O0xUf+/Im1MZjXxxgOcBQBXU=" crossorigin="anonymous"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-Fy6S3B9q64WdZWQUiU+q4/2Lc9npb8tCaSX9FK7E8HnRr0Jz8D6OP9dO5Vg3Q9ct" crossorigin="anonymous"></script>

<script src="{{asset('lead/js/editor.js')}}"></script>
<script src="{{asset('lead/js/niceCountryInput.js')}}"></script>


<!-- tooltip  -->
<script>
    $(document).ready(function(){
        $('[data-bs-toggle="tooltip"]').tooltip();
    });
</script>


<!-- country  -->
<script>
    function onChangeCallback(ctr){
        console.log("The country was changed: " + ctr);
        //$("#selectionSpan").text(ctr);
    }

    $(document).ready(function () {
        $(".niceCountryInputSelector").each(function(i,e){
            new NiceCountryInput(e).init();
        });
    });
</script>

<!-- url  -->

<script>

    jQuery(document).ready(function () {
            jQuery('#datepicker').datepicker({
                format: 'dd-mm-yyyy',
                startDate: '+1d'
            });
        });
    jQuery(document).ready(function () {
            jQuery('#id_StartDate').datepicker({
                dateFormat: 'yy/mm/dd',
                startDate: '0d',
                minDate: 0,
                highlightWeek: true,
            });
        });

</script>
