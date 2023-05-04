@extends('layouts.app')

@section('content')
    <!-- SETTINGS START -->
    <style>
        .settings-box {

	margin-left: 0px;
}
    </style>


        <x-setting-card>
            <x-slot name="header">
                <div class="s-b-n-header" id="tabs">
                    <h2 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                        @lang($pageTitle)</h2>
                </div>
            </x-slot>

            <div class="col-lg-12 col-md-12 ntfcn-tab-content-left w-100 p-4 ">
                <h6 class="text-center">Point distribution for won deal</h6>
                <br>
                <form id="save-kpi-settings" action="{{route('kpi-settings.update',$kpi->id)}}" method="PUT">
                    @csrf
                    <input type="hidden" name="id" value="{{$kpi->id}}">
                    <div class="form-group row">
                      <label for="inputPassword" class="col-sm-2 col-form-label">1. The bidder will get:</label>
                      <div class="col-sm-10 d-flex">
                        <input class="form-control height-35 f-14" type="number" name="the_bidder" id="the_bidder"  value="0" class="form-control"  placeholder="Percentage of points for bidder">
                          <label class="mt-2 mx-1">%</label>
                      </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">2. Sales executive who qualifies the deal:</label>
                        <div class="col-sm-10 d-flex">
                          <input class="form-control height-35 f-14" type="number" name="qualify" id="qualify" value="0" class="form-control"  placeholder="Percentage of points for qualified deals">
                            <label class="mt-2 mx-1">%</label>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">3. Sales executive who defined requirements of the deal will get:</label>
                        <div class="col-sm-10 d-flex">
                          <input class="form-control height-35 f-14" type="number" class="form-control" name="requirements_defined" id="requirements_defined" value="0"  placeholder="Percentage of points for requirements defined deals">
                            <label class="mt-2 mx-1">%</label>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">4. If anyone helps sales executive for less than:</label>
                        <div class="col-sm-3">
                          <input class="form-control height-35 f-14 mt-2" type="number" class="form-control" name="less_than" id="less_than" value="0"  placeholder="Percentage of points for requirements defined deals">
                        </div>
                          <span class="mt-3">Minutes</span>
                        <label for="inputPassword" class="col-sm-2 col-form-label mt-1">then he/she will get:</label>
                        <div class="col-sm-3 d-flex">
                          <input class="form-control height-35 f-14 mt-2" type="number" name="less_than_get" id="less_than_get" value="0" class="form-control"  placeholder="Percentage of points for requirements defined deals">
                            <label class="mt-2 mx-1">%</label>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">5. If anyone helps sales executive for more than:</label>
                        <div class="col-sm-3">
                          <input class="form-control height-35 f-14 mt-2" type="number" class="form-control" name="more_than" id="more_than"  value="0"  placeholder="Percentage of points for requirements defined deals">
                        </div>
                          <span class="mt-3">Minutes</span>
                        <label for="inputPassword" class="col-sm-2 col-form-label mt-1">then he/she will get:</label>
                        <div class="col-sm-3 d-flex">
                          <input class="form-control height-35 f-14 mt-2" type="number" class="form-control" name="more_than_get" id="more_than_get" value="0"  placeholder="Percentage of points for requirements defined deals">
                            <label class="mt-2 mx-1">%</label>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">6. Sales executive who made the proposal of the deal will get:</label>
                        <div class="col-sm-10 d-flex">
                          <input class="form-control height-35 f-14" type="number" name="proposal_made" id="proposal_made" value="0" class="form-control"  placeholder="Percentage of points for requirements defined deals">
                            <label class="mt-2 mx-1">%</label>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">7. Sales executive who started the negotiation of the deal will get:</label>
                        <div class="col-sm-10 d-flex">
                          <input class="form-control height-35 f-14" type="number" class="form-control" name="negotiation_started" id="negotiation_started" value="0"  placeholder="Percentage of points for requirements defined deals">
                            <label class="mt-2 mx-1">%</label>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">8. Sales executive who shared the milestone breakdown of the deal with the client will get:</label>
                        <div class="col-sm-10 d-flex">
                          <input class="form-control height-35 f-14" type="number" class="form-control" name="milestone_breakdown" id="milestone_breakdown" value="0"  placeholder="Percentage of points for requirements defined deals">
                            <label class="mt-2 mx-1">%</label>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">9. Sales executive who closed (won) the deal will get:</label>
                        <div class="col-sm-10 d-flex">
                          <input class="form-control height-35 f-14" type="number" class="form-control" name="closed_deal" id="closed_deal" value="0"  placeholder="Percentage of points for requirements defined deals">
                            <label class="mt-2 mx-1">%</label>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">10. Sales executive who shared the contact form with the client and filled out the form for
                            project manager will get:</label>
                        <div class="col-sm-10 d-flex">
                          <input class="form-control height-35 f-14" type="number" name="contact_form" id="contact_form" value="0" class="form-control"  placeholder="Percentage of points for requirements defined deals">
                            <label class="mt-2 mx-1">%</label>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">11. Sales executive who made the deal authorized by the team leader will get:</label>
                        <div class="col-sm-10 d-flex">
                          <input class="form-control height-35 f-14" type="number" name="authorized_by_leader" id="authorized_by_leader" value="0" class="form-control"  placeholder="Percentage of points for requirements defined deals">
                            <label class="mt-2 mx-1">%</label>
                        </div>
                      </div>
                    <hr>


                    <div class="mb-3">
                        <div class="form-group row">
                            <label for="certainDeals" class="col-sm-3 col-form-label">12. If Sales Executive Converts </label>
                            <div class="col-sm-3">
                                <input class="form-control height-35 f-14" type="number" name="certain_deal" id="certain_deal" value="0" class="form-control"  placeholder="Points when they will add a certain deals like  deals per month">
                            </div>
                            <span class="mt-2">Deals Per Month</span>
                            <label for="certainDeals" class="col-sm-2 col-form-label">then he/she will get: </label>
                            <div class="col-sm-2">
                                <input class="form-control height-35 f-14" type="number" name="certain_deal_per_month" id="certain_deal_per_month" value="0" class="form-control"  placeholder="They will get 20 points when they will add a certain deals like 120 deals per month">
                            </div>
                            <span class="mt-2">Points</span>
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="form-group row">
                            <label for="certainDeals" class="col-sm-3 col-form-label">13. If Sales Executive Closes </label>
                            <div class="col-sm-3">
                                <input class="form-control height-35 f-14" type="number" name="closed_deal_goal" id="closed_deal_goal" value="0" class="form-control"  placeholder="They will get 30 points if they reach the closed deals goal like 20 deals per month or something">
                            </div>
                            <span class="mt-2">Deals Per Month</span>
                            <label for="certainDeals" class="col-sm-2 col-form-label">then he/she will get: </label>
                            <div class="col-sm-2">
                                <input class="form-control height-35 f-14" type="number" name="closed_deal_goal_month" id="closed_deal_goal_month" value="0" class="form-control"  placeholder="They will get 30 points if they reach the closed deals goal like 20 deals per month or something">
                            </div>
                            <span class="mt-2">Points</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-10 dynamic-field" id="dynamic-field-1">
                            <div class="row">
                                <label for="certainDeals" class="col-sm-2 col-form-label">14. If Sales Team Reaches </label>
                                <div class="form-group col-sm-3 d-flex">
                                    <label class="mt-2 mx-1">$</label>
                                    <input class="form-control height-35 f-14" type="number" name="sales_team_reaches[]" id="sales_team_reaches" value="0" class="form-control"  placeholder="0">
                                </div>
                                <span class="mt-2">Milestone Per Month</span>
                                <label for="certainDeals" class="col-sm-2 col-form-label">then they will get: </label>
                                <div class="col-sm-3">
                                    <input class="form-control height-35 f-14" type="number" name="closed_deals_goal_month[]" id="closed_deals_goal_month" value="0" class="form-control"  placeholder="0">
                                </div>
                                <span class="mt-2">Points</span>
                            </div>
                        </div>

                        <div class="col-md-2 append-buttons">
                            <div class="clearfix">
                                <button type="button" id="add-button" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus"></i></button>
                                <button type="button" id="remove-button" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-trash"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="form-group row">
                            <label for="certainDeals" class="col-sm-1 col-form-label">15. For every </label>
                            <div class="col-sm-2 d-flex">
                                <label class="mt-2 mx-1">$</label>
                                <input class="form-control height-35 f-14" type="number" name="additional_milestone" id="additional_milestone" value="0" class="form-control"  placeholder="They will get 30 points if they reach the closed deals goal like 20 deals per month or something">
                            </div>
                            <span class="mt-2">Additional to the Milestone Per Month</span>
                            <label for="certainDeals" class="col-sm-2 col-form-label">then they will get: </label>
                            <div class="col-sm-3">
                                <input class="form-control height-35 f-14" type="number" name="additional_milestone_point" id="additional_milestone_point" value="0" class="form-control"  placeholder="They will get 30 points if they reach the closed deals goal like 20 deals per month or something">
                            </div>
                            <span class="mt-2">Additional Points</span>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-10 dynamicMore-field" id="dynamicMore-field-1">
                            <div class="row">
                                <label for="certainDeals" class="col-sm-3 col-form-label">16. If Sales Team Generates sales from</label>
                                <div class="form-group col-sm-1 d-flex">
                                    <label class="mt-2 mx-1">$</label>
                                    <input class="form-control height-35 f-14" type="number" name="sales_from[]" id="sales_from" value="0" class="form-control"  placeholder="0">
                                </div>
                                <label for="certainDeals" class="col-sm-1 col-form-label">To </label>
                                <div class="col-sm-1 d-flex">
                                    <label class="mt-2 mx-1">$</label>
                                    <input class="form-control height-35 f-14" type="number" name="sales_to[]" id="sales_to" value="0" class="form-control"  placeholder="0">
                                </div>
                                <span class="mt-2">Per Month </span>
                                <label for="certainDeals" class="col-sm-2 col-form-label">Team lead will get</label>
                                <div class="col-sm-3 d-flex">
                                    <input class="form-control height-35 f-14" type="number" name="sales_get[]" id="sales_get" value="0" class="form-control"  placeholder="0">
                                    <label class="mt-2 mx-1">%</label>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-2 append-buttons">
                            <div class="clearfix">
                                <button type="button" id="addMore-button" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus"></i></button>
                                <button type="button" id="removeMore-button" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-trash"></i></button>
                            </div>
                        </div>
                    </div>




                <div class="mb-3">
                    <div class="form-group row">
                        <label for="certainDeals" class="col-sm-1 col-form-label">17. If sales team generates sales above </label>
                        <div class="col-sm-2 d-flex">
                            <label class="mt-2 mx-1">$</label>
                            <input class="form-control height-35 f-14" type="number" name="sales_above" id="sales_above" value="0" class="form-control"  placeholder="They will get 30 points if they reach the closed deals goal like 20 deals per month or something">
                        </div>
                        <span class="mt-2">Per Month</span>
                        <label for="certainDeals" class="col-sm-2 col-form-label">Team lead will get: </label>
                        <div class="col-sm-3 d-flex">
                            <input class="form-control height-35 f-14" type="number" name="sales_above_point" id="sales_above_point" value="0" class="form-control"  placeholder="They will get 30 points if they reach the closed deals goal like 20 deals per month or something">
                            <label class="mt-2 mx-1">%</label>
                        </div>
                        <span class="mt-2">Points</span>
                    </div>
                </div>
                <div class="mb-3">
                    <div class="form-group row">
                        <label for="certainDeals" class="col-sm-3 col-form-label">18. If the hourly rate of the project based on estimated hours </label>
                        <div class="col-sm-1">
                            <select name="estimated_hours" id="estimated_hours" class="form-control height-35 f-14">
                                <option value="">--</option>
                                <option value="and">And</option>
                                <option value="or">Or</option>
                            </select>
                        </div>
                        <label for="certainDeals" class="col-sm-2 col-form-label">Logged hours is more than </label>
                        <div class="col-sm-1 d-flex">
                            <label class="mt-2 mx-1">$</label>
                            <input class="form-control height-35 f-14" type="number" name="logged_hours" id="logged_hours" value="0" class="form-control"  placeholder="They will get 30 points if they reach the closed deals goal like 20 deals per month or something">
                        </div>
                        <label for="certainDeals" class="col-sm-2 col-form-label">Sales Executive will get </label>
                        <div class="col-sm-1 d-flex">
                            <input class="form-control height-35 f-14" type="number" name="sales_executive" id="sales_executive" value="0" class="form-control"  placeholder="They will get 30 points if they reach the closed deals goal like 20 deals per month or something">
                            <label class="mt-2 mx-1">%</label>
                        </div>
                        <span class="mt-2">Points of the sales amount</span>
                    </div>
                </div>
                <div class="mb-3">
                    <div class="form-group row">
                        <label for="certainDeals" class="col-sm-3 col-form-label">19. If the hourly rate of the project based on estimated hours </label>
                        <div class="col-sm-1">
                            <select name="estimated_hours2" id="estimated_hours2" class="form-control height-35 f-14">
                                <option value="">--</option>
                                <option value="and">And</option>
                                <option value="or">Or</option>
                            </select>
                        </div>
                        <label for="certainDeals" class="col-sm-2 col-form-label">Logged hours is more than </label>
                        <div class="col-sm-1 d-flex">
                            <label class="mt-2 mx-1">$</label>
                            <input class="form-control height-35 f-14" type="number" name="logged_hours2" id="logged_hours2" value="0" class="form-control"  placeholder="They will get 30 points if they reach the closed deals goal like 20 deals per month or something">
                        </div>
                        <label for="certainDeals" class="col-sm-2 col-form-label">Sales Executive will get </label>
                        <div class="col-sm-1 d-flex">
                            <input class="form-control height-35 f-14" type="number" name="sales_executive2" id="sales_executive2" value="0" class="form-control"  placeholder="They will get 30 points if they reach the closed deals goal like 20 deals per month or something">
                            <label class="mt-2 mx-1">%</label>
                        </div>
                        <span class="mt-2">Points of the sales amount</span>
                    </div>
                </div>
                <div class="mb-3">
                    <div class="form-group row">
                        <label for="certainDeals" class="col-sm-3 col-form-label">20. If the hourly rate of the project based on estimated hours </label>
                        <div class="col-sm-1">
                            <select name="estimated_hours3" id="estimated_hours3" class="form-control height-35 f-14">
                                <option value="">--</option>
                                <option value="and">And</option>
                                <option value="or">Or</option>
                            </select>
                        </div>
                        <label for="certainDeals" class="col-sm-2 col-form-label">Logged hours is more than </label>
                        <div class="col-sm-1 d-flex">
                            <label class="mt-2 mx-1">$</label>
                            <input class="form-control height-35 f-14" type="number" name="logged_hours3" id="logged_hours3" value="0" class="form-control"  placeholder="They will get 30 points if they reach the closed deals goal like 20 deals per month or something">
                        </div>
                        <label for="certainDeals" class="col-sm-2 col-form-label">Sales Executive will get </label>
                        <div class="col-sm-1 d-flex">
                            <input class="form-control height-35 f-14" type="number" name="sales_executive3" id="sales_executive3" value="0" class="form-control"  placeholder="They will get 30 points if they reach the closed deals goal like 20 deals per month or something">
                            <label class="mt-2 mx-1">%</label>
                        </div>
                        <span class="mt-2">Points of the sales amount</span>
                    </div>
                </div>
            </div>

            <x-slot name="action">
                <!-- Buttons Start -->
                <div class="w-100 border-top-grey">
                    <x-setting-form-actions>
                        <x-forms.button-primary id="save-form" class="mr-3" icon="check">@lang('app.save')
                        </x-forms.button-primary>

                        <x-forms.button-cancel :link="url()->previous()" class="border-0">@lang('app.cancel')
                        </x-forms.button-cancel>
                        </x-settingsform-actions>
                </div>
                <!-- Buttons End -->
            </x-slot>
        </form>

        </x-setting-card>

    <!-- SETTINGS END -->
