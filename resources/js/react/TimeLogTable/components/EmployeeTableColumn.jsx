import { convertTime } from "../../utils/converTime"
import EmployeeTrackTimeButton from "./EmployeeTrackTimeButton"
import UserRender from "./UserRender"


export const EmployeeTableColumn = [
    {
        id: 'employee_id',
        header: 'Employee Name',
        className: '',
        sorted: false,
        group: true,
        sortAccessor: '', 
        cell: ({row, col, className, rowSpan}) => {
            return <td className={`sp1_tlr_td sp1_tlr_td_border sp1_tlr_td_marged ${ rowSpan? "sp1_tlr_td_hover-disable": ""}`} rowSpan={rowSpan}>
                <UserRender
                    name={row?.employee_name}
                    profileUrl={`/account/employees/${row?.employee_id}`}
                    image={row?.employee_image}
                    role={
                        row?.employee_designation
                    }
                    id={row?.employee_id}
                />
            </td>
        }      
    }, 
    {
        id: 'project_id',
        header: 'Project Name',
        className: '',
        sorted: false,
        cell: ({row, className}) =>{
            return (
                <td className={className}> 
                    <a href={`/account/${row?.is_independent ? 'tasks' : 'projects'}/${row?.project_id}`} >
                        {row?.project_name}
                    </a>
                </td>
            )
        }
    },
    {
        id: 'client_id',
        header: 'Client Name',
        className: '',
        sorted: false,
        sortAccessor: 'employee_id',
        cell: ({row, className}) =>{
            return(
                <td className={className}>
                    <UserRender
                        name={row?.client_name}
                        profileUrl={`/account/clients/${row?.client_id}`}
                        image={row?.client_image}
                        role={row?.is_independent ? '' : 'Freelancer.com'}
                        roleLink={row?.client_from}
                        id={row?.client_id}
                    />
                </td>
            )
        }
    },
    {
        id: 'pm_id',
        header: 'Project Manager',
        className: '',
        sorted: false,
        cell: ({row, className}) =>{
            return(
                <td className={className}>
                    <UserRender
                        name={row?.pm_name}
                        profileUrl={`/account/employees/${row?.pm_id}`}
                        image={row?.pm_image}
                        role={row?.pm_roles}
                        id={row?.pm_id}
                    />
                </td>
            )
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
                    <EmployeeTrackTimeButton row={row}>
                        {row?.number_of_session}
                    </EmployeeTrackTimeButton> 
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