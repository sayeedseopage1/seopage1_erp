<div class="row">
    <div class="col-sm-12">
        <x-form id="save-client-data-form" method="PUT">
            <div class="add-client bg-white rounded">
                <h4 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                    @lang('app.contact') @lang('app.details')</h4>

                <input type="hidden" name="user_id" value="{{ $clientId }}">

                <div class="row p-20">
                    <div class="col-md-4">
                        <x-forms.text fieldId="title" :fieldLabel="__('app.title')" fieldName="title"
                            :fieldPlaceholder="__('placeholders.title')" :fieldValue="$contact->title">
                            </x-forms.text>
                    </div>
                    <div class="col-md-4">
                        <x-forms.text fieldId="contact_name" :fieldLabel="__('modules.contacts.contactName')"
                            fieldName="contact_name" fieldRequired="true" :fieldPlaceholder="__('placeholders.name')"
                            :fieldValue="$contact->contact_name">
                        </x-forms.text>
                    </div>
                    <div class="col-md-4">
                        <x-forms.email fieldId="email" :fieldLabel="__('app.email')" fieldName="email"
                            fieldRequired="true" :fieldPlaceholder="__('placeholders.email')"
                            :fieldValue="$contact->email"></x-forms.email>
                    </div>
                    <div class="col-md-4">
                        <x-forms.text fieldId="phone" :fieldLabel="__('app.phone')" fieldName="phone"
                            :fieldPlaceholder="__('placeholders.mobile')" :fieldValue="$contact->phone">
                            </x-forms.text>
                    </div>
                </div>

                <x-form-actions>
                    <x-forms.button-primary id="save-client-form" class="mr-3" icon="check">@lang('app.save')
                    </x-forms.button-primary>
                    <x-forms.button-cancel :link="route('clients.index')" class="border-0">@lang('app.cancel')
                    </x-forms.button-cancel>
                </x-form-actions>
            </div>
        </x-form>

    </div>
</div>


<script>
    $(document).ready(function() {

        $('#save-client-form').click(function() {
            const url = "{{ route('client-contacts.update', $contact->id) }}";

            $.easyAjax({
                url: url,
                container: '#save-client-data-form',
                type: "POST",
                disableButton: true,
                blockUI: true,
                buttonSelector: "#save-client-form",
                data: $('#save-client-data-form').serialize(),
                success: function(response) {

                    if (response.status == 'success') {
                        window.location.href = response.redirectUrl;
                    }
                }
            })
        });

        init(RIGHT_MODAL);
    });
</script>
