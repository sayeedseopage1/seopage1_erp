@php
    $milestones= App\Models\ProjectMilestone::where('project_id',$project->id)->get();
@endphp
<div class="modal fade" id="deliverablesaddModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add Deliverable</h5>
        <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
      </div>

        <form class="" action="{{route('add-project-deliverable')}}" method="post">
          @csrf
          <input type="hidden" name="project_id" value="{{$project->id}}">
      <div class="modal-body">





        <div class="row">
          <div class="col-md-6">
              <div class="form-group">

            <label for="exampleFormControlTextarea1">Deliverable Type<span style="color:red;">*</span></label>
          <select class="form-control height-35 f-14" name="deliverable_type">



            <option value="Graphics Design">Graphics Design</option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="Main Page Development">Main Page Development</option>
            <option value="Secondary Page Development">Secondary Page Development</option>
            <option value="Content Creation">Content Creation</option>
            <option value="Marketing">Marketing</option>
            <option value="Domain/Hosting">Domain/Hosting</option>
            <option value="Products">Products</option>
            <option value="Collection">Collection</option>
            <option value="Website design change ">Website design change </option>
            <option value="Speed optimization">Speed optimization</option>
            <option value="Others">Others</option>

          </select>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">

        <label for="exampleFormControlTextarea1">Milestone<span style="color:red;">*</span></label>
      <select class="form-control height-35 f-14" name="milestone_id">


        @foreach($milestones as $milestone)
        <option value="{{$milestone->id}}">{{$milestone->milestone_title}}</option>
       @endforeach

      </select>
      </div>
    </div>


            <div class="col-md-12">

              <div class="form-group">
              <label for="exampleFormControlInput1">Deliverable Title <span style="color:red;">*</span></label>
              <input type="text" name="title" class="form-control height-35 f-14" id="exampleFormControlInput1"  Required>
              </div>

            </div>
            <div class="col-md-6">
              <div class="form-group">
              <label for="exampleFormControlInput1">Quantity <span style="color:red;">*</span></label>
              <input type="text" name="quantity" class="form-control height-35 f-14 mt-1" id="exampleFormControlInput1"  required>
              </div>

            </div>
            <div class="col-md-6 mt-1">
              <div class="form-group">
    
            <label for="exampleFormControlTextarea1">Delivery Type<span style="color:red;">*</span></label>
          <select class="form-control height-35 f-14" id="delivery-type">
    
    
            <option>On or Before</option>
            <option>Between</option>
           
          
    
          </select>
          </div>
        </div>

            <div class="col-md-6" >
                <x-forms.datepicker fieldId="from" fieldRequired="true"
                    :fieldLabel="__('From')" fieldName="from"

                    :fieldPlaceholder="__('')" />
            </div>
            <div class="col-md-6" style="display: none;" id="to">
                <x-forms.datepicker fieldId="to" fieldRequired="true"
                    :fieldLabel="__('To')" fieldName="to"

                    :fieldPlaceholder="__('')" />
            </div>








            <div class="col-md-12">
              <div class="form-group">
                <label for="exampleFormControlTextarea1">Description</label>
                <textarea  name="description" id="summary" class="ckeditor form-control" rows="3" ></textarea>
              </div>

            </div>



    </div>





      </div>
      <div class="modal-footer">

        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="Submit" class="btn btn-primary add_milestone" >Add Deliverable</button>

      </div>
      </form>

    </div>
  </div>
</div>
<script>
  <script src="{{ asset('vendor/jquery/dropzone.min.js') }}"></script>
  $(document).ready(function() {

      if ($('.custom-date-picker').length > 0) {
          datepicker('.custom-date-picker', {
              position: 'bl',
              ...datepickerConfig
          });
      }
      const dp3 = datepicker('#from', {
          position: 'bl',

          onSelect: (instance, date) => {
            dp4.setMin(date);
          },
          ...datepickerConfig
      });
      const dp4 = datepicker('#to', {
          position: 'bl',

          onSelect: (instance, date) => {
             dp3.setMax(date);
          },
          ...datepickerConfig
      });
    });
</script>
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
