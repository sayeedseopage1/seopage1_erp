<div class="container-fluid">
    <div class="row">
        <div class="col-md-12">
            <div class="card mt-3 p-3" style="border: none">
                <div class="card-title">
                    <h3>Goal Details</h3>
                </div>
                <x-table class="border-0 pb-3 admin-dash-table table-hover">
                    <x-slot name="thead">
                        @if(Auth::user()->role_id != 4 )
                        <th class="pl-20">#</th>
                        <th>@lang('Goal Start Date')</th>
                        <th>@lang('Goal Deadline')</th>
                        <th>@lang('Duration')</th>
                        <th>@lang('Description')</th>
                        <th>@lang('Reason')</th>
                        <th>@lang('Suggestion')</th>
                        <th>@lang('Rating')</th>
                        <th>@lang('Comment')</th>
                        <th>@lang('Action')</th>
                        @else
                        <th class="pl-20">#</th>
                        <th>@lang('Goal Start Date')</th>
                        <th>@lang('Goal Deadline')</th>
                        <th>@lang('Duration')</th>
                        <th>@lang('Reason')</th>
                        <th>@lang('Suggestion')</th>
                        <th>@lang('Action')</th>
                        @endif
                    </x-slot>

                    @forelse ($project_pm_goals as $key=>$item)
                        @if (Auth::user()->role_id == 1 || Auth::user()->role_id == 8)
                            <tr>
                                <td>{{ $key + 1 }}</td>
                                <td>{{ $item->goal_start_date }}</td>
                                <td>{{ $item->goal_end_date }}</td>
                                <td>{{ ($item->duration). ' Days' }}</td>
                                <td>{{ $item->description ? :'--' }}</td>
                                <td>
                                    @if($item->reason != null)
                                    <a href="#" data-toggle="modal" data-target="#reasonview">View</a>
                                    @else
                                    --
                                    @endif
                                </td>
                                <td>
                                    @if($item->suggestion != null)
                                    <a href="#" data-toggle="modal" data-target="#suggestionview">View</a>
                                    @else
                                    --
                                    @endif
                                </td>
                                <td>{{ $item->rating ? : '--' }}</td>
                                <td>
                                    @if($item->admin_comment != null)
                                    <a href="#" data-toggle="modal" data-target="#admincomment">View</a>
                                    @else
                                    --
                                    @endif
                                </td>
                                <td>
                                    @if ($item->reason_status == 1)
                                    <a href="#" data-toggle="modal" data-target="#resolve{{$item->project_id}}">Resolve</a>
                                    @endif
                                    @if ($item->reason_status == 2)
                                    <button type="button" class="btn btn-success">Resolved</button>
                                    @endif
                                </td>
                            </tr>
                        @endif
                        @if (Auth::user()->role_id == 4)
                            <tr>
                                <td>{{ $key + 1 }}</td>
                                <td>{{ $item->goal_start_date }}</td>
                                <td>{{ $item->goal_end_date }}</td>
                                <td>{{ ($item->duration). ' Days' }}</td>
                                <td>
                                    @if($item->reason != null)
                                    <a href="#" data-toggle="modal" data-target="#reasonview">View</a>
                                    @else
                                    --
                                    @endif
                                </td>
                                <td>
                                    @if($item->suggestion != null)
                                    <a href="#" data-toggle="modal" data-target="#suggestionview">View</a>
                                    @else
                                    --
                                    @endif
                                </td>
                                <td>
                                    @php
                                        $current_date = \Carbon\Carbon::now();
                                    @endphp
                                    @if ($item->reason_status == 0 && ($current_date > $item->goal_end_date) && $item->goal_status == 0)
                                    <a href="#" data-toggle="modal" data-target="#deadlineExplanation{{$item->project_id}}">Deadline Explanation</a>
                                    @else
                                    N\A
                                    @endif
                                </td>
                            </tr>
                        @endif
                    @empty
                        <tr>
                            <td colspan="7">
                                <x-cards.no-record icon="tasks" :message="__('messages.noRecordFound')" />
                            </td>
                        </tr>
                    @endforelse
                </x-table>
                @include('project-status.modal.deadline_exp')
                @include('project-status.modal.resolve_modal')
                @include('project-status.modal.reason_view')
                @include('project-status.modal.suggestion_view')
                @include('project-status.modal.admin_comment_view')
            </div>
        </div>
    </div>
</div>
