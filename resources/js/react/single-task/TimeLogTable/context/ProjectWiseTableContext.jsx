import React from 'react'


export const ProjectTableCtx = React.createContext();

const ProjectWiseTableCtxProvider = ({children}) => {
    const [filter, setFilter] = React.useState(null)

    return (
        <ProjectTableCtx.Provider value={{
            filter,
            setFilter
        }}>
            {children}
        </ProjectTableCtx.Provider>
    )
}

export default ProjectWiseTableCtxProvider