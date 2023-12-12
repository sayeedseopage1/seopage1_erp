<div class="modal fade" id="deliverables_info_Modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Deliverable Info</h5>
        <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        @if ($project->admin_authorization_status == 1)
        <div class="row">
            <div class="col-md-4">
                <h6>Type of challenge : </h6>
            </div>
            <div class="col-md-8">
                <p>{{$project->project_challenge}}</p>
            </div>
            <div class="col-md-4">
                <h6>Challenge description : </h6>
            </div>
            <div class="col-md-8">
                <p>{{$project->comments}}</p>
            </div>
            <div class="col-md-4">
                <h6>Is this challenge valid as per management?</h6>
            </div>
            <div class="col-md-8">
                <p>Yes. The management considers this challenge as a valid one.</p>
            </div>
            <div class="col-md-4">
                <h6>Reason : </h6>
            </div>
            <div class="col-md-8">
                <p>{!! $project->admin_comment!!}</p>
            </div>
        </div>
        @else
        <div class="row">
            <div class="col-md-4">
                <h6>Type of challenge : </h6>
            </div>
            <div class="col-md-8">
                <p>{{$project->project_challenge}}</p>
            </div>
            <div class="col-md-4">
                <h6>Challenge description : </h6>
            </div>
            <div class="col-md-8">
                <p>{{$project->comments}}</p>
            </div>
            <div class="col-md-4">
                <h6>Is this challenge valid as per management?</h6>
            </div>
            <div class="col-md-8">
                <p>No. The management doesn't consider this as a real challenge.</p>
            </div>
            <div class="col-md-4">
                <h6>Reason : </h6>
            </div>
            <div class="col-md-8">
                <p>{!! $project->admin_comment!!}</p>
            </div>
        </div>
        @endif
      </div>
      <div class="modal-footer">
          <button type="button" class="btn btn-primary understandBtn"  data-toggle="modal" data-target="#deliverablesaddModal">I understand this!</button>
          @include('projects.modals.clientdeliverableaddmodal')
      </div>
    </div>
  </div>
</div>
