{{--lost modal --}}
<div class="modal fade" id="cancel-milestone-approve" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Cancel Milestone</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form class="">
          <input type="hidden" class="milestoneId" name='milestoneId'  value="">
            <div class="modal-body">

              <div class="col-md-12">
                <div class="form-group">
                  <h5 for="exampleFormControlTextarea1">Reason given by project manager</h5>
                    <p class="commentId text-justify"></p>
                </div>
              </div>
            </div>
            <br>

            <br>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary close-button" data-bs-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary" id="cancelMilestoneApprove">Cancel Milestone</button>
        </div>
      </form>
      </div>
    </div>
  </div>
  <script>

  </script>
  <script>
      $('#cancelMilestoneApprove').click(function(e){
          e.preventDefault();

          // alert('ok');

          var data= {
            '_token': "{{ csrf_token() }}",

            'milestoneId': $('.milestoneId').val(),
        }

          //console.log(data);
          $.ajaxSetup({
              headers: {
                  'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
              }
          });
          $.ajax({
              type: "POST",
              url: "{{route('cancel-milestone-approve')}}",
              data: data,
              dataType: "json",
              success: function (response) {
                   //console.log(response.status)

                      if (response.status == 'success') {
                        toastr.success('Cancelation request Accept successfully!');
                          $("#cancel-milestone-approve").modal("hide");

                          window.location.reload();
                      }

              },
          });
      });

  </script>
  <script>
      $("#cancelMilestoneApprove").on('click',function() {
          $("#cancelMilestoneApprove").attr("disabled", true);
          $("#cancelMilestoneApprove").text("Processing ...");
      })
  </script>
