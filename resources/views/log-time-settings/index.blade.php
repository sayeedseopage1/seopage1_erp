@extends('layouts.app')

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
                <x-form id="editSettings" method="POST" class="ajax-form">
                    <div class="row">
                        <div class="col-lg-6 mb-2">
                            <x-forms.toggle-switch :fieldLabel="__('modules.logTimeSetting.autoStopTimerAfterOfficeTime')"
                                fieldName="auto_timer_stop" fieldId="auto_timer_stop" fieldValue="yes"
                                :checked="$logTime->auto_timer_stop == 'yes'" />
                        </div>
                        <div class="col-lg-6 mb-2">
                            <x-forms.toggle-switch :fieldLabel="__('modules.logTimeSetting.approvalRequired')"
                                fieldName="approval_required" fieldId="approval_required" fieldValue="true"
                                :checked="$logTime->approval_required" />
                        </div>
                    </div>
                </x-form>
            </div>

        </x-setting-card>

    </div>
    <!-- SETTINGS END -->
@endsection

@push('scripts')
    <script>
        $('#auto_timer_stop').click(function() {
            var auto_timer_stop = 'no';
            if ($(this).prop("checked") == true) {
                auto_timer_stop = 'yes';
            }
            $.easyAjax({
                url: "{{ route('timelog-settings.store') }}",
                type: "POST",
                data: {
                    '_token': '{{ csrf_token() }}',
                    'auto_timer_stop': auto_timer_stop
                }
            })
        });

        $('#approval_required').click(function() {
            var approval_required = '0';
            if ($(this).prop("checked") == true) {
                approval_required = '1';
            }
            $.easyAjax({
                url: "{{ route('timelog-settings.store') }}",
                type: "POST",
                data: {
                    '_token': '{{ csrf_token() }}',
                    'approval_required': approval_required
                }
            })
        });
    </script>
@endpush
