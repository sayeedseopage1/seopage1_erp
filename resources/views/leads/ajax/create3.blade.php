@php
$viewLeadAgentPermission = user()->permission('view_lead_agents');
$viewLeadCategoryPermission = user()->permission('view_lead_category');
$viewLeadSourcesPermission = user()->permission('view_lead_sources');
$addLeadAgentPermission = user()->permission('add_lead_agent');
$addLeadSourcesPermission = user()->permission('add_lead_sources');
$addLeadCategoryPermission = user()->permission('add_lead_category');
$addLeadNotePermission = user()->permission('add_lead_note');
@endphp

 <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Condensed" type="text/css" />
 <style>
   #splabel label {
	
	font-family: Roboto !important;

}
 </style>






<link rel="stylesheet" href="{{asset('lead/css/selectstyle.css')}}" />
<link rel="stylesheet" href="{{asset('lead/css/editor.css')}}" />
<link rel="stylesheet" href="{{asset('lead/css/style.css')}}" />
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
                  <br>
                    <select id="country_sel" placeholder="Select Country " data-search="true">
                        <option value="BD"> <img src="img/bd.png" alt=""> Bangladesh</option>
                        <option value="CN"> <img src="img/bd.png" alt=""> China</option>
                        <option value="IN">India</option>
                        <option value="US">United States</option>
                    </select>

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
    
                 <div class="col-md-3 col-xl-3">
                    <label for="">
                        Currency <span style="color:#fd3939">*</span> <span><i class="fa-solid fa-circle-question" data-bs-toggle="tooltip" title="Enter Currency."></i></span>
                    </label>
                  <br>
                    <select id="country_sel" placeholder="" data-search="false">
                        <option selected value="BD"> <img src="img/bd.png" alt=""> USD ($)</option>
                        <option value="CN"> <img src="img/bd.png" alt=""> BDT (BDT)</option>
                       
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
            </div>
                
             </form>   
    
        </div>
    </div>
</div>

    </div>







    {{-- <script src="https://code.jquery.com/jquery-3.6.3.min.js" integrity="sha256-pvPw+upLPUjgMXY0G+8O0xUf+/Im1MZjXxxgOcBQBXU=" crossorigin="anonymous"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script> --}}
    {{-- <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script> --}}

    {{-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-Fy6S3B9q64WdZWQUiU+q4/2Lc9npb8tCaSX9FK7E8HnRr0Jz8D6OP9dO5Vg3Q9ct" crossorigin="anonymous"></script>
    <script src="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script> --}}

    <script src="{{asset('lead/js/selectstyle.js')}}"></script>
    <script src="{{asset('lead/js/editor.js')}}"></script>
    

    

    <script>
    jQuery(document).ready(function($) {
        $('select').selectstyle({
            height : 300,
            onchange : function(val){}
        });
    });
    </script>
  


    <!-- tooltip  -->
    <script>
        $(document).ready(function(){
            $('[data-bs-toggle="tooltip"]').tooltip();
        });
    </script>

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
