@extends('layouts.app')

@push('styles')

@endpush

@section('content')

    <!-- SETTINGS START -->
    <div class="w-100 d-flex ">

        <x-setting-sidebar :activeMenu="$activeSettingMenu" />

        <x-setting-card>

            <x-slot name="buttons">
                <div class="row">
                    <div class="col-md-12 mb-2">
                        <x-forms.button-primary icon="plus" id="add-language" class="mb-2 mr-2"> @lang('app.addNew') @lang('app.language')
                        </x-forms.button-primary>
                        <x-forms.button-secondary icon="cog" id="translations" class="mb-2 mr-2"> @lang('modules.languageSettings.translate')
                        </x-forms.button-secondary>
                        <x-forms.button-secondary icon="cog" id="autoTranslate" class="mb-2"> @lang('modules.languageSettings.autoTranslate')
                        </x-forms.button-secondary>
                    </div>
                </div>
            </x-slot>

            <x-slot name="header">

                <div class="s-b-n-header" id="tabs">

                    <h2 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                        @lang($pageTitle)

                    </h2>


                </div>
            </x-slot>


            <!-- LEAVE SETTING START -->
            <div class="col-lg-12 col-md-12 ntfcn-tab-content-left w-100">

                <div class="mt-2  alert alert-primary mb-2">

                    <div><strong>Note:</strong>
                        {{__('messages.languageEnabledAlertMessage')}}
                    </div>
                </div>

                    <x-table class="table table-sm-responsive">
                        <x-slot name="thead">
                            <th>@lang('app.language') @lang('app.name')</th>
                            <th>@lang('app.language') @lang('app.code')</th>
                            <th>@lang('app.status')</th>
                            <th class="text-right">@lang('app.action')</th>
                        </x-slot>

                        @forelse($languages as $language)
                            @if ($language->language_code != 'en')
                                    <tr id="languageRow{{ $language->id }}">
                                        <td>{{ mb_ucwords($language->language_name) }}</td>
                                        <td>{{ mb_strtoupper($language->language_code) }}</td>
                                        <td>
                                            <div class="custom-control custom-switch">
                                                <input type="checkbox" @if($language->status == 'enabled') checked
                                                        @endif class="custom-control-input change-language-setting"
                                                    id="{{ $language->id }}">
                                                <label class="custom-control-label cursor-pointer f-14" for="{{ $language->id }}"></label>
                                            </div>
                                        </td>
                                        <td class="text-right">
                                            @if (global_setting()->locale != $language->language_code)
                                                <div class="task_view">
                                                    <a href="javascript:;" data-language-id="{{ $language->id }}"
                                                    class="edit-language task_view_more d-flex align-items-center justify-content-center" >
                                                        <i class="fa fa-edit icons mr-2"></i>  @lang('app.edit')
                                                    </a>
                                                </div>
                                                <div class="task_view mt-1 mt-lg-0 mt-md-0">
                                                    <a href="javascript:;" data-language-id="{{ $language->id }}"
                                                    class="delete-language task_view_more d-flex align-items-center justify-content-center">
                                                        <i class="fa fa-trash icons mr-2"></i> @lang('app.delete')
                                                    </a>
                                                </div>
                                            @else
                                                @lang('messages.defaultLanguageCantChange')
                                            @endif
                                        </td>
                                    </tr>
                                @endif
                            @empty
                                <tr>
                                    <td colspan="4">
                                        <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
                                    </td>
                                </tr>
                        @endforelse

                    </x-table>

            </div>
            <!-- LEAVE SETTING END -->

        </x-setting-card>

    </div>
    <!-- SETTINGS END -->

@endsection

@push('scripts')

<script>

    $('body').on('click', '#translations', function() {
        const url = "{{ url('/translations') }}";

        window.open(url, '_blank');
    });


    $('body').on('click', '#add-language', function() {
        var url = "{{ route('language-settings.create')}}";
        $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
        $.ajaxModal(MODAL_LG, url);
    });

    $('body').on('click', '#autoTranslate', function() {
        var url = "{{ route('language_settings.auto_translate')}}";
        $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
        $.ajaxModal(MODAL_LG, url);
    });

    $('body').on('click', '.edit-language', function() {
        var id = $(this).data('language-id');
        var url = "{{ route('language-settings.edit',':id') }}";
        url = url.replace(':id', id);
        $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
        $.ajaxModal(MODAL_LG, url);
    });

    $('.change-language-setting').change(function () {
        var id = this.id;

        if ($(this).is(':checked'))
            var status = 'enabled';
        else
            var status = 'disabled';

        var url = "{{route('language-settings.update', ':id')}}";
        url = url.replace(':id', id);
        $.easyAjax({
            url: url,
            type: "POST",
            blockUI: true,
            data: {'id': id, 'status': status, '_method': 'PUT', '_token': '{{ csrf_token() }}'}
        })
    });

    $('body').on('click', '.delete-language', function(){
        var id = $(this).data('language-id');
        Swal.fire({
            title: "@lang('messages.sweetAlertTitle')",
            text: "@lang('messages.deleteField')",
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

                var url = "{{ route('language-settings.destroy',':id') }}";
                url = url.replace(':id', id);

                var token = "{{ csrf_token() }}";

                $.easyAjax({
                    type: 'POST',
                    url: url,
                    data: {'_token': token, '_method': 'DELETE'},
                    blockUI: true,
                    success: function (response) {
                        if (response.status == "success") {
                            $.unblockUI();
                            $('#languageRow'+id).fadeOut();
                        }
                    }
                });
            }
        });
    });

</script>
@endpush
