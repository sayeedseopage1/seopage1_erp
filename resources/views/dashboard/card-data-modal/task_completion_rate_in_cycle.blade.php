<div class="modal fade" id="task_completion_rate_in_cycle_modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Task Completion Rate In This Cycle</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>Number of complete tasks in the release cycle (which got assigned in the assign cycle i.e. June 16th-July 15th)+Number of old tasks which got completed in the release cycle (June 16th-July 31st)/Number of assigned tasks in the assign cycle i.e. June 16th-July 15th +Number of old tasks that got completed in the release cycle (June 16th-July 31st).</p>
        </div>
        <div class="modal-footer">
            <a href="{{ route('pm-dashboard-explanation') }}#task_completion_rate_in_this_cycle" target="_blank" class="btn btn-secondary">See Details</a>
        </div>
      </div>
    </div>
  </div>
