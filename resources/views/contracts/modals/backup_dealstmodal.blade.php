@push('datatable-styles')
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css">


@endpush

<style>
           #add-button {
               background: white;
               border: 1px solid #1d82f5;
           }
           #remove-button {
               background: white;
               border: 1px solid red;
           }
           .btn-secondary2 {

	padding: 6px 11px;

}
       </style>
       <style>
               label.error {
                   color: #dc3545;
                   font-size: 14px;
               }
           </style>

<div class="modal fade" data-id="id" id="dealstmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title"  id="exampleModalLabel">Convert Lead to Deal (Contact Made)</h5>
        <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
      </div>
      <ul id="saveform_errList">

      </ul>
      <form class="" action="{{route('deal-stage')}}" id="lead-convert" method="post">
        @csrf
        <input type="hidden"  name="id"  id="mydata">


      <div class="modal-body">
          <div class="row">
              <div class="col-md-12">
                  <label for="input-state-2" class="form-label"><strong>Status <span style="color:red;">*<span></strong></label>
                  <input readonly class="form-control height-35 f-14" value="Contact Made"  name="deal_stage"  placeholder="Contract Made" required></input>
              </div>
              <div class="col-md-12 mt-3">
                  <label for="Client Username"><strong>Client Username</strong></label>
                  <input class="form-control height-35 f-14"  name="client_username" id="client_username"  placeholder="Enter Client Username" ></input>
              </div>
              <div class="col-md-12 mt-3">
                  <label for="Client Username"><strong>Client Profile Link</strong></label>
                  <input class="form-control height-35 f-14" id="profile_link"  name="profile_link"  placeholder="Enter Profile Link"></input>
              </div>
              <label class="mt-3" for="Client Username"><strong>Client Message Thread Link</strong></label>
              <div class="col-md-9 dynamic-field" id="dynamic-field-1">
                  <div class="row">
                      <div class="col-md-12 my-2">
                          <div class="form-group">
                              <input type="text" id="message_link"  class="form-control height-35 f-14" placeholder="Add Link Here" name="message_link[]" required/>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="col-md-3 my-2 form-group append-buttons">
                  <div class="clearfix">
                      <button type="button" id="add-button" class="btn btn-secondary2 float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                      <button type="button" id="remove-button" class="btn btn-secondary2 float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                  </div>
              </div>
              <div class="col-md-12 col-lg-12 ">
                  <div class="form-group">
                      <x-forms.label class="my-3 comments" fieldId="comments"
                                     :fieldLabel="__('Comments')" fieldRequired="true">
                      </x-forms.label>
                      <div id="comments"></div>
                      <textarea name="comments" id="comments-text" class="d-none"></textarea>
                  </div>
              </div>
              <label id="textareaError" style="color:red; display: none;"></label><br>
          </div>
      </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button  id="lead-convert-button" type="submit"  class="btn btn-primary" >Convert</button>
            </div>
      </form>

    </div>
  </div>
</div>
@push('scripts')

<script>
         $(document).ready(function () {
             var buttonAdd = $("#add-button");
             var buttonRemove = $("#remove-button");
             var className = ".dynamic-field";
             var count = 0;
             var field = "";
             var maxFields = 50;

             function totalFields() {
                 return $(className).length;
             }

             function addNewField() {
                 count = totalFields() + 1;
                 field = $("#dynamic-field-1").clone();
                 field.attr("id", "dynamic-field-" + count);
                 field.children("label").text("Field " + count);
                 field.find("input").val("");
                 $(className + ":last").after($(field));
             }

             function removeLastField() {
                 if (totalFields() > 1) {
                     $(className + ":last").remove();
                 }
             }

             function enableButtonRemove() {
                 if (totalFields() === 2) {
                     buttonRemove.removeAttr("disabled");
                     buttonRemove.addClass("shadow-sm");
                 }
             }

             function disableButtonRemove() {
                 if (totalFields() === 1) {
                     buttonRemove.attr("disabled", "disabled");
                     buttonRemove.removeClass("shadow-sm");
                 }
             }

             function disableButtonAdd() {
                 if (totalFields() === maxFields) {
                     buttonAdd.attr("disabled", "disabled");
                     buttonAdd.removeClass("shadow-sm");
                 }
             }

             function enableButtonAdd() {
                 if (totalFields() === maxFields - 1) {
                     buttonAdd.removeAttr("disabled");
                     buttonAdd.addClass("shadow-sm");
                 }
             }

             buttonAdd.click(function () {
                 addNewField();
                 enableButtonRemove();
                 disableButtonAdd();
             });

             buttonRemove.click(function () {
                 removeLastField();
                 disableButtonRemove();
                 enableButtonAdd();
             });
         });
     </script>
     <script>
       document.addEventListener("DOMContentLoaded", function() {
         document.querySelector("form").addEventListener("submit", function() {
           document.querySelector("#lead-convert-button").setAttribute("disabled", "disabled");
         });
       });
     </script>









@endpush
