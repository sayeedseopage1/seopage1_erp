<?php

namespace App\DataTables;

use App\DataTables\BaseDataTable;
use App\Models\Attendance;
use App\Models\AttendanceSetting;
use App\Models\Holiday;
use App\Models\Leave;
use App\Models\User;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\Html\Button;

class AttendanceReportDataTable extends BaseDataTable
{

    private $attendanceSettings;
    private $totalWorkingDays;
    private $daysPresent;
    private $firstClockIn;
    private $lastClockOut;
    private $startTime;
    private $endTime;

    public function __construct()
    {
        parent::__construct();
        $this->attendanceSettings = AttendanceSetting::first();
    }

    /**
     * @param mixed $query
     * @return \Yajra\DataTables\CollectionDataTable|\Yajra\DataTables\DataTableAbstract
     */
    public function dataTable($query)
    {
        $request = $this->request();
        $startDate = $startDate = now($this->global->timezone)->startOfMonth();
        $endDate = $endDate = now($this->global->timezone);

        if ($request->startDate != '') {
            // if this month filter's end date is not equal to now
            $diff = ($endDate->lt(Carbon::createFromFormat($this->global->date_format, $request->endDate))) ? $endDate->diffInDays(Carbon::createFromFormat($this->global->date_format, $request->endDate)) : 0;
            $startDate = $startDate = Carbon::createFromFormat($this->global->date_format, $request->startDate);
            $endDate = $endDate = Carbon::createFromFormat($this->global->date_format, $request->endDate);
        }

        $period = CarbonPeriod::create($startDate, $endDate);
        $this->totalWorkingDays = ($diff < 1) ? $startDate->diffInDays($endDate) + 1 : $startDate->diffInDays($endDate) - $diff;

        // if this month filter's end date is not equal to now
        if ($endDate->gt(now($this->global->timezone))) {
            $holidayDate = Holiday::whereBetween(DB::raw('DATE(holidays.`date`)'), [$startDate->toDateString(), now($this->global->timezone)])->get('date');
        }
        else {
            $holidayDate = Holiday::whereBetween(DB::raw('DATE(holidays.`date`)'), [$startDate->toDateString(), $endDate->toDateString()])->get('date');
        }

        $this->holidaysCount = $holidayDate->count();
        $holidays = [];

        foreach ($holidayDate as $item)
        {
            array_push($holidays, $item->date);
        }

        $this->totalWorkingDays = $this->totalWorkingDays;
        $this->daysPresent = 0;
        $this->extraDays = 0;

        return datatables()
            ->eloquent($query)
            ->addIndexColumn()
            ->addColumn('employee_name', function ($row) {
                return $row->name;
            })
            ->addColumn('name', function ($row) {
                return view('components.employee', [
                    'user' => $row
                ]);
            })
            ->addColumn('present_days', function ($row) use ($startDate, $endDate, $holidays) {
                $this->daysPresent = Attendance::countDaysPresentByUser($startDate, $endDate, $row->id);
                $this->extraDays = $this->extraDays($startDate, $endDate, $row->id, $holidays);

                if ($this->extraDays) {
                    $this->daysPresent = $this->daysPresent - $this->extraDays;
                }

                if ($this->daysPresent == 0) {
                    return '0';
                }

                return $this->daysPresent;
            })
            ->addColumn('extra_days', function ($row) use ($startDate, $endDate, $holidays) {
                return $this->extraDays($startDate, $endDate, $row->id, $holidays);
            })
            ->addColumn('absent_days', function ($row) {
                $this->holidaysCount = $this->holidaysCount - $this->extraDays;

                if ($this->holidaysCount > 0) {
                    return (($this->totalWorkingDays - ($this->daysPresent + $this->extraDays + $this->holidaysCount)) <= 0) ? '0' : ($this->totalWorkingDays - ($this->daysPresent + $this->extraDays + $this->holidaysCount));
                }
                else {
                    return (($this->totalWorkingDays - ($this->daysPresent + $this->extraDays)) <= 0) ? '0' : ($this->totalWorkingDays - ($this->daysPresent + $this->extraDays));
                }
            })
            ->addColumn('hours_clocked', function ($row) use ($period) {
                return $this->calculateHours($period, $row);
            })
            ->addColumn('late_day_count', function ($row) use ($startDate, $endDate) {
                $lateDayCount = Attendance::countDaysLateByUser($startDate, $endDate, $row->id);

                if ($lateDayCount == 0) {
                    return '0';
                }

                return $lateDayCount;
            })
            ->addColumn('half_day_count', function ($row) use ($startDate, $endDate) {
                $halfDayCount = Attendance::countHalfDaysByUser($startDate, $endDate, $row->id);

                if ($halfDayCount == 0) {
                    return '0';
                }

                return $halfDayCount;
            })

            ->orderColumn('present_days', 'user_id $1')
            ->orderColumn('absent_days', 'user_id $1')
            ->orderColumn('extra_days', 'user_id $1')
            ->orderColumn('hours_clocked', 'user_id $1')
            ->orderColumn('late_day_count', 'user_id $1')
            ->orderColumn('half_day_count', 'user_id $1');
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function query()
    {
        $request = $this->request();
        $model = User::with('role', 'roles', 'employeeDetail', 'session')
            ->join('role_user', 'role_user.user_id', '=', 'users.id')
            ->join('roles', 'roles.id', '=', 'role_user.role_id')
            ->where('roles.name', 'employee')
            ->select('users.*');

        if ($request->employee != 'all') {
            $model = $model->where('users.id', $request->employee);
        }

        return $model;
    }

    /**
     * Optional method if you want to use html builder.
     *
     * @return \Yajra\DataTables\Html\Builder
     */
    public function html()
    {
        return $this->builder()
            ->setTableId('attendance-report-table')
            ->columns($this->getColumns())
            ->minifiedAjax()
            /* ->dom("<'row'<'col-md-6'l><'col-md-6'Bf>><'row'<'col-sm-12'tr>><'row'<'col-sm-5'i><'col-sm-7'p>>") */
            ->orderBy(1)
            ->destroy(true)
            ->responsive(true)
            ->serverSide(true)
            ->stateSave(true)
            ->processing(true)
            ->dom($this->domHtml)

            ->language(__('app.datatable'))
            ->parameters([
                'initComplete' => 'function () {
                    window.LaravelDataTables["attendance-report-table"].buttons().container()
                     .appendTo( "#table-actions")
                 }',
                'fnDrawCallback' => 'function( oSettings ) {
                    $("body").tooltip({
                        selector: \'[data-toggle="tooltip"]\'
                    })
                }',
            ])
            ->buttons(Button::make(['extend' => 'excel', 'text' => '<i class="fa fa-file-export"></i> ' . trans('app.exportExcel')]));
    }

    /**
     * Get columns.
     *
     * @return array
     */
    protected function getColumns()
    {
        return [
            '#' => ['data' => 'DT_RowIndex', 'orderable' => false, 'searchable' => false, 'visible' => false],
            __('app.employee')  => ['data' => 'name', 'name' => 'users.name', 'exportable' => false, 'title' => __('app.employee')],
            __('app.name') => ['data' => 'employee_name', 'name' => 'users.name', 'visible' => false, 'title' => __('app.name')],
            __('modules.attendance.present') => ['data' => 'present_days', 'name' => 'present_days', 'title' => __('modules.attendance.present')],
            __('modules.attendance.absent') => ['data' => 'absent_days', 'name' => 'absent_days', 'title' => __('modules.attendance.absent')],
            __('modules.attendance.extraDays') => ['data' => 'extra_days', 'name' => 'extra_days', 'title' => __('modules.attendance.extraDays')],
            __('modules.attendance.hoursClocked') => ['data' => 'hours_clocked', 'name' => 'hours_clocked', 'title' => __('modules.attendance.hoursClocked')],
            __('app.days') . ' ' . __('modules.attendance.late') => ['data' => 'late_day_count', 'name' => 'late_day_count', 'title' => __('app.days') . ' ' . __('modules.attendance.late')],
            __('modules.attendance.halfDay') => ['data' => 'half_day_count', 'name' => 'half_day_count', 'title' => __('modules.attendance.halfDay')],
        ];
    }

    /**
     * Get filename for export.
     *
     * @return string
     */
    protected function filename()
    {
        return 'Attendance_report_' . date('YmdHis');
    }

    public function pdf()
    {
        set_time_limit(0);

        if ('snappy' == config('datatables-buttons.pdf_generator', 'snappy')) {
            return $this->snappyPdf();
        }

        $pdf = app('dompdf.wrapper');
        $pdf->loadView('datatables::print', ['data' => $this->getDataForPrint()]);

        return $pdf->download($this->getFilename() . '.pdf');
    }

    public function calculateHours($period, $user)
    {
        $timeLogInMinutes = 0;

        foreach ($period as $date) {
            $attendanceDate = $date->toDateString();
            $clockins = Attendance::select('clock_in_time', 'clock_out_time')
                ->where(DB::raw('DATE(attendances.clock_in_time)'), $attendanceDate)
                ->where('user_id', $user->id)
                ->orderBy('id', 'asc')->get();

            foreach ($clockins as $value) {

                if (!is_null($value)) {

                    $this->startTime = Carbon::parse($value->clock_in_time)
                        ->timezone($this->global->timezone);

                    if (!is_null($value->clock_out_time)) {
                        $this->endTime = Carbon::parse($value->clock_out_time)
                            ->timezone($this->global->timezone);
                    }
                    elseif (($value->clock_in_time->timezone($this->global->timezone)->format('Y-m-d') != Carbon::now()->timezone($this->global->timezone)->format('Y-m-d')) && is_null($value->clock_out_time)) {
                        $this->endTime = Carbon::parse($this->startTime->format('Y-m-d') . ' ' . $this->attendanceSettings->office_end_time, $this->global->timezone);
                        $this->notClockedOut = true;
                    }
                    else {
                        $this->notClockedOut = true;
                        $this->endTime = Carbon::now()->timezone($this->global->timezone);
                    }

                    $timeLogInMinutes = $timeLogInMinutes + $this->endTime->diffInMinutes($this->startTime, true);
                }
            }

        }

        $timeLog = intdiv($timeLogInMinutes, 60) . ' ' . __('app.hrs') . ' ';

        if (($timeLogInMinutes % 60) > 0) {
            $timeLog .= ($timeLogInMinutes % 60) . ' ' . __('app.mins');
        }

        return $timeLog;
    }

    public function extraDays($startDate, $endDate, $userId, $holidays)
    {
        $extraDays = Attendance::whereBetween(DB::raw('DATE(attendances.`clock_in_time`)'), [$startDate->toDateString(), $endDate->toDateString()])->where('user_id', $userId)->whereIn(DB::raw('DATE(`clock_in_time`)'), $holidays)
                ->select(DB::raw('count(DISTINCT DATE(attendances.clock_in_time) ) as attendance'))->first();

        return $extraDays->attendance;
    }

}
