import dayjs from "dayjs"
import UserRender from "../UserRender"
import { convertTime } from "../../../utils/converTime"

let i = 0;

export const DailySubmissionTableColumn = [
    {
        id: 'employee',
        header: 'Employee',
        className: '',
        group: true,
        sorted: false,
        sortAccessor: 'employee',
        cell:  ({row, col, rowSpan}) => {
            return <td
                className={`sp1_tlr_td sp1_tlr_td_border sp1_drag_col_${col?.id} sp1_tlr_td_marged ${ rowSpan? "sp1_tlr_td_hover-disable": ""}`}
                rowSpan={rowSpan}
            >
                {row?.employee}
            </td>
        } 
    },
    {
        id: 'report_date',
        header: 'Report Date',
        className: '',
        group: true,
        sorted: false,
        sortAccessor: 'employee',
        cell:  ({row, col, rowSpan}) => {
            return <td
                className={`sp1_tlr_td sp1_tlr_td_border sp1_drag_col_${col?.id} sp1_tlr_td_marged ${ rowSpan? "sp1_tlr_td_hover-disable": ""}`}
                rowSpan={rowSpan}
            >
                {row?.employee}
            </td>
        } 
    },
    {
        id: 'client',
        header: 'Client',
        className: '',
        group: false,
        sorted: false,
        sortAccessor: 'client',
        cell:  ({row, col, rowSpan,className}) => {
            return <td
            className={`${className} sp1_tlr_td_border`}
            >
              {row?.client}
            </td>
        } 
    },
    {
        id: 'project_manager',
        header: 'Project Manager',
        className: '',
        sorted: true,
        group: false,
        sortAccessor: 'project_manager', 
        cell: ({row, col, className, rowSpan}) => {
            return <td
            className={`${className} sp1_tlr_td_border`}
            >
                {row?.project_manager}
            </td>
        }
        
    },
    {
        id: 'lead_developer',
        header: 'Lead Developer',
        className: '',
        sorted: false,
        group: false,
        cell: ({row, className}) =>{
            return <td className={`${className} sp1_tlr_td_border`}>
                {row?.lead_developer}
            </td>
        }
    },
    {
        id: 'project',
        header: 'Project',
        className: '',
        sorted: false,
        group: true,
        cell: ({row, col,className, rowSpan}) =>{
            return <td
            className={`sp1_tlr_td sp1_tlr_td_border sp1_drag_col_${col?.id} sp1_tlr_td_marged ${ rowSpan? "sp1_tlr_td_hover-disable": ""}`}
            rowSpan={rowSpan}
        >
                {row?.project}
            </td>
        }
    },
    {
        id: 'task',
        header: 'Task',
        className: '',
        sorted: false,
        group: true,
        cell: ({row, col,className,rowSpan}) =>{
            return <td
            className={`sp1_tlr_td sp1_tlr_td_border sp1_drag_col_${col?.id} sp1_tlr_td_marged ${ rowSpan? "sp1_tlr_td_hover-disable": ""}`}
            rowSpan={rowSpan}
        >
                {row?.task}
            </td>
        }
    },
    {
        id: 'task_type',
        header: 'Task Type',
        className: '',
        sorted: false,
        group: false,
        cell: ({row, className}) =>{
            return <td className={`${className} sp1_tlr_td_border`}>
                {row?.task_type}
            </td>
        }
    },
    {
        id: 'page_type',
        header: 'Page Type',
        className: '',
        sorted: false,
        group: false,
        cell: ({row, className}) =>{
            return <td className={`${className} sp1_tlr_td_border`}>
                {row?.page_type}
            </td>
        }
    },
    {
        id: 'page_link',
        header: 'Page Link',
        className: '',
        sorted: false,
        group: false,
        cell: ({row, className}) =>{
            return <td className={`${className} sp1_tlr_td_border`}>
                {row?.page_link}
            </td>
        }
    },
    {
        id: 'sections',
        header: 'Sections',
        className: '',
        sorted: false,
        group: false,
        cell: ({row, className}) =>{
            return <td className={`${className} sp1_tlr_td_border`}>
                {row?.sections}
            </td>
        }
    },
    {
        id: 'comment',
        header: 'Comment',
        className: '',
        sorted: false,
        group: false,
        cell: ({row, className}) =>{
            return <td title={row?.comment} className={`${className} sp1_tlr_td_border`}>
                <div className="singleline-ellipsis" style={{minWidth:'20rem'}}>
                {row?.comment}
                </div>
            </td>
        }
    },
    {
        id: 'total_time_spent',
        header: 'Total Time Spent',
        className: '',
        sorted: false,
        group: false,
        cell: ({row, className}) =>{
            return <td className={`${className} sp1_tlr_td_border`}>
                {row?.total_time_spent}
            </td>
        }
    },
    {
        id: 'attachment_url',
        header: 'Screenshots/Screen records of the sections',
        className: '',
        sorted: false,
        group: false,
        cell: ({row, className}) =>{
            return <td className={`${className} sp1_tlr_td_border`}>
                {row?.attachment_url}
            </td>
        }
    },
    {
        id: 'site',
        header: `Working/Staging Site's URL`,
        className: '',
        sorted: false,
        group: false,
        cell: ({row, className}) =>{
            return <td className={`${className} sp1_tlr_td_border`}>
                {row?.site}
            </td>
        }
    },
    {
        id: 'frontend_password',
        header: 'Frontend Password',
        className: '',
        sorted: false,
        group: false,
        cell: ({row, className}) =>{
            return <td className={`${className} sp1_tlr_td_border`}>
                {row?.frontend_password}
            </td>
        }
    },
    {
        id: 'report_submission_date',
        header: 'Report Submission Date',
        className: '',
        sorted: false,
        group: false,
        cell: ({row, className}) =>{
            return <td className={`${className} sp1_tlr_td_border`}>
                {row?.report_submission_date}
            </td>
        }
    },
]