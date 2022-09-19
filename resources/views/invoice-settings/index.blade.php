@extends('layouts.app')

@push('styles')
    <link rel="stylesheet" href="{{ asset('vendor/css/image-picker.min.css') }}">
@endpush

@section('content')

    <!-- SETTINGS START -->
    <div class="w-100 d-flex ">

        <x-setting-sidebar :activeMenu="$activeSettingMenu" />

        <x-setting-card>
            <x-slot name="header">
                <div class="s-b-n-header" id="tabs">
                    <h2 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                        @lang($pageTitle)</h2>
                </div>
            </x-slot>

            <div class="col-lg-12 col-md-12 ntfcn-tab-content-left w-100 p-4 ">
                @method('PUT')

                <div class="row">

                    <div class="col-lg-12">
                        <x-forms.file allowedFileExtensions="png jpg jpeg" class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('modules.invoiceSettings.logo')"
                            fieldName="logo" fieldId="logo" :fieldValue="$invoiceSetting->logo_url" :popover="__('messages.fileFormat.ImageFile')" />
                    </div>

                    <div class="col-lg-4">
                        <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('modules.invoiceSettings.invoicePrefix')"
                            :fieldPlaceholder="__('placeholders.invoices.invoicePrefix')" fieldName="invoice_prefix"
                            fieldId="invoice_prefix" :fieldValue="$invoiceSetting->invoice_prefix" fieldRequired="true" />
                    </div>

                    <div class="col-lg-4">
                        <x-forms.number class="mr-0 mr-lg-2 mr-md-2"
                            :fieldLabel="__('modules.invoiceSettings.invoiceDigit')" fieldName="invoice_digit"
                            fieldId="invoice_digit" :fieldValue="$invoiceSetting->invoice_digit" minValue="2" />
                    </div>

                    <div class="col-lg-4">
                        <x-forms.text class="mr-0 mr-lg-2 mr-md-2"
                            :fieldLabel="__('modules.invoiceSettings.invoiceLookLike')" fieldId="invoice_look_like"
                            fieldName="invoice_look_like" fieldReadOnly="true" />
                    </div>

                    <div class="col-lg-4">
                        <x-forms.text class="mr-0 mr-lg-2 mr-md-2"
                            :fieldLabel="__('modules.invoiceSettings.estimatePrefix')"
                            :fieldPlaceholder="__('placeholders.invoices.estimatePrefix')" fieldName="estimate_prefix"
                            fieldRequired="true" fieldId="estimate_prefix" :fieldValue="$invoiceSetting->estimate_prefix" />
                    </div>

                    <div class="col-lg-4">
                        <x-forms.number class="mr-0 mr-lg-2 mr-md-2"
                            :fieldLabel="__('modules.invoiceSettings.estimateDigit')" fieldName="estimate_digit"
                            fieldId="estimate_digit" :fieldValue="$invoiceSetting->estimate_digit" minValue="2" />
                    </div>

                    <div class="col-lg-4">
                        <x-forms.text class="mr-0 mr-lg-2 mr-md-2"
                            :fieldLabel="__('modules.invoiceSettings.estimateLookLike')" fieldName="estimate_look_like"
                            fieldId="estimate_look_like" fieldValue="" fieldReadOnly="true" />
                    </div>

                    <div class="col-lg-4">
                        <x-forms.text class="mr-0 mr-lg-2 mr-md-2"
                            :fieldLabel="__('modules.invoiceSettings.credit_notePrefix')"
                            :fieldPlaceholder="__('placeholders.invoices.creditNotePrefix')" fieldName="credit_note_prefix"
                            fieldRequired="true" fieldId="credit_note_prefix"
                            :fieldValue="$invoiceSetting->credit_note_prefix" />
                    </div>

                    <div class="col-lg-4">
                        <x-forms.number class="mr-0 mr-lg-2 mr-md-2"
                            :fieldLabel="__('modules.invoiceSettings.credit_noteDigit')" fieldName="credit_note_digit"
                            fieldId="credit_note_digit" :fieldValue="$invoiceSetting->credit_note_digit" minValue="2" />
                    </div>

                    <div class="col-lg-4">
                        <x-forms.text class="mr-0 mr-lg-2 mr-md-2"
                            :fieldLabel="__('modules.invoiceSettings.credit_noteLookLike')"
                            fieldName="credit_note_look_like" fieldId="credit_note_look_like" fieldValue=""
                            fieldReadOnly="true" />
                    </div>


                    <div class="col-lg-6">
                        <x-forms.select fieldId="locale" :fieldLabel="__('modules.accountSettings.changeLanguage')"
                            fieldName="locale" search="true">
                            @foreach ($languageSettings as $language)
                                <option {{ global_setting()->locale == $language->language_code ? 'selected' : '' }}
                                    data-content="<span class='flag-icon flag-icon-{{ ($language->flag_code == 'en') ? 'gb' : strtolower($language->flag_code) }} flag-icon-squared'></span> {{ $language->language_name }}"
                                    @if ($invoiceSetting->locale == $language->language_code) selected @endif value="{{ $language->language_code }}">
                                    {{ $language->language_name }}</option>
                            @endforeach
                        </x-forms.select>
                    </div>

                    <div class="col-lg-6">
                        <x-forms.label class="mt-3" fieldId="due_after" fieldRequired="true"
                            :fieldLabel="__('modules.invoiceSettings.dueAfter')">
                        </x-forms.label>
                        <x-forms.input-group>
                            <input type="number" value="{{ $invoiceSetting->due_after }}" name="due_after" id="due_after"
                                class="form-control height-35 f-14" min="0">
                            <x-slot name="append">
                                <span class="input-group-text height-35 bg-white border-grey">@lang('app.days')</span>
                            </x-slot>
                        </x-forms.input-group>
                    </div>

                    <div class="col-lg-6">
                        <x-forms.label class="mt-3" fieldId="send_reminder" fieldRequired="false"
                            :fieldLabel="__('app.sendReminderBefore')">
                        </x-forms.label>
                        <x-forms.input-group>
                            <input type="number" value="{{ $invoiceSetting->send_reminder }}" name="send_reminder"
                                id="send_reminder" class="form-control height-35 f-14" min="0">
                            <x-slot name="append">
                                <span class="input-group-text height-35 bg-white border-grey">@lang('app.days')</span>
                            </x-slot>
                        </x-forms.input-group>
                    </div>

                    <div class="col-lg-6 mt-5">
                        <x-forms.input-group>
                            <x-forms.select class="border-right-0" fieldId="reminder" fieldLabel="" fieldName="reminder">
                                <option {{ ($invoiceSetting->reminder == 'after') ? 'selected' : '' }} value="after">@lang('app.sendReminderAfter')</option>
                                <option {{ ($invoiceSetting->reminder == 'every') ? 'selected' : '' }} value="every">@lang('app.sendReminderEvery')</option>
                            </x-forms.select>

                            <input type="number" value="{{ $invoiceSetting->send_reminder_after }}" name="send_reminder_after"
                                id="send_reminder_after" class="form-control height-35 f-14" min="0">
                            <x-slot name="append">
                                <span class="input-group-text height-35 bg-white border-grey">@lang('app.days')</span>
                            </x-slot>
                        </x-forms.input-group>
                    </div>

                    <div class="col-lg-4 mt-5">
                        <x-forms.checkbox :checked="$invoiceSetting->show_gst=='yes'" :fieldLabel="__('app.showGst')"
                            fieldName="show_gst" fieldId="show_gst" />
                    </div>

                    <div class="col-lg-4 mt-5">
                        <x-forms.checkbox :checked="$invoiceSetting->hsn_sac_code_show==1"
                            :fieldLabel="__('app.hsnSacCodeShow')" fieldName="hsn_sac_code_show"
                            fieldId="hsn_sac_code_show" />
                    </div>

                    <div class="col-lg-4 mt-5">
                        <x-forms.checkbox :checked="$invoiceSetting->tax_calculation_msg==1" :fieldLabel="__('app.showTaxCalculationMessage')"
                            fieldName="show_tax_calculation_msg" fieldId="show_tax_calculation_msg" />
                    </div>

                    <div class="col-lg-12 mt-4">
                        <div class="form-group">
                            <x-forms.label fieldId="template" :fieldLabel="__('modules.invoiceSettings.template')"
                                fieldRequired="true">
                            </x-forms.label>
                            <select name="template" class="image-picker show-labels show-html">
                                <option data-img-src="{{ asset('invoice-template/1.png') }}" @if ($invoiceSetting->template == 'invoice-1') selected @endif
                                    value="invoice-1">@lang('modules.invoiceSettings.template') 1
                                </option>
                                <option data-img-src="{{ asset('invoice-template/2.png') }}" @if ($invoiceSetting->template == 'invoice-2') selected @endif
                                    value="invoice-2">@lang('modules.invoiceSettings.template') 2
                                </option>
                                <option data-img-src="{{ asset('invoice-template/3.png') }}" @if ($invoiceSetting->template == 'invoice-3') selected @endif
                                    value="invoice-3">@lang('modules.invoiceSettings.template') 3
                                </option>
                                <option data-img-src="{{ asset('invoice-template/4.png') }}" @if ($invoiceSetting->template == 'invoice-4') selected @endif
                                    value="invoice-4">@lang('modules.invoiceSettings.template') 4
                                </option>
                                <option data-img-src="{{ asset('invoice-template/5.png') }}" @if ($invoiceSetting->template == 'invoice-5') selected @endif
                                    value="invoice-5">@lang('modules.invoiceSettings.template') 5
                                </option>
                            </select>
                        </div>
                    </div>

                    <div class="col-lg-12">
                        <div class="row">
                            <div class="col-lg-12">
                                <x-forms.label fieldId="template" :fieldLabel="__('modules.invoiceSettings.showFieldsInInvoice')"
                                    fieldRequired="">
                                </x-forms.label>
                            </div>
                            <div class="col-lg-4">
                                <x-forms.checkbox :checked="$invoiceSetting->show_client_name=='yes'"
                                :fieldLabel="__('modules.client.clientName')" fieldName="show_client_name"
                                fieldId="show_client_name" />
                            </div>
                            <div class="col-lg-4">
                                <x-forms.checkbox :checked="$invoiceSetting->show_client_email=='yes'"
                                :fieldLabel="__('modules.client.clientEmail')" fieldName="show_client_email"
                                fieldId="show_client_email" />
                            </div>
                            <div class="col-lg-4">
                                <x-forms.checkbox :checked="$invoiceSetting->show_client_phone=='yes'"
                                :fieldLabel="__('modules.client.clientPhone')" fieldName="show_client_phone"
                                fieldId="show_client_phone" />
                            </div>
                            <div class="col-lg-4">
                                <x-forms.checkbox :checked="$invoiceSetting->show_client_company_name=='yes'"
                                :fieldLabel="__('modules.client.companyName')" fieldName="show_client_company_name"
                                fieldId="show_client_company_name" />
                            </div>
                            <div class="col-lg-4">
                                <x-forms.checkbox :checked="$invoiceSetting->show_client_company_address=='yes'"
                                :fieldLabel="__('app.client').' '.__('modules.client.address')" fieldName="show_client_company_address"
                                fieldId="show_client_company_address" />
                            </div>

                            <div class="col-lg-4">
                                <x-forms.checkbox :checked="$invoiceSetting->show_project== 1"
                                :fieldLabel="__('app.showProjectOnInvoice')" fieldName="show_project"
                                fieldId="show_project" />
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-12 mt-3">
                        <div class="form-group my-3">
                            <x-forms.textarea class="mr-0 mr-lg-2 mr-md-2"
                                :fieldLabel="__('modules.invoiceSettings.invoiceTerms')" fieldName="invoice_terms"
                                fieldId="invoice_terms" :fieldPlaceholder="__('placeholders.invoices.invoiceTerms')"
                                :fieldValue="$invoiceSetting->invoice_terms">
                            </x-forms.textarea>
                        </div>
                    </div>

                </div>

            </div>

            <x-slot name="action">
                <!-- Buttons Start -->
                <div class="w-100 border-top-grey">
                    <x-setting-form-actions>
                        <x-forms.button-primary id="save-form" class="mr-3" icon="check">@lang('app.save')
                        </x-forms.button-primary>

                        <x-forms.button-cancel :link="url()->previous()" class="border-0">@lang('app.cancel')
                        </x-forms.button-cancel>
                    </x-setting-form-actions>
                </div>
                <!-- Buttons End -->
            </x-slot>

        </x-setting-card>

    </div>
    <!-- SETTINGS END -->
