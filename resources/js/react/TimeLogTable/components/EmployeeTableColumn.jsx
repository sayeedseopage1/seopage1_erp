

export const EmployeeTableColumn = [
    {
        id: 'employee_id',
        header: 'Employee Name',
        className: '',
        sorted: true,
        sortAccessor: '',
        hidden: true,
        cell: (row) => <span>Employee Name</span>
        
    }, 
    {
        id: 'employee_id',
        header: 'Employee Name',
        className: '',
        sorted: false,
        sortAccessor: 'employee_id',
        cell: (row) => <span>Employee Name</span>
    },
    {
        id: 'project_name',
        header: 'Project Name',
        className: '',
        sorted: false,
        cell: (row) => <span> Project Name </span>
    },
    {
        id: 'project_manager',
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