<div class="d-flex justify-content-between">
    <div>
        <div class="row">
            <div class="select-status col">
                <select class="form-control select-picker" name="year" id="change-year" data-size="8">
                    @for ($i = $year+1; $i >= $year - 4; $i--)
                        <option @if ($i == $year) selected @endif value="{{ $i }}">
                            {{ $i }}</option>
                    @endfor
                </select>
            </div>
            <div class="select-status col d-lg-none">
                <select class="form-control select-picker" name="month" id="change-month" data-live-search="true" data-size="8">
                    <option @if ($month == '01') selected @endif value="01">
                        @lang('app.january')</option>
                    <option @if ($month == '02') selected @endif value="02">
                        @lang('app.february')</option>
                    <option @if ($month == '03') selected @endif value="03">
                        @lang('app.march')</option>
                    <option @if ($month == '04') selected @endif value="04">
                        @lang('app.april')</option>
                    <option @if ($month == '05') selected @endif value="05">
                        @lang('app.may')</option>
                    <option @if ($month == '06') selected @endif value="06">
                        @lang('app.june')</option>
                    <option @if ($month == '07') selected @endif value="07">
                        @lang('app.july')</option>
                    <option @if ($month == '08') selected @endif value="08">
                        @lang('app.august')</option>
                    <option @if ($month == '09') selected @endif value="09">
                        @lang('app.september')</option>
                    <option @if ($month == '10') selected @endif value="10">
                        @lang('app.october')</option>
                    <option @if ($month == '11') selected @endif value="11">
                        @lang('app.november')</option>
                    <option @if ($month == '12') selected @endif value="12">
                        @lang('app.december')</option>
                </select>
            </div>

            <button class="f-12 p-2 px-3 bg-white col change-month d-none d-lg-block {{ $month == '01' ? 'btn-primary rounded' : '' }}" type="button" data-month="01">@lang('app.monthsShort.Jan')</button>
            <button class="f-12 p-2 px-3 bg-white col change-month d-none d-lg-block {{ $month == '02' ? 'btn-primary rounded' : '' }}" type="button" data-month="02">@lang('app.monthsShort.Feb')</button>
            <button class="f-12 p-2 px-3 bg-white col change-month d-none d-lg-block {{ $month == '03' ? 'btn-primary rounded' : '' }}" type="button" data-month="03">@lang('app.monthsShort.Mar')</button>
            <button class="f-12 p-2 px-3 bg-white col change-month d-none d-lg-block {{ $month == '04' ? 'btn-primary rounded' : '' }}" type="button" data-month="04">@lang('app.monthsShort.Apr')</button>
            <button class="f-12 p-2 px-3 bg-white col change-month d-none d-lg-block {{ $month == '05' ? 'btn-primary rounded' : '' }}" type="button" data-month="05">@lang('app.monthsShort.May')</button>
            <button class="f-12 p-2 px-3 bg-white col change-month d-none d-lg-block {{ $month == '06' ? 'btn-primary rounded' : '' }}" type="button" data-month="06">@lang('app.monthsShort.Jun')</button>
            <button class="f-12 p-2 px-3 bg-white col change-month d-none d-lg-block {{ $month == '07' ? 'btn-primary rounded' : '' }}" type="button" data-month="07">@lang('app.monthsShort.Jul')</button>
            <button class="f-12 p-2 px-3 bg-white col change-month d-none d-lg-block {{ $month == '08' ? 'btn-primary rounded' : '' }}" type="button" data-month="08">@lang('app.monthsShort.Aug')</button>
            <button class="f-12 p-2 px-3 bg-white col change-month d-none d-lg-block {{ $month == '09' ? 'btn-primary rounded' : '' }}" type="button" data-month="09">@lang('app.monthsShort.Sep')</button>
            <button class="f-12 p-2 px-3 bg-white col change-month d-none d-lg-block {{ $month == '10' ? 'btn-primary rounded' : '' }}" type="button" data-month="10">@lang('app.monthsShort.Oct')</button>
            <button class="f-12 p-2 px-3 bg-white col change-month d-none d-lg-block {{ $month == '11' ? 'btn-primary rounded' : '' }}" type="button" data-month="11">@lang('app.monthsShort.Nov')</button>
            <button class="f-12 p-2 px-3 bg-white col change-month d-none d-lg-block {{ $month == '12' ? 'btn-primary rounded' : '' }}" type="button" data-month="12">@lang('app.monthsShort.Dec')</button>
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
            @for ($i = 1; $i <= $daysInMonth; $i++)
                <th class="px-1">{{ $i }} <br> <span class="text-lightest f-11 text-uppercase">{{ $weekMap[\Carbon\Carbon::parse(\Carbon\Carbon::parse($i . '-' . $month . '-' . $year))->dayOfWeek] }}</span></th>
            @endfor
        </x-slot>

        @foreach ($employeeAttendence as $key => $attendance)
            @php
                $userId = explode('#', $key);
                $userId = $userId[0];
            @endphp
            <tr>
                <td class="px-1"> {!! end($attendance) !!} </td>
                @foreach ($attendance as $key2 => $day)
                    @if ($key2 + 1 <= count($attendance))
                        @php
                            $attendanceDate = \Carbon\Carbon::parse($year.'-'.$month.'-'.$key2);
                        @endphp
                        <td class="px-1">
                            @if ($day == 'Leave')
                            <span data-toggle="tooltip" data-original-title="@lang('modules.attendance.leave')"><i
                                    class="fa fa-plane-departure text-red"></i></span>
                        @elseif ($day == 'Half Day')
                            @if ($attendanceDate->isFuture())
                                <span data-toggle="tooltip" data-original-title="@lang('modules.attendance.halfDay')"><i
                                    class="fa fa-star-half-alt text-red"></i></span>                        
                            @else
                                <a href="javascript:;" class="change-shift" data-user-id="{{ $userId }}"
                                        data-attendance-date="{{ $key2 }}">
                                    <span data-toggle="tooltip" data-original-title="@lang('modules.attendance.halfDay')"><i
                                            class="fa fa-star-half-alt text-red"></i></span>
                                </a>
                            @endif
                            @elseif ($day == 'EMPTY')
                                <button type="button" class="change-shift badge badge-light f-10 p-1 border"  data-user-id="{{ $userId }}"
                                    data-attendance-date="{{ $key2 }}"><i class="fa fa-plus"></i></button>
                            @elseif ($day == 'Holiday')
                                <a href="javascript:;" data-toggle="tooltip" class="change-shift"
                                    data-original-title="{{ $holidayOccasions[$key2] }}"
                                    data-user-id="{{ $userId }}" data-attendance-date="{{ $key2 }}"><i
                                        class="fa fa-star text-primary"></i></a>
                            @else
                                {!! $day !!}
                            @endif
                        </td>
                    @endif
                @endforeach
            </tr>
        @endforeach
    </x-table>
</div>
