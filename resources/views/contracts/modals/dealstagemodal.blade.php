
<div class="modal fade" id="dealstagemodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Change Status</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form class="" action="#" method="post">
        @csrf
        <?php
          $date= \Carbon\Carbon::now();
         ?>


      <div class="modal-body">


                            <div class="row">
                               <div class="col-md-6">
                                <div class="form-check">
                                  <label for="input-state-2" class="form-check-label">Qualified <span style="color:red;">*<span></label>
                             <input type="radio" onclick="yesnoCheck();" name="deal_stage" id="yesCheck"/>
                           </div>
                         </div>
                         <div class="col-md-6">
                          <div class="form-check">
                              <label for="input-state-2" class="form-check-label">Lost<span style="color:red;">*<span></label>

<input type="radio" onclick="yesnoCheck();" name="deal_stage" id="noCheck"/>
</div>
</div>

<br>

<input type='hidden' id='yes' name='yes' placeholder='If yes, explain:'/>


<input type='hidden' id='other3' name='other3' placeholder='other 3'>







                              <!-- <div class="col-md-6">
                                <div class="form-check">

                                  <input class="form-check-input" type="radio" onclick="yesnoCheck();" name="deal_stage" id="yesCheck"  >

                                    <label for="input-state-2" class="form-check-label">Qualified <span style="color:red;">*<span></label>

                                </div>
                              </div>
                              <div class="col-md-6">
                                <div class="form-check">

                              <input class="form-check-input" type="radio" onclick="yesnoCheck();" name="deal_stage" id="noCheck" checked>

                                  <label for="input-state-2" class="form-check-label">Lost <span style="color:red;">*<span></label>

                                </div>
                              </div>
                              <div id="yes" class="col-md-6" style="display:none">
                                <div class="form-control">

                                  <select  class="form-select" aria-label="Default select example">
                                <option selected>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                              </select>

                                </div>
                              </div>
                              <div id="other3" class="col-md-6" style="display:none">

                              </div> -->














      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary" >Change</button>

      </div>
        </form>
    </div>
  </div>
</div>
<script type="text/javascript">
function yesnoCheck() {
    yes1 = document.getElementById('yes')
    //yes2 = document.getElementById('acc')

    no1 = document.getElementById('other3')
  //  no2 = document.getElementById('other4')

    if (document.getElementById('yesCheck').checked) {
        yes1.type  = 'text';
        no1.type =  'hidden';
    } else {
        no1.type =  'text';
        yes1.type =  'hidden';
    }

}

</script>
