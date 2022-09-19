@extends('layouts.app')

@php
$deleteKnowledgebasePermission = user()->permission('delete_knowledgebase');
$editKnowledgebasePermission = user()->permission('edit_knowledgebase');
$addknowledgebasePermission = user()->permission('add_knowledgebase');
@endphp

@section('content')
    <!-- SETTINGS START -->
    <div class="w-100 d-flex ">

        <!-- SETTINGS SIDEBAR START -->
        <div class="mobile-close-overlay w-100 h-100" id="close-settings-overlay"></div>
        <div class="settings-sidebar bg-white py-3" id="mob-settings-sidebar">
            <a class="d-block d-lg-none close-it" id="close-settings"><i class="fa fa-times"></i></a>

            <!-- SETTINGS SEARCH START -->
            <form class="border-bottom-grey px-4 pb-3 d-flex">
                <div class="input-group rounded py-1 border-grey">
                    <div class="input-group-prepend">
                        <span class="input-group-text border-0 bg-white">
                            <i class="fa fa-search f-12 text-lightest"></i>
                        </span>
                    </div>
                    <input type="text" id="search-setting-menu" class="form-control border-0 f-14 pl-0"
                        placeholder="@lang('app.search')">
                </div>
            </form>
            <!-- SETTINGS SEARCH END -->

            <!-- SETTINGS MENU START -->
            <ul class="settings-menu" id="settingsMenu">

                <x-setting-menu-item :active="$activeMenu" menu="all_category" :href="route('knowledgebase.index')" :text="__('app.all')" />

                @foreach ($categories as $item)
                    <x-setting-menu-item :active="$activeMenu" :menu="strtolower(str_replace(' ', '_', $item->name))" :href="route('knowledgebase.index') . '?id=' . $item->id" :text="$item->name" />
                @endforeach

            </ul>
            <!-- SETTINGS MENU END -->

        </div>
        <!-- SETTINGS SIDEBAR END -->

        <x-setting-card>

            <x-slot name="buttons">
                <form action="" id="filter-form">
                    <div class="d-flex justify-conten mb-2">

                        @if ($addknowledgebasePermission == 'all')
                            <div class="form-group flex-grow-1">
                                <x-forms.link-primary :link="route('knowledgebase.create') . '?category=' . request('id')" class="mb-2 openRightModal" icon="plus">
                                    @lang('modules.knowledgeBase.addknowledgebase')
                                </x-forms.link-primary>
                            </div>
                        @endif

                        <div class="form-group">
                            <div class="input-group bg-grey rounded border">
                                <div class="input-group-prepend">
                                    <span class="input-group-text border-0">
                                        <i class="fa fa-search f-13 text-dark-grey"></i>
                                    </span>
                                </div>
                                <input type="text" class="form-control height-35 f-14 p-1 border-additional-grey"
                                    id="search-text-field" placeholder="@lang('app.startTyping')">
                            </div>
                        </div>
                        <x-forms.button-secondary class="btn-xs d-none height-35 ml-2" id="reset-filters"
                            icon="times-circle">
                            @lang('app.clearFilters')
                        </x-forms.button-secondary>


                    </div>
                </form>
            </x-slot>

            <x-slot name="header">
                <div class="s-b-n-header" id="tabs">
                    <h2 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                        @lang($pageTitle)</h2>
                </div>
            </x-slot>

            <div class="col-lg-12 col-md-12 ntfcn-tab-content-left w-100 p-4 ">
                <div class="table-responsive" id="know_data">
                    <x-table class="table-bordered">
                        <x-slot name="thead">
                            <th>#</th>
                            <th>@lang('modules.knowledgeBase.knowledgeHeading')</th>
                            <th>@lang('modules.knowledgeBase.knowledgeCategory')</th>
                            <th>@lang('app.to')</th>
                            <th class="text-right">@lang('app.action')</th>
                        </x-slot>

                        @forelse ($knowledgebases as $key => $item)
                            <tr>
                                <td>{{ $key + 1 }}</td>
                                <td>
                                    <a href="{{ route('knowledgebase.show', $item->id) }}"
                                        class="openRightModal text-darkest-grey d-block">{{ $item->heading }}</a>
                                </td>
                                <td>{{ ucfirst($item->knowledgebasecategory->name) }}</td>
                                <td>{{ ucfirst($item->to) }}</td>
                                <td class="text-right">
                                    @if ($editKnowledgebasePermission == 'all' || ($editKnowledgebasePermission == 'added' && $item->added_by == user()->id))
                                        <div class="task_view">
                                            <a href="{{ route('knowledgebase.edit', $item->id) }}"
                                                class="task_view_more d-flex align-items-center justify-content-center openRightModal">
                                                <i class="fa fa-edit icons mr-2"></i> @lang('app.edit')
                                            </a>
                                        </div>
                                    @endif
                                    @if ($deleteKnowledgebasePermission == 'all' || ($deleteKnowledgebasePermission == 'added' && $item->added_by == user()->id))
                                        <div class="task_view ml-2">
                                            <a href="javascript:;" data-article-id="{{ $item->id }}"
                                                class="task_view_more d-flex align-items-center justify-content-center delete-article">
                                                <i class="fa fa-trash icons mr-2"></i> @lang('app.delete')
                                            </a>
                                        </div>
                                    @endif
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="4">
                                    <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
                                </td>
                            </tr>
                        @endforelse
                    </x-table>
                </div>
            </div>
        </x-setting-card>

    </div>
    <!-- SETTINGS END -->
@endsection
@push('scripts')
    <script>
        $('#search-text-field').on('change keyup', function() {
            if ($('#search-text-field').val() != "") {
                $('#reset-filters').removeClass('d-none');
            } else {
                $('#reset-filters').addClass('d-none');
            }
        });

        $('#reset-filters').click(function() {
            $('#filter-form')[0].reset();
            $('.select-picker').val('all');

            $('.select-picker').selectpicker("refresh");
            $('#reset-filters').addClass('d-none');

            showSearchData();
        });

        $('#quick-action-type').change(function() {
            const actionValue = $(this).val();
            if (actionValue != '') {
                $('#quick-action-apply').removeAttr('disabled');
            } else {
                $('#quick-action-apply').attr('disabled', true);
            }
        });

        function showSearchData() {
            var srch = $('#search-text-field').val();
            var url = "{{ route('knowledgebase.searchQuery', ':query') }}";
            url = url.replace(':query', srch);

            var token = "{{ csrf_token() }}";
            var categoryId = "{{ request()->id }}";

            $.easyAjax({
                type: 'GET',
                url: url,
                data: {
                    '_token': token,
                    'categoryId': categoryId
                },
                success: function(response) {
                    if (response.status == "success") {
                        $("#know_data").html(response.html);
                    }
                }
            });
        }

        $('#search-text-field').on('change keyup', function() {
            showSearchData();
        });


        $("#search-setting-menu").on("keyup", function() {
            var value = this.value.toLowerCase().trim();
            $("#settingsMenu li").show().filter(function() {
                return $(this).text().toLowerCase().trim().indexOf(value) == -1;
            }).hide();
        });

        $('body').on('click', '.delete-article', function() {
            var articleId = $(this).data('article-id');

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
                    var url = "{{ route('knowledgebase.destroy', ':id') }}";
                    url = url.replace(':id', articleId)

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
                                window.location.reload();
                            }
                        }
                    });
                }
            });
        });

        $('#reset-filters').click(function() {
            $('#filter-form')[0].reset();
            $('.select-picker').val('all');

            $('.select-picker').selectpicker("refresh");
            $('#reset-filters').addClass('d-none');

            showSearchData();
        });
    </script>
@endpush
