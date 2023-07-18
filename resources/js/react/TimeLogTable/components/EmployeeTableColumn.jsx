

export const EmployeeTableColumn = [
    {
        id: 'employee_id',
        header: 'Employee Name',
        className: '',
        sorted: true,
        sortAccessor: '', 
        cell: (row, rowSpan) => {
            return;
            return(
                <td
                    className={`sp1_tlr_td sp1_tlr_td_border ${ rowSpan > 1 ? "sp1_tlr_td_hover-disable" : ""}`}
                    rowSpan={rowSpan}
                >
                    <UserRender
                        name={row?.employee_name}
                        profileUrl={`/account/employees/${row?.employee_id}`}
                        image={row?.employee_image}
                        role={row?.employee_designation}
                        id={row?.employee_id}
                    />
                </td>
            )
        } 
        
    }, 
    {
        id: 'project_id',
        header: 'Project Name',
        className: '',
        sorted: false,
        cell: (row) => <span> Project Name </span>
    },
    {
        id: 'client_id',
        header: 'Client Name',
        className: '',
        sorted: false,
        sortAccessor: 'employee_id',
        cell: (row) => <span>Employee Name</span>
    },
    {
        id: 'pm_id',
        header: 'Project Manager',
        className: '',
        sorted: false,
        cell: (row) => <span> Project Manager </span>
    },
    {
        id: 'number_of_session',
        header: 'Number Of Session',
        className: '',
        sorted: false,
        cell: (row) => <span> Number Of Session </span>
    },
    {
        id: 'total_track_time',
        header: 'Total Track Time',
        className: '',
        sorted: false,
        cell: (row) => <span> Total Track Time </span>
    }
]