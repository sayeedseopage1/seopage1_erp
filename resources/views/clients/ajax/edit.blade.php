@php
$addClientCategoryPermission = user()->permission('manage_client_category');
$addClientSubCategoryPermission = user()->permission('manage_client_subcategory');
@endphp

<div class="row">
    <div class="col-sm-12">
        <x-form id="save-data-form" method="PUT">
            <div class="add-client bg-white rounded">
                <h4 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                    @lang('modules.employees.accountDetails')</h4>
                @include('sections.password-autocomplete-hide')

                <div class="row p-20">
                    <div class="col-lg-9">
                        <div class="row">
                            <div class="col-md-4">
                                <x-forms.select fieldId="salutation" fieldName="salutation"
                                    :fieldLabel="__('modules.client.salutation')">
                                    <option value="">--</option>
                                    @foreach ($salutations as $salutation)
                                        <option value="{{ $salutation }}" @if ($client->salutation == $salutation) selected @endif>@lang('app.'.$salutation)
                                        </option>
                                    @endforeach
                                </x-forms.select>
                            </div>
                            <div class="col-lg-4 col-md-6">
                                <x-forms.text fieldId="name" :fieldLabel="__('modules.client.clientName')" fieldName="name"
                                    fieldRequired="true" :fieldPlaceholder="__('placeholders.name')"
                                    :fieldValue="$client->name">
                                </x-forms.text>
                            </div>
                            <div class="col-lg-4 col-md-6">
                                <x-forms.email fieldId="email" :fieldLabel="__('app.email')" fieldName="email"
                                    :popover="__('modules.client.emailNote')" :fieldPlaceholder="__('placeholders.email')"
                                    :fieldValue="$client->email">
                                </x-forms.email>
                            </div>
                            <div class="col-lg-4 col-md-6">
                                <x-forms.label class="mt-3" fieldId="password" :fieldLabel="__('app.password')"
                                    :popover="__('messages.requiredForLogin')">
                                </x-forms.label>
                                <x-forms.input-group>
                                    <input type="password" name="password" id="password" autocomplete="off"
                                        class="form-control height-35 f-14">
                                    <x-slot name="preappend">
                                        <button type="button" data-toggle="tooltip"
                                            data-original-title="@lang('app.viewPassword')"
                                            class="btn btn-outline-secondary border-grey height-35 toggle-password"><i
                                                class="fa fa-eye"></i></button>
                                    </x-slot>
                                    <x-slot name="append">
                                        <button id="random_password" type="button" data-toggle="tooltip"
                                            data-original-title="@lang('modules.client.generateRandomPassword')"
                                            class="btn btn-outline-secondary border-grey height-35"><i
                                                class="fa fa-random"></i></button>
                                    </x-slot>
                                </x-forms.input-group>
                                <small class="form-text text-muted">@lang('modules.client.passwordUpdateNote')</small>
                            </div>
                            <div class="col-lg-4 col-md-6">
                                <x-forms.select fieldId="country" :fieldLabel="__('app.country')" fieldName="country"
                                    search="true">
                                    <option value="">--</option>
                                    @foreach ($countries as $item)
                                        <option data-tokens="{{ $item->iso3 }}" @if ($client->country_id == $item->id) selected @endif data-content="<span
                                        class='flag-icon flag-icon-{{ strtolower($item->iso) }} flag-icon-squared'></span>
                                    {{ $item->nicename }}" value="{{ $item->id }}">{{ $item->nicename }}</option>
                                    @endforeach
                                </x-forms.select>
                            </div>
                            <div class="col-lg-4 col-md-6">
                                <x-forms.tel fieldId="mobile" :fieldLabel="__('app.mobile')" fieldName="mobile"
                                    :fieldValue="$client->mobile" fieldPlaceholder="e.g. 987654321"></x-forms.tel>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        @php
                            $userImage = $client->hasGravatar($client->email) ? str_replace('?s=200&d=mp', '', $client->image_url) : asset('img/avatar.png');
                        @endphp
                        <x-forms.file allowedFileExtensions="png jpg jpeg" class="mr-0 mr-lg-2 mr-md-2 cropper"
                            :fieldLabel="__('modules.profile.profilePicture')"
                            :fieldValue="($client->image ? $client->image_url : $userImage)" fieldName="image"
                            fieldId="image" fieldHeight="119" :popover="__('messages.fileFormat.ImageFile')" />
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <x-forms.select fieldId="gender" :fieldLabel="__('modules.employees.gender')"
                            fieldName="gender">
                            <option value="">--</option>
                            <option value="male" {{ $client->gender == 'male' ? 'selected' : '' }}>@lang('app.male')
                            </option>
                            <option value="female" {{ $client->gender == 'female' ? 'selected' : '' }}>
                                @lang('app.female')</option>
                            <option value="others" {{ $client->gender == 'others' ? 'selected' : '' }}>
                                @lang('app.others')</option>
                        </x-forms.select>
                    </div>

                    <div class="col-md-3">
                        <x-forms.select fieldId="locale" :fieldLabel="__('modules.accountSettings.changeLanguage')"
                            fieldName="locale" search="true">
                            @foreach ($languages as $language)
                                <option @if ($client->locale == $language->language_code) selected @endif
                                data-content="<span class='flag-icon flag-icon-{{ ($language->flag_code == 'en') ? 'gb' : strtolower($language->flag_code) }} flag-icon-squared'></span> {{ $language->language_name }}"
                                value="{{ $language->language_code }}">{{ $language->language_name }}</option>
                            @endforeach
                        </x-forms.select>
                    </div>

                    <div class="col-md-3">
                        <x-forms.label class="mt-3" fieldId="category"
                            :fieldLabel="__('modules.client.clientCategory')">
                        </x-forms.label>
                        <x-forms.input-group>
                            <select class="form-control select-picker" name="category_id" id="category_id"
                                data-live-search="true">
                                <option value="">--</option>
                                @foreach($categories as $category)
                                    <option @if ($client->clientDetails->category_id == $category->id) selected @endif value="{{ $category->id }}">
                                        {{ mb_ucwords($category->category_name) }}</option>
                                @endforeach
                            </select>

                            @if ($addClientCategoryPermission == 'all' || $addClientCategoryPermission == 'added' || $addClientCategoryPermission == 'both')
                                <x-slot name="append">
                                    <button id="addClientCategory" type="button"
                                        class="btn btn-outline-secondary border-grey">@lang('app.add')</button>
                                </x-slot>
                            @endif
                        </x-forms.input-group>
                    </div>

                    <div class="col-md-3">
                        <x-forms.label class="mt-3" fieldId="sub_category_id"
                            :fieldLabel="__('modules.client.clientSubCategory')"></x-forms.label>
                        <x-forms.input-group>
                            <select class="form-control select-picker" name="sub_category_id" id="sub_category_id"
                                data-live-search="true">
                                @forelse($subcategories as $subcategory)
                                    <option @if ($client->clientDetails->sub_category_id == $subcategory->id) selected @endif value="{{ $subcategory->id }}">
                                        {{ mb_ucwords($subcategory->category_name) }}</option>
                                @empty
                                    <option value="">@lang('messages.noCategoryAdded')</option>
                                @endforelse
                            </select>

                            @if ($addClientSubCategoryPermission == 'all' || $addClientSubCategoryPermission == 'added' || $addClientSubCategoryPermission == 'both')
                                <x-slot name="append">
                                    <button id="addClientSubCategory" type="button"
                                        class="btn btn-outline-secondary border-grey">@lang('app.add')</button>
                                </x-slot>
                            @endif
                        </x-forms.input-group>
                    </div>

                    <div class="col-lg-3 col-md-6">
                        <div class="form-group my-3">
                            <label class="f-14 text-dark-grey mb-12 w-100 mt-3"
                                for="usr">@lang('modules.client.clientCanLogin')</label>
                            <div class="d-flex">
                                <x-forms.radio fieldId="login-yes" :fieldLabel="__('app.yes')" fieldName="login"
                                    fieldValue="enable" :checked="($client->login == 'enable') ? 'checked' : ''">
                                </x-forms.radio>
                                <x-forms.radio fieldId="login-no" :fieldLabel="__('app.no')" fieldValue="disable"
                                    fieldName="login" :checked="($client->login == 'disable') ? 'checked' : ''">
                                </x-forms.radio>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="form-group my-3">
                            <label class="f-14 text-dark-grey mb-12 w-100 mt-3"
                                for="usr">@lang('modules.emailSettings.emailNotifications')</label>
                            <div class="d-flex">
                                <x-forms.radio fieldId="notification-yes" :fieldLabel="__('app.yes')" fieldValue="yes"
                                    fieldName="sendMail" checked="($client->email_notifications) ? 'checked' : ''">
                                </x-forms.radio>
                                <x-forms.radio fieldId="notification-no" :fieldLabel="__('app.no')" fieldValue="no"
                                    fieldName="sendMail" :checked="(!$client->email_notifications) ? 'checked' : ''">
                                </x-forms.radio>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="form-group my-3">
                            <label class="f-14 text-dark-grey mb-12 w-100" for="usr">@lang('app.status')</label>
                            <div class="d-flex">
                                <x-forms.radio fieldId="status-active" :fieldLabel="__('app.active')"
                                    fieldValue="active" fieldName="status"
                                    checked="($client->status == 'active') ? 'checked' : ''">
                                </x-forms.radio>
                                <x-forms.radio fieldId="status-inactive" :fieldLabel="__('app.inactive')"
                                    fieldValue="deactive" fieldName="status"
                                    :checked="($client->status == 'deactive') ? 'checked' : ''">
                                </x-forms.radio>
                            </div>
                        </div>
                    </div>


                </div>

                <h4 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-top-grey">
                    @lang('modules.client.companyDetails')</h4>
                <div class="row p-20">
                    <div class="col-lg-4 col-md-6">
                        <x-forms.text class="mb-3 mt-3 mt-lg-0 mt-md-0" fieldId="company_name"
                            :fieldLabel="__('modules.client.companyName')" fieldName="company_name"
                            :fieldValue="$client->clientDetails->company_name" fieldPlaceholder="e.g. Acme Corporation">
                        </x-forms.text>
                    </div>
                    <div class="col-lg-4 col-md-6">
                        <x-forms.text class="mb-3 mt-3 mt-lg-0 mt-md-0" fieldId="website"
                            :fieldLabel="__('modules.client.website')" fieldName="website"
                            :fieldValue="$client->clientDetails->website"
                            fieldPlaceholder="e.g. https://www.spacex.com/">
                        </x-forms.text>
                    </div>
                    <div class="col-lg-4 col-md-6">
                        <x-forms.text class="mb-3 mt-3 mt-lg-0 mt-md-0" fieldId="gst_number"
                            :fieldLabel="__('app.gstNumber')" :fieldValue="$client->clientDetails->gst_number"
                            fieldName="gst_number" fieldPlaceholder="e.g. 18AABCU960XXXXX"></x-forms.text>
                    </div>

                    <div class="col-lg-3 col-md-6">
                        <x-forms.text fieldId="office" :fieldLabel="__('modules.client.officePhoneNumber')"
                            fieldName="office" fieldPlaceholder="e.g. +19876543"
                            :fieldValue="$client->clientDetails->office"></x-forms.text>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <x-forms.text fieldId="city" :fieldLabel="__('modules.stripeCustomerAddress.city')"
                            fieldName="city" fieldPlaceholder="e.g. Hawthorne"
                            :fieldValue="$client->clientDetails->city"></x-forms.text>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <x-forms.text fieldId="state" :fieldLabel="__('modules.stripeCustomerAddress.state')"
                            fieldName="state" fieldPlaceholder="e.g. California"
                            :fieldValue="$client->clientDetails->state"></x-forms.text>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <x-forms.text fieldId="postalCode" :fieldLabel="__('modules.stripeCustomerAddress.postalCode')"
                            fieldName="postal_code" fieldPlaceholder="e.g. 90250"
                            :fieldValue="$client->clientDetails->postal_code"></x-forms.text>
                    </div>

                    <div class="col-md-6">
                        <div class="form-group my-3">
                            <x-forms.textarea class="mr-0 mr-lg-2 mr-md-2"
                                :fieldLabel="__('modules.accountSettings.companyAddress')" fieldName="address"
                                fieldId="address" fieldPlaceholder="e.g. Rocket Road"
                                :fieldValue="$client->clientDetails->address">
                            </x-forms.textarea>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group my-3">
                            <x-forms.textarea class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('app.shippingAddress')"
                                :fieldValue="$client->clientDetails->shipping_address" fieldName="shipping_address"
                                fieldId="shipping_address" fieldPlaceholder="e.g. Rocket Road">
                            </x-forms.textarea>
                        </div>
                    </div>

                    <div class="col-lg-3 col-md-6">
                        <x-forms.text fieldId="skype" fieldLabel="Skype" fieldName="skype"
                            fieldPlaceholder="e.g. skypeUsername" :fieldValue="$client->clientDetails->skype">
                        </x-forms.text>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <x-forms.text fieldId="linkedin" fieldLabel="Linkedin" fieldName="linkedin"
                            fieldPlaceholder="e.g. https://www.linkedin.com/XXXXXXXXXX/"
                            :fieldValue="$client->clientDetails->linkedin"></x-forms.text>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <x-forms.text fieldId="twitter" fieldLabel="Twitter" fieldName="twitter"
                            fieldPlaceholder="e.g. @johndoe" :fieldValue="$client->clientDetails->twitter">
                        </x-forms.text>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <x-forms.text fieldId="facebook" fieldLabel="Facebook" fieldName="facebook"
                            fieldPlaceholder="e.g. https://www.facebook.com/XXXXXXXXX"
                            :fieldValue="$client->clientDetails->facebook"></x-forms.text>
                    </div>

                    @if ($editPermission == 'all')
                        <div class="col-lg-3 col-md-6">
                            <x-forms.select fieldId="added_by" :fieldLabel="__('app.added').' '.__('app.by')"
                                fieldName="added_by">
                                <option value="">--</option>
                                @foreach ($employees as $item)
                                    <option @if ($client->clientDetails->added_by == $item->id)  selected @endif
                                        data-content="<div class='d-inline-block mr-1'><img class='taskEmployeeImg rounded-circle' src='{{ $item->image_url }}' ></div> {{ ucfirst($item->name) }}"
                                        value="{{ $item->id }}">{{ mb_ucwords($item->name) }}</option>
                                @endforeach
                            </x-forms.select>
                        </div>
                    @endif

                    @if (function_exists('sms_setting') && sms_setting()->telegram_status)
                        <div class="col-lg-3 col-md-6">
                            <x-forms.number fieldName="telegram_user_id" fieldId="telegram_user_id"
                                fieldLabel="<i class='fab fa-telegram'></i> {{ __('sms::modules.telegramUserId') }}"
                                :fieldValue="$client->telegram_user_id" :popover="__('sms::modules.userIdInfo')" />
                        </div>
                    @endif
                </div>

                @if (isset($fields) && count($fields) > 0)
                    <div class="row p-20">
                        @foreach ($fields as $field)
                            <div class="col-md-4">
                                <div class="form-group">
                                    @if ($field->type == 'text')
                                        <x-forms.text
                                            fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                            :fieldLabel="$field->label"
                                            fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                            :fieldPlaceholder="$field->label"
                                            :fieldRequired="($field->required == 'yes') ? 'true' : 'false'"
                                            :fieldValue="$clientDetail->custom_fields_data['field_'.$field->id] ?? ''">
                                        </x-forms.text>
                                    @elseif($field->type == 'password')
                                        <x-forms.password
                                            fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                            :fieldLabel="$field->label"
                                            fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                            :fieldPlaceholder="$field->label"
                                            :fieldRequired="($field->required === 'yes') ? true : false"
                                            :fieldValue="$clientDetail->custom_fields_data['field_'.$field->id] ?? ''">
                                        </x-forms.password>
                                    @elseif($field->type == 'number')
                                        <x-forms.number
                                            fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                            :fieldLabel="$field->label"
                                            fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                            :fieldPlaceholder="$field->label"
                                            :fieldRequired="($field->required === 'yes') ? true : false"
                                            :fieldValue="$clientDetail->custom_fields_data['field_'.$field->id] ?? ''">
                                        </x-forms.number>
                                    @elseif($field->type == 'textarea')
                                        <x-forms.textarea :fieldLabel="$field->label"
                                            fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                            fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                            :fieldRequired="($field->required === 'yes') ? true : false"
                                            :fieldPlaceholder="$field->label"
                                            :fieldValue="$clientDetail->custom_fields_data['field_'.$field->id] ?? ''">
                                        </x-forms.textarea>
                                    @elseif($field->type == 'radio')
                                        <div class="form-group my-3">
                                            <x-forms.label
                                                fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                                :fieldLabel="$field->label"
                                                :fieldRequired="($field->required === 'yes') ? true : false">
                                            </x-forms.label>
                                            <div class="d-flex">
                                                @foreach ($field->values as $key => $value)
                                                    <x-forms.radio fieldId="optionsRadios{{ $key . $field->id }}"
                                                        :fieldLabel="$value"
                                                        fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                                        :fieldValue="$value"
                                                        :checked="(isset($clientDetail) && $clientDetail->custom_fields_data['field_'.$field->id] == $value) ? true : false" />
                                                @endforeach
                                            </div>
                                        </div>
                                    @elseif($field->type == 'select')
                                        <div class="form-group my-3">
                                            <x-forms.label
                                                fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                                :fieldLabel="$field->label"
                                                :fieldRequired="($field->required === 'yes') ? true : false">
                                            </x-forms.label>
                                            {!! Form::select('custom_fields_data[' . $field->name . '_' . $field->id . ']', $field->values, isset($clientDetail) ? $clientDetail->custom_fields_data['field_' . $field->id] : '', ['class' => 'form-control select-picker']) !!}
                                        </div>
                                    @elseif($field->type == 'date')
                                        <x-forms.datepicker custom="true"
                                            fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                            :fieldRequired="($field->required === 'yes') ? true : false"
                                            :fieldLabel="$field->label"
                                            fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                            :fieldValue="($clientDetail->custom_fields_data['field_'.$field->id] != '') ? \Carbon\Carbon::parse($clientDetail->custom_fields_data['field_'.$field->id])->format(global_setting()->date_format) : \Carbon\Carbon::now()->format(global_setting()->date_format)"
                                            :fieldPlaceholder="$field->label" />
                                    @elseif($field->type == 'checkbox')
                                        <div class="form-group my-3">
                                            <x-forms.label
                                                fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                                :fieldLabel="$field->label"
                                                :fieldRequired="($field->required === 'yes') ? true : false">
                                            </x-forms.label>
                                            <div class="d-flex checkbox-{{ $field->id }}">
                                                <input type="hidden"
                                                    name="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                                    id="{{ $field->name . '_' . $field->id }}"
                                                    value="{{ $clientDetail->custom_fields_data['field_' . $field->id] }}">

                                                @foreach ($field->values as $key => $value)
                                                    <x-forms.checkbox fieldId="optionsRadios{{ $key . $field->id }}"
                                                        :fieldLabel="$value"
                                                        fieldName="$field->name.'_'.$field->id.'[]'"
                                                        :fieldValue="$value"
                                                        :fieldRequired="($field->required === 'yes') ? true : false"
                                                        onchange="checkboxChange('checkbox-{{ $field->id }}', '{{ $field->name . '_' . $field->id }}')"
                                                        :checked="$clientDetail->custom_fields_data['field_'.$field->id] != '' && in_array($value ,explode(', ', $clientDetail->custom_fields_data['field_'.$field->id]))" />
                                                @endforeach
                                            </div>
                                        </div>
                                    @endif
                                    <div class="form-control-focus"> </div>
                                    <span class="help-block"></span>

                                </div>
                            </div>
                        @endforeach
                    </div>
                @endif


                <x-form-actions>
                    <x-forms.button-primary id="save-form" class="mr-3" icon="check">@lang('app.save')
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

        $('#random_password').click(function() {
            const randPassword = Math.random().toString(36).substr(2, 8);

            $('#password').val(randPassword);
        });

        if ($('.custom-date-picker').length > 0) {
            datepicker('.custom-date-picker', {
                position: 'bl',
                ...datepickerConfig
            });
        }

        $('#category_id').change(function(e) {

            let categoryId = $(this).val();

            var url = "{{ route('get_client_sub_categories', ':id') }}";
            url = url.replace(':id', categoryId);

            $.easyAjax({
                url: url,
                type: "GET",
                success: function(response) {
                    if (response.status == 'success') {
                        var options = [];
                        var rData = [];
                        rData = response.data;
                        $.each(rData, function(index, value) {
                            var selectData = '';
                            selectData = '<option value="' + value.id + '">' + value
                                .category_name + '</option>';
                            options.push(selectData);
                        });

                        $('#sub_category_id').html('<option value="">--</option>' +
                            options);
                        $('#sub_category_id').selectpicker('refresh');
                    }
                }
            })

        });


        $('#save-form').click(function() {
            const url = "{{ route('clients.update', $client->id) }}";

            $.easyAjax({
                url: url,
                container: '#save-data-form',
                type: "POST",
                disableButton: true,
                blockUI: true,
                file: true,
                buttonSelector: "#save-form",
                data: $('#save-data-form').serialize(),
                success: function(response) {
                    if (response.status == 'success') {
                        window.location.href = response.redirectUrl;
                    }
                }
            })
        });

        $('#addClientCategory').click(function() {
            const url = "{{ route('clientCategory.create') }}";
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        })
        $('#addClientSubCategory').click(function() {
            const url = "{{ route('clientSubCategory.create') }}";
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        })

        init(RIGHT_MODAL);
    });

    function checkboxChange(parentClass, id) {
        var checkedData = '';
        $('.' + parentClass).find("input[type= 'checkbox']:checked").each(function() {
            checkedData = (checkedData !== '') ? checkedData + ', ' + $(this).val() : $(this).val();
        });
        $('#' + id).val(checkedData);
    }
</script>
