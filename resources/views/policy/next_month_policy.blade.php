@extends('layouts.app')

@section('content')
    <!-- SETTINGS START -->
    <style>
        .settings-box {

            margin-left: 0px;
        }
    </style>
    <style>
        .point__row_wrapper_container{
            display: flex;
            align-items: flex-end;
            -webkit-align-items: flex-end;
            -webkit-flex-wrap: wrap;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            gap: 10px;
        }
        .point__row_wrapper {
            display: flex;
            -webkit-flex-direction: column;
            -ms-flex-direction: column;
            flex-direction: column;
            gap: 16px;
            position: relative;
            width: -moz-fit-content;
            width: fit-content;
        }

        .point__distribution{
            display: flex;
            -webkit-flex-direction: column;
            -ms-flex-direction: column;
            -webkit-flex-wrap: wrap;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            gap: 16px;
        }
        .point__row{
            width: fit-content;
            display: flex;
            align-items: center;
            -webkit-flex-wrap: wrap;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            gap: 10px;
            padding: 16px;
            border: 1px solid #f3f3f3;
            border-radius: 6px;
            box-shadow: 0 2px 3px rgba(0, 0, 0, .03);
        }

        .point__col{
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .point__col > input,
        .point__col > select{
            padding: 1px 10px;
            width: 80px;
            border: 1px solid rgba(0, 0, 0, .1);
            border-radius: 4px;
        }
        .point__col > select {
            width:-moz-fit-content;
            width: fit-content;
            padding: 3px 10px;
            background: transparent;
        }

        .__point_field_add_btn_group{
            margin-bottom: 15px;
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
            <h3 class="text-center  border-1 shadow-sm mx-auto p-3 rounded text-uppercase" style="width: fit-content;">Base Point Distribution</h3>
            <br>
            <form id="save-kpi-settings" action="" method="post">
                @csrf
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-4 col-form-label">Select Months</label>
                    <div class="col-sm-4 d-flex">
                        <select class="form-control" name="start_month" id="start_month">
                            <option>Select Month</option>
                            @php
                            $numberOfMonths = 12; // Number of next months to retrieve
                            $currentMonth = \Carbon\Carbon::now();
                           
                            for ($i = 0; $i < $numberOfMonths; $i++) {
                                $left_days = (int) \Carbon\Carbon::now()->endOfMonth()->format('d') - (int) $currentMonth->format('d');
                                $nextMonth = $currentMonth->addMonth();
                                echo '<option value="'.$nextMonth->startOfMonth()->format('Y-m-d').'">'.$nextMonth->format('F').'  ('.$nextMonth->format('Y').')</option>';
                            }
                            @endphp
                        </select>
                        
                    </div>
                </div>
                <p id="already_exist_month" class="text-danger row mx-0"></p>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-4 col-form-label">1. The Bidder will get:</label>
                    <div class="col-sm-8 d-flex">
                        <input class="form-control height-35 f-14" type="number" name="the_bidder" id="the_bidder"  value="{{$kpi->the_bidder}}" class="form-control"  placeholder="Percentage of points for bidder">
                        <label class="mt-2 mx-1">%</label>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-4 col-form-label">2. Sales executive who qualifies the deal:</label>
                    <div class="col-sm-8 d-flex">
                        <input class="form-control height-35 f-14" type="number" name="qualify" id="qualify" value="{{$kpi->qualify}}" class="form-control"  placeholder="Percentage of points for qualified deals">
                        <label class="mt-2 mx-1">%</label>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-4 col-form-label">3. Sales executive who defined requirements of the deal will get:</label>
                    <div class="col-sm-8 d-flex">
                        <input class="form-control height-35 f-14" type="number" class="form-control" name="requirements_defined" id="requirements_defined" value="{{$kpi->requirements_defined}}"  placeholder="Percentage of points for requirements defined deals">
                        <label class="mt-2 mx-1">%</label>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-4 col-form-label">4. If anyone helps sales executive for less than:</label>
                    <div class="col-sm-2">
                        <input class="form-control height-35 f-14 mt-2" type="number" class="form-control" name="less_than" id="less_than" value="{{$kpi->less_than}}"  placeholder="Percentage of points for requirements defined deals">
                    </div>
                    <span class="mt-3">Minutes</span>
                    <label for="inputPassword" class="col-sm-2 col-form-label mt-2">then he/she will get:</label>
                    <div class="col-sm-2 d-flex">
                        <input class="form-control height-35 f-14 mt-2" type="number" name="less_than_get" id="less_than_get" value="{{$kpi->less_than_get}}" class="form-control"  placeholder="Percentage of points for requirements defined deals">
                        <label class="mt-2 mx-1">%</label>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-4 col-form-label">5. If anyone helps sales executive for more than:</label>
                    <div class="col-sm-2">
                        <input class="form-control height-35 f-14 mt-2" type="number" class="form-control" name="more_than" id="more_than"  value="{{$kpi->more_than}}"  placeholder="Percentage of points for requirements defined deals">
                    </div>
                    <span class="mt-3">Minutes</span>
                    <label for="inputPassword" class="col-sm-2 col-form-label mt-2">then he/she will get:</label>
                    <div class="col-sm-2 d-flex">
                        <input class="form-control height-35 f-14 mt-2" type="number" class="form-control" name="more_than_get" id="more_than_get" value="{{$kpi->more_than_get}}"  placeholder="Percentage of points for requirements defined deals">
                        <label class="mt-2 mx-1">%</label>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-4 col-form-label">6. Sales executive who made the proposal of the deal will get:</label>
                    <div class="col-sm-8 d-flex">
                        <input class="form-control height-35 f-14" type="number" name="proposal_made" id="proposal_made" value="{{$kpi->proposal_made}}" class="form-control"  placeholder="Percentage of points for requirements defined deals">
                        <label class="mt-2 mx-1">%</label>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-4 col-form-label">7. Sales executive who started the negotiation of the deal will get:</label>
                    <div class="col-sm-8 d-flex">
                        <input class="form-control height-35 f-14" type="number" class="form-control" name="negotiation_started" id="negotiation_started" value="{{$kpi->negotiation_started}}"  placeholder="Percentage of points for requirements defined deals">
                        <label class="mt-2 mx-1">%</label>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-4 col-form-label">8. Sales executive who shared the milestone breakdown of the deal with the client will get:</label>
                    <div class="col-sm-8 d-flex">
                        <input class="form-control height-35 f-14" type="number" class="form-control" name="milestone_breakdown" id="milestone_breakdown" value="{{$kpi->milestone_breakdown}}"  placeholder="Percentage of points for requirements defined deals">
                        <label class="mt-2 mx-1">%</label>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-4 col-form-label">9. Sales executive who closed (won) the deal will get:</label>
                    <div class="col-sm-8 d-flex">
                        <input class="form-control height-35 f-14" type="number" class="form-control" name="closed_deal" id="closed_deal" value="{{$kpi->closed_deal}}"  placeholder="Percentage of points for requirements defined deals">
                        <label class="mt-2 mx-1">%</label>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-4 col-form-label">10. Sales executive who shared the contact form with the client and filled out the form for
                        project manager will get:</label>
                    <div class="col-sm-8 d-flex">
                        <input class="form-control height-35 f-14" type="number" name="contact_form" id="contact_form" value="{{$kpi->contact_form}}" class="form-control"  placeholder="Percentage of points for requirements defined deals">
                        <label class="mt-2 mx-1">%</label>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-4 col-form-label">11. Team Lead will get if he authorize the deal:</label>
                    <div class="col-sm-8 d-flex">
                        <input class="form-control height-35 f-14" type="number" name="authorized_by_leader" id="authorized_by_leader" value="{{$kpi->authorized_by_leader}}" class="form-control"  placeholder="Percentage of points for requirements defined deals">
                        <label class="mt-2 mx-1">%</label>
                    </div>
                </div>
                <hr>
                <hr>
                <h3 class="text-center mt-1 mb-5 border-1 shadow-sm mx-auto p-3 rounded text-uppercase" style="width: fit-content;">Point distribution for won deal</h3>
                <section class="point__distribution">
                    <div class="point__row">
                        <div class="point__col"> For every sales that gets accepted by project manager, respective sales shift will get </div>
                        <div class="point__col"> <input type="number" class="point__input" name="accepted_by_pm" id="accepted_by_pm" value="{{$kpi->accepted_by_pm}}"> </div>
                        <div class="point__col"> %  </div>
                    </div>
                    <div class="point__row_wrapper_container">
                        <div class="point__row_wrapper">
                            @foreach($kpi_logged_hours as $key => $value)
                            <div class="point__row dynamicMore-field" id="dynamicMore-field-{{$key}}">
                                <div class="point__col"> If the hourly rate of the project based on logged hours between </div>
                                <div class="point__col"> $<input type="number" class="point__input" name="logged_hours_between[]" id="logged_hours_between" value="{{$value->logged_hours_between}}" placeholder="0">  </div>
                                <div class="point__col"> To</div>
                                <div class="point__col"> $<input type="number" class="point__input" name="logged_hours_between_to[]" id="logged_hours_between_to" value="{{$value->logged_hours_between_to}}" placeholder="0"> , </div>
                                <div class="point__col"> shift will get</div>
                                <div class="point__col"> <input type="number" class="point__input" name="logged_hours_sales_amount[]" id="logged_hours_sales_amount"  value="{{$value->logged_hours_sales_amount}}" placeholder="0"> % </div>
                                <div class="point__col"> of the sales amount. </div>
                            </div>
                            @endforeach
                        </div>
                        <div class="point__col __point_field_add_btn_group">
                            <button type="button" id="addMore-button" class="btn btn-primary" style="padding: 0px 8px;"><i class="fa fa-plus" style="font-size: 12px;"></i></button>
                            <button type="button" id="removeMore-button" class="btn btn-secondary ml-1" disabled="disabled" style="padding: 0px  8px;"><i class="fa fa-trash" style="font-size: 12px;"></i></button>
                        </div>
                    </div>
                    <div class="point__row">
                        <div class="point__col"> If the hourly rate of the project based on logged hours above </div>
                        <div class="point__col"> $<input type="number" class="point__input" name="logged_hours_above" id="logged_hours_above" value="{{$kpi->logged_hours_above}}"> , </div>
                        <div class="point__col"> shift will get </div>
                        <div class="point__col"> <input type="number" class="point__input" name="logged_hours_above_sales_amount" id="logged_hours_above_sales_amount" value="{{$kpi->logged_hours_above_sales_amount}}"> % </div>
                        <div class="point__col"> of the sales amount. </div>
                    </div>
                    <div class="point__row">
                        <div class="point__col"> To achieve more than </div>
                        <div class="point__col"> <input type="number" class="point__input" name="achieve_more_than" id="achieve_more_than" value="{{$kpi->achieve_more_than}}"> %  </div>
                        <div class="point__col"> points, </div>
                        <div class="point__col"> Minimum project value cannot be less than </div>
                        <div class="point__col"> $<input type="number" class="point__input" name="achieve_less_than" id="achieve_less_than" value="{{$kpi->achieve_less_than}}"> </div>
                    </div>
                    <div class="point__row_wrapper_container">
                        @foreach($kpi_generate_sale as $key => $value)
                        <div class="point__row_wrapper">
                            <div class="point__row dynamic-field" id="dynamic-field-1">
                                <div class="point__col"> If sales team generates sales from </div>
                                <div class="point__col"> <input type="number" class="point__input" name="generate_sales_from[]" id="generate_sales_from" value="{{$value->generate_sales_from}}" placeholder="0">  </div>
                                <div class="point__col"> To</div>
                                <div class="point__col"> <input type="number" class="point__input" name="generate_sales_to[]" id="generate_sales_to" value="{{$value->generate_sales_to}}" placeholder="0">  </div>
                                <div class="point__col"> per month,</div>
                                <div class="point__col"> team lead will get </div>
                                <div class="point__col"> <input type="number" class="point__input" name="generate_sales_amount[]" id="generate_sales_amount"  value="{{$value->generate_sales_amount}}" placeholder="0"> % </div>
                                <div class="point__col"> points of the sales amount.</div>
                            </div>
                        </div>
                        @endforeach
                        <div class="point__col __point_field_add_btn_group">
                            <button type="button" id="add-button" class="btn btn-primary" style="padding: 0px 8px;"><i class="fa fa-plus" style="font-size: 12px;"></i></button>
                            <button type="button" id="remove-button" class="btn btn-secondary ml-1" disabled="disabled" style="padding: 0px  8px;"><i class="fa fa-trash" style="font-size: 12px;"></i></button>
                        </div>
                    </div>
                    <div class="point__row">
                        <div class="point__col"> If sales team generates sales above </div>
                        <div class="point__col"> $<input type="number" class="point__input" name="generate_sales_above" id="generate_sales_above" value="{{$kpi->generate_sales_above}}">  </div>
                        <div class="point__col"> per month, </div>
                        <div class="point__col"> team lead will get </div>
                        <div class="point__col"> <input type="number" class="point__input" name="generate_sales_above_point" id="generate_sales_above_point" value="{{$kpi->generate_sales_above_point}}"> % </div>
                        <div class="point__col">  points.</div>
                    </div>
                    <div class="point__row">
                        <div class="point__col"> If a sales shift generate any project equal/more than</div>

                        <div class="point__col"> $<input type="number" class="point__input" name="generate_single_deal" id="generate_single_deal" value="{{$kpi->generate_single_deal}}">  </div>
                        <div class="point__col"> on single deal, that shift will get a flat</div>
                        <div class="point__col"> <input type="number" class="point__input" name="bonus_point" id="bonus_point" value="{{$kpi->bonus_point}}">  </div>
                        <div class="point__col"> bonus points.</div>
                    </div>
                    <div class="point__row">
                        <div class="point__col">For every</div>
                        <div class="point__col"> $<input type="number" class="point__input" name="additional_sales_amount" id="additional_sales_amount" value="{{$kpi->additional_sales_amount}}">  </div>
                        <div class="point__col">addition sales</div>
                        <div class="point__col">
                            <select class="point__select" name="client_type" id="client_type">
                                <option value="new_client" class="point__option" @if($kpi->client_type == 'new_client') selected @endif>New client</option>
                                <option value="existing_client" class="point__option" @if($kpi->client_type == 'existing_client') selected @endif>Existing Client</option>
                                <option value="both" class="point__option">Both</option>
                            </select>
                        </div>
                        <div class="point__col">after</div>
                        <div class="point__col"> $<input type="number" class="point__input" name="after" id="after" value="{{$kpi->after}}">  </div>
                        <div class="point__col"> milestone per month, </div>
                        <div class="point__col"> shift will get </div>
                        <div class="point__col"> <input type="number" class="point__input" name="after_reach_amount" id="after_reach_amount" value="{{$kpi->after_reach_amount}}">  </div>
                        <div class="point__col"> points. </div>
                    </div>
                </section>
                <hr>
                <hr>
                <h3 class="text-center  border-1 shadow-sm mx-auto p-3 rounded text-uppercase" style="width: fit-content;">Incentive Settings Policy</h3>
                <section class="point__distribution">
                    <div class="point__row">
                        <div class="point__col">1. For every shift, every point above </div>
                        <div class="point__col"> <input type="number" class="point__input" name="every_shift_every_point_above" id="every_shift_every_point_above" value="{{$incentive->every_shift_every_point_above}}"> </div>
                        <div class="point__col"> points will count towards incentive.</div>
                    </div>
                    <div class="point__row">
                        <div class="point__col">2. If the team does not meet the minimum goal, shifts that meet their individual goals will receive</div>
                        <div class="point__col"> <input type="number" class="point__input" name="individual_goal_percentage" id="individual_goal_percentage" value="{{$incentive->individual_goal_percentage}}"> % </div>
                        <div class="point__col">  of their actual incentive.</div>
                    </div>
                    <div class="point__row">
                        <div class="point__col">3. Each point will have a value of BDT</div>
                        <div class="point__col"> <input type="number" class="point__input" name="point_of_value" id="point_of_value" value="{{$incentive->point_of_value}}"> </div>
                        <div class="point__col">  TK.</div>
                    </div>
                    <h3 class="text-center mt-2 mb-5 border-1 shadow-sm mx-auto p-3 rounded text-uppercase" style="width: fit-content;">Logical Settings for Incentive</h3>
                    {{--                    <div class="point__row">--}}
                    {{--                        <div class="point__col">1. If a shift has</div>--}}
                    {{--                        <div class="point__col"> <input type="number" class="point__input" name="point_of_contribute" id="point_of_contribute" value="{{$incentive_setting->point_of_contribute}}"> </div>--}}
                    {{--                        <div class="point__col">  points that contribute to the incentive, those points will be distributed proportionally among the shift members.</div>--}}
                    {{--                    </div>--}}
                    <div class="point__row">
                        <div class="point__col">1. For missing any 10 days goals, the sales shift will get</div>
                        <div class="point__col"> <input type="number" class="point__input" name="incentive_deduction" id="incentive_deduction" value="{{$incentive->incentive_deduction}}"> </div>
                        <div class="point__col">% less from the total incentive amount.</div>
                    </div>
                </section>
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
            var sales_from = document.getElementsByName("generate_sales_from[]");
            var sales_from_values = [];
            for (var i = 0; i < sales_from.length; i++) {
                sales_from_values.push(sales_from[i].value);
            }
            var sales_to = document.getElementsByName("generate_sales_to[]");
            var sales_to_values = [];
            for (var i = 0; i < sales_to.length; i++) {
                sales_to_values.push(sales_to[i].value);
            }
            var sales_amount = document.getElementsByName("generate_sales_amount[]");
            var sales_amount_values = [];
            for (var i = 0; i < sales_amount.length; i++) {
                sales_amount_values.push(sales_amount[i].value);
            }
            var logged_hours_between = document.getElementsByName("logged_hours_between[]");
            var logged_hours_between_values = [];
            for (var i = 0; i < logged_hours_between.length; i++) {
                logged_hours_between_values.push(logged_hours_between[i].value);
            }
            var logged_hours_between_to = document.getElementsByName("logged_hours_between_to[]");
            var logged_hours_between_to_values = [];
            for (var i = 0; i < logged_hours_between_to.length; i++) {
                logged_hours_between_to_values.push(logged_hours_between_to[i].value);
            }
            var logged_hours_sales_amount = document.getElementsByName("logged_hours_sales_amount[]");
            var logged_hours_sales_amount_values = [];
            for (var i = 0; i < logged_hours_sales_amount.length; i++) {
                logged_hours_sales_amount_values.push(logged_hours_sales_amount[i].value);
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
                'additional_sales_amount': document.getElementById("additional_sales_amount").value,
                'client_type': document.getElementById("client_type").value,
                'after': document.getElementById("after").value,
                'after_reach_amount': document.getElementById("after_reach_amount").value,

                'generate_single_deal': document.getElementById("generate_single_deal").value,
                'bonus_point': document.getElementById("bonus_point").value,
                'generate_sales_above': document.getElementById("generate_sales_above").value,
                'generate_sales_above_point': document.getElementById("generate_sales_above_point").value,
                'logged_hours_above': document.getElementById("logged_hours_above").value,
                'logged_hours_above_sales_amount': document.getElementById("logged_hours_above_sales_amount").value,
                'achieve_more_than': document.getElementById("achieve_more_than").value,
                'achieve_less_than': document.getElementById("achieve_less_than").value,
                'generate_sales_from': sales_from_values,
                'generate_sales_to': sales_to_values,
                'generate_sales_amount': sales_amount_values,
                'logged_hours_between': logged_hours_between_values,
                'logged_hours_between_to': logged_hours_between_to_values,
                'logged_hours_sales_amount': logged_hours_sales_amount_values,
                'accepted_by_pm': document.getElementById("accepted_by_pm").value,
                'every_shift_every_point_above': document.getElementById("every_shift_every_point_above").value,
                'individual_goal_percentage': document.getElementById("individual_goal_percentage").value,
                'point_of_value': document.getElementById("point_of_value").value,
                'incentive_deduction': document.getElementById("incentive_deduction").value,
                'start_month': $('#start_month option:selected').val(),
            }
            // console.log(data);
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                type: "POST",
                url: "{{ route('kpi-settings.store') }}",
                data: data,
                dataType: "json",
                success: function (response) {

                    if (response.already_exist_month) {
                        $('#already_exist_month').text('already exist goal of this month');
                    } else {
                        $('#save-kpi-settings').trigger("reset");
                        toastr.success('Kpi Update Successfully');
                        window.location.reload();
                        $('#save-form').attr("disabled", false);
                        $('#save-form').html("Save");
                    }

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
