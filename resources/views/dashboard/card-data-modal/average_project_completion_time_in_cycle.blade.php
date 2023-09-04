<div class="modal fade" id="average_project_completion_time_in_this_cycle_modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Average Project Completion Time In This Cycle</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <h6>The calculation for this is as below:</h6>
          <p>Project finish date-Project award date</p>
          <h6>Also, a project will be included here if the following conditions are met: </h6>
          <p>A. It was assigned anytime before the current assign cycle ended i.e. if June 16-July 15 is the assign cycle, it has to be assigned on or before July 15th.</p>
          <p>B. It was finished in the current release cycle i.e. June 16-July 31st. </p>
          <span>If a project was assigned in the assign cycle but wasn't finished during the release cycle, it won't come to the calculation.</span>
        </div>
        <div class="modal-footer">
            <a href="{{ route('pm-dashboard-explanation') }}#average_project_completion_time_in_this_cycle" target="_blank" class="btn btn-secondary">See Details</a>
        </div>
      </div>
    </div>
  </div>
