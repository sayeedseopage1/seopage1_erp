
<div class="modal fade" id="deliverableextensionacceptmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Accept time extension</h5>
          <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
        </div>
  
          <form class="" action="{{route('deliverable-authorization-accept')}}" method="post">
            @csrf
            <input type="hidden" name="project_id" value="{{$project->id}}">
        <div class="modal-body">
          @if($pm_project->reason != null)
          <h4>Reson behind delay</h4>
          <p>{!!$pm_project->reason!!}</p>
       
     
          @endif
        </div>
        <div class="modal-footer">
  
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="Submit" id="comments-form" class="btn btn-primary add_milestone" >Accept</button>
  
        </div>
        </form>
  
      </div>
    </div>
  </div>
  
  
  