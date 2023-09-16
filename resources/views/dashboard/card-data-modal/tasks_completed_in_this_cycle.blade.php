<div class="modal fade" id="tasks_completed_in_this_cycle_modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Tasks Completed In This Cycle</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>The number of your tasks that got completed during the release cycle (June 16th-July 31st) from the ones you assigned to the lead developer during the assign cycle (June 16th-July 15th) plus the old tasks that got completed during the current release cycle</p>
        </div>
        <div class="modal-footer">
            <a href="{{ route('pm-dashboard-explanation') }}#tasks_completed_in_this_cycle" target="_blank" class="btn btn-secondary">See Details</a>
        </div>
      </div>
    </div>
  </div>
