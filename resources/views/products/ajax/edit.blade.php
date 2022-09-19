@php
$addProductCategoryPermission = user()->permission('manage_product_category');
$addProductSubCategoryPermission = user()->permission('manage_product_sub_category');
@endphp

<link rel="stylesheet" href="{{ asset('vendor/css/dropzone.min.css') }}">

<div class="row">
    <div class="col-sm-12">
        <x-form id="save-product-data-form" method="PUT">
            <div class="add-client bg-white rounded">
                <h4 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                    @lang('app.edit') @lang('app.menu.products') </h4>
                <div class="row p-20">
                    <div class="col-lg-12">
                        <div class="row">

                            <div class="col-md-4">
                                <x-forms.text fieldId="name" :fieldLabel="__('app.name')" fieldName="name"
                                    fieldRequired="true" :fieldPlaceholder="__('placeholders.productName')"
                                    :fieldValue="$product->name">
                                </x-forms.text>
                            </div>

                            <div class="col-md-4">
                                <x-forms.number class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('app.price')"
                                    fieldName="price" fieldId="price" :fieldPlaceholder="__('placeholders.price')"
                                    :fieldValue="$product->price" />
                            </div>

                            <div class="col-md-4">
                                <x-forms.label class="mt-3" fieldId="category_id"
                                    :fieldLabel="__('modules.productCategory.productCategory')">
                                </x-forms.label>
                                <x-forms.input-group>
                                    <select class="form-control select-picker height-35" name="category_id"
                                        id="product_category_id" data-live-search="true">
                                        <option value="">--</option>
                                        @foreach ($categories as $category)
                                            <option value="{{ $category->id }}" @if ($category->id == $product->category_id) selected @endif>{{ mb_ucwords($category->category_name) }}</option>
                                        @endforeach
                                    </select>

                                    @if ($addProductCategoryPermission == 'all' || $addProductCategoryPermission == 'added')
                                        <x-slot name="append">
                                            <button id="add-category" type="button"
                                                class="btn btn-outline-secondary border-grey height-35">@lang('app.add')</button>
                                        </x-slot>
                                    @endif
                                </x-forms.input-group>
                            </div>


                            <div class="col-md-4">
                                <x-forms.label class="my-3" fieldId=""
                                    :fieldLabel="__('modules.productCategory.productSubCategory')">
                                </x-forms.label>
                                <x-forms.input-group>
                                    <select class="form-control select-picker" name="sub_category_id"
                                        id="sub_category_id" data-live-search="true">
                                        <option value="">@lang('messages.noProductSubCategoryAdded')</option>
                                        @if ($product->category_id)
                                            @foreach ($product->category->subCategories as $category)
                                                <option value="{{ $category->id }}" @if ($category->id == $product->sub_category_id) selected @endif>{{ mb_ucwords($category->category_name) }}</option>
                                            @endforeach
                                        @endif
                                    </select>

                                    @if ($addProductSubCategoryPermission == 'all' || $addProductSubCategoryPermission == 'added')
                                        <x-slot name="append">
                                            <button id="add-sub-category" type="button"
                                                class="btn btn-outline-secondary border-grey">@lang('app.add')</button>
                                        </x-slot>
                                    @endif
                                </x-forms.input-group>
                            </div>

                            <div class="col-md-4">
                                <x-forms.label class="my-3" fieldId="multiselect" :fieldLabel="__('modules.invoices.tax')">
                                </x-forms.label>
                                <x-forms.input-group>
                                    <select class="form-control select-picker" name="tax[]" id="multiselect"
                                        data-live-search="true" multiple="true">
                                        @foreach ($taxes as $tax)
                                            <option value="{{ $tax->id }}" @if (isset($product->taxes) && array_search($tax->id, json_decode($product->taxes)) !== false) selected @endif>
                                                {{ $tax->tax_name }}: {{ $tax->rate_percent }}%
                                            </option>
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

                            <div class="col-md-4">
                                <x-forms.text fieldId="hsn_sac_code" :fieldLabel="__('app.hsnSac')"
                                    fieldName="hsn_sac_code" :fieldPlaceholder="__('placeholders.hsnSac')"
                                    :fieldValue="$product->hsn_sac_code">
                                </x-forms.text>
                            </div>

                            <div class="col-md-4 col-md-6 mt-3">
                                <x-forms.checkbox class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('app.purchaseAllow')"
                                    fieldName="purchase_allow" fieldId="purchase_allow" fieldValue="no"
                                    fieldRequired="true" :checked="$product->allow_purchase == 1" />
                            </div>
                            <div class="col-lg-4 col-md-6 mt-3">
                                <x-forms.checkbox class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('app.downloadable')"
                                    fieldName="downloadable" fieldId="downloadable" fieldValue="true"
                                    fieldRequired="true" :popover="__('messages.downloadable')" :checked="$product->downloadable == 1" />
                            </div>

                            <div class="col-lg-12 col-xl-12  mt-2 downloadable {{$product->downloadable ? '' : 'd-none'}}">
                                <x-forms.file class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('app.downloadableFile')"
                                    fieldName="downloadable_file" fieldId="downloadable_file" fieldRequired="true" :fieldValue="$product->download_file_url" />
                            </div>

                            <div class="col-md-12 mt-3">
                                <div class="form-group">
                                    <x-forms.label class="my-3" fieldId="description-text"
                                        :fieldLabel="__('app.description')">
                                    </x-forms.label>
                                    <textarea name="description" id="description-text" rows="4" class="form-control f-14 w-100">{{ $product->description }}</textarea>
                                </div>
                            </div>

                            <div class="col-lg-12">
                                <x-forms.file-multiple class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('app.add') . ' ' .__('app.file')"
                                    fieldName="file" fieldId="file-upload-dropzone" />
                            </div>

                        </div>
                    </div>

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
                                            :fieldValue="$product->custom_fields_data['field_'.$field->id] ?? ''">
                                        </x-forms.text>
                                    @elseif($field->type == 'password')
                                        <x-forms.password
                                            fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                            :fieldLabel="$field->label"
                                            fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                            :fieldPlaceholder="$field->label"
                                            :fieldRequired="($field->required === 'yes') ? true : false"
                                            :fieldValue="$product->custom_fields_data['field_'.$field->id] ?? ''">
                                        </x-forms.password>
                                    @elseif($field->type == 'number')
                                        <x-forms.number
                                            fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                            :fieldLabel="$field->label"
                                            fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                            :fieldPlaceholder="$field->label"
                                            :fieldRequired="($field->required === 'yes') ? true : false"
                                            :fieldValue="$product->custom_fields_data['field_'.$field->id] ?? ''">
                                        </x-forms.number>
                                    @elseif($field->type == 'textarea')
                                        <x-forms.textarea :fieldLabel="$field->label"
                                            fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                            fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                            :fieldRequired="($field->required === 'yes') ? true : false"
                                            :fieldPlaceholder="$field->label"
                                            :fieldValue="$product->custom_fields_data['field_'.$field->id] ?? ''">
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
                                                        :checked="(isset($product) && $product->custom_fields_data['field_'.$field->id] == $value) ? true : false" />
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
                                            {!! Form::select('custom_fields_data[' . $field->name . '_' . $field->id . ']', $field->values, isset($product) ? $product->custom_fields_data['field_' . $field->id] : '', ['class' => 'form-control select-picker']) !!}
                                        </div>
                                    @elseif($field->type == 'date')
                                        <x-forms.datepicker custom="true"
                                            fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                            :fieldRequired="($field->required === 'yes') ? true : false"
                                            :fieldLabel="$field->label"
                                            fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                            :fieldValue="($product->custom_fields_data['field_'.$field->id] != '') ? \Carbon\Carbon::parse($product->custom_fields_data['field_'.$field->id])->format(global_setting()->date_format) : \Carbon\Carbon::now()->format(global_setting()->date_format)"
                                            :fieldPlaceholder="$field->label" />
                                    @elseif($field->type == 'checkbox')
                                        <div class="form-group my-3">
                                            <x-forms.label
                                                fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                                :fieldLabel="$field->label"
                                                :fieldRequired="($field->required === 'yes') ? true : false">
                                            </x-forms.label>
                                            <div class="d-flex checkbox-{{$field->id}}">
                                                <input type="hidden" name="custom_fields_data[{{$field->name.'_'.$field->id}}]" id="{{$field->name.'_'.$field->id}}" value="{{$product->custom_fields_data['field_'.$field->id]}}">

                                                @foreach ($field->values as $key => $value)
                                                    <x-forms.checkbox fieldId="optionsRadios{{ $key . $field->id }}"
                                                        :fieldLabel="$value"
                                                        fieldName="$field->name.'_'.$field->id.'[]'"
                                                        :fieldValue="$value"
                                                        :fieldRequired="($field->required === 'yes') ? true : false"
                                                        onchange="checkboxChange('checkbox-{{$field->id}}', '{{$field->name.'_'.$field->id}}')"
                                                        :checked="$product->custom_fields_data['field_'.$field->id] != '' && in_array($value ,explode(', ', $product->custom_fields_data['field_'.$field->id]))"
                                                        />
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
                    <x-forms.button-primary id="save-product-form" class="mr-3" icon="check">@lang('app.save')
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
        var mockFile = {!! $images !!};

        Dropzone.autoDiscover = false;
        //Dropzone class
        productDropzone = new Dropzone("div#file-upload-dropzone", {
            dictDefaultMessage: "{{ __('app.dragDrop') }}",
            url: "{{ route('product-files.update_images') }}",
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
            },
            removedfile: function (file) {
                var index = mockFile.findIndex(x => x.name == file.name);
                mockFile.splice(index, 1);

                if(typeof(file.id) != 'undefined') {
                    Swal.fire({
                        title: "@lang('messages.sweetAlertTitle')",
                        text: "@lang('messages.recoverRecord')",
                        icon: 'warning',
                        showCancelButton: true,
                        focusConfirm: false,
                        confirmButtonText: "@lang('messages.confirmDelete')",
                        cancelButtonText: "@lang('app.cancel')",
                        customClass: {
                            confirmButton: 'btn btn-primary mr-3',
                            cancelButton: 'btn btn-secondary'
                        },
                        showClass: {
                            popup: 'swal2-noanimation',
                            backdrop: 'swal2-noanimation'
                        },
                        buttonsStyling: false
                    }).then((result) => {
                        if (result.isConfirmed) {
                            var token = "{{ csrf_token() }}";

                            var url = "{{ route('product-files.destroy', ':id') }}";
                            url = url.replace(':id', file.id);

                            $.easyAjax({
                                type: 'POST',
                                url: url,
                                data: {
                                    '_token': token,
                                    '_method': 'DELETE'
                                },
                                success: function(response) {
                                    //This will manually removed the file
                                    file.previewElement.remove();

                                    if ('{{ $product->default_image }}' == file.hashname) {
                                        let $radio = $('.custom-control-input');
                                        $radio[1].checked = true;
                                    }
                                }
                            });
                        }
                    });

                    return false;
                }

                //This will manually removed the file
                file.previewElement.remove();
            }
        });

        productDropzone.on('sending', function(file, xhr, formData) {
            var productID = '{{ $product->id }}';
            formData.append('product_id', productID);
            formData.append('default_image', defaultImage);

            if (mockFile.length > 0) {
                formData.append('uploaded_files', JSON.stringify(mockFile));
            }

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
            console.log(file.name);

            var div = document.createElement('div');
            div.className = 'form-check-inline custom-control custom-radio mt-2';

            var input = document.createElement('input');
            input.className = 'custom-control-input';
            input.type = 'radio';
            input.name = 'default_image';
            input.id = 'default-image-'+lastIndex;
            input.value = file.hashname != undefined ? file.hashname : file.name;
            if (lastIndex == 1) {
                input.checked = true;
            }
            if ('{{ $product->default_image }}' == file.hashname) {
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

        // Create the mock file:
        mockFile.forEach(file => {
            var path = "{{ asset_url('products/' . '/:file_name') }}";
            path = path.replace(':file_name', file.hashname);

            productDropzone.emit('addedfile', file);
            productDropzone.emit('thumbnail', file, path);
            productDropzone.files.push(file);
            productDropzone.emit("complete", file);
        });

        productDropzone.options.maxFiles = productDropzone.options.maxFiles - mockFile.length;

        productDropzone.on("maxfilesexceeded", function(file) { this.removeFile(file); });

        $('#save-product-form').click(function() {
            const url = "{{ route('products.update', [$product->id]) }}";

            $.easyAjax({
                url: url,
                container: '#save-product-data-form',
                type: "POST",
                disableButton: true,
                blockUI: true,
                buttonSelector: "#save-product-form",
                file: true,
                data: $('#save-product-data-form').serialize(),
                success: function(response) {
                    if (productDropzone.getQueuedFiles().length > 0) {
                        defaultImage = response.defaultImage;
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
