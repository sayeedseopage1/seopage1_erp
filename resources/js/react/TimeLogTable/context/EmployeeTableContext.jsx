import React from 'react'

export const EmployeeTableCtx = React.createContext();

const EmployeeTableCtxProvider = ({children}) => {
    const [filter, setFilter] = React.useState(null);
    const [employeeName, setEmployeeName] = React.useState('');
    const [employeeId, setEmployeeId] = React.useState('');
    const [projectName, setProjectName] = React.useState('');
    const [projectId, setProjectId] = React.useState('');
    

    return (
        <EmployeeTableCtx.Provider value={{
            filter,
            setFilter,
            employeeName,
            setEmployeeName,
            employeeId,
            setEmployeeId,
            projectId, 
            setProjectId,
            projectName,
            setProjectName
        }}>
            {children}
        </EmployeeTableCtx.Provider>
    )
}

export default EmployeeTableCtxProvider