<div class="modal-header">
    <h5 class="modal-title">@lang('app.menu.leaves') @lang('app.details')</h5>
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
</div>
<div class="modal-body px-0 pt-0">
    <div id="task-detail-section">
         <!-- TASK TABS START -->
         <div class="bg-additional-grey">

            <div class="s-b-inner s-b-notifications bg-white">

                <x-tab-section class="task-tabs">
                    <x-tab-item class="ajax-tab" :active="(request('view') === 'approved' || !request('view'))"
                        :link="route('leave-report.show', $userId).'?view=approved&startDate='.urlencode($startDate).'&endDate='.urlencode($endDate)">
                        @lang('app.approved')</x-tab-item>
                    <x-tab-item class="ajax-tab" :active="(request('view') === 'pending')"
                        :link="route('leave-report.show', $userId).'?view=pending&startDate='.urlencode($startDate).'&endDate='.urlencode($endDate)">
                        @lang('app.pending')</x-tab-item>
                    <x-tab-item class="ajax-tab" :active="(request('view') === 'upcoming')"
                        :link="route('leave-report.show', $userId).'?view=upcoming&startDate='.urlencode($startDate).'&endDate='.urlencode($endDate)">
                        @lang('app.upcoming')</x-tab-item>
                </x-tab-section>


                <div class="s-b-n-content">
                    <div class="tab-content" id="nav-tabContent">
                        @include('reports.leave.ajax.show')
                    </div>
                </div>
            </div>


        </div>
        <!-- TASK TABS END -->
    </div>
</div>
