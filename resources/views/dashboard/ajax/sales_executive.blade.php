

<div class="row">
  <div class="col-md-4">
      <div
          class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
          <div class="d-block text-capitalize">
              <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Leads Created Today</h5>
              <div class="d-flex">
                  <a href="#">
                      <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                          0<span class="f-12 font-weight-normal text-lightest">
                               </span>
                      </p>
                  </a>


              </div>
          </div>
          <div class="d-block">
              <i class="fa fa-list text-lightest f-27"></i>
          </div>
      </div>
  </div>
  <div class="col-md-4">
      <div
          class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
          <div class="d-block text-capitalize">
              <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Avg Lead Value</h5>
              <div class="d-flex">
                  <a href="#">
                      <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                          {{ round($total_project_value,2) }} ($)<span class="f-12 font-weight-normal text-lightest">
                              @lang('Amount (USD)') </span>
                      </p>
                  </a>


              </div>
          </div>
          <div class="d-block">
              <i class="fa fa-list text-lightest f-27"></i>
          </div>
      </div>
  </div>
  <div class="col-md-4">
      <div
          class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
          <div class="d-block text-capitalize">
              <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Total Released Amount</h5>
              <div class="d-flex">
                  <a href="#">
                      <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                          {{ round($total_released_amount,2) }} ($)<span class="f-12 font-weight-normal text-lightest">
                              @lang('Amount (USD)') </span>
                      </p>
                  </a>


              </div>
          </div>
          <div class="d-block">
              <i class="fa fa-list text-lightest f-27"></i>
          </div>
      </div>
  </div>

</div>
