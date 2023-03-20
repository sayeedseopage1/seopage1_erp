<div class="modal-header">
    <h5 class="modal-title" id="modelHeading">@lang('modules.projects.addMemberTitle')</h5>
    <button type="button"  class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">×</span></button>
</div>
<div class="modal-body">
    <x-form id="addProjectMemberForm">
        <input type="hidden" name="project_id" value="{{ $projectId }}">
        <div class="row">
            <div class="col-md-12">
                <div class="form-group mb-3">
                    <div class="d-flex">
                        <x-forms.radio fieldId="member-employee" :fieldLabel="__('modules.projects.chooseMembers')"
                            fieldName="choose_type" fieldValue="employee" checked="true">
                        </x-forms.radio>
                        <x-forms.radio fieldId="member-department" :fieldLabel="__('modules.projects.chooseDepartment')"
                            fieldValue="department" fieldName="choose_type"></x-forms.radio>
                    </div>
                </div>
            </div>

            <div class="col-md-12" id="select-employee-section">
                <div class="form-group my-3">
                    <x-forms.label fieldId="selectEmployee" :fieldLabel="__('modules.projects.addMemberTitle')"
                        fieldRequired="true">
                    </x-forms.label>
                    <x-forms.input-group>
                        <select class="form-control multiple-users" multiple name="user_id[]" data-live-search="true"
                            data-size="8">
                            @foreach ($employees as $item)
                                <option
                                    data-content="<span class='badge badge-pill badge-light border'><div class='d-inline-block mr-1'><img class='taskEmployeeImg rounded-circle' src='{{ $item->image_url }}' ></div> {{ ucfirst($item->name) }} {{ (user() && user()->id == $item->id) ? '<span class="ml-2 badge badge-secondary">' . __('app.itsYou') . '</span>' : '' }}"
                                    value="{{ $item->id }}">{{ mb_ucwords($item->name) }}</option>
                            @endforeach
                        </select>
                    </x-forms.input-group>
                </div>
            </div>
            <div class="col-md-12 d-none" id="select-department-section">
                <div class="form-group my-3">
                    <x-forms.label fieldId="selectDepartment" :fieldLabel="__('app.add') .' '. __('app.team')"
                        fieldRequired="true">
                    </x-forms.label>
                    <x-forms.input-group>
                        <select class="form-control multiple-users" multiple name="group_id[]" data-live-search="true"
                            data-size="8">
                            @foreach ($groups as $group)
                                <option
                                    data-content="<span class='badge badge-pill badge-light border p-2'>{{ ucfirst($group->team_name) }}</span>"
                                    value="{{ $group->id }}">{{ mb_ucwords($group->team_name) }} </option>
                            @endforeach
                        </select>
                    </x-forms.input-group>
                </div>
            </div>
        </div>
    </x-form>
</div>
<div class="modal-footer">
    <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.close')</x-forms.button-cancel>
    <x-forms.button-primary id="save-project-member" icon="check">@lang('app.save')</x-forms.button-primary>
    <x-forms.button-primary id="save-project-department" class="d-none" icon="check">@lang('app.save')
    </x-forms.button-primary>
</div>

<script>
    $('input[type=radio][name=choose_type]').change(function() {
        $('#select-employee-section').toggleClass('d-none');
        $('#select-department-section').toggleClass('d-none');

        $('#save-project-member').toggleClass('d-none');
        $('#save-project-department').toggleClass('d-none');
    });

    $('#save-project-member').click(function() {
        var url = "{{ route('project-members.store') }}";
        $.easyAjax({
            url: url,
            container: '#addProjectMemberForm',
            type: "POST",
            blockUI: true,
            disableButton: true,
            buttonSelector: "#save-project-member",
            data: $('#addProjectMemberForm').serialize(),
            success: function(response) {
                if (response.status == 'success') {
                    window.location.reload();
                }
            }
        })
    });

    $('#save-project-department').click(function() {
        var url = "{{ route('project-members.store_group') }}";
        $.easyAjax({
            url: url,
            container: '#addProjectMemberForm',
            blockUI: true,
            type: "POST",
            data: $('#addProjectMemberForm').serialize(),
            success: function(response) {
                if (response.status == 'success') {
                    window.location.reload();
                }
            }
        })
    });

    $("#addProjectMemberForm .multiple-users").selectpicker({
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
