@extends('layouts.app')

@push('datatable-styles')
    @include('sections.datatable_css')
@endpush

@section('filter-section')

    <x-filters.filter-box>

        <!-- CATEGORY START -->
        <div class="select-box d-flex py-2 pr-2 border-right-grey border-right-grey-sm-0">
            <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">
                @lang('modules.productCategory.productCategory')</p>
            <div class="select-status d-flex">
                <select class="form-control select-picker" name="category_id" id="category_id">
                    <option value="all">@lang('app.all')</option>
                    @foreach ($categories as $category)
                        <option value="{{ $category->id }}">{{ mb_ucwords($category->category_name) }}</option>
                    @endforeach
                </select>
            </div>
        </div>
        <!-- CATEGORY END -->

        <!-- SUBCATEGORY START -->
        <div class="select-box d-flex py-2 px-lg-2 px-md-2 px-0 border-right-grey border-right-grey-sm-0">
            <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">
                @lang('modules.productCategory.productSubCategory')</p>
            <div class="select-status">
                <select class="form-control select-picker" name="sub_category" id="sub_category">
                    <option selected value="all">@lang('app.all')</option>
                </select>
            </div>
        </div>
        <!-- SUBCATEGORY END -->

        <!-- SEARCH BY TASK START -->
        <div class="task-search d-flex  py-1 px-lg-3 px-0 border-right-grey align-items-center">
            <form class="w-100 mr-1 mr-lg-0 mr-md-1 ml-md-1 ml-0 ml-lg-0">
                <div class="input-group bg-grey rounded">
                    <div class="input-group-prepend">
                        <span class="input-group-text border-0 bg-additional-grey">
                            <i class="fa fa-search f-13 text-dark-grey"></i>
                        </span>
                    </div>
                    <input type="text" class="form-control f-14 p-1 border-additional-grey" id="search-text-field"
                        placeholder="@lang('app.startTyping')">
                </div>
            </form>
        </div>
        <!-- SEARCH BY TASK END -->

        <!-- RESET START -->
        <div class="select-box d-flex py-1 px-lg-2 px-md-2 px-0">
            <x-forms.button-secondary class="btn-xs d-none" id="reset-filters" icon="times-circle">
                @lang('app.clearFilters')
            </x-forms.button-secondary>
        </div>
        <!-- RESET END -->
    </x-filters.filter-box>

@endsection

@php
$addProductPermission = user()->permission('add_product');
$addOrderPermission = user()->permission('add_order');
@endphp

@section('content')
    <!-- CONTENT WRAPPER START -->
    <div class="content-wrapper">
        <!-- Add Task Export Buttons Start -->

        <div class="d-flex justify-content-between action-bar">
            <div id="table-actions" class="flex-grow-1 align-items-center">
                @if ($addProductPermission == 'all' || $addProductPermission == 'added')
                    <x-forms.link-primary :link="route('products.create')" class="mr-3 openRightModal float-left"
                        icon="plus">
                        @lang('app.add')
                        @lang('app.product')
                    </x-forms.link-primary>
                @endif
            </div>

            @if (in_array('client', user_roles()) && $addOrderPermission == 'all')
                <div class="btn-group" role="group">
                    <x-forms.link-primary :link="route('products.cart')" icon="shopping-bag">
                        @lang('app.cart') <span
                            class="badge badge-light ml-2 productCounter">{{ sizeof($productDetails) }}</span>
                    </x-forms.link-primary>
                </div>
            @endif


            @if (!in_array('client', user_roles()))
                <x-datatable.actions>
                    <div class="select-status mr-3 pl-3">
                        <select name="action_type" class="form-control select-picker" id="quick-action-type" disabled>
                            <option value="">@lang('app.selectAction')</option>
                            {{-- <option value="change-status">@lang('modules.tasks.changeStatus')</option> --}}
                            <option value="change-purchase">@lang('app.purchaseAllow')</option>

                            <option value="delete">@lang('app.delete')</option>
                        </select>
                    </div>
                    <div class="select-status mr-3 d-none quick-action-field" id="change-status-action">
                        <select name="status" class="form-control select-picker">
                            <option value="1">@lang('app.allowed')</option>
                            <option value="0">@lang('app.notAllowed')</option>
                        </select>
                    </div>
                </x-datatable.actions>
            @endif
        </div>

        <!-- Add Task Export Buttons End -->
        <!-- Task Box Start -->
        <div class="d-flex flex-column w-tables rounded mt-3 bg-white">

            {!! $dataTable->table(['class' => 'table table-hover border-0 w-100']) !!}

        </div>
        <!-- Task Box End -->
    </div>
    <!-- CONTENT WRAPPER END -->

