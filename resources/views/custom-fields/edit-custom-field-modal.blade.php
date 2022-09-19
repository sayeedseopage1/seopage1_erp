<div class="modal-header">
    <h5 class="modal-title">@lang('modules.customFields.addField')</h5>
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
</div>
<div class="modal-body">
    <div class="portlet-body">
        <x-form id="editForm" method="PUT" class="form-horizontal">

            <div class="row">

                <div class="col-sm-4 col-md-4">
                    <x-forms.text class="" :fieldLabel="__('modules.customFields.label')" fieldName="label" fieldId="label" :fieldValue="$field->label" fieldRequired="true" />
                </div>

                <div class="col-sm-4 col-md-4">
                        <x-forms.text class="" :fieldLabel="__('app.name')" fieldName="name" fieldId="name" :fieldValue=" $field->name" fieldRequired="true"/>
                </div>

                <div class="col-md-4">
                    <div class="form-group my-3">
                        <label class="col-sm-2 control-label required" for="display_name">@lang('modules.invoices.type')</label>
                        <p class="col-sm-10 mt-2 form-control-static">{{ $field->type }}</p>
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="form-group my-3">
                        <label class="f-14 text-dark-grey mb-12 w-100" for="usr">@lang('app.required')</label>
                        <div class="d-flex">
                            <x-forms.radio fieldId="optionsRadios1" :fieldLabel="__('app.yes')" fieldName="required"
                                fieldValue="yes" :checked="$field->required == 'yes'">
                            </x-forms.radio>
                            <x-forms.radio fieldId="optionsRadios2" :fieldLabel="__('app.no')" fieldValue="no"
                                fieldName="required" :checked="$field->required == 'no'"></x-forms.radio>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="form-group my-5">
                    <x-forms.checkbox fieldId="export"
                        :fieldLabel="__('modules.customFields.export')" fieldName="export" fieldValue="1"
                        :checked="$field->export == 1"/>
                    </div>
                </div>
            </div>
            <div class="form-group mt-repeater" @if($field->type != 'radio' && $field->type != 'select' && $field->type != 'checkbox') style="display: none;" @endif>

                @foreach ($field->values as $item)
                <div id="addMoreBox{{$loop->iteration}}" class="row mt-2">
                    <div class="col-md-10">
                        <div class="form-group">
                            <label class="control-label">@lang('app.value')</label>
                            <input class="form-control height-35 f-14" name="value[]" type="text" value="{{ $item }}" placeholder=""/>
                        </div>
                    </div>
                    @if($loop->iteration !== 1)
                        <div class="col-md-1">
                            <div class="task_view mt-4"> <a href="javascript:;" class="task_view_more d-flex align-items-center justify-content-center dropdown-toggle" onclick="removeBox({{$loop->iteration}})"> <i class="fa fa-trash icons mr-2"></i> @lang('app.delete')</a> </div>
                        </div>
                    @endif
                </div>
                @endforeach

                <div id="insertBefore"></div>
                <div class="row">
                    <div class="col-md-12 mt-4">

                        <a class="f-15 f-w-500" href="javascript:;" data-repeater-create id="plusButton"><i
                            class="icons icon-plus font-weight-bold mr-1"></i>@lang('modules.invoices.addItem')</a>
                    </div>
                </div>
            </div>

        </x-form>
    </div>
</div>
<div class="modal-footer">
    <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.cancel')</x-forms.button-cancel>
    <x-forms.button-primary id="update-custom-field" icon="check">@lang('app.save')</x-forms.button-primary>
</div>

<script>

    $(".select-picker").selectpicker();

    var $insertBefore = $('#insertBefore');
    var $i = {{ sizeof($field->values) }};

    // Add More Inputs
    $('#plusButton').click(function()
    {
        $i = $i+1;
        var indexs = $i+1;
        $('<div id="addMoreBox'+indexs+'" class="row my-3"> <div class="col-md-10">  <label class="control-label">@lang('app.value')</label> <input class="form-control height-35 f-14" name="value[]" type="text" value="" placeholder=""/>  </div> <div class="col-md-1"> <div class="task_view mt-4"> <a href="javascript:;" class="task_view_more d-flex align-items-center justify-content-center dropdown-toggle" onclick="removeBox('+indexs+')"> <i class="fa fa-trash icons mr-2"></i> @lang('app.delete')</a> </div> </div></div>').insertBefore($insertBefore);
    });

    // Remove fields
    function removeBox(index) {
        $('#addMoreBox'+index).remove();
    }

    $('#type').on('change', function () {
        if (this.value === 'select' || this.value === 'radio' || this.value === 'checkbox'){
            $(".mt-repeater").show();
        } else {
            $(".mt-repeater").hide();
        }
    });

    function convertToSlug(Text) {
        return Text.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
    }

    $('#label').keyup(function(){
        $('#name').val(convertToSlug($(this).val()));
    });

    $('#update-custom-field').click(function () {
        $.easyAjax({
            url: "{{route('custom-fields.update', $field->id)}}",
            container: '#editForm',
            type: "POST",
            data: $('#editForm').serialize(),
            file:true,
            blockUI: true,
            buttonSelector: "#update-custom-field",
            success: function (response) {
                if(response.status == 'success'){
                    window.location.reload();
                }
            }
        })
    });

</script>

