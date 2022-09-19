<div class="row mt-4">
    <div class="col-sm-12">
        <x-form id="updateconsent">
            <div class="add-client bg-white rounded">
                <h4 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">@lang('app.menu.consent')</h4>

                <div class="p-20">
                    <div class="row">
                        @forelse($consents as $consent)
                        <div class="col-lg-12">
                            <div class="form-group my-3">
                                <h4>{{ $consent->name }}</h4>
                                <label class="f-14 text-dark-grey mb-12 w-100" for="usr">{{ $consent->description }}</label>

                                @if($consent->user)
                                    <div class="d-flex">
                                        @if($consent->user->status == 'agree')
                                            <x-forms.radio fieldId="no{{$consent->id}}" :fieldLabel="__('modules.gdpr.disagree')" fieldValue="disagree"
                                                fieldName="consent_customer[{{$consent->id}}]" checked="">
                                            </x-forms.radio>
                                        @else
                                            <x-forms.radio fieldId="yes{{$consent->id}}" :fieldLabel="__('modules.gdpr.agree')" fieldName="consent_customer[{{$consent->id}}]"
                                                fieldValue="agree" checked="">
                                            </x-forms.radio>
                                        @endif
                                    </div>
                                @else
                                    <div class="d-flex">
                                        <x-forms.radio fieldId="yes{{$consent->id}}" :fieldLabel="__('modules.gdpr.agree')" fieldName="consent_customer[{{$consent->id}}]"
                                            fieldValue="agree" checked="">
                                        </x-forms.radio>
                                        <x-forms.radio fieldId="no{{$consent->id}}" :fieldLabel="__('modules.gdpr.disagree')" fieldValue="disagree"
                                            fieldName="consent_customer[{{$consent->id}}]" checked="">
                                        </x-forms.radio>
                                    </div>
                                @endif

                            </div>
                        </div>
                        @empty
                            <p class="text-center">
                                <x-cards.no-record icon="list" :message="__('messages.noConsentFound')" />
                            </p>
                        @endforelse
                    </div>
                </div>

                <x-form-actions>
                    <x-forms.button-primary id="save-consent-data" icon="check">@lang('app.save')</x-forms.button-primary>
                </x-form-actions>

            </div>
        </x-form>
    </div>
</div>

<script>
        $(body).on('click', '#save-consent-data', function() {
        $.easyAjax({
            url: "{{ route('gdpr.update_client_consent') }}",
            container: '#updateconsent',
            type: "POST",
            disableButton: true,
            buttonSelector: "#save-consent-data",
            data: $('#updateconsent').serialize(),
            success: function(response) {
                if (response.status == "success") {
                    window.location.reload();
                }
            }
        })
    })
</script>
