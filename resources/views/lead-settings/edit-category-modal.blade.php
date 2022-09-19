<div class="modal-header">
    <h5 class="modal-title" id="modelHeading">@lang('app.edit') @lang('modules.lead.leadCategory')</h5>
    <button type="button"  class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">×</span></button>
</div>
<div class="modal-body">
    <div class="portlet-body">
        <x-form id="add-lead-category" method="PUT" class="ajax-form">
            <div class="form-body">
                <div class="row">
                    <div class="col-lg-12">
                        <x-forms.text fieldId="category_name" :fieldLabel="__('modules.projectCategory.categoryName')"
                            fieldName="category_name" fieldRequired="true" :fieldValue="$category->category_name">
                        </x-forms.text>
                    </div>
                </div>
            </div>
        </x-form>
    </div>
</div>
<div class="modal-footer">
    <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.close')</x-forms.button-cancel>
    <x-forms.button-primary id="save-category" icon="check">@lang('app.save')</x-forms.button-primary>
</div>

<script>
    // save source
    $('#save-category').click(function() {
        $.easyAjax({
            url: "{{route('leadCategory.update', $category->id)}}",
            container: '#add-lead-category',
            type: "POST",
            blockUI: true,
            disableButton: true,
            buttonSelector: "#save-category",
            data: $('#add-lead-category').serialize(),
            success: function(response) {
                if (response.status == "success") {
                    if($('table').length) {
                        window.location.reload();
                    }
                    else {
                        var options = [];
                        var rData = [];
                        rData = response.data;
                        $.each(rData, function( index, value ) {
                            var selectData = '';
                            selectData = '<option value="'+value.id+'">'+value.type+'</option>';
                            options.push(selectData);
                        });
                        $('#category_id').html(options);
                        $('#category_id').selectpicker('refresh');
                        $(MODAL_LG).modal('hide');
                    }
                }
            }
        })
    });
</script>
