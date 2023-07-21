import React from 'react'


export const EmployeeTableCtx = React.createContext();

const EmployeeTableCtxProvider = ({children}) => {
    const [filter, setFilter] = React.useState(null)

    return (
        <EmployeeTableCtx.Provider value={{
            filter,
            setFilter
        }}>
            {children}
        </EmployeeTableCtx.Provider>
    )
}

export default EmployeeTableCtxProvider