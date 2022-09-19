
<div class="modal-header">
    <h5 class="modal-title" id="modelHeading">@lang('modules.attendance.clock_in')</h5>
    <button type="button"  class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">×</span></button>
</div>

@if ($cannotLogin == false)
<div class="modal-body">
    <x-form id="startTimerForm">
        <div class="row justify-content-between">
            <div class="col" id="task_div">
                <h4 class="mb-4 d-flex justify-content-between"><span><i class="fa fa-clock"></i> {{ now()->timezone(global_setting()->timezone)->format(global_setting()->date_format . ' ' . global_setting()->time_format) }}</span>  <span class="badge badge-info f-14" style="background-color: {{ $shiftAssigned->color }}">{{ $shiftAssigned->shift_name }}</span></h4>
                <div class="row">
                    <div class="col-md-6">
                        <x-forms.select fieldId="location" :fieldLabel="__('app.location')" fieldName="location"
                        search="true">
                            @foreach ($location as $locations)
                                <option @if ($locations->is_default == 1) selected @endif value="{{ $locations->id }}">
                                    {{ mb_ucwords($locations->location) }}</option>
                            @endforeach
                        </x-forms.select>
                    </div>
                    <div class="col-md-6">
                        <x-forms.select fieldId="work_from_type" :fieldLabel="__('modules.attendance.working_from')" fieldName="work_from_type" fieldRequired="true"
                            search="true" >
                                <option value="office">@lang('modules.attendance.office')</option>
                                <option value="home">@lang('modules.attendance.home')</option>
                                <option value="other">@lang('modules.attendance.other')</option>
                        </x-forms.select>
                    </div>
                    <div class="col-md-12" id="other_place" style="display:none">
                        <x-forms.text fieldId="working_from" :fieldLabel="__('modules.attendance.otherPlace')" fieldName="working_from" fieldRequired="true" >
                        </x-forms.text>
                    </div>
                </div>
            </div>
        </div>
    </x-form>
</div>
<div class="modal-footer">
    <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.cancel')</x-forms.button-cancel>
    <x-forms.button-primary id="save-clock-in">@lang('modules.attendance.clock_in')</x-forms.button-primary>
</div>
@else
<div class="modal-body">
    <x-alert type="danger">@lang('messages.clockInNotAllowed')</x-alert>
</div>
@endif

@if ($attendanceSettings->radius_check == 'yes' || $attendanceSettings->save_current_location)
    <script>
        var currentLatitude = document.getElementById("current-latitude");
        var currentLongitude = document.getElementById("current-longitude");
        var x = document.getElementById("current-latitude");

        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else {
                // x.innerHTML = "Geolocation is not supported by this browser.";
            }
        }

        function showPosition(position) {
            currentLatitude.value = position.coords.latitude;
            currentLongitude.value = position.coords.longitude;
        }
        getLocation();

    </script>
@endif

<script>
    $('.select-picker').selectpicker();

    $(function() {
        $('#work_from_type').change(function(){

            ($(this).val() == 'other') ? $('#other_place').show() : $('#other_place').hide();

        });
    });

    $('#save-clock-in').click(function() {
        var workingFrom = $('#working_from').val();
        var location = $('#location').val();
        var work_from_type = $('#work_from_type').val();

        var currentLatitude = document.getElementById("current-latitude").value;
        var currentLongitude = document.getElementById("current-longitude").value;

        var token = "{{ csrf_token() }}";

        $.easyAjax({
            url: "{{ route('attendances.store_clock_in') }}",
            type: "POST",
            buttonSelector: "#save-clock-in",
            disableButton: true,
            blockUI: true,
            container: '#startTimerForm',
            data: {
                working_from: workingFrom,
                location: location,
                work_from_type: work_from_type,
                currentLatitude: currentLatitude,
                currentLongitude: currentLongitude,
                _token: token
            },
            success: function(response) {
                if (response.status == 'success') {
                    window.location.reload();
                }
            }
        })
    })

</script>
