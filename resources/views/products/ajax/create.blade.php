@php
$addProductCategoryPermission = user()->permission('manage_product_category');
$addProductSubCategoryPermission = user()->permission('manage_product_sub_category');
@endphp

<link rel="stylesheet" href="{{ asset('vendor/css/dropzone.min.css') }}">

<div class="row">
    <div class="col-sm-12">
        <x-form id="save-product-form">
            @include('sections.password-autocomplete-hide')

            <div class="add-client bg-white rounded">
                <h4 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                    @lang('app.add') @lang('app.menu.products')</h4>
                <div class="row p-20">
                    <div class="col-lg-12">
                        <div class="row">

                            <input type="hidden" id="hiddenProductId">

                            <div class="col-lg-4 col-md-6">
                                <x-forms.text fieldId="name" :fieldLabel="__('app.name')" fieldName="name"
                                    fieldRequired="true" :fieldPlaceholder="__('placeholders.productName')">
                                </x-forms.text>
                            </div>

                            <div class="col-lg-4 col-md-6">
                                <x-forms.number class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('app.price')"
                                    fieldName="price" fieldId="price" fieldRequired="true" :fieldPlaceholder="__('placeholders.price')"
                                    fieldValue="0" />
                            </div>

                            <div class="col-lg-4 col-md-6">
                                <x-forms.label class="my-3" fieldId=""
                                    :fieldLabel="__('modules.productCategory.productCategory')">
                                </x-forms.label>
                                <x-forms.input-group>
                                    <select class="form-control select-picker" name="category_id"
                                        id="product_category_id" data-live-search="true">
                                        <option value="">--</option>
                                        @foreach ($categories as $category)
                                            <option value="{{ $category->id }}">
                                                {{ mb_ucwords($category->category_name) }}</option>
                                        @endforeach
                                    </select>

                                    @if ($addProductCategoryPermission == 'all' || $addProductCategoryPermission == 'added')
                                        <x-slot name="append">
                                            <button id="add-category" type="button"
                                                class="btn btn-outline-secondary border-grey">@lang('app.add')</button>
                                        </x-slot>
                                    @endif
                                </x-forms.input-group>
                            </div>


                            <div class="col-lg-4 col-md-6">
                                <x-forms.label class="my-3" fieldId=""
                                    :fieldLabel="__('modules.productCategory.productSubCategory')">
                                </x-forms.label>
                                <x-forms.input-group>
                                    <select class="form-control select-picker" name="sub_category_id"
                                        id="sub_category_id" data-live-search="true">
                                        <option value="">@lang('messages.noProductSubCategoryAdded')</option>
                                    </select>

                                    @if ($addProductSubCategoryPermission == 'all' || $addProductSubCategoryPermission == 'added')
                                        <x-slot name="append">
                                            <button id="add-sub-category" type="button"
                                                class="btn btn-outline-secondary border-grey">@lang('app.add')</button>
                                        </x-slot>
                                    @endif
                                </x-forms.input-group>
                            </div>


                            <div class="col-lg-4 col-md-6">
                                <x-forms.label class="my-3" fieldId="" :fieldLabel="__('modules.invoices.tax')">
                                </x-forms.label>
                                <x-forms.input-group>
                                    <select class="form-control select-picker" name="tax[]" id="tax_id"
                                        data-live-search="true" multiple="true">
                                        @foreach ($taxes as $tax)
                                            <option value="{{ $tax->id }}">{{ $tax->tax_name }}:
                                                {{ $tax->rate_percent }}%</option>
                                        @endforeach
                                    </select>

                                    @if (user()->permission('manage_tax') == 'all')
                                        <x-slot name="append">
                                            <button id="add-tax" type="button"
                                                class="btn btn-outline-secondary border-grey">@lang('app.add')</button>
                                        </x-slot>
                                    @endif
                                </x-forms.input-group>
                            </div>

                            <div class="col-lg-4 col-md-6">
                                <x-forms.text fieldId="hsn_sac_code" :fieldLabel="__('app.hsnSac')" fieldName="hsn_sac_code"
                                 :fieldPlaceholder="__('placeholders.hsnSac')">
                                </x-forms.text>
                            </div>

                            <div class="col-lg-4 col-md-6 mt-3">
                                <x-forms.checkbox class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('app.purchaseAllow')"
                                    fieldName="purchase_allow" fieldId="purchase_allow" fieldValue="no"
                                    fieldRequired="true" />
                            </div>
                            <div class="col-lg-4 col-md-6 mt-3">
                                <x-forms.checkbox class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('app.downloadable')"
                                    fieldName="downloadable" fieldId="downloadable" fieldValue="true"
                                    fieldRequired="true" :popover="__('messages.downloadable')"/>
                            </div>

                            <div class="col-lg-12 col-xl-12  mt-2 downloadable d-none">
                                <x-forms.file class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('app.downloadableFile')"
                                    fieldName="downloadable_file" fieldId="downloadable_file" fieldRequired="true"/>
                            </div>
                            <div class="col-md-12 mt-3">
                                <div class="form-group">
                                    <x-forms.label class="my-3" fieldId="description-text"
                                        :fieldLabel="__('app.description')">
                                    </x-forms.label>
                                    <textarea name="description" id="description-text" rows="4" class="form-control"></textarea>
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <x-forms.file-multiple class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('app.add') . ' ' .__('app.file')"
                                    fieldName="file" fieldId="file-upload-dropzone" />
                            </div>
                        </div>
                    </div>

                    @if (isset($fields) && count($fields) > 0)
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
                                <x-forms.password
                                    fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                    :fieldLabel="$field->label"
                                    fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                    :fieldPlaceholder="$field->label"
                                    :fieldRequired="($field->required === 'yes') ? true : false">
                                </x-forms.password>
                            @elseif($field->type == 'number')
                                <x-forms.number
                                    fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
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
                                                :fieldValue="$value" :checked="($key == 0) ? true : false" />
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
                                    {!! Form::select('custom_fields_data[' . $field->name . '_' . $field->id . ']', $field->values, isset($editUser) ? $editUser->custom_fields_data['field_' . $field->id] : '', ['class' => 'form-control select-picker']) !!}
                                </div>
                            @elseif($field->type == 'date')
                                <x-forms.datepicker custom="true"
                                    fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                    :fieldRequired="($field->required === 'yes') ? true : false"
                                    :fieldLabel="$field->label"
                                    fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                    :fieldValue="now()->timezone(global_setting()->timezone)->format(global_setting()->date_format)"
                                    :fieldPlaceholder="$field->label" />
                            @elseif($field->type == 'checkbox')
                                <div class="form-group my-3">
                                    <x-forms.label
                                        fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                        :fieldLabel="$field->label"
                                        :fieldRequired="($field->required === 'yes') ? true : false">
                                    </x-forms.label>
                                    <div class="d-flex checkbox-{{$field->id}}">
                                        <input type="hidden" name="custom_fields_data[{{$field->name.'_'.$field->id}}]" id="{{$field->name.'_'.$field->id}}">

                                        @foreach ($field->values as $key => $value)
                                            <x-forms.checkbox fieldId="optionsRadios{{ $key . $field->id }}"
                                                :fieldLabel="$value"
                                                fieldName="$field->name.'_'.$field->id.'[]'"
                                                :fieldValue="$value"
                                                onchange="checkboxChange('checkbox-{{$field->id}}', '{{$field->name.'_'.$field->id}}')"
                                                :fieldRequired="($field->required === 'yes') ? true : false" />
                                        @endforeach
                                    </div>
                                </div>
                            @endif

                        </div>
                    @endforeach
                @endif


                </div>

                <x-form-actions>
                    <x-forms.button-primary id="save-product" class="mr-3" icon="check">@lang('app.save')
                    </x-forms.button-primary>
                    <x-forms.button-cancel :link="route('products.index')" class="border-0">@lang('app.cancel')
                    </x-forms.button-cancel>
                </x-form-actions>
            </div>
        </x-form>

    </div>
