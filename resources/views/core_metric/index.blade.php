@extends('layouts.app')
@section('content')
<div class="container-fluid">
    <div class="row">
        <div class="col-md-12">
            <div class="card mt-3 p-3" style="border: none">
                <form id="update-form" data-url="{{ route('update-core-metrics', $pm_core_metrics->id) }}">
                    @csrf
                    @method('put')
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="released_amount_for_cycle">Released amount for this Cycle</label>
                                <input type="number" class="form-control height-35" name="released_amount_for_cycle" value="{{ $pm_core_metrics->released_amount_for_cycle }}" id="released_amount_for_cycle" placeholder="5000 ($)">
                                <span id="released_amount_for_cycle_error" class="text-danger"></span>
                              </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="total_released_amount">Total released amount</label>
                                <input type="number" class="form-control height-35" name="total_released_amount" value="{{ $pm_core_metrics->total_released_amount }}" id="total_released_amount" placeholder="7000 ($)">
                                <span id="total_released_amount_error" class="text-danger"></span>
                              </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="avg_project_completion_time_for_cycle">Average project completion time for this cycle</label>
                                <input type="number" class="form-control height-35" name="avg_project_completion_time_for_cycle" value="{{ $pm_core_metrics->avg_project_completion_time_for_cycle }}" id="avg_project_completion_time_for_cycle" placeholder="20 Days">
                                <span id="avg_project_completion_time_for_cycle_error" class="text-danger"></span>
                              </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="avg_project_completion_time_in_cycle">Average project completion time in this cycle</label>
                                <input type="number" class="form-control height-35" name="avg_project_completion_time_in_cycle" value="{{ $pm_core_metrics->avg_project_completion_time_in_cycle }}" id="avg_project_completion_time_in_cycle" placeholder="15 Days">
                                <span id="avg_project_completion_time_in_cycle_error" class="text-danger"></span>
                              </div>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="progress_project_count">Project completion rate for this Cycle (100% in progress projects Count)</label>
                                <input type="number" class="form-control height-35" name="progress_project_count" value="{{ $pm_core_metrics->progress_project_count }}" id="progress_project_count" placeholder="75%">
                                <span id="progress_project_count_error" class="text-danger"></span>
                              </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="progress_project_count_2">Project completion rate in this Cycle (100% in progress projects Count)</label>
                                <input type="number" class="form-control height-35" name="progress_project_count_2" value="{{ $pm_core_metrics->progress_project_count_2 }}" id="progress_project_count_2" placeholder="60%">
                                <span id="progress_project_count_2_error" class="text-danger"></span>
                              </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="progress_project_value">Project completion rate for this Cycle (100% in progress projects Value)</label>
                                <input type="number" class="form-control height-35" name="progress_project_value" value="{{ $pm_core_metrics->progress_project_value }}"  id="progress_project_value" placeholder="75%">
                                <span id="progress_project_value_error" class="text-danger"></span>
                              </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="progress_project_value_2">Project completion rate in this Cycle (100% in progress projects Value)</label>
                                <input type="number" class="form-control height-35" name="progress_project_value_2" value="{{ $pm_core_metrics->progress_project_value_2 }}" id="progress_project_value_2" placeholder="60%">
                                <span id="progress_project_value_2_error" class="text-danger"></span>
                              </div>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="project_completion_rate_for_this_cycle_count">Project completion rate for this Cycle (Count)</label>
                                <input type="number" class="form-control height-35" name="project_completion_rate_for_this_cycle_count" value="{{ $pm_core_metrics->project_completion_rate_for_this_cycle_count }}" id="project_completion_rate_for_this_cycle_count" placeholder="70%">
                                <span id="project_completion_rate_for_this_cycle_count_error" class="text-danger"></span>
                              </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="project_completion_rate_in_this_cycle_count">Project completion rate in this Cycle (Count)</label>
                                <input type="number" class="form-control height-35" name="project_completion_rate_in_this_cycle_count" value="{{ $pm_core_metrics->project_completion_rate_in_this_cycle_count }}"  id="project_completion_rate_in_this_cycle_count" placeholder="60%">
                                <span id="project_completion_rate_in_this_cycle_count_error" class="text-danger"></span>
                              </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="project_completion_rate_for_this_cycle_value">Project completion rate for this Cycle (Value)</label>
                                <input type="number" class="form-control height-35" name="project_completion_rate_for_this_cycle_value" value="{{ $pm_core_metrics->project_completion_rate_for_this_cycle_value }}" id="project_completion_rate_for_this_cycle_value" placeholder="70%">
                                <span id="project_completion_rate_for_this_cycle_value_error" class="text-danger"></span>
                              </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="project_completion_rate_in_this_cycle_value">Project completion rate in this Cycle (Value)</label>
                                <input type="number" class="form-control height-35" name="project_completion_rate_in_this_cycle_value" value="{{ $pm_core_metrics->project_completion_rate_in_this_cycle_value }}" id="project_completion_rate_in_this_cycle_value" placeholder="60%">
                                <span id="project_completion_rate_in_this_cycle_value_error" class="text-danger"></span>
                              </div>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="value_of_upsale">Value of upsale/crosssale</label>
                                <input type="number" class="form-control height-35" name="value_of_upsale" value="{{ $pm_core_metrics->value_of_upsale }}" id="value_of_upsale" placeholder="120 Usd">
                                <span id="value_of_upsale_error" class="text-danger"></span>
                              </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="current">Current</label>
                                <input type="number" class="form-control height-35" name="current" value="{{ $pm_core_metrics->current }}" id="current" placeholder="20%">
                                <span id="current_error" class="text-danger"></span>
                              </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="current_plus_old_ones">Current plus old ones</label>
                                <input type="number" class="form-control height-35" name="current_plus_old_ones" value="{{ $pm_core_metrics->current_plus_old_ones }}" id="current_plus_old_ones" placeholder="25%">
                                <span id="current_plus_old_ones_error" class="text-danger"></span>
                              </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="cancelation_rate">Cancelation rate</label>
                                <input type="number" class="form-control height-35" name="cancelation_rate" value="{{ $pm_core_metrics->cancelation_rate }}" id="cancelation_rate" placeholder="5%">
                                <span id="cancelation_rate_error" class="text-danger"></span>
                              </div>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="number_of_revisions_for_cycle">Number of revisions for cycle (Caused By Me)</label>
                                <input type="number" class="form-control height-35" name="number_of_revisions_for_cycle" value="{{ $pm_core_metrics->number_of_revisions_for_cycle }}"  id="number_of_revisions_for_cycle" placeholder="12">
                                <span id="number_of_revisions_for_cycle_error" class="text-danger"></span>
                              </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="number_of_revisions_in_cycle">Number of revisions in cycle (Caused By Me)</label>
                                <input type="number" class="form-control height-35" name="number_of_revisions_in_cycle" value="{{ $pm_core_metrics->number_of_revisions_in_cycle }}"  id="number_of_revisions_in_cycle" placeholder="8">
                                <span id="number_of_revisions_in_cycle_error" class="text-danger"></span>
                              </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="avg_payment_per_day">Avg. Payment Rel. Count per day</label>
                                <input type="number" class="form-control height-35" name="avg_payment_per_day" value="{{ $pm_core_metrics->avg_payment_per_day }}" id="avg_payment_per_day" placeholder="1 Per Day">
                                <span id="avg_payment_per_day_error" class="text-danger"></span>
                              </div>
                        </div>
                    </div>
                    <button type="submit" id="update-button" class="btn btn-secondary mt-3">Update</button>
                </form>
            </div>
        </div>
    </div>
