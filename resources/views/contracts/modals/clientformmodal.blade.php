
<div class="modal fade" id="clientformModal{{$deal->id}}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Required information for the successful completion of your project</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form class="" action="{{route('form-submit-to-client')}}" method="post">
        @csrf
        <input type="hidden" name="id" value="{{$deal->id}}">


      <div class="modal-body">
        <h6>We understand that you may not be available on freelancer.com
          the whole day. So we would like to have your contact information
           so the communication is smooth and your project is not delayed
           just because you didn't get notified about our messages on freelancer.com!</h6>
           <hr>

                            <div class="row">
                              <div class="col-md-6">
                                <div class="mt-3">
                                    <label for="input-state-2" class="form-label"><strong>Please put your freelancer.com username here!</strong></label>
                                    <input id="input-state-2" type="text" class="form-control" placeholder="Enter User Name">

                                </div>
                              </div>
                              <div class="col-md-6">
                                <div class="mt-3">
                                    <label for="input-state-3" class="form-label"><strong>Your email (For future communication)!</strong></label>
                                    <input id="input-state-3" type="text" class="form-control" placeholder="Enter Your Email">

                                </div>
                              </div>


                            </div>

                            <div class="mt-3">
                                <label for="input-state-3" class="form-label"><strong>Phone number!</strong></label>
                                <input id="input-state-3" type="text" class="form-control" placeholder="Enter Your Email">

                            </div>
                            <div class="mt-3">
                                <label for="floatingTextarea"><strong>Your WhatsApp ID (For future communication)!</strong></label>
                              <textarea class="form-control" placeholder="Leave a comment here" id="whatsapp"></textarea>



                            </div>
                            <div class="mt-3">
                                <label for="floatingTextarea"><strong>Any other instant messengers where you are mostly available (Example, skype, telegram etc.)! (optional)</strong></label>
                              <textarea class="form-control" placeholder="Leave a comment here"></textarea>



                            </div>
                            <div class="mt-3">
                                <label for="floatingTextarea"><strong>Our working hour is 8 am-5 pm Monday-Friday and 8 am-1 pm on Saturday. We are off on Sunday (We are in the Bangladeshi timezone GMAT+6). You can convert the Bangladeshi timezone to your timezone here: https://dateful.com/time-zone-converter. We may not be able to reply outside of our working hours.
                                    Please confirm if you are okay with this? </strong></label>
                              <textarea class="form-control" placeholder="Leave a comment here"></textarea>



                            </div>



                            <div class="mt-3">
                                <label for="input-state-3" class="form-label"><strong>Url For Submission</strong></label>
                              <div class="row">

                                <div class="col-md-8">
                                    <input type="text" class="form-control"  value="http://127.0.0.1:8000/deals/{{$deal->hash}}" id="{{$deal->hash}}">
                                </div>
                                <div class="col-md-4">
                                        <button type="button" class="btn btn-info" onclick="myFunction{{$deal->hash}}()"><i class="fa-solid fa-copy"></i></button>
                                </div>


                              </div>



                                    <!-- The button used to copy the text -->




                            </div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary" >Confirm to Submit</button>

      </div>
        </form>
    </div>
  </div>
</div>

<script type="text/javascript">
function myFunction{{$deal->hash}}() {
  // Get the text field
  var copyText = document.getElementById("{{$deal->hash}}");

  // Select the text field
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices

   // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.value);

  // Alert the copied text
  alert("Copied the text: " + copyText.value);
}

</script>
