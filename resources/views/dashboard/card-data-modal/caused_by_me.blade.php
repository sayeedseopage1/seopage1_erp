<div class="modal fade" id="caused_by_me_modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Caused By Me</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>The total number of revisions that a particular PM was held responsible from all the revisions that came in the release cycle (June 16th-July 15th) for the tasks associated with projects assigned to that PM in the assign cycle i.e. June 16th-July 15th.</p>
        </div>
        <div class="modal-footer">
            <a href="{{ route('pm-dashboard-explanation') }}#caused_by_me" target="_blank" class="btn btn-secondary">See Details</a>
        </div>
      </div>
    </div>
  </div>
