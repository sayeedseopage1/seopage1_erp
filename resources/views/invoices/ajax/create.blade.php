@php
$addProductPermission = user()->permission('add_product');
@endphp

<!-- CREATE INVOICE START -->
<div class="bg-white rounded b-shadow-4 create-inv">
    <!-- HEADING START -->
    <div class="px-lg-4 px-md-4 px-3 py-3">
        <h4 class="mb-0 f-21 font-weight-normal text-capitalize">@lang('app.invoice') @lang('app.details')</h4>
    </div>
    <!-- HEADING END -->
    <hr class="m-0 border-top-grey">
    <!-- FORM START -->
    <x-form class="c-inv-form" id="saveInvoiceForm">
        @if (isset($type) && $type == 'proposal')
            <input type="hidden" name="proposal_id" value="{{ $proposalId }}">
        @endif
        @if (isset($type) && $type == 'estimate')
            <input type="hidden" name="estimate_id" value="{{ $estimateId }}">
        @endif

        <!-- INVOICE NUMBER, DATE, DUE DATE, FREQUENCY START -->
        <div class="row px-lg-4 px-md-4 px-3 py-3">
            <!-- INVOICE NUMBER START -->
            <div class="col-md-3">
                <div class="form-group mb-lg-0 mb-md-0 mb-4">
                    <x-forms.label class="mb-12" fieldId="invoice_number"
                        :fieldLabel="__('modules.invoices.invoiceNumber')" fieldRequired="true">
                    </x-forms.label>
                    <x-forms.input-group>
                        <x-slot name="prepend">
                            <span
                                class="input-group-text">{{ invoice_setting()->invoice_prefix }}#{{ $zero }}</span>
                        </x-slot>
                        <input type="text" name="invoice_number" id="invoice_number" class="form-control height-35 f-15"
                            value="{{ is_null($lastInvoice) ? 1 : $lastInvoice }}">
                    </x-forms.input-group>
                </div>
            </div>

            <!-- INVOICE NUMBER END -->
            <!-- INVOICE DATE START -->
            <div class="col-md-3">
                <div class="form-group mb-lg-0 mb-md-0 mb-4">
                    <x-forms.label fieldId="due_date" :fieldLabel="__('modules.invoices.invoiceDate')">
                    </x-forms.label>
                    <div class="input-group">
                        <input type="text" id="invoice_date" name="issue_date"
                            class="px-6 position-relative text-dark font-weight-normal form-control height-35 rounded p-0 text-left f-15"
                            placeholder="@lang('placeholders.date')"
                            value="{{ now(global_setting()->timezone)->format(global_setting()->date_format) }}">
                    </div>
                </div>
            </div>
            <!-- INVOICE DATE END -->
            <!-- DUE DATE START -->
            <div class="col-md-3">
                <div class="form-group mb-lg-0 mb-md-0 mb-4">
                    <x-forms.label fieldId="due_date" :fieldLabel="__('app.dueDate')"></x-forms.label>
                    <div class="input-group ">
                        <input type="text" id="due_date" name="due_date"
                            class="px-6 position-relative text-dark font-weight-normal form-control height-35 rounded p-0 text-left f-15"
                            placeholder="@lang('placeholders.date')"
                            value="{{ Carbon\Carbon::now(global_setting()->timezone)->addDays($invoiceSetting->due_after)->format(global_setting()->date_format) }}">
                    </div>
                </div>
            </div>
            <!-- DUE DATE END -->
            <!-- FREQUENCY START -->
            @if($project != null)
            <?php

            if (Request::get('milestone_id') != null) {
              $milest= App\Models\ProjectMilestone::where('id',Request::get('milestone_id'))->first();
            }
            //dd($project->id);
              $milestones = App\Models\ProjectMilestone::where('project_id',$project->id)->where('status','complete')->get();

             ?>
             <div class="col-md-3">
                 <div class="form-group c-inv-select mb-lg-0 mb-md-0 mb-4">
                     <x-forms.label fieldId="currency_id" :fieldLabel="__('modules.invoices.currency')">
                     </x-forms.label>

                     <div class="select-others height-35 rounded">
                         <select class="form-control select-picker" name="currency_id" id="currency_id">

                                 <option selected value="{{$project->deal->original_currency_id}}">


                             {{ $project->deal->original_currency->currency_code . ' (' . $project->deal->original_currency->currency_symbol . ')' }}
                             </option>

                         </select>
                     </div>
                 </div>
             </div>
             @else
             <div class="col-md-3">
                 <div class="form-group c-inv-select mb-lg-0 mb-md-0 mb-4">
                     <x-forms.label fieldId="currency_id" :fieldLabel="__('modules.invoices.currency')">
                     </x-forms.label>

                     <div class="select-others height-35 rounded">
                         <select class="form-control select-picker" name="currency_id" id="currency_id">
                             @foreach ($currencies as $currency)
                                 <option @if (isset($estimate))
                                     @if ($currency->id == $estimate->currency_id) selected @endif
                                 @else
                                     @if ($currency->id == global_setting()->currency_id)
                                         selected @endif
                             @endif
                             value="{{ $currency->id }}">
                             {{ $currency->currency_code . ' (' . $currency->currency_symbol . ')' }}
                             </option>
                             @endforeach
                         </select>
                     </div>
                 </div>
             </div>

            @endif

            <!-- FREQUENCY END -->
        </div>
        <!-- INVOICE NUMBER, DATE, DUE DATE, FREQUENCY END -->

        <hr class="m-0 border-top-grey">

        <!-- CLIENT, PROJECT, GST, BILLING, SHIPPING ADDRESS START -->
        <div class="row px-lg-4 px-md-4 px-3 pt-3">
            <!-- CLIENT START -->
            <div class="col-md-4">

                @if (isset($client) && !is_null($client))
                    <div class="form-group mb-lg-0 mb-md-0 mb-4">
                        <x-forms.label fieldId="due_date" :fieldLabel="__('app.client')">
                        </x-forms.label>
                        <div class="input-group">
                            <input type="hidden" name="client_id" id="client_id" value="{{ $client->id }}">
                            <input type="text" value="{{ $client->name }}"
                                class="form-control height-35 f-15 readonly-background" readonly>
                        </div>
                    </div>
                @else
                    <x-client-selection-dropdown :clients="$clients" :selected="$estimate->client_id ?? null" />
                @endif

            </div>
            <!-- CLIENT END -->

            <!-- PROJECT START -->
            <div class="col-md-4">
                @if (isset($project) && !is_null($project))
                    <div class="form-group mb-lg-0 mb-md-0 mb-4">
                        <x-forms.label fieldId="due_date" :fieldLabel="__('app.project')">
                        </x-forms.label>
                        <div class="input-group">
                            <input type="hidden" name="project_id" id="project_id" value="{{ $project->id }}">
                            <input type="text" value="{{ $project->project_name }}"
                                class="form-control height-35 f-15 readonly-background" readonly>
                        </div>
                    </div>
                @else
                    <div class="form-group c-inv-select mb-4">
                        <x-forms.label fieldId="project_id" :fieldLabel="__('app.project')">
                        </x-forms.label>
                        <div class="select-others height-35 rounded">
                            <select class="form-control select-picker" data-live-search="true" data-size="8"
                                name="project_id" id="project_id">
                                <option value="">--</option>
                                @if (isset($estimate) && $estimate->client)
                                    @foreach ($estimate->client->projects as $item)
                                        <option value="{{ $item->id }}">{{ $item->project_name }}</option>
                                    @endforeach
                                @endif
                            </select>
                        </div>
                    </div>

                @endif
            </div>
            @if($project != null)
            <?php

            if (Request::get('milestone_id') != null) {
              $milest= App\Models\ProjectMilestone::where('id',Request::get('milestone_id'))->first();
            }
            //dd($project->id);
              $milestones = App\Models\ProjectMilestone::where('project_id',$project->id)->where('status','complete')->get();

             ?>

            <div class="col-md-4">
                    <div class="form-group c-inv-select mb-4">
                        <x-forms.label fieldId="calculate_tax" :fieldLabel="__('Milestone')">
                        </x-forms.label>
                        <div class="select-others height-35 rounded">
                            <select class="form-control select-picker" readonly data-live-search="true" data-size="8"
                                name="milestone_id" >
                                @if( Request::get('milestone_id') != null)
                                  <option selected value="{{$milest->id}}">{{$milest->milestone_title}}</option>
                                    @else
                                @foreach($milestones as $milestone)
                                <option value="{{$milestone->id}}">
                                    {{$milestone->milestone_title}}</option>

                                    @endforeach
                                    @endif
                            </select>
                        </div>
                    </div>
                </div>
            <!-- PROJECT END -->
            @endif

        {{--  <div class="col-md-4">
                <div class="form-group c-inv-select mb-4">
                    <x-forms.label fieldId="calculate_tax" :fieldLabel="__('modules.invoices.calculateTax')">
                    </x-forms.label>
                    <div class="select-others height-35 rounded">
                        <select class="form-control select-picker" data-live-search="true" data-size="8"
                            name="calculate_tax" id="calculate_tax">
                            <option value="after_discount" @if (isset($estimate) && $estimate->calculate_tax == 'after_discount') selected @endif>
                                @lang('modules.invoices.afterDiscount')</option>
                            <option value="before_discount" @if (isset($estimate) && $estimate->calculate_tax == 'before_discount') selected @endif>
                                @lang('modules.invoices.beforeDiscount')</option>
                        </select>
                    </div>
                </div>
            </div> --}}

        </div>
        <br>
    {{--    <div class="row px-lg-4 px-md-4 px-3 py-3">
            <!-- BILLING ADDRESS START -->
            <div class="col-md-4">
                <div class="form-group c-inv-select mb-0">
                    <label class="f-14 text-dark-grey mb-12 text-capitalize w-100"
                        for="usr">@lang('modules.invoices.billingAddress')</label>
                    <p class="f-15" id="client_billing_address">
                        @if (isset($estimate) && $estimate->client)
                            {!! nl2br($estimate->client->clientDetails->address) !!}
                        @elseif (isset($estimate) && isset($client))
                            {!! nl2br($client->clientDetails->address) !!}
                        @else
                            <span class="text-lightest">@lang('messages.selectCustomerForBillingAddress')</span>
                        @endif
                    </p>
                </div>
            </div>
            <!-- BILLING ADDRESS END -->
            <!-- SHIPPING ADDRESS START -->
            <div class="col-md-4">
                <div class="form-group c-inv-select mb-lg-0 mb-md-0 mb-4">
                    <label class="f-14 text-dark-grey mb-12 text-capitalize w-100"
                        for="usr">@lang('modules.invoices.shippingAddress') </label>
                    <p class="f-15" id="client_shipping_address">
                        @if (isset($estimate) && $estimate->client && $estimate->client->clientDetails->shipping_address)
                            {!! nl2br($estimate->client->clientDetails->shipping_address) !!}
                        @elseif(isset($client) && $client->clientDetails &&
                            $client->clientDetails->shipping_address)
                            {!! nl2br($client->clientDetails->shipping_address) !!}
                        @else
                            <a href="javascript:;" class="text-capitalize" id="show-shipping-field"><i
                                    class="f-12 mr-2 fa fa-plus"></i>@lang('app.addShippingAddress')</a>
                        @endif
                    </p>
                    <p class="d-none" id="add-shipping-field">
                        <textarea class="form-control f-14 pt-2" rows="3" placeholder="@lang('placeholders.address')"
                            name="shipping_address" id="shipping_address">@if (isset($estimate) && $estimate->client) {!! nl2br($estimate->client->clientDetails->shipping_address) !!} @endif</textarea>
                    </p>
                </div>
            </div>
            <!-- SHIPPING ADDRESS END -->

            <div class="col-md-4">
                <div class="form-group c-inv-select mb-4">
                    <x-forms.label fieldId="company_address_id" :fieldLabel="__('modules.invoices.generatedBy')">
                    </x-forms.label>
                    <div class="select-others height-35 rounded">
                        <select class="form-control select-picker" data-live-search="true" data-size="8"
                            name="company_address_id" id="company_address_id">
                            @foreach ($companyAddresses as $item)
                                <option {{ $item->is_default ? 'selected' : '' }} value="{{ $item->id }}">
                                    {{ $item->location }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
            </div>
        </div> --}}
        <!-- CLIENT, PROJECT, GST, BILLING, SHIPPING ADDRESS END -->

        @if (isset($fields) && count($fields) > 0)
            <div class="row px-lg-4 px-md-4 px-3 pt-3">
                @foreach ($fields as $field)
                    <div class="col-md-4">
                        @if ($field->type == 'text')
                            <x-forms.text fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                :fieldLabel="$field->label"
                                fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                :fieldPlaceholder="$field->label"
                                :fieldRequired="($field->required === 'yes') ? true : false">
                            </x-forms.text>
                        @elseif($field->type == 'password')
                            <x-forms.password fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                :fieldLabel="$field->label"
                                fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                :fieldPlaceholder="$field->label"
                                :fieldRequired="($field->required === 'yes') ? true : false">
                            </x-forms.password>
                        @elseif($field->type == 'number')
                            <x-forms.number fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                :fieldLabel="$field->label"
                                fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                :fieldPlaceholder="$field->label"
                                :fieldRequired="($field->required === 'yes') ? true : false">
                            </x-forms.number>
                        @elseif($field->type == 'textarea')
                            <x-forms.textarea :fieldLabel="$field->label"
                                fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                :fieldRequired="($field->required === 'yes') ? true : false"
                                :fieldPlaceholder="$field->label">
                            </x-forms.textarea>
                        @elseif($field->type == 'radio')
                            <div class="form-group my-3">
                                <x-forms.label fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                    :fieldLabel="$field->label"
                                    :fieldRequired="($field->required === 'yes') ? true : false">
                                </x-forms.label>
                                <div class="d-flex">
                                    @foreach ($field->values as $key => $value)
                                        <x-forms.radio fieldId="optionsRadios{{ $key . $field->id }}"
                                            :fieldLabel="$value"
                                            fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                            :fieldValue="$value" :checked="($key == 0) ? true : false" />
                                    @endforeach
                                </div>
                            </div>
                        @elseif($field->type == 'select')
                            <div class="form-group my-3">
                                <x-forms.label fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                    :fieldLabel="$field->label"
                                    :fieldRequired="($field->required === 'yes') ? true : false">
                                </x-forms.label>
                                {!! Form::select('custom_fields_data[' . $field->name . '_' . $field->id . ']', $field->values, isset($editUser) ? $editUser->custom_fields_data['field_' . $field->id] : '', ['class' => 'form-control select-picker']) !!}
                            </div>
                        @elseif($field->type == 'date')
                            <x-forms.datepicker custom="true"
                                fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                :fieldRequired="($field->required === 'yes') ? true : false" :fieldLabel="$field->label"
                                fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                :fieldValue="now()->timezone(global_setting()->timezone)->format(global_setting()->date_format)"
                                :fieldPlaceholder="$field->label" />
                        @elseif($field->type == 'checkbox')
                            <div class="form-group my-3">
                                <x-forms.label fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                    :fieldLabel="$field->label"
                                    :fieldRequired="($field->required === 'yes') ? true : false">
                                </x-forms.label>
                                <div class="d-flex checkbox-{{ $field->id }}">
                                    <input type="hidden"
                                        name="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                        id="{{ $field->name . '_' . $field->id }}">

                                    @foreach ($field->values as $key => $value)
                                        <x-forms.checkbox fieldId="optionsRadios{{ $key . $field->id }}"
                                            :fieldLabel="$value" fieldName="$field->name.'_'.$field->id.'[]'"
                                            :fieldValue="$value"
                                            onchange="checkboxChange('checkbox-{{ $field->id }}', '{{ $field->name . '_' . $field->id }}')"
                                            :fieldRequired="($field->required === 'yes') ? true : false" />
                                    @endforeach
                                </div>
                            </div>
                        @endif

                    </div>
                @endforeach
            </div>
        @endif

        <hr class="m-0 border-top-grey">

      {{-- <div class="d-flex px-4 py-3">
            <div class="form-group">
                <x-forms.input-group>
                    <select class="form-control select-picker" data-live-search="true" data-size="8" id="add-products">
                        <option value="">{{ __('app.select') . ' ' . __('app.product') }}</option>
                        @foreach ($products as $item)
                            <option data-content="{{ $item->name }}" value="{{ $item->id }}">
                                {{ $item->name }}</option>
                        @endforeach
                    </select>
                    @if ($addProductPermission == 'all' || $addProductPermission == 'added')
                        <x-slot name="append">
                            <a href="{{ route('products.create') }}" data-redirect-url="{{ url()->full() }}"
                                class="btn btn-outline-secondary border-grey openRightModal">@lang('app.add')</a>
                        </x-slot>
                    @endif
                </x-forms.input-group>

            </div>
        </div> --}}

        <div id="sortable">
            @if (isset($estimate))
                @foreach ($estimate->items as $key => $item)
                    <!-- DESKTOP DESCRIPTION TABLE START -->
                    <div class="d-flex px-4 py-3 c-inv-desc item-row">

                        <div class="c-inv-desc-table w-100 d-lg-flex d-md-flex d-block">
                            <table width="100%">
                                <tbody>
                                    <tr class="text-dark-grey font-weight-bold f-14">
                                        <td width="{{ $invoiceSetting->hsn_sac_code_show ? '40%' : '50%' }}"
                                            class="border-0 inv-desc-mbl btlr">@lang('app.description')</td>
                                        @if ($invoiceSetting->hsn_sac_code_show)
                                            <td width="10%" class="border-0" align="right">@lang("app.hsnSac")
                                            </td>
                                        @endif
                                        <td width="10%" class="border-0" align="right">
                                            @lang("modules.invoices.qty")
                                        </td>
                                        <td width="10%" class="border-0" align="right">
                                            @lang("modules.invoices.unitPrice")</td>
                                        <td width="13%" class="border-0" align="right">
                                            @lang('modules.invoices.tax')
                                        </td>
                                        <td width="17%" class="border-0 bblr-mbl" align="right">
                                            @lang('modules.invoices.amount')</td>
                                    </tr>
                                    <tr>
                                        <td class="border-bottom-0 btrr-mbl btlr">
                                            <input type="text" class="form-control f-14 border-0 w-100 item_name"
                                                name="item_name[]"  placeholder="@lang('modules.expenses.itemName')"
                                                value="{{ $item->item_name }}">
                                        </td>
                                        <td class="border-bottom-0 d-block d-lg-none d-md-none">
                                            <textarea class="f-14 border-0 w-100 mobile-description form-control"
                                                placeholder="@lang('placeholders.invoices.description')"
                                                name="item_summary[]">{{ $item->item_summary }}</textarea>
                                        </td>
                                        @if ($invoiceSetting->hsn_sac_code_show)
                                            <td class="border-bottom-0">
                                                <input type="text"
                                                    class="form-control f-14 border-0 w-100 text-right hsn_sac_code"
                                                    value="{{ $item->hsn_sac_code }}" name="hsn_sac_code[]">
                                            </td>
                                        @endif
                                        <td class="border-bottom-0">
                                            <input type="number" min="1"
                                                class="form-control f-14 border-0 w-100 text-right quantity"
                                                value="{{ $item->quantity }}" name="quantity[]">
                                        </td>
                                        <td class="border-bottom-0">
                                            <input type="number" class="f-14 border-0 w-100 text-right cost_per_item form-control"
                                                placeholder="0.00" value="{{ $item->unit_price }}"
                                                name="cost_per_item[]" min="1">
                                        </td>
                                        <td class="border-bottom-0">
                                            <div class="select-others height-35 rounded border-0">
                                                <select id="multiselect" name="taxes[{{ $key }}][]"
                                                    multiple="multiple"
                                                    class="select-picker type customSequence border-0" data-size="3">
                                                    @foreach ($taxes as $tax)
                                                        <option data-rate="{{ $tax->rate_percent }}"
                                                            @if (isset($item->taxes) && array_search($tax->id, json_decode($item->taxes)) !== false) selected @endif value="{{ $tax->id }}">
                                                            {{ $tax->tax_name }}:
                                                            {{ $tax->rate_percent }}%</option>
                                                    @endforeach
                                                </select>
                                            </div>
                                        </td>
                                        <td rowspan="2" align="right" valign="top" class="bg-amt-grey btrr-bbrr">
                                            <span
                                                class="amount-html">{{ number_format((float) $item->amount, 2, '.', '') }}</span>
                                            <input type="hidden" class="amount" name="amount[]"
                                                value="{{ $item->amount }}">
                                        </td>
                                    </tr>
                                    <tr class="d-none d-md-block d-lg-table-row">
                                        <td colspan="{{ $invoiceSetting->hsn_sac_code_show ? '4' : '3' }}"
                                            class="dash-border-top bblr">
                                            <textarea class="f-14 border-0 w-100 desktop-description form-control"
                                                name="item_summary[]"
                                                placeholder="@lang('placeholders.invoices.description')">{{ $item->item_summary }}</textarea>
                                        </td>
                                        <td class="border-left-0">
                                            <input type="file" class="dropify" name="invoice_item_image[]" data-allowed-file-extensions="png jpg jpeg" data-messages-default="test" data-height="70" />
                                            <input type="hidden" name="invoice_item_image_url[]">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <a href="javascript:;"
                                class="d-flex align-items-center justify-content-center ml-3 remove-item"><i
                                    class="fa fa-times-circle f-20 text-lightest"></i></a>
                        </div>
                    </div>
                    <!-- DESKTOP DESCRIPTION TABLE END -->
                @endforeach
            @else
                <!-- DESKTOP DESCRIPTION TABLE START -->
                <div class="d-flex px-4 py-3 c-inv-desc item-row">

                    <div class="c-inv-desc-table w-100 d-lg-flex d-md-flex d-block">
                        <table width="100%">
                            <tbody>
                                <tr class="text-dark-grey font-weight-bold f-14">
                                    <td width="{{ $invoiceSetting->hsn_sac_code_show ? '40%' : '50%' }}"
                                        class="border-0 inv-desc-mbl btlr">@lang('app.description')</td>
                                    @if ($invoiceSetting->hsn_sac_code_show)
                                        <td width="10%" class="border-0" align="right">@lang("app.hsnSac")</td>
                                    @endif
                                    <td width="10%" class="border-0" align="right">@lang("modules.invoices.qty")
                                    </td>
                                    <td width="10%" class="border-0" align="right">
                                        @lang("modules.invoices.unitPrice")
                                    </td>
                                    <td width="13%" class="border-0" align="right">@lang('modules.invoices.tax')
                                    </td>
                                    <td width="17%" class="border-0 bblr-mbl" align="right">
                                        @lang('modules.invoices.amount')</td>
                                </tr>
                                <tr>
                                    <td class="border-bottom-0 btrr-mbl btlr">
                                        <input type="text" class="form-control f-14 border-0 w-100 item_name"
                                            name="item_name[]" value="{{$milest->milestone_title}}" placeholder="@lang('modules.expenses.itemName')">
                                    </td>
                                    <td class="border-bottom-0 d-block d-lg-none d-md-none">
                                        <textarea class="form-control f-14 border-0 w-100 mobile-description form-control"
                                            name="item_summary[]"
                                            placeholder="@lang('placeholders.invoices.description')"></textarea>
                                    </td>
                                    @if ($invoiceSetting->hsn_sac_code_show)
                                        <td class="border-bottom-0">
                                            <input type="text"
                                                class="form-control f-14 border-0 w-100 text-right hsn_sac_code"
                                                placeholder="" name="hsn_sac_code[]">
                                        </td>
                                    @endif
                                    <td class="border-bottom-0">
                                        <input type="number" min="1"
                                            class="form-control f-14 border-0 w-100 text-right quantity" value="1"
                                            name="quantity[]">
                                    </td>
                                    <td class="border-bottom-0">
                                        <input type="number" min="1"
                                            class="f-14 border-0 w-100 text-right cost_per_item form-control" placeholder="0.00"
                                            value="{{$milest->actual_cost}}" name="cost_per_item[]">
                                    </td>
                                    <td class="border-bottom-0">
                                        <div class="select-others height-35 rounded border-0">
                                            <select id="multiselect" name="taxes[0][]" multiple="multiple"
                                                class="select-picker type customSequence border-0" data-size="3">
                                                @foreach ($taxes as $tax)
                                                    <option data-rate="{{ $tax->rate_percent }}"
                                                        value="{{ $tax->id }}">{{ $tax->tax_name }}:
                                                        {{ $tax->rate_percent }}%</option>
                                                @endforeach
                                            </select>
                                        </div>
                                    </td>
                                    <td rowspan="2" align="right" valign="top" class="bg-amt-grey btrr-bbrr">
                                        <span class="amount-html">0.00</span>
                                        <input type="hidden" class="amount" name="amount[]" value="{{$milest->actual_cost}}">
                                    </td>
                                </tr>
                                <tr class="d-none d-md-table-row d-lg-table-row">
                                    <td colspan="{{ $invoiceSetting->hsn_sac_code_show ? '4' : '3' }}"
                                        class="dash-border-top bblr border-right-0">
                                        <textarea class="f-14 border p-3 rounded w-100 desktop-description form-control" name="item_summary[]"
                                            placeholder="@lang('placeholders.invoices.description')"></textarea>
                                    </td>
                                    <td class="border-left-0">
                                        <input type="file" class="dropify" name="invoice_item_image[]" data-allowed-file-extensions="png jpg jpeg" data-messages-default="test" data-height="70" />
                                        <input type="hidden" name="invoice_item_image_url[]">
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <a href="javascript:;"
                            class="d-flex align-items-center justify-content-center ml-3 remove-item"><i
                                class="fa fa-times-circle f-20 text-lightest"></i></a>
                    </div>
                </div>
                <!-- DESKTOP DESCRIPTION TABLE END -->
            @endif

        </div>
        <!--  ADD ITEM START-->
        {{-- <div class="row px-lg-4 px-md-4 px-3 pb-3 pt-0 mb-3  mt-2">
            <div class="col-md-12">
                <a class="f-15 f-w-500" href="javascript:;" id="add-item"><i
                        class="icons icon-plus font-weight-bold mr-1"></i>@lang('modules.invoices.addItem')</a>
            </div>
        </div> --}}
        <!--  ADD ITEM END-->

        <hr class="m-0 border-top-grey">

        <!-- TOTAL, DISCOUNT START -->
        <div class="d-flex px-lg-4 px-md-4 px-3 pb-3 c-inv-total">
            <table width="100%" class="text-right f-14 text-capitalize">
                <tbody>
                    <tr>
                        <td width="50%" class="border-0 d-lg-table d-md-table d-none"></td>
                        <td width="50%" class="p-0 border-0 c-inv-total-right">
                            <table width="100%">
                                <tbody>
                                    <tr>
                                        <td colspan="2" class="border-top-0 text-dark-grey">
                                            @lang('modules.invoices.subTotal')</td>
                                        <td width="30%" class="border-top-0 sub-total">0.00</td>
                                        <input type="hidden" class="sub-total-field" name="sub_total" value="0">
                                    </tr>
                                    <tr>
                                        <td width="20%" class="text-dark-grey">@lang('modules.invoices.discount')
                                        </td>
                                        <td width="40%" style="padding: 5px;">
                                            <table width="100%">
                                                <tbody>
                                                    <tr>
                                                        <td width="70%" class="c-inv-sub-padding">
                                                            <input type="number" min="0" name="discount_value"
                                                                class="form-control f-14 border-0 w-100 text-right discount_value"
                                                                placeholder="0"
                                                                value="{{ isset($estimate) ? $estimate->discount : '0' }}">
                                                        </td>
                                                        <td width="30%" align="left" class="c-inv-sub-padding">
                                                            <div
                                                                class="select-others select-tax height-35 rounded border-0">
                                                                <select class="form-control select-picker"
                                                                    id="discount_type" name="discount_type">
                                                                    <option @if (isset($estimate) && $estimate->discount_type == 'percent') selected @endif value="percent">%
                                                                    </option>
                                                                    <option @if (isset($estimate) && $estimate->discount_type == 'fixed') selected @endif value="fixed">
                                                                        @lang('modules.invoices.amount')</option>
                                                                </select>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td><span
                                                id="discount_amount">{{ isset($estimate) ? number_format((float) $estimate->discount, 2, '.', '') : '0.00' }}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>@lang('modules.invoices.tax')</td>
                                        <td colspan="2" class="p-0 border-0">
                                            <table width="100%" id="invoice-taxes">
                                                <tr>
                                                    <td colspan="2"><span class="tax-percent">0.00</span></td>
                                                </tr>
                                            </table>
                                        </td>

                                    </tr>
                                    <tr class="bg-amt-grey f-16 f-w-500">
                                        <td colspan="2">@lang('modules.invoices.total')</td>
                                        <td><span class="total">0.00</span></td>
                                        <input type="hidden" class="total-field" name="total" value="0">
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- TOTAL, DISCOUNT END -->

        <!-- NOTE AND TERMS AND CONDITIONS START -->
        <div class="d-flex flex-wrap px-lg-4 px-md-4 px-3 py-3">
            <div class="col-md-6 col-sm-12 c-inv-note-terms p-0 mb-lg-0 mb-md-0 mb-3">
                <x-forms.label fieldId="" class="text-capitalize" :fieldLabel="__('modules.invoices.note')">
                </x-forms.label>
                <textarea class="form-control" name="note" id="note" rows="4"
                    placeholder="@lang('placeholders.invoices.note')"></textarea>
            </div>
            <div class="col-md-6 col-sm-12 p-0 c-inv-note-terms">
                <x-forms.label fieldId="" :fieldLabel="__('modules.invoiceSettings.invoiceTerms')">
                </x-forms.label>
                <p>
                    {!! nl2br($invoiceSetting->invoice_terms) !!}
                </p>
            </div>
        </div>
        <!-- NOTE AND TERMS AND CONDITIONS END -->

        <!-- CANCEL SAVE SEND START -->
        <x-form-actions class="c-inv-btns d-block d-lg-flex d-md-flex">
            <div class="d-flex mb-3 mb-lg-0 mb-md-0">

                <div class="inv-action dropup mr-3">
                    {{-- <button class="btn-primary dropdown-toggle" type="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        @lang('app.save')
                        <span><i class="fa fa-chevron-up f-15 text-white"></i></span>
                    </button> --}}
                    <a class="btn-primary f-14 save-form" href="javascript:void(0);"
                                data-type="send">
                                <i class="fa fa-paper-plane f-w-500  mr-2 f-12"></i> @lang('app.saveSend')
                            </a>
                    <!-- DROPDOWN - INFORMATION -->
                    {{-- <ul class="dropdown-menu" aria-labelledby="dropdownMenuBtn" tabindex="0">
                        <li>
                            <a class="dropdown-item f-14 text-dark save-form" href="javascript:;" data-type="save">
                                <i class="fa fa-save f-w-500 mr-2 f-11"></i> @lang('app.save')
                            </a>
                        </li>
                        <li>
                            <a class="dropdown-item f-14 text-dark save-form" href="javascript:void(0);"
                                data-type="send">
                                <i class="fa fa-paper-plane f-w-500  mr-2 f-12"></i> @lang('app.saveSend')
                            </a>
                        </li>
                    </ul> --}}
                </div>

                <x-forms.button-secondary data-type="draft" class="save-form mr-3">@lang('app.saveDraft')
                </x-forms.button-secondary>

            </div>
            <x-forms.button-cancel :link="route('projects.show', $project->id).'?tab=milestones'" class="border-0 ">@lang('app.cancel')
            </x-forms.button-cancel>

        </x-form-actions>
        <!-- CANCEL SAVE SEND END -->

    </x-form>
    <!-- FORM END -->
</div>
<!-- CREATE INVOICE END -->
<script>
    $(document).ready(function() {

        const hsn_status = {{ $invoiceSetting->hsn_sac_code_show }};
        const defaultClient = "{{ request('client_id') }}";

        if ($('.custom-date-picker').length > 0) {
            datepicker('.custom-date-picker', {
                position: 'bl',
                ...datepickerConfig
            });
        }

        const dp1 = datepicker('#invoice_date', {
            position: 'bl',
            ...datepickerConfig
        });
        const dp2 = datepicker('#due_date', {
            position: 'bl',
            ...datepickerConfig
        });

        $('#client_list_id').change(function() {
            var id = $(this).val();
            changeClient(id);
        });

        function changeClient(id) {

            if (id == '') {
                id = 0;
            }

            var url = "{{ route('clients.project_list', ':id') }}";
            url = url.replace(':id', id);
            var token = "{{ csrf_token() }}";

            $.easyAjax({
                url: url,
                container: '#saveInvoiceForm',
                type: "POST",
                blockUI: true,
                data: {
                    _token: token
                },
                success: function(response) {
                    if (response.status == 'success') {
                        $('#project_id').html(response.data);
                        $('#project_id').selectpicker('refresh');
                    }
                }
            });

            var url = "{{ route('clients.ajax_details', ':id') }}";
            url = url.replace(':id', id);

            $.easyAjax({
                url: url,
                container: '#saveInvoiceForm',
                type: "POST",
                blockUI: true,
                data: {
                    _token: token
                },
                success: function(response) {
                    if (response.status == 'success') {
                        if (response.data !== null) {
                            $('#client_billing_address').html(nl2br(response.data.client_details
                                .address));
                            $('#add-shipping-field').addClass('d-none');
                            $('#client_shipping_address').removeClass('d-none');

                            if (response.data.client_details.shipping_address === null) {
                                var addShippingLink =
                                    '<a href="javascript:;" class="text-capitalize" id="show-shipping-field"><i class="f-12 mr-2 fa fa-plus"></i>@lang("app.addShippingAddress")</a>';
                                $('#client_shipping_address').html(addShippingLink);
                            } else {
                                $('#client_shipping_address').html(nl2br(response.data
                                    .client_details
                                    .shipping_address));
                            }

                        } else {
                            $('#client_billing_address').html(
                                '<span class="text-lightest">@lang("messages.selectCustomerForBillingAddress")</span>'
                            );
                        }
                    } else {
                        var addShippingLink =
                            '<a href="javascript:;" class="text-capitalize" id="show-shipping-field"><i class="f-12 mr-2 fa fa-plus"></i>@lang("app.addShippingAddress")</a>';
                        $('#client_shipping_address').html(addShippingLink);
                    }
                }
            });

        }

        $('body').on('click', '#show-shipping-field', function() {
            $('#add-shipping-field, #client_shipping_address').toggleClass('d-none');
        });

        const resetAddProductButton = () => {
            $("#add-products").val('').selectpicker("refresh");
        };

        $('#add-products').on('changed.bs.select', function(e, clickedIndex, isSelected, previousValue) {
            e.stopImmediatePropagation()
            var id = $(this).val();
            if (previousValue != id && id != '') {
                addProduct(id);
                resetAddProductButton();
            }
        });

        function addProduct(id) {
            var currencyId = $('#currency_id').val();

            $.easyAjax({
                url: "{{ route('invoices.add_item') }}",
                type: "GET",
                data: {
                    id: id,
                    currencyId: currencyId
                },
                blockUI: true,
                success: function(response) {
                    $(response.view).hide().appendTo("#sortable").fadeIn(500);
                    calculateTotal();

                    var noOfRows = $(document).find('#sortable .item-row').length;
                    var i = $(document).find('.item_name').length - 1;
                    var itemRow = $(document).find('#sortable .item-row:nth-child(' + noOfRows +
                        ') select.type');
                    itemRow.attr('id', 'multiselect' + i);
                    itemRow.attr('name', 'taxes[' + i + '][]');
                    $(document).find('#multiselect' + i).selectpicker();

                    $(document).find('#dropify' + i).dropify({
                        messages: dropifyMessages
                    });
                }
            });
        }

        $(document).on('click', '#add-item', function() {

            var i = $(document).find('.item_name').length;
            var item =
                ` <div class="d-flex px-4 py-3 c-inv-desc item-row">
                <div class="c-inv-desc-table w-100 d-lg-flex d-md-flex d-block">
                <table width="100%">
                <tbody>
                <tr class="text-dark-grey font-weight-bold f-14">
                <td width="{{ $invoiceSetting->hsn_sac_code_show ? '40%' : '50%' }}" class="border-0 inv-desc-mbl btlr">@lang("app.description")</td>`;

            if (hsn_status) {
                item += `<td width="10%" class="border-0" align="right">@lang("app.hsnSac")</td>`;
            }

            item += `
                    <td width="10%" class="border-0" align="right">@lang("modules.invoices.qty")</td>
                    <td width="10%" class="border-0" align="right">@lang("modules.invoices.unitPrice")</td>
                    <td width="13%" class="border-0" align="right">@lang("modules.invoices.tax")</td>
                    <td width="17%" class="border-0 bblr-mbl" align="right">@lang("modules.invoices.amount")</td>
                </tr>
                <tr>
                    <td class="border-bottom-0 btrr-mbl btlr">
                    <input type="text" class="form-control f-14 border-0 w-100 item_name" name="item_name[]" placeholder="@lang("modules.expenses.itemName")">
                    </td>
                    <td class="border-bottom-0 d-block d-lg-none d-md-none">
                    <textarea class="f-14 border-0 w-100 mobile-description form-control" name="item_summary[]" placeholder="@lang("placeholders.invoices.description")"></textarea>
                    </td>
                `;

            if (hsn_status) {
                item += `<td class="border-bottom-0">
                    <input type="text" min="1" class="form-control f-14 border-0 w-100 text-right hsn_sac_code" name="hsn_sac_code[]" >
                    </td>`;
            }
            item += `<td class="border-bottom-0">
                <input type="number" min="1" class="form-control f-14 border-0 w-100 text-right quantity" value="1" name="quantity[]">
                </td>
                <td class="border-bottom-0">
                <input type="number" min="1" class="f-14 border-0 w-100 text-right cost_per_item" placeholder="0.00" value="0" name="cost_per_item[]">
                </td>
                <td class="border-bottom-0">
                <div class="select-others height-35 rounded border-0">
                <select id="multiselect${i}" name="taxes[${i}][]" multiple="multiple" class="select-picker type customSequence" data-size="3">
            @foreach ($taxes as $tax)
                <option data-rate="{{ $tax->rate_percent }}" value="{{ $tax->id }}">
                    {{ $tax->tax_name }}:{{ $tax->rate_percent }}%</option>
            @endforeach

                </select>
                </div>
                </td>
                <td rowspan="2" align="right" valign="top" class="bg-amt-grey btrr-bbrr">
                <span class="amount-html">0.00</span>
                <input type="hidden" class="amount" name="amount[]" value="0">
                </td>
                </tr>
                <tr class="d-none d-md-table-row d-lg-table-row">
                    <td colspan="3" class="dash-border-top bblr">
                        <textarea class="f-14 border-0 w-100 desktop-description form-control" name="item_summary[]" placeholder="@lang("placeholders.invoices.description")"></textarea>
                    </td>
                    <td class="border-left-0">
                        <input type="file" class="dropify" id="dropify${i}" name="invoice_item_image[]" data-allowed-file-extensions="png jpg jpeg" data-messages-default="test" data-height="70" />
                        <input type="hidden" name="invoice_item_image_url[]">
                    </td>
                </tr>
                </tbody>
                </table>
                </div>
                <a href="javascript:;" class="d-flex align-items-center justify-content-center ml-3 remove-item"><i class="fa fa-times-circle f-20 text-lightest"></i></a>
                </div>`;
            $(item).hide().appendTo("#sortable").fadeIn(500);
            $('#multiselect' + i).selectpicker();

            $('#dropify' + i).dropify({
                messages: dropifyMessages
            });

        });

        $('#saveInvoiceForm').on('click', '.remove-item', function() {
            $(this).closest('.item-row').fadeOut(300, function() {
                $(this).remove();
                $('select.customSequence').each(function(index) {
                    $(this).attr('name', 'taxes[' + index + '][]');
                    $(this).attr('id', 'multiselect' + index + '');
                });
                calculateTotal();
            });
        });

        $('.save-form').click(function() {
            var type = $(this).data('type');

            if (KTUtil.isMobileDevice()) {
                $('.desktop-description').remove();
            } else {
                $('.mobile-description').remove();
            }

            calculateTotal();

            var discount = $('#discount_amount').html();
            var total = $('.sub-total-field').val();

            if (parseFloat(discount) > parseFloat(total)) {
                Swal.fire({
                    icon: 'error',
                    text: "{{ __('messages.discountExceed') }}",

                    customClass: {
                        confirmButton: 'btn btn-primary',
                    },
                    showClass: {
                        popup: 'swal2-noanimation',
                        backdrop: 'swal2-noanimation'
                    },
                    buttonsStyling: false
                });
                return false;
            }

            $.easyAjax({
                url: "{{ route('invoices.store') }}" + "?type=" + type,
                container: '#saveInvoiceForm',
                type: "POST",
                blockUI: true,
                redirect: true,
                file: true,
                data: $('#saveInvoiceForm').serialize(),
                success: function(response) {
                    if (response.status == 'success') {
                        window.location.href = response.redirectUrl;
                    }
                }
            })
        });

        $('#saveInvoiceForm').on('click', '.remove-item', function() {
            $(this).closest('.item-row').fadeOut(300, function() {
                $(this).remove();
                $('select.customSequence').each(function(index) {
                    $(this).attr('name', 'taxes[' + index + '][]');
                    $(this).attr('id', 'multiselect' + index + '');
                });
                calculateTotal();
            });
        });

        $('#saveInvoiceForm').on('keyup', '.quantity,.cost_per_item,.item_name, .discount_value', function() {
            var quantity = $(this).closest('.item-row').find('.quantity').val();
            var perItemCost = $(this).closest('.item-row').find('.cost_per_item').val();
            var amount = (quantity * perItemCost);

            $(this).closest('.item-row').find('.amount').val(decimalupto2(amount));
            $(this).closest('.item-row').find('.amount-html').html(decimalupto2(amount));

            calculateTotal();
        });

        $('#saveInvoiceForm').on('change', '.type, #discount_type, #calculate_tax', function() {
            var quantity = $(this).closest('.item-row').find('.quantity').val();
            var perItemCost = $(this).closest('.item-row').find('.cost_per_item').val();
            var amount = (quantity * perItemCost);

            $(this).closest('.item-row').find('.amount').val(decimalupto2(amount));
            $(this).closest('.item-row').find('.amount-html').html(decimalupto2(amount));

            calculateTotal();
        });

        $('#saveInvoiceForm').on('input', '.quantity', function() {
            var quantity = $(this).closest('.item-row').find('.quantity').val();
            var perItemCost = $(this).closest('.item-row').find('.cost_per_item').val();
            var amount = (quantity * perItemCost);

            $(this).closest('.item-row').find('.amount').val(decimalupto2(amount));
            $(this).closest('.item-row').find('.amount-html').html(decimalupto2(amount));

            calculateTotal();
        });

        calculateTotal();

        init(RIGHT_MODAL);

        if (defaultClient != "") {
            changeClient(defaultClient);
        }
    });

    function checkboxChange(parentClass, id) {
        var checkedData = '';
        $('.' + parentClass).find("input[type= 'checkbox']:checked").each(function() {
            checkedData = (checkedData !== '') ? checkedData + ', ' + $(this).val() : $(this).val();
        });
        $('#' + id).val(checkedData);
    }
</script>

