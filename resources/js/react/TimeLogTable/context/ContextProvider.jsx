import EmployeeTableCtxProvider from "./EmployeeTableContext";
import ProjectWiseTableCtxProvider from "./ProjectWiseTableContext";

export default function ContextProvider({ children }) {
    return (
        <EmployeeTableCtxProvider>
            <ProjectWiseTableCtxProvider>
                {children}
            </ProjectWiseTableCtxProvider>
        </EmployeeTableCtxProvider> 
    );
}
