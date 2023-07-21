


import EmployeeTableCtxProvider from "./EmployeeTableContext";

export default function ContextProvider({children}){
    return (
        <EmployeeTableCtxProvider>
            {children}
        </EmployeeTableCtxProvider>
    )
}