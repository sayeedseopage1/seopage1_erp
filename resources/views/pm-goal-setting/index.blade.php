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
            <h4>Fixed Project</h4>
            <form id="pm-goal-setting-form" action="#" method="PUT">
                @csrf
                <section class="point__distribution">
                    @foreach ($pmGoalFixed as $pm_goal)
                    <div class="d-flex">
                        <div class="point__row">
                            <div class="point__col">
                                <input type="number" class="point__input" name="initial_value" id="initial_value_{{ $pm_goal->id }}" value="{{ $pm_goal->initial_value }}">
                            </div>
                            <div class="point__col"> - </div>
                            <div class="point__col">
                                <input type="number" class="point__input" name="end_value" id="end_value_{{ $pm_goal->id }}" value="{{ $pm_goal->end_value }}">
                            </div>
                            <div class="point__col"> {{$categories[$pm_goal->category]}}</div>
                        </div>
                        <button type="button" class="btn btn-primary ml-3 mt-2 h-50 updateBtn" data-id="{{ $pm_goal->id }}"><i class="fa fa-check"></i></button>
                    </div>
                     @endforeach
                </section>
            </form>
        </div>
        <div class="col-lg-12 col-md-12 ntfcn-tab-content-left w-100 p-4 ">
            <h4>Hourly Project</h4>
            <form id="pm-goal-setting-form" action="#" method="PUT">
                @csrf
                <section class="point__distribution">
                    @foreach ($pmGoalHourly as $pm_goal)
                    <div class="d-flex">
                        <div class="point__row">
                            <div class="point__col">
                                <input type="number" class="point__input" name="initial_value" id="initial_value_{{ $pm_goal->id }}" value="{{ $pm_goal->initial_value }}">
                            </div>
                            <div class="point__col"> - </div>
                            <div class="point__col">
                                <input type="number" class="point__input" name="end_value" id="end_value_{{ $pm_goal->id }}" value="{{ $pm_goal->end_value }}">
                            </div>
                            <div class="point__col"> {{$categories[$pm_goal->category]}}</div>
                        </div>
                        <button type="button" class="btn btn-primary ml-3 mt-2 h-50 updateBtn" data-id="{{ $pm_goal->id }}"><i class="fa fa-check"></i></button>
                    </div>
                     @endforeach
                </section>
            </form>
        </div>
    </x-setting-card>

    <!-- SETTINGS END -->
@endsection
@push('scripts')
<script>
    $(document).ready(function() {
        $(".updateBtn").on("click", function(e) {
            e.preventDefault();
            var id = $(this).data("id");

            var data= {
                '_token': "{{ csrf_token() }}",
                'initial_value': $("#initial_value_" + id).val(),
                'end_value': $("#end_value_" + id).val(),
                'id': id,
            }
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });

            $.ajax({
                type: "POST",
                url: "{{ route('pm-goal-setting-update') }}",
                data: data,
                dataType: "json",
                success: function (response) {
                    $("#initial_value_" + id).val(response.pmGoal.initial_value);
                    $("#end_value_" + id).val(response.pmGoal.end_value);
                    $("#no_of_goal_" + id).val(response.pmGoal.no_of_goal);
                    toastr.success('PM Goal Update Successfully');
                },
            });
        });
    });
</script>
@endpush
