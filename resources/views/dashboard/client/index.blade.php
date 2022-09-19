@extends('layouts.app')

@push('styles')
    <script src="{{ asset('vendor/jquery/frappe-charts.min.iife.js') }}"></script>
    <script src="{{ asset('vendor/jquery/Chart.min.js') }}"></script>
@endpush

@section('content')
    <!-- CONTENT WRAPPER START -->
    <div class="px-4 py-0 py-lg-4  border-top-0 admin-dashboard">
        <div class="row">
            @if (in_array('projects', $modules))
                <div class="col-xl-4 col-lg-6 col-md-6 mb-4">
                    <a href="{{ route('projects.index') }}?status=all">
                        <x-cards.widget :title="__('modules.dashboard.totalProjects')" :value="$counts->totalProjects"
                            icon="layer-group" />
                    </a>
                </div>
            @endif

            @if (in_array('tickets', $modules))
                <div class="col-xl-4 col-lg-6 col-md-6 mb-4">
                    <a href="{{ route('tickets.index') }}">
                        <x-cards.widget :title="__('modules.dashboard.totalUnresolvedTickets')"
                            :value="floor($counts->totalUnResolvedTickets)" icon="ticket-alt" />
                    </a>
                </div>
            @endif

            @if (in_array('contracts', $modules))
                <div class="col-xl-4 col-lg-6 col-md-6 mb-4">
                    <a href="{{ route('contracts.index') }}?signed=yes">
                        <x-cards.widget :title="__('modules.dashboard.totalContractsSigned')" :value="$totalContractsSigned"
                            icon="file-signature" />
                    </a>
                </div>
            @endif

            @if (in_array('invoices', $modules))
                <div class="col-xl-4 col-lg-6 col-md-6">
                    <div
                        class="bg-white p-3 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                        <div class="d-block text-capitalize">
                            <h5 class="f-13 f-w-500 mb-20 text-darkest-grey">@lang('app.menu.invoices')</h5>
                            <div class="d-flex">
                                <a href="{{ route('invoices.index') . '?status=paid' }}">
                                    <p class="mb-0 f-15 font-weight-bold text-blue d-grid mr-5">
                                        {{ $totalPaidInvoice }}<span class="f-12 font-weight-normal text-lightest">
                                            @lang('modules.dashboard.totalPaidInvoices') </span>
                                    </p>
                                </a>

                                <a href="{{ route('invoices.index') . '?status=pending' }}">
                                    <p class="mb-0 f-15 font-weight-bold text-red d-grid">
                                        {{ $totalUnPaidInvoice }}<span
                                            class="f-12 font-weight-normal text-lightest">@lang('modules.dashboard.totalUnpaidInvoices')</span>
                                    </p>
                                </a>
                            </div>
                        </div>
                        <div class="d-block">
                            <i class="fa fa-file-invoice text-lightest f-18"></i>
                        </div>
                    </div>
                </div>
            @endif


        </div>

        <div class="row">
            @if (in_array('projects', $modules))
                <div class="col-sm-12 col-lg-6 mt-4">
                    <x-cards.data :title="__('modules.dashboard.statusWiseProject')">
                        <x-pie-chart id="task-chart" :labels="$statusWiseProject['labels']"
                            :values="$statusWiseProject['values']" :colors="$statusWiseProject['colors']" height="250"
                            width="300" />
                    </x-cards.data>
                </div>
            @endif

            @if (in_array('projects', $modules))
                <div class="col-sm-12 col-lg-6 mt-4">
                    <x-cards.data :title="__('modules.dashboard.pendingMilestone')" padding="false" otherClasses="h-200">
                        <div class="table-responsive">
                            <x-table class="border-0 pb-3 admin-dash-table table-hover">

                                <x-slot name="thead">
                                    <th class="pl-20">#</th>
                                    <th>@lang('modules.projects.milestoneTitle')</th>
                                    <th>@lang('modules.projects.milestoneCost')</th>
                                    <th>@lang('app.project')</th>
                                </x-slot>

                                @forelse($pendingMilestone as $key=>$item)
                                    <tr id="row-{{ $item->id }}">
                                        <td class="pl-20">{{ $key + 1 }}</td>
                                        <td>
                                            <a href="javascript:;" class="milestone-detail text-darkest-grey f-w-500"
                                                data-milestone-id="{{ $item->id }}">{{ ucfirst($item->milestone_title) }}</a>
                                        </td>
                                        <td>
                                            @if (!is_null($item->currency_id))
                                                {{ $item->currency->currency_symbol . $item->cost }}
                                            @else
                                                {{ $item->cost }}
                                            @endif
                                        </td>
                                        <td>
                                            <a href="{{ route('projects.show', [$item->project_id]) }}"
                                                class="text-darkest-grey">{{ $item->project->project_name }}</a>
                                        </td>
                                    </tr>
                                @empty
                                    <tr>
                                        <td colspan="5">
                                            <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
                                        </td>
                                    </tr>
                                @endforelse
                            </x-table>
                        </div>
                    </x-cards.data>
                </div>
            @endif

        </div>

    </div>
    <!-- CONTENT WRAPPER END -->
@endsection

@push('scripts')
    <script>
        $('body').on('click', '.milestone-detail', function() {
            var id = $(this).data('milestone-id');
            var url = "{{ route('milestones.show', ':id') }}";
            url = url.replace(':id', id);
            $(MODAL_XL + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_XL, url);
        });
    </script>

@endpush
