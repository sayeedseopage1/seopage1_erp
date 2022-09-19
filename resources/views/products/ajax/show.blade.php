@php
$editPermission = user()->permission('edit_product');
$deletePermission = user()->permission('delete_product');
@endphp
<div id="product-detail-section">
    <div class="row">
        <div class="col-sm-12">
            <div class="card bg-white border-0 b-shadow-4">
                <div class="card-header bg-white  border-bottom-grey text-capitalize justify-content-between p-20">
                    <div class="row">
                        <div class="col-lg-10 col-10">
                            <h3 class="heading-h1 mb-3">@lang('app.menu.products') @lang('app.details')</h3>
                        </div>
                        <div class="col-lg-2 col-2 text-right">
                            @if (
                                ($editPermission == 'all' || ($editPermission == 'added' && $product->added_by == user()->id))
                                || ($deletePermission == 'all' || ($deletePermission == 'added' && $product->added_by == user()->id))
                                )
                                <div class="dropdown">
                                    <button
                                        class="btn btn-lg f-14 px-2 py-1 text-dark-grey text-capitalize rounded  dropdown-toggle"
                                        type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fa fa-ellipsis-h"></i>
                                    </button>

                                    <div class="dropdown-menu dropdown-menu-right border-grey rounded b-shadow-4 p-0"
                                        aria-labelledby="dropdownMenuLink" tabindex="0">
                                        @if ($editPermission == 'all' || ($editPermission == 'added' && $product->added_by == user()->id))
                                            <a class="dropdown-item openRightModal"
                                                href="{{ route('products.edit', $product->id) }}">@lang('app.edit')
                                            </a>
                                        @endif

                                        @if ($deletePermission == 'all' || ($deletePermission == 'added' && $product->added_by == user()->id))
                                            <a class="dropdown-item delete-product"
                                                data-product-id="{{ $product->id }}">@lang('app.delete')</a>
                                        @endif
                                    </div>
                                </div>
                            @endif
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-12">
                            <x-cards.data-row :label="__('app.name')" :value="$product->name ?? '--'" />
                            <x-cards.data-row :label="__('app.price')" :value="$product->price ? currency_formatter($product->price) : '--'" />
                            <x-cards.data-row :label="__('modules.invoices.tax')" :value="!empty($taxValue) ? $taxValue : '--'" />
                            <x-cards.data-row :label="__('app.hsnSac')" :value="$product->hsn_sac_code ?? '--'" />
                            <x-cards.data-row :label="__('modules.productCategory.productCategory')"
                                :value="$product->category->category_name ?? '--'" />
                            <x-cards.data-row :label="__('modules.productCategory.productSubCategory')"
                                :value="$product->subCategory->category_name ?? '--'" />

                            @if (!in_array('client', user_roles()))
                                <x-cards.data-row :label="__('app.purchaseAllow')" :value="($product->allow_purchase) ? '<span class=\'badge badge-success\'>'.
                                    __('app.yes').' </span>': '<span class=\'badge badge-danger\'>'.
                                        __('app.no').' </span>'" />
                            @endif
                            <x-cards.data-row :label="__('app.downloadable')" :value="($product->downloadable) ? '<span class=\'badge badge-success\'>'.
                                __('app.yes').' </span>': '<span class=\'badge badge-danger\'>'.
                                    __('app.no').' </span>'" />
                            @if ($product->downloadable && !in_array('client', user_roles()))
                                <x-cards.data-row :label="__('app.downloadableFile')"
                                    :value="'<a href='.$product->download_file_url.' download>'.$product->download_file_url.'</a>'" />

                            @endif
                            <x-cards.data-row :label="__('app.description')" :value="!empty($product->description) ? $product->description : '--'"
                                html="true" />

                            @if ($product->files)
                                <div class="col-12 px-0 pb-3 d-lg-flex d-md-flex d-block">
                                    <p class="mb-0 text-lightest f-14 w-30 text-capitalize">{{ __('modules.productImage') }}</p>
                                    <p class="mb-0 text-dark-grey f-14 w-70 text-wrap">
                                        @foreach ($product->files as $file)
                                            <a href="javascript:;" class="img-lightbox" data-image-url="{{ $file->file_url }}">
                                                <img src="{{ $file->file_url }}" width="80" height="80" class="img-thumbnail">
                                            </a>
                                        @endforeach
                                    </p>
                                </div>
                            @endif

                            {{-- Custom fields data --}}
                            @if (isset($fields) && count($fields) > 0)
                                @foreach ($fields as $field)
                                    @if ($field->type == 'text' || $field->type == 'password' || $field->type == 'number')
                                        <x-cards.data-row :label="$field->label"
                                            :value="$product->custom_fields_data['field_'.$field->id] ?? '--'" />
                                    @elseif($field->type == 'textarea')
                                        <x-cards.data-row :label="$field->label" html="true"
                                            :value="$product->custom_fields_data['field_'.$field->id] ?? '--'" />
                                    @elseif($field->type == 'radio')
                                        <x-cards.data-row :label="$field->label"
                                            :value="(!is_null($product->custom_fields_data['field_' . $field->id]) ? $product->custom_fields_data['field_' . $field->id] : '--')" />
                                    @elseif($field->type == 'checkbox')
                                        <x-cards.data-row :label="$field->label"
                                            :value="(!is_null($product->custom_fields_data['field_' . $field->id]) ? $product->custom_fields_data['field_' . $field->id] : '--')" />
                                    @elseif($field->type == 'select')
                                        <x-cards.data-row :label="$field->label"
                                            :value="(!is_null($product->custom_fields_data['field_' . $field->id]) && $product->custom_fields_data['field_' . $field->id] != '' ? $field->values[$product->custom_fields_data['field_' . $field->id]] : '--')" />
                                    @elseif($field->type == 'date')
                                        <x-cards.data-row :label="$field->label"
                                            :value="(!is_null($product->custom_fields_data['field_' . $field->id]) && $product->custom_fields_data['field_' . $field->id] != '' ? \Carbon\Carbon::parse($product->custom_fields_data['field_' . $field->id])->format(global_setting()->date_format) : '--')" />
                                    @endif
                                @endforeach
                            @endif

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    $('body').on('click', '.delete-product', function() {
        var id = $(this).data('product-id');
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
                var url = "{{ route('products.destroy', ':id') }}";
                url = url.replace(':id', id);

                var token = "{{ csrf_token() }}";

                $.easyAjax({
                    type: 'POST',
                    url: url,
                    data: {
                        '_token': token,
                        '_method': 'DELETE'
                    },
                    success: function(response) {
                        if (response.status == "success") {
                            window.location.href = response.redirectUrl;
                        }
                    }
                });
            }
        });
    });

</script>
