<div class="d-flex justify-content-between">
    <div>
        <div class='input-group'>
            <div class="input-group-prepend">
                <button id="week-start-date" data-date="{{ $weekStartDate->copy()->subDay()->toDateString() }}" type="button" 
                    class="btn btn-outline-secondary border-grey height-35"><i class="fa fa-chevron-left"></i>
                </button>
            </div>
        
            <input type="text" disabled class="form-control height-35 f-14 bg-white text-center" value="{{ $weekStartDate->format('d M') . ' - ' . $weekEndDate->format('d M') }}">
                
            <div class="input-group-append">
                <button id="week-end-date" data-date="{{ $weekEndDate->copy()->addDay()->toDateString() }}" type="button" 
                    class="btn btn-outline-secondary border-grey height-35"><i class="fa fa-chevron-right"></i>
                </button>
            </div>
        </div>
        
    </div>
    <div class="align-self-center">
        @foreach ($employeeShifts as $item)
            <span class="badge badge-info f-11 p-1" style="background-color: {{ $item->color }}">
                {{ $item->shift_short_code }} : {{ $item->shift_name }}</span>
            {{ !$loop->last ? ' | ' : '' }}
        @endforeach
       | <i class="fa fa-star text-primary"></i> : @lang('app.menu.holiday')
    </div>
</div>


<div class="table-responsive">
    <x-table class="table-bordered mt-3 table-hover" headType="thead-light">
        <x-slot name="thead">
            <th class="px-2" style="vertical-align: middle;">@lang('app.employee')</th>
            @foreach ($weekPeriod->toArray() as $date)
                <th class="px-1">
                    <div class="d-flex">
                        <div class="f-27 align-self-center mr-2">{{ $date->day }}</div>
                        <div class="text-lightest f-11 text-uppercase">{{ $date->format('l') }} <br>{{ $date->format('M') }}</div>
                    </div>
                </th>
            @endforeach
        </x-slot>

        @foreach ($employeeAttendence as $key => $attendance)
            @php
                $userId = explode('#', $key);
                $userId = $userId[0];
                $count = 1;
            @endphp
            <tr>
                <td class="px-1"> {!! end($attendance) !!} </td>
                @foreach ($attendance as $key2 => $day)
                    @if ($count + 1 <= count($attendance))
                        @php
                            $attendanceDate = \Carbon\Carbon::parse($key2);
                        @endphp
                        <td class="px-1">
                            @if ($day == 'Leave')
                                <div data-toggle="tooltip" class="py-4 badge badge-light f-10 p-1 border border-danger w-100" data-original-title="@lang('modules.attendance.leave')"><i
                                        class="fa fa-plane-departure text-red mr-2"></i>{{ $leaveType[$key2] }}</div>
                                @elseif ($day == 'Half Day')
                                    @if ($attendanceDate->isFuture())
                                        <div data-toggle="tooltip" class="py-4 badge badge-warning f-10 p-1 border border-danger w-100" data-original-title="@lang('modules.attendance.halfDay')"><i
                                            class="fa fa-star-half-alt text-red mr-2"></i>@lang('modules.attendance.halfDay')</div>                        
                                    @else
                                        <a href="javascript:;" class="py-4 change-shift-week w-100" data-user-id="{{ $userId }}"
                                                data-attendance-date="{{ $key2 }}">
                                            <span data-toggle="tooltip" data-original-title="@lang('modules.attendance.halfDay')"><i
                                                    class="fa fa-star-half-alt text-red mr-2"></i>@lang('modules.attendance.halfDay')</span>
                                        </a>
                                    @endif
                                @elseif ($day == 'EMPTY')
                                    <button type="button" class="py-4 change-shift-week badge badge-light f-14 p-1 border w-100"  data-user-id="{{ $userId }}"
                                        data-attendance-date="{{ $key2 }}"><i class="fa fa-plus-circle"></i></button>
                                @elseif ($day == 'Holiday')
                                    <a href="javascript:;" data-toggle="tooltip" class="change-shift-week py-4 badge badge-light f-10 p-1 border border-primary w-100"
                                        data-original-title="{{ $holidayOccasions[$key2] }}"
                                        data-user-id="{{ $userId }}" data-attendance-date="{{ $key2 }}"><i
                                            class="fa fa-star text-primary"></i>
                                            {{ $holidayOccasions[$key2] }}
                                        </a>
                            @else
                                {!! $day !!}
                            @endif
                        </td>
                    @endif
                    @php
                        $count++;
                    @endphp
                @endforeach
            </tr>
        @endforeach
    </x-table>
</div>
