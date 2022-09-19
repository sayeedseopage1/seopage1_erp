@php
$manageContractTypePermission = user()->permission('manage_contract_type');
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
                            <x-forms.label class="mt-3" fieldId="currency_id" :fieldLabel="__('modules.invoices.currency')">
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
                <x-form-actions>
                    <x-forms.button-primary id="save-contract-form" class="mr-3" icon="check">
                        @lang('app.save')
                    </x-forms.button-primary>
                    <x-forms.button-cancel :link="route('contract-template.index')" class="border-0">@lang('app.cancel')
                    </x-forms.button-cancel>
                </x-form-actions>
            </div>
        </x-form>
    </div>
</div>


<script>
    $(document).ready(function() {
        $('#save-contract-form').click(function() {
            var note = document.getElementById('description').children[0].innerHTML;
            document.getElementById('description-text').value = note;

            const url = "{{ route('contract-template.update', $contract->id) }}";

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
