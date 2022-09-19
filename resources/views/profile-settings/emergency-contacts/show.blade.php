<div class="modal-header">
    <h5 class="modal-title">@lang('modules.emergencyContact.viewEmergencyContact')</h5>
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
</div>
<div class="modal-body">
    <div class="portlet-body">
        <x-form id="save-emergency-contact-form">
            <div class="add-client bg-white rounded">
                <div class="row">
                    <div class="col-xl-12 col-lg-12 col-sm-12">
                        <x-cards.data-row :label="__('app.name')" :value="$contact->name" />
                        <x-cards.data-row :label="__('app.email')" :value="$contact->email ? $contact->email : '--'" />
                        <x-cards.data-row :label="__('app.mobile')" :value="$contact->mobile" />
                        <x-cards.data-row :label="__('app.relationship')" :value="$contact->relation" />
                        <x-cards.data-row :label="__('app.address')" :value="$contact->address ? $contact->address : '--'" />
                    </div>
                </div>
            </div>
        </x-form>

    </div>
</div>
<div class="modal-footer">
    <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.cancel')</x-forms.button-cancel>
</div>
