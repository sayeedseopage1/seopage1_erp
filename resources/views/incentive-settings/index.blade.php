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
            <h3 class="text-center  border-1 shadow-sm mx-auto p-3 rounded text-uppercase" style="width: fit-content;">Incentive Settings Page</h3>
            <br>
            <form id="incentive-settings" action="{{ route('incentive-settings.update',$incentive_setting->id) }}" method="PUT">
                @csrf
                <input type="hidden" name="id" value="{{$incentive_setting->id}}">
                <section class="point__distribution">
                    <div class="point__row">
                        <div class="point__col">1. For every shift, every point above </div>
                        <div class="point__col"> <input type="number" class="point__input" name="every_shift_every_point_above" id="every_shift_every_point_above" value="{{$incentive_setting->every_shift_every_point_above}}"> </div>
                        <div class="point__col"> points will count towards incentive.</div>
                     </div>
                    <div class="point__row">
                        <div class="point__col">2. If the team does not meet the minimum goal, shifts that meet their individual goals will receive</div>
                        <div class="point__col"> <input type="number" class="point__input" name="individual_goal_percentage" id="individual_goal_percentage" value="{{$incentive_setting->individual_goal_percentage}}"> % </div>
                        <div class="point__col">  of their actual incentive.</div>
                    </div>
                    <div class="point__row">
                        <div class="point__col">3. Each point will have a value of BDT</div>
                        <div class="point__col"> <input type="number" class="point__input" name="point_of_value" id="point_of_value" value="{{$incentive_setting->point_of_value}}"> </div>
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
                        <div class="point__col"> <input type="number" class="point__input" name="incentive_deduction" id="incentive_deduction" value="{{$incentive_setting->incentive_deduction}}"> </div>
                        <div class="point__col">% less from the total incentive amount.</div>
                    </div>
                </section>
                <x-slot name="action">
                    <!-- Buttons Start -->
                    <div class="w-100 border-top-grey">
                        <x-setting-form-actions>
                            <x-forms.button-primary id="update-form" class="mr-3" icon="check">@lang('app.update')
                            </x-forms.button-primary>

                            <x-forms.button-cancel :link="url()->previous()" class="border-0">@lang('app.cancel')
                            </x-forms.button-cancel>
                            </x-settingsform-actions>
                    </div>
                    <!-- Buttons End -->
                </x-slot>
            </form>
        </div>
    </x-setting-card>

    <!-- SETTINGS END -->
@endsection

@push('scripts')

    <script>
        $('#update-form').click(function(e){
            e.preventDefault();
            $('#update-form').attr("disabled", true);
            $('#update-form').html("Processing...");
            var data= {
                '_token': "{{ csrf_token() }}",
                'every_shift_every_point_above': document.getElementById("every_shift_every_point_above").value,
                'individual_goal_percentage': document.getElementById("individual_goal_percentage").value,
                'point_of_value': document.getElementById("point_of_value").value,
                // 'point_of_contribute': document.getElementById("point_of_contribute").value,
                'incentive_deduction': document.getElementById("incentive_deduction").value,
                'id':{{$incentive_setting->id}},

            }
            // console.log(data);
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                type: "PUT",
                url: "{{ route('incentive-settings.update',$incentive_setting->id) }}",
                data: data,
                dataType: "json",
                success: function (response) {
                    $('#incentive-settings').trigger("reset");
                    toastr.success('Incentive Update Successfully');
                    window.location.reload();
                    $('#update-form').attr("disabled", false);
                    $('#update-form').html("Save");
                },
                error: function(error) {
                    // console.log(response);
                    $('#update-form').attr("disabled", false);
                    $('#update-form').html("Save");
                }
            });
        });
    </script>
@endpush
