import _ from "lodash"
import { convertTime } from "../../utils/converTime";
import dayjs from "dayjs";

export const EmployeeSessionTableColumn = [
    {
        id: 'task_id',
        header: 'Task Name',
        className: '',
        group: true,
        sorted: false,
        cell: ({row, rowSpan, className}) =>{
                return(
                 <td
                    className={`sp1_tlr_td sp1_tlr_td_border sp1_tlr_td_marged ${ rowSpan? "sp1_tlr_td_hover-disable": ""}`}
                    rowSpan={rowSpan}
                >
                    <a  href={`/account/tasks/${row?.task_id}`} >{row?.task_name}</a>
                </td>
            )
        }
    },
    {
        id: 'task_details',
        header: 'Session Details',
        className: '',
        group: true,
        sorted: false,
        cell: ({row, data, rowSpan, className}) =>{
            const totalSession = _.size(data);
            const totalLogTime = _.sumBy(data,  (d) => Number(d['total_minutes']));
                return(
                 <td
                    className={`sp1_tlr_td sp1_tlr_td_border sp1_tlr_td_marged ${ rowSpan? "sp1_tlr_td_hover-disable": ""}`}
                    rowSpan={rowSpan}
                >
                    Total Session: {totalSession} <br/>
                    Total Session Duration: <br/> {convertTime(totalLogTime)}
                </td>
            )
        }
    },
    {
        id: 'session_duration',
        header: 'Session Duration',
        className: '',
        group: false,
        sorted: false,
        cell: ({row, className}) =>{
                return(
                 <td className={className}> 
                    {convertTime(row?.total_minutes)}
                </td>
            )
        }
    },
    {
        id: 'ttw_on_this_project',
        header: '(TTW) On This Project',
        className: '',
        group: true,
        sorted: false,
        cell: ({row, rowSpan, className}) =>{
                return(
                 <td
                    className={`sp1_tlr_td sp1_tlr_td_border sp1_tlr_td_marged ${ rowSpan? "sp1_tlr_td_hover-disable": ""}`}
                    rowSpan={rowSpan}
                >
                    {convertTime(row?.totalLogTime)}/ <br/>{convertTime(row?.project_total_time_log)}
                </td>
            )
        }
    }, 
    {
        id: 'total_tracked_time_td',
        header: '(TTD) On This Task',
        className: '',
        group: false,
        sorted: false,
        cell: ({row, data, index, className}) =>{
                let sum = _.sumBy(_.slice(data, 0, index + 1), (d) =>  Number(d['total_minutes']));
                return(
                 <td className={className} >
                    {convertTime(sum)}
                </td>
            )
        }
    }, 
    {
        id: 'start_time',
        header: 'Start Time',
        className: '',
        group: false,
        sorted: false,
        cell: ({row, className}) =>{
                return(
                 <td className={className} >
                    {dayjs(row?.start_time).format('MMM DD, YYYY')} <br/>
                    {dayjs(row?.start_time).format('hh:mm A')}
                </td>
            )
        }
    },
    {
        id: 'end_time',
        header: 'End Time',
        className: '',
        group: false,
        sorted: false,
        cell: ({row, className}) =>{
                return(
                    <td className={className} > 
                       {row?.end_time ? 
                        dayjs(row?.end_time).format('MMM DD, YYYY [at] hh:mm A') : 
                        <span className="text-success">Active</span>
                       }
                   </td>
            )
        }
    },
    {
        id: 'task_status',
        header: 'Task Status',
        className: '',
        group: false,
        sorted: false,
        cell: ({row, className}) =>{
                return(
                 <td className={className} >
                    <span className="badge text-white" style={{background: row?.tasks_color_code}}>
                        {row?.tasks_status}
                    </span>
                </td>
            )
        }
    },

]