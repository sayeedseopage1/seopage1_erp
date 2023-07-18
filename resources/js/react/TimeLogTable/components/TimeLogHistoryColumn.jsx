import MissedDayCount from "./MissedDayCount";


export const TimeLogHistoryColumn = [
    {
        id: 'employee_id',
        header: 'Employee Name',
        className: '',
        sorted: true,
        sortAccessor: '', 
        cell: (row, rowSpan) =>  <span>Employee Name</span>
    }, 
    {
        id: 'ideal_tracked_hours',
        header: 'Ideal Tracked Hours',
        className: '',
        sorted: false,
        sortAccessor: '',
        cell: (row) => <span> Ideal Tracked Hours </span>
    },
    {
        id: 'actual_logged_hours',
        header: 'Actual Logged Hours',
        className: '',
        sorted: false,
        sortAccessor: '',
        cell: (row) => <span>Actual Logged Hours</span>
    },
    {
        id: 'missed_hours',
        header: 'Missed Hours',
        className: '',
        sorted: false,
        sortAccessor: '',
        cell: (row) => <span> Missed Hours </span>
    },
    {
        id: 'missed_day_count',
        header: 'Missed Day Count',
        className: '',
        sorted: false,
        sortAccessor: '',
        cell: (row) => <MissedDayCount row={row}/>
    }
]