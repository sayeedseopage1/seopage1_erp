<?php

namespace App\Http\Controllers;

use App\DataTables\HolidayDataTable;
use App\Helper\Reply;
use App\Http\Requests\CommonRequest;
use App\Http\Requests\Holiday\CreateRequest;
use App\Http\Requests\Holiday\UpdateRequest;
use App\Models\AttendanceSetting;
use App\Models\GoogleCalendarModule;
use App\Models\Holiday;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;
use App\Services\Google;
use Illuminate\Support\Facades\DB;

class HolidayController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.holiday';
    }

    public function index(HolidayDataTable $dataTable)
    {
        $viewPermission = user()->permission('view_holiday');
        abort_403(!in_array($viewPermission, ['all', 'added']));

        $this->currentYear = now()->format('Y');
        $this->currentMonth = now()->month;

        /* year range from last 5 year to next year */
        $years = [];
        $latestFifthYear = (int)Carbon::now()->subYears(5)->format('Y');
        $nextYear = (int)Carbon::now()->addYear()->format('Y');

        for ($i = $latestFifthYear; $i <= $nextYear; $i++) {
            $years[] = $i;
        }

        $this->years = $years;

        /* months */
        $this->months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

        return $dataTable->render('holiday.index', $this->data);

    }

    /**
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View|mixed|void
     */
    public function create()
    {
        $this->addPermission = user()->permission('add_holiday');
        abort_403(!in_array($this->addPermission, ['all', 'added']));

        if (request()->ajax()) {
            $this->pageTitle = __('app.menu.holiday');
            $html = view('holiday.ajax.create', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'holiday.ajax.create';

        return view('holiday.create', $this->data);

    }

    /**
     *
     * @param CreateRequest $request
     * @return void
     */
    public function store(CreateRequest $request)
    {
        $this->addPermission = user()->permission('add_holiday');

        abort_403(!in_array($this->addPermission, ['all', 'added']));

        $occassions = $request->occassion;
        $dates = $request->date;

        foreach ($dates as $index => $value) {
            if ($value != '') {

                $holiday = new Holiday();
                $holiday->date = Carbon::createFromFormat($this->global->date_format, $value)->format('Y-m-d');
                $holiday->occassion = $occassions[$index];
                $holiday->save();

                if($holiday) {
                    $holiday->event_id = $this->googleCalendarEvent($holiday);
                    $holiday->save();
                }
            }
        }

        if (request()->has('type')) {
            return redirect(route('holidays.index'));
        }

        $redirectUrl = urldecode($request->redirect_url);

        if ($redirectUrl == '') {
            $redirectUrl = route('holidays.index');
        }

        return Reply::successWithData(__('messages.holidayAddedSuccess'), ['redirectUrl' => $redirectUrl]);

    }

    /**
     * Display the specified holiday.
     */
    public function show(Holiday $holiday)
    {
        $this->holiday = $holiday;
        $this->viewPermission = user()->permission('view_holiday');
        abort_403(!($this->viewPermission == 'all' || ($this->viewPermission == 'added' && $this->holiday->added_by == user()->id)));

        $this->pageTitle = __('app.menu.holiday');

        if (request()->ajax()) {
            $html = view('holiday.ajax.show', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'holiday.ajax.show';

        return view('holiday.create', $this->data);

    }

    /**
     * @param Holiday $holiday
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View|mixed|void
     */
    public function edit(Holiday $holiday)
    {
        $this->holiday = $holiday;
        $this->editPermission = user()->permission('edit_holiday');

        abort_403(!($this->editPermission == 'all' || ($this->editPermission == 'added' && $this->holiday->added_by == user()->id)));

        $this->pageTitle = __('app.menu.holiday');

        if (request()->ajax()) {
            $html = view('holiday.ajax.edit', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'holiday.ajax.edit';

        return view('holiday.create', $this->data);

    }

    /**
     * @param UpdateRequest $request
     * @param Holiday $holiday
     * @return array|void
     */
    public function update(UpdateRequest $request, Holiday $holiday)
    {
        $this->editPermission = user()->permission('edit_holiday');
        abort_403(!($this->editPermission == 'all' || ($this->editPermission == 'added' && $this->holiday->added_by == user()->id)));

        $data = $request->all();
        $data['date'] = Carbon::createFromFormat($this->global->date_format, $request->date)->format('Y-m-d');

        $holiday->update($data);

        if($holiday){
            $holiday->event_id = $this->googleCalendarEvent($holiday);
            $holiday->save();
        }

        return Reply::successWithData(__('messages.updateSuccess'), ['redirectUrl' => route('holidays.index')]);

    }

    /**
     * @param Holiday $holiday
     * @return array|void
     */
    public function destroy(Holiday $holiday)
    {
        $deletePermission = user()->permission('delete_holiday');
        abort_403(!($deletePermission == 'all' || ($deletePermission == 'added' && $holiday->added_by == user()->id)));

        $holiday->delete();
        return Reply::successWithData(__('messages.holidayDeletedSuccess'), ['redirectUrl' => route('holidays.index')]);

    }

    public function calendar(Request $request)
    {
        $this->viewPermission = user()->permission('view_holiday');

        abort_403(!($this->viewPermission == 'all' || $this->viewPermission == 'added'));

        $this->pageTitle = 'app.menu.calendar';

        if (request('start') && request('end')) {
            $holidayArray = array();

            $holidays = Holiday::orderBy('date', 'ASC');

            if (request()->searchText != '') {
                $holidays->where('holidays.occassion', 'like', '%' . request()->searchText . '%');
            }

            $holidays = $holidays->get();

            foreach ($holidays as $key => $holiday) {

                $holidayArray[] = [
                    'id' => $holiday->id,
                    'title' => $holiday->occassion,
                    'start' => $holiday->date->format('Y-m-d'),
                    'end' => $holiday->date->format('Y-m-d'),
                ];
            }

            return $holidayArray;
        }

        return view('holiday.calendar.index', $this->data);

    }

    public function applyQuickAction(Request $request)
    {
        abort_403(!in_array(user()->permission('edit_leave'), ['all', 'added']));

        if ($request->action_type === 'delete') {
            $this->deleteRecords($request);
            return Reply::success(__('messages.deleteSuccess'));
        }

        return Reply::error(__('messages.selectAction'));


    }

    protected function deleteRecords($request)
    {
        abort_403(user()->permission('delete_holiday') != 'all');

        Holiday::whereIn('id', explode(',', $request->row_ids))->delete();
    }

    public function markHoliday()
    {
        $this->addPermission = user()->permission('add_holiday');
        abort_403(!in_array($this->addPermission, ['all', 'added']));

        $this->weekMap = [
            0 => __('app.sunday'),
            1 => __('app.monday'),
            2 => __('app.tuesday'),
            3 => __('app.wednesday'),
            4 => __('app.thursday'),
            5 => __('app.friday'),
            6 => __('app.saturday'),
        ];

        $this->holidaysArray = $this->weekMap;

        return view('holiday.mark-holiday.index', $this->data);
    }

    public function missingNumber($num_list)
    {
        // construct a new array
        $new_arr = range(1, 7);

        if(is_null($num_list))
        {
            return $new_arr;
        }

        return array_diff($new_arr, $num_list);
    }

    public function markDayHoliday(CommonRequest $request)
    {
        $this->addPermission = user()->permission('add_holiday');
        abort_403(!in_array($this->addPermission, ['all', 'added']));

        if (!$request->has('office_holiday_days')) {
            return Reply::error(__('messages.checkDayHoliday'));
        }

        $year = now()->format('Y');

        if ($request->has('year')) {
            $year = $request->has('year');
        }

        $dayss = [];
        $this->days = AttendanceSetting::WEEKDAYS;;

        if ($request->office_holiday_days != null && count($request->office_holiday_days) > 0) {
            foreach ($request->office_holiday_days as $holiday) {
                $dayss[] = $this->days[($holiday)];
                $day = $holiday;

                $dateArray = $this->getDateForSpecificDayBetweenDates($year . '-01-01', $year . '-12-31', ($day));

                foreach ($dateArray as $date) {
                    Holiday::firstOrCreate([
                        'date' => $date,
                        'occassion' => $this->days[$day]
                    ]);
                }

                $this->googleCalendarEventMulti($day, $year, $this->days);

            }
        }

        return Reply::successWithData(__('messages.holidayAddedSuccess'), ['redirectUrl' => route('holidays.index')]);
    }

    public function getDateForSpecificDayBetweenDates($startDate, $endDate, $weekdayNumber)
    {
        $startDate = strtotime($startDate);
        $endDate = strtotime($endDate);

        $dateArr = [];

        do {
            if (date('w', $startDate) != $weekdayNumber) {
                $startDate += (24 * 3600); // add 1 day
            }
        } while (date('w', $startDate) != $weekdayNumber);


        while ($startDate <= $endDate) {
            $dateArr[] = date('Y-m-d', $startDate);
            $startDate += (7 * 24 * 3600); // add 7 days
        }

        return ($dateArr);
    }

    protected function googleCalendarEvent($event)
    {
        $module = GoogleCalendarModule::first();
        $googleAccount = global_setting();

        if ($googleAccount->google_calendar_status == 'active' && $googleAccount->google_calendar_verification_status == 'verified' && $googleAccount->token && $module->holiday_status == 1) {

            $google = new Google();

            $description = __('messages.invoiceDueOn');

            // Create event
            $google = $google->connectUsing($googleAccount->token);

            $eventData = new \Google_Service_Calendar_Event(array(
                'summary' => $event->occassion,
                'location' => $googleAccount->address,
                'description' => $description,
                'colorId' => 1,
                'start' => array(
                    'dateTime' => $event->date,
                    'timeZone' => $googleAccount->timezone,
                ),
                'end' => array(
                    'dateTime' => $event->date,
                    'timeZone' => $googleAccount->timezone,
                ),
                'reminders' => array(
                    'useDefault' => false,
                    'overrides' => array(
                        array('method' => 'email', 'minutes' => 24 * 60),
                        array('method' => 'popup', 'minutes' => 10),
                    ),
                ),
            ));

            try {
                if ($event->event_id) {
                    $results = $google->service('Calendar')->events->patch('primary', $event->event_id, $eventData);
                }
                else {
                    $results = $google->service('Calendar')->events->insert('primary', $eventData);
                }

                return $results->id;
            } catch (\Google\Service\Exception $error) {
                if(is_null($error->getErrors())) {
                    // Delete google calendar connection data i.e. token, name, google_id
                    $googleAccount->name = null;
                    $googleAccount->token = null;
                    $googleAccount->google_id = null;
                    $googleAccount->google_calendar_verification_status = 'non_verified';
                    $googleAccount->save();
                }
            }

        }

        return $event->event_id;
    }

    protected function googleCalendarEventMulti($day, $year, $days)
    {
        $googleAccount = global_setting();
        $module = GoogleCalendarModule::first();

        if ($googleAccount->google_calendar_status == 'active' && $googleAccount->google_calendar_verification_status == 'verified' && $googleAccount->token && $module->holiday_status == 1 )
        {
            $this->days = $days;
            $google = new Google();

            $allDays = $this->getDateForSpecificDayBetweenDates($year . '-01-01', $year . '-12-31', $day);

            $holiday = Holiday::where(DB::raw('DATE(`date`)'), $allDays[0])->first();

            $startDate = Carbon::parse($allDays[0]);

            $frequency = 'WEEKLY';

            $eventData = new \Google_Service_Calendar_Event();
            $eventData->setSummary($this->days[$day]);
            $eventData->setColorId(7);
            $eventData->setLocation('');

            $start = new \Google_Service_Calendar_EventDateTime();
            $start->setDateTime($startDate);
            $start->setTimeZone($googleAccount->timezone);

            $eventData->setStart($start);

            $end = new \Google_Service_Calendar_EventDateTime();
            $end->setDateTime($startDate);
            $end->setTimeZone($googleAccount->timezone);

            $eventData->setEnd($end);

            $dy = mb_strtoupper(substr($this->days[$day], 0, 2));

            $eventData->setRecurrence(array('RRULE:FREQ='.$frequency.';COUNT='.count($allDays).';BYDAY='.$dy));

            // Create event
            $google->connectUsing($googleAccount->token);
            // array for multiple

            try {
                if ($holiday->event_id) {
                    $results = $google->service('Calendar')->events->patch('primary', $holiday->event_id, $eventData);
                }
                else {
                    $results = $google->service('Calendar')->events->insert('primary', $eventData);
                }

                $holidays = Holiday::where('occassion', $this->days[$day])->get();

                foreach($holidays as $holiday){
                    $holiday->event_id = $results->id;
                    $holiday->save();
                }

                return;
            } catch (\Google\Service\Exception $error) {
                if(is_null($error->getErrors())) {
                    // Delete google calendar connection data i.e. token, name, google_id
                    $googleAccount->name = null;
                    $googleAccount->token = null;
                    $googleAccount->google_id = null;
                    $googleAccount->google_calendar_verification_status = 'non_verified';
                    $googleAccount->save();
                }
            }


            $holidays = Holiday::where('occassion', $this->days[$day])->get();

            foreach($holidays as $holiday){
                $holiday->event_id = $holiday->event_id;
                $holiday->save();
            }

            return;
        }
    }

}