</div>

<script>
    $(document).ready(function() {

        var defaultImage = '';
        var lastIndex = 0;

        Dropzone.autoDiscover = false;
        //Dropzone class
        productDropzone = new Dropzone("div#file-upload-dropzone", {
            dictDefaultMessage: "{{ __('app.dragDrop') }}",
            url: "{{ route('product-files.store') }}",
            headers: {
                'X-CSRF-TOKEN': '{{ csrf_token() }}'
            },
            paramName: "file",
            maxFilesize: DROPZONE_MAX_FILESIZE,
            maxFiles: 10,
            autoProcessQueue: false,
            uploadMultiple: true,
            addRemoveLinks: true,
            parallelUploads: 10,
            acceptedFiles: 'image/*',
            init: function() {
                productDropzone = this;
            }
        });
        productDropzone.on('sending', function(file, xhr, formData) {
            var productID = $('#hiddenProductId').val();
            formData.append('product_id', productID);
            formData.append('default_image', defaultImage);
            $.easyBlockUI();
        });
        productDropzone.on('uploadprogress', function() {
            $.easyBlockUI();
        });
        productDropzone.on('completemultiple', function() {
            window.location.href = '{{ route("products.index") }}';
        });
        productDropzone.on('addedfile', function(file) {
            lastIndex++;

            var div = document.createElement('div');
            div.className = 'form-check-inline custom-control custom-radio mt-2 mr-3';
            var input = document.createElement('input');
            input.className = 'custom-control-input';
            input.type = 'radio';
            input.name = 'default_image';
            input.id = 'default-image-'+lastIndex;
            input.value = file.name;
            if (lastIndex == 1) {
                input.checked = true;
            }
            div.appendChild(input);

            var label = document.createElement('label');
            label.className = 'custom-control-label pt-1 cursor-pointer';
            label.innerHTML = "@lang('modules.makeDefaultImage')";
            label.htmlFor = 'default-image-'+lastIndex;
            div.appendChild(label);

            file.previewTemplate.appendChild(div);
        });

        $('#product_category_id').change(function(e) {
            let categoryId = $(this).val();

            var url = "{{ route('get_product_sub_categories', ':id') }}";
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

                        $('#sub_category_id').html('<option value="">--</option>' + options);
                        $('#sub_category_id').selectpicker('refresh');
                    }
                }
            })
        });

        $('#save-product').click(function() {
            const url = "{{ route('products.store') }}";

            $.easyAjax({
                url: url,
                container: '#save-product-form',
                type: "POST",
                disableButton: true,
                blockUI: true,
                buttonSelector: "#save-product",
                file: true,
                data: $('#save-product-form').serialize(),
                success: function(response) {
                    if (productDropzone.getQueuedFiles().length > 0) {
                        productID = response.productID
                        defaultImage = response.defaultImage;
                        $('#hiddenProductId').val(productID);
                        productDropzone.processQueue();
                    }
                    else{
                        if ($(MODAL_XL).hasClass('show')) {
                            $(MODAL_XL).hide();
                            window.location.reload();
                        } else {
                            window.location.href = response.redirectUrl;
                        }
                    }
                }
            });
        });

        $('#add-category').click(function() {
            const url = "{{ route('productCategory.create') }}";
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        })

        $('#add-sub-category').click(function() {
            const url = "{{ route('productSubCategory.create') }}";
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });

        $('#add-tax').click(function() {
            const url = "{{ route('taxes.create') }}";
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });

        init(RIGHT_MODAL);

        $('#downloadable').change(function() {
            if ($(this).is(':checked')) {
                $('.downloadable').removeClass('d-none');
            } else {
                $('.downloadable').addClass('d-none');
            }
        });
    });
</script>