@endsection

@push('scripts')
    @include('sections.datatable_js')

    <script>
        var subCategories = @json($subCategories);

        $('#category_id').change(function(e) {
            // get projects of selected users
            var opts = '';

            var subCategory = subCategories.filter(function(item) {
                return item.category_id == e.target.value
            });

            subCategory.forEach(project => {
                opts += `<option value='${project.id}'>${project.category_name}</option>`
            })

            $('#sub_category').html('<option value="all">@lang("app.all")</option>' + opts)
            $("#sub_category").selectpicker("refresh");
        });

        $('#products-table').on('preXhr.dt', function(e, settings, data) {
            var categoryID = $('#category_id').val();
            var subCategoryID = $('#sub_category').val();
            var searchText = $('#search-text-field').val();

            data['category_id'] = categoryID;
            data['sub_category_id'] = subCategoryID;
            data['searchText'] = searchText;
        });
        const showTable = () => {
            window.LaravelDataTables["products-table"].draw();
        }

        $('#category_id, #sub_category, #search-text-field').on('change keyup', function() {
            if ($('#category_id').val() != "") {
                $('#reset-filters').removeClass('d-none');
                showTable();
            } else if ($('#sub_category').val() != "") {
                $('#reset-filters').removeClass('d-none');
                showTable();
            } else if ($('#search-text-field').val() != "") {
                $('#reset-filters').removeClass('d-none');
                showTable();
            } else {
                $('#reset-filters').addClass('d-none');
                showTable();
            }
        });

        $('#reset-filters').click(function() {
            $('#filter-form')[0].reset();

            $('#category_id').val('all');
            $('.select-picker').val('all');

            $('#sub_category').html('<option value="all">@lang("app.all")</option>');

            $('.select-picker').selectpicker("refresh");
            $('#reset-filters').addClass('d-none');

            showTable();
        });

        $('#quick-action-type').change(function() {
            const actionValue = $(this).val();
            if (actionValue != '') {
                $('#quick-action-apply').removeAttr('disabled');

                if (actionValue == 'change-purchase') {
                    $('.quick-action-field').addClass('d-none');
                    $('#change-status-action').removeClass('d-none');
                } else {
                    $('.quick-action-field').addClass('d-none');
                }
            } else {
                $('#quick-action-apply').attr('disabled', true);
                $('.quick-action-field').addClass('d-none');
            }
        });

        $('#quick-action-apply').click(function() {
            const actionValue = $('#quick-action-type').val();
            if (actionValue == 'delete') {
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
                        applyQuickAction();
                    }
                });

            } else {
                applyQuickAction();
            }
        });

        const applyQuickAction = () => {
            var rowdIds = $("#products-table input:checkbox:checked").map(function() {
                return $(this).val();
            }).get();

            var url = "{{ route('products.apply_quick_action') }}?row_ids=" + rowdIds;

            $.easyAjax({
                url: url,
                container: '#quick-action-form',
                type: "POST",
                disableButton: true,
                buttonSelector: "#quick-action-apply",
                data: $('#quick-action-form').serialize(),
                success: function(response) {
                    if (response.status == 'success') {
                        showTable();
                        resetActionButtons();
                        deSelectAll();
                    }
                }
            })
        };

        $('body').on('click', '.productView', function() {
            let id = $(this).data('product-id');

            var url = "{{ route('products.show', ':id') }}";
            url = url.replace(':id', id);

            $(MODAL_DEFAULT + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_DEFAULT, url);
        });

        $('body').on('click', '.delete-table-row', function() {
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
                                showTable();
                            }
                        }
                    });
                }
            });
        });

        $('body').on('click', '.add-product', function() {
            let cartItems = [];
            var productId = $(this).data('product-id');
            let url = "{{ route('products.add_cart_item') }}";

            $.easyAjax({
                url: url,
                container: '.content-wrapper',
                type: "POST",
                data: {
                    'productID': productId,
                    '_token': "{{ csrf_token() }}"
                },
                success: function(response) {
                    cartItems = response.productItems;
                    $('.productCounter').html(cartItems.length);
                }
            })

        });

    </script>
@endpush
