import React, { createContext, useEffect } from "react";
import PropTypes from "prop-types";

// services
import {
    useGetProjectDetailsQuery,
    useGetProjectMilestoneQuery,
    useGetProjectPendingExtensionHistoryQuery,
    useGetProjectTaskListQuery,
} from "../../services/api/projectApiSlice";

// helper
import { extractMessageLink } from "../helper";


/**
 *  @typedef {Object} ProjectDashboardContextType
 *  @property {any} projectData - Data related to the project
 *  @property {function} setProject_id - Set project id
 *  @property {boolean} isProjectDetailsLoading - Loading state
 *  @property {function} refetchProjectDetails - Refetch project details
 *  @property {any[]} projectTaskList - List of project tasks
 *  @property {boolean} isProjectTaskListLoading - Loading state
 *  @property {function} refetchProjectTaskList - Refetch project task list
 *  @property {any[]} projectMilestoneList - List of project milestones
 *  @property {boolean} isProjectMilestoneLoading - Loading state
 *  @property {function} refetchProjectMilestone - Refetch project milestone list
 *  @property {any[]} projectDeadlineExtensionHistory - List of project deadline extension history
 *  @property {boolean} isProjectPendingExtensionHistoryLoading - Loading state
 *  @property {function} refetchProjectPendingExtensionHistory - Refetch project deadline extension history
 */

/** @type {React.Context<ProjectDashboardContextType | undefined>} */
export const ProjectDashboardContext = createContext();

const ProjectDashboardProvider = ({ children }) => {
    const [projectData, setProjectData] = React.useState(null);
    const [projectTaskList, setProjectTaskList] = React.useState([]);
    const [projectMilestoneList, setProjectMilestoneList] = React.useState([]);
    const [
        projectDeadlineExtensionHistory,
        setProjectDeadlineExtensionHistory,
    ] = React.useState([]);
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

    // get project task list query
    const {
        data: projectTaskListData,
        isFetching: isProjectTaskListFetching,
        isLoading: isProjectTaskListLoading,
        refetch: refetchProjectTaskList,
    } = useGetProjectTaskListQuery(project_id, {
        skip: !project_id,
        refetchOnMountOrArgChange: true,
    });

    // get project milestone list query

    const {
        data: projectMilestoneListData,
        isFetching: isProjectMilestoneFetching,
        isLoading: isProjectMilestoneLoading,
        refetch: refetchProjectMilestone,
    } = useGetProjectMilestoneQuery(project_id, {
        skip: !project_id,
        refetchOnMountOrArgChange: true,
    });

    // get project deadline extension history query
    const {
        data: projectPendingExtensionHistory,
        isFetching: isProjectPendingExtensionHistoryFetching,
        isLoading: isProjectPendingExtensionHistoryLoading,
        refetch: refetchProjectPendingExtensionHistory,
    } = useGetProjectPendingExtensionHistoryQuery(project_id, {
        skip: !project_id,
        refetchOnMountOrArgChange: true,
    });

    // set project details data to the state when fetched successfully
    useEffect(() => {
        if (
            projectDetails &&
            !isProjectDetailsFetching &&
            !isProjectDetailsLoading
        ) {
            const formattedProjectData = {
                ...projectDetails?.data,
                deal: {
                    ...projectDetails?.data?.deal,
                    message_link: extractMessageLink(
                        projectDetails?.data?.deal?.message_link
                    ),
                },
            };
            setProjectData(formattedProjectData);
        }
    }, [projectDetails, isProjectDetailsFetching, isProjectDetailsLoading]);

    // set project task list data to the state when fetched successfully

    useEffect(() => {
        if (
            projectTaskListData &&
            !isProjectTaskListFetching &&
            !isProjectTaskListLoading
        ) {
            setProjectTaskList(projectTaskListData?.data);
        }
    }, [
        projectTaskListData,
        isProjectTaskListFetching,
        isProjectTaskListLoading,
    ]);

    // set project milestone list data to the state when fetched successfully

    useEffect(() => {
        if (
            projectMilestoneListData &&
            !isProjectMilestoneFetching &&
            !isProjectMilestoneLoading
        ) {
            setProjectMilestoneList(projectMilestoneListData?.data);
        }
    }, [
        projectMilestoneListData,
        isProjectMilestoneFetching,
        isProjectMilestoneLoading,
    ]);

    // set project deadline extension history data to the state when fetched successfully

    useEffect(() => {
        if (
            projectPendingExtensionHistory &&
            !isProjectPendingExtensionHistoryFetching &&
            !isProjectPendingExtensionHistoryLoading
        ) {
            setProjectDeadlineExtensionHistory(
                projectPendingExtensionHistory?.data
            );
        }
    }, [
        projectPendingExtensionHistory,
        isProjectPendingExtensionHistoryFetching,
        isProjectPendingExtensionHistoryLoading,
    ]);

      /** @type {ProjectDashboardContextType} */   
    const ProjectDashboardValue = React.useMemo(() => {
        return {
            projectData,
            setProject_id,
            isProjectDetailsLoading:
                isProjectDetailsLoading || isProjectDetailsFetching,
            refetchProjectDetails,
            projectTaskList,
            isProjectTaskListLoading:
                isProjectTaskListLoading || isProjectTaskListFetching,
            refetchProjectTaskList,
            projectMilestoneList,
            isProjectMilestoneLoading:
                isProjectMilestoneLoading || isProjectMilestoneFetching,
            refetchProjectMilestone,
            projectDeadlineExtensionHistory,
            isProjectPendingExtensionHistoryLoading:
                isProjectPendingExtensionHistoryLoading ||
                isProjectPendingExtensionHistoryFetching,
            refetchProjectPendingExtensionHistory,
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
