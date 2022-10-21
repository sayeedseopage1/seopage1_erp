

<!------ Include the above in your HEAD tag ---------->

<div class="modal fade" id="markcomplete" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Submit Task</h5>
        <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
      </div>
      <form action="{{route('task-status-change')}}" method="post">
        @csrf
        <input type="hidden" name="id" value="{{$task->id}}">

        <div class="col-lg-12 col-md-12">
                 <x-forms.text :fieldLabel="__('Website/Github Link')" fieldName="website_link"
                     fieldId="website_link" :fieldPlaceholder="__('Website/Github Link')" fieldRequired="true" />
             </div>
             <div class="col-lg-12 col-md-12 w-100">

                 <x-forms.select fieldId="submission_type" fieldName="submission_type" :fieldLabel="__('Choose From Below')"
                     search="true">
                     <option value="table" >Create Table</option>
                     <option value="link">Insert Link</option>
                     <option value="text">Add Text</option>
                     <option value="list">Add List</option>
                     <option value="attach">Attach File</option>
                 </x-forms.select>
             </div>




      <div class="modal-body">

        <div class="container">
      	<div class="row flex-column">



        <div class="mb-3">
          Explanation
        </div>
        <div class="">
          <textarea name="comments" rows="8" cols="57"></textarea>

        </div>

      	</div>
      </div>





      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary" >Submit</button>

      </div>
        </form>
    </div>
  </div>
</div>