</div>
<script>
    $(document).ready(function() {
        $('#update-form').submit(function(e) {
            e.preventDefault();
            $('#update-button').attr("disabled", true);
            $('#update-button').html("Processing...");
            var url = $(this).data('url');
            var formData = new FormData(this);

            $.ajax({
                type: 'POST',
                url: url,
                data: formData,
                processData: false,
                contentType: false,
                success: function(response) {
                    if (response.status==200){
                        window.location.reload();
                        toastr.success('PM Core Metrics Update Successfully');
                        $('#update-button').attr("disabled", false);
                        $('#update-button').html("Update");
                    }
                },
                error: function(error) {
                    if(error.responseJSON.errors.released_amount_for_cycle){
                    $('#released_amount_for_cycle_error').text(error.responseJSON.errors.released_amount_for_cycle);
                    }else{
                        $('#released_amount_for_cycle_error').text('');
                    }
                    if(error.responseJSON.errors.total_released_amount){
                        $('#total_released_amount_error').text(error.responseJSON.errors.total_released_amount);
                    }else{
                        $('#total_released_amount_error').text('');
                    }
                    if(error.responseJSON.errors.avg_project_completion_time_for_cycle){
                        $('#avg_project_completion_time_for_cycle_error').text(error.responseJSON.errors.avg_project_completion_time_for_cycle);
                    }else{
                        $('#avg_project_completion_time_for_cycle_error').text('');
                    }
                    if(error.responseJSON.errors.avg_project_completion_time_in_cycle){
                        $('#avg_project_completion_time_in_cycle_error').text(error.responseJSON.errors.avg_project_completion_time_in_cycle);
                    }else{
                        $('#avg_project_completion_time_in_cycle_error').text('');
                    }
                    if(error.responseJSON.errors.progress_project_count){
                        $('#progress_project_count_error').text(error.responseJSON.errors.progress_project_count);
                    }else{
                        $('#progress_project_count_error').text('');
                    }
                    if(error.responseJSON.errors.progress_project_count_2){
                        $('#progress_project_count_2_error').text(error.responseJSON.errors.progress_project_count_2);
                    }else{
                        $('#progress_project_count_2_error').text('');
                    }
                    if(error.responseJSON.errors.progress_project_value){
                        $('#progress_project_value_error').text(error.responseJSON.errors.progress_project_value);
                    }else{
                        $('#progress_project_value_error').text('');
                    }
                    if(error.responseJSON.errors.progress_project_value_2){
                        $('#progress_project_value_2_error').text(error.responseJSON.errors.progress_project_value_2);
                    }else{
                        $('#progress_project_value_2_error').text('');
                    }
                    if(error.responseJSON.errors.project_completion_rate_for_this_cycle_count){
                        $('#project_completion_rate_for_this_cycle_count_error').text(error.responseJSON.errors.project_completion_rate_for_this_cycle_count);
                    }else{
                        $('#project_completion_rate_for_this_cycle_count_error').text('');
                    }
                    if(error.responseJSON.errors.project_completion_rate_in_this_cycle_count){
                        $('#project_completion_rate_in_this_cycle_count_error').text(error.responseJSON.errors.project_completion_rate_in_this_cycle_count);
                    }else{
                        $('#project_completion_rate_in_this_cycle_count_error').text('');
                    }
                    if(error.responseJSON.errors.project_completion_rate_for_this_cycle_value){
                        $('#project_completion_rate_for_this_cycle_value_error').text(error.responseJSON.errors.project_completion_rate_for_this_cycle_value);
                    }else{
                        $('#project_completion_rate_for_this_cycle_value_error').text('');
                    }
                    if(error.responseJSON.errors.project_completion_rate_in_this_cycle_value){
                        $('#project_completion_rate_in_this_cycle_value_error').text(error.responseJSON.errors.project_completion_rate_in_this_cycle_value);
                    }else{
                        $('#project_completion_rate_in_this_cycle_value_error').text('');
                    }
                    if(error.responseJSON.errors.value_of_upsale){
                        $('#value_of_upsale_error').text(error.responseJSON.errors.value_of_upsale);
                    }else{
                        $('#value_of_upsale_error').text('');
                    }
                    if(error.responseJSON.errors.current){
                        $('#current_error').text(error.responseJSON.errors.current);
                    }else{
                        $('#current_error').text('');
                    }
                    if(error.responseJSON.errors.current_plus_old_ones){
                        $('#current_plus_old_ones_error').text(error.responseJSON.errors.current_plus_old_ones);
                    }else{
                        $('#current_plus_old_ones_error').text('');
                    }
                    if(error.responseJSON.errors.cancelation_rate){
                        $('#cancelation_rate_error').text(error.responseJSON.errors.cancelation_rate);
                    }else{
                        $('#cancelation_rate_error').text('');
                    }
                    if(error.responseJSON.errors.number_of_revisions_for_cycle){
                        $('#number_of_revisions_for_cycle_error').text(error.responseJSON.errors.number_of_revisions_for_cycle);
                    }else{
                        $('#number_of_revisions_for_cycle_error').text('');
                    }
                    if(error.responseJSON.errors.number_of_revisions_in_cycle){
                        $('#number_of_revisions_in_cycle_error').text(error.responseJSON.errors.number_of_revisions_in_cycle);
                    }else{
                        $('#number_of_revisions_in_cycle_error').text('');
                    }
                    if(error.responseJSON.errors.avg_payment_per_day){
                        $('#avg_payment_per_day_error').text(error.responseJSON.errors.avg_payment_per_day);
                    }else{
                        $('#avg_payment_per_day_error').text('');
                    }
                    $('#update-button').attr("disabled", false);
                    $('#update-button').html("Update");
                }
            });

        });
    });
</script>
@endsection
