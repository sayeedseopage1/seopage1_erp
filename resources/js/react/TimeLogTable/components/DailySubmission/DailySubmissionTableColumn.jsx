import dayjs from "dayjs"
import UserRender from "../UserRender"
import { convertTime } from "../../../utils/converTime"
import Popover from "../../../../react-latest/ui/Popover";


export const DailySubmissionTableColumn = [
    {
        id: 'employee_name',
        header: 'Employee',
        className: '',
        group: true,
        sorted: false,
        sortAccessor: 'employee_name',
        cell: ({ row, col, rowSpan }) => {
            return <td
                className={`sp1_tlr_td sp1_tlr_td_border sp1_drag_col_${col?.id} sp1_tlr_td_marged ${rowSpan ? "sp1_tlr_td_hover-disable" : ""}`}
                rowSpan={rowSpan}
            >
                <a className="text-primary font-weight-bold" href={`/account/employees/${row?.employee_id}`}>{row?.employee_name}</a>
            </td>
        }
    },
    {
        id: 'report_date',
        header: 'Report Date',
        className: '',
        group: true,
        sorted: false,
        sortAccessor: 'report_date',
        cell: ({ row, col, rowSpan }) => {
            return <td
                className={`sp1_tlr_td sp1_tlr_td_border sp1_drag_col_${col?.id} sp1_tlr_td_marged ${rowSpan ? "sp1_tlr_td_hover-disable" : ""}`}
                rowSpan={rowSpan}
            >
                {
                    row?.report_date ?
                        dayjs(row?.report_date).format('DD-MMM-YYYY h:mm:ss A') :
                        dayjs(row?.report_submission_date).format('DD-MMM-YYYY h:mm:ss A')
                }
            </td>
        }
    },
    {
        id: 'client_name',
        header: 'Client',
        className: '',
        group: false,
        sorted: false,
        sortAccessor: 'client_name',
        cell: ({ row, col, rowSpan, className }) => {
            return <td
                className={`${className} sp1_tlr_td_border`}
            >
                <a className="text-primary font-weight-bold" href={`/account/clients/${row?.client_id}`}>{row?.client_name}</a>
            </td>
        }
    },
    {
        id: 'pm_name',
        header: 'Project Manager',
        className: '',
        sorted: true,
        group: false,
        sortAccessor: 'pm_name',
        cell: ({ row, col, className, rowSpan }) => {
            return <td
                className={`${className} sp1_tlr_td_border`}
            >
                {
                    row?.pm_name ?
                        <a className="text-primary font-weight-bold" href={`/account/employees/${row?.pm_id}`}>{row?.pm_name}</a> :
                        '--'
                }
            </td>
        }

    },
    {
        id: 'ld_name',
        header: 'Lead Developer',
        className: '',
        sorted: false,
        group: false,
        cell: ({ row, className }) => {
            return <td className={`${className} sp1_tlr_td_border`}>
                {
                    row?.ld_name ?
                        <a className="text-primary font-weight-bold" href={`/account/employees/${row?.ld_id}`}>{row?.ld_name}</a> :
                        '--'
                }
            </td>
        }
    },
    {
        id: 'project_name',
        header: 'Project',
        className: '',
        sorted: false,
        group: true,
        cell: ({ row, col, className, rowSpan }) => {
            return <td
                className={`sp1_tlr_td sp1_tlr_td_border sp1_drag_col_${col?.id} sp1_tlr_td_marged ${rowSpan ? "sp1_tlr_td_hover-disable" : ""}`}
                rowSpan={rowSpan}
            >
                {row?.project_name}
            </td>
        }
    },
    {
        id: 'task_name',
        header: 'Task',
        className: '',
        sorted: false,
        group: true,
        cell: ({ row, col, className, rowSpan }) => {
            return <td
                className={`sp1_tlr_td sp1_tlr_td_border sp1_drag_col_${col?.id} sp1_tlr_td_marged ${rowSpan ? "sp1_tlr_td_hover-disable" : ""}`}
                rowSpan={rowSpan}
            >
                {row?.task_name}
            </td>
        }
    },
    {
        id: 'task_status',
        header: 'Status',
        className: '',
        sorted: false,
        group: false,
        cell: ({ row, className }) => {
            return <td className={`${className} sp1_tlr_td_border`}>
                {row?.task_status}
            </td>
        }
    },
    {
        id: 'task_type',
        header: 'Task Type',
        className: '',
        sorted: false,
        group: false,
        cell: ({ row, className }) => {
            return <td className={`${className} sp1_tlr_td_border`}>
                {row?.task_type || '--'}
            </td>
        }
    },
    {
        id: 'page_type',
        header: 'Page Type',
        className: '',
        sorted: false,
        group: false,
        cell: ({ row, className }) => {
            return <td className={`${className} sp1_tlr_td_border`}>
                {row?.page_type || '--'}
            </td>
        }
    },
    {
        id: 'page_link',
        header: 'Page Link',
        className: '',
        sorted: false,
        group: false,
        cell: ({ row, className }) => {
            return <td className={`${className} sp1_tlr_td_border`}>
                {
                    row?.page_link ?
                        <a className="text-primary font-weight-bold" href={row?.page_link} target="_blank">View Link</a> :
                        <span className="text-danger font-weight-bold">No Attachments</span>
                }
            </td>
        }
    },
    {
        id: 'section',
        header: 'Sections',
        className: '',
        sorted: false,
        group: false,
        cell: ({ row, className }) => {
            return <td className={`${className} sp1_tlr_td_border`}>
                {row?.section}
            </td>
        }
    },
    {
        id: 'comment',
        header: 'Comment',
        className: '',
        sorted: false,
        group: false,
        cell: ({ row, className }) => {
            return <td className={`${className} sp1_tlr_td_border`}>
                <Popover>
                    <Popover.Button>
                        <span className='font-weight-bold singleline-ellipsis' dangerouslySetInnerHTML={{ __html: row?.comment }} />
                    </Popover.Button>

                    <Popover.Panel>
                        <div className='revision_popover_panel' dangerouslySetInnerHTML={{ __html: row?.comment }} />
                    </Popover.Panel>
                </Popover>
            </td>
        }
    },
    {
        id: 'total_time_spent',
        header: 'Total Time Spent',
        className: '',
        sorted: false,
        group: false,
        cell: ({ row, className }) => {
            return <td className={`${className} sp1_tlr_td_border`}>
                {convertTime(row?.total_time_spent)}
            </td>
        }
    },
    {
        id: 'attachments',
        header: 'Screenshots/Screen records of the sections',
        className: '',
        sorted: false,
        group: false,
        cell: ({ row, className }) => {
            return <td className={`${className} sp1_tlr_td_border`}>
                {
                    row?.attachments ?
                        <a className="text-primary font-weight-bold" href={row?.attachments} target="_blank">View Link</a> :
                        <span className="text-danger font-weight-bold">No Attachments</span>
                }
            </td>
        }
    },
    {
        id: 'site_url',
        header: `Working/Staging Site's URL`,
        className: '',
        sorted: false,
        group: false,
        cell: ({ row, className }) => {
            return <td className={`${className} sp1_tlr_td_border`}>
                {
                    row?.site_url ?
                        <a className="text-primary font-weight-bold" href={row?.site_url} target="_blank">View Link</a> :
                        <span className="text-danger font-weight-bold">No Attachments</span>
                }
            </td>
        }
    },
    {
        id: 'frontend_password',
        header: 'Frontend Password',
        className: '',
        sorted: false,
        group: false,
        cell: ({ row, className }) => {
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
        cell: ({ row, className }) => {
            return <td className={`${className} sp1_tlr_td_border`}>
                {dayjs(row?.report_submission_date).format('DD-MMM-YYYY h:mm:ss A')}
            </td>
        }
    },
]