<?php

namespace App\Exports;

use Carbon\Carbon;
use App\Models\Leave;
use App\Models\Holiday;
use Carbon\CarbonPeriod;
use App\Models\Attendance;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\FromCollection;

class AttendanceByMemberExport implements FromCollection, WithHeadings, WithEvents, WithMapping
{
    use Exportable;
    public static $sum;

    public function __construct($year, $month, $id, $empname, $startdate, $enddate)
    {
        $this->year = $year;
        $this->month = $month;
        $this->userId = $id;
        $this->empname = $empname;
        $this->startdate = $startdate;
        $this->enddate = $enddate;
        $this->date = $this->enddate->lessThan(Carbon::now()) ? $this->enddate : now();
    }

    public function headings(): array
    {
        return [
            [__('app.attendanceof'). $this->empname.'_'.__('app.from').'_'.$this->startdate->format('d-m-Y').'_'.__('app.to').'_'.$this->date->format('d-m-Y')],
            [],
            [__('app.date'),__('app.total'),]
        ];
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => [self::class, 'afterSheet'],
        ];
    }

    public static function afterSheet(AfterSheet $event)
    {
        $emp_status = self::$sum;
        $total = count($emp_status);

        for($status = 4, $index = 0;$index < $total;$status++, $index++)
        {

            if($emp_status[$index]['total_hours'] > 0)
            {
                $event->sheet->getDelegate()->getComment('B'.$status)->getText()->createTextRun(['status : '.$emp_status[$index]['comments']['status'],
                $emp_status[$index]['comments']['clock_in'],
                 ]);
            }
        }

        $event->sheet->getDelegate()->getStyle('b')
            ->getAlignment()
            ->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
    }

    public function collection()
    {

        $startDate = $this->startdate;
        $endDate = $this->enddate;
        $userId = $this->userId;

        $attendances = Attendance::where('attendances.user_id', '=', $userId)
            ->where(DB::raw('DATE(attendances.clock_in_time)'), '>=', $startDate->format('Y-m-d'))
            ->where(DB::raw('DATE(attendances.clock_in_time)'), '<=', $endDate->format('Y-m-d'))
            ->orderBy('attendances.clock_in_time', 'asc')
            ->select('attendances.clock_in_time as date', 'attendances.clock_in_time', 'attendances.clock_out_time', 'attendances.late', 'attendances.half_day')->get();

        $leavesDates = Leave::where('user_id', $userId)
            ->where('leave_date', '>=', $startDate)
            ->where('leave_date', '<=', $endDate)
            ->where('status', 'approved')
            ->select('leave_date', 'reason', 'duration')->get();

        $period = CarbonPeriod::create($startDate, $endDate); // Get All Dates from start to end date
        $holidays = Holiday::getHolidayByDates($startDate, $endDate); // Getting Holiday Data

        $attendances = collect($attendances)->each(function ($item) {
            $item->status = '';
            $item->occassion = '';
        });

        // Add New Collection if period date does not match with attendance collection...
        $employeedata = array();
        $emp_attendance = 0;

        foreach ($period->toArray() as $date) {

            $att = new Attendance();
            $att->date = $date;
            $att->clock_in_time = null;
            $att->clock_out_time = null;
            $att->late = null;
            $att->half_day = null;

            if ($date->lessThan(Carbon::now()) && !$attendances->whereBetween('date', [$date->copy()->startOfDay(), $date->copy()->endOfDay()])->count()) {
                // If date is not in attendance..
                $att->status = 'Absent';
                    // If date is not in attendance..
                    // Check employee leaves
                foreach ($leavesDates as $leave) {

                    if($date->equalTo($leave->leave_date))
                    {
                        $att->status = 'Leave';
                    }
                }

                 // Check holidays
                foreach ($holidays as $holiday) {

                    if(\Carbon\Carbon::createFromFormat('Y-m-d', $holiday->holiday_date)->startOfDay()->equalTo($date))
                    {
                        $att->status = 'Holiday';
                        $att->occassion = $holiday->occassion;
                    }
                }

                $attendances->push($att);
            }
            else if($date->lessThan(Carbon::now()))
            {
                // Else date present in attendance then check for holiday and leave
                // Check employee leaves
                foreach ($leavesDates as $leave) {

                    if($date->equalTo($leave->leave_date))
                    {
                        $att->status = 'Leave';
                        $attendances->push($att);
                    }

                }

                // Check holidays
                foreach ($holidays as $holiday) {

                    if($date->format('Y-m-d') == $holiday->holiday_date && !$attendances->whereBetween('date', [$date->copy()->startOfDay(), $date->copy()->endOfDay()])->count())
                    {
                        $att->status = 'Holiday';
                        $att->occassion = $holiday->occassion;
                        $attendances->push($att);
                    }
                    else if($date->format('Y-m-d') == $holiday->holiday_date && $attendances->whereBetween('date', [$date->copy()->startOfDay(), $date->copy()->endOfDay()])->count())
                    {
                        // Here just modify the collection property not creating new
                        $this->checkHolidays($attendances, $date, $holiday->occassion);
                    }

                }

            }
        }

        $employee_temp = array();

        foreach($attendances->sortBy('date') as $attendance)
        {
            $date = Carbon::createFromFormat('Y-m-d H:i:s', $attendance->date)->timezone(global_setting()->timezone)->format(global_setting()->date_format);
            $to = $attendance->clock_out_time ? \Carbon\Carbon::createFromFormat('Y-m-d H:s:i', $attendance->clock_out_time)->timezone(global_setting()->timezone) : null;
            $from = $attendance->clock_in_time ? \Carbon\Carbon::createFromFormat('Y-m-d H:s:i', $attendance->clock_in_time)->timezone(global_setting()->timezone) : null;
            $clock_in = $attendance->clock_in_time ? Carbon::createFromFormat('Y-m-d H:i:s', $attendance->clock_in_time)->timezone(global_setting()->timezone)->format(global_setting()->time_format) : 0;
            $clock_out = $attendance->clock_out_time ? Carbon::createFromFormat('Y-m-d H:i:s', $attendance->clock_out_time)->timezone(global_setting()->timezone)->format(global_setting()->time_format) : 0;
            $diff_time = ($to && $from) ? $to->diffInMinutes($from) : 0;

            if ($attendance->status != null) {

                if ($attendance->status == 'Absent') {
                    $status = __('app.absent');
                }
                else if ($attendance->status == 'Leave') {
                    $status = __('app.onLeave');
                }
                else if ($attendance->status == 'Holiday') {
                    $status = __('app.holiday', ['name' => $attendance->occassion]);
                }

            }
            else if ($attendance->late == 'yes' && $attendance->half_day == 'yes') {
                $status = __('app.lateHalfday');
            }
            else if ($attendance->late == 'yes') {
                $status = __('app.presentlate');
            }
            else if ($attendance->half_day == 'yes') {
                $status = __('app.halfday');
            }
            else {
                $status = __('app.present');
            }

            if($diff_time > 0 || $clock_out != 0)
            {
                if($employee_temp && $employee_temp[1] == $date)
                {
                    info($employee_temp[1]);
                    $employeedata[$employee_temp[0] - 1]['comments']['clock_in'] .= 'Clock In : '.$clock_in.' Clock Out : '.$clock_out;
                    $employeedata[$employee_temp[0] - 1]['total_hours'] = $employeedata[$employee_temp[0] - 1]['total_hours'] + $diff_time;
                }
                else
                {

                    $employeedata[$emp_attendance] = [
                        'date' => $date,
                        'total_hours' => $diff_time,
                        'comments' => [
                                        'status' => $status,
                                        'clock_in' => 'Clock In : '.$clock_in.' Clock Out : '.$clock_out,
                        ],
                    ];

                    $emp_attendance++;
                }
            }
            else {
                $employeedata[$emp_attendance] = [
                    'date' => $date,
                    'total_hours' => $diff_time,
                    'comments' => [
                        'status' => $status,
                        'clock_in' => 'Clock In : '.$clock_in.' Clock Out : '.$clock_out,
                    ],
                ];
                $emp_attendance++;
            }
        }

        $employeedata = collect($employeedata);

        self::$sum = $employeedata;
        return $employeedata;

    }

    public function map($employeedata): array
    {
        $diff = $employeedata['total_hours'];

        if (is_int($diff)) {
            $diff_hours = intdiv($employeedata['total_hours'], 60) . ' ' . __('app.hrs') . ' ';
            $diff_minutes = (( $employeedata['total_hours'] % 60) > 0) ? ( $employeedata['total_hours'] % 60 . ' ' . __('app.mins')) : '';
            $diff = $diff_hours . $diff_minutes;
        }

        $view_status = ($diff > 0) ? $diff : $employeedata['comments']['status'];

        return [
            $employeedata['date'],
            $view_status,
        ];
    }

    public function checkHolidays($attendances, $date, $occassion)
    {
        foreach($attendances as $attendance)
        {
            if($date->format('Y-m-d') == \Carbon\Carbon::parse($attendance->clock_in_time)->format('Y-m-d'))
            {
                $attendance->status = 'Holiday';
                $attendance->occassion = $occassion;
            }
        }
    }

}
