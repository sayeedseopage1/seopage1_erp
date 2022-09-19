@if (\Carbon\Carbon::now()->diffInHours(global_setting()->last_cron_run) > 48 && !is_null(global_setting()->last_cron_run))
    <div class="col-md-12 cursor-pointer">
        <x-alert type="danger" icon="exclamation-circle" data-toggle="modal" data-target="#cronJobModal">
            @lang('messages.cronIsNotRunning').
        </x-alert>
    </div>
    <div id="cronJobModal" class="modal fade overflow-auto" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog d-flex justify-content-center align-items-center modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modelHeading">CRON JOB SETTING</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">×</span></button>
                </div>
                <div class="modal-body">
                    @include('app-settings.cron-message')
                </div>
                <div class="modal-footer">
                    <x-forms.button-cancel
                        data-dismiss="modal"
                        class="border-0 mr-3">@lang('app.cancel')
                    </x-forms.button-cancel>
                </div>

            </div>
        </div>
    </div>
@endif



