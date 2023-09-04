<div class="modal fade" id="total_delayed_project_for_this_cycle_modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Total Delayed Project For This Cycle</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>A project will be tagged as delayed if it couldn't be completed within 15 days after it entered the system. If a project entered the system at 2.20 pm on 20th June, it will be tagged as delayed on 2.21 pm on 5th July if it's not completed by then.</p>
          <p>The projects meeting the following conditions will be included in this list: </p>
          <span>A. It was assigned during the current assign cycle i.e. June 16th-July 15th. </span>
          <span>B. It got delayed tag anytime in the current release cycle i.e. June 16th-July 31st.</span>
        </div>
        <div class="modal-footer">
            <a href="{{ route('pm-dashboard-explanation') }}#total_delayed_project_for_this_cycle" target="_blank" class="btn btn-secondary">See Details</a>
        </div>
      </div>
    </div>
  </div>
