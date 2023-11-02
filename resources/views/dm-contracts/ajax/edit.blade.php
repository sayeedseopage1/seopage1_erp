@php
$manageContractTypePermission = user()->permission('manage_contract_type');
$addClientPermission = user()->permission('add_clients');
@endphp

<div class="row">
    <div class="col-sm-12">
        <x-form id="save-contract-data-form">
            @method('PUT')
            <div class="add-client bg-white rounded">
                <h4 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                    @lang('app.menu.contract') @lang('app.details')</h4>

                <div class="row p-20">
                    <div class="col-md-12">
                        <x-forms.text fieldId="subject" :fieldLabel="__('app.subject')" fieldName="subject"
                            :fieldValue="$contract->subject" fieldRequired="true"></x-forms.text>
                    </div>

                    <div class="col-md-12">
                        <div class="form-group my-3">
                            <x-forms.label fieldId="description" :fieldLabel="__('app.description')">
                            </x-forms.label>
                            <div id="description">{!! $contract->contract_detail !!}</div>
                            <textarea name="contract_detail" id="description-text" class="d-none"></textarea>
                        </div>
                    </div>

                    <div class="col-md-6 col-lg-3">
                        <x-forms.datepicker fieldId="start_date" fieldRequired="true"
                            :fieldLabel="__('modules.projects.startDate')" fieldName="start_date"
                            :fieldValue="$contract->start_date->timezone(global_setting()->timezone)->format(global_setting()->date_format)"
                            :fieldPlaceholder="__('placeholders.date')" />
                    </div>

                    <div class="col-md-6 col-lg-3">
                        <x-forms.datepicker fieldId="end_date"
                            :fieldValue="$contract->end_date==null ? $contract->end_date : $contract->end_date->timezone(global_setting()->timezone)->format(global_setting()->date_format)"
                            :fieldLabel="__('modules.timeLogs.endDate')" fieldName="end_date"
                            :fieldPlaceholder="__('placeholders.date')" />
                    </div>

                    <div class="col-md-6 col-lg-3">
                        <x-forms.label class="mt-3" fieldId="contractType"
                            :fieldLabel="__('modules.contracts.contractType')" fieldRequired="true"></x-forms.label>
                        <x-forms.input-group>
                            <select class="form-control select-picker" name="contract_type" id="contractType"
                                data-live-search="true">
                                <option value="">--</option>
                                @foreach ($contractTypes as $item)
                                    <option @if ($item->id == $contract->contract_type_id) selected @endif value="{{ $item->id }}">
                                        {{ $item->name }}</option>
                                @endforeach
                            </select>

                            @if ($manageContractTypePermission == 'all')
                                <x-slot name="append">
                                    <button id="createContractType" type="button"
                                        class="btn btn-outline-secondary border-grey">@lang('app.add')</button>
                                </x-slot>
                            @endif
                        </x-forms.input-group>
                    </div>

                    <div class="col-md-6 col-lg-3">
                        <x-forms.label class="mt-3" fieldId="amount"
                            :fieldLabel="__('modules.contracts.contractValue')"
                            :popover="__('modules.contracts.setZero')" fieldRequired="true"></x-forms.label>
                        <x-forms.input-group>
                            <x-slot name="append">
                                <span
                                    class="input-group-text height-35 border bg-white">{{ $contract->currency->currency_code }}</span>
                            </x-slot>

                            <input type="number" min="0" name="amount" value="{{ $contract->amount ?? '' }}"
                                class="form-control height-35 f-14" />
                        </x-forms.input-group>
                    </div>

                    <!-- CURRENCY START -->
                    <div class="col-md-6 col-lg-3">
                        <div class="form-group c-inv-select mb-lg-0 mb-md-0 mb-4">
                            <x-forms.label fieldId="currency_id" :fieldLabel="__('modules.invoices.currency')">
                            </x-forms.label>

                            <div class="select-others height-35 rounded">
                                <select class="form-control select-picker" name="currency_id" id="currency_id">
                                    @foreach ($currencies as $currency)
                                    <option
                                        @if ($currency->id == $contract->currency_id) selected @endif
                                        value="{{ $currency->id }}">
                                        {{ $currency->currency_code . ' (' . $currency->currency_symbol . ')' }}
                                    </option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                    </div>
                    <!-- CURRENCY END -->

                </div>

                <h4 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-top-grey">
                    @lang('modules.client.clientDetails')</h4>
                <div class="row p-20">
                    <div class="col-md-6 col-lg-4">
                        <x-forms.label class="mt-3" fieldId="client_id" :fieldLabel="__('app.client')"
                            fieldRequired="true">
                        </x-forms.label>
                        <x-forms.input-group>
                            <select class="form-control select-picker" name="client" id="client_id"
                                data-live-search="true" data-size="8">
                                <option value="">--</option>
                                @foreach ($clients as $client)
                                    <option @if ($client->id == $contract->client_id) selected @endif
                                        data-content="<div class='d-inline-block mr-1'><img class='taskEmployeeImg rounded-circle' src='{{ $client->image_url }}' ></div> {{ ucfirst($client->name) }}"
                                        value="{{ $client->id }}">{{ mb_ucwords($client->name) }}</option>
                                @endforeach
                            </select>

                            @if ($addClientPermission == 'all' || $addClientPermission == 'added')
                                <x-slot name="append">
                                    <button id="add-client" type="button"
                                        class="btn btn-outline-secondary border-grey">@lang('app.add')</button>
                                </x-slot>
                            @endif
                        </x-forms.input-group>
                    </div>

                    <div class="col-md-6 col-lg-4">
                        <x-forms.text fieldId="cell" :fieldLabel="__('modules.client.cell')"
                            :fieldValue="$contract->cell" fieldName="cell">
                        </x-forms.text>
                    </div>

                    <div class="col-md-6 col-lg-4">
                        <x-forms.text fieldId="office" :fieldValue="$contract->office"
                            :fieldLabel="__('modules.client.officePhoneNumber')" fieldName="office">
                        </x-forms.text>
                    </div>

                    <div class="col-md-6 col-lg-3">
                        <x-forms.text fieldId="city" :fieldValue="$contract->city"
                            :fieldLabel="__('modules.stripeCustomerAddress.city')" fieldName="city">
                        </x-forms.text>
                    </div>


                    <div class="col-md-6 col-lg-3">
                        <x-forms.text fieldId="state" :fieldValue="$contract->state"
                            :fieldLabel="__('modules.stripeCustomerAddress.state')" fieldName="state">
                        </x-forms.text>
                    </div>

                    <div class="col-md-6 col-lg-3">
                        <x-forms.text fieldId="country" :fieldValue="$contract->country"
                            :fieldLabel="__('modules.stripeCustomerAddress.country')" fieldName="country">
                        </x-forms.text>
                    </div>

                    <div class="col-md-6 col-lg-3">
                        <x-forms.text fieldId="postal_code" :fieldValue="$contract->postal_code"
                            :fieldLabel="__('modules.stripeCustomerAddress.postalCode')" fieldName="postal_code">
                        </x-forms.text>
                    </div>

                    <div class="col-md-6">
                        <x-forms.textarea class="mr-0 mr-lg-2 mr-md-2"
                            :fieldLabel="__('modules.contracts.alternateAddress')" fieldName="alternate_address"
                            fieldId="alternate_address" :fieldPlaceholder="__('placeholders.address')">
                            {{ $contract->alternate_address }}
                        </x-forms.textarea>
                    </div>
                    <div class="col-md-6">
                        <x-forms.textarea class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('modules.contracts.notes')"
                            fieldName="note" fieldId="note">
                            {{ $contract->description ?? '' }}
                        </x-forms.textarea>
                    </div>

                    <div class="col-lg-12">
                        <x-forms.file allowedFileExtensions="png jpg jpeg"
                            class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('modules.contracts.companyLogo')"
                            :fieldValue="($contract->company_logo ? $contract->image_url : null)"
                            fieldName="company_logo" fieldId="company_logo" :popover="__('messages.fileFormat.ImageFile')" />
                    </div>

                </div>

                <x-form-actions>
                    <x-forms.button-primary id="save-contract-form" class="mr-3" icon="check">
                        @lang('app.save')
                    </x-forms.button-primary>
                    <x-forms.button-cancel :link="route('deals.index')" class="border-0">@lang('app.cancel')
                    </x-forms.button-cancel>
                </x-form-actions>
            </div>
        </x-form>

    </div>
