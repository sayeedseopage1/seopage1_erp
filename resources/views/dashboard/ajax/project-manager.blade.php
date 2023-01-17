<script src="{{ asset('vendor/jquery/frappe-charts.min.iife.js') }}"></script>
<script src="{{ asset('vendor/jquery/Chart.min.js') }}"></script>
<style media="screen">
    .card-color {
        background-color: #1d2026 !important;
    }
  .filter-custom {
	padding: 8px 17px;
	margin-top: 4px;
}
</style>
<div class="col-md-4">
    <div
        class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
        <div class="d-block text-capitalize">
            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">No of Projects</h5>
            <div class="d-flex">
                <a href="#">
                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        {{ $no_of_inprogress }}<span class="f-12 font-weight-normal text-lightest">
                            @lang('In Progress') </span>
                    </p>
                </a>

                <a href="#">
                    <p class="mb-0 f-21 font-weight-bold text-red d-grid">{{$no_of_canceled}}<span
                            class="f-12 font-weight-normal text-lightest">@lang('Canceled')</span>
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
            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Total Project Value</h5>
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
<div class="col-md-6 mb-3 emp-dashboard mt-3">
    <div
        class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
        <div class="d-block text-capitalize">
            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">% Projects Got Completed/Money Released</h5>
            <div class="d-flex">
                <a href="#">
                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        {{ round($percentage_of_complete_project_count,2) }}%<span class="f-12 font-weight-normal text-lightest">
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
<div class="col-md-6 mb-3 mt-3">
    <div
        class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
        <div class="d-block text-capitalize">
            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">% Projects Got Projects Got Canceled</h5>
            <div class="d-flex">
                <a href="#">
                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        {{ round($percentage_of_canceled_project_count,2) }}%<span class="f-12 font-weight-normal text-lightest">
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
<div class="col-md-6">
    <div
        class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
        <div class="d-block text-capitalize">
            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Average Project Completion Time</h5>
            <div class="d-flex">
                <a href="#">
                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        {{ round($percentage_of_canceled_project_count,2) }}%<span class="f-12 font-weight-normal text-lightest">
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
<div class="col-md-6">
    <div
        class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
        <div class="d-block text-capitalize">
            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">No. Of Projects Got Canceled</h5>
            <div class="d-flex">
                <a href="#">
                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        {{ round($percentage_of_canceled_project_count,2) }}<span class="f-12 font-weight-normal text-lightest">
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
