@extends('layouts.app')

@section('content')

    <!-- SETTINGS START -->
    <div class="w-100 d-flex ">

        <x-setting-sidebar :activeMenu="$activeSettingMenu" />

        <x-setting-card>
            <x-slot name="header">
                <div class="s-b-n-header" id="tabs">
                    <nav class="tabs px-4 border-bottom-grey">
                        <div class="nav" id="nav-tab" role="tablist">
                            <a class="nav-item nav-link f-15 active sendReminder"
                                href="{{ route('project-settings.index') }}?tab=sendReminder" role="tab"
                                aria-controls="nav-ticketAgents" aria-selected="true">@lang($pageTitle)
                            </a>

                            <a class="nav-item nav-link f-15 status"
                                href="{{ route('project-settings.index') }}?tab=status" role="tab"
                                aria-controls="nav-ticketTypes" aria-selected="true">@lang('modules.logTimeSetting.project') @lang('modules.employees.status') @lang('modules.module.settings')
                            </a>

                        </div>
                    </nav>
                </div>
            </x-slot>

            <x-slot name="buttons">
                <div class="row">

                    <div class="col-md-12 mb-2">
                        <x-forms.button-primary icon="plus" id="add-status" class="shift-btn mb-2 d-none actionBtn">
                            @lang('modules.statusFields.addstatus')
                        </x-forms.button-primary>
                    </div>

                </div>
            </x-slot>


            @include($view)

        </x-setting-card>

    </div>
    <!-- SETTINGS END -->
@endsection

@push('scripts')
    <script>

        $('.nav-item').removeClass('active');
        const activeTab = "{{ $activeTab }}";
        $('.' + activeTab).addClass('active');

        showBtn(activeTab);

        function showBtn(activeTab) {
            $('.actionBtn').addClass('d-none');
            $('.' + activeTab + '-btn').removeClass('d-none');
        }
    </script>
@endpush