@endsection

@push('scripts')

    <script>
        $('#save-form').click(function(e){
            e.preventDefault();
            // console.log(formData);
            $('#save-form').attr("disabled", true);
            $('#save-form').html("Processing...");
            var sales_team_reaches = document.getElementsByName("sales_team_reaches[]");
            var sales_team_reaches_values = [];
            for (var i = 0; i < sales_team_reaches.length; i++) {
                sales_team_reaches_values.push(sales_team_reaches[i].value);
            }
            var closed_deals_goal_month = document.getElementsByName("closed_deals_goal_month[]");
            var closed_deals_goal_month_values = [];
            for (var i = 0; i < closed_deals_goal_month.length; i++) {
                closed_deals_goal_month_values.push(closed_deals_goal_month[i].value);
            }
            var sales_from = document.getElementsByName("sales_from[]");
            var sales_from_values = [];
            for (var i = 0; i < sales_from.length; i++) {
                sales_from_values.push(sales_from[i].value);
            }
            var sales_to = document.getElementsByName("sales_to[]");
            var sales_to_values = [];
            for (var i = 0; i < sales_to.length; i++) {
                sales_to_values.push(sales_to[i].value);
            }
            var sales_get = document.getElementsByName("sales_get[]");
            var sales_get_values = [];
            for (var i = 0; i < sales_get.length; i++) {
                sales_get_values.push(sales_get[i].value);
            }
            var data= {
                '_token': "{{ csrf_token() }}",
                'the_bidder': document.getElementById("the_bidder").value,
                'qualify': document.getElementById("qualify").value,
                'requirements_defined': document.getElementById("requirements_defined").value,
                'less_than': document.getElementById("less_than").value,
                'less_than_get': document.getElementById("less_than_get").value,
                'more_than': document.getElementById("more_than").value,
                'more_than_get': document.getElementById("more_than_get").value,
                'proposal_made': document.getElementById("proposal_made").value,
                'negotiation_started': document.getElementById("negotiation_started").value,
                'milestone_breakdown': document.getElementById("milestone_breakdown").value,
                'closed_deal': document.getElementById("closed_deal").value,
                'contact_form': document.getElementById("contact_form").value,
                'authorized_by_leader': document.getElementById("authorized_by_leader").value,
                'certain_deal': document.getElementById("certain_deal").value,
                'certain_deal_per_month': document.getElementById("certain_deal_per_month").value,
                'additional_milestone': document.getElementById("additional_milestone").value,
                'additional_milestone_point': document.getElementById("additional_milestone_point").value,
                'sales_above': document.getElementById("sales_above").value,
                'sales_above_point': document.getElementById("sales_above_point").value,
                'estimated_hours': document.getElementById("estimated_hours").value,
                'logged_hours': document.getElementById("logged_hours").value,
                'sales_executive': document.getElementById("sales_executive").value,
                'estimated_hours2': document.getElementById("estimated_hours2").value,
                'logged_hours2': document.getElementById("logged_hours2").value,
                'sales_executive2': document.getElementById("sales_executive2").value,
                'estimated_hours3': document.getElementById("estimated_hours3").value,
                'logged_hours3': document.getElementById("logged_hours3").value,
                'sales_executive3': document.getElementById("sales_executive3").value,
                'sales_team_reaches': sales_team_reaches_values,
                'closed_deals_goal_month': closed_deals_goal_month_values,
                'sales_from': sales_from_values,
                'sales_to': sales_to_values,
                'sales_get': sales_get_values,
                'id':{{$kpi->id}},
            }
            // console.log(data);
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                type: "PUT",
                url: "{{ route('kpi-settings.update',$kpi->id) }}",
                data: data,
                dataType: "json",
                success: function (response) {
                    $('#save-kpi-settings').trigger("reset");
                    toastr.success('Kpi Update Successfully');
                    window.location.reload();
                    $('#save-form').attr("disabled", false);
                    $('#save-form').html("Save");
                },
                error: function(error) {
                    // console.log(response);
                    $('#save-form').attr("disabled", false);
                    $('#save-form').html("Save");
                }
            });
        });
    </script>
   
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
                var total = $('input[name="link[]"]').length;
                count = totalFields() + 1;
                field = $("#dynamic-field-1").clone();
                field.attr("id", "dynamic-field-" + count);
                field.children("label").attr("for", "linkError_" + 'total').text("Field " + count);
                field.find("input").attr("id", "linkError_" + 'total').val("");
                field.append('<span id="linkError_'+total+'" class="text-danger" for="link"></span>');
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
        // const dynamicField = document.getElementById('dynamic-field-1');
        // const addButton = dynamicField.querySelector('button');
        //
        // addButton.addEventListener('click', () => {
        //     const clone = dynamicField.cloneNode(true);
        //     document.body.appendChild(clone);
        // });
        // const dynamicField = document.getElementById('addMore-field-1');
        // const addButton = dynamicField.querySelector('button');
        //
        // addButton.addEventListener('click', () => {
        //     const clone = dynamicField.cloneNode(true);
        //     document.body.appendChild(clone);
        // });
        $(document).ready(function () {
            var buttonAdd = $("#addMore-button");
            var buttonRemove = $("#removeMore-button");
            var className = ".dynamicMore-field";
            var count = 0;
            var field = "";
            var maxFields = 50;

            function totalFields() {
                return $(className).length;
            }

            function addNewField() {
                var total = $('input[name="link[]"]').length;
                count = totalFields() + 1;
                field = $("#dynamicMore-field-1").clone();
                field.attr("id", "dynamicMore-field-" + count);
                field.children("label").attr("for", "linkError_" + 'total').text("Field " + count);
                field.find("input").attr("id", "linkError_" + 'total').val("");
                field.append('<span id="linkError_'+total+'" class="text-danger" for="link"></span>');
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
@endpush
