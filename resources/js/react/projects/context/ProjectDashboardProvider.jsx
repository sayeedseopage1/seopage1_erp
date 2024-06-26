import React, { createContext, useEffect } from "react";
import PropTypes from "prop-types";

// services
import { useGetProjectDetailsQuery } from "../../services/api/projectApiSlice";

export const ProjectDashboardContext = createContext();

const ProjectDashboardProvider = ({ children }) => {
    const [projectData, setProjectData] = React.useState(null);
    const [project_id, setProject_id] = React.useState(null);

    // get project details query
    const {
        data: projectDetails,
        isFetching: isProjectDetailsFetching,
        isLoading: isProjectDetailsLoading,
        refetch: refetchProjectDetails,
    } = useGetProjectDetailsQuery(project_id, {
        skip: !project_id,
        refetchOnMountOrArgChange: true,
    });

    useEffect(() => {
        if (
            projectData &&
            !isProjectDetailsFetching &&
            !isProjectDetailsLoading
        ) {
            setProjectData(projectDetails);
        }
    }, [projectDetails]);

    const ProjectDashboardValue = React.useMemo(() => {
        return {
            projectData,
            setProject_id,
        };
    });

    return (
        <ProjectDashboardContext.Provider value={ProjectDashboardValue}>
            {children}
        </ProjectDashboardContext.Provider>
    );
};

export default ProjectDashboardProvider;

ProjectDashboardProvider.propTypes = {
    children: PropTypes.node,
};
