
<div class="modal fade" id="deliverablesdeleteModal{{$deliverable->id}}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Delete Deliverable</h5>
        <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
      </div>

      <form class="" action="/projects/delete-deliverables/{{$deliverable->id}}" method="get">


      <div class="modal-body">



          <h6 class="text-center">Are You Sure You Want to Delete this?</h6>






      </div>
      <div class="modal-footer">

        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="Submit" class="btn btn-danger" >Delete</button>

      </div>
      </form>

    </div>
  </div>
</div>
<script type="text/javascript">



</script>
