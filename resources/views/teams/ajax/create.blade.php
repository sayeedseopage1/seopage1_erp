<style>
    .mt{
        margin-top: -4px;
    }
</style>

<div class="row">
    <div class="col-sm-12">
        <x-form id="save-team-data-form">
            <div class="add-client bg-white rounded">
                <h4 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                    @lang('app.add') @lang('Team')</h4>
                <div class="row p-20">
                    <div class="col-md-6">
                        <x-forms.text fieldId="designation_name" :fieldLabel="__('app.name')" fieldName="team_name"
                            fieldRequired="true" :fieldPlaceholder="__('Team')">
                        </x-forms.text>
                    </div>
                    <div class="col-md-6">
                        <x-forms.label class="my-3" fieldId="parent_label" :fieldLabel="__('Department')" fieldName="parent_label">
                        </x-forms.label>
                        <x-forms.input-group>
                            <select class="form-control select-picker mt" name="department_id" id="department_id"
                                data-live-search="true">
                                <option value="">--</option>
                                @foreach($departments as $department)
                                    <option value="{{ $department->id }}">{{ $department->team_name }}</option>
                                @endforeach
                            </select>
                        </x-forms.input-group>
                    </div>
                    
                    <div class="col-md-6 mt-1">
                        <x-forms.label class="my-3" fieldId="parent_label" :fieldLabel="__('Parent Team')" fieldName="parent_label">
                        </x-forms.label>
                        <x-forms.input-group>
                            <select class="form-control select-picker mt" name="parent_id" id="parent_id"
                                data-live-search="true">
                                <option value="">--</option>
                                @foreach($parent_teams as $team)
                                    <option value="{{ $team->id }}">{{ $team->team_name }}</option>
                                @endforeach
                            </select>
                        </x-forms.input-group>
                    </div>
                    <div class="col-md-6" id="add_members">
                        <x-forms.label class="my-3" fieldId="parent_label" fieldRequired="true" :fieldLabel="__('Select Member')" fieldName="parent_label" >
                        </x-forms.label>
                       
                      
                            <select class="selectpicker w-100" multiple aria-label="Default select example" data-live-search="true" multiple name="user_id[]">
                                @foreach ($employees as $item)
                                            <option @if (request()->has('default_assign') && request('default_assign') == $item->id) selected @endif
                                                @if (isset($projectTemplateMembers) && in_array($item->id, $projectTemplateMembers)) selected @endif data-content="<span class='badge badge-pill badge-light border'>
                                            <div class='d-inline-block mr-1'><img class='taskEmployeeImg rounded-circle'
                                                    src='{{ $item->image_url }}'></div>
                                            {{ ucfirst($item->name) }}{{ user() && user()->id == $item->id ? '<span class="ml-2 badge badge-secondary">' . __('app.itsYou') . '</span>' : '' }}
                                        </span>"
                                        value="{{ $item->id }}">{{ mb_ucwords($item->name) }}</option>
                                        @endforeach
                            </select>
                      
                         
                    </div>
                </div>

                <x-form-actions>
                    <x-forms.button-primary id="save-team-form" class="mr-3" icon="check">@lang('app.save')
                    </x-forms.button-primary>
                    <x-forms.button-cancel :link="route('teams.index')" class="border-0">@lang('app.cancel')
                    </x-forms.button-cancel>
                </x-form-actions>
            </div>
        </x-form>

    </div>
</div>

<script>

    $( document ).ready(function() {
        $(".select-picker").selectpicker();
    });

    $('#save-team-form').click(function() {
        var url = "{{ route('teams.store') }}";
        $.easyAjax({
            url: url,
            container: '#save-team-data-form',
            type: "POST",
            data: $('#save-team-data-form').serialize(),
            disableButton: true,
            blockUI: true,
            buttonSelector: "#save-category",
            success: function(response) {
                if (response.status == 'success') {
                    $('#employee_department').html(response.data);
                    $('#employee_department').selectpicker('refresh');
                    $(MODAL_LG).modal('hide');
                    window.location.href = response.redirectUrl
                }
            }
        })
    });
    $('#is_public').change(function() {
            $('#add_members').toggleClass('d-none');
        });
        $("#selectEmployee").selectpicker({
            actionsBox: true,
            selectAllText: "{{ __('modules.permission.selectAll') }}",
            deselectAllText: "{{ __('modules.permission.deselectAll') }}",
            multipleSeparator: " ",
            selectedTextFormat: "count > 8",
            countSelectedText: function(selected, total) {
                return selected + " {{ __('app.membersSelected') }} ";
            }
        });


</script>
<script>
    $(document).ready(function () {
        $('#department_id').change(function () {
            var departmentId = $(this).val();
            $.ajax({
                url: "{{ route('getEmployeesByDepartment') }}",
                type: "POST",
                data: {
                    _token: '{{ csrf_token() }}',
                    department_id: departmentId
                },
                success: function (data) {
                    var select = $('#add_members select');
                    select.empty();
                    $.each(data, function (key, value) {
                        var option = $('<option></option>')
                            .attr('value', value.id)
                            .html('<span class="badge badge-pill badge-light border"><div class="d-inline-block mr-1"><img class="taskEmployeeImg rounded-circle" src="' + value.image_url + '"></div>' + value.name +'</span>');
                        select.append(option);
                    });
                    select.selectpicker('refresh');
                }
            });
        });
    });
</script>
<script>
    $(document).ready(function () {
        $('#parent_id').change(function () {
            var parentId = $(this).val();
            $.ajax({
                url: "{{ route('getEmployeesByParentTeam') }}",
                type: "POST",
                data: {
                    _token: '{{ csrf_token() }}',
                    parent_id: parentId
                },
                success: function (data) {
                    var select = $('#add_members select');
                    select.empty();
                    $.each(data, function (key, value) {
                        var option = $('<option></option>')
                            .attr('value', value.id)
                            .html('<span class="badge badge-pill badge-light border"><div class="d-inline-block mr-1"><img class="taskEmployeeImg rounded-circle" src="' + value.image_url + '"></div>' + value.name +'</span>');
                        select.append(option);
                    });
                    select.selectpicker('refresh');
                }
            });
        });
    });
</script>

