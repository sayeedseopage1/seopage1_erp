import { convertTime } from "../../utils/converTime"
import ProjectSessionTrackTimeButton from "./ProjectSessionTrackTimeButton"
import UserRender from "./UserRender"


export const ProjectWiseTableColumn = [
    {
        id: 'project_id',
        header: 'Project Name',
        className: '',
        group: true,
        sorted: false,
        sortAccessor: 'project_id',
        cell:  ({row, col, rowSpan=1}) => {
            return <td
                className={`sp1_tlr_td sp1_tlr_td_border sp1_drag_col_${col?.id} sp1_tlr_td_marged ${ rowSpan? "sp1_tlr_td_hover-disable": ""}`}
                rowSpan={rowSpan}
            >
                <a  href={`/account/tasks/${row?.task_id}`} >{row?.project_name}</a>
            </td>
        } 
    },
    {
        id: 'client_id',
        header: 'Client Name',
        className: '',
        group: true,
        sorted: false,
        sortAccessor: 'client_id',
        cell:  ({row, col, rowSpan=1}) => {
            return <td
                className={`sp1_tlr_td sp1_tlr_td_border  sp1_drag_col_${col?.id} sp1_tlr_td_marged ${ rowSpan? "sp1_tlr_td_hover-disable": ""}`}
                rowSpan={rowSpan}
            >
                <UserRender
                    name={row?.client_name}
                    profileUrl={`/account/clients/${row?.client_id}`}
                    image={row?.client_image}
                    role="Freelancer.com"
                    roleLink={row?.client_from}
                    id={row?.client_id}
                />
            </td>
        } 
    },
    {
        id: 'pm_id',
        header: 'Project Manager',
        className: '',
        group: true,
        sorted: false,
        sortAccessor: 'pm_id',
        cell:  ({row, col, rowSpan=1}) => {
            return <td
                className={`sp1_tlr_td sp1_tlr_td_border sp1_drag_col_${col?.id} sp1_tlr_td_marged ${ rowSpan? "sp1_tlr_td_hover-disable": ""}`}
                rowSpan={rowSpan}
            >
                <UserRender
                    name={row?.pm_name}
                    profileUrl={`/account/employees/${row?.pm_id}`}
                    image={row?.pm_image}
                    role={row?.pm_roles}
                    id={row?.pm_id}
                />
            </td>
        } 
    },
    {
        id: 'employee_id',
        header: 'Employee Name',
        className: '',
        sorted: true,
        group: false,
        sortAccessor: '', 
        cell: ({row, col, className, rowSpan}) => {
            return <td className={className} rowSpan={rowSpan}>
                <UserRender
                    name={row?.employee_name}
                    profileUrl={`/account/employees/${row?.employee_id}`}
                    image={row?.employee_image}
                    role={
                        row?.employee_roles
                    }
                    id={row?.employee_id}
                />
            </td>
        }
        
    },
    {
        id: 'number_of_session',
        header: 'Number Of Session',
        className: '',
        sorted: false,
        cell: ({row, className}) =>{
            return(
                <td className={className}>
                   <ProjectSessionTrackTimeButton row={row}>
                        {row?.number_of_session}
                    </ProjectSessionTrackTimeButton> 
                </td>
            )
        }
    },
    {
        id: 'total_track_time',
        header: 'Total Track Time',
        className: '',
        sorted: false,
        cell: ({row, className}) =>{
            return(
                <td className={className}>
                  {row?.total_minutes ? (
                        convertTime(row?.total_minutes)
                    ) : (
                        <span className="text-danger">
                            <i
                                className="fa-solid fa-chevron-left mr-1"
                                style={{ fontSize: "10px" }}
                            />
                            1 min
                        </span>
                    )}
                </td>
            )
        }
    }
]