</div>


<script>
    $(document).ready(function() {

        const dp1 = datepicker('#start_date', {
            position: 'bl',
            dateSelected: new Date("{{ str_replace('-', '/', $contract->start_date) }}"),
            onSelect: (instance, date) => {
                if (typeof dp2.dateSelected !== 'undefined' && dp2.dateSelected.getTime() < date
                    .getTime()) {
                    dp2.setDate(date, true)
                }
                if (typeof dp2.dateSelected === 'undefined') {
                    dp2.setDate(date, true)
                }
                dp2.setMin(date);
            },
            ...datepickerConfig
        });

        const dp2 = datepicker('#end_date', {
            position: 'bl',
            dateSelected: new Date("{{ $contract->end_date ? str_replace('-', '/', $contract->end_date) : str_replace('-', '/', now()) }}"),
            onSelect: (instance, date) => {
                dp1.setMax(date);
            },
            ...datepickerConfig
        });

        $('#add-client').click(function() {
            $(MODAL_XL).modal('show');

            const url = "{{ route('clients.create') }}";

            $.easyAjax({
                url: url,
                blockUI: true,
                container: MODAL_XL,
                success: function(response) {
                    if (response.status == "success") {
                        $(MODAL_XL + ' .modal-body').html(response.html);
                        $(MODAL_XL + ' .modal-title').html(response.title);
                        init(MODAL_XL);
                    }
                }
            });
        });

        $('#save-contract-form').click(function() {
            var note = document.getElementById('description').children[0].innerHTML;
            document.getElementById('description-text').value = note;

            const url = "{{ route('contracts.update', $contract->id) }}";

            $.easyAjax({
                url: url,
                container: '#save-contract-data-form',
                type: "POST",
                disableButton: true,
                blockUI: true,
                buttonSelector: "#save-contract-form",
                file: true,
                data: $('#save-contract-data-form').serialize(),
                redirect: true
            })
        });

        quillImageLoad('#description');

        $('#createContractType').click(function() {
            const url = "{{ route('contractTypes.create') }}";
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });

        init(RIGHT_MODAL);
    });

</script>
