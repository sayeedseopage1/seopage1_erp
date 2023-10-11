import dayjs from "dayjs"
import { convertTime } from "../../../utils/converTime"
import Popover from "../../../../react-latest/ui/Popover";
import "../data-table.css";
import UserRender from "../UserRender";


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
                <UserRender
                    name={row?.employee_name}
                    profileUrl={`/account/employees/${row?.employee_id}`}
                    image={row?.employee_image}
                    role=""
                    roleLink={''}
                    id={row?.employee_id}
                />
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
                <UserRender
                    name={row?.client_name}
                    profileUrl={`/account/clients/${row?.client_id}`}
                    image={row?.client_image}
                    role="Client"
                    roleLink={''}
                    id={row?.client_id}
                />
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
                        <UserRender
                            name={row?.pm_name}
                            profileUrl={`/account/employees/${row?.pm_id}`}
                            image={row?.pm_image}
                            role="Project Manager"
                            roleLink={''}
                            id={row?.pm_id}
                        /> :
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
                        <UserRender
                            name={row?.ld_name}
                            profileUrl={`/account/employees/${row?.ld_id}`}
                            image={row?.ld_image}
                            role="Lead Developer"
                            roleLink={''}
                            id={row?.ld_id}
                        /> :
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
        group: false,
        cell: ({ row, col, className, rowSpan }) => {
            return <td className={`${className} sp1_tlr_td_border`}>
                <a className="text-primary font-weight-bold" href={`/account/projects/${row?.project_id}`} target="_blank">{row?.project_name}</a>
            </td>
        }
    },
    {
        id: 'task_name',
        header: 'Task',
        className: '',
        sorted: false,
        group: false,
        cell: ({ row, className }) => {
            return <td className={`${className} sp1_tlr_td_border`}>
                <a className="text-primary font-weight-bold" href={`/account/tasks/${row?.task_id}`} target="_blank">{row?.task_name}</a>
            </td>
        }
    },
    {
        id: 'status_name',
        header: 'Status',
        className: '',
        sorted: false,
        group: false,
        cell: ({ row, className }) => {
            return <td className={`${className} sp1_tlr_td_border`}>
                <span className="badge" style={{ backgroundColor: row?.status_color, color: 'white' }}>{row?.status_name}</span>
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
                        <span className="text-danger font-weight-bold">N/A</span>
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
                        <span className="text-danger font-weight-bold">N/A</span>
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
                {row?.frontend_password || <span className="text-danger font-weight-bold">Not Provided</span>}
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