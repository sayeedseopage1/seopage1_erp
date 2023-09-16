<div class="row">
    <div class="col-md-12" id="pm-card-data">
        <div class="row mt-3" >
            <div class="col-md-4">
                <div class="card p-3" style="border: none">
                    <p style="font-size: 16px; color:#777; font-weight: bold;">Pending Amount (Upto last month)</p>
                    <h5>{{$pm_pending_milestone_value_upto_last_month}}</h5>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card p-3" style="border: none">
                    <p style="font-size: 16px; color:#777; font-weight: bold;">Total Released Amount (This month)</p>
                    <h5>{{$pm_released_amount_month}}</h5>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card p-3" style="border: none">
                    <p style="font-size: 16px; color:#777; font-weight: bold;">Total Assigned Amount (For this month)</p>
                    <h5>{{$total_assigned_amount_for_this_cycle}}</h5>
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-md-4">
                <div class="card p-3" style="border: none">
                    <p style="font-size: 16px; color:#777; font-weight: bold;">Total Released Amount (For this months projects)</p>
                    <h5>{{$pm_released_amount_this_month_create}}</h5>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card p-3" style="border: none">
                    <p style="font-size: 16px; color:#777; font-weight: bold;">Total Unreleased Amount (For this months projects)</p>
                    <h5>{{$pm_unreleased_amount_month}}</h5>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card p-3" style="border: none">
                    <p style="font-size: 16px; color:#777; font-weight: bold;">Total Unreleased Amount (Overall)</p>
                    <h5>{{$pm_pending_milestone_value}}</h5>
                </div>
            </div>
        </div>
    </div>
</div>