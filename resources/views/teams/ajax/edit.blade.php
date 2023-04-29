<style>
    .mt{
        margin-top: -4px;
    }
</style>

<div class="row">
    <div class="col-sm-12">
        <x-form id="save-department-data-form" method="put">
            <div class="add-client bg-white rounded">
                <h4 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                    @lang('app.edit') @lang('app.menu.department')</h4>
                <div class="row p-20">
                    <div class="col-md-6">
                        <x-forms.text fieldId="team_name" :fieldLabel="__('app.name')" fieldName="team_name"
                            fieldRequired="true" fieldValue="{{ $department->team_name }}">
                        </x-forms.text>
                    </div>
                    <div class="col-md-6">
                        <x-forms.label class="my-3 mt-2" fieldId="parent_label" :fieldLabel="__('app.parentId')" fieldName="parent_label">
                        </x-forms.label>
                        <x-forms.input-group>
                            <select class="form-control select-picker mt" name="parent_id" id="parent_id"
                                data-live-search="true">
                                <option value="">--</option>
                                @foreach($departments as $item)
                                    @if($department->id != $item->id)
                                        <option value="{{ $item->id }}" @if($department->parent_id == $item->id) selected @endif>{{ $item->team_name }}</option>
                                    @endif
                                @endforeach
                            </select>
                        </x-forms.input-group>
                    </div>
                </div>

                <x-form-actions>
                    <x-forms.button-primary id="save-department-form" class="mr-3" icon="check">@lang('app.save')
                    </x-forms.button-primary>
                    <x-forms.button-cancel :link="route('departments.index')" class="border-0">@lang('app.cancel')
                    </x-forms.button-cancel>
                </x-form-actions>
            </div>
        </x-form>

    </div>
</div>

<script>
    $(document).ready(function() {

        $('#save-department-form').click(function() {

            const url = "{{ route('departments.update', $department->id) }}";

            $.easyAjax({
                url: url,
                container: '#save-department-data-form',
                type: "POST",
                disableButton: true,
                blockUI: true,
                buttonSelector: "#save-department-form",
                data: $('#save-department-data-form').serialize(),
                success: function(response) {
                    window.location.href = response.redirectUrl;
                }
            });
        });

        init(RIGHT_MODAL);
    });
</script>
