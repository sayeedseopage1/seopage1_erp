<div class="row" id="import_table">
    <div class="col-sm-12">
        <x-form id="import-client-data-form">
            <div class="add-client bg-white rounded">
                <h4 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                    @lang('app.importExcel') @lang('app.client')</h4>
                <div class="row py-20">
                    <div class="col-md-12">
                        <x-forms.file :fieldLabel="__('modules.import.file')" fieldName="import_file" fieldId="client_import" />
                    </div>
                    <div class="col-md-12">
                        <x-forms.toggle-switch class="mr-0 mr-lg-12"
                            :fieldLabel="__('modules.import.containsHeadings')"
                            fieldName="heading"
                            fieldId="heading"/>
                    </div>
                </div>
                <x-form-actions>
                    <x-forms.button-primary id="import-client-form" class="mr-3" icon="arrow-right">@lang('app.uploadNext')
                    </x-forms.button-primary>
                    <x-forms.button-cancel :link="route('clients.index')" class="border-0">@lang('app.back')
                    </x-forms.button-cancel>

                </x-form-actions>
            </div>
        </x-form>

    </div>
</div>

<script>

    $(document).ready(function() {

        $("#client_import").dropify({
            messages: dropifyMessages
        });

        $('body').on('click', '#import-client-form', function() {
            const url = "{{ route('clients.import.store') }}";

            $.easyAjax({
                url: url,
                container: '#import-client-data-form',
                type: "POST",
                disableButton: true,
                blockUI: true,
                buttonSelector: "#import-client-form",
                file: true,
                data: $('#import-client-data-form').serialize(),
                success: function(response) {
                    if (response.status == 'success') {
                        $('#import_table').html(response.view);
                    }
                }
            });
        });
    });
</script>
