import { convertTime } from "../../utils/converTime";
import MissedDayCount from "./MissedDayCount";
import UserRender from "./UserRender";


export const TimeLogHistoryColumn = [
    {
        id: 'employee_id',
        header: 'Employee Name',
        className: '',
        sorted: false,
        sortAccessor: '', 
        cell: (row, className) => {
            return (
                <UserRender
                    name={row?.employee_name}
                    profileUrl={`/account/employees/${row?.employee_id}`}
                    image={row?.employee_image}
                    role={row?.employee_roles}
                    id={row?.employee_id}
                />
            )
        }
    }, 
    {
        id: 'ideal_tracked_hours',
        header: 'Ideal Tracked Hours',
        className: '',
        sorted: false,
        sortAccessor: '',
        cell: (row) => {
            return <span> {convertTime(row?.ideal_minutes)} </span>
        }
    },
    {
        id: 'actual_logged_hours',
        header: 'Actual Logged Hours',
        className: '',
        sorted: false,
        sortAccessor: '',
        cell: (row) => {
            let totalMinute = row?.total_minutes ?? 0;
            return <span> {convertTime(totalMinute)} </span>
        }
    },
    {
        id: 'missed_hours',
        header: 'Missed Hours',
        className: '',
        sorted: false,
        sortAccessor: '',
        cell: (row) => {
            return <span> {convertTime(row?.missed_hours)} </span>
        }
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