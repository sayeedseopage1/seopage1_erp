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
            width: 700px;
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

        .point__col > input{
            padding: 1px 10px;
            border: 1px solid rgba(0, 0, 0, .1);
            border-radius: 4px;
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
                <form id="save-pm-goal-setting" action="{{ route('pm-goal-setting.update',$pm_goal->id) }}" method="PUT">
                    @csrf
                    <input type="hidden" name="id" value="{{ $pm_goal->id }}">
                    <section class="point__distribution">
                        <div class="point__row">
                            <div class="point__col">
                                <input type="number" class="point__input" name="project_budget_range_to" id="project_budget_range_to" value="{{ $pm_goal->project_budget_range_to }}"><span>-</span>
                            </div>
                            <div class="point__col">
                                <input type="number" class="point__input" name="project_budget_range_from" id="project_budget_range_from" value="{{ $pm_goal->project_budget_range_from }}"><span>usd</span>
                            </div>
                            @if ($pm_goal->project_budget_range_name)
                                <div class="point__col">
                                    <input type="text" class="point__input" name="project_budget_range_name" id="project_budget_range_name" value="{{ $pm_goal->project_budget_range_name }}">
                                </div>
                            @else
                                <div class="point__col">Regular.</div>
                            @endif
                        </div>
                        <div class="point__row">
                            <div class="point__col">
                                <input type="number" class="point__input" name="project_priority_to" id="project_priority_to" value="{{ $pm_goal->project_priority_to }}"><span>-</span>
                            </div>
                            <div class="point__col">
                                <input type="number" class="point__input" name="project_priority_from" id="project_priority_from" value="{{ $pm_goal->project_priority_from }}">
                            </div>
                            @if ($pm_goal->project_priority_name)
                                <div class="point__col">
                                    <input type="text" class="point__input" name="project_priority_name" id="project_priority_name" value="{{ $pm_goal->project_priority_name }}">
                                </div>
                            @else
                                <div class="point__col">Priority.</div>
                            @endif
                        </div>
                        <div class="point__row">
                            <div class="point__col">
                                <input type="number" class="point__input" name="project_high_priority_to" id="project_high_priority_to" value="{{ $pm_goal->project_high_priority_to }}"><span>-</span>
                            </div>
                            <div class="point__col">
                                <input type="number" class="point__input" name="project_high_priority_from" id="project_high_priority_from" value="{{ $pm_goal->project_high_priority_from }}">
                            </div>
                            @if ($pm_goal->project_high_priority_name)
                                <div class="point__col">
                                    <input type="text" class="point__input" name="project_high_priority_name" id="project_high_priority_name" value="{{ $pm_goal->project_high_priority_name }}">
                                </div>
                            @else
                                <div class="point__col">High-priority.</div>
                            @endif
                        </div>
                        <div class="point__row_wrapper_container">
                            <div class="point__row_wrapper">
                                <div class="point__row dynamic-field" id="dynamic-field-1">
                                    <div class="point__col"> <input type="number" class="point__input" name="project_top_most_priority_to" id="project_top_most_priority_to" value="{{ $pm_goal->project_top_most_priority_to }}">  </div>
                                    <div class="point__col">-</div>
                                    <div class="point__col"> <input type="number" class="point__input" name="project_top_most_priority_from" id="project_top_most_priority_from" value="{{ $pm_goal->project_top_most_priority_from }}">  </div>
                                    @if ($pm_goal->project_top_most_priority_name)
                                        <div class="point__col">
                                            <input type="text" class="point__input" name="project_top_most_priority_name" id="project_top_most_priority_name" value="{{ $pm_goal->project_top_most_priority_name }}">
                                        </div>
                                    @else
                                        <div class="point__col">Top most priority.</div>
                                    @endif
                                </div>
                                @if ($pm_goal->critically_sensitive_to || $pm_goal->critically_sensitive_from || $pm_goal->critically_sensitive_name)
                                <div class="point__row dynamic-field" id="dynamic-field-1">
                                    <div class="point__col"> <input type="number" class="point__input" name="critically_sensitive_to" id="critically_sensitive_to" value="{{ $pm_goal->critically_sensitive_to }}">  </div>
                                    <div class="point__col">-</div>
                                    <div class="point__col"> <input type="number" class="point__input" name="critically_sensitive_from" id="critically_sensitive_from" value="{{ $pm_goal->critically_sensitive_from }}">  </div>
                                    @if ($pm_goal->critically_sensitive_name)
                                        <div class="point__col">
                                            <input type="text" class="point__input" name="critically_sensitive_name" id="critically_sensitive_name" value="{{ $pm_goal->critically_sensitive_name }}">
                                        </div>
                                    @else
                                        <div class="point__col">Critically sensitive.</div>
                                    @endif
                                </div>
                            @endif
                            </div>
                            <div class="point__col __point_field_add_btn_group">
                                <button type="button" id="add-button" class="btn btn-primary" style="padding: 0px 8px;"><i class="fa fa-plus" style="font-size: 12px;"></i></button>
                                <button type="button" id="remove-button" class="btn btn-secondary ml-1" disabled="disabled" style="padding: 0px  8px;"><i class="fa fa-trash" style="font-size: 12px;"></i></button>
                            </div>
                        </div>
                    </section>
                    <x-slot name="action">
                        <!-- Buttons Start -->
                        <div class="w-100 border-top-grey">
                            <x-setting-form-actions>
                                <x-forms.button-primary id="save-form" class="mr-3" icon="check">@lang('app.update')
                                </x-forms.button-primary>
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
            $('#save-form').attr("disabled", true);
            $('#save-form').html("Processing...");

            var data= {
                '_token': "{{ csrf_token() }}",
                'project_budget_range_to': document.getElementById("project_budget_range_to").value,
                'project_budget_range_from': document.getElementById("project_budget_range_from").value,
                'project_budget_range_name': document.getElementById("project_budget_range_name").value,
                'project_priority_to': document.getElementById("project_priority_to").value,
                'project_priority_from': document.getElementById("project_priority_from").value,
                'project_priority_name': document.getElementById("project_priority_name").value,
                'project_high_priority_to': document.getElementById("project_high_priority_to").value,
                'project_high_priority_from': document.getElementById("project_high_priority_from").value,
                'project_high_priority_name': document.getElementById("project_high_priority_name").value,
                'project_top_most_priority_to': document.getElementById("project_top_most_priority_to").value,
                'project_top_most_priority_from': document.getElementById("project_top_most_priority_from").value,
                'project_top_most_priority_name': document.getElementById("project_top_most_priority_name").value,
                'id': {{$pm_goal->id}},
            }
            $('.dynamic-field').each(function(index) {
                var fromInput = $(this).find('input[name="critically_sensitive_from"]');
                var toInput = $(this).find('input[name="critically_sensitive_to"]');
                var toInputName = $(this).find('input[name="critically_sensitive_name"]');

                data['critically_sensitive_from_' + index] = fromInput.val();
                data['critically_sensitive_to_' + index] = toInput.val();
                data['critically_sensitive_name_' + index] = toInputName.val();

            });
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                type: "PUT",
                url: "{{ route('pm-goal-setting.update',$pm_goal->id) }}",
                data: data,
                dataType: "json",
                success: function (response) {
                    $('#save-pm-goal-setting').trigger("reset");
                    toastr.success('PM Goal Update Successfully');
                    window.location.reload();
                    $('#save-form').attr("disabled", false);
                    $('#save-form').html("Save");
                },
                error: function(error) {
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
            var maxFields = 2;

            function totalFields() {
                return $(className).length;
            }

            function addNewField() {
                count = totalFields() + 1;
                field = $("#dynamic-field-1").clone();
                field.attr("id", "dynamic-field-" + count);

                var fromInput = field.find('input[name="project_top_most_priority_from"]');
                var toInput = field.find('input[name="project_top_most_priority_to"]');
                var toInputName = field.find('input[name="project_top_most_priority_name"]');

                var description = field.find('.point__col:contains("Top most priority.")');
                description.text("Critically sensitive.");

                fromInput.attr("name", "critically_sensitive_from");
                fromInput.attr("id", "critically_sensitive_from");
                toInput.attr("name", "critically_sensitive_to");
                toInput.attr("id", "critically_sensitive_to");
                toInputName.attr("name", "critically_sensitive_name");
                toInputName.attr("id", "critically_sensitive_name");

                var originalFromValue = parseInt(fromInput.val());
                fromInput.val("");
                toInput.val(originalFromValue + 1);

                $(className + ":last").after(field);
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