@endsection

@push('scripts')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/image-picker/0.3.1/image-picker.min.js"></script>
    <script>
        // Initializing image picker
        $('.image-picker').imagepicker();

        // save invoice setting
        $('#save-form').click(function() {
            $.easyAjax({
                url: "{{ route('invoice-settings.update', $invoiceSetting->id) }}",
                container: '#editSettings',
                type: "POST",
                redirect: true,
                file: true,
                data: $('#editSettings').serialize(),
                disableButton: true,
                blockUI: true,
                buttonSelector: "#save-form",
            })
        });

        $('#invoice_prefix, #invoice_digit, #estimate_prefix, #estimate_digit, #credit_note_prefix, #credit_note_digit').on(
            'keyup',
            function() {
                genrateInvoiceNumber();
            });

        genrateInvoiceNumber();

        function genrateInvoiceNumber() {
            var invoicePrefix = $('#invoice_prefix').val();
            var invoiceDigit = $('#invoice_digit').val();
            var invoiceZero = '';
            for ($i = 0; $i < invoiceDigit - 1; $i++) {
                invoiceZero = invoiceZero + '0';
            }
            invoiceZero = invoiceZero + '1';
            var invoice_no = invoicePrefix + '#' + invoiceZero;
            $('#invoice_look_like').val(invoice_no);

            var estimatePrefix = $('#estimate_prefix').val();
            var estimateDigit = $('#estimate_digit').val();
            var estimateZero = '';
            for ($i = 0; $i < estimateDigit - 1; $i++) {
                estimateZero = estimateZero + '0';
            }
            estimateZero = estimateZero + '1';
            var estimate_no = estimatePrefix + '#' + estimateZero;
            $('#estimate_look_like').val(estimate_no);

            var creditNotePrefix = $('#credit_note_prefix').val();
            var creditNoteDigit = $('#credit_note_digit').val();
            var creditNoteZero = '';
            for ($i = 0; $i < creditNoteDigit - 1; $i++) {
                creditNoteZero = creditNoteZero + '0';
            }
            creditNoteZero = creditNoteZero + '1';
            var creditNote_no = creditNotePrefix + '#' + creditNoteZero;
            $('#credit_note_look_like').val(creditNote_no);
        }

        $('#add-tax').click(function() {
            const url = "{{ route('taxes.create') }}";
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });
    </script>
@endpush